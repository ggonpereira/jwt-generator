import { createHmac } from "node:crypto";

interface IGenerateSignature {
  secret: string;
  header: string;
  payload: string;
}

export function generateSignature({
  header,
  payload,
  secret,
}: IGenerateSignature) {
  if (!secret || !header || !payload) return null;

  try {
    const hmac = createHmac("sha256", secret);

    return hmac.update(`${header}.${payload}`).digest("base64url");
  } catch {
    return null;
  }
}
