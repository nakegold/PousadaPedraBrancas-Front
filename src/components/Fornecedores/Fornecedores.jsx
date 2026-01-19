import { useEffect, useState } from "react";
import FornecedoresDashboard from "./FornecedoresDashboard";
import FornecedorList from "./FornecedorList";
import FornecedorForm from "./FornecedorForm";
import FornecedorDetalhe from "./FornecedorDetalhe";

export default function Fornecedores() {
  const [tela, setTela] = useState("dashboard"); 
  // dashboard | lista | novo | ver | editar

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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
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
          onSalvar={criarFornecedor} // depois a gente troca pra PUT
          onCancelar={() => setTela("lista")}
        />
      )}
    </div>
  );
}
