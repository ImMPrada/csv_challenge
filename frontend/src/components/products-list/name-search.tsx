export const NameSearch = ({value, onChange}: {value: string, onChange: (value: string) => void}) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
      />
    </div>
  );
}; 