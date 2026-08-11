import { useState } from "react";

interface i_category
{
    categoryTitle: string;
    categoryColor : string;
}


const NewTicketCode = 1;
const TicketInProgressCode = 2;
const PendingTicketCode = 4;
const ConcludedTicketCode = 5;

const sectorAgents = [
    {
        sectorTitle: "Suporte Técnico",
        sectorColor: "#3b82f6",
        agents: [
            { name: "João Silva", ticketCount: 24 },
            { name: "Mariana Costa", ticketCount: 19 },
            { name: "Pedro Almeida", ticketCount: 15 },
        ],
    },
    {
        sectorTitle: "Financeiro",
        sectorColor: "#10b981",
        agents: [
            { name: "Ana Beatriz", ticketCount: 18 },
            { name: "Carlos Eduardo", ticketCount: 14 },
            { name: "Fernanda Lima", ticketCount: 9 },
        ],
    },
    {
        sectorTitle: "Comercial",
        sectorColor: "#f59e0b",
        agents: [
            { name: "Rafael Souza", ticketCount: 21 },
            { name: "Juliana Rocha", ticketCount: 16 },
            { name: "Bruno Martins", ticketCount: 11 },
        ],
    },
    {
        sectorTitle: "RH",
        sectorColor: "#8b5cf6",
        agents: [
            { name: "Camila Ferreira", ticketCount: 12 },
            { name: "Lucas Oliveira", ticketCount: 8 },
            { name: "Beatriz Santos", ticketCount: 5 },
        ],
    },
];



const categories :i_category[] = [
    { categoryTitle: "Hardware", categoryColor: "#E74C3C" },
    { categoryTitle: "Software", categoryColor: "#3498DB" },
    { categoryTitle: "Rede", categoryColor: "#2ECC71" },
    { categoryTitle: "Acesso / Permissão", categoryColor: "#9B59B6" },
    { categoryTitle: "Email", categoryColor: "#F39C12" },
    { categoryTitle: "Erro no Sistema", categoryColor: "#E67E22" },
    { categoryTitle: "Impressora", categoryColor: "#1ABC9C" },
    { categoryTitle: "Outros", categoryColor: "#95A5A6" },
];

const statusOptions = [
    { label: "Novos Chamados", bgColor: "#ffa2a2", buttonCode: NewTicketCode },
    { label: "Em Andamento", bgColor: "#766cff", buttonCode: TicketInProgressCode},
    { label: "Pendente", bgColor: "#ffd665", buttonCode: PendingTicketCode },
    { label: "Concluído", bgColor: "#66e9a1", buttonCode: ConcludedTicketCode }
];

export default function TicketInfoDashboard()
{
    const [currentTicketSector, setCurrentTicketSector] = useState(0);
    function getSectorAgents(sectorTitle : string) {
        return sectorAgents.find((sector) => sector.sectorTitle === sectorTitle);
    }
    
    const selectedSector = getSectorAgents("Suporte Técnico");

    return <div style={styles.DashBoardBody}>
        <div style={styles.TitleBar}>
            <p style={styles.TitleFont}>Chamados Dashboard </p>
        </div>
        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Tickets Abertos por Setor</p>

            <div style={styles.TicketsPerSectorGraph}>
                {categories.map((category) => (
                    <div key={category.categoryTitle} style={styles.BarColumn}>
                        <div
                            style={{
                                ...styles.TicketsPerSectorBar,
                                backgroundColor: category.categoryColor,
                            }}
                        />
                        <span style={styles.BarLabel}>{category.categoryTitle}: 10</span>
                    </div>
                ))}
            </div>
        </div>

        <div style={styles.separationBar}/>

        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Status de Tickets por Setor</p>

            <div style={styles.SectorButtonBar}>
                {categories.map((category) => (
                    <div key={category.categoryTitle} style={{...styles.CategoryCard, display:"flex",flexDirection:"row"}}>
                      
                        <span
                            style={{
                                ...styles.CategoryDot,
                                backgroundColor: category.categoryColor,
                            }}
                        />
                        <span style={styles.CategoryLabel}>{category.categoryTitle}</span>
                    </div>
                ))}
            </div>
            
            <div style={styles.KanbanBoard}>
                {statusOptions.map((status) => (
                    <div key={status.buttonCode} style={styles.KanbanColumn}>
                        <div style={styles.KanbanColumnHeader}>
                            <span
                                style={{
                                    ...styles.StatusDot,
                                    backgroundColor: status.bgColor,
                                }}
                            />
                            <span style={styles.KanbanColumnTitle}>{status.label}</span>
                        </div>

                        <div style={styles.KanbanCountBadge}>
                            <span style={styles.KanbanCountNumber}>10</span>
                            <span style={styles.KanbanCountUnit}>tickets</span>
                        </div>

                        <div
                            style={{
                                ...styles.KanbanAccentBar,
                                backgroundColor: status.bgColor,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>

        <div style={styles.Container}>
            <p style={styles.SectionTitle}>Principais Agentes — {selectedSector.sectorTitle}</p>

            <div style={styles.AgentPanel}>
                <div style={styles.AgentPanelHeader}>
                    <span
                        style={{
                            ...styles.StatusDot,
                            backgroundColor: selectedSector.sectorColor,
                        }}
                    />
                    <span style={styles.AgentPanelHeaderText}>
                        {selectedSector.agents.length} agentes ativos
                    </span>
                </div>

                <div style={styles.AgentList}>
                    {selectedSector.agents.map((agent, index) => (
                        <div key={agent.name} style={styles.AgentRow}>
                            <span style={styles.AgentRank}>{index + 1}º</span>
                            <span style={styles.AgentName}>{agent.name}</span>
                            <div style={styles.AgentBarTrack}>
                                <div
                                    style={{
                                        ...styles.AgentBarFill,
                                        width: `${(agent.ticketCount / selectedSector.agents[0].ticketCount) * 100}%`,
                                        backgroundColor: selectedSector.sectorColor,
                                    }}
                                />
                            </div>
                            <span style={styles.AgentCount}>{agent.ticketCount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
}

const styles = {
    DashBoardBody : {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection:"column",
        overflowY: "scroll"
    },
    TitleBar : {
        display: "flex",
        flexDirection: "row",
        textAlign:"center",
        justifyContent:"center",
        backgroundColor: "#e0dddd"
    },
    TitleFont : {
        fontFamily: "Nunito",
        fontSize: "2rem",
        fontWeight: "700",
        color: "#4386d8",
        letterSpacing: "-0.01em",
        lineHeight: "1.2"
    },
    AuxFont: {
        fontFamily: "Nunito",
        fontSize: "2rem",
        fontWeight: "500",
        color: "#8d8c8c",
        letterSpacing: "-0.01em",
        lineHeight: "1.2"
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
     TicketsPerSectorGraph: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        width: "100%",
        height: "180px",
        backgroundColor: "#fafbff",
        border: "1px solid #eef1f8",
        borderRadius: "14px",
        padding: "20px 12px 12px",
    },

    // status per section

    BarColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        height: "100%",
        justifyContent: "flex-end",
    },

    TicketsPerSectorBar: {
        width: "28px",
        height: "60%",
        borderRadius: "6px 6px 2px 2px",
    },

    BarLabel: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "12px",
        color: "#6b7280",
        whiteSpace: "nowrap",
    },

    Container: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#ffffff",
    },

    SectionTitle: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "25px",
        color: "#4386d8",
        margin: 0,
    },

     SectorButtonBar: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
    },

    CategoryDot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        flexShrink: 0,
        marginRight: "15px"
    },

    CategoryLabel: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "13px",
        color: "#3f3f46",
    },

    separationBar : 
    {
        width:"100%",
        height: "1%",
        backgroundColor: "#f0f0f0"
    },

    //status category 

     KanbanBoard: {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
        overflowX: "auto",
        paddingBottom: "4px",
    },

    KanbanColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "140px",
        flex: "1 1 0",
        backgroundColor: "#fafbff",
        border: "1px solid #eef1f8",
        borderRadius: "12px",
        padding: "14px 12px",
    },

    KanbanColumnHeader: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },

    StatusDot: {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        flexShrink: 0,
    },

    KanbanColumnTitle: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "12.5px",
        color: "#52525b",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    KanbanCountBadge: {
        display: "flex",
        alignItems: "baseline",
        gap: "4px",
    },

    KanbanCountNumber: {
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: "24px",
        color: "#1a1a1a",
    },

    KanbanCountUnit: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "20px",
        color: "#9ca3af",
    },

    KanbanAccentBar: {
        width: "100%",
        height: "3px",
        borderRadius: "2px",
        opacity: 0.85,
    },

    AgentPanel: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        backgroundColor: "#fafbff",
        border: "1px solid #eef1f8",
        borderRadius: "14px",
        padding: "18px 16px",
    },

    AgentPanelHeader: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },

    AgentPanelHeaderText: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "12.5px",
        color: "#9ca3af",
    },

    AgentList: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },

    AgentRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    AgentRank: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "12px",
        color: "#3b82f6",
        width: "20px",
        flexShrink: 0,
    },

    AgentName: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "13px",
        color: "#3f3f46",
        width: "120px",
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    AgentBarTrack: {
        flex: 1,
        height: "6px",
        backgroundColor: "#eef1f8",
        borderRadius: "3px",
        overflow: "hidden",
    },

    AgentBarFill: {
        height: "100%",
        borderRadius: "3px",
        transition: "width 0.2s ease",
    },

    AgentCount: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "13px",
        color: "#1a1a1a",
        width: "24px",
        textAlign: "right",
        flexShrink: 0,
    },

} as const satisfies Record<string, React.CSSProperties>;