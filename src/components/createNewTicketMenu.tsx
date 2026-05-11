interface i_Create_New_Ticket_Menu
{
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    createNewTicketActive: boolean 
}
export function Create_New_Ticket_Menu
    ({setCreateNewTicketIsActive, createNewTicketActive}:i_Create_New_Ticket_Menu)
{
    return (
        <div className="NewTicketTab">

                        <div className="NewTicketHeader">
                            <h1 className="HeaderFont" style={{color:"white"}}>Novo Chamado</h1>
                        </div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="input-group">
                                <label className="input-label">Título</label>
                                <input className="input-field" type="text" placeholder="Placeholder" />

                                <label className="input-label">Categoria</label>
                                <select className="input-field">
                                    <option value="">Placeholder</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                </select>

                                <label className="input-label">Prioridade</label>
                                <select className="input-field">
                                    <option value="">Placeholder</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                </select>

                                <label className="input-label">Descrição do Problema</label>
                                <input className="input-field" type="text" placeholder="Placeholder" style={{height: "100%", flex: 1}}/>
                            </div>
                        </div>

                        <div style={{display:"flex", flexDirection:"row", height: "10%", justifyContent:"space-evenly"}}>
                            <button className="tab-btn" style={{width:"40%"}}>Criar Chamado</button>
                            <button className="tab-btn" style={{width:"40%", backgroundColor:"red"}} onClick={() => setCreateNewTicketIsActive(!createNewTicketActive)}>Cancelar</button>
                        </div>

                    </div>
    )
}
