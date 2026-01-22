import { useEffect, useState } from "react";

/* ===== MODELO COMPATÍVEL COM O BANCO ===== */
const modelo = {
  nome_fornecedor: "",
  tipo_servico: "hotelaria",
  municipio: "",
  telefone: "",
  email: "",

  // hotelaria
  valor_single: "",
  valor_duplo: "",
  valor_triplo: "",
  valor_agua: "",
  valor_lavanderia: "",

  // restaurante
  valor_marmita: "",
  valor_self_service: "",
  valor_prato_exec: "",

  condicao_pagamento: "30",
  faturamento: "",

  // bancários
  tipo_conta: "PJ",
  beneficiario: "",
  cpf_cnpj: "",
  banco_nome: "",
  banco_numero: "",
  agencia: "",
  conta: "",
  chave_pix: "",
};

export default function FornecedorForm({
  fornecedorInicial,
  onSalvar,
  onCancelar,
}) {
  const [form, setForm] = useState(modelo);

  useEffect(() => {
    if (fornecedorInicial) setForm(fornecedorInicial);
  }, [fornecedorInicial]);

  function setCampo(c, v) {
    setForm({ ...form, [c]: v });
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <button onClick={onCancelar} style={btnLink}>
        ← Voltar
      </button>

      <h1 style={{ color: "#1e6bd6" }}>Fornecedor</h1>

      {/* ===== DADOS GERAIS ===== */}
      <Section title="Dados do Fornecedor">
        <Input label="Nome do Fornecedor" value={form.nome_fornecedor} onChange={(v) => setCampo("nome_fornecedor", v)} />

        <Select
          label="Tipo de Serviço"
          value={form.tipo_servico}
          onChange={(v) => setCampo("tipo_servico", v)}
          options={[
            { value: "hotelaria", label: "Hotelaria" },
            { value: "restaurante", label: "Restaurante" },
          ]}
        />

        <Input label="Município" value={form.municipio} onChange={(v) => setCampo("municipio", v)} />
        <Input label="Telefone" value={form.telefone} onChange={(v) => setCampo("telefone", v)} />
        <Input label="Email" value={form.email} onChange={(v) => setCampo("email", v)} />
      </Section>

      {/* ===== HOTELARIA ===== */}
      {form.tipo_servico === "hotelaria" && (
        <Section title="Valores Hotelaria">
          <Input label="Single (R$)" value={form.valor_single} onChange={(v) => setCampo("valor_single", v)} />
          <Input label="Duplo (R$)" value={form.valor_duplo} onChange={(v) => setCampo("valor_duplo", v)} />
          <Input label="Triplo (R$)" value={form.valor_triplo} onChange={(v) => setCampo("valor_triplo", v)} />
          <Input label="Água (R$)" value={form.valor_agua} onChange={(v) => setCampo("valor_agua", v)} />
          <Input label="Lavanderia (R$)" value={form.valor_lavanderia} onChange={(v) => setCampo("valor_lavanderia", v)} />
        </Section>
      )}

      {/* ===== RESTAURANTE ===== */}
      {form.tipo_servico === "restaurante" && (
        <Section title="Valores Restaurante">
          <Input label="Marmita (R$)" value={form.valor_marmita} onChange={(v) => setCampo("valor_marmita", v)} />
          <Input label="Self Service (R$)" value={form.valor_self_service} onChange={(v) => setCampo("valor_self_service", v)} />
          <Input label="Prato Executivo (R$)" value={form.valor_prato_exec} onChange={(v) => setCampo("valor_prato_exec", v)} />
        </Section>
      )}

      {/* ===== PAGAMENTO ===== */}
      <Section title="Condições de Pagamento">
        <Select
          label="Prazo de Faturamento"
          value={form.condicao_pagamento}
          onChange={(v) => setCampo("condicao_pagamento", v)}
          options={[
            { value: "15", label: "15 dias" },
            { value: "30", label: "30 dias" },
          ]}
        />

        <Input label="Observações de Faturamento" value={form.faturamento} onChange={(v) => setCampo("faturamento", v)} />
      </Section>

      {/* ===== DADOS BANCÁRIOS ===== */}
      <Section title="Dados Bancários">
        <Select
          label="Tipo de Conta"
          value={form.tipo_conta}
          onChange={(v) => setCampo("tipo_conta", v)}
          options={[
            { value: "PJ", label: "Pessoa Jurídica" },
            { value: "PF", label: "Pessoa Física" },
          ]}
        />

        <Input label="Beneficiário" value={form.beneficiario} onChange={(v) => setCampo("beneficiario", v)} />
        <Input label="CPF / CNPJ" value={form.cpf_cnpj} onChange={(v) => setCampo("cpf_cnpj", v)} />
        <Input label="Banco" value={form.banco_nome} onChange={(v) => setCampo("banco_nome", v)} />
        <Input label="Número do Banco" value={form.banco_numero} onChange={(v) => setCampo("banco_numero", v)} />
        <Input label="Agência" value={form.agencia} onChange={(v) => setCampo("agencia", v)} />
        <Input label="Conta" value={form.conta} onChange={(v) => setCampo("conta", v)} />
        <Input label="Chave Pix" value={form.chave_pix} onChange={(v) => setCampo("chave_pix", v)} />
      </Section>

      <div style={{ textAlign: "right", marginBottom: 40 }}>
        <button onClick={() => onSalvar(form)} style={btnPrimary}>
          Salvar Fornecedor
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: 13, marginBottom: 4 }}>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: 13, marginBottom: 4 }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={input}>
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

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
  marginBottom: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const input = {
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
