/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin.action"; // Notei que no seu código estava .action sem o 's'. Ajuste se necessário!
import {
  Users,
  Gift,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Plus,
  MessageSquare,
} from "lucide-react";
import { addManualGift } from "@/app/actions/gift.action"; // <-- Importe a action

export default function AdminDashboardClient({
  initialData,
}: {
  initialData: any;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"guests" | "gifts">("guests");
  const [guestFilter, setGuestFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [manualDesc, setManualDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    router.refresh();
  };

  const handleAddManual = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const amountFloat = parseFloat(manualAmount.replace(",", "."));

    await addManualGift(manualName, amountFloat, manualDesc);

    setIsModalOpen(false);
    setManualName("");
    setManualAmount("");
    setManualDesc("");
    setIsSubmitting(false);
    router.refresh(); // Recarrega os dados mágicamente
  };

  // --- ESTATÍSTICAS E CÁLCULOS ---
  const allGuests = initialData.invitations.flatMap(
    (inv: any) => inv.convidados,
  );
  const totalGuests = allGuests.length;
  const confirmed = allGuests.filter(
    (g: any) => g.status === "confirmed",
  ).length;
  const declined = allGuests.filter((g: any) => g.status === "declined").length;
  const pending = allGuests.filter((g: any) => g.status === "pending").length;

  const totalGifts = initialData.reservations.length;
  const totalGiftValue = initialData.reservations.reduce(
    (acc: number, res: any) => acc + res.giftPrice,
    0,
  );

  // --- FILTROS DE CONVIDADOS CORRIGIDOS ---
  const filteredInvitations = useMemo(() => {
    return initialData.invitations.filter((inv: any) => {
      // O 'openedAt' pode vir nulo ou undefined, então precisamos checar se é 'truthy'
      const hasOpened = !!inv.openedAt;

      if (guestFilter === "all") return true;
      if (guestFilter === "opened") return hasOpened;
      if (guestFilter === "unopened") return !hasOpened;

      // Filtra pelo status dos convidados dentro do convite
      const hasConfirmed = inv.convidados.some(
        (g: any) => g.status === "confirmed",
      );
      const hasDeclined = inv.convidados.some(
        (g: any) => g.status === "declined",
      );

      if (guestFilter === "confirmed") return hasConfirmed;
      // Se tiver pelo menos um declinado, E NÃO TIVER nenhum confirmado junto, cai no 'declined'
      if (guestFilter === "declined") return hasDeclined && !hasConfirmed;
      return true;
    });
  }, [initialData.invitations, guestFilter]);

  return (
    <div className="min-h-screen bg-background/50 pb-20">
      {/* HEADER */}
      <header className="bg-white border-b border-border/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-foreground">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-sans text-foreground/60 hover:text-rose-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        {/* CARDS DE RESUMO (STATS) - ADICIONADO CARD DE RECUSADOS */}
        {/* Mudamos de grid-cols-4 para grid-cols-5 no desktop para caber todos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/40">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/50 mb-2">
              Vai
            </p>
            <p className="text-3xl font-serif text-emerald-600">
              {confirmed}{" "}
              <span className="text-sm text-foreground/40 font-sans">
                / {totalGuests}
              </span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/40">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/50 mb-2">
              Não Vai
            </p>
            <p className="text-3xl font-serif text-rose-500">{declined}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/40">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/50 mb-2">
              Pendente
            </p>
            <p className="text-3xl font-serif text-amber-500">{pending}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/40">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/50 mb-2">
              Presentes
            </p>
            <p className="text-3xl font-serif text-primary">{totalGifts}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/40">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/50 mb-2">
              Total (R$)
            </p>
            <p className="text-3xl font-serif text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalGiftValue)}
            </p>
          </div>
        </div>

        {/* TABS (NAVEGAÇÃO) */}
        <div className="flex gap-4 mb-8 border-b border-border/50 pb-px">
          <button
            onClick={() => setActiveTab("guests")}
            className={`pb-4 px-2 font-sans text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "guests" ? "text-primary border-b-2 border-primary" : "text-foreground/40 hover:text-foreground"}`}
          >
            <Users className="w-4 h-4 inline-block mr-2 -mt-1" /> Lista de
            Convidados
          </button>
          <button
            onClick={() => setActiveTab("gifts")}
            className={`pb-4 px-2 font-sans text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "gifts" ? "text-primary border-b-2 border-primary" : "text-foreground/40 hover:text-foreground"}`}
          >
            <Gift className="w-4 h-4 inline-block mr-2 -mt-1" /> Lista de
            Presentes
          </button>
        </div>

        {/* --- ABA CONVIDADOS --- */}
        {activeTab === "guests" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
              {["all", "opened", "unopened", "confirmed", "declined"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setGuestFilter(filter)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap ${guestFilter === filter ? "bg-foreground text-white" : "bg-white border border-border/50 text-foreground/60"}`}
                  >
                    {filter === "all"
                      ? "Todos"
                      : filter === "opened"
                        ? "Visualizaram"
                        : filter === "unopened"
                          ? "Não Abriram"
                          : filter === "confirmed"
                            ? "Confirmados"
                            : "Recusaram"}
                  </button>
                ),
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredInvitations.map((inv: any) => (
                <div
                  key={inv._id}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-border/40 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-xl text-foreground mb-1">
                        {inv.saudacao}
                      </h3>
                      <p className="text-xs font-sans text-foreground/50 bg-background px-3 py-1 rounded-full inline-flex items-center gap-1">
                        {inv.openedAt ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-500" /> Abriu
                            em {new Date(inv.openedAt).toLocaleDateString()}
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Não visualizado
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto pt-4 border-t border-border/30">
                    {inv.convidados.map((g: any) => (
                      <div
                        key={g._id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-sans text-foreground/80">
                          {g.name}
                        </span>
                        {g.status === "confirmed" && (
                          <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Vai
                          </span>
                        )}
                        {g.status === "declined" && (
                          <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Não vai
                          </span>
                        )}
                        {g.status === "pending" && (
                          <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Pendente
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ABA PRESENTES --- */}
        {activeTab === "gifts" && (
          <div className="animate-in fade-in duration-500">
            {/* CABEÇALHO DA ABA PRESENTES */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl text-foreground">
                Registro de Presentes
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Lançar Pix / Dinheiro
              </button>
            </div>

            {initialData.reservations.length === 0 ? (
              <div className="text-center py-20">
                <Gift className="w-12 h-12 text-border mx-auto mb-4" />
                <p className="text-foreground/50 font-serif text-xl">
                  Ainda não há presentes registrados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialData.reservations.map((res: any) => (
                  <div
                    key={res._id}
                    className={`p-6 rounded-3xl shadow-sm border relative overflow-hidden ${res.isManual ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-border/40"}`}
                  >
                    <div
                      className={`absolute top-0 right-0 px-4 py-1 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest ${res.isManual ? "bg-emerald-100 text-emerald-700" : "bg-primary/10 text-primary"}`}
                    >
                      {res.isManual
                        ? "Lançamento Manual"
                        : new Date(res.createdAt).toLocaleDateString()}
                    </div>

                    <h3 className="font-serif text-xl text-foreground mb-1">
                      {res.guestName}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-2">
                      {res.isManual ? "Contribuição de:" : "Presenteou com:"}{" "}
                      <strong className="text-foreground">
                        {res.giftName}
                      </strong>
                    </p>
                    <p className="text-lg font-bold text-emerald-600 mb-4">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(res.giftPrice)}
                    </p>

                    {res.message && (
                      <div className="bg-background p-4 rounded-2xl relative">
                        <MessageSquare className="w-4 h-4 text-primary/40 absolute top-4 left-4" />
                        <p className="text-sm italic text-foreground/80 pl-6 leading-relaxed">
                          "{res.message}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-border/50">
              <h3 className="font-serif text-2xl mb-6">Lançar Valor</h3>
              <form onSubmit={handleAddManual} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1 mb-1 block">
                    Quem deu?
                  </label>
                  <input
                    required
                    type="text"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="Ex: Tio Paulo e Tia Maria"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border/50 outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1 mb-1 block">
                    Qual o valor (R$)?
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="1"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    placeholder="Ex: 500.00"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border/50 outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 ml-1 mb-1 block">
                    Descrição do valor
                  </label>
                  <input
                    required
                    type="text"
                    value={manualDesc}
                    onChange={(e) => setManualDesc(e.target.value)}
                    placeholder="Ex: Pix direto na conta"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border/50 outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 font-bold text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700"
                  >
                    {isSubmitting ? "Salvando..." : "Registrar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
