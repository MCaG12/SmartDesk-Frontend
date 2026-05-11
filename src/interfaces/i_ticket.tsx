export interface TicketStatus {
  id: number;
  name: string;
}

export interface TicketPriority {
  id: number;
  name: string;
}

export interface TicketCategory {
  id: number;
  name: string;
}

export interface TicketUser {
  id: number;
  name: string;
  email: string;
}

export interface i_Ticket {
  Id: number;
  ticketTitle: string;
  ticketStatus: TicketStatus;
  ticketPriority: TicketPriority;
  ticketDescription: string;
  ticketCategory: TicketCategory;
  ticketDateOpen: Date;
  ticketDateClose: Date | null;
  ticketSolicitant: TicketUser;
  ticketAgent: TicketUser | null;
}