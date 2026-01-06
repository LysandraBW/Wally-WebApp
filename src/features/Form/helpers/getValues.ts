import { Values, Options } from "../DEF";

export default function getValues(options: Options): Values {
    return options.map(option => option[0]);
}