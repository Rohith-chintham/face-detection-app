
import { useState, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageSelected: (imageData: string) => void;
  isProcessing: boolean;
}

const ImageUpload = ({ onImageSelected, isProcessing }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleProcess = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      
      {!selectedImage ? (
        <div 
          onClick={handleButtonClick}
          className="w-full max-w-md h-64 border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <Upload className="h-10 w-10 text-slate-400 mb-2" />
          <p className="text-slate-600">Click to upload an image</p>
          <p className="text-sm text-slate-500 mt-1">JPG, PNG, GIF supported</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-md bg-slate-100 rounded-md overflow-hidden">
            <img src={selectedImage} alt="Selected" className="w-full h-auto" />
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={handleReset}>
              <Upload className="mr-2 h-4 w-4" /> Choose Different Image
            </Button>
            <Button onClick={handleProcess} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Detect Faces"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
