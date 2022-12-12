import { getFullName } from "../../utils/getFullName.util";

describe("getFullName", () => {
  test("returns Guest if first and last name not provided", () => {
    const fullName = getFullName();
    expect(fullName).toBe("Guest");
  });

  test("returns only first name capitalized if last name not provided", () => {
    const fullName = getFullName("john", "", false);
    expect(fullName).toBe("John");
  });

  test("returns only last name capitalized fully if first name not provided and last name not shortenned", () => {
    const fullName = getFullName("", "doe", false);
    expect(fullName).toBe("Doe");
  });

  test("returns only first letter of last name capitalized if first name not provided and last name is shortenned", () => {
    const fullName = getFullName("", "doe", true);
    expect(fullName).toBe("D");
  });

  test("returns full name with first letter capitalized without shortening last name", () => {
    const fullName = getFullName("john", "doe", false);
    expect(fullName).toBe("John Doe");
  });

  test("returns full name with first letter capitalized with shortenning last name", () => {
    const fullName = getFullName("john", "doe", true);
    expect(fullName).toBe("John D");
  });
});
