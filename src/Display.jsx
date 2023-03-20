import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Display({ str }) {
  const originalStr = [...str];
  const [resultantStr, setResultantStr] = useState(originalStr);

  function deleteElementAtIndexAndUpdateArray(
    index,
    char,
    resultantStr,
    setResultantStr
  ) {
    // Create a new array that excludes the element at the given index
    const newArr = [...resultantStr];
    let found = false;

    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === char) {
        if (found) {
          newArr.splice(i, 1);
          i--;
        } else {
          found = true;
        }
      }
    }

    newArr.splice(index, 1, char);

    setResultantStr(newArr);
  }

  const handleDelete = (char, index) => {
    deleteElementAtIndexAndUpdateArray(
      index,
      char,
      resultantStr,
      setResultantStr
    );
  };
  const isDuplicate = (char) => {
    return resultantStr.indexOf(char) !== resultantStr.lastIndexOf(char);
  };

  const charToColorMap = {};
  const colors = [
    'bg-blue-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-pink-200',
    'bg-purple-200',
    'bg-indigo-200',
  ];
  let colorIndex = 0;
  originalStr.forEach((char) => {
    if (!(char in charToColorMap)) {
      charToColorMap[char] = colors[colorIndex % colors.length];
      colorIndex++;
    }
  });

  console.log(charToColorMap);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-6'>Screen 2</h1>
      <div className='mb-6'>
        <p className='text-lg font-bold mb-2'>Original String:</p>
        <p className='text-xl'>{originalStr}</p>
      </div>
      <div className='mb-6'>
        <p className='text-lg font-bold mb-2'>Resultant String:</p>
        <p className='text-xl'>{resultantStr}</p>
      </div>
      <div className='mb-6 w-full grid grid-rows-5 grid-cols-4 p-5 gap-2 items-center h-full justify-center'>
        {resultantStr.map((char, index) => (
          <div
            key={index}
            className={`flex items-center justify-between border border-gray-500 rounded-md px-4 py-2 mb-2  gap-2 ${
              isDuplicate(char) ? charToColorMap[char] : ''
            }`}
          >
            <span className='text-2xl font-bold'>{char}</span>
            <button
              className='text-red-500 hover:text-red-700 font-bold self-start '
              onClick={() => handleDelete(char, index)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
