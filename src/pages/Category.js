import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Spin, Card, Button, Upload, message, Modal, Form, Input } from "antd";

const Category = () => {
  const { section } = useParams();
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
        const response = await axios.get(
          `https://privatejetcharters-server-ttz1.onrender.com/api/admin/categorybytype/${section}`
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

      const formData = new FormData();
      formData.append("section", section);
      formData.append("chartertype", values.chartertype);
      formData.append("description", values.description);
      if (file) {
        formData.append("image", file);
      }

      const response = await axios.post(
        "https://privatejetcharters-server-ttz1.onrender.com/api/admin/addmodifycategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Category added successfully");

      setCategories([...categories, response.data.data]);
      form.resetFields();
      setFile(null);
      setIsModalVisible(false);

      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      message.error("Failed to add category. Please try again.");
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
          className={` ${localStorage.getItem('role') == 'user-admin' ? 'hidden' : 'flex'} bg-sky-700 text-white p-2 rounded-lg`}
          onClick={showModal}
        >
          Add Category
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  title={category?.chartertype || "No Title"}
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
        title="Add Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={{ section }}>
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
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
