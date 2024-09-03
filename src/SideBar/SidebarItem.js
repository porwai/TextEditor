import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

const SidebarItem = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={toggleOpen}
      >
        {item.type === 'folder' && (
          <span className="mr-1">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        <span className="mr-2">
          {item.type === 'folder' ? <Folder size={14} /> : <File size={14} />}
        </span>
        <span>{item.name}</span>
      </div>
      {item.type === 'folder' && isOpen && (
        <div className="ml-2">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;