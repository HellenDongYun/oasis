"use server";
import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
//localhost:3000/api/auth/provider--->会找到所有的provider

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
