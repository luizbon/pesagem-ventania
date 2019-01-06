import moment from "moment";
import { formatDatabase } from "../../../shared/constants";
import { guid } from "../../../shared/utils";

export default class Animal {
    constructor({ id, registro, peso, data }) {
        this._id = id || guid();
        this.registro = registro;
        this.pesoFinal = peso;
        this.dataAtual = data;
        this.pesoInicial = null;
        this.dataAnterior = null;
    }

    static NewAnimal({
        _id,
        registro,
        pesoFinal,
        dataAtual,
        pesoInicial,
        dataAnterior
    }) {
        const animal = new Animal({});
        animal._id = _id;
        animal.registro = registro;
        animal.pesoFinal = pesoFinal;
        animal.dataAtual = dataAtual;
        animal.pesoInicial = pesoInicial;
        animal.dataAnterior = dataAnterior || null;
        return animal;
    }

    get dias() {
        if (this.dataAnterior === null) return null;
        return moment(this.dataAtual, formatDatabase).diff(
            moment(this.dataAnterior, formatDatabase),
            "days"
        );
    }

    get gdp() {
        if (this.dataAnterior === null) return null;
        return parseInt(
            ((this.pesoFinal - this.pesoInicial) / this.dias) * 1000
        );
    }
}
