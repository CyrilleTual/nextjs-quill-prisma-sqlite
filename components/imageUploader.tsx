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
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    };

    try {
      //console.log( "imageFile , ", imageFile);
      const compressedFile = await imageCompression(imageFile, options);

      //console.log("compressedFile , ", compressedFile);
      //console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true

      // Passer le fichier compressé directement sous forme de Blob
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
    <div>
      <h2>Vous pouvez ajouter une image</h2>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageUpload}
      />
      {imageSrc && (
        <div className="relative flex justify-center items-center bg-slate-300 h-[200px] w-[200px]">
          <Image
            src={imageSrc}
            alt="Image compressée"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
