import type { i_userCargo } from "./i_Cargo";
import type { i_usuarDepartamento } from "./i_Department";
import type { i_tipoUser } from "./i_TypeUser";


export interface i_UserLoginInfoResponse
{
    Id: number;
    usuarNome:string; 
    usuarEmail:string;
    usuarSenha: string;
    usuarCargo: i_userCargo; 
    usuarDepartamento: i_usuarDepartamento; 
    usuarTipo: i_tipoUser; 
}