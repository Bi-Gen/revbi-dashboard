// Dati mock per lo studio commercialista (basato su BI Gen reference)
export const studioData = {
  studio: {
    name: "Studio Rossi & Associati",
    city: "Milano",
    partitaIva: "12345678901"
  },
  collaboratori: [
    { id: 1, nome: "Dott. Marco Rossi", ruolo: "Titolare", tariffaOraria: 120, oreMensiliTarget: 160, email: "m.rossi@studiorossi.it" },
    { id: 2, nome: "Dott.ssa Elena Bianchi", ruolo: "Senior", tariffaOraria: 85, oreMensiliTarget: 160, email: "e.bianchi@studiorossi.it" },
    { id: 3, nome: "Dott. Luca Verdi", ruolo: "Senior", tariffaOraria: 80, oreMensiliTarget: 160, email: "l.verdi@studiorossi.it" },
    { id: 4, nome: "Anna Neri", ruolo: "Junior", tariffaOraria: 50, oreMensiliTarget: 160, email: "a.neri@studiorossi.it" },
    { id: 5, nome: "Paolo Gialli", ruolo: "Praticante", tariffaOraria: 30, oreMensiliTarget: 140, email: "p.gialli@studiorossi.it" }
  ],
  clienti: [
    { id: 1, ragioneSociale: "Tech Solutions SRL", tipo: "SRL", settore: "Informatica", fatturato: 850000, dataInizio: "2019-03-15", collaboratoreId: 1 },
    { id: 2, ragioneSociale: "Edilpro SNC", tipo: "SNC", settore: "Edilizia", fatturato: 420000, dataInizio: "2020-01-10", collaboratoreId: 2 },
    { id: 3, ragioneSociale: "Mario Bianchi", tipo: "P.IVA", settore: "Consulenza", fatturato: 95000, dataInizio: "2021-06-01", collaboratoreId: 4 },
    { id: 4, ragioneSociale: "Ristorante Da Luigi SAS", tipo: "SAS", settore: "Ristorazione", fatturato: 380000, dataInizio: "2018-09-20", collaboratoreId: 2 },
    { id: 5, ragioneSociale: "Green Energy SRL", tipo: "SRL", settore: "Energia", fatturato: 1250000, dataInizio: "2022-02-01", collaboratoreId: 1 },
    { id: 6, ragioneSociale: "Farmacia Centrale SNC", tipo: "SNC", settore: "Sanitario", fatturato: 720000, dataInizio: "2017-04-12", collaboratoreId: 3 },
    { id: 7, ragioneSociale: "Auto Service SRL", tipo: "SRL", settore: "Automotive", fatturato: 560000, dataInizio: "2019-11-05", collaboratoreId: 2 },
    { id: 8, ragioneSociale: "Giovanni Ferri", tipo: "P.IVA", settore: "Artigianato", fatturato: 78000, dataInizio: "2023-01-15", collaboratoreId: 4 },
    { id: 9, ragioneSociale: "Fashion Store SRL", tipo: "SRL", settore: "Commercio", fatturato: 920000, dataInizio: "2020-07-22", collaboratoreId: 1 },
    { id: 10, ragioneSociale: "Logistica Express SPA", tipo: "SPA", settore: "Trasporti", fatturato: 3500000, dataInizio: "2021-03-01", collaboratoreId: 1 },
    { id: 11, ragioneSociale: "Studio Legale Martini", tipo: "STP", settore: "Legale", fatturato: 450000, dataInizio: "2019-05-10", collaboratoreId: 3 },
    { id: 12, ragioneSociale: "Panificio Dolce Forno SNC", tipo: "SNC", settore: "Alimentare", fatturato: 280000, dataInizio: "2018-02-28", collaboratoreId: 4 },
    { id: 13, ragioneSociale: "Roberto Conti", tipo: "P.IVA", settore: "Freelance", fatturato: 65000, dataInizio: "2022-09-01", collaboratoreId: 5 },
    { id: 14, ragioneSociale: "Immobiliare Centro SRL", tipo: "SRL", settore: "Immobiliare", fatturato: 680000, dataInizio: "2020-04-15", collaboratoreId: 2 },
    { id: 15, ragioneSociale: "Sport Club ASD", tipo: "ASD", settore: "Sport", fatturato: 120000, dataInizio: "2021-01-20", collaboratoreId: 4 },
    { id: 16, ragioneSociale: "Dental Care SRL", tipo: "SRL", settore: "Sanitario", fatturato: 890000, dataInizio: "2019-08-01", collaboratoreId: 1 },
    { id: 17, ragioneSociale: "Officina Meccanica Rossi SNC", tipo: "SNC", settore: "Automotive", fatturato: 340000, dataInizio: "2017-11-10", collaboratoreId: 3 },
    { id: 18, ragioneSociale: "Laura Piccoli", tipo: "P.IVA", settore: "Design", fatturato: 82000, dataInizio: "2023-04-01", collaboratoreId: 5 },
    { id: 19, ragioneSociale: "Hotel Bellavista SRL", tipo: "SRL", settore: "Turismo", fatturato: 1450000, dataInizio: "2018-06-15", collaboratoreId: 1 },
    { id: 20, ragioneSociale: "Cooperativa Sociale Insieme", tipo: "COOP", settore: "Sociale", fatturato: 520000, dataInizio: "2020-02-01", collaboratoreId: 3 },
    { id: 21, ragioneSociale: "E-commerce Italia SRL", tipo: "SRL", settore: "E-commerce", fatturato: 2100000, dataInizio: "2022-01-10", collaboratoreId: 1 },
    { id: 22, ragioneSociale: "Carpenteria Metallica SNC", tipo: "SNC", settore: "Manifattura", fatturato: 480000, dataInizio: "2019-03-20", collaboratoreId: 2 },
    { id: 23, ragioneSociale: "Francesco Gallo", tipo: "P.IVA", settore: "Formazione", fatturato: 72000, dataInizio: "2021-11-01", collaboratoreId: 4 },
    { id: 24, ragioneSociale: "Agenzia Viaggi Mondo SAS", tipo: "SAS", settore: "Turismo", fatturato: 290000, dataInizio: "2018-04-05", collaboratoreId: 3 },
    { id: 25, ragioneSociale: "Startup Innovation SRL", tipo: "SRL", settore: "Tech", fatturato: 180000, dataInizio: "2024-01-15", collaboratoreId: 2 },
    { id: 26, ragioneSociale: "Gelateria Artigianale SNC", tipo: "SNC", settore: "Alimentare", fatturato: 195000, dataInizio: "2020-05-01", collaboratoreId: 4 },
    { id: 27, ragioneSociale: "Marco Fontana", tipo: "P.IVA", settore: "Marketing", fatturato: 110000, dataInizio: "2022-03-15", collaboratoreId: 5 },
    { id: 28, ragioneSociale: "Centro Estetico Bella SRL", tipo: "SRL", settore: "Benessere", fatturato: 320000, dataInizio: "2021-07-01", collaboratoreId: 3 },
    { id: 29, ragioneSociale: "Elettricisti Associati SNC", tipo: "SNC", settore: "Impianti", fatturato: 410000, dataInizio: "2019-09-10", collaboratoreId: 2 },
    { id: 30, ragioneSociale: "Sara Lombardi", tipo: "P.IVA", settore: "Grafica", fatturato: 58000, dataInizio: "2023-06-01", collaboratoreId: 5 },
    { id: 31, ragioneSociale: "Fonderia Metalli SPA", tipo: "SPA", settore: "Industria", fatturato: 4200000, dataInizio: "2016-01-01", collaboratoreId: 1 },
    { id: 32, ragioneSociale: "Pizzeria Napoli SAS", tipo: "SAS", settore: "Ristorazione", fatturato: 265000, dataInizio: "2020-10-15", collaboratoreId: 4 },
    { id: 33, ragioneSociale: "Andrea Moretti", tipo: "P.IVA", settore: "Fotografia", fatturato: 48000, dataInizio: "2024-02-01", collaboratoreId: 5 },
    { id: 34, ragioneSociale: "Assicurazioni Sicure SRL", tipo: "SRL", settore: "Assicurazioni", fatturato: 780000, dataInizio: "2018-08-20", collaboratoreId: 1 },
    { id: 35, ragioneSociale: "Tipografia Moderna SNC", tipo: "SNC", settore: "Stampa", fatturato: 350000, dataInizio: "2017-05-10", collaboratoreId: 3 },
    { id: 36, ragioneSociale: "Chiara Ricci", tipo: "P.IVA", settore: "Traduzione", fatturato: 42000, dataInizio: "2022-11-01", collaboratoreId: 5 },
    { id: 37, ragioneSociale: "Supermercato Fresco SRL", tipo: "SRL", settore: "GDO", fatturato: 2800000, dataInizio: "2019-01-15", collaboratoreId: 1 },
    { id: 38, ragioneSociale: "Idraulica Service SNC", tipo: "SNC", settore: "Impianti", fatturato: 295000, dataInizio: "2020-03-01", collaboratoreId: 4 },
    { id: 39, ragioneSociale: "Luca Barbieri", tipo: "P.IVA", settore: "Musica", fatturato: 35000, dataInizio: "2023-09-01", collaboratoreId: 5 },
    { id: 40, ragioneSociale: "Centro Medico Salute SRL", tipo: "SRL", settore: "Sanitario", fatturato: 1650000, dataInizio: "2017-02-01", collaboratoreId: 1 },
    { id: 41, ragioneSociale: "Falegnameria Artigiana SNC", tipo: "SNC", settore: "Artigianato", fatturato: 380000, dataInizio: "2018-11-20", collaboratoreId: 2 },
    { id: 42, ragioneSociale: "Giulia Santini", tipo: "P.IVA", settore: "Psicologia", fatturato: 68000, dataInizio: "2021-04-01", collaboratoreId: 4 },
    { id: 43, ragioneSociale: "Trasporti Veloci SRL", tipo: "SRL", settore: "Logistica", fatturato: 920000, dataInizio: "2019-06-10", collaboratoreId: 2 },
    { id: 44, ragioneSociale: "Palestra Fitness SAS", tipo: "SAS", settore: "Sport", fatturato: 240000, dataInizio: "2020-09-01", collaboratoreId: 3 },
    { id: 45, ragioneSociale: "Matteo Colombo", tipo: "P.IVA", settore: "Architettura", fatturato: 125000, dataInizio: "2022-05-15", collaboratoreId: 4 },
    { id: 46, ragioneSociale: "Azienda Agricola Verde SNC", tipo: "SNC", settore: "Agricoltura", fatturato: 310000, dataInizio: "2016-07-01", collaboratoreId: 3 },
    { id: 47, ragioneSociale: "Software House SRL", tipo: "SRL", settore: "IT", fatturato: 1100000, dataInizio: "2021-02-01", collaboratoreId: 1 },
    { id: 48, ragioneSociale: "Ferramenta Rossi SNC", tipo: "SNC", settore: "Commercio", fatturato: 420000, dataInizio: "2018-03-15", collaboratoreId: 2 },
    { id: 49, ragioneSociale: "Valentina Costa", tipo: "P.IVA", settore: "Coaching", fatturato: 88000, dataInizio: "2023-03-01", collaboratoreId: 5 },
    { id: 50, ragioneSociale: "Concessionaria Auto Elite SRL", tipo: "SRL", settore: "Automotive", fatturato: 5200000, dataInizio: "2017-09-01", collaboratoreId: 1 }
  ],
  pratiche: [
    { id: 1, clienteId: 1, tipo: "Contabilita", descrizione: "Contabilità ordinaria mensile", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 2, clienteId: 1, tipo: "Bilancio", descrizione: "Bilancio d'esercizio 2025", stato: "in_corso", dataApertura: "2026-01-15", scadenza: "2026-04-30" },
    { id: 3, clienteId: 2, tipo: "Contabilita", descrizione: "Contabilità semplificata mensile", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 4, clienteId: 3, tipo: "Dichiarazioni", descrizione: "Dichiarazione IVA 2026", stato: "completata", dataApertura: "2026-01-10", scadenza: "2026-04-30" },
    { id: 5, clienteId: 4, tipo: "Consulenza", descrizione: "Consulenza fiscale straordinaria", stato: "in_corso", dataApertura: "2026-01-20", scadenza: "2026-02-28" },
    { id: 6, clienteId: 5, tipo: "Bilancio", descrizione: "Bilancio consolidato 2025", stato: "in_corso", dataApertura: "2026-01-10", scadenza: "2026-06-30" },
    { id: 7, clienteId: 6, tipo: "Contabilita", descrizione: "Contabilità ordinaria mensile", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 8, clienteId: 7, tipo: "Dichiarazioni", descrizione: "Mod. 770/2026", stato: "da_iniziare", dataApertura: "2026-02-01", scadenza: "2026-10-31" },
    { id: 9, clienteId: 8, tipo: "Contabilita", descrizione: "Regime forfettario", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 10, clienteId: 9, tipo: "Bilancio", descrizione: "Bilancio d'esercizio 2025", stato: "da_iniziare", dataApertura: "2026-02-01", scadenza: "2026-04-30" },
    { id: 11, clienteId: 10, tipo: "Consulenza", descrizione: "Due diligence fiscale", stato: "in_corso", dataApertura: "2026-01-05", scadenza: "2026-03-15" },
    { id: 12, clienteId: 10, tipo: "Bilancio", descrizione: "Bilancio consolidato gruppo", stato: "da_iniziare", dataApertura: "2026-02-15", scadenza: "2026-06-30" },
    { id: 13, clienteId: 11, tipo: "Contabilita", descrizione: "Contabilità STP", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 14, clienteId: 12, tipo: "Dichiarazioni", descrizione: "Dichiarazione redditi soci", stato: "da_iniziare", dataApertura: "2026-05-01", scadenza: "2026-11-30" },
    { id: 15, clienteId: 13, tipo: "Contabilita", descrizione: "Regime forfettario", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 16, clienteId: 14, tipo: "Consulenza", descrizione: "Riorganizzazione societaria", stato: "in_corso", dataApertura: "2025-11-01", scadenza: "2026-03-31" },
    { id: 17, clienteId: 15, tipo: "Contabilita", descrizione: "Contabilità ASD", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 18, clienteId: 16, tipo: "Bilancio", descrizione: "Bilancio d'esercizio 2025", stato: "in_corso", dataApertura: "2026-01-20", scadenza: "2026-04-30" },
    { id: 19, clienteId: 17, tipo: "Contabilita", descrizione: "Contabilità semplificata", stato: "in_corso", dataApertura: "2026-01-01", scadenza: null },
    { id: 20, clienteId: 18, tipo: "Dichiarazioni", descrizione: "Dichiarazione redditi PF", stato: "da_iniziare", dataApertura: "2026-05-01", scadenza: "2026-11-30" },
    { id: 21, clienteId: 19, tipo: "Bilancio", descrizione: "Bilancio d'esercizio 2025", stato: "in_corso", dataApertura: "2026-01-15", scadenza: "2026-04-30" }
  ],
  timesheet: [
    { id: 1, collaboratoreId: 1, clienteId: 1, praticaId: 1, data: "2026-01-06", ore: 2, descrizione: "Verifica registrazioni contabili" },
    { id: 2, collaboratoreId: 1, clienteId: 5, praticaId: 6, data: "2026-01-06", ore: 4, descrizione: "Analisi bilancio consolidato" },
    { id: 3, collaboratoreId: 1, clienteId: 10, praticaId: 11, data: "2026-01-07", ore: 6, descrizione: "Due diligence fiscale" },
    { id: 4, collaboratoreId: 1, clienteId: 16, praticaId: 18, data: "2026-01-08", ore: 3, descrizione: "Revisione bilancio" },
    { id: 5, collaboratoreId: 1, clienteId: 31, praticaId: null, data: "2026-01-09", ore: 5, descrizione: "Consolidamento partecipazioni" },
    { id: 6, collaboratoreId: 2, clienteId: 2, praticaId: 3, data: "2026-01-06", ore: 3, descrizione: "Registrazioni contabili" },
    { id: 7, collaboratoreId: 2, clienteId: 4, praticaId: 5, data: "2026-01-06", ore: 2, descrizione: "Consulenza fiscale" },
    { id: 8, collaboratoreId: 2, clienteId: 7, praticaId: 8, data: "2026-01-07", ore: 1.5, descrizione: "Preparazione 770" },
    { id: 9, collaboratoreId: 2, clienteId: 14, praticaId: 16, data: "2026-01-08", ore: 4, descrizione: "Studio riorganizzazione" },
    { id: 10, collaboratoreId: 2, clienteId: 22, praticaId: null, data: "2026-01-09", ore: 2.5, descrizione: "Contabilità mensile" },
    { id: 11, collaboratoreId: 3, clienteId: 6, praticaId: 7, data: "2026-01-06", ore: 4, descrizione: "Chiusura mensile" },
    { id: 12, collaboratoreId: 3, clienteId: 11, praticaId: 13, data: "2026-01-07", ore: 3, descrizione: "Contabilità STP" },
    { id: 13, collaboratoreId: 3, clienteId: 17, praticaId: 19, data: "2026-01-08", ore: 2, descrizione: "Registrazioni contabili" },
    { id: 14, collaboratoreId: 3, clienteId: 20, praticaId: null, data: "2026-01-09", ore: 3.5, descrizione: "Contabilità cooperativa" },
    { id: 15, collaboratoreId: 4, clienteId: 3, praticaId: 4, data: "2026-01-06", ore: 2, descrizione: "Dichiarazione IVA" },
    { id: 16, collaboratoreId: 4, clienteId: 8, praticaId: 9, data: "2026-01-07", ore: 1.5, descrizione: "Regime forfettario" },
    { id: 17, collaboratoreId: 4, clienteId: 12, praticaId: 14, data: "2026-01-08", ore: 2, descrizione: "Preparazione dichiarazioni" },
    { id: 18, collaboratoreId: 4, clienteId: 15, praticaId: 17, data: "2026-01-09", ore: 3, descrizione: "Contabilità ASD" },
    { id: 19, collaboratoreId: 5, clienteId: 13, praticaId: 15, data: "2026-01-06", ore: 1.5, descrizione: "Regime forfettario" },
    { id: 20, collaboratoreId: 5, clienteId: 18, praticaId: 20, data: "2026-01-07", ore: 1, descrizione: "Preparazione dichiarazione" },
    { id: 21, collaboratoreId: 5, clienteId: 27, praticaId: null, data: "2026-01-08", ore: 2, descrizione: "Contabilità mensile" },
    { id: 22, collaboratoreId: 5, clienteId: 30, praticaId: null, data: "2026-01-09", ore: 1.5, descrizione: "Registrazioni contabili" },
    { id: 23, collaboratoreId: 1, clienteId: 21, praticaId: null, data: "2026-01-13", ore: 5, descrizione: "Pianificazione fiscale" },
    { id: 24, collaboratoreId: 1, clienteId: 47, praticaId: null, data: "2026-01-14", ore: 4, descrizione: "Credito R&D" },
    { id: 25, collaboratoreId: 1, clienteId: 50, praticaId: null, data: "2026-01-15", ore: 6, descrizione: "Revisione bilancio" },
    { id: 26, collaboratoreId: 2, clienteId: 25, praticaId: null, data: "2026-01-13", ore: 3, descrizione: "Setup contabilità startup" },
    { id: 27, collaboratoreId: 2, clienteId: 41, praticaId: null, data: "2026-01-14", ore: 2.5, descrizione: "Contabilità mensile" },
    { id: 28, collaboratoreId: 2, clienteId: 43, praticaId: null, data: "2026-01-15", ore: 3, descrizione: "Chiusura mensile" },
    { id: 29, collaboratoreId: 3, clienteId: 24, praticaId: null, data: "2026-01-13", ore: 2, descrizione: "Contabilità agenzia" },
    { id: 30, collaboratoreId: 3, clienteId: 35, praticaId: null, data: "2026-01-14", ore: 2.5, descrizione: "Registrazioni contabili" },
    { id: 31, collaboratoreId: 3, clienteId: 44, praticaId: null, data: "2026-01-15", ore: 2, descrizione: "Contabilità palestra" },
    { id: 32, collaboratoreId: 4, clienteId: 23, praticaId: null, data: "2026-01-13", ore: 1.5, descrizione: "Regime forfettario" },
    { id: 33, collaboratoreId: 4, clienteId: 26, praticaId: null, data: "2026-01-14", ore: 2, descrizione: "Contabilità mensile" },
    { id: 34, collaboratoreId: 4, clienteId: 32, praticaId: null, data: "2026-01-15", ore: 2.5, descrizione: "Registrazioni pizzeria" },
    { id: 35, collaboratoreId: 5, clienteId: 33, praticaId: null, data: "2026-01-13", ore: 1, descrizione: "Regime forfettario" },
    { id: 36, collaboratoreId: 5, clienteId: 36, praticaId: null, data: "2026-01-14", ore: 1, descrizione: "Contabilità traduttrice" },
    { id: 37, collaboratoreId: 5, clienteId: 39, praticaId: null, data: "2026-01-15", ore: 0.5, descrizione: "Regime forfettario" },
    { id: 38, collaboratoreId: 1, clienteId: 19, praticaId: 21, data: "2026-01-20", ore: 4, descrizione: "Bilancio hotel" },
    { id: 39, collaboratoreId: 1, clienteId: 34, praticaId: null, data: "2026-01-21", ore: 3, descrizione: "Consulenza assicurazioni" },
    { id: 40, collaboratoreId: 1, clienteId: 40, praticaId: null, data: "2026-01-22", ore: 5, descrizione: "Bilancio centro medico" }
  ],
  fatture: [
    { id: 1, clienteId: 1, numero: "1/2026", data: "2026-01-31", importo: 2500, stato: "pagata", dataPagamento: "2026-02-05" },
    { id: 2, clienteId: 2, numero: "2/2026", data: "2026-01-31", importo: 800, stato: "pagata", dataPagamento: "2026-02-03" },
    { id: 3, clienteId: 3, numero: "3/2026", data: "2026-01-31", importo: 350, stato: "pagata", dataPagamento: "2026-02-01" },
    { id: 4, clienteId: 4, numero: "4/2026", data: "2026-01-31", importo: 1200, stato: "non_pagata", dataPagamento: null },
    { id: 5, clienteId: 5, numero: "5/2026", data: "2026-01-31", importo: 4500, stato: "pagata", dataPagamento: "2026-02-02" },
    { id: 6, clienteId: 6, numero: "6/2026", data: "2026-01-31", importo: 1800, stato: "non_pagata", dataPagamento: null },
    { id: 7, clienteId: 7, numero: "7/2026", data: "2026-01-31", importo: 950, stato: "pagata", dataPagamento: "2026-02-04" },
    { id: 8, clienteId: 8, numero: "8/2026", data: "2026-01-31", importo: 280, stato: "pagata", dataPagamento: "2026-02-01" },
    { id: 9, clienteId: 9, numero: "9/2026", data: "2026-01-31", importo: 2200, stato: "non_pagata", dataPagamento: null },
    { id: 10, clienteId: 10, numero: "10/2026", data: "2026-01-31", importo: 8500, stato: "pagata", dataPagamento: "2026-02-01" },
    { id: 11, clienteId: 11, numero: "11/2026", data: "2026-01-31", importo: 1100, stato: "pagata", dataPagamento: "2026-02-05" },
    { id: 12, clienteId: 12, numero: "12/2026", data: "2026-01-31", importo: 550, stato: "non_pagata", dataPagamento: null },
    { id: 13, clienteId: 13, numero: "13/2026", data: "2026-01-31", importo: 200, stato: "pagata", dataPagamento: "2026-02-02" },
    { id: 14, clienteId: 14, numero: "14/2026", data: "2026-01-31", importo: 3200, stato: "pagata", dataPagamento: "2026-02-03" },
    { id: 15, clienteId: 15, numero: "15/2026", data: "2026-01-31", importo: 450, stato: "pagata", dataPagamento: "2026-02-04" },
    { id: 16, clienteId: 16, numero: "16/2026", data: "2026-01-31", importo: 2800, stato: "non_pagata", dataPagamento: null },
    { id: 17, clienteId: 17, numero: "17/2026", data: "2026-01-31", importo: 680, stato: "pagata", dataPagamento: "2026-02-05" },
    { id: 18, clienteId: 18, numero: "18/2026", data: "2026-01-31", importo: 250, stato: "pagata", dataPagamento: "2026-02-01" },
    { id: 19, clienteId: 19, numero: "19/2026", data: "2026-01-31", importo: 3800, stato: "pagata", dataPagamento: "2026-02-02" },
    { id: 20, clienteId: 20, numero: "20/2026", data: "2026-01-31", importo: 1400, stato: "non_pagata", dataPagamento: null },
    { id: 21, clienteId: 21, numero: "21/2026", data: "2026-01-31", importo: 5200, stato: "pagata", dataPagamento: "2026-02-01" },
    { id: 22, clienteId: 22, numero: "22/2026", data: "2026-01-31", importo: 920, stato: "pagata", dataPagamento: "2026-02-04" },
    { id: 23, clienteId: 23, numero: "23/2026", data: "2026-01-31", importo: 220, stato: "pagata", dataPagamento: "2026-02-02" },
    { id: 24, clienteId: 24, numero: "24/2026", data: "2026-01-31", importo: 580, stato: "non_pagata", dataPagamento: null },
    { id: 25, clienteId: 25, numero: "25/2026", data: "2026-01-31", importo: 750, stato: "pagata", dataPagamento: "2026-02-03" },
    { id: 26, clienteId: 31, numero: "26/2026", data: "2026-01-31", importo: 9500, stato: "pagata", dataPagamento: "2026-02-01" },
    { id: 27, clienteId: 37, numero: "27/2026", data: "2026-01-31", importo: 6200, stato: "pagata", dataPagamento: "2026-02-02" },
    { id: 28, clienteId: 40, numero: "28/2026", data: "2026-01-31", importo: 4100, stato: "non_pagata", dataPagamento: null },
    { id: 29, clienteId: 47, numero: "29/2026", data: "2026-01-31", importo: 3500, stato: "pagata", dataPagamento: "2026-02-03" },
    { id: 30, clienteId: 50, numero: "30/2026", data: "2026-01-31", importo: 12000, stato: "pagata", dataPagamento: "2026-02-01" }
  ],
  scadenze: [
    { id: 1, tipo: "IVA", descrizione: "Liquidazione IVA mensile", data: "2026-02-16", clienti: "tutti" },
    { id: 2, tipo: "F24", descrizione: "Versamento ritenute", data: "2026-02-16", clienti: "tutti" },
    { id: 3, tipo: "INPS", descrizione: "Contributi dipendenti", data: "2026-02-16", clienti: "datori" },
    { id: 4, tipo: "Bilancio", descrizione: "Deposito bilanci CCIAA", data: "2026-04-30", clienti: "societa" },
    { id: 5, tipo: "Dichiarazioni", descrizione: "Dichiarazione IVA annuale", data: "2026-04-30", clienti: "tutti" },
    { id: 6, tipo: "IVA", descrizione: "Liquidazione IVA mensile", data: "2026-03-16", clienti: "tutti" },
    { id: 7, tipo: "F24", descrizione: "Versamento ritenute", data: "2026-03-16", clienti: "tutti" },
    { id: 8, tipo: "CU", descrizione: "Invio CU dipendenti", data: "2026-03-16", clienti: "datori" },
    { id: 9, tipo: "IMU", descrizione: "Acconto IMU", data: "2026-06-16", clienti: "immobili" },
    { id: 10, tipo: "Dichiarazioni", descrizione: "Modello 770", data: "2026-10-31", clienti: "datori" },
    { id: 11, tipo: "Dichiarazioni", descrizione: "Modello Redditi PF/SP/SC", data: "2026-11-30", clienti: "tutti" },
    { id: 12, tipo: "IMU", descrizione: "Saldo IMU", data: "2026-12-16", clienti: "immobili" }
  ]
};

// Types
export interface Collaboratore {
  id: number;
  nome: string;
  ruolo: string;
  tariffaOraria: number;
  oreMensiliTarget: number;
  email: string;
}

export interface Cliente {
  id: number;
  ragioneSociale: string;
  tipo: string;
  settore: string;
  fatturato: number;
  dataInizio: string;
  collaboratoreId: number;
}

export interface Pratica {
  id: number;
  clienteId: number;
  tipo: string;
  descrizione: string;
  stato: 'in_corso' | 'completata' | 'da_iniziare';
  dataApertura: string;
  scadenza: string | null;
}

export interface TimesheetEntry {
  id: number;
  collaboratoreId: number;
  clienteId: number;
  praticaId: number | null;
  data: string;
  ore: number;
  descrizione: string;
}

export interface Fattura {
  id: number;
  clienteId: number;
  numero: string;
  data: string;
  importo: number;
  stato: 'pagata' | 'non_pagata';
  dataPagamento: string | null;
}

export interface Scadenza {
  id: number;
  tipo: string;
  descrizione: string;
  data: string;
  clienti: string;
}
