import {axios}  from 'boot/axios'
import {Reserva} from "../model/Reserva";
import {Ref} from "vue";

export class ReservatService {

  static async getReservaById(id:string): Promise<Reserva> {
    const response = await axios.get(process.env.API + '/api/reserves/reserva/' + id);
    const data:any = await response.data;
    return this.fromJSON(data)
  }

  static async findAllMyReserves(): Promise<Array<Reserva>> {
    const response = await axios.get(process.env.API + '/api/reserves/myreserves');
    const data = await response.data;
    return Promise.all(data.map(async (reserva:any):Promise<Reserva>=>{
        return await this.fromJSON(reserva)
    }));
  }

  static async findAll(): Promise<Array<Reserva>> {
    const response = await axios.get(process.env.API + '/api/reserves/reserves');
    const data = await response.data;
    return Promise.all(data.map(async (reserva:any):Promise<Reserva>=>{
      return await this.fromJSON(reserva)
    }));
  }

  static async save(reserva:Reserva){
    await axios.post(process.env.API + '/api/reserves/reserva/desar',reserva);
  }

  static async esborrar(idReserva:number){
    await axios.post(process.env.API + '/api/reserves/reserva/esborrar',idReserva);
  }

  static async fromJSON(json:any):Promise<Reserva>{
    return {
      id: json.idReserva,
      descripcio: json.descripcio,
      dataInici: json.dataInici,
      dataFi: json.dataFi,
      idCalendar: json.idCalendar,
      idCalendarEvent: json.idCalendarEvent,
      usuariEmail: json.usuariEmail,
      usuariNom: json.usuariNom
    }
  }
}
