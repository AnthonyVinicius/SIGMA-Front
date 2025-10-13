import {
  Hand,
  CircleAlert,
  Clock,
  CircleCheck,
  TextAlignJustify,
  MapPin,
  Cog,
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
    location: "Banheiro - 2º Andar",
    statusIcon: CircleAlert,
    statusColor: "text-red-500",
    date: "21/08/2025",
  },
  {
    id: 2,
    icon: Hand,
    title: "Projetor da Sala 203",
    description: "Imagem sem sinal",
    location: "Bloco B - Sala 203",
    statusIcon: Clock,
    statusColor: "text-yellow-500",
    date: "19/08/2025",
  },
  {
    id: 3,
    icon: Hand,
    title: "Ar-condicionado",
    description: "Não resfria",
    location: "Auditório Principal",
    statusIcon: CircleCheck,
    statusColor: "text-green-500",
    date: "15/08/2025",
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
