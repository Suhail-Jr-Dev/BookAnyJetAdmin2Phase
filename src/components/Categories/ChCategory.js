import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import ChCard from "../cards/ChCard";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const ChCategory = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [categoryData, setCategoryData] = useState([]);
  const [file, setFile] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/admin/modifycategory"
        );
        console.log(response);
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
      type: category.chartertype,
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
    formData.append("chartertype", values.chartertype);
    formData.append("description", values.description);

    if (file) {
      formData.append("image", file);
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/admin/addmodifycategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Charter added successfully");
      console.log(formData);

      const response = await axios.get(
        "http://localhost:8000/api/admin/modifycategory"
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

    formData.append("chartertype", values.chartertype);
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
        "http://localhost:8000/api/admin/modifycategory"
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
        "http://localhost:8000/api/admin/modifycategory"
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

  const handleSubCategory = (charterType) => {
    navigate(`/subcategory/${charterType}`);
  };

  return (
    <>
      <div className="flex justify-between m-2">
        <div className="ml-2 text-2xl font-bold">All Charter Categories</div>
        <button
          onClick={handleOpenAddModal}
          className="p-4 text-white bg-blue-800 border border-white rounded-md"
        >
          Add Category
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 m-2">
          {categoryData.map((category) => (
            <ChCard
              key={category._id}
              logo={category.image}
              name={category.chartertype}
              description={category.description}
              handlesubCategory={() => handleSubCategory(category.chartertype)}
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
            name="chartertype"
            rules={[
              { required: true, message: "Please input the category type!" },
            ]}
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
            <ReactQuill theme="snow" />
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
            name="chartertype"
            rules={[
              { required: true, message: "Please input the category type!" },
            ]}
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
            <ReactQuill theme="snow" />
          </Form.Item>
          <Form.Item label="Upload Image" name="image">
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
              Edit Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChCategory;
