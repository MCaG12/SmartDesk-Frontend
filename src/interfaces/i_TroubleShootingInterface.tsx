export interface i_GetTroubleshootingSuggestion {
    ticketTitle: string;
    ticketCategoryDescription: string;
    ticketPriorityDescription: string;
    ticketProblemDescription: string;
    setAiSuggestion: React.Dispatch<React.SetStateAction<string>>;
    setLoadingAi: React.Dispatch<React.SetStateAction<boolean>>;
}