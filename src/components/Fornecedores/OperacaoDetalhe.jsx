export default function OperacaoDetalhe({ operacao, onVoltar }) {
  return (
    <div>
      <button onClick={onVoltar} style={linkBtn}>
        ← Voltar
      </button>

      <h1>{operacao.nome}</h1>
      <p><b>Endereço:</b> {operacao.endereco}</p>
      <p><b>Início:</b> {formatarBR(operacao.data_inicio)}</p>
      <p><b>Fim:</b> {formatarBR(operacao.data_fim)}</p>
    </div>
  );
}

function formatarBR(data) {
  return new Date(data).toLocaleDateString("pt-BR");
}

const linkBtn = {
  background: "none",
  border: "none",
  color: "#1e6bd6",
  cursor: "pointer",
};
