import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized to access, Please try again",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

    if(tokenDecode.id){
        req.body.userId = tokenDecode.id
    } else {
        return res.json({
            success: false,
            message: 'Invalid token, Please try again'
        })
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({
        success: false,
        message: error.message
    })
  }
};


export default auth