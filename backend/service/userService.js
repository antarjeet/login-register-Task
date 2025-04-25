import db from "../connection/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import resposne from "../middleware/resposne.js";
dotenv.config();

export function userRegister(username, email, password) {
    return new Promise((resolve, reject) => {
        const insertSql = `
          INSERT INTO users (username, email, password) 
          VALUES (?, ?, ?)
        `;

        const values = [username, email, password];

        db.query(insertSql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const userId = result.insertId;
                if (userId) {
                    resolve(userId);
                } else {
                    reject(new Error(resposne.userfailed));
                }
            }
        });
    });
}

export function checkemail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length > 0 ? true : false);
            }
        });
    });
}

export function checkUsername(username) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length > 0 ? true : false);
            }
        });
    });
}


export function loginUser(identifier, password) {
    const userQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

    return new Promise((resolve, reject) => {
        db.query(userQuery, [identifier, identifier], async (err, results) => {
            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                const error = { error: resposne.invaliduser };
                return resolve(error);
            }

            const user = results[0];

            if (!password || !user.password) {
                const error = { error: resposne.missingPass };
                return resolve(error);
            }

            try {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    const error = { error: resposne.invalidpassword };
                    return resolve(error);
                }

                const token = jwt.sign(
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        mobile_number: user.mobile_number,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '15m' }
                );

                resolve({
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: token,
                    },
                });
            } catch (err) {
                return reject(err);
            }
        });
    });
}
export const checkemailUsername = (identifier) => {
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [identifier, identifier], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); 
        });
    });
};

export function getProfile(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id,
        username,
        email, 
        created_at
        FROM users
        WHERE id = ?
      `;
  
      db.query(query, [userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return reject(new Error("No User found for the given ID"));
        }
        resolve({
          userData: results[0],
        });
      });
    });
  }