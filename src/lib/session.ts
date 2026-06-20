import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken } from "@/lib/auth";

export const SESSION_COOKIE_NAME = "healthcare_admin_session";

export async function getSessionUser() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export async function createAdminSession(username: string) {
  const cookieStore = await cookies();
  const token = createSessionToken({ username, role: "admin" });

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
