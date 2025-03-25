
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

// Database connection state management
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

/**
 * MongoDB Service - Handles all database operations
 * This is a frontend simulation of MongoDB operations
 * In a real application, these operations would be performed by a backend service
 */
class MongoDBService {
  private readonly connectionString: string;
  private connectionInitialized: boolean = false;
  
  constructor(connectionString: string = 'mongodb+srv://deepanshusnpt:122ZUNw9w6PNKUpt@farmer.lxen6.mongodb.net/') {
    this.connectionString = connectionString;
    console.log('MongoDB Service initialized with connection string:', this.connectionString);
    // Connection will be established on first operation or explicit connect call
  }

  /**
   * Establishes connection to MongoDB
   * @returns Promise<boolean> indicating if connection was successful
   */
  public async connect(): Promise<boolean> {
    if (this.connectionInitialized) {
      return useMongoDBStore.getState().isConnected;
    }

    const { setConnecting, setConnected, setConnectionError } = useMongoDBStore.getState();
    
    try {
      setConnecting(true);
      console.log('Establishing connection to MongoDB...');
      
      // Simulating connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll mark the connection as successful
      console.log('MongoDB connection established successfully');
      setConnected(true);
      setConnecting(false);
      setConnectionError(null);
      this.connectionInitialized = true;
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
      setConnected(false);
      setConnecting(false);
      setConnectionError(errorMessage);
      return false;
    }
  }

  /**
   * Ensures database connection before performing operations
   */
  private async ensureConnection(): Promise<boolean> {
    if (!this.connectionInitialized || !useMongoDBStore.getState().isConnected) {
      return await this.connect();
    }
    return true;
  }

  // =================== Authentication Methods ===================

  /**
   * Authenticates a user with email and password
   * @param email User email
   * @param password User password
   * @returns Authenticated user data or null
   */
  public async authenticateUser(email: string, password: string): Promise<UserData | null> {
    try {
      await this.ensureConnection();
      console.log(`Authenticating user: ${email}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, we would make an API call to authenticate
      const users = this.getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        console.error('User not found');
        return null;
      }
      
      // In a real implementation, passwords would be hashed and properly compared
      if (user.password !== password) {
        console.error('Invalid password');
        return null;
      }
      
      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date()
      };
      
      // Update the user in storage
      this.saveUsers(
        users.map(u => u.id === user.id ? updatedUser : u)
      );
      
      return updatedUser;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }
  
  /**
   * Registers a new user
   * @param userData User data without id, createdAt, lastLogin
   * @returns Registered user data or null
   */
  public async registerUser(userData: Omit<UserData, 'id' | 'createdAt' | 'lastLogin'>): Promise<UserData | null> {
    try {
      await this.ensureConnection();
      console.log('Registering user:', userData);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = this.getUsers();
      
      if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        console.error('User already exists');
        return null;
      }
      
      // Create new user with ID and timestamps
      const newUser: UserData = {
        ...userData,
        id: this.generateId(),
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      // Save to storage
      this.saveUsers([...users, newUser]);
      
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  /**
   * Updates user's last login timestamp
   * @param userId User ID
   * @returns Success status
   */
  public async updateUserLastLogin(userId: string): Promise<boolean> {
    try {
      await this.ensureConnection();
      console.log(`Updating last login for user ID: ${userId}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        console.error('User not found');
        return false;
      }
      
      users[userIndex] = {
        ...users[userIndex],
        lastLogin: new Date()
      };
      
      this.saveUsers(users);
      return true;
    } catch (error) {
      console.error('Error updating last login:', error);
      return false;
    }
  }

  /**
   * Retrieves user data by ID
   * @param userId User ID
   * @returns User data or null
   */
  public async getUserById(userId: string): Promise<UserData | null> {
    try {
      await this.ensureConnection();
      console.log(`Fetching user with ID: ${userId}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = this.getUsers();
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

  // =================== Plant Analysis Methods ===================

  /**
   * Saves a plant analysis
   * @param analysis Plant analysis data without id and createdAt
   * @returns Saved plant analysis or null
   */
  public async savePlantAnalysis(analysis: Omit<PlantAnalysis, 'id' | 'createdAt'>): Promise<PlantAnalysis | null> {
    try {
      await this.ensureConnection();
      console.log('Saving plant analysis:', analysis);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new analysis with ID and timestamp
      const newAnalysis: PlantAnalysis = {
        ...analysis,
        id: this.generateId(),
        createdAt: new Date()
      };
      
      // Save to storage
      const analyses = this.getPlantAnalyses();
      this.savePlantAnalyses([...analyses, newAnalysis]);
      
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

  /**
   * Retrieves plant analyses for a user
   * @param userId User ID
   * @returns Array of plant analyses
   */
  public async getUserPlantAnalyses(userId: string): Promise<PlantAnalysis[]> {
    try {
      await this.ensureConnection();
      console.log(`Fetching plant analyses for user ID: ${userId}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const analyses = this.getPlantAnalyses();
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

  // =================== Disease Detection Methods ===================

  /**
   * Saves a disease detection
   * @param detection Disease detection data without id and createdAt
   * @returns Saved disease detection or null
   */
  public async saveDiseaseDetection(detection: Omit<DiseaseDetection, 'id' | 'createdAt'>): Promise<DiseaseDetection | null> {
    try {
      await this.ensureConnection();
      console.log('Saving disease detection:', detection);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new detection with ID and timestamp
      const newDetection: DiseaseDetection = {
        ...detection,
        id: this.generateId(),
        createdAt: new Date()
      };
      
      // Save to storage
      const detections = this.getDiseaseDetections();
      this.saveDiseaseDetections([...detections, newDetection]);
      
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

  /**
   * Retrieves disease detections for a user
   * @param userId User ID
   * @returns Array of disease detections
   */
  public async getUserDiseaseDetections(userId: string): Promise<DiseaseDetection[]> {
    try {
      await this.ensureConnection();
      console.log(`Fetching disease detections for user ID: ${userId}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const detections = this.getDiseaseDetections();
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

  // =================== User Query Methods ===================

  /**
   * Saves a user query
   * @param query User query data without id and timestamp
   * @returns Saved user query or null
   */
  public async saveUserQuery(query: Omit<UserQuery, 'id' | 'timestamp'>): Promise<UserQuery | null> {
    try {
      await this.ensureConnection();
      console.log('Saving user query:', query);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create a new query with ID and timestamp
      const newQuery: UserQuery = {
        ...query,
        id: this.generateId(),
        timestamp: new Date()
      };
      
      // Save to storage
      const queries = this.getUserQueries();
      this.saveUserQueries([...queries, newQuery]);
      
      return newQuery;
    } catch (error) {
      console.error('Error saving user query:', error);
      return null;
    }
  }

  /**
   * Retrieves queries for a user
   * @param userId User ID
   * @returns Array of user queries
   */
  public async getUserQueries(userId: string): Promise<UserQuery[]> {
    try {
      await this.ensureConnection();
      console.log(`Fetching queries for user ID: ${userId}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const queries = this.getUserQueries();
      return queries.filter(q => q.userId === userId);
    } catch (error) {
      console.error('Error fetching user queries:', error);
      return [];
    }
  }

  // =================== Sensor Data Methods ===================

  /**
   * Saves sensor data
   * @param data Sensor data without id
   * @returns Saved sensor data or null
   */
  public async saveSensorData(data: Omit<SensorData, 'id'>): Promise<SensorData | null> {
    try {
      await this.ensureConnection();
      console.log('Saving sensor data:', data);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create a new data point with ID
      const newData: SensorData = {
        ...data,
        id: this.generateId()
      };
      
      // Save to storage
      const sensorData = this.getSensorData();
      this.saveSensorData([...sensorData, newData]);
      
      return newData;
    } catch (error) {
      console.error('Error saving sensor data:', error);
      return null;
    }
  }

  /**
   * Retrieves sensor data for a user, device, and sensor type within a date range
   * @param userId User ID
   * @param deviceId Device ID
   * @param sensorType Sensor type
   * @param startDate Start date
   * @param endDate End date
   * @returns Array of sensor data
   */
  public async getSensorDataByRange(
    userId: string,
    deviceId: string,
    sensorType: string,
    startDate: Date,
    endDate: Date
  ): Promise<SensorData[]> {
    try {
      await this.ensureConnection();
      console.log(`Fetching ${sensorType} data for device ${deviceId}`);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const sensorData = this.getSensorData();
      
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
      
      // If no data, generate mock data for demonstration
      return this.generateMockSensorData(userId, deviceId, sensorType, startDate, endDate);
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

  // =================== Helper Methods ===================

  /**
   * Generates a unique ID
   * @returns Unique ID string
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Generates mock sensor data for demonstration
   * @param userId User ID
   * @param deviceId Device ID
   * @param sensorType Sensor type
   * @param startDate Start date
   * @param endDate End date
   * @returns Array of mock sensor data
   */
  private generateMockSensorData(
    userId: string,
    deviceId: string,
    sensorType: string,
    startDate: Date,
    endDate: Date
  ): SensorData[] {
    const mockData: SensorData[] = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      mockData.push({
        id: this.generateId(),
        userId,
        deviceId,
        timestamp: new Date(currentDate),
        sensorType,
        value: this.generateMockValue(sensorType),
        unit: this.getSensorUnit(sensorType)
      });
      
      // Increment by 1 hour
      currentDate = new Date(currentDate.getTime() + 60 * 60 * 1000);
    }
    
    return mockData;
  }

  /**
   * Generates a mock sensor value based on sensor type
   * @param sensorType Sensor type
   * @returns Mock sensor value
   */
  private generateMockValue(sensorType: string): number {
    switch (sensorType.toLowerCase()) {
      case 'temperature':
        return 20 + Math.random() * 10; // Temperature between 20-30
      case 'moisture':
        return 40 + Math.random() * 30; // Moisture between 40-70%
      case 'humidity':
        return 30 + Math.random() * 50; // Humidity between 30-80%
      case 'light':
        return 500 + Math.random() * 1000; // Light between 500-1500 lux
      case 'ph':
        return 5 + Math.random() * 4; // pH between 5-9
      default:
        return 50 + Math.random() * 50; // Default between 50-100
    }
  }

  /**
   * Gets the unit for a sensor type
   * @param sensorType Sensor type
   * @returns Sensor unit
   */
  private getSensorUnit(sensorType: string): string {
    switch (sensorType.toLowerCase()) {
      case 'temperature':
        return '°C';
      case 'moisture':
      case 'humidity':
        return '%';
      case 'light':
        return 'lux';
      case 'ph':
        return 'pH';
      default:
        return 'units';
    }
  }

  // =================== Storage Methods ===================

  /**
   * Gets users from localStorage
   * @returns Array of users
   */
  private getUsers(): UserData[] {
    return JSON.parse(localStorage.getItem('greensense_users') || '[]');
  }

  /**
   * Saves users to localStorage
   * @param users Array of users
   */
  private saveUsers(users: UserData[]): void {
    localStorage.setItem('greensense_users', JSON.stringify(users));
  }

  /**
   * Gets plant analyses from localStorage
   * @returns Array of plant analyses
   */
  private getPlantAnalyses(): PlantAnalysis[] {
    return JSON.parse(localStorage.getItem('greensense_plant_analyses') || '[]');
  }

  /**
   * Saves plant analyses to localStorage
   * @param analyses Array of plant analyses
   */
  private savePlantAnalyses(analyses: PlantAnalysis[]): void {
    localStorage.setItem('greensense_plant_analyses', JSON.stringify(analyses));
  }

  /**
   * Gets disease detections from localStorage
   * @returns Array of disease detections
   */
  private getDiseaseDetections(): DiseaseDetection[] {
    return JSON.parse(localStorage.getItem('greensense_disease_detections') || '[]');
  }

  /**
   * Saves disease detections to localStorage
   * @param detections Array of disease detections
   */
  private saveDiseaseDetections(detections: DiseaseDetection[]): void {
    localStorage.setItem('greensense_disease_detections', JSON.stringify(detections));
  }

  /**
   * Gets user queries from localStorage
   * @returns Array of user queries
   */
  private getUserQueriesData(): UserQuery[] {
    return JSON.parse(localStorage.getItem('greensense_user_queries') || '[]');
  }

  /**
   * Saves user queries to localStorage
   * @param queries Array of user queries
   */
  private saveUserQueries(queries: UserQuery[]): void {
    localStorage.setItem('greensense_user_queries', JSON.stringify(queries));
  }

  /**
   * Gets sensor data from localStorage
   * @returns Array of sensor data
   */
  private getSensorDataStorage(): SensorData[] {
    return JSON.parse(localStorage.getItem('greensense_sensor_data') || '[]');
  }

  /**
   * Saves sensor data to localStorage
   * @param data Array of sensor data
   */
  private saveSensorDataStorage(data: SensorData[]): void {
    localStorage.setItem('greensense_sensor_data', JSON.stringify(data));
  }
}

// Create a singleton instance
export const mongoDBService = new MongoDBService();

export default mongoDBService;
