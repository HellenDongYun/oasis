import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import TextExpander from "@/components/TextExpander";
import { getCabin, getCabins } from "@/lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.slug);
  const { name, description } = cabin;
  return {
    title: `Cabin ${name}`,
    description: description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  //一般是写在fetch 函数里， 这里没有 因为直接连的supabase数据库， 也可以以这种方式直接引用这个函数
  noStore();
  //waterfull style fetching date will slow down the process of data fetching
  const cabin = await getCabin(params.slug);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // this is the way to improve waterfull style fetching data
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.slug),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.slug),
  // ]);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <div>
            <Image
              fill
              className="object-cover"
              src={image}
              alt={`Cabin ${name}`}
            />
          </div>
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
