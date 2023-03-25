const User = require("../models/user");
var jwt = require("jsonwebtoken");
var authConfig = require("../config/auth");


const generateToken = (user, expiresIn = 100800000, refresh= false) => {
  let _user = {
    _id: user._id,
    email: user.email,
    role: user.role,
    refresh: refresh
  };
  let token = "";
  if (expiresIn === null) {
    _user.offline = true;
    token = jwt.sign(_user, authConfig.secret);
  } else {
    _user.offline = false;
    token = jwt.sign(_user, authConfig.secret, {
      expiresIn: expiresIn,
    });
  }
  return token;
}

const getAccessToken = (userInfo) => {
  return generateToken(userInfo,authConfig.accessTokenExpiresIn);
}
const getRefreshToken = (userInfo) => {
  return generateToken(userInfo,authConfig.refreshTokenExpiresIn,  true);
}
exports.getAccessToken = getAccessToken;
exports.getRefreshToken = getRefreshToken;

exports.register =  (req, res, next) => {
    const {email, password, mobileNo} = req.body;

    let user = new User({
        email: email,
        password: password,
        mobileNo: mobileNo
    });

    user.save(function (err, user) {
        if (err) {
          return res.status(500).json({message: err.message})
        }

        return res.status(201).json({
          user: user
        });
      });
}


exports.login = async (req, res, next) => {
  console.log("login");
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    
    if (user == null) {
      res.status(401).json({ message: "Login failed. Please try again." });
    } else if (user.status === "deactive") {
      return res.status(401).json({ isDeactivated: true, message: "Uder deactivated" });
    } else{
      user.comparePassword(password, (err, isMatch)=> {
        if (err){
          return res.status(401).json({ message: err });
        }

        if(!isMatch){
          return res.status(401).json({ message: "Password incorrect" });
        }else {
          let _token = "Bearer " + getAccessToken(user);
          const _refreshToken = "Bearer " + getRefreshToken(user);
          return res.status(200).json({
            token: _token,
            refreshToken: _refreshToken,
            user: {
              _id: user._id,
              email: user.email,
              role: user.role,
            }
          });
        }
      })
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({message: err})
  }

}
