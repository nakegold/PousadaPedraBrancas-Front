export default function ClientesDashboard({
  clientes,
  onNovo,
  onVerLista,
}) {
  const total = clientes.length;

  const regioes = {};
  clientes.forEach((c) => {
    if (!c.regiao) return;
    regioes[c.regiao] = (regioes[c.regiao] || 0) + 1;
  });

  const principaisRegioes = Object.entries(regioes)
    .slice(0, 2);

  return (
    <>
      <h1>Dashboard</h1>
      <p style={{ color: "#666" }}>
        Visão geral dos clientes cadastrados.
      </p>

      {/* BOTÕES */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button style={btnPrimary} onClick={onNovo}>
          + Novo Cliente
        </button>

        <button
          onClick={() =>
            window.open(
              "https://pousadapedrabrancas.onrender.com/excel/clientes",
              "_blank"
            )
          }
          style={btnExcel}
        >
          📥 Exportar Excel
        </button>
      </div>

      {/* CARDS */}
      <div style={grid}>
        <Card titulo="Total" valor={total} />

        {principaisRegioes.map(([regiao, qtd]) => (
          <Card key={regiao} titulo={regiao} valor={qtd} />
        ))}
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

/* ===== STYLES ===== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
  gap: 16,
  marginTop: 20,
};

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