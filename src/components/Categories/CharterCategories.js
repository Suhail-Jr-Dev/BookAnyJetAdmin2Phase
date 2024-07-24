import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CharterCard from "../cards/CharterCard";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const CharterCategories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [categoryData, setCategoryData] = useState([]);
  const [file, setFile] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/admin/getallcategories"
        );
        setCategoryData(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    addForm.resetFields();
    setFile(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
    setFile(null);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
    editForm.setFieldsValue({
      type: category.type,
      passengers: category.passengers,
      speed: category.speed,
      price: category.price,
      description: category.description,
    });
    setFile(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    editForm.resetFields();
    setFile(null);
  };

  const handleAddCategory = async (values) => {
    const formData = new FormData();

    formData.append("type", values.type);
    formData.append("passengers", values.passengers);
    formData.append("speed", values.speed);
    formData.append("price", values.price);
    formData.append("description", values.description);

    if (file) {
      formData.append("image", file);
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/admin/addchartercategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Charter added successfully");

      const response = await axios.get(
        "http://localhost:8000/api/admin/getallcategories"
      );

      handleCloseAddModal();
      setCategoryData(response.data.data);
    } catch (err) {
      console.log(err);
      message.error("An error occurred while adding the category");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (values) => {
    const formData = new FormData();

    formData.append("type", values.type);
    formData.append("passengers", values.passengers);
    formData.append("speed", values.speed);
    formData.append("price", values.price);
    formData.append("description", values.description);

    if (file) {
      formData.append("image", file);
    } else if (editingCategory && editingCategory.image) {
      formData.append("image", editingCategory.image);
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/admin/editcharterbyid/${editingCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Charter updated successfully");

      const response = await axios.get(
        "http://localhost:8000/api/admin/getallcategories"
      );

      handleCloseEditModal();
      setCategoryData(response.data.data);
    } catch (err) {
      console.log("Full Error:", err);
      message.error("An error occurred while updating the category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/admin/deletecharterbyid/${id}`
      );
      message.success("Charter deleted successfully");
      const response = await axios.get(
        "http://localhost:8000/api/admin/getallcategories"
      );
      setCategoryData(response.data.data);
    } catch (err) {
      console.log(err);
      message.error("An error occurred while deleting the category");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ file }) => {
    setFile(file);
  };

  return (
    <>
      <div className="flex justify-between m-2">
        <div className="text-2xl font-bold">All Charter Categories</div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-800 border border-white rounded-md p-4 text-white"
        >
          Add Category
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-wrap m-2 gap-4">
          {categoryData.map((category) => (
            <CharterCard
              key={category._id}
              logo={category.image}
              name={category.type}
              price={category.price}
              description={category.description}
              onEdit={() => handleOpenEditModal(category)}
              onDelete={() => handleDelete(category._id)}
            />
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      <Modal
        title="Add New Category"
        visible={isAddModalOpen}
        onCancel={handleCloseAddModal}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item
            label="Charter Type"
            name="type"
            rules={[
              { required: true, message: "Please input the category type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Passengers"
            name="passengers"
            rules={[
              {
                required: true,
                message:
                  "Please enter the number of passengers it can accommodate!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Speed per hour"
            name="speed"
            rules={[{ required: true, message: "Please enter speed details" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter a description" },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              customRequest={handleFileChange}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title="Edit Category"
        visible={isEditModalOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditCategory}>
          <Form.Item
            label="Charter Type"
            name="type"
            rules={[
              { required: true, message: "Please input the category type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Passengers"
            name="passengers"
            rules={[
              {
                required: true,
                message:
                  "Please enter the number of passengers it can accommodate!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Speed per hour"
            name="speed"
            rules={[{ required: true, message: "Please enter speed details" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter a description" },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Upload Image (optional)"
            name="image"
          >
            <Upload
              customRequest={handleFileChange}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload New Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CharterCategories;
