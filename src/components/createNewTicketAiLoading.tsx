export function NewTicketAiLoading()
{
    return <div style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center",
                    flex: 1,
                    gap: "16px",
                    padding: "32px"
                }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        border: "4px solid #e5e7eb",
                        borderTop: "4px solid #4a7fcb",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}/>
                    <p style={{ 
                        fontSize: "15px", 
                        fontWeight: 500, 
                        color: "#4a7fcb",
                        margin: 0
                    }}>
                        Analisando seu problema...
                    </p>
                    <p style={{ 
                        fontSize: "13px", 
                        color: "#6b7280",
                        margin: 0,
                        textAlign: "center"
                    }}>
                        A IA está preparando sugestões de solução para você
                    </p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>    
}