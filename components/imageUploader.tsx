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
      console.log( "imageFile , ", imageFile);
      const compressedFile = await imageCompression(imageFile, options);
      console.log("compressedFile , ", compressedFile);
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
      <h2 className="">Vous pouvez ajouter une image</h2>
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

export default ImageUploader;
