import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const CharterCard = ({ logo, name, onEdit, onDelete }) => {
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
    <div className='relative border m-4 p-2 gap-2 w-[16rem] h-full shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-110'>
      <div className='bg-white m-2 absolute top-2 right-2 text-lg'>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          visible={dropdownVisible}
          onVisibleChange={setDropdownVisible}
        >
          <MoreOutlined className='cursor-pointer' />
        </Dropdown>
      </div>
      <div className='flex items-center justify-center'>
        <img className='w-[15rem] h-[12rem]' src={logo} alt='jet' />
      </div>
      <h1 className='font-mono text-xl mb-4 mt-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap'>
        {name}
      </h1>
    </div>
  );
};

export default CharterCard;
