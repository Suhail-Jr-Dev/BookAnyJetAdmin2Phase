import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import {
  MoreOutlined,
} from "@ant-design/icons";
import DOMPurify from "dompurify";

const ChCard = ({
  logo,
  name,
  description,
  onEdit,
  onDelete,
  handlesubCategory
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "edit") {
      onEdit();
    } else if (e.key === "delete") {
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

  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className="relative border m-4 p-2 w-[16rem] shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
      {/* Availability Icon */}

      {/* Dropdown Menu */}
      <div className="absolute text-lg bg-white rounded-lg top-4 right-4">
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={dropdownVisible}
          onVisibleChange={setDropdownVisible}
        >
          <MoreOutlined className="cursor-pointer" />
        </Dropdown>
      </div>

      {/* Image and Text */}

      {/* Image and Text */}
      <div className="flex items-center justify-center">
        <img
          className="w-[15rem] h-[12rem] object-cover rounded-lg"
          src={logo}
          alt="jet"
        />
      </div>
      <div className="p-2">
        <h1 className="mt-2 mb-2 overflow-hidden font-mono text-xl cursor-pointer text-ellipsis whitespace-nowrap">
          {name}
        </h1>
        {/* <div
          className="mb-1 text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        /> */}
        <div>
            <button className="bg-sky-700 text-white p-2 rounded-lg" onClick={handlesubCategory}>View more</button>
        </div>
      </div>
    </div>
  );
};

export default ChCard;
