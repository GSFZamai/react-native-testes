import { obtemLeilao, obtemLeiloes } from "../../src/repositorio/leilao";
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

const mockRequisicaoFalha = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("repositiorio/leilao", () => {

    beforeEach(() => {
        apiLeiloes.get.mockClear();
    })

    describe("obtemLeiloes", () => {
        it("deve retornar lista de leiloes", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisicaoSucesso(mockLeiloes))

            const leiloes = await obtemLeiloes();
            expect(leiloes).toEqual(mockLeiloes);

            expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });

        it("deve retornar lista de leiloes", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisicaoFalha())

            const leiloes = await obtemLeiloes();
            expect(leiloes).toEqual([]);

            expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
        });
    });

    describe("obtemLeilao", () => {

        it("deve retornar um leilão com o id especificado", async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoSucesso(mockLeiloes[0]));

            const leilao = await obtemLeilao(1);
            expect(leilao).toEqual(mockLeiloes[0]);
        });

        if("deve retornar um objeto vazio em caso de falha", async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoFalha());

            const leilao = await obtemLeilao(1);
            expect(leilao).toEqual({});
        });
    });

});