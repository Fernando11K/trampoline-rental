export const validationMessagePt =(error) => {
    const { type, ctx } = error;
    switch (type) {
        case "missing":
            return "Este campo é obrigatório.";
        case "string_type":
        case "string_sub_type":
            return "Informe um texto válido.";
        case "int_type":
        case "float_type":
        case "finite_number":
        case "decimal_type":
            return "Informe um número válido.";
        case "int_parsing":
        case "float_parsing":
        case "decimal_parsing":
            return "Não foi possível interpretar o número informado.";
        case "greater_than":
            return ctx?.gt !== undefined
                ? `O valor deve ser maior que ${ctx.gt}.`
                : "O valor é menor ou igual ao permitido.";
        case "greater_than_equal":
            return ctx?.ge !== undefined
                ? `O valor deve ser maior ou igual a ${ctx.ge}.`
                : "O valor é menor que o mínimo permitido.";
        case "less_than":
            return ctx?.lt !== undefined
                ? `O valor deve ser menor que ${ctx.lt}.`
                : "O valor é maior ou igual ao permitido.";
        case "less_than_equal":
            return ctx?.le !== undefined
                ? `O valor deve ser menor ou igual a ${ctx.le}.`
                : "O valor é maior que o máximo permitido.";
        case "string_too_short":
            return ctx?.min_length !== undefined
                ? `Use pelo menos ${ctx.min_length} caracteres.`
                : "O texto é curto demais.";
        case "string_too_long":
            return ctx?.max_length !== undefined
                ? `Use no máximo ${ctx.max_length} caracteres.`
                : "O texto é longo demais.";
        case "too_short":
            return ctx?.min_length !== undefined
                ? `Informe pelo menos ${ctx.min_length} itens.`
                : "Quantidade insuficiente.";
        case "too_long":
            return ctx?.max_length !== undefined
                ? `Informe no máximo ${ctx.max_length} itens.`
                : "Quantidade excessiva.";
        case "date_parsing":
        case "date_from_datetime_parsing":
        case "datetime_parsing":
        case "datetime_from_date_parsing":
            return "Informe uma data válida.";
        case "date_type":
        case "datetime_type":
            return "Tipo de data inválido.";
        case "bool_parsing":
        case "bool_type":
            return "Informe um valor verdadeiro ou falso.";
        case "enum":
            return "Selecione uma das opções permitidas.";
        case "string_pattern_mismatch":
            return "O formato do valor não é válido.";
        case "literal_error":
            return "O valor não corresponde às opções permitidas.";
        case "extra_forbidden":
            return "Campo não permitido.";
        case "url_parsing":
        case "url_type":
        case "url_scheme":
        case "url_syntax_violation":
        case "url_too_long":
            return "Informe uma URL válida.";
        case "uuid_parsing":
        case "uuid_type":
        case "uuid_version":
            return "Informe um identificador (UUID) válido.";
        case "dict_type":
        case "list_type":
        case "set_type":
        case "tuple_type":
            return "Formato da informação inválido.";
        case "value_error":
        case "assertion_error":
            return error.msg || "Valor inválido.";
        default:
            if (type === "value_error.missing") {
                return "Este campo é obrigatório.";
            }
            if (type === "type_error.integer" || type === "type_error.float") {
                return "Informe um número válido.";
            }
            if (type === "type_error.str" || type === "type_error.string") {
                return "Informe um texto válido.";
            }
            return error.msg || "Valor inválido.";
    }
}
