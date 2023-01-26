import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

import { TicketType } from "@prisma/client";

export async function getAllTicketsType(): Promise<TicketType[]> {
  return ticketRepository.getAllTicketTypes();
}

export async function getTicketByUser(userId: number) {
  const result = await ticketRepository.getTicketByUserId(userId);

  const enrollmentUser = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!result || !enrollmentUser) throw notFoundError();

  return result;
}

export async function createTicket({ userId, ticketTypeId }: CreateTicketParams) {
  const enrollmentUser = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollmentUser) throw notFoundError();

  const result = await ticketRepository.create(ticketTypeId, enrollmentUser.id);

  return result;
}

export type CreateTicketParams = { userId: number; ticketTypeId: number };

const ticketService = {
  getAllTicketsType,
  getTicketByUser,
  createTicket,
};

export default ticketService;
