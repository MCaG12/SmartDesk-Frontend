import type { i_Ticket } from "../interfaces/i_ticket";

export function LasTicketsCall(ticket:i_Ticket)
{
    return <div 
            style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly"}}>
                <p className="table-row">{ticket.Id}</p>
                <p className="table-row">{ticket.ticketCategory.tickcatDescription}</p>
                <p className="table-row">{ticket.ticketStatus.tickstaDescription}</p>
                <p className="table-row">{ticket.ticketAgent?.usuarNome}</p>
                <p className="table-row">{ticket.ticketDateOpen}</p>               
            </div>    
}