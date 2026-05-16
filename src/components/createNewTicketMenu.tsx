import { useState } from "react"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_TicketSolicitant } from "../interfaces/i_ticketSolicitant";
import type { i_ticketAgentResponse } from "../interfaces/i_ticketAgentResponse";
import type { i_GetTroubleshootingSuggestion } from "../interfaces/i_TroubleShootingInterface";
import { NewTicketForm } from "./newTicketMenuTicketForm";
import { AiSuggestionBox } from "./createNewTicketAiSuggestion";

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
    ticket_info :i_Ticket,
    ticketSolicitant: number,
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>
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
                             ticketSolicitant}: NewTicket)
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
        
    } 
    catch (error) 
    {
        console.error(error);
    }
}
                
async function create_new_ticket({ticketTitle, ticketCategory, ticketPriority, ticketProblemDescription,
                             ticketSolicitant,problemSolved, setProblemSolved, setAiSuggestion,setLoadingAi }: NewTicket)
{
    try 
    {
        const ticketCategoryDescription = ticketCategory.tickcatDescription;
        const ticketPriorityDescription = ticketPriority.typepriDescription
        await getTroubleshootingSuggestion({ticketCategoryDescription, ticketPriorityDescription, ticketProblemDescription, ticketTitle, setAiSuggestion, setLoadingAi})
        // if(!problemSolved)
        //     {
        //         await save_new_ticket({ticketTitle, ticketCategory, ticketPriority, ticketProblemDescription,ticketSolicitant, problemSolved, setProblemSolved, setAiSuggestion,setLoadingAi})
        //     }
        
        
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

    return (
        <div className="NewTicketTab">
            {aiSuggestion.trim() === "" 
            ? 
                <NewTicketForm
                    ticketCategories={ticketCategories}
                    ticketPriorities={ticketPriorities}
                    ticketTitle={ticketTitle}
                    setTicketTitle={setTicketTitle}
                    setTicketCategory={setTicketCategory}
                    setTicketPriority={setTicketPriority}
                    setTicketProblemDescription={setTicketProblemDescription}
                />
            :
                <AiSuggestionBox
                    aiSuggestion={aiSuggestion}
                    setProblemSolved={setProblemSolved}
                />
            }          
        </div>
    );
}
