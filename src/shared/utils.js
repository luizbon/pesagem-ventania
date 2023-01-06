import moment from "moment";
import { formatDatabase } from "./constants";

export const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const calculaDias = (dataInicial, dataFinal) => {
  if (dataInicial == null) return null;
  if (dataFinal == null) return null;
  return moment(dataFinal, formatDatabase).diff(
    moment(dataInicial, formatDatabase),
    "days"
  );
}

export const calculaGPD = (pesoInicial, pesoFinal, dataInicial, dataFinal) => {
  if (dataInicial == null) return null;
  if (dataFinal == null) return null;
  const dias = calculaDias(dataInicial, dataFinal);
  if (dias === 0) {
    return 0;
  }
  return parseInt(
    ((pesoFinal - pesoInicial) / dias) * 1000,
    10
  );
}