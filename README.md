<div align="center">

# 🎓 Conecta EngSoft

### Programa de Retenção e Permanência Estudantil — Engenharia de Software

*Acolhimento, nivelamento e conexão com o mercado desde o 1º período.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/status-MVP_em_validação-teal)

</div>

---

## 📌 Sobre o projeto

O **Conecta EngSoft** é um portal web que centraliza ações de apoio ao estudante do curso de **Engenharia de Software**, com foco em reduzir a **evasão** e a **desistência**, que se concentram nos primeiros períodos da graduação.

A plataforma faz um diagnóstico rápido do aluno (período, rotina, objetivo e nível de motivação) e, a partir dele, monta um painel personalizado com o apoio mais adequado ao seu momento: monitoria, mentoria, estágio, apoio psicopedagógico, auxílios financeiros ou comunidade.

---

## 🧩 O problema

> **O estudante de Engenharia de Software dos períodos iniciais** precisa de uma maneira de **obter maior apoio e incentivos, como programas de estágio na prática**, porque **sofre um choque de realidade com as reprovações e corre o risco de perder tempo e dinheiro**, mas atualmente **enfrenta falta de flexibilidade e dificuldade em conectar o início do curso com a realidade do mercado**.

| Aspecto | Descrição |
|---|---|
| **Quem enfrenta** | Estudantes do curso de Engenharia de Software e a própria instituição de ensino |
| **Quando ocorre** | Com maior intensidade do **1º ao 3º período** |
| **O que acontece** | "Choque de realidade" com alto índice de reprovação em matemática, cálculo e lógica, levando à desmotivação e à evasão antes da metade do curso |
| **Soluções atuais** | Eventos de acolhimento e maior flexibilidade de professores e coordenação, insuficientes para conter a evasão |
| **Consequência para o aluno** | Perda de tempo, frustração com a escolha profissional e prejuízo financeiro |
| **Consequência para a instituição** | Esvaziamento das salas de aula, perda de receita e impacto na reputação acadêmica |
| **Indícios** | Turmas cheias no 1º período e esvaziadas no 7º e 8º; a taxa de desistência acumulada em cursos de tecnologia e engenharia na rede privada chega a **64,7% em um ciclo de 4 anos** |

**Ainda a investigar:** o peso real de cada causa na nossa instituição (fator **financeiro**, **desilusão** com a grade curricular ou percepção de **qualidade**).

---

## ✨ Funcionalidades

### 1. Acesso e diagnóstico
- **Login** com e-mail institucional ou matrícula (simulado no MVP).
- **Formulário de diagnóstico** com:
  - nome ou apelido;
  - período cursado (1º ao 8º);
  - rotina (dedicação integral, trabalho meio período/estágio ou trabalho integral);
  - **propósito no portal**: superar disciplinas de base, conectar com a prática, ter um mentor, buscar apoio financeiro ou acolhimento emocional;
  - **nível de motivação** de 1 a 5.

### 2. Painel personalizado
- Saudação com resumo do perfil e **foco principal** definido.
- **Banner de recomendação prioritária** que muda conforme o objetivo e o período do aluno.
- **Alerta preventivo** quando a motivação informada é baixa (1 ou 2).
- Perfil com distinção entre **calouro** (1º ao 3º período) e **veterano**.
- Seção **"Minhas Ações"** com tudo o que o aluno agendou ou solicitou.

### 3. Pilares de apoio e permanência

| Módulo | O que oferece |
|---|---|
| 📐 **Nivelamento & Monitoria Intensiva** | Combate às reprovações em Cálculo, Matemática, Lógica e Programação |
| 🤝 **Mentoria Veterano-Calouro** | Apadrinhamento entre alunos veteranos e calouros |
| 💼 **Conexão Mercado & Projetos Práticos** | Estágios, Empresa Júnior e projetos reais desde o início do curso |
| 🧠 **Apoio Psicopedagógico & Orientação** | Acolhimento emocional, orientação vocacional e planejamento de estudos |
| 💰 **Bolsas, Auxílios & Flexibilidade** | Suporte financeiro e acadêmico para conciliar estudo, trabalho e mensalidade |
| 💬 **Comunidade EngSoft & Ouvidoria** | Pertencimento e canal direto com a Coordenação e o NDE |

### 4. Comunidade
- **Chat da comunidade** entre veteranos e novatos, com canais: **Geral**, **Cálculo** e **Estágio**.
- **Ouvidoria** para o aluno enviar sugestões e relatar dificuldades à coordenação.

### 5. Validação do MVP
- Módulo para registrar os testes com o público-alvo (nome do testador, decisão e observações) e acompanhar quantos já foram realizados.

---

## 🗂️ Estrutura do repositório

```
conecta-engsoft/
├── index.html        # Estrutura da página (telas de login, diagnóstico e painel)
├── css/
│   └── style.css     # Estilos customizados (fonte, animações, scrollbar)
├── js/
│   └── app.js        # Lógica: estado, navegação entre telas, painel, chat, modais e toasts
└── README.md
```

---

## 🛠️ Tecnologias

- **HTML5**, **CSS3** e **JavaScript** (sem framework e sem etapa de build)
- [**Tailwind CSS**](https://tailwindcss.com/) via CDN
- [**Font Awesome 6**](https://fontawesome.com/) para ícones
- [**Google Fonts**](https://fonts.google.com/): Inter

---

## 🚀 Como executar

Não há dependências para instalar.

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 2. Entre na pasta
cd SEU-REPOSITORIO

# 3. Abra o index.html no navegador
```

Também é possível servir a pasta localmente, por exemplo com `python -m http.server 8000` e acessando `http://localhost:8000`.

> ⚠️ É necessária conexão com a internet, pois Tailwind, Font Awesome e Google Fonts são carregados por CDN.

---

## ⚠️ Limitações do MVP

Esta versão é um **protótipo de front-end** para validação com o público-alvo:

- O login é **simulado**: não há autenticação nem backend.
- Os dados (perfil, ações, mensagens do chat e testes do MVP) ficam **apenas em memória** e são perdidos ao recarregar a página.
- As mensagens do chat e os nomes dos participantes são **dados de exemplo**.

---

## 📊 Modelo de negócios (Canvas)

| Bloco | Resumo |
|---|---|
| **Segmentos de clientes** | Calouros do 1º e 2º períodos; alunos com dificuldade em disciplinas de base; alunos que trabalham; alunos com dificuldades financeiras ou desmotivados; coordenação e instituição; famílias |
| **Propostas de valor** | Reduzir a evasão; identificar cedo alunos em risco; mostrar a aplicação prática do curso desde o 1º período; apoio acadêmico, emocional e vocacional; sensação de pertencimento; mais concluintes e melhor reputação da instituição |
| **Canais** | Ambiente virtual e e-mail institucional; grupos de WhatsApp e redes sociais; atendimento presencial na coordenação; semana de recepção dos calouros; aplicativo ou portal do aluno |
| **Relações com o consumidor** | Acompanhamento personalizado (tutor por turma); atendimento individual; comunidade de estudantes; pesquisas de satisfação; canal de ouvidoria |
| **Atividades-chave** | Diagnóstico dos motivos de evasão; monitoramento de notas, faltas e trancamentos; nivelamento em matemática e programação; mentoria entre veteranos e calouros; projetos práticos desde os primeiros períodos |
| **Recursos principais** | Tutores, monitores e psicopedagogos; base de dados acadêmicos; laboratórios e plataformas online; material de apoio e videoaulas; recursos para bolsas; espaços de convivência |
| **Parceiros-chave** | Coordenação e NDE; professores e monitores; apoio psicopedagógico; centros acadêmicos e atléticas; assistência estudantil; empresas de tecnologia, startups e empresas juniores; ex-alunos; MEC e órgãos de fomento |
| **Estrutura de custos** | Remuneração de tutores e monitores; bolsas de monitoria; plataforma de monitoramento; materiais de nivelamento; eventos de acolhimento; custo oculto da evasão (perda de receita e vagas ociosas) |
| **Fluxos de receita** | Mensalidades preservadas pela permanência; verba institucional para programas de permanência; editais e fomento; parcerias com empresas de tecnologia; bolsas e convênios de estágio; melhores indicadores nas avaliações do MEC |

---

## 🗺️ Próximos passos

- [ ] Concluir a investigação das causas reais da evasão na instituição (financeiro, desilusão ou qualidade)
- [ ] Concluir a validação do MVP com o público-alvo
- [ ] Implementar autenticação real e backend com banco de dados
- [ ] Integrar com os dados acadêmicos (notas, faltas e trancamentos) para identificar alunos em risco
- [ ] Persistir o chat, a ouvidoria e as ações do aluno
- [ ] Criar um painel para a coordenação e o NDE acompanharem os indicadores

---

## 👥 Equipe

| Integrante |
|---|
| Samuel Rodrigues |
| João Henrique |
| Jamerson |
| Pedro Lucas |

---

<div align="center">

Projeto acadêmico • Programa de Permanência Estudantil • Engenharia de Software

</div>
