"use client";

import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";

export function DocsTable() {
  const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "Favourite Color", field: "col" },
    { title: "Date Of Birth", field: "dob" },
  ];

  const data = [
    { name: "Oli Bob", age: "12", col: "red", dob: "" },
    { name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
    {
      name: "Christine Lobowski",
      age: "42",
      col: "green",
      dob: "22/05/1982",
    },
    {
      name: "Brendon Philips",
      age: "125",
      col: "orange",
      dob: "01/08/1980",
    },
    {
      name: "Margret Marmajuke",
      age: "16",
      col: "yellow",
      dob: "31/01/1999",
    },
  ];
  return <ReactTabulator data={data} columns={columns} />;
}
