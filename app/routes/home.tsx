import { useAppSelector } from "~/hooks";
import { selectSignInState } from "~/features/sign-in/signInSlice";
import { Navigate } from "react-router";
import AccountsSidebarComponent from "~/features/accounts/accountsSidebarComponent";
import TransactionActivityComponent from "~/features/transactions/transactionActivityComponent";
import { selectAccountState } from "~/features/accounts/accountSlice";

export function meta() {
  return [
    { title: "Up" },
  ];
}

export default function Home() {
  const signInState = useAppSelector(selectSignInState)
  const accountState = useAppSelector(selectAccountState)

  if (!signInState.signedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AccountsSidebarComponent accessToken={signInState.accessToken} />
      {accountState.selectedAccountId && (
        <TransactionActivityComponent 
          accessToken={signInState.accessToken}
          selectedAccountId={accountState.selectedAccountId}
        />
      )}
    </div>
  );
}
