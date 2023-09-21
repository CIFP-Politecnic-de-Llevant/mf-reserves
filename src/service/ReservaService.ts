import {axios}  from 'boot/axios'
import {Reserva} from "../model/Reserva";

export class ReservatService {

  static async getDepartamentById(id:string): Promise<Reserva> {
    const response = await axios.get(process.env.API + '/api/core/departament/getById/' + id);
    const data:any = await response.data;
    return this.fromJSON(data)
  }

  static async getDepartaments(): Promise<Array<Reserva>> {
    const response = await axios.get(process.env.API + '/api/core/departament/llistat');
    const data = await response.data;
    return Promise.all(data.map(async (reserva:any):Promise<Reserva>=>{
        return await this.fromJSON(reserva)
    }));
  }

  static async fromJSON(json:any):Promise<Reserva>{
    return {
      id: json.iddepartament,
      nom: json.gestibNom,
      gestibId: json.gestibIdentificador,
      capDepartament: (json.capDepartament)?await ReservaService.fromJSON(json.capDepartament):undefined
    }
  }
}
