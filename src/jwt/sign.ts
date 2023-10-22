import { genBase64UrlStringFromObject } from "../utils/generateBase64EncodedString";
import { generateExpTime } from "../utils/generateExpTime";
import { generateSignature } from "../utils/generateSignature";

interface ISignOptions {
  data: Record<string, any>;
  exp: string;
  secret: string;
}

export function sign({ data, exp, secret }: ISignOptions) {
  const currentDate = Date.now();

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...data,
    iat: currentDate,
    exp: currentDate + generateExpTime(exp),
  };

  const base64EncodedHeader = genBase64UrlStringFromObject(header);
  const base64EncodedPayload = genBase64UrlStringFromObject(payload);

  const signature = generateSignature({
    header: base64EncodedHeader,
    payload: base64EncodedPayload,
    secret,
  });

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
