import { createHmac } from "node:crypto";
import { generateSignature } from "./generateSignature";

describe("generateSignature", () => {
  it("should generate a valid signature with the correct secret", () => {
    const secret = "mySecretKey";
    const header = "headerData";
    const payload = "payloadData";
    const expectedSignature = createHmac("sha256", secret)
      .update(`${header}.${payload}`)
      .digest("base64url");
    const signature = generateSignature({ secret, header, payload });

    expect(signature).toBe(expectedSignature);
  });

  it("should handle different secret, header, and payload values correctly", () => {
    const secret = "anotherSecretKey";
    const header = "differentHeader";
    const payload = "differentPayload";
    const expectedSignature = createHmac("sha256", secret)
      .update(`${header}.${payload}`)
      .digest("base64url");
    const signature = generateSignature({ secret, header, payload });

    expect(signature).toBe(expectedSignature);
  });

  it("should return a base64url encoded string", () => {
    const secret = "mySecretKey";
    const header = "headerData";
    const payload = "payloadData";
    const signature = generateSignature({ secret, header, payload });

    expect(signature).toMatch(/^[\w-]+$/);
  });

  it("should return null for empty strings", () => {
    const secret = "";
    const header = "";
    const payload = "";
    const signature = generateSignature({ secret, header, payload });

    expect(signature).toBeNull();
  });

  it("should return nul for an empty secret", () => {
    const header = "headerData";
    const payload = "payloadData";
    const signature = generateSignature({ secret: "", header, payload });

    expect(signature).toBeNull();
  });

  it("should return null for invalid secret", () => {
    const header = "headerData";
    const payload = "payloadData";
    const signature = generateSignature({
      secret: null as any,
      header,
      payload,
    });

    expect(signature).toBeNull();
  });

  it("should return null for invalid header", () => {
    const secret = "mySecretKey";
    const payload = "payloadData";
    const signature = generateSignature({
      secret,
      header: null as any,
      payload,
    });

    expect(signature).toBeNull();
  });

  it("should return null for invalid payload", () => {
    const secret = "mySecretKey";
    const header = "headerData";
    const signature = generateSignature({
      secret,
      header,
      payload: null as any,
    });

    expect(signature).toBeNull();
  });
});
