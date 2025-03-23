export const mockEmisorInfo = {
  denominacion: 'Ejemplo S.A.',
  situacion: [3],
};

export const mockChequesInfo = [
  {
    causal: 'SIN FONDOS',
    entidades: [
      {
        detalle: [
          {
            nroCheque: 752395,
            fechaRechazo: '2024-04-08',
            monto: 115000.0,
            fechaPago: null,
            fechaPagoMulta: null,
            estadoMulta: 'IMPAGA',
            ctaPersonal: false,
            denomJuridica: 'HM COLON MONTAJES INDUSTRIALES S. R. L.',
            enRevision: false,
            procesoJud: false,
          },
          {
            nroCheque: 98888881,
            fechaRechazo: '2025-04-08',
            monto: 55000.0,
            fechaPago: '2025-04-10',
            fechaPagoMulta: null,
            estadoMulta: 'IMPAGA',
            ctaPersonal: false,
            denomJuridica: 'HM COLON MONTAJES INDUSTRIALES S. R. L.',
            enRevision: false,
            procesoJud: false,
          },
        ],
      },
    ],
  },
  {
    causal: 'ERROR FORMAL',
    entidades: [
      {
        detalle: [
          {
            nroCheque: 129999,
            fechaRechazo: '2025-01-08',
            monto: 120000.0,
            fechaPago: null,
            fechaPagoMulta: null,
            estadoMulta: 'IMPAGA',
            ctaPersonal: false,
            denomJuridica: 'HM COLON MONTAJES INDUSTRIALES S. R. L.',
            enRevision: false,
            procesoJud: false,
          },
          {
            nroCheque: 1259999,
            fechaRechazo: '2019-04-08',
            monto: 55000.0,
            fechaPago: '2025-04-10',
            fechaPagoMulta: null,
            estadoMulta: 'IMPAGA',
            ctaPersonal: false,
            denomJuridica: 'HM COLON MONTAJES INDUSTRIALES S. R. L.',
            enRevision: false,
            procesoJud: false,
          },
        ],
      },
    ],
  },
];
