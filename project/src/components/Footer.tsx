import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} TextileMS. All rights reserved.</p>
      </div>
    </footer>
  );
}