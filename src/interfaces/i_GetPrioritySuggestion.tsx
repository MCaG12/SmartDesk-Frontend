import type React from "react";
import type { i_TicketPriority } from "./i_ticketPriority";

export interface i_GetPrioritySuggestion {
    ticketTitle: string;
    ticketCategoryDescription: string;
    ticketProblemDescription: string;
    setAiTicketPrioritySuggestion: React.Dispatch<React.SetStateAction<i_TicketPriority | undefined>>;
    setLoadingAi: React.Dispatch<React.SetStateAction<boolean>>;
}