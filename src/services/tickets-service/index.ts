import ticketRepository from "@/repositories/ticket-repository";

import { TicketType } from "@prisma/client";

export async function getAllTicketsType(): Promise<TicketType[]> {
  return ticketRepository.getAllTicketTypes();
}

const ticketService = {
  getAllTicketsType,
};

export default ticketService;
