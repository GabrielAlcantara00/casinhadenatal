const base = "/assets/natal";

export const assets = {
  hero: `${base}/principal.webp`,
  vila: `${base}/vila-montada.webp`,
  complete: `${base}/completo.webp`,
  offer: `${base}/oferta.webp`,
  sheets: Array.from({ length: 10 }, (_, i) => `${base}/folha-${String(i + 1).padStart(2, '0')}.webp`),
  features: {
    illustrated: `${base}/fachada.webp`,
    guided: `${base}/montagem.webp`,
    reference: `${base}/referencia.webp`,
    accessories: `${base}/acessorios.webp`,
  },
  bonuses: Array.from({ length: 4 }, (_, i) => `${base}/bonus-${i + 1}.webp`),
  families: Array.from({ length: 9 }, (_, i) => `${base}/familia-${String(i + 1).padStart(2, '0')}.webp`),
};
