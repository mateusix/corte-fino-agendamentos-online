
import { createContext, useState, useContext, ReactNode } from "react";

// Types
export type Barber = {
  id: string;
  name: string;
  specialty: string;
  image: string;
};

export type Appointment = {
  id: string;
  date: Date;
  barber: Barber;
  service: string;
};

type AppointmentContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  cancelAppointment: (id: string) => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Sample data for barbers
export const barbers: Barber[] = [
  {
    id: "1",
    name: "Miguel Santos",
    specialty: "Corte Moderno, Barba",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=300"
  },
  {
    id: "2",
    name: "Felipe Costa",
    specialty: "Corte Clássico, Tratamentos",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=300"
  },
  {
    id: "3",
    name: "Rafael Silva",
    specialty: "Corte Degradê, Barba",
    image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?q=80&w=300"
  }
];

// Sample services
export const services = [
  { id: "1", name: "Corte de Cabelo", duration: 30 },
  { id: "2", name: "Barba", duration: 20 },
  { id: "3", name: "Corte + Barba", duration: 45 },
  { id: "4", name: "Tratamento Capilar", duration: 40 }
];

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };

    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter(appointment => appointment.id !== id));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
};
