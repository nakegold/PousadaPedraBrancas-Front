import { useEffect, useState } from "react";

import ClientesDashboard from "./ClientesDashboard";
import ClientesList from "./ClientesList";
import ClientesForm from "./ClientesForm";
import ClientesDetalhe from "./ClientesDetalhe";

/* ===== MODELO ===== */
const modelo = {
  cliente: "",
  cnpj: "",
  periodo_faturamento: "",
  tarifa: "",
  valor_tarifa: "",
  regiao: "",
};

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [tela, setTela] = useState("dashboard"); 
  // dashboard | lista | novo | editar | ver

  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [form, setForm] = useState(modelo);

  /* ===== LOAD ===== */
  async function carregar() {
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false });

    setClientes(data || []);
  }

  useEffect(() => {
    carregar();
  }, []);

  /* ===== CRUD ===== */

  async function salvar(novo) {
    if (!novo.cliente || !novo.cnpj) {
      alert("Preencha Cliente e CNPJ");
      return;
    }

    await supabase.from("clientes").insert([novo]);

    setTela("lista");
    carregar();
  }

  async function editar(atualizado) {
    await supabase
      .from("clientes")
      .update(atualizado)
      .eq("id", clienteSelecionado.id);

    setTela("lista");
    setClienteSelecionado(null);
    carregar();
  }

  async function deletar(id) {
    if (!confirm("Deseja excluir?")) return;

    await supabase.from("clientes").delete().eq("id", id);
    carregar();
  }

  /* ================= UI ================= */

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>

      {/* ===== DASHBOARD ===== */}
      {tela === "dashboard" && (
        <ClientesDashboard
          clientes={clientes}
          onNovo={() => setTela("novo")}
          onVerLista={() => setTela("lista")}
        />
      )}

      {/* ===== LISTA ===== */}
      {tela === "lista" && (
        <ClientesList
          clientes={clientes}
          onNovo={() => setTela("novo")}
          onVoltar={() => setTela("dashboard")}
          onVer={(c) => {
            setClienteSelecionado(c);
            setTela("ver");
          }}
          onEditar={(c) => {
            setClienteSelecionado(c);
            setTela("editar");
          }}
          onExcluir={deletar}
        />
      )}

      {/* ===== NOVO ===== */}
      {tela === "novo" && (
        <ClientesForm
          onSalvar={salvar}
          onCancelar={() => setTela("lista")}
        />
      )}

      {/* ===== EDITAR ===== */}
      {tela === "editar" && clienteSelecionado && (
        <ClientesForm
          clienteInicial={clienteSelecionado}
          onSalvar={editar}
          onCancelar={() => setTela("lista")}
        />
      )}

      {/* ===== DETALHE ===== */}
      {tela === "ver" && clienteSelecionado && (
        <ClientesDetalhe
          cliente={clienteSelecionado}
          onVoltar={() => setTela("lista")}
        />
      )}

    </div>
  );
}