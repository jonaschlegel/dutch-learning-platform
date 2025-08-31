export interface VocabularyExercise {
  id: string;
  level: string;
  type: 'translate' | 'multiple-choice' | 'fill-in-blank';
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
}

export interface GrammarExercise {
  id: string;
  level: string;
  type: 'fill' | 'multiple-choice' | 'reorder';
  title?: string;
  text?: string;
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
}

export interface SituationalResponseExercise {
  id: string;
  level: string;
  title: string;
  text: string;
  situation: string;
  question: string;
  instruction: string;
  answer: string;
  alternativeAnswers: string[];
  hint?: string;
}

export interface QuestionFormationExercise {
  id: string;
  level: string;
  title: string;
  text: string;
  answer: string;
  instruction: string;
  question: string;
  alternativeQuestions: string[];
  hint?: string;
}

export interface ModalVerbsExercise {
  id: string;
  level: string;
  title: string;
  text: string;
  question: string;
  instruction: string;
  answer: string;
  options: string[];
  hint?: string;
}

export interface ReadingComprehensionExercise {
  id: string;
  level: string;
  title: string;
  text: string;
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
  }>;
}

export interface ImperfectumTestExercise {
  id: string;
  level: string;
  infinitive: string;
  imperfectForm: string;
  pronoun: string;
  question: string;
  answer: string;
  hint?: string;
}

export interface PerfectTenseTestExercise {
  id: string;
  level: string;
  infinitive: string;
  pastParticiple: string;
  auxiliary: string;
  question: string;
  answer: string;
  hint?: string;
}

export interface ListeningComprehensionExercise {
  id: string;
  level: string;
  title: string;
  audioScript: string;
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
  }>;
}

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
  level?: string;
  title: string;
  scenario?: string;
  instructions?: string;
  dialogue: Array<{
    speaker: 'A' | 'B' | 'Receptionist' | 'You';
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

// Test 2 - Advanced (Chapters 5-10 + Perfect Tense + Imperfectum + Reading/Listening)
export const testExercises2 = {
  // Reading Comprehension with Multiple Choice Questions
  readingComprehension: [
    {
      id: 'rc2-work-letter',
      level: 'A2',
      title: 'Brief van werkgever',
      text: `Beste Cynthia,

Welkom bij onze winkel! We zijn blij dat je bij ons komt werken.

Je begint maandag 15 mei om 9.30. Je moet dan om 9.30 in de winkel zijn. Hayat Amiri komt je ophalen bij de ingang. Je hebt dan eerst een gesprek met haar over je contract. En van haar krijg je een pasje voor je kluisje.

Om 10.00 zal Mariem Aziza met je meelopen door de winkel. Je kunt de andere medewerkers dan ontmoeten. Mariem zal je ook laten zien waar de kluisjes zijn. Daar kun je je tas en kleding in hangen. Het kluisje gaat op slot met het pasje.

Om 10.30 ga je aan het werk. Mariem legt je uit wat voor werk je precies moet doen.

Bij deze brief vind je een formulier. Het formulier kun je alvast thuis invullen. Neem het mee op je eerste werkdag.

Veel succes!

Groeten,
Judith Lansveld
Manager`,
      questions: [
        {
          question: 'Waarom stuurt Judith Lansveld deze brief?',
          options: [
            'om een afspraak te verzetten',
            'om informatie te geven',
            'om te solliciteren',
          ],
          answer: 'om informatie te geven',
        },
        {
          question: 'Hoe laat ontvangt Cynthia het pasje voor haar kluisje?',
          options: ['om 9.30', 'om 10.00', 'om 10.30'],
          answer: 'om 9.30',
        },
        {
          question:
            'Wie gaat Cynthia uitleggen wat voor werk ze precies moet doen?',
          options: ['Mariem Aziza', 'Hayat Amiri', 'Judith Lansveld'],
          answer: 'Mariem Aziza',
        },
        {
          question: 'Waar kan Cynthia het kluisje voor gebruiken?',
          options: [
            'om haar werkschoenen in te zetten',
            'om haar geld (portemonnee) in te stoppen',
            'om haar werkkleding in te hangen',
          ],
          answer: 'om haar werkkleding in te hangen',
        },
        {
          question: 'Wat moet Cynthia meenemen op haar eerste werkdag?',
          options: [
            'een formulier en een foto',
            'een pasje en een formulier',
            'alleen een formulier',
          ],
          answer: 'alleen een formulier',
        },
      ],
    },
    {
      id: 'rc2-apartment-ad',
      level: 'A2',
      title: 'Woning te huur',
      text: `Te huur: prachtig appartement in Amsterdam Centrum

Locatie: Prinsengracht 245
Kamers: 3 kamers (2 slaapkamers + woonkamer)
Grootte: 85 m²
Huur: €1.850 per maand (exclusief gas, water, licht)
Beschikbaar: per 1 september

Het appartement ligt op de tweede verdieping van een mooi grachtenpand. Er is een grote woonkamer met veel licht door de grote ramen. De keuken is recent gerenoveerd en heeft alle moderne apparaten. Beide slaapkamers zijn ruim en hebben inbouwkasten.

Het appartement ligt in het hart van Amsterdam, op loopafstand van winkels, restaurants en openbaar vervoer. De Nieuwmarkt is om de hoek en het Centraal Station is binnen 10 minuten te bereiken.

Huisdieren zijn niet toegestaan. Roken is niet toegestaan.

Voor bezichtiging kunt u contact opnemen met makelaar Van der Berg via telefoonnummer 020-1234567.`,
      questions: [
        {
          question: 'Hoeveel slaapkamers heeft het appartement?',
          options: ['1', '2', '3', '4'],
          answer: '2',
        },
        {
          question: 'Wat is de huurprijs per maand?',
          options: ['€1.650', '€1.750', '€1.850', '€1.950'],
          answer: '€1.850',
        },
        {
          question: 'Op welke verdieping ligt het appartement?',
          options: ['eerste', 'tweede', 'derde', 'vierde'],
          answer: 'tweede',
        },
        {
          question: 'Zijn huisdieren toegestaan?',
          options: ['Ja', 'Nee', 'Alleen katten', 'Alleen kleine honden'],
          answer: 'Nee',
        },
        {
          question: 'Hoe ver is het naar het Centraal Station?',
          options: ['5 minuten', '10 minuten', '15 minuten', '20 minuten'],
          answer: '10 minuten',
        },
      ],
    },
  ],

  // Imperfectum exercises (regular verbs)
  imperfectum: [
    {
      id: 'imp2-1',
      level: 'A2',
      question: 'Was het gisteren mooi weer? (de hele dag regenen)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Nee, het regende de hele dag',
      targetVerb: 'regenen',
      imperfectForm: 'regende',
      hint: 'Regelmatig werkwoord: regenen -> regende',
    },
    {
      id: 'imp2-2',
      level: 'A2',
      question:
        'Wat hebben Carlo en Elisa gisteren tijdens hun vakantie op Cyprus gedaan? (huren - een auto)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ze huurden een auto',
      targetVerb: 'huren',
      imperfectForm: 'huurden',
      hint: 'Regelmatig werkwoord: huren -> huurden',
    },
    {
      id: 'imp2-3',
      level: 'A2',
      question: 'Wat deden de kinderen in de speeltuin? (spelen - de schommel)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ze speelden op de schommel',
      targetVerb: 'spelen',
      imperfectForm: 'speelden',
      hint: 'Regelmatig werkwoord: spelen -> speelden',
    },
    {
      id: 'imp2-4',
      level: 'A2',
      question: 'Waarmee heb je gisteren betaald? (betalen - creditcard)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ik betaalde met een creditcard',
      targetVerb: 'betalen',
      imperfectForm: 'betaalde',
      hint: 'Regelmatig werkwoord: betalen -> betaalde',
    },
    {
      id: 'imp2-5',
      level: 'A2',
      question:
        'Wat deed oma gisteren? (vertellen - een verhaal - kleinkinderen)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ze vertelde een verhaal aan de kleinkinderen',
      targetVerb: 'vertellen',
      imperfectForm: 'vertelde',
      hint: 'Regelmatig werkwoord: vertellen -> vertelde',
    },
    {
      id: 'imp2-6',
      level: 'A2',
      question: 'Waarom was je gisteren te laat op je werk? (missen - de bus)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ik miste de bus',
      targetVerb: 'missen',
      imperfectForm: 'miste',
      hint: 'Regelmatig werkwoord: missen -> miste',
    },
    {
      id: 'imp2-7',
      level: 'A2',
      question: 'Hoe kwamen de kinderen elke dag op school? (fietsen - school)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ze fietsten naar school',
      targetVerb: 'fietsen',
      imperfectForm: 'fietsten',
      hint: 'Regelmatig werkwoord: fietsen -> fietsten',
    },
    {
      id: 'imp2-8',
      level: 'A2',
      question: 'Waar hebben jullie gisteren gegeten? (koken - thuis)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'We kookten thuis',
      targetVerb: 'koken',
      imperfectForm: 'kookten',
      hint: 'Regelmatig werkwoord: koken -> kookten',
    },
    {
      id: 'imp2-9',
      level: 'A2',
      question: 'Hoe vond je de film gisteren? (vinden - heel leuk)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ik vond hem heel leuk',
      targetVerb: 'vinden',
      imperfectForm: 'vond',
      hint: 'Onregelmatig werkwoord: vinden -> vond',
    },
    {
      id: 'imp2-10',
      level: 'A2',
      question: 'Waarom was Anna zo moe? (slapen - slecht)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Ze sliep slecht',
      targetVerb: 'slapen',
      imperfectForm: 'sliep',
      hint: 'Onregelmatig werkwoord: slapen -> sliep',
    },
    {
      id: 'imp2-11',
      level: 'A2',
      question: 'Wat deed je vader in de tuin? (planten - bloemen)',
      instruction:
        'Geef een reactie in het imperfectum. Gebruik de woorden tussen haakjes.',
      answer: 'Hij plantte bloemen',
      targetVerb: 'planten',
      imperfectForm: 'plantte',
      hint: 'Regelmatig werkwoord: planten -> plantte',
    },
  ],

  // Perfectum exercises
  perfectTense: [
    {
      id: 'pt2-1',
      level: 'A2',
      question: '(dit rondje - betalen)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'Ik heb dit rondje betaald',
      infinitive: 'betalen',
      pastParticiple: 'betaald',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "betaald"',
    },
    {
      id: 'pt2-2',
      level: 'A2',
      question: '(twee glazen wijn/koffie - drinken)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'We hebben twee glazen wijn/koffie gedronken',
      infinitive: 'drinken',
      pastParticiple: 'gedronken',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "gedronken"',
    },
    {
      id: 'pt2-3',
      level: 'A2',
      question: '(19.30 - afspreken)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'We hebben om 19.30 afgesproken',
      infinitive: 'afspreken',
      pastParticiple: 'afgesproken',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "afgesproken"',
    },
    {
      id: 'pt2-4',
      level: 'A2',
      question: '(de markt - gaan)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'We zijn naar de markt gegaan',
      infinitive: 'gaan',
      pastParticiple: 'gegaan',
      auxiliary: 'zijn',
      hint: 'Bewegingswerkwoorden gebruiken "zijn"',
    },
    {
      id: 'pt2-5',
      level: 'A2',
      question: '(huiswerk - doen)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'Ik heb huiswerk gedaan',
      infinitive: 'doen',
      pastParticiple: 'gedaan',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "gedaan"',
    },
    {
      id: 'pt2-6',
      level: 'A2',
      question: '(ziek - worden)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'Ik ben ziek geworden',
      infinitive: 'worden',
      pastParticiple: 'geworden',
      auxiliary: 'zijn',
      hint: 'Toestandsverandering gebruikt "zijn"',
    },
    {
      id: 'pt2-7',
      level: 'A2',
      question: '(romantische film - maken)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'We hebben een romantische film gemaakt',
      infinitive: 'maken',
      pastParticiple: 'gemaakt',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "gemaakt"',
    },
    {
      id: 'pt2-8',
      level: 'A2',
      question: '(naar Duitsland - rijden)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'We zijn naar Duitsland gereden',
      infinitive: 'rijden',
      pastParticiple: 'gereden',
      auxiliary: 'zijn',
      hint: 'Bewegingswerkwoorden gebruiken "zijn"',
    },
    {
      id: 'pt2-9',
      level: 'A2',
      question: '(een brief - schrijven)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'Ik heb een brief geschreven',
      infinitive: 'schrijven',
      pastParticiple: 'geschreven',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "geschreven"',
    },
    {
      id: 'pt2-10',
      level: 'A2',
      question: '(nieuwe kleren - kopen)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'Ik heb nieuwe kleren gekocht',
      infinitive: 'kopen',
      pastParticiple: 'gekocht',
      auxiliary: 'hebben',
      hint: 'Gebruik "hebben" met "gekocht"',
    },
    {
      id: 'pt2-11',
      level: 'A2',
      question: '(thuis - blijven)',
      instruction: 'Antwoord met "Ik" of met "We/Wij"',
      answer: 'Ik ben thuis gebleven',
      infinitive: 'blijven',
      pastParticiple: 'gebleven',
      auxiliary: 'zijn',
      hint: 'Toestandsverandering gebruikt "zijn"',
    },
  ],

  // Situational responses
  situationalResponses: [
    {
      id: 'sr2-1',
      level: 'A2',
      title: 'In het restaurant',
      text: `Je bent in een restaurant en hebt zojuist gegeten. Je wilt nu graag betalen en naar huis gaan. De ober komt naar je tafel.`,
      situation: 'In een restaurant',
      question: 'Kan ik betalen?',
      instruction: 'Geef een reactie (als je wilt afrekenen)',
      answer: 'Natuurlijk, de rekening alstublieft',
      alternativeAnswers: ['Ja, dat kan', 'De rekening, graag'],
      hint: 'Je wilt de rekening om te kunnen betalen',
    },
    {
      id: 'sr2-2',
      level: 'A2',
      title: 'In de kledingzaak',
      text: `Je bent in een grote kledingzaak en hebt een mooie jas gevonden die je wilt passen. Je zoekt naar een plek waar je de jas kunt aantrekken om te kijken of hij goed staat.`,
      situation: 'In een kledingzaak',
      question: 'Je wil vragen of er ergens een paskamer is',
      instruction: 'Stel een vraag',
      answer: 'Waar is de paskamer?',
      alternativeAnswers: ['Is er een paskamer?', 'Heeft u een paskamer?'],
      hint: 'Je zoekt een plek om kleding te passen',
    },
    {
      id: 'sr2-3',
      level: 'A2',
      title: 'Kleding ruilen',
      text: `Je hebt vorige week een broek gekocht, maar thuis merk je dat de maat niet goed is. Je gaat terug naar de winkel met de bon om een andere maat te halen.`,
      situation: 'In een kledingzaak',
      question: 'Je wil een broek / jas ruilen',
      instruction: 'Stel een vraag',
      answer: 'Kan ik deze broek/jas ruilen?',
      alternativeAnswers: [
        'Is het mogelijk om dit te ruilen?',
        'Mag ik dit omruilen?',
      ],
      hint: 'Je wilt iets teruggeven en iets anders ervoor krijgen',
    },
    {
      id: 'sr2-4',
      level: 'A2',
      title: 'Bij de makelaar',
      text: `Je bent op zoek naar een nieuwe woning en hebt een afspraak gemaakt met een makelaar. Je zit nu in het kantoor en de makelaar wil weten wat voor soort huis je zoekt.`,
      situation: 'Bij de makelaar',
      question: 'Wat voor type woning zoekt u?',
      instruction: 'Geef antwoord',
      answer: 'Ik zoek een appartement met twee slaapkamers',
      alternativeAnswers: ['Een huis met tuin', 'Een studio in het centrum'],
      hint: 'Beschrijf wat voor woning je wilt',
    },
    {
      id: 'sr2-5',
      level: 'A2',
      title: 'Bij de huisarts',
      text: `Je voelt je al een paar dagen niet lekker en hebt een afspraak gemaakt bij de huisarts. Je zit nu in de spreekkamer en de dokter vraagt naar je klachten.`,
      situation: 'Bij de dokter',
      question: 'Wat zijn uw klachten?',
      instruction: 'Geef antwoord',
      answer: 'Ik heb hoofdpijn',
      alternativeAnswers: ['Ik voel me niet lekker', 'Ik heb koorts'],
      hint: 'Vertel wat er mis is met je gezondheid',
    },
    {
      id: 'sr2-6',
      level: 'A2',
      title: 'Op het postkantoor',
      text: `Je wilt een pakje versturen naar je familie in het buitenland. Je staat bij de balie van het postkantoor en de medewerker vraagt wat je wilt.`,
      situation: 'Op het postkantoor',
      question: 'Waarmee kan ik u helpen?',
      instruction: 'Geef antwoord',
      answer: 'Ik wil graag een pakje versturen',
      alternativeAnswers: [
        'Ik moet een pakket verzenden',
        'Ik wil dit opsturen',
      ],
      hint: 'Vertel wat je bij het postkantoor komt doen',
    },
    {
      id: 'sr2-7',
      level: 'A2',
      title: 'In de supermarkt',
      text: `Je bent boodschappen aan het doen en zoekt al een tijdje naar een bepaald product. Je ziet een medewerker en besluit om hulp te vragen.`,
      situation: 'In de supermarkt',
      question: 'Je wilt vragen waar de rijst staat',
      instruction: 'Stel een vraag',
      answer: 'Waar staat de rijst?',
      alternativeAnswers: [
        'Kunt u mij vertellen waar de rijst is?',
        'Waar kan ik rijst vinden?',
      ],
      hint: 'Vraag om de locatie van een product',
    },
    {
      id: 'sr2-8',
      level: 'A2',
      title: 'Op station',
      text: `Je staat op het station en wilt een treinkaartje kopen naar Rotterdam. Je gaat naar de kassa en de medewerker vraagt wat je nodig hebt.`,
      situation: 'Op het station',
      question: 'Wat wilt u kopen?',
      instruction: 'Geef antwoord',
      answer: 'Een kaartje naar Rotterdam, alstublieft',
      alternativeAnswers: [
        'Ik wil graag naar Rotterdam',
        'Een enkele reis Rotterdam',
      ],
      hint: 'Vertel welk kaartje je wilt',
    },
  ],

  // Question formation exercises
  questionFormation: [
    {
      id: 'qf2-1',
      level: 'A2',
      title: 'Fietsherstel',
      text: `Piet brengt zijn fiets naar de fietsenmaker omdat er iets kapot is. Hij wijst naar een onderdeel achter op zijn fiets en vraagt hoe het heet. De fietsenmaker geeft uitleg.`,
      answer: 'Dat heet een bagagedrager',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Hoe heet dat ding achter op de fiets?',
      alternativeQuestions: ['Wat is dat achter op de fiets?'],
      hint: 'Vraag naar de naam van iets',
    },
    {
      id: 'qf2-2',
      level: 'A2',
      title: 'Fiets ophalen',
      text: `Maria heeft haar fiets gisteren bij de fietsenmaker gebracht voor reparatie. Ze belt om te vragen wanneer haar fiets klaar is. De fietsenmaker geeft informatie over de ophaaltijd.`,
      answer: 'U kunt uw fiets morgen na 15.00 ophalen',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Wanneer kan ik mijn fiets ophalen?',
      alternativeQuestions: ['Hoe laat kan ik mijn fiets ophalen?'],
      hint: 'Vraag naar tijd',
    },
    {
      id: 'qf2-3',
      level: 'A2',
      title: 'Kleding kiezen',
      text: `In een kledingzaak zoekt een klant naar een broek in een bepaalde kleur. De klant heeft gevraagd naar verschillende kleuren, maar de verkoper heeft slecht nieuws.`,
      answer: 'Nee, we hebben deze broek helaas alleen nog in deze kleur',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Hebben jullie deze broek ook in andere kleuren?',
      alternativeQuestions: ['Is deze broek er ook in andere kleuren?'],
      hint: 'Vraag naar verschillende opties',
    },
    {
      id: 'qf2-4',
      level: 'A2',
      title: 'Wijn kiezen',
      text: `In een restaurant kijkt een gast naar de wijnkaart. Hij zoekt specifiek naar Duitse wijnen omdat hij die het lekkerst vindt. De ober vertelt wat er beschikbaar is.`,
      answer:
        'Nee, helaas hebben we op dit moment alleen Franse en Spaanse wijnen',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Hebben jullie ook Duitse wijnen?',
      alternativeQuestions: ['Welke wijnen hebben jullie?'],
      hint: 'Vraag naar een specifiek product',
    },
    {
      id: 'qf2-5',
      level: 'A2',
      title: 'Winkel sluitingstijd',
      text: `Een klant komt 's avonds laat naar een winkel en ziet dat het licht nog aan is. Hij wil weten of hij nog naar binnen kan om iets te kopen.`,
      answer: 'We sluiten om negen uur',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Hoe laat sluiten jullie?',
      alternativeQuestions: [
        'Tot hoe laat zijn jullie open?',
        'Wanneer gaat de winkel dicht?',
      ],
      hint: 'Vraag naar openingstijden',
    },
    {
      id: 'qf2-6',
      level: 'A2',
      title: 'Cursus informatie',
      text: `Iemand belt naar een taalschool om informatie te krijgen over een Nederlandse cursus. De medewerker geeft uitleg over de kosten.`,
      answer: 'De cursus kost 250 euro voor 10 lessen',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Hoeveel kost de cursus?',
      alternativeQuestions: ['Wat zijn de kosten?', 'Wat kost het?'],
      hint: 'Vraag naar de prijs',
    },
    {
      id: 'qf2-7',
      level: 'A2',
      title: 'Reisadvies',
      text: `Een toerist vraagt aan een local om advies over vervoer in de stad. Hij wil weten wat de beste manier is om van A naar B te komen.`,
      answer: 'Het beste kun je de metro nemen, dat is het snelst',
      instruction: 'Maak een vraag bij deze reactie',
      question: 'Hoe kan ik het beste naar het centrum?',
      alternativeQuestions: ['Wat is de beste manier om daar te komen?'],
      hint: 'Vraag naar de beste route of vervoermiddel',
    },
  ],

  // Modal verbs exercises
  modalVerbs: [
    {
      id: 'mv2-1',
      level: 'A2',
      title: 'Nieuwe woning',
      text: `Kees zoekt een nieuwe woning. Hij kijkt naar verschillende opties online. Bij sommige huizen staat vermeld dat er een balkon bij zit, maar Kees heeft andere voorkeuren.`,
      question: 'Kees ............. geen balkon. Hij heeft liever een tuin.',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'wil',
      options: ['wil', 'moet', 'mag', 'kan', 'zal'],
      hint: 'Kees heeft een voorkeur - wat uitdrukt wens/verlangen?',
    },
    {
      id: 'mv2-2',
      level: 'A2',
      title: 'Beleefde vraag',
      text: `Een man is op bezoek in een kantoor voor een sollicitatiegesprek. Hij heeft koffie gedronken en moet nu dringend naar het toilet. Hij vraagt dit beleefd aan de receptionist.`,
      question:
        'Meneer, ................... ik even gebruik maken van het toilet?',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'mag',
      options: ['mag', 'moet', 'wil', 'kan', 'zal'],
      hint: 'Dit is een beleefde vraag om toestemming',
    },
    {
      id: 'mv2-3',
      level: 'A2',
      title: 'Weekend plannen',
      text: `Het is vrijdagavond en twee vrienden zitten samen thuis. Ze hebben geen plannen voor morgenavond en willen graag iets leuks gaan doen. Een van hen doet een voorstel.`,
      question:
        '............................. we morgenavond naar de bioscoop?',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'Zullen',
      options: ['Zullen', 'Moeten', 'Mogen', 'Kunnen', 'Willen'],
      hint: 'Dit is een voorstel voor de toekomst',
    },
    {
      id: 'mv2-4',
      level: 'A2',
      title: 'Werk verplichting',
      text: `Lisa vraagt aan haar collega Tom of hij tijd heeft om vanavond samen een film te kijken. Tom zou graag willen, maar hij heeft helaas andere verplichtingen.`,
      question:
        'Ben je vrij vanavond? Nee, vanavond ............................. ik werken.',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'moet',
      options: ['moet', 'mag', 'wil', 'kan', 'zal'],
      hint: 'Dit drukt verplichting/noodzaak uit',
    },
    {
      id: 'mv2-5',
      level: 'A2',
      title: 'Afspraak maken',
      text: `Anna wil een afspraak maken met haar vriend Peter. Ze stelt een tijd voor, maar Peter heeft op dat moment andere plannen en is niet beschikbaar.`,
      question:
        'Kun je morgen om 16.00? Nee, dan ..................... ik niet.',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'kan',
      options: ['kan', 'moet', 'mag', 'wil', 'zal'],
      hint: 'Dit drukt mogelijkheid/vermogen uit',
    },
    {
      id: 'mv2-6',
      level: 'A2',
      title: 'Doktersadvies',
      text: `Mevrouw Jansen is bij de dokter geweest en heeft medicijnen gekregen. De dokter legt uit hoe vaak ze de pillen moet innemen.`,
      question:
        'U ..................... deze pillen drie keer per dag innemen.',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'moet',
      options: ['moet', 'mag', 'wil', 'kan', 'zal'],
      hint: 'Dit drukt een medische verplichting uit',
    },
    {
      id: 'mv2-7',
      level: 'A2',
      title: 'Weersvoorspelling',
      text: `De weerman geeft de voorspelling voor morgen. Hij vertelt wat er waarschijnlijk gaat gebeuren met het weer.`,
      question: 'Morgen ..................... het waarschijnlijk regenen.',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'zal',
      options: ['zal', 'moet', 'mag', 'wil', 'kan'],
      hint: 'Dit drukt een voorspelling uit',
    },
    {
      id: 'mv2-8',
      level: 'A2',
      title: 'Toestemming ouders',
      text: `Kleine Tim vraagt aan zijn ouders of hij bij zijn vriend mag slapen. Zijn moeder geeft antwoord.`,
      question:
        'Mama, ..................... ik bij Jeroen logeren? Ja, dat is goed.',
      instruction:
        'Vul de goede vorm van een modaal werkwoord in (moeten, mogen, willen, kunnen, zullen)',
      answer: 'mag',
      options: ['mag', 'moet', 'wil', 'kan', 'zal'],
      hint: 'Een kind vraagt om toestemming',
    },
  ],

  // Additional grammar exercises
  grammar: [
    {
      id: 'gr2-1',
      level: 'A2',
      title: 'Weekend activiteiten',
      text: `Tom vertelt aan zijn collega wat hij gisteren heeft gedaan. Hij was vrij van werk en heeft de hele dag leuke dingen ondernomen in de stad.`,
      question: 'Kies de juiste vorm: "Gisteren ___ ik naar de bioscoop."',
      options: ['ging', 'ga', 'ben gegaan'],
      answer: 'ging',
      type: 'multiple-choice',
      hint: 'Voor gisteren gebruik je imperfectum',
    },
    {
      id: 'gr2-2',
      level: 'A2',
      title: 'Dagelijkse routine',
      text: `Sarah beschrijft de dagelijkse gewoonten van haar broer. Hij is een zeer georganiseerde persoon die elke dag hetzelfde patroon volgt.`,
      question: 'Vul in: "Hij ___ altijd zijn huiswerk voordat hij tv kijkt."',
      options: ['maakt', 'maakte', 'heeft gemaakt'],
      answer: 'maakt',
      type: 'multiple-choice',
      hint: '"Altijd" duidt op een gewoonte in het heden',
    },
    {
      id: 'gr2-3',
      level: 'A2',
      title: 'Vakantieverhaal',
      text: `Petra vertelt over haar recente vakantie naar Spanje. Ze heeft veel mooie dingen gedaan en wil alles delen met haar vrienden.`,
      question: 'Kies de juiste vorm: "Vorige week ___ wij naar Spanje ___."',
      options: ['zijn gegaan', 'gingen', 'gaan'],
      answer: 'zijn gegaan',
      type: 'multiple-choice',
      hint: 'Een voltooide actie in het verleden met "zijn"',
    },
    {
      id: 'gr2-4',
      level: 'A2',
      title: 'Schooltijd',
      text: `Meneer De Vries herinnert zich zijn schooltijd. Hij denkt terug aan hoe het vroeger was toen hij nog jong was.`,
      question: 'Vul in: "Vroeger ___ ik elke dag met de bus naar school."',
      options: ['ging', 'ga', 'ben gegaan'],
      answer: 'ging',
      type: 'multiple-choice',
      hint: 'Een gewoonte in het verleden gebruik je imperfectum',
    },
    {
      id: 'gr2-5',
      level: 'A2',
      title: 'Huiswerk af',
      text: `Lisa heeft net haar huiswerk afgemaakt. Ze is blij dat ze nu vrij is en kan ontspannen. Ze vertelt het aan haar moeder.`,
      question: 'Kies de juiste vorm: "Ik ___ mijn huiswerk net ___."',
      options: ['heb afgemaakt', 'maakte af', 'maak af'],
      answer: 'heb afgemaakt',
      type: 'multiple-choice',
      hint: 'Een actie die net is voltooid gebruik je de perfectum',
    },
  ],
};

// Create test exercises for Test 1
export function createTestExercises(): (
  | VocabularyExercise
  | GrammarExercise
)[] {
  return [
    // Simple vocabulary exercises for Test 1
    {
      id: 'vocab1',
      level: 'A1',
      type: 'translate',
      question: 'Translate to Dutch: "house"',
      answer: 'huis',
      hint: 'A place where people live',
    },
    {
      id: 'vocab2',
      level: 'A1',
      type: 'multiple-choice',
      question: 'What is "water" in Dutch?',
      answer: 'water',
      options: ['water', 'wijn', 'bier', 'melk'],
      hint: "It's the same word in both languages",
    },
    {
      id: 'vocab3',
      level: 'A1',
      type: 'translate',
      question: 'Translate to Dutch: "cat"',
      answer: 'kat',
      hint: 'A small furry pet',
    },
    {
      id: 'vocab4',
      level: 'A1',
      type: 'multiple-choice',
      question: 'How do you say "dog" in Dutch?',
      answer: 'hond',
      options: ['kat', 'hond', 'vis', 'vogel'],
      hint: "Man's best friend",
    },
    {
      id: 'vocab5',
      level: 'A1',
      type: 'translate',
      question: 'Translate to Dutch: "bread"',
      answer: 'brood',
      hint: 'You eat it for breakfast',
    },
  ] as (VocabularyExercise | GrammarExercise)[];
}

// Create comprehensive test exercises for Test 2
export function createTestExercises2(): any[] {
  return [
    ...testExercises2.readingComprehension,
    ...testExercises2.imperfectum,
    ...testExercises2.perfectTense,
    ...testExercises2.situationalResponses,
    ...testExercises2.questionFormation,
    ...testExercises2.modalVerbs,
    ...testExercises2.grammar,
  ];
}
