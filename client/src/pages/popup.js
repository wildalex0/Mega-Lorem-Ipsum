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
        handleClose();
      }
    };

    document.addEventListener('keydown', closeOnEsc);

    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, [handleClose]);
  return (
    <div className={`fixed left-0 top-0 w-full h-screen flex justify-center bg-slate-50/55 items-center  ${isClosing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div className="p-4 border-2 bg-slate-50 h-4/6" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className='grid-rows-1 grid-flow-col gap-1'>
          <div className='p-2 py-3 my-2'>
            <label htmlFor='id'>ID</label>
            <input type='number' className='w-full px-2 py-1 border border-gray-600 rounded-md bg-slate-200 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500' name="id" value={formData.id} onChange={handleChange} disabled placeholder="Id" />
            </div>
          <div className='p-2 py-3 my-2'>
            <label htmlFor='name'>Name</label>
            <input name="name"   className='w-full px-2 py-1 border border-gray-600 rounded-md bg-slate-200 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500'value={formData.name} onChange={handleChange} placeholder="Name" />
          </div>
          <div className='p-2 py-3 my-2'>
            <label htmlFor='age'>Age</label>
            <input name="age"  className='w-full px-2 py-1 border border-gray-600 rounded-md bg-slate-200 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500' value={formData.age} onChange={handleChange} placeholder="Age" />
          </div>
          <div className='p-2 py-3 my-2'>
            <label htmlFor='gender'>Gender</label>
            <input name="gender" className='w-full px-2 py-1 border border-gray-600 rounded-md bg-slate-200 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500' value={formData.gender} onChange={handleChange} placeholder="Gender" />

          </div>
          <div className='p-2 py-3 my-2'>
            <label htmlFor='gender'>Job</label>
            <input name="job" className='w-full px-2 py-1 border border-gray-600 rounded-md bg-slate-200 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500' value={formData.job} onChange={handleChange} placeholder="Job" />
          </div>
          <div className='px-2 py-1'>
            <button className="mt-2 p-2 w-full border-2 rounded-lg  dark:border-gray-600 cursor-pointer dark:hover:border-gray-500     dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300 " type="submit">Save</button>
          </div >
          <div className='px-2 py-1 '><button className="mt-2 p-2 w-full border-2 rounded-lg  dark:border-gray-600 cursor-pointer dark:hover:border-gray-500     dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300 "  type="button" onClick={handleClose}>Close</button></div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
