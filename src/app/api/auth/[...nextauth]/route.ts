import NextAuth from "next-auth";
import { authOptions } from "@/infrastructure/web/auth/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
