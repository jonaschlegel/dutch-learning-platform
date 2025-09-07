import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

interface CollapsibleTabsProps {
  defaultValue: string;
  children: React.ReactNode;
  tabsData: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
  }>;
  className?: string;
  defaultExpanded?: boolean;
}

export function CollapsibleTabs({
  defaultValue,
  children,
  tabsData,
  className = '',
  defaultExpanded = true,
}: CollapsibleTabsProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Find active tab data
  const activeTabData = tabsData.find((tab) => tab.value === activeTab);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Compact Header - Always Visible */}
      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Menu className="h-5 w-5 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Navigation</h3>
                <p className="text-sm text-gray-600">
                  {activeTabData ? (
                    <span className="flex items-center space-x-1">
                      {activeTabData.icon}
                      <span>{activeTabData.label}</span>
                    </span>
                  ) : (
                    'Practice Sections'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Quick access to current tab */}
              {!isExpanded && activeTabData && (
                <div className="hidden sm:flex items-center space-x-2 mr-4">
                  {activeTabData.icon}
                  <span className="text-sm text-gray-600">
                    {activeTabData.label}
                  </span>
                </div>
              )}
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Expanded Content */}
      {isExpanded ? (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList
              className="grid w-full bg-muted"
              style={{
                gridTemplateColumns: `repeat(${tabsData.length}, minmax(0, 1fr))`,
              }}
            >
              {tabsData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center space-x-2 font-nunito"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {children}
          </Tabs>
        </div>
      ) : (
        // Minimized content - only show active tab content
        <div className="animate-in slide-in-from-top-2 duration-200">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            {/* Hidden tab list for state management */}
            <div className="hidden">
              <TabsList>
                {tabsData.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {children}
          </Tabs>
        </div>
      )}
    </div>
  );
}
