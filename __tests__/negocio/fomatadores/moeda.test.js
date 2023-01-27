import { formataBrasileiroParaDecimal, formataDecimalParaReal } from "../../../src/negocio/formatadores/moeda";

describe("negocio/fomatadores/moeda", () => {

    describe("formataBrasileiroParaDecimal", () => {
        it("deve retornar 10.35 quando informado o valor 10,35", () => {
            const resultado = formataBrasileiroParaDecimal("10,35");

            expect(resultado).toBe(10.35);
        });
    });

    describe("formataDecimalParaReal", () => {
        it("deve retornar R$ 5,23 quando o valor informado for 5.23", () => {
            const resultado = formataDecimalParaReal(5.23);

            expect(resultado).toMatch(/R\$\s5,23/);
        });
    });

});