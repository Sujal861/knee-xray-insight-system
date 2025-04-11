
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
  
  // Mock a random prediction result
  const gradeIndex = Math.floor(Math.random() * 5);
  const confidence = 0.5 + Math.random() * 0.5; // Random confidence between 0.5 and 1.0
  
  // Generate probabilities that sum to 1.0
  let probabilities: Record<string, number> = {};
  let remaining = 1.0 - confidence;
  
  for (let i = 0; i < 5; i++) {
    if (i === gradeIndex) {
      probabilities[`Grade ${i}`] = confidence;
    } else {
      const prob = remaining / 4;
      probabilities[`Grade ${i}`] = prob;
    }
  }
  
  const interpretations = [
    "No signs of osteoarthritis. Joint appears healthy.",
    "Doubtful narrowing of joint space. Possible osteophytes.",
    "Definite osteophytes. Possible narrowing of joint space.",
    "Moderate multiple osteophytes. Definite narrowing of joint space. Some sclerosis. Possible deformity.",
    "Large osteophytes. Marked narrowing of joint space. Severe sclerosis. Definite deformity."
  ];
  
  const result = {
    grade: `Grade ${gradeIndex}`,
    grade_index: gradeIndex,
    confidence,
    interpretation: interpretations[gradeIndex],
    probabilities,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  
  // Add to mock predictions
  const userId = parseInt(localStorage.getItem('user_id') || '0');
  if (userId > 0) {
    mockPredictions.push({
      id: mockPredictions.length + 1,
      user_id: userId,
      ...result,
      date: result.timestamp
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
