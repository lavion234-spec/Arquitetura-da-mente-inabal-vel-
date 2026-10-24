import React, { useEffect, useRef, useState } from 'react';

const bundleBooks = [
  {
    image: 'capa-ebook.png',
    title: 'A Arquitetura da Mente Inabalável',
  },
  {
    image: 'manual-estoico-moderno.png',
    title: 'O Manual do Estoico Moderno: Sabedoria e Serenidade',
  },
  {
    image: 'capa-7-caminhos.png',
    title: '7 Caminhos para uma Vida com Mais Sentido',
  },
];

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
    answer: 'A oferta reúne três e-books digitais por R$ 30 no total. Os formatos e as condições de acesso serão informados quando o checkout estiver disponível.',
  },
  {
    question: 'Como receberei o acesso?',
    answer: 'O link de compra ainda não está disponível. As informações de acesso serão apresentadas quando o checkout do pacote estiver configurado.',
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
    answer: 'O checkout do pacote ainda não está disponível. As formas de pagamento e eventuais condições de parcelamento serão informadas quando a compra for aberta.',
  },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function BundleCovers({ onSelect, className = '' }) {
  return (
    <div className={`bundle-covers ${className}`} role="group" aria-label="Capas dos três e-books incluídos no pacote">
      {bundleBooks.map((book) => (
        <figure className="bundle-cover" key={book.image}>
          <button
            className="bundle-cover-button"
            type="button"
            onClick={() => onSelect(book)}
            aria-label={`Ampliar a capa de ${book.title}`}
          >
            <img src={`${import.meta.env.BASE_URL}${book.image}`} alt="" />
          </button>
          <figcaption>{book.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function BookPreviewDialog({ book, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (book && !dialog.open) {
      dialog.showModal();
    } else if (!book && dialog.open) {
      dialog.close();
    }
  }, [book]);

  return (
    <dialog
      className="book-preview-dialog"
      ref={dialogRef}
      aria-labelledby="book-preview-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {book && (
        <div className="book-preview-content">
          <div className="book-preview-heading">
            <h2 id="book-preview-title">{book.title}</h2>
            <button className="book-preview-close" type="button" autoFocus onClick={() => dialogRef.current?.close()}>
              Fechar <span aria-hidden="true">×</span>
            </button>
          </div>
          <img className="book-preview-image" src={`${import.meta.env.BASE_URL}${book.image}`} alt={`Capa completa de ${book.title}`} />
        </div>
      )}
    </dialog>
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
      <span className="price-label">Pacote com 3 e-books</span>
      <p className="price-reference">Três leituras pelo valor de</p>
      <p className="price-current"><span>R$</span> 30</p>
      <p className="price-footnote">R$ 30 pelo pacote · R$ 10 por e-book.</p>
    </div>
  );
}

function CheckoutButton({ className = 'button button--checkout', children = 'Compra ainda não disponível' }) {
  return (
    <button
      className={className}
      type="button"
      disabled
    >
      {children}
    </button>
  );
}

function App() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState(null);

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
            <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> PACOTE COM 3 E-BOOKS · FILOSOFIA PRÁTICA</p>
            <h1>Três leituras para explorar <em>estoicismo, serenidade e sentido.</em></h1>
            <p className="hero-description">Conheça as capas dos três e-books do pacote. Clique em qualquer uma para ver a imagem ampliada antes de decidir.</p>
            <div className="hero-actions">
              <CheckoutButton className="button button--checkout button--hero-buy">Pacote de 3 e-books · R$ 30</CheckoutButton>
              <a className="hero-content-link" href="#conteudo" onClick={() => notifyCta('hero-content')}>Ver o conteúdo primeiro <ArrowIcon /></a>
            </div>
            <p className="hero-note">Três e-books digitais por R$ 30 no total. O link de compra ainda não está disponível.</p>
          </div>
          <div className="hero-gallery">
            <BundleCovers onSelect={setPreviewBook} />
            <p className="hero-gallery-note">Clique nas capas para ampliar</p>
          </div>
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
          <div className="product-visual"><BundleCovers onSelect={setPreviewBook} /></div>
          <div className="product-copy">
            <p className="eyebrow">O PACOTE</p>
            <h2 id="product-title">Três e-books para ler e consultar no seu ritmo.</h2>
            <p className="product-description">O pacote reúne três e-books de filosofia prática: um guia sobre as disciplinas estoicas, reflexões sobre sabedoria e serenidade e caminhos para uma vida com mais sentido.</p>
            <div className="product-facts" aria-label="Dados do e-book">
              <p><span>FORMATO</span><strong>PDF</strong></p>
              <p><span>CONTEÚDO</span><strong>3 e-books</strong></p>
              <p><span>VALOR TOTAL</span><strong>R$ 30</strong></p>
            </div>
            <ul className="product-list">
              <li>A Arquitetura da Mente Inabalável</li>
              <li>O Manual do Estoico Moderno: Sabedoria e Serenidade</li>
              <li>7 Caminhos para uma Vida com Mais Sentido</li>
            </ul>
            <p className="product-format">Três e-books por R$ 30 no total. O link de compra ainda não está disponível.</p>
            <div className="product-actions">
              <CheckoutButton className="button button--checkout">Pacote de 3 e-books · R$ 30</CheckoutButton>
              <a className="text-link" href="#oferta" onClick={() => notifyCta('product-details')}>Ver condições <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="offer-section section-pad" id="oferta" aria-labelledby="offer-title">
          <div className="offer-topline"><span className="offer-burst" aria-hidden="true">3<br />E-BOOKS</span><p className="eyebrow eyebrow--light">TRÊS LEITURAS, UM SÓ PACOTE</p></div>
          <div className="offer-layout">
            <div className="offer-copy">
              <h2 id="offer-title">Três e-books para explorar ideias e levar à rotina.</h2>
              <p>Um pacote digital com três leituras sobre estoicismo, serenidade e sentido — por R$ 30 no total, equivalente a R$ 10 por e-book.</p>
              <BundleCovers onSelect={setPreviewBook} />
              <div className="offer-availability">
                <p className="availability-label">Oferta do pacote: 3 e-books por R$ 30</p>
                <p>O checkout ainda não está disponível. As condições de pagamento e acesso serão informadas quando o link de compra estiver configurado.</p>
              </div>
            </div>
            <div className="offer-ticket">
              <PriceBlock />
              <CheckoutButton>Link de compra em breve</CheckoutButton>
              <p id="checkout-note" className="checkout-note">A compra ainda não pode ser concluída por este site.</p>
            </div>
          </div>
          <p className="offer-disclaimer">Preço informado para o pacote completo: R$ 30 pelos três e-books. Nenhum checkout está conectado a esta oferta no momento.</p>
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
          <CheckoutButton className="button button--checkout button--closing-buy">Pacote de 3 e-books · R$ 30</CheckoutButton>
          <p>Três e-books por R$ 30 no total. O link de compra ainda não está disponível.</p>
        </section>
      </main>

      <BookPreviewDialog book={previewBook} onClose={() => setPreviewBook(null)} />

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
