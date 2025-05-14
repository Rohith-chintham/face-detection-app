
import { Card } from "@/components/ui/card";

interface DetectionResultsProps {
  imageUrl: string;
  facesDetected: number;
}

const DetectionResults = ({ imageUrl, facesDetected }: DetectionResultsProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-md bg-slate-100 rounded-md overflow-hidden mb-4">
        <img src={imageUrl} alt="Processed" className="w-full h-auto" />
      </div>
      
      <Card className="w-full p-4 bg-slate-50 border border-slate-200">
        <h3 className="font-medium text-lg mb-2 text-center">Detection Results</h3>
        <div className="flex justify-between items-center p-2 rounded-md bg-white border border-slate-100">
          <span>Faces detected:</span>
          <span className="font-semibold">{facesDetected}</span>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Note: In a real implementation, the Python backend would provide detailed face locations and attributes.
        </p>
      </Card>
    </div>
  );
};

export default DetectionResults;
