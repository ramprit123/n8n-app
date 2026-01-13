import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <AuthLayout
            title="Reset password"
            description="Enter your email address and we'll send you a link to reset your password"
        >
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
