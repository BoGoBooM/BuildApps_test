import React, { useEffect, useState } from 'react';
import { UserTable } from '../components/UserTable';
import type { User } from '../types/User';
import { useSearchParams } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [gender, setGender] = useState(searchParams.get('gender') || '');
  const [nationality, setNationality] = useState(searchParams.get('nat') || '');

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [sortField, setSortField] = useState<'first' | 'last' | 'email' | 'gender' | 'nat' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setLoading(true);
    setError(null);

    const rawParams: Record<string, string> = {
      page: page.toString(),
      ...(gender && { gender }),
      ...(nationality && { nat: nationality }),
    };

    const urlParams = new URLSearchParams(rawParams);

    setSearchParams(urlParams);

    fetch(`https://randomuser.me/api/?results=10&${urlParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, [gender, nationality, page]);

  const sortedUser = [...users].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const aValue = sortField === 'first' ? a.name.first
      : sortField === 'last' ? a.name.last
        : sortField === 'email' ? a.email
          : sortField === 'gender' ? a.gender
            : sortField === 'nat' ? a.nat
              : '';
    const bValue = sortField === 'first' ? b.name.first
      : sortField === 'last' ? b.name.last
        : sortField === 'email' ? b.email
          : sortField === 'gender' ? b.gender
            : sortField === 'nat' ? b.nat
              : '';

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-[#F9F6F3] text-[#4d392d] font-sans">
      <h1 className="text-3xl font-bold mb-6 text-[#5b4636]">BuildApps User Table</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border border-[#c2a58b] rounded-md bg-[#f9f5f0] text-[#4d392d] p-2 shadow-sm focus:ring-[#d1bfa3] focus:border-[#d1bfa3]"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <select
          className="border border-[#c2a58b] rounded-md bg-[#f9f5f0] text-[#4d392d] p-2 shadow-sm focus:ring-[#d1bfa3] focus:border-[#d1bfa3]"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          <option value="">All Nationalities</option>
          <option value="us">US</option>
          <option value="gb">GB</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
          <option value="au">AU</option>
          <option value="ua">UA</option>
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center w-56 h-56   text-xs font-medium text-center p-0.5 leading-none rounded-full px-2 absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {error && <div>{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <span className="font-medium">Info alert!</span> No users found.
        </div>
      )}

      {!loading && !error && users.length > 0 && <UserTable users={sortedUser} onSort={handleSort} />}

      <div className="text-[#5b4636] mt-4">Page {page} of 10</div>

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
          disabled={page === 10}
        >
          Next Page
        </button>

        <button
          type="button"
          className="px-5 py-2 text-sm font-medium rounded-lg border border-[#b0542c] text-[#b0542c] hover:bg-[#b0542c] hover:text-white transition"
          onClick={() => {
            setGender('');
            setNationality('');
            setPage(1);
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
