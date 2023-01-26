import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketByUser, getTicketsTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/types", getTicketsTypes).get("/", getTicketByUser);

export { ticketsRouter };
