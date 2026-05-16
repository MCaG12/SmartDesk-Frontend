import type { i_TicketCategory } from "./i_ticketCategory";
import type { i_TicketPriority } from "./i_ticketPriority";

export interface i_NewTicketForm {
    ticketTitle: string;
    ticketCategories: i_TicketCategory[];
    ticketPriorities: i_TicketPriority[];
    setTicketTitle: React.Dispatch<React.SetStateAction<string>>;
    setTicketCategory: React.Dispatch<React.SetStateAction<i_TicketCategory | undefined>>;
    setTicketPriority: React.Dispatch<React.SetStateAction<i_TicketPriority | undefined>>;
    setTicketProblemDescription: React.Dispatch<React.SetStateAction<string>>;
}