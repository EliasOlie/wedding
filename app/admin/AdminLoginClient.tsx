"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/admin.action";
import { Lock } from "lucide-react";

export default function AdminLoginClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await loginAdmin(password);
    if (res.success) {
      router.refresh(); // Recarrega a página para o servidor ler o cookie novo
    } else {
      setError(res.error || "Erro");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-border/50 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-serif text-foreground mb-2">
          Acesso Restrito
        </h1>
        <p className="text-sm text-foreground/60 mb-8">Painel dos Noivos</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-border/50 focus:border-primary/50 outline-none font-sans text-center"
          />
          {error && <p className="text-rose-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-foreground transition-colors"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
