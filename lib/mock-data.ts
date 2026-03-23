export const mockUser = {
  name: 'João Silva',
  badge: 'Paciente',
  avatar: '',
}

export const mockEvolucao = [
  {
    id: 1,
    data: '15 Mar 2026',
    peso: 82.5,
    pressao: '120/80',
    sintomas: 'Dor lombar leve, cansaço',
    observacoes: 'Paciente apresentou melhora significativa. Reduzir analgésico.',
    status: 'melhora',
  },
  {
    id: 2,
    data: '01 Mar 2026',
    peso: 84.0,
    pressao: '130/85',
    sintomas: 'Dor lombar intensa, insônia',
    observacoes: 'Início do tratamento. Solicitados exames de rotina.',
    status: 'neutro',
  },
  {
    id: 3,
    data: '12 Fev 2026',
    peso: 85.2,
    pressao: '135/88',
    sintomas: 'Pressão alta, tontura',
    observacoes: 'Ajuste de medicação para pressão. Retorno em 2 semanas.',
    status: 'piora',
  },
  {
    id: 4,
    data: '20 Jan 2026',
    peso: 86.0,
    pressao: '138/90',
    sintomas: 'Tontura, cefaleia',
    observacoes: 'Primeira consulta. Histórico de hipertensão familiar.',
    status: 'neutro',
  },
]

export const mockHistorico = {
  doencas: ['Hipertensão Arterial', 'Diabetes Tipo 2'],
  alergias: ['Penicilina', 'Dipirona'],
  cirurgias: [
    { nome: 'Apendicectomia', ano: '2015' },
    { nome: 'Artroscopia joelho direito', ano: '2019' },
  ],
  antecedenteFamiliar: ['Cardiopatia (pai)', 'Diabetes (mãe)', 'Hipertensão (avó materna)'],
  dadosClinicos: {
    tipoSanguineo: 'O+',
    altura: '1,75m',
    peso: '82,5 kg',
    imc: '26,9',
  },
}

export const mockExames = [
  { id: 1, nome: 'Hemograma Completo', data: '10 Mar 2026', status: 'concluido', resultado: 'Hemoglobina 14,2 g/dL. Leucócitos 7.500/mm³. Plaquetas 220.000/mm³. Dentro dos limites normais.' },
  { id: 2, nome: 'Glicemia em Jejum', data: '10 Mar 2026', status: 'concluido', resultado: 'Glicemia: 98 mg/dL. Normal.' },
  { id: 3, nome: 'Ultrassom Abdominal', data: '18 Mar 2026', status: 'pendente', resultado: null },
  { id: 4, nome: 'Eletrocardiograma', data: '20 Mar 2026', status: 'pendente', resultado: null },
  { id: 5, nome: 'Colesterol Total e Frações', data: '05 Mar 2026', status: 'concluido', resultado: 'Colesterol Total: 195 mg/dL. LDL: 120 mg/dL. HDL: 52 mg/dL. Triglicerídeos: 145 mg/dL.' },
]

export const mockPrescricoes = [
  {
    id: 1,
    medicamento: 'Losartana Potássica',
    dosagem: '50mg',
    frequencia: '1x ao dia (manhã)',
    duracao: 'Uso contínuo',
    inicio: '01 Mar 2026',
    status: 'ativo',
  },
  {
    id: 2,
    medicamento: 'Metformina',
    dosagem: '500mg',
    frequencia: '2x ao dia (café e jantar)',
    duracao: 'Uso contínuo',
    inicio: '01 Mar 2026',
    status: 'ativo',
  },
  {
    id: 3,
    medicamento: 'Ibuprofeno',
    dosagem: '600mg',
    frequencia: '3x ao dia por 5 dias',
    duracao: '5 dias',
    inicio: '01 Mar 2026',
    status: 'encerrado',
  },
  {
    id: 4,
    medicamento: 'Omeprazol',
    dosagem: '20mg',
    frequencia: '1x ao dia (em jejum)',
    duracao: '30 dias',
    inicio: '15 Fev 2026',
    status: 'encerrado',
  },
]

export const mockCorpo = {
  peso: 82.5,
  altura: 1.75,
  imc: 26.9,
  gorduraTotal: 24, // percentual
  regioes: [
    { id: 'abdomen', label: 'Abdômen', gordura: 85, circunferencia: '98cm', risco: 'alto', dica: 'Circunferência acima do recomendado. Foco em cardio e dieta com baixo sódio.' },
    { id: 'peito', label: 'Peitoral', gordura: 55, circunferencia: '102cm', risco: 'moderado', dica: 'Nível moderado. Treinos de força ajudam a reduzir.' },
    { id: 'braco_esq', label: 'Braço Esq.', gordura: 30, circunferencia: '32cm', risco: 'baixo', dica: 'Dentro do esperado para seu perfil.' },
    { id: 'braco_dir', label: 'Braço Dir.', gordura: 30, circunferencia: '32cm', risco: 'baixo', dica: 'Dentro do esperado para seu perfil.' },
    { id: 'quadril', label: 'Quadril', gordura: 65, circunferencia: '105cm', risco: 'moderado', dica: 'Atenção ao quadril. Exercícios funcionais são indicados.' },
    { id: 'coxa_esq', label: 'Coxa Esq.', gordura: 45, circunferencia: '58cm', risco: 'baixo', dica: 'Nível adequado.' },
    { id: 'coxa_dir', label: 'Coxa Dir.', gordura: 45, circunferencia: '58cm', risco: 'baixo', dica: 'Nível adequado.' },
    { id: 'perna_esq', label: 'Perna Esq.', gordura: 20, circunferencia: '38cm', risco: 'baixo', dica: 'Ótimo nível.' },
    { id: 'perna_dir', label: 'Perna Dir.', gordura: 20, circunferencia: '38cm', risco: 'baixo', dica: 'Ótimo nível.' },
  ],
  historico: [
    { data: 'Jan 2026', gorduraTotal: 27 },
    { data: 'Fev 2026', gorduraTotal: 25.5 },
    { data: 'Mar 2026', gorduraTotal: 24 },
  ]
}

export const mockPlanoAlimentar = {
  perfil: {
    peso: '82,5 kg',
    altura: '1,75m',
    condicao: 'Hipertensão e Diabetes Tipo 2',
    restricoes: ['Baixo sódio', 'Baixo açúcar'],
    calorias: 1800,
  },
  semana: [
    {
      dia: 'Segunda',
      refeicoes: [
        { tipo: 'Café da manhã', descricao: 'Aveia com leite desnatado e banana, café sem açúcar' },
        { tipo: 'Almoço', descricao: 'Frango grelhado, arroz integral, feijão, salada de folhas com azeite' },
        { tipo: 'Lanche', descricao: 'Iogurte natural sem açúcar com maçã' },
        { tipo: 'Jantar', descricao: 'Sopa de legumes com frango desfiado, pão integral' },
      ],
    },
    {
      dia: 'Terça',
      refeicoes: [
        { tipo: 'Café da manhã', descricao: 'Omelete de 2 ovos com espinafre, pão integral, chá sem açúcar' },
        { tipo: 'Almoço', descricao: 'Peixe assado, quinoa, brócolis no vapor, cenoura' },
        { tipo: 'Lanche', descricao: 'Castanhas (30g) e uma pera' },
        { tipo: 'Jantar', descricao: 'Salada de atum, batata-doce cozida, salada verde' },
      ],
    },
    {
      dia: 'Quarta',
      refeicoes: [
        { tipo: 'Café da manhã', descricao: 'Tapioca com ricota e tomate, suco de laranja natural (sem açúcar)' },
        { tipo: 'Almoço', descricao: 'Carne moída refogada, arroz integral, lentilha, couve refogada' },
        { tipo: 'Lanche', descricao: 'Vitamina de abacate com leite desnatado (sem açúcar)' },
        { tipo: 'Jantar', descricao: 'Frango ensopado com legumes, pão integral' },
      ],
    },
  ],
}
