"use client";

import React, { useState } from "react";
import { DataTable } from "./data-table"; // We will make this next
import { columns } from "./columns";      // Import the columns
import { InventoryItem } from "./types";  // Import the type

// DUMMY DATA
const defaultData: InventoryItem[] = [
  { id: 1, albumName: "Dreams of You", artist: "David Nearing", year: 1978, status: "Active", stock: 8, incoming: 20, price: 32.0 },
  { id: 2, albumName: "Blue Skies", artist: "Maya Allen", year: 2022, status: "Out of Stock", stock: 0, incoming: 0, price: 25.0 },
  { id: 3, albumName: "Heaven", artist: "Velvet Wave", year: 1989, status: "Active", stock: 10, incoming: 5, price: 20.0 },
  { id: 4, albumName: "Life Matters", artist: "Danielle James", year: 2007, status: "On Hold", stock: 4, incoming: 15, price: 28.5 },
  { id: 5, albumName: "Neon Nights", artist: "The Midnight", year: 2018, status: "Active", stock: 55, incoming: 10, price: 19.99 },
  { id: 6, albumName: "Dark Side of the Moon", artist: "Pink Floyd", year: 1973, status: "Active", stock: 120, incoming: 50, price: 45.0 },
  { id: 7, albumName: "Midnights", artist: "Taylor Swift", year: 2022, status: "Active", stock: 200, incoming: 100, price: 35.0 },
  { id: 8, albumName: "Kind of Blue", artist: "Miles Davis", year: 1959, status: "On Hold", stock: 12, incoming: 0, price: 55.0 },
  { id: 9, albumName: "Random Access Memories", artist: "Daft Punk", year: 2013, status: "Out of Stock", stock: 0, incoming: 30, price: 38.0 },
  { id: 10, albumName: "Rumours", artist: "Fleetwood Mac", year: 1977, status: "Active", stock: 85, incoming: 25, price: 29.99 },
  { id: 11, albumName: "AM", artist: "Arctic Monkeys", year: 2013, status: "Active", stock: 44, incoming: 10, price: 22.0 },
  { id: 12, albumName: "Thriller", artist: "Michael Jackson", year: 1982, status: "Active", stock: 150, incoming: 0, price: 30.0 },
  { id: 13, albumName: "Back to Black", artist: "Amy Winehouse", year: 2006, status: "On Hold", stock: 5, incoming: 15, price: 27.5 },
  { id: 14, albumName: "Abbey Road", artist: "The Beatles", year: 1969, status: "Active", stock: 90, incoming: 40, price: 40.0 },
  { id: 15, albumName: "Currents", artist: "Tame Impala", year: 2015, status: "Active", stock: 32, incoming: 12, price: 26.0 },
  { id: 16, albumName: "Lemonade", artist: "Beyoncé", year: 2016, status: "Out of Stock", stock: 0, incoming: 5, price: 31.0 },
  { id: 17, albumName: "Nevermind", artist: "Nirvana", year: 1991, status: "Active", stock: 67, incoming: 20, price: 24.5 },
  { id: 18, albumName: "The Queen Is Dead", artist: "The Smiths", year: 1986, status: "On Hold", stock: 3, incoming: 0, price: 33.0 },
  { id: 19, albumName: "OK Computer", artist: "Radiohead", year: 1997, status: "Active", stock: 45, incoming: 15, price: 28.0 },
  { id: 20, albumName: "1989 (Taylor's Version)", artist: "Taylor Swift", year: 2023, status: "Active", stock: 300, incoming: 150, price: 36.0 },
  { id: 21, albumName: "Legend", artist: "Bob Marley", year: 1984, status: "Active", stock: 110, incoming: 30, price: 21.0 },
  { id: 22, albumName: "Purple Rain", artist: "Prince", year: 1984, status: "Out of Stock", stock: 0, incoming: 10, price: 29.0 },
  { id: 23, albumName: "Hounds of Love", artist: "Kate Bush", year: 1985, status: "Active", stock: 22, incoming: 8, price: 34.0 },
  { id: 24, albumName: "Ziggy Stardust", artist: "David Bowie", year: 1972, status: "Active", stock: 50, incoming: 20, price: 39.0 },
  { id: 25, albumName: "Discovery", artist: "Daft Punk", year: 2001, status: "On Hold", stock: 6, incoming: 0, price: 42.0 },
  { id: 26, albumName: "Channel Orange", artist: "Frank Ocean", year: 2012, status: "Out of Stock", stock: 0, incoming: 0, price: 25.0 },
  { id: 27, albumName: "Folklore", artist: "Taylor Swift", year: 2020, status: "Active", stock: 78, incoming: 22, price: 32.0 },
  { id: 28, albumName: "Future Nostalgia", artist: "Dua Lipa", year: 2020, status: "Active", stock: 60, incoming: 30, price: 28.0 },
  { id: 29, albumName: "Born to Run", artist: "Bruce Springsteen", year: 1975, status: "Active", stock: 40, incoming: 15, price: 23.0 },
  { id: 30, albumName: "Blue", artist: "Joni Mitchell", year: 1971, status: "On Hold", stock: 2, incoming: 5, price: 50.0 },
  { id: 31, albumName: "Pet Sounds", artist: "The Beach Boys", year: 1966, status: "Active", stock: 28, incoming: 10, price: 45.0 },
  { id: 32, albumName: "Hotel California", artist: "Eagles", year: 1976, status: "Active", stock: 95, incoming: 25, price: 26.0 }
];

export default function InventoryPage() {
  const [data, setData] = useState(() => defaultData);

  // LOGIC: Update a cell
  const handleUpdateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return { ...old[rowIndex]!, [columnId]: value };
        }
        return row;
      })
    );
  };

  // LOGIC: Delete a row
  const handleRemoveRow = (rowIndex: number) => {
    setData((old) => old.filter((_row, index) => index !== rowIndex));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Inventory Manager</h1>
        <p className="text-slate-400 text-sm">v2.0 Modular System</p>
      </div>

      {/* Render the Table Component */}
      <DataTable
        columns={columns}
        data={data}
        updateData={handleUpdateData}
        removeRow={handleRemoveRow}
      />
    </div>
  );
}