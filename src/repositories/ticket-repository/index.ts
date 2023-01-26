import { prisma } from "@/config";
import { Enrollment, Ticket, TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTicketById(ticketId: number): Promise<TicketEnrollmentType> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

type TicketEnrollmentType = Ticket & { Enrollment: Enrollment; TicketType: TicketType };

async function changeStatusTicketToPaid(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

async function getTicketByUserId(userId: number): Promise<TicketWithTicketType> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

type TicketWithTicketType = Ticket & { TicketType: TicketType };

async function create(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  getAllTicketTypes,
  getTicketById,
  getTicketByUserId,
  create,
  changeStatusTicketToPaid,
};

export default ticketRepository;
