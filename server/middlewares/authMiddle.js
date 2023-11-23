const jwt = require("jsonwebtoken")
const authMiddle = (req, res, next) => {
    const token  = req.headers['authorization'];

    console.log("hkjhkjh=>",req.headers)
    console.log("token",token)

    if (!token) return res.json({ message: "Token is not valid" })
    const decode = jwt.verify(token, "mynameisgiri");
    console.log("decode",decode)
    if (decode) {
        req.user = decode.user;        
        next()
    } else {
        res.json({ message: "Authorization Failed!" })
    }
}


module.exports= authMiddle
