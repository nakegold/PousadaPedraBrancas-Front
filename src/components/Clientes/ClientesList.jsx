import ClientesCard from "./ClientesCard";

export default function ClientesList({
  clientes,
  onNovo,
  onVoltar,
  onVer,
  onEditar,
  onExcluir,
}) {
  // agrupar por região
  const grupos = {};

  clientes.forEach((c) => {
    const regiao = c.regiao || "Sem região";
    if (!grupos[regiao]) grupos[regiao] = [];
    grupos[regiao].push(c);
  });

  return (
    <>
      {/* TOPO */}
      <div style={topo}>
        <button onClick={onVoltar} style={linkBtn}>
          ← Dashboard
        </button>

        <button onClick={onNovo} style={btnPrimary}>
          + Novo Cliente
        </button>
      </div>

      {/* LISTA POR REGIÃO */}
      {Object.entries(grupos).map(([regiao, lista]) => (
        <div key={regiao}>
          <h2 style={{ marginTop: 20 }}>{regiao}</h2>

          {lista.map((c) => (
            <ClientesCard
              key={c.id}
              cliente={c}
              onVer={onVer}
              onEditar={onEditar}
              onExcluir={onExcluir}
            />
          ))}
        </div>
      ))}
    </>
  );
}

/* ===== STYLES ===== */

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