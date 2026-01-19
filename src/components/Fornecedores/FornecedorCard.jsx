export default function FornecedorCard({
  fornecedor,
  onVer,
  onEditar,
  onExcluir,
}) {
  const isHotel = fornecedor.tipo_servico === "hotelaria";

  return (
    <div style={card}>
      <div style={topo}>
        <span style={tag(isHotel)}>
          {isHotel ? "Hotelaria" : "Restaurante"}
        </span>

        <button onClick={() => onExcluir(fornecedor.id)} style={trash}>
          🗑
        </button>
      </div>

      <h3 style={{ margin: "6px 0" }}>{fornecedor.nome_fornecedor}</h3>

      <p style={{ margin: 0, color: "#666" }}>
        📍 {fornecedor.municipio}
      </p>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button style={btnGray} onClick={() => onVer(fornecedor)}>
          Ver
        </button>
        <button style={btnGray} onClick={() => onEditar(fornecedor)}>
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

const tag = (isHotel) => ({
  background: isHotel ? "#e8f2ff" : "#fff4e5",
  color: isHotel ? "#1e6bd6" : "#c97a00",
  padding: "4px 10px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
});

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
