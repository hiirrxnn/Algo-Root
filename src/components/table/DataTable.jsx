import React from 'react';

const DataTable = ({ data, requestSort, sortConfig }) => {
  // Render the sorting icon based on sort configuration
  const renderSortIcon = (columnName) => {
    if (!sortConfig) return null;
    
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'ascending' ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 15l7-7 7 7" 
          />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      );
    }
    return null;
  };
  
  // Get table columns from first data item
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  
  // Format cell value based on type
  const formatCellValue = (value, key) => {
    if (value === null || value === undefined) return '-';
    
    if (key === 'status') {
      return (
        <span className={`badge ${
          value === 'Active' ? 'badge-success' :
          value === 'Pending' ? 'badge-warning' :
          value === 'Inactive' ? 'badge-danger' :
          'badge-info'
        }`}>
          {value}
        </span>
      );
    }
    
    if (key === 'progress') {
      return (
        <div className="w-full bg-secondary-200 rounded-full h-2.5">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (typeof value === 'number' && key.toLowerCase().includes('amount')) {
      return `$${value.toFixed(2)}`;
    }
    
    return String(value);
  };
  
  // Render table header
  const renderHeader = () => {
    return (
      <thead className="bg-secondary-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="table-header"
              onClick={() => requestSort(column)}
            >
              <div className="flex items-center">
                {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
                {renderSortIcon(column)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };
  
  // Render table rows
  const renderRows = () => {
    return (
      <tbody className="divide-y divide-secondary-200">
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr 
              key={index}
              className="hover:bg-secondary-50 transition-colors duration-150"
            >
              {columns.map((column) => (
                <td key={`${index}-${column}`} className="table-cell">
                  {formatCellValue(row[column], column)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td 
              colSpan={columns.length} 
              className="px-6 py-12 text-center text-secondary-500"
            >
              No data found
            </td>
          </tr>
        )}
      </tbody>
    );
  };
  
  return (
    <div className="table-container mb-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          {renderHeader()}
          {renderRows()}
        </table>
      </div>
    </div>
  );
};

export default DataTable;