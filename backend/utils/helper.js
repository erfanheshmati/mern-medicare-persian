import crypto from "crypto";

export const generateRandomByte = () => {
  try {
    const buff = crypto.randomBytes(30);
    return buff.toString("hex");
  } catch (error) {
    throw error;
  }
};
