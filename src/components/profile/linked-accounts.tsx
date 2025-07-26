export const LinkedAccountsDataless: React.FC<{
    accounts: {
        id: string;
        provider: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        scopes: string[];
    }[];
}> = ({ accounts }) => {
    return JSON.stringify(accounts, null, 2) || "No accounts linked";
};
