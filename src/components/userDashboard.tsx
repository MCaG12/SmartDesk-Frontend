import { useState } from "react"
import UserLogoImage from "../images/UserImage.png"



export default function UserDashBoard()
{
    const [userDashBoardState, setUserDashBoardState] = useState(0)

    function UserBoardState(userDashBoardState : number)
    {
        switch(userDashBoardState)
        {
            case 0:
            {
                return (
                <>
                    <h1 className="DashBoard-Title">Configurações</h1>
                    <hr style={{ marginBottom: "2%" }}></hr>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <button
                            className="tab-btn"
                            onClick={() => {setUserDashBoardState(1)}}
                            style={{ width: "30%" }}
                        >Informações Pessoais</button>
                        <button
                            className="tab-btn"
                            onClick={() => {setUserDashBoardState(2)}}
                            style={{ width: "30%" }}
                        >Segurança</button>
                    </div>
                </>
            );
                
            }
            case 1:
            {
                return (
                    <>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <h1 className="DashBoard-Title">Informações Pessoais</h1>
                            <button
                            className="tab-btn"
                            onClick={() => {setUserDashBoardState(0)}}
                            style={{ width: "10%", marginRight:"25%" }}
                            >Voltar</button>
                        </div>
                        
                        <hr style={{ marginBottom: "2%" }}></hr>
                        <div style={{display:"flex", flexDirection:"row", gap: "5%", marginBottom:"2%"}}>
                            <div style={{width:"100px", height:"100px", backgroundColor:"#f7f7f7",
                                        borderRadius:"50px", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <img src={UserLogoImage} alt="NotificationBell" 
                                     style={{ width: "80%", height: "80%", objectFit: "cover", alignSelf: "center",
                                      marginBottom: "2%", borderRadius: "50%"  }}/>
                            </div>

                            <div style={{display:"flex", flexDirection:"column"}}>
                                <h2 className="profile-name">Nome pessoas: TESTANDO FONTE</h2>
                                <h2 className="profile-subtitle">Cargo: TESTANDO FONTE </h2>
                                <h2 className="profile-subtitle">Matricula: TESTANDO FONTE</h2>
                            </div>
                        </div>

                        <div style={{width:"80%", height:"50%", backgroundColor:"white",borderRadius:"4%", display:"flex", flexDirection:"column", justifyContent: "space-between" }}>

                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                     <h2 className="field-label">Nome Completo: </h2>
                                    <h2 className="field-value">Matricula: </h2> 
                               </div>

                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                    <h2 className="field-label">Matricula: </h2>
                                    <h2 className="field-value">Matricula: </h2> 
                               </div>
                            </div>

                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                     <h2 className="field-label">E-Mail: </h2>
                                    <h2 className="field-value">Matricula: </h2> 
                               </div>

                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                    <h2 className="field-label">Setor: </h2>
                                    <h2 className="field-value">Matricula: </h2> 
                               </div>
                            </div>

                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                     <h2 className="field-label">Cargo: </h2>
                                    <h2 className="field-value">Matricula: </h2> 
                               </div>

                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                
                               </div>
                            </div>
                            
                        </div>
                    </>
                )
            }
        
            case 2:
            {
                return (
                <>
                <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <h1 className="DashBoard-Title">Segurança</h1>
                        <button
                        className="tab-btn"
                        onClick={() => {setUserDashBoardState(0)}}
                        style={{ width: "10%", marginRight:"25%" }}
                        >Voltar</button>
                    </div>
                    
                    <hr style={{ marginBottom: "2%" }}></hr>

                    <div style={{width:"75%", height:"50%", backgroundColor:"white", display: "flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%"}}>
                            <div style={{ display: "flex", flexDirection: "column", width: "45%"}}>
                                <h2 className="field-label">Email: </h2>
                                <input className="input-field" placeholder="Email Atual"/> 
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
                                <h2 className="field-label">Senha Atual: </h2>
                               <input className="input-field" placeholder="Senha Atual"/> 
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%"}}>
                            <div style={{ display: "flex", flexDirection: "column", width: "45%"}}>
                                <h2 className="field-label">Nova Senha: </h2>
                                <input className="input-field" placeholder="Nova Senha"/> 
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
                                <h2 className="field-label">Confirme Nova Senha: </h2>
                                <input className="input-field" placeholder="Confirme Nova Senha"/> 
                            </div>
                        </div>

                    </div>  
                         <button
                        className="tab-btn"
                        onClick={() => {setUserDashBoardState(0)}}
                        style={{ width: "50%", marginRight:"25%", alignSelf:"center", marginTop:"5%" }}
                        >Confirmar alterações</button>
                </div>
                    
                </>
                )
            }
    }}

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
                
            {UserBoardState(userDashBoardState)} 



        </div>
    </>
    )
}