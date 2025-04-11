
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  AlertTriangle,
  Info
} from 'lucide-react';

const KLGradeInfo = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-medical-600" />
          About the Kellgren-Lawrence Grading Scale
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="mb-3">
          The Kellgren-Lawrence (KL) system is the most widely used radiographic 
          classification for osteoarthritis. It grades the severity of knee osteoarthritis 
          on a scale from 0 to 4 based on X-ray findings:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Grade 0:</strong> No radiographic features of osteoarthritis</li>
          <li><strong>Grade 1:</strong> Doubtful joint space narrowing and possible osteophytic lipping</li>
          <li><strong>Grade 2:</strong> Definite osteophytes and possible joint space narrowing</li>
          <li><strong>Grade 3:</strong> Moderate multiple osteophytes, definite joint space narrowing, 
            some sclerosis and possible deformity</li>
          <li><strong>Grade 4:</strong> Large osteophytes, marked joint space narrowing, 
            severe sclerosis and definite deformity</li>
        </ul>
        
        <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-md">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <p className="text-yellow-700 font-medium">Medical Disclaimer</p>
            <p className="text-xs text-yellow-600">
              This is a demonstration system and should not be used for actual medical diagnosis. 
              Always consult with qualified healthcare professionals for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KLGradeInfo;
