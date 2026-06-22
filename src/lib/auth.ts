import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";
import type Database from "better-sqlite3";

export type SessionUser = {
  username: string;
  role: "admin";
  exp?: number;
};

const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "local-healthcare-session-secret";

const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
const DEFAULT_ADMIN_DISPLAY_NAME =
  process.env.ADMIN_DISPLAY_NAME ?? "Site Administrator";

function sign(value: string) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function getDefaultAdminCredentials() {
  return {
    username: DEFAULT_ADMIN_USERNAME,
    password: DEFAULT_ADMIN_PASSWORD,
    displayName: DEFAULT_ADMIN_DISPLAY_NAME,
    passwordHash: bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10)
  };
}

export async function authenticateAdminCredentials(
  username: string,
  password: string,
  database?: Database.Database
) {
  const fallback = getDefaultAdminCredentials();

  if (!database) {
    if (
      username === fallback.username &&
      (await verifyPassword(password, fallback.passwordHash))
    ) {
      return {
        username: fallback.username,
        displayName: fallback.displayName
      };
    }

    return null;
  }

  const admin = database
    .prepare(
      `
        SELECT username, password_hash, display_name
        FROM admins
        WHERE username = ?
      `
    )
    .get(username) as
    | { username: string; password_hash: string; display_name: string }
    | undefined;

  if (!admin) {
    return null;
  }

  if (!(await verifyPassword(password, admin.password_hash))) {
    return null;
  }

  return {
    username: admin.username,
    displayName: admin.display_name
  };
}

export function createSessionToken(
  session: SessionUser,
  expiresInSeconds = 60 * 60 * 12
) {
  const payload = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  const [encoded, providedSignature] = token.split(".");

  if (!encoded || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(encoded);

  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);

  if (
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  ) {
    return null;
  }

  const payload = JSON.parse(
    Buffer.from(encoded, "base64url").toString("utf8")
  ) as SessionUser;

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}
