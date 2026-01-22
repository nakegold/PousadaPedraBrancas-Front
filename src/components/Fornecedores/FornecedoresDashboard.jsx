export default function FornecedoresDashboard({
  fornecedores,
  onNovo,
  onVerLista,
}) {
  const total = fornecedores.length;
  const hoteis = fornecedores.filter(
    (f) => f.tipo_servico === "hotelaria"
  ).length;
  const restaurantes = fornecedores.filter(
    (f) => f.tipo_servico === "restaurante"
  ).length;

  return (
    <>
      <h1>Dashboard</h1>
      <p style={{ color: "#666" }}>
        Visão geral dos fornecedores cadastrados.
      </p>

      {/* ✅ BOTÕES LADO A LADO */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button style={btnPrimary} onClick={onNovo}>
          + Novo Fornecedor
        </button>

        <button
          onClick={() =>
            window.open(
              "https://pousadapedrabrancas.onrender.com/excel/fornecedores",
              "_blank"
            )
          }
          style={btnExcel}
        >
          📥 Exportar Excel
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        <Card titulo="Total" valor={total} />
        <Card titulo="Hotéis" valor={hoteis} />
        <Card titulo="Restaurantes" valor={restaurantes} />
      </div>

      <button
        onClick={onVerLista}
        style={{ ...btnGray, marginTop: 20 }}
      >
        Ver Lista
      </button>
    </>
  );
}

function Card({ titulo, valor }) {
  return (
    <div style={card}>
      <p style={{ color: "#666", marginBottom: 6 }}>{titulo}</p>
      <h2 style={{ margin: 0 }}>{valor}</h2>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const btnPrimary = {
  background: "#1e6bd6",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 10,
  cursor: "pointer",
};

const btnGray = {
  background: "#eee",
  border: "none",
  padding: "10px 18px",
  borderRadius: 10,
  cursor: "pointer",
};

const btnExcel = {
  background: "#2ecc71",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 10,
  cursor: "pointer",
};
