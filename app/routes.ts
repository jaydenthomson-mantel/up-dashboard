import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    { path: "sign-in", file: "routes/signIn.tsx" },
] satisfies RouteConfig;