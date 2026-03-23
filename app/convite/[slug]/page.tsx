// app/convite/[slug]/page.tsx
import { getInvitationBySlug } from "@/app/actions/rsvp.action";
import { notFound } from "next/navigation";
import WeddingInvitationClient from "./WeddingInvintationClient";

export default async function InvitePage({
  params,
}: {
  params: { slug: string };
}) {
  const tslug = (await params).slug;
  // 1. Busca no banco direto do servidor
  const invitationData = await getInvitationBySlug(tslug);

  // 2. Se a URL for inválida, mostra a página 404 nativa do Next.js
  if (!invitationData) {
    notFound();
  }

  // 3. Passa os dados puros para o componente interativo
  return <WeddingInvitationClient initialData={invitationData} />;
}
