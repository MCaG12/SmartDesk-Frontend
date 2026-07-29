import type { i_ticketComment } from "../interfaces/i_ticketComment";



export function TicketSearchMenu()
{
    return (
         <div className="NotificationsTab">
            <h1 className="HeaderFont" style={{color: "#4272b6"}}>Notificações</h1>  
            <hr></hr>
            <div className="notificationContainer">
                <div className="notificationBody">
                    <div className="notificationHeader">
                        <p className="notificationTitle">Número</p>
                        <p className="notificationTitle">Comentários</p>
                    </div>
             
                </div>
            </div>
        </div>
    )}