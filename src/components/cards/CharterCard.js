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
      <div className='absolute top-4 left-4 flex items-center space-x-2'>
        {availability === 'yes' ? (
          <div className='bg-green-500 text-white font-semibold text-xs p-1 rounded-full flex items-center'>
            <CheckCircleOutlined  className='font-semibold text-lg'/>
            <span className='ml-1 mr-2'>Available</span>
          </div>
        ) : (
          <div className='bg-red-500 text-white font-semibold text-xs p-1 rounded-full flex items-center'>
            <CloseCircleOutlined  className='font-semibold text-lg'/>
            <span className='ml-1 mr-2'>Not Available</span>
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      <div className='bg-white absolute top-4 right-4 rounded-lg text-lg'>
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
        <h1 className='font-mono text-xl mb-2 mt-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap'>
          {name}
        </h1>
        <p className='text-gray-600 text-sm mb-1'>
          {description}
        </p>
        <p className='text-black text-lg font-bold'>
          {price}
          <span className='text-gray-700'> / PER HOUR</span>
        </p>
      </div>
    </div>
  );
};

export default CharterCard;
