
import { toast } from '@/components/ui/use-toast';
import { create } from 'zustand';

// Types for database models
export interface UserData {
  id: string;
  email: string;
  name: string;
  password: string; // Will be hashed in a real backend
  role: 'farmer' | 'researcher' | 'student' | 'business' | 'other';
  createdAt: Date;
  lastLogin: Date;
}

export interface PlantAnalysis {
  id: string;
  userId: string;
  imageUrl: string;
  plantName: string;
  scientificName: string;
  confidence: number;
  properties: Record<string, any>;
  createdAt: Date;
}

export interface DiseaseDetection {
  id: string;
  userId: string;
  imageUrl: string;
  plantName: string;
  diseaseName: string;
  confidence: number;
  recommendations: string[];
  createdAt: Date;
}

export interface SensorData {
  id: string;
  userId: string;
  deviceId: string;
  timestamp: Date;
  sensorType: string;
  value: number;
  unit: string;
}

export interface UserQuery {
  id: string;
  userId: string;
  query: string;
  timestamp: Date;
  category: 'plant' | 'disease' | 'fertilizer' | 'general';
  response?: string;
}

// Store to maintain database connection state
interface MongoDBState {
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  setConnected: (status: boolean) => void;
  setConnecting: (status: boolean) => void;
  setConnectionError: (error: string | null) => void;
}

const useMongoDBStore = create<MongoDBState>((set) => ({
  isConnected: false,
  isConnecting: false,
  connectionError: null,
  setConnected: (status) => set({ isConnected: status }),
  setConnecting: (status) => set({ isConnecting: status }),
  setConnectionError: (error) => set({ connectionError: error }),
}));

class MongoDBService {
  private readonly connectionString: string = 'mongodb+srv://deepanshusnpt:122ZUNw9w6PNKUpt@farmer.lxen6.mongodb.net/';
  
  constructor() {
    console.log('MongoDB Service initialized');
    this.connectToDatabase();
  }

  private async connectToDatabase(): Promise<boolean> {
    const { setConnecting, setConnected, setConnectionError } = useMongoDBStore.getState();
    
    try {
      setConnecting(true);
      console.log('Connecting to MongoDB...');
      
      // In a real implementation, we would use a backend API to connect to MongoDB
      // Since we can't directly connect from the browser, we'll simulate the connection
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll connect successfully
      console.log('MongoDB connected successfully');
      setConnected(true);
      setConnecting(false);
      setConnectionError(null);
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      setConnected(false);
      setConnecting(false);
      setConnectionError((error as Error).message);
      return false;
    }
  }

  // --- Authentication methods ---
  
  async authenticateUser(email: string, password: string): Promise<UserData | null> {
    try {
      console.log(`Authenticating user: ${email}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, we would make an API call to authenticate
      // For demo purposes, we'll check localStorage
      const users = JSON.parse(localStorage.getItem('greensense_users') || '[]') as UserData[];
      const user = users.find(u => u.email === email);
      
      if (!user) {
        console.error('User not found');
        return null;
      }
      
      // In a real implementation, we would compare hashed passwords
      if (user.password !== password) {
        console.error('Invalid password');
        return null;
      }
      
      // Update last login
      user.lastLogin = new Date();
      
      // Update the user in localStorage
      localStorage.setItem('greensense_users', JSON.stringify(
        users.map(u => u.id === user.id ? user : u)
      ));
      
      return user;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }
  
  async registerUser(userData: Omit<UserData, 'id' | 'createdAt' | 'lastLogin'>): Promise<UserData | null> {
    try {
      console.log('Registering user:', userData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would make an API call to register
      // For demo purposes, we'll use localStorage
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('greensense_users') || '[]') as UserData[];
      
      if (users.some(u => u.email === userData.email)) {
        console.error('User already exists');
        return null;
      }
      
      // Create new user
      const newUser: UserData = {
        ...userData,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('greensense_users', JSON.stringify(users));
      
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  // --- User data methods ---
  
  async getUserById(userId: string): Promise<UserData | null> {
    try {
      console.log(`Fetching user with ID: ${userId}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const users = JSON.parse(localStorage.getItem('greensense_users') || '[]') as UserData[];
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        console.error('User not found');
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  
  async updateUserLastLogin(userId: string): Promise<boolean> {
    try {
      console.log(`Updating last login for user ID: ${userId}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const users = JSON.parse(localStorage.getItem('greensense_users') || '[]') as UserData[];
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        console.error('User not found');
        return false;
      }
      
      users[userIndex].lastLogin = new Date();
      localStorage.setItem('greensense_users', JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error('Error updating last login:', error);
      return false;
    }
  }

  // --- Plant analysis methods ---
  
  async savePlantAnalysis(analysis: Omit<PlantAnalysis, 'id' | 'createdAt'>): Promise<PlantAnalysis | null> {
    try {
      console.log('Saving plant analysis:', analysis);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new analysis with ID and timestamp
      const newAnalysis: PlantAnalysis = {
        ...analysis,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date()
      };
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const analyses = JSON.parse(localStorage.getItem('greensense_plant_analyses') || '[]') as PlantAnalysis[];
      analyses.push(newAnalysis);
      localStorage.setItem('greensense_plant_analyses', JSON.stringify(analyses));
      
      toast({
        title: "Analysis Saved",
        description: `Plant analysis for ${analysis.plantName} has been saved.`
      });
      
      return newAnalysis;
    } catch (error) {
      console.error('Error saving plant analysis:', error);
      toast({
        title: "Database Error",
        description: "Could not save plant analysis. Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  }

  async getUserPlantAnalyses(userId: string): Promise<PlantAnalysis[]> {
    try {
      console.log(`Fetching plant analyses for user ID: ${userId}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const analyses = JSON.parse(localStorage.getItem('greensense_plant_analyses') || '[]') as PlantAnalysis[];
      
      return analyses.filter(a => a.userId === userId);
    } catch (error) {
      console.error('Error fetching plant analyses:', error);
      toast({
        title: "Database Error",
        description: "Could not fetch plant analyses. Please try again later.",
        variant: "destructive"
      });
      return [];
    }
  }

  // --- Disease detection methods ---
  
  async saveDiseaseDetection(detection: Omit<DiseaseDetection, 'id' | 'createdAt'>): Promise<DiseaseDetection | null> {
    try {
      console.log('Saving disease detection:', detection);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new detection with ID and timestamp
      const newDetection: DiseaseDetection = {
        ...detection,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date()
      };
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const detections = JSON.parse(localStorage.getItem('greensense_disease_detections') || '[]') as DiseaseDetection[];
      detections.push(newDetection);
      localStorage.setItem('greensense_disease_detections', JSON.stringify(detections));
      
      toast({
        title: "Detection Saved",
        description: `Disease detection for ${detection.plantName} has been saved.`
      });
      
      return newDetection;
    } catch (error) {
      console.error('Error saving disease detection:', error);
      toast({
        title: "Database Error",
        description: "Could not save disease detection. Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  }

  async getUserDiseaseDetections(userId: string): Promise<DiseaseDetection[]> {
    try {
      console.log(`Fetching disease detections for user ID: ${userId}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const detections = JSON.parse(localStorage.getItem('greensense_disease_detections') || '[]') as DiseaseDetection[];
      
      return detections.filter(d => d.userId === userId);
    } catch (error) {
      console.error('Error fetching disease detections:', error);
      toast({
        title: "Database Error",
        description: "Could not fetch disease detections. Please try again later.",
        variant: "destructive"
      });
      return [];
    }
  }

  // --- User queries methods ---
  
  async saveUserQuery(query: Omit<UserQuery, 'id' | 'timestamp'>): Promise<UserQuery | null> {
    try {
      console.log('Saving user query:', query);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create a new query with ID and timestamp
      const newQuery: UserQuery = {
        ...query,
        id: Math.random().toString(36).substring(2, 15),
        timestamp: new Date()
      };
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const queries = JSON.parse(localStorage.getItem('greensense_user_queries') || '[]') as UserQuery[];
      queries.push(newQuery);
      localStorage.setItem('greensense_user_queries', JSON.stringify(queries));
      
      return newQuery;
    } catch (error) {
      console.error('Error saving user query:', error);
      return null;
    }
  }

  async getUserQueries(userId: string): Promise<UserQuery[]> {
    try {
      console.log(`Fetching queries for user ID: ${userId}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const queries = JSON.parse(localStorage.getItem('greensense_user_queries') || '[]') as UserQuery[];
      
      return queries.filter(q => q.userId === userId);
    } catch (error) {
      console.error('Error fetching user queries:', error);
      return [];
    }
  }

  // --- Sensor data methods ---
  
  async saveSensorData(data: Omit<SensorData, 'id'>): Promise<SensorData | null> {
    try {
      console.log('Saving sensor data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create a new data point with ID
      const newData: SensorData = {
        ...data,
        id: Math.random().toString(36).substring(2, 15)
      };
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const sensorData = JSON.parse(localStorage.getItem('greensense_sensor_data') || '[]') as SensorData[];
      sensorData.push(newData);
      localStorage.setItem('greensense_sensor_data', JSON.stringify(sensorData));
      
      return newData;
    } catch (error) {
      console.error('Error saving sensor data:', error);
      return null;
    }
  }

  async getSensorData(userId: string, deviceId: string, sensorType: string, startDate: Date, endDate: Date): Promise<SensorData[]> {
    try {
      console.log(`Fetching ${sensorType} data for device ${deviceId}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // In a real implementation, we would make an API call
      // For demo purposes, we'll use localStorage
      const sensorData = JSON.parse(localStorage.getItem('greensense_sensor_data') || '[]') as SensorData[];
      
      // Filter data by user, device, sensor type, and date range
      const filteredData = sensorData.filter(d => 
        d.userId === userId && 
        d.deviceId === deviceId && 
        d.sensorType === sensorType &&
        new Date(d.timestamp) >= startDate &&
        new Date(d.timestamp) <= endDate
      );
      
      // If we have data, return it sorted by timestamp
      if (filteredData.length > 0) {
        return filteredData.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      }
      
      // If no data, generate mock data
      const mockData: SensorData[] = [];
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        mockData.push({
          id: Math.random().toString(36).substring(2, 15),
          userId,
          deviceId,
          timestamp: new Date(currentDate),
          sensorType,
          value: sensorType === 'temperature' 
            ? 20 + Math.random() * 10 // Temperature between 20-30
            : sensorType === 'moisture'
              ? 40 + Math.random() * 30 // Moisture between 40-70%
              : 50 + Math.random() * 50, // Other sensors
          unit: sensorType === 'temperature' 
            ? '°C' 
            : sensorType === 'moisture' 
              ? '%' 
              : 'units'
        });
        
        // Increment by 1 hour
        currentDate.setHours(currentDate.getHours() + 1);
      }
      
      return mockData;
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      toast({
        title: "Data Retrieval Error",
        description: "Could not fetch sensor data. Please try again later.",
        variant: "destructive"
      });
      return [];
    }
  }
}

// Create a singleton instance
export const mongoDBService = new MongoDBService();

export default mongoDBService;
