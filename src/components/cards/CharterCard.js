import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const CharterCard = ({ logo, name, price, description, onEdit, onDelete, availability }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === 'edit') {
      onEdit();
    } else if (e.key === 'delete') {
      onDelete();
    }
    setDropdownVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className='relative border m-4 p-2 w-[16rem] shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105'>
      {/* Availability Icon */}
      <div className='absolute flex items-center space-x-2 top-4 left-4'>
        {availability === 'yes' ? (
          <div className='flex items-center p-1 text-xs font-semibold text-white bg-green-500 rounded-full'>
            <CheckCircleOutlined  className='text-lg font-semibold'/>
            <span className='ml-1 mr-2'>Available</span>
          </div>
        ) : (
          <div className='flex items-center p-1 text-xs font-semibold text-white bg-red-500 rounded-full'>
            <CloseCircleOutlined  className='text-lg font-semibold'/>
            <span className='ml-1 mr-2'>Not Available</span>
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      <div className='absolute text-lg bg-white rounded-lg top-4 right-4'>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          visible={dropdownVisible}
          onVisibleChange={setDropdownVisible}
        >
          <MoreOutlined className='cursor-pointer' />
        </Dropdown>
      </div>

      {/* Image and Text */}
      <div className='flex items-center justify-center'>
        <img className='w-[15rem] h-[12rem] object-cover rounded-lg' src={logo} alt='jet' />
      </div>
      <div className='p-2'>
        <h1 className='mt-2 mb-2 overflow-hidden font-mono text-xl cursor-pointer text-ellipsis whitespace-nowrap'>
          {name}
        </h1>
        <p className='mb-1 text-sm text-gray-600'>
          {description}
        </p>
        <p className='text-lg font-bold text-black'>
          {price}
          <span className='text-gray-700'> / PER HOUR</span>
        </p>
      </div>
    </div>
  );
};

export default CharterCard;
