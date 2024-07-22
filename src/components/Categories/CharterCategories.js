import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CharterCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields(); 
  };

  const handleAddCategory = (values) => {
    console.log(values);
    handleCloseModal();
  };

  return (
    <>
      <div className='flex justify-between m-2'>
        <div className='text-2xl font-bold'>All Charter Categories</div>
        <button 
          onClick={handleOpenModal} 
          className='bg-blue-800 border border-white rounded-md p-4 text-white'
        >
          Add Category
        </button>
      </div>

      {/* Modal */}
      <Modal
        title="Add New Category"
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null} 
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCategory}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input the category type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the category price!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCloseModal} className="bg-gray-500 text-white rounded-md">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-800 text-white rounded-md">
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CharterCategories;
