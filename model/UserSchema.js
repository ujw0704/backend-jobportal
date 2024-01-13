import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  last: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: true,
  },
  location: {
    type: String,
    coordinates: [[]],
    default: "Japan",
  },
  number: {
    type: Number,
  },
}, {
  timestamps: true,
});

// middleware
UserSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

// method to encrypt password
UserSchema.methods.encryptPassword = async function(plainTextPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainTextPassword, salt);
};

// compare password
UserSchema.methods.comparePassword = async function(userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// jsonwebtoken
UserSchema.methods.createJWT = function() {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
};

export default mongoose.model("user", UserSchema);
