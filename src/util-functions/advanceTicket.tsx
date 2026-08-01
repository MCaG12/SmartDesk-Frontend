export default async function advanceTicket(ticketId: number)
  {
    const url = `http://localhost:3000/Ticket/advanceTicket/${ticketId}`;

    try
    {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
 
    }
    catch (error)
    {
        console.error("Error:", error);
    }
  }