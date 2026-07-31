import { useEffect, useState } from "react";
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_ticketComment } from "../interfaces/i_ticketComment";
import CreateNewTicketMenu from "./CreateTicketCommentMenu";
import NewTicketCommentMenu from "./newTicketCommentMenu";
import FetchTicketComments from "../util-functions/FetchTicketComments";

interface i_DetailedTicketInfo
{
    ticketInfo: i_Ticket,
    setShowDetailedTicket: React.Dispatch<React.SetStateAction<i_ticketComment[] | undefined>>;
    userInfo_id : number
    
}

export default function DetailedTicketInfo({ticketInfo, setShowDetailedTicket, userInfo_id}: i_DetailedTicketInfo)
{
    const [ticketComments, setTicketComments] = useState<i_ticketComment[]>()
    const [showCreateNewTicketMenu, setShowCreateNewTicketMenu] = useState(false);
    const [showNewTicketCommentMenu, setShowNewTicketCommentMenu] = useState(false);
    const [newTicketText, setNewTicketText] = useState('');

    useEffect(() => {
        FetchTicketComments({ TicketId: ticketInfo.Id, setTicketComments });
    }, [ticketInfo.Id]);

    return(
    <div className="detailed-ticket-overlay">
        <div className="detailed-ticket-modal">
            {showCreateNewTicketMenu && (
                <CreateNewTicketMenu 
                ticketId={ticketInfo.Id} 
                setShowNewTicketCommentMenu={setShowCreateNewTicketMenu} 
                userId={userInfo_id} 
                setShowTicketCommentCreatedMenu={setShowNewTicketCommentMenu}
                setNewTicketText={setNewTicketText}
                />
            )}

            {showNewTicketCommentMenu && (
                <NewTicketCommentMenu 
                    CommentText={newTicketText}
                    TicketCode={ticketInfo.Id}
                    setTicketComments={setTicketComments}
                    setShowNewTicketCommentMenu={setShowNewTicketCommentMenu}
                
                />
            )}

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

                <button className="ticket-new-comment-button "  onClick={() => setShowCreateNewTicketMenu(!showCreateNewTicketMenu)}>
                    Novo Comentário
                </button>
        </div>
    </div>
    </div>
    )
}