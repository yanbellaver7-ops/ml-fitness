export const mockUser = {
  name: 'Jesika Jesi',
  badge: 'Usuário Premium',
  avatar: '/images/avatar.jpg',
}

export const mockStats = [
  { label: 'Passos', value: '9.800', meta: '10.000', unit: 'passos', metaUnit: 'passos' },
  { label: 'Kcal consumidas', value: '2.600', meta: '5.000', unit: 'kcal', metaUnit: 'kcal' },
  { label: 'Treinos Concluídos', value: '4', meta: '14', unit: 'treinos', metaUnit: 'treinos' },
]

export const mockWorkouts = [
  { id: 1, title: 'Força Total e Condicionamento Intenso', duration: '32min', type: 'HIIT', status: 'done', progress: 100 },
  { id: 2, title: 'Cardio e Resistência Muscular', duration: '45min', type: 'Cardio', status: 'partial', progress: 25 },
  { id: 3, title: 'Treino Funcional de Alta Intensidade', duration: '28min', type: 'Funcional', status: 'pending', progress: 0 },
]

export const mockNutrition = {
  consumed: 648,
  total: 2181,
  target: 2500,
  goal: 2000,
  todayProgress: { calories: 1014, max: 1220, percent: 83 },
  macros: [
    { label: 'Carboidratos', current: 23, max: 72, unit: 'g', color: '#F97316' },
    { label: 'Proteína', current: 15, max: 20, unit: 'g', color: '#6B7280' },
    { label: 'Gordura', current: 125, max: 220, unit: 'g', color: '#EF4444' },
  ],
  weeklyProgress: [
    { day: 'S', done: true },
    { day: 'T', done: false },
    { day: 'Q', done: true },
    { day: 'Q', done: false },
    { day: 'S', done: true },
    { day: 'S', done: true },
    { day: 'D', done: true },
  ],
  history: [
    { id: 1, name: 'Aveia Matinal', kcal: 285, date: '23 Jan' },
    { id: 2, name: 'Almoço Proteico', kcal: 540, date: '23 Jan' },
    { id: 3, name: 'Lanche da Tarde', kcal: 180, date: '22 Jan' },
  ],
  aiMessage: 'Você está no caminho certo para sua meta de calorias hoje! Continue assim, tá bom!',
}

export const mockPost = {
  user: 'Makise Kurisu',
  verified: true,
  time: 'Postado há 3min',
  text: 'Acabei de fazer uma sessão rápida de HIIT com a galera! Não esqueçam de se hidratar, pessoal! 💧',
  hashtags: ['#DesafioHidratação', '#BebaMaisÁgua'],
  image: '/images/workout-group.jpg',
  stats: { duration: '52 Minutos', kcal: '128 kcal', points: '3 Pontos' },
  engagement: { views: '5.874', likes: '215', comments: '11' },
}

export const mockCalendarDays = [
  { day: 'Sáb', num: 26, active: false },
  { day: 'Dom', num: 26, active: false },
  { day: 'Seg', num: 26, active: false },
  { day: 'Ter', num: 25, active: true },
  { day: 'Qua', num: 26, active: false },
  { day: 'Qui', num: 26, active: false },
  { day: 'Sex', num: 26, active: false },
]
