import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

describe("negocio/formatadores/lance", () => {
    describe("formataMaiorLanceDoLeilao", () => {
        it("deve retornar maior lance do array", () => {
            const lances = [{valor: 10.50}, {valor: 45.52}, {valor: 50.32}];
            const maiorLance = formataMaiorLanceDoLeilao(lances, 0);
            expect(maiorLance).toEqual(50.32);
        });
    });
});