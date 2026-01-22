import { useState } from "react";

const modelo = {
  nome: "",
  endereco: "",
  data_inicio: "",
  data_fim: "",
};

export default function OperacaoForm({ onSalvar, onCancelar }) {
  const [form, setForm] = useState(modelo);

  function setCampo(c, v) {
    setForm((f) => ({ ...f, [c]: v }));
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
      <button onClick={onCancelar} style={btnLink}>
        ← Voltar
      </button>

      <h1 style={{ color: "#1e6bd6", marginBottom: 6 }}>
        Novo Fornecedor de Operação
      </h1>

      <p style={{ color: "#666", marginBottom: 24 }}>
        Cadastro de fornecedores utilizados em operações específicas.
      </p>

      <Section title="Dados do Fornecedor">
        <Input
          label="Nome do Fornecedor"
          value={form.nome}
          onChange={(v) => setCampo("nome", v)}
        />

        <Input
          label="Endereço"
          value={form.endereco}
          onChange={(v) => setCampo("endereco", v)}
        />
      </Section>

      <Section title="Período da Relação">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input
            type="date"
            label="Data de Início"
            value={form.data_inicio}
            onChange={(v) => setCampo("data_inicio", v)}
          />

          <Input
            type="date"
            label="Data de Fim"
            value={form.data_fim}
            onChange={(v) => setCampo("data_fim", v)}
          />
        </div>
      </Section>

      <div style={{ textAlign: "right", marginBottom: 40 }}>
        <button onClick={() => onSalvar(form)} style={btnPrimary}>
          Salvar Fornecedor
        </button>
      </div>
    </div>
  );
}

/* ===== COMPONENTES ===== */

function Section({ title, children }) {
  return (
    <div style={section}>
      <h3 style={{ color: "#1e6bd6", marginBottom: 14 }}>{title}</h3>
      <div style={{ display: "grid", gap: 14 }}>{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: 13, marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
    </div>
  );
}

/* ===== ESTILO ===== */

const section = {
  background: "#fff",
  padding: 22,
  borderRadius: 14,
  marginBottom: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: 14,
};

const btnPrimary = {
  background: "#1e6bd6",
  color: "#fff",
  border: "none",
  padding: "12px 26px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 15,
};

const btnLink = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
  fontSize: 14,
};
