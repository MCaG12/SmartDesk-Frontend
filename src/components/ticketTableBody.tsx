interface interface_ticket_table_body
{
    id: number;
    title: string;
    openingDate : Date;
    closingDate : Date | null;
    department : string;
    problemCategory: string;
    priority:string
}

export function Ticket_Table_Body({ id, title, openingDate, closingDate, department, problemCategory, priority }: interface_ticket_table_body) {

  const formatDate = (d: Date | null) =>
    d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";

  return (
    <>
      <div style={{
        backgroundColor: "#ffffff",
        border: "0.5px solid #c2c2c2",
        borderRadius: "var(--border-radius-lg)",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        boxSizing: "border-box"
      }}>

        {/* Header: status dot + title + avatar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              width: "10px", height: "10px",
              borderRadius: "50%",
              backgroundColor: "#e24b4a",
              flexShrink: 0
            }} />
            <span style={{ fontWeight: 500, fontSize: "14px", color: "var(--color-text-primary)" }}>
              #{id} | {title}
            </span>
          </div>
          {/* Initials avatar fallback */}
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            backgroundColor: "#dbeafe", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: 500, color: "#1d4ed8"
          }}>
            Ag
          </div>
        </div>

        {/* Opening date */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
          <i className="ti ti-calendar" style={{ fontSize: "15px" }} aria-hidden="true" />
          <span>{formatDate(openingDate)}</span>
        </div>

        {/* Department */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
          <i className="ti ti-map-pin" style={{ fontSize: "15px" }} aria-hidden="true" />
          <span>{department}</span>
        </div>

        {/* Footer: tags + action button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{
              backgroundColor: "#dbeafe", color: "#1d4ed8",
              fontSize: "12px", fontWeight: 500,
              padding: "3px 10px", borderRadius: "6px"
            }}>{problemCategory}</span>
            <span style={{
              backgroundColor: "#fef3c7", color: "#b45309",
              fontSize: "12px", fontWeight: 500,
              padding: "3px 10px", borderRadius: "6px"
            }}>{priority}</span>
          </div>
          <button style={{
            width: "28px", height: "28px",
            borderRadius: "8px",
            backgroundColor: "#1e3a5f",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "18px", lineHeight: 1
          }}>+</button>
        </div>

      </div>
    </>
  );
}