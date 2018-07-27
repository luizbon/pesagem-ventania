import moment from "moment";
import { formatBrazil } from "../constants";
import { isEmpty, isNumeric } from "validator";
import Animal from "./Animal";

export default class FormClass {
  constructor(form = {}) {
    this.animal = form.animal || "";
    this.peso = form.peso || "";
    this.data = form.data || moment().format(formatBrazil);
  }
  get isValid() {
    return (
      !isEmpty(this.animal) &&
      isNumeric(this.peso) &&
      this.peso > 0 &&
      moment(this.data, formatBrazil).isValid()
    );
  }
  toAnimal() {
    return new Animal(this.animal, this.peso, this.data);
  }
}
