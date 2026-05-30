import type { i_TicketCategory } from "./i_ticketCategory";
import type { i_TicketPriority } from "./i_ticketPriority";

export interface TicketStatus {
  Id: number;
  tickstaDescription: string;
}

export interface TicketUser {
  Id: number;
  usuarNome: string;
  usuarEmail: string;
}

export interface i_Ticket {
  Id: number;
  ticketTitle: string;
  ticketStatus: TicketStatus;
  ticketPriority: i_TicketPriority;   
  ticketDescription: string;
  ticketCategory: i_TicketCategory;   
  ticketDateOpen: string;             
  ticketDateClose: string | null;     
  ticketSolicitant: TicketUser;
  ticketAgent: TicketUser | null;
}