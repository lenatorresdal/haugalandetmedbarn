const parentalLeaveActivityIds = new Set([
  'babysvomming',
  'babysvomming-karmoyhallen',
  'apen',
  'sang',
  'babysang-rossabo',
  'babysang-var-frelsers',
  'babysang-norheim',
  'babysang-udland',
  'babysang-avaldsnes',
  'babysang-torvastad',
  'babysang-kopervik',
  'babysang-akra',
  'babysang-aksdal',
  'babysang-sveio',
  'biblobaby',
  'biblobarn',
  'pappatreff',
  'babykino-edda',
  'musikklek-babymassasje-tysvaer',
  'babymassasje-atlas',
  'barselyoga-sentrum-yoga',
  'musikklek-baby-tysvaer',
  'trilletur-dnt-haugesund',
  'barselklatring-haugalandsveggen',
  'barseltrening-yes',
  'trening-baby-gymsalen',
  'trening-baby-crossfit-verftet',
  'trening-baby-boost',
]);

export function fitsParentalLeave(activity) {
  return activity.category === 'Kafé & kos' || parentalLeaveActivityIds.has(activity.id);
}
