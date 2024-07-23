import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Space, Table } from 'antd';
import axios from 'axios';

const Bookings = () => {
    let [data, setData] = useState([]);

    let fetchData = async () => {
        const URL = 'https://jsonplaceholder.typicode.com/comments';
        let resObj = await axios.get(URL);
        let arrayOfData = (await resObj.data).map((element, index) => {
            return {
                key: index,
                email: element.email,
                phone: element.name,
                from: element.name,
                to: element.name,
                type: element.name,
                passengers: element.id,
            };
        });
        setData(arrayOfData);

        return arrayOfData;
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };

    const columns = [
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
    ];

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = columns.map(col => col.title);
        const tableRows = data.map(row => columns.map(col => row[col.dataIndex]));

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
            <h1 className='text-4xl m-4 p-3'>All Chater Booking</h1>

            <div id="datePicker" className='flex justify-around items-center m-8 h-16'>
                <form action="post" className='flex items-center justify-center w-[50%] h-[100%] text-1xl font-bold cursor-pointer rounded-lg overflow-hidden'>
                    <input type="date" name="from" id="from" className='w-[100%] h-[100%] p-3 outline-none cursor-pointer transition-all duration-500 ease-in-out' onChange={(e) => setFromDate(e.target.value)} />
                    <input type="date" name="to" id="to" className='w-[100%] h-[100%] p-3 outline-none cursor-pointer' onChange={(e) => {
                        const selectedToDate = e.target.value;
                        if (new Date(selectedToDate) < new Date(fromDate)) {
                            alert("To date cannot be earlier than from date.");
                            e.target.value = '';
                            setToDate('');
                        } else {
                            setToDate(selectedToDate);
                        }
                    }} />
                </form>

                {(fromDate && toDate) && (
                    <button className='border p-4 shadow-md rounded-xl bg-zinc-300 font-bold outline-none border-none' onClick={() => console.log(fromDate + " " + toDate)}>
                        Filter By Date
                    </button>
                )}
            </div>

            <Button onClick={generatePDF}>Download PDF</Button>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>

            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </div>
    );
};

export default Bookings;
