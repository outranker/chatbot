FROM node:22.14-slim AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update && apt-get install -y --no-install-recommends curl
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml tsconfig.* .


FROM base AS prod-deps
ENV NODE_ENV production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM base AS runtime
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install serve -g
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD [ "serve", "-s", "/app/dist" ]