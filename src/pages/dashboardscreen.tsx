export default function DashScreenScreen() {
    return (
    <>
    <div id="container">
        <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", height: "100%"}}>

            <div className= "header" style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly"}}>
                <div style={{width:"100px", height: "60px", backgroundColor:"green"}}></div>
                <div style={{width:"100px", height: "60px", backgroundColor:"green"}}></div>
                <div style={{width:"100px", height: "60px", backgroundColor:"green"}}></div>
            </div>

            <div style={{display: "flex", flexDirection: "row", width:"100%", height: "100%"}}>
                <div className="sidebar">
                    <button className="tab-btn">Tickets</button>
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
                    <div className="stat-card"></div>
                    <div className="stat-card"></div>
                    <div className="stat-card"></div>
                    <div className="stat-card"></div>
                </div>

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