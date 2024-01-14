import User from "../model/UserSchema.js"
 import bcrypt from "bcrypt"
export const registerController = async (req, res) => {
  const { name, email, password, number ,username } = req.body;
  console.log(req.body)
  try {
    if (!name || !email || !password || !number) {
     
      res.send({status:202, massage:"resgter failed"})
       
    }
    // check for user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      
       res.send({status:202, massage:"email is already registered, please login"})
    }

    // create and save user
    const user =  new User({
      username,
      name,
      email,
      number,
      password,
      // location

    });
    const registeruser = await user.save()

    if(registeruser){

      res.send({status:200, massage:"sucess registered"})
    }

    // respone
  
    // const token = user.createJWT();
    // console.log(token)

    // res.status(201).send({
    //   sucess: true,
    //   message: "User Created Successfully",
    //   user: {
    //     name: user.name,
    //     lastName: user.lastName,
    //     email: user.email,
    //     location: user.location,

    //   }
    // });
  } catch (error) {
   console.log(error);
  }
};

export const loginController = async (req, res) => {

    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      res.send({status:202, massage:"failed login"});
    }

    const user = await User.findOne({ username });
    console.log(user)
    // res.send({status:200, massage:"done login"});
    // find user by email
    if (!user) {
      res.send({status:202, massage:" already  login"});
    }

    const isMatch = await bcrypt.compare(password, user.password);;
      console.log(isMatch)
    if (!isMatch) {
      res.send({status:202, massage:" password wrong"}); ;
    }
    const token = user.createJWT();
    console.log(token)
    res.send({status:200, massage:"done login",token});

  //   res.send({status:200, massage:"login sucessful"});
   
  // } catch (error) {
  //  console.log(error)
  // }
};
