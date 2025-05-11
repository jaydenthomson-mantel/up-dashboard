import { useAppSelector } from "~/hooks";
import Token from "~/features/token/tokenComponent";

export function meta() {
  return [
    { title: "Up - Sign In" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SignIn() {
  const token = useAppSelector((state) => state.token.value)
  console.log(token)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Token/>
    </div>
  );
}