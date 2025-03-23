import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { mockEmisorInfo, mockChequesInfo } from './__mocks__/emisor.mock';

@Injectable()
export class EmisorService {
  async emisorInfo(cuit: string) {
    console.log(cuit);
    if (cuit === '20999999990')
      return [
        {
          denominacion: 'Ejemplo S.A.',
          situacion: [3],
        },
      ];
    const URL = process.env.APIBCRA;
    try {
      const response = await axios.get(`${URL}/Deudas/${cuit}`, {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }),
      });
      const info = response.data;
      if (info.results) {
        const response = mockChequesInfo;
        return response;
      } else return [];
    } catch (error) {
      return error.message;
    }
  }

  async chequesInfo(cuit: string) {
    const URL = process.env.APIBCRA;
    if (cuit === '20999999990') {
      return mockChequesInfo;
    }
    try {
      const response = await axios.get(
        `${URL}/Deudas/ChequesRechazados/${cuit}`,
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      );
      const info = response.data;
      if (info) {
        return info.results.causales;
      } else return [];
    } catch (error) {
      if (
        error.response.data.errorMessages[0] ===
        'No se encontró datos para la identificación ingresada.'
      )
        return [];
      else return error.message;
    }
  }
}
