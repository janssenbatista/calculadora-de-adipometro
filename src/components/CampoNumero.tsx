interface CampoNumeroProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function CampoNumero({ id, label, value, placeholder, onChange }: CampoNumeroProps) {
  return (
    <label className="grid gap-1" htmlFor={id}>
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <input
        data-testid={id}
        id={id}
        className="w-full rounded-xl border border-slate-300 bg-white/90 px-3 py-2.5 text-sm text-slate-800 transition outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
        type="number"
        inputMode="decimal"
        min="0.2"
        step="0.1"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default CampoNumero;
