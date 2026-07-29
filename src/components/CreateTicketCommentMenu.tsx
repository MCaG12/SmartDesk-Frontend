import { useState } from "react";
 
interface i_NewTicketCommentMenu
{
  ticketId : number;
  setShowNewTicketCommentMenu: React.Dispatch<React.SetStateAction<boolean>>;
  userId : number;
  setShowTicketCommentCreatedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTicketText: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateNewTicketMenu({ticketId, setShowNewTicketCommentMenu, userId, setShowTicketCommentCreatedMenu, setNewTicketText} : i_NewTicketCommentMenu) 
{
  const [comment, setComment] = useState("");
  const maxLength = 500;

  function onClose()
  {
    setShowNewTicketCommentMenu(false);
  }

  async function handleSubmit()
  {
      const url = `http://localhost:3000/TicketComment/`;

      try 
      {
        await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
              "tickcomUser": userId,
              "tickcomTicket": ticketId,
              "tickcomComment": comment
          })
        }); 
        setNewTicketText(comment);
        setShowNewTicketCommentMenu(false);
        setShowTicketCommentCreatedMenu(true);
      } 
      catch (error) 
      {
          console.error("Error " + error);    
      }
  } 
 
  return (
    <div>
      <div style={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div style={styles.header}>
          <h2 id="modalTitle" style={styles.title}>
            Novo Comentário
          </h2>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>
 
        <div style={styles.body}>
          <label htmlFor="commentText" style={styles.label}>
            Comentário
          </label>
          <textarea
            id="commentText"
            value={comment}
            maxLength={maxLength}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            style={styles.textarea}
          />
          <small style={styles.charCount}>
            {comment.length}/{maxLength}
          </small>
        </div>
 
        <div style={styles.footer}>
          <button style={{ ...styles.btn, ...styles.btnCancel }} onClick={onClose}>
            Cancelar
          </button>
          <button
            style={{
              ...styles.btn,
              ...styles.btnSubmit,
              ...(comment.trim() === "" ? styles.btnDisabled : {}),
            }}
            onClick={handleSubmit}
            disabled={comment.trim() === ""}
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(20, 20, 30, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#ffffff",
    width: 420,
    maxWidth: "90vw",
    borderRadius: 12,
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    borderBottom: "1px solid #eef0f3",
  },
  title: {
    margin: 0,
    fontSize: 17,
    color: "#1e2a5e",
    fontWeight: 700,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1px solid #f1a3a3",
    background: "#fff",
    color: "#e11d48",
    fontSize: 15,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: "20px 24px 4px",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "#1e2a5e",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    resize: "vertical",
    padding: "10px 12px",
    border: "1px solid #dde1e7",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
  },
  charCount: {
    display: "block",
    marginTop: 4,
    fontSize: 11,
    color: "#9aa0ab",
    textAlign: "right",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    padding: "16px 24px 22px",
  },
  btn: {
    padding: "10px 18px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
  },
  btnCancel: {
    background: "#fff",
    color: "#5b6270",
    border: "1px solid #dde1e7",
  },
  btnSubmit: {
    background: "#1e2a5e",
    color: "#fff",
  },
  btnDisabled: {
    background: "#b9bfd0",
    cursor: "not-allowed",
  },
};
