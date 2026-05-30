import { useEffect, useState } from "react"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_TicketSolicitant } from "../interfaces/i_ticketSolicitant";
import type { i_ticketAgentResponse } from "../interfaces/i_ticketAgentResponse";
import type { i_GetTroubleshootingSuggestion } from "../interfaces/i_TroubleShootingInterface";
import { NewTicketForm } from "./newTicketMenuTicketForm";
import { AiSuggestionBox } from "./createNewTicketAiSuggestion";
import { NewTicketAiLoading } from "./createNewTicketAiLoading";
import type { i_GetPrioritySuggestion } from "../interfaces/i_GetPrioritySuggestion";

interface i_Create_New_Ticket_Menu
{
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    createNewTicketActive: boolean; 
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>;
    ticketPriorities: i_TicketPriority[];
    ticketCategories: i_TicketCategory[];
    userInfo:i_UserLoginInfoResponse;
}

interface NewTicket
{
    ticketTitle: string,
    ticketCategory: i_TicketCategory,
    ticketPriority: i_TicketPriority,
    ticketProblemDescription: string,
    ticketSolicitant: i_TicketSolicitant,
    problemSolved: boolean,
    setProblemSolved: React.Dispatch<React.SetStateAction<boolean>>,
    setAiSuggestion: React.Dispatch<React.SetStateAction<string>>;
    setLoadingAi: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SaveTicket
{
    ticketTitle: string,
    ticketCategory: i_TicketCategory,
    ticketPriority: i_TicketPriority,
    ticketProblemDescription: string,
    ticketSolicitant: i_TicketSolicitant;
}

async function getPrioritySuggestion({ticketCategoryDescription, ticketProblemDescription, ticketTitle, setAiTicketPrioritySuggestion, setLoadingAi}:i_GetPrioritySuggestion ) {
  if (!ticketCategoryDescription  || !ticketProblemDescription) {console.log("Failed"); return;}
  console.log(ticketTitle, ticketCategoryDescription, ticketProblemDescription)
  setLoadingAi(true);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an IT helpdesk assistant. A user has opened a support ticket with the following details:
              
              Title: ${ticketTitle}
              Category: ${ticketCategoryDescription}
              Description: ${ticketProblemDescription}
              Choose the priority based on the following list of options
                id: 1 - BAIXA PRIORIDADE
                id: 2 - MEDIA PRIORIDADE
                id: 3 - ALTA PRIORIDADE
                id: 4 - CRITICA PRIORIDADE
            
              Respond with ONLY valid JSON, no markdown, no explanation:
              {
                    "Id": id of priority selected,
                    "typepriDescription": "priority text"
                }
              `
            }]
          }]
        })
      }
    );
    const data = await response.json();
    console.log("the suggested priority is -> ", data);
    const raw = data.candidates[0].content.parts[0].text ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();

    try {
        const parsed : i_TicketPriority = JSON.parse(clean);
        if (parsed.Id && [1, 2, 3, 4].includes(parsed.Id)) {
            setAiTicketPrioritySuggestion(parsed);
        } else {
            console.error("Unexpected priority response:", parsed);
        }
    } catch {
        console.error("Failed to parse priority JSON:", raw);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingAi(false);
  }
}


async function getTroubleshootingSuggestion({ticketCategoryDescription, ticketPriorityDescription, ticketProblemDescription, ticketTitle, setAiSuggestion, setLoadingAi}:i_GetTroubleshootingSuggestion ) {
  if (!ticketCategoryDescription || !ticketPriorityDescription || !ticketProblemDescription) return;
  console.log(ticketTitle, ticketCategoryDescription, ticketPriorityDescription, ticketProblemDescription)
  setLoadingAi(true);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an IT helpdesk assistant. A user has opened a support ticket with the following details:
              
              Title: ${ticketTitle}
              Category: ${ticketCategoryDescription}
              Priority: ${ticketPriorityDescription}
              Description: ${ticketProblemDescription}
              Provide 3 to 5 basic troubleshooting steps the user can try before an agent responds. Be concise and practical. answer in portuguese `
            }]
          }]
        })
      }
    );
    const data = await response.json();
    console.log(data);
    const text = data.candidates[0].content.parts[0].text ?? "";
    setAiSuggestion(text);
  } catch (err) {
    console.error(err);
    setAiSuggestion("Não foi possível carregar sugestões.");
  } finally {
    setLoadingAi(false);
  }
}

async function save_new_ticket({ticketTitle, ticketCategory, ticketPriority, ticketProblemDescription,
                             ticketSolicitant}: SaveTicket)
{
    const NewTicket: i_Ticket = {
    Id: 0,  
    ticketTitle: ticketTitle,
    ticketStatus: { Id: 1, tickstaDescription: "NOVO TICKET" },
    ticketPriority: ticketPriority,
    ticketCategory: ticketCategory,
    ticketDescription: ticketProblemDescription,
    ticketDateOpen: new Date().toISOString(),  
    ticketDateClose: null,
    ticketSolicitant: ticketSolicitant,
    ticketAgent: null
};
    try 
    {
        const url = "http://localhost:3000/Ticket/";
        const agentsUrl = "http://localhost:3000/Usuario/GetAll";

        const ticketAgentsResponse = await fetch(agentsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const ticketAgents =
            await ticketAgentsResponse.json() as i_ticketAgentResponse[]; 

        const randomAgent = ticketAgents[Math.floor(Math.random() * ticketAgents.length)];

        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: 
            JSON.stringify({   
                "ticketTitle": NewTicket.ticketTitle,
                "ticketStatus": NewTicket.ticketStatus.Id,
                "ticketPriority":  NewTicket.ticketPriority.Id,
                "ticketDescription": NewTicket.ticketDescription,
                "ticketCategory": NewTicket.ticketCategory.Id,
                "ticketDateOpen": NewTicket.ticketDateOpen,
                "ticketDateClose": NewTicket.ticketDateClose,
                "ticketSolicitant": NewTicket.ticketSolicitant.Id,
                "ticketAgent": randomAgent.Id
            })
        })   

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        else
            {
                console.log("post was a sucess!")
            }
        
    } 
    catch (error) 
    {
        console.error(error);
    }
}

export function Create_New_Ticket_Menu
    ({setCreateNewTicketIsActive, createNewTicketActive, setTickets, ticketPriorities, ticketCategories, userInfo}:i_Create_New_Ticket_Menu)
{
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketCategory, setTicketCategory] = useState<i_TicketCategory>();
    const [ticketPriority, setTicketPriority]= useState<i_TicketPriority>();
    const [ticketProblemDescription, setTicketProblemDescription] = useState("");
    const [aiSuggestion, setAiSuggestion] = useState("");
    const [loadingAi, setLoadingAi] = useState(false);
    const [problemSolved, setProblemSolved] = useState(false);
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
