import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-2xl mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search courses..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
