import { useEffect, useState } from "react"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_TicketSolicitant } from "../interfaces/i_ticketSolicitant";
import { NewTicketForm } from "./newTicketMenuTicketForm";
import { AiSuggestionBox } from "./createNewTicketAiSuggestion";
import { NewTicketAiLoading } from "./createNewTicketAiLoading";
import getPrioritySuggestion from "./aiPipelines/aiGetPrioritySuggestion";
import getTroubleshootingSuggestion from "./aiPipelines/aiGetTroubleshootingSuggestion";
import save_new_ticket from "./saveNewTicket/saveNewTicket";

interface i_Create_New_Ticket_Menu
{
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    createNewTicketActive: boolean; 
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>;
    ticketPriorities: i_TicketPriority[];
    ticketCategories: i_TicketCategory[];
    userInfo:i_UserLoginInfoResponse;
}

export function Create_New_Ticket_Menu
    ({setCreateNewTicketIsActive, ticketPriorities, ticketCategories, userInfo}:i_Create_New_Ticket_Menu)
{
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketCategory, setTicketCategory] = useState<i_TicketCategory>();
    const [ticketPriority, setTicketPriority]= useState<i_TicketPriority>();
    const [ticketProblemDescription, setTicketProblemDescription] = useState("");
    const [aiSuggestion, setAiSuggestion] = useState("");
    const [, setLoadingAi] = useState(false);
    const ticketSolicitant: i_TicketSolicitant = {Id: userInfo.Id, usuarNome: userInfo.usuarNome, usuarEmail: userInfo.usuarEmail};
    const [pageStatus, setPageStatus] = useState(0);
    const [aiTicketPrioritySuggestion, setAiTicketPrioritySuggestion] = useState<i_TicketPriority>();

    useEffect(() => {
    if (pageStatus === 1) {
        if (ticketCategory && ticketPriority) {
            getTroubleshootingSuggestion({
                ticketCategoryDescription: ticketCategory.tickcatDescription,
                ticketPriorityDescription: ticketPriority.typepriDescription,
                ticketProblemDescription,
                ticketTitle,
                setAiSuggestion,
                setLoadingAi
            }).then(() => setPageStatus(2));
        } else {
            console.log("failed calling suggestion", ticketCategory, ticketPriority);
        }
    }

    if (pageStatus === 3) {
        if (ticketCategory) {
            getPrioritySuggestion({
                ticketCategoryDescription: ticketCategory.tickcatDescription,
                ticketProblemDescription,
                ticketTitle,
                setAiTicketPrioritySuggestion,
                setLoadingAi
            });
      
        } else {
            console.log("failed", ticketCategory);
        }
        }
    }, [pageStatus]);

    useEffect(() => {
        if (aiTicketPrioritySuggestion) {
            setTicketPriority(aiTicketPrioritySuggestion);
            setPageStatus(1);
        }
    }, [aiTicketPrioritySuggestion]);

    useEffect(() => {
    if (pageStatus === 4) {
        if (ticketCategory && ticketPriority) {
            save_new_ticket({
                ticketTitle,
                ticketCategory,
                ticketPriority,
                ticketProblemDescription,
                ticketSolicitant
            }).then(() => setPageStatus(5));
        }
    }
}, [pageStatus]);
    
    function renderPage(pageStatus: number, setPageStatus: React.Dispatch<React.SetStateAction<number>>)
    {
        switch(pageStatus)
        {   
            case 0:
                {
                    return  <NewTicketForm
                        ticketCategories={ticketCategories}
                        ticketPriorities={ticketPriorities}
                        ticketTitle={ticketTitle}
                        setTicketTitle={setTicketTitle}
                        setTicketCategory={setTicketCategory}
                        setTicketPriority={setTicketPriority}
                        setTicketProblemDescription={setTicketProblemDescription}
                        setPageStatus={setPageStatus}
                        setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                    />
                }
            case 1:
                {
                    return <NewTicketAiLoading 
                        LoadingText={"A IA está analisando seu problema!"}
                    />
                }
            case 2:
            {
                return <AiSuggestionBox
                        aiSuggestion={aiSuggestion}
                        setPageStatus={setPageStatus}
                        setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                    />
            }
            case 3:
                {
                    return <NewTicketAiLoading
                        LoadingText={"A IA está escolhendo a prioridade do problema"}
                    />
                }
            case 5:
                {
                    return (
                    <div
                        className="NewTicketCreated"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1.5rem",
                            padding: "3rem 2rem",
                            textAlign: "center",
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                        }}
                    >
                    
                        <div
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: "50%",
                                backgroundColor: "#22c55e",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 0 8px rgba(34,197,94,0.15)",
                                fontSize: "2rem",
                                color: "#fff",
                                flexShrink: 0,
                            }}
                        >
                            ✓
                        </div>
            
               
                        <div>
                            <h2
                                style={{
                                    margin: "0 0 0.5rem",
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    color: "var(--color-text, #1e293b)",
                                }}
                            >
                                Ticket criado com sucesso!
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "0.95rem",
                                    color: "var(--color-text-muted, #64748b)",
                                    lineHeight: 1.5,
                                }}
                            >
                                Seu chamado foi registrado e um agente foi atribuído.
                                <br />
                                Você receberá atualizações em breve.
                            </p>
                        </div>
            
                        <button
                            onClick={() => setCreateNewTicketIsActive(false)}
                            style={{
                                marginTop: "0.5rem",
                                padding: "0.6rem 2rem",
                                borderRadius: "6px",
                                border: "none",
                                backgroundColor: "var(--color-primary, #3b82f6)",
                                color: "#fff",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Fechar
                        </button>
                    </div>
                );

                }
        }          

    }

    return (
        <div className="NewTicketTab">
            {renderPage(pageStatus, setPageStatus)}       
        </div>
    );
}
