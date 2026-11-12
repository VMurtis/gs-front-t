type Status = "Pendente" | "Em andamento" | "Resolvida";

type StatusOcorrenciaProps = {
  status: Status;
};

const coresStatus: Record<Status, string> = {
  Pendente: "bg-amber-100 text-amber-800",
  "Em andamento": "bg-blue-100 text-blue-800",
  Resolvida: "bg-green-100 text-green-800",
};

export default function StatusOcorrencia({ status }: StatusOcorrenciaProps) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${coresStatus[status]}`}
    >
      {status}
    </span>
  );
}
