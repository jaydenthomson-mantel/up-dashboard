import type { Route } from "./+types/home";
import Token from "~/components/token";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Up Custom Web App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [token, setToken] = useState("");
  console.log(token)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Token token={token} setToken={setToken}/>
    </div>
  );
}
