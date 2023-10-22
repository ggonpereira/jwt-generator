import { sign } from "../sign";

describe("sign", () => {
  it("should generate a valid JWT token with the correct data and signature", () => {
    const data = { userId: 123 };
    const exp = "1d";
    const secret = "mySecretKey";

    const jwtToken = sign({ data, exp, secret });

    expect(jwtToken).toMatch(
      /^[a-zA-Z0-9_-]+\.([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)$/
    );
  });

  it("should handle invalid data by returning null", () => {
    const data = null as any;
    const exp = "1d";
    const secret = "mySecretKey";

    expect(() => sign({ data, exp, secret })).toThrow(
      "You must insert a valid data, expiration date and secret key"
    );
  });

  it("should handle missing or empty secret by returning null", () => {
    const data = { userId: 123 };
    const exp = "1d";
    const secret = "";

    expect(() => sign({ data, exp, secret })).toThrow(
      "You must insert a valid data, expiration date and secret key"
    );
  });
});
