import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Generate a random 4-digit OTP
export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Store OTP in Firestore with expiration (5 minutes)
export async function storeOTP(email, otp) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes
  
  await setDoc(doc(db, "otpVerifications", email), {
    email,
    otp,
    expiresAt,
    createdAt: new Date().toISOString()
  });
  
  return otp;
}

// Verify OTP
export async function verifyOTP(email, inputOTP) {
  try {
    const otpDoc = await getDoc(doc(db, "otpVerifications", email));
    
    if (!otpDoc.exists()) {
      return { success: false, message: "No verification code found. Please request a new one." };
    }
    
    const otpData = otpDoc.data();
    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);
    
    // Check if OTP has expired
    if (now > expiresAt) {
      await deleteDoc(doc(db, "otpVerifications", email));
      return { success: false, message: "Verification code has expired. Please request a new one." };
    }
    
    // Check if OTP matches
    if (otpData.otp !== inputOTP) {
      return { success: false, message: "Invalid verification code. Please try again." };
    }
    
    // OTP is valid, delete it from Firestore
    await deleteDoc(doc(db, "otpVerifications", email));
    
    return { success: true, message: "Email verified successfully!" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "An error occurred during verification. Please try again." };
  }
}

// Send OTP via email (simulated - in production, use a real email service)
export async function sendOTPEmail(email, otp) {
  // In a production environment, you would integrate with an email service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Firebase Extensions (Trigger Email)
  
  // For now, we'll log the OTP to console and show it in an alert
  // In production, this would send an actual email
  
  console.log(`📧 OTP for ${email}: ${otp}`);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, you would do something like:
  // await sendEmail({
  //   to: email,
  //   subject: "Your Verification Code",
  //   body: `Your verification code is: ${otp}. It will expire in 5 minutes.`
  // });
  
  return { success: true, message: "Verification code sent to your email" };
}

// Clean up expired OTPs (optional - can be called periodically)
export async function cleanupExpiredOTPs() {
  // This would typically be done via a Cloud Function
  // For now, we'll just document it
  console.log("Cleanup expired OTPs - implement via Cloud Function for production");
}
