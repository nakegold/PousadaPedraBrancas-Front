import { useEffect, useState } from "react";
import VoucherCard from "./components/VoucherCard";
import Fornecedores from "./components/Fornecedores/Fornecedores";

/* ===== MODELO ===== */
const modeloForm = {
  empresa: "",
  empresa_faturada: "",
  solicitante: "",
  operacao: "",
  faturado_empresa: false,

  checkin: "",
  checkout: "",

  hospedes: [""],
  acomodacoes: { single: 0, double: 0, triple: 0 },

  hotel_nome: "",
  hotel_endereco: "",
  hotel_cafe: "",
  hotel_lavanderia: "",

  restaurante_nome: "",
  restaurante_horario: "",
  restaurante_endereco: "",

  responsavel_reserva: "",
  responsavel_operacional: "",
  email_contato: "",
  telefone_contato: "",

  observacoes: "",
};

function App() {
  const [aba, setAba] = useState("vouchers");

  const [vouchers, setVouchers] = useState([]);
  const [tela, setTela] = useState("lista"); // lista | novo | editar | ver
  const [voucherSelecionado, setVoucherSelecionado] = useState(null);
  const [form, setForm] = useState(modeloForm);

  /* ===== LOAD ===== */
  function carregarVouchers() {
    fetch("https://pousadapedrabrancas.onrender.com/vouchers")
      .then((res) => res.json())
      .then(setVouchers)
      .catch(console.error);
  }

  useEffect(() => {
    carregarVouchers();
  }, []);

  /* ===== CRUD ===== */

  function criarVoucher() {
    fetch("https://pousadapedrabrancas.onrender.com/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setTela("lista");
      setForm(modeloForm);
      carregarVouchers();
    });
  }

  function editarVoucher() {
    fetch(`https://pousadapedrabrancas.onrender.com/vouchers/${voucherSelecionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setTela("lista");
      setVoucherSelecionado(null);
      setForm(modeloForm);
      carregarVouchers();
    });
  }

  function deletarVoucher(id) {
    if (!confirm("Deseja realmente deletar este voucher?")) return;

    fetch(`https://pousadapedrabrancas.onrender.com/vouchers/${id}`, { method: "DELETE" }).then(() =>
      setVouchers((prev) => prev.filter((v) => v.id !== id))
    );
  }

  /* ===== UI ===== */

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="/logo.png" alt="Logo" style={{ height: 42 }} />
          <h1 style={{ margin: 0, color: "#1e6bd6" }}>Sistema</h1>
        </div>

        {/* ABAS */}
        <div style={{ display: "flex", gap: 24, margin: "20px 0", borderBottom: "1px solid #ddd" }}>
          <TabButton ativo={aba === "vouchers"} onClick={() => setAba("vouchers")}>
            Vouchers
          </TabButton>
          <TabButton ativo={aba === "fornecedores"} onClick={() => setAba("fornecedores")}>
            Fornecedores
          </TabButton>
        </div>

        {/* ===== VOUCHERS ===== */}
        {aba === "vouchers" && (
          <>
            {tela === "lista" && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2>Vouchers</h2>
                  <button
                    style={btnPrimary}
                    onClick={() => {
                      setForm(modeloForm);
                      setTela("novo");
                    }}
                  >
                    + Novo Voucher
                  </button>
                </div>

                {vouchers.map((v) => (
                  <VoucherCard
                    key={v.id}
                    voucher={v}
                    onDelete={deletarVoucher}
                    onVer={() => {
                      setVoucherSelecionado(v);
                      setTela("ver");
                    }}
                    onEditar={() => {
                      setVoucherSelecionado(v);
                      setForm({
                        ...modeloForm,
                        ...v,
                        acomodacoes: v.acomodacoes || { single: 0, double: 0, triple: 0 },
                        hospedes: Array.isArray(v.hospedes) ? v.hospedes : [""],
                      });
                      setTela("editar");
                    }}
                  />
                ))}
              </>
            )}

            {(tela === "novo" || tela === "editar") && (
              <FormularioVoucher
                form={form}
                setForm={setForm}
                salvar={tela === "novo" ? criarVoucher : editarVoucher}
                voltar={() => setTela("lista")}
              />
            )}

            {tela === "ver" && voucherSelecionado && (
              <>
                <button onClick={() => setTela("lista")} style={linkBtn}>
                  ← Voltar
                </button>
                <pre style={card}>{JSON.stringify(voucherSelecionado, null, 2)}</pre>
              </>
            )}
          </>
        )}

        {/* ===== FORNECEDORES ===== */}
        {aba === "fornecedores" && <Fornecedores />}
      </div>
    </div>
  );
}

/* ================= FORM ================= */

function FormularioVoucher({ form, setForm, salvar, voltar }) {
  return (
    <>
      <button onClick={voltar} style={linkBtn}>← Voltar</button>

      <Section title="Dados da Solicitação">
        <Input label="Empresa" value={form.empresa}
          onChange={(v) => setForm(f => ({ ...f, empresa: v }))} />

        <Input label="Solicitante" value={form.solicitante}
          onChange={(v) => setForm(f => ({ ...f, solicitante: v }))} />

        <Input label="Operação" value={form.operacao}
          onChange={(v) => setForm(f => ({ ...f, operacao: v }))} />

        <label style={{ display: "flex", gap: 8 }}>
          <input
            type="checkbox"
            checked={form.faturado_empresa}
            onChange={(e) =>
              setForm(f => ({ ...f, faturado_empresa: e.target.checked }))
            }
          />
          Faturar para empresa
        </label>

        {form.faturado_empresa && (
          <Input
            label="Empresa Faturada"
            value={form.empresa_faturada}
            onChange={(v) => setForm(f => ({ ...f, empresa_faturada: v }))}
          />
        )}
      </Section>

      <Section title="Período">
        <Input type="date" label="Check-in" value={form.checkin}
          onChange={(v) => setForm(f => ({ ...f, checkin: v }))} />
        <Input type="date" label="Check-out" value={form.checkout}
          onChange={(v) => setForm(f => ({ ...f, checkout: v }))} />
      </Section>

      <Section title="Acomodações">
        <Input type="number" label="Single" value={form.acomodacoes.single}
          onChange={(v) => setForm(f => ({
            ...f,
            acomodacoes: { ...f.acomodacoes, single: Number(v) }
          }))} />
        <Input type="number" label="Double" value={form.acomodacoes.double}
          onChange={(v) => setForm(f => ({
            ...f,
            acomodacoes: { ...f.acomodacoes, double: Number(v) }
          }))} />
        <Input type="number" label="Triple" value={form.acomodacoes.triple}
          onChange={(v) => setForm(f => ({
            ...f,
            acomodacoes: { ...f.acomodacoes, triple: Number(v) }
          }))} />
      </Section>

      <Section title="Hóspedes">
        {form.hospedes.map((h, i) => (
          <Input
            key={i}
            label={`Hóspede ${i + 1}`}
            value={h}
            onChange={(v) => {
              const arr = [...form.hospedes];
              arr[i] = v;
              setForm(f => ({ ...f, hospedes: arr }));
            }}
          />
        ))}
        <button
          onClick={() => setForm(f => ({ ...f, hospedes: [...f.hospedes, ""] }))}
        >
          + Adicionar hóspede
        </button>
      </Section>

      <Section title="Hotel">
        <Input label="Nome" value={form.hotel_nome}
          onChange={(v) => setForm(f => ({ ...f, hotel_nome: v }))} />
        <Input label="Endereço" value={form.hotel_endereco}
          onChange={(v) => setForm(f => ({ ...f, hotel_endereco: v }))} />
        <Input label="Café" value={form.hotel_cafe}
          onChange={(v) => setForm(f => ({ ...f, hotel_cafe: v }))} />
        <Input label="Lavanderia" value={form.hotel_lavanderia}
          onChange={(v) => setForm(f => ({ ...f, hotel_lavanderia: v }))} />
      </Section>

      <Section title="Restaurante">
        <Input label="Nome" value={form.restaurante_nome}
          onChange={(v) => setForm(f => ({ ...f, restaurante_nome: v }))} />
        <Input label="Horário" value={form.restaurante_horario}
          onChange={(v) => setForm(f => ({ ...f, restaurante_horario: v }))} />
        <Input label="Endereço" value={form.restaurante_endereco}
          onChange={(v) => setForm(f => ({ ...f, restaurante_endereco: v }))} />
      </Section>

      <Section title="Contato">
        <Input label="Reserva" value={form.responsavel_reserva}
          onChange={(v) => setForm(f => ({ ...f, responsavel_reserva: v }))} />
        <Input label="Operacional" value={form.responsavel_operacional}
          onChange={(v) => setForm(f => ({ ...f, responsavel_operacional: v }))} />
        <Input label="Email" value={form.email_contato}
          onChange={(v) => setForm(f => ({ ...f, email_contato: v }))} />
        <Input label="Telefone" value={form.telefone_contato}
          onChange={(v) => setForm(f => ({ ...f, telefone_contato: v }))} />
      </Section>

      <Section title="Observações">
        <textarea
          value={form.observacoes}
          onChange={(e) =>
            setForm(f => ({ ...f, observacoes: e.target.value }))
          }
          style={{ width: "100%", minHeight: 80 }}
        />
      </Section>

      <div style={{ textAlign: "right" }}>
        <button onClick={salvar} style={btnPrimary}>Salvar Voucher</button>
      </div>
    </>
  );
}

/* ================= UI ================= */

function Section({ title, children }) {
  return (
    <div style={card}>
      <h3 style={{ color: "#1e6bd6" }}>{title}</h3>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TabButton({ ativo, children, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: "none",
        border: "none",
        fontWeight: ativo ? 700 : 500,
        color: ativo ? "#1e6bd6" : "#555",
        borderBottom: ativo ? "3px solid #1e6bd6" : "3px solid transparent",
        paddingBottom: 6,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

const btnPrimary = { background: "#1e6bd6", color: "#fff", padding: 10, borderRadius: 8 };
const card = { background: "#fff", padding: 20, marginBottom: 20, borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" };
const linkBtn = { background: "none", border: "none", color: "#1e6bd6", cursor: "pointer" };

export default App;

