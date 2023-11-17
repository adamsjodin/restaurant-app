export function findInputError(errors, name) {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return { error: errors[key] };
    }, {});
  return filtered;
}
