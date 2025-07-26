export interface DictationExercise {
  id: string;
  title: string;
  instructions: string;
  targetWords: string[];
  sentences: string[];
}

export interface QuestionAnswerExercise {
  id: string;
  title: string;
  instructions: string;
  questions: Array<{
    question: string;
    sampleAnswer?: string;
  }>;
}

export interface FillInExercise {
  id: string;
  title: string;
  instructions: string;
  wordBank: string[];
  sentences: Array<{
    sentence: string;
    correctAnswer: string;
  }>;
}

export interface PronounExercise {
  id: string;
  title: string;
  instructions: string;
  sentences: Array<{
    sentence: string;
    correctAnswer: string;
  }>;
}

export interface CreateQuestionsExercise {
  id: string;
  title: string;
  instructions: string;
  answerPairs: Array<{
    answer: string;
    sampleQuestion: string;
  }>;
}

export interface SentenceWritingExercise {
  id: string;
  title: string;
  instructions: string;
  prompts: Array<{
    words: string;
    sampleAnswer: string;
  }>;
}

export interface DialogueExercise {
  id: string;
  title: string;
  instructions: string;
  dialogue: Array<{
    speaker: 'A' | 'B';
    text: string;
    isUserInput?: boolean;
  }>;
}

export const testExercises = {
  dictation: [
    {
      id: 'dictation-1',
      title: 'Listening/Dictation Exercise 1',
      instructions:
        'Target words to practice writing: vakantie; natuurlijk; misschien; genoeg; vriendelijk',
      targetWords: [
        'vakantie',
        'natuurlijk',
        'misschien',
        'genoeg',
        'vriendelijk',
      ],
      sentences: [
        'Wanneer ga je op vakantie?',
        'Natuurlijk kom ik naar je feest.',
        'Misschien regent het morgen.',
        'Heb je genoeg geld bij je?',
        'De verkoopster is heel vriendelijk.',
      ],
    },
    {
      id: 'dictation-2',
      title: 'Listening/Dictation Exercise 2',
      instructions:
        'Target words to practice writing: spelletje; ongeveer; meteen; niemand; ietwat',
      targetWords: ['spelletje', 'ongeveer', 'meteen', 'niemand', 'ietwat'],
      sentences: [
        'Zullen we een spelletje doen?',
        'Het is ongeveer half drie.',
        'Ik kom meteen naar je toe.',
        'Er is niemand thuis vandaag.',
        'Het water is ietwat koud.',
      ],
    },
    {
      id: 'dictation-3',
      title: 'Listening/Dictation Exercise 3',
      instructions:
        'Target words to practice writing: bijvoorbeeld; waarschijnlijk; tegelijkertijd; helaas; ondertussen',
      targetWords: [
        'bijvoorbeeld',
        'waarschijnlijk',
        'tegelijkertijd',
        'helaas',
        'ondertussen',
      ],
      sentences: [
        'Neem bijvoorbeeld een appel mee.',
        'Het wordt waarschijnlijk mooi weer.',
        'We kunnen niet tegelijkertijd praten.',
        'Helaas kan ik niet komen.',
        'Ondertussen maak ik het eten klaar.',
      ],
    },
    {
      id: 'dictation-original',
      title: 'Original Dictation Exercise',
      instructions:
        'Words to learn how to write: seizoen; nog; gauw; de beurt; bestellen',
      targetWords: ['seizoen', 'nog', 'gauw', 'de beurt', 'bestellen'],
      sentences: [
        'Welke dag is het vandaag?',
        'In welk seizoen valt oktober?',
        'Karin is vrijdag jarig.',
        'Hartelijk gefeliciteerd met je verjaardag!',
      ],
    },
  ] as DictationExercise[],

  questionAnswer: [
    {
      id: 'qa-original',
      title: 'Exercise A: Question and Answer Practice',
      instructions: 'Give a reaction to the question',
      questions: [
        { question: 'Hoe heet je?', sampleAnswer: 'Ik ben Sander' },
        { question: 'Wat is het?', sampleAnswer: 'Het is...' },
        {
          question: 'Bij de bakker koop je het waar?',
          sampleAnswer: 'gistere avond een broodje',
        },
        {
          question: 'Wanneer kom je langs op bezoek?',
          sampleAnswer: 'Zijk kom morgenvroeg, wilde slapen',
        },
        {
          question: 'Zullen we morgenavond iets afspreken?',
          sampleAnswer: 'Ja, in het goed idee',
        },
      ],
    },
    {
      id: 'qa-2',
      title: 'Exercise A2: Question and Answer Practice',
      instructions: 'Give an appropriate reaction to the question',
      questions: [
        { question: 'Waar woon je?' },
        { question: 'Hoe oud ben je?' },
        { question: 'Wat doe je in het weekend?' },
        { question: 'Wanneer ga je op vakantie?' },
        { question: 'Zullen we samen koffie drinken?' },
      ],
    },
  ] as QuestionAnswerExercise[],

  fillIn: [
    {
      id: 'fillin-original',
      title: 'Exercise B: Fill in the Correct Word Form',
      instructions:
        'Choose from: hebben, heten, vertellen, luisteren, zijn, kijken, trakteren, praten, feliciteren, beschrijven',
      wordBank: [
        'hebben',
        'heten',
        'vertellen',
        'luisteren',
        'zijn',
        'kijken',
        'trakteren',
        'praten',
        'feliciteren',
        'beschrijven',
      ],
      sentences: [
        {
          sentence: 'Kees ... ... twee neven en drie nichtjes.',
          correctAnswer: 'heeft',
        },
        { sentence: 'Dag, ik ... ... Astrid.', correctAnswer: 'heet' },
        {
          sentence: 'Mevrouw Van Dam ... ... een leuk verhaal.',
          correctAnswer: 'vertelt',
        },
        { sentence: 'Ik ... ... naar de Podcast.', correctAnswer: 'luister' },
        { sentence: 'De buurman ... ... ziek.', correctAnswer: 'is' },
        { sentence: 'Ik ... ...', correctAnswer: 'kijk' },
        {
          sentence: 'Mijn vriend ... ... iedereen op een stuk cake.',
          correctAnswer: 'trakteert',
        },
        { sentence: 'Ik ... ... met de buurman.', correctAnswer: 'praat' },
        {
          sentence: 'Ik ... ... de buurvrouw met haar verjaardag.',
          correctAnswer: 'feliciteer',
        },
        { sentence: 'Hij ... ... de plaatjes!', correctAnswer: 'beschrijft' },
      ],
    },
    {
      id: 'fillin-2',
      title: 'Exercise B2: Fill in the Correct Word Form',
      instructions:
        'Choose from: werken, studeren, wonen, reizen, koken, sporten, lezen, schrijven, slapen, eten',
      wordBank: [
        'werken',
        'studeren',
        'wonen',
        'reizen',
        'koken',
        'sporten',
        'lezen',
        'schrijven',
        'slapen',
        'eten',
      ],
      sentences: [
        {
          sentence: 'Mijn zus ... ... als verpleegster in het ziekenhuis.',
          correctAnswer: 'werkt',
        },
        {
          sentence: 'De studenten ... ... Nederlands aan de universiteit.',
          correctAnswer: 'studeren',
        },
        {
          sentence: 'Wij ... ... in een groot huis in Amsterdam.',
          correctAnswer: 'wonen',
        },
        {
          sentence: 'Volgende maand ... ... ik naar Spanje.',
          correctAnswer: 'reis',
        },
        {
          sentence: 'Mijn moeder ... ... elke dag een warme maaltijd.',
          correctAnswer: 'kookt',
        },
        {
          sentence: 'Hij ... ... drie keer per week in de sportschool.',
          correctAnswer: 'sport',
        },
        {
          sentence: 'Zij ... ... graag boeken over geschiedenis.',
          correctAnswer: 'leest',
        },
        {
          sentence: 'Ik ... ... elke avond in mijn dagboek.',
          correctAnswer: 'schrijf',
        },
        {
          sentence: 'De baby ... ... de hele nacht door.',
          correctAnswer: 'slaapt',
        },
        {
          sentence: "Wij ... ... meestal om zes uur 's avonds.",
          correctAnswer: 'eten',
        },
      ],
    },
  ] as FillInExercise[],

  pronouns: [
    {
      id: 'pronouns-original',
      title: 'Exercise C: Fill in the Correct Personal Pronoun',
      instructions: 'Fill in the correct personal pronoun',
      sentences: [
        { sentence: "'Hoi Kees, is dit ... ... tas?'", correctAnswer: 'jouw' },
        {
          sentence: 'Komt er iemand op bezoek? Ja ... ... zus komt langs.',
          correctAnswer: 'mijn',
        },
        {
          sentence: "'Pardon mevrouw, is dit ... ... hoed?'",
          correctAnswer: 'uw',
        },
        {
          sentence: 'Deze tas is van Kees. Het is ... ... tas.',
          correctAnswer: 'zijn',
        },
        {
          sentence: 'Deze tas is van Annie. Het is ... ... tas.',
          correctAnswer: 'haar',
        },
        {
          sentence: 'Dit is de auto van de buren. Het is ... ... auto.',
          correctAnswer: 'hun',
        },
        {
          sentence:
            'Dat is de caravan van mijn ouders. Het is ... ... caravan.',
          correctAnswer: 'hun',
        },
        { sentence: "'Pardon mevrouw, wat zegt ... ...?'", correctAnswer: 'u' },
        { sentence: '... ... ben vrij vandaag.', correctAnswer: 'Ik' },
        {
          sentence: '... ... gaan vandaag naar de dierentuin (Artis).',
          correctAnswer: 'Zij',
        },
      ],
    },
    {
      id: 'pronouns-2',
      title: 'Exercise C2: Fill in the Correct Personal Pronoun',
      instructions: 'Fill in the correct personal pronoun',
      sentences: [
        {
          sentence: "'Hallo Maria, is dit ... ... fiets?'",
          correctAnswer: 'jouw',
        },
        {
          sentence: 'Gaat ... broer ook mee naar het feest?',
          correctAnswer: 'je',
        },
        {
          sentence: "'Meneer, heeft ... ... de tijd voor mij?'",
          correctAnswer: 'u',
        },
        {
          sentence: 'Dit boek is van Peter. Het is ... ... boek.',
          correctAnswer: 'zijn',
        },
        {
          sentence: 'Deze jas is van mijn zus. Het is ... ... jas.',
          correctAnswer: 'haar',
        },
        {
          sentence: 'De kinderen spelen met ... ... speelgoed.',
          correctAnswer: 'hun',
        },
        {
          sentence: 'Dat is het huis van de buren. Het is ... ... huis.',
          correctAnswer: 'hun',
        },
        {
          sentence: "'Mevrouw, waar woont ... ... precies?'",
          correctAnswer: 'u',
        },
        { sentence: '... ... ga morgen naar de markt.', correctAnswer: 'Ik' },
        {
          sentence: '... ... komen uit Duitsland en spreken goed Nederlands.',
          correctAnswer: 'Zij',
        },
      ],
    },
  ] as PronounExercise[],

  createQuestions: [
    {
      id: 'create-original',
      title: 'Exercise D: Create Your Own Questions',
      instructions: 'Create questions yourself',
      answerPairs: [
        { answer: 'Het is half vier.', sampleQuestion: 'Hoe laat is het?' },
        {
          answer: 'De mandarijnen kosten € 4,50 per kilo.',
          sampleQuestion: 'Hoeveel kosten de mandarijnen?',
        },
        { answer: 'In een café.', sampleQuestion: 'Waar zijn jullie geweest?' },
        {
          answer: 'Naar Griekenland.',
          sampleQuestion: 'Waar gaan jullie heen komende zomer?',
        },
        {
          answer: 'Heel goed. En met jou?',
          sampleQuestion: 'Hoe gaat het met jou?',
        },
      ],
    },
    {
      id: 'create-2',
      title: 'Exercise D2: Create Your Own Questions',
      instructions: 'Create appropriate questions for these answers',
      answerPairs: [
        {
          answer: 'Ik werk bij een bank in het centrum.',
          sampleQuestion: 'Waar werk je?',
        },
        {
          answer: 'De trein vertrekt om kwart over acht.',
          sampleQuestion: 'Hoe laat vertrekt de trein?',
        },
        {
          answer: 'Nee, ik ga liever met de bus.',
          sampleQuestion: 'Ga je met de auto?',
        },
        {
          answer: 'We zijn gisteren naar de bioscoop geweest.',
          sampleQuestion: 'Waar zijn jullie gisteren geweest?',
        },
        {
          answer: 'Ja, natuurlijk! Ik help je graag.',
          sampleQuestion: 'Kun je me helpen?',
        },
      ],
    },
  ] as CreateQuestionsExercise[],

  sentenceWriting: [
    {
      id: 'sentence-writing',
      title: 'Exercise E2: Sentence Writing Practice',
      instructions: 'Write complete sentences using the given words',
      prompts: [
        {
          words: '(ik / wonen / Amsterdam / centrum)',
          sampleAnswer: 'Ik woon in het centrum van Amsterdam.',
        },
        {
          words: '(mijn broer / werken / grote / bedrijf)',
          sampleAnswer: 'Mijn broer werkt bij een groot bedrijf.',
        },
        {
          words: '(wij / gaan / volgende week / vakantie)',
          sampleAnswer: 'Wij gaan volgende week op vakantie.',
        },
        {
          words: '(de kinderen / spelen / tuin / voetbal)',
          sampleAnswer: 'De kinderen spelen voetbal in de tuin.',
        },
        {
          words: '(zij / studeren / universiteit / Rotterdam)',
          sampleAnswer: 'Zij studeert aan de universiteit van Rotterdam.',
        },
      ],
    },
  ] as SentenceWritingExercise[],

  dialogue: [
    {
      id: 'dialogue-completion',
      title: 'Exercise F: Dialogue Completion',
      instructions: 'Complete the dialogue with appropriate responses',
      dialogue: [
        { speaker: 'A', text: 'Goedemorgen! Hoe gaat het met je?' },
        { speaker: 'B', text: '', isUserInput: true },
        { speaker: 'A', text: 'Wat ga je vandaag doen?' },
        { speaker: 'B', text: '', isUserInput: true },
        { speaker: 'A', text: 'Zullen we samen lunchen?' },
        { speaker: 'B', text: '', isUserInput: true },
        { speaker: 'A', text: 'Om hoe laat spreken we af?' },
        { speaker: 'B', text: '', isUserInput: true },
        { speaker: 'A', text: 'Tot straks dan!' },
        { speaker: 'B', text: '', isUserInput: true },
      ],
    },
  ] as DialogueExercise[],
};
