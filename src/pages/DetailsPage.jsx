import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import DataTable from '../components/table/DataTable';
import SearchFilter from '../components/table/SearchFilter';
import Pagination from '../components/table/Pagination';
import { mockData } from '../data/mockData';  // Make sure this is a named export

const DetailsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending'
  });
  
  // Filter the data based on search term
  const filteredData = mockData.filter(item => {
    return Object.values(item).some(
      value => 
        value !== null && 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Sort the data
  const sortedData = React.useMemo(() => {
    const sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] === null) return 1;
        if (b[sortConfig.key] === null) return -1;
        
        const aValue = typeof a[sortConfig.key] === 'string' 
          ? a[sortConfig.key].toLowerCase() 
          : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' 
          ? b[sortConfig.key].toLowerCase() 
          : b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="page-container">
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold text-secondary-900">Details</h1>
              <p className="text-secondary-600 mt-1">View and manage your data</p>
            </div>
            
            <div className="card">
              <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchFilter 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                />
                
                <div className="flex items-center gap-2">
                  <label htmlFor="itemsPerPage" className="text-sm text-secondary-700">
                    Show:
                  </label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="form-input py-1 text-sm w-20"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              
              <DataTable
                data={currentItems}
                requestSort={requestSort}
                sortConfig={sortConfig}
              />
              
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={sortedData.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsPage;