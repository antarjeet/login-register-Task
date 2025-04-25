import bcrypt from "bcryptjs";
import { checkemail, checkemailUsername, checkUsername, getProfile, loginUser, userRegister } from "../service/userService.js";
const saltRounds = 10
import resposne from "../middleware/resposne.js";

export const usercreate = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const usernamecheck = await checkUsername(username);
        if (usernamecheck) {
            return res.status(400).json({
                status: resposne.successFalse,
                message: resposne.usernamecheck,
            });
        }
        const emailcheck = await checkemail(email);
        if (emailcheck) {
            return res.status(400).json({
                status: resposne.successFalse,
                message: resposne.checkEmail,
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userid = await userRegister(username, email, hashedPassword);
        if (!userid) {
            return res.status(400).json({
                status: resposne.successFalse,
                message: resposne.usercreatefail,
            });
        }
        return res.status(200).json({
            status: resposne.successTrue,
            message: resposne.usercreate,
            userId: userid
        });

    } catch (error) {
        return res.status(400).json({
            status: resposne.successFalse,
            message: error.message,
        });
    }
};


export const loginuser = async (req, res) => {
    const { username, email, password } = req.body;

    const identifier = email || username;

    if (!identifier || !password) {
        return res.status(400).json({
            status: resposne.successFalse,
            message: "Email/Username and password are required",
        });
    }

    try {
        const userExists = await checkemailUsername(identifier);

        if (!userExists) {
            return res.status(400).json({
                status: resposne.successFalse,
                message: resposne.emailnotexist,
            });
        }

        const loginResult = await loginUser(identifier, password);

        if (loginResult.data) {
            return res.status(200).json({
                status: resposne.successTrue,
                message: resposne.userlginsuccess,
                data: loginResult.data,
            });
        } else {
            return res.status(400).json({
                status: resposne.successFalse,
                message: loginResult.error,
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: resposne.successFalse,
            message: error.message,
        });
    }
};

export const profileGet = async (req, res) => {
    const role = req.user.role;
    const userId = req.user.id;
    if (role !== "user") {
      return res.status(400).json({
        status: resposne.successFalse,
        message: resposne.unauth,
      });
    }
  
    try {
      const result = await getProfile(userId);
  
      if (result.userData.length === 0) {
        return res.status(400).json({
          status: resposne.successFalse,
          message: resposne.nodatavail,
        });
      } else {
        return res.status(200).json({
          status: resposne.successTrue,
          message: resposne.fetchSuccess,
          data: result.userData,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: resposne.successFalse,
        message: error.message,
      });
    }
  };