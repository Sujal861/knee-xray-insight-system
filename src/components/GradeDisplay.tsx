
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface GradeDisplayProps {
  grade: number;
  confidence: number;
  probabilities: number[];
}

const GradeDisplay = ({ grade, confidence, probabilities }: GradeDisplayProps) => {
  const gradeDescriptions = [
    "No signs of osteoarthritis. Joint appears healthy.",
    "Doubtful narrowing of joint space. Possible osteophytes.",
    "Definite osteophytes. Possible narrowing of joint space.",
    "Moderate multiple osteophytes. Definite narrowing of joint space. Some sclerosis. Possible deformity.",
    "Large osteophytes. Marked narrowing of joint space. Severe sclerosis. Definite deformity."
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-2">
          Grade {grade} 
          <span className="text-lg font-normal text-gray-500 ml-2">
            ({(confidence * 100).toFixed(0)}% confidence)
          </span>
        </h3>
        <p className="text-center text-gray-700">{gradeDescriptions[grade]}</p>
      </div>

      <div className="relative pt-12 pb-4">
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          {[0, 1, 2, 3, 4].map((g) => (
            <div 
              key={g} 
              className="flex flex-col items-center"
              style={{ width: '20%' }}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-1 text-sm font-medium",
                grade === g ? "bg-medical-600 text-white" : "bg-gray-200 text-gray-600"
              )}>
                {g}
              </div>
              <span className="text-xs text-gray-500 hidden md:block">Grade {g}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-medical-600 transition-all duration-700 ease-out"
            style={{ width: `${(grade / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <h4 className="font-medium text-gray-800">Probability by Grade</h4>
        {probabilities.map((prob, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Grade {i}</span>
              <span className="font-medium">{(prob * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={prob * 100} 
              className={cn(
                "h-2", 
                grade === i ? "bg-gray-200" : "bg-gray-100",
                grade === i ? "bg-medical-600" : "bg-medical-300"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeDisplay;
