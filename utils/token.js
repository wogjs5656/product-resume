import jwt from "jsonwebtoken";

 // 토큰의 키 값을 need-signin.middleware에 전달 하려고 custiom-secret-key 사용
export const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.CUSTOM_SECRET_KEY, {
    expiresIn: "12h",
  });
};

export const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.CUSTOM_SECRET_KEY, {
    expiresIn: "7d",
  });
};
