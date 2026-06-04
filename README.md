# CineFX Landing Page

Landing page profissional construída com React + Vite, sem dependências externas pagas.

## 🚀 Deploy no EasyPanel (Hostinger VPS)

### Opção 1: Via Git (recomendado)
1. Suba este projeto para um repositório no GitHub
2. No EasyPanel, crie um novo App → "From Git"
3. Cole a URL do repositório
4. Tipo: **Dockerfile** (já incluído)
5. Porta: **80**
6. Deploy

### Opção 2: Via upload direto
1. Comprima esta pasta em zip
2. No EasyPanel → "Upload" o zip
3. Configurar como App Docker

## 🌐 Domínio próprio

No EasyPanel → seu App → "Domains":
- Adicione `sfxapp.com.br` e `www.sfxapp.com.br`
- Configure SSL automático (Let's Encrypt)
- Aponte DNS na Hostinger:
  - Tipo A: `@` → IP da VPS
  - Tipo A: `www` → IP da VPS

## 🛠️ Desenvolvimento local
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gera dist/
npm run preview      # testa o build localmente
```

## 📝 Editar conteúdo
Tudo está em `src/App.jsx`:
- `plans` — preços e features
- `testimonials` — depoimentos
- `objections` — FAQ
- `BUYER_NAMES` / `CITIES` — toast de compras ao vivo
- `WA_LINK` — número de WhatsApp (linha ~313)
