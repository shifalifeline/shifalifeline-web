interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-800"
      >
        Previous
      </button>

      <span className="text-sm text-slate-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-800"
      >
        Next
      </button>
    </div>
  );
}