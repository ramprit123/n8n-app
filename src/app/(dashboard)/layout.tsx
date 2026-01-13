export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <section>
            <header>Layout ID: {id}</header>
            {children}
        </section>
    );
}