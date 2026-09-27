import type { i_GetPrioritySuggestion } from "../../interfaces/i_GetPrioritySuggestion";
import type { i_TicketPriority } from "../../interfaces/i_ticketPriority";

export default async function getPrioritySuggestion({ticketCategoryDescription, ticketProblemDescription, ticketTitle, setAiTicketPrioritySuggestion, setLoadingAi}:i_GetPrioritySuggestion ) {
  if (!ticketCategoryDescription  || !ticketProblemDescription) {console.log("Failed"); return;}

  setLoadingAi(true);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an IT helpdesk assistant. A user has opened a support ticket with the following details:
              
              Title: ${ticketTitle}
              Category: ${ticketCategoryDescription}
              Description: ${ticketProblemDescription}
              Choose the priority based on the following list of options
                id: 1 - BAIXA PRIORIDADE
                id: 2 - MEDIA PRIORIDADE
                id: 3 - ALTA PRIORIDADE
                id: 4 - CRITICA PRIORIDADE
            
              Respond with ONLY valid JSON, no markdown, no explanation:
              {
                    "Id": id of priority selected,
                    "typepriDescription": "priority text"
                }
              `
            }]
          }]
        })
      }
    );
    const data = await response.json();
    console.log("the suggested priority is -> ", data);
    const raw = data.candidates[0].content.parts[0].text ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();

    try {
        const parsed : i_TicketPriority = JSON.parse(clean);
        if (parsed.Id && [1, 2, 3, 4].includes(parsed.Id)) {
            setAiTicketPrioritySuggestion(parsed);
        } else {
            console.error("Unexpected priority response:", parsed);
        }
    } catch {
        console.error("Failed to parse priority JSON:", raw);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingAi(false);
  }
}