'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import type { Conjunction } from '@/data/conjunctions';
import { CheckCircle, ChevronRight, Lightbulb, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ConjunctionsExerciseProps {
  conjunction: Conjunction;
  mode: 'complete' | 'translate' | 'identify' | 'wordOrder' | 'usage';
  onComplete: (correct: boolean) => void;
}

export function ConjunctionsExercise({
  conjunction,
  mode,
  onComplete,
}: ConjunctionsExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWordOrder, setSelectedWordOrder] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Options for multiple choice questions
  const typeOptions = ['coordinating', 'subordinating', 'correlative'];
  const categoryOptions = ['basic', 'contrast', 'cause', 'time', 'condition'];
  const wordOrderOptions = ['normal', 'inverted', 'verb-to-end'];

  const checkAnswer = () => {
    let correct = false;

    switch (mode) {
      case 'complete':
        // Check if the user can complete a sentence with the conjunction
        const normalizedAnswer = userAnswer.toLowerCase().trim();
        const expectedAnswer = conjunction.dutch.toLowerCase();
        correct = normalizedAnswer === expectedAnswer;
        break;
      case 'translate':
        // Check translation from English to Dutch
        const translationAnswer = userAnswer.toLowerCase().trim();
        const expectedTranslation = conjunction.dutch.toLowerCase();
        correct = translationAnswer === expectedTranslation;
        break;
      case 'identify':
        // Check if user can identify the type and category
        correct =
          selectedType === conjunction.type &&
          selectedCategory === conjunction.category;
        break;
      case 'wordOrder':
        // Check if user knows the word order rule
        correct = selectedWordOrder === conjunction.wordOrder;
        break;
      case 'usage':
        // Check if user understands the usage
        const usageAnswer = userAnswer.toLowerCase().trim();
        const expectedUsage = conjunction.usage.toLowerCase();
        correct =
          usageAnswer.includes(expectedUsage.split(' ')[0]) ||
          expectedUsage.includes(usageAnswer);
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
  };

  const handleNext = () => {
    // If we're in complete mode and have more exercises, cycle to the next one
    if (mode === 'complete' && completeExercises.length > 1) {
      const nextIndex = (currentExerciseIndex + 1) % completeExercises.length;
      setCurrentExerciseIndex(nextIndex);

      // Only mark as complete after doing a few exercises (or all if less than 3)
      const requiredExercises = Math.min(3, completeExercises.length);
      if (currentExerciseIndex + 1 >= requiredExercises) {
        onComplete(isCorrect);
      } else {
        // Reset for next exercise in the same conjunction
        setShowFeedback(false);
        setUserAnswer('');
        setHasAnswered(false);
        return;
      }
    } else {
      onComplete(isCorrect);
    }

    // Reset everything for next conjunction
    setShowFeedback(false);
    setUserAnswer('');
    setSelectedType('');
    setSelectedCategory('');
    setSelectedWordOrder('');
    setHasAnswered(false);
    setCurrentExerciseIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (hasAnswered) {
        e.preventDefault();
        handleNext();
      } else {
        // Check if we have valid answers based on mode
        const canCheck =
          (mode === 'complete' && userAnswer.trim()) ||
          (mode === 'translate' && userAnswer.trim()) ||
          (mode === 'identify' && selectedType && selectedCategory) ||
          (mode === 'wordOrder' && selectedWordOrder) ||
          (mode === 'usage' && userAnswer.trim());

        if (canCheck) {
          e.preventDefault();
          checkAnswer();
        }
      }
    }
  };

  const getInstructions = () => {
    switch (mode) {
      case 'complete':
        return 'Complete the sentence with the correct conjunction';
      case 'translate':
        return 'Translate the English conjunction to Dutch';
      case 'identify':
        return 'Identify the type and category';
      case 'wordOrder':
        return 'What word order does this conjunction require?';
      case 'usage':
        return 'Explain when to use this conjunction';
    }
  };

  // Generate multiple example sentences for the complete mode
  const getCompleteExercises = (conjunction: Conjunction) => {
    const exercises: string[] = [];

    // Always include the original example if available
    if (conjunction.exampleSentence) {
      exercises.push(
        conjunction.exampleSentence.replace(conjunction.dutch, '___'),
      );
    }

    // Generate additional context-specific sentences based on the conjunction
    switch (conjunction.dutch) {
      case 'en':
        exercises.push(
          'Ik drink koffie ___ lees een boek',
          'Mijn broer ___ ik gaan naar school',
          'Ze koopt brood ___ melk in de winkel',
          'We kijken TV ___ eten chips',
        );
        break;
      case 'of':
        exercises.push(
          'Wil je thee ___ koffie?',
          'Gaan we lopen ___ met de fiets?',
          'Kom je vandaag ___ morgen?',
          'Neem je de trein ___ de bus?',
        );
        break;
      case 'maar':
        exercises.push(
          'Het is koud, ___ de zon schijnt',
          'Hij is slim, ___ ook lui',
          'Ze wil komen, ___ heeft geen tijd',
          'Het eten is duur, ___ zeer lekker',
        );
        break;
      case 'want':
        exercises.push(
          'Ik draag een jas, ___ het is koud',
          'We blijven thuis, ___ het regent hard',
          'Hij leert Nederlands, ___ hij woont hier',
          'Ze is blij, ___ ze heeft vakantie',
        );
        break;
      case 'dus':
        exercises.push(
          'Het regent, ___ pak ik een paraplu',
          'Ik ben moe, ___ ga ik vroeg slapen',
          'Het is laat, ___ moeten we gaan',
          'Ze heeft honger, ___ maakt ze eten',
        );
        break;
      case 'als':
        exercises.push(
          '___ het mooi weer is, gaan we wandelen',
          'Ik ben blij ___ je komt',
          '___ je tijd hebt, bel me dan',
          'We gaan uit ___ het niet regent',
        );
        break;
      case 'dat':
        exercises.push(
          'Ik weet ___ hij Nederlands spreekt',
          'Ze zegt ___ de les interessant is',
          'Hij denkt ___ we te laat zijn',
          'We hopen ___ jullie komen',
        );
        break;
      case 'omdat':
        exercises.push(
          'Hij blijft thuis ___ hij ziek is',
          'We leren Nederlands ___ we hier wonen',
          'Ze is gelukkig ___ ze verliefd is',
          'Ik kook ___ ik honger heb',
        );
        break;
      case 'toen':
        exercises.push(
          '___ ik klein was, speelde ik veel',
          'We waren blij ___ hij kwam',
          '___ het donker werd, gingen we naar huis',
          'Hij lachte ___ hij de grap hoorde',
        );
        break;
      case 'waar':
        exercises.push(
          'Dit is de straat ___ ik woon',
          'Ik ken het café ___ we altijd zitten',
          'Ze toont de kamer ___ ze werkt',
          'Hier is de plek ___ we elkaar ontmoetten',
        );
        break;
      case 'hoewel':
        exercises.push(
          '___ het regent, gaan we wandelen',
          'Hij werkt door, ___ hij moe is',
          '___ ze rijk is, is ze niet gelukkig',
          'We vertrekken ___ het nog vroeg is',
        );
        break;
      case 'terwijl':
        exercises.push(
          'Ik kook ___ zij studeert',
          'Hij slaapt ___ wij werken',
          'Ze belt ___ ze naar huis loopt',
          'We praten ___ we koffie drinken',
        );
        break;
      case 'voordat':
        exercises.push(
          'Was je handen ___ je eet',
          'Check je email ___ je weggaat',
          'Doe de deur dicht ___ je vertrekt',
          'Lees het boek ___ je naar bed gaat',
        );
        break;
      case 'nadat':
        exercises.push(
          '___ hij gegeten had, ging hij slapen',
          'We gingen weg ___ de film afgelopen was',
          '___ ze douched, kleedde ze zich aan',
          'Hij belde ___ hij thuis gekomen was',
        );
        break;
      case 'sinds':
        exercises.push(
          '___ ik hier woon, spreek ik Nederlands',
          'Hij is gelukkig ___ hij getrouwd is',
          '___ vorige maand werk ik hier',
          'Ze leert piano ___ ze zes jaar is',
        );
        break;
      case 'totdat':
        exercises.push(
          'Wacht hier ___ ik terugkom',
          'Hij werkte ___ het donker werd',
          'We blijven ___ de regen stopt',
          'Ze oefende ___ ze het kon',
        );
        break;
      case 'zodra':
        exercises.push(
          '___ hij komt, beginnen we',
          'Bel me ___ je klaar bent',
          '___ de zon opkomt, worden we wakker',
          'We vertrekken ___ iedereen er is',
        );
        break;
      case 'zodat':
        exercises.push(
          'Ik spreek langzaam ___ je me verstaat',
          'We vertrekken vroeg ___ we op tijd zijn',
          'Hij zet muziek aan ___ hij kan ontspannen',
          'Ze studeert hard ___ ze slaagt',
        );
        break;
      case 'tenzij':
        exercises.push(
          'We gaan picknicken, ___ het regent',
          'Hij komt vanavond, ___ hij ziek wordt',
          'De winkel is open, ___ het zondag is',
          'We spelen buiten, ___ het te koud is',
        );
        break;
      case 'wanneer':
        exercises.push(
          '___ ga je op vakantie?',
          'Ik weet niet ___ hij komt',
          '___ de winter komt, wordt het koud',
          'Ze vraagt ___ we gaan eten',
        );
        break;
      case 'doordat':
        exercises.push(
          'De trein is laat ___ er een storing is',
          'Hij viel ___ de weg glad was',
          'We zijn nat ___ het regent',
          'Ze is moe ___ ze hard werkte',
        );
        break;
      case 'aangezien':
        exercises.push(
          '___ het laat is, gaan we naar huis',
          'We nemen de auto, ___ het ver is',
          '___ hij ziek is, blijft hij thuis',
          'Ze draagt een jas, ___ het koud is',
        );
        break;
      case 'indien':
        exercises.push(
          '___ u vragen heeft, bel ons',
          'We helpen u, ___ dat nodig is',
          '___ mogelijk, kom dan morgen',
          'Het is gratis ___ u student bent',
        );
        break;
      default:
        // Generic examples based on category
        if (conjunction.category === 'basic') {
          exercises.push(
            `Ik studeer Nederlands ___ het is interessant`,
            `Hij werkt hard ___ hij wil slagen`,
            `We gaan weg ___ we klaar zijn`,
          );
        } else if (conjunction.category === 'contrast') {
          exercises.push(
            `Ze is moe, ___ ze werkt door`,
            `Het is duur, ___ ze koopt het toch`,
            `Hij wil komen, ___ hij heeft geen tijd`,
          );
        } else if (conjunction.category === 'cause') {
          exercises.push(
            `Hij komt niet, ___ hij is ziek`,
            `We blijven binnen, ___ het regent`,
            `Ze is blij, ___ ze heeft vakantie`,
          );
        } else if (conjunction.category === 'time') {
          exercises.push(
            `Ik bel je ___ ik thuis ben`,
            `We eten ___ iedereen er is`,
            `Hij werkt ___ het donker wordt`,
          );
        } else if (conjunction.category === 'condition') {
          exercises.push(
            `___ je komt, zijn we blij`,
            `We gaan ___ het mooi weer is`,
            `Hij helpt ___ je het vraagt`,
          );
        }
    }

    // Remove duplicates and return array
    return Array.from(new Set(exercises)).filter((ex) => ex.length > 0);
  };

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const completeExercises =
    mode === 'complete' ? getCompleteExercises(conjunction) : [];

  const getPrompt = () => {
    switch (mode) {
      case 'complete':
        // Use the current exercise from our generated list
        if (completeExercises.length > 0) {
          return `Complete the sentence: "${completeExercises[currentExerciseIndex]}"`;
        }
        return `Complete: "Hij wil komen ___ hij heeft tijd"`;
      case 'translate':
        return `Translate "${conjunction.english}" to Dutch:`;
      case 'identify':
        return `What type and category is "${conjunction.dutch}"?`;
      case 'wordOrder':
        return `What word order rule applies to "${conjunction.dutch}"?`;
      case 'usage':
        return `When do you use "${conjunction.dutch}"?`;
    }
  };

  const getLevelBadgeColor = () => {
    switch (conjunction.level) {
      case 'A1':
        return 'bg-green-100 text-green-800';
      case 'A2':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = () => {
    switch (conjunction.type) {
      case 'coordinating':
        return 'bg-orange-100 text-orange-800';
      case 'subordinating':
        return 'bg-purple-100 text-purple-800';
      case 'correlative':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      className="w-full max-w-lg mx-auto bg-card shadow-lg min-h-[500px] flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-nunito">
          <div className="flex flex-col">
            <span>{getInstructions()}</span>
            {mode === 'complete' && completeExercises.length > 1 && (
              <span className="text-xs text-muted-foreground mt-1">
                Exercise {currentExerciseIndex + 1} of{' '}
                {Math.min(3, completeExercises.length)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getLevelBadgeColor()}`}
            >
              {conjunction.level}
            </span>
            {mode !== 'identify' && (
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor()}`}
              >
                {conjunction.type}
              </span>
            )}
            {conjunction.hint && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted bg-transparent"
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-3 text-sm">
                    {conjunction.hint}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            {mode === 'translate' || mode === 'complete'
              ? '?'
              : conjunction.dutch}
          </p>
          <p className="text-lg text-muted-foreground mb-1">
            (
            {mode === 'translate' || mode === 'identify' || mode === 'wordOrder'
              ? conjunction.english
              : '?'}
            )
          </p>
          {mode !== 'identify' && (
            <p className="text-sm text-muted-foreground">
              Category: {conjunction.category}
            </p>
          )}
        </div>

        <div className="text-center bg-muted p-3 rounded-lg">
          <p className="text-md font-medium text-foreground">{getPrompt()}</p>
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {(mode === 'complete' ||
            mode === 'translate' ||
            mode === 'usage') && (
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                mode === 'complete'
                  ? 'Type the conjunction...'
                  : mode === 'translate'
                  ? 'Type the Dutch conjunction...'
                  : 'Explain the usage...'
              }
              disabled={hasAnswered}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!hasAnswered) {
                    e.stopPropagation();
                    checkAnswer();
                  }
                }
              }}
              className="text-center text-lg"
            />
          )}

          {mode === 'identify' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Type:</p>
                <div className="grid grid-cols-1 gap-2">
                  {typeOptions.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      onClick={() => setSelectedType(type)}
                      disabled={hasAnswered}
                      className="text-left justify-start"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Category:</p>
                <div className="grid grid-cols-1 gap-2">
                  {categoryOptions.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? 'default' : 'outline'
                      }
                      onClick={() => setSelectedCategory(category)}
                      disabled={hasAnswered}
                      className="text-left justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'wordOrder' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {wordOrderOptions.map((order) => (
                  <Button
                    key={order}
                    variant={
                      selectedWordOrder === order ? 'default' : 'outline'
                    }
                    onClick={() => setSelectedWordOrder(order)}
                    disabled={hasAnswered}
                    className="text-left justify-start"
                  >
                    {order === 'normal' &&
                      'Normal word order (subject-verb-object)'}
                    {order === 'inverted' &&
                      'Inverted word order (verb before subject)'}
                    {order === 'verb-to-end' &&
                      'Verb goes to the end of clause'}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {!hasAnswered ? (
            <Button
              onClick={checkAnswer}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={
                (mode === 'complete' && !userAnswer.trim()) ||
                (mode === 'translate' && !userAnswer.trim()) ||
                (mode === 'identify' && (!selectedType || !selectedCategory)) ||
                (mode === 'wordOrder' && !selectedWordOrder) ||
                (mode === 'usage' && !userAnswer.trim())
              }
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-dutch-blue text-white hover:bg-dutch-blue/90 flex items-center justify-center space-x-2"
            >
              <span>
                {mode === 'complete' &&
                completeExercises.length > 1 &&
                currentExerciseIndex + 1 < Math.min(3, completeExercises.length)
                  ? 'Next Exercise'
                  : 'Next Question'}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          {showFeedback && (
            <div
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                isCorrect
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {isCorrect ? 'Correct! Well done!' : 'Not quite right.'}
                  </p>
                  {isCorrect && mode === 'complete' && (
                    <div className="mt-2 p-2 bg-white/50 rounded text-sm">
                      <p className="font-medium">Complete sentence:</p>
                      <p className="text-dutch-blue">
                        {completeExercises[currentExerciseIndex]?.replace(
                          '___',
                          conjunction.dutch,
                        )}
                      </p>
                    </div>
                  )}
                  {!isCorrect && (
                    <div className="mt-2 text-sm">
                      {mode === 'complete' && (
                        <div>
                          <p className="font-semibold">
                            Correct answer:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.dutch}
                            </span>
                          </p>
                          <div className="mt-2 p-2 bg-white/50 rounded text-sm">
                            <p className="font-medium">Complete sentence:</p>
                            <p className="text-dutch-blue">
                              {completeExercises[currentExerciseIndex]?.replace(
                                '___',
                                conjunction.dutch,
                              )}
                            </p>
                          </div>
                          <p className="text-xs mt-1 text-muted-foreground">
                            This is a {conjunction.type} conjunction used for{' '}
                            {conjunction.category} relationships.
                            {conjunction.wordOrder === 'verb-to-end' &&
                              ' Notice the verb goes to the end!'}
                            {conjunction.wordOrder === 'inverted' &&
                              ' Notice the inverted word order!'}
                          </p>
                        </div>
                      )}
                      {mode === 'translate' && (
                        <div>
                          <p className="font-semibold">
                            Translation:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.dutch}
                            </span>
                          </p>
                          <p className="text-xs mt-1 text-muted-foreground">
                            Remember: "{conjunction.english}" = "
                            {conjunction.dutch}"
                          </p>
                        </div>
                      )}
                      {mode === 'identify' && (
                        <div>
                          <p className="font-semibold">
                            Type:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.type}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Category:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.category}
                            </span>
                          </p>
                          <p className="text-xs mt-1 text-muted-foreground">
                            {conjunction.type === 'coordinating'
                              ? 'Coordinating conjunctions connect equal elements with normal word order.'
                              : conjunction.type === 'subordinating'
                              ? 'Subordinating conjunctions send the verb to the end of the clause.'
                              : 'Correlative conjunctions work in pairs.'}
                          </p>
                        </div>
                      )}
                      {mode === 'wordOrder' && (
                        <div>
                          <p className="font-semibold">
                            Word order:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.wordOrder}
                            </span>
                          </p>
                          <p className="text-xs mt-1 text-muted-foreground">
                            {conjunction.wordOrder === 'verb-to-end'
                              ? 'Subordinating conjunctions send the verb to the end of the clause.'
                              : conjunction.wordOrder === 'inverted'
                              ? 'This conjunction causes subject-verb inversion in the following clause.'
                              : 'Normal word order: subject + verb + object.'}
                          </p>
                        </div>
                      )}
                      {mode === 'usage' && (
                        <div>
                          <p className="font-semibold">
                            Usage:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.usage}
                            </span>
                          </p>
                          <p className="text-xs mt-1 text-muted-foreground">
                            Use "{conjunction.dutch}" when you want to{' '}
                            {conjunction.usage.toLowerCase()}.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {conjunction.exampleSentence && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium">Example:</p>
                      <p className="text-dutch-blue">
                        {conjunction.exampleSentence}
                      </p>
                      <p className="text-muted-foreground italic">
                        {conjunction.exampleTranslation}
                      </p>
                    </div>
                  )}
                  {conjunction.rule && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium">Rule:</p>
                      <p className="text-muted-foreground">
                        {conjunction.rule}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
