import GreetImage from "../images/GreetImage.png";

export default function LoginScreen() {
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
                        <h3 className="subtleFont">E-mail</h3>   
                        <input className = "input" placeholder="Digite o seu e-mail!"/>
                    </div>
                    

                    <h3 className="subtleFont">Senha</h3>   
                    <input className = "input" placeholder="Digite sua senha"/>

                    <div style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", marginBottom: "2%"}}>
                        <h3 className="loginHelpFont">  Esqueceu a senha? </h3>
                        <h3 className="loginHelpFont">  Alterar email! </h3>
                    </div>

                    <button className="button">Entrar</button>
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