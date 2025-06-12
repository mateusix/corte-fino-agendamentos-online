import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export interface Appointment {
  id: string;
  service: string;
  date: string;
  barber: {
    id: string;
    name: string;
    image: string;
    specialty: string;
  };
}

export const barbers = [
  {
    id: "1",
    name: "João",
    specialty: "Corte de cabelo",
    image: "/images/barber1.jpg",
  },
  {
    id: "2",
    name: "Pedro",
    specialty: "Barba",
    image: "/images/barber2.jpg",
  },
];

export const services = [
  {
    id: "1",
    name: "Corte de Cabelo",
    duration: 30,
    price: 30.0,
  },
  {
    id: "2",
    name: "Barba",
    duration: 20,
    price: 20.0,
  },
];

interface AppointmentContextType {
  appointments: Appointment[];
  cancelAppointment: (id: string) => void;
  addAppointment: (appointmentData: {
    date: Date;
    barber: typeof barbers[number];
    service: string;
  }) => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType>({
  appointments: [],
  cancelAppointment: () => {},
  addAppointment: async () => {},
});

export const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/agendamentos", {
        headers: { "Cache-Control": "no-cache" },
      });

      const sorted = res.data.sort((a: any, b: any) =>
        new Date(a.data + "T" + a.horario) > new Date(b.data + "T" + b.horario) ? 1 : -1
      );

      const formattedAppointments = sorted.map((appt: any) => ({
        id: appt.id.toString(),
        service: appt.tipo_servico,
        date: appt.data + "T" + appt.horario,
        barber: {
          id: appt.barbeiro, // Como não tem ID, pode deixar o nome como id
          name: appt.barbeiro,
          image: "/images/default-barber.jpg",
          specialty: "Especialidade",
        },
      }));

      setAppointments(formattedAppointments);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      toast.error("Erro ao buscar agendamentos.");
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:8800/api/agendamentos/${id}`);

      if (res.status >= 200 && res.status < 300) {
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
        toast.success("Agendamento cancelado com sucesso!");
      } else {
        throw new Error("Erro ao cancelar");
      }
    } catch (err: any) {
      console.error("Erro ao cancelar agendamento:", err);
      toast.error(err.response?.data?.message || "Erro ao cancelar agendamento.");
    }
  };

  const addAppointment = async (appointmentData: {
    date: Date;
    barber: typeof barbers[number];
    service: string;
  }) => {
    try {
      const iso = appointmentData.date.toISOString();
      const dateOnly = iso.split("T")[0];
      const timeOnly = iso.split("T")[1].substring(0, 8);

      const res = await axios.post("http://localhost:8800/api/agendamentos", {
        data: dateOnly,
        horario: timeOnly,
        barbeiro: appointmentData.barber.name,
        tipo_servico: appointmentData.service,
      });

      if (res.status === 201) {
        const newAppointment = {
          id: res.data.id.toString(),
          service: res.data.tipo_servico,
          date: res.data.data + "T" + res.data.horario,
          barber: appointmentData.barber,
        };

        setAppointments((prev) => [...prev, newAppointment]);
        toast.success("Agendamento criado com sucesso!");
      } else {
        throw new Error("Erro ao criar agendamento");
      }
    } catch (err: any) {
      console.error("Erro ao criar agendamento:", err);
      toast.error(err.response?.data?.message || "Erro ao criar agendamento.");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointments, cancelAppointment, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
