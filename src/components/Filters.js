import { useState, useEffect } from 'react';

const Filters = ({ status, search, onStatusChange, onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search);
    }
  }); 

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleStatusChange = (e) => {
    onStatusChange(e.target.value);
  };

  const clearFilters = () => {
    setLocalSearch('');
    onSearchChange('');
    onStatusChange('');
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="status-select">Status</label>
        <select
          id="status-select"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search surveys..."
          value={localSearch}
          onChange={handleSearchInputChange}
        />
      </div>

      <button
        onClick={clearFilters}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Clear Filters
      </button>

      <div style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
        {(status || search) && (
          <span>
            Active filters: {status && `Status: ${status}`}
            {status && search && ', '}
            {search && `Search: "${search}"`}
          </span>
        )}
      </div>
    </div>
  );
};

export default Filters;
