export function OrDivider({ text = "ou" }: { text?: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-4 text-slate-400 font-medium">{text}</span>
      </div>
    </div>
  );
}
