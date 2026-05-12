import DashBoardNewTicketsImage from "../images/DashBoardNewTicketsImage.png"
import DashBoardTicketAWaitingForConfirmationImage from "../images/DashBoardTicketAWaitingForConfirmationImage.png"
import DashBoardTicketsCompletedImage from "../images/DashBoardTicketsCompletedImage.png"
import DashBoardTicketsInProgressImage from "../images/DashBoardTicketsInProgressImage.png"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import { Create_New_Ticket_Menu } from "./createNewTicketMenu";
import { Notification_Menu } from "./notificationsMenu";

interface i_greetingDashboard
{
    notificationIsActive: boolean;
    setNotificationIsActive: React.Dispatch<React.SetStateAction<boolean>>
    createNewTicketActive: boolean;
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>
    tickets: i_Ticket[];
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>;
    ticketCategories: i_TicketCategory[];
    ticketPriorities: i_TicketPriority[];
    userInfo: i_UserLoginInfoResponse;
}

export default function GreetingDashboard({notificationIsActive, ticketPriorities, createNewTicketActive, 
                                           setCreateNewTicketIsActive, tickets,setTickets,ticketCategories,userInfo } : i_greetingDashboard)
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
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.name == "Open"})).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsInProgressImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Em Andamento</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.name == "In Progress"})).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketAWaitingForConfirmationImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Ag.Terceiros</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.name == "Awaiting Confirmation"})).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsCompletedImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Concluídos</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.name == "Resolved"})).length}</p>
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
                            setTickets={setTickets}
                            ticketPriorities={ticketPriorities}
                            ticketCategories={ticketCategories}  
                            userInfo={userInfo}
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