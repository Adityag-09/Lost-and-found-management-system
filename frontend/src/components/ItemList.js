import React, { useState, useEffect } from 'react';
import { getAllItems, deleteItem, updateItem } from '../api';
import '../styles/Dashboard.css';

function ItemList({ items, onItemsUpdate, currentUserId }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await getAllItems();
        onItemsUpdate(response.data.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm('Are you sure you want to delete this item?')
    ) {
      try {
        await deleteItem(id);
        onItemsUpdate(items.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditData(item);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await updateItem(id, editData);
      const updatedItem = response.data;
      onItemsUpdate(
        items.map((item) => (item._id === id ? updatedItem.data : item))
      );
      setEditingId(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  if (loading) return <div className="loading">Loading items...</div>;

  return (
    <div className="items-section">
      <h3>Items ({items.length})</h3>
      {items.length === 0 ? (
        <p className="no-items">No items found</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-header">
                <h4>{item.itemName}</h4>
                <span className={`item-type ${item.type.toLowerCase()}`}>
                  {item.type}
                </span>
              </div>

              {editingId === item._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editData.itemName}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        itemName: e.target.value,
                      })
                    }
                    placeholder="Item name"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        location: e.target.value,
                      })
                    }
                    placeholder="Location"
                  />
                  <div className="edit-buttons">
                    <button
                      onClick={() => handleSaveEdit(item._id)}
                      className="btn-save"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="item-description">{item.description}</p>
                  <p className="item-info">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="item-info">
                    <strong>Date:</strong>{' '}
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="item-info">
                    <strong>Posted by:</strong> {item.userId?.name}
                  </p>

                  <div className="item-actions">
                    {currentUserId === item.userId?._id && (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
