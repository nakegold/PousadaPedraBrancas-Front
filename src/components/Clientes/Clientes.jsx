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

  /* ===== LOAD ===== */
  async function carregar() {
    try {
      const res = await fetch("https://pousadapedrabrancas.onrender.com/clientes");
      const data = await res.json();
      setClientes(data || []);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
    }
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

    await fetch("https://pousadapedrabrancas.onrender.com/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novo),
    });

    setTela("lista");
    carregar();
  }

  async function editar(atualizado) {
    await fetch(
      `https://pousadapedrabrancas.onrender.com/clientes/${clienteSelecionado.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(atualizado),
      }
    );

    setTela("lista");
    setClienteSelecionado(null);
    carregar();
  }

  async function deletar(id) {
    if (!confirm("Deseja excluir?")) return;

    await fetch(
      `https://pousadapedrabrancas.onrender.com/clientes/${id}`,
      {
        method: "DELETE",
      }
    );

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