import { providers } from "@/lib/globals";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { FaExclamation, FaExclamationCircle } from "react-icons/fa";

export const LinkedAccountsDataless: React.FC<{
    accounts: {
        id: string;
        provider: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        scopes: string[];
    }[];
}> = ({ accounts: initialAccounts }) => {
    const [accounts, setAccounts] = useState(initialAccounts);

    return (
        <div className="flex gap-2">
            {Object.entries(providers).map(([id, provider]) => {
                const linked = accounts.find(
                    (account) => account.provider === id
                );

                if (!linked) {
                    return (
                        <Button
                            key={`unlinked-${id}`}
                            variant="outline"
                            onClick={() => {
                                authClient.linkSocial({
                                    provider: id,
                                    callbackURL: "/",
                                    scopes: provider.scopes,
                                });
                                // Page will reload anyway, do not need to update state
                            }}
                        >
                            <provider.icon />
                            Link to {provider.name}
                        </Button>
                    );
                }

                return (
                    <Dialog key={`linked-${id}`}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <provider.icon />
                                Unlink {provider.name}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Unlink account?</DialogTitle>
                                <DialogDescription>
                                    Playlist syncing will stop working for this
                                    account. Synced playlists will not be
                                    deleted. You can re-link your account at any
                                    time.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={async () => {
                                            try {
                                                await authClient
                                                    .unlinkAccount({
                                                        providerId:
                                                            linked.provider,
                                                    })
                                                    .then((r) => {
                                                        if (r.error)
                                                            throw new Error(
                                                                r.error.statusText
                                                            );

                                                        setAccounts(
                                                            accounts.filter(
                                                                (a) => {
                                                                    a.provider !==
                                                                        linked.provider;
                                                                }
                                                            )
                                                        );
                                                        toast(
                                                            `Successfully unlinked ${provider.name}`
                                                        );
                                                    });
                                            } catch (e) {
                                                toast(
                                                    `Failed to unlink ${provider.name}`,
                                                    {
                                                        icon: <FaExclamation />,
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        Unlink
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                );
            })}
        </div>
    );
};
