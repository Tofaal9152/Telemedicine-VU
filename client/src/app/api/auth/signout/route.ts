import apiServer from "@/lib/apiServer";
import { destroySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await apiServer.post(`/auth/signout`);
    console.log("Logout response:", res.data);
    await destroySession();
    return NextResponse.json({
      success: true,
      message: "Logged out and session deleted",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.response?.data?.detail || "Logout failed",
      },
      { status: 500 }
    );
  }
}
