// components/Modal.tsx
"use client"

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-300 px-4 py-2 rounded">
            Annuler
          </button>
          <button onClick={onConfirm} className="bg-blue-600 text-white px-4 py-2 rounded">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
