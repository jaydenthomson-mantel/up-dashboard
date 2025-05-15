interface TransactionActivityProps {
    accessToken: string,
    selectedAccountId: string
}

export default function TransactionActivityComponent({
    accessToken,
    selectedAccountId
}: Readonly<TransactionActivityProps>) {
    console.log(accessToken)
    return (
        <div>
            Transactions
        </div>
    );
}