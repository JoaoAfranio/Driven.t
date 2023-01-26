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

const ticketRepository = {
  getAllTicketTypes,
  getTicketByUserId,
};

export default ticketRepository;
