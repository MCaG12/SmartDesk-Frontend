export interface i_AiSuggestionBox {
    aiSuggestion: string;
    setProblemSolved: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>
}
