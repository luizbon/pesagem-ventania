import { calculaDias, calculaGPD } from "../../../shared/utils";

export default class Animal {
    constructor({ key, registro, peso, data }) {
        this.key = key;
        this.registro = registro;
        this.pesoFinal = peso;
        this.dataAtual = data;
        this.pesoInicial = 0;
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
        animal.pesoFinal = pesoFinal ?? 0;
        animal.dataAtual = dataAtual;
        animal.pesoInicial = pesoInicial ?? 0;
        animal.dataAnterior = dataAnterior || null;
        return animal;
    }

    static FromFirestore(animalRef) {
        const animal = new Animal({});
        animal.key = animalRef.id;
        animal.registro = animalRef.registro;
        const pesagem = animalRef.pesagem.sort(Animal.SortPesagem);
        const last = pesagem.length - 1;
        animal.pesoFinal = pesagem[last].peso;
        animal.dataAtual = pesagem[last].data;
        if (last > 0) {
            animal.pesoInicial = pesagem[last - 1].peso;
            animal.dataAnterior = pesagem[last - 1].data;
        }
        return animal;
    }

    static SortPesagem(a, b) {
        return a.data > b.data ? 1 : -1;
    }

    get dias() {
        return calculaDias(this.dataAnterior, this.dataAtual);
    }

    get gdp() {
        return calculaGPD(this.pesoInicial, this.pesoFinal, this.dataAnterior, this.dataAtual) ?? 0;
    }
}
