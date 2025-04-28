import { Outlet } from 'react-router-dom';
import Sidebar from './Sliderbar/Slidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
