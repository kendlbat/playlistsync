import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const User: React.FC = () => {
    const {
        data: session,
        isPending,
        error,
        refetch,
    } = authClient.useSession();

    return (
        <div>
            <h1>User Component</h1>
            {isPending && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {session && (
                <div>
                    <h2>Welcome, {session.user.name}!</h2>
                    <p>Email: {session.user.email}</p>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                    <Button
                        variant="outline"
                        onClick={() => {
                            authClient.signOut().then(() => {
                                window.location.href = "/login";
                            });
                        }}
                    >
                        Sign Out
                    </Button>
                </div>
            )}
        </div>
    );
};
