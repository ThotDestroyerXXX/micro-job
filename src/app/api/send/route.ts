import { render } from "@react-email/components";
import { ReactNode } from "react";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: ReactNode;
}): Promise<void> {
  const nodemailer = (await import("@/lib/nodemailer")).default;

  try {
    await nodemailer.verify();
    console.log("SMTP connection verified successfully");
    await nodemailer.sendMail({
      from: process.env.NODEMAILER_USER,
      to: to,
      subject,
      html: await render(text),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
