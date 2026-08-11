export default function TicketCollaboratorInfo()
{
    return <div style={styles.DashBoardBody}>
        <div style={styles.TitleBar}>
            <p style={styles.TitleFont}>Colaborador : </p>
            <h1 style={styles.AuxFont}> Teste </h1>
        </div>


    </div>
}

const styles = {
    DashBoardBody : {
        backgroundColor: "red",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection:"column"
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
    }
} as const satisfies Record<string, React.CSSProperties>;