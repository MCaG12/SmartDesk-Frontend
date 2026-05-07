export default function TicketTableDashboard()
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
                
            <h1 className="DashBoard-Title">Chamados</h1>
            <hr style={{ marginBottom: "2%" }}></hr>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", height: "100%" }}>
            
            {/* Novos Chamados */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#ffa2a2", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Novos Chamados</h1>
                </div>
                <div style={{ width: "100%", height: "80px", backgroundColor: "white", borderRadius: "10px" }}></div>
            </div>

            {/* Em Andamento */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#766cff", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Em Andamento</h1>
                </div>
                <div style={{ width: "100%", height: "80px", backgroundColor: "white", borderRadius: "10px" }}></div>
            </div>

            {/* Ag. Terceiros */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#ffd665", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Ag. Terceiros</h1>
                </div>
                <div style={{ width: "100%", height: "80px", backgroundColor: "white", borderRadius: "10px" }}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <p className="card-title">#ID </p>
                        <p className="card-title">--</p>
                        <p className="card-title"> Internet não funciona</p>
                    </div>
                    <p className="card-meta">Data:</p>
                    <p className="card-meta">Setor : </p>
                </div>        
            </div>

            {/* Concluídos */}
            <div style={{ display: "flex", flexDirection: "column", width: "22%", gap: "12px" }}>
                <div style={{ width: "100%", padding: "16px", backgroundColor: "#66e9a1", borderRadius: "15px" }}>
                <h1 className="greetTitle" style={{ fontSize: "1.5rem" }}>Concluídos</h1>
                </div>
                <div style={{ width: "100%", height: "80px", backgroundColor: "white", borderRadius: "10px" }}></div>
            </div>

            </div>



        </div>
    </>
    )
}