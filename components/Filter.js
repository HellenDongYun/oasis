"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  //因为在client components 里面不能用searchParams(只能在page.js server page里用), 所以要引入useSearchParams

  //pathname 获取当前url的路径名，不包括查询参数
  const pathname = usePathname();

  //searchParams 获取当前url的查询参数,
  const searchParams = useSearchParams();

  //router 获取当前url的路径，动态更改URL的查询参数而不会触发页面刷新
  const router = useRouter();

  //get the current filter from the searchParams
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    //从现有的查询参数重创建一个查询对象
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="border border-primary-700 flex">
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="all"
      >
        All Cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="small"
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="medium"
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="large"
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 hover:text-white ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
