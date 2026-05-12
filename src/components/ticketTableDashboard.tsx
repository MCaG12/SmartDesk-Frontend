import type { i_Ticket, TicketPriority } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import { Create_New_Ticket_Menu } from "./createNewTicketMenu";
import { Notification_Menu } from "./notificationsMenu";
import { Ticket_Table_Body } from "./ticketTableBody";



interface i_TicketTableDashboard
{
    notificationIsActive : boolean,
    setTickets :  React.Dispatch<React.SetStateAction<i_Ticket[]>>,
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    createNewTicketActive: boolean,
    tickets: i_Ticket[];
    ticketPriorities: TicketPriority[];
    ticketCategories: i_TicketCategory[];
}

export default function TicketTableDashboard({notificationIsActive,setTickets, setCreateNewTicketIsActive, 
                                              createNewTicketActive, tickets, ticketPriorities, ticketCategories}: i_TicketTableDashboard)
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
                    />
            }

            
                
            <h1 className="DashBoard-Title">Chamados</h1>
            <hr style={{ marginBottom: "2%" }}></hr>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", height: "100%" }}>

            
            {/* Novos Chamados */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#ffa2a2", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Novos Chamados</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.name == "Open"}).map(ticket => (
                        Ticket_Table_Body({
                        id: ticket.Id,
                        title: ticket.ticketTitle,
                        openingDate: ticket.ticketDateOpen,
                        closingDate: ticket.ticketDateClose,
                        department: ticket.ticketSolicitant.name,
                        problemCategory: ticket.ticketCategory.name,
                        priority: ticket.ticketPriority.name,
                        })
                    ))
                }
            </div>

            {/* Em Andamento */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#766cff", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Em Andamento</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.name == "In Progress"}).map(ticket => (
                        Ticket_Table_Body({
                        id: ticket.Id,
                        title: ticket.ticketTitle,
                        openingDate: ticket.ticketDateOpen,
                        closingDate: ticket.ticketDateClose,
                        department: ticket.ticketSolicitant.name,
                        problemCategory: ticket.ticketCategory.name,
                        priority: ticket.ticketPriority.name,
                        })
                    ))
                }
            </div>

            {/* Ag. Terceiros */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#ffd665", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Ag. Terceiros</h1>
                </div>
                {
                    tickets.filter(ticket => {return ticket.ticketStatus.name == "Awaiting Confirmation"}).map(ticket => (
                        <Ticket_Table_Body
                            key={ticket.Id}
                            id={ticket.Id}
                            title={ticket.ticketTitle}
                            openingDate={ticket.ticketDateOpen}
                            closingDate={ticket.ticketDateClose}
                            department={ticket.ticketSolicitant.name}
                            problemCategory={ticket.ticketCategory.name}
                            priority={ticket.ticketPriority.name}
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
                    tickets.filter(ticket => {return ticket.ticketStatus.name == "Resolved"}).map(ticket => (
                        Ticket_Table_Body({
                        id: ticket.Id,
                        title: ticket.ticketTitle,
                        openingDate: ticket.ticketDateOpen,
                        closingDate: ticket.ticketDateClose,
                        department: ticket.ticketSolicitant.name,
                        problemCategory: ticket.ticketCategory.name,
                        priority: ticket.ticketPriority.name,
                        })
                    ))
                }   
            </div>

            </div>



        </div>
    </>
    )
}