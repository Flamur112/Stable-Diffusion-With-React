import React from 'react';
import { StableWebsite } from './components/StableWebsite';


export default function Home() {
  return (
    <main>
      <h1>Landing Page</h1>
      <StableWebsite />

      <div className="container">
  <h1 className="text-3xl font-bold">Welcome to My Website</h1>
  <p className="mt-4">This is a paragraph inside a responsive container.</p>
</div>
    </main>
  );
};