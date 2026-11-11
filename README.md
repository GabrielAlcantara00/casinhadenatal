# Vila do Papai Noel — LP Premium

Projeto Next.js pronto para GitHub/Vercel.

## Checkouts
Edite somente `src/config/site.ts`:

- `plans.starter.checkoutUrl` → plano R$10
- `plans.premium.checkoutUrl` → plano R$27
- `plans.exitOffer.checkoutUrl` → Premium promocional R$19,90

## Oferta
- Starter R$10: pack reduzido com Casa do Papai Noel, Oficina de Brinquedos e Correio do Papai Noel.
- Premium R$27: vila completa + 4 bônus.
- Upgrade do Starter: Premium por R$19,90.
- Exit-intent: roleta promocional que libera Premium por R$19,90.
- Garantia exibida: 7 dias, conforme a oferta de referência.

## Imagens
Os assets ficam em `public/assets/natal/`. O script `scripts/download-assets.mjs` roda automaticamente antes de `npm run build` e baixa os arquivos da oferta de referência para o próprio deploy. O site publicado usa os caminhos locais de `src/config/assets.ts`.
