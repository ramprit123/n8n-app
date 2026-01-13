import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your information to create an account"
        >
            <SignUpForm />
        </AuthLayout>
    );
}
