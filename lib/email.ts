import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export function getResendClient() {
  if (!resendApiKey) {
    return null;
  }

  return new Resend(resendApiKey);
}
