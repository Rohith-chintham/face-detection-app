
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface DetectionResultsProps {
  imageUrl: string;
  facesDetected: number;
}

const DetectionResults = ({ imageUrl, facesDetected }: DetectionResultsProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-md bg-slate-100 rounded-md overflow-hidden mb-4">
        <img src={imageUrl} alt="Processed" className="w-full h-auto" />
        
        {/* Visual indicators for detected faces */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: facesDetected }).map((_, index) => (
            <div 
              key={index}
              className="absolute bg-green-500/20 border-2 border-green-500 rounded-md flex items-center justify-center"
              style={{
                width: `${50 + Math.random() * 20}px`,
                height: `${50 + Math.random() * 20}px`,
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + (index * 30) + Math.random() * 40}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <User className="text-green-500 h-6 w-6 opacity-70" />
            </div>
          ))}
        </div>
      </div>
      
      <Card className="w-full p-4 bg-slate-50 border border-slate-200">
        <h3 className="font-medium text-lg mb-2 text-center">Detection Results</h3>
        <div className="flex justify-between items-center p-2 rounded-md bg-white border border-slate-100">
          <span>Faces detected:</span>
          <span className="font-semibold">{facesDetected}</span>
        </div>
        
        {/* Confidence score visualization */}
        <div className="flex justify-between items-center p-2 mt-2 rounded-md bg-white border border-slate-100">
          <span>Detection confidence:</span>
          <div className="w-32 bg-slate-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${85 + Math.random() * 15}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 mt-3 text-center">
          Note: In a real implementation, the Python backend would provide detailed face locations and attributes.
        </p>
      </Card>
    </div>
  );
};

export default DetectionResults;
