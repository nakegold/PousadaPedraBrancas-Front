export default function ClientesCard({
  cliente,
  onVer,
  onEditar,
  onExcluir,
}) {
  return (
    <div style={card}>
      <div style={topo}>
        <span style={tag}>
          Cliente
        </span>

        <button onClick={() => onExcluir(cliente.id)} style={trash}>
          🗑
        </button>
      </div>

      <h3 style={{ margin: "6px 0" }}>{cliente.cliente}</h3>

      <p style={{ margin: 0, color: "#666" }}>
        🧾 {cliente.cnpj}
      </p>

      <p style={{ margin: 0, color: "#666" }}>
        📍 {cliente.regiao}
      </p>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button style={btnGray} onClick={() => onVer(cliente)}>
          Ver
        </button>

        <button style={btnGray} onClick={() => onEditar(cliente)}>
          Editar
        </button>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 18,
  marginBottom: 14,
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
};

const topo = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tag = {
  background: "#e8f2ff",
  color: "#1e6bd6",
  padding: "4px 10px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

const trash = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 16,
};

const btnGray = {
  background: "#eee",
  border: "none",
  padding: "6px 12px",
  borderRadius: 8,
  cursor: "pointer",
};