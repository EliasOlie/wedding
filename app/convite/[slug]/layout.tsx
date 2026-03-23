import type { Metadata, ResolvingMetadata } from "next";
import { getInvitationBySlug } from "@/app/actions/rsvp.action";

// 1. A MUDANÇA ESTRUTURAL DA TIPAGEM
// Definimos explicitamente que params é uma Promise contendo o slug.
type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

// 2. O METADATA (Envelope Digital)
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Precisamos dar await no props.params para extrair o slug com segurança
  const params = await props.params;
  const invitationData = await getInvitationBySlug(params.slug);

  if (!invitationData) {
    return { title: "Convite não encontrado" };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://seusitedecasamento.com.br";
  const saudacao = invitationData.saudacao;
  const dynamicOgUrl = `${siteUrl}/convite/${params.slug}/og.png`;

  return {
    title: `${saudacao} | Elias & Janine | 23.05.2026`,
    description:
      "Com alegria e temor a Deus, convidamos você para testemunhar e celebrar a união das nossas vidas.",
    openGraph: {
      title: `${saudacao}, temos um convite para você!`,
      description:
        "Elias & Janine | 23 de Maio de 2026. Acesse para confirmar sua presença.",
      url: `${siteUrl}/convite/${params.slug}`,
      siteName: "Casamento Elias & Janine",
      images: [
        {
          url: dynamicOgUrl,
          width: 1200,
          height: 630,
          alt: `Convite de Casamento para ${saudacao}`,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${saudacao}, temos um convite para você!`,
      description: "Elias & Janine | 23 de Maio de 2026.",
      images: [dynamicOgUrl],
    },
  };
}

// 3. O COMPONENTE LAYOUT
// Ele recebe o Props que configuramos lá em cima.
// Mesmo que a gente não use o 'params' dentro do layout visualmente, o Next.js exige que a assinatura do componente corresponda à tipagem da rota.
export default function InviteLayout({ children, params }: Props) {
  return (
    <section className="relative min-h-[100dvh] w-full selection:bg-primary/20 selection:text-foreground">
      <div className="relative">{children}</div>
    </section>
  );
}
