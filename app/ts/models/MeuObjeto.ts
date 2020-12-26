import { Igualavel, Imprimivel } from "./index";

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {}
