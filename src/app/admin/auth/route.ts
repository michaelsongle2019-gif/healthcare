import { NextResponse } from "next/server";
import { getDefaultAdminCredentials, verifyPassword } from "@/lib/auth";
import { createAdminSession } from "@/lib/session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const credentials = getDefaultAdminCredentials();

  if (
    username !== credentials.username ||
    !(await verifyPassword(password, credentials.passwordHash))
  ) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url));
  }

  await createAdminSession(username);
  return NextResponse.redirect(new URL("/admin", request.url));
}
