
import { toast } from '@/components/ui/use-toast';

// Types for database models
export interface UserData {
  id: string;
  email: string;
  name: string;
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

class MongoDBService {
  private readonly connectionString: string = 'mongodb+srv://deepanshusnpt:122ZUNw9w6PNKUpt@farmer.lxen6.mongodb.net/';
  private isConnected: boolean = false;

  constructor() {
    console.log('MongoDB Service initialized');
    this.checkConnection();
  }

  private async checkConnection(): Promise<boolean> {
    try {
      // In a real app, this would actually test the MongoDB connection
      // Since we're in a browser environment, we'll simulate this
      console.log('Checking MongoDB connection...');
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll assume connection is successful
      this.isConnected = true;
      console.log('MongoDB connected successfully');
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      this.isConnected = false;
      return false;
    }
  }

  // User data methods
  async getUserData(userId: string): Promise<UserData | null> {
    if (!this.isConnected) await this.checkConnection();
    
    try {
      console.log(`Fetching user data for ID: ${userId}`);
      // In a real app, this would query the MongoDB collection
      // For demo purposes, we'll return mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data
      const userData: UserData = {
        id: userId,
        email: 'user@example.com',
        name: 'Sample User',
        role: 'farmer',
        createdAt: new Date('2023-01-15'),
        lastLogin: new Date()
      };
      
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Database Error",
        description: "Could not fetch user data. Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  }

  // Plant analysis methods
  async savePlantAnalysis(analysis: Omit<PlantAnalysis, 'id' | 'createdAt'>): Promise<PlantAnalysis | null> {
    if (!this.isConnected) await this.checkConnection();
    
    try {
      console.log('Saving plant analysis:', analysis);
      // In a real app, this would insert a document into MongoDB
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response with generated ID
      const savedAnalysis: PlantAnalysis = {
        ...analysis,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date()
      };
      
      toast({
        title: "Analysis Saved",
        description: `Plant analysis for ${analysis.plantName} has been saved.`
      });
      
      return savedAnalysis;
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

  // Disease detection methods
  async saveDiseaseDetection(detection: Omit<DiseaseDetection, 'id' | 'createdAt'>): Promise<DiseaseDetection | null> {
    if (!this.isConnected) await this.checkConnection();
    
    try {
      console.log('Saving disease detection:', detection);
      // In a real app, this would insert a document into MongoDB
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response with generated ID
      const savedDetection: DiseaseDetection = {
        ...detection,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date()
      };
      
      toast({
        title: "Detection Saved",
        description: `Disease detection for ${detection.plantName} has been saved.`
      });
      
      return savedDetection;
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

  // Sensor data methods
  async saveSensorData(data: Omit<SensorData, 'id'>): Promise<SensorData | null> {
    if (!this.isConnected) await this.checkConnection();
    
    try {
      console.log('Saving sensor data:', data);
      // In a real app, this would insert a document into MongoDB
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock response with generated ID
      const savedData: SensorData = {
        ...data,
        id: Math.random().toString(36).substring(2, 15)
      };
      
      return savedData;
    } catch (error) {
      console.error('Error saving sensor data:', error);
      console.warn('Failed to save sensor data point. Will retry later.');
      return null;
    }
  }

  // Fetch sensor data for visualization
  async getSensorData(userId: string, deviceId: string, sensorType: string, startDate: Date, endDate: Date): Promise<SensorData[]> {
    if (!this.isConnected) await this.checkConnection();
    
    try {
      console.log(`Fetching ${sensorType} data for device ${deviceId}`);
      // In a real app, this would query the MongoDB collection
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Generate mock sensor data points
      const dataPoints: SensorData[] = [];
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        // Create a data point every hour
        dataPoints.push({
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
      
      return dataPoints;
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
