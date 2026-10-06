import type { i_TicketCategory } from "../../interfaces/i_ticketCategory";

interface i_aiUserContact {
    userMessage: string;
    setLoadingAi: React.Dispatch<React.SetStateAction<boolean>>;
}

interface i_AiTriageResult {
  Error: boolean;
  ErrorMessage: string;
  category?: i_TicketCategory;
  ticketProblemDescription?: string;
  ticketTitle?: string;
}

async function aiUserContact({userMessage, setLoadingAi}:i_aiUserContact ): Promise<i_AiTriageResult | undefined> {

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
              text: `You are an IT helpdesk assistant. A user has messaged you with the following message:
              
              Message: ${userMessage}
              based on the message try to choose the category based on the following list of options
                id: 1 - Hardware
                id: 2 - Software
                id: 3 - Rede
                id: 4 - Acesso Permissao
                id: 5 - Email
                id: 6 - Erro no Sistema
                id: 7 - Impressora
                id: 8 - Outros

             
              if you deem not enough information was provided in order to understand the problem you may answer back with json
              {
                "Error": true,
                "ErrorMessage": "your message asking the user for more information in portuguese"
              }
              else
              {
                "Error": false,
                "ErrorMessage": "",
                "category": {"Id": id of your selected category, "categoryDescription": "description of selected category in format id-description"},
                "ticketProblemDescription": "a description of the problem for the next IT support team member to choose a priority level of the ticket to be opened",
                "ticketTitle": "a name for the ticket you deem fitting"
              }
              Respond with ONLY valid JSON, no markdown, no explanation:
              `
            }]
          }]
        })
      }
    );
    const data = await response.json();
    console.log("the suggested priority is -> ", data.candidates[0].content.parts[0].text ?? "");
    const raw = data.candidates[0].content.parts[0].text ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();

    try {
        const parsed : i_AiTriageResult = JSON.parse(clean);
        if (parsed.category?.Id && [1, 2, 3, 4].includes(parsed.category?.Id)) {
            return parsed;
        } else {
            console.error("Unexpected priority response:", parsed);
            return parsed;
        }
    } catch {
        console.error("Failed to parse priority JSON:", raw);
        return undefined;
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingAi(false);
  }
}

export default aiUserContact;