export interface ModalVerb {
  id: string;
  infinitive: string;
  english: string;
  present: {
    ik: string;
    jij: string;
    hij: string;
    wij: string;
    jullie: string;
    zij: string;
  };
  pastTense: {
    ik: string;
    jij: string;
    hij: string;
    wij: string;
    jullie: string;
    zij: string;
  };
  meaning: string;
  usage: string;
  level: 'A1' | 'A2' | 'B1';
  rule?: string;
  hint?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  negativeForm?: string;
  questionForm?: string;
}

export const modalVerbs: ModalVerb[] = [
  {
    id: 'modal001',
    infinitive: 'kunnen',
    english: 'can/to be able to',
    present: {
      ik: 'kan',
      jij: 'kunt/kan',
      hij: 'kan',
      wij: 'kunnen',
      jullie: 'kunnen',
      zij: 'kunnen',
    },
    pastTense: {
      ik: 'kon',
      jij: 'kon',
      hij: 'kon',
      wij: 'konden',
      jullie: 'konden',
      zij: 'konden',
    },
    meaning: 'ability, permission, possibility',
    usage: 'Used to express ability or possibility',
    level: 'A1',
    rule: 'Irregular conjugation - memorize forms',
    hint: 'Used for "can" or "to be able to"',
    exampleSentence: 'Ik kan Nederlands spreken',
    exampleTranslation: 'I can speak Dutch',
    negativeForm: 'kan niet',
    questionForm: 'Kun je...? / Kan je...?',
  },
  {
    id: 'modal002',
    infinitive: 'mogen',
    english: 'may/to be allowed to',
    present: {
      ik: 'mag',
      jij: 'mag',
      hij: 'mag',
      wij: 'mogen',
      jullie: 'mogen',
      zij: 'mogen',
    },
    pastTense: {
      ik: 'mocht',
      jij: 'mocht',
      hij: 'mocht',
      wij: 'mochten',
      jullie: 'mochten',
      zij: 'mochten',
    },
    meaning: 'permission, being allowed',
    usage: 'Used to express permission or being allowed to do something',
    level: 'A1',
    rule: 'Irregular conjugation - memorize forms',
    hint: 'Used for permission: "may" or "to be allowed to"',
    exampleSentence: 'Mag ik naar buiten?',
    exampleTranslation: 'May I go outside?',
    negativeForm: 'mag niet',
    questionForm: 'Mag ik...?',
  },
  {
    id: 'modal003',
    infinitive: 'moeten',
    english: 'must/to have to',
    present: {
      ik: 'moet',
      jij: 'moet',
      hij: 'moet',
      wij: 'moeten',
      jullie: 'moeten',
      zij: 'moeten',
    },
    pastTense: {
      ik: 'moest',
      jij: 'moest',
      hij: 'moest',
      wij: 'moesten',
      jullie: 'moesten',
      zij: 'moesten',
    },
    meaning: 'necessity, obligation',
    usage: 'Used to express necessity or obligation',
    level: 'A1',
    rule: 'Irregular conjugation - memorize forms',
    hint: 'Used for "must" or "to have to"',
    exampleSentence: 'Ik moet werken',
    exampleTranslation: 'I have to work',
    negativeForm: 'hoeft niet / moet niet',
    questionForm: 'Moet je...?',
  },
  {
    id: 'modal004',
    infinitive: 'willen',
    english: 'to want',
    present: {
      ik: 'wil',
      jij: 'wilt/wil',
      hij: 'wil',
      wij: 'willen',
      jullie: 'willen',
      zij: 'willen',
    },
    pastTense: {
      ik: 'wilde',
      jij: 'wilde',
      hij: 'wilde',
      wij: 'wilden',
      jullie: 'wilden',
      zij: 'wilden',
    },
    meaning: 'desire, wish, want',
    usage: 'Used to express desire or wish',
    level: 'A1',
    rule: 'Irregular conjugation - memorize forms',
    hint: 'Used for "to want" or expressing desire',
    exampleSentence: 'Ik wil koffie drinken',
    exampleTranslation: 'I want to drink coffee',
    negativeForm: 'wil niet',
    questionForm: 'Wil je...?',
  },
  {
    id: 'modal005',
    infinitive: 'zullen',
    english: 'will/shall',
    present: {
      ik: 'zal',
      jij: 'zult/zal',
      hij: 'zal',
      wij: 'zullen',
      jullie: 'zullen',
      zij: 'zullen',
    },
    pastTense: {
      ik: 'zou',
      jij: 'zou',
      hij: 'zou',
      wij: 'zouden',
      jullie: 'zouden',
      zij: 'zouden',
    },
    meaning: 'future tense, probability',
    usage: 'Used to form future tense and express probability',
    level: 'A2',
    rule: 'Irregular conjugation - memorize forms',
    hint: 'Used for future tense and probability',
    exampleSentence: 'Ik zal morgen komen',
    exampleTranslation: 'I will come tomorrow',
    negativeForm: 'zal niet',
    questionForm: 'Zul je...?',
  },
  {
    id: 'modal006',
    infinitive: 'hoeven',
    english: 'to need/to have to (negative)',
    present: {
      ik: 'hoef',
      jij: 'hoeft',
      hij: 'hoeft',
      wij: 'hoeven',
      jullie: 'hoeven',
      zij: 'hoeven',
    },
    pastTense: {
      ik: 'hoefde',
      jij: 'hoefde',
      hij: 'hoefde',
      wij: 'hoefden',
      jullie: 'hoefden',
      zij: 'hoefden',
    },
    meaning: 'necessity in negative context',
    usage: 'Used mainly in negative sentences to express lack of necessity',
    level: 'A2',
    rule: 'Usually used with "niet" - hoef niet',
    hint: 'Mainly used in negative form: "hoef niet" = "don\'t need to"',
    exampleSentence: 'Je hoeft niet te komen',
    exampleTranslation: "You don't need to come",
    negativeForm: 'hoef niet',
    questionForm: 'Hoef je...?',
  },
  {
    id: 'modal007',
    infinitive: 'laten',
    english: 'to let/to have someone do',
    present: {
      ik: 'laat',
      jij: 'laat',
      hij: 'laat',
      wij: 'laten',
      jullie: 'laten',
      zij: 'laten',
    },
    pastTense: {
      ik: 'liet',
      jij: 'liet',
      hij: 'liet',
      wij: 'lieten',
      jullie: 'lieten',
      zij: 'lieten',
    },
    meaning: 'causative, permission',
    usage: 'Used to express having someone do something or allowing',
    level: 'A2',
    rule: 'Regular present, irregular past',
    hint: 'Used for "let" or "have someone do something"',
    exampleSentence: 'Ik laat de auto repareren',
    exampleTranslation: 'I have the car repaired',
    negativeForm: 'laat niet',
    questionForm: 'Laat je...?',
  },
  {
    id: 'modal008',
    infinitive: 'durven',
    english: 'to dare',
    present: {
      ik: 'durf',
      jij: 'durft',
      hij: 'durft',
      wij: 'durven',
      jullie: 'durven',
      zij: 'durven',
    },
    pastTense: {
      ik: 'durfde',
      jij: 'durfde',
      hij: 'durfde',
      wij: 'durfden',
      jullie: 'durfden',
      zij: 'durfden',
    },
    meaning: 'courage, daring',
    usage: 'Used to express daring or having courage to do something',
    level: 'B1',
    rule: 'Regular conjugation',
    hint: 'Used for "to dare" - expressing courage',
    exampleSentence: 'Ik durf niet te springen',
    exampleTranslation: "I don't dare to jump",
    negativeForm: 'durf niet',
    questionForm: 'Durf je...?',
  },
];
