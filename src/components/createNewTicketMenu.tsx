import { useState } from "react"
import type { i_Ticket, TicketCategory, TicketPriority, TicketStatus, TicketUser } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";

interface i_Create_New_Ticket_Menu
{
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    createNewTicketActive: boolean; 
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>;
    ticketPriorities: TicketPriority[];
    ticketCategories: i_TicketCategory[];
}

interface NewTicket
{
    ticketTitle: string,
    ticketCategory: string,
    ticketPriority: string,
    ticketProblemDescription: string,
    ticketSolicantName: string,
    ticketSolicantEmail: string,
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>
}

function create_new_ticket({ticketTitle, ticketCategory, ticketPriority, ticketProblemDescription,
                             ticketSolicantName, ticketSolicantEmail, setTickets}: NewTicket)
{
    const NewTicket: i_Ticket = {
        Id: 15,
        ticketTitle: ticketTitle,
        ticketStatus: { id: 1, name: "Open" },
        ticketPriority: { id: 1, name: ticketPriority },
        ticketCategory: { id: 1, name: ticketCategory },
        ticketDescription: ticketProblemDescription,
        ticketDateOpen: new Date(),
        ticketDateClose: null,
        ticketSolicitant: { id: 1, name: ticketSolicantName, email: ticketSolicantEmail },
        ticketAgent: null
    };

    setTickets((prevTickets) => [...prevTickets, NewTicket])
}

export function Create_New_Ticket_Menu
    ({setCreateNewTicketIsActive, createNewTicketActive, setTickets, ticketPriorities, ticketCategories}:i_Create_New_Ticket_Menu)
{
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketCategory, setTicketCategory] = useState("");
    const [ticketPriority, setTicketPriority]= useState("");
    const [ticketProblemDescription, setTicketProblemDescription] = useState("");
    const [ticketSolicantName, setTicketSolicitant] = useState("InternalValue");
    const [ticketSolicantEmail, setTicketSolicitantEmail] = useState("email");

    return (
        <div className="NewTicketTab">

                        <div className="NewTicketHeader">
                            <h1 className="HeaderFont" style={{color:"white"}}>Novo Chamado</h1>
                        </div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="input-group">
                                <label className="input-label">Título</label>
                                <input className="input-field" type="text" placeholder="Placeholder" onChange={(e) => setTicketTitle(e.target.value)}/>

                                <label className="input-label">Categoria</label>
                                <select className="input-field" onChange={(e) => setTicketCategory(e.target.value)}>
                                    {ticketCategories.map(category => (
                                       <option key={category.name} value={category.id}>{category.name}</option> 
                                    ))}
                                </select>

                                <label className="input-label">Prioridade</label>
                                <select className="input-field" onChange={(e) => setTicketPriority(e.target.value)}>
                                    <option key={"Selecione uma Prioridade"} value={""}></option>
                                    {ticketPriorities.map(priority => (
                                        <option key={priority.name} value={priority.id}>{priority.name}</option>
                                    ))}
                                </select>

                                <label className="input-label">Descrição do Problema</label>
                                <input className="input-field" type="text" placeholder="Placeholder" style={{height: "100%", flex: 1}} 
                                       onChange={(e) => setTicketProblemDescription(e.target.value)}/>
                            </div>
                        </div>

                        <div style={{display:"flex", flexDirection:"row", height: "10%", justifyContent:"space-evenly"}}>
                            <button className="tab-btn" style={{width:"40%"}} 
                            onClick={
                                () => 
                                {create_new_ticket({ticketTitle,ticketCategory,ticketPriority,ticketProblemDescription,ticketSolicantName, ticketSolicantEmail,setTickets})}
                                }>Criar Chamado</button>
                            <button className="tab-btn" style={{width:"40%", backgroundColor:"red"}} onClick={() => setCreateNewTicketIsActive(!createNewTicketActive)}>Cancelar</button>
                        </div>

                    </div>
    )
}
