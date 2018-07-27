import moment from "moment";
import { formatBrazil } from "../shared/constants";
import { isEmpty, isNumeric } from "validator";
import Animal from "./Animal";

export default class FormClass {
  constructor(form = {}) {
    this.registro = form.registro || "";
    this.peso = form.peso || "";
    this.data = form.data || moment().format(formatBrazil);
  }
  get isValid() {
    return (
      !isEmpty(this.registro) &&
      isNumeric(this.peso) &&
      this.peso > 0 &&
      moment(this.data, formatBrazil).isValid()
    );
  }
  toAnimal() {
    return new Animal(this);
  }
}
