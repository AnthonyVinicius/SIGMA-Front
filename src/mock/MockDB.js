import {
  Hand,
  CircleAlert,
  Clock,
  CircleCheck,
  TextAlignJustify,
  MapPin,
  Cog,
  Lightbulb,
  DoorClosed,
  Thermometer,
  Printer,
  Wifi,
} from "lucide-vue-next";

export const statusList = [
  {
    id: 1,
    icon: CircleAlert,
    title: "Chamado em Aberto",
    count: 8,
    color: "text-red-500",
  },
  {
    id: 2,
    icon: Clock,
    title: "Chamado em Andamento",
    count: 3,
    color: "text-yellow-500",
  },
  {
    id: 3,
    icon: CircleCheck,
    title: "Chamado Finalizado",
    count: 14,
    color: "text-green-500",
  },
];

export const recentCalls = [
  {
    id: 1,
    icon: Hand,
    title: "Secador de mãos",
    description: "Não liga",
    location: "Banheiro 2º Andar",
    priority: "Normal",
    counter: 15,
    date: "21/08/2025",
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Lâmpada queimada",
    description: "Lâmpada do corredor não acende",
    location: "Corredor principal - 1º Andar",
    priority: "Alta",
    counter: 8,
    date: "22/08/2025",
  },
  {
    id: 3,
    icon: DoorClosed,
    title: "Fechadura com defeito",
    description: "A porta da sala de servidores não tranca",
    location: "Sala de Servidores - Térreo",
    priority: "Crítica",
    counter: 3,
    date: "20/08/2025",
  },
  {
    id: 4,
    icon: Thermometer,
    title: "Ar-condicionado com vazamento",
    description: "Pingando água próxima à entrada",
    location: "Recepção",
    priority: "Alta",
    counter: 12,
    date: "23/08/2025",
  },
  {
    id: 5,
    icon: Printer,
    title: "Impressora travando",
    description: "Erro de papel atolado constante",
    location: "Setor Administrativo",
    priority: "Normal",
    counter: 9,
    date: "24/08/2025",
  },
  {
    id: 6,
    icon: Wifi,
    title: "Sem conexão Wi-Fi",
    description: "Sinal inexistente no laboratório",
    location: "Laboratório de Informática",
    priority: "Alta",
    counter: 6,
    date: "25/08/2025",
  },
];

export const adminActions = [
  {
    icon: MapPin,
    title: "Gerenciar Locais",
    description: "Adicionar novos locais e gerar QR Code",
    color: "text-green-800",
  },
  {
    icon: Cog,
    title: "Tipos de Itens",
    description: "Gerenciar e cadastrar tipos de itens",
    color: "text-green-800",
  },
  {
    icon: TextAlignJustify,
    title: "Todos os Chamados",
    description: "Visualizar e gerenciar chamados",
    color: "text-green-800",
  },
];

export const chamadosPorPrioridade = {
  labels: ["Alta", "Média", "Baixa"],
  datasets: [
    {
      label: "Chamados",
      data: [8, 12, 5],
      backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
    },
  ],
};

export const chamadosPorStatus = {
  labels: ["Aberto", "Em Andamento", "Concluído"],
  datasets: [
    {
      label: "Chamados",
      data: [10, 7, 8],
      backgroundColor: ["#3b82f6", "#f97316", "#10b981"],
    },
  ],
};

export const chamadosPorLocal = {
  labels: ["Lab. de Informática", "Biblioteca", "Banheiros"],
  datasets: [
    {
      label: "Chamados",
      data: [6, 4, 15],
      backgroundColor: ["#8b5cf6", "#ec4899", "#22d3ee"],
    },
  ],
};
