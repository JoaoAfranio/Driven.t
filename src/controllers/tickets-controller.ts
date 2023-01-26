import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketService.getAllTicketsType();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketService.getTicketByUser(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    const tickets = await ticketService.createTicket({ userId, ticketTypeId });

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
  }
}
