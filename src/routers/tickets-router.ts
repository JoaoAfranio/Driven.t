import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicket, getTicketByUser, getTicketsTypes } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicketByUser)
  .post("/", validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
