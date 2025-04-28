import { useState } from 'react';
import { FaPlus, FaCloudUploadAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Add Category', icon: <FaPlus />, path: '/add-category' },
    { name: 'Upload Template', icon: <FaCloudUploadAlt />, path: '/upload-template' },
  ];

  return (
    <div
      className={`flex flex-col bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } min-h-screen p-4`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold transition-all ${!isOpen && 'scale-0 hidden'}`}>
          Admin Panel
        </h1>
        <button onClick={toggleSidebar} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 p-3 rounded hover:bg-gray-700 transition-all"
          >
            <div className="text-xl">{item.icon}</div>
            {isOpen && <span className="text-md">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
