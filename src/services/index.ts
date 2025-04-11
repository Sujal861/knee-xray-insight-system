
// Import both real and mock API services
import * as realApi from './api';
import * as mockApi from './mockApi';

// Determine which implementation to use
// Use mock API in development or if explicitly requested
const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true' || import.meta.env.DEV;

// Export the appropriate implementation
export default useMockApi ? mockApi : realApi;

// Re-export individual functions
export const {
  register,
  login,
  logout,
  predictImage,
  getUserHistory,
  getUsers,
  getAllPredictions
} = useMockApi ? mockApi : realApi;
