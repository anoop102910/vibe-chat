import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface TableSkeletonProps {
  rows: number;
  cols: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows, cols }) => {
  return (
    <Table className="bg-white">
      <TableCaption>
        <Skeleton className="h-4 w-1/3" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          {Array.from({ length: cols }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
