import { useEffect, useState } from "react";

import FornecedoresDashboard from "./FornecedoresDashboard";
import FornecedorList from "./FornecedorList";
import FornecedorForm from "./FornecedorForm";
import FornecedorDetalhe from "./FornecedorDetalhe";

import DashboardOperacoes from "./DashboardOperacoes";
import ListaOperacoesMes from "./ListaOperacoesMes";

export default function Fornecedores() {
  // ===== TELAS =====
  const [telaFornecedor, setTelaFornecedor] = useState("dashboard"); 
  // dashboard | lista | novo | ver | editar

  const [telaOperacao, setTelaOperacao] = useState("dashboard"); 
  // dashboard | lista

  const [mesSelecionado, setMesSelecionado] = useState(null);

  // ===== DADOS =====
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

  // ===== API =====
  function carregarFornecedores() {
    fetch("https://pousadapedrabrancas.onrender.com/fornecedores")
      .then((res) => res.json())
      .then(setFornecedores)
      .catch(console.error);
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  function criarFornecedor(novo) {
    fetch("https://pousadapedrabrancas.onrender.com/fornecedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    }).then(() => {
      carregarFornecedores();
      setTelaFornecedor("lista");
    });
  }

  function deletarFornecedor(id) {
    if (!confirm("Deseja excluir este fornecedor?")) return;

    fetch(`https://pousadapedrabrancas.onrender.com/fornecedores/${id}`, {
      method: "DELETE",
    }).then(() => carregarFornecedores());
  }

  // ================= RENDER =================
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>

      {/* ===== DASHBOARD ===== */}
      {telaFornecedor === "dashboard" && (
        <>
          {/* DASHBOARD FORNECEDORES NORMAIS */}
          <FornecedoresDashboard
            fornecedores={fornecedores}
            onNovo={() => setTelaFornecedor("novo")}
            onVerLista={() => setTelaFornecedor("lista")}
          />

          {/* DASHBOARD OPERAÇÕES (ABAIXO) */}
          <div style={{ marginTop: 40 }}>
            {telaOperacao === "dashboard" && (
              <DashboardOperacoes
                onVerMes={(mes) => {
                  setMesSelecionado(mes);
                  setTelaOperacao("lista");
                }}
              />
            )}

            {telaOperacao === "lista" && (
              <ListaOperacoesMes
                mes={mesSelecionado}
                voltar={() => setTelaOperacao("dashboard")}
              />
            )}
          </div>
        </>
      )}

      {/* ===== LISTA FORNECEDORES ===== */}
      {telaFornecedor === "lista" && (
        <FornecedorList
          fornecedores={fornecedores}
          onNovo={() => setTelaFornecedor("novo")}
          onVoltar={() => setTelaFornecedor("dashboard")}
          onVer={(f) => {
            setFornecedorSelecionado(f);
            setTelaFornecedor("ver");
          }}
          onEditar={(f) => {
            setFornecedorSelecionado(f);
            setTelaFornecedor("editar");
          }}
          onExcluir={deletarFornecedor}
        />
      )}

      {/* ===== NOVO ===== */}
      {telaFornecedor === "novo" && (
        <FornecedorForm
          onSalvar={criarFornecedor}
          onCancelar={() => setTelaFornecedor("lista")}
        />
      )}

      {/* ===== DETALHE ===== */}
      {telaFornecedor === "ver" && fornecedorSelecionado && (
        <FornecedorDetalhe
          fornecedor={fornecedorSelecionado}
          onVoltar={() => setTelaFornecedor("lista")}
        />
      )}

      {/* ===== EDITAR ===== */}
      {telaFornecedor === "editar" && fornecedorSelecionado && (
        <FornecedorForm
          fornecedorInicial={fornecedorSelecionado}
          onSalvar={criarFornecedor} // depois trocamos pra PUT
          onCancelar={() => setTelaFornecedor("lista")}
        />
      )}

    </div>
  );
}


