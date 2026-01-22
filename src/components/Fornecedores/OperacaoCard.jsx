export default function OperacaoCard({ operacao, onVer, onEditar, onExcluir }) {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{operacao.nome}</strong>
        <button onClick={() => onExcluir(operacao.id)} style={trashBtn}>🗑</button>
      </div>

      <div style={{ marginTop: 6 }}>{operacao.endereco}</div>

      <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
        {formatarBR(operacao.data_inicio)} → {formatarBR(operacao.data_fim)}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => onVer(operacao)} style={linkBtn}>Ver</button>
        <button onClick={() => onEditar(operacao)} style={btnGray}>Editar</button>
      </div>
    </div>
  );
}

function formatarBR(data) {
  return new Date(data).toLocaleDateString("pt-BR");
}

const card = {
  background: "#fff",
  padding: 16,
  borderRadius: 14,
  marginBottom: 12,
  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
  padding: 0,
};

const btnGray = {
  background: "#eee",
  border: "none",
  padding: "6px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const trashBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
};
