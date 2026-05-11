import TickItLogo from "../images/TickItLogo.png";
import NotificationImage from "../images/NotificationImage.jpg"
import UserLogoImage from "../images/UserImage.png"


import { useEffect, useState } from "react";
import greetingDashboard from "../components/greetingDashboard";
import UserBoardState from "../components/userDashboard";
import UserDashBoard from "../components/userDashboard";
import GreetingDashboard from "../components/greetingDashboard";
import TicketTableDashboard from "../components/ticketTableDashboard";

interface TicketStatus {
  id: number;
  name: string;
}

interface TicketPriority {
  id: number;
  name: string;
}

interface TicketCategory {
  id: number;
  name: string;
}

interface TicketUser {
  id: number;
  name: string;
  email: string;
}

interface i_Ticket {
  Id: number;
  ticketTitle: string;
  ticketStatus: TicketStatus;
  ticketPriority: TicketPriority;
  ticketDescription: string;
  ticketCategory: TicketCategory;
  ticketDateOpen: Date;
  ticketDateClose: Date | null;
  ticketSolicitant: TicketUser;
  ticketAgent: TicketUser | null;
}

const tickets: i_Ticket[] = [
 {
        Id: 1,
        ticketTitle: "Login page not loading",
        ticketStatus: { id: 1, name: "Open" },
        ticketPriority: { id: 3, name: "High" },
        ticketDescription: "Users are unable to access the login page. The page returns a 500 error when navigating to /login.",
        ticketCategory: { id: 2, name: "Bug" },
        ticketDateOpen: new Date("2025-04-01T08:30:00"),
        ticketDateClose: null,
        ticketSolicitant: { id: 101, name: "Alice Johnson", email: "alice@example.com" },
        ticketAgent: { id: 201, name: "Carlos Lima", email: "carlos@example.com" }
    },
    {
        Id: 2,
        ticketTitle: "Add dark mode to dashboard",
        ticketStatus: { id: 2, name: "In Progress" },
        ticketPriority: { id: 2, name: "Medium" },
        ticketDescription: "Feature request to implement a dark mode toggle in the user dashboard settings panel.",
        ticketCategory: { id: 1, name: "Feature Request" },
        ticketDateOpen: new Date("2025-04-03T10:00:00"),
        ticketDateClose: null,
        ticketSolicitant: { id: 102, name: "Bob Smith", email: "bob@example.com" },
        ticketAgent: { id: 202, name: "Diana Ferreira", email: "diana@example.com" }
    },
    {
        Id: 3,
        ticketTitle: "Export to PDF not working",
        ticketStatus: { id: 3, name: "Resolved" },
        ticketPriority: { id: 3, name: "High" },
        ticketDescription: "The export to PDF button in the reports section throws a timeout error for files larger than 5MB.",
        ticketCategory: { id: 2, name: "Bug" },
        ticketDateOpen: new Date("2025-03-20T09:15:00"),
        ticketDateClose: new Date("2025-03-25T14:00:00"),
        ticketSolicitant: { id: 103, name: "Carol White", email: "carol@example.com" },
        ticketAgent: { id: 201, name: "Carlos Lima", email: "carlos@example.com" }
    },
    {
        Id: 4,
        ticketTitle: "Update user permissions documentation",
        ticketStatus: { id: 4, name: "Resolved" },
        ticketPriority: { id: 1, name: "Low" },
        ticketDescription: "The internal documentation for user roles and permissions is outdated and needs to reflect the latest changes from v2.4.",
        ticketCategory: { id: 3, name: "Documentation" },
        ticketDateOpen: new Date("2025-03-10T11:00:00"),
        ticketDateClose: new Date("2025-03-15T16:30:00"),
        ticketSolicitant: { id: 104, name: "David Brown", email: "david@example.com" },
        ticketAgent: { id: 203, name: "Eduardo Santos", email: "eduardo@example.com" }
    },
    {
        Id: 5,
        ticketTitle: "Database connection timeout on peak hours",
        ticketStatus: { id: 1, name: "Open" },
        ticketPriority: { id: 4, name: "Critical" },
        ticketDescription: "During peak hours (9–11am), the application frequently loses DB connection, causing data loss on form submissions.",
        ticketCategory: { id: 4, name: "Performance" },
        ticketDateOpen: new Date("2025-04-07T07:45:00"),
        ticketDateClose: null,
        ticketSolicitant: { id: 105, name: "Eva Martinez", email: "eva@example.com" },
        ticketAgent: null
    },
    {
        Id: 6,
        ticketTitle: "Wrong currency displayed for EU users",
        ticketStatus: { id: 2, name: "In Progress" },
        ticketPriority: { id: 2, name: "Medium" },
        ticketDescription: "Users with European locale settings are seeing USD instead of EUR in billing and invoice pages.",
        ticketCategory: { id: 2, name: "Bug" },
        ticketDateOpen: new Date("2025-04-05T13:20:00"),
        ticketDateClose: null,
        ticketSolicitant: { id: 106, name: "Frank Müller", email: "frank@example.com" },
        ticketAgent: { id: 202, name: "Diana Ferreira", email: "diana@example.com" }
    },
    {
        Id: 7,
        ticketTitle: "Integrate Slack notifications",
        ticketStatus: { id: 1, name: "Open" },
        ticketPriority: { id: 2, name: "Medium" },
        ticketDescription: "Request to integrate Slack webhooks so that ticket status changes trigger notifications in the #support channel.",
        ticketCategory: { id: 1, name: "Feature Request" },
        ticketDateOpen: new Date("2025-04-08T15:00:00"),
        ticketDateClose: null,
        ticketSolicitant: { id: 107, name: "Grace Lee", email: "grace@example.com" },
        ticketAgent: null
    },
    {
        Id: 8,
        ticketTitle: "Integrate Slack notifications",
        ticketStatus: { id: 1, name: "Awaiting Confirmation" },
        ticketPriority: { id: 2, name: "Medium" },
        ticketDescription: "Request to integrate Slack webhooks so that ticket status changes trigger notifications in the #support channel.",
        ticketCategory: { id: 1, name: "Feature Request" },
        ticketDateOpen: new Date("2025-04-08T15:00:00"),
        ticketDateClose: null,
        ticketSolicitant: { id: 107, name: "Grace Lee", email: "grace@example.com" },
        ticketAgent: null
    }
];

function fetchTickets(setTickets:React.Dispatch<React.SetStateAction<i_Ticket[]>>)
{
    const ticketsFound = tickets;
    setTickets(ticketsFound);
}

export default function DashScreenScreen() {
    const [dashBoardState, setDashBoardState] = useState(0)
    const [notificationIsActive, setNotificationIsActive] = useState(false)
    const [createNewTicketActive, setCreateNewTicketIsActive] = useState(false)
    const [tickets, setTickets] = useState<i_Ticket[]>([]);

        
   useEffect(() => {
        fetchTickets(setTickets);
    }, []);

    function drawDashBoard(dashBoardState : number)
    {
        switch(dashBoardState)
        {
            case 0:
            {
                return <GreetingDashboard
                    notificationIsActive={notificationIsActive}
                    setNotificationIsActive={setNotificationIsActive}
                    createNewTicketActive={createNewTicketActive}
                    setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                />
            }
            case 1:
                {
                    return <TicketTableDashboard
                        notificationIsActive={notificationIsActive}
                        setNotificationIsActive={setNotificationIsActive}
                        setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                        createNewTicketActive={createNewTicketActive}
                        tickets={tickets} 
                    />
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

                    <div className="icon-btn" onClick={() => {setNotificationIsActive(!notificationIsActive)}}>
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