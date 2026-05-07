import DashBoardNewTicketsImage from "../images/DashBoardNewTicketsImage.png"
import DashBoardTicketAWaitingForConfirmationImage from "../images/DashBoardTicketAWaitingForConfirmationImage.png"
import DashBoardTicketsCompletedImage from "../images/DashBoardTicketsCompletedImage.png"
import DashBoardTicketsInProgressImage from "../images/DashBoardTicketsInProgressImage.png"

interface i_greetingDashboard
{
    notificationIsActive: boolean;
    setNotificationIsActive: React.Dispatch<React.SetStateAction<boolean>>
    createNewTicketActive: boolean;
    setCreateNewTicketIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GreetingDashboard({notificationIsActive, setNotificationIsActive, createNewTicketActive, setCreateNewTicketIsActive} : i_greetingDashboard)
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
                <h1 className="DashBoard-Title">Dashboard</h1>

                {/* Stat cards */}
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "15%", gap: "1%", marginBottom: "1%"}}>
                    
                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardNewTicketsImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <h1>test</h1>
                            <h1>test</h1>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsInProgressImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <h1>test</h1>
                            <h1>test</h1>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketAWaitingForConfirmationImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <h1>test</h1>
                            <h1>test</h1>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div style={{width:"20%"}}>
                            <img src={DashBoardTicketsCompletedImage} alt="Greeting" style={{ width: "100%", height: "100%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />  
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <h1>test</h1>
                            <h1>test</h1>
                        </div>
                    </div>
                </div>

                {
                    notificationIsActive &&  
                    <div className="NotificationsTab">
                        <h1 className="HeaderFont" style={{color: "#4272b6"}}>Notificações</h1>  
                        <hr></hr>
                        <div className="notificationContainer">
                            <div className="notificationBody">
                                <div style={{width:"100%", height:"20%", backgroundColor:"#4a7fcb", borderRadius: "30px 30px 0 0"}}>
                                    <h1 className="greetTitle" style={{textAlign:"center"}}> Titulo Ticket</h1>
                                </div>
                            </div>
                            <div className="notificationBody">
                                <div style={{width:"100%", height:"20%", backgroundColor:"#4a7fcb", borderRadius: "30px 30px 0 0"}}>
                                    <h1 className="greetTitle" style={{textAlign:"center"}}> Titulo Ticket</h1>
                                </div>
                            </div>  
                        </div>
                    </div>
                }

                {
                    createNewTicketActive && 
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
                }

                {/* Charts */}
                <div style={{display: "flex", flexDirection: "row", width: "100%", height: "45%", gap: "1%", marginBottom: "1%"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "30%", height: "100%"}}>
                    <h3 className="DashBoardScreen-ItemFont">Chamados por categoria</h3>
                    <div style={{width: "100%", flex: 1, backgroundColor: "white"}}></div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", width: "70%", height: "100%"}}>
                    <h3 className="DashBoardScreen-ItemFont">Quantidade de Chamados por Dia</h3>
                    <div style={{width: "100%", flex: 1, backgroundColor: "white"}}></div>
                    </div>
                </div>

                {/* Recent tickets */}
                <h3 className="DashBoardScreen-ItemFont">Ultimos Chamados</h3>
                <div className="table-container">
    
                </div>

        </div>
    </>
    )
}