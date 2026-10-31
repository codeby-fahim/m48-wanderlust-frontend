// import { ChevronDown } from "lucide-react";
// import { DestinationsCard } from "@/components/destinations/DestinationsCard";
// import type { IDestinations } from "@/lib/type/destinations";

// // Visual-only filter placeholders — filtering is intentionally not wired up yet.
// const filterLabels = ["Category", "Price Range", "Sort By"];

// const AllDestinationsPage = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`
// );
//   const destinations: IDestinations[] = await res.json();

//   return (
//     <div className="flex-1 px-5 pt-24 pb-16 sm:px-10">
//       <div className="mx-auto w-full max-w-6xl">
//         <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">
//           Explore All Destinations
//         </h1>
//         <p className="mt-3 text-sm text-neutral-500">
//           Find your perfect travel experience from our curated collection
//         </p>

//         <div className="mt-8 grid gap-4 sm:grid-cols-3">
//           {filterLabels.map((label) => (
//             <div
//               key={label}
//               className="flex h-10 items-center justify-between border border-neutral-200 px-4 text-xs tracking-wide text-neutral-500 uppercase"
//             >
//               {label}
//               <ChevronDown className="size-4 text-neutral-400" />
//             </div>
//           ))}
//         </div>

//         <p className="mt-5 text-sm text-neutral-600">
//           Showing {destinations.length} destinations
//         </p>

//         <div className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
//           {destinations.map((destination) => (
//             <DestinationsCard
//               key={destination._id}
//               destination={destination}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllDestinationsPage;


import { ChevronDown } from "lucide-react";
import { DestinationsCard } from "@/components/destinations/DestinationsCard";
import type { IDestinations } from "@/lib/type/destinations";

// Fetch data at runtime instead of during build
export const dynamic = "force-dynamic";

const filterLabels = ["Category", "Price Range", "Sort By"];

const AllDestinationsPage = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(
    `${API_URL.replace(/\/$/, "")}/destinations`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch destinations: ${res.status}`);
  }

  const destinations: IDestinations[] = await res.json();

  return (
    <div className="flex-1 px-5 pt-24 pb-16 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">
          Explore All Destinations
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {filterLabels.map((label) => (
            <div
              key={label}
              className="flex h-10 items-center justify-between border border-neutral-200 px-4 text-xs tracking-wide text-neutral-500 uppercase"
            >
              {label}
              <ChevronDown className="size-4 text-neutral-400" />
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-neutral-600">
          Showing {destinations.length} destinations
        </p>

        <div className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationsCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDestinationsPage;