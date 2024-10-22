import CabinList from "@/components/CabinList";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
// 这里写revalidate 这也cabin页面就会在60s 之后更新，重新获取新数据
//export const revalidate = 60; // revalidate this page every 60 seconds, here can not be a expression like 5*12, is not gonna work

export const metadata = {
  title: "Cabins",
};

const CabinsPage = async () => {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
};

export default CabinsPage;
