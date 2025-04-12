import { useAppSelector } from "~/hooks";
import type { Route } from "./+types/home";
import Token from "~/features/token/tokenComponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Up Custom Web App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const token = useAppSelector((state) => state.token.value)
  console.log(token)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Token/>
    </div>
  );
}
