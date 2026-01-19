import FornecedorCard from "./FornecedorCard";

export default function FornecedorList({
  fornecedores,
  onNovo,
  onVoltar,
  onVer,
  onEditar,
  onExcluir,
}) {
  const hoteis = fornecedores.filter(
    (f) => f.tipo_servico === "hotelaria"
  );
  const restaurantes = fornecedores.filter(
    (f) => f.tipo_servico === "restaurante"
  );

  return (
    <>
      <div style={topo}>
        <button onClick={onVoltar} style={linkBtn}>
          ← Dashboard
        </button>

        <button onClick={onNovo} style={btnPrimary}>
          + Novo Fornecedor
        </button>
      </div>

      <h2>Hotelaria</h2>
      {hoteis.map((f) => (
        <FornecedorCard
          key={f.id}
          fornecedor={f}
          onVer={onVer}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}

      <h2 style={{ marginTop: 30 }}>Restaurantes</h2>
      {restaurantes.map((f) => (
        <FornecedorCard
          key={f.id}
          fornecedor={f}
          onVer={onVer}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </>
  );
}

const topo = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 20,
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
};

const btnPrimary = {
  background: "#1e6bd6",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 10,
  cursor: "pointer",
};
