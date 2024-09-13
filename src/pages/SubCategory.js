import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Spin, Card, Button, Upload, Select , DatePicker , message, Modal, Form, Input } from "antd";

const Category = () => {
  const { section, category } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:8000/api/admin/filterbytypeandcategory/${section}/${category}`
        );
        setCategories(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [section]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleFileChange = ({ file }) => {
    setFile(file);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
  
      // Creating FormData object to append all the required fields
      const formData = new FormData();
      formData.append("section", section);
      formData.append("chartertype", values.chartertype);
      formData.append("description", values.description);
      formData.append("subCategoryName", values.subCategoryName);
      formData.append("pax", values.pax);
      formData.append("speed", values.speed);
      formData.append("price", values.price);
      formData.append("availability", values.availability);
      formData.append("bookingtype", values.bookingtype);
      formData.append("departure", values.departure);
      formData.append("arrival", values.arrival);
      formData.append("journeytype", values.journeytype);
      formData.append("date", values.date);
      formData.append("yom", values.yom);
      formData.append("seats", values.seats);
      formData.append("crew", values.crew);
      formData.append("airhosts", values.airhosts);
      formData.append("levatory", values.levatory);
      formData.append("fromtime", values.fromtime);
      formData.append("endtime", values.endtime);
      formData.append("flyingrange", values.flyingrange);
      formData.append("cabinwidth", values.cabinwidth);
      formData.append("cabinheight", values.cabinheight);
      formData.append("baggage", values.baggage);
      formData.append("cabinlength", values.cabinlength);
      formData.append("pilot", values.pilot);
      formData.append("discount", values.discount);
      formData.append("discountprice", values.discountprice);
      formData.append("duration", values.duration);
      formData.append("reachdate", values.reachdate);
      formData.append("yor", values.yor);
      formData.append("targetprice", values.targetprice);
      formData.append("brokercompany", values.brokercompany);
      formData.append("flexibility", values.flexibility);
      formData.append("operatorname", values.operatorname);
      formData.append("operatoremail", values.operatoremail);
      formData.append("operatorphone", values.operatorphone);
  
      if (file) {
        formData.append("image", file);  // Append image file if available
      }
  
      // Make the API request to add the subcategory
      const response = await axios.post(
        "http://localhost:8000/api/admin/addsubcategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      message.success("Subcategory added successfully");
  
      // Reset form and modal state
      form.resetFields();
      setFile(null);
      setIsModalVisible(false);
  
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      message.error("Failed to add subcategory. Please try again.");
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFile(null);
  };

  const handleExploreMore = (categoryType) => {
    navigate(`/explore/${section}/${categoryType}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <h1 className="mb-4 text-2xl font-bold">{section} Categories</h1>
        <button
          className="bg-sky-700 text-white p-2 rounded-lg"
          onClick={showModal}
        >
          Add Sub-Category
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={category?._id ?? index} className="p-4">
              <Card
                cover={
                  <img
                    alt={category?.chartertype || "Image"}
                    src={category?.image || ""}
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleExploreMore(category.chartertype)}
                  >
                    Explore More
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={category?.subCategoryName || "No Title"}
                  description={
                    (category?.description?.substring(0, 100) || "") + "..."
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      )}
      <Modal
        title="Add Sub-Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={{ section }}>
          {/* Existing fields */}
          <Form.Item
            name="section"
            label="Section"
            rules={[{ required: true, message: "Please input the section!" }]}
          >
            <Input value={section} readOnly />
          </Form.Item>

          <Form.Item
            name="chartertype"
            label="Charter Type"
            rules={[
              { required: true, message: "Please input the charter type!" },
            ]}
          >
            <Input placeholder="Enter charter type" />
          </Form.Item>

          <Form.Item
            name="subCategoryName"
            label="SubCategory Name"
            rules={[
              { required: true, message: "Please input the subCategory Name!" },
            ]}
          >
            <Input placeholder="Enter subCategory name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              customRequest={handleFileChange}
              showUploadList={true}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          {/* New fields */}
          <Form.Item
            name="pax"
            label="Pax"
            rules={[{ required: true, message: "Please input the pax!" }]}
          >
            <Input placeholder="Enter pax" />
          </Form.Item>

          <Form.Item
            name="speed"
            label="Speed"
            rules={[{ required: true, message: "Please input the speed!" }]}
          >
            <Input placeholder="Enter speed" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Availability"
            rules={[{ required: true, message: "Please select availability!" }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="bookingtype"
            label="Booking Type"
            rules={[
              { required: true, message: "Please input the booking type!" },
            ]}
          >
            <Input placeholder="Enter booking type" />
          </Form.Item>

          <Form.Item
            name="departure"
            label="Departure"
            rules={[{ required: true, message: "Please input the departure!" }]}
          >
            <Input placeholder="Enter departure" />
          </Form.Item>

          <Form.Item
            name="arrival"
            label="Arrival"
            rules={[{ required: true, message: "Please input the arrival!" }]}
          >
            <Input placeholder="Enter arrival" />
          </Form.Item>

          <Form.Item
            name="journeytype"
            label="Journey Type"
            rules={[
              { required: true, message: "Please select the journey type!" },
            ]}
          >
            <Select>
              <Select.Option value="one-way">One-way</Select.Option>
              <Select.Option value="round-trip">Round-trip</Select.Option>
              <Select.Option value="multi-leg">Multi-leg</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please input the date!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="yom"
            label="Year of Manufacture (YOM)"
            rules={[{ required: true, message: "Please input the YOM!" }]}
          >
            <Input placeholder="Enter year of manufacture" />
          </Form.Item>

          <Form.Item
            name="seats"
            label="Seats"
            rules={[{ required: true, message: "Please input the seats!" }]}
          >
            <Input placeholder="Enter seats" />
          </Form.Item>

          <Form.Item
            name="crew"
            label="Crew"
            rules={[{ required: true, message: "Please input the crew!" }]}
          >
            <Input placeholder="Enter crew" />
          </Form.Item>

          <Form.Item
            name="airhosts"
            label="Air Hosts"
            rules={[{ required: true, message: "Please input the air hosts!" }]}
          >
            <Input placeholder="Enter air hosts" />
          </Form.Item>

          <Form.Item
            name="levatory"
            label="levatory"
            rules={[{ required: true, message: "Please input the lavatory!" }]}
          >
            <Input placeholder="Enter lavatory" />
          </Form.Item>

          <Form.Item
            name="fromtime"
            label="From Time"
            rules={[{ required: true, message: "Please input the from time!" }]}
          >
            <Input placeholder="Enter from time" />
          </Form.Item>

          <Form.Item
            name="endtime"
            label="End Time"
            rules={[{ required: true, message: "Please input the end time!" }]}
          >
            <Input placeholder="Enter end time" />
          </Form.Item>

          <Form.Item
            name="flyingrange"
            label="Flying Range"
            rules={[
              { required: true, message: "Please input the flying range!" },
            ]}
          >
            <Input placeholder="Enter flying range" />
          </Form.Item>

          <Form.Item
            name="cabinwidth"
            label="Cabin Width"
            rules={[
              { required: true, message: "Please input the cabin width!" },
            ]}
          >
            <Input placeholder="Enter cabin width" />
          </Form.Item>

          <Form.Item
            name="cabinheight"
            label="Cabin Height"
            rules={[
              { required: true, message: "Please input the cabin height!" },
            ]}
          >
            <Input placeholder="Enter cabin height" />
          </Form.Item>

          <Form.Item
            name="baggage"
            label="Baggage"
            rules={[{ required: true, message: "Please input the baggage!" }]}
          >
            <Input placeholder="Enter baggage" />
          </Form.Item>

          <Form.Item
            name="cabinlength"
            label="Cabin Length"
            rules={[
              { required: true, message: "Please input the cabin length!" },
            ]}
          >
            <Input placeholder="Enter cabin length" />
          </Form.Item>

          <Form.Item
            name="pilot"
            label="Pilot"
            rules={[{ required: true, message: "Please input the pilot!" }]}
          >
            <Input placeholder="Enter pilot" />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ required: true, message: "Please input the discount!" }]}
          >
            <Input placeholder="Enter discount" />
          </Form.Item>

          <Form.Item
            name="discountprice"
            label="Discount Price"
            rules={[
              { required: true, message: "Please input the discount price!" },
            ]}
          >
            <Input placeholder="Enter discount price" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <Input placeholder="Enter duration" />
          </Form.Item>

          <Form.Item
            name="reachdate"
            label="Reach Date"
            rules={[
              { required: true, message: "Please input the reach date!" },
            ]}
          >
            <Input placeholder="Enter reach date" />
          </Form.Item>

          <Form.Item
            name="yor"
            label="Year of Registration (YOR)"
            rules={[{ required: true, message: "Please input the YOR!" }]}
          >
            <Input placeholder="Enter year of registration" />
          </Form.Item>

          <Form.Item
            name="targetprice"
            label="Target Price"
            rules={[
              { required: true, message: "Please input the target price!" },
            ]}
          >
            <Input placeholder="Enter target price" />
          </Form.Item>

          <Form.Item
            name="brokercompany"
            label="Broker Company"
            rules={[
              { required: true, message: "Please input the broker company!" },
            ]}
          >
            <Input placeholder="Enter broker company" />
          </Form.Item>

          <Form.Item
            name="flexibility"
            label="Flexibility"
            rules={[{ required: true, message: "Please select flexibility!" }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="operatorname"
            label="Operator Name"
            rules={[
              { required: true, message: "Please input the operator name!" },
            ]}
          >
            <Input placeholder="Enter operator name" />
          </Form.Item>

          <Form.Item
            name="operatoremail"
            label="Operator Email"
            rules={[
              { required: true, message: "Please input a valid email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input placeholder="Enter operator email" />
          </Form.Item>

          <Form.Item
            name="operatorphone"
            label="Operator Phone"
            rules={[
              { required: true, message: "Please input a valid phone number!" },
              {
                pattern: /^\d{10}$/,
                message: "Please input a 10-digit phone number!",
              },
            ]}
          >
            <Input placeholder="Enter operator phone" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
