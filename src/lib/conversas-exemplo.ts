import type { Category, Conversation, MessageRole } from "@/lib/types";

// Conversas fictícias com pessoas e emails de teste do TimeTrack (docs/timetrack-api.md)

const MINUTE = 60_000;

interface SampleMessage {
  role: MessageRole;
  text: string;
  minutesAgo: number;
}

interface SampleConversation {
  id: string;
  title: string;
  customerName: string;
  customerEmail: string;
  category: Category;
  messages: SampleMessage[];
}

const SAMPLES: SampleConversation[] = [
  {
    id: "conv-joao",
    title: "Conta bloqueada após tentativas de senha",
    customerName: "João Silva",
    customerEmail: "joao.silva@acme.com.br",
    category: "acesso",
    messages: [
      {
        role: "user",
        text: "Oi, não consigo entrar no TimeTrack. Aparece que minha conta está bloqueada.",
        minutesAgo: 9,
      },
      {
        role: "assistant",
        text: "Olá, João! Sua conta foi bloqueada depois de 5 tentativas de senha incorreta. Quer que eu envie um email para você redefinir a senha?",
        minutesAgo: 8,
      },
      { role: "user", text: "Quero sim, por favor.", minutesAgo: 5 },
    ],
  },
  {
    id: "conv-maria",
    title: "Batidas do dia 12 sumiram do relatório",
    customerName: "Maria Costa",
    customerEmail: "maria.costa@techcorp.com",
    category: "dados",
    messages: [
      {
        role: "user",
        text: "As batidas de ponto do dia 12 sumiram do relatório da minha equipe.",
        minutesAgo: 31,
      },
      {
        role: "assistant",
        text: "Entendi, Maria. Vou registrar um chamado para a equipe verificar as batidas do dia 12. Quantas pessoas foram afetadas?",
        minutesAgo: 30,
      },
      {
        role: "user",
        text: "Pelo menos 8 pessoas do setor de vendas.",
        minutesAgo: 25,
      },
    ],
  },
  {
    id: "conv-rafael",
    title: "Erro na exportação para a folha de pagamento",
    customerName: "Rafael Souza",
    customerEmail: "rafael.souza@logistica-sul.com.br",
    category: "integracao",
    messages: [
      {
        role: "user",
        text: "A exportação para o sistema de folha de pagamento está dando erro 500 desde ontem.",
        minutesAgo: 130,
      },
      {
        role: "assistant",
        text: "Obrigado por avisar, Rafael. Abri o chamado TT-2026-001531 com prioridade alta para o time de integrações.",
        minutesAgo: 128,
      },
    ],
  },
  {
    id: "conv-pedro",
    title: "Conta pendente de ativação",
    customerName: "Pedro Santos",
    customerEmail: "pedro@startup.io",
    category: "duvida",
    messages: [
      {
        role: "user",
        text: "Criei minha conta, mas ela aparece como pendente. O que falta fazer?",
        minutesAgo: 320,
      },
      {
        role: "assistant",
        text: "Oi, Pedro! Sua conta está aguardando a confirmação do email. Procure a mensagem do TimeTrack na caixa de entrada ou no spam e clique no link de confirmação.",
        minutesAgo: 318,
      },
    ],
  },
  {
    id: "conv-fernanda",
    title: "Aplicativo fecha ao registrar o ponto",
    customerName: "Fernanda Lima",
    customerEmail: "fernanda.lima@clinicavida.com.br",
    category: "bug",
    messages: [
      {
        role: "user",
        text: "O aplicativo fecha sozinho quando tento bater o ponto pelo celular.",
        minutesAgo: 1_560,
      },
      {
        role: "assistant",
        text: "Sinto muito pelo transtorno, Fernanda. Você usa Android ou iPhone? E qual é a versão do aplicativo?",
        minutesAgo: 1_558,
      },
      { role: "user", text: "Android, versão 3.2.1.", minutesAgo: 1_550 },
    ],
  },
  {
    id: "conv-ana",
    title: "Sugestão: exportar espelho de ponto em Excel",
    customerName: "Ana Ribeiro",
    customerEmail: "ana.ribeiro@pequenosnegocios.com.br",
    category: "feature",
    messages: [
      {
        role: "user",
        text: "Seria ótimo poder exportar o espelho de ponto direto em Excel.",
        minutesAgo: 4_400,
      },
      {
        role: "assistant",
        text: "Ótima sugestão, Ana! Registrei como pedido de melhoria para o time de produto.",
        minutesAgo: 4_395,
      },
    ],
  },
];

function buildConversation(sample: SampleConversation, now: number): Conversation {
  const messages = sample.messages.map((message, index) => ({
    id: `${sample.id}-${index}`,
    role: message.role,
    text: message.text,
    sentAt: now - message.minutesAgo * MINUTE,
  }));

  return {
    id: sample.id,
    title: sample.title,
    customerName: sample.customerName,
    customerEmail: sample.customerEmail,
    category: sample.category,
    createdAt: messages[0]?.sentAt ?? now,
    messages,
  };
}

export function createSampleConversations(now: number): Conversation[] {
  return SAMPLES.map((sample) => buildConversation(sample, now));
}
