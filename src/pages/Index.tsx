
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WebcamCapture from "@/components/WebcamCapture";
import ImageUpload from "@/components/ImageUpload";
import DetectionResults from "@/components/DetectionResults";
import { toast } from "sonner";

const Index = () => {
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Face Detection App</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Upload an image or use your webcam to detect faces. This frontend would connect to a Python backend for face detection.
          </p>
        </header>

        <Card className="border-slate-200 shadow-md">
          <CardHeader>
            <CardTitle>Detect Faces</CardTitle>
            <CardDescription>
              Choose an input method to detect faces in images
            </CardDescription>
          </CardHeader>
          <CardContent>
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
            <CardFooter className="flex justify-center">
              <Button onClick={handleReset} variant="outline" className="w-full md:w-auto">
                Detect Another Image
              </Button>
            </CardFooter>
          )}
        </Card>

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
