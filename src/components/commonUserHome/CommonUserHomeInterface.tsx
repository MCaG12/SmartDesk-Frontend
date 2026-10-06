
import React, { useState, useEffect } from "react";
import aiUserContact from "../aiPipelines/aiUserContact";
import getPrioritySuggestion from "../aiPipelines/aiGetPrioritySuggestion";
import type { i_TicketPriority } from "../../interfaces/i_ticketPriority";
import getTroubleshootingSuggestion from "../aiPipelines/aiGetTroubleshootingSuggestion";
import type { i_TicketCategory } from "../../interfaces/i_ticketCategory";
import type { i_Ticket } from "../../interfaces/i_ticket";
import DetailedTicketInfo from "../detailedTicketInfo";
import type { i_UserLoginInfoResponse } from "../../interfaces/i_UserResponse";
import save_new_ticket from "../saveNewTicket/saveNewTicket";
import type { i_TicketSolicitant } from "../../interfaces/i_ticketSolicitant";
 
const COLUMNS = [
  { key: "NOVO TICKET", label: "Novos Chamados", color: "#ffa2a2", id: 1 },
  { key: "EM ANDAMENTO", label: "Em Andamento", color: "#766cff", id: 2 },
  { key: "AGUARDANDO RESPOSTA", label: "Ag. Terceiros", color: "#ffd665", id: 4 },
  { key: "FINALIZADO", label: "Concluídos", color: "#66e9a1", id: 5 },
];

interface i_AiTriageResult {
  Error: boolean;
  ErrorMessage: string;
  category?: i_TicketCategory;
  ticketProblemDescription?: string;
  ticketTitle?: string;
}

interface i_commonUserInterface
{
    userInfo: i_UserLoginInfoResponse;
}
 
function formatTime(date:any) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}


function TicketCard({ ticket, color,  setInfoDetailedTicket, showDetailedTicket  }:any) {
  const [hovered, setHovered] = useState(false);
 
  return (
    <div
      style={{ ...styles.ticketCard, ...(hovered ? styles.ticketCardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {showDetailedTicket(true); setInfoDetailedTicket(ticket); }}
    >
      <div style={styles.ticketTopRow}>
        <span style={{ ...styles.ticketDot, backgroundColor: color }} />
        <span style={styles.ticketId}>#{ticket.Id}</span>
      </div>
      <p style={styles.ticketTitle}>{ticket.ticketTitle}</p>
      <div style={styles.ticketBottomRow}>
        <span style={styles.ticketMeta}>{ticket.department || "Geral"}</span>
        {ticket.createdAt && <span style={styles.ticketDate}>{ticket.createdAt}</span>}
      </div>
    </div>
  );
}

 
function ChatBubble({ message }:any) {
  const isUser = message.sender === "user";
  return (
    <div style={{ ...styles.msgRow, ...(isUser ? styles.msgRowUser : styles.msgRowBot) }}>
      <div>
        <div
          style={{
            ...styles.msgBubble,
            ...(isUser ? styles.msgBubbleUser : styles.msgBubbleBot),
          }}
        >
          {message.text}
        </div>
        <span style={{ ...styles.msgTime, textAlign: isUser ? "right" : "left" }}>
          {formatTime(message.time)}
        </span>
      </div>
    </div>
  );
}
 
function TypingIndicator() {
  return (
    <div style={{ ...styles.msgRow, ...styles.msgRowBot }}>
      <div style={styles.typingBubble}>
        <span style={styles.typingDot} />
        <span style={styles.typingDot} />
        <span style={styles.typingDot} />
      </div>
    </div>
  );
}

 
export default function HomeSupportDashboard(
  { userInfo }: i_commonUserInterface ) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Olá! Sou a assistente automatizado de suporte. Me conta o que está acontecendo que eu te ajudo a resolver ou já abro um chamado pra você.`,
      time: new Date(),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [sendHovered, setSendHovered] = useState(false);
  const [aiTicketPrioritySuggestion, setAiTicketPrioritySuggestion] = useState<i_TicketPriority>();
  const [loadingAi,setLoadingAi] = useState<boolean>(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [askProblemSolved, setAskProblemSolved] = useState(false);
  const [userTickets, setUserTickets] = useState<i_Ticket[]>([]);
  const [showDetailedTicket,setShowDetailedTicket] = useState<boolean>(false);
  const [infoDetailedTicket, setInfoDetailedTicket] = useState<i_Ticket>();
  //new ticket info
  const [ticketTitle, setTicketTitle] = useState<string>("");
  const [ticketCategory, setTicketCategory] = useState<i_TicketCategory>();
  const [, setTicketPriority] = useState<i_TicketPriority>();
  const [ticketProblemDescription, setTicketProblemDescription] = useState<string>("");
  const [ticketSolicitant, setTicketSolicitant] = useState<i_TicketSolicitant>();
  const [refreshTickets, setRefreshTickets] = useState<boolean>(false);
 
  const sendDisabled = !draft.trim();

  function SolvedFeedback({  }) {
  return (
      <div style={styles.wrap}>
        <span style={styles.label}>Seu problema foi resolvido?</span>

        <button
          style={{...styles.btnSolvedActive}}>
          ✅ Sim
        </button>

        <button
          onClick={() => { 
            if(ticketCategory && aiTicketPrioritySuggestion && ticketSolicitant) 
            {
              console.log("creating new ticket");
              save_new_ticket({
                ticketTitle,
                ticketCategory,
                ticketPriority: aiTicketPrioritySuggestion,
                ticketProblemDescription,
                ticketSolicitant
              })
              setRefreshTickets(true);
          }
         
        }}
          style={{...styles.btnNotSolvedActive}}>
          ❌ Não
        </button>
      </div>
    );}

   async function handleSend(text: string) {
        const trimmed = (text ?? draft).trim();
        if (!trimmed) return;
        let capturedPriority: typeof aiTicketPrioritySuggestion;
    
        setMessages((prev) => [...prev, { sender: "user", text: trimmed, time: new Date() }]);
        setDraft("");
    
        try 
        {
          const reply : i_AiTriageResult | undefined = await aiUserContact({ userMessage: text, setLoadingAi: setLoadingAi });
          if(!reply?.Error)
            {
              //fetch response info 
              const replyTicketName = String(reply?.ticketTitle);
              const replyProblemDescription = String(reply?.ticketProblemDescription);
              const replyCategory = String(reply?.category?.tickcatDescription);

              //kickstart the usual ai pipeline
              await getPrioritySuggestion({
                ticketCategoryDescription: replyCategory,
                ticketProblemDescription: replyProblemDescription,
                ticketTitle: replyTicketName,
                setAiTicketPrioritySuggestion,
                setLoadingAi,
              });

              await getTroubleshootingSuggestion({
                ticketCategoryDescription: replyCategory,
                ticketPriorityDescription: String(aiTicketPrioritySuggestion?.typepriDescription),
                ticketProblemDescription: replyProblemDescription,
                ticketTitle: replyTicketName,
                setAiSuggestion,
                setLoadingAi,
              }); 

              setAskProblemSolved(true);
              setTicketTitle(replyTicketName);
              setTicketCategory(reply?.category);
              setTicketPriority(capturedPriority); 
              setTicketProblemDescription(replyProblemDescription);
              setTicketSolicitant(userInfo);
            
          }
          else
          {
            setMessages((prev) => [...prev, { sender: "bot", text: reply.ErrorMessage, time: new Date() }]);
          }
        } 
        catch (err) 
        {
          setMessages((prev) => [
              ...prev,
              {
              sender: "bot",
              text: "Não consegui enviar sua mensagem agora. Pode tentar de novo em instantes?",
              time: new Date(),
              },
          ]);
        } 
  }

  async function FetchUserTickets(p_userId: number, setUserTickets :React.Dispatch<React.SetStateAction<i_Ticket[]>>)
  {
    const url = 'http://localhost:3000/Ticket/fetch-tickets-by-solicitant';
    const userId = p_userId;
    try 
    {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: 
          JSON.stringify({   
              "solicitantId": userId
          })
        }) 
      const ticketFound =  await response.json() as i_Ticket[]; 
      setUserTickets(ticketFound);
    } 
    catch (error) 
    {
      console.error("Error:", error);
    }
  }

  useEffect(() => 
  {
    console.log("THE AI HAS COME UP WITH ITS Pirority SUGGESTION")
    console.log(aiTicketPrioritySuggestion)
  }, [aiTicketPrioritySuggestion])

  useEffect(() => 
  {
    console.log("THE AI HAS COME UP WITH ITS SUGGESTION")
    console.log(aiSuggestion)
  }, [aiSuggestion])

  useEffect(() => 
  {
    const fetchUserTicketsData = async () => {
        await FetchUserTickets(userInfo.Id, setUserTickets);
        
    };
    fetchUserTicketsData();
  }, [])

  useEffect(() => {
    if (!aiSuggestion) return;
    console.log("useeffect updating ai SUggestion with " + aiSuggestion);
    setMessages((prev) => [...prev, { sender: "bot", text: aiSuggestion, time: new Date() }]);
    setAskProblemSolved(true);
  }, [aiSuggestion]);

  useEffect(() => {
    if (!refreshTickets) return;

    const fetchUserTicketsData = async () => {
      try {
        await FetchUserTickets(userInfo.Id, setUserTickets);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      } finally {
        setRefreshTickets(false);
      }
    };

    fetchUserTicketsData();
  }, [refreshTickets]);

 
  return (
    <div style={styles.page}>
        <div style={styles.chatWrap}>
        <div style={styles.chatPanel}>
          <div style={styles.chatHeader}>
            <div style={styles.chatAvatar}>🤖</div>
            <div>
              <h2 style={styles.chatHeaderTitle}>Assistente de Suporte</h2>
            </div>
          </div>
 
          <div style={styles.chatMessages}>
            
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
            {loadingAi && TypingIndicator()}
            {askProblemSolved && SolvedFeedback({})}
          </div>
 
          <div style={styles.chatInputbar}>
            <input
              type="text"
              placeholder="Escreva sua mensagem..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend(draft);
              }}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{ ...styles.chatInput, ...(inputFocused ? styles.chatInputFocus : {}) }}
            />
            <button
              onClick={() => handleSend(draft)}
              disabled={sendDisabled}
              aria-label="Enviar mensagem"
              onMouseEnter={() => setSendHovered(true)}
              onMouseLeave={() => setSendHovered(false)}
              style={{
                ...styles.chatSendBtn,
                ...(sendDisabled
                  ? styles.chatSendBtnDisabled
                  : sendHovered
                  ? styles.chatSendBtnHover
                  : {}),
              }}
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      <div style={styles.boardWrap}>
        <div style={styles.greeting}>
          <p style={styles.greetingName}>Meus Chamados</p>
          <p style={styles.greetingSub}>Aqui está o andamento dos seus chamados</p>
        </div>

        {
          (showDetailedTicket && infoDetailedTicket ) &&
              <DetailedTicketInfo 
                  ticketInfo={infoDetailedTicket}
                  setShowDetailedTicket={setShowDetailedTicket}
                  userInfo_id={userInfo.Id}
              />
        }
 
        <div style={styles.board}>
          {COLUMNS.map((column) => {
            const columnTickets = userTickets.filter(
              (ticket) => ticket.ticketStatus.Id === column.id
            );
            return (
              <div style={styles.column} key={column.key}>
                <div style={{ ...styles.columnHeader, backgroundColor: column.color }}>
                  <h2 style={styles.columnHeaderTitle}>{column.label}</h2>
                  <span style={styles.columnCount}>{}</span>
                </div>
 
                <div style={styles.columnBody}>
                  { userTickets.length > 0 ? (
                    columnTickets.map((ticket) => (
                      <TicketCard
                        key={ticket.Id}
                        ticket={ticket}
                        color={column.color}
                        setInfoDetailedTicket={setInfoDetailedTicket}
                        showDetailedTicket={setShowDetailedTicket}    
                      />
                    ))
                  ) : (
                    <div style={styles.emptyColumn}>Nenhum chamado por aqui</div>
                  ) }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


const styles = {
  page: {
    display: "flex",
    gap: 24,
    width: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: 28,
    backgroundColor: "#f5f3ee",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    flexDirection: "column",
  },

  greeting: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginBottom: 20,
  },
  greetingName: {
    fontSize: "1.9rem",
    fontWeight: 700,
    color: "#1e2a5e",
    margin: 0,
  },
  greetingSub: {
    fontSize: "0.95rem",
    fontWeight: 400,
    color: "#7a7a7a",
    margin: 0,
  },
 
  boardWrap: {
    flex: "1 1 62%",
    minWidth: 0,
    height:"100vh",
    display: "flex",
    flexDirection: "column",
  },
  board: {
    display: "flex",
    gap: 16,
    width: "100%",
    height: "45vh",
    alignItems: "flex-start",
    flexWrap: "wrap",
    overflowY:"scroll",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "23%",
    minWidth: 220,
    gap: 12,
  },
  columnHeader: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  columnHeaderTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    margin: 0,
    color: "#24243a",
  },
  columnCount: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#24243a",
    opacity: 0.65,
  },
  columnBody: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minHeight: 40,
  },
  emptyColumn: {
    padding: "18px 14px",
    border: "1.5px dashed #d7d3c8",
    borderRadius: 12,
    color: "#9a9a9a",
    fontSize: "0.85rem",
    textAlign: "center",
  },
 
  ticketCard: {
    backgroundColor: "#ffffff",
    border: "0.5px solid #c2c2c2",
    borderRadius: 12,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  ticketCardHover: {
    backgroundColor: "#f4f4f4",
  },
  ticketTopRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  ticketDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  ticketId: {
    fontSize: 12,
    fontWeight: 600,
    color: "#9a9a9a",
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: 400,
    color: "#5f5f5f",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  ticketBottomRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  ticketMeta: {
    fontSize: 12,
    fontWeight: 400,
    color: "#6b7280",
  },
  ticketDate: {
    fontSize: 12,
    color: "#9a9a9a",
  },
 
  chatWrap: {

    height:"450px",
    width:"50%",
    display: "flex",
    flexDirection: "column",
    alignSelf:"center",

    overflow: "hidden",
  },
  chatPanel: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    border: "1px solid #eaeaea",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    },
  chatHeader: {
    backgroundColor: "#1e2a5e",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  chatAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    backgroundColor: "#4a90d9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  chatHeaderTitle: {
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
    margin: 0,
  },
  chatHeaderStatus: {
    color: "#b7c0dd",
    fontSize: "0.78rem",
    margin: "2px 0 0 0",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "#66e9a1",
    display: "inline-block",
  },
 
  chatMessages: {
    flex: 1,       
    height:"100%",    
       
    overflow: "scroll",   
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    backgroundColor: "#fafaf8",
  },
  msgRow: {
    display: "flex",
    width: "100%",
  },
  msgRowUser: {
    justifyContent: "flex-end",
  },
  msgRowBot: {
    justifyContent: "flex-start",
  },
  msgBubble: {
    maxWidth: "78%",
    padding: "10px 14px",
    borderRadius: 14,
    fontSize: 13.5,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  msgBubbleBot: {
    backgroundColor: "#eef1f8",
    color: "#24243a",
    borderBottomLeftRadius: 4,
  },
  msgBubbleUser: {
    backgroundColor: "#4a90d9",
    color: "#ffffff",
    borderBottomRightRadius: 4,
  },
  msgTime: {
    fontSize: 10,
    color: "#b0b0b0",
    marginTop: 4,
    display: "block",
  },
 
  typingBubble: {
    display: "flex",
    gap: 4,
    padding: "12px 14px",
    alignItems: "center",
    backgroundColor: "#eef1f8",
    borderRadius: 14,
    borderBottomLeftRadius: 4,
    width: "fit-content",
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "#b7bdd0",
  },
 
  chatQuickreplies: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    padding: "0 18px 12px 18px",
    backgroundColor: "#fafaf8",
    flexShrink: 0,
  },
  quickreplyBtn: {
    border: "1px solid #d7ddec",
    backgroundColor: "#ffffff",
    color: "#1e2a5e",
    fontSize: 12,
    fontWeight: 600,
    padding: "7px 12px",
    borderRadius: 999,
    cursor: "pointer",
  },
  quickreplyBtnHover: {
    backgroundColor: "#eef1f8",
  },
 
  chatInputbar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    borderTop: "1px solid #eaeaea",
    backgroundColor: "#ffffff",
    flexShrink: 0,
  },
  chatInput: {
    flex: 1,
    border: "1px solid #d1d5db",
    borderRadius: 999,
    padding: "10px 16px",
    fontSize: 13.5,
    outline: "none",
    backgroundColor: "#f9fafb",
    color: "#374151",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  chatInputFocus: {
    borderColor: "#4a90d9",
  },
  chatSendBtn: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#1e2a5e",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  chatSendBtnHover: {
    backgroundColor: "#152047",
  },
  chatSendBtnDisabled: {
    backgroundColor: "#c7cbdb",
    cursor: "not-allowed",
  },

  wrap: {
    display: "flex",
    gap: 10,
    padding: "12px 16px",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#24243a",
    marginRight: 4,
  },
  btnBase: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid #d7ddec",
    backgroundColor: "#ffffff",
    color: "#1e2a5e",
    fontSize: 12,
    fontWeight: 600,
    padding: "7px 14px",
    borderRadius: 999,
    cursor: "pointer",
  },
  btnSolvedActive: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid ",
    backgroundColor: "#e5f7ee",
    borderColor: "#66e9a1",
    color: "#1c8a52",
    fontSize: 12,
    fontWeight: 600,
    padding: "7px 14px",
    borderRadius: 999,
    cursor: "pointer",
  },
  btnNotSolvedActive: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid ",
    backgroundColor: "#fdeceb",
    borderColor: "#f0a3a0",
    color: "#c0392b",
    fontSize: 12,
    fontWeight: 600,
    padding: "7px 14px",
    borderRadius: 999,
    cursor: "pointer",
  },
} as const satisfies Record<string, React.CSSProperties>;
