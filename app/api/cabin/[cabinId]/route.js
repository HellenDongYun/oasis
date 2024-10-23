import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

export async function GET(request, { params }) {
  const cabinId = params.cabinId;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "cabin not found!" });
  }
}

// export async function PUT() {}
// export async function DELETE() {}
// export async function POST() {}
