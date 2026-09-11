import { useEffect, useState } from "react";
import type { i_Ticket } from "../../interfaces/i_ticket";

type MonthGraphInfo = Map<Number, i_Ticket[]>
type YearGraphInfo = Map<Number, MonthGraphInfo>


interface i_FetchTicketsInTime 
{
    openingDate: Date;
    closingDate: Date|undefined;
    selectedCategory: Number;
}

interface i_sector_status {
    label: string;
    value: number;
    color: string;
}

const sectorData: i_sector_status[] = [
    { label: "Suporte", value: 42, color: "#4386d8" },
    { label: "Financeiro", value: 28, color: "#63a375" },
    { label: "TI", value: 65, color: "#e0a94c" },
    { label: "RH", value: 15, color: "#d16a6a" },
];

const formatDate = (d: Date | string | null): string => {
    if (!d) return "—";
    if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
        const [year, month, day] = d.split('-').map(Number);
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    const date = new Date(d);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

export default function TicketMonthsDashBoard() {
    const maxValue = Math.max(...sectorData.map(d => d.value));
    const [openingDate, setOpeningDate] = useState<Date>("")
    const [closingDate, setClosingDate] = useState<Date>()
    const [selectedCategory, setSelectedCategory] = useState<number>(0)
    const [TicketsFound, setTicketsFound] = useState<i_Ticket[]>([]);
    const [GraphInfo, setGraphInfo] = useState<YearGraphInfo>();
    const [displayGraph, setDisplayGraph] = useState<boolean>(false);

    function TurnTicketInfoToGraphData(TicketsFound: i_Ticket[])
    {
        let currentTicketData : YearGraphInfo = new Map();

        for (let ticket of TicketsFound)
        {
         
            let ticketDate : Date = new Date(ticket.ticketDateOpen);
            let ticketYear = ticketDate.getFullYear();
            let ticketMonth = ticketDate.getMonth();    

            if ( !currentTicketData.has(ticketYear) )
            {
                const ticketMap: MonthGraphInfo = new Map();
                const ticketArray : i_Ticket[] = [ticket]
                ticketMap.set(ticketMonth, ticketArray);

                currentTicketData.set(ticketYear, ticketMap);
            }
            else
            {
                let ticketsFoundAtCurrentYear : MonthGraphInfo = currentTicketData.get(ticketYear);

                if( !ticketsFoundAtCurrentYear.get(ticketMonth) )
                {
                    let createTicketsFoundInMonth : MonthGraphInfo = new Map();
                    createTicketsFoundInMonth.set(ticketMonth, [ticket]);
                    currentTicketData.set(ticketYear, createTicketsFoundInMonth);
                }
                else
                {
                    let ticketsFoundInMonth : i_Ticket[] = ticketsFoundAtCurrentYear.get(ticketMonth);
                    ticketsFoundInMonth.push(ticket);
                }

            }
        }
        setGraphInfo(currentTicketData);
    }

    async function FetchTicketsInTime({ openingDate, closingDate, selectedCategory }: i_FetchTicketsInTime) {
        const url = `http://localhost:3000/Ticket/fetch-tickets-in-period/`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    InitialDate: openingDate,
                    FinalDate: closingDate ?? "",
                    TicketCategory: selectedCategory
                })
            });

        

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            setTicketsFound(data);
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    useEffect(() => {
        TurnTicketInfoToGraphData(TicketsFound)
        if(TicketsFound.length > 0)
            {
                setDisplayGraph(true);
            }
        else
            {
               setDisplayGraph(false); 
            }

    }, [TicketsFound])


    return (
        <div style={styles.DashBoardBody}>
            <div style={styles.TitleBar}>
                <p style={styles.TitleFont}>Dashboard - Geral</p>
            </div>

            <div style={styles.Container}>
                <p style={styles.SectionTitle}>Tickets Abertos por Setor</p>

                <div style={styles.DateRow}>
                    <div style={styles.DateCard}>
                        <p style={styles.InputLabel}>Data Inicio:</p>
                        <input 
                            type="date" 
                            style={styles.InputField} 
                            placeholder="Insira uma data de inicio" 
                            onChange={((e) => {setOpeningDate(e.target.value)})}
                        />
                    </div>
                    <div style={styles.DateCard}>
                        <p style={styles.InputLabel}>Data Final:</p>
                        <input 
                            type="date" 
                            style={styles.InputField} 
                            placeholder="Insira uma data final - Opcional" 
                            onChange={((e) => {setClosingDate(e.target.value)})}
                        />
                    </div>

                </div>
                <div style={styles.DateRow}>
                    <div style={styles.DateCard}>
                        <p style={styles.InputLabel}>Departamento</p>
                        <input 
                            type="number" 
                            style={styles.InputField} 
                            placeholder="Escolha um departamento" 
                            onChange={((e) => {setSelectedCategory(Number(e.target.value))})}
                        />
                    </div>
                </div>

                <div style={{"display":"flex", width:"100%", "justifyContent": "center"}}>
                    <div 
                        style={styles.Button}
                        onClick={() => {FetchTicketsInTime({openingDate, closingDate, selectedCategory})}}
                    >
                        Procurar Tickets No Período
                    </div>
                </div>

                <div>
                    <p style={{ ...styles.SectionTitle, textAlign: "center" }}>Tickets Encontrados no periodo {formatDate(openingDate)} - {formatDate(closingDate)}</p>
                    <div style={styles.separationBar} />
                </div>


                {/*** Graphs */}
                { displayGraph &&
                    <div style={styles.GraphSection}>
                        <div style={styles.GraphStatsColumn}>
                            <p style={styles.BarLabel}>Maior Valor: {}</p>
                            <p style={styles.BarLabel}>Menor Valor: {}</p>
                        </div>

                        <div style={styles.GraphWrapper}>
                            <div style={styles.TicketsPerSectorGraph}>
                                {sectorData.map((sector) => {
                                    const topPercent = 100 - (sector.value / maxValue) * 100;
                                    return (
                                        <div key={sector.label} style={styles.DotColumn}>
                                            <div style={styles.DotTrack}>
                                                <div
                                                    style={{
                                                        ...styles.Dot,
                                                        top: `${topPercent}%`,
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        ...styles.DotValue,
                                                        top: `${topPercent}%`,
                                                    }}
                                                >
                                                    {sector.value}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                }
                
              
            </div>
        </div>
    );
}

const styles = {
     DashBoardBody: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
    },
    TitleBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#e0dddd",
        padding: "8px 0",
    },
    TitleFont: {
        fontFamily: "Nunito",
        fontSize: "2rem",
        fontWeight: "700",
        color: "#4386d8",
        letterSpacing: "-0.01em",
        lineHeight: "1.2",
        margin: 0,
    },
    AuxFont: {
        fontFamily: "Nunito",
        fontSize: "2rem",
        fontWeight: "500",
        color: "#8d8c8c",
        letterSpacing: "-0.01em",
        lineHeight: "1.2",
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
        outlineOffset: "2px",
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
        outlineOffset: "2px",
    },

    DateRow: {
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        width: "100%",
    },
    DateCard: {
        flex: "1 1 45%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "12px",
        backgroundColor: "#fff",
    },

    GraphWrapper: {
        flex: "1",
        display:"flex",
        width: "100%",
        minHeight: "220px",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    TicketsPerSectorGraph: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
        backgroundColor: "#fafbff",
        border: "1px solid #eef1f8",
        borderRadius: "14px",
        padding: "20px 12px 12px",
        boxSizing: "border-box",
    },

    InputField: {
        width: "85%",
        boxSizing: "border-box",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "8px",
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: "16px",
        color: "#4a4a4a",
        backgroundColor: "#fff",
        outline: "none",
        outlineOffset: "2px",
        transition: "border-color 0.15s ease, outline-offset 0.15s ease",
    },
    InputFieldFocus: {
        borderColor: "#b0b0b0",
    },
    InputLabel: {
        display: "block",
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: "16px",
        color: "#4a4a4a",
        marginBottom: "6px",
        whiteSpace: "nowrap",
    },

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
        borderRadius: "6px 6px 2px 2px",
        transition: "height 0.3s ease",
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
        flex: "1",
        minHeight: 0,
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
        marginRight: "15px",
    },
    CategoryLabel: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "13px",
        color: "#3f3f46",
    },
    separationBar: {
        width: "100%",
        height: "1px",
        backgroundColor: "#f0f0f0",
    },

    GraphSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        gap: "16px",
        width: "100%",
        flex: "1",
        minHeight: 0,
    },
    GraphStatsColumn: {
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: "110px",
        padding: "20px 0 12px", 
        boxSizing: "border-box",
    },

    DotColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        height: "100%",
        justifyContent: "flex-end",
    },
    DotTrack: {
        position: "relative",
        width: "2px",
        height: "100%",
        backgroundColor: "#eef1f8",
    },
    Dot: {
        position: "absolute",
        left: "50%",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#7fb8f0",
        transform: "translate(-50%, -50%)",
        transition: "top 0.3s ease",
        boxShadow: "0 0 0 4px rgba(127, 184, 240, 0.15)",
    },

    DotValue: {
        position: "absolute",
        left: "50%",
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "12px",
        color: "#4a4a4a",
        transform: "translate(14px, -50%)",
        whiteSpace: "nowrap",
        margin: 0,
    },

    Button: {
        width:"40%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "8px 16px",
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "14px",
        color: "#4386d8",
        backgroundColor: "#fff",
        cursor: "pointer",
        outline: "none",
        outlineOffset: "2px",
        transition: "background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease",
    },
    ButtonHover: {
        backgroundColor: "#f5f8fd",
        borderColor: "#4386d8",
    },
    ButtonActive: {
        transform: "scale(0.98)",
    },
    ButtonPrimary: {
        backgroundColor: "#4386d8",
        borderColor: "#4386d8",
        color: "#fff",
    },
    ButtonPrimaryHover: {
        backgroundColor: "#3574c2",
    },

} as const satisfies Record<string, React.CSSProperties>;