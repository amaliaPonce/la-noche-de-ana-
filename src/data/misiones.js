/**
 * Datos de misiones para Ana - Despedida de soltera
 * 50 misiones divididas en 3 niveles de "caos"
 * El juego es SOLO para que ella cumpla misiones mientras las amigas puntúan o graban.
 */

export const NIVELES = {
  DEPENDIENTA: 'dependienta',
  SUPERMAMI: 'supermami',
  CAOS_NOVIA: 'caos_novia'
};

export const NIVEL_LABELS = {
  [NIVELES.DEPENDIENTA]: 'LA DEPENDIENTA DEL AÑO',
  [NIVELES.SUPERMAMI]: 'SUPERMAMI EN APUROS',
  [NIVELES.CAOS_NOVIA]: 'EL CAOS DE LA NOVIA'
};

export const NIVEL_EMOJIS = {
  [NIVELES.DEPENDIENTA]: '🛍️',
  [NIVELES.SUPERMAMI]: '👩‍👧‍👦',
  [NIVELES.CAOS_NOVIA]: '💒'
};

/** 15 retos - Enfoque: trabajo como dependienta (doblar, tallas, clientes difíciles) */
export const MISIONES_DEPENDIENTA = [
  {
    id: 'd1',
    texto: 'Doblar 5 servilletas del bar en menos de 20 segundos con acabado de tienda de lujo.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd2',
    texto: 'Venderle un posavasos usado a un desconocido como si fuera la última tendencia de la temporada.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd3',
    texto: 'Hacer un inventario rápido de cuántas personas en el local llevan vaqueros.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd4',
    texto: 'Explicarle a un desconocido que la talla M es la nueva S y convencerle de que le queda bien.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd5',
    texto: 'Atender a 3 clientes imaginarios (uno exigente, uno indeciso y uno que no sabe qué quiere) en menos de 60 segundos.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd6',
    texto: 'Improvisar un maniquí con las prendas de una amiga y explicar sus "ventajas" como si vendieras.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd7',
    texto: 'Convencer a alguien de que el "look de hoy" es la combinación perfecta para una boda.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd8',
    texto: 'Hacer un escaparate en vivo con 3 objetos del bar en un minuto.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd9',
    texto: 'Simular un cliente difícil que devuelve algo 3 veces y resolver la situación con estilo.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd10',
    texto: 'Doblar una chaqueta de alguien con la técnica de tienda de lujo en menos de 15 segundos.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd11',
    texto: 'Venderle un chupito a alguien como si fuera "la pieza estrella de la colección otoño-invierno".',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd12',
    texto: 'Hacer un "stock" mental de todos los bolsos que ves en el local y decir qué "temporada" representa cada uno.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd13',
    texto: 'Convencer a una amiga de que el vestido que lleva es "la talla perfecta" aunque le quede grande o pequeño.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd14',
    texto: 'Organizar la mesa del bar como si fuera un escaparate de Black Friday.',
    nivel: NIVELES.DEPENDIENTA
  },
  {
    id: 'd15',
    texto: 'Improvisar un "¡Hola, bienvenida! ¿En qué puedo ayudarte?" a 5 desconocidos diferentes con tonos distintos.',
    nivel: NIVELES.DEPENDIENTA
  }
];

/** 15 retos - Enfoque: faceta de madre (hija mayor y niño pequeño) */
export const MISIONES_SUPERMAMI = [
  {
    id: 's1',
    texto: 'Enviar un audio a Jose diciendo que el niño pequeño ha decidido que ahora solo quiere comer puré de color azul.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's2',
    texto: 'Explicarle a la hija mayor por qué no puede llevarse tu vestido de novia de fiesta.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's3',
    texto: 'Hacer una lista de 10 cosas que un niño pequeño no debería tocar en una boda.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's4',
    texto: 'Imitar la conversación que tendrías con el niño pequeño cuando dice "no quiero" por quinta vez.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's5',
    texto: 'Enviar un audio a Jose diciendo que la hija mayor quiere ser tu dama de honor en el lugar de la mejor amiga.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's6',
    texto: 'Improvisar un cuento de buenas noches para un niño que empieza con "Érase una vez una novia que..."',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's7',
    texto: 'Explicar a 3 desconocidos cómo se negocia con un niño pequeño para que coma verduras.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's8',
    texto: 'Hacer la lista de la compra mental que harías cuando el niño dice que solo quiere comer galletas.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's9',
    texto: 'Simular la llamada que harías a Jose a las 3am porque el niño pequeño tiene un "monstruo debajo de la cama".',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's10',
    texto: 'Explicarle a la hija mayor por qué no puede llevarse a su mejor amiga al altar (solo caben X personas).',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's11',
    texto: 'Inventar 5 excusas creativas que un niño pequeño usaría para no irse a dormir el día de la boda.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's12',
    texto: 'Hacer un brindis improvisado como si fueras la hija mayor explicando por qué su mamá es la mejor.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's13',
    texto: 'Enviar un audio a Jose diciendo que el niño pequeño ha decidido que quiere ser el novio en vez del paje.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's14',
    texto: 'Improvisar la negociación que tendrías con la hija mayor para que use el vestido que le has comprado.',
    nivel: NIVELES.SUPERMAMI
  },
  {
    id: 's15',
    texto: 'Listar 10 cosas que un niño pequeño podría hacer en el altar que harían que la boda sea memorable.',
    nivel: NIVELES.SUPERMAMI
  }
];

/** 20 retos - Enfoque: relación con Jose y nervios de la boda */
export const MISIONES_CAOS_NOVIA = [
  {
    id: 'c1',
    texto: 'Llamar a Jose y decirle que has decidido cambiar el menú por comida rápida.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c2',
    texto: 'Hacer un brindis improvisado dedicado a Jose usando solo palabras que rimen con "boda".',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c3',
    texto: 'Convencer a un desconocido para que te firme como testigo falso en una servilleta.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c4',
    texto: 'Enviar un audio a Jose diciendo que has encontrado el vestido perfecto... pero en otra boda.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c5',
    texto: 'Improvisar los votos matrimoniales con un estilo "reality show" muy dramático.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c6',
    texto: 'Llamar a Jose y preguntarle si prefiere que el pastel sea de chocolate o de "sorpresa".',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c7',
    texto: 'Convencer a alguien de que te firme como "madrina de emergencia" en una servilleta.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c8',
    texto: 'Hacer un brindis por Jose usando solo emojis (hablados en voz alta).',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c9',
    texto: 'Simular la llamada que harías a Jose a las 2am porque te has acordado de un detalle de la boda.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c10',
    texto: 'Improvisar un discurso de agradecimiento a Jose como si fueras en la boda... pero con 3 copas de más.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c11',
    texto: 'Enviar un audio a Jose diciendo que has cambiado de opinión sobre el color del ramo (por tercera vez).',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c12',
    texto: 'Hacer una lista de 5 cosas que Jose hace que te sacan de quicio... y terminar con "pero te quiero".',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c13',
    texto: 'Convencer a un desconocido de que te preste su anillo para "probar" cómo quedaría el tuyo.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c14',
    texto: 'Improvisar la canción que pedirías para el primer baile con Jose (letra inventada en el momento).',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c15',
    texto: 'Llamar a Jose y decirle que has decidido que el "sí, quiero" sea en otro idioma.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c16',
    texto: 'Hacer un brindis por Jose imitando 3 acentos diferentes.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c17',
    texto: 'Improvisar un discurso de agradecimiento a Jose como si fuera la última noche de soltera.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c18',
    texto: 'Convencer a alguien de que te firme como "invitada VIP" en una servilleta para la boda.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c19',
    texto: 'Enviar un audio a Jose diciendo que has encontrado el lugar perfecto para la luna de miel: el bar de aquí.',
    nivel: NIVELES.CAOS_NOVIA
  },
  {
    id: 'c20',
    texto: 'Improvisar un "te quiero" a Jose usando 5 palabras que rimen con "amor".',
    nivel: NIVELES.CAOS_NOVIA
  }
];

/** Todas las misiones (50) en un solo array para uso aleatorio */
export const MISIONES = [
  ...MISIONES_DEPENDIENTA,
  ...MISIONES_SUPERMAMI,
  ...MISIONES_CAOS_NOVIA
];

/** Obtener misiones por nivel */
export function getMisionesByNivel(nivel) {
  return MISIONES.filter(m => m.nivel === nivel);
}

/** Obtener misiones mezcladas (sin repetir hasta que se acaben) */
export function getMisionesShuffled(nivelFiltro = null) {
  const filtradas = nivelFiltro ? getMisionesByNivel(nivelFiltro) : MISIONES;
  const copy = [...filtradas];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
