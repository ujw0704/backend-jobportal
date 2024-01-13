import UserSchema from "../model/UserSchema.js"

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, number } = req.body;
    // validate
    if (!name || !email || !password || !number) {
      return next("all field required");
    }
    // check for user
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return next("email is already registered, please login");
    }

    // create and save user
    const user = await UserSchema.create({
      name,
      email,
      password: await UserSchema.encryptPassword(password),
    });

    // respone
  
    const token = user.createJWT();
    res.status(201).send({
      sucess: true,
      message: "User Created Successfully",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,

      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const user = await UserSchema.findOne({ email });

    // find user by email
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = user.createJwt();

    res.status(200).json({
      message: "Login Successful",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
