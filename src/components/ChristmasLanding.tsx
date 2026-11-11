'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { assets } from '@/config/assets';
import { money, siteConfig } from '@/config/site';

const deliverables = [
  'Casa do Papai Noel',
  'Oficina de Brinquedos',
  'Correio do Papai Noel',
  'Loja de Presentes',
  'Estábulo das Renas',
  'Personagens da Vila',
  'Trenó e Renas',
  'Elementos da Vila',
  'Árvores e Decoração',
  'Placa de Entrada',
];

const bonuses = [
  {
    title: '12 Missões Mágicas do Papai Noel',
    text: 'Desafios divertidos para continuar a brincadeira depois que a vila estiver pronta.',
    value: 'R$47,90',
  },
  {
    title: 'Correio Encantado do Papai Noel',
    text: 'Cartinhas, envelopes e mensagens para brincar de correio do Polo Norte.',
    value: 'R$27,90',
  },
  {
    title: 'Histórias Encantadas da Vila',
    text: 'Pequenas aventuras para ler, imaginar e usar como ponto de partida para novas brincadeiras.',
    value: 'R$37,90',
  },
  {
    title: 'Nosso Natal em Família',
    text: 'Um álbum para guardar fotos e lembranças dos momentos especiais deste Natal.',
    value: 'R$47,90',
  },
];

const faq = [
  ['O produto é físico ou digital?', 'É digital. Você recebe um material em PDF para imprimir e montar. Nenhum item físico é enviado pelo correio.'],
  ['Vou receber as casinhas prontas?', 'Não. Você recebe os arquivos para imprimir, recortar, dobrar, colar e montar em casa.'],
  ['Preciso imprimir o material?', 'Sim. A experiência utiliza os moldes impressos. Você pode imprimir em casa ou em uma gráfica.'],
  ['As crianças podem participar?', 'Sim, com acompanhamento de adultos. As etapas de recorte e colagem devem ser adequadas à idade e habilidade da criança.'],
  ['Quais materiais eu preciso?', 'Papel para impressão e materiais apropriados para recortar e colar.'],
  ['Os 4 bônus estão no plano Premium?', 'Sim. O plano Premium inclui a Vila completa e os 4 bônus apresentados na página.'],
  ['Como eu recebo o material?', 'Depois da confirmação do pagamento, a plataforma de checkout deve liberar as instruções para acessar o material digital.'],
];

function checkoutUrl(base: string) {
  if (!base) return '';
  if (typeof window === 'undefined') return base;
  try {
    const url = new URL(base);
    const params = new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck','fbclid'].forEach((key) => {
      const value = params.get(key);
      if (value) url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    return base;
  }
}

function goCheckout(base: string) {
  const url = checkoutUrl(base);
  if (!url) {
    alert('Configure o link deste checkout em src/config/site.ts');
    return;
  }
  sessionStorage.setItem('vila-checkout-clicked', '1');
  window.location.href = url;
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function ChristmasLanding() {
  const [starterUpsell, setStarterUpsell] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const wheelRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let exitShown = sessionStorage.getItem('vila-exit-shown') === '1';

    const openExit = () => {
      if (exitShown) return;
      if (sessionStorage.getItem('vila-checkout-clicked') === '1') return;
      exitShown = true;
      sessionStorage.setItem('vila-exit-shown', '1');
      setWon(false);
      setSpinning(false);
      setExitOpen(true);
    };

    const mouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !event.relatedTarget) openExit();
    };

    let lastY = window.scrollY;
    let upward = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY && y > 500) upward += 1;
      else upward = Math.max(0, upward - 1);
      if (upward >= 7) openExit();
      lastY = y;
    };

    document.addEventListener('mouseout', mouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', mouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const wheelLabels = useMemo(() => [
    ['BÔNUS', 'EXTRA'],
    ['PREMIUM', 'R$24,90'],
    ['PREMIUM', 'R$19,90'],
    ['PLANO', 'R$27,00'],
    ['5%', 'OFF'],
    ['PREMIUM', 'R$22,90'],
  ], []);

  const spin = () => {
    if (spinning || !wheelRef.current) return;
    setSpinning(true);
    wheelRef.current.style.transform = 'rotate(2730deg)';
    window.setTimeout(() => setWon(true), 5100);
  };

  return (
    <main>
      <div className="top-strip">🎄 OFERTA ESPECIAL DE NATAL • PRODUTO 100% DIGITAL • ACESSO APÓS A COMPRA</div>

      <section className="hero section-shell">
        <div className="snow snow-a" />
        <div className="snow snow-b" />
        <div className="hero-copy">
          <div className="eyebrow">KIT DIGITAL PARA IMPRIMIR, MONTAR E BRINCAR EM FAMÍLIA</div>
          <h1>UM NATAL QUE ELES NÃO VÃO SÓ ABRIR.<br/><span>VÃO CONSTRUIR COM VOCÊ.</span></h1>
          <div className="hero-art glow-wrap hero-art-inline">
            <img src={assets.hero} alt="Vila do Papai Noel com caixa ilustrativa, folhas e peças montadas" fetchPriority="high" />
            <div className="floating-note">🎁 UMA ATIVIDADE PARA FAZER JUNTO</div>
          </div>
          <p className="hero-sub">Imprima a Vila do Papai Noel, reúna a família e transforme uma tarde comum em uma atividade de Natal feita por vocês — casinha por casinha.</p>
          <div className="mechanism"><b>IMPRIMA</b><i>→</i><b>MONTE</b><i>→</i><b>BRINQUE</b><i>→</i><b>GUARDE</b></div>
          <button className="primary-btn hero-btn" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}>QUERO VIVER ESSA MAGIA <Arrow/></button>
          <div className="hero-chips"><span>✓ Material em PDF</span><span>✓ Vila completa no Premium</span><span>✓ 4 bônus</span><span>✓ 7 dias de garantia</span></div>
        </div>
      </section>

      <section className="mini-proof">
        <div><strong>10</strong><span>grupos de moldes</span></div>
        <div><strong>4</strong><span>bônus no Premium</span></div>
        <div><strong>PDF</strong><span>pronto para imprimir</span></div>
        <div><strong>7 dias</strong><span>de garantia</span></div>
      </section>

      <section className="section dark-section" id="previas">
        <div className="section-heading">
          <div className="eyebrow">VEJA O QUE VAI PARA A SUA IMPRESSORA</div>
          <h2>AS FOLHAS JÁ VÊM ORGANIZADAS PARA <span>RECORTAR, DOBRAR E MONTAR.</span></h2>
          <p>Do Papai Noel ao trenó: explore as prévias do material digital.</p>
        </div>
        <div className="sheet-marquee">
          <div className="sheet-track">
            {[...assets.sheets, ...assets.sheets].map((src, index) => (
              <figure className="sheet-card" key={`${src}-${index}`} aria-hidden={index >= assets.sheets.length ? true : undefined}>
                <img src={src} alt={index < assets.sheets.length ? `Prévia do molde ${index + 1} da Vila do Papai Noel` : ''} loading="lazy" />
                <figcaption>{deliverables[index % deliverables.length]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section split-section">
        <div className="split-art glow-red"><img src={assets.vila} alt="Vila do Papai Noel montada" loading="lazy" /></div>
        <div className="split-copy">
          <div className="eyebrow green">NÃO É SÓ MAIS UM ARQUIVO DE NATAL</div>
          <h2>É UMA DESCULPA PRONTA PARA <span>PARAR A CORRERIA E SENTAR TODO MUNDO À MESA.</span></h2>
          <p>Vocês imprimem, recortam, dobram e veem a vila ganhar forma juntos. Depois, ela continua como cenário para brincar e como decoração feita em família.</p>
          <ul className="check-list"><li>Monte casinhas e personagens</li><li>Brinque com Papai Noel, trenó e renas</li><li>Invente novas histórias com a vila pronta</li><li>Registre o momento e guarde a lembrança</li></ul>
          <button className="secondary-btn" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}>QUERO MONTAR A NOSSA VILA <Arrow/></button>
        </div>
      </section>

      <section className="section dark-section">
        <div className="section-heading">
          <div className="eyebrow">FEITO PARA FACILITAR A MONTAGEM</div>
          <h2>VOCÊ NÃO PRECISA <span>ADIVINHAR COMO MONTA.</span></h2>
        </div>
        <div className="feature-grid">
          {[
            [assets.features.illustrated,'Moldes ilustrados','As peças vêm desenhadas e identificadas na folha.'],
            [assets.features.guided,'Montagem guiada','Linhas de recorte, dobra e abas indicam o caminho.'],
            [assets.features.reference,'Modelo de referência','A própria folha mostra como a peça montada deve ficar.'],
            [assets.features.accessories,'Acessórios para brincar','Árvores, presentes, placas e personagens completam a vila.'],
          ].map(([img,title,text]) => <article className="feature-card" key={title}><img src={img} alt="" loading="lazy"/><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="section emotional-section">
        <div className="section-heading">
          <div className="eyebrow green">MENOS TELA. MAIS MEMÓRIA.</div>
          <h2>UMA TARDE SIMPLES PODE VIRAR <span>A LEMBRANÇA FAVORITA DESTE NATAL.</span></h2>
          <p>Imagens ilustrativas da experiência de montagem em família.</p>
        </div>
        <div className="family-marquee">
          <div className="family-track">
            {[...assets.families, ...assets.families].map((src,index)=><img key={`${src}-${index}`} src={src} alt={index < assets.families.length ? 'Cena ilustrativa de família montando a vila' : ''} loading="lazy" aria-hidden={index >= assets.families.length ? true : undefined}/>) }
          </div>
        </div>
      </section>

      <section className="section contents-section">
        <div className="contents-art"><img src={assets.complete} alt="Conteúdo da Vila do Papai Noel" loading="lazy"/></div>
        <div className="contents-copy">
          <div className="eyebrow">VILA COMPLETA</div>
          <h2>TUDO O QUE VOCÊ PRECISA PARA <span>COMEÇAR A MONTAGEM.</span></h2>
          <div className="deliverables-grid">{deliverables.map((item,index)=><div key={item}><b>{String(index+1).padStart(2,'0')}</b><span>{item}</span></div>)}</div>
        </div>
      </section>

      <section className="section bonus-section">
        <div className="section-heading">
          <div className="eyebrow gold">NO PREMIUM, A BRINCADEIRA CONTINUA</div>
          <h2>VOCÊ TAMBÉM RECEBE <span>4 BÔNUS EXCLUSIVOS.</span></h2>
          <p>Os quatro bônus apresentados na oferta original entram juntos no plano completo.</p>
        </div>
        <div className="bonus-grid">
          {bonuses.map((bonus,index)=><article className="bonus-card" key={bonus.title}><img src={assets.bonuses[index]} alt={bonus.title} loading="lazy"/><div className="bonus-body"><span className="bonus-number">BÔNUS #{index+1}</span><h3>{bonus.title}</h3><p>{bonus.text}</p><small>Valor de referência: <del>{bonus.value}</del></small><b>INCLUÍDO NO PREMIUM</b></div></article>)}
        </div>
        <div className="bonus-total"><span>Valor informado dos 4 bônus:</span><del>R$151,60</del><strong>NO PREMIUM: R$0,00</strong></div>
      </section>

      <section className="section pricing-section" id="planos">
        <div className="section-heading">
          <div className="eyebrow">ESCOLHA COMO QUER COMEÇAR</div>
          <h2>UM NATAL PARA MONTAR <span>DO SEU JEITO.</span></h2>
        </div>
        <div className="pricing-grid">
          <article className="price-card starter-card">
            <div className="plan-tag">PACK REDUZIDO</div>
            <h3>VILA STARTER</h3>
            <p>Para testar a experiência com uma versão menor.</p>
            <div className="big-price"><sup>R$</sup>10<small>,00</small></div>
            <ul><li>Casa do Papai Noel</li><li>Oficina de Brinquedos</li><li>Correio do Papai Noel</li><li>Material digital em PDF</li><li className="muted-line">Sem os 4 bônus Premium</li><li className="muted-line">Sem a vila completa</li></ul>
            <button className="starter-btn" onClick={() => setStarterUpsell(true)}>QUERO COMEÇAR POR R$10 <Arrow/></button>
          </article>

          <article className="price-card premium-card">
            <div className="recommended">⭐ MAIS COMPLETO</div>
            <div className="plan-tag">VILA COMPLETA + 4 BÔNUS</div>
            <h3>VILA PREMIUM</h3>
            <p>Para viver a experiência completa e continuar a brincadeira depois da montagem.</p>
            <div className="big-price"><sup>R$</sup>27<small>,00</small></div>
            <ul><li>Todos os 10 grupos de moldes</li><li>Casinhas, personagens, trenó e renas</li><li>Material digital em PDF</li><li>12 Missões Mágicas</li><li>Correio Encantado</li><li>Histórias Encantadas</li><li>Álbum Nosso Natal em Família</li></ul>
            <button className="primary-btn" onClick={() => goCheckout(siteConfig.plans.premium.checkoutUrl)}>QUERO A VILA COMPLETA <Arrow/></button>
          </article>
        </div>
        <p className="pricing-note">Pagamento único • Produto digital • Configure os links em <code>src/config/site.ts</code></p>
      </section>

      <section className="section guarantee-section">
        <div className="guarantee-badge">7</div>
        <div><div className="eyebrow green">GARANTIA</div><h2>VOCÊ TEM <span>7 DIAS</span> PARA CONHECER O MATERIAL.</h2><p>A oferta original informa garantia de 7 dias para a Vila do Papai Noel.</p></div>
      </section>

      <section className="section access-section">
        <div className="section-heading"><div className="eyebrow">COMO FUNCIONA</div><h2>DA COMPRA PARA A MESA EM <span>4 PASSOS.</span></h2></div>
        <div className="steps">
          {[['01','Finalize a compra','Conclua o pagamento na página segura de checkout.'],['02','Receba o acesso','Depois da confirmação, receba as instruções para acessar o material.'],['03','Imprima as folhas','Imprima em casa ou numa gráfica.'],['04','Monte em família','Recorte, dobre, cole e comece a brincar.']].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading"><div className="eyebrow">DÚVIDAS FREQUENTES</div><h2>ANTES DE <span>COMEÇAR A MONTAR.</span></h2></div>
        <div className="faq-list">{faq.map(([question,answer],index)=><button className={`faq-item ${openFaq===index?'open':''}`} key={question} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b>{openFaq===index?'−':'+'}</b><p>{answer}</p></button>)}</div>
      </section>

      <footer><strong>VILA DO PAPAI NOEL</strong><p>Produto 100% digital em PDF. Nenhum item físico é enviado. Imagens de família são ilustrativas.</p></footer>

      <button className="sticky-cta" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior:'smooth' })}>🎄 VER OFERTA DE NATAL</button>

      {starterUpsell && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="upgrade-modal">
            <button className="modal-close" onClick={()=>setStarterUpsell(false)}>×</button>
            <div className="modal-badge">🎁 ESPERE — LIBERAMOS UMA CONDIÇÃO MELHOR</div>
            <h2>EM VEZ DO PACK REDUZIDO,<br/><span>LEVE A VILA COMPLETA.</span></h2>
            <img src={assets.offer} alt="Vila completa com bônus"/>
            <p>Você estava indo para o plano de R$10. Nesta tela, pode desbloquear o Premium completo com os 4 bônus.</p>
            <div className="modal-price"><del>{money(siteConfig.plans.premium.price)}</del><strong>{money(siteConfig.plans.exitOffer.price)}</strong></div>
            <button className="primary-btn" onClick={()=>goCheckout(siteConfig.plans.exitOffer.checkoutUrl)}>SIM, QUERO O PREMIUM POR R$19,90 <Arrow/></button>
            <button className="text-btn" onClick={()=>goCheckout(siteConfig.plans.starter.checkoutUrl)}>Não, quero continuar apenas com o Starter de R$10</button>
          </div>
        </div>
      )}

      {exitOpen && (
        <div className="modal-overlay exit-overlay" role="dialog" aria-modal="true">
          <div className="wheel-modal">
            <button className="modal-close" onClick={()=>setExitOpen(false)}>×</button>
            {!won ? <>
              <div className="modal-badge">🎄 ANTES DE IR...</div>
              <h2>GIRE A ROLETA E <span>REVELE SUA OFERTA DE NATAL.</span></h2>
              <p>Uma condição especial foi liberada para esta sessão.</p>
              <div className="wheel-stage">
                <div className="wheel-pointer"/>
                <svg ref={wheelRef} className="wheel-svg" viewBox="0 0 400 400" aria-label="Roleta promocional">
                  <path d="M200 200 L200 10 A190 190 0 0 1 364.545 105 Z" fill="#b51224"/>
                  <path d="M200 200 L364.545 105 A190 190 0 0 1 364.545 295 Z" fill="#0e5d3c"/>
                  <path d="M200 200 L364.545 295 A190 190 0 0 1 200 390 Z" fill="#d9a52d"/>
                  <path d="M200 200 L200 390 A190 190 0 0 1 35.455 295 Z" fill="#7f101f"/>
                  <path d="M200 200 L35.455 295 A190 190 0 0 1 35.455 105 Z" fill="#147a4d"/>
                  <path d="M200 200 L35.455 105 A190 190 0 0 1 200 10 Z" fill="#a11a2b"/>
                  <circle cx="200" cy="200" r="188" fill="none" stroke="#f5e6bd" strokeWidth="8"/>
                  <circle cx="200" cy="200" r="60" fill="#08120d" stroke="#f5e6bd" strokeWidth="7"/>
                  {[ [262,93],[330,197],[265,308],[135,308],[70,197],[138,93] ].map(([x,y],index)=><text key={index} x={x} y={y} textAnchor="middle" className={index===2?'wheel-premium':''}><tspan x={x}>{wheelLabels[index][0]}</tspan><tspan x={x} dy="19">{wheelLabels[index][1]}</tspan></text>)}
                  <text x="200" y="207" textAnchor="middle" className="wheel-center">🎅</text>
                </svg>
              </div>
              <button className="primary-btn" disabled={spinning} onClick={spin}>{spinning?'GIRANDO...':'GIRAR MINHA ROLETA 🎁'}</button>
            </> : <div className="win-state"><div className="win-emoji">🎉</div><h2>PARABÉNS! VOCÊ DESBLOQUEOU <span>A VILA PREMIUM.</span></h2><p>Vila completa + 4 bônus com a condição especial desta sessão.</p><div className="win-price"><del>{money(siteConfig.plans.premium.price)}</del><strong>{money(siteConfig.plans.exitOffer.price)}</strong></div><button className="primary-btn" onClick={()=>goCheckout(siteConfig.plans.exitOffer.checkoutUrl)}>QUERO APROVEITAR R$19,90 <Arrow/></button></div>}
          </div>
        </div>
      )}
    </main>
  );
}
