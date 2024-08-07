import Image from "next/image";
import { StableWebsite } from "./components/StableWebsite";

interface Image {
  url: string;
  prompt: String;
}

const fetchImageData = async (prompt: string) => {
  const res = await fetch('https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1,key2,key3', {
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

export default function Home() {




  return (
    <main>
      <h1>landing Page</h1>
      <StableWebsite />
    </main>
  );
}

