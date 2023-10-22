import { generateExpTime } from "./generateExpTime";

describe("generateExpTime", () => {
  describe("using string units", () => {
    describe("day string unit", () => {
      it('should return one day timestamp based on "1d" input', () => {
        const input = "1d";
        const expected = 86_400_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return three days timestamp based on "3d" input', () => {
        const input = "3d";
        const expected = 259_200_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return twelve days timestamp based on "12d" input', () => {
        const input = "12d";
        const expected = 1_036_800_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });
    });

    describe("week string unit", () => {
      it('should return one week timestamp based on "1w" input', () => {
        const input = "1w";
        const expected = 604_800_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return three weeks timestamp based on "7w" input', () => {
        const input = "3w";
        const expected = 1_814_400_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return twelve weeks timestamp based on "12w" input', () => {
        const input = "12w";
        const expected = 7_257_600_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });
    });

    describe("month string unit", () => {
      it('should return one month timestamp based on "1m" input', () => {
        const input = "1m";
        const expected = 2_592_000_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return three months timestamp based on "3m" input', () => {
        const input = "3m";
        const expected = 7_776_000_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return twelve months timestamp based on "12m" input', () => {
        const input = "12m";
        const expected = 31_104_000_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });
    });

    describe("year string unit", () => {
      it('should return one year timestamp based on "1y" input', () => {
        const input = "1y";
        const expected = 31_536_000_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return three years timestamp based on "3y" input', () => {
        const input = "3y";
        const expected = 94_608_000_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });

      it('should return twelve years timestamp based on "12y" input', () => {
        const input = "12y";
        const expected = 378_432_000_000;

        const result = generateExpTime(input);

        expect(result).toEqual(expected);
      });
    });
  });

  describe("using number units", () => {
    it("should return one day timestamp based on 1 input", () => {
      const input = 1;
      const expected = 86_400_000;

      const result = generateExpTime(input);

      expect(result).toEqual(expected);
    });

    it("should return three days timestamp based on 3 input", () => {
      const input = 3;
      const expected = 259_200_000;

      const result = generateExpTime(input);

      expect(result).toEqual(expected);
    });

    it("should return forty days timestamp based on 40 input", () => {
      const input = 40;
      const expected = 3_456_000_000;

      const result = generateExpTime(input);

      expect(result).toEqual(expected);
    });
  });

  it("should return one day timestamp on invalid data inserted", () => {
    const expected = 86_400_000;

    const genExpTimeWithoutTSError = (val: any) => generateExpTime(val);

    const invalidInputs = [
      null,
      {},
      "abc",
      undefined,
      false,
      true,
      "false",
      "[]",
      [],
      "?",
    ];

    invalidInputs.forEach((input) => {
      expect(genExpTimeWithoutTSError(input)).toEqual(expected);
    });
  });
});
