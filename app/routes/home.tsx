import { useAppSelector } from "~/hooks";
import { selectSignInState } from "~/features/sign-in/signInSlice";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Up" },
  ];
}

export default function Home() {
  const signInState = useAppSelector(selectSignInState)
  
  if (!signInState.signedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      Home Screen
    </div>
  );
}
