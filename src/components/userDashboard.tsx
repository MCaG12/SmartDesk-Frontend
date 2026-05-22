import { useState } from "react"
import UserLogoImage from "../images/UserImage.png"

interface DashBoardUserInfo
{
    Name : string;
    Email : string;
    Type : string;
    Role : string;
    Department : string;
}

async function UpdateUserPassword(insertedEmail:string , insertedPassword:string, insertedNewPassword:string, userCheckNewPassword:string)
{
    try 
        {

            if(insertedEmail.trim() == "" || insertedPassword.trim() == "" || insertedNewPassword.trim() == "" || userCheckNewPassword.trim() == "")
                {
                    return;
                }

            if(insertedNewPassword != userCheckNewPassword)
                {
                    return;
                }
            
            const url = "http://localhost:3000/Usuario/UpdatePassword";

            console.log(insertedEmail,insertedPassword,insertedNewPassword)
    
            const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: 
                JSON.stringify({   
                    "Email": insertedEmail,
                    "Password": insertedPassword,
                    "NewPassword":  insertedNewPassword
                })
            })   
    
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            else
                {
                    console.log("post was a sucess!")
                }
            
        } 
        catch (error) 
        {
            console.error(error);
        }
}

export default function UserDashBoard({Name, Email, Type, Role, Department}: DashBoardUserInfo)
{
    const [userDashBoardState, setUserDashBoardState] = useState(0)
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userNewPassword, setUserNewPassword] = useState("");
    const [userCheckNewPassword, setUserCheckNewPassword] = useState("");

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
                                <h2 className="profile-name">Nome: {Name}</h2>
                                <h2 className="profile-subtitle">Cargo: {Role} </h2>
                                <h2 className="profile-subtitle">Matricula: {Type}</h2>
                            </div>
                        </div>

                        <div style={{width:"80%", height:"50%", backgroundColor:"white",borderRadius:"4%", display:"flex", flexDirection:"column", justifyContent: "space-between" }}>

                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                     <h2 className="field-label">Nome Completo: </h2>
                                    <h2 className="field-value">{Name} </h2> 
                               </div>

                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                    <h2 className="field-label">Matricula: </h2>
                                    <h2 className="field-value">{Type} </h2> 
                               </div>
                            </div>

                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                     <h2 className="field-label">E-Mail: </h2>
                                    <h2 className="field-value">{Email} </h2> 
                               </div>

                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                    <h2 className="field-label">Setor: </h2>
                                    <h2 className="field-value">{Department} </h2> 
                               </div>
                            </div>

                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                               <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "10%" }}>
                                     <h2 className="field-label">Cargo: </h2>
                                    <h2 className="field-value">{Role}  </h2> 
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
                                <input className="input-field" placeholder="Email Atual" onChange={(e) => setUserEmail(e.target.value)}/> 
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
                                <h2 className="field-label">Senha Atual: </h2>
                               <input className="input-field" placeholder="Senha Atual" onChange={(e) => setUserPassword(e.target.value)}/> 
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%"}}>
                            <div style={{ display: "flex", flexDirection: "column", width: "45%"}}>
                                <h2 className="field-label">Nova Senha: </h2>
                                <input className="input-field" placeholder="Nova Senha" onChange={(e) => setUserNewPassword(e.target.value)}/> 
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
                                <h2 className="field-label">Confirme Nova Senha: </h2>
                                <input className="input-field" placeholder="Confirme Nova Senha" onChange={(e) => setUserCheckNewPassword(e.target.value)}/> 
                            </div>
                        </div>

                    </div>  
                         <button
                        className="tab-btn"
                        onClick={() => 
                        {
                            UpdateUserPassword(userEmail,userPassword, userNewPassword,userCheckNewPassword);
                        }}
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