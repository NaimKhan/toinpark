import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

function BasicPagination() {
  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-center text-lg rounded-md">
      {/* Left side text */}
      <p className="text-default-200 flex-none text-center">Showing 1 to 10 of 21 entries</p>

      {/* Middle pagination controls */}
      <div className="flex items-center justify-center space-x-2 flex-1">
        <Button className="px-4 py-2 transition bg-muted text-default-100 font-medium hover:text-default-900">
          Previous
        </Button>
        <Button className="font-medium px-4 py-2 transition bg-muted text-default-100 hover:text-default-900">
          Next
        </Button>
      </div>

      {/* Right side page numbers */}
      <Pagination className="w-fit m-0 p-0 flex-none text-center">
        <PaginationContent className="space-x-2">
          <PaginationItem>
            <PaginationLink
              href="#"
              className="text-primary text-lg hover:bg-transparent font-medium hover:text-primary"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hover:text-primary text-lg text-default-100 hover:bg-transparent">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hover:text-primary text-lg text-default-100 hover:bg-transparent">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hover:text-primary text-lg text-default-100 hover:bg-transparent">
              4
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default BasicPagination;
