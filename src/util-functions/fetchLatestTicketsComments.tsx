import type { i_ticketComment } from "../interfaces/i_ticketComment";

interface i_fetchLatestNotifications
{
    i_userId: number;
    setLatestNotifications: React.Dispatch<React.SetStateAction<i_ticketComment[] | undefined>>;
}


export default 
async function fetchLatestNotifications({i_userId, setLatestNotifications}: i_fetchLatestNotifications)
    {
        let a_NotificationsFound: i_ticketComment[];

        const url = `http://localhost:3000/Ticket/fetch-latest-ticket-comments/`;

        try 
        {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                "AgentId": i_userId
            })
        }); 
        a_NotificationsFound = await response.json() as i_ticketComment[];
        setLatestNotifications(a_NotificationsFound);
        } 
        catch (error) 
        {
            console.error("Error " + error);    
        }

    }