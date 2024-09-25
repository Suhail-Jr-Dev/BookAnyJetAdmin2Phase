import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Spin, Card, Button, Upload, message, Modal, Form, Input, Dropdown, Menu } from "antd";

const Category = () => {
  const { section } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // To store the category being edited
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

  const showModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      form.setFieldsValue({
        section: category.section,
        chartertype: category.chartertype,
        description: category.description,
      });
    }
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

      const apiEndpoint = editingCategory
        ? `https://privatejetcharters-server-ttz1.onrender.com/api/admin/editmodifycharterbyid/${editingCategory._id}`
        : "https://privatejetcharters-server-ttz1.onrender.com/api/admin/addmodifycategory";

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(editingCategory ? "Category updated successfully" : "Category added successfully");

      setCategories(editingCategory 
        ? categories.map((cat) => (cat._id === editingCategory._id ? response.data.data : cat)) 
        : [...categories, response.data.data]
      );
      form.resetFields();
      setFile(null);
      setIsModalVisible(false);

      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      message.error("Failed to add/update category. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFile(null);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(
        `https://privatejetcharters-server-ttz1.onrender.com/api/admin/deletemodifycharterbyid/${categoryId}`
      );
      setCategories(categories.filter((category) => category._id !== categoryId));
      message.success("Category deleted successfully");
    } catch (err) {
      console.error("Error deleting category:", err);
      message.error("Failed to delete category. Please try again.");
    }
  };

  const handleExploreMore = (categoryType) => {
    navigate(`/explore/${section}/${categoryType}`);
  };

  const menu = (category) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => showModal(category)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(category._id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <h1 className="mb-4 text-2xl font-bold">{section} Categories</h1>
        <button
          className={` ${localStorage.getItem('role') == 'user-admin' ? 'hidden' : 'flex'} bg-sky-700 text-white p-2 rounded-lg`}
          onClick={() => showModal()}
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
                extra={
                  <Dropdown overlay={menu(category)} trigger={['click']}>
                    <EllipsisOutlined style={{ fontSize: '24px' }} />
                  </Dropdown>
                }
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
        title={editingCategory ? "Edit Category" : "Add Category"}
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
            rules={[{ required: !editingCategory, message: "Please upload an image" }]}
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
