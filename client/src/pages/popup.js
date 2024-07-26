import React, { useState, useEffect } from 'react';

const Popup = ({ record, onClose, onSave, lastUsedId }) => {
  const [formData, setFormData] = useState(record || { id: lastUsedId+1 , name: '', age: '', gender: '', job: '' });
  const [isClosing, setClosing ] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose();
    }, 300);
  }
  useEffect(() => {
    const closeOnEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeOnEsc);

    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, [handleClose]);
  return (
    <div className={`fixed left-0 top-0 w-full h-screen flex justify-center bg-slate-50/55 items-center  ${isClosing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div className="p-4 border-2 bg-slate-50 h-2/4" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className='grid-rows-1 grid-flow-col gap-1'>
          <div className='p-2 py-4 my-2'>
            <label htmlFor='id'>ID:  </label>
            <input type='number' className='w-full' name="id" value={formData.id} onChange={handleChange} disabled placeholder="Id" />
            </div>
          <div className='p-2 py-4 my-2'>
            <label htmlFor='name'>Name:  </label>
            <input name="name"   className='w-full'value={formData.name} onChange={handleChange} placeholder="Name" />
          </div>
          <div className='p-2 py-4 my-2'>
            <label htmlFor='age'>Age:  </label>
            <input name="age" va className='w-full'lue={formData.age} onChange={handleChange} placeholder="Age" />
          </div>
          <div className='p-2 py-4 my-2'>
            <label htmlFor='gender'>Gender:  </label>
            <input name="gender" className='w-full' value={formData.gender} onChange={handleChange} placeholder="Gender" />

          </div>
          <div className='p-2 py-4 my-2'>
            <label htmlFor='gender'>Job:  </label>
            <input name="job" va className='w-full'lue={formData.job} onChange={handleChange} placeholder="Job" />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
