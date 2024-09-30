// components/header.tsx
"use client"

import Link from 'next/link';
import  { useState } from 'react'
import { handleDelete } from '@/lib/deletePosts';
import Modal from './modal';






export default function Header() {

const [isModalOpen, setIsModalOpen] = useState(false);

const confirmDelete = async () => {
  await handleDelete(); // Appelez la fonction de suppression
  setIsModalOpen(false); // Ferme le modal après la confirmation
};

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
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-block w-30 px-6 py-1 text-lg font-semibold text-white bg-red-600 rounded-lg transition-transform transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Supprimer
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Êtes-vous sûr de vouloir supprimer tous les posts (sauf le premier) ?"
      />
    </div>
  );
   
}
