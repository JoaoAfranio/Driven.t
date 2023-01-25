import { prisma } from "@/config";

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  getAllTicketTypes,
};

export default ticketRepository;
