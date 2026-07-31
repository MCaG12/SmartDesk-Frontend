import type { i_dashBoardLatestTicket } from "../interfaces/i_dashBoardTicketFound";

interface i_fetchLatestTickets 
{
    i_userId: number;
    setLatestTickets: React.Dispatch<React.SetStateAction<i_dashBoardLatestTicket[] | undefined>>;
}

async function fetchLatestTickets({i_userId, setLatestTickets}: i_fetchLatestTickets)
    {
        let a_TicketsFound: i_dashBoardLatestTicket[];

        const url = `http://localhost:3000/Ticket/fetch-latest-tickets/`;

        try 
        {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                "UserId": i_userId
            })
        }); 
        a_TicketsFound = await response.json() as i_dashBoardLatestTicket[];
        setLatestTickets(a_TicketsFound);
        } 
        catch (error) 
        {
            console.error("Error " + error);    
        }

    }