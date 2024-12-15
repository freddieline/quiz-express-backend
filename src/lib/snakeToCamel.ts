export const snakeToCamel = (input: string) => {
  return input.replace(/([-_][a-z,0-9])/g, (match) =>
    match.toUpperCase().replace(/[-_]/g, ""),
  );
};

type AnyObject = { [key: string]: any };

export const transformKeys = (
  input: AnyObject | AnyObject[],
): AnyObject | AnyObject[] => {
  if (Array.isArray(input)) {
    return input.map((item) => transformKeys(item));
  } else if (typeof input === "object" && input !== null) {
    return Object.keys(input).reduce<AnyObject>((acc, key) => {
      const value = input[key];
      const camelCaseKey = snakeToCamel(key);
      acc[camelCaseKey] =
        value && typeof value === "object" ? transformKeys(value) : value;
      return acc;
    }, {});
  } else {
    return input;
  }
};
