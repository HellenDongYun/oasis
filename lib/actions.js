"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must logged in!");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this reservation!");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) throw new Error("booking could not be deleted!");
  revalidatePath("/account/reservations");
}
//server action can not access the URl，所以这里没有办法用params
export async function updateReservationFormAction(formData) {
  const bookingid = Number(formData.get("bookingid"));
  //authentication
  const session = await auth();
  if (!session) throw new Error("You must logged in!");
  //authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingid))
    throw new Error("You are not authorized to update this reservation!");
  // const numGuests = formData.get("numGuests");
  // const reservation = formData.get("reservation");
  // const updatedData = { numGuests, reservation };
  //mutation
  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 600),
  };

  await updateBooking(bookingid, updatedData);
  //redirect to reservation page
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must logged in!");
  const newReservation = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 600),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "to be confirmed",
  };
  // const { error } = await supabase.from("bookings").insert([newReservation]);

  // if (error) {
  //   // throw new Error("Booking could not be created");
  //   throw new Error(error.message);
  // }
  await createBooking(newReservation);
  redirect("/cabins/thankyou");
}
