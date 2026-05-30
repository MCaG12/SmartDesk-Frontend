import { useEffect, useState } from "react";
import GreetImage from "../images/GreetImage.png";
import type { i_UserLoginInfo } from "../interfaces/i_User";
import type { i_UserLoginInfoResponse } from "../interfaces/i_UserResponse";
import { useNavigate } from "react-router-dom";


async function FetchUserInfo({
    userEmail,
    userPassword,
    setShowError,
    navigate
}: i_UserLoginInfo)
{
    if (
        userEmail.trim() === "" ||
        userPassword.trim() === ""
    )
    {
        setShowError(true);
        return;
    }

    const url = "http://localhost:3000/Usuario/GetAll";

    try
    {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const users =
            await response.json() as i_UserLoginInfoResponse[];

        console.log(users);

        const userFound = users.find(user =>
            user.usuarSenha === userPassword &&
            user.usuarEmail === userEmail
        );

        if (!userFound)
        {
            setShowError(true);
            return;
        }

        setShowError(false);

        navigate("/dashboard", {
            state: { userFound }
        });

    }
    catch (error)
    {
        console.error("Error:", error);
        setShowError(true);
    }
}


export default function LoginScreen() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showError, setShowError] = useState(false);
        
    return (
    <>
    <div id="container">
        <div style={{width: "100%", height: "100%", display:"flex", flexDirection: "row", justifyContent:"space-evenly", alignItems:"center"}}>
            
            <div 
            style={{width: "40%", height: "80%", backgroundColor: "white", 
            padding: "20px", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <h1 className="HeaderFont">Login</h1>
                <div style={{display:"flex", flexDirection:"column", marginBottom: "2%"}}>

                    <div className="LoginItem" style={{display:"flex", flexDirection:"column"}}>
                        <h3 className="subtleFont" style={{color: showError ? "#e53935 " : "#9ca3af"}}>E-mail</h3>   
                        <input
                        className={showError ? "input-error" :"input"}
                        placeholder="Digite o seu e-mail!"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    

                    <h3 className="subtleFont" style={{color: showError ? "#e53935 " : "#9ca3af"}}>Senha</h3>   
                    <input
                        className={showError ? "input-error" :"input"}
                        placeholder="Digite a sua senha"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        />
                    {showError && <h4 className="subtleFont" style={{color: "#e53935 " }}> O e-mail ou senha inseridos são invalidos!</h4>}
                    <div style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", marginBottom: "2%"}}>
                        <h3 className="loginHelpFont">  Esqueceu a senha? </h3>
                        <h3 className="loginHelpFont">  Alterar email! </h3>
                    </div>

                     <button
                        className="button"
                        onClick={() =>
                            FetchUserInfo({
                                userEmail,
                                userPassword,
                                setShowError,
                                navigate
                            })
                        }
                    >
                        Entrar
                    </button>
                </div>
            </div>

            <div style={{ width: "40%", height: "80%", backgroundColor: "#003A7F", display: "flex", flexDirection: "column" , justifyContent: "center" }}>
                <h1 className="greetTitle" style={{textAlign:"center"}}> Bem vindo ao TickIT!</h1>
                <img src={GreetImage} alt="Greeting" style={{ width: "70%", height: "60%", objectFit: "cover", alignSelf: "center", marginBottom: "2%" }} />
                <h3 className="greetSubtitle" style={{textAlign:"center"}}> Seu suporte de TI mais inteligente começa aqui.</h3>
            </div>
        </div>
    </div>
    </>

)
}