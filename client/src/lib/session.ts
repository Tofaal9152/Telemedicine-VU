"use server";

import { Session } from "@/types/auth";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const encodedKey = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_SESSION_SECRET_KEY!
);

export async function CreateSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN || "15d")
    .sign(encodedKey);

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.error("Error verifying session:", error);
    redirect("/auth/signin");
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
//
export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await CreateSession(newPayload);
}
