import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Spin,
  Dropdown,
  Menu,
  Select,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/admin/getalltypes"
        );
        setSectionData(response.data.data);
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
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
    editForm.setFieldsValue({
      section: category.section,
      active: category.active ? "Yes" : "No",
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    editForm.resetFields();
  };

  const handleAddCategory = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/admin/addsections", values);
      message.success("Section added successfully");
      const response = await axios.get(
        "http://localhost:8000/api/admin/getalltypes"
      );
      setSectionData(response.data.data);
      handleCloseAddModal();
    } catch (err) {
      console.log(err);
      message.error("An error occurred while adding the section");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (values) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/admin/updatetype/${editingCategory._id}`,
        values
      );
      message.success("Section updated successfully");
      const response = await axios.get(
        "http://localhost:8000/api/admin/getalltypes"
      );
      setSectionData(response.data.data);
      handleCloseEditModal();
    } catch (err) {
      console.log(err);
      message.error("An error occurred while updating the section");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/admin/deletetype/${id}`);
      message.success("Section deleted successfully");
      const response = await axios.get(
        "http://localhost:8000/api/admin/getalltypes"
      );
      setSectionData(response.data.data);
    } catch (err) {
      console.log(err);
      message.error("An error occurred while deleting the section");
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (section) => {
    navigate(`/category/${section}`);
  };

  const handleMenuClick = (key, category) => {
    if (key === "edit") {
      handleOpenEditModal(category);
    } else if (key === "delete") {
      handleDelete(category._id);
    }
  };

  const navigate = useNavigate();


  // Checking is Admin or Not


  let isRole =  localStorage.getItem('role') == 'super-admin' ? true : false

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="mb-4 text-2xl font-bold">
            Welcome to the  {localStorage.getItem('role') || 'Control'} Panel
          </h1>
          <p className="mb-8">
            Manage all your Charter related details and view
            related analytics and bookings.
          </p>
        </div>
        <div className={`${isRole ? 'flex' : 'hidden'}`}>
          <Button
            type="primary"
            className="bg-sky-700"
            onClick={handleOpenAddModal}
          >
            Add type
          </Button>
        </div>
      </div>

      {/* Cards Section */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 m-2">
          {sectionData.map((category) => (
            <div
              className="border shadow-md w-[26rem] h-[7rem] p-4 flex-col gap-4"
              key={category._id}
            >
              <div className="flex justify-between">
                <h1>{category.section}</h1>
                <Dropdown
                  overlay={
                    <Menu onClick={({ key }) => handleMenuClick(key, category)}>
                      <Menu.Item key="edit">Edit</Menu.Item>
                      <Menu.Item key="delete">Delete</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button>...</Button>
                </Dropdown>
              </div>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  className="mt-4 bg-blue-800"
                  onClick={() => handleCategory(category.section)}
                >
                  Explore more
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Section Modal */}
      <Modal
        title="Add Section"
        visible={isAddModalOpen}
        onCancel={handleCloseAddModal}
        footer={null}
      >
        <Form form={addForm} onFinish={handleAddCategory}>
          <Form.Item
            name="section"
            label="Section"
            rules={[{ required: true, message: "Please input the section!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="active"
            label="Active"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Section
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Section Modal */}
      <Modal
        title="Edit Section"
        visible={isEditModalOpen}
        onCancel={handleCloseEditModal}
        footer={null}
      >
        <Form form={editForm} onFinish={handleEditCategory}>
          <Form.Item
            name="section"
            label="Section"
            rules={[{ required: true, message: "Please input the section!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="active"
            label="Active"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
