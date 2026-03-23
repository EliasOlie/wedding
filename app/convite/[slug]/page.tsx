// app/convite/[slug]/page.tsx
import {
  getInvitationBySlug,
  markInvitationAsOpened,
} from "@/app/actions/rsvp.action";
import { notFound } from "next/navigation";
import WeddingInvitationClient from "./WeddingInvintationClient";

/*
Colocar música
Colocar feedback viisual de atualização de status
*/

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;

  // 1. Busca no banco direto do servidor
  const invitationData = await getInvitationBySlug(slug);

  // 2. Se a URL for inválida, mostra a página 404 nativa do Next.js
  if (!invitationData) {
    notFound();
  }

  // 3. O PULO DO GATO: Registra silenciosamente que o convite foi aberto.
  // Não colocamos "await" de propósito para não atrasar o carregamento visual da página para o convidado.
  markInvitationAsOpened(slug);

  // 4. Passa os dados puros para o componente interativo
  return <WeddingInvitationClient initialData={invitationData} />;
}
