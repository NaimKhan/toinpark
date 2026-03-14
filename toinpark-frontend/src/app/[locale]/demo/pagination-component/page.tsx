"use client";

import { useState } from "react";
import BasicPagination from "@/components/pagination/basic-pagination";

function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background text-white">
      <h2 className="text-5xl font-semibold mb-12">Pagination Demo</h2>

      <BasicPagination
        isLoading={false}
        totalPages={totalPages}
        hideForTotalPagesOne={false}
        onPageChange={(page: number) => setCurrentPage(page)}
        
      />

      <p className="mt-4 text-2xl font-bold text-default-200">
        Current Page: <span className="text-primary text-2xl font-bold">{currentPage}</span>
      </p>
    </div>
  );
}

export default PaginationComponent;
