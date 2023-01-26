import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentProcessRequest } from "@/protocols";
import paymentRepository, { CardPayment } from "@/repositories/payment-repository";
import ticketService from "../tickets-service";

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const result = await paymentRepository.getPaymentByTicketId(ticketId);

  await verifyUserOwnsTicket(ticketId, userId);

  if (!result) throw notFoundError();

  return result;
}

async function verifyUserOwnsTicket(ticketId: number, userId: number) {
  const result = await ticketService.getTicketById(ticketId);

  if (result.Enrollment.userId !== userId) throw unauthorizedError();
}

async function verifyIfTicketExists(ticketId: number) {
  const result = await ticketService.getTicketById(ticketId);

  if (!result) throw notFoundError();

  return result;
}

async function changeStatusPaymentTicket(ticketId: number) {
  await ticketService.updateStatusTicketToPaid(ticketId);
}

async function createProcessPayment(reqProcessPayment: PaymentProcessRequest, userId: number) {
  const { ticketId, cardData } = reqProcessPayment;

  const { TicketType } = await verifyIfTicketExists(ticketId);

  await verifyUserOwnsTicket(ticketId, userId);

  const lastDigits = getLastDigitsCard(cardData.number);

  const card: CardPayment = {
    cardIssuer: cardData.issuer,
    cardLastDigits: lastDigits,
  };

  const result = await paymentRepository.createPayment(ticketId, TicketType.price, card);

  changeStatusPaymentTicket(ticketId);

  return result;
}

function getLastDigitsCard(cardNumber: number) {
  const cardNumberStr = `${cardNumber}`;

  return cardNumberStr.substring(cardNumberStr.length - 4);
}

const paymentService = {
  getPaymentByTicketId,
  createProcessPayment,
};

export default paymentService;
