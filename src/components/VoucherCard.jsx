export default function VoucherCard({ voucher, onDelete, onVer, onEditar }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 18,
        marginBottom: 18,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{voucher.empresa}</strong>
        <button onClick={() => onDelete(voucher.id)}>🗑</button>
      </div>

      <div style={{ marginTop: 8 }}>
        🏨 {voucher.hotel_nome || "Hotel não informado"}
      </div>
      <div>📅 {voucher.checkin} → {voucher.checkout}</div>

      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
        <button onClick={onVer} style={{ background: "none", border: "none", color: "#1e6bd6" }}>
          Ver detalhes →
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => window.open(`http://localhost:3000/vouchers/${voucher.id}/pdf`)}
          >
            PDF
          </button>

          <button onClick={onEditar}>Editar</button>
        </div>
      </div>
    </div>
  );
  
}
