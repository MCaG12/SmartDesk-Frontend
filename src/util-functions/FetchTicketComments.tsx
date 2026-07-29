import type { i_ticketComment } from "../interfaces/i_ticketComment";

interface i_fetchTicketComments
{
    TicketId : number
    setTicketComments:React.Dispatch<React.SetStateAction<i_ticketComment[] | undefined>>
}

export default async function FetchTicketComments({TicketId, setTicketComments}: i_fetchTicketComments)
{
    const url = "http://localhost:3000/TicketComment/fetch-ticket-comments/";

    try
    {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ticketId": TicketId
            })
        });
        const data = await response.json() as i_ticketComment[];
        setTicketComments(data);
    }
    catch (error)
    {
        console.error("Error:", error);
       
    }
}