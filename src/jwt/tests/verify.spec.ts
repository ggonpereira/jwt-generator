import { sign } from "../sign";
import { verify } from "../verify";

describe("verify", () => {
  const secret = "I'm the batman";
  const data = {
    sub: "ggonpereira@gmail.com",
    age: 20,
    balance: 25000,
  };

  const token = sign({
    data,
    exp: "1d",
    secret,
  });

  it("should verify a valid JWT token with the correct signature and return the decoded payload", () => {
    const decodedJWT = verify({ secret, token });
    const currentDate5SecInThePast = Date.now() - 5000;

    expect(decodedJWT.iat).toBeGreaterThan(currentDate5SecInThePast);
    expect(decodedJWT.exp).toBeGreaterThan(decodedJWT.iat);
    expect(decodedJWT).toMatchObject(data);
  });

  it("should throw an error for an invalid token with an incorrect signature", () => {
    const invalidToken = token.replace(/.$/, "?");

    expect(() => verify({ secret, token: invalidToken })).toThrow(
      "Invalid JWT token"
    );
  });

  it("should throw an error for a token with an invalid secret", () => {
    expect(() => verify({ secret: "Invalid secret", token })).toThrow(
      "Invalid JWT token"
    );
  });

  it("should throw an error for a token with an expired 'exp' value", () => {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ29ucGVyZWlyYUBnbWFpbC5jb20iLCJpYXQiOjE2OTc5OTE4MDI5OTMsImV4cCI6MTY5Nzk5MTgzOTAyMX0.6emnDODivxjMInR0ocVUcstyUd6DtXZGFxLSULV00z4";

    expect(() => verify({ secret, token: expiredToken })).toThrow(
      "Expired token"
    );
  });

  it("should throw an error for a token with an empty secret", () => {
    expect(() => verify({ secret: "", token })).toThrow(
      "You must insert a value for token and secret"
    );
  });

  it("should throw an error for an empty token", () => {
    expect(() => verify({ secret, token: "" })).toThrow(
      "You must insert a value for token and secret"
    );
  });
});
