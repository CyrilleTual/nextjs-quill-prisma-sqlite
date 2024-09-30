import Link from 'next/link';
import React from 'react'

export default function Header() {
  return (
    <div className="flex justify-center items-center space-x-6 bg-slate-200 py-4 shadow-md">
      <Link
        href="/write"
        className="inline-block w-30 px-6  py-1 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Ecrire
      </Link>
      <Link
        href="/read"
        className="inline-block w-30 px-6 py-1 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Lire
      </Link>
      <Link
        href="/delete"
        className="inline-block w-30 px-6 py-1 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Supprimer
      </Link>
    </div>
  );
   
}
