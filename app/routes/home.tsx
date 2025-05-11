import { useAppSelector } from "~/hooks";
import { selectSignIn } from "~/features/sign-in/signInSlice";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Up" },
  ];
}

export default function Home() {
  const token = useAppSelector((state) => state.token.value)
  const signedIn = useAppSelector(selectSignIn)
  
  if (!signedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  console.log(token)
  return (
    <div className="flex min-h-screen items-center justify-center">
      Home Screen
    </div>
  );
}
