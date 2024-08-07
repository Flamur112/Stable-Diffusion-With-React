'use client'
import React from 'react'


interface ImageData {
    url: string;
    prompt: string;
  }
  
  // Function to handle POST request
  const fetchImageData = async (prompt: string): Promise<ImageData> => {
    const res = await fetch('POST_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch image data');
    }
    const data = await res.json();
    return data;
  };
  
  // Function to handle GET request
  const getImageData = async (): Promise<ImageData> => {
    const res = await fetch('https://dummyjson.com/image/150', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch image data');
    }
    const data = await res.json();
    console.log(data); // Log the data to the console
    return data;
  };

export const StableWebsite = () => {
  return (
    <div>
        <button onClick={getImageData}>Stable</button>
    </div>
  )
}
