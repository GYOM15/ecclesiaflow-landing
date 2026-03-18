# =============================================================================
# EcclesiaFlow Landing — Multi-stage Dockerfile
# =============================================================================
# Stage 1: Install dependencies
# Stage 2: Build the Next.js application
# Stage 3: Run with minimal Node.js image (standalone output)
# =============================================================================

# ---------------------------------------------------------------------------
# Stage 1 — Dependencies
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# ---------------------------------------------------------------------------
# Stage 2 — Build
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time args for Next.js rewrites (baked into standalone output)
ARG MEMBERS_API_URL=http://members-module:8080
ARG AUTH_API_URL=http://auth-module:8081
ENV MEMBERS_API_URL=${MEMBERS_API_URL}
ENV AUTH_API_URL=${AUTH_API_URL}

# Next.js standalone mode produces a self-contained server
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------------------------------------------------------------------------
# Stage 3 — Runtime
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runtime

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy standalone server + static assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
