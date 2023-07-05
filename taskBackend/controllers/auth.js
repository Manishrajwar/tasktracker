const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// !signup
exports.signup = async (req, res) => {
  try {
    // fetch the data
    const { name, email, password, type } = req.body;


    // validation
    if (!name || !email || !password || !type) {
      return res.status(403).json({
        success: false,
        message: `please provide the required data `,
      });
    }

    // does user exist already or not check
    const userAlreadyExist = await User.findOne({ email: email });

    // if match
    if (userAlreadyExist) {
      return res.status(409).json({
        success: false,
        message: "user already exist with this email",
      });
    }

    // not match -> valid request
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
      type,
    });

    return res.status(200).json({
      success: true,
      message: `user signup successfully `,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `error in signup user , please try again`,
    });
  }
};

//! login
exports.login = async (req, res) => {
  try {
    // fetch the data
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "please send all required data",
      });
    }

    // check user exist with this email or not
    const user = await User.findOne({ email: email });

    // if user not exist -> return
  if(!user){
    return res.status(404).json({
        success: false,
        message: `user do not exist with this email`,
      });
  }

    // user exist

    const payload = {
        id:user._id,
        email:user.email,
        type:user.type
    }
    if (await bcrypt.compare(password, user.password)) {

        // create token 
        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn:"24h",
        })

        // to object id 
        user.toObject();
        user.token = token ;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 34 * 60 * 1000 ),
            httpOnly: true,
          };
    
          res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            type:user.type,
            message: "login successfully",
          });



    
    } else {
      return res.status(402).json({
        success: false,
        message: "password do not match ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in login user , please try again ",
    });
  }
};
