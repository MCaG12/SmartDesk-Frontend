import TickItLogo from "../images/TickItLogo.png";
import NotificationImage from "../images/NotificationImage.jpg"
import UserLogoImage from "../images/UserImage.png"


import { useState } from "react";
import greetingDashboard from "../components/greetingDashboard";
import UserBoardState from "../components/userDashboard";
import UserDashBoard from "../components/userDashboard";
import GreetingDashboard from "../components/greetingDashboard";
import TicketTableDashboard from "../components/ticketTableDashboard";



export default function DashScreenScreen() {
    const [dashBoardState, setDashBoardState] = useState(0)
    const [notificationIsActive, setNotificationIsActive] = useState(false)
    const [createNewTicketActive, setCreateNewTicketIsActive] = useState(false)

    function drawDashBoard(dashBoardState : number)
    {
        switch(dashBoardState)
        {
            case 0:
            {
                return GreetingDashboard({notificationIsActive, setNotificationIsActive, createNewTicketActive, setCreateNewTicketIsActive})
            }
            case 1:
                {
                    return <TicketTableDashboard/>
                }
            case 2:
            {
                return <UserDashBoard />
            }
        }
    }

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

                    <div className="icon-btn" onClick={() => setDashBoardState(2)}>
                       <img src={UserLogoImage} alt="UserLogoOutline" 
                        style={{ width: "80%", height: "80%", objectFit: "cover", alignSelf: "center",
                                marginBottom: "2%", borderRadius: "50%"  }}/>
                    </div>

                </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", width:"100%", height: "100%", alignItems: "center"}}>
                <div className="sidebar">
                    <button
                    className="tab-btn"
                    onClick={() => setDashBoardState(0)}
                    style={{ backgroundColor: dashBoardState === 0 ? "#1b54a3" : "#538fe4" }}
                    >
                    DashBoard
                    </button>
                    <button
                    className="tab-btn"
                    onClick={() => setDashBoardState(1)}
                    style={{ backgroundColor: dashBoardState === 1? "#1b54a3" : "#538fe4" }}
                    >
                    Chamados
                    </button>
                        <button
                    className="tab-btn"
                    onClick={() => setDashBoardState(2)}
                    style={{ backgroundColor: dashBoardState === 2 ? "#1b54a3" : "#538fe4" }}
                    >
                    Usuário
                    </button>
                </div>
                { drawDashBoard(dashBoardState) }
            </div>
            
        </div>
    </div>
    </>

)
}