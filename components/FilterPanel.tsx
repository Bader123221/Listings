import React, { useState, useEffect } from 'react';
import { COUNTRIES, LISTING_TYPES, LOCATIONS } from '../constants';

interface FilterPanelProps {
  filters: { country: string; state: string; city: string; type: string };
  setFilters: React.Dispatch<React.SetStateAction<{ country: string; state: string; city: string; type: string }>>;
}

const FilterSelect: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}> = ({ label, value, onChange, options, placeholder, disabled = false }) => (
  <div className="flex-1 min-w-[150px]">
    <label htmlFor={label} className="sr-only">{label}</label>
    <select
      id={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
    >
      <option value="">{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (filters.country) {
      setStates(Object.keys(LOCATIONS[filters.country] || {}));
    } else {
      setStates([]);
    }
  }, [filters.country]);

  useEffect(() => {
    if (filters.country && filters.state) {
      setCities(LOCATIONS[filters.country]?.[filters.state] || []);
    } else {
      setCities([]);
    }
  }, [filters.state]);

  const handleFilterChange = (field: keyof typeof filters) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters(prev => {
        const newFilters = {...prev, [field]: value};
        if (field === 'country') {
            newFilters.state = '';
            newFilters.city = '';
            setCities([]);
        }
        if (field === 'state') {
            newFilters.city = '';
        }
        return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ country: '', state: '', city: '', type: '' });
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4 items-center">
        <FilterSelect
          label="Country"
          value={filters.country}
          onChange={handleFilterChange('country')}
          options={COUNTRIES}
          placeholder="All Countries"
        />
        <FilterSelect
          label="State"
          value={filters.state}
          onChange={handleFilterChange('state')}
          options={states}
          placeholder="All States"
          disabled={!filters.country}
        />
        <FilterSelect
          label="City"
          value={filters.city}
          onChange={handleFilterChange('city')}
          options={cities}
          placeholder="All Cities"
          disabled={!filters.state}
        />
        <FilterSelect
          label="Type"
          value={filters.type}
          onChange={handleFilterChange('type')}
          options={LISTING_TYPES}
          placeholder="All Types"
        />
        <button 
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
        >
            Clear
        </button>
      </div>
    </div>
  );
};
