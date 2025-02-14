export type Decode = {
  id: number;
  role: "admin" | "super_admin" | "operator";
};
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export type RemoveNull<T> = ExpandRecursively<{
  [K in keyof T]: Exclude<RemoveNull<T[K]>, null>;
}>;

export const Roles = {
  User: "user",
  Assistant: "assistant",
  System: "system",
  Developer: "developer",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
