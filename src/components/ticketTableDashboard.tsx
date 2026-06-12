import { useState } from "react";
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import { Create_New_Ticket_Menu } from "./createNewTicketMenu";
import { Notification_Menu } from "./notificationsMenu";
import { Ticket_Table_Body } from "./ticketTableBody";
import DetailedTicketInfo from "./detailedTicketInfo";



interface i_TicketTableDashboard
{
    notificationIsActive : boolean,
    setTickets :  React.Dispatch<React.SetStateAction<i_Ticket[]>>,
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    createNewTicketActive: boolean,
    tickets: i_Ticket[];
    ticketPriorities: i_TicketPriority[];
    ticketCategories: i_TicketCategory[];
    userInfo: i_UserLoginInfoResponse;
    fetchTickets(setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>, userEmail: string): Promise<void>
}

export default function TicketTableDashboard({notificationIsActive,setTickets, setCreateNewTicketIsActive, 
                                              createNewTicketActive, tickets, ticketPriorities, ticketCategories,userInfo, fetchTickets}: i_TicketTableDashboard)
{
    const [showDetailedTicket, setShowDetailedTicket] = useState(false);
    const [infoDetailedTicket, setInfoDetailedTicket] = useState<i_Ticket>()

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

            {
                (showDetailedTicket && infoDetailedTicket) &&
                    <DetailedTicketInfo 
                        ticketInfo={infoDetailedTicket}
                        setShowDetailedTicket={setShowDetailedTicket}
                    />
            }

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

            
                
            <h1 className="DashBoard-Title">Chamados</h1>
            <hr style={{ marginBottom: "2%" }}></hr>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", height: "100%", flexWrap:"wrap", overflowX: "auto"}}>

            
            {/* Novos Chamados */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#ffa2a2", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Novos Chamados</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.tickstaDescription == "NOVO TICKET"}).map(ticket => (
                        <Ticket_Table_Body 
                            ticketInfo={ticket}
                            setInfoDetailedTicket={setInfoDetailedTicket}
                            setShowDetailedTicket={setShowDetailedTicket}
                            showDetailedTicket={showDetailedTicket}
                            fetchTickets={fetchTickets}
                            setTickets={setTickets}
                        />
                    ))
                }
            </div>

            {/* Em Andamento */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#766cff", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Em Andamento</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.tickstaDescription == "EM ANDAMENTO"}).map(ticket => (
                        <Ticket_Table_Body 
                            ticketInfo={ticket}
                            setInfoDetailedTicket={setInfoDetailedTicket}
                            setShowDetailedTicket={setShowDetailedTicket}
                            showDetailedTicket={showDetailedTicket}
                            fetchTickets={fetchTickets}
                            setTickets={setTickets}
                        />
                    ))
                }
            </div>

            {/* Ag. Terceiros */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#ffd665", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Ag. Terceiros</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.tickstaDescription == "AGUARDANDO RESPOSTA"}).map(ticket => (
                        <Ticket_Table_Body
                            ticketInfo={ticket}
                            setShowDetailedTicket={setShowDetailedTicket}
                            setInfoDetailedTicket={setInfoDetailedTicket}
                            showDetailedTicket={showDetailedTicket}
                            fetchTickets={fetchTickets}
                            setTickets={setTickets}
                        />
                    ))
                }       
            </div>

            {/* Concluídos */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#66e9a1", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Concluídos</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.tickstaDescription == "FINALIZADO"}).map(ticket => (
                        <Ticket_Table_Body 
                            ticketInfo={ticket}
                            setInfoDetailedTicket={setInfoDetailedTicket}
                            setShowDetailedTicket={setShowDetailedTicket}
                            showDetailedTicket={showDetailedTicket}
                            fetchTickets={fetchTickets}
                            setTickets={setTickets}
                        />
                    ))
                }   
            </div>

            </div>



        </div>
    </>
    )
}