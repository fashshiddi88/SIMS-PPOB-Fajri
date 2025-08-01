"use client";

import type React from "react";
import PhotoDefault from "../assets/ProfilePhoto.png";
import { useRef } from "react";
import { Edit3 } from "lucide-react";

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  onImageChange?: (file: File) => void;
}

export default function ProfilePhoto({
  src,
  alt = "Profile Photo",
  onImageChange,
}: ProfilePhotoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageSrc =
    src && !src.toLowerCase().endsWith("/null") ? src : PhotoDefault;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 100 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Format gambar tidak didukung. Gunakan JPEG atau PNG.");
      return;
    }

    if (file.size > maxSize) {
      alert("Ukuran gambar terlalu besar. Maksimal 100 KB.");
      return;
    }

    if (onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="relative inline-block">
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handlePhotoClick}
      >
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
      </div>

      <button
        onClick={handlePhotoClick}
        className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <Edit3 className="w-4 h-4 text-black-600" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
