import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AddCategory from './components/category/Category';
import UploadTemplate from './components/UploadTheam/UploadTheam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="add-category" element={<AddCategory />} />
          <Route path="upload-template" element={<UploadTemplate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
