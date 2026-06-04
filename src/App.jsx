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
  { name: "Marcos Vieira", city: "Florianópolis, SC", text: "A qualidade é incrível, tem tudo que sempre quis assistir e muito mais. Melhor decisão que tomei esse ano.", stars: 5, avatar: "https://i.pravatar.cc/150?img=12", time: "há 2 dias" },
  { name: "Juliana Ramos", city: "Curitiba, PR", text: "Já testei outros serviços e a CineFX é disparada o melhor. Tudo na mesma plataforma, sem travar, com qualidade absurda.", stars: 5, avatar: "https://i.pravatar.cc/150?img=47", time: "há 5 dias" },
  { name: "Ricardo Souza", city: "São Paulo, SP", text: "Instalei em menos de 5 minutos na minha Smart TV. O suporte no WhatsApp é muito rápido. Recomendo demais.", stars: 5, avatar: "https://i.pravatar.cc/150?img=51", time: "há 1 semana" },
  { name: "Patrícia Alves", city: "Joinville, SC", text: "Tava desconfiada, mas o teste grátis me convenceu na hora. Agora a família toda usa e não para de assistir.", stars: 5, avatar: "https://i.pravatar.cc/150?img=32", time: "há 2 semanas" },
  { name: "Diego Ferreira", city: "Porto Alegre, RS", text: "Pelo preço que pago tenho acesso a um catálogo gigantesco em Full HD. Nunca imaginei que fosse tão bom.", stars: 5, avatar: "https://i.pravatar.cc/150?img=15", time: "há 3 semanas" },
  { name: "Luciana Martins", city: "Belo Horizonte, MG", text: "Minha filha assiste na TV e eu no celular ao mesmo tempo. As 2 telas simultâneas fazem toda a diferença!", stars: 5, avatar: "https://i.pravatar.cc/150?img=26", time: "há 1 mês" },
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

// Categorias de catálogo para o mockup
const CATEGORIES = [
  { name: "Ação",    icon: "💥", colors: ["#ff006e", "#ff4d00", "#ffbe0b", "#ef233c"] },
  { name: "Comédia", icon: "😂", colors: ["#ffbe0b", "#06ffa5", "#00f0ff", "#fb5607"] },
  { name: "Romance", icon: "💕", colors: ["#ff00d4", "#ff4d8d", "#b14aed", "#ff006e"] },
  { name: "Drama",   icon: "🎭", colors: ["#8338ec", "#3a0ca3", "#7209b7", "#560bad"] },
  { name: "Jogos",   icon: "🎮", colors: ["#00f0ff", "#0077b6", "#06ffa5", "#0096c7"] },
  { name: "Esportes",icon: "⚽", colors: ["#06ffa5", "#00b4d8", "#00f0ff", "#0077b6"] },
  { name: "Doramas", icon: "🌸", colors: ["#ff00d4", "#b14aed", "#ff4d8d", "#c77dff"] },
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
        fontSize: 56, fontWeight: 900, lineHeight: 1, letterSpacing: -1,
        background: "linear-gradient(135deg, #00f0ff 0%, #ff00d4 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 24px rgba(0,240,255,0.4))",
      }}>
        {count.toLocaleString("pt-BR")}{suffix}
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 10, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>
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
          borderRadius: 18, padding: "14px 18px",
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

// ─── HERO MOCKUP — Catálogo por gênero ───
function PosterCard({ color, height = 80, label }) {
  return (
    <div style={{
      flexShrink: 0,
      width: height * 0.68,
      height: height,
      borderRadius: 8,
      background: `linear-gradient(135deg, ${color}, ${color}aa)`,
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "flex-end",
      padding: 6,
    }}>
      {/* Brilho diagonal */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />
      <div style={{ width: "70%", height: 2, background: "rgba(255,255,255,0.7)", borderRadius: 2, position: "relative", zIndex: 1 }} />
    </div>
  );
}

function CategoryRow({ category, posterHeight = 80, showAll = false }) {
  const count = showAll ? 6 : 4;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        marginBottom: 6, paddingLeft: 4,
      }}>
        <span style={{ fontSize: posterHeight > 60 ? 12 : 9 }}>{category.icon}</span>
        <span style={{
          fontSize: posterHeight > 60 ? 11 : 8,
          fontWeight: 700,
          color: "rgba(255,255,255,0.95)",
          letterSpacing: 0.5,
        }}>{category.name}</span>
      </div>
      <div style={{ display: "flex", gap: 6, paddingLeft: 4 }}>
        {Array.from({ length: count }).map((_, i) => (
          <PosterCard key={i} color={category.colors[i % category.colors.length]} height={posterHeight} />
        ))}
      </div>
    </div>
  );
}

function HeroMockup() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto" }}>
      {/* TV principal */}
      <div style={{
        position: "relative",
        background: "linear-gradient(180deg, #1a1030 0%, #0a0518 100%)",
        border: "2px solid rgba(0,240,255,0.3)",
        borderRadius: 20,
        padding: 14,
        boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 100px rgba(0,240,255,0.2)",
      }}>
        <div style={{
          background: "#000",
          borderRadius: 12,
          overflow: "hidden",
          aspectRatio: "16/9",
          position: "relative",
          padding: "14px 12px 12px",
          background: "linear-gradient(135deg, #1a0030 0%, #050015 100%)",
        }}>
          {/* Header da TV */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 10, padding: "0 4px",
          }}>
            <span style={{
              fontSize: 16, letterSpacing: 2, fontWeight: 800,
              background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>CINEFX</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 8, letterSpacing: 1 }}>
              <span style={{ color: "#ff006e" }}>●</span> AO VIVO
            </span>
          </div>
          {/* Categorias */}
          <div style={{ overflow: "hidden" }}>
            {CATEGORIES.slice(0, 3).map((c) => (
              <CategoryRow key={c.name} category={c} posterHeight={56} />
            ))}
          </div>
        </div>
        {/* Base TV */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <div style={{ width: 60, height: 4, background: "rgba(0,240,255,0.4)", borderRadius: 4 }} />
        </div>
      </div>

      {/* Celular flutuante */}
      <div style={{
        position: "absolute",
        bottom: -40, right: -10,
        width: 140,
        background: "linear-gradient(180deg, #1a1030, #0a0518)",
        border: "2px solid rgba(255,0,212,0.4)",
        borderRadius: 22,
        padding: 6,
        boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 60px rgba(255,0,212,0.3)",
        transform: "rotate(6deg)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1a0030, #050015)",
          borderRadius: 16,
          aspectRatio: "9/16",
          padding: "10px 6px 6px",
          overflow: "hidden",
        }}>
          {/* Header do celular */}
          <div style={{
            textAlign: "center", marginBottom: 8,
          }}>
            <span style={{
              fontSize: 9, letterSpacing: 1.5, fontWeight: 800,
              background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>CINEFX</span>
          </div>
          {/* Categorias compactas */}
          <div style={{ overflow: "hidden" }}>
            {CATEGORIES.slice(3, 7).map((c) => (
              <CategoryRow key={c.name} category={c} posterHeight={32} />
            ))}
          </div>
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
    <div style={{ fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif", background: "#05030f", color: "#fff", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05030f; font-family: 'Poppins', sans-serif; }
        a { text-decoration: none; }

        .grad-text {
          background: linear-gradient(90deg, #00f0ff 0%, #ff00d4 50%, #b14aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: shimmer 6s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        .eyebrow {
          font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;
          background: linear-gradient(90deg, #00f0ff, #ff00d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .section-title {
          font-family: 'Poppins', sans-serif; font-size: 48px; font-weight: 800;
          letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 18px; color: #fff;
        }
        .section-sub { color: rgba(255,255,255,0.6); font-size: 16px; max-width: 540px; margin: 0 auto; line-height: 1.65; font-weight: 400; }

        .btn-primary {
          display: inline-block; position: relative; color: #05030f;
          padding: 17px 38px; border-radius: 100px; font-weight: 700;
          font-size: 15px; letter-spacing: 0.3px; cursor: pointer;
          border: none; text-align: center; overflow: hidden;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(90deg, #00f0ff, #ff00d4);
          background-size: 200% 100%;
          box-shadow: 0 10px 40px rgba(0,240,255,0.4), 0 0 60px rgba(255,0,212,0.25);
          transition: all 0.3s cubic-bezier(.2,.7,.2,1);
        }
        .btn-primary:hover { background-position: 100% 0; transform: translateY(-2px) scale(1.02); box-shadow: 0 14px 50px rgba(0,240,255,0.6), 0 0 80px rgba(255,0,212,0.4); }
        .btn-outline {
          display: inline-block; background: rgba(255,255,255,0.04); color: #fff;
          padding: 16px 34px; border-radius: 100px; font-weight: 600;
          font-size: 14px; cursor: pointer; letter-spacing: 0.3px;
          font-family: 'Poppins', sans-serif;
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
          border-radius: 24px; padding: 36px 30px;
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
          border-radius: 22px; padding: 28px;
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
          border-radius: 22px; padding: 26px;
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
          border-radius: 28px; padding: 40px;
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
          .hero-title { font-size: 40px !important; }
          .section-title { font-size: 34px !important; }
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
          fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 900, letterSpacing: 1,
          background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 12px rgba(0,240,255,0.5))",
        }}>CineFX</div>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "11px 24px", fontSize: 13 }}>
          Teste Grátis
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "120px 5% 100px", overflow: "hidden" }}>
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
                fontSize: 12, fontWeight: 600, color: "#00f0ff", letterSpacing: 1,
                textTransform: "uppercase", backdropFilter: "blur(10px)",
                boxShadow: "0 0 30px rgba(0,240,255,0.2)",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 12px #00f0ff", display: "inline-block" }} />
                +12.000 conteúdos para toda a família
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="hero-title" style={{
                fontFamily: "'Poppins', sans-serif", fontSize: 64, fontWeight: 800,
                lineHeight: 1.05, letterSpacing: -2, marginBottom: 28, color: "#fff",
              }}>
                O entretenimento que sua família <span className="grad-text">merece</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 40, maxWidth: 540, fontWeight: 400 }}>
                Mais de 12.000 conteúdos em Full HD — filmes, séries e esportes ao vivo.{" "}
                <strong style={{ color: "#fff", fontWeight: 600 }}>Funciona em qualquer tela. Cancele quando quiser.</strong>
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
                Tudo que você <span className="grad-text">precisa</span>
              </h2>
              <p className="section-sub">A experiência completa de entretenimento — com qualidade, praticidade e suporte de verdade.</p>
            </div>
          </Reveal>
          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.1}>
                <div className="benefit-card">
                  <div style={{
                    width: 56, height: 56, borderRadius: 18,
                    background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,212,0.15))",
                    border: "1px solid rgba(0,240,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, marginBottom: 18,
                  }}>{b.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3, marginBottom: 10, color: "#fff" }}>
                    {b.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.65, fontWeight: 400 }}>{b.desc}</p>
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
                Quem experimenta <span className="grad-text">não para</span> de assistir
              </h2>
              <p className="section-sub">Filmes, séries, esportes e muito mais — tudo na palma da mão.</p>
            </div>
          </Reveal>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.1}>
                <div className="testimonial-card">
                  <Stars count={t.stars} />
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7, margin: "16px 0 22px", fontWeight: 400 }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%",
                      padding: 2,
                      background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                      flexShrink: 0,
                      boxShadow: "0 0 20px rgba(0,240,255,0.3)",
                    }}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        loading="lazy"
                        style={{
                          width: "100%", height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                          display: "block",
                          background: "#1a0030",
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>{t.city} • {t.time}</div>
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
              <h2 className="section-title">Funciona em <span className="grad-text">qualquer tela</span></h2>
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
              <h2 className="section-title">Escolha seu <span className="grad-text">plano</span></h2>
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
                      fontSize: 11, fontWeight: 700, padding: "5px 18px", borderRadius: 100,
                      whiteSpace: "nowrap", letterSpacing: 1, textTransform: "uppercase",
                      boxShadow: "0 6px 20px rgba(0,240,255,0.4)",
                    }}>{plan.badge}</div>
                  )}
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
                      {plan.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>R$</span>
                      <span style={{
                        fontSize: 64, fontWeight: 800, lineHeight: 1, letterSpacing: -2,
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
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "9px 0", fontSize: 14, color: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: 400 }}>
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
                  <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 12, color: "#fff" }}>
                    Teste grátis por 4 horas
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.65, fontWeight: 400 }}>
                    Você experimenta a plataforma <strong style={{ color: "#fff", fontWeight: 600 }}>sem pagar nada</strong> e sem precisar cadastrar cartão. Só assina se gostar — e mesmo depois, pode cancelar quando quiser, sem multa e sem burocracia.
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
              <h2 className="section-title">Sem <span className="grad-text">pegadinhas</span></h2>
              <p className="section-sub">Respondemos as dúvidas mais comuns com total transparência.</p>
            </div>
          </Reveal>
          <Reveal>
            <div style={{
              background: "linear-gradient(180deg, rgba(20,12,40,0.6), rgba(10,5,25,0.8))",
              border: "1px solid rgba(0,240,255,0.2)",
              borderRadius: 24, overflow: "hidden", backdropFilter: "blur(12px)",
            }}>
              {objections.map((obj, i) => (
                <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontSize: 22 }}>{obj.icon}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: openFaq === i ? "#fff" : "rgba(255,255,255,0.85)" }}>{obj.question}</span>
                    </div>
                    <span style={{
                      fontSize: 22, fontWeight: 700, transition: "transform 0.3s",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0,
                      background: "linear-gradient(135deg, #00f0ff, #ff00d4)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>+</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ padding: "0 26px 22px 64px", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontWeight: 400 }}>
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
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, marginBottom: 24 }}>
              Pronto para assistir<br />
              <span className="grad-text">tudo que quiser?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, margin: "0 auto 44px", maxWidth: 540, lineHeight: 1.7, fontWeight: 400 }}>
              Comece com 4 horas de teste grátis agora mesmo. Sem cartão de crédito. Ativo em minutos.
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary pulse-btn" style={{ fontSize: 17, padding: "21px 54px" }}>
              📲 Falar no WhatsApp Agora
            </a>
            <p style={{ marginTop: 22, color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 400 }}>
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
          fontSize: 22, fontWeight: 900, letterSpacing: 1,
          background: "linear-gradient(90deg, #00f0ff, #ff00d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>CineFX</div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 400 }}>© {new Date().getFullYear()} CineFX. Todos os direitos reservados.</p>
        <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: "rgba(0,240,255,0.7)", fontSize: 13, fontWeight: 500 }}>
          WhatsApp: (49) 98842-8055
        </a>
      </footer>
    </div>
  );
}
