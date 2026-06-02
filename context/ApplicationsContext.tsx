import React, { createContext, useState, useContext, ReactNode } from 'react';

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

const initialApps: Application[] = [
  {
    id: '1',
    company: 'Google',
    role: 'SDE Intern',
    status: 'Applied',
    salary: '$120k',
    date: '2 days ago',
    icon: 'G',
    iconBg: 'bg-black',
    statusColor: 'text-green-600',
    iconColor: 'text-yellow-400',
  },
  {
    id: '2',
    company: 'Microsoft',
    role: 'PM Intern',
    status: 'Interview',
    salary: '$110k',
    date: 'Oct 12',
    icon: '🪟',
    iconBg: 'bg-[#E5E7EB]',
    statusColor: 'text-[#A16207]',
  },
  {
    id: '3',
    company: 'Stripe',
    role: 'Backend Engineer',
    status: 'Rejected',
    salary: '$130k',
    date: 'Oct 05',
    icon: '💳',
    iconBg: 'bg-gray-300',
    statusColor: 'text-red-500',
  },
];

type ApplicationsContextType = {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(initialApps);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        setApplications,
        modalVisible,
        setModalVisible,
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
