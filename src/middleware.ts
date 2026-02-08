import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/accounts/:path*",
        "/budgets/:path*",
        "/transactions/:path*",
        "/goals/:path*",
        "/categories/:path*",
        "/loans/:path*",
        "/subscriptions/:path*",
    ],
};
