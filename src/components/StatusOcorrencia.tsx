import type { StatusOcorrencia as Status } from "../types/Ocorrencia";

type StatusOcorrenciaProps = {
  status: Status;
};

const nomesStatus: Record<Status, string> = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  RESOLVIDA: "Resolvida",
};

const coresStatus: Record<Status, string> = {
  PENDENTE: "bg-amber-100 text-amber-800",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800",
  RESOLVIDA: "bg-green-100 text-green-800",
};

export default function StatusOcorrencia({ status }: StatusOcorrenciaProps) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${coresStatus[status]}`}
    >
      {nomesStatus[status]}
    </span>
  );
}