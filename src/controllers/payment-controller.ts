import { AuthenticatedRequest } from "@/middlewares";
import { PaymentProcessRequest } from "@/protocols";
import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  try {
    if (!ticketId) res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentService.getPaymentByTicketId(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }

    if (error.name === "UnauthorizedError") {
      return res.send(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const reqProcessPayment = req.body as PaymentProcessRequest;

  console.log(reqProcessPayment);

  try {
    const payment = await paymentService.createProcessPayment(reqProcessPayment, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    console.log(error);
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }

    if (error.name === "UnauthorizedError") {
      return res.send(httpStatus.UNAUTHORIZED);
    }
  }
}
