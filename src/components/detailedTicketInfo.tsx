import type { i_Ticket } from "../interfaces/i_ticket";

interface i_DetailedTicketInfo
{
    ticketInfo: i_Ticket,
    setShowDetailedTicket: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DetailedTicketInfo({ticketInfo, setShowDetailedTicket}: i_DetailedTicketInfo)
{
    return(
    <div className="detailed-ticket-overlay">
        <div className="detailed-ticket-modal">

            <div className="detailed-ticket-header">
            <h2>#{ticketInfo.Id} | {ticketInfo.ticketTitle}</h2>
            <button className="detailed-ticket-close-btn" onClick={() => setShowDetailedTicket(false)}>✕</button>
            </div>

            <div className="detailed-ticket-body">
            <div className="detailed-ticket-fields">
                <div className="detailed-ticket-field">
                <label>Título</label>
                <span>{ticketInfo.ticketTitle}</span>
                </div>
                <div className="detailed-ticket-field">
                <label>Descrição</label>
                <span>{ticketInfo.ticketDescription}</span>
                </div>
                <div className="detailed-ticket-field">
                <label>Categoria</label>
                <span>{ticketInfo.ticketCategory.name}</span>
                <label>Email Solicitante</label>
                <span>{ticketInfo.ticketSolicitant.email}</span>
                </div>
                <div className="detailed-ticket-field">
                <label>Prioridade</label>
                <span>{ticketInfo.ticketPriority.name}</span>
                <label>Email Atendente</label>
                <span>{ticketInfo.ticketAgent?.email}</span>
                </div>
            </div>

            </div>

        </div>
        </div>
    )
}