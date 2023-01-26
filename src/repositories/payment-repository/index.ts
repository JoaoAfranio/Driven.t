import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function getPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, value: number, card: CardPayment): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: card.cardIssuer,
      cardLastDigits: card.cardLastDigits,
    },
  });
}

export type CardPayment = Pick<Payment, "cardIssuer" | "cardLastDigits">;

const paymentRepository = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
