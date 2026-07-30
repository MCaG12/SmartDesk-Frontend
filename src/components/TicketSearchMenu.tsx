import { useState } from "react";
import type { i_ticketComment } from "../interfaces/i_ticketComment";
import type { i_Ticket } from "../interfaces/i_ticket";

const statusOptions = [
    { label: "Novos Chamados", bgColor: "#ffa2a2", buttonCode: 0 },
    { label: "Em Andamento", bgColor: "#766cff", buttonCode: 1 },
    { label: "Pendente", bgColor: "#ffd665", buttonCode: 2 },
    { label: "Concluído", bgColor: "#66e9a1", buttonCode: 3 }
];

const categoryOptions = [
    { label: "Hardware", buttonCode: 0 },
    { label: "Software", buttonCode: 1 },
    { label: "Rede", buttonCode: 2 },
    { label: "Acesso Permissão", buttonCode: 3 },
    { label: "Email", buttonCode: 4 },
    { label: "Erro no Sistema", buttonCode: 5 },
    { label: "Impressora", buttonCode: 6 },
    { label: "Outras", buttonCode: 7 },
];

const priorityOptions = [
    {label: "Baixa Prioridade", buttonCode: 0},
    {label: "Média Prioridade", buttonCode: 1},
    {label: "Alta Prioridade", buttonCode: 2},
    {label: "Critica Prioridade", buttonCode: 3}
]

interface i_TicketMenu
{
    tickets: i_Ticket[];
}

export function TicketSearchMenu({tickets}:i_TicketMenu) {
    const [ticketState, setTicketState] = useState(-1);
    const [priorityCode, setPriorityCode] = useState(-1);
    const [categoryCode, setCategoryCode] = useState(-1);

    return (
        <div className="NotificationsTab" style={styles.Container}>
            <h1 style={styles.HeaderFont}>Procurar Ticket</h1>
            <hr style={styles.Divider} />

            <p style={styles.SubHeaderFont}>Status Tickets</p>
            <div style={styles.OptionRow}>
                {statusOptions.map((button) => (
                    <button
                        key={button.buttonCode}
                        onClick={() => setTicketState(button.buttonCode)}
                        style={{
                            ...styles.StatusCard,
                            backgroundColor: button.bgColor,
                            outline: ticketState === button.buttonCode ? "3px solid #333" : "none"
                        }}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            <p style={styles.SubHeaderFont}>Categoria</p>
            <div style={styles.OptionRow}>
                {categoryOptions.map((button) => (
                    <button
                        key={button.buttonCode}
                        onClick={() => setCategoryCode(button.buttonCode)}
                        style={{
                            ...styles.CategoryCard,
                            outline: categoryCode === button.buttonCode ? "3px solid #4272b6" : "1px solid #e0e0e0"
                        }}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            <hr style={styles.Divider} />
            <p style={styles.SubHeaderFont}>Prioridade</p>
            <div style={styles.OptionRow}>
                {priorityOptions.map((button) => (
                    <button
                        key={button.buttonCode}
                        onClick={() => setCategoryCode(button.buttonCode)}
                        style={{
                            ...styles.CategoryCard,
                            outline: categoryCode === button.buttonCode ? "3px solid #4272b6" : "1px solid #e0e0e0"
                        }}
                    >
                        {button.label}
                    </button>   
                ))}
            </div>
            <p style={styles.SubHeaderFont}>Tickets Encontrados</p>
            <div style={styles.TicketGrid}>
            {tickets.map((ticket) => {
                return <>
                    <div style={styles.TicketCard} key={ticket.Id}>
                        <div style={styles.TicketCardTop}>
                            <span style={styles.TicketId}>#{ticket.Id}</span>
                        </div>
                        <h3 style={styles.TicketTitle}>{ticket.ticketTitle}</h3>
                        <div style={styles.TicketMeta}>
                            <span>{ticket.ticketCategory.tickcatDescription}</span>
                        </div>
                    </div>
                </>
            })}
            </div>
        </div>
    );
}

const styles = {
    Container: {
        maxWidth: "700px",
        margin: "0 auto",
        padding: "24px"
    },
    HeaderFont: {
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: "28px",
        letterSpacing: "-0.03em",
        color: "#4272b6",
        margin: 0
    },
    SubHeaderFont: {
        fontFamily: "Inter",
        fontWeight: "600",
        letterSpacing: "-0.02em",
        fontSize: "16px",
        lineHeight: "1.15",
        color: "#5a5a5a",
        margin: "16px 0 12px"
    },
    Divider: {
        border: "none",
        borderTop: "1px solid #ececec",
        margin: "20px 0"
    },
    OptionRow: {
        display: "flex",
        gap: "10px",
        marginBottom: "8px",
        flexDirection: "row"
    },
    StatusCard: {
        flex: "1 1 45%",
        border: "none",
        borderRadius: "12px",
        padding: "14px 12px",
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "14px",
        color: "#f3f3f3",
        cursor: "pointer",
        transition: "transform 0.15s ease, outline-offset 0.15s ease",
        outlineOffset: "2px"
    },
    CategoryCard: {
        flex: "1 1 45%",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "12px",
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "14px",
        color: "#4a4a4a",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "outline-offset 0.15s ease",
        outlineOffset: "2px"
    },
    TicketGridContainer: {
        marginTop: "24px"
    },
    TicketGridHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: "12px"
    },
    TicketGridCount: {
        fontFamily: "Inter",
        fontSize: "13px",
        color: "#9a9a9a"
    },
    TicketGrid: {
        display: "flex",
        flexDirection:"column",
        maxHeight:"40%",
        overflowY: "auto",
        gap: "12px"
    },
    TicketCard: {
        background: "#fff",
        border: "1px solid #ececec",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        cursor: "pointer",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        minWidth: "0",
        width:"100%",
        maxHeight: "30px"
    },
    TicketCardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    TicketId: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "13px",
        color: "#4272b6"
    },
    TicketTitle: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "15px",
        letterSpacing: "-0.01em",
        color: "#2b2b2b",
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%"
    },
    TicketMeta: {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Inter",
        fontSize: "12px",
        color: "#9a9a9a"
    },
    TicketGridEmpty: {
        fontFamily: "Inter",
        fontSize: "14px",
        color: "#9a9a9a",
        textAlign: "center",
        padding: "40px 0"
    }
};