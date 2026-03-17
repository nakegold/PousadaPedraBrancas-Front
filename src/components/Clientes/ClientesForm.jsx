import { useEffect, useState } from "react";

/* ===== MODELO ===== */
const modelo = {
  cliente: "",
  cnpj: "",
  periodo_faturamento: "",
  tarifa: "",
  valor_tarifa: "",
  regiao: "",
};

export default function ClientesForm({
  clienteInicial,
  onSalvar,
  onCancelar,
}) {
  const [form, setForm] = useState(modelo);

  useEffect(() => {
    if (clienteInicial) setForm(clienteInicial);
  }, [clienteInicial]);

  function setCampo(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <button onClick={onCancelar} style={btnLink}>
        ← Voltar
      </button>

      <h1 style={{ color: "#1e6bd6" }}>Cliente</h1>

      {/* ===== DADOS DO CLIENTE ===== */}
      <Section title="Dados do Cliente">
        <Input
          label="Nome do Cliente"
          value={form.cliente}
          onChange={(v) => setCampo("cliente", v)}
        />

        <Input
          label="CNPJ"
          value={form.cnpj}
          onChange={(v) => setCampo("cnpj", v)}
        />

        <Input
          label="Região"
          value={form.regiao}
          onChange={(v) => setCampo("regiao", v)}
        />
      </Section>

      {/* ===== FATURAMENTO ===== */}
      <Section title="Faturamento">
        <Select
          label="Período de Faturamento"
          value={form.periodo_faturamento}
          onChange={(v) => setCampo("periodo_faturamento", v)}
          options={[
            { value: "15", label: "15 dias" },
            { value: "30", label: "30 dias" },
          ]}
        />

        <Select
          label="Tipo de Tarifa"
          value={form.tarifa}
          onChange={(v) => setCampo("tarifa", v)}
          options={[
            { value: "single", label: "Hospedagem Single" },
            { value: "double", label: "Hospedagem Dupla" },
            { value: "triple", label: "Hospedagem Tripla" },
            { value: "marmita_p", label: "Marmita P" },
            { value: "marmita_m", label: "Marmita M" },
            { value: "marmita_g", label: "Marmita G" },
            { value: "agua_20L", label: "Água 20L" },
            { value: "agua_1_5L", label: "Água 1,5L" },
            { value: "agua_500ml", label: "Água 500ml" },
            { value: "lanche", label: "Lanche" },
            { value: "lavanderia", label: "Lavanderia" },
          ]}
        />

        <Input
          label="Valor da Tarifa (R$)"
          value={form.valor_tarifa}
          onChange={(v) => setCampo("valor_tarifa", v)}
          type="number"
        />
      </Section>

      <div style={{ textAlign: "right", marginBottom: 40 }}>
        <button onClick={() => onSalvar(form)} style={btnPrimary}>
          Salvar Cliente
        </button>
      </div>
    </div>
  );
}

/* ===== UI ===== */

function Section({ title, children }) {
  return (
    <div style={card}>
      <h3 style={{ color: "#1e6bd6", marginBottom: 14 }}>{title}</h3>
      <div style={grid}>{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ===== ESTILOS ===== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
  gap: 12,
};

const labelStyle = {
  fontSize: 13,
  marginBottom: 4,
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  marginBottom: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const inputStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
};

const btnPrimary = {
  background: "#1e6bd6",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 15,
};

const btnLink = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
  marginBottom: 10,
};