import { CreateTicketParams } from "@/services";
import Joi from "joi";

export const createTicketSchema = Joi.object<CreateTicketRequest>({
  ticketTypeId: Joi.number().required(),
});

type CreateTicketRequest = Omit<CreateTicketParams, "userId">;
