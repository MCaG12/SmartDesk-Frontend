import { useEffect, useState } from "react"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_TicketSolicitant } from "../interfaces/i_ticketSolicitant";
import { NewTicketForm } from "./newTicketMenuTicketForm";
import { AiSuggestionBox } from "./visualAiComponents/createNewTicketAiSuggestion";
import { NewTicketAiLoading } from "./visualAiComponents/createNewTicketAiLoading";
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
const c_i_initial_ticket_menu = 0;
const c_i_ai_analyzing_problem = 1;
const c_i_new_ticket_menu_opened = 1;
const c_i_fetching_ticket_suggestion = 2;
const c_i_ai_suggestion = 2;
const c_i_fetching_priority_suggestion = 3;
const c_i_ai_choosing_priority = 3;
const c_i_problem_not_solved = 4;
const c_i_ticket_opened_message = 5;

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
    if (pageStatus === c_i_new_ticket_menu_opened) {
        if (ticketCategory && ticketPriority) {
            getTroubleshootingSuggestion({
                ticketCategoryDescription: ticketCategory.tickcatDescription,
                ticketPriorityDescription: ticketPriority.typepriDescription,
                ticketProblemDescription,
                ticketTitle,
                setAiSuggestion,
                setLoadingAi
            }).then(() => setPageStatus(c_i_fetching_ticket_suggestion));
        } else {
            console.log("failed calling suggestion", ticketCategory, ticketPriority);
        }
    }

    if (pageStatus === c_i_fetching_priority_suggestion) {
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
    if (pageStatus === c_i_problem_not_solved) {
        if (ticketCategory && ticketPriority) {
            save_new_ticket({
                ticketTitle,
                ticketCategory,
                ticketPriority,
                ticketProblemDescription,
                ticketSolicitant
            }).then(() => setPageStatus(c_i_ticket_opened_message));
        }
    }
}, [pageStatus]);
    
    function renderPage(pageStatus: number, setPageStatus: React.Dispatch<React.SetStateAction<number>>)
    {
        switch(pageStatus)
        {   
            case c_i_initial_ticket_menu:
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
            case c_i_ai_analyzing_problem:
                {
                    return <NewTicketAiLoading 
                        LoadingText={"A IA está analisando seu problema!"}
                    />
                }
            case c_i_ai_suggestion:
            {
                return <AiSuggestionBox
                        aiSuggestion={aiSuggestion}
                        setPageStatus={setPageStatus}
                        setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                    />
            }
            case c_i_ai_choosing_priority:
                {
                    return <NewTicketAiLoading
                        LoadingText={"A IA está escolhendo a prioridade do problema"}
                    />
                }
            case c_i_ticket_opened_message:
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
