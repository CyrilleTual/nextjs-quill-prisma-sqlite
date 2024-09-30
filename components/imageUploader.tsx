// components/imageUploader.tsx

"use client";
import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import Image from "next/image";

interface ImageUploaderProps {
  onImageUpload: (image: Blob) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;

    const imageFile = files[0];

    // Verifie du type MIME de l'image
    if (!imageFile.type.startsWith("image/")) {
      alert("Veuillez télécharger un fichier image valide.");
      return;
    }

    // Vérification de la taille du fichier (ex. taille max 2MB)
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (imageFile.size > maxFileSize) {
      alert("La taille de l'image ne doit pas dépasser 2MB.");
      return;
    }

    const validImage = await validateImage(imageFile);
    if (!validImage) {
      alert("The file is not a valid image.");
      return;
    }

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    };

    try {
      //console.log( "imageFile , ", imageFile);
      const compressedFile = await imageCompression(imageFile, options);
      //console.log("compressedFile , ", compressedFile);
      onImageUpload(compressedFile);
      // Créer une URL temporaire pour l'affichage
      const imageUrl = URL.createObjectURL(compressedFile);
      setImageSrc(imageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc); // Libérer l'URL temporaire
      }
    };
  }, [imageSrc]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="">Vous pouvez ajouter une image (jpeg / png - max 2Mo)</h2>
      <input
        className="m-4"
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageUpload}
      />
      {
        <div className="bg-slate-200 flex justify-center items-center  relative h-[200px] w-[200px] rounded-md">
          {imageSrc && (
            <Image
              src={imageSrc}
              className="rounded-md"
              alt="Image"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
      }
    </div>
  );
};

// Helper function to validate if file is an image
const validateImage = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export default ImageUploader;
