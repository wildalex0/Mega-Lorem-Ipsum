import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Popup from './popup';
export default function Home() {
const [records, setRecords] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [highestId, setHighestId] = useState(-1);
useEffect(() => {
  fetchRecords();
}, []);

const fetchRecords = async () => {
  const response = await axios.get('http://localhost:5000/api/records');
  const dt = response.data
  setRecords(dt);
  setHighestId(Number((dt[dt.length-1]).id));

};

const handleAdd = () => {
  setCurrentRecord(null);
  setShowPopup(true);
};

const handleEdit = record => {
  setCurrentRecord(record);
  setShowPopup(true);
};

const handleDelete = async id => {
  if (window.confirm('Are you sure you want to delete this record?')){
    await axios.delete(`http://localhost:5000/api/records:${id}`)
    fetchRecords();
  }
};

const handleSave = async record => {
  if(record.id){
    await axios.put(`http://localhost:5000/api/records:${record.id}`, record);
  } else { 
    await axios.post(`http://localhost:5000/api/records:${record.id}`, record);
  };
  fetchRecords();
  setShowPopup(false);
};

  return (
    <main className="flex flex-col min-h-screen">
  <p className="md:text-3xl text-lg font-semibold mx-5 mt-5">Mega Lorem Ipsum</p>
  <p className="md:text-xl text-base font-light mx-5 mb-6">Alessandro Gatt</p>
  
  <div className='my-2 flex justify-center font-semibold'>
  <button className="md:m-4 m-1 md:p-2 p-1 md:p4 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base  border-slate-500 cursor-pointer   dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300  " onClick={() =>handleAdd()} >Add</button>
  <button className="md:m-4 m-1 md:p-2 p-1 md:p4 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base  border-slate-500 cursor-pointer   dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300  " onClick={() => handleEdit(currentRecord)}>Edit</button>
  <button className="md:m-4 m-1 md:p-2 p-1 md:p4 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base  border-slate-500 cursor-pointer   dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300  " onClick={() =>handleDelete(currentRecord.id)}>Delete</button>

  </div>
  <div className="flex justify-center ">
    <table className='border-collapse border-2 border-slate-500 w-full md:w-11/12 text-center'>
      <thead className='bg-slate-100 '>
        <tr >
          <th className='px-3 border text-xs md:text-xl'>ID</th>
          <th className='px-3 border text-xs md:text-xl'>Name</th>
          <th className='px-3 border text-xs md:text-xl'>Age</th>
          <th className='px-3 border text-xs md:text-xl'>Gender</th>
          <th className='px-3 border text-xs md:text-xl'>Job</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.id} className={`hoverField text-xs md:text-lg ${currentRecord && record.id === currentRecord.id ? 'bg-slate-200' : ''}`} onClick={() => setCurrentRecord(record)}>
            <td className='border-l py-1  md:border-none'>{record.id}</td>
            <td className='border-l py-1 md:border-none'>{record.name}</td>
            <td className='border-l py-1  md:border-none'>{record.age}</td>
            <td className='border-l py-1  md:border-none'>{record.gender}</td>
            <td className='border-l py-1  md:border-none'>{record.job}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {showPopup && (
    <Popup
      record={currentRecord}
      onClose={() => setShowPopup(false)}
      onSave={handleSave}
      lastUsedId={highestId}
    ></Popup>
  )}

</main>

  );
}
