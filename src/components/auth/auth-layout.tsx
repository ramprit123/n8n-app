import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Left Side - Form Area (30%) */}
            <div className="flex w-full flex-col justify-center px-4 lg:w-[30%] lg:px-12">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="flex flex-col space-y-2 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-4">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right Side - Image Area (70%) */}
            <div className="hidden w-[70%] bg-muted lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/0 z-20" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                <Image
                    src="/images/auth-bg.png"
                    alt="Automation Dashboard"
                    fill
                    className="object-cover grayscale-[0.2]"
                    priority
                />
                <div className="absolute bottom-10 left-10 z-30 text-white max-w-lg">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
                        <blockquote className="space-y-2">
                            <p className="text-lg font-medium leading-relaxed drop-shadow-md">
                                &ldquo;Automation is not just about speed, it&apos;s about precision and scalability.&rdquo;
                            </p>
                            <footer className="text-sm font-semibold opacity-90">Antonio App Team</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}
