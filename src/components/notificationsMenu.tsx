import type { i_ticketComment } from "../interfaces/i_ticketComment";

interface i_Notification_menu 
{
    a_notifications : i_ticketComment[];
}

export function Notification_Menu({a_notifications} : i_Notification_menu)
{
    console.log(a_notifications)
    return (
         <div className="NotificationsTab">
            <h1 className="HeaderFont" style={{color: "#4272b6"}}>Notificações</h1>  
            <hr></hr>
            <div className="notificationContainer">
                <div className="notificationBody">
                    <div className="notificationHeader">
                        <p className="notificationTitle">Número Chamado</p>
                        <p className="notificationTitle">Comentários</p>
                    </div>
                    {a_notifications.map((notification) => (
                        <div className="notificationHeader" key={notification.Id} style={{justifyContent:"center"}}>
                            <p className="notificationTitle">{notification.Id}</p>
                            <p className="notificationTitle">{notification.tickcomComment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )}