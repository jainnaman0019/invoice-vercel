// const jwt=require('jsonwebtoken');

// const protect=(req,res,next)=>{
//     const authHeader = req.headers.authorization;

//     console.log("AUTH HEADER 👉", authHeader);
//     console.log("TYPE 👉", typeof authHeader);
  
//     // 1️⃣ Header missing
//     if (!authHeader) {
//       return res.status(401).json({ message: "Authorization header missing" });
//     }
  
//     // 2️⃣ Header not string (THIS IS YOUR BUG)
//     if (typeof authHeader !== "string") {
//       return res.status(401).json({
//         message: "Authorization header is not a string",
//         receivedType: typeof authHeader,
//       });
//     }
  
//     // 3️⃣ Format check
//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Invalid auth format" });
//     }
  
//     // 4️⃣ Extract token
//     const token = authHeader.split(" ")[1];

//     if(!token){
//         return res.status(401).json({message:'No token,authorization denied'});
//     }
//     console.log("TOKEN 👉", token);
//     console.log("VERIFY SECRET 👉", process.env.JWT_SECRET);

//     try{
//         //const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         const decoded = jwt.verify(token, "TEMP_SECRET_123");
//         req.user=decoded;
//         next();
//     }
//     catch(error){
//         console.error(error.message);
//         res.status(401).json({message:'Token is not valid'});
//     }
// }

// module.exports={protect};

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("hn bhai authmiddleware me aagya");
  let token;

  // 1️⃣ Try Authorization Header
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === "string" &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Fallback to Cookie
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 3️⃣ No token found
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
       "TEMP_SECRET_123"  // use env var
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = { protect };
