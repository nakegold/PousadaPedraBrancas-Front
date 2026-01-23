export default function OperacaoDetalhe({ operacao, onVoltar }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <button onClick={onVoltar} style={linkBtn}>
        ← Voltar
      </button>

      <h1 style={{ color: "#1e6bd6" }}>
        Fornecedor de Operação
      </h1>

      <Section title="Dados do Fornecedor">
        <Linha label="Nome" valor={operacao.nome} />
        <Linha label="Endereço" valor={operacao.endereco} />
        <Linha
          label="Operação de Locação"
          valor={operacao.Operacao_Locacao || "-"}
        />
      </Section>

      <Section title="Período da Relação">
        <Linha
          label="Data de Início"
          valor={formatarBR(operacao.data_inicio)}
        />
        <Linha
          label="Data de Fim"
          valor={formatarBR(operacao.data_fim)}
        />
      </Section>
    </div>
  );
}

/* ===== COMPONENTES ===== */

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 14,
        marginBottom: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ color: "#1e6bd6", marginBottom: 14 }}>
        {title}
      </h3>
      <div style={{ display: "grid", gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function Linha({ label, valor }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 13, marginBottom: 4, color: "#555" }}>
        {label}
      </span>
      <div
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 14,
          background: "#f9f9f9",
        }}
      >
        {valor}
      </div>
    </div>
  );
}

/* ===== UTILS ===== */

function formatarBR(data) {
  if (!data) return "-";
  return new Date(data).toLocaleDateString("pt-BR");
}

const linkBtn = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
};
