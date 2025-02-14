export const internalServerErrorSchema =  {
  $id: "ise",
  type: "object",
  properties: {
    statusCode: { type: "number", enum: [500] },
    error: { type: "string" },
    message: { type: "string" },
  },
  required: ["statusCode", "error", "message"],
};
