
FROM node:22.9.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm i -f
 
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ENV NEXT_PUBLIC_KARERAMO_LOGO=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/kareramo-logo.png
ENV NEXT_PUBLIC_NATIONAL_ID=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/national-id.png
ENV NEXT_PUBLIC_BIRTH_CERTIFICATE=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/birth-cert.png
ENV NEXT_PUBLIC_BRGY_CERTIFICATE=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/brgy-cert.png
ENV NEXT_PUBLIC_SSS=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/sss.png
ENV NEXT_PUBLIC_PHILHEALTH=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/philhealth.png
ENV NEXT_PUBLIC_TIN_ID=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/tin.png


ENV NEXT_PUBLIC_KARERAMO_LOGO_2=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/kareramo-logo-2.png
ENV NEXT_PUBLIC_UMID_CARD_3=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%203.png
ENV NEXT_PUBLIC_UMID_CARD_4=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%204.png
ENV NEXT_PUBLIC_UMID_CARD_5=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%205.png
ENV NEXT_PUBLIC_UMID_CARD_6=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%206.png
ENV NEXT_PUBLIC_UMID_CARD_7=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%207.png
ENV NEXT_PUBLIC_UMID_CARD_8=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%208.png
ENV NEXT_PUBLIC_UMID_CARD_9=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%209.png
ENV NEXT_PUBLIC_UMID_CARD_10=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%2010.png
ENV NEXT_PUBLIC_UMID_CARD_11=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%2011.png
ENV NEXT_PUBLIC_UMID_CARD_12=https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%2012.png


COPY --from=deps /app/node_modules ./node_modules
COPY . .
 
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_API_URL=https://gov-id-tracker-ws.univerapp.site
# ENV NEXTAUTH_URL=https://forum.univerapp.site

 
RUN npm run build
 
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
 
ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
 
COPY --from=builder /app/public ./public
 
# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
 
USER nextjs
 
EXPOSE 3000
 
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
 
# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
