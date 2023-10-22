import "dotenv/config";
import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = process.env.JWT_SECRET as string;

const token = sign({
  data: {
    sub: "ggonpereira@gmail.com",
  },
  exp: "1d",
  secret,
});

const verificationResponse = verify({
  secret,
  token,
});

console.info("verificationResponse", verificationResponse);
