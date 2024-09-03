import React from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    const sidebarData = [
      {
        type: 'folder',
        name: 'Work',
        children: [
          { type: 'note', name: 'File1' },
          { type: 'note', name: 'File2' },
          {
            type: 'folder',
            name: 'Projects',
            children: [
              { type: 'note', name: 'File3' },
            ],
          },
        ],
      },
      { type: 'note', name: 'Personal Notes' },
    ];
  
    return (
      <div className="w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">My Workspace</h2>
          {sidebarData.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    );
  };  

export default Sidebar;