export default function DashScreenScreen() {
    return (
    <>
    <div id="container">
        <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", height: "100%"}}>

            <div className= "header" style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly"}}>
                <div style={{width:"100px", height: "60px", backgroundColor:"green"}}></div>
                <div style={{width:"100px", height: "60px", backgroundColor:"green"}}></div>
                <div style={{width:"100px", height: "60px", backgroundColor:"green"}}></div>
            </div>

            <div className="sidebar">
                <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                    <div style={{width:"100px", height: "100px", backgroundColor:"yellow"}}></div>
                    <div style={{width:"100px", height: "100px", backgroundColor:"yellow"}}></div>
                    <div style={{width:"100px", height: "100px", backgroundColor:"yellow"}}></div>
                </div>
                 <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                    <div style={{width:"100px", height: "100px", backgroundColor:"blue"}}></div>
                    <div style={{width:"100px", height: "100px", backgroundColor:"blue"}}></div>
                </div>
            </div>
        </div>
    </div>
    </>

)
}