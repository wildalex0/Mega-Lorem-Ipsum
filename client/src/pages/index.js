import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Popup from './popup';
export default function Home() {
const [records, setRecords] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [highestId, setHighestId] = useState(-1);
const [historyRecords, setHistoryRecords] = useState([]);
const [stateLoaded, setStateLoaded] = useState(false);
useEffect(() => {
  fetchRecords();
  fetchHistory();
}, []);

useEffect(() => {
  if(showPopup){
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'scroll';
    
  }
}, [showPopup]);

useEffect(() => {
  if(!stateLoaded){
    populateInitialState();
  }
}, [historyRecords, stateLoaded, currentRecord, highestId])

const fetchRecords = async () => {
  const response = await axios.get('http://localhost:5000/api/records');
  const dt = response.data
  setRecords(dt);
  setHighestId(Number((dt[dt.length-1]).id));

};
const fetchHistory = async () => {
  const response = await axios.get('http://localhost:5000/api/history');
  const dt = response.data
  setHistoryRecords(dt);
}

const populateInitialState = () => {
    console.log(historyRecords);
    if(historyRecords.length > 0){
      if(historyRecords[0].details.popupOpen){
        const latestRecordId = historyRecords[0].recordId;
        if (latestRecordId > highestId){
          setCurrentRecord(null);
          setHighestId(latestRecordId);
        }else{
          let record = records.find(record => parseInt(record.id) === latestRecordId);
          console.log(latestRecordId);
          setCurrentRecord(record);
        }
        setShowPopup(true);
      }
      setStateLoaded(true);
    }
  
  
  


}
const logHistory = async (action, details, recordId = null) => {
  const historyEntry = {
    action,
    details,
    recordId
  };
  axios.post('http://localhost:5000/api/history', historyEntry)
}

const handleAdd = () => {
  setCurrentRecord(null);
  setShowPopup(true);
  logHistory('Popup Opened', {popupOpen: true}, highestId+1);
};

const handleEdit = record => {
  setCurrentRecord(record);
  setShowPopup(true);
  logHistory('Popup Opened', {popupOpen: true}, record.id);

};

const handleDelete = async id => {
  console.log(id);
  if (window.confirm('Are you sure you want to delete this record?')){
    await axios.delete(`http://localhost:5000/api/records/${id}`)
    fetchRecords();
    logHistory('Deleted', {popupOpen: false, id });

  }
};

const handleSave = async record => {
  if(parseInt(record.id) <= highestId){
    await axios.put(`http://localhost:5000/api/records/${record.id}`, record);
    logHistory('Updated', record);
  } else { 
    await axios.post(`http://localhost:5000/api/records/`, record);
    logHistory('Added', record);
  };
  fetchRecords();
  setShowPopup(false);
  logHistory('Popup Closed  - Action Complete', { popupOpen: false });
};

  return (
    <main className="flex flex-col min-h-screen">
  <p className="md:text-3xl text-lg font-semibold mx-5 mt-5">Mega Lorem Ipsum</p>
  <p className="md:text-xl text-base font-light mx-5 mb-6">Alessandro Gatt</p>

  <div className='my-2 flex justify-center font-semibold sticky top-0 overlay'>
  <button className="md:m-4 m-1 md:p-2 p-1 md:p4 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base  border-slate-500 cursor-pointer   dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300  " onClick={() =>handleAdd()} >Add</button>
  <button className="md:m-4 m-1 md:p-2 p-1 md:p4 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base  border-slate-500 cursor-pointer   dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300  " onClick={() => currentRecord  ? handleEdit(currentRecord) : alert('Please select a record to edit') }>Edit</button>
  <button className="md:m-4 m-1 md:p-2 p-1 md:p4 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base  border-slate-500 cursor-pointer   dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300  " onClick={() => currentRecord  ? handleDelete(currentRecord.id) : alert('Please select a record to delete')}>Delete</button>

  </div>
  <div className="flex justify-center ">
    <table className='border-collapse border-2 border-slate-500 w-full md:w-11/12 text-center'>
      <thead className='bg-slate-100'>
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
      onClose={() => [setShowPopup(false), logHistory('Popup Closed - Action Cancelled', {popupOpen: false})]}
      onSave={handleSave}
      lastUsedId={highestId}
    ></Popup>
  )}

</main>

  );
}
