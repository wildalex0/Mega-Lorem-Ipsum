import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Popup from './popup';

export default function Home() {
    //Data related states
    const [records, setRecords] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [highestId, setHighestId] = useState(-1);
    //Misc State for popup
    const [showPopup, setShowPopup] = useState(false);

    //State loading states
    const [historyRecords, setHistoryRecords] = useState([]);
    const [stateLoaded, setStateLoaded] = useState(false);

    // Page related states & variables
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 50;
    const totalPages = Math.ceil(records.length / recordsPerPage);

    useEffect(() => {
        //Running all data-fetching functions
        fetchRecords();
        fetchHistory();
    }, []);

    useEffect(() => {
        //Runs on load and whenever the showPopup variable changes
        if(showPopup){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }, [showPopup]);

    useEffect(() => {
        //Once all the dependant variables are set, the previous state is loaded. This function only runs once at the loading of the site.
        if(!stateLoaded){
            populateInitialState();
        }
    }, [historyRecords, stateLoaded, currentRecord, highestId]);

    const fetchRecords = async () => {
        //Requests and gets all the data from the backend
        const response = await axios.get('http://localhost:5000/api/records');
        const dt = response.data;
        setRecords(dt);
        setHighestId(Number((dt[dt.length-1]).id));
    };

    const fetchHistory = async () => {
        //Requests and gets all the historical data from the backend. 
        const response = await axios.get('http://localhost:5000/api/history');
        const dt = response.data;
        setHistoryRecords(dt);
    };

    const populateInitialState = () => {
        //Checks that historical records is longer than 0. Since the first record is always the latest, it's the piece of data that is followed and used.
        if(historyRecords.length > 0){
            //Checks whether the popupOpen variable is true. If it is not, the process is skipped and the state isn't checked until load.
            if(historyRecords[0].details.popupOpen){
                const latestRecordId = historyRecords[0].recordId;
                if (latestRecordId > highestId){
                    //If the latestRecordedId is greater due to it being from an add function, the add details are added and populated
                    setCurrentRecord(null);
                    setHighestId(latestRecordId);
                } else {
                    //If the latestRecordedId is lesser or equal due to it being from an edit function, the record in question is found and the data is set.
                    let record = records.find(record => parseInt(record.id) === latestRecordId);
                    console.log(latestRecordId);
                    setCurrentRecord(record);
                }
                setShowPopup(true);
            }
            setStateLoaded(true);
        }
    };

    const logHistory = async (action, details, recordId = null) => {
        //Sends historical data to backend server.
        const historyEntry = {
            action,
            details,
            recordId
        };
        axios.post('http://localhost:5000/api/history', historyEntry);
    };

    const handleAdd = () => {
        //Sets states for adding. Popup opens due to setShowPopup var
        setCurrentRecord(null);
        setShowPopup(true);
        //Logs that the popup is opened, with the id that is being added for.
        logHistory('Popup Opened', {popupOpen: true}, highestId+1);
    };

    const handleEdit = record => {
        //Sets states for editing. Popup opens due to setShowPopup var. Takes a record as arg as it is required to fill in fields.
        setCurrentRecord(record);
        setShowPopup(true);
        //Logs that the popup is opened, with the id that is being edited so it can be loaded again later.
        logHistory('Popup Opened', {popupOpen: true}, record.id);
    };

    const handleDelete = async id => {
        //Checks if the user wants to delete the record using an window confirm.
        if (window.confirm('Are you sure you want to delete this record?')){
            //sends a delete request and reloads the data.
            await axios.delete(`http://localhost:5000/api/records/${id}`);
            fetchRecords();
            //Logs that the popup is closed and that a delete action has been taken.
            logHistory('Deleted', {popupOpen: false, id });
        }
    };

    const handleSave = async record => {
        //Form data is passed from the popup.
        //Compares the submitted ID to the highestID - which isn't updated yet.
        if(parseInt(record.id) <= highestId){
            //uses a put request due to a record already existing
            await axios.put(`http://localhost:5000/api/records/${record.id}`, record);
            logHistory('Updated', record);
        } else { 
            //uses a post request to create a new record in the database
            await axios.post(`http://localhost:5000/api/records/`, record);
            logHistory('Added', record);
        }
        fetchRecords();
        setShowPopup(false);
        logHistory('Popup Closed - Action Complete', { popupOpen: false });
    };

    const changePage = (newPage) => {
        //Uses previous set variables to set the currentPage state to whatever the newPage varaible is.
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    //Takes a part of the records array, that includes only 50 (recordsPerPage) records depending on which the currentPage is
    const displayedRecords = records.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    return (
        <main className="flex flex-col min-h-screen">
            <p className="md:text-3xl text-lg font-semibold mx-5 mt-5">Mega Lorem Ipsum</p>
            <p className="md:text-xl text-base font-light mx-5 mb-6">Alessandro Gatt</p>

            <div className='my-2 flex justify-center font-semibold sticky top-0 overlay'>
                <button className="md:m-4 m-1 md:p-2 p-1 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base border-slate-500 cursor-pointer dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300" onClick={() => handleAdd()}>Add</button>
                <button className="md:m-4 m-1 md:p-2 p-1 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base border-slate-500 cursor-pointer dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300" onClick={() => currentRecord ? handleEdit(currentRecord) : alert('Please select a record to edit')}>Edit</button>
                <button className="md:m-4 m-1 md:p-2 p-1 md:w-1/4 w-1/3 border-2 rounded-lg md:text-lg text-base border-slate-500 cursor-pointer dark:bg-slate-200 bg-slate-500 dark:hover:bg-slate-300" onClick={() => currentRecord ? handleDelete(currentRecord.id) : alert('Please select a record to delete')}>Delete</button>
            </div>

            <div className="flex justify-center">
                <table className='border-collapse border-2 border-slate-500 w-full md:w-11/12 text-center'>
                    <thead className='bg-slate-100'>
                        <tr>
                            <th className='px-3 border text-xs md:text-xl'>ID</th>
                            <th className='px-3 border text-xs md:text-xl'>Name</th>
                            <th className='px-3 border text-xs md:text-xl'>Age</th>
                            <th className='px-3 border text-xs md:text-xl'>Gender</th>
                            <th className='px-3 border text-xs md:text-xl'>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedRecords.map(record => (
                            <tr key={record.id} className={`hoverField text-xs md:text-lg ${currentRecord && record.id === currentRecord.id ? 'bg-slate-200' : ''}`} onClick={() => setCurrentRecord(record)}>
                                <td className='border-l py-1 md:border-none'>{record.id}</td>
                                <td className='border-l py-1 md:border-none'>{record.name}</td>
                                <td className='border-l py-1 md:border-none'>{record.age}</td>
                                <td className='border-l py-1 md:border-none'>{record.gender}</td>
                                <td className='border-l py-1 md:border-none'>{record.job}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-4">
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
            
            { //Checks that showPopup is true before displaying the <popup> tag
            showPopup && (
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
