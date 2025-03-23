
import { toast } from '@/components/ui/use-toast';
import { MongoClient } from 'mongodb'
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

export interface UserQuery {
  id: string;
  userId: string;
  query: string;
  timestamp: Date;
  category: 'plant' | 'disease' | 'fertilizer' | 'general';
  response?: string;
}

class MongoDBService {
  private readonly connectionString: string = 'mongodb+srv://deepanshusnpt:122ZUNw9w6PNKUpt@farmer.lxen6.mongodb.net/';
  private isConnected: boolean = false;
  private db: any = null;

  constructor() {
    console.log('MongoDB Service initialized');
    this.checkConnection();
  }

//   private async checkConnection(): Promise<boolean> {
//     try {
//       // In a browser environment, direct MongoDB connections aren't possible
//       // We would typically use a backend API to connect to MongoDB
//       // This simulates a successful connection for the frontend
//       console.log('Checking MongoDB connection...');

//       // Simulate connection delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // For demo purposes, we'll assume connection is successful
//       this.isConnected = true;
//       console.log('MongoDB connected successfully');

//       // In a real app with a backend, we would initialize the database here
//       return true;
//     } catch (error) {
//       console.error('MongoDB connection error:', error);
//       this.isConnected = false;
//       return false;
//     }
//   }

private async checkConnection(): Promise<boolean> {
    try {
      console.log('Checking MongoDB connection...');

      // Create a new MongoClient instance
      const client = new MongoClient(this.connectionString);

      // Connecting to MongoDB
      await client.connect();

      // Once connected, get the database instance (replace 'myDatabase' with your database name)
      this.db = client.db('myDatabase');  // Replace 'myDatabase' with your actual database name
      this.isConnected = true;

      console.log('MongoDB connected successfully');
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      this.isConnected = false;
      return false;
    }
  }

  // Check if connected to MongoDB
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Example method to fetch data from a MongoDB collection
  public async fetchData(collection: string): Promise<any> {
    if (this.isConnected && this.db) {
      try {
        // Fetching all data from the specified collection
        const data = await this.db.collection(collection).find().toArray();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    } else {
      console.log("Not connected to MongoDB");
      return null;
    }
  }

  // --- User data methods ---

  async saveUserData(userData: Omit<UserData, 'id' | 'createdAt'>): Promise<UserData | null> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log('Saving user data:', userData);
      // In a real app, this would insert a document into MongoDB

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Create a new user with ID and timestamp
      const newUser: UserData = {
        ...userData,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date(),
      };

      console.log('User saved successfully:', newUser);
      return newUser;
    } catch (error) {
      console.error('Error saving user data:', error);
      toast({
        title: "Database Error",
        description: "Could not save user data. Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  }

  async getUserData(userId: string): Promise<UserData | null> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log(`Fetching user data for ID: ${userId}`);
      // In a real app, this would query the MongoDB collection

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // For demo purposes, retrieve from localStorage if available
      const storedUser = localStorage.getItem('greensense_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        return {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          createdAt: new Date(userData.createdAt || '2023-01-15'),
          lastLogin: new Date()
        };
      }

      // Mock user data as fallback
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

  async updateUserLastLogin(userId: string): Promise<boolean> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log(`Updating last login for user ID: ${userId}`);
      // In a real app, this would update a document in MongoDB

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('Last login updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating last login:', error);
      return false;
    }
  }

  // --- Plant analysis methods ---

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

      // Store in localStorage for persistence in the demo
      const key = `plant_analysis_${savedAnalysis.id}`;
      localStorage.setItem(key, JSON.stringify(savedAnalysis));

      // Add to user's analyses list
      const userAnalysesKey = `user_${analysis.userId}_plant_analyses`;
      const existingAnalyses = JSON.parse(localStorage.getItem(userAnalysesKey) || '[]');
      existingAnalyses.push(savedAnalysis.id);
      localStorage.setItem(userAnalysesKey, JSON.stringify(existingAnalyses));

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

  async getUserPlantAnalyses(userId: string): Promise<PlantAnalysis[]> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log(`Fetching plant analyses for user ID: ${userId}`);
      // In a real app, this would query the MongoDB collection

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));

      // Get analyses IDs from localStorage
      const userAnalysesKey = `user_${userId}_plant_analyses`;
      const analysesIds = JSON.parse(localStorage.getItem(userAnalysesKey) || '[]');

      // Retrieve each analysis
      const analyses: PlantAnalysis[] = [];
      for (const id of analysesIds) {
        const analysisData = localStorage.getItem(`plant_analysis_${id}`);
        if (analysisData) {
          analyses.push(JSON.parse(analysisData));
        }
      }

      return analyses;
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

      // Store in localStorage for persistence in the demo
      const key = `disease_detection_${savedDetection.id}`;
      localStorage.setItem(key, JSON.stringify(savedDetection));

      // Add to user's detections list
      const userDetectionsKey = `user_${detection.userId}_disease_detections`;
      const existingDetections = JSON.parse(localStorage.getItem(userDetectionsKey) || '[]');
      existingDetections.push(savedDetection.id);
      localStorage.setItem(userDetectionsKey, JSON.stringify(existingDetections));

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

  async getUserDiseaseDetections(userId: string): Promise<DiseaseDetection[]> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log(`Fetching disease detections for user ID: ${userId}`);
      // In a real app, this would query the MongoDB collection

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));

      // Get detection IDs from localStorage
      const userDetectionsKey = `user_${userId}_disease_detections`;
      const detectionIds = JSON.parse(localStorage.getItem(userDetectionsKey) || '[]');

      // Retrieve each detection
      const detections: DiseaseDetection[] = [];
      for (const id of detectionIds) {
        const detectionData = localStorage.getItem(`disease_detection_${id}`);
        if (detectionData) {
          detections.push(JSON.parse(detectionData));
        }
      }

      return detections;
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
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log('Saving user query:', query);
      // In a real app, this would insert a document into MongoDB

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Mock response with generated ID
      const savedQuery: UserQuery = {
        ...query,
        id: Math.random().toString(36).substring(2, 15),
        timestamp: new Date()
      };

      // Store in localStorage for persistence in the demo
      const key = `user_query_${savedQuery.id}`;
      localStorage.setItem(key, JSON.stringify(savedQuery));

      // Add to user's queries list
      const userQueriesKey = `user_${query.userId}_queries`;
      const existingQueries = JSON.parse(localStorage.getItem(userQueriesKey) || '[]');
      existingQueries.push(savedQuery.id);
      localStorage.setItem(userQueriesKey, JSON.stringify(existingQueries));

      return savedQuery;
    } catch (error) {
      console.error('Error saving user query:', error);
      return null;
    }
  }

  async getUserQueries(userId: string): Promise<UserQuery[]> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log(`Fetching queries for user ID: ${userId}`);
      // In a real app, this would query the MongoDB collection

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get query IDs from localStorage
      const userQueriesKey = `user_${userId}_queries`;
      const queryIds = JSON.parse(localStorage.getItem(userQueriesKey) || '[]');

      // Retrieve each query
      const queries: UserQuery[] = [];
      for (const id of queryIds) {
        const queryData = localStorage.getItem(`user_query_${id}`);
        if (queryData) {
          queries.push(JSON.parse(queryData));
        }
      }

      return queries;
    } catch (error) {
      console.error('Error fetching user queries:', error);
      return [];
    }
  }

  // --- Sensor data methods ---

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

      // Store in localStorage for persistence in the demo
      const key = `sensor_data_${savedData.id}`;
      localStorage.setItem(key, JSON.stringify(savedData));

      // Add to user's sensor data list
      const userSensorDataKey = `user_${data.userId}_sensor_data_${data.deviceId}_${data.sensorType}`;
      const existingData = JSON.parse(localStorage.getItem(userSensorDataKey) || '[]');
      existingData.push(savedData.id);
      localStorage.setItem(userSensorDataKey, JSON.stringify(existingData));

      return savedData;
    } catch (error) {
      console.error('Error saving sensor data:', error);
      console.warn('Failed to save sensor data point. Will retry later.');
      return null;
    }
  }

  async getSensorData(userId: string, deviceId: string, sensorType: string, startDate: Date, endDate: Date): Promise<SensorData[]> {
    if (!this.isConnected) await this.checkConnection();

    try {
      console.log(`Fetching ${sensorType} data for device ${deviceId}`);
      // In a real app, this would query the MongoDB collection

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));

      // Check if we have stored data for this combination
      const userSensorDataKey = `user_${userId}_sensor_data_${deviceId}_${sensorType}`;
      const sensorDataIds = JSON.parse(localStorage.getItem(userSensorDataKey) || '[]');

      if (sensorDataIds.length > 0) {
        // Retrieve each sensor data point
        const dataPoints: SensorData[] = [];
        for (const id of sensorDataIds) {
          const dataPoint = localStorage.getItem(`sensor_data_${id}`);
          if (dataPoint) {
            const parsedData = JSON.parse(dataPoint);
            // Check if within date range
            const timestamp = new Date(parsedData.timestamp);
            if (timestamp >= startDate && timestamp <= endDate) {
              dataPoints.push(parsedData);
            }
          }
        }

        // Sort by timestamp
        dataPoints.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        // If we have data points, return them
        if (dataPoints.length > 0) {
          return dataPoints;
        }
      }

      // Fall back to generated mock data if no stored data
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
