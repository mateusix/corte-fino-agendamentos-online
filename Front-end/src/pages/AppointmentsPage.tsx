import React from "react";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useAppointments, Appointment } from "../context/AppointmentContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

function normalizeName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

const AppointmentCard = ({
  appointment,
  onCancel,
}: {
  appointment: Appointment;
  onCancel: (id: string) => void;
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleCancel = () => {
    setIsDeleting(true);
    onCancel(appointment.id);
    toast.success("Agendamento cancelado com sucesso");
  };

  // Normaliza o nome do barbeiro para garantir match
  const normalizedBarberName = normalizeName(appointment.barber.name);

  const barberImages: Record<string, string> = {
    joao:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTwCDUPfkJUXZhPuplN6Z3ehOvtOSGqLYxCCLtyB8Mku4V7oilECG0Y0m625Y79Iad9I&usqp=CAU",
    pedro:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWN9perBtZjeRgkWlu_6ZwcIemYT9uafX1vD5emVx_1lC3gTX333Jni7nH-qjPY4EHGcY&usqp=CAU",
  };

  const imageUrl =
    barberImages[normalizedBarberName] ?? "https://via.placeholder.com/48?text=?";

  const dateObj = new Date(appointment.date);

  return (
    <Card
      className={`animate-fade-in transition-opacity ${
        isDeleting ? "opacity-0" : "opacity-100"
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{appointment.service}</CardTitle>
            <CardDescription>
              {isValid(dateObj)
                ? format(dateObj, "EEEE, dd 'de' MMMM 'às' HH:mm", {
                    locale: ptBR,
                  })
                : "Data inválida"}
            </CardDescription>
          </div>
          <Button variant="destructive" size="sm" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={appointment.barber.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{appointment.barber.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AppointmentsPage = () => {
  const { appointments, cancelAppointment } = useAppointments();

  return (
    <div className="container mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Meus Agendamentos</h1>
      <p className="text-gray-600 mb-8">Gerencie seus agendamentos na Corte Fino</p>

      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={cancelAppointment}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <h2 className="text-2xl font-bold mb-3">Você não tem agendamentos</h2>
          <p className="text-gray-600 mb-8">
            Clique no botão abaixo para marcar seu primeiro agendamento
          </p>
          <Link to="/agendar">
            <Button className="bg-barber-blue hover:bg-barber-blue/90 text-white">
              Fazer Agendamento
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
