import { useState } from "react"
import type { i_Ticket } from "../interfaces/i_ticket";
import type { i_TicketCategory } from "../interfaces/i_ticketCategory";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import type { i_TicketPriority } from "../interfaces/i_ticketPriority";
import type { i_TicketSolicitant } from "../interfaces/i_ticketSolicitant";

interface i_Create_New_Ticket_Menu
{
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    createNewTicketActive: boolean; 
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>;
    ticketPriorities: i_TicketPriority[];
    ticketCategories: i_TicketCategory[];
    userInfo:i_UserLoginInfoResponse;
}

interface NewTicket
{
    ticketTitle: string,
    ticketCategory: i_TicketCategory,
    ticketPriority: i_TicketPriority,
    ticketProblemDescription: string,
    ticketSolicitant: i_TicketSolicitant,
    setTickets: React.Dispatch<React.SetStateAction<i_Ticket[]>>
}

function create_new_ticket({ticketTitle, ticketCategory, ticketPriority, ticketProblemDescription,
                             ticketSolicitant, setTickets}: NewTicket)
{
    const NewTicket: i_Ticket = {
        Id: 15,
        ticketTitle: ticketTitle,
        ticketStatus: { id: 1, name: "Open" },
        ticketPriority: ticketPriority,
        ticketCategory: ticketCategory,
        ticketDescription: ticketProblemDescription,
        ticketDateOpen: new Date(),
        ticketDateClose: null,
        ticketSolicitant: ticketSolicitant,
        ticketAgent: null
    };

    setTickets((prevTickets) => [...prevTickets, NewTicket])
    console.log(NewTicket)
}

export function Create_New_Ticket_Menu
    ({setCreateNewTicketIsActive, createNewTicketActive, setTickets, ticketPriorities, ticketCategories, userInfo}:i_Create_New_Ticket_Menu)
{
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketCategory, setTicketCategory] = useState<i_TicketCategory>();
    const [ticketPriority, setTicketPriority]= useState<i_TicketPriority>();
    const [ticketProblemDescription, setTicketProblemDescription] = useState("");

    const ticketSolicitant :i_TicketSolicitant = {Id: userInfo.Id, name: userInfo.usuarNome, email: userInfo.usuarEmail};

    return (
        <div className="NewTicketTab">

                        <div className="NewTicketHeader">
                            <h1 className="HeaderFont" style={{color:"white"}}>Novo Chamado</h1>
                        </div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="input-group">
                                <label className="input-label">Título</label>
                                <input className="input-field" type="text" placeholder="Digite o titulo do chamado" onChange={(e) => setTicketTitle(e.target.value)}/>

                                <label className="input-label">Categoria</label>
                                <select className="input-field" onChange={(e) => {
                                    const selected = ticketCategories.find(c => c.id === Number(e.target.value));
                                    if(selected){setTicketCategory(selected);}
                                    
                                }}>
                                    <option value="" disabled selected>Selecione uma categoria</option>
                                    {ticketCategories.map(category => (
                                       <option key={category.name} value={category.id}>{category.name}</option> 
                                    ))}

                                </select>

                                <label className="input-label">Prioridade</label>
                                <select className="input-field" onChange={(e) => {
                                    const selected = ticketPriorities.find(c => c.id === Number(e.target.value));
                                    if(selected){setTicketPriority(selected);}
                                    
                                }}>
                                    <option value="" disabled selected>Selecione uma prioridade</option>
                                    {ticketPriorities.map(priority => (
                                        <option key={priority.name} value={priority.id}>{priority.name}</option>
                                    ))}
                                    <option key={"AutomaticPicker"} value={5}>Priorização automática</option>
                                </select>

                                <label className="input-label">Descrição do Problema</label>
                                <input className="input-field" type="text" placeholder="Digite a descrição do problema" style={{height: "100%", flex: 1}} 
                                       onChange={(e) => setTicketProblemDescription(e.target.value)}/>
                            </div>
                        </div>

                        <div style={{display:"flex", flexDirection:"row", height: "10%", justifyContent:"space-evenly"}}>
                            <button className="tab-btn" style={{width:"40%"}} 
                            onClick={
                                () => 
                                {
                                    if (ticketCategory && ticketPriority) {
                                    create_new_ticket({ticketTitle,ticketPriority,ticketCategory,ticketProblemDescription,ticketSolicitant,setTickets})
                                    }
                                }
                                }>Criar Chamado</button>
                            <button className="tab-btn" style={{width:"40%", backgroundColor:"red"}} onClick={() => setCreateNewTicketIsActive(!createNewTicketActive)}>Cancelar</button>
                        </div>

                    </div>
    )
}
