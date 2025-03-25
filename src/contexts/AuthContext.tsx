
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import mongoDBService, { UserData } from '@/services/MongoDBService';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'researcher' | 'student' | 'business' | 'other';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  userType: 'farmer' | 'researcher' | 'student' | 'business' | 'other';
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to use the auth context
 * @returns AuthContextType
 * @throws Error if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Manages auth state and provides auth methods
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize MongoDB connection
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await mongoDBService.connect();
      } catch (error) {
        console.error('Failed to initialize MongoDB connection:', error);
      }
    };
    
    initializeConnection();
  }, []);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const storedUser = localStorage.getItem('greensense_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Update last login in MongoDB
          if (parsedUser.id) {
            await mongoDBService.updateUserLastLogin(parsedUser.id);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('greensense_user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserAuth();
  }, []);

  /**
   * Authenticate user with email and password
   * @param email User email
   * @param password User password
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Input validation
      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }
      
      // Authenticate with MongoDB
      const userData = await mongoDBService.authenticateUser(email, password);
      
      if (!userData) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object
      const authenticatedUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
      };
      
      // Update state and localStorage
      setUser(authenticatedUser);
      localStorage.setItem('greensense_user', JSON.stringify(authenticatedUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${authenticatedUser.name}!`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user
   * @param userData User registration data
   */
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Input validation
      if (!userData.email || !userData.password || !userData.fullName) {
        throw new Error('Please fill in all required fields');
      }
      
      // Register with MongoDB
      const registeredUser = await mongoDBService.registerUser({
        email: userData.email,
        name: userData.fullName,
        password: userData.password,
        role: userData.userType,
      });
      
      if (!registeredUser) {
        throw new Error('Registration failed. Email might already be in use.');
      }
      
      // Create user object
      const newUser: User = {
        id: registeredUser.id,
        email: registeredUser.email,
        name: registeredUser.name,
        role: registeredUser.role,
      };
      
      // Update state and localStorage
      setUser(newUser);
      localStorage.setItem('greensense_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome to GreenSense AI, ${newUser.name}!`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('greensense_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  // Create context value
  const authContextValue: AuthContextType = {
    user, 
    isAuthenticated: !!user, 
    isLoading, 
    login, 
    register, 
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
