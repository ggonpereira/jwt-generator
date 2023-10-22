import { genBase64UrlStringFromObject } from "./generateBase64EncodedString";

describe("genBase64UrlStringFromObject", () => {
  it("should encode an empty object to a base64url string", () => {
    const input = {};
    const expected = "e30";
    const result = genBase64UrlStringFromObject(input);

    expect(result).toEqual(expected);
  });

  it("should encode a simple object to a base64url string", () => {
    const input = { name: "John", age: 30 };
    const expected = "eyJuYW1lIjoiSm9obiIsImFnZSI6MzB9";
    const result = genBase64UrlStringFromObject(input);

    expect(result).toEqual(expected);
  });

  it("should encode a complex object to a base64url string", () => {
    const input = {
      user: { name: "Gabriel", age: 20 },
      products: [
        { id: 1, name: "Product A" },
        { id: 2, name: "Product B" },
      ],
    };
    const expected =
      "eyJ1c2VyIjp7Im5hbWUiOiJHYWJyaWVsIiwiYWdlIjoyMH0sInByb2R1Y3RzIjpbeyJpZCI6MSwibmFtZSI6IlByb2R1Y3QgQSJ9LHsiaWQiOjIsIm5hbWUiOiJQcm9kdWN0IEIifV19";
    const result = genBase64UrlStringFromObject(input);

    expect(result).toEqual(expected);
  });

  it("should handle non-serializable input returning null", () => {
    const input: any = { circularReference: {} };
    input.circularReference.circularReference = input;
    const result = genBase64UrlStringFromObject(input);

    expect(result).toBeNull();
  });
});
