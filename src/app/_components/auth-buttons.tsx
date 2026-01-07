"use client";

import { authClient } from "@/server/better-auth/client";
import { useRouter } from "next/navigation";

export function SignInButton() {
    const router = useRouter();

    return (
        <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            onClick={async () => {
                await authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/",
                });
            }}
        >
            Sign in with Github
        </button>
    );
}

export function SignOutButton() {
    const router = useRouter();

    return (
        <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.refresh();
                        },
                    },
                });
            }}
        >
            Sign out
        </button>
    );
}
