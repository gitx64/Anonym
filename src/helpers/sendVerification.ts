import { resend } from "@/lib/resend";
import VerificationSendTemplate from "../../emails/verificationSendTemplate";
import { ApiResponse } from "../types/ApiResponse";

export default async function sendVerification(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: " Annonym | Verification Code",
      react: VerificationSendTemplate({ username: username, otp: verifyCode }),
    });
    return { success: true, message: "verification email sent" };
    
  } catch (error) {
    console.error({ message: "Error sending verification email", error });
    return { success: false, message: "Failed to send verification email" };
  }
}
