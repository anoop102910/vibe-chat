import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
interface Column {
  name: string;
  key: string; 
  className?: string;
  render?: (value: any) => React.ReactNode;
}
interface DataTableProps {
  data: any[];
  columns: Column[];
  caption: string;
  className?: string;
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ data, columns, caption, className }, ref) => {
    return (
      <Table className={cn("bg-white", className)} ref={ref}>
        <TableCaption>{caption}</TableCaption>
        <TableHeader >
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.name}>{column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(row => (
            <TableRow key={row._id}>
              {columns.map(column => (
                <TableCell key={column.key} className={cn(column.className)}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

