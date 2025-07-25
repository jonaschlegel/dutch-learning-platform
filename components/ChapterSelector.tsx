'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { chapters } from '@/data/vocabulary';
import { Badge } from '@/components/Badge';

interface ChapterSelectorProps {
  currentChapter: number;
  onChapterSelect: (chapter: number) => void;
  completedWords: Set<string>;
  totalWords: number;
}

export function ChapterSelector({
  currentChapter,
  onChapterSelect,
  completedWords,
  totalWords,
}: ChapterSelectorProps) {
  return (
    <Card className="mb-6 bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="font-nunito">Select Chapter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          <Button
            variant={currentChapter === 0 ? 'default' : 'outline'}
            onClick={() => onChapterSelect(0)}
            className={`h-auto p-4 justify-start ${
              currentChapter === 0
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border-border hover:bg-muted'
            }`}
          >
            <div className="text-left">
              <div className="font-semibold">All Chapters</div>
              <div className="text-sm text-muted-foreground mt-1">
                <Badge
                  variant="secondary"
                  className="mr-1 mb-1 text-xs bg-secondary text-secondary-foreground"
                >
                  {totalWords} total words
                </Badge>
              </div>
            </div>
          </Button>
          {chapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant={currentChapter === chapter.id ? 'default' : 'outline'}
              onClick={() => onChapterSelect(chapter.id)}
              className={`h-auto p-4 justify-start ${
                currentChapter === chapter.id
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold">
                  Chapter {chapter.id}: {chapter.title}
                </div>
                <div className="flex flex-wrap gap-1 text-sm text-muted-foreground mt-1">
                  {chapter.sections.map((section, index) => (
                    <Badge
                      key={section}
                      variant="secondary"
                      className="mr-1 mb-1 text-xs bg-secondary text-secondary-foreground"
                    >
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
