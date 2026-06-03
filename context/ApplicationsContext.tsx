import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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
  const [applications, setApplications] = useState<Application[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
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
  }, []);

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
