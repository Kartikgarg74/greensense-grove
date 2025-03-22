
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import mongoDBService, { UserData } from '@/services/MongoDBService';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      const storedUser = localStorage.getItem('greensense_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Update last login in MongoDB
        if (parsedUser.id) {
          await mongoDBService.updateUserLastLogin(parsedUser.id);
        }
      }
      setIsLoading(false);
    };
    
    checkUserAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in a real app, you would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in real app, this would be server-side
      if (email.trim() === '' || password.trim() === '') {
        throw new Error('Invalid credentials');
      }
      
      // Create a demo user - in a real app, this would come from your API
      const demoUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'farmer',
      };
      
      // Save user data to MongoDB
      await mongoDBService.saveUserData({
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
        lastLogin: new Date()
      });
      
      setUser(demoUser);
      localStorage.setItem('greensense_user', JSON.stringify(demoUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${demoUser.name}!`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: (error as Error).message || "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation
      if (!userData.email || !userData.password || !userData.fullName) {
        throw new Error('Please fill in all required fields');
      }
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.fullName,
        role: userData.userType,
      };
      
      // Save user data to MongoDB
      const savedUser = await mongoDBService.saveUserData({
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        lastLogin: new Date()
      });
      
      // If we got a user ID back from MongoDB, use it
      if (savedUser && savedUser.id) {
        newUser.id = savedUser.id;
      }
      
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
        description: (error as Error).message || "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('greensense_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
