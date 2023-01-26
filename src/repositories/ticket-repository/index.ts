import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
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
  getTicketByUserId,
  create,
};

export default ticketRepository;
