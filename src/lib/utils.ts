import { auth } from "@clerk/nextjs/server";

const sessionClaims = auth();
const role = (sessionClaims?.metaData as { role?: string })?.role;
