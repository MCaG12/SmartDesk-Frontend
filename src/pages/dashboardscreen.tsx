import TickItLogo from "../images/TickItLogo.png";
import NotificationImage from "../images/NotificationImage.jpg"
import UserLogoImage from "../images/UserImage.png"

import DashBoardNewTicketsImage from "../images/DashBoardNewTicketsImage.png"
import DashBoardTicketAWaitingForConfirmationImage from "../images/DashBoardTicketAWaitingForConfirmationImage.png"
import DashBoardTicketsCompletedImage from "../images/DashBoardTicketsCompletedImage.png"
import DashBoardTicketsInProgressImage from "../images/DashBoardTicketsInProgressImage.png"
import { useState } from "react";


export default function DashScreenScreen() {
    const [notificationIsActive, setNotificationIsActive] = useState(false)
    const [createNewTicketActive, setCreateNewTicketIsActive] = useState(false)
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

                    <div className="icon-btn" onClick={() => setNotificationIsActive(!notificationIsActive)}>
                        <img src={NotificationImage} alt="NotificationBell" 
                             style={{ width: "80%", height: "80%", objectFit: "cover", alignSelf: "center",
                                      marginBottom: "2%", borderRadius: "50%"  }}/>
                    </div>

                    <div className="icon-btn">
                       <img src={UserLogoImage} alt="UserLogoOutline" 
                        style={{ width: "80%", height: "80%", objectFit: "cover", alignSelf: "center",
                                marginBottom: "2%", borderRadius: "50%"  }}/>
                    </div>

                </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", width:"100%", height: "100%", alignItems: "center"}}>
                <div className="sidebar">
                    <button className="tab-btn">
                        BEAR
                    </button>
                    <button className="tab-btn">Tickets</button>
                    <button className="tab-btn">Tickets</button>
                </div>

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
            </div>
            
        </div>
    </div>
    </>

)
}