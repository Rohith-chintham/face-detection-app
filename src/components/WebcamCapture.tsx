
import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from "@/components/ui/button";
import { Camera, Redo } from "lucide-react";

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void;
  isProcessing: boolean;
}

const WebcamCapture = ({ onCapture, isProcessing }: WebcamCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Handle camera ready state
  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  const processImage = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  // Set webcam dimensions
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="flex flex-col items-center">
      {!capturedImage ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-md bg-slate-100 rounded-md overflow-hidden relative">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              className="w-full h-auto"
            />
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <p className="text-slate-500">Loading camera...</p>
              </div>
            )}
          </div>
          <Button
            onClick={capture}
            disabled={!isCameraReady}
            className="mt-4"
          >
            <Camera className="mr-2 h-4 w-4" /> Capture Photo
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-md bg-slate-100 rounded-md overflow-hidden">
            <img src={capturedImage} alt="Captured" className="w-full h-auto" />
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={retake}>
              <Redo className="mr-2 h-4 w-4" /> Retake
            </Button>
            <Button onClick={processImage} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Detect Faces"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
