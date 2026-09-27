import type { i_GetTroubleshootingSuggestion } from "../../interfaces/i_TroubleShootingInterface";

export default async function getTroubleshootingSuggestion({ticketCategoryDescription, ticketPriorityDescription, ticketProblemDescription, ticketTitle, setAiSuggestion, setLoadingAi}:i_GetTroubleshootingSuggestion ) {
  if (!ticketCategoryDescription || !ticketPriorityDescription || !ticketProblemDescription) return;
  console.log(ticketTitle, ticketCategoryDescription, ticketPriorityDescription, ticketProblemDescription)
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
              Priority: ${ticketPriorityDescription}
              Description: ${ticketProblemDescription}
              Provide 3 to 5 basic troubleshooting steps the user can try before an agent responds. Be concise and practical. answer in portuguese `
            }]
          }]
        })
      }
    );
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text ?? "";
    setAiSuggestion(text);
  } catch (err) {
    console.error(err);
    setAiSuggestion("Não foi possível carregar sugestões.");
  } finally {
    setLoadingAi(false);
  }
}