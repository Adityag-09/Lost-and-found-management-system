import React, { useState } from 'react';
import { createItem } from '../api';
import '../styles/Dashboard.css';

function AddItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: {
      phone: '',
      email: '',
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact_')) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name.replace('contact_', '')]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await createItem(formData);
      onItemAdded(response.data.data);
      setFormData({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        date: new Date().toISOString().split('T')[0],
        contactInfo: {
          phone: '',
          email: '',
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-form">
      <h3>Add New Item</h3>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="itemName">Item Name *</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              placeholder="Enter item name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter detailed description"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Where was it lost/found?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact_phone">Phone *</label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              value={formData.contactInfo.phone}
              onChange={handleChange}
              required
              placeholder="Your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact_email">Email *</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Adding item...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;
