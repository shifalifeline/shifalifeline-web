import { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
}

export default function DataTable({
  headers,
  children,
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}