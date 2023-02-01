import { MENOR_QUE_VALOR_INICIAL, VALIDO, MENOR_OU_IGUAL_AOS_LANCES, INVALIDO } from "../../../src/negocio/constantes/estadosLance";
import { validaLance, validaFormatoNumericoDoLance } from "../../../src/negocio/validadores/lance";

describe("../../../src/negocio/validadores/lance", () => {
    describe("validaLance", () => {

        it(`deve retornar ${VALIDO} caso o valor do lance for maior que o valor inicial e maior que todos os lances`, () => {
            let lances = [
                { valor: 10.50 },
                { valor: 20.35 },
                { valor: 25.34 },
                { valor: 30.57 },
                { valor: 40.90 },
                { valor: 32.54 }
            ]
            let valorInicial = 20.50;

            let resultado = validaLance(50.10, { lances, valorInicial});
            expect(resultado).toBe(VALIDO);
        });

        it(`deve retornar ${VALIDO} caso o valor do lance for igual que o valor inicial e maior que todos os lances`, () => {
            let lances = [
                { valor: 10.50 },
                { valor: 20.35 },
                { valor: 25.34 },
                { valor: 30.57 },
                { valor: 40.90 },
                { valor: 32.54 }
            ]
            let valorInicial = 50.10;

            let resultado = validaLance(50.10, { lances, valorInicial});
            expect(resultado).toBe(VALIDO);
        });

        it(`deve retornar ${MENOR_QUE_VALOR_INICIAL} caso o valor do lance for menor que o valor inicial`, () => {
            let lances = [
                { valor: 10.50 },
                { valor: 20.35 },
                { valor: 25.34 },
                { valor: 30.57 },
                { valor: 40.90 },
                { valor: 32.54 }
            ]
            let valorInicial = 45;

            let resultado = validaLance(42, { lances, valorInicial});
            expect(resultado).toBe(MENOR_QUE_VALOR_INICIAL);
        });

        it(`deve retornar ${MENOR_OU_IGUAL_AOS_LANCES} caso o valor do lance for igual ao valor inicial e ao maior dos lances`, () => {
            let lances = [
                { valor: 10.50 },
                { valor: 20.35 },
                { valor: 25.34 },
                { valor: 30.57 },
                { valor: 40.90 },
                { valor: 32.54 }
            ]
            let valorInicial = 40.90;

            let resultado = validaLance(40.90, { lances, valorInicial});
            expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES);
        });

        it(`deve retornar ${VALIDO} caso o valor do lance for maior que valor inicial e ao maior lance dos lances`, () => {
            let lances = [
                { valor: 10.50 },
                { valor: 20.35 },
                { valor: 25.34 },
                { valor: 30.57 },
                { valor: 40.90 },
                { valor: 32.54 }
            ]
            let valorInicial = 40.90;

            let resultado = validaLance(45, { lances, valorInicial});
            expect(resultado).toBe(VALIDO);
        });
    });
    describe("validaFormatoNumericoDoLance", () => {
        
        it(`retorna ${VALIDO} caso for um número válido com vírgula para separar decimais`, () => {
            let valor = "10,52";
            let lanceValidado = validaFormatoNumericoDoLance(valor);

            expect(lanceValidado).toBe(VALIDO);
        });

        it(`retorna ${INVALIDO} caso for um número válido com ponto para separar decimais`, () => {
            let valor = "10.52";
            let lanceValidado = validaFormatoNumericoDoLance(valor);

            expect(lanceValidado).toBe(INVALIDO);
        });

        it(`retorna ${INVALIDO} caso for um valor que não seja número`, () => {
            let valor = "Teste";
            let lanceValidado = validaFormatoNumericoDoLance(valor);

            expect(lanceValidado).toBe(INVALIDO);
        });
    })
});