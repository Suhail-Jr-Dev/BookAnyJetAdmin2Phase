import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Input, Button, Form } from "antd";
import axios from "axios";

const Charters = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState([]); // Ensure this is initialized as an empty array
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/getalltypes"
        );
        setType(response.data.data); // Extract the data array from the response
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      console.log("Name:", name);
      console.log("Speed:", speed);

      // Handle form submission logic here
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBookings = () => {
    navigate("/chartersBookings");
  };

  const handleCategory = () => {
    navigate("/chartersCategory");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-8">Charter Details</h1>
        <Button
          type="primary"
          onClick={showModal}
          className="bg-sky-700 text-white p-2 rounded-lg text-center h-[3rem]"
        >
          Add type
        </Button>
      </div>

      {/* Charter Bookings Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Charter Bookings</h2>
          <p className="text-gray-600">
            Manage and view all your charter bookings here.
          </p>
          <div className="flex justify-start">
            <button
              className="text-white bg-blue-800 p-2 rounded-md mt-4"
              onClick={handleBookings}
            >
              Explore more
            </button>
          </div>
        </div>
      </div>

      <div>Charter Types</div>
      <div>
        {" "}
        {type.map((elem, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{elem.section}</h2>
              <p className="text-gray-600">
                Manage and view all your {elem.section} details here.
              </p>
              <div className="flex justify-start">
                <button
                  className="text-white bg-blue-800 p-2 rounded-md mt-4"
                  onClick={handleCategory}
                >
                  Explore more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Add Type"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Speed">
            <Input
              placeholder="Enter speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Charters;
