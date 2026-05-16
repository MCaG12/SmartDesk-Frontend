import type { i_NewTicketForm } from "../interfaces/i_NewTicket";


export function NewTicketForm({ ticketCategories, ticketPriorities, setTicketTitle, 
                                setTicketCategory, setTicketPriority, setTicketProblemDescription }: i_NewTicketForm) {
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div className="input-group">
                <label className="input-label">Título</label>
                <input className="input-field" type="text" placeholder="Digite o titulo do chamado" 
                       onChange={(e) => setTicketTitle(e.target.value)}/>

                <label className="input-label">Categoria</label>
                <select className="input-field" defaultValue="" onChange={(e) => {
                    const selected = ticketCategories.find(c => c.Id === Number(e.target.value));
                    if(selected){ setTicketCategory(selected); }
                }}>
                    <option value="" disabled>Selecione uma categoria</option>
                    {ticketCategories.map(category => (
                        <option key={category.tickcatDescription} value={category.Id}>{category.tickcatDescription}</option>
                    ))}
                </select>

                <label className="input-label">Prioridade</label>
                <select className="input-field" defaultValue="" onChange={(e) => {
                    const selected = ticketPriorities.find(c => c.Id === Number(e.target.value));
                    if(selected){ setTicketPriority(selected); }
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
    );
}