export default function DashboardOperacoes({ onVerMes }) {
  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  return (
    <>
      <h1>Fornecedores de Operações</h1>
      <p style={{ color: "#666" }}>
        Organização mensal dos fornecedores de operação — 2026
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {meses.map((mes, index) => (
          <div
            key={mes}
            style={card}
            onClick={() => onVerMes(index + 1)}
          >
            <h3 style={{ margin: 0 }}>{mes}</h3>
            <p style={{ fontSize: 13, color: "#666" }}>
              Ver fornecedores
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  cursor: "pointer",
};
