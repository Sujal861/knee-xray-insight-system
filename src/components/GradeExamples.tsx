
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GradeExamplesProps {
  selectedGrade?: number;
}

const GradeExamples = ({ selectedGrade }: GradeExamplesProps) => {
  const grades = [
    {
      grade: 0,
      name: "Grade 0 - Normal",
      description: "No signs of osteoarthritis. Joint space is preserved with no osteophytes.",
      imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
    },
    {
      grade: 1,
      name: "Grade 1 - Doubtful",
      description: "Doubtful joint space narrowing with possible osteophyte formation.",
      imageSrc: "https://images.unsplash.com/photo-1579684288361-5c1a2957cc28?auto=format&fit=crop&q=80", 
    },
    {
      grade: 2,
      name: "Grade 2 - Minimal",
      description: "Definite osteophytes with possible joint space narrowing.",
      imageSrc: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80",
    },
    {
      grade: 3,
      name: "Grade 3 - Moderate",
      description: "Moderate osteophytes with definite joint space narrowing and some bone deformity.",
      imageSrc: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
    },
    {
      grade: 4,
      name: "Grade 4 - Severe",
      description: "Large osteophytes with severe joint space narrowing and marked bone deformity.",
      imageSrc: "https://images.unsplash.com/photo-1521404238223-6a7935eb9d5e?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Kellgren-Lawrence Grading Scale Examples</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {grades.map((grade) => (
          <Card 
            key={grade.grade}
            className={cn(
              "overflow-hidden transition-all duration-300",
              selectedGrade === grade.grade && "ring-2 ring-medical-500"
            )}
          >
            <div 
              className="h-28 bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${grade.imageSrc})` }}
            />
            <CardContent className="p-3">
              <h4 className="font-medium text-sm">{grade.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{grade.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Note: These are example illustrations of the Kellgren-Lawrence grading scale. 
        Actual radiographic features may vary.
      </p>
    </div>
  );
};

export default GradeExamples;
