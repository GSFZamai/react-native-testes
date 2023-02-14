import useListaLeiloes from "../../src/hooks/useListaLeiloes";
import { renderHook, act } from "@testing-library/react-hooks";
import { obtemLeiloes } from "../../src/repositorio/leilao";

jest.mock("../../src/repositorio/leilao.js");

const mockLeilao = [
    {
        "id": 1,
        "nome": "TV",
        "descricao": "TV de LED 50\"",
        "valorInicial": 1000,
        "icone": "tv",
        "cor": "#ffba05"
    }
]

describe('/hooks/useListaLeiloes', () => {
    it('deve retornar uma lista de leiloes e uma função para atualizar', async () => {

        const mockLeiloes = [
            {
                "id": 1,
                "nome": "TV",
                "descricao": "TV de LED 50\"",
                "valorInicial": 1000,
                "icone": "tv",
                "cor": "#ffba05"
            },
            {
                "id": 2,
                "nome": "Geladeira",
                "descricao": "Geladeira Panasonic\"",
                "valorInicial": 4000,
                "icone": "tv",
                "cor": "#ffba05"
            },
        ]

        obtemLeiloes.mockImplementation(() => mockLeilao);

        const { waitForNextUpdate, result } = renderHook(() => useListaLeiloes());

        await waitForNextUpdate();

        expect(result.current[1]).toEqual(mockLeilao);

        obtemLeiloes.mockImplementation(() => mockLeiloes);

        await act(() => result.current[0]());

        expect(result.current[1]).toEqual(mockLeiloes);

    })
});