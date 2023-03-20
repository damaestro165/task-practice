import React, { useState } from 'react';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import Display from './Display';

function App() {
  const [inputValue, setInputValue] = useState('');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route
          index
          element={
            <InputPage setInputValue={setInputValue} inputValue={inputValue} />
          }
        />
        <Route path='display/' element={<Display str={inputValue} />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

export function InputPage({ setInputValue, inputValue }) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (inputValue === '') {
      alert('Please provide a non-empty value');
    } else {
      navigate(`/display`);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <p className='text-2xl font-bold mb-6'>Input your text:</p>
      <div className='flex items-center justify-center mb-6 md:flex-row flex-col gap-5 '>
        <input
          type='text'
          placeholder='Enter a string'
          className='border border-gray-500 rounded-md px-4 py-2 mr-4  md:w-96'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md px-4 py-2'
        >
          Submit
        </button>
      </div>
    </div>
  );
}

const Root = () => {
  return (
    <div className='container mx-auto'>
      <Outlet />
    </div>
  );
};
