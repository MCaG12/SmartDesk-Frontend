import type { i_Ticket } from "../../interfaces/i_ticket";
import type { i_ticketAgentResponse } from "../../interfaces/i_ticketAgentResponse";
import type { i_TicketCategory } from "../../interfaces/i_ticketCategory";
import type { i_TicketPriority } from "../../interfaces/i_ticketPriority";
import type { i_TicketSolicitant } from "../../interfaces/i_ticketSolicitant";

interface SaveTicket
{
    ticketTitle: string,
    ticketCategory: i_TicketCategory,
    ticketPriority: i_TicketPriority,
    ticketProblemDescription: string,
    ticketSolicitant: i_TicketSolicitant;
}


export default async function save_new_ticket({ticketTitle, ticketCategory, ticketPriority, ticketProblemDescription,
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
