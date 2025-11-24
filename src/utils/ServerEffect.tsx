"use server"

import { redirect } from "next/navigation";

export async function HandleLogoutServer() {
  // Optionally clear cookies, session, etc.
  redirect("/login");
}
