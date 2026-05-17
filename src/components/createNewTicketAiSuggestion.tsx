import type { i_AiSuggestionBox } from "../interfaces/i_AiSuggestion";

export function AiSuggestionBox({ aiSuggestion, setPageStatus, setCreateNewTicketIsActive }: i_AiSuggestionBox) {
    if (!aiSuggestion) return null;
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden"
        }}>
    
            <div className="NewTicketHeader">
                <h1 className="HeaderFont" style={{ color: "white" }}>Sugestões da IA</h1>
            </div>

            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 20px",
                fontSize: "13px",
                color: "#374151",
                lineHeight: "1.7",
                whiteSpace: "pre-wrap"
            }}>
                <div style={{
                    backgroundColor: "#eff6ff",
                    border: "0.5px solid #bfdbfe",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    display: "flex",
                    gap: "10px"
                }}>
                    <i className="ti ti-bulb" style={{ fontSize: "18px", color: "#4a7fcb", flexShrink: 0, marginTop: "2px" }} aria-hidden="true"/>
                    <span>{aiSuggestion}</span>
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                padding: "14px 20px",
                borderTop: "0.5px solid #e5e7eb"
            }}>
                <button className="tab-btn" style={{ flex: 1, backgroundColor: "#16a34a" }}
                    onClick={() => setCreateNewTicketIsActive(false)}>
                    <i className="ti ti-check" aria-hidden="true"/> Problema resolvido
                </button>
                <button className="tab-btn" style={{ flex: 1, backgroundColor: "#e24b4a" }}
                    onClick={() => setPageStatus(4)}>
                    <i className="ti ti-ticket" aria-hidden="true"/> Abrir Chamado
                </button>
            </div>
        </div>
    );
}