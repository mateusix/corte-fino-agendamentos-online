import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { barbers, services } from "../context/AppointmentContext";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

  // Gera horários de 09:00 até 19:30, com intervalos de 30 minutos
  const generateTimeSlots = () => {
    const slots: string[] = [];
    const startHour = 9;
    const endHour = 20; // Até 20h (exclusivo)
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedBarber || !selectedService) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, minutes, 0, 0);

    // Formato ISO para data e horário separado
    const formattedDate = appointmentDate.toISOString().split("T")[0];
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

    const barberObj = barbers.find((b) => b.id === selectedBarber);
    const serviceObj = services.find((s) => s.id === selectedService);

    if (!barberObj || !serviceObj) {
      toast.error("Dados inválidos");
      return;
    }

    const appointmentData = {
      data: formattedDate,
      horario: formattedTime,
      barbeiro: barberObj.name,
      tipo_servico: serviceObj.name,
    };

    try {
      const response = await fetch("http://localhost:5000/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
      }

      toast.success("Agendamento criado com sucesso!");
      navigate("/meus-agendamentos");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Agende seu horário</h1>
      <p className="text-gray-600 mb-8">
        Escolha a data, hora e profissional para seu atendimento.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Data e Hora</CardTitle>
            <CardDescription>Selecione o melhor dia e horário para você</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Escolha uma data</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  locale={ptBR}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Escolha um horário</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      disabled={!selectedDate}
                      className={`p-2 text-sm rounded-md transition-colors ${
                        selectedTime === time
                          ? "bg-barber-blue text-white"
                          : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profissional e Serviço</CardTitle>
            <CardDescription>Escolha o profissional e serviço desejado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label htmlFor="barber" className="block font-medium mb-1">
                Profissional
              </label>
              <select
                id="barber"
                value={selectedBarber ?? ""}
                onChange={(e) => setSelectedBarber(e.target.value)}
                className="w-full rounded-md border p-2"
              >
                <option value="">Selecione um profissional</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name} - {barber.specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="service" className="block font-medium mb-1">
                Serviço
              </label>
              <select
                id="service"
                value={selectedService ?? ""}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-md border p-2"
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleBookingSubmit} className="w-full">
              Agendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
