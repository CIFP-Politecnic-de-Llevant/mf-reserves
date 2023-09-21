import {Usuari} from "src/model/Usuari";

export interface Reserva {
  id: number;
  descripcio: string;
  dataInici: Date;
  dataFi: Date;
  usuari: Usuari;
  label?: string;
  value?: string;
}
