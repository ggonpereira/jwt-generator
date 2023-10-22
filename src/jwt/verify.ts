import { generateSignature } from "../utils/generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

interface IDecodedPayload {
  iat: number;
  exp: number;
  [key: string]: any;
}

export function verify({ token, secret }: IVerifyOptions) {
  const [headerReceived, payloadReceived, signatureReceived] = token.split(".");

  const calculatedSignature = generateSignature({
    header: headerReceived,
    payload: payloadReceived,
    secret,
  });

  if (calculatedSignature !== signatureReceived) {
    throw new Error("Invalid JWT token");
  }

  const decodedPayload: IDecodedPayload = JSON.parse(
    Buffer.from(payloadReceived, "base64url").toString("utf-8")
  );

  if (decodedPayload.exp < Date.now()) {
    throw new Error("Expired token");
  }

  return decodedPayload;
}
