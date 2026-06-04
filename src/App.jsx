import { useState, useEffect, useRef } from "react";

// ─── DADOS ──────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Mensal", price: "29,90", period: "mês", highlight: false, badge: null,
    features: ["+12.000 conteúdos disponíveis", "2 telas simultâneas", "Filmes, séries e esportes", "Qualidade Full HD", "Suporte via WhatsApp", "Funciona em qualquer tela"],
  },
  {
    name: "Trimestral", price: "24,90", period: "mês", highlight: true, badge: "Mais escolhido",
    realPrice: "74,70", originalPrice: "89,70",
    features: ["+12.000 conteúdos disponíveis", "2 telas simultâneas", "Filmes, séries e esportes", "Qualidade Full HD", "Suporte prioritário 24h", "Funciona em qualquer tela", "Economia de R$15"],
  },
  {
    name: "Semestral", price: "19,90", period: "mês", highlight: false, badge: "Melhor custo",
    realPrice: "119,40", originalPrice: "179,40",
    features: ["+12.000 conteúdos disponíveis", "2 telas simultâneas", "Filmes, séries e esportes", "Qualidade Full HD", "Suporte prioritário 24h", "Funciona em qualquer tela", "Economia de R$60"],
  },
];

const testimonials = [
  { name: "Marcos Vieira", city: "Florianópolis, SC", text: "A qualidade é incrível, tem tudo que sempre quis assistir e muito mais. Melhor decisão que tomei esse ano.", stars: 5, initial: "MV", time: "há 2 dias" },
  { name: "Juliana Ramos", city: "Curitiba, PR", text: "Já testei outros serviços e a CineFX é disparada o melhor. Tudo na mesma plataforma, sem travar, com qualidade absurda.", stars: 5, initial: "JR", time: "há 5 dias" },
  { name: "Ricardo Souza", city: "São Paulo, SP", text: "Instalei em menos de 5 minutos na minha Smart TV. O suporte no WhatsApp é muito rápido. Recomendo demais.", stars: 5, initial: "RS", time: "há 1 semana" },
  { name: "Patrícia Alves", city: "Joinville, SC", text: "Tava desconfiada, mas o teste grátis me convenceu na hora. Agora a família toda usa e não para de assistir.", stars: 5, initial: "PA", time: "há 2 semanas" },
  { name: "Diego Ferreira", city: "Porto Alegre, RS", text: "Pelo preço que pago tenho acesso a um catálogo gigantesco em Full HD. Nunca imaginei que fosse tão bom.", stars: 5, initial: "DF", time: "há 3 semanas" },
  { name: "Luciana Martins", city: "Belo Horizonte, MG", text: "Minha filha assiste na TV e eu no celular ao mesmo tempo. As 2 telas simultâneas fazem toda a diferença!", stars: 5, initial: "LM", time: "há 1 mês" },
];

const objections = [
  { icon: "🔒", question: "É seguro? Não vou ter problema com minha internet?", answer: "Total segurança. O serviço funciona via streaming direto no seu aparelho — não instala nada no roteador nem na rede. Funciona de forma simples e segura em qualquer conexão doméstica." },
  { icon: "📱", question: "Funciona na minha TV ou no meu celular?", answer: "Funciona em TUDO: Smart TV (LG, Samsung, Philips), Android TV Box, celular Android e iPhone, tablet, notebook e PC. Plug & play — você instala em menos de 5 minutos." },
  { icon: "⚡", question: "Vai travar? Precisa de internet muito rápida?", answer: "Com 10 Mbps já funciona bem. Com 20 Mbps ou mais, você tem qualidade Full HD impecável. Nossa infraestrutura é dimensionada para garantir estabilidade mesmo em horário de pico." },
  { icon: "💳", question: "E se eu não gostar? Perde o dinheiro?", answer: "Antes de pagar qualquer coisa, você faz um teste grátis de 4 horas. Só assina se gostar. E nosso suporte via WhatsApp resolve qualquer dúvida em minutos." },
  { icon: "📞", question: "E o suporte? Somem depois que eu pago?", answer: "Pelo contrário. Nosso suporte via WhatsApp é rápido e humanizado. Você fala diretamente com nossa equipe — sem robô. Problemas são resolvidos no mesmo dia." },
  { icon: "🎬", question: "O que está incluso no catálogo?", answer: "Filmes lançamentos e clássicos, séries completas, animes, desenhos infantis, documentários e esportes ao vivo. Tudo em Full HD, com novidades adicionadas toda semana." },
];

const devices = [
  { icon: "📺", label: "Smart TV" }, { icon: "📱", label: "Celular" },
  { icon: "💻", label: "Notebook" }, { icon: "📦", label: "TV Box" },
  { icon: "🖥️", label: "PC" }, { icon: "⬛", label: "Tablet" },
];

const benefits = [
  { icon: "🎬", title: "Catálogo gigante", desc: "+12.000 filmes, séries e esportes ao vivo atualizados toda semana." },
  { icon: "⚡", title: "Ativação imediata", desc: "Em menos de 5 minutos você já está assistindo. Sem técnico, sem espera." },
  { icon: "📺", title: "Qualidade Full HD", desc: "Imagem cristalina e som perfeito em qualquer dispositivo compatível." },
  { icon: "👨‍👩‍👧", title: "2 telas simultâneas", desc: "Toda a família assiste ao mesmo tempo em aparelhos diferentes." },
  { icon: "💬", title: "Suporte humanizado", desc: "Atendimento via WhatsApp rápido — você fala direto com nossa equipe." },
  { icon: "💸", title: "Cancele quando quiser", desc: "Sem fidelidade, sem taxa de cancelamento. Você no controle, sempre." },
];

const BUYER_NAMES = ["Carlos M.", "Ana Paula S.", "José Roberto L.", "Fernanda C.", "Marcos A.", "Juliana R.", "Paulo Henrique T.", "Camila F.", "Leonardo B.", "Mariana G.", "Rafael O.", "Patrícia N.", "Diego S.", "Larissa M.", "Thiago P.", "Beatriz A.", "Anderson L.", "Renata C.", "Fabio R.", "Vanessa T.", "Rodrigo B.", "Aline F.", "Eduardo M.", "Priscila S.", "Guilherme N."];
const CITIES = ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Porto Alegre, RS", "Florianópolis, SC", "Joinville, SC", "Salvador, BA", "Fortaleza, CE", "Manaus, AM", "Goiânia, GO", "Brasília, DF", "Recife, PE", "Natal, RN", "Belém, PA"];
const PLANS_LABELS = ["Mensal", "Trimestral", "Semestral"];

// ─── HOOKS ──────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function Reveal({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.12);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 0.9s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      willChange: "transform, opacity",
    }}>{children}</div>
  );
}

function Stars({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#ffd23f", fontSize: 14, filter: "drop-shadow(0 0 4px rgba(255,210,63,0.7))" }}>★</span>
      ))}
    </div>
  );
}

function CounterBadge({ label, value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.3);
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let start = 0;
    const end = parseInt(value);
    const step = Math.ceil(end / (1800 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "28px 24px" }}>
      <div style={{
        fontSize: 52, fontWeight: 800, lineHeight: 1,
        fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1,
        background: "linear-gradient(135deg, #00f0ff 0%, #ff00d4 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 24px rgba(0,240,255,0.4))",
      }}>
        {count.toLocaleString("pt-BR")}{suffix}
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, textTransform: "uppercase", letterSpacing: 2, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

function LiveBuyerToast() {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const show = () => {
      setToast({
        name: BUYER_NAMES[Math.floor(Math.random() * BUYER_NAMES.length)],
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        plan: PLANS_LABELS[Math.floor(Math.random() * PLANS_LABELS.length)],
        mins: Math.floor(Math.random() * 8) + 1,
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    };
    const first = setTimeout(show, 4000);
    const interval = setInterval(show, 14000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 28, left: 24, zIndex: 9999,
      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
      pointerEvents: "none",
    }}>
      {toast && (
        <div style={{
          background: "rgba(15, 8, 30, 0.95)", backdropFilter: "blur(16px)",
          border: "1px solid rgba(0,240,255,0.4)",
          borderLeft: "3px solid #00f0ff",
          borderRadius: 14, padding: "14px 18px",
          display: "flex", alignItems: "center", gap: 12,
          boxShadow: "0 8px 40px rgba(0,240,255,0.3), 0 0 80px rgba(255,0,212,0.12)",
          minWidth: 270, maxWidth: 330,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, flexShrink: 0, boxShadow: "0 0 20px rgba(0,240,255,0.5)",
          }}>🎬</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{toast.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
              assinou o plano <span style={{ color: "#00f0ff", fontWeight: 600 }}>{toast.plan}</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
              {toast.city} • há {toast.mins} min
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hero Mockup com TV simulada
function HeroMockup() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 540, margin: "0 auto" }}>
      {/* TV principal */}
      <div style={{
        position: "relative",
        background: "linear-gradient(180deg, #1a1030 0%, #0a0518 100%)",
        border: "2px solid rgba(0,240,255,0.3)",
        borderRadius: 16,
        padding: 12,
        boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 100px rgba(0,240,255,0.2)",
      }}>
        <div style={{
          background: "#000",
          borderRadius: 8,
          overflow: "hidden",
          aspectRatio: "16/9",
          position: "relative",
        }}>
          {/* Tela com grid de posters */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            padding: 8,
            height: "100%",
            background: "linear-gradient(135deg, #1a0030 0%, #050015 100%)",
          }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const colors = [
                "linear-gradient(135deg, #ff006e, #8338ec)",
                "linear-gradient(135deg, #06ffa5, #00b4d8)",
                "linear-gradient(135deg, #ffbe0b, #fb5607)",
                "linear-gradient(135deg, #00f0ff, #b14aed)",
                "linear-gradient(135deg, #ff00d4, #00f0ff)",
                "linear-gradient(135deg, #8338ec, #06ffa5)",
                "linear-gradient(135deg, #fb5607, #ff006e)",
                "linear-gradient(135deg, #00b4d8, #ffbe0b)",
              ];
              return (
                <div key={i} style={{
                  background: colors[i],
                  borderRadius: 4,
                  aspectRatio: "2/3",
                  display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
                  padding: 4,
                  opacity: 0.85,
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{ width: "70%", height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2 }} />
                </div>
              );
            })}
          </div>
          {/* Overlay com texto CineFX */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "10px 14px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent)",
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 3,
              background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}>CINEFX</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, fontFamily: "monospace" }}>● AO VIVO</span>
          </div>
        </div>
        {/* Base TV */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <div style={{ width: 60, height: 4, background: "rgba(0,240,255,0.4)", borderRadius: 4 }} />
        </div>
      </div>
      {/* Celular flutuante */}
      <div style={{
        position: "absolute",
        bottom: -30, right: -20,
        width: 110,
        background: "linear-gradient(180deg, #1a1030, #0a0518)",
        border: "2px solid rgba(255,0,212,0.4)",
        borderRadius: 16,
        padding: 6,
        boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 60px rgba(255,0,212,0.25)",
        transform: "rotate(8deg)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1a0030, #050015)",
          borderRadius: 10,
          aspectRatio: "9/16",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 6, padding: 6,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 2,
            background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>CINEFX</span>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{
              width: "85%", height: 14,
              background: i === 0 ? "linear-gradient(90deg, #ff00d4, #00f0ff)" : "rgba(255,255,255,0.08)",
              borderRadius: 3,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────
export default function CineFXLanding() {
  const [openFaq, setOpenFaq] = useState(null);
  const scrollY = useScrollY();
  const WA_LINK = "https://wa.me/5549988428055";
  const scrollToPlans = () => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#05030f", color: "#fff", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=Orbitron:wght@500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05030f; }
        a { text-decoration: none; }

        .grad-text {
          background: linear-gradient(90deg, #00f0ff 0%, #ff00d4 50%, #b14aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: shimmer 6s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        .eyebrow {
          font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px;
          background: linear-gradient(90deg, #00f0ff, #ff00d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 56px; letter-spacing: 3px;
          line-height: 1.05; margin-bottom: 18px; color: #fff;
        }
        .section-sub { color: rgba(255,255,255,0.55); font-size: 16px; max-width: 540px; margin: 0 auto; line-height: 1.6; }

        .btn-primary {
          display: inline-block; position: relative; color: #05030f;
          padding: 17px 38px; border-radius: 100px; font-weight: 800;
          font-size: 15px; letter-spacing: 1px; cursor: pointer; text-transform: uppercase;
          border: none; text-align: center; overflow: hidden;
          background: linear-gradient(90deg, #00f0ff, #ff00d4);
          background-size: 200% 100%;
          box-shadow: 0 10px 40px rgba(0,240,255,0.4), 0 0 60px rgba(255,0,212,0.25);
          transition: all 0.3s cubic-bezier(.2,.7,.2,1);
        }
        .btn-primary:hover { background-position: 100% 0; transform: translateY(-2px) scale(1.02); box-shadow: 0 14px 50px rgba(0,240,255,0.6), 0 0 80px rgba(255,0,212,0.4); }
        .btn-outline {
          display: inline-block; background: rgba(255,255,255,0.04); color: #fff;
          padding: 16px 34px; border-radius: 100px; font-weight: 600;
          font-size: 14px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
          border: 1.5px solid rgba(0,240,255,0.4); backdrop-filter: blur(10px);
          transition: all 0.3s; text-align: center;
        }
        .btn-outline:hover { border-color: #00f0ff; background: rgba(0,240,255,0.1); box-shadow: 0 0 30px rgba(0,240,255,0.3); }

        @keyframes pulse-neon { 0%, 100% { box-shadow: 0 10px 40px rgba(0,240,255,0.4), 0 0 60px rgba(255,0,212,0.25), 0 0 0 0 rgba(0,240,255,0.5); } 50% { box-shadow: 0 10px 40px rgba(0,240,255,0.6), 0 0 80px rgba(255,0,212,0.4), 0 0 0 14px rgba(0,240,255,0); } }
        .pulse-btn { animation: pulse-neon 2.5s ease-in-out infinite; }

        @keyframes float-orb { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(40px,-30px) scale(1.1); } 66% { transform: translate(-30px,20px) scale(0.95); } }
        @keyframes float-mockup { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .float-anim { animation: float-mockup 5s ease-in-out infinite; }

        .plan-card {
          background: linear-gradient(180deg, rgba(20,12,40,0.7), rgba(10,5,25,0.85));
          border: 1px solid rgba(0,240,255,0.15);
          border-radius: 20px; padding: 36px 30px;
          display: flex; flex-direction: column;
          transition: all 0.4s cubic-bezier(.2,.7,.2,1); position: relative;
          backdrop-filter: blur(20px);
        }
        .plan-card:hover { border-color: rgba(0,240,255,0.5); transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,240,255,0.25); }
        .plan-card.highlighted {
          border: 1.5px solid transparent;
          background:
            linear-gradient(180deg, rgba(30,15,55,0.9), rgba(15,5,35,0.95)) padding-box,
            linear-gradient(135deg, #00f0ff, #ff00d4, #b14aed) border-box;
          box-shadow: 0 20px 70px rgba(255,0,212,0.3), 0 0 100px rgba(0,240,255,0.15);
          transform: translateY(-12px);
        }

        .benefit-card {
          background: linear-gradient(180deg, rgba(20,12,40,0.5), rgba(10,5,25,0.7));
          border: 1px solid rgba(0,240,255,0.12);
          border-radius: 18px; padding: 28px;
          transition: all 0.4s cubic-bezier(.2,.7,.2,1);
          backdrop-filter: blur(12px); height: 100%;
        }
        .benefit-card:hover { border-color: rgba(255,0,212,0.35); transform: translateY(-6px); box-shadow: 0 16px 50px rgba(0,240,255,0.18); }

        .faq-item { border-bottom: 1px solid rgba(0,240,255,0.1); cursor: pointer; transition: background 0.3s; }
        .faq-item:last-child { border-bottom: none; }
        .faq-item:hover { background: rgba(0,240,255,0.04); }

        .testimonial-card {
          background: linear-gradient(180deg, rgba(20,12,40,0.6), rgba(10,5,25,0.8));
          border: 1px solid rgba(255,0,212,0.12);
          border-radius: 18px; padding: 26px;
          transition: all 0.4s cubic-bezier(.2,.7,.2,1);
          backdrop-filter: blur(12px);
        }
        .testimonial-card:hover { border-color: rgba(255,0,212,0.4); transform: translateY(-4px); box-shadow: 0 16px 50px rgba(255,0,212,0.2); }

        .device-pill {
          display: flex; align-items: center; gap: 10px;
          background: rgba(20,12,40,0.6); border: 1px solid rgba(0,240,255,0.25);
          border-radius: 100px; padding: 11px 22px; backdrop-filter: blur(10px);
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.9);
          transition: all 0.3s;
        }
        .device-pill:hover { border-color: #00f0ff; color: #fff; box-shadow: 0 0 24px rgba(0,240,255,0.4); transform: translateY(-2px); }

        .guarantee-box {
          background: linear-gradient(135deg, rgba(0,240,255,0.08), rgba(255,0,212,0.08));
          border: 1.5px solid rgba(0,240,255,0.3);
          border-radius: 24px; padding: 40px;
          position: relative; overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .bg-orb {
          position: fixed; border-radius: 50%; filter: blur(80px);
          pointer-events: none; opacity: 0.5; z-index: 0;
          animation: float-orb 18s ease-in-out infinite;
        }

        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,240,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,212,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        }

        @media (max-width: 968px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .hero-mockup-col { order: 2; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 44px !important; }
          .section-title { font-size: 38px !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .hero-ctas { flex-direction: column !important; }
        }
      `}</style>

      {/* Background orbs */}
      <div className="bg-orb" style={{ width: 500, height: 500, background: "#00f0ff", top: "10%", left: "-10%", transform: `translateY(${scrollY * 0.15}px)` }} />
      <div className="bg-orb" style={{ width: 600, height: 600, background: "#ff00d4", top: "40%", right: "-15%", animationDelay: "-6s", transform: `translateY(${scrollY * -0.1}px)` }} />
      <div className="bg-orb" style={{ width: 450, height: 450, background: "#b14aed", top: "75%", left: "20%", animationDelay: "-12s", transform: `translateY(${scrollY * 0.08}px)` }} />

      <LiveBuyerToast />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 40 ? "rgba(5,3,15,0.85)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(0,240,255,0.15)" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 4,
          background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 12px rgba(0,240,255,0.5))",
        }}>CINEFX</div>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "11px 24px", fontSize: 13 }}>
          Teste Grátis
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "120px 5% 80px", overflow: "hidden" }}>
        <div className="grid-bg" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        <div className="hero-grid" style={{
          maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2,
          display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center", width: "100%",
        }}>
          <div>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.35)",
                borderRadius: 100, padding: "8px 18px", marginBottom: 32,
                fontSize: 12, fontWeight: 600, color: "#00f0ff", letterSpacing: 1.5,
                textTransform: "uppercase", backdropFilter: "blur(10px)",
                boxShadow: "0 0 30px rgba(0,240,255,0.2)",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 12px #00f0ff", display: "inline-block" }} />
                +12.000 conteúdos para toda a família
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="hero-title" style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 76, lineHeight: 0.95,
                letterSpacing: 2, marginBottom: 28, color: "#fff",
              }}>
                O ENTRETENIMENTO QUE SUA FAMÍLIA <span className="grad-text">MERECE</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 40, maxWidth: 540 }}>
                Mais de 12.000 conteúdos em Full HD — filmes, séries e esportes ao vivo.{" "}
                <strong style={{ color: "#fff" }}>Funciona em qualquer tela. Cancele quando quiser.</strong>
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="hero-ctas" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary pulse-btn" style={{ fontSize: 16, padding: "19px 42px" }}>
                  🎬 Começar Teste Grátis
                </a>
                <button onClick={scrollToPlans} className="btn-outline">Ver planos →</button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18, color: "rgba(255,255,255,0.5)", fontSize: 13, flexWrap: "wrap" }}>
                <span>✓ Sem cartão de crédito</span>
                <span style={{ color: "#00f0ff" }}>•</span>
                <span>✓ Ativo em 5 minutos</span>
                <span style={{ color: "#ff00d4" }}>•</span>
                <span>✓ Sem fidelidade</span>
              </div>
            </Reveal>
          </div>

          <div className="hero-mockup-col">
            <Reveal delay={0.2}>
              <div className="float-anim">
                <HeroMockup />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        position: "relative", zIndex: 2,
        background: "linear-gradient(90deg, rgba(0,240,255,0.04), rgba(255,0,212,0.04))",
        borderTop: "1px solid rgba(0,240,255,0.15)", borderBottom: "1px solid rgba(255,0,212,0.15)",
        backdropFilter: "blur(10px)",
      }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { value: "1000", suffix: "+", label: "Clientes ativos" },
            { value: "12000", suffix: "+", label: "Conteúdos disponíveis" },
            { value: "98", suffix: "%", label: "De satisfação" },
            { value: "4", suffix: "h", label: "Teste 100% grátis" },
          ].map((s, i) => (
            <div key={s.label} style={{ borderRight: i < 3 ? "1px solid rgba(0,240,255,0.1)" : "none" }}>
              <CounterBadge {...s} />
            </div>
          ))}
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="eyebrow">Por que a CineFX</div>
              <h2 className="section-title">
                TUDO QUE VOCÊ <span className="grad-text">PRECISA</span>
              </h2>
              <p className="section-sub">A experiência completa de entretenimento — com qualidade, praticidade e suporte de verdade.</p>
            </div>
          </Reveal>
          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.1}>
                <div className="benefit-card">
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,212,0.15))",
                    border: "1px solid rgba(0,240,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, marginBottom: 18,
                  }}>{b.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 1, marginBottom: 8, color: "#fff" }}>
                    {b.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.65 }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="eyebrow">Prova Social Real</div>
              <h2 className="section-title">
                QUEM EXPERIMENTA <span className="grad-text">NÃO PARA</span> DE ASSISTIR
              </h2>
              <p className="section-sub">Filmes, séries, esportes e muito mais — tudo na palma da mão.</p>
            </div>
          </Reveal>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.1}>
                <div className="testimonial-card">
                  <Stars count={t.stars} />
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7, margin: "16px 0 22px" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 800, color: "#05030f", flexShrink: 0,
                      boxShadow: "0 0 20px rgba(0,240,255,0.3)",
                    }}>{t.initial}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{t.city} • {t.time}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DISPOSITIVOS */}
      <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="eyebrow">Compatibilidade total</div>
              <h2 className="section-title">FUNCIONA EM <span className="grad-text">QUALQUER TELA</span></h2>
              <p className="section-sub">Plug & play — sem técnico, sem complicação. Em menos de 5 minutos você está assistindo.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {devices.map((d) => (
                <div key={d.label} className="device-pill">
                  <span style={{ fontSize: 18 }}>{d.icon}</span>{d.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="eyebrow">Planos e Preços</div>
              <h2 className="section-title">ESCOLHA SEU <span className="grad-text">PLANO</span></h2>
              <p className="section-sub">Todos incluem 2 telas simultâneas e acesso completo ao catálogo de +12.000 conteúdos.</p>
            </div>
          </Reveal>

          <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26, alignItems: "stretch" }}>
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.12}>
                <div className={`plan-card ${plan.highlight ? "highlighted" : ""}`} style={{ height: "100%" }}>
                  {plan.badge && (
                    <div style={{
                      position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                      background: plan.highlight ? "linear-gradient(90deg, #00f0ff, #ff00d4)" : "rgba(177,74,237,0.9)",
                      color: plan.highlight ? "#05030f" : "#fff",
                      fontSize: 11, fontWeight: 800, padding: "5px 18px", borderRadius: 100,
                      whiteSpace: "nowrap", letterSpacing: 1.2, textTransform: "uppercase",
                      boxShadow: "0 6px 20px rgba(0,240,255,0.4)",
                    }}>{plan.badge}</div>
                  )}
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 14 }}>
                      {plan.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>R$</span>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, lineHeight: 1, letterSpacing: 1,
                        ...(plan.highlight ? {
                          background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        } : { color: "#fff" }),
                      }}>{plan.price}</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>/{plan.period}</span>
                    </div>
                    {plan.realPrice && (
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
                        Total no período: <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>R$ {plan.realPrice}</span>
                        {plan.originalPrice && (
                          <span style={{ marginLeft: 8, textDecoration: "line-through", color: "rgba(255,255,255,0.3)" }}>
                            R$ {plan.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <ul style={{ listStyle: "none", marginBottom: 30, flex: 1 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "9px 0", fontSize: 14, color: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{
                          display: "inline-flex", width: 18, height: 18, borderRadius: "50%",
                          background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                          alignItems: "center", justifyContent: "center",
                          color: "#05030f", fontSize: 11, fontWeight: 900, flexShrink: 0, marginTop: 1,
                        }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={WA_LINK} target="_blank" rel="noreferrer" className={plan.highlight ? "btn-primary" : "btn-outline"} style={{ width: "100%" }}>
                    Quero esse plano →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            Pagamento via PIX • Ativação imediata • Sem fidelidade ou taxa de cancelamento
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section style={{ padding: "60px 5% 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <Reveal>
            <div className="guarantee-box">
              <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
                <div style={{
                  width: 110, height: 110, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 56, boxShadow: "0 0 50px rgba(0,240,255,0.4)",
                }}>🛡️</div>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Garantia Total</div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 2, marginBottom: 12, color: "#fff" }}>
                    TESTE GRÁTIS POR 4 HORAS
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.65 }}>
                    Você experimenta a plataforma <strong style={{ color: "#fff" }}>sem pagar nada</strong> e sem precisar cadastrar cartão. Só assina se gostar — e mesmo depois, pode cancelar quando quiser, sem multa e sem burocracia.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "60px 5% 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="eyebrow">Suas dúvidas respondidas</div>
              <h2 className="section-title">SEM <span className="grad-text">PEGADINHAS</span></h2>
              <p className="section-sub">Respondemos as dúvidas mais comuns com total transparência.</p>
            </div>
          </Reveal>
          <Reveal>
            <div style={{
              background: "linear-gradient(180deg, rgba(20,12,40,0.6), rgba(10,5,25,0.8))",
              border: "1px solid rgba(0,240,255,0.2)",
              borderRadius: 20, overflow: "hidden", backdropFilter: "blur(12px)",
            }}>
              {objections.map((obj, i) => (
                <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontSize: 22 }}>{obj.icon}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: openFaq === i ? "#fff" : "rgba(255,255,255,0.85)" }}>{obj.question}</span>
                    </div>
                    <span style={{
                      fontSize: 22, transition: "transform 0.3s",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0,
                      background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>+</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ padding: "0 26px 22px 64px", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
                      {obj.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "120px 5%", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 2 }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(0,240,255,0.18) 0%, rgba(255,0,212,0.1) 35%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="grid-bg" />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 68, letterSpacing: 3, lineHeight: 1.05, marginBottom: 24 }}>
              PRONTO PARA ASSISTIR<br />
              <span className="grad-text">TUDO QUE QUISER?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, margin: "0 auto 44px", maxWidth: 540, lineHeight: 1.7 }}>
              Comece com 4 horas de teste grátis agora mesmo. Sem cartão de crédito. Ativo em minutos.
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary pulse-btn" style={{ fontSize: 17, padding: "21px 54px" }}>
              📲 Falar no WhatsApp Agora
            </a>
            <p style={{ marginTop: 22, color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              Atendimento rápido e humanizado • Ativação imediata
            </p>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "rgba(5,3,15,0.9)", borderTop: "1px solid rgba(0,240,255,0.15)",
        padding: "36px 5%", display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16, position: "relative", zIndex: 2, backdropFilter: "blur(20px)",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 4,
          background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>CINEFX</div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>© {new Date().getFullYear()} CineFX. Todos os direitos reservados.</p>
        <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: "rgba(0,240,255,0.7)", fontSize: 13 }}>
          WhatsApp: (49) 98842-8055
        </a>
      </footer>
    </div>
  );
}
