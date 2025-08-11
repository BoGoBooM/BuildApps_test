type PaginationProps = {
  page: number
  setPage: (val: number) => void
  maxPages: number
  resetFilters: () => void
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  maxPages,
  resetFilters,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-4">
      <button
        className="px-5 py-2 text-sm font-medium rounded-lg bg-[#b0542c] hover:bg-[#a84b23] text-[#f0d8ce] transition disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous Page
      </button>

      <button
        className="px-5 py-2 text-sm font-medium rounded-lg bg-[#f0d8ce] hover:bg-[#e89a79] text-[#2d3f2b] transition disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === maxPages}
      >
        Next Page
      </button>

      <button
        type="button"
        className="px-5 py-2 text-sm font-medium rounded-lg border border-[#b0542c] text-[#b0542c] hover:bg-[#b0542c] hover:text-white transition"
        onClick={resetFilters}
      >
        Reset Filters
      </button>

      <div className="text-[#5b4636] mt-4">
        Page {page} of {maxPages}
      </div>
    </div>
  )
}
