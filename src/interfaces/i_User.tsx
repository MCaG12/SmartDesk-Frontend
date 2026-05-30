import type { NavigateFunction } from "react-router-dom";

export interface i_UserLoginInfo
{
    userEmail:string; 
    userPassword:string;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
    navigate : NavigateFunction
}