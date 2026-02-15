export const RETOS = [
  { texto: 'Invita a dos personas a brindar juntas con un chupito y una mirada intensa.', categoria: 'grupal', intensidad: 'medio' },
  { texto: 'Confiesa qué acto pequeño te hace sentir más cerca de Ana.', categoria: 'confesion', intensidad: 'suave' },
  { texto: 'Baila 20 segundos con alguien usando solo los hombros.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Describe la escena de tu cita picante favorita en tres frases y termina con un “te provoca”.', categoria: 'picante', intensidad: 'medio' },
  { texto: 'El grupo repite una palabra cariñosa mientras hacen un círculo sonoro.', categoria: 'grupal', intensidad: 'suave' },
  { texto: 'Cuenta un deseo para Ana que te gustaría cumplir antes de la boda.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Crea un paso improvisado con palmas y dilo en voz alta.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Dibuja con tu dedo en el aire una prenda prohibida y deja que el grupo la nombre.', categoria: 'picante', intensidad: 'medio' },
  { texto: 'Todos cuentan un recuerdo que la noche no puede olvidar.', categoria: 'grupal', intensidad: 'medio' },
  { texto: 'Confiesa qué emoción te sorprende cada vez que miras a Ana.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Baila un paso lento y di el nombre de una canción antes de girar.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Invita a alguien a un brindis secreto con un chupito y una sonrisa tenue.', categoria: 'picante', intensidad: 'medio' },
  { texto: 'El grupo crea un brindis donde cada persona dice algo que admira.', categoria: 'grupal', intensidad: 'suave' },
  { texto: 'Confiesa qué palabra define tu historia con Ana.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Haz un paso de baile con un suspiro al final que inspire a las demás.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Cuenta un deseo atrevido que incluirías en la luna de miel.', categoria: 'picante', intensidad: 'atrevido' },
  { texto: 'Todas dan un aplauso con ritmo y suman una frase de agradecimiento.', categoria: 'grupal', intensidad: 'medio' },
  { texto: 'Confiesa una emoción que da miedo admitir y termina con un brindis.', categoria: 'confesion', intensidad: 'medio' },
  { texto: 'Baila ocho tiempos y terminen con una reverencia elegante.', categoria: 'baile', intensidad: 'medio' },
  { texto: 'Describe un secreto sensual y deja que el grupo pregunte si es verdad.', categoria: 'picante', intensidad: 'medio' }
];

export const RETO_CATEGORY_OPTIONS = [
  { value: 'todos', label: 'Todas' },
  { value: 'grupal', label: 'Grupal' },
  { value: 'confesion', label: 'Confesión' },
  { value: 'picante', label: 'Picante' },
  { value: 'baile', label: 'Baile' }
];

export const RETO_INTENSITY_OPTIONS = [
  { value: 'todos', label: 'Todas' },
  { value: 'suave', label: 'Suave' },
  { value: 'medio', label: 'Medio' },
  { value: 'atrevido', label: 'Atrevido' }
];

export const RETO_CATEGORY_LABELS = RETO_CATEGORY_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

export const RETO_INTENSITY_LABELS = RETO_INTENSITY_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});
