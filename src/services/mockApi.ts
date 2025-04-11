
import { v4 as uuidv4 } from 'uuid';

// Types for mock data
interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  is_admin: boolean;
}

interface Prediction {
  id: number;
  user_id: number;
  grade: string;
  grade_index: number;
  confidence: number;
  probabilities: Record<string, number>;
  date: string;
  interpretation: string;
}

// Mock users
const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    created_at: '2023-01-01 00:00:00',
    is_admin: true
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    created_at: '2023-01-02 00:00:00',
    is_admin: false
  }
];

// Mock predictions
const mockPredictions: Prediction[] = [
  {
    id: 1,
    user_id: 2,
    grade: 'Grade 2',
    grade_index: 2,
    confidence: 0.85,
    probabilities: {
      'Grade 0': 0.05,
      'Grade 1': 0.10,
      'Grade 2': 0.85,
      'Grade 3': 0.05,
      'Grade 4': 0.05
    },
    date: '2023-03-15 14:30:00',
    interpretation: 'Definite osteophytes. Possible narrowing of joint space.'
  }
];

// Create a more deterministic but varied prediction based on image characteristics
const generatePrediction = async (file: File) => {
  // Create a deterministic but varied seed based on file properties
  let seed = 0;
  
  // Use file size as part of the seed
  seed += file.size % 100;
  
  // Use last modified timestamp as part of the seed
  seed += Math.floor(file.lastModified / 1000) % 100;
  
  // Use filename as additional seed component
  seed += Array.from(file.name).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 100;
  
  // Read a small part of the file to add more uniqueness
  try {
    // Read first few bytes of the file to add to uniqueness
    const arrayBuffer = await file.slice(0, 1024).arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < Math.min(20, bytes.length); i++) {
      seed += bytes[i];
    }
  } catch (e) {
    // If we can't read the file, just continue with the filename-based seed
    console.log("Couldn't read file content for more unique prediction", e);
  }
  
  // Normalize seed to 0-1 range
  const randomValue = (seed % 100) / 100;
  
  // Determine grade based on normalized seed
  let grade: number;
  if (randomValue < 0.20) {
    grade = 0;
  } else if (randomValue < 0.40) {
    grade = 1;
  } else if (randomValue < 0.60) {
    grade = 2;
  } else if (randomValue < 0.80) {
    grade = 3;
  } else {
    grade = 4;
  }
  
  // Create probabilities with highest for the selected grade
  const baseProbabilities = [0.05, 0.05, 0.05, 0.05, 0.05];
  
  // Add extra probability to the chosen grade
  const extraProb = 0.5 + (randomValue * 0.3);
  baseProbabilities[grade] += extraProb;
  
  // Distribute remaining probability
  const remainingProb = 1 - baseProbabilities.reduce((a, b) => a + b, 0);
  
  // Distribute the remaining across all grades with some randomness
  const normalizedProbabilities = baseProbabilities.map((prob, i) => {
    const adjustment = i === grade ? 0.6 : 0.1;
    return prob + (remainingProb * adjustment * (1 + Math.sin(seed + i)));
  });
  
  // Normalize to ensure sum is 1
  const sum = normalizedProbabilities.reduce((a, b) => a + b, 0);
  const finalProbabilities = normalizedProbabilities.map(p => p / sum);
  
  const interpretations = [
    "No signs of osteoarthritis. Joint appears healthy.",
    "Doubtful narrowing of joint space. Possible osteophytes.",
    "Definite osteophytes. Possible narrowing of joint space.",
    "Moderate multiple osteophytes. Definite narrowing of joint space. Some sclerosis. Possible deformity.",
    "Large osteophytes. Marked narrowing of joint space. Severe sclerosis. Definite deformity."
  ];
  
  return {
    grade: `Grade ${grade}`,
    grade_index: grade,
    confidence: finalProbabilities[grade],
    interpretation: interpretations[grade],
    probabilities: {
      'Grade 0': finalProbabilities[0],
      'Grade 1': finalProbabilities[1],
      'Grade 2': finalProbabilities[2],
      'Grade 3': finalProbabilities[3],
      'Grade 4': finalProbabilities[4]
    },
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
};

// Create a mock implementation of the API service
export const register = async (username: string, email: string, password: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user exists
  if (mockUsers.some(u => u.username === username)) {
    throw new Error('Username already exists');
  }
  
  if (mockUsers.some(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  
  // Add user
  const newUser = {
    id: mockUsers.length + 1,
    username,
    email,
    created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
    is_admin: false
  };
  
  mockUsers.push(newUser);
  
  return { message: 'User created successfully' };
};

export const login = async (username: string, password: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find user
  const user = mockUsers.find(u => u.username === username);
  
  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  // In a real app, we'd check the password hash
  // For this mock, we'll accept any password
  
  const token = `mock-jwt-token-${uuidv4()}`;
  
  // Store auth data
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_id', user.id.toString());
  localStorage.setItem('username', user.username);
  localStorage.setItem('is_admin', user.is_admin.toString());
  
  return {
    token,
    user_id: user.id,
    username: user.username,
    is_admin: user.is_admin
  };
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('username');
  localStorage.removeItem('is_admin');
};

export const predictImage = async (file: File) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate prediction based on image content and properties
  const result = await generatePrediction(file);
  
  // Add to mock predictions
  const userId = parseInt(localStorage.getItem('user_id') || '0');
  if (userId > 0) {
    mockPredictions.push({
      id: mockPredictions.length + 1,
      user_id: userId,
      grade: result.grade,
      grade_index: result.grade_index,
      confidence: result.confidence,
      probabilities: result.probabilities,
      date: result.timestamp,
      interpretation: result.interpretation
    });
  }
  
  return { data: result };
};

export const getUserHistory = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userId = parseInt(localStorage.getItem('user_id') || '0');
  
  const userPredictions = mockPredictions
    .filter(p => p.user_id === userId)
    .map(p => ({
      id: p.id,
      grade: p.grade,
      confidence: p.confidence,
      date: p.date,
      results: {
        grade: p.grade,
        grade_index: p.grade_index,
        confidence: p.confidence,
        probabilities: p.probabilities,
        interpretation: p.interpretation
      }
    }));
  
  return { data: userPredictions };
};

export const getUsers = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user is admin
  const isAdmin = localStorage.getItem('is_admin') === 'true';
  
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }
  
  return { data: mockUsers };
};

export const getAllPredictions = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user is admin
  const isAdmin = localStorage.getItem('is_admin') === 'true';
  
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }
  
  return { data: mockPredictions.map(p => ({
    ...p,
    username: mockUsers.find(u => u.id === p.user_id)?.username || 'unknown'
  })) };
};

export default {
  register,
  login,
  logout,
  predictImage,
  getUserHistory,
  getUsers,
  getAllPredictions
};
