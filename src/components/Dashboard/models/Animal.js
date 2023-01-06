import { calculaDias, calculaGPD } from "../../../shared/utils";

export default class Animal {
    constructor({ key, registro, peso, data }) {
        this.key = key;
        this.registro = registro;
        this.pesoFinal = peso;
        this.dataAtual = data;
        this.pesoInicial = null;
        this.dataAnterior = null;
    }

    static NewAnimal({
        key,
        registro,
        pesoFinal,
        dataAtual,
        pesoInicial,
        dataAnterior
    }) {
        const animal = new Animal({});
        animal.key = key;
        animal.registro = registro;
        animal.pesoFinal = pesoFinal;
        animal.dataAtual = dataAtual;
        animal.pesoInicial = pesoInicial;
        animal.dataAnterior = dataAnterior || null;
        return animal;
    }

    get dias() {
        return calculaDias(this.dataAnterior, this.dataAtual);
    }

    get gdp() {
        return calculaGPD(this.pesoInicial, this.pesoFinal, this.dataAnterior, this.dataAtual);
    }
}
