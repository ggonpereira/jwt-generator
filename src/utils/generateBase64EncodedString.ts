export function genBase64UrlStringFromObject(object: Record<string, any>) {
  try {
    const objectAsString = JSON.stringify(object);
    return Buffer.from(objectAsString).toString("base64url");
  } catch (error) {
    return "";
  }
}
