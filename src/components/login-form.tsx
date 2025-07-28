import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { FaGoogle, FaSpotify } from "react-icons/fa";
import { providers } from "@/lib/globals";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to playlistsync.</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="javascript:void(0);">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                {Object.entries(providers).map(
                                    ([id, provider]) => (
                                        <Button
                                            key={id}
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => {
                                                authClient.signIn.social({
                                                    provider: id,
                                                    callbackURL: "/",
                                                });
                                            }}
                                        >
                                            <provider.icon />
                                            Login with {provider.name}
                                        </Button>
                                    )
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
