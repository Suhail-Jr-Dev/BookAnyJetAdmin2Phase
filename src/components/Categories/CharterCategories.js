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
  const[editData , setEditData] = useState([]) ; 

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/admin/getallcategories");
        setCategoryData(response.data.data); // Assuming the data structure
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
    setFile(null); // Clear file selection for editing
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
      await axios.post("http://localhost:8000/api/admin/addchartercategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Charter added successfully");

      const response = await axios.get("http://localhost:8000/api/admin/getallcategories");
      setCategoryData(response.data.data);
      handleCloseAddModal();
    } catch (err) {
      console.log(err);
      message.error("An error occurred while adding the category");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (values) => {
    console.log(values) ;
    setEditData(Object(values)) ;
    console.log(editData , "----") ;
    // formData.append("type", values.type);
    // formData.append("passengers", values.passengers);
    // formData.append("speed", values.speed);
    // formData.append("price", values.price);
    // formData.append("description", values.description);
    // formData.append("mytest" , "1232") ;
    // console.log(formData) ;
    // if (file) {
    //   formData.append("image", file);
    // }
    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/api/admin/editcharterbyid/${editingCategory._id}`, editData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Charter updated successfully");

      const response = await axios.get("http://localhost:8000/api/admin/getallcategories");
      setCategoryData(response.data.data);
      handleCloseEditModal();
    } catch (err) {
      console.log(err);
      message.error("An error occurred while updating the category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/admin/deletecharterbyid/${id}`);
      message.success("Charter deleted successfully");
      const response = await axios.get("http://localhost:8000/api/admin/getallcategories");
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
            rules={[{ required: true, message: "Please input the category type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Passengers"
            name="passengers"
            rules={[{ required: true, message: "Please enter the number of passengers it can accommodate!" }]}
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
            rules={[{ required: true, message: "Please enter price details" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture"
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCloseAddModal} className="bg-gray-500 text-white rounded-md">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-800 text-white rounded-md">
                Add
              </Button>
            </div>
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
            rules={[{ required: true, message: "Please input the category type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Passengers"
            name="passengers"
            rules={[{ required: true, message: "Please enter the number of passengers it can accommodate!" }]}
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
            rules={[{ required: true, message: "Please enter price details" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
          >
            <Upload
              beforeUpload={() => false}
              listType="picture"
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Change Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCloseEditModal} className="bg-gray-500 text-white rounded-md">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-800 text-white rounded-md">
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CharterCategories;
