import { useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { SearchFilters } from "../../types";

interface SearchFilterProps {
  onFilterChange: (filters: SearchFilters) => void;
}

const SearchFilter = ({ onFilterChange }: SearchFilterProps) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onFilterChange({ query, location, skill });
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, location, skill, onFilterChange]);

  const handleClearFilters = () => {
    setQuery("");
    setLocation("");
    setSkill("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search by name, role, or company..."
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="btn btn-outline py-2"
            >
              {expanded ? "Less filters" : "More filters"}
            </button>

            {(query || location || skill) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="btn btn-outline py-2 text-gray-600"
              >
                <X size={16} />
                <span className="sr-only">Clear filters</span>
              </button>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Filter by location..."
              />
            </div>

            <div>
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Filter by skill..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
