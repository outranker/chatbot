const message = {
  1000: "success",
  1001: "fail",
  1002: "validation error",
  1003: "duplicate data",
  1004: "auth token not found",
  1005: "data not found",
  1006: "account is terminated",
  1007: "password is incorrect",
  1008: "not enough credentials",
  1009: "jwt expired or invalid",
} as const;
interface SendInput {
  code: number;
  data?: any;
  reason?: string;
}

function send(input: SendInput) {
  const { code, data, reason } = input;
  const responseObject: SendInput = { code };
  responseObject["code"] = code;
  if (code === 1000) {
    return data;
  } else {
    return { message: reason || data || message[code as keyof typeof message] };
  }
}

function validationError(reason: string) {
  return { message: reason };
}

export const responseForm = { send, validationError };
