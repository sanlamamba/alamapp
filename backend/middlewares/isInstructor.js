import User from "../models/user";

export const isInstructor = async (req, res, next) => {
     try {
     const user = await User.findOne({ _id: req.user._id })
     // console.log(user);
     if (!user.role.includes('Instructor')) {
           return res.status(403).json({
                message: "You are not authorized to perform this action.",
            });
       }
     next();
     }catch (e) {
          res.status(500).json({
               message: "Error verifying user role.",
               error: e,
          });
     }
}