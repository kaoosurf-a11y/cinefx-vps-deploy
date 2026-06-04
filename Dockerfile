# ─── Estágio 1: Build ───
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar package files e instalar deps
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copiar código e fazer build
COPY . .
RUN npm run build

# ─── Estágio 2: Servidor estático com nginx ───
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
