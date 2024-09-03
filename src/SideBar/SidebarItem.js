import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File } from 'lucide-react';

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-150 ease-in-out ${item.type === 'folder' ? 'font-medium' : ''}`}
        onClick={toggleOpen}
      >
        <span className="mr-2">
          {item.type === 'folder' ? 
            (isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />) : 
            <File size={18} />
          }
        </span>
        <span className="text-gray-700">{item.name}</span>
      </div>
      {item.type === 'folder' && isOpen && (
        <div className="ml-4 mt-1">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;