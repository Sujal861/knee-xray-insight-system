
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Upload, FileText, Info, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/FileUpload';
import GradeDisplay from '@/components/GradeDisplay';
import GradeExamples from '@/components/GradeExamples';
import KLGradeInfo from '@/components/KLGradeInfo';
import { predictImage, PredictionResult } from '@/services/predictionService';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select an X-ray image first.",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const prediction = await predictImage(selectedFile);
      setResult(prediction);
      setActiveTab('results');
      
      toast({
        title: "Analysis Complete",
        description: `Detected Grade ${prediction.grade} osteoarthritis with ${(prediction.confidence * 100).toFixed(0)}% confidence.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing the image. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getGradeSeverityText = (grade: number) => {
    const severities = ["No", "Doubtful", "Mild", "Moderate", "Severe"];
    return severities[grade];
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Knee Osteoarthritis Detection System</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a knee X-ray image to analyze and detect osteoarthritis severity using our machine learning system
          based on the Kellgren-Lawrence grading scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload X-ray
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!result}>
                <FileText className="mr-2 h-4 w-4" />
                Analysis Results
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Knee X-ray Image</CardTitle>
                  <CardDescription>
                    Upload a knee X-ray image in JPG, PNG, or DICOM format for OA detection.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!imagePreview ? (
                    <FileUpload 
                      onFileSelected={handleFileSelected}
                      allowedTypes={['.jpg', '.jpeg', '.png', '.dcm', '.dicom']}
                      maxSizeMB={10}
                    />
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="X-ray preview" 
                          className="w-full max-h-80 object-contain bg-black rounded-md"
                        />
                        <button 
                          onClick={clearFile}
                          className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black"
                          aria-label="Remove image"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {selectedFile?.name} ({(selectedFile?.size ? selectedFile.size / (1024 * 1024) : 0).toFixed(2)} MB)
                        </p>
                        <Button variant="outline" size="sm" onClick={clearFile}>
                          Replace
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={!selectedFile || isAnalyzing}
                    className="w-full sm:w-auto"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze X-ray'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="results" className="mt-4">
              {result ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      Analysis Results
                      <span className="ml-auto text-sm font-normal text-gray-500">
                        {selectedFile?.name}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/5">
                        {imagePreview && (
                          <img 
                            src={imagePreview} 
                            alt="X-ray" 
                            className="w-full max-h-80 object-contain bg-black rounded-md"
                          />
                        )}
                      </div>
                      <div className="md:w-3/5">
                        <Alert className={`mb-4 ${result.grade >= 3 ? 'border-amber-600' : 'border-medical-600'}`}>
                          <AlertCircle className={`h-4 w-4 ${result.grade >= 3 ? 'text-amber-600' : 'text-medical-600'}`} />
                          <AlertTitle>
                            {getGradeSeverityText(result.grade)} Osteoarthritis Detected
                          </AlertTitle>
                          <AlertDescription>
                            The system detected {getGradeSeverityText(result.grade).toLowerCase()} osteoarthritis 
                            (KL Grade {result.grade}) in this knee X-ray.
                          </AlertDescription>
                        </Alert>
                        
                        <GradeDisplay 
                          grade={result.grade} 
                          confidence={result.confidence}
                          probabilities={result.probabilities}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <GradeExamples selectedGrade={result.grade} />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab('upload')}>
                      Back to Upload
                    </Button>
                    <Button>Save Report</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500">No analysis results yet. Please upload and analyze an X-ray first.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <KLGradeInfo />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-medical-600" />
                Detection System Info
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="mb-3">
                This knee osteoarthritis detection system demonstrates how AI can assist in analyzing 
                medical images. The system:
              </p>
              
              <ul className="list-disc pl-5 space-y-1.5 mb-4">
                <li>Uses deep learning to classify knee X-rays</li>
                <li>Based on the Kellgren-Lawrence grading scale</li>
                <li>Provides confidence scores for each grade</li>
                <li>Visualizes results for easier interpretation</li>
              </ul>
              
              <p className="text-xs text-gray-500 mt-4">
                Note: This is a demonstration system using simulated predictions.
                In a real medical implementation, the system would use a properly trained
                neural network model and validated medical data.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
