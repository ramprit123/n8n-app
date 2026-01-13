import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
    return (
        <AuthLayout
            title="Welcome back"
            description="Enter your email to sign in to your account"
        >
            <SignInForm />
        </AuthLayout>
    );
}
