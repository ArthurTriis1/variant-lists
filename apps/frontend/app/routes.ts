import {
	type RouteConfig,
	route,
	index,
	layout,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	layout("routes/auth/layout.tsx", [
		route("sign-in", "routes/auth/sign-in.tsx"),
		route("sign-up", "routes/auth/sign-up.tsx"),
	]),
] satisfies RouteConfig;
