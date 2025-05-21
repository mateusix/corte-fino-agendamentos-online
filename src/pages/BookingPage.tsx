
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { barbers, services, useAppointments } from "../context/AppointmentContext";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { addAppointment } = useAppointments();
  const navigate = useNavigate();

  // Generate available time slots between 9am and 8pm with 30min intervals
  const generateTimeSlots = () => {
    const slots = [];
    const start = 9; // 9am
    const end = 20; // 8pm

    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleBookingSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedBarber || !selectedService) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Create appointment date by combining selected date with time
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, minutes);

    const barber = barbers.find((b) => b.id === selectedBarber);
    const service = services.find((s) => s.id === selectedService)?.name;

    if (!barber || !service) {
      toast.error("Dados inválidos");
      return;
    }

    addAppointment({
      date: appointmentDate,
      barber,
      service
    });

    toast.success("Agendamento realizado com sucesso!");
    navigate("/meus-agendamentos");
  };

  return (
    <div className="container mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Agende seu horário</h1>
      <p className="text-gray-600 mb-8">Escolha a data, hora e profissional para seu atendimento.</p>

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
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-md transition-colors ${
                        selectedTime === time
                          ? "bg-barber-blue text-white"
                          : "bg-gray-100 hover:bg-gray-200"
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
            <CardTitle>Selecione o serviço e barbeiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Serviço</h3>
              <div className="space-y-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`w-full p-3 text-left rounded-md transition-colors ${
                      selectedService === service.id
                        ? "bg-barber-blue text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm opacity-80">{service.duration} minutos</div>
                  </button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-3">Barbeiro</h3>
              <div className="space-y-2">
                {barbers.map((barber) => (
                  <button
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber.id)}
                    className={`w-full p-3 text-left rounded-md flex items-center gap-3 transition-colors ${
                      selectedBarber === barber.id
                        ? "bg-barber-blue text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <img 
                      src={barber.image} 
                      alt={barber.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div>
                      <div className="font-medium">{barber.name}</div>
                      <div className="text-sm opacity-80">{barber.specialty}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleBookingSubmit}
              className={`w-full ${
                (!selectedDate || !selectedTime || !selectedBarber || !selectedService) 
                ? 'opacity-70 cursor-not-allowed' 
                : ''
              }`}
              disabled={!selectedDate || !selectedTime || !selectedBarber || !selectedService}
            >
              Confirmar Agendamento
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
