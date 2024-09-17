import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Space, Table, message, Input } from 'antd';
import axios from 'axios';
import '../pages/Booking.css'; // Import the custom CSS file

const Bookings = () => {
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    const fromDateRef = useRef(null);
    const toDateRef = useRef(null);
    const searchRef = useRef(null);

    const deleteHandler = async (id) => {
        try {
            let URL = `https://privatejetcharters-server-ttz1.onrender.com/api/admin/deletebookingbyid/${id}`;
            console.log("Deleting booking with ID:", id);
            await axios.delete(URL);
            message.success('Data deleted successfully');
            fetchData(); // Refetch data after deletion
        } catch (err) {
            console.log(err);
            message.error('Failed to delete data');
        }
    };

    let fetchData = async () => {
        try {
            const URL = 'https://privatejetcharters-server-ttz1.onrender.com/api/admin/getallbookings';
            let resObj = await axios.get(URL);
            let arrayOfData = resObj.data.data.map((element, index) => {
                return {
                    key: element._id, // Using _id as key
                    sl_no: index + 1,
                    email: element.email,
                    phone: element.phone,
                    from: element.from,
                    to: element.to,
                    type: element.type,
                    passengers: element.passengers,
                    date: formatDate(element.date),
                    action: element._id,
                };
            });
            setData(arrayOfData);
            setFilteredData(arrayOfData); // Set filtered data initially to full data
            return arrayOfData;
        }
        catch (error) {
            console.log(error)
            message.error('Failed to Fetch Data Network issues')
        }
    };

    const formatDate = (value) => {
        const date = new Date(value);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${mm}-${dd}-${yy}`;
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const sortedResult = async () => {
        try {
            const url = 'https://privatejetcharters-server-ttz1.onrender.com/api/admin/sorted';
            const payload = {
                from: fromDate,
                to: toDate,
            };

            console.log("Sending payload to sorted API:", payload);

            const resObj = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Response from sorted API:", resObj);

            if (resObj.data && resObj.data.data) {
                let arrayOfData = resObj.data.data.map((element, index) => {
                    return {
                        key: element._id, // Using _id as key
                        sl_no: index + 1,
                        email: element.email,
                        phone: element.phone,
                        from: element.from,
                        to: element.to,
                        type: element.type,
                        passengers: element.passengers,
                        date: formatDate(element.date),
                        action: element._id,
                    };
                });
                setData(arrayOfData);
                setFilteredData(arrayOfData);
            } else {
                message.error('No data received from API');
            }
        } catch (error) {
            console.error('Error fetching sorted data:', error);
            message.error('Failed to fetch sorted data');
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = data.filter(item =>
            item.email.toLowerCase().includes(value) ||
            item.phone.toLowerCase().includes(value) ||
            item.from.toLowerCase().includes(value) ||
            item.to.toLowerCase().includes(value) ||
            item.type.toLowerCase().includes(value) ||
            item.passengers.toString().toLowerCase().includes(value) ||
            item.date.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setFromDate('');
        setToDate('');
        if (fromDateRef.current) fromDateRef.current.value = '';
        if (toDateRef.current) toDateRef.current.value = '';
        if (searchRef.current) searchRef.current.value = '';
        fetchData();
    };

    const columns = [
        {
            title: 'SL_No',
            dataIndex: 'sl_no',
            key: 'sl_no',
            sorter: (a, b) => a.sl_no - b.sl_no,
            sortOrder: sortedInfo.columnKey === 'sl_no' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filteredValue: filteredInfo.email || null,
            onFilter: (value, record) => record.email.includes(value),
            sorter: (a, b) => a.email.length - b.email.length,
            sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            sortOrder: sortedInfo.columnKey === 'phone' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            filteredValue: filteredInfo.from || null,
            onFilter: (value, record) => record.from.includes(value),
            sorter: (a, b) => a.from.length - b.from.length,
            sortOrder: sortedInfo.columnKey === 'from' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            filteredValue: filteredInfo.to || null,
            onFilter: (value, record) => record.to.includes(value),
            sorter: (a, b) => a.to.length - b.to.length,
            sortOrder: sortedInfo.columnKey === 'to' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filteredValue: filteredInfo.type || null,
            onFilter: (value, record) => record.type.includes(value),
            sorter: (a, b) => a.type.length - b.type.length,
            sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Passengers',
            dataIndex: 'passengers',
            key: 'passengers',
            sorter: (a, b) => a.passengers - b.passengers,
            sortOrder: sortedInfo.columnKey === 'passengers' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date),
            sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <a onClick={() => deleteHandler(record.key)}>Delete</a>, // Correctly passing the key as id
        },
    ];

    const generatePDF = () => {
        const doc = new jsPDF();

        // Exclude the 'Action' column from PDF
        const tableColumn = columns
            .filter(col => col.key !== 'action') // Filter out the 'Action' column
            .map(col => col.title);

        const tableRows = data.map(row =>
            columns
                .filter(col => col.key !== 'action') // Filter out the 'Action' column
                .map(col => row[col.dataIndex])
        );

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            styles: {
                fontSize: 10,
                cellPadding: 1,
                halign: 'center',
                valign: 'middle',
                overflow: 'linebreak',
                lineColor: [44, 62, 80],
                lineWidth: 0.2,
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            bodyStyles: {
                fillColor: [245, 245, 245],
                textColor: [0, 0, 0],
            },
            alternateRowStyles: {
                fillColor: [230, 230, 230],
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
            },
        });

        doc.save('Booking_Details.pdf');
    };

    return (
        <div>
            <h1 className='p-3 m-4 text-4xl'>All Charter Booking</h1>

            <div id="datePicker" className='flex items-center justify-around h-16 gap-2 m-8'>
                <form method="post" className='flex items-center justify-center w-[50%] h-[100%] text-1xl font-bold cursor-pointer rounded-lg overflow-hidden' action='/api/admin/sorted'>
                    <input
                        type="date"
                        name="from"
                        id="from"
                        ref={fromDateRef}
                        className='w-[100%] h-[100%] p-3 outline-none cursor-pointer transition-all duration-500 ease-in-out'
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <input
                        type="date"
                        name="to"
                        id="to"
                        ref={toDateRef}
                        className='w-[100%] h-[100%] p-3 outline-none cursor-pointer'
                        onChange={(e) => {
                            const selectedToDate = e.target.value;
                            if (new Date(selectedToDate) < new Date(fromDate)) {
                                alert("To date cannot be earlier than from date.");
                                e.target.value = '';
                                setToDate('');
                            } else {
                                setToDate(selectedToDate);
                            }
                        }}
                    />
                </form>

                {(fromDate && toDate) && (
                    <button
                        className='p-4 font-bold border border-none shadow-md outline-none rounded-xl bg-zinc-300'
                        onClick={sortedResult}
                    >
                        Filter By Date
                    </button>
                )}
                <input
                    type="text"
                    name="#"
                    id="#"
                    ref={toDateRef}
                    placeholder='Search'
                    className='w-[20%] h-[100%] p-3 outline-none cursor-pointer m-3 rounded-lg'
                    onChange={handleSearch}
                />
            </div>


            <Button onClick={generatePDF} className='bg-[#024BBE] font-semibold text-white'>Download PDF</Button>

            <Button
                onClick={clearFilters}
                className='m-4'
            >
                Clear filters
            </Button>

            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleChange}
                className='charters'
            />
        </div>
    );
};

export default Bookings;
