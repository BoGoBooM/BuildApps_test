import React, { useEffect, useState } from 'react'
import { UserTable } from '../components/UserTable'
import { Filters } from '../components/Filters'
import { Pagination } from '../components/Pagination'
import type { User } from '../types/User'
import { useSearchParams } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [gender, setGender] = useState(searchParams.get('gender') || '')
  const [nationality, setNationality] = useState(searchParams.get('nat') || '')

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

  const [sortField, setSortField] = useState<'first' | 'last' | 'email' | 'gender' | 'nat' | ''>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('')
  const nationalities = ['', 'US', 'GB', 'FR', 'DE', 'UA']

  const API_URL = 'https://randomuser.me/api'

  useEffect(() => {
    setLoading(true)
    setError(null)

    const rawParams: Record<string, string> = {
      page: page.toString(),
      ...(gender && { gender }),
      ...(nationality && { nat: nationality }),
    }

    const urlParams = new URLSearchParams(rawParams)
    setSearchParams(urlParams)

    fetch(`${API_URL}?results=10&${urlParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results)
      })
      .catch(() => {
        setError('Failed to load users')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [gender, nationality, page])

  const sortedUser = [...users].sort((a, b) => {
    if (!sortField || !sortOrder) return 0

    let aValue = ''
    let bValue = ''

    if (sortField === 'first') {
      aValue = a.name.first
      bValue = b.name.first
    } else if (sortField === 'last') {
      aValue = a.name.last
      bValue = b.name.last
    } else if (sortField === 'email') {
      aValue = a.email
      bValue = b.email
    } else if (sortField === 'gender') {
      aValue = a.gender
      bValue = b.gender
    } else if (sortField === 'nat') {
      aValue = a.nat
      bValue = b.nat
    }

    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
  })

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc')
      } else if (sortOrder === 'desc') {
        setSortField('')
        setSortOrder('')
      } else {
        setSortOrder('asc')
      }
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const resetFilters = () => {
    setGender('')
    setNationality('')
    setPage(1)
    setSortField('')
    setSortOrder('')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-[#F9F6F3] text-[#4d392d] font-sans">
      <h1 className="text-3xl font-bold mb-6 text-[#5b4636]">BuildApps User Table</h1>

      <Filters
        gender={gender}
        setGender={setGender}
        nationality={nationality}
        setNationality={setNationality}
        nationalities={nationalities}
      />

      {loading && (
        <div className="flex items-center justify-center w-56 h-56 text-xs font-medium text-center p-0.5 leading-none rounded-full px-2 absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
          {/* Твій скелетон або лоадер тут */}
          Loading...
        </div>
      )}

      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
          <span className="font-medium">Info alert!</span> No users found.
        </div>
      )}

      {!error && users.length > 0 && (
        <UserTable
          users={sortedUser}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      <Pagination page={page} setPage={setPage} maxPages={10} resetFilters={resetFilters} />
    </div>
  )
}
