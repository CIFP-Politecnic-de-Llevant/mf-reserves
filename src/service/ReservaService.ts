import {axios}  from 'boot/axios'
import {Reserva} from "../model/Reserva";

export class ReservatService {

  static async getDepartamentById(id:string): Promise<Reserva> {
    const response = await axios.get(process.env.API + '/api/reserves/departament/getById/' + id);
    const data:any = await response.data;
    return this.fromJSON(data)
  }

  static async findAll(): Promise<Array<Reserva>> {
    const response = await axios.get(process.env.API + '/api/reserves/reserves');
    const data = await response.data;
    return Promise.all(data.map(async (reserva:any):Promise<Reserva>=>{
        return await this.fromJSON(reserva)
    }));
  }

  static async fromJSON(json:any):Promise<Reserva>{
    return {
      id: json.iddepartament,
      descripcio: json.gestibNom,
      dataInici: json.gestibIdentificador,
      dataFi: json.gestibIdentificador,
      usuari: json.gestibIdentificador,
    }
  }
}
