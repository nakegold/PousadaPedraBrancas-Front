import { useEffect, useState } from "react";
import FornecedoresDashboard from "./FornecedoresDashboard";
import FornecedorList from "./FornecedorList";
import FornecedorForm from "./FornecedorForm";
import FornecedorDetalhe from "./FornecedorDetalhe";
import DashboardOperacoes from "./DashboardOperacoes";
import ListaOperacoesMes from "./ListaOperacoesMes";

export default function Fornecedores() {
  // fornecedores normais
  const [tela, setTela] = useState("dashboard"); 
  // dashboard | lista | novo | ver | editar

  // fornecedores de operação (por mês)
  const [telaOp, setTelaOp] = useState("dashboard"); // dashboard | lista
  const [mesSelecionado, setMesSelecionado] = useState(null);

  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

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
      setTela("lista");
    });
  }

  function deletarFornecedor(id) {
    if (!confirm("Deseja excluir este fornecedor?")) return;

    fetch(`https://pousadapedrabrancas.onrender.com/fornecedores/${id}`, {
      method: "DELETE",
    }).then(() => carregarFornecedores());
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
      
      {/* ================= OPERAÇÕES ================= */}
      <h2 style={{ marginTop: 10 }}>Fornecedores de Operações — 2026</h2>

      {telaOp === "dashboard" && (
        <DashboardOperacoes
          onVerMes={(mes) => {
            setMesSelecionado(mes);
            setTelaOp("lista");
          }}
        />
      )}

      {telaOp === "lista" && (
        <ListaOperacoesMes
          mes={mesSelecionado}
          voltar={() => setTelaOp("dashboard")}
        />
      )}

      <hr style={{ margin: "32px 0" }} />

      {/* ================= FORNECEDORES NORMAIS ================= */}
      {tela === "dashboard" && (
        <FornecedoresDashboard
          fornecedores={fornecedores}
          onNovo={() => setTela("novo")}
          onVerLista={() => setTela("lista")}
        />
      )}

      {tela === "lista" && (
        <FornecedorList
          fornecedores={fornecedores}
          onNovo={() => setTela("novo")}
          onVoltar={() => setTela("dashboard")}
          onVer={(f) => {
            setFornecedorSelecionado(f);
            setTela("ver");
          }}
          onEditar={(f) => {
            setFornecedorSelecionado(f);
            setTela("editar");
          }}
          onExcluir={deletarFornecedor}
        />
      )}

      {tela === "novo" && (
        <FornecedorForm
          onSalvar={criarFornecedor}
          onCancelar={() => setTela("lista")}
        />
      )}

      {tela === "ver" && fornecedorSelecionado && (
        <FornecedorDetalhe
          fornecedor={fornecedorSelecionado}
          onVoltar={() => setTela("lista")}
        />
      )}

      {tela === "editar" && fornecedorSelecionado && (
        <FornecedorForm
          fornecedorInicial={fornecedorSelecionado}
          onSalvar={criarFornecedor} // depois trocamos para PUT
          onCancelar={() => setTela("lista")}
        />
      )}
    </div>
  );
}

