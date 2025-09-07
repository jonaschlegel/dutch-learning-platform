export interface ExamExercise {
  id: string;
  type:
    | 'perfect-construction'
    | 'imperfect-fill'
    | 'separable-verbs'
    | 'conjunctions-combine'
    | 'multiple-choice'
    | 'reading-comprehension'
    | 'writing-prompt';
  category: string;
  level: 'A1' | 'A2' | 'B1';
  instruction: string;
  question: string;
  englishTranslation?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  hints?: string[];
  points: number;
  sampleAnswer?: string;
  wordCount?: number;
}

// Perfect Tense Construction Exercises
export const perfectTenseExercises: ExamExercise[] = [
  {
    id: 'perfect_001',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Peter – een boterham – eten)',
    englishTranslation: '(Peter – a sandwich – eat)',
    correctAnswer: 'Peter heeft een boterham gegeten.',
    explanation: 'Use "heeft" with regular verbs + past participle',
    hints: ['Use "heeft" as auxiliary verb', 'Past participle: gegeten'],
    points: 2,
  },
  {
    id: 'perfect_002',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Esther – een vraag aan de dokter – stellen)',
    englishTranslation: '(Esther – a question to the doctor – ask)',
    correctAnswer: 'Esther heeft een vraag aan de dokter gesteld.',
    explanation: 'Use "heeft" with transitive verbs',
    hints: ['Use "heeft" as auxiliary verb', 'Past participle: gesteld'],
    points: 2,
  },
  {
    id: 'perfect_003',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Wim – zijn band – repareren)',
    englishTranslation: '(Wim – his tire – repair)',
    correctAnswer: 'Wim heeft zijn band gerepareerd.',
    explanation: 'Use "heeft" with regular -eren verbs',
    hints: ['Use "heeft" as auxiliary verb', 'Past participle: gerepareerd'],
    points: 2,
  },
  {
    id: 'perfect_004',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Marjolijn – naar de markt – zijn)',
    englishTranslation: '(Marjolijn – to the market – be)',
    correctAnswer: 'Marjolijn is naar de markt geweest.',
    explanation: 'Use "is" with motion verbs and "zijn"',
    hints: ['Use "is" as auxiliary verb', 'Past participle: geweest'],
    points: 2,
  },
  {
    id: 'perfect_005',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Karin – voor haar examen – zakken)',
    englishTranslation: '(Karin – for her exam – fail)',
    correctAnswer: 'Karin is voor haar examen gezakt.',
    explanation: 'Use "is" with verbs expressing a change of state',
    hints: ['Use "is" as auxiliary verb', 'Past participle: gezakt'],
    points: 2,
  },
  {
    id: 'perfect_006',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Maria – haar huiswerk – maken)',
    englishTranslation: '(Maria – her homework – do)',
    correctAnswer: 'Maria heeft haar huiswerk gemaakt.',
    explanation: 'Use "heeft" with transitive verbs',
    hints: ['Use "heeft" as auxiliary verb', 'Past participle: gemaakt'],
    points: 2,
  },
  {
    id: 'perfect_007',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(De kinderen – in het park – spelen)',
    englishTranslation: '(The children – in the park – play)',
    correctAnswer: 'De kinderen hebben in het park gespeeld.',
    explanation: 'Use "hebben" with most verbs',
    hints: ['Use "hebben" as auxiliary verb', 'Past participle: gespeeld'],
    points: 2,
  },
  {
    id: 'perfect_008',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Jan – naar Amsterdam – reizen)',
    englishTranslation: '(Jan – to Amsterdam – travel)',
    correctAnswer: 'Jan is naar Amsterdam gereisd.',
    explanation: 'Use "is" with motion verbs',
    hints: ['Use "is" as auxiliary verb', 'Past participle: gereisd'],
    points: 2,
  },
  {
    id: 'perfect_009',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Wij – een nieuwe auto – kopen)',
    englishTranslation: '(We – a new car – buy)',
    correctAnswer: 'Wij hebben een nieuwe auto gekocht.',
    explanation: 'Use "hebben" with transitive verbs',
    hints: ['Use "hebben" as auxiliary verb', 'Past participle: gekocht'],
    points: 2,
  },
  {
    id: 'perfect_010',
    type: 'perfect-construction',
    category: 'Perfect Tense',
    level: 'A2',
    instruction: 'Construct a perfect tense sentence using the given elements.',
    question: '(Lisa – vroeg – opstaan)',
    englishTranslation: '(Lisa – early – get up)',
    correctAnswer: 'Lisa is vroeg opgestaan.',
    explanation: 'Use "is" with motion/state change verbs',
    hints: ['Use "is" as auxiliary verb', 'Past participle: opgestaan'],
    points: 2,
  },
];

// Imperfect Tense Fill-in Exercises
export const imperfectExercises: ExamExercise[] = [
  {
    id: 'imperfect_001',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question:
      'Gisteren .......... ik op internet twee kaartjes voor de voorstelling. (kopen)',
    englishTranslation:
      'Yesterday I .......... two tickets for the show on the internet. (to buy)',
    correctAnswer: 'kocht',
    explanation: 'Imperfect of "kopen" is "kocht"',
    hints: ['Strong verb: kopen - kocht', 'First person singular'],
    points: 1,
  },
  {
    id: 'imperfect_002',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question:
      'Ik .......... de docent of we de toets een week konden uitstellen. (vragen)',
    englishTranslation:
      'I .......... the teacher if we could postpone the test by a week. (to ask)',
    correctAnswer: 'vroeg',
    explanation: 'Imperfect of "vragen" is "vroeg"',
    hints: ['Strong verb: vragen - vroeg', 'First person singular'],
    points: 1,
  },
  {
    id: 'imperfect_003',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question: 'Ik .......... niet wat hij zei. (begrijpen)',
    englishTranslation: 'I .......... not what he said. (to understand)',
    correctAnswer: 'begreep',
    explanation: 'Imperfect of "begrijpen" is "begreep"',
    hints: ['Strong verb: begrijpen - begreep', 'First person singular'],
    points: 1,
  },
  {
    id: 'imperfect_004',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question:
      'Ik zag mijn vriendin en .......... haar op straat maar ze hoorde me niet. (roepen)',
    englishTranslation:
      "I saw my friend and .......... her on the street but she didn't hear me. (to call)",
    correctAnswer: 'riep',
    explanation: 'Imperfect of "roepen" is "riep"',
    hints: ['Strong verb: roepen - riep', 'First person singular'],
    points: 1,
  },
  {
    id: 'imperfect_005',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question:
      'Ik .......... ziek, omdat ik iets verkeerds had gegeten. (worden)',
    englishTranslation:
      'I .......... sick, because I had eaten something wrong. (to become)',
    correctAnswer: 'werd',
    explanation: 'Imperfect of "worden" is "werd"',
    hints: ['Strong verb: worden - werd', 'First person singular'],
    points: 1,
  },
  {
    id: 'imperfect_006',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question: 'Elke dag .......... ik naar school. (lopen)',
    englishTranslation: 'Every day I .......... to school. (walk)',
    correctAnswer: 'liep',
    explanation: 'Imperfect of "lopen" is "liep"',
    hints: ['Strong verb: lopen - liep', 'First person singular'],
    points: 1,
  },
  {
    id: 'imperfect_007',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question: 'Hij .......... altijd veel boeken. (lezen)',
    englishTranslation: 'He always .......... many books. (read)',
    correctAnswer: 'las',
    explanation: 'Imperfect of "lezen" is "las"',
    hints: ['Strong verb: lezen - las', 'Third person singular'],
    points: 1,
  },
  {
    id: 'imperfect_008',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question: 'Vroeger .......... we vaak naar oma. (gaan)',
    englishTranslation: 'In the past we often .......... to grandma. (go)',
    correctAnswer: 'gingen',
    explanation: 'Imperfect of "gaan" is "gingen"',
    hints: ['Strong verb: gaan - gingen', 'First person plural'],
    points: 1,
  },
  {
    id: 'imperfect_009',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question: 'Mijn vader .......... hard voor zijn werk. (werken)',
    englishTranslation: 'My father .......... hard for his job. (work)',
    correctAnswer: 'werkte',
    explanation: 'Imperfect of "werken" is "werkte"',
    hints: ['Weak verb: werken - werkte', 'Third person singular'],
    points: 1,
  },
  {
    id: 'imperfect_010',
    type: 'imperfect-fill',
    category: 'Imperfect Tense',
    level: 'A2',
    instruction: 'Fill in the correct imperfect tense form.',
    question: 'De leraar .......... de les heel duidelijk. (uitleggen)',
    englishTranslation:
      'The teacher .......... the lesson very clearly. (explain)',
    correctAnswer: 'legde uit',
    explanation: 'Separable verb: "uitleggen" becomes "legde uit"',
    hints: ['Separable verb: uit + leggen', 'Third person singular'],
    points: 1,
  },
];

// Separable Verbs Exercises
export const separableVerbsExercises: ExamExercise[] = [
  {
    id: 'separable_001',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question:
      '(oversteken – presens) De oude vrouw .......... de straat ..........',
    englishTranslation:
      '(to cross – present) The old woman .......... the street ..........',
    correctAnswer: 'De oude vrouw steekt de straat over.',
    explanation: 'Present tense separable verb: steekt...over',
    hints: ['Separate the prefix in present tense', 'steekt + over'],
    points: 2,
  },
  {
    id: 'separable_002',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question:
      '(meenemen – imperfectum) Kees .......... zijn mobiele telefoon ..........',
    englishTranslation:
      '(to take along – imperfect) Kees .......... his mobile phone ..........',
    correctAnswer: 'Kees nam zijn mobiele telefoon mee.',
    explanation: 'Imperfect tense separable verb: nam...mee',
    hints: ['Separate the prefix in simple tenses', 'nam + mee'],
    points: 2,
  },
  {
    id: 'separable_003',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question: '(aankomen – perfectum) De trein .......... om 10.15 ..........',
    englishTranslation:
      '(to arrive – perfect) The train .......... at 10:15 ..........',
    correctAnswer: 'De trein is om 10.15 aangekomen.',
    explanation: 'Perfect tense: prefix stays with past participle',
    hints: ['Perfect tense: is + aangekomen', 'Prefix stays attached'],
    points: 2,
  },
  {
    id: 'separable_004',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question: '(afrekenen – presens – vraag) Kunnen we even ..........?',
    englishTranslation:
      '(to pay – present – question) Can we .......... for a moment?',
    correctAnswer: 'Kunnen we even afrekenen?',
    explanation: 'In modal verb construction, separable verb stays together',
    hints: ['With modal verbs, keep verb together', 'kunnen + afrekenen'],
    points: 2,
  },
  {
    id: 'separable_005',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question:
      '(uitdoen – presens – vraag) .......... jij het licht ..........?',
    englishTranslation:
      '(to turn off – present – question) .......... you the light ..........?',
    correctAnswer: 'Doe jij het licht uit?',
    explanation: 'Question form: verb first, prefix at end',
    hints: ['Question: Doe...uit', 'Verb inversion in questions'],
    points: 2,
  },
  {
    id: 'separable_006',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question: '(klaarmaken – perfectum) Ik .......... het eten ..........',
    englishTranslation:
      '(to prepare – perfect) I .......... the food ..........',
    correctAnswer: 'Ik heb het eten klaargemaakt.',
    explanation: 'Perfect tense: heb + klaargemaakt',
    hints: [
      'Perfect: heb + klaargemaakt',
      'Prefix attached in past participle',
    ],
    points: 2,
  },
  {
    id: 'separable_007',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question: '(opruimen – presens) Ik .......... mijn kamer ..........',
    englishTranslation:
      '(to clean up – present) I .......... my room ..........',
    correctAnswer: 'Ik ruim mijn kamer op.',
    explanation: 'Present tense: ruim...op',
    hints: ['Present: ruim + op', 'Separate in simple tenses'],
    points: 2,
  },
  {
    id: 'separable_008',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question:
      '(uitnodigen – perfectum) We .......... al onze vrienden ..........',
    englishTranslation:
      '(to invite – perfect) We .......... all our friends ..........',
    correctAnswer: 'We hebben al onze vrienden uitgenodigd.',
    explanation: 'Perfect tense: hebben + uitgenodigd',
    hints: [
      'Perfect: hebben + uitgenodigd',
      'Prefix stays with past participle',
    ],
    points: 2,
  },
  {
    id: 'separable_009',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question: '(wegbrengen – imperfectum) Hij .......... de vuilnis ..........',
    englishTranslation:
      '(to take away – imperfect) He .......... the garbage ..........',
    correctAnswer: 'Hij bracht de vuilnis weg.',
    explanation: 'Imperfect: bracht...weg',
    hints: ['Imperfect: bracht + weg', 'Separate in simple tenses'],
    points: 2,
  },
  {
    id: 'separable_010',
    type: 'separable-verbs',
    category: 'Separable Verbs',
    level: 'A2',
    instruction:
      'Complete the sentence with the correct form of the separable verb.',
    question:
      '(terugkomen – perfectum – vraag) .......... jullie al ..........?',
    englishTranslation:
      '(to come back – perfect – question) .......... you already ..........?',
    correctAnswer: 'Zijn jullie al teruggekomen?',
    explanation: 'Perfect tense question: zijn + teruggekomen',
    hints: ['Perfect question: zijn + teruggekomen', 'Motion verb uses "zijn"'],
    points: 2,
  },
];

// Conjunctions Exercises
export const conjunctionExercises: ExamExercise[] = [
  {
    id: 'conjunction_001',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question:
      'Ik maakte het eten. Mijn vriendin keek een spannende film. (terwijl)',
    englishTranslation:
      'I made the food. My girlfriend watched an exciting film. (while)',
    correctAnswer:
      'Ik maakte het eten, terwijl mijn vriendin een spannende film keek.',
    explanation:
      '"Terwijl" sends the verb to the end of the subordinate clause',
    hints: [
      'Subordinating conjunction',
      'Verb goes to the end after "terwijl"',
    ],
    points: 2,
  },
  {
    id: 'conjunction_002',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ik moet vanmiddag naar de tandarts. Ik heb een gaatje. (omdat)',
    englishTranslation:
      'I have to go to the dentist this afternoon. I have a cavity. (because)',
    correctAnswer:
      'Ik moet vanmiddag naar de tandarts, omdat ik een gaatje heb.',
    explanation: '"Omdat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "omdat"'],
    points: 2,
  },
  {
    id: 'conjunction_003',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question:
      'Ik moet zometeen naar de dokter. Ik ben gevallen met de fiets. (want)',
    englishTranslation:
      'I have to go to the doctor in a moment. I fell off my bike. (because)',
    correctAnswer:
      'Ik moet zometeen naar de dokter, want ik ben gevallen met de fiets.',
    explanation: '"Want" is a coordinating conjunction - normal word order',
    hints: ['Coordinating conjunction', 'Normal word order after "want"'],
    points: 2,
  },
  {
    id: 'conjunction_004',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ik ga mijn rijbewijs halen. Ik ben achttien. (zodra)',
    englishTranslation:
      "I'm going to get my driver's license. I am eighteen. (as soon as)",
    correctAnswer: 'Ik ga mijn rijbewijs halen zodra ik achttien ben.',
    explanation: '"Zodra" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "zodra"'],
    points: 2,
  },
  {
    id: 'conjunction_005',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question:
      'Ik heb een goed cijfer gehaald. Ik hoef geen herexamen te doen. (dus)',
    englishTranslation:
      "I got a good grade. I don't need to retake the exam. (so)",
    correctAnswer:
      'Ik heb een goed cijfer gehaald, dus ik hoef geen herexamen te doen.',
    explanation: '"Dus" is a coordinating conjunction - normal word order',
    hints: ['Coordinating conjunction', 'Normal word order after "dus"'],
    points: 2,
  },
  {
    id: 'conjunction_006',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Het regent hard. We blijven thuis. (omdat)',
    englishTranslation: "It's raining hard. We stay home. (because)",
    correctAnswer: 'We blijven thuis omdat het hard regent.',
    explanation: '"Omdat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "omdat"'],
    points: 2,
  },
  {
    id: 'conjunction_007',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ik studeer Nederlands. Ik wil in Nederland wonen. (omdat)',
    englishTranslation:
      'I study Dutch. I want to live in the Netherlands. (because)',
    correctAnswer: 'Ik studeer Nederlands omdat ik in Nederland wil wonen.',
    explanation: '"Omdat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "omdat"'],
    points: 2,
  },
  {
    id: 'conjunction_008',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ze heeft geen geld. Ze koopt geen nieuwe jas. (dus)',
    englishTranslation: "She has no money. She doesn't buy a new coat. (so)",
    correctAnswer: 'Ze heeft geen geld, dus ze koopt geen nieuwe jas.',
    explanation: '"Dus" is a coordinating conjunction - normal word order',
    hints: ['Coordinating conjunction', 'Normal word order after "dus"'],
    points: 2,
  },
  {
    id: 'conjunction_009',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question:
      'Ik heb een goed cijfer gehaald. Ik hoef geen herexamen te doen. (zodat)',
    englishTranslation:
      "I got a good grade. I don't need to retake the exam. (so that)",
    correctAnswer:
      'Ik heb een goed cijfer gehaald zodat ik geen herexamen hoef te doen.',
    explanation: '"Zodat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "zodat"'],
    points: 2,
  },
  {
    id: 'conjunction_010',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Vandaag is het koud. We gaan toch fietsen. (hoewel)',
    englishTranslation:
      "Today it's cold. We're still going cycling. (although)",
    correctAnswer: 'Hoewel het vandaag koud is, gaan we toch fietsen.',
    explanation:
      '"Hoewel" can start the sentence with verb at the end of that clause',
    hints: ['Subordinating conjunction', 'Can start sentence with "hoewel"'],
    points: 2,
  },
  {
    id: 'conjunction_011',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ik ga naar het feestje. Ik heb gezegd dat ik kom. (nadat)',
    englishTranslation: "I'm going to the party. I said I would come. (after)",
    correctAnswer: 'Ik ga naar het feestje nadat ik heb gezegd dat ik kom.',
    explanation: '"Nadat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "nadat"'],
    points: 2,
  },
  {
    id: 'conjunction_012',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Het regent hard. We blijven thuis. (omdat)',
    englishTranslation: "It's raining hard. We stay home. (because)",
    correctAnswer: 'We blijven thuis omdat het hard regent.',
    explanation: '"Omdat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "omdat"'],
    points: 2,
  },
  {
    id: 'conjunction_013',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ik studeer Nederlands. Ik wil in Nederland wonen. (omdat)',
    englishTranslation:
      'I study Dutch. I want to live in the Netherlands. (because)',
    correctAnswer: 'Ik studeer Nederlands omdat ik in Nederland wil wonen.',
    explanation: '"Omdat" sends the verb to the end of the subordinate clause',
    hints: ['Subordinating conjunction', 'Verb goes to the end after "omdat"'],
    points: 2,
  },
  {
    id: 'conjunction_014',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ze heeft geen geld. Ze koopt geen nieuwe jas. (dus)',
    englishTranslation: "She has no money. She doesn't buy a new coat. (so)",
    correctAnswer: 'Ze heeft geen geld, dus ze koopt geen nieuwe jas.',
    explanation: '"Dus" is a coordinating conjunction - normal word order',
    hints: ['Coordinating conjunction', 'Normal word order after "dus"'],
    points: 2,
  },
  {
    id: 'conjunction_015',
    type: 'conjunctions-combine',
    category: 'Conjunctions',
    level: 'A2',
    instruction: 'Combine the two sentences using the given conjunction.',
    question: 'Ik was moe. Ik ging vroeg naar bed. (want)',
    englishTranslation: 'I was tired. I went to bed early. (because)',
    correctAnswer: 'Ik ging vroeg naar bed, want ik was moe.',
    explanation: '"Want" is a coordinating conjunction - normal word order',
    hints: ['Coordinating conjunction', 'Normal word order after "want"'],
    points: 2,
  },
];

// Multiple Choice Exercises
export const multipleChoiceExercises: ExamExercise[] = [
  {
    id: 'mc_001',
    type: 'multiple-choice',
    category: 'Conversation',
    level: 'A1',
    instruction: 'Choose the best response.',
    question: 'Wat vind je van de biefstuk?',
    englishTranslation: 'What do you think of the steak?',
    options: ['Ja lekker', 'Nee, dank je', 'Tot ziens', 'Goedemorgen'],
    correctAnswer: 'Ja lekker',
    explanation:
      'When asked for opinion about food, "Ja lekker" (Yes, delicious) is appropriate',
    points: 1,
  },
  {
    id: 'mc_002',
    type: 'multiple-choice',
    category: 'Conversation',
    level: 'A1',
    instruction: 'Choose the best response.',
    question: 'Ik ben geslaagd!',
    englishTranslation: 'I passed!',
    options: ['Gefeliciteerd!', 'Dag!', 'Dank je wel', 'Sorry'],
    correctAnswer: 'Gefeliciteerd!',
    explanation:
      'When someone shares good news, "Gefeliciteerd!" (Congratulations!) is the proper response',
    points: 1,
  },
  {
    id: 'mc_003',
    type: 'multiple-choice',
    category: 'Shopping',
    level: 'A1',
    instruction: 'Choose the best response.',
    question: 'Anders nog iets?',
    englishTranslation: 'Anything else?',
    options: ['Ja, graag', 'Nee, dank u. Dat is alles.', 'Tot ziens', 'Hallo'],
    correctAnswer: 'Nee, dank u. Dat is alles.',
    explanation:
      'When asked if you need anything else, this polite decline is appropriate',
    points: 1,
  },
  {
    id: 'mc_004',
    type: 'multiple-choice',
    category: 'Communication',
    level: 'A2',
    instruction: 'Choose the correct word to complete the sentence.',
    question: 'Ik .......... u niet. U praat een beetje zacht.',
    englishTranslation: 'I .......... you. You speak a bit quietly.',
    options: ['hoor', 'zie', 'voel', 'ruik'],
    correctAnswer: 'hoor',
    explanation:
      '"Horen" means to hear - appropriate when someone speaks quietly',
    points: 1,
  },
  {
    id: 'mc_005',
    type: 'multiple-choice',
    category: 'Vocabulary',
    level: 'A2',
    instruction: 'Choose the correct word to complete the sentence.',
    question: 'Wat .......... dat moeilijke woord?',
    englishTranslation: 'What does that difficult word ..........?',
    options: ['zegt', 'doet', 'betekent', 'spreekt'],
    correctAnswer: 'betekent',
    explanation:
      '"Betekenen" means "to mean" - used when asking for word definitions',
    points: 1,
  },
  {
    id: 'mc_006',
    type: 'multiple-choice',
    category: 'Education',
    level: 'A2',
    instruction: 'Choose the correct word to complete the sentence.',
    question: 'Ik .......... de som niet. Kunt u het nog een keer uitleggen?',
    englishTranslation: "I don't .......... the sum. Can you explain it again?",
    options: ['weet', 'begrijp', 'ken', 'hoor'],
    correctAnswer: 'begrijp',
    explanation:
      '"Begrijpen" means "to understand" - used when you don\'t comprehend something',
    points: 1,
  },
  {
    id: 'mc_007',
    type: 'multiple-choice',
    category: 'Crime/Police',
    level: 'A2',
    instruction: 'Choose the best response.',
    question: 'Wanneer is uw tas gestolen?',
    englishTranslation: 'When was your bag stolen?',
    options: [
      'Dat weet ik niet meer.',
      'Ja, dank je wel.',
      'Nee, dat is niet waar.',
      'Tot ziens.',
    ],
    correctAnswer: 'Dat weet ik niet meer.',
    explanation:
      "When you can't remember when something happened, this is the appropriate response",
    points: 1,
  },
];

// Writing Exercises
export const writingExercises: ExamExercise[] = [
  {
    id: 'writing_001',
    type: 'writing-prompt',
    category: 'Writing',
    level: 'A2',
    instruction:
      'Write a text of approximately 100 words about the given topic.',
    question: 'Bezoek aan de huisarts - Schrijf over een bezoek aan de dokter.',
    englishTranslation:
      'Visit to the doctor - Write about a visit to the doctor.',
    correctAnswer: 'Open-ended writing exercise',
    wordCount: 100,
    sampleAnswer:
      'Gisteren ben ik naar de huisarts geweest omdat ik me niet lekker voelde. Ik had hoofdpijn en koorts. In de wachtkamer moest ik twintig minuten wachten. De dokter was erg vriendelijk en stelde veel vragen over mijn klachten. Hij heeft me onderzocht en zei dat ik griep heb. Hij gaf me medicijnen en zei dat ik veel moet rusten. Ik moet veel water drinken en paracetamol nemen tegen de pijn. Over een week moet ik terugkomen als ik me nog steeds ziek voel. Ik hoop dat ik snel beter word.',
    explanation:
      'Write about symptoms, waiting, examination, diagnosis, treatment, and recovery',
    hints: [
      'Include: symptoms, doctor visit, diagnosis, treatment',
      'Use past tense and present tense',
      'About 100 words',
    ],
    points: 10,
  },
  {
    id: 'writing_002',
    type: 'writing-prompt',
    category: 'Writing',
    level: 'A2',
    instruction:
      'Write a text of approximately 100 words about the given topic.',
    question:
      'Bezoek aan de fietsenmaker - Schrijf over een probleem met je fiets.',
    englishTranslation:
      'Visit to the bike repair shop - Write about a problem with your bike.',
    correctAnswer: 'Open-ended writing exercise',
    wordCount: 100,
    sampleAnswer:
      'Vorige week had ik een probleem met mijn fiets. De ketting was gebroken en ik kon niet meer fietsen. Ik ben naar de fietsenmaker in mijn buurt gegaan. Hij was erg behulpzaam en keek meteen naar mijn fiets. Hij zei dat hij een nieuwe ketting nodig had en dat het een dag zou duren. De reparatie kostte dertig euro, wat ik redelijk vond. De volgende dag kon ik mijn fiets ophalen. Nu rijdt hij weer perfect! Ik ben blij dat ik weer kan fietsen naar mijn werk. De fietsenmaker deed zijn werk heel goed.',
    explanation:
      'Write about the problem, repair shop visit, cost, and resolution',
    hints: [
      'Include: problem description, repair process, cost, outcome',
      'Use past tense',
      'About 100 words',
    ],
    points: 10,
  },
  {
    id: 'writing_003',
    type: 'writing-prompt',
    category: 'Writing',
    level: 'A2',
    instruction: 'Write a letter of approximately 100 words.',
    question:
      'Brief aan een vriend - Schrijf waarom je niet naar zijn/haar feestje kunt komen.',
    englishTranslation:
      'Letter to a friend - Write why you cannot come to his/her party.',
    correctAnswer: 'Open-ended writing exercise',
    wordCount: 100,
    sampleAnswer:
      'Lieve Sarah, Dank je wel voor je uitnodiging voor je verjaardagfeest volgende zaterdag. Het klinkt heel leuk en ik zou graag komen, maar helaas kan ik niet. Mijn oma wordt negentig jaar en mijn hele familie komt bij elkaar voor een groot feest. Dit is heel belangrijk voor mij omdat ze ver weg woont en ik haar niet vaak zie. Ik hoop dat je een fantastische verjaardag hebt met al je vrienden. Kunnen we misschien de week erna samen koffie drinken om je verjaardag te vieren? Ik wil je alsnog feliciteren! Liefs, [Je naam]',
    explanation:
      'Write a polite letter declining an invitation with a good reason',
    hints: [
      'Include: greeting, thanks for invitation, polite decline with reason, alternative suggestion',
      'Use polite language',
      'About 100 words',
    ],
    points: 10,
  },
  {
    id: 'writing_004',
    type: 'writing-prompt',
    category: 'Writing',
    level: 'A2',
    instruction:
      'Write a text of approximately 100 words about the given topic.',
    question: 'Vakantie in Nederland - Schrijf over een bezoek aan Nederland.',
    englishTranslation:
      'Holiday in the Netherlands - Write about a visit to the Netherlands.',
    correctAnswer: 'Open-ended writing exercise',
    wordCount: 100,
    sampleAnswer:
      'Afgelopen zomer heb ik een prachtige vakantie gehad in Nederland. Ik heb Amsterdam bezocht en veel musea gezien, zoals het Rijksmuseum en het Van Gogh Museum. De grachten waren heel mooi en ik heb een rondvaart gemaakt. Daarna ben ik naar de kust gegaan en heb ik Scheveningen bezocht. Het strand was geweldig en het weer was perfect voor zwemmen. Ik heb ook traditioneel Nederlands eten geproefd, zoals stroopwafels en bitterballen. De mensen waren erg vriendelijk en veel mensen spraken goed Engels. Nederland is een prachtig land om te bezoeken. Ik wil zeker terugkomen!',
    explanation:
      'Write about places visited, activities, food, people, and overall experience',
    hints: [
      'Include: places visited, activities, food, people, opinions',
      'Use past tense',
      'About 100 words',
    ],
    points: 10,
  },
  {
    id: 'writing_005',
    type: 'writing-prompt',
    category: 'Writing',
    level: 'A2',
    instruction:
      'Write a text of approximately 100 words about the given topic.',
    question: 'Kleren kopen - Schrijf over welke kleren je zou willen kopen.',
    englishTranslation:
      'Buying clothes - Write about what clothes you would like to buy.',
    correctAnswer: 'Open-ended writing exercise',
    wordCount: 100,
    sampleAnswer:
      'Als ik nieuwe kleren zou kopen, zou ik beginnen met praktische dingen. Ik heb nieuwe winterlaarzen nodig omdat mijn oude laarzen kapot zijn. Ook wil ik een warme winterjas kopen, want de winter komt eraan. Voor de lente zou ik graag nieuwe jeans kopen en een paar mooie shirts. Ik hou van kleurrijke kleding, dus ik zou een rode trui en een blauwe jurk kiezen. Schoenen zijn ook belangrijk - ik wil comfortabele sneakers voor sporten en elegante schoenen voor speciale gelegenheden. Ik zou ook nieuwe ondergoed en sokken kopen. Kwaliteit is belangrijk, dus ik zou niet de goedkoopste kleren kiezen.',
    explanation:
      'Write about practical and stylish clothing choices with reasons',
    hints: [
      'Include: practical needs, style preferences, occasions, quality considerations',
      'Use conditional tense',
      'About 100 words',
    ],
    points: 10,
  },
];

// Combine all exercises
export const allExamExercises: ExamExercise[] = [
  ...perfectTenseExercises,
  ...imperfectExercises,
  ...separableVerbsExercises,
  ...conjunctionExercises,
  ...multipleChoiceExercises,
  ...writingExercises,
];

// Categories for organization
export const examCategories = [
  'Perfect Tense',
  'Imperfect Tense',
  'Separable Verbs',
  'Conjunctions',
  'Conversation',
  'Vocabulary',
  'Shopping',
  'Communication',
  'Education',
  'Crime/Police',
  'Writing',
];
