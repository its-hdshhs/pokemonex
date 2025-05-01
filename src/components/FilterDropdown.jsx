import React from 'react';
import '../styles/FilterDropdown.css';

const FilterDropdown = ({ types, selectedType, setSelectedType }) => {
  return (
    <select
      className="filter-dropdown"
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
    >
      <option value="">All Types</option>
      {types.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;