import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function TabelLoadingSkeleton({
  coloumnNumber,
  rowNumber,
}: {
  coloumnNumber: number;
  rowNumber: number;
}) {
  return (
    <div className="border border-soft-border overflow-hidden rounded-lg">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {Array.from({ length: coloumnNumber }).map((_e, i) => (
              <TableHead key={i}>
                <Skeleton className="h-3 w-[100px]" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowNumber }).map((_e, indx) => (
            <TableRow key={indx}>
              {Array.from({ length: coloumnNumber }).map((_e, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-5 w-[100px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
