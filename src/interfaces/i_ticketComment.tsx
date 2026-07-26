export interface i_CommentTicket {
    Id: number;
    ticketTitle: string;
    ticketDescription: string;
    ticketDateOpen: string;
    ticketDateClose: string | null;
}

export interface i_CommentTicketUserInfo {
    Id: number;
    usuarNome: string;
    usuarEmail: string;
    usuarSenha: string;
}

export interface i_ticketComment {
    Id: number;
    tickcomComment: string;
    tickcomTicket: i_CommentTicket;
    tickcomUser: i_CommentTicketUserInfo;
}