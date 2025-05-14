
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WebcamCapture from "@/components/WebcamCapture";
import ImageUpload from "@/components/ImageUpload";
import DetectionResults from "@/components/DetectionResults";
import { toast } from "sonner";
import RecentDetections from "@/components/RecentDetections";
import { Loader2 } from "lucide-react";

interface Detection {
  id: string;
  imageData: string;
  facesDetected: number;
  timestamp: Date;
}

const Index = () => {
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);
  const [recentDetections, setRecentDetections] = useState<Detection[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // This function would be connected to a real Python backend in production
  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    
    try {
      // Simulating API call to Python backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, we would send the image to a Python backend
      // const response = await fetch('/api/detect-faces', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ image: imageData })
      // });
      // const data = await response.json();
      
      // For demonstration, we'll just return the original image with simulated results
      const detectedFaces = Math.floor(Math.random() * 3) + 1;
      setFacesDetected(detectedFaces);
      setResultImage(imageData);
      
      // Add to recent detections
      const newDetection = {
        id: Date.now().toString(),
        imageData: imageData,
        facesDetected: detectedFaces,
        timestamp: new Date()
      };
      
      setRecentDetections(prev => [newDetection, ...prev].slice(0, 5));
      toast.success(`${detectedFaces} face${detectedFaces !== 1 ? 's' : ''} detected!`);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResultImage(null);
    setFacesDetected(0);
  };

  const loadDetectionFromHistory = (detection: Detection) => {
    setResultImage(detection.imageData);
    setFacesDetected(detection.facesDetected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Face Detection App</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Upload an image or use your webcam to detect faces. This frontend would connect to a Python backend for face detection.
          </p>
        </header>

        <Card className="border-slate-200 shadow-md mb-8">
          <CardHeader>
            <CardTitle>Detect Faces</CardTitle>
            <CardDescription>
              Choose an input method to detect faces in images
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-700" />
                  <span className="font-medium">Processing image...</span>
                </div>
              </div>
            )}
            
            {!resultImage ? (
              <Tabs defaultValue="webcam" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="webcam">Webcam</TabsTrigger>
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                </TabsList>
                <TabsContent value="webcam">
                  <WebcamCapture 
                    onCapture={processImage}
                    isProcessing={isProcessing} 
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <ImageUpload 
                    onImageSelected={processImage}
                    isProcessing={isProcessing} 
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <DetectionResults
                imageUrl={resultImage}
                facesDetected={facesDetected}
              />
            )}
          </CardContent>
          {resultImage && (
            <CardFooter className="flex justify-center gap-3">
              <Button onClick={handleReset} variant="outline" className="w-full md:w-auto">
                Detect Another Image
              </Button>
              <Button 
                onClick={() => setShowHistory(!showHistory)} 
                variant="secondary" 
                className="w-full md:w-auto"
              >
                {showHistory ? "Hide History" : "Show History"}
              </Button>
            </CardFooter>
          )}
        </Card>

        {showHistory && recentDetections.length > 0 && (
          <RecentDetections 
            detections={recentDetections} 
            onSelect={loadDetectionFromHistory} 
          />
        )}

        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>
            Face Detection App - Frontend Demo
          </p>
          <p className="mt-1">
            Note: This is a frontend demo. In a real implementation, detection would be performed by a Python backend.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
