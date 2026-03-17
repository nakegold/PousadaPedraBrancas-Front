export default function ClientesDetalhe({ cliente, onVoltar }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
      {/* VOLTAR */}
      <button onClick={onVoltar} style={linkBtn}>
        ← Voltar
      </button>

      {/* TÍTULO */}
      <h1 style={{ marginBottom: 4 }}>{cliente.cliente}</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        CNPJ: <strong>{cliente.cnpj}</strong>
      </p>

      {/* DADOS PRINCIPAIS */}
      <Section title="Informações Gerais">
        <Grid>
          <Info label="Período de Faturamento" value={cliente.periodo_faturamento} />
          <Info label="Região" value={cliente.regiao} />
        </Grid>
      </Section>

      {/* TARIFAS */}
      <Section title="Tarifa">
        <Grid>
          <Info label="Tipo de Tarifa" value={cliente.tarifa} />
          <Info label="Valor da Tarifa" value={cliente.valor_tarifa} />
        </Grid>
      </Section>
    </div>
  );
}

/* ================= UI ================= */

function Section({ title, children }) {
  return (
    <div style={card}>
      <h3 style={{ color: "#1e6bd6", marginBottom: 16 }}>{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>{label}</p>
      <p style={{ margin: 0, fontWeight: 500 }}>
        {value && value !== "" ? value : "—"}
      </p>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  marginBottom: 24,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
  marginBottom: 16,
};