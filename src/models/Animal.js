import moment from "moment";
import { formatBrazil } from "../constants";
import { guid } from "../utils";

export default class Animal {
  constructor({ id, registro, peso, data }) {
    this._id = id || guid();
    this.registro = registro;
    this.pesoFinal = peso;
    this.dataAtual = data;
    this.pesoInicial = undefined;
    this.dataAnterior = undefined;
  }

  get dias() {
    if (this.dataAnterior === undefined) return undefined;
    return moment(this.dataAtual, formatBrazil).diff(
      moment(this.dataAnterior, formatBrazil),
      "days"
    );
  }

  get gdp() {
    if (this.dataAnterior === undefined) return undefined;
    return ((this.pesoFinal - this.pesoInicial) / this.dias) * 1000;
  }
}
