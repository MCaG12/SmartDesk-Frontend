import DashBoardNewTicketsImage from "../images/DashBoardNewTicketsImage.png"
import DashBoardTicketAWaitingForConfirmationImage from "../images/DashBoardTicketAWaitingForConfirmationImage.png"
import DashBoardTicketsCompletedImage from "../images/DashBoardTicketsCompletedImage.png"
import DashBoardTicketsInProgressImage from "../images/DashBoardTicketsInProgressImage.png"
import { Create_New_Ticket_Menu } from "./createNewTicketMenu";
import { Notification_Menu } from "./notificationsMenu";

interface i_greetingDashboard
{
    notificationIsActive: boolean;
    setNotificationIsActive: React.Dispatch<React.SetStateAction<boolean>>
    createNewTicketActive: boolean;
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GreetingDashboard({notificationIsActive, setNotificationIsActive, createNewTicketActive, setCreateNewTicketIsActive} : i_greetingDashboard)
{
    return(
    <>
        <div style={{
                display: "flex", 
                flexDirection: "column",
                width: "100%", 
                height: "100%", 
                backgroundColor: "#e0e0e0", 
                padding: "1%",
                boxSizing: "border-box"
                }}>
                <h1 className="DashBoard-Title">Dashboard</h1>

                {/* Stat cards */}
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "15%", gap: "1%", marginBottom: "1%"}}>
                    
                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardNewTicketsImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Aberto</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>test</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsInProgressImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Em Andamento</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>test</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketAWaitingForConfirmationImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Ag.Terceiros</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>test</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsCompletedImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Concluídos</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f",}}>test</p>
                        </div>
                    </div>
                </div>

                {
                    notificationIsActive &&
                        <Notification_Menu />
                }

                {
                    createNewTicketActive && 
                        <Create_New_Ticket_Menu 
                            setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                            createNewTicketActive={createNewTicketActive} 
                            
                        />
                }

                {/* Charts */}
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "45%", gap: "1%", marginBottom: "1%"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "30%", height: "100%"}}>
                    <h3 className="DashBoardScreen-ItemFont">Chamados por categoria</h3>
                    <div style={{width: "100%", flex: 1, backgroundColor: "white"}}></div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", width: "70%", height: "100%"}}>
                    <h3 className="DashBoardScreen-ItemFont">Quantidade de Chamados por Dia</h3>
                    <div style={{width: "100%", flex: 1, backgroundColor: "white"}}></div>
                    </div>
                </div>

                {/* Recent tickets */}
                <h3 className="DashBoardScreen-ItemFont">Ultimos Chamados</h3>
                <div className="table-container">
    
                </div>

        </div>
    </>
    )
}