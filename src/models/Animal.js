import moment from "moment";
import { formatBrazil } from "../constants";

export default class Animal {
  constructor(registro, peso, data) {
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
