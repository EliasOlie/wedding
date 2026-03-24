/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  Gift as GiftIcon,
  Frown,
  SlidersHorizontal,
  X,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { gifts, Gift } from "@/lib/gifts";
import { getReservedGiftIds, reserveGift } from "@/app/actions/gift.action";

// ============================================================================
// CONFIGURAÇÕES DO PIX (Mude para os dados de vocês)
// ============================================================================
const PIX_KEY = "56674829-8e47-4ab6-88d0-95ca4ae91fc5"; // Pode ser CPF, Email, Telefone ou Aleatória
const PIX_NAME = "JANINE ESTRELA3"; // Sem acentos, máximo 25 caracteres
const PIX_CITY = "PARELHAS"; // Sem acentos, máximo 15 caracteres

// ============================================================================
// GERADOR DINÂMICO DE PIX (Padrão Banco Central / EMV)
// ============================================================================
const crc16 = (str: string) => {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) > 0) crc = (crc << 1) ^ 0x1021;
      else crc = crc << 1;
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
};

const generatePixPayload = (amount: number, txidId = "CASAMENTO") => {
  const format = (id: string, value: string) =>
    `${id}${value.length.toString().padStart(2, "0")}${value}`;

  const gui = format("00", "br.gov.bcb.pix");
  const key = format("01", PIX_KEY);
  const merchantAccountInfo = format("26", gui + key);
  const categoryCode = format("52", "0000");
  const currency = format("53", "986");
  const amountStr = format("54", amount.toFixed(2));
  const country = format("58", "BR");
  const name = format("59", PIX_NAME.substring(0, 25));
  const city = format("60", PIX_CITY.substring(0, 15));
  const txid = format("62", format("05", txidId));

  const payload = `000201${merchantAccountInfo}${categoryCode}${currency}${amountStr}${country}${name}${city}${txid}6304`;
  const crc = crc16(payload);
  return payload + crc;
};

// ============================================================================
// UTILITÁRIOS & DADOS
// ============================================================================
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const getCategory = (id: number) => {
  if (id >= 27 && id <= 29) return "Eletrodomésticos";
  if (id >= 30 && id <= 34) return "Banheiro";
  if (id >= 35 || [14, 15, 16, 17].includes(id)) return "Cama e Sala";
  if ([10, 11, 12, 18, 21, 22, 24, 25, 26].includes(id))
    return "Eletroportáteis";
  return "Cozinha";
};

const enrichedGifts = gifts.map((g) => ({ ...g, category: getCategory(g.id) }));
const categories = [
  "Todos",
  ...Array.from(new Set(enrichedGifts.map((g) => g.category))),
];

// --- ANIMAÇÕES ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function RegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState<"default" | "asc" | "desc">("default");

  // Estado do Modal
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixString, setPixString] = useState("");

  const [reservedIds, setReservedIds] = useState<number[]>([]);
  const [guestName, setGuestName] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [guestMessage, setGuestMessage] = useState("");

  // Busca os presentes já reservados assim que a página carrega
  useEffect(() => {
    getReservedGiftIds().then((ids) => setReservedIds(ids));
  }, []);

  const handleConfirmGift = async () => {
    if (!guestName.trim() || !selectedGift) return;

    setIsReserving(true);

    // Passando a mensagem para a Server Action
    const result = await reserveGift(selectedGift.id, guestName, guestMessage);

    if (result.success) {
      setReservedIds((prev) => [...prev, selectedGift.id]);

      const numeroWhatsApp = "55SEUNUMEROAQUI"; // COLOQUE SEU NÚMERO

      // Montando um texto bem elegante para o WhatsApp
      let texto = `Oi, Elias e Janine! Aqui é *${guestName.trim()}*. Acabei de presentear vocês pelo site com: *${selectedGift.name}*! 🎁`;

      if (guestMessage.trim()) {
        texto += `\n\nDeixei uma mensagem especial:\n_"${guestMessage.trim()}"_`;
      }

      texto += `\n\nSegue o meu comprovante do Pix. Felicidades! 🥂`;

      const urlWhats = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

      window.open(urlWhats, "_blank");

      // Limpa os estados
      setSelectedGift(null);
      setGuestName("");
      setGuestMessage("");
    } else {
      alert(result.error);
    }

    setIsReserving(false);
  };

  // Gerar o Pix quando um presente é selecionado
  useEffect(() => {
    if (selectedGift) {
      setPixString(
        generatePixPayload(selectedGift.price, `GIFT${selectedGift.id}`),
      );
      setCopied(false);
      // Travar o scroll da página de fundo
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedGift]);

  // Função para Copiar o Código
  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixString);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredGifts = useMemo(() => {
    let result = enrichedGifts.filter((g) => !reservedIds.includes(g.id));
    if (selectedCategory !== "Todos")
      result = result.filter((g) => g.category === selectedCategory);
    if (searchQuery.trim())
      result = result.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    if (sortBy === "asc")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "desc")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [reservedIds, searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-[100dvh] w-full bg-background selection:bg-primary/20 selection:text-foreground overflow-x-hidden pb-24 md:pb-32 relative">
      {/* --- CABEÇALHO E FILTROS (Mantidos Iguais) --- */}
      <section className="pt-24 md:pt-32 pb-12 px-5 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeInUp}
            className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60 font-medium mb-4"
          >
            Lista de Presentes
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-7xl font-serif text-foreground mb-6 leading-tight"
          >
            Construindo nosso{" "}
            <span className="font-baskerville italic font-light text-primary">
              futuro
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-sans font-light text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            Sua presença é o nosso maior presente. Mas, caso queira nos abençoar
            com algo a mais, preparamos esta lista para nos ajudar a montar o
            nosso novo lar.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-xs text-foreground/70 max-w-2xl mx-auto leading-relaxed font-bold"
          >
            * As imagens dos presentes são meramente ilustrativas e os valores
            serão usados tanto para o enxoval, quanto para a celebração do
            casamento, quanto para a lua de mel!
          </motion.p>
        </motion.div>
      </section>

      <section className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-y border-border/40 py-4 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Buscar presente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-foreground/[0.03] border border-border/50 focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-foreground/40 font-sans text-sm text-foreground"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto hide-scrollbar">
              <SlidersHorizontal className="w-4 h-4 text-foreground/40 hidden md:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-border/50 text-foreground text-sm rounded-full px-4 py-2.5 outline-none focus:border-primary/50 cursor-pointer appearance-none min-w-[140px]"
              >
                <option value="default">Ordem Padrão</option>
                <option value="asc">Menor Preço</option>
                <option value="desc">Maior Preço</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ${selectedCategory === category ? "bg-primary text-white shadow-md" : "bg-foreground/[0.03] text-foreground/60 border border-border/50 hover:border-primary/30 hover:text-foreground"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- GRID DE PRESENTES --- */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 min-h-[50vh]">
        <div className="flex items-center justify-between mb-8">
          <p className="font-sans text-xs text-foreground/50 uppercase tracking-widest">
            Exibindo {filteredGifts.length}{" "}
            {filteredGifts.length === 1 ? "item" : "itens"}
          </p>
        </div>

        {filteredGifts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredGifts.map((item) => (
                <motion.div
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                  key={item.id}
                  className="group flex flex-col h-full bg-background rounded-3xl"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden mb-5 rounded-2xl bg-border/20 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-foreground/70">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow px-1">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                      <span className="font-sans font-medium text-foreground/80 text-sm md:text-base tracking-wider">
                        {formatPrice(item.price)}
                      </span>

                      {/* BOTÃO QUE ABRE O MODAL */}
                      <button
                        onClick={() => setSelectedGift(item)}
                        className="flex items-center gap-2 font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-300 group-hover:gap-3 group-hover:text-primary cursor-pointer"
                      >
                        Presentear <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Frown className="w-12 h-12 text-border mb-4" />
            <h3 className="text-xl font-serif text-foreground mb-2">
              Ops! Nenhum presente encontrado.
            </h3>
            <p className="font-sans text-sm text-foreground/50 max-w-sm">
              Tente buscar por outro termo ou limpe os filtros para ver a lista
              completa.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todos");
              }}
              className="mt-6 px-6 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-full font-sans text-xs uppercase tracking-widest transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </section>

      {/* --- RODAPÉ --- */}
      <div className="max-w-3xl mx-auto px-6 mt-16 md:mt-24 text-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />
        <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">
          Com amor e gratidão,
        </h3>
        <p className="font-baskerville italic text-2xl md:text-3xl text-primary">
          Elias & Janine
        </p>
      </div>

      {/* =====================================================================
          MODAL DE PAGAMENTO (PIX)
          ===================================================================== */}
      <AnimatePresence>
        {selectedGift && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGift(null)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-4"
            >
              <div className="bg-background border border-border/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header do Modal */}
                <div className="relative h-32 md:h-40 w-full bg-border/20">
                  <Image
                    src={selectedGift.image}
                    alt={selectedGift.name}
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <button
                    onClick={() => setSelectedGift(null)}
                    className="absolute top-4 right-4 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center -mt-10 relative z-10 overflow-y-auto">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <GiftIcon className="w-8 h-8" />
                  </div>

                  <h2 className="text-2xl font-serif text-foreground mb-1">
                    {selectedGift.name}
                  </h2>
                  <p className="text-primary text-xl font-medium mb-8">
                    {formatPrice(selectedGift.price)}
                  </p>

                  <p className="text-sm font-sans font-light text-foreground/60 mb-6">
                    Escaneie o QR Code pelo app do seu banco ou copie o código
                    Pix abaixo.
                  </p>

                  {/* QR CODE GERADO VIA API (Sem dependências extras) */}
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-border/50 mb-6">
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixString)}`}
                      alt="QR Code Pix"
                      width={200}
                      height={200}
                      className="rounded-lg"
                      unoptimized // Essencial para carregar imagens externas no Next.js sem configurar o next.config
                    />
                  </div>

                  {/* BOTÃO COPIA E COLA */}
                  <button
                    onClick={handleCopyPix}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 border ${
                      copied
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-foreground text-background border-transparent hover:bg-foreground/90 hover:shadow-xl hover:-translate-y-0.5"
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Código Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copiar Código Pix
                      </>
                    )}
                  </button>

                  <div className="w-full mt-6 p-4 bg-foreground/[0.03] rounded-2xl border border-border/50 text-left">
                    <label className="block text-xs font-sans uppercase tracking-widest text-foreground/60 mb-2 ml-1">
                      Quem está presenteando?
                    </label>
                    <input
                      type="text"
                      placeholder="Seu nome (para agradecermos!)"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none font-sans text-sm mb-4"
                    />

                    {/* NOVO CAMPO DE MENSAGEM */}
                    <label className="block text-xs font-sans uppercase tracking-widest text-foreground/60 mb-2 ml-1">
                      Deixe uma mensagem para os noivos (Opcional)
                    </label>
                    <textarea
                      placeholder="Desejo a vocês..."
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none font-sans text-sm mb-4 resize-none"
                    />

                    <button
                      onClick={handleConfirmGift}
                      disabled={!guestName.trim() || isReserving}
                      className={`w-full py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                        !guestName.trim()
                          ? "bg-border/50 text-foreground/40 cursor-not-allowed"
                          : isReserving
                            ? "bg-primary/50 text-white cursor-wait"
                            : "bg-primary text-white hover:bg-foreground hover:shadow-lg"
                      }`}
                    >
                      {isReserving
                        ? "Registrando..."
                        : "Confirmar e Enviar Comprovante"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
