export interface i_AiSuggestionBox {
    aiSuggestion: string;
    setPageStatus: React.Dispatch<React.SetStateAction<number>>;
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>
}
