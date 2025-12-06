"use client";

import React, { useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnDef,
    VisibilityState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { Settings, Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    removeRow: (rowIndex: number) => void;
}

// --- EDITABLE CELL COMPONENT ---
const EditableCell = ({ getValue, row, column, table }: any) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        setIsEditing(false);
        table.options.meta?.updateData(row.index, column.id, value);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onBlur();
        }
    };

    // 1. STATUS BADGE (VIEW MODE)
    if (!isEditing && column.id === "status") {
        const styles =
            value === "Active"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                : value === "Out of Stock"
                    ? "bg-red-500/20 text-red-400 border-red-500/50"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/50";

        return (
            <div
                onDoubleClick={() => setIsEditing(true)}
                className={`px-2 py-0.5 rounded text-xs border w-fit cursor-pointer font-medium ${styles}`}
            >
                {value}
            </div>
        );
    }

    // 2. STATUS DROPDOWN (EDIT MODE) - This is the new part!
    if (isEditing && column.id === "status") {
        return (
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                autoFocus
                className="bg-slate-950 text-white border border-blue-500 rounded px-2 py-1 w-full outline-none text-sm"
            >
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>
        );
    }

    // 3. STANDARD TEXT INPUT (EDIT MODE)
    if (isEditing) {
        return (
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                autoFocus
                className="bg-slate-950 text-white border border-blue-500 rounded px-2 py-1 w-full outline-none text-sm"
            />
        );
    }

    // 4. STANDARD TEXT (VIEW MODE)
    return (
        <div
            onDoubleClick={() => setIsEditing(true)}
            className="cursor-pointer py-1 px-1 hover:bg-slate-800 rounded truncate"
        >
            {column.id === "price" ? `£${value}` : value}
        </div>
    );
};

// --- MAIN TABLE COMPONENT ---
export function DataTable<TData, TValue>({
    columns,
    data,
    updateData,
    removeRow,
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            columnFilters,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        meta: {
            updateData,
            removeRow,
        },
        defaultColumn: {
            cell: EditableCell,
        },
    });

    return (
        <div className="space-y-4">
            {/* TOOLBAR */}
            <div className="flex justify-end relative">
                <button
                    onClick={() => setShowColumnMenu(!showColumnMenu)}
                    className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg text-sm transition-all text-white"
                >
                    <Settings size={16} /> Columns
                </button>

                {/* COLUMN MENU OVERLAY & DROPDOWN */}
                {showColumnMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowColumnMenu(false)}
                        />
                        <div className="absolute right-0 top-12 z-20 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 animate-in fade-in zoom-in-95">
                            <div className="text-xs font-semibold text-slate-500 uppercase mb-2 px-1">
                                Toggle Visibility
                            </div>
                            {table.getAllLeafColumns().map((column) => {
                                if (column.id === "actions") return null;
                                return (
                                    <label
                                        key={column.id}
                                        className="flex items-center px-2 py-2 hover:bg-slate-800 rounded cursor-pointer text-sm text-slate-300"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={column.getIsVisible()}
                                            onChange={column.getToggleVisibilityHandler()}
                                            className="mr-3 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-0 focus:ring-offset-0"
                                        />
                                        <span className="capitalize">{column.id}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* TABLE */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-900 text-slate-400 uppercase text-xs font-semibold">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-4 py-4 border-b border-slate-700 min-w-[100px] align-top"
                                        >
                                            <div className="flex items-center gap-2 mb-3 text-slate-300">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                            {header.column.getCanFilter() && (
                                                <div className="relative">
                                                    <Search
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600"
                                                        size={12}
                                                    />
                                                    <input
                                                        type="text"
                                                        value={
                                                            (header.column.getFilterValue() as string) ?? ""
                                                        }
                                                        onChange={(e) =>
                                                            header.column.setFilterValue(e.target.value)
                                                        }
                                                        placeholder="Filter..."
                                                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded pl-7 pr-2 py-1.5 text-xs text-white outline-none"
                                                    />
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-slate-800/50 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3 text-slate-300">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}