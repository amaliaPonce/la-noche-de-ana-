(function () {
  'use strict';

  // ========== NAVEGACIÓN SPA ==========
  const screens = document.querySelectorAll('.screen');
  const home = document.getElementById('home');
  const backBtns = document.querySelectorAll('.back-btn');
  function forEachNode(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  function showScreen(screenId) {
    forEachNode(screens, function (s) {
      s.classList.remove('active', 'exit-left');
      if (s.id === screenId) s.classList.add('active');
    });
  }

  forEachNode(document.querySelectorAll('.mode-btn'), function (btn) {
    btn.addEventListener('click', function () {
      const mode = this.getAttribute('data-mode');
      if (mode) showScreen(mode + '-screen');
    });
  });

  forEachNode(backBtns, function (btn) {
    btn.addEventListener('click', function () {
      home.classList.add('active');
      forEachNode(screens, function (s) {
        if (s !== home) s.classList.remove('active');
      });
    });
  });

  // ========== CARTAS (Ana = novia, José = novio) ==========
  const CARTAS = [
    { palo: 'picante', texto: 'Describe tu fantasía más reciente (sin filtros).' },
    { palo: 'picante', texto: 'Cuenta el beso más apasionado que has dado y con quién fue.' },
    { palo: 'picante', texto: 'Nombra una parte del cuerpo que no te atrevas a besar en público.' },
    { palo: 'picante', texto: 'Haz un striptease de 10 segundos con música imaginaria.' },
    { palo: 'picante', texto: 'Elige a alguien y susurra al oído un piropo picante.' },
    { palo: 'picante', texto: 'Confiesa el lugar más inusual donde te has besado.' },
    { palo: 'picante', texto: 'Haz un reto de caricias en el aire: dibuja con la mano una zona erógena y que adivinen.' },
    { palo: 'picante', texto: 'Recrea con palabras una escena romántica de película con la persona que tengas enfrente.' },
    { palo: 'picante', texto: 'Quita una prenda (algo pequeño) y describe cada detalle antes de volverla a poner.' },
    { palo: 'picante', texto: 'Cuenta qué prenda te quitarías primero en una despedida salvaje y por qué.' },
    { palo: 'bebida', texto: 'Toma un shot con Ana.' },
    { palo: 'bebida', texto: 'Elige a alguien: esa persona debe hacer un shot contigo.' },
    { palo: 'bebida', texto: 'Di "¡Brindis por Ana!" en tres idiomas diferentes.' },
    { palo: 'bebida', texto: 'Propón un brindis con una palabra inventada.' },
    { palo: 'bebida', texto: 'Haz un brindis usando solo emojis (dilo en alto).' },
    { palo: 'bebida', texto: 'Toma un shot si nunca te has emborrachado en una despedida (si no, elige a alguien).' },
    { palo: 'bebida', texto: 'Brinda por la persona de tu derecha y bebéis juntas.' },
    { palo: 'bebida', texto: 'Haz un brindis dedicado a la suegra (en tono cómico).' },
    { palo: 'bebida', texto: 'Shot en pareja: elige a alguien y bebéis los dos.' },
    { palo: 'grupal', texto: 'Da un abrazo a cada persona del grupo en 20 segundos.' },
    { palo: 'grupal', texto: 'Haz una foto grupal con la pose más ridícula.' },
    { palo: 'grupal', texto: 'Elige a dos personas: deben darse un abrazo de 10 segundos.' },
    { palo: 'grupal', texto: 'Haz un selfie grupal con caras de susto.' },
    { palo: 'grupal', texto: 'Da un abrazo grupal y gritad "¡Por Ana!" a la de tres.' },
    { palo: 'grupal', texto: 'Imita a alguien del grupo hasta que lo adivinen.' },
    { palo: 'grupal', texto: 'Di tres cumplidos seguidos a la persona de tu derecha.' },
    { palo: 'grupal', texto: 'Da un beso en la mejilla a la persona que tengas más lejos.' },
    { palo: 'grupal', texto: 'Elige quién debe hacer el siguiente reto.' },
    { palo: 'verguenza', texto: 'Envía un audio de voz a alguien que no esté diciendo "Estoy en la despedida de Ana" con voz de fiesta.' },
    { palo: 'verguenza', texto: 'Baila 30 segundos con los ojos cerrados.' },
    { palo: 'verguenza', texto: 'Canta el estribillo de una canción de boda elegida por el grupo.' },
    { palo: 'verguenza', texto: 'Canta "Cumpleaños feliz" pero cambiando "cumpleaños" por "despedida".' },
    { palo: 'verguenza', texto: 'Canta una canción de amor en playback exagerado.' },
    { palo: 'verguenza', texto: 'Di qué animal serías en una boda y por qué (y actúa como tal 10 segundos).' },
    { palo: 'verguenza', texto: 'Haz una declaración dramática de amor a la comida o la bebida.' },
    { palo: 'diversion', texto: 'Baila como si no hubiera mañana durante una canción.' },
    { palo: 'diversion', texto: 'Inventa un chiste sobre bodas (puede ser malo).' },
    { palo: 'diversion', texto: 'Baila como si tuvieras 80 años.' },
    { palo: 'diversion', texto: 'Di la primera palabra que se te venga al pensar en "boda".' },
    { palo: 'diversion', texto: 'Di tres cosas que adoras de las despedidas.' },
    { palo: 'diversion', texto: 'Cuenta qué llevarías a una isla desierta (objeto + persona del grupo).' },
    { palo: 'diversion', texto: 'Di qué superpoder tendrías en una boda.' },
    { palo: 'diversion', texto: 'Cuenta un sueño raro que hayas tenido sobre Ana y José o bodas.' },
    { palo: 'novia', texto: 'Haz un brindis dedicado a Ana en verso.' },
    { palo: 'novia', texto: 'Cuenta qué es lo que más te gusta de Ana.' },
    { palo: 'novia', texto: 'Haz una predicción sobre el primer año de Ana y José.' },
    { palo: 'novia', texto: 'Haz un discurso de 20 segundos como si fueras la madrina.' },
    { palo: 'novia', texto: 'Baila con Ana 30 segundos.' },
    { palo: 'novia', texto: 'Cuenta una anécdota graciosa de Ana.' },
    { palo: 'novia', texto: 'Elige a alguien: esa persona debe decir un piropo a Ana.' },
    { palo: 'novia', texto: 'Haz una promesa simbólica a Ana para el día de la boda.' },
    { palo: 'novia', texto: 'Cuenta qué harías si fueras Ana por un día.' },
  ];

  var PALO_LABELS = { picante: 'Picante', bebida: 'Bebida', grupal: 'Grupal', verguenza: 'Vergüenza', diversion: 'Diversión', novia: 'Novia' };

  var selectedPalo = null;
  var cartasPoolByPalo = { picante: [], bebida: [], grupal: [], verguenza: [], diversion: [], novia: [] };
  var cartasPoolAll = [];

  const cardFlipper = document.getElementById('card-flipper');
  const cardText = document.getElementById('card-text');
  const cardPaloEl = document.getElementById('card-palo');
  const deckContainer = document.getElementById('deck-container');
  const shuffleCardsBtn = document.getElementById('shuffle-cards-btn');
  const otraCartaBtn = document.getElementById('otra-carta-btn');
  const cartasHint = document.getElementById('cartas-hint');

  function getPoolForPalo(palo) {
    if (cartasPoolByPalo[palo].length === 0) {
      cartasPoolByPalo[palo] = CARTAS.filter(function (c) { return c.palo === palo; }).slice();
    }
    return cartasPoolByPalo[palo];
  }

  function getRandomCartaFromPalo(palo) {
    var pool;
    if (palo === 'cualquiera') {
      if (cartasPoolAll.length === 0) cartasPoolAll = CARTAS.slice();
      pool = cartasPoolAll;
    } else {
      pool = getPoolForPalo(palo);
      if (pool.length === 0) {
        cartasPoolByPalo[palo] = CARTAS.filter(function (c) { return c.palo === palo; }).slice();
        pool = cartasPoolByPalo[palo];
      }
    }
    var i = Math.floor(Math.random() * pool.length);
    var carta = pool.splice(i, 1)[0];
    if (shuffleCardsBtn) {
      if (palo === 'cualquiera' && cartasPoolAll.length === 0) shuffleCardsBtn.classList.remove('hidden');
      else if (palo !== 'cualquiera' && pool.length === 0) shuffleCardsBtn.classList.remove('hidden');
    }
    return carta;
  }

  function setCardContent(carta) {
    if (cardText) cardText.textContent = carta.texto;
    if (cardPaloEl) {
      cardPaloEl.textContent = carta.palo;
      cardPaloEl.className = 'card-palo card-palo--' + carta.palo;
    }
  }

  function flipCardBack() {
    if (cardFlipper) cardFlipper.classList.remove('flipped');
    if (otraCartaBtn) otraCartaBtn.classList.add('hidden');
  }

  function flipCardShow() {
    if (cardFlipper) cardFlipper.classList.add('flipped');
    if (otraCartaBtn) otraCartaBtn.classList.remove('hidden');
  }

  function setPaloSelected(palo) {
    selectedPalo = palo;
    forEachNode(document.querySelectorAll('.palo-btn'), function (btn) {
      if (btn.getAttribute('data-palo') === palo) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
    if (cartasHint) {
      cartasHint.textContent = palo === 'cualquiera'
        ? 'Toca el mazo para una carta sorpresa'
        : 'Toca el mazo para sacar una carta · ' + (PALO_LABELS[palo] || palo);
    }
    if (deckContainer) deckContainer.classList.remove('deck-inactive');
    if (shuffleCardsBtn) {
      if (palo === 'cualquiera') {
        if (cartasPoolAll.length >= CARTAS.length || cartasPoolAll.length === 0) shuffleCardsBtn.classList.add('hidden');
      } else {
        var totalForPalo = CARTAS.filter(function (c) { return c.palo === palo; }).length;
        if (getPoolForPalo(palo).length >= totalForPalo) shuffleCardsBtn.classList.add('hidden');
      }
    }
  }

  forEachNode(document.querySelectorAll('.palo-btn'), function (btn) {
    btn.addEventListener('click', function () {
      var palo = this.getAttribute('data-palo');
      if (palo) setPaloSelected(palo);
    });
  });

  if (deckContainer) {
    deckContainer.addEventListener('click', function () {
      if (deckContainer.classList.contains('deck-inactive') || !selectedPalo) return;
      if (cardFlipper.classList.contains('flipped')) return;
      var carta = getRandomCartaFromPalo(selectedPalo);
      setCardContent(carta);
      flipCardShow();
    });
  }

  if (otraCartaBtn) {
    otraCartaBtn.addEventListener('click', function () {
      flipCardBack();
    });
  }

  if (shuffleCardsBtn) {
    shuffleCardsBtn.addEventListener('click', function () {
      if (selectedPalo === 'cualquiera') {
        cartasPoolAll = [];
      } else if (selectedPalo) {
        cartasPoolByPalo[selectedPalo] = [];
        getPoolForPalo(selectedPalo);
      }
      shuffleCardsBtn.classList.add('hidden');
      flipCardBack();
    });
  }

  // ========== RETOS (50+ dares) ==========
  const RETOS = [
    'Toma un shot con Ana.',
    'Cuenta el peor beso que hayas dado.',
    'Baila en el centro del grupo durante una canción.',
    'Imita a cada persona del grupo en 10 segundos.',
    'Di tres mentiras y una verdad; el grupo debe adivinar la verdad.',
    'Haz un brindis dedicado a la suegra (en tono cómico).',
    'Envía un mensaje de voz a tu madre diciendo que estás en una despedida.',
    'Abre TikTok y haz el primer baile que te salga.',
    'Da un abrazo a la persona que tengas más a la izquierda.',
    'Canta el cumpleaños feliz cambiando "cumpleaños" por "soltera".',
    'Cuenta qué te pondrías el día de tu boda (o qué te pusiste).',
    'Elige a alguien: esa persona bebe un shot.',
    'Haz una declaración de amor falsa a la bebida.',
    'Baila con los ojos cerrados 20 segundos.',
    'Di el primer nombre que se te venga: esa persona brinda contigo.',
    'Cuenta una anécdota vergonzosa de Ana.',
    'Haz una foto grupal con la pose más ridícula.',
    'Di qué animal serías en una fiesta y actúa como tal 15 segundos.',
    'Toma un shot si has llorado en una boda.',
    'Imita la voz de Ana diciendo "¡Sí, quiero!".',
    'Propón un brindis usando solo una palabra repetida 5 veces.',
    'Da un beso en la mejilla a tres personas diferentes.',
    'Cuenta tu peor cita en una frase.',
    'Baila como si tuvieras 5 años.',
    'Elige a dos personas: deben darse la mano durante 30 segundos.',
    'Di qué llevarías a una isla desierta (objeto + persona del grupo).',
    'Haz un selfie con Ana con cara de susto.',
    'Canta el estribillo de una canción de amor en playback.',
    'Cuenta un sueño raro que hayas tenido.',
    'Brinda por la persona que más te haya hecho reír esta noche.',
    'Haz una promesa simbólica a Ana para el día de la boda.',
    'Di tres cumplidos seguidos a la persona de tu derecha.',
    'Baila 30 segundos con Ana.',
    'Cuenta qué superpoder tendrías en una despedida.',
    'Elige quién hace el siguiente reto.',
    'Toma un shot con la persona que tengas enfrente.',
    'Imita a alguien del grupo hasta que lo adivinen.',
    'Di la primera palabra que se te venga al pensar en "Ana".',
    'Haz un discurso de 15 segundos como si fueras la madrina.',
    'Da un abrazo grupal y gritad "¡Por Ana!" a la de tres.',
    'Cuenta qué es lo que más te gusta de Ana.',
    'Haz una predicción sobre el primer año de Ana y José.',
    'Baila como si no hubiera mañana.',
    'Di una verdad que nunca hayas dicho en público.',
    'Elige a alguien: esa persona debe hacer un brindis a Ana.',
    'Cuenta un secreto que nunca hayas contado en una despedida.',
    'Haz una foto grupal con caras de susto.',
    'Da un abrazo a cada persona del grupo en 25 segundos.',
    'Inventa un chiste sobre bodas.',
    'Di "Brindis por Ana" en tres idiomas.',
    'Elige a alguien: esa persona hace un shot contigo.',
    'Cuenta qué es lo que más te gusta de las despedidas.',
    'Haz un brindis con una palabra inventada.',
    'Baila con la persona de tu izquierda 20 segundos.',
    'Di qué llevarías a una isla (objeto + persona).',
    'Haz un selfie grupal con la pose más divertida.',
    'Cuenta una anécdota graciosa de Ana.',
    'Da un beso en la mejilla a la persona que tengas más lejos.',
    'Haz una declaración dramática de amor a la comida.',
    'Canta una canción de amor en playback exagerado.',
    'Cuenta qué harías si fueras Ana por un día.',
    'Haz un cambio de prenda con alguien del grupo y presume el nuevo outfit durante 10 segundos.',
    'Besa con ojos cerrados a la persona que elijas por 3 segundos.',
    'Quita un accesorio y descríbelo como si fuera un tesoro prohibido antes de dárselo a alguien.',
    'Haz un strip de labios: usa tu boca para quitar un lazo o cinta de la persona de tu derecha.',
    'Cuenta cómo sería tu cita perfecta si la otra persona tuviera que llevarte con una sola prenda.',
    'Reta a alguien a imitarte mientras te quitas una prenda imaginaria.',
    'Describe con detalle una prenda que llevarías para encender la pista y luego mímala.',
    'Haz una confesión picante y que el otro grupo vote si es verdad o mentira.',
    'Baila con alguien sujetando solo una prenda en la mano como si fuera un micrófono.',
    'Elige a alguien para que te dé un beso en la mejilla, pero hazlo como si fuera la escena final de una película prohibida.',
  ];

  const retoText = document.getElementById('reto-text');
  const nuevoRetoBtn = document.getElementById('nuevo-reto-btn');

  function getRandomReto() {
    return RETOS[Math.floor(Math.random() * RETOS.length)];
  }

  if (nuevoRetoBtn && retoText) {
    nuevoRetoBtn.addEventListener('click', function () {
      retoText.textContent = getRandomReto();
      retoText.parentElement.classList.add('show');
    });
  }

  // ========== BOTÓN DEL CAOS ==========
  const CAOS_ACTIONS = [
    'Todas beben',
    'Solo bebe Ana',
    'Cambio de asiento',
    'Abrazo grupal',
    'Shot obligatorio',
    'Ana elige quién bebe',
    'Todas al unísono: "¡Por Ana!"',
    'La persona más cercana a Ana bebe',
    'Quien tenga el pelo más largo bebe',
    'Abrazo en cadena (una a una)',
    'La última en reír bebe',
    'Todas dan un beso en la mejilla a Ana',
    'Shot en parejas: elige a alguien y bebéis juntas',
    'Ana elige la siguiente acción del caos',
    'Cambio de asiento: todas una silla a la derecha',
    'Quien tenga el móvil más cerca bebe',
    'Gritad "¡Despedida!" a la de tres',
    'La persona a la izquierda de Ana bebe',
    'Todas hacéis un brindis en verso',
    'Ana da un shot a quien ella quiera',
    'Abrazo grupal de 10 segundos',
    'Quien no tenga las manos en la mesa bebe',
    'La más reciente en llegar bebe',
    'Todas tomáis un shot',
    'Ana elige quién hace el siguiente reto',
    'Cambio de asiento al azar',
    'Quien tenga el anillo más bonito bebe',
    'Todas decís un piropo a Ana en 5 segundos',
    'La persona que tenga el vaso más lleno bebe',
    'Abrazo grupal y foto',
  ];

  const chaosBtn = document.getElementById('chaos-btn');
  const caosResult = document.getElementById('caos-result');
  const chaosWrap = document.getElementById('chaos-button-wrap');

  function vibrate() {
    if (typeof navigator.vibrate === 'function') {
      navigator.vibrate([50, 30, 50]);
    }
  }

  if (chaosBtn && caosResult) {
    chaosBtn.addEventListener('click', function () {
      const action = CAOS_ACTIONS[Math.floor(Math.random() * CAOS_ACTIONS.length)];
      caosResult.textContent = action;
      caosResult.classList.add('show');
      vibrate();
      if (chaosWrap) {
        chaosWrap.classList.remove('pulse');
        void chaosWrap.offsetWidth;
        chaosWrap.classList.add('pulse');
        setTimeout(function () {
          chaosWrap.classList.remove('pulse');
        }, 500);
      }
    });
  }
})();
