import { useEffect, useState } from "react";
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_ticketComment } from "../interfaces/i_ticketComment";

interface i_DetailedTicketInfo
{
    ticketInfo: i_Ticket,
    setShowDetailedTicket: React.Dispatch<React.SetStateAction<i_ticketComment[] | undefined>>;
}

interface i_fetchTicketComments
{
    TicketId : number
    setTicketComments:React.Dispatch<React.SetStateAction<i_ticketComment[] | undefined>>
}


async function FetchTicketComments({TicketId, setTicketComments}: i_fetchTicketComments)
{
    const url = "http://localhost:3000/TicketComment/fetch-ticket-comments/";

    try
    {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ticketId": TicketId
            })
        });
        const data = await response.json() as i_ticketComment[];
        setTicketComments(data);
    }
    catch (error)
    {
        console.error("Error:", error);
       
    }
}

export default function DetailedTicketInfo({ticketInfo, setShowDetailedTicket}: i_DetailedTicketInfo)
{
    const [ticketComments, setTicketComments] = useState<i_ticketComment[]>()

    useEffect(() => {
        FetchTicketComments({ TicketId: ticketInfo.Id, setTicketComments });
    }, [ticketInfo.Id]);

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
                <span>{ticketInfo.ticketCategory.tickcatDescription}</span>
                <label>Email Solicitante</label>
                <span>{ticketInfo.ticketSolicitant.usuarEmail}</span>
                </div>
                <div className="detailed-ticket-field">
                <label>Prioridade</label>
                <span>{ticketInfo.ticketPriority.typepriDescription}</span>
                <label>Email Atendente</label>
                <span>{ticketInfo.ticketAgent?.usuarEmail}</span>
                </div>
            </div>
            <div className="detailed-ticket-comment-section">
                {ticketComments?.map((comment) => {
                    return (
                        <div className="ticket-comment-item" key={comment.Id}>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <div style={{display:"Flex", flexDirection:"row", gap:"15%"}}>
                                    <p className="ticket-comment-text">{comment.tickcomUser.usuarNome}</p>
                                    <p className="ticket-comment-text">{comment.tickcomUser.usuarEmail}</p>
                                </div>
                                <p className="ticket-comment-text">{comment.tickcomComment}</p>   
                            </div>
                        </div>
                    )
                    })
                }
            </div>

            </div>

        </div>
        </div>
    )
}