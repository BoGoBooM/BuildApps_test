import type React from 'react'
import type { User } from '../types/User'
import downArrow from '../assets/down.png'

type SortIconProps = {
  order: 'asc' | 'desc'
}

const SortIcon: React.FC<SortIconProps> = ({ order }) => (
  <img
    src={downArrow}
    alt={order === 'asc' ? 'Arrow up' : 'Arrow down'}
    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
      order === 'asc' ? 'rotate-0' : 'rotate-180'
    }`}
  />
)

type UserTableProps = {
  users: User[]
  loading: boolean
  sortField: string
  sortOrder: 'asc' | 'desc'
  onSort: (field: 'first' | 'last' | 'email' | 'gender' | 'nat') => void
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  sortField,
  sortOrder,
  onSort,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-2xl border border-[#e4d5c7] bg-[#fdfbf9]">
      <table className="w-full text-left border-collapse">
        <thead className="text-xs text-[#FDFDEA] uppercase bg-[#b0542c] tracking-wider select-none">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('first')}
            >
              <div className="flex items-center select-none">
                First Name
                {sortField === 'first' && <SortIcon order={sortOrder} />}
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('last')}
            >
              <div className="flex items-center select-none">
                Last Name
                {sortField === 'last' && <SortIcon order={sortOrder} />}
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('gender')}
            >
              <div className="flex items-center select-none">
                Gender
                {sortField === 'gender' && <SortIcon order={sortOrder} />}
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('email')}
            >
              <div className="flex items-center select-none">
                Email
                {sortField === 'email' && <SortIcon order={sortOrder} />}
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('nat')}
            >
              <div className="flex items-center select-none">
                Nationality
                {sortField === 'nat' && <SortIcon order={sortOrder} />}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eee1d4]">
          {users.map((user) => (
            <tr key={user.login.uuid} className="hover:bg-[#f0d8ce] transition-colors">
              <td className="px-4 py-3 text-[#3e2f25] font-medium">
                {loading ? (
                  <div className="h-5 w-28 bg-gray-300 animate-pulse rounded" />
                ) : (
                  user.name.first
                )}
              </td>
              <td className="px-4 py-3 text-[#3e2f25]">
                {loading ? (
                  <div className="h-5 w-24 bg-gray-300 animate-pulse rounded" />
                ) : (
                  user.name.last
                )}
              </td>
              <td className="px-4 py-3 text-[#3e2f25] capitalize">
                {loading ? (
                  <div className="h-5 w-20 bg-gray-300 animate-pulse rounded" />
                ) : (
                  user.gender
                )}
              </td>
              <td className="px-4 py-3 text-[#3e2f25]">
                {loading ? (
                  <div className="h-5 w-60 bg-gray-300 animate-pulse rounded" />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-4 py-3 text-[#3e2f25]">
                {loading ? (
                  <div className="h-5 w-36 bg-gray-300 animate-pulse rounded" />
                ) : (
                  user.nat
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
