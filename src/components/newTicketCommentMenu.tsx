import type { i_ticketComment } from "../interfaces/i_ticketComment";
import FetchTicketComments from "../util-functions/FetchTicketComments";

interface i_CommentCreatedMenu
{
  CommentText: String;
  TicketCode : Number;
  setTicketComments: React.Dispatch<React.SetStateAction<i_ticketComment[] | undefined>>;
  setShowNewTicketCommentMenu : React.Dispatch<React.SetStateAction<boolean>>;
}
 


export default function NewTicketCommentMenu({CommentText, TicketCode, setTicketComments, setShowNewTicketCommentMenu}: i_CommentCreatedMenu) 
{
  async function HandleClose()
  {
    try {
    await FetchTicketComments({ TicketId: Number(TicketCode), setTicketComments });
    } catch (err) {
      console.error('FetchTicketComments failed:', err);
    } finally {
      setShowNewTicketCommentMenu(false);
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.iconCircle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
 
        <h2 style={styles.title}>Comentário criado</h2>
        <p style={styles.subtitle}>Seu comentário foi adicionado ao ticket #{`${TicketCode}`}</p>
 
        <div style={styles.preview}>
          <p style={styles.text}>{CommentText}</p>
        </div>
 
        <button style={styles.closeBtn} onClick={HandleClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
 
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Georgia, 'Times New Roman', serif",
    zIndex: 1000,
  },
  modal: {
    background: '#ffffff',
    borderRadius: '16px',
    width: '380px',
    maxWidth: '90vw',
    padding: '40px 32px 32px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: '2px solid #16a34a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  title: {
    color: '#1a2456',
    fontSize: '20px',
    margin: '0 0 8px',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8a8a8a',
    fontSize: '14px',
    margin: '0 0 24px',
  },
  preview: {
    border: '1px solid #e5e5e5',
    borderRadius: '10px',
    padding: '14px 16px',
    textAlign: 'left',
    marginBottom: '24px',
  },
  author: {
    color: '#1a2456',
    fontSize: '13px',
    fontWeight: 'bold',
    margin: '0 0 4px',
  },
  email: {
    color: '#8a9bd6',
    fontSize: '12px',
    margin: '0 0 6px',
  },
  text: {
    color: '#444',
    fontSize: '14px',
    margin: 0,
  },
  closeBtn: {
    background: '#1a2456',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 0',
    width: '100%',
    fontFamily: "Georgia, serif",
    fontWeight: 'bold',
    fontSize: '15px',
    letterSpacing: '0.3px',
    cursor: 'pointer',
  },
} as const satisfies Record<string, React.CSSProperties>;;
