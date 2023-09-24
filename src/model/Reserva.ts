import {Usuari} from "src/model/Usuari";

export interface Reserva {
  id: number;
  descripcio: string;
  dataInici: Date;
  dataFi: Date;
  usuariEmail:string;
  usuariNom:string;
  idCalendar:string;
  idCalendarEvent:string;
}
