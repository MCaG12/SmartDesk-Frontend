import { useEffect, useState } from "react";
import DashBoardNewTicketsImage from "../images/DashBoardNewTicketsImage.png"
import DashBoardTicketAWaitingForConfirmationImage from "../images/DashBoardTicketAWaitingForConfirmationImage.png"
import DashBoardTicketsCompletedImage from "../images/DashBoardTicketsCompletedImage.png"
import DashBoardTicketsInProgressImage from "../images/DashBoardTicketsInProgressImage.png"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import { Create_New_Ticket_Menu } from "./createNewTicketMenu";
import { LasTicketsCall } from "./lastTicketsTableItem";
import { Notification_Menu } from "./notificationsMenu";
import type { i_dashBoardLatestTicket } from "../interfaces/i_dashBoardTicketFound";
import type { i_ticketComment } from "../interfaces/i_ticketComment";
import fetchLatestNotifications from "../util-functions/fetchLatestTicketsComments";

interface i_fetchLatestTickets 
{
    i_userId: number;
    setLatestTickets: React.Dispatch<React.SetStateAction<i_dashBoardLatestTicket[] | undefined>>;
}

interface i_category
{
    categoryTitle: string;
    categoryColor : string;
}

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
    const categories :i_category[] = [
    { categoryTitle: "Hardware", categoryColor: "#E74C3C" },
    { categoryTitle: "Software", categoryColor: "#3498DB" },
    { categoryTitle: "Rede", categoryColor: "#2ECC71" },
    { categoryTitle: "Acesso / Permissão", categoryColor: "#9B59B6" },
    { categoryTitle: "Email", categoryColor: "#F39C12" },
    { categoryTitle: "Erro no Sistema", categoryColor: "#E67E22" },
    { categoryTitle: "Impressora", categoryColor: "#1ABC9C" },
    { categoryTitle: "Outros", categoryColor: "#95A5A6" },
];

    async function fetchLatestTickets({i_userId, setLatestTickets}: i_fetchLatestTickets)
    {
        let a_TicketsFound: i_dashBoardLatestTicket[];

        const url = `http://localhost:3000/Ticket/fetch-latest-tickets/`;

        try 
        {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                "UserId": i_userId
            })
        }); 
        a_TicketsFound = await response.json() as i_dashBoardLatestTicket[];
        setLatestTickets(a_TicketsFound);
        } 
        catch (error) 
        {
            console.error("Error " + error);    
        }

    }
    const [LatestTickets, setLatestTickets] = useState<i_dashBoardLatestTicket[]>()

    const [latestNotifications, setLatestNotifications] = useState<i_ticketComment[]>()
    
    useEffect(() => {
    fetchLatestTickets({ i_userId: userInfo.Id, setLatestTickets });
    fetchLatestNotifications({ i_userId: userInfo.Id, setLatestNotifications });
    }, [userInfo.Id]);

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
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.tickstaDescription == "NOVO TICKET"})).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsInProgressImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Em Andamento</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.tickstaDescription == "EM ANDAMENTO"})).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketAWaitingForConfirmationImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Ag.Terceiros</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.tickstaDescription == "AGUARDANDO RESPOSTA"})).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsCompletedImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <p className="card-title" style={{fontSize:"1.5rem", color:"#666666"}}>Concluídos</p>
                            <p className="card-meta" style={{fontSize:"1.25rem", color:"#1f1f1f"}}>{(tickets.filter((ticket) => {return ticket.ticketStatus.tickstaDescription == "FINALIZADO"})).length}</p>
                        </div>
                    </div>
                </div>

                {
                    (notificationIsActive && latestNotifications) &&
                        <Notification_Menu
                            a_notifications={latestNotifications}
                         />
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
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "45vh", gap: "1%", marginBottom: "1%"}}>
                    
                    <div style={{display: "flex", flexDirection: "column", width: "30%", height: "100%"}}>
                        <h3 className="DashBoardScreen-ItemFont">Categorias de Chamados</h3>
                        <div style={{width: "100%", flex: 1, display: "grid", gridTemplateColumns:"repeat(3, 1fr)", backgroundColor: "white", overflowX: "scroll", alignItems: "center", gap: "12px"}}>
                            {categories.map((category) => (
                                <>
                                    <div style={{minWidth: "20px", height: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "6px"}}>
                                        <div style={{width: "50%", flex: 1, backgroundColor: category.categoryColor, borderRadius: "6px"}}/>
                                        <span style={{fontSize: "10px", textAlign: "center"}}>{category.categoryTitle}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                    <div style={{display: "flex", flexDirection: "column", width: "70%", height: "100%"}}>
                        <h3 className="DashBoardScreen-ItemFont">Quantidade de Chamados</h3>
                        <div style={{width: "100%", flex: 1, backgroundColor: "white"}}>
                            <div style={{width: "100%", height: "100%", display: "flex", backgroundColor: "white", flexDirection: "row", overflowX: "scroll", alignItems: "center", justifyContent: "space-evenly"}}>
                                {categories.map((category) => {
                                    const categoryTickets = tickets.filter((ticket) => ticket.ticketCategory.tickcatDescription == category.categoryTitle && ticket.ticketAgent?.usuarEmail == userInfo.usuarEmail);
                                    console.log(categoryTickets)
                                    if(categoryTickets.length > 0)
                                        {
                                            return (
                                                <>
                                                    <div style={{minWidth: "20px", maxHeight: "50%",height: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "6px"}}>
                                                        <div style={{width: "100%", flex: 1, backgroundColor: category.categoryColor, borderRadius: "6px"}}/>
                                                        <span style={{fontSize: "10px", textAlign: "center"}}>{category.categoryTitle}</span>
                                                        <span style={{fontSize: "10px", textAlign: "center"}}>{categoryTickets.length}</span>
                                                    </div>
                                                </>
                                            );
                                        }
                                    return <></>
                                    
                                })}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Recent tickets */}
                <h3 className="DashBoardScreen-ItemFont">Últimos Chamados</h3>
                <div className="table-container">
                    <table style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th className="table-header">Código</th>
                                <th className="table-header">Categoria</th>
                                <th className="table-header">Data de Abertura</th>
                                <th className="table-header">Data de Fechamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {LatestTickets?.map((ticket) => (
                                <tr key={ticket.Id}>
                                    <td className="table-item">{ticket.Id}</td>
                                    <td className="table-item">{ticket.ticketTitle}</td>
                                    <td className="table-item">{ticket.ticketDateOpen.split("T")[0]}</td>
                                    {ticket.ticketDateClose ? (
                                        <td className="table-item">{ticket.ticketDateClose.split("T")[0]}</td>
                                    ) : (
                                        <td className="table-item">-</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

        </div>
    </>
    )
}