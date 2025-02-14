import { ZodError, ZodIssue } from "zod";

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join(".");

  return `${pathString}: ${message}`;
};

// Format the Zod error message with only the current error
export const formatZodError = (error: ZodError): string => {
  const { issues } = error;

  if (issues.length) {
    let s = "";
    for (const issue of issues) {
      s += formatZodIssue(issue) + ".  ";
    }

    return s;
  }
  return "Unknown zod validation error";
};
