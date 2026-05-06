import TickItLogo from "../images/TickItLogo.png";
import NotificationImage from "../images/NotificationImage.jpg"
import UserLogoImage from "../images/UserImage.png"


import { useState } from "react";
import greetingDashboard from "../components/greetingDashboard";


export default function DashScreenScreen() {
    const [notificationIsActive, setNotificationIsActive] = useState(false)
    const [createNewTicketActive, setCreateNewTicketIsActive] = useState(false)
    return (
    <>
    <div id="container">
        <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", height: "100%"}}>

            <div className= "header" style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly"}}>
                 <div style={{display: "flex", flexDirection:"row", alignItems: "center",
                                justifyContent: "space-evenly", height: "100%", width:"60%",}}>
                    <img src={TickItLogo} alt="Greeting" style={{ width: "20%", height: "75%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />
                    <button className="btn-novo-chamado" style={{width:"25%"}} onClick={(() => {setCreateNewTicketIsActive(!createNewTicketActive)})}> Novo Chamado</button>
                </div>
                <div style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly", height: "100%", width:"60%"}}>
                    <div className="search-input-wrapper">Procurar Ticket</div>

                    <div className="icon-btn" onClick={() => setNotificationIsActive(!notificationIsActive)}>
                        <img src={NotificationImage} alt="NotificationBell" 
                             style={{ width: "80%", height: "80%", objectFit: "cover", alignSelf: "center",
                                      marginBottom: "2%", borderRadius: "50%"  }}/>
                    </div>

                    <div className="icon-btn">
                       <img src={UserLogoImage} alt="UserLogoOutline" 
                        style={{ width: "80%", height: "80%", objectFit: "cover", alignSelf: "center",
                                marginBottom: "2%", borderRadius: "50%"  }}/>
                    </div>

                </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", width:"100%", height: "100%", alignItems: "center"}}>
                <div className="sidebar">
                    <button className="tab-btn">
                        BEAR
                    </button>
                    <button className="tab-btn">Tickets</button>
                    <button className="tab-btn">Tickets</button>
                </div>
                {greetingDashboard({notificationIsActive, setNotificationIsActive, createNewTicketActive, setCreateNewTicketIsActive}) }
            </div>
            
        </div>
    </div>
    </>

)
}