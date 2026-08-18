import { useEffect, useState } from "react";
import type { i_Ticket } from "../../interfaces/i_ticket";
import DetailedTicketInfo from "../detailedTicketInfo";

const NewTicketCode = 1;
const TicketInProgressCode = 2;
const PendingTicketCode = 4;
const ConcludedTicketCode = 5;

interface i_department
{
    Id: number;
    depNomeDepartamento : string;
}

interface i_role
{
    Id: number;
    carNome: string; 
}

interface i_user 
{
    Id : number;
    usuarEmail : string;
    usuarNome : string;
}

const statusOptions = [
    { label: "NOVO TICKET", bgColor: "#ffa2a2", buttonCode: NewTicketCode },
    { label: "EM ANDAMENTO", bgColor: "#766cff", buttonCode: TicketInProgressCode},
    { label: "AGUARDANDO RESPOSTA", bgColor: "#ffd665", buttonCode: PendingTicketCode },
    { label: "FINALIZADO", bgColor: "#66e9a1", buttonCode: ConcludedTicketCode }
];

const c_i_unpickedDep = 0;
const c_i_unpickedRole = 0;
const c_i_unpickedTicket = -1;

export default function TicketMonthsDashBoard()
{
    const [departments, setDepartment] = useState<i_department[]>([]);
    const [pickedDepartmentCode, setPickedDepartmentCode] = useState<number>(c_i_unpickedDep);
    const [roles, setRoles] = useState<i_role[]>([]);
    const [pickedRole, setPickedRole] = useState<number>(c_i_unpickedRole)
    const [foundUsers, setFoundUsers] = useState<i_user[]>([])
    const [pickedUser, setPickedUser] = useState<string>()
    const [foundTickets, setFoundTickets] = useState<i_Ticket[]>([])
    const [selectedTicket, setSelectedTicket] = useState<i_Ticket>()
    const [displayDetailedTicket,setDisplayDetailedTicket] = useState<boolean>(false);

    const [hoveredTicket, setHoveredTicket] = useState<number>(c_i_unpickedTicket);

    function setSelectedRole(pn_roleCode : number)
    {
        setPickedRole(pn_roleCode);
    }

    function setSelectedDepartment(pn_departmentCode : number)
    {
        setPickedDepartmentCode(pn_departmentCode);
    }

    function setSelecteduser(ps_userEmail : string)
    {
        setPickedUser(ps_userEmail)
    }

    async function fetchDepartments(setDepartment: React.Dispatch<React.SetStateAction<i_department[]>>)
    {
        const url = "http://localhost:3000/Departamento/GetAll";

        try 
        {
            const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json' 
            }})

            const data = await response.json() as i_department[]; 

            setDepartment(data);
        } 
        catch (error) 
        {   
            console.error(error);
        }
    }

    async function fetchRolesByDepartment(pn_departmentCode : number)
    {
        const url = `http://localhost:3000/Cargo/fetch-roles-by-department/${pn_departmentCode}`;

        try 
        {
            const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json' 
            }})

            const data = await response.json() as i_role[]; 

            setRoles(data);
            setFoundUsers([])
            setFoundTickets([])

        } 
        catch (error) 
        {   
            console.error(error);
        }
    }

    async function FetchUsersByRole(pn_departmentCode : number)
    {
        const url = `http://localhost:3000/Usuario/users-by-role/${pn_departmentCode}`;

        try 
        {
            const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json' 
            }})

            let data = await response.json();
            data = data.message;
            
            const UsersFound = data as i_user[];

            setFoundUsers(UsersFound);
            setFoundTickets([]);

        } 
        catch (error) 
        {   
            console.error(error);
        }
    }

    async function FetchTicketsByUser(ps_userEmail : string)
    {
        const url = `http://localhost:3000/Ticket/GetTicketsByEmail`;

        try 
        {
            const response = await fetch(url, {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json' 
            },
            body: 
                JSON.stringify({   
                    "email": ps_userEmail
                })
            })

            let data = await response.json() as i_Ticket[];
            
            const TicketsFound = data;

            setFoundTickets(TicketsFound);

        } 
        catch (error) 
        {   
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRolesByDepartment(pickedDepartmentCode)

    }, [pickedDepartmentCode])

    useEffect(() => {
        fetchDepartments(setDepartment);
    }, []);

    useEffect(() => {
        FetchUsersByRole(pickedRole)
    }, [pickedRole]);

    useEffect(() => {
        FetchUsersByRole(pickedRole)
    }, [pickedUser]);

    useEffect(() => {
        if(pickedUser){FetchTicketsByUser(pickedUser)}
    }, [pickedUser]);


    return <div style={styles.DashBoardBody}>
        {
           (displayDetailedTicket && selectedTicket) && <DetailedTicketInfo 
                                        ticketInfo={selectedTicket} 
                                        setShowDetailedTicket={setDisplayDetailedTicket}/>
                                    
        }
        <div style={styles.TitleBar}>
            <p style={styles.TitleFont}> Status Colaboradores </p>
        </div>
        {/***Departments Graph */}
        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Departamento</p>
                {departments.map((department) => (
                    <div key={department.Id} 
                        style={{...styles.CategoryCard, backgroundColor: pickedDepartmentCode === department.Id ? "#4386d8" : "#eef4fc" }}
                        onClick={() => {setSelectedDepartment(department.Id)}}>
                        <p style={styles.BarLabel}>{department.depNomeDepartamento}</p>
                    </div>
                ))}
        </div>

        {/***Areas in department */}
        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Cargos por Setor</p>
                <div style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", width:"100%"}}>
                    {roles.map((role) => (
                        <div
                            key={role.Id}
                            style={{...styles.roleButton, backgroundColor: pickedRole === role.Id ? "#4386d8" : "#eef4fc"}}
                            onClick={() => {setSelectedRole(role.Id)}}
                            >
                            <p style={styles.roleButtonText}>{role.carNome}</p>
                        </div>
                    ))}
                </div>
        </div>

        {/** Colaboradores Encotrados */}
        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Usuários encontrados </p>
                <div style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", width:"100%"}}>
                    {foundUsers.map((user) => (
                        <div
                            key={user.Id}
                            style={{...styles.roleButton, backgroundColor: pickedUser === user.usuarEmail ? "#4386d8" : "#eef4fc"}}
                            onClick={() => {setSelecteduser(user.usuarEmail)}}
                            >
                            <p style={styles.roleButtonText}>{user.usuarNome}</p>
                        </div>))    
                    }
                </div>
        </div>

        {/** Tickets Encontrados */}
        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Tickets Associados ao Usuário</p>  
            <div style={styles.KanbanBoard}>
                {foundTickets.map((ticket) => (
                    <div key={ticket.Id} style={{...styles.KanbanColumn, backgroundColor: hoveredTicket == ticket.Id ? "#eeeeee" : "#ffffff", 
                                                                         cursor: "pointer" }} 
                        onMouseEnter={() => setHoveredTicket(ticket.Id)}
                        onMouseLeave={() => setHoveredTicket(c_i_unpickedTicket)} 
                        onClick={() => {setDisplayDetailedTicket(true); setSelectedTicket(ticket);}}>
                        <div style={styles.KanbanColumnHeader}>
                            <span
                                style={{
                                    ...styles.StatusDot,
                                    backgroundColor: statusOptions.find(
                                    (status) => status.label === ticket.ticketStatus.tickstaDescription
                                    )?.bgColor
                                }}
                            />
                            <span style={styles.KanbanCountNumber}> N° Chamado: {ticket.Id}</span>
                            <div style={styles.KanbanCountBadge}>
                                <span style={styles.KanbanCountUnit}>{ticket.ticketTitle}</span>
                            </div>

                            <div
                                style={{
                                    ...styles.KanbanAccentBar,
                                    backgroundColor: statusOptions.find(
                                        (status) => status.label === ticket.ticketStatus.tickstaDescription
                                        )?.bgColor
                                }}
                            />
                        </div>

                    </div>
                ))}
            </div>

        </div>               

    </div>
           


}

const styles = {
    DashBoardBody : {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection:"column",
        overflowY: "scroll"
    },
    TitleBar : {
        display: "flex",
        flexDirection: "row",
        textAlign:"center",
        justifyContent:"center",
        backgroundColor: "#e0dddd"
    },
    TitleFont : {
        fontFamily: "Nunito",
        fontSize: "2rem",
        fontWeight: "700",
        color: "#4386d8",
        letterSpacing: "-0.01em",
        lineHeight: "1.2"
    },
    AuxFont: {
        fontFamily: "Nunito",
        fontSize: "2rem",
        fontWeight: "500",
        color: "#8d8c8c",
        letterSpacing: "-0.01em",
        lineHeight: "1.2"
    }, 

     Container: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#ffffff",
    },

    SectionTitle: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "25px",
        color: "#4386d8",
        margin: 0,
    },

     SectorButtonBar: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
    },

    CategoryDot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        flexShrink: 0,
        marginRight: "15px"
    },

    CategoryLabel: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "13px",
        color: "#3f3f46",
    },

    separationBar : 
    {
        width:"100%",
        height: "1%",
        backgroundColor: "#f0f0f0"
    },

    CategoryCard: {
        flex: "1 1 45%",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "12px",
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "14px",
        color: "#4a4a4a",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "outline-offset 0.15s ease",
        outlineOffset: "2px"
    },

    BarLabel: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "12px",
        color: "#6b7280",
        whiteSpace: "nowrap",
    },

    roleButton: 
    {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderRadius: 8,
        backgroundColor: "#fff",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.15s ease",
        borderStyle: "solid",
        borderColor: "#e7e6e6"
    },

    roleButtonText :  
    {
        margin: 0,
        fontSize: 14,
        color: "#333",
        fontFamily: "inherit",
    },

    KanbanBoard: {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
        overflowX: "auto",
        paddingBottom: "4px",
    },

    KanbanColumnHeader: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexDirection:"column"
    },

    KanbanColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "140px",
        flex: "1 1 0",
        backgroundColor: "#fafbff",
        border: "1px solid #eef1f8",
        borderRadius: "12px",
        padding: "14px 12px",
    },

    KanbanColumnTitle: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "12.5px",
        color: "#52525b",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    KanbanCountBadge: {
        display: "flex",
        alignItems: "baseline",
        gap: "4px",
        flexDirection: "column",
    },

    StatusDot: {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        flexShrink: 0,
    },

    KanbanCountNumber: {
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: "16px",
        color: "#1a1a1a",
    },

    KanbanCountUnit: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "20px",
        color: "#9ca3af",
    },

    KanbanAccentBar: {
        width: "100%",
        height: "3px",
        borderRadius: "2px",
        opacity: 0.85,
    },

} as const satisfies Record<string, React.CSSProperties>;