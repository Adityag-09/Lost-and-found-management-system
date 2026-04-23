import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddItemForm from '../components/AddItemForm';
import ItemList from '../components/ItemList';
import SearchBar from '../components/SearchBar';
import '../styles/Dashboard.css';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleItemsUpdate = (newItems) => {
    setItems(newItems);
    setFilteredItems(newItems);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Lost & Found Management System</h1>
          <p>Welcome, {user?.name}!</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="controls-section">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            {showAddForm ? 'Cancel' : '+ Add New Item'}
          </button>
        </div>

        {showAddForm && (
          <AddItemForm
            onItemAdded={(newItem) => {
              setItems([newItem, ...items]);
              setFilteredItems([newItem, ...items]);
              setShowAddForm(false);
            }}
          />
        )}

        <SearchBar onSearch={handleSearch} />

        <ItemList
          items={filteredItems}
          onItemsUpdate={handleItemsUpdate}
          currentUserId={user?.id}
        />
      </div>
    </div>
  );
}

export default Dashboard;
