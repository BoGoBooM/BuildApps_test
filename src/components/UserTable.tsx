import type React from 'react';
import type { User } from '../types/User';

type UserTableProps = {
  users: User[];
  onSort: (field: 'first' | 'last' | 'email' | 'gender' | 'nat') => void
}

export const UserTable: React.FC<UserTableProps> = ({ users, onSort }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-2xl border border-[#e4d5c7] bg-[#fdfbf9]">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-[#FDFDEA] uppercase bg-[#b0542c] tracking-wider transition">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('first')}
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('last')}
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('gender')}
            >
              Gender
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('email')}
            >
              Email
            </th>
            <th
              scope="col"
              className="px-4 py-3 cursor-pointer hover:text-[#f0d8ce] transition-colors"
              onClick={() => onSort('nat')}
            >
              Nationality
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eee1d4]">
          {users.map((user) => (
            <tr
              key={user.login.uuid}
              className="hover:bg-[#f0d8ce] transition-colors"
            >
              <td className="px-4 py-3 text-[#3e2f25] font-medium">
                {user.name.first}
              </td>
              <td className="px-4 py-3 text-[#3e2f25]">{user.name.last}</td>
              <td className="px-4 py-3 text-[#3e2f25] capitalize">{user.gender}</td>
              <td className="px-4 py-3 text-[#3e2f25]">{user.email}</td>
              <td className="px-4 py-3 text-[#3e2f25]">{user.nat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
