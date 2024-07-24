import React, { useState } from 'react';

const Popup = ({ record, onClose, onSave, lastUsedId }) => {
  const [formData, setFormData] = useState(record || { id: `${lastUsedId+1}`, name: '', age: '', gender: '', job: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <input name="id" value={formData.id} onChange={handleChange} disabled placeholder="Id" />
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
          <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
          <input name="job" value={formData.job} onChange={handleChange} placeholder="Job" />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
