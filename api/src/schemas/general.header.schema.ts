export const generalHeaderSchema = {
  $id: "general-header",
  type: "object",
  properties: {
    authorization: { type: "string", description: "bearer jwt token" },
    deviceid: { type: "string" },
  },
  required: ["authorization", "deviceid"],
};
