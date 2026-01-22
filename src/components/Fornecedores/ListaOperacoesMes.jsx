import { useEffect, useState } from "react";
import OperacaoCard from "./OperacaoCard";

export default function ListaOperacoesMes({ mes, voltar, onVer, onEditar, onExcluir }) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch(`https://pousadapedrabrancas.onrender.com/operacoes?mes=${mes}&ano=2026`)
      .then((r) => r.json())
      .then(setLista);
  }, [mes]);

  return (
    <>
      <button onClick={voltar} style={linkBtn}>
        ← Voltar
      </button>

      <h2 style={{ marginTop: 10 }}>Fornecedores do mês</h2>

      {lista.map((o) => (
        <OperacaoCard
          key={o.id}
          operacao={o}
          onVer={onVer}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </>
  );
}

const linkBtn = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
};
