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
    answerOptions?: string[];
    correctAnswer?: string;
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
      id: 'dictation-4',
      title: 'Listening/Dictation Exercise 4',
      instructions:
        'Target words to practise spelling: gelukkig; bezoek; lekker; wandelen; soms',
      targetWords: ['gelukkig', 'bezoek', 'lekker', 'wandelen', 'soms'],
      sentences: [
        'Gelukkig is het weekend begonnen.',
        'Krijg je vaak bezoek van vrienden?',
        'De soep smaakt lekker.',
        'In het park wandelen veel mensen.',
        'Soms regent het de hele dag.',
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
          question: 'Wat koop je bij de bakker?',
          sampleAnswer: 'Gisterenavond heb ik een broodje gekocht.',
        },
        {
          question: 'Wanneer kom je langs op bezoek?',
          sampleAnswer: 'Ik kom morgenvroeg langs, als ik uitgeslapen ben.',
        },
        {
          question: 'Zullen we morgenavond iets afspreken?',
          sampleAnswer: 'Ja, dat is een goed idee.',
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
    {
      id: 'qa-3',
      title: 'Exercise A3: Question and Answer Practice',
      instructions: 'Give an appropriate reaction to the question',
      questions: [
        { question: 'Wat eet je graag?', sampleAnswer: 'Ik eet graag pasta.' },
        {
          question: 'Met wie woon je?',
          sampleAnswer: 'Ik woon met mijn partner.',
        },
        {
          question: 'Hoe kom je naar school?',
          sampleAnswer: 'Ik kom met de fiets.',
        },
        {
          question: 'Wanneer is je verjaardag?',
          sampleAnswer: 'Mijn verjaardag is in maart.',
        },
        {
          question: 'Ga je vaak naar de markt?',
          sampleAnswer: 'Ja, elke zaterdag.',
        },
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
    {
      id: 'fillin-3',
      title: 'Exercise B3: Fill in the Correct Word Form',
      instructions:
        'Choose from: maken, helpen, openen, bellen, rijden, gebruiken, stoppen, wachten, halen, zoeken',
      wordBank: [
        'maken',
        'helpen',
        'openen',
        'bellen',
        'rijden',
        'gebruiken',
        'stoppen',
        'wachten',
        'halen',
        'zoeken',
      ],
      sentences: [
        {
          sentence: 'Kunt u mij ... ... met deze oefening?',
          correctAnswer: 'helpen',
        },
        {
          sentence: 'We ... ... vaak met de auto naar het werk.',
          correctAnswer: 'rijden',
        },
        { sentence: 'Ik ... ... de deur voor je.', correctAnswer: 'open' },
        { sentence: 'Wil je mij even ... ... later?', correctAnswer: 'bellen' },
        {
          sentence: 'Ze ... ... de bus bij de halte.',
          correctAnswer: 'wachten op',
        },
        {
          sentence: 'We ... ... een oplossing voor dit probleem.',
          correctAnswer: 'zoeken',
        },
        {
          sentence: 'Hij ... ... zijn jas bij de kapstok.',
          correctAnswer: 'haalt',
        },
        { sentence: 'Gebruik je je laptop veel?', correctAnswer: 'gebruik' },
        {
          sentence: 'Zij ... ... elke dag een gezonde lunch.',
          correctAnswer: 'maken',
        },
        { sentence: 'De trein ... ... in Utrecht.', correctAnswer: 'stopt' },
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
    {
      id: 'pronouns-3',
      title: 'Exercise C3: Fill in the Correct Possessive Pronoun',
      instructions: 'Fill in the correct possessive pronoun',
      sentences: [
        {
          sentence: 'Dit is het boek van Pieter. Het is ... ... boek.',
          correctAnswer: 'zijn',
        },
        {
          sentence: 'Ik geef een cadeau aan ... ... moeder.',
          correctAnswer: 'mijn',
        },
        { sentence: 'Heb jij ... ... sleutels gevonden?', correctAnswer: 'je' },
        {
          sentence: 'Wij vieren ... ... verjaardag op zaterdag.',
          correctAnswer: 'onze',
        },
        {
          sentence: 'U hebt ... ... afspraak om tien uur.',
          correctAnswer: 'uw',
        },
        {
          sentence: 'Zij stuurt een kaart naar ... ... oma.',
          correctAnswer: 'haar',
        },
        {
          sentence: 'Het kind speelt met ... ... speelgoed.',
          correctAnswer: 'zijn',
        },
        {
          sentence: 'Hebben jullie ... ... huis verkocht?',
          correctAnswer: 'jullie',
        },
        { sentence: 'De buren vieren ... ... huwelijk.', correctAnswer: 'hun' },
        { sentence: 'Ik wacht op ... ... vriend.', correctAnswer: 'mijn' },
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
    {
      id: 'create-3',
      title: 'Exercise D3: Create Your Own Questions',
      instructions: 'Create a fitting question for each answer',
      answerPairs: [
        { answer: 'Om half negen.', sampleQuestion: 'Hoe laat begint de les?' },
        {
          answer: 'In het park naast mijn huis.',
          sampleQuestion: 'Waar ga je wandelen?',
        },
        {
          answer: 'Ja, ik heb een hond.',
          sampleQuestion: 'Heb je huisdieren?',
        },
        { answer: 'Twee keer per week.', sampleQuestion: 'Hoe vaak sport je?' },
        {
          answer: 'Met mijn collega’s.',
          sampleQuestion: 'Met wie lunch je meestal?',
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
    {
      id: 'sentence-writing-2',
      title: 'Exercise E3: Sentence Writing Practice',
      instructions: 'Write complete sentences using the given words',
      prompts: [
        {
          words: '(jij / maken / huiswerk / vanavond)',
          sampleAnswer: 'Jij maakt vanavond huiswerk.',
        },
        {
          words: '(wij / koken / soep / keuken)',
          sampleAnswer: 'Wij koken soep in de keuken.',
        },
        {
          words: '(mijn ouders / lezen / krant / ochtend)',
          sampleAnswer: 'Mijn ouders lezen de krant in de ochtend.',
        },
        {
          words: '(kinderen / gaan / school / bus)',
          sampleAnswer: 'De kinderen gaan met de bus naar school.',
        },
        {
          words: '(zij / werken / ziekenhuis / verpleegkundige)',
          sampleAnswer: 'Zij werkt als verpleegkundige in het ziekenhuis.',
        },
      ],
    },
  ] as SentenceWritingExercise[],

  dialogue: [
    {
      id: 'dialogue-completion',
      title: 'Exercise F: Dialogue Completion',
      instructions:
        'Complete the dialogue by choosing or typing the best answer.',
      dialogue: [
        { speaker: 'A', text: 'Goedemorgen! Hoe gaat het met je?' },
        {
          speaker: 'B',
          text: '',
          isUserInput: true,
          answerOptions: [
            'Goed, dank je!',
            'Ik ga naar school.',
            'Tot morgen!',
          ],
          correctAnswer: 'Goed, dank je!',
        },
        { speaker: 'A', text: 'Wat ga je vandaag doen?' },
        {
          speaker: 'B',
          text: '',
          isUserInput: true,
          answerOptions: ['Ik ga werken.', 'Heel goed.', 'Graag gedaan.'],
          correctAnswer: 'Ik ga werken.',
        },
        { speaker: 'A', text: 'Zullen we samen lunchen?' },
        {
          speaker: 'B',
          text: '',
          isUserInput: true,
          answerOptions: ['Ja, graag!', 'Nee, tot morgen!', 'Ik ben goed.'],
          correctAnswer: 'Ja, graag!',
        },
        { speaker: 'A', text: 'Om hoe laat spreken we af?' },
        {
          speaker: 'B',
          text: '',
          isUserInput: true,
          answerOptions: ['Om twaalf uur.', 'Tot morgen.', 'Heel goed.'],
          correctAnswer: 'Om twaalf uur.',
        },
        { speaker: 'A', text: 'Tot straks dan!' },
        {
          speaker: 'B',
          text: '',
          isUserInput: true,
          answerOptions: ['Tot straks!', 'Ik ga werken.', 'Goed, dank je.'],
          correctAnswer: 'Tot straks!',
        },
      ],
    },
  ] as DialogueExercise[],
};
