export function genBase64UrlStringFromObject(object: Record<string, any>) {
  const objectAsString = JSON.stringify(object);
  return Buffer.from(objectAsString).toString("base64url");
}
