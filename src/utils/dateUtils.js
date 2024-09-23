export function formatDate(date, formatType) {
  const options = {};

  switch (formatType) {
    case "year":
      options.year = "numeric";
      break;

    case "short-date":
      options.year = "numeric";
      options.day = "numeric";
      options.month = "short";
      break;
  }

  return new Date(date).toLocaleDateString("en-US", options);
}
