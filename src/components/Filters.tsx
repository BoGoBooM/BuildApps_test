type FiltersProps = {
  gender: string
  setGender: (val: string) => void
  nationality: string
  setNationality: (val: string) => void
  nationalities: string[]
}

export const Filters: React.FC<FiltersProps> = ({
  gender,
  setGender,
  nationality,
  setNationality,
  nationalities,
}) => {
  return (
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
        {nationalities.map((nat) => (
          <option key={nat} value={nat}>
            {nat || 'All Nationalities'}
          </option>
        ))}
      </select>
    </div>
  )
}
