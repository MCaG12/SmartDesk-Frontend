import { useRef, useState } from "react";
import type { i_NewTicketForm } from "../interfaces/i_NewTicket";

function resolvePageStatus(pickedPriority: number): number {
    return pickedPriority === 5 ? 3 : 1;
}

export function NewTicketForm({ ticketCategories, ticketPriorities, setTicketTitle, 
                                setTicketCategory, setTicketPriority, 
                                setTicketProblemDescription, setPageStatus, setCreateNewTicketIsActive
                            }: i_NewTicketForm) {
    const [ , setPickedPriority] = useState(0);
    const pickedPriorityRef = useRef(0);
    return (
        <>
            <div className="NewTicketHeader">
                <h1 className="HeaderFont" style={{color:"white"}}>Novo Chamado</h1>
            </div>
            <div style={{display:"flex", flexDirection:"column", flex: 1}}>
                <div className="input-group">
                    <label className="input-label">Título</label>
                    <input className="input-field" type="text" placeholder="Digite o titulo do chamado" onChange={(e) => setTicketTitle(e.target.value)}/>
                    <label className="input-label">Categoria</label>
                    <select className="input-field" defaultValue="" onChange={(e) => {
                        const selected = ticketCategories.find(c => c.Id === Number(e.target.value));
                        if(selected){setTicketCategory(selected);}
                    }}>
                        <option value="" disabled>Selecione uma categoria</option>
                        {ticketCategories.map(category => (
                            <option key={category.tickcatDescription} value={category.Id}>{category.tickcatDescription}</option> 
                        ))}
                    </select>
                    <label className="input-label">Prioridade</label>
                    <select className="input-field" defaultValue="" onChange={(e) => {
                        const pickedOption = Number(e.target.value);
                        if(pickedOption == 5)
                            {
                              pickedPriorityRef.current = 5;  
                            }
                        else
                        {
                            const selected = ticketPriorities.find(c => c.Id === pickedOption);
                            if(selected)
                                {
                                    setTicketPriority(selected);
                                    setPickedPriority(selected.Id);
                                    pickedPriorityRef.current = selected.Id;
                                }
                        }
                        
                    }}>
                        <option value="" disabled>Selecione uma prioridade</option>
                        {ticketPriorities.map(priority => (
                            <option key={priority.typepriDescription} value={priority.Id}>{priority.typepriDescription}</option>
                        ))}
                        <option key="AutomaticPicker" value={5}>Priorização automática</option>
                    </select>
                    <label className="input-label">Descrição do Problema</label>
                    <input className="input-field" type="text" placeholder="Digite a descrição do problema" 
                           style={{height: "100%", flex: 1}} 
                           onChange={(e) => setTicketProblemDescription(e.target.value)}/>
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", height: "10%", justifyContent:"space-evenly"}}>
                <button className="tab-btn" style={{width:"40%"}} onClick={() => {const priority = pickedPriorityRef.current; 
                                                                                  
                                                                                    setPageStatus(resolvePageStatus(priority));}}>
                    Criar Chamado
                </button>
                <button className="tab-btn" style={{width:"40%", backgroundColor:"red"}} onClick={() => setCreateNewTicketIsActive(false)}>
                    Cancelar
                </button>
            </div>
        </>
    );
}