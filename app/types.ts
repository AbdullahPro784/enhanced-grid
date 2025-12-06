import { RowData } from "@tanstack/react-table";

export type InventoryItem = {
    id: number;
    albumName: string;
    artist: string;
    year: number;
    status: "Active" | "Out of Stock" | "On Hold";
    stock: number;
    incoming: number;
    price: number;
};

// This helps TypeScript understand our custom "update" and "remove" functions
declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void;
        removeRow: (rowIndex: number) => void;
    }
}