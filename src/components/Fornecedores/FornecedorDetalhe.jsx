export default function FornecedorDetalhe({ fornecedor, onVoltar }) {
  return (
    <div>
      <button onClick={onVoltar} style={{ background: "none", border: "none", color: "#1e6bd6" }}>
        ← Voltar
      </button>

      <h1>{fornecedor.nome_fornecedor}</h1>
      <p>Tipo: {fornecedor.tipo_servico}</p>
      <p>Município: {fornecedor.municipio}</p>
      <p>Email: {fornecedor.email}</p>
      <p>Telefone: {fornecedor.telefone}</p>

      <pre style={{ background: "#fff", padding: 20, borderRadius: 12 }}>
        {JSON.stringify(fornecedor, null, 2)}
      </pre>
    </div>
  );
}
