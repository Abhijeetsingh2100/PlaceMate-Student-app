import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase, setSupabaseTokenProvider } from '../lib/supabase';
import { useAuth } from '@clerk/clerk-expo';
export type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  salary: string;
  date: string;
  icon: string;
  iconBg: string;
  statusColor: string;
  iconColor?: string;
};

type ApplicationsContextType = {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Provide Clerk's JWT token to Supabase client globally
  useEffect(() => {
    setSupabaseTokenProvider(() => getToken({ template: 'supabase' }));
  }, [getToken]);

  useEffect(() => {
    const fetchApps = async () => {
      if (!isLoaded || !isSignedIn || !userId) {
        setApplications([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', userId)
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching applications:', error);
        } else if (data) {
          setApplications(data as Application[]);
        }
      } catch (err) {
        console.error('Unexpected error during fetch:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, [isLoaded, isSignedIn, userId]);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        setApplications,
        modalVisible,
        setModalVisible,
        isLoading,
      }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
}
