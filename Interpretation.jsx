import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Heart, Briefcase, DollarSign, Sparkles, Target } from 'lucide-react';
import { getArcanaInfo } from '../utils/arcanaData';

const Interpretation = ({ matrixData, personalInfo }) => {
  const [expandedSections, setExpandedSections] = useState({});

  if (!matrixData) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get arcana information for key positions
  const centerArcana = getArcanaInfo(matrixData.centerPoint);
  const talentsArcana = getArcanaInfo(matrixData.primarySquare.right);
  const materialArcana = getArcanaInfo(matrixData.primarySquare.bottom);
  const spiritualArcana = getArcanaInfo(matrixData.primarySquare.left);
  const loveArcana = getArcanaInfo(matrixData.primaryCorners.bottomLeft);
  const moneyArcana = getArcanaInfo(matrixData.primaryCorners.bottomRight);
  const karmicArcana = getArcanaInfo(matrixData.primaryCorners.topLeft);

  const InterpretationSection = ({ 
    title, 
    icon: Icon, 
    arcana, 
    number, 
    description, 
    details,
    sectionKey,
    color = "blue"
  }) => {
    const isExpanded = expandedSections[sectionKey];
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      pink: "from-pink-500 to-pink-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600",
      indigo: "from-indigo-500 to-indigo-600"
    };

    return (
      <Card className="overflow-hidden">
        <CardHeader className={`bg-gradient-to-r ${colorClasses[color]} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6" />
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Energy {number}
                  </Badge>
                  <span className="text-white/90">{arcana?.name}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection(sectionKey)}
              className="text-white hover:bg-white/20"
            >
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4">{description}</p>
          
          {isExpanded && details && (
            <div className="space-y-4 border-t pt-4">
              {details.map((detail, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-gray-800">{detail.title}</h4>
                  {Array.isArray(detail.content) ? (
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {detail.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">{detail.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {personalInfo.name}'s Matrix Interpretation
        </h2>
        <p className="text-gray-600">
          Discover the deeper meaning behind your numbers and life path
        </p>
      </div>

      {/* Core Essence */}
      <InterpretationSection
        title="Your Core Essence"
        icon={Sparkles}
        arcana={centerArcana}
        number={matrixData.centerPoint}
        description={`Your central energy is ${centerArcana?.name} (${matrixData.centerPoint}). ${centerArcana?.description}`}
        details={[
          {
            title: "Positive Traits",
            content: centerArcana?.positiveTraits || []
          },
          {
            title: "Life Challenges",
            content: centerArcana?.challenges || []
          },
          {
            title: "Spiritual Guidance",
            content: centerArcana?.lifeGuidance?.spirituality || "Focus on developing your core essence."
          }
        ]}
        sectionKey="essence"
        color="purple"
      />

      {/* Natural Talents */}
      <InterpretationSection
        title="Your Natural Talents"
        icon={Target}
        arcana={talentsArcana}
        number={matrixData.primarySquare.right}
        description={`Your talents are expressed through ${talentsArcana?.name} (${matrixData.primarySquare.right}). This represents your natural abilities and genetic gifts.`}
        details={[
          {
            title: "Career Paths",
            content: talentsArcana?.careerPaths || []
          },
          {
            title: "Natural Abilities",
            content: talentsArcana?.positiveTraits || []
          },
          {
            title: "Career Guidance",
            content: talentsArcana?.lifeGuidance?.career || "Use your natural talents in your career."
          }
        ]}
        sectionKey="talents"
        color="green"
      />

      {/* Life Purposes */}
      <div className="grid md:grid-cols-2 gap-6">
        <InterpretationSection
          title="Material Purpose"
          icon={Briefcase}
          arcana={materialArcana}
          number={matrixData.primarySquare.bottom}
          description={`Your earthly mission is guided by ${materialArcana?.name} (${matrixData.primarySquare.bottom}).`}
          details={[
            {
              title: "Career Focus",
              content: materialArcana?.lifeGuidance?.career || "Focus on material world achievements."
            },
            {
              title: "Key Traits",
              content: materialArcana?.positiveTraits?.slice(0, 3) || []
            }
          ]}
          sectionKey="material"
          color="orange"
        />

        <InterpretationSection
          title="Spiritual Purpose"
          icon={Sparkles}
          arcana={spiritualArcana}
          number={matrixData.primarySquare.left}
          description={`Your soul mission is influenced by ${spiritualArcana?.name} (${matrixData.primarySquare.left}).`}
          details={[
            {
              title: "Spiritual Path",
              content: spiritualArcana?.lifeGuidance?.spirituality || "Focus on spiritual development."
            },
            {
              title: "Inner Qualities",
              content: spiritualArcana?.positiveTraits?.slice(0, 3) || []
            }
          ]}
          sectionKey="spiritual"
          color="indigo"
        />
      </div>

      {/* Love and Money Lines */}
      <div className="grid md:grid-cols-2 gap-6">
        <InterpretationSection
          title="Love Line"
          icon={Heart}
          arcana={loveArcana}
          number={matrixData.primaryCorners.bottomLeft}
          description={`Your approach to love and relationships is shaped by ${loveArcana?.name} (${matrixData.primaryCorners.bottomLeft}).`}
          details={[
            {
              title: "Relationship Style",
              content: loveArcana?.lifeGuidance?.relationships || "Focus on building meaningful connections."
            },
            {
              title: "Love Challenges",
              content: loveArcana?.challenges?.slice(0, 3) || []
            }
          ]}
          sectionKey="love"
          color="pink"
        />

        <InterpretationSection
          title="Money Line"
          icon={DollarSign}
          arcana={moneyArcana}
          number={matrixData.primaryCorners.bottomRight}
          description={`Your financial energy is driven by ${moneyArcana?.name} (${matrixData.primaryCorners.bottomRight}).`}
          details={[
            {
              title: "Financial Approach",
              content: moneyArcana?.lifeGuidance?.finances || "Focus on building financial stability."
            },
            {
              title: "Money Strengths",
              content: moneyArcana?.positiveTraits?.slice(0, 3) || []
            }
          ]}
          sectionKey="money"
          color="green"
        />
      </div>

      {/* Karmic Challenges */}
      <InterpretationSection
        title="Karmic Challenges"
        icon={Target}
        arcana={karmicArcana}
        number={matrixData.primaryCorners.topLeft}
        description={`Your karmic lessons are connected to ${karmicArcana?.name} (${matrixData.primaryCorners.topLeft}). These are challenges inherited from your ancestral line that you're meant to transform.`}
        details={[
          {
            title: "Areas to Work On",
            content: karmicArcana?.challenges || []
          },
          {
            title: "Growth Opportunities",
            content: "Transform these challenges into strengths through conscious awareness and effort."
          },
          {
            title: "Healing Path",
            content: karmicArcana?.lifeGuidance?.spirituality || "Focus on healing and transformation."
          }
        ]}
        sectionKey="karmic"
        color="red"
      />

      {/* Life Guidance Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            Life Guidance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Key Strengths</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Core essence: {centerArcana?.name}</li>
                <li>• Natural talents: {talentsArcana?.name}</li>
                <li>• Spiritual gifts: {spiritualArcana?.name}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Areas for Growth</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Transform karmic patterns: {karmicArcana?.name}</li>
                <li>• Balance material and spiritual</li>
                <li>• Develop emotional intelligence</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-gray-700 italic">
              "Your matrix is a map of your soul's journey. Use this knowledge to align with your highest potential 
              and create a life of purpose, love, and fulfillment."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Interpretation;

