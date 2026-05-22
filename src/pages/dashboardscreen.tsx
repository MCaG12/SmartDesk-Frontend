import TickItLogo from "../images/TickItLogo.png";
import NotificationImage from "../images/NotificationImage.jpg"
import UserLogoImage from "../images/UserImage.png"


import { useEffect, useState } from "react";
import UserDashBoard from "../components/userDashboard";
import GreetingDashboard from "../components/greetingDashboard";
import TicketTableDashboard from "../components/ticketTableDashboard";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import { useLocation } from "react-router-dom";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_Ticket } from "../interfaces/i_ticket";



async function fetchTickets(setTickets:React.Dispatch<React.SetStateAction<i_Ticket[]>>, userEmail: string)
{
    const url = "http://localhost:3000/Ticket/GetTicketsByEmail";

    try
    {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: 
            JSON.stringify({   
                "email": userEmail
              
            })
        });

        const data = await response.json() as i_Ticket[]; 
        setTickets(data);
    }
    catch (error)
    {
        console.error("Error:", error);
       
    }
}

async function fetchTicketPriorities(setTicketPriorities:React.Dispatch<React.SetStateAction<i_TicketPriority[]>>)
{
    const url = "http://localhost:3000/TypePriority/GetAll";

    try
    {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json() as i_TicketPriority[]; 
        setTicketPriorities(data);
    }
    catch (error)
    {
        console.error("Error:", error);
       
    }
}

async function fetchTicketCategories(setTicketCategories:React.Dispatch<React.SetStateAction<i_TicketCategory[]>>)
{
     const url = "http://localhost:3000/TicketCategory/GetAll";

    try
    {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json() as i_TicketCategory[]; 
        setTicketCategories(data);
    }
    catch (error)
    {
        console.error("Error:", error);
       
    }
}

export default function DashScreenScreen() {
    const location = useLocation();
    const { userFound } = location.state;
    const [dashBoardState, setDashBoardState] = useState(0)
    const [notificationIsActive, setNotificationIsActive] = useState(false)
    const [createNewTicketActive, setCreateNewTicketIsActive] = useState(false)
    const [tickets, setTickets] = useState<i_Ticket[]>([]);
    const [ticketPriorities, setTicketPriorities] = useState<i_TicketPriority[]>([]);
    const [ticketCategories, setTicketCategories] = useState<i_TicketCategory[]>([]);
        
   useEffect(() => {
    const fetchData = async () => {
        await fetchTickets(setTickets, userFound.usuarEmail);
        
    };

    fetchData();
    }, []);

   useEffect(() => {
    const fetchData = async () => {
        await fetchTicketPriorities(setTicketPriorities);
    };

    fetchData();
    }, []);

    useEffect(() => {
    const fetchData = async () => {
        await fetchTicketCategories(setTicketCategories);
    };

    fetchData();
    }, []);

    useEffect(() => {
        console.log(userFound);
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
                    tickets={tickets}
                    setTickets={setTickets}
                    ticketCategories={ticketCategories}
                    ticketPriorities={ticketPriorities}
                    userInfo={userFound}
                />
            }
            case 1:
                {
                    return <TicketTableDashboard
                        notificationIsActive={notificationIsActive}
                        setTickets={setTickets}
                        setCreateNewTicketIsActive={setCreateNewTicketIsActive}
                        createNewTicketActive={createNewTicketActive}
                        tickets={tickets} 
                        ticketPriorities={ticketPriorities}
                        ticketCategories={ticketCategories}
                        userInfo={userFound}
                    />
                }
            case 2:
            {
                return <UserDashBoard 
                    Name={userFound.usuarNome}
                    Email={userFound.usuarEmail}
                    Type={userFound.usuarTipoUsuario.tipusuDescricao}
                    Role={userFound.usuarCargo.carNome}
                    Department={userFound.usuarDepartamento.depNomeDepartamento}
                />
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