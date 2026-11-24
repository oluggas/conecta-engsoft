// Estado Global da Aplicação
const appState = {
  user: {
    email: '',
    name: 'Estudante',
    period: '1º Período',
    routine: 'Dedicação integral aos estudos',
    goal: 'base',
    motivation: 3
  },
  activities: [],
  mvpFeedbacks: [],
  activeChatChannel: 'geral',
  chatMessages: {
    geral: [
      {
        sender: 'Pedro Henrique',
        period: '1º Período',
        role: 'calouro',
        time: '18:10',
        text: 'Pessoal, confesso que bateu um nervosismo nessa primeira semana vendo a ementa de Cálculo e Algoritmos. É normal?'
      },
      {
        sender: 'Rafael Almeida',
        period: '6º Período',
        role: 'veterano',
        time: '18:12',
        text: 'Super normal, Pedro! Todo mundo sente esse choque no começo. Cola nos plantões de nivelamento de segunda e quarta que a gente revisa a base passo a passo.'
      },
      {
        sender: 'Beatriz Lima',
        period: '5º Período',
        role: 'veterano',
        time: '18:14',
        text: 'E se quiser um apadrinhamento individual, solicita na aba de Mentoria! Estou acompanhando dois calouros este semestre.'
      }
    ],
    calculo: [
      {
        sender: 'Camila Rocha',
        period: '2º Período',
        role: 'calouro',
        time: '17:40',
        text: 'Alguém tem dica de onde treinar lógica de programação além das listas da aula?'
      },
      {
        sender: 'Beatriz Lima',
        period: '5º Período',
        role: 'veterano',
        time: '17:45',
        text: 'Recomendo começar pelos exercícios de nível 1 no Beecrowd e assistir às videoaulas expressas aqui no módulo de Nivelamento!'
      }
    ],
    estagio: [
      {
        sender: 'Rafael Almeida',
        period: '6º Período',
        role: 'veterano',
        time: '16:20',
        text: 'Pessoal, a Empresa Júnior abriu processo trainee aceitando alunos desde o 1º período. Ótimo pra colocar projeto real no currículo!'
      },
      {
        sender: 'Pedro Henrique',
        period: '1º Período',
        role: 'calouro',
        time: '16:25',
        text: 'Mesmo sem saber programar muito ainda dá pra entrar como trainee?'
      },
      {
        sender: 'Rafael Almeida',
        period: '6º Período',
        role: 'veterano',
        time: '16:27',
        text: 'Com certeza! O foco lá é aprender na prática com mentoria dos veteranos e professores.'
      }
    ]
  }
};

// Mapas de Textos e Configurações Personalizadas
const goalLabels = {
  base: 'Sobreviver às matérias de base (Cálculo e Lógica)',
  pratica: 'Conectar o curso com a prática e estágios',
  mentoria: 'Mentoria e troca entre veteranos e calouros',
  financeiro: 'Bolsas, auxílios e flexibilidade de horário',
  emocional: 'Acolhimento emocional e orientação vocacional'
};

const motivationLabels = {
  1: '1 - Muito Baixa (Precisando de apoio)',
  2: '2 - Baixa (Inseguro com o curso)',
  3: '3 - Moderada (Em adaptação)',
  4: '4 - Boa (Confiante)',
  5: '5 - Alta (Totalmente engajado)'
};

// Navegação entre Etapas (Login -> Formulário -> Dashboard)
function goToStep(stepName) {
  document.getElementById('step-login').classList.add('hidden');
  document.getElementById('step-onboarding').classList.add('hidden');
  document.getElementById('step-dashboard').classList.add('hidden');

  const target = document.getElementById(`step-${stepName}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Submit Etapa 1: Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  if (!email) return;
  appState.user.email = email;
  goToStep('onboarding');
});

// Controle dos botões de Motivação na Etapa 2
function setMotivation(val) {
  appState.user.motivation = val;
  document.getElementById('motivationLabel').textContent = motivationLabels[val];

  document.querySelectorAll('.mot-btn').forEach(btn => {
    const btnVal = parseInt(btn.getAttribute('data-val'), 10);
    if (btnVal === val) {
      btn.className = 'mot-btn py-2.5 rounded-xl border-2 border-teal-500 bg-teal-50 text-xs sm:text-sm font-bold text-teal-800 transition cursor-pointer';
    } else {
      btn.className = 'mot-btn py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-600 hover:border-teal-400 transition cursor-pointer';
    }
  });
}

// Submit Etapa 2: Formulário de Diagnóstico
document.getElementById('onboardingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const period = document.getElementById('studentPeriod').value;
  const routine = document.querySelector('input[name="routine"]:checked').value;
  const goal = document.querySelector('input[name="purpose"]:checked').value;

  appState.user.name = name || 'Estudante';
  appState.user.period = period;
  appState.user.routine = routine;
  appState.user.goal = goal;

  renderDashboard();
  goToStep('dashboard');
  showToast(`Bem-vindo(a), ${appState.user.name}! Seu painel foi personalizado.`, 'success');
});

// Renderização Personalizada do Dashboard (Etapa 3)
function renderDashboard() {
  const { name, email, period, routine, goal, motivation } = appState.user;

  document.getElementById('dashStudentName').textContent = name;
  document.getElementById('headerPeriodBadge').textContent = period;
  document.getElementById('dashRoutine').textContent = routine;
  document.getElementById('dashMotivation').textContent = `${motivation}/5`;
  document.getElementById('dashGoalBadge').textContent = goalLabels[goal];

  // Atualizar Bolinha de Perfil e Menu Dropdown
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('') || 'ES';

  const isInitialPeriod = ['1º Período', '2º Período', '3º Período'].includes(period);
  const roleTag = isInitialPeriod ? `Calouro • ${period}` : `Veterano • ${period}`;

  document.getElementById('profileAvatarInitials').textContent = initials;
  document.getElementById('navProfileName').textContent = name;
  document.getElementById('navProfileRole').textContent = roleTag;
  document.getElementById('dropdownStudentName').textContent = name;
  document.getElementById('dropdownPeriodBadge').textContent = period;
  document.getElementById('dropdownStudentEmail').textContent = email || 'aluno@catolica-to.edu.br';
  document.getElementById('dropdownStudentGoal').textContent = goalLabels[goal];

  // Personalizar Banner Principal conforme Objetivo e Período
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerDesc = document.getElementById('bannerDescription');
  const bannerBtn = document.getElementById('bannerCtaBtn');
  const bannerText = document.getElementById('bannerCtaText');
  const bannerTag = document.getElementById('bannerTag');

  if (goal === 'base' || (isInitialPeriod && goal !== 'pratica' && goal !== 'financeiro' && goal !== 'emocional')) {
    bannerTag.textContent = `Trilha Recomendada • ${period}`;
    bannerTitle.textContent = 'Supere o choque inicial em Cálculo, Lógica e Algoritmos!';
    bannerDesc.textContent = 'Não enfrente as disciplinas de base sozinho(a). Conecte-se agora com nossos monitores de nivelamento e peça um veterano padrinho para guiar seus estudos.';
    bannerText.textContent = 'Acessar Nivelamento & Monitoria';
    bannerBtn.onclick = () => openModal('nivelamento');
  } else if (goal === 'pratica') {
    bannerTag.textContent = `Foco em Carreira • ${period}`;
    bannerTitle.textContent = 'Conecte a Engenharia de Software com o Mercado Real';
    bannerDesc.textContent = 'Explore vagas de estágio com empresas parceiras, entre na Empresa Júnior ou participe de projetos práticos guiados desde os primeiros semestres.';
    bannerText.textContent = 'Ver Projetos & Estágios';
    bannerBtn.onclick = () => openModal('mercado');
  } else if (goal === 'mentoria') {
    bannerTag.textContent = `Comunidade & Apoio • ${period}`;
    bannerTitle.textContent = isInitialPeriod ? 'Encontre um Veterano Padrinho para te guiar!' : 'Seja um Veterano Mentor e ajude calouros a não desistirem!';
    bannerDesc.textContent = 'A troca entre quem está começando e quem já avançou na graduação reduz a evasão e fortalece toda a nossa comunidade acadêmica.';
    bannerText.textContent = 'Acessar Programa de Mentoria';
    bannerBtn.onclick = () => openModal('mentoria');
  } else if (goal === 'financeiro') {
    bannerTag.textContent = `Permanência Estudantil • ${period}`;
    bannerTitle.textContent = 'Bolsas de Monitoria, Auxílios e Flexibilidade Acadêmica';
    bannerDesc.textContent = 'Sabemos que conciliar trabalho e mensalidade é um desafio. Confira os editais abertos e fale com a coordenação sobre flexibilização.';
    bannerText.textContent = 'Consultar Bolsas e Auxílios';
    bannerBtn.onclick = () => openModal('financeiro');
  } else {
    bannerTag.textContent = `Acolhimento Integral • ${period}`;
    bannerTitle.textContent = 'Você não está sozinho(a) na sua jornada universitária';
    bannerDesc.textContent = 'Agende uma conversa gratuita e sigilosa com nosso setor psicopedagógico para organizar seus estudos e fortalecer sua confiança.';
    bannerText.textContent = 'Falar com Apoio Psicopedagógico';
    bannerBtn.onclick = () => openModal('psicopedagogico');
  }

  // Alerta preventivo se motivação for baixa (1 ou 2)
  const alertBox = document.getElementById('lowMotivationAlert');
  if (motivation <= 2) {
    alertBox.classList.remove('hidden');
  } else {
    alertBox.classList.add('hidden');
  }

  // Renderizar mensagens do chat
  renderChatMessages();
}

// Controle da Bolinha de Perfil (Dropdown)
function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.classList.toggle('hidden');
}

function closeProfileDropdown() {
  document.getElementById('profileDropdown').classList.add('hidden');
}

// Lógica do Chat entre Veteranos e Novatos
function switchChatChannel(channel) {
  appState.activeChatChannel = channel;
  document.querySelectorAll('.chat-tab').forEach(tab => {
    if (tab.getAttribute('data-channel') === channel) {
      tab.className = 'chat-tab px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 shadow-sm whitespace-nowrap transition cursor-pointer';
    } else {
      tab.className = 'chat-tab px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 text-slate-200 hover:bg-white/20 whitespace-nowrap transition cursor-pointer';
    }
  });
  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById('chatMessagesContainer');
  const messages = appState.chatMessages[appState.activeChatChannel] || [];

  container.innerHTML = messages.map(msg => {
    const isCurrentUser = msg.isMe;
    const badgeStyle = msg.role === 'veterano'
      ? 'bg-indigo-100 text-indigo-800'
      : 'bg-teal-100 text-teal-800';
    const roleLabel = msg.role === 'veterano'
      ? `Veterano (${msg.period})`
      : `Calouro (${msg.period})`;

    if (isCurrentUser) {
      return `
        <div class="flex flex-col items-end fade-in">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] text-slate-400">${msg.time}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}">${roleLabel}</span>
            <span class="text-xs font-bold text-slate-800">${msg.sender} (Você)</span>
          </div>
          <div class="max-w-[85%] sm:max-w-[75%] bg-indigo-900 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs sm:text-sm shadow-sm">
            ${msg.text}
          </div>
        </div>
      `;
    }

    return `
      <div class="flex flex-col items-start fade-in">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-slate-800">${msg.sender}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}">${roleLabel}</span>
          <span class="text-[10px] text-slate-400">${msg.time}</span>
        </div>
        <div class="max-w-[85%] sm:max-w-[75%] bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl rounded-tl-sm text-xs sm:text-sm shadow-sm">
          ${msg.text}
        </div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

document.getElementById('chatForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const { name, period } = appState.user;
  const isInitial = ['1º Período', '2º Período', '3º Período'].includes(period);
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  appState.chatMessages[appState.activeChatChannel].push({
    sender: name,
    period: period,
    role: isInitial ? 'calouro' : 'veterano',
    time: timeStr,
    text: text,
    isMe: true
  });

  input.value = '';
  renderChatMessages();

  // Resposta simulada contextual de um veterano ou calouro
  const typing = document.getElementById('chatTypingIndicator');
  typing.classList.remove('hidden');

  setTimeout(() => {
    typing.classList.add('hidden');
    const replyTime = new Date();
    const replyTimeStr = `${String(replyTime.getHours()).padStart(2, '0')}:${String(replyTime.getMinutes()).padStart(2, '0')}`;

    const replyMsg = isInitial
      ? {
          sender: 'Beatriz Lima',
          period: '5º Período',
          role: 'veterano',
          time: replyTimeStr,
          text: `Boa pergunta, ${name.split(' ')[0]}! Conte com a gente por aqui. Se quiser revisar isso com calma, hoje às 18h temos plantão de monitoria!`
        }
      : {
          sender: 'Pedro Henrique',
          period: '1º Período',
          role: 'calouro',
          time: replyTimeStr,
          text: `Valeu demais pela força, ${name.split(' ')[0]}! Ajuda muito ouvir a experiência de quem já passou por essa fase.`
        };

    appState.chatMessages[appState.activeChatChannel].push(replyMsg);
    renderChatMessages();
  }, 1100);
});

// Filtro de Cards por Categoria
function filterCards(category) {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    if (tab.getAttribute('data-filter') === category) {
      tab.className = 'filter-tab px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-900 text-white shadow-sm whitespace-nowrap transition cursor-pointer';
    } else {
      tab.className = 'filter-tab px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 whitespace-nowrap transition cursor-pointer';
    }
  });

  document.querySelectorAll('.support-card').forEach(card => {
    const categories = card.getAttribute('data-category');
    if (category === 'all' || categories.includes(category)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Conteúdo Interativo dos Modais de Apoio
const modalConfigs = {
  nivelamento: {
    title: 'Nivelamento & Monitoria Intensiva',
    subtitle: 'Combate às reprovações nas disciplinas de base',
    icon: 'fa-square-root-variable',
    html: `
      <div class="bg-teal-50 border border-teal-200 rounded-2xl p-4">
        <h4 class="font-bold text-teal-950 text-sm mb-1">Trilhas de Nivelamento Disponíveis</h4>
        <p class="text-xs text-teal-800">Material prático preparado por professores e monitores para revisar a base antes das provas.</p>
      </div>
      <div class="space-y-3">
        <div class="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
          <div>
            <p class="font-bold text-slate-900">1. Pré-Cálculo e Funções sem Mistério</p>
            <p class="text-xs text-slate-500">6 videoaulas expressas + Lista resolvida • Monitor: Marcos (5º P.)</p>
          </div>
          <button type="button" onclick="registerActivity('Trilha: Pré-Cálculo e Funções')" class="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer">Iniciar</button>
        </div>
        <div class="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
          <div>
            <p class="font-bold text-slate-900">2. Lógica de Programação do Zero</p>
            <p class="text-xs text-slate-500">Exercícios guiados em Python/Portugol • Monitora: Júlia (6º P.)</p>
          </div>
          <button type="button" onclick="registerActivity('Trilha: Lógica de Programação')" class="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer">Iniciar</button>
        </div>
        <div class="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
          <div>
            <p class="font-bold text-slate-900">3. Plantão Presencial / Online de Dúvidas</p>
            <p class="text-xs text-slate-500">Segundas e Quartas, das 17h30 às 19h00 (Lab. 03 e Meet)</p>
          </div>
          <button type="button" onclick="registerActivity('Plantão de Monitoria (Seg/Qua)')" class="px-3 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer">Agendar</button>
        </div>
      </div>
    `
  },
  mentoria: {
    title: 'Mentoria Veterano-Calouro',
    subtitle: 'Ninguém solta a mão de ninguém na EngSoft',
    icon: 'fa-people-arrows',
    html: `
      <p class="text-xs sm:text-sm text-slate-600">
        Conectamos calouros (1º ao 3º período) com veteranos experientes para tirar dúvidas sobre disciplinas, professores, organização de estudos e vida acadêmica.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 space-y-2">
          <span class="text-[11px] font-bold uppercase text-indigo-700">Para quem está começando</span>
          <h4 class="font-bold text-slate-900">Quero um Veterano Padrinho</h4>
          <p class="text-xs text-slate-600">Receba acompanhamento semanal de um veterano que já passou pelas mesmas matérias.</p>
          <button type="button" onclick="registerActivity('Solicitação de Veterano Padrinho')" class="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl mt-2 cursor-pointer">Solicitar Padrinho</button>
        </div>
        <div class="p-4 rounded-2xl border border-teal-200 bg-teal-50/50 space-y-2">
          <span class="text-[11px] font-bold uppercase text-teal-700">Para períodos avançados</span>
          <h4 class="font-bold text-slate-900">Quero ser Mentor Voluntário</h4>
          <p class="text-xs text-slate-600">Ajude calouros a não desistirem e ganhe certificado de 30h de atividades complementares.</p>
          <button type="button" onclick="registerActivity('Inscrição: Veterano Mentor (30h)')" class="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl mt-2 cursor-pointer">Ser Mentor</button>
        </div>
      </div>
    `
  },
  mercado: {
    title: 'Conexão Mercado & Projetos Práticos',
    subtitle: 'Aplicação real da Engenharia de Software desde o início',
    icon: 'fa-laptop-code',
    html: `
      <div class="space-y-3">
        <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">Aberto a todos os períodos</span>
            <span class="text-xs text-slate-400">Empresa Júnior</span>
          </div>
          <h4 class="font-bold text-slate-900">Fábrica de Software & Empresa Júnior</h4>
          <p class="text-xs text-slate-600 mt-1">Desenvolva sistemas reais em equipe com supervisão de professores, mesmo sem experiência prévia.</p>
          <button type="button" onclick="registerActivity('Inscrição: Fábrica de Software / EJ')" class="mt-3 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold rounded-xl cursor-pointer">Participar da Seleção</button>
        </div>

        <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">Convênio Empresas Parceiras</span>
            <span class="text-xs text-slate-400">Bolsa Estágio</span>
          </div>
          <h4 class="font-bold text-slate-900">Programa Primeiro Estágio Tech</h4>
          <p class="text-xs text-slate-600 mt-1">Vagas de estágio remoto e presencial em desenvolvimento web, QA e suporte técnico.</p>
          <button type="button" onclick="registerActivity('Candidatura: Programa Primeiro Estágio')" class="mt-3 px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl cursor-pointer">Candidatar-se às Vagas</button>
        </div>
      </div>
    `
  },
  psicopedagogico: {
    title: 'Apoio Psicopedagógico & Orientação',
    subtitle: 'Acolhimento emocional e planejamento de estudos',
    icon: 'fa-heart-pulse',
    html: `
      <div class="bg-rose-50 border border-rose-200 rounded-2xl p-4">
        <h4 class="font-bold text-rose-950 text-sm">Atendimento Humanizado e Sigiloso</h4>
        <p class="text-xs text-rose-800 mt-1">
          Sentindo sobrecarga, ansiedade com avaliações ou dúvida se Engenharia de Software é para você? Nossa equipe ajuda você a construir um plano leve e possível.
        </p>
      </div>
      <div class="space-y-3">
        <button type="button" onclick="registerActivity('Sessão: Apoio Psicopedagógico Individual')" class="w-full p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 text-left flex items-center justify-between transition cursor-pointer">
          <div>
            <p class="font-bold text-slate-900">Agendar Escuta Psicológica / Psicopedagógica</p>
            <p class="text-xs text-slate-500">Atendimento online ou presencial no campus</p>
          </div>
          <i class="fa-solid fa-calendar-plus text-rose-600 text-lg"></i>
        </button>
        <button type="button" onclick="registerActivity('Mentoria: Organização de Rotina para Trabalhadores')" class="w-full p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 text-left flex items-center justify-between transition cursor-pointer">
          <div>
            <p class="font-bold text-slate-900">Plano de Estudos para Quem Trabalha</p>
            <p class="text-xs text-slate-500">Técnicas para otimizar pouco tempo livre sem perder rendimento</p>
          </div>
          <i class="fa-solid fa-clock text-rose-600 text-lg"></i>
        </button>
      </div>
    `
  },
  financeiro: {
    title: 'Bolsas, Auxílios & Flexibilidade',
    subtitle: 'Suporte financeiro e acadêmico para sua permanência',
    icon: 'fa-hand-holding-dollar',
    html: `
      <div class="space-y-3">
        <div class="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60">
          <h4 class="font-bold text-amber-950">Edital de Monitoria Remunerada (Cálculo & Algoritmos)</h4>
          <p class="text-xs text-amber-900 mt-1">Desconto direto na mensalidade para alunos a partir do 2º período aprovados nas disciplinas.</p>
          <button type="button" onclick="registerActivity('Inscrição: Bolsa de Monitoria Remunerada')" class="mt-2.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer">Inscrever-se no Edital</button>
        </div>
        <div class="p-3.5 rounded-xl border border-slate-200">
          <h4 class="font-bold text-slate-900">Solicitação de Flexibilização de Grade (Coordenação)</h4>
          <p class="text-xs text-slate-600 mt-1">Ajuste a quantidade de disciplinas do semestre conforme sua disponibilidade financeira e de trabalho.</p>
          <button type="button" onclick="registerActivity('Atendimento: Flexibilização de Grade')" class="mt-2.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer">Solicitar Orientação</button>
        </div>
      </div>
    `
  },
  comunidade: {
    title: 'Comunidade EngSoft & Ouvidoria',
    subtitle: 'Pertencimento e canal direto com a Coordenação e NDE',
    icon: 'fa-users-rectangle',
    html: `
      <div class="space-y-3">
        <div class="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
          <div>
            <p class="font-bold text-slate-900">Grupo Oficial da Turma (WhatsApp & Discord)</p>
            <p class="text-xs text-slate-500">Avisos rápidos, grupos de estudo e integração com Centro Acadêmico</p>
          </div>
          <button type="button" onclick="registerActivity('Acesso: Comunidade WhatsApp/Discord')" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer">Entrar</button>
        </div>
        <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
          <h4 class="font-bold text-purple-950">Ouvidoria Rápida • Coordenação & NDE</h4>
          <p class="text-xs text-purple-800">Tem alguma dificuldade com metodologia de aula, horário ou infraestrutura? Envie um relato direto.</p>
          <textarea id="ouvidoriaInput" rows="2" placeholder="Escreva sua sugestão ou dificuldade..." class="w-full p-2.5 rounded-xl border border-purple-200 bg-white text-xs focus:outline-none"></textarea>
          <button type="button" onclick="submitOuvidoria()" class="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl cursor-pointer">Enviar para Coordenação</button>
        </div>
      </div>
    `
  }
};

function openModal(moduleKey) {
  const config = modalConfigs[moduleKey];
  if (!config) return;

  document.getElementById('modalTitle').textContent = config.title;
  document.getElementById('modalSubtitle').textContent = config.subtitle;
  document.getElementById('modalIcon').className = `fa-solid ${config.icon}`;
  document.getElementById('modalBody').innerHTML = config.html;

  document.getElementById('moduleModal').classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

// Registrar Ação/Agendamento no Painel do Aluno
function registerActivity(activityName) {
  if (!appState.activities.includes(activityName)) {
    appState.activities.push(activityName);
  }
  renderActivities();
  closeModal('moduleModal');
  showToast(`Confirmado: "${activityName}" adicionado ao seu painel!`, 'success');
}

function submitOuvidoria() {
  const text = document.getElementById('ouvidoriaInput').value.trim();
  if (!text) {
    showToast('Por favor, escreva sua mensagem antes de enviar.', 'warning');
    return;
  }
  registerActivity('Relato enviado à Ouvidoria da Coordenação');
}

function renderActivities() {
  const section = document.getElementById('myActivitiesSection');
  const list = document.getElementById('activitiesList');
  const count = document.getElementById('activitiesCount');

  if (appState.activities.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  count.textContent = `${appState.activities.length} ativo(s)`;

  list.innerHTML = appState.activities.map(item => `
    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
        <i class="fa-solid fa-check"></i>
      </div>
      <span class="text-xs font-semibold text-slate-800">${item}</span>
    </div>
  `).join('');
}

// Validação do MVP (Registro dos 5 testes)
function openMvpFeedbackModal() {
  renderMvpLogs();
  document.getElementById('mvpFeedbackModal').classList.remove('hidden');
}

document.getElementById('mvpFeedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const tester = document.getElementById('testerName').value.trim();
  const decision = document.getElementById('testerDecision').value;
  const notes = document.getElementById('testerNotes').value.trim();

  appState.mvpFeedbacks.push({ tester, decision, notes });
  document.getElementById('mvpCounter').textContent = appState.mvpFeedbacks.length;
  document.getElementById('mvpFeedbackForm').reset();
  renderMvpLogs();
  showToast('Teste de validação do MVP registrado com sucesso!', 'success');
});

function renderMvpLogs() {
  const container = document.getElementById('mvpLogsList');
  if (appState.mvpFeedbacks.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400 text-center py-2">Nenhum teste registrado ainda nesta sessão.</p>';
    return;
  }
  container.innerHTML = appState.mvpFeedbacks.map((log, idx) => `
    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
      <div class="flex justify-between font-bold text-slate-800">
        <span>#${idx + 1} • ${log.tester}</span>
        <span class="text-teal-700">${log.decision}</span>
      </div>
      <p class="text-slate-600 mt-1">${log.notes}</p>
    </div>
  `).join('');
}

// Sair do Cadastro / Encerrar Sessão
function logoutAndClear() {
  appState.user = {
    email: '',
    name: 'Estudante',
    period: '1º Período',
    routine: 'Dedicação integral aos estudos',
    goal: 'base',
    motivation: 3
  };
  appState.activities = [];
  document.getElementById('loginForm').reset();
  document.getElementById('onboardingForm').reset();
  document.getElementById('myActivitiesSection').classList.add('hidden');
  setMotivation(3);
  goToStep('login');
  showToast('Cadastro encerrado e sessão limpa.', 'info');
}

// Sistema de Notificações Toast (Sem alert())
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');

  const colors = {
    success: 'bg-slate-900 border-teal-500 text-white',
    info: 'bg-indigo-950 border-indigo-400 text-white',
    warning: 'bg-amber-900 border-amber-400 text-white'
  };

  const icons = {
    success: 'fa-circle-check text-teal-400',
    info: 'fa-circle-info text-indigo-300',
    warning: 'fa-triangle-exclamation text-amber-300'
  };

  toast.className = `pointer-events-auto border-l-4 ${colors[type] || colors.info} px-4 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium fade-in`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || icons.info} text-base shrink-0"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3600);
}

// Fechar modais e dropdown ao clicar fora
window.addEventListener('click', function(e) {
  if (e.target.id === 'moduleModal') closeModal('moduleModal');
  if (e.target.id === 'mvpFeedbackModal') closeModal('mvpFeedbackModal');

  const profileWrapper = document.getElementById('profileMenuWrapper');
  if (profileWrapper && !profileWrapper.contains(e.target)) {
    closeProfileDropdown();
  }
});
