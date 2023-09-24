import {Usuari} from "src/model/Usuari";

export interface Reserva {
  id: number;
  descripcio: string;
  dataInici: string;
  dataFi: string;
  usuariEmail:string;
  usuariNom:string;
  idCalendar:string;
  idCalendarEvent:string;
}
