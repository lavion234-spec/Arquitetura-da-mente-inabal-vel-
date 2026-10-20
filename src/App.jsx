import React, { useState } from 'react';

const CHECKOUT_URL = 'https://pay.kirvano.com/a5c2e5d7-bf7a-4e34-a6e5-519e327936dd';

const disciplines = [
  {
    number: 'I',
    label: 'Disciplina do desejo',
    title: 'Invista energia onde ela pode fazer diferença.',
    description:
      'A dicotomia do controle separa suas escolhas dos acontecimentos externos. O esforço muda de lugar: sai da tentativa de comandar o mundo e volta para o que você pode decidir.',
    example: 'Exemplo: depois de enviar uma proposta, você não controla a resposta. Pode, porém, revisar o trabalho e escolher o próximo passo.',
  },
  {
    number: 'II',
    label: 'Disciplina da ação',
    title: 'Faça o próximo gesto antes de negociar com a vontade.',
    description:
      'Agir com propósito é cumprir responsabilidades possíveis com consistência, sem exigir que a motivação chegue primeiro nem confundir ocupação com contribuição.',
    example: 'Exemplo: em vez de esperar uma manhã perfeita, reserve vinte minutos para começar a tarefa que já está ao seu alcance.',
  },
  {
    number: 'III',
    label: 'Disciplina do assentimento',
    title: 'Uma impressão não precisa virar uma conclusão.',
    description:
      'Entre o que acontece e o que você pensa sobre isso há espaço para exame. A prática é observar a impressão, separar fato de interpretação e então escolher a resposta.',
    example: 'Exemplo: uma mensagem curta é um fato; concluir que há desprezo é uma interpretação que ainda pode ser examinada.',
  },
];

const exercises = [
  {
    index: '01',
    title: 'Filtro de controle diário',
    text: 'Separe o que depende de você do que não depende. Use a lista para decidir onde colocar esforço hoje.',
  },
  {
    index: '02',
    title: 'Intenção e contribuição',
    text: 'Defina uma intenção para o dia e identifique uma contribuição concreta, em vez de medir o dia apenas pelo volume de tarefas.',
  },
  {
    index: '03',
    title: 'Protocolo dos dez segundos',
    text: 'Ao notar uma reação impulsiva, faça uma pausa breve. Nomeie a impressão, confira os fatos e escolha se responder agora é necessário.',
  },
  {
    index: '04',
    title: 'Abertura e auditoria',
    text: 'A reflexão matinal orienta suas escolhas; a revisão noturna observa o que aconteceu sem transformar o balanço em julgamento automático.',
  },
  {
    index: '05',
    title: 'Plano progressivo de sete dias',
    text: 'Experimente uma prática por vez e observe como ela cabe na rotina. Sete dias são um roteiro de implementação, não uma promessa de resultado.',
  },
];

const questions = [
  {
    question: 'Preciso conhecer filosofia para ler o livro?',
    answer: 'Não. O guia apresenta as três disciplinas estoicas em linguagem prática e não exige conhecimento prévio de filosofia.',
  },
  {
    question: 'O material tem exercícios práticos?',
    answer: 'Sim. O conteúdo descrito inclui filtro de controle diário, checklist de intenção e contribuição, protocolo dos dez segundos, reflexão matinal, revisão noturna e um plano progressivo de sete dias.',
  },
  {
    question: 'O que são as três disciplinas estoicas?',
    answer: 'São as disciplinas do desejo, da ação e do assentimento. O guia organiza essas ideias em torno do que desejamos, do que fazemos e de como examinamos nossas impressões.',
  },
  {
    question: 'Como funciona o plano de sete dias?',
    answer: 'É uma proposta de implementação progressiva das práticas apresentadas no material. A sequência detalhada está no e-book; o prazo não representa garantia de mudança ou resultado.',
  },
  {
    question: 'O produto é físico ou digital?',
    answer: 'É um e-book em PDF com 26 páginas. A forma de acesso será informada quando a oferta for aberta.',
  },
  {
    question: 'Como receberei o acesso?',
    answer: 'O método e o prazo de entrega serão apresentados antes da abertura da compra.',
  },
  {
    question: 'O e-book substitui acompanhamento psicológico?',
    answer: 'Não. Este é um material educativo de filosofia estoica aplicada. Não é terapia, tratamento de saúde mental nem substituto de acompanhamento profissional.',
  },
  {
    question: 'Quais são as condições de reembolso?',
    answer: 'A política de reembolso será informada junto às condições de compra, antes da abertura do checkout.',
  },
  {
    question: 'Quais formas de pagamento e plataforma são aceitas?',
    answer: 'O checkout da Kirvano apresenta cartão, Pix, Apple Pay e outros métodos. O valor parcelado tem acréscimo; confira as condições atualizadas na página antes de concluir.',
  },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function BookMockup({ compact = false }) {
  return (
    <div className={`book-stage${compact ? ' book-stage--compact' : ''}`}>
      <div className="book">
        <div className="book-cover">
          <img className="book-cover-image" src={`${import.meta.env.BASE_URL}capa-ebook.png`} alt={compact ? '' : 'Capa de A Arquitetura da Mente Inabalável, com busto clássico e colunas'} />
        </div>
      </div>
      <p className="mockup-caption">Capa do e-book</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}

function DisciplineCard({ item }) {
  return (
    <article className="discipline-item">
      <div className="discipline-topline"><span>{item.number}</span><span>{item.label}</span></div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p className="example"><span>NA ROTINA</span>{item.example.replace('Exemplo: ', '')}</p>
    </article>
  );
}

function ExerciseRow({ item }) {
  return (
    <article className="exercise-row">
      <span className="exercise-index">{item.index}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <span className="exercise-glyph" aria-hidden="true">↘</span>
    </article>
  );
}

function FAQItem({ item, open, onToggle }) {
  return (
    <details className="faq-item" open={open} onToggle={onToggle}>
      <summary>{item.question}<span aria-hidden="true" className="faq-plus">+</span></summary>
      <p>{item.answer}</p>
    </details>
  );
}

function PriceBlock({ compact = false }) {
  return (
    <div className={`price-block${compact ? ' price-block--compact' : ''}`}>
      <span className="price-label">Condição especial</span>
      <p className="price-reference">De <s>R$ 75</s> por</p>
      <p className="price-current"><span>R$</span> 25</p>
      <p className="price-footnote">R$ 25 à vista. O parcelamento pode ter acréscimo.</p>
    </div>
  );
}

function CheckoutButton({ location, className = 'button button--checkout', children = 'Comprar por R$ 25' }) {
  return (
    <a
      className={className}
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => window.dispatchEvent(new CustomEvent('ebook:cta', { detail: { location } }))}
    >
      {children} <ArrowIcon />
    </a>
  );
}

function App() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function notifyCta(location) {
    window.dispatchEvent(new CustomEvent('ebook:cta', { detail: { location } }));
  }

  return (
    <>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === 'Escape') setMobileNavOpen(false);
        }}
      >
        <a className="wordmark" href="#inicio" aria-label="A Arquitetura da Mente Inabalável, início">
          <span className="wordmark-symbol" aria-hidden="true">A</span>
          <span>ARQUITETURA<br /><small>DA MENTE INABALÁVEL</small></span>
        </a>
        <nav
          className={`main-nav${mobileNavOpen ? ' main-nav--open' : ''}`}
          id="primary-navigation"
          aria-label="Navegação principal"
        >
          <a href="#disciplinas" onClick={() => setMobileNavOpen(false)}>As disciplinas</a>
          <a href="#conteudo" onClick={() => setMobileNavOpen(false)}>O conteúdo</a>
          <a href="#perguntas" onClick={() => setMobileNavOpen(false)}>Perguntas</a>
        </nav>
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={mobileNavOpen}
          aria-controls="primary-navigation"
          aria-label={mobileNavOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
        >
          <span className="menu-icon" aria-hidden="true"><span /></span>
          <span>{mobileNavOpen ? 'Fechar' : 'Menu'}</span>
        </button>
        <a className="header-cta" href="#oferta" onClick={() => notifyCta('header')}>Ver a oferta <ArrowIcon /></a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> E-BOOK · GUIA PRÁTICO DAS TRÊS DISCIPLINAS ESTOICAS</p>
            <h1>Você não precisa controlar tudo. <em>Precisa saber onde colocar sua energia.</em></h1>
            <p className="hero-description">Um guia prático de estoicismo para examinar suas reações, agir com mais intenção e parar de gastar energia tentando controlar o que não depende de você.</p>
            <div className="hero-actions">
              <CheckoutButton location="hero" className="button button--checkout button--hero-buy">Comprar por R$ 25</CheckoutButton>
              <a className="hero-content-link" href="#conteudo" onClick={() => notifyCta('hero-content')}>Ver o conteúdo primeiro <ArrowIcon /></a>
            </div>
            <p className="hero-note">PDF com 26 páginas, quatro capítulos, exercícios e um plano progressivo de sete dias.</p>
          </div>
          <BookMockup />
          <div className="hero-index" aria-hidden="true"><span>01</span><span>—</span><span>10</span></div>
        </section>

        <section className="friction section-pad" aria-labelledby="friction-title">
          <div className="friction-side"><p className="eyebrow">A VIDA NÃO PEDE LICENÇA</p><span className="vertical-rule" aria-hidden="true" /><span className="side-caption">NOTAS SOBRE REAÇÃO E ESCOLHA</span></div>
          <div className="friction-content">
            <h2 id="friction-title">O dia termina.<br /><em>A conversa, às vezes, não.</em></h2>
            <p className="friction-lead">Algumas cenas continuam ocupando espaço mesmo depois que já passaram.</p>
            <ul className="scene-list">
              <li><span>01</span>Repassar uma discussão no caminho para casa, ensaiando respostas que já não serão ditas.</li>
              <li><span>02</span>Tentar mudar a opinião de alguém e terminar o dia exausto, sem ter mudado nada.</li>
              <li><span>03</span>Esperar a motivação certa para começar uma tarefa que só precisa de um primeiro passo.</li>
              <li><span>04</span>Ler uma mensagem curta como ofensa antes de conferir o que de fato aconteceu.</li>
              <li><span>05</span>Deixar um imprevisto pequeno decidir o tom de todas as horas seguintes.</li>
            </ul>
            <p className="friction-close">Talvez o problema não seja apenas o que aconteceu. <em>Talvez também valha examinar a maneira como você interpretou o acontecimento.</em></p>
          </div>
        </section>

        <section className="disciplines section-pad" id="disciplinas">
          <SectionHeading eyebrow="UMA ESTRUTURA ANTIGA, PARA QUESTÕES BEM ATUAIS" title="Três disciplinas. Um ponto de partida mais lúcido.">
            <p>O estoicismo não promete um mundo obediente. Oferece uma prática: distinguir o que está em suas mãos, agir com responsabilidade e examinar as próprias impressões.</p>
          </SectionHeading>
          <div className="discipline-grid">
            {disciplines.map((item) => <DisciplineCard key={item.number} item={item} />)}
          </div>
          <p className="discipline-note"><span aria-hidden="true">✳</span> O guia organiza essas ideias em uma sequência prática. Não reivindica a descoberta das disciplinas.</p>
        </section>

        <section className="content-section section-pad" id="conteudo">
          <div className="content-heading">
            <SectionHeading eyebrow="DENTRO DO GUIA" title="Menos frase de efeito. Mais prática que cabe no dia.">
              <p>Exercícios breves para levar as três disciplinas da leitura à observação cotidiana. O material propõe experimentos, não resultados garantidos.</p>
            </SectionHeading>
            <span className="content-stamp" aria-hidden="true">CADERNO<br />DE PRÁTICA<br /><b>●</b></span>
          </div>
          <div className="exercise-list">
            {exercises.map((item) => <ExerciseRow key={item.index} item={item} />)}
          </div>
          <article className="sample-exercise" aria-labelledby="sample-title">
            <p className="eyebrow">EXEMPLO DE APLICAÇÃO</p>
            <h3 id="sample-title">Uma crítica chega durante a reunião. O que cabe nos próximos dez segundos?</h3>
            <ol>
              <li><span>01</span> Faça uma pausa antes de responder ou enviar uma mensagem.</li>
              <li><span>02</span> Separe o fato — houve uma crítica ao relatório — da interpretação: “quer me humilhar”.</li>
              <li><span>03</span> Pergunte se a crítica aponta um erro concreto ou se exige outra resposta.</li>
              <li><span>04</span> Escolha o próximo passo depois de examinar a impressão, não no primeiro impulso.</li>
            </ol>
            <p className="sample-source">Síntese do protocolo de dez segundos apresentado no e-book.</p>
            <a className="text-link sample-cta" href="#oferta" onClick={() => notifyCta('sample')}>Ver preço e disponibilidade <ArrowIcon /></a>
          </article>
          <p className="content-endnote"><span>UMA NOTA</span> O plano de sete dias é um ritmo sugerido para experimentar as práticas, não uma promessa de transformação em uma semana.</p>
        </section>

        <section className="fit-section section-pad">
          <SectionHeading eyebrow="UMA PROPOSTA, NÃO UMA FÓRMULA" title="A quem este guia pode servir.">
            <p>Uma leitura prática pede curiosidade e disposição para observar a própria conduta. Não precisa servir a todo mundo.</p>
          </SectionHeading>
          <div className="fit-columns">
            <div className="fit-column fit-column--yes">
              <p className="fit-label"><span aria-hidden="true">+</span> PODE FAZER SENTIDO PARA QUEM</p>
              <ul>
                <li>Quer estudar filosofia de maneira prática.</li>
                <li>Tem interesse em examinar hábitos de reação e julgamento.</li>
                <li>Procura uma estrutura de reflexão pessoal.</li>
                <li>Prefere exercícios a uma coleção de frases motivacionais.</li>
              </ul>
            </div>
            <div className="fit-column fit-column--no">
              <p className="fit-label"><span aria-hidden="true">−</span> PROVAVELMENTE NÃO É O QUE VOCÊ PROCURA SE</p>
              <ul>
                <li>Espera uma solução instantânea para todos os problemas.</li>
                <li>Busca controlar o comportamento de outras pessoas.</li>
                <li>Procura tratamento clínico ou substituição de acompanhamento profissional.</li>
                <li>Não tem interesse em ler, refletir ou experimentar exercícios.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="product-section section-pad" aria-labelledby="product-title">
          <div className="product-visual"><BookMockup compact /></div>
          <div className="product-copy">
            <p className="eyebrow">O E-BOOK</p>
            <h2 id="product-title">Uma leitura para levar da página para a rotina.</h2>
            <p className="product-description">A Arquitetura da Mente Inabalável organiza três disciplinas estoicas em uma leitura prática, com perguntas e exercícios para observar como você deseja, age e interpreta.</p>
            <div className="product-facts" aria-label="Dados do e-book">
              <p><span>FORMATO</span><strong>PDF</strong></p>
              <p><span>EXTENSÃO</span><strong>26 páginas</strong></p>
              <p><span>ESTRUTURA</span><strong>4 capítulos</strong></p>
            </div>
            <ul className="product-list">
              <li>Disciplina do desejo, da ação e do assentimento</li>
              <li>Filtro de controle e checklist de intenção diária</li>
              <li>Protocolo dos dez segundos antes de reagir</li>
              <li>Reflexão matinal e revisão noturna</li>
              <li>Plano progressivo de implementação de sete dias</li>
              <li>Conclusão e resumo executivo com os três mandamentos</li>
            </ul>
            <p className="product-format">A forma de acesso será informada quando a oferta estiver disponível.</p>
            <div className="product-actions">
              <CheckoutButton location="product" />
              <a className="text-link" href="#oferta" onClick={() => notifyCta('product-details')}>Ver condições <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="offer-section section-pad" id="oferta" aria-labelledby="offer-title">
          <div className="offer-topline"><span className="offer-burst" aria-hidden="true">BLACK<br />FRIDAY</span><p className="eyebrow eyebrow--light">UMA ESCOLHA CONCRETA</p></div>
          <div className="offer-layout">
            <div className="offer-copy">
              <h2 id="offer-title">Um guia para começar pelo que está ao seu alcance.</h2>
              <p>Leia, experimente as práticas e observe o que muda na sua forma de responder. Sem promessa de atalhos — o valor está no exercício.</p>
              <div className="offer-availability">
                <p className="availability-label">Checkout disponível pela Kirvano</p>
                <p>R$ 25 à vista ou parcelamento com acréscimo. Confira os métodos de pagamento e as condições de acesso antes de concluir.</p>
              </div>
            </div>
            <div className="offer-ticket">
              <PriceBlock />
              <CheckoutButton location="offer" />
              <p id="checkout-note" className="checkout-note">Você continuará no checkout da Kirvano para revisar e confirmar o pedido.</p>
            </div>
          </div>
          <p className="offer-disclaimer">A página de checkout apresenta os valores parcelados, meios de pagamento e termos vigentes antes da confirmação.</p>
        </section>

        <section className="faq-section section-pad" id="perguntas">
          <div className="faq-intro">
            <SectionHeading eyebrow="ANTES DE DECIDIR" title="Perguntas diretas, respostas claras.">
              <p>Confira as condições finais diretamente no checkout antes de confirmar a compra.</p>
            </SectionHeading>
          </div>
          <div className="faq-list">
            {questions.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                open={faqOpen === index}
                onToggle={(event) => setFaqOpen(event.currentTarget.open ? index : null)}
              />
            ))}
          </div>
        </section>

        <section className="closing-section section-pad">
          <div className="closing-rule" aria-hidden="true" />
          <p className="eyebrow eyebrow--light">A PRÓXIMA RESPOSTA AINDA É SUA</p>
          <h2>Você não escolhe todos os acontecimentos do seu dia. <em>Mas pode começar a examinar a maneira como responde a eles.</em></h2>
          <CheckoutButton location="closing" className="button button--checkout button--closing-buy" />
          <p>E-book de filosofia estoica aplicada à rotina. R$ 25 na condição informada.</p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#inicio">
          <span className="wordmark-symbol" aria-hidden="true">A</span>
          <span>ARQUITETURA<br /><small>DA MENTE INABALÁVEL</small></span>
        </a>
        <p className="footer-note">Filosofia prática, sem promessas fáceis.</p>
        <div className="footer-details">
          <p><span>Responsável pela venda</span>Identificação apresentada antes da abertura da oferta.</p>
          <p><span>Suporte</span>Canal de contato informado antes da compra.</p>
          <p><span>Termos de uso</span>Disponíveis quando a oferta for aberta.</p>
          <p><span>Privacidade</span>Política publicada antes da coleta de dados.</p>
          <p><span>Compra e reembolso</span>Condições apresentadas antes do checkout.</p>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} A Arquitetura da Mente Inabalável</span><span>Um material educativo. Não substitui acompanhamento profissional.</span></div>
      </footer>
    </>
  );
}

export default App;
