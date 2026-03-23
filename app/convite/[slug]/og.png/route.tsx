// app/convite/[slug]/og.png/route.tsx
import { ImageResponse } from "next/og";
import { connectToDatabase } from "@/lib/mongodb";
import { Invitation } from "@/models/Invitation";
import { NextRequest } from "next/server";

const PALETTE = {
  background: "#F9F6F2", // Creme
  primary: "#D4C2A5", // Champanhe
  foreground: "#5E505B", // Cinza Quente
};

export async function generateStaticParams() {
  await connectToDatabase();
  const convites = await Invitation.find({}).select("slug").lean();
  return convites.map((convite) => ({ slug: convite.slug }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  await connectToDatabase();
  const invitation = await Invitation.findOne({ slug }).lean();

  if (!invitation) return new Response("Não encontrado", { status: 404 });

  const saudacao = String(invitation.saudacao);

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PALETTE.background,
        padding: "80px",
        // Usando fontes nativas do sistema que não quebram o build
        fontFamily: "serif",
        border: `12px solid ${PALETTE.primary}`,
      }}
    >
      <p
        style={{
          fontSize: "28px",
          color: PALETTE.foreground,
          textTransform: "uppercase",
          letterSpacing: "0.5em",
          marginBottom: "40px",
          fontFamily: "sans-serif",
        }}
      >
        Elias & Janine
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "38px",
            color: PALETTE.foreground,
            marginBottom: "10px",
          }}
        >
          Convidamos você e sua família
        </p>
        <h1
          style={{
            fontSize: saudacao.length > 25 ? "60px" : "85px",
            color: PALETTE.foreground,
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {saudacao}
        </h1>
      </div>

      <p
        style={{
          fontSize: "24px",
          color: PALETTE.primary,
          marginTop: "60px",
          letterSpacing: "0.2em",
          fontWeight: "bold",
        }}
      >
        23 DE MAIO DE 2026 | PARELHAS, RN
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
      // REMOVIDO: O array de fonts. O Next usa a dele por padrão.
    },
  );
}
