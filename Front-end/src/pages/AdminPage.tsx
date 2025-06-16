
import React, { useState } from "react";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAppointments } from "../context/AppointmentContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const AdminPage = () => {
  const { appointments, cancelAppointment } = useAppointments();
  const [confirmedAppointments, setConfirmedAppointments] = useState<Set<string>>(new Set());

  const handleConfirm = (appointmentId: string) => {
    setConfirmedAppointments(prev => new Set(prev).add(appointmentId));
    toast.success("Agendamento confirmado!");
  };

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    setConfirmedAppointments(prev => {
      const newSet = new Set(prev);
      newSet.delete(appointmentId);
      return newSet;
    });
  };

  const sortedAppointments = appointments.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Painel Administrativo
        </h1>
        <p className="text-gray-600">
          Gerencie todos os agendamentos da Corte Fino
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
          <CardDescription>
            Total de {appointments.length} agendamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAppointments.map((appointment) => {
                    const dateObj = new Date(appointment.date);
                    const isConfirmed = confirmedAppointments.has(appointment.id);
                    
                    return (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          {isValid(dateObj)
                            ? format(dateObj, "dd/MM/yyyy 'às' HH:mm", {
                                locale: ptBR,
                              })
                            : "Data inválida"}
                        </TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>{appointment.barber.name}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isConfirmed
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {isConfirmed ? "Confirmado" : "Pendente"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {!isConfirmed && (
                              <Button
                                size="sm"
                                onClick={() => handleConfirm(appointment.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirmar
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCancel(appointment.id)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum agendamento encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
