import { obtemLeiloes } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes"

jest.mock("../../src/servicos/apiLeiloes.js");

const mockLeiloes = [
    {
        "id": 1,
        "nome": "TV",
        "descricao": "TV de LED 50\"",
        "valorInicial": 1000,
        "icone": "tv",
        "cor": "#ffba05"
    }
]

const mockRequisicaoSucesso = (response) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: response
            }
            )
        }, 200)
    });
}

const mockRequisiçãoFalha = () => {
    return new Promise((_, reject) => { 
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("repositiorio/lance", () => {
    describe("obtemLeiloes", () => {
        it("deve retornar lista de leiloes", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisicaoSucesso(mockLeiloes))

            const leiloes = await obtemLeiloes();
            expect(leiloes).toEqual(mockLeiloes);
        });
    });

    describe("obtemLeiloes", () => {
        it("deve retornar lista de leiloes", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisiçãoFalha())

            const leiloes = await obtemLeiloes();
            expect(leiloes).toEqual([]);
        });
    });
});