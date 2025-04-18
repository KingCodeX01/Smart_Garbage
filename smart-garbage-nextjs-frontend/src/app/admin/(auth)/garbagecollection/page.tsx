import Garbagecollection from "@/components/admin/garbagecollection/garbagecollection";
import React from "react";
import { Payment, columns } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

export default async function Page() {
  // const data = await getData();

  return (
    <div>
      <Garbagecollection />
    </div>
  );
}
