
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";

interface Detection {
  id: string;
  imageData: string;
  facesDetected: number;
  timestamp: Date;
}

interface RecentDetectionsProps {
  detections: Detection[];
  onSelect: (detection: Detection) => void;
}

const RecentDetections = ({ detections, onSelect }: RecentDetectionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Detections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {detections.map((detection) => (
            <div 
              key={detection.id}
              className="border border-slate-200 rounded-md overflow-hidden cursor-pointer hover:border-slate-400 transition-colors"
              onClick={() => onSelect(detection)}
            >
              <div className="relative">
                <img 
                  src={detection.imageData} 
                  alt={`Detection ${detection.id}`} 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{detection.facesDetected}</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 text-xs text-slate-600">
                {formatDistanceToNow(new detection.timestamp, { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentDetections;
