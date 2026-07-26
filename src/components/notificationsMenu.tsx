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
                {a_notifications.map((notification) => {
                    return <>
                        <div className="notificationBody">
                            <div className="notificationHeader">
                                <h1 className="notificationTitle">{notification.Id}</h1>
                            </div>
                        </div>
                    </>
                })}
                
            </div>
        </div>
    )}