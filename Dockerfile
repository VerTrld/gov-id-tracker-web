
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

ENV NEXT_PUBLIC_ILLUSTRATOR="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/illustrator_1.png" \
    NEXT_PUBLIC_KARERAMO_LOGO="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/new-icon-logo.png" \
    NEXT_PUBLIC_LANDING_IMAGE="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/landing_1.png" \
    NEXT_PUBLIC_NATIONAL_ID="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/national-id.png" \
    NEXT_PUBLIC_TIN_ID="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/tin.png" \
    NEXT_PUBLIC_SSS="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/sss.png" \
    NEXT_PUBLIC_PHILHEALTH="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/philhealth.png" \
    NEXT_PUBLIC_PAGIBIG="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/pagibig.png" \
    NEXT_PUBLIC_NBI="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/nbi.png" \
    NEXT_PUBLIC_PASSPORT="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/passport.png" \
    NEXT_PUBLIC_POST_OFFICE="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/post-office.png" \
    NEXT_PUBLIC_DRIVER_LICENSE="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/driver-license.png" \
    NEXT_PUBLIC_BRGY_CERTIFICATE="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/brgy-cert.png" \
    NEXT_PUBLIC_STEP_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/step-1.png" \
    NEXT_PUBLIC_STEP_2="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/step-2.png" \
    NEXT_PUBLIC_STEP_3="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/step-3.png" \
    NEXT_PUBLIC_STEP_4="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/step-4.png" \
    NEXT_PUBLIC_UMID_CARD_3="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%203.png" \
    NEXT_PUBLIC_UMID_CARD_4="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%204.png" \
    NEXT_PUBLIC_UMID_CARD_5="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%205.png" \
    NEXT_PUBLIC_UMID_CARD_6="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%206.png" \
    NEXT_PUBLIC_UMID_CARD_7="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%207.png" \
    NEXT_PUBLIC_UMID_CARD_8="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%208.png" \
    NEXT_PUBLIC_UMID_CARD_9="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%209.png" \
    NEXT_PUBLIC_UMID_CARD_10="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%2010.png" \
    NEXT_PUBLIC_UMID_CARD_11="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%2011.png" \
    NEXT_PUBLIC_UMID_CARD_12="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/UMID%20Card%20-%2012.png" \
    NEXT_PUBLIC_PHILID_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/phil-icon.png" \
    NEXT_PUBLIC_TIN_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/tin-icon.png" \
    NEXT_PUBLIC_SSS_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/sss-icon.png" \
    NEXT_PUBLIC_PASSPORT_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/passport-icon.png" \
    NEXT_PUBLIC_POSTAL_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/postal-icon.png" \
    NEXT_PUBLIC_UMID_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/umid-icon.png" \
    NEXT_PUBLIC_PHILHEALTH_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/philhealth-icon.png" \
    NEXT_PUBLIC_PAGIBIG_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/pagibig-2-icon.png" \
    NEXT_PUBLIC_NBI_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/nbiclearance-icon.png" \
    NEXT_PUBLIC_DRIVERLICENSE_ICON="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-assets/driverlicense-icon.png" \
    NEXT_PUBLIC_HOME_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/background-blur-1.png" \
    NEXT_PUBLIC_HOME_2="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/backgroud-blur-2.png" \
    NEXT_PUBLIC_HOME_3="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/background-blur-3.png" \
    NEXT_PUBLIC_ABOUT_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/backgroud-blur-4.png" \
    NEXT_PUBLIC_ABOUT_2="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/backgroud-blur-5.png" \
    NEXT_PUBLIC_ABOUT_3="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/backgroud-blur-6-1.png" \
    NEXT_PUBLIC_ABOUT_4="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/backgroud-blur-7-2.png" \
    NEXT_PUBLIC_TERMS_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/terms-1.png" \
    NEXT_PUBLIC_CONTACT_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/background-contacts.png" \
    NEXT_PUBLIC_FEATURES_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/terms-1.png" \
    NEXT_PUBLIC_DASH_1="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/background-contacts.png" \
    NEXT_PUBLIC_DASH_2="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/terms-1.png" \
    NEXT_PUBLIC_PROGRESS="https://lacbxyahzmyivlbcrtau.supabase.co/storage/v1/object/public/gov-id-tracker-background/background-progress.png"


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
