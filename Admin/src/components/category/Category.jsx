import { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post('https://tamplate.onrender.com/api/v1/add', { name });
      
      alert('Category added successfully');
      setName('');
    } catch (error) {
      console.error(error);
      alert('Failed to add category');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            required
            placeholder="Category Name"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 font-bold transition duration-300"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
