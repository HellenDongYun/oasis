"use server";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
//localhost:3000/api/auth/provider--->会找到所有的provider

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
//what happened here is create a post URL to the server and the server will handle the update guest profile
export async function updateProfileFormAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must logged in!"); //一般不用trycatch block
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  //regex expression to check nationalID
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error(
      "National ID must be 9 digits,please provide a valid national ID"
    );
  }
  const updatedData = { nationality, countryFlag, nationalID };
  await updateGuest(session.user.guestId, updatedData);
}
