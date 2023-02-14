import React from 'react';
import EnviaLance from '../../../../src/telas/Leilao/componentes/EnviaLance';
import { ENVIADO, NAO_ENVIADO } from "../../../../src/negocio/constantes/estadosLance";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe("telas/Leilao/componentes/EnviaLance", () => {
    it("deve enviar um lance quando o botão for pressionado", async () => {

        const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)))

        const { getByTestId, getByText } = render(
            <EnviaLance
                cor="blue"
                enviaLance={enviaLance}
            />
        );

        const intput = getByTestId("valueInput");
        const button = getByTestId("sendButton");

        fireEvent.changeText(intput, "10");
        fireEvent.press(button);

        expect(enviaLance).toBeCalledWith("10");
        await waitFor(() => expect(getByText(ENVIADO)).toBeTruthy());
        expect(() => getByText(NAO_ENVIADO)).toThrow();


    });
});