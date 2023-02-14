import { adicionaLance, obtemLancesDoLeilao } from "../../src/repositorio/lance";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes.js");

const mockLances = [
    {
        "valor": 1000,
        "leilaoId": 1,
        "id": 1
    }
];

const mockRequisicaoSucesso = (response) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: response
            })
        }, 200)
    })
};

const mockRequisicaoFalha = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
};

describe("/repositorios/lance", () => {

    beforeEach(() => {
        apiLeiloes.get.mockClear();
        apiLeiloes.post.mockClear();
    });

    describe("obtemLancesdoLeilao", () => {
        it("deve retornar lances referentes à um leilão específico", async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoSucesso(mockLances))

            let lances = await obtemLancesDoLeilao(1);

            expect(lances).toEqual(mockLances);
            expect(apiLeiloes.get).toBeCalledTimes(1);
            expect(apiLeiloes.get).toBeCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc');
        });

        it("deve retornar um array vazio em caso se falha", async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoFalha())

            let lances = await obtemLancesDoLeilao(1);

            expect(lances).toEqual([]);
            expect(apiLeiloes.get).toBeCalledTimes(1);
            expect(apiLeiloes.get).toBeCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc');
        });
    });

    describe("adicionaLance", () => { 
        it("deve retornar true em caso de sucesso", async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicaoSucesso());

            let sucesso = await adicionaLance(mockLances[0]);

            expect(apiLeiloes.post).toBeCalledWith("/lances", mockLances[0]);
            expect(apiLeiloes.post).toBeCalledTimes(1);
            expect(sucesso).toBe(true);
        });

        it("deve retornar false em caso falha", async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicaoFalha());

            let sucesso = await adicionaLance(mockLances[0]);

            expect(apiLeiloes.post).toBeCalledWith("/lances", mockLances[0]);
            expect(apiLeiloes.post).toBeCalledTimes(1);
            expect(sucesso).toBe(false);
        });
    });
});