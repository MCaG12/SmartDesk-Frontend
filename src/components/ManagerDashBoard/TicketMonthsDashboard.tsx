import { useState } from "react";

interface i_department
{
    departmentCode: number;
    departmentName : string;
}

export default function TicketMonthsDashBoard()
{
    const [selectedDepartmentCode, setSelectedDepartmentCode] = useState<i_department[]>();
    const [companyCode, setCompanyCode] = useState<number>(0);

    async function fetchDepartments(setSelectedDepartmentCode: React.Dispatch<React.SetStateAction<i_department[] | undefined>>)
    {
        const url = "http://localhost:3000/Departamento/GetAll";

        try 
        {
            const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            }})

            const data = await response.json() as i_department[]; 

            setSelectedDepartmentCode(data);

        } 
        catch (error) 
        {   
            console.error(error);
        }
    }

    async function fetchRolesByDepartment(departmentCode : number)
    {
        const url = `http://localhost:3000/Cargo/fetch-roles-by-department/${departmentCode}`;

        try 
        {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json"}
            })

            const data = await response.json() as i_department[]; 

            setSelectedDepartmentCode(data);

        } 
        catch (error) 
        {   
            console.error(error);
        }
    }

    return <div style={styles.DashBoardBody}>
        <div style={styles.TitleBar}>
            <p style={styles.TitleFont}>Chamados Dashboard </p>
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
} as const satisfies Record<string, React.CSSProperties>;