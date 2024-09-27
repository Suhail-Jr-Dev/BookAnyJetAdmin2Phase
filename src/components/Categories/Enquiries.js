import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Table, message } from "antd";
import axios from "axios";
import "../Categories/EmptylegsBooking.css"; // Import the custom CSS file

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const URL = "https://privatejetcharters-server-ttz1.onrender.com/api/admin/getallenquiry";
      const resObj = await axios.get(URL);
      const arrayOfData = resObj.data.data.map((element, index) => ({
        key: element._id, // Using _id as key
        sl_no: index + 1,
        name: element.enquiryname,
        email: element.enquiryemail,
        phone: element.enquiryphone,
        type: element.enquirytype,
        date: element.enquirydate,
        action: element._id,
      }));
      setData(arrayOfData);
    } catch (error) {
      message.error("Failed to fetch data!");
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  // Handle deletion of a record
  const deleteHandler = async (id) => {
    try {
      const URL = `https://privatejetcharters-server-ttz1.onrender.com/api/admin/deleteenquirybyid/${id}`;
      await axios.delete(URL);
      message.success("Data deleted successfully");
      fetchData(); // Refetch data after deletion
    } catch (err) {
      message.error("Failed to delete data");
    }
  };

  // Handle sorting of results based on date range
  const sortedResult = async () => {
    try {
    //   const url = "https://privatejetcharters-server-ttz1.onrender.com/api/admin/filterenquirybydate";
    const url="http://localhost:8000/api/admin/filterenquirybydate"
      const payload = { from: fromDate, to: toDate };
      console.log(payload)
      
      const resObj = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (resObj.data && resObj.data.data) {
        const arrayOfData = resObj.data.data.map((element, index) => ({
          key: element._id,
          sl_no: index + 1,
          name: element.enquiryname,
          email: element.enquiryemail,
          phone: element.enquiryphone,
          type: element.enquirytype,
          date: element.enquirydate,
          action: element._id,
        }));
        setData(arrayOfData);
      } else {
        message.error("No data received from API");
      }
    } catch (error) {
      message.error("Failed to fetch sorted data");
    }
  };

  // Clear filters
  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    if (fromDateRef.current) fromDateRef.current.value = "";
    if (toDateRef.current) toDateRef.current.value = "";
    fetchData();
  };

  // Generate a PDF of the table data
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Exclude the 'Action' column from PDF
    const tableColumn = columns
      .filter((col) => col.key !== "action")
      .map((col) => col.title);
  
    const tableRows = data.map((row) =>
      columns
        .filter((col) => col.key !== "action")
        .map((col) => row[col.dataIndex])
    );
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 10,
        cellPadding: 1,
        halign: "center",
        valign: "middle",
        overflow: "linebreak",
        lineColor: [44, 62, 80],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230],
      },
      // Removing fixed column widths to make them auto-sized
      columnStyles: {
        0: { halign: "center" }, // Align SL_No column content to the center
      },
    });
  
    doc.save("Enquiries.pdf");
  };
  
  // AntD table columns definition
  const columns = [
    {
      title: "SL_No",
      dataIndex: "sl_no",
      key: "sl_no",
      sorter: (a, b) => a.sl_no - b.sl_no,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <a onClick={() => deleteHandler(record.key)}>Delete</a>
      ),
    },
  ];

  return (
    <div>
      <h1 className="p-3 m-4 text-4xl">Manage Enquiries Here.</h1>

      <div className="flex items-center justify-around h-16 m-8">
      <form className="flex items-center justify-center w-[50%] h-[100%]">
  <input
    type="date"
    name="from"
    id="from"
    ref={fromDateRef}
    className="w-[100%] h-[100%] p-3 outline-none cursor-pointer border border-gray-650"
    onChange={(e) => {
      const date = new Date(e.target.value);
      const formattedDate = date
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");
      setFromDate(formattedDate); // Set fromDate in dd-mm-yyyy format
    }}
  />
  <input
    type="date"
    name="to"
    id="to"
    ref={toDateRef}
    className="w-[100%] h-[100%] p-3 outline-none cursor-pointe border"
    onChange={(e) => {
      const selectedToDate = new Date(e.target.value);
      if (selectedToDate < new Date(fromDate.split("-").reverse().join("-"))) {
        alert("To date cannot be earlier than from date.");
        e.target.value = "";
        setToDate("");
      } else {
        const formattedToDate = selectedToDate
          .toLocaleDateString("en-GB")
          .split("/")
          .join("-");
        setToDate(formattedToDate); // Set toDate in dd-mm-yyyy format
      }
    }}
  />
</form>


        {fromDate && toDate && (
          <button
            className={`p-4 font-bold shadow-md rounded-xl ${
              fromDate && toDate ? "bg-zinc-300" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={sortedResult}
            disabled={!fromDate || !toDate}
          >
            Filter By Date
          </button>
        )}
      </div>

      <Button onClick={generatePDF}>Download PDF</Button>
      <Button onClick={clearFilters} className="m-4">
        Clear filters
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Enquiries;
