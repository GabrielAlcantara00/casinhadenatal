import { mkdir, access, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'assets', 'natal');
const base = 'https://viladopapainoel.zenly.cloud/assets/img';
const files = {
  'principal.webp': `${base}/principal-a8e5d321.webp`,
  'vila-montada.webp': `${base}/vila-montada-8c5d1667.webp`,
  'completo.webp': `${base}/completo-776463e0.webp`,
  'oferta.webp': `${base}/oferta-169b910f.webp`,
  'folha-01.webp': `${base}/folha-01-ba46d321.webp`,
  'folha-02.webp': `${base}/folha-02-d6656746.webp`,
  'folha-03.webp': `${base}/folha-03-7f657648.webp`,
  'folha-04.webp': `${base}/folha-04-4376d43c.webp`,
  'folha-05.webp': `${base}/folha-05-49851028.webp`,
  'folha-06.webp': `${base}/folha-06-5e42c33e.webp`,
  'folha-07.webp': `${base}/folha-07-0217829e.webp`,
  'folha-08.webp': `${base}/folha-08-5a1e6f67.webp`,
  'folha-09.webp': `${base}/folha-09-f6b7c7b9.webp`,
  'folha-10.webp': `${base}/folha-10-15f826be.webp`,
  'fachada.webp': `${base}/fachada-368099f4.webp`,
  'montagem.webp': `${base}/montagem-672bfafc.webp`,
  'referencia.webp': `${base}/referencia-c56b161b.webp`,
  'acessorios.webp': `${base}/acessorios-eb9ad982.webp`,
  'bonus-1.webp': `${base}/bonus-1-556e1168.webp`,
  'bonus-2.webp': `${base}/bonus-2-6e811c33.webp`,
  'bonus-3.webp': `${base}/bonus-3-375e34c2.webp`,
  'bonus-4.webp': `${base}/bonus-4-ef8b016b.webp`,
  'familia-01.webp': `${base}/familia-cozinha-noite-2553ca96.webp`,
  'familia-02.webp': `${base}/avos-netos-b5987727.webp`,
  'familia-03.webp': `${base}/mae-filho-tapete-d391f67c.webp`,
  'familia-04.webp': `${base}/pai-gemeas-varanda-9b011517.webp`,
  'familia-05.webp': `${base}/tia-primos-quarto-ab827e75.webp`,
  'familia-06.webp': `${base}/familia-mesa-cada46a6.webp`,
  'familia-07.webp': `${base}/mae-filha-recortando-c12324c2.webp`,
  'familia-08.webp': `${base}/pai-filha-montando-57307aaa.webp`,
  'familia-09.webp': `${base}/mae-filhos-folha-4c8651ce.webp`,
};

await mkdir(root, { recursive: true });

for (const [name, url] of Object.entries(files)) {
  const dest = path.join(root, name);
  try {
    await access(dest);
    continue;
  } catch {}

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao baixar ${url}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(dest, bytes);
  console.log(`asset: ${name}`);
}
