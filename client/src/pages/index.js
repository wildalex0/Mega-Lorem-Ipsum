import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Home() {
const [records, setRecords] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [currentRecords, setCurrentRecord] = useState(null);

useEffect(() => {
  fetchRecords();
}, []);

const fetchRecords = async () => {
  const response = await axios.get('http://localhost:5000/api/records');
  setRecords(response.data);
};

const hadleAdd = () => {
  setCurrentRecord(null);
  setShowPopup(true);
};

const handleEdit = record => {
  setCurrentRecord(record);
  setShowPopup(true);
};

const handleDelete = async id => {
  if (window.confirm('Are you sure you want to delete this record?')){
    await axios.delete(`http://localhost:5000/api/records?${id}`)
    fetchRecords();
  }
};

const handleSave = async record => {
  if(record.id){
    await axios.put(`http://localhost:5000/api/records?${record.id}`, record)
  } else { 
    await axios.post(`http://localhost:5000/api/records?${record.id}`, record)
  }
  fetchRecords();
  setShowPopup(false);
};

  return (
    <main className="flex flex-col min-h-screen">
  <p className="md:text-3xl text-lg font-semibold mx-5 mt-5">Mega Lorem Ipsum</p>
  <p className="md:text-xl text-base font-light mx-5 mb-4">Alessandro Gatt</p>
  <button onClick={() => console.log(interaction)}>check</button>
  <div className="flex justify-center ">
    <table className='border-collapse border-2 border-slate-500 w-full md:w-11/12 text-center'>
      <thead className='bg-slate-100'>
        <tr>
          <th className='px-3 border text-xs md:text-base'>ID</th>
          <th className='px-3 border text-xs md:text-base'>Name</th>
          <th className='px-3 border text-xs md:text-base'>Age</th>
          <th className='px-3 border text-xs md:text-base'>Gender</th>
          <th className='px-3 border text-xs md:text-base'>Job</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.id} className='hoverField text-xs md:text-base' onClick={(interaction) => setRecords(records[interaction.key-1])}>
            <td className='border-l border-t md:border-none'>{record.id}</td>
            <td className='border-l border-t md:border-none'>{record.name}</td>
            <td className='border-l border-t md:border-none'>{record.age}</td>
            <td className='border-l border-t md:border-none'>{record.gender}</td>
            <td className='border-l border-t md:border-none'>{record.job}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</main>

  );
}
