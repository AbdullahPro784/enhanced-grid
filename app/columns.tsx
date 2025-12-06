"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem } from "./types"; // Import from the file we just made
import { Trash2, Hand } from "lucide-react";

export const columns: ColumnDef<InventoryItem>[] = [
    { accessorKey: "albumName", header: "Album Name", size: 200 },
    { accessorKey: "artist", header: "Artist", size: 150 },
    { accessorKey: "year", header: "Year", size: 80 },
    { accessorKey: "status", header: "Status", size: 120 },
    { accessorKey: "stock", header: "Stock", size: 80 },
    { accessorKey: "incoming", header: "Incoming", size: 80 },
    { accessorKey: "price", header: "Est. Value", size: 100 },
    {
        id: "actions",
        header: "Actions",
        enableColumnFilter: false,
        cell: ({ row, table }) => {
            // We get our custom functions from the table meta
            const meta = table.options.meta;

            return (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* HOLD BUTTON */}
                    <button
                        onClick={() => meta?.updateData(row.index, "status", "On Hold")}
                        className="text-xs flex items-center gap-1 bg-slate-800 hover:bg-amber-900/30 hover:text-amber-500 border border-slate-600 px-2 py-1 rounded text-white transition"
                        title="Set status to On Hold"
                    >
                        <Hand size={12} /> Hold
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                        onClick={() => meta?.removeRow(row.index)}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-900/20 p-1 rounded transition"
                        title="Delete Row"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            );
        },
    },
];