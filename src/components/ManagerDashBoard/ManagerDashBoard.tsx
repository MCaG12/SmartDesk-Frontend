import { useState } from "react";
import type { i_Ticket } from "../../interfaces/i_ticket";
import TicketInfoDashboard from "./TicketInfoDashboard";
import TicketCollaboratorInfo from "./TicketCollaboratorInfo";
import TicketMonthsDashboard from "./TicketMonthsDashboard";

export default function ManagerDashBoard()
{
    // 0 - initial all tickets display, 1 - collaborator info, 2 - tickets in months
    const [currentGraphState, setCurrentGraphState] = useState(0);


    const [currentTickets, setCurrentTickets] = useState<i_Ticket[]>();

    async function FetchAllTickets(setCurrentTickets: React.Dispatch<React.SetStateAction<i_Ticket[] | undefined>>)
    {
       const url = "http://localhost:3000/Ticket/GetAll";
        try
        {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json() as i_Ticket[]; 
            setCurrentTickets(data);
        }
        catch (error)
        {
            console.error("Error:", error);
        
        } 
    }

    function drawCurrentDashboard(currentGraph : number)
    {
        switch(currentGraph)
        {
            case 0:
                return <TicketCollaboratorInfo/>

            case 1:
                return <TicketInfoDashboard/>

            case 2: 
                return <TicketMonthsDashboard/>
        }
    }


    return <div style={styles.DashBoardBody}>
        <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", height: "100%"}}>

            <div className= "header" style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly"}}>
                <button className="btn-novo-chamado" style={{width:"25%"}} onClick={(() => {setCurrentGraphState(0)})}> Status Colaboradores</button>
                <button className="btn-novo-chamado" style={{width:"25%"}} onClick={(() => {setCurrentGraphState(1)})}> Chamados DashBoard</button>
                <button className="btn-novo-chamado" style={{width:"25%"}} onClick={(() => {setCurrentGraphState(2)})}> Chamados Meses</button>
            </div>
            {drawCurrentDashboard(currentGraphState)}
        </div>
    </div>
}

const styles = {
    DashBoardBody : {
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%"
    }
} as const satisfies Record<string, React.CSSProperties>;