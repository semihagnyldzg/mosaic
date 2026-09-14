export interface EvidencePackage {
  title: string;
  scientificKnowledge: string;
  exactEvidencePackage: string;
  studentWork: string;
  facilitatorPrompts: string[];
  requiredGroupAction: string;
  questions: {
    slowDown: string;
    coreReasoning: string;
    challengeExtend: string;
  };
}

export interface AccessPathway {
  languageRepresentation: string;
  supportedInvestigation: string;
  coreInvestigation: string;
  extendedChallenge: string;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  ncObjectives: string[];
  primaryPractice: string;
  directInstructionContext: string;
  prepare: string;
  launch: {
    prompt: string;
    kindergartenTaskScript: string;
    studentActionsBeforeEvidence: string;
  };
  accessPathways: AccessPathway;
  evidence1: EvidencePackage;
  evidence2: EvidencePackage;
  evidence3: EvidencePackage;
  consolidation: {
    duration: string;
    content: string;
  };
  individualTransferAssessment: string;
  facilitatorChecklist: string[];
}

export interface Project {
  id: string;
  projectNumber: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CurriculumMeta {
  title: string;
  subtitle: string;
  grade: string;
  subject: string;
  totalLessons: number;
  totalProjects: number;
  nonNegotiableRule: string;
  clarityRule: string;
  evidenceDefinition: string;
  sequenceSteps: { step: number; name: string; description: string }[];
  accessPathwaysInfo: { name: string; description: string }[];
}

export const CURRICULUM_META: CurriculumMeta = {
  title: "KINDERGARTEN SCIENCE",
  subtitle: "Clear Scientific Evidence-Release Curriculum",
  grade: "Kindergarten (K)",
  subject: "Science & Engineering",
  totalLessons: 36,
  totalProjects: 5,
  nonNegotiableRule: "For every lesson, first identify the scientific knowledge that would normally be delivered as direct instruction. Then convert that knowledge into concrete, inspectable Evidence 1–2–3 packages. Facilitator releases knowledge at planned moments while students DO science.",
  clarityRule: "Every lesson includes an exact, short problem/task script the facilitator can say aloud. Children should immediately know what they are trying to organize, build, test, figure out, compare, or prove.",
  evidenceDefinition: "Evidence must be something students can inspect or produce: real objects, side-by-side observations, before/after images, a short data table, a repeated demonstration, a material test, a movement test, a model, an information card, or a new design constraint.",
  sequenceSteps: [
    { step: 1, name: "Phenomenon / Problem", description: "Students notice, wonder, ask questions, define the problem, or make an initial model/claim." },
    { step: 2, name: "Small-Group Work", description: "All students work on the same science idea through differentiated access pathways." },
    { step: 3, name: "Evidence 1", description: "Facilitator releases exact object/data/image/test described - not a verbal answer." },
    { step: 4, name: "Student Practice", description: "Students observe, test, analyze, model, compare, argue, or communicate with Evidence 1." },
    { step: 5, name: "Evidence 2", description: "A second concrete scientific information source extends the idea." },
    { step: 6, name: "Student Practice", description: "Students integrate Evidence 1 + 2 and revise." },
    { step: 7, name: "Evidence 3", description: "A counterexample, new data set, or constraint forces discrimination and revision." },
    { step: 8, name: "Consolidation", description: "Facilitator formalizes the scientific relationship and vocabulary in 2–4 minutes." },
    { step: 9, name: "Transfer Assessment", description: "Each child applies the relationship to a new case through talk, drawing, or gesture." }
  ],
  accessPathwaysInfo: [
    { name: "Language & Representation", description: "Real objects/photos, gestures, picture icons, matching, pointing, oral phrases, facilitator scribing." },
    { name: "Supported Investigation", description: "Fewer choices, visible step cards, partner modeling, predict→test→show structure." },
    { name: "Core Investigation", description: "Students organize/test evidence and justify a tentative claim/model/design." },
    { name: "Extended Challenge", description: "Counterexample, additional comparison, student-designed test, competing criteria, or 'What evidence would change your mind?'" }
  ]
};

export const KINDERGARTEN_PROJECTS: Project[] = [
  {
    id: "project-1",
    projectNumber: 1,
    title: "OUR CLASSROOM WORKS",
    description: "Exploring physical properties, position, movement, gravity, and material suitability through classroom engineering challenges.",
    lessons: [
      {
        id: "lesson-1",
        lessonNumber: 1,
        title: "Mystery Collection",
        ncObjectives: ["PS.K.1.1"],
        primaryPractice: "Analyzing & Interpreting Data",
        directInstructionContext: "Objects can be described and classified using observable physical properties. The same object can be classified in more than one valid way depending on the property used.",
        prepare: "Place 12 mixed classroom objects at each group: red rubber ball, blue plastic cap, red wooden cube, yellow sponge, craft stick, cotton ball, fabric square, smooth stone, rough stone, large block, small block, rubber band. Keep Evidence 1–3 materials hidden.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "These objects are all mixed up. Your group needs to organize them. There is no rule yet. Decide together how you want to group them.",
          studentActionsBeforeEvidence: "Children handle all objects, agree on an initial grouping, and prepare to show another group why their objects belong together."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • WHAT WE CAN SEE AND FEEL",
          scientificKnowledge: "Objects have observable physical properties such as color, size, shape, and texture.",
          exactEvidencePackage: "Give each group three comparison pairs: (A) red rubber ball + blue rubber ball; (B) red wooden cube + red rubber ball; (C) smooth stone + rough stone. Evidence card says: LOOK • TOUCH • COMPARE. What is the same? What is different?",
          studentWork: "Students compare visible/touchable properties and re-sort. Do not name all properties first. Attach words color, shape, size, texture after students describe them.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • PROPERTIES WE HAVE TO TEST",
          scientificKnowledge: "Some physical properties, such as relative weight and flexibility, are easier to notice when objects are compared or tested.",
          exactEvidencePackage: "Give a sponge, wood block, fabric strip, and rubber band. Card directions: 1) Hold one item in each hand. Which feels heavier? 2) Gently bend each item. What happens? Record with HEAVIER/LIGHTER and BENDS/DOES NOT BEND picture icons.",
          studentWork: "Students produce direct observation data for weight and flexibility, then create a new sort using one tested property.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • ONE OBJECT, MANY PROPERTIES",
          scientificKnowledge: "One object has more than one physical property, so the same objects can be classified in different valid ways depending on the property used.",
          exactEvidencePackage: "Reveal one red rubber ball card labeled only with a picture. Read three claims: Mia: 'It belongs with RED objects.' Noah: 'It belongs with ROUND objects.' Ava: 'It belongs with FLEXIBLE objects.' Ask: Who has evidence? Can more than one claim be correct?",
          studentWork: "Students use the same object as evidence that an object has multiple properties and can be classified differently depending on the chosen property.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Observable physical properties include size, color, shape, texture, weight, and flexibility. Scientists use properties to describe and classify objects; the same objects can be classified in different valid ways."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-2",
        lessonNumber: 2,
        title: "Where Should It Go?",
        ncObjectives: ["PS.K.2.1"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Position is relative to a reference object; models and position words communicate spatial relationships.",
        prepare: "Set up a mini classroom model with table, chair, box, toy person, and pencil. Hide one object's location from a partner.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "A new student cannot find our classroom objects. Your group must make a model that helps the student know exactly where things are.",
          studentActionsBeforeEvidence: "Children place objects in a mini-classroom and give a partner location directions without pointing."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • LOCATION NEEDS A RELATIONSHIP",
          scientificKnowledge: "An object's position is described relative to another object or reference point.",
          exactEvidencePackage: "Show a model/photo: bear UNDER table and BESIDE chair. Card asks: Where is Bear? What two objects help you explain?",
          studentWork: "Students use two relative-position statements and test whether a partner can locate the bear.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • MOVE THE OBJECT, KEEP THE ROOM",
          scientificKnowledge: "When an object moves, some of its position relationships can change while others may stay the same.",
          exactEvidencePackage: "Move bear from under table to ON TOP OF table while chair stays fixed. Provide before/after pictures. Card: Which position words must change? Which can stay?",
          studentWork: "Students compare models and notice that position statements change when the object's relationship changes.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • TWO TRUE DESCRIPTIONS",
          scientificKnowledge: "More than one relative-position statement can be true at the same time when different reference objects are used.",
          exactEvidencePackage: "Show bear BETWEEN two chairs and IN FRONT OF a shelf. Read: 'Bear is between the chairs.' 'Bear is in front of the shelf.' Ask whether both can be true and what reference each uses.",
          studentWork: "Students conclude that position is described relative to named reference objects and one object can have multiple true relative positions.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Position words such as in front of, behind, between, on top of, under, above, below, and beside describe where an object is relative to another object."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-3",
        lessonNumber: 3,
        title: "How Things Move",
        ncObjectives: ["PS.K.2.2"],
        primaryPractice: "Planning & Carrying Out Investigations",
        directInstructionContext: "Motion can be described by path and speed; objects/organisms can move straight, zigzag, round and round, back and forth, fast and slow.",
        prepare: "Give each group a toy car, ball, ribbon wand, and floor tape. Ask them to invent two different ways to make something move.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Can you make these objects move in different ways? Your group needs to show at least two movements that do not look the same.",
          studentActionsBeforeEvidence: "Children move toys/objects, imitate movement, and create an initial motion representation with arrows or gestures."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • PATH CARDS",
          scientificKnowledge: "The path of motion describes where an object moves, such as straight or zigzag.",
          exactEvidencePackage: "Release two floor-path cards: one straight line and one zigzag. Students move the same toy along each path and trace the path with a finger.",
          studentWork: "Students distinguish motion path from the object itself and represent straight/zigzag movement.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • NEW PATHS",
          scientificKnowledge: "Objects can also move round and round or back and forth.",
          exactEvidencePackage: "Release circle-arrow and back-and-forth arrow cards. Students choose an object that can demonstrate each and draw the motion with arrows.",
          studentWork: "Students expand their motion categories to round-and-round and back-and-forth.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • SAME PATH, DIFFERENT SPEED",
          scientificKnowledge: "Path and speed are different features of motion; the same path can be traveled fast or slow.",
          exactEvidencePackage: "Facilitator rolls the same car along the same straight taped path once slowly and once quickly. Card: SAME PATH? SAME SPEED? Students mark yes/no with icons.",
          studentWork: "Students separate speed from path and recognize fast/slow as another way to describe motion.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Motion can be described using both the path traveled and how fast or slow the movement is."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-4",
        lessonNumber: 4,
        title: "The Drop Mystery",
        ncObjectives: ["PS.K.2.2"],
        primaryPractice: "Planning & Carrying Out Investigations",
        directInstructionContext: "Released unsupported objects fall toward the ground, although shape/material can change how the fall looks.",
        prepare: "Give paper square, crumpled paper, block, pom-pom. Students predict where each will go when released.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "I am going to let go of these objects. Your group must predict where each one will go and show what you think its movement will look like.",
          studentActionsBeforeEvidence: "Children make predictions with objects/picture icons before any drop demonstration."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • FOUR DROPS",
          scientificKnowledge: "When an unsupported object is released, it moves downward toward the ground.",
          exactEvidencePackage: "From the same marked height, release block, pom-pom, flat paper, and crumpled paper one at a time. Students record destination with DOWN/GROUND icon.",
          studentWork: "Students see all released objects move downward toward the ground.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • SAME MATERIAL, NEW SHAPE",
          scientificKnowledge: "Different objects can fall in different-looking ways even though they all move toward the ground.",
          exactEvidencePackage: "Show flat paper and the same kind of paper crumpled. Drop together. Card: Same material? Same shape? Did both reach the ground? Did they look the same while falling?",
          studentWork: "Students distinguish the common downward outcome from differences in the way objects fall.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • THE SLOW FALL TRAP",
          scientificKnowledge: "Changing an object's shape can change how its fall looks without changing the fact that it falls toward the ground.",
          exactEvidencePackage: "Release a light tissue/coffee filter. Ask: 'It falls slowly. Does slow mean it is not falling?' Students compare its start and end position.",
          studentWork: "Students revise the idea that falling must be fast or look identical.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Dropped objects fall toward the ground. Different objects or shapes may fall in visibly different ways."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-5",
        lessonNumber: 5,
        title: "Materials for a Classroom Problem",
        ncObjectives: ["PS.K.1.1", "PS.K.1.2"],
        primaryPractice: "Engaging in Argument from Evidence",
        directInstructionContext: "Material suitability depends on tested physical properties and the purpose/criteria.",
        prepare: "Problem: Teddy needs a cover that keeps a small paper bed dry. Groups initially choose from paper towel, wax paper, fabric, craft foam, aluminum foil.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Teddy needs a cover for his little bed so it will not get wet. Your group must choose a material, but be ready to prove why your choice should work.",
          studentActionsBeforeEvidence: "Children inspect available materials, make an initial material choice, and give a reason based on what they currently notice."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • WATER TEST DATA",
          scientificKnowledge: "Materials have physical properties that can be observed or tested.",
          exactEvidencePackage: "Students place one dropper of water on each sample for 30 seconds. Record: water goes through / stays mostly on top / material changes. Use droplet picture icons.",
          studentWork: "Students obtain direct evidence about material response to water and revise initial choices.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • BEND TEST DATA",
          scientificKnowledge: "Different materials respond differently to water and bending, so their properties make them useful for different jobs.",
          exactEvidencePackage: "Wrap each dry sample around a paper cup. Record: bends around cup easily / bends with difficulty / will not hold shape or tears. Use bend-arrow icons.",
          studentWork: "Students add flexibility/formability evidence; 'waterproof' alone is no longer sufficient.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NEW DESIGN CRITERIA",
          scientificKnowledge: "A material is suitable when its tested properties match the specific criteria of the job; there is not one material that is best for every purpose.",
          exactEvidencePackage: "Reveal: Teddy's cover must KEEP WATER OUT AND CURVE OVER THE BED without falling in. Give a two-icon criteria card. Students rank materials using both test records.",
          studentWork: "Students argue from multiple properties and see that the best material depends on the job.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Different materials have different physical properties; materials are selected for uses because their properties help meet the requirements of the job."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-6",
        lessonNumber: 6,
        title: "Design Our Classroom",
        ncObjectives: ["PS.K.2.1", "PS.K.1.2"],
        primaryPractice: "Defining Problems & Designing Solutions",
        directInstructionContext: "Classroom designs must meet user needs; placement and material properties affect function.",
        prepare: "Groups build a mini classroom with blocks, cardstock, fabric, cups, toy people. Initial criteria: a learning area and a place to store materials.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We need to build a classroom where students can learn, get materials, and move around. Your group will build the first version. It does not have to be perfect.",
          studentActionsBeforeEvidence: "Children build an initial mini-classroom and explain one placement/material decision."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • REACH TEST",
          scientificKnowledge: "Where classroom features are placed affects whether people can reach and use them.",
          exactEvidencePackage: "Give a toy student and card: 'The student must reach the supply area without climbing over furniture.' Students physically move the figure from seat to supplies.",
          studentWork: "Students gather access/position evidence and revise placement.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • MATERIAL JOB CARDS",
          scientificKnowledge: "Different classroom jobs may require materials with different physical properties.",
          exactEvidencePackage: "Release two jobs: 'divider must stand up' and 'reading-space cover must bend.' Students test cardstock, fabric, craft stick, foam for each job.",
          studentWork: "Students connect material properties to different classroom functions.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • SAFE PATH CONSTRAINT",
          scientificKnowledge: "A design must meet several criteria at the same time, so testing movement and access can reveal a need to revise.",
          exactEvidencePackage: "Add a taped exit point: 'Everyone must move from learning area to exit without furniture blocking the path.' Groups run three toy people through the model.",
          studentWork: "Students use movement-test evidence to revise a design that previously met only some criteria.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Designers use criteria, relative position, material properties, and test evidence to improve solutions."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-7",
        lessonNumber: 7,
        title: "New Student, New Problem",
        ncObjectives: ["PS.K.2.1", "PS.K.2.2"],
        primaryPractice: "Designing Solutions",
        directInstructionContext: "New constraints can make a previously successful design need revision.",
        prepare: "Start with the group's completed classroom model. Tell students a new classmate will join tomorrow.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Our classroom design worked yesterday, but a new student is joining us. Will the same design still work? Your group must test it.",
          studentActionsBeforeEvidence: "Children begin by predicting whether the existing model needs any change and identify what they would test first."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • NEW USER CARD",
          scientificKnowledge: "A design that worked for one user or condition may not work when the user or condition changes.",
          exactEvidencePackage: "New student uses a wider mobility path represented by a 3-inch-wide card. Slide it through existing routes. Mark where it cannot pass.",
          studentWork: "Students use a concrete user constraint to identify design failure.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • EXIT TEST",
          scientificKnowledge: "Movement paths can be tested to determine whether a design provides safe access.",
          exactEvidencePackage: "Place EXIT card at one edge. All toy students must reach it without crossing through a blocked zone. Students trace paths with yarn.",
          studentWork: "Students analyze movement paths and identify conflicts.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • VISIBILITY CONSTRAINT",
          scientificKnowledge: "Engineers revise a design when new constraints or evidence show that the existing solution no longer meets all needs.",
          exactEvidencePackage: "Reveal: 'The new student must be able to see the demonstration area from the learning spot.' Use a string sight-line test from toy eye level to board.",
          studentWork: "Students balance access, movement, and position rather than treating the first design as final.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Engineers revise designs when new users, constraints, or tests reveal that a solution no longer meets the need."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      }
    ]
  },
  {
    id: "project-2",
    projectNumber: 2,
    title: "A HOME FOR A LIVING THING",
    description: "Investigating living vs. nonliving characteristics, basic needs, animal structures, habitat access, and weather impacts.",
    lessons: [
      {
        id: "lesson-8",
        lessonNumber: 8,
        title: "Alive, Not Alive, or Not Sure Yet?",
        ncObjectives: ["LS.K.1.1"],
        primaryPractice: "Engaging in Argument from Evidence",
        directInstructionContext: "Living organisms are identified using multiple characteristics including structure, growth/change, movement, and basic needs; one superficial clue is not enough.",
        prepare: "Give picture/object cards: seedling, adult plant, puppy, adult dog, rock, toy car, stuffed animal. Students sort LIVING / NOT LIVING / NOT SURE.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Some things here are living, some are not living, and some might be tricky. Your group must sort them, but you may use a NOT SURE group when you need more evidence.",
          studentActionsBeforeEvidence: "Children sort cards/objects and state one reason for at least one choice; uncertainty is explicitly allowed."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • CHANGE OVER TIME",
          scientificKnowledge: "Living organisms show characteristics such as growth/change and basic needs.",
          exactEvidencePackage: "Show dated pairs: seedling Day 1 → larger plant Day 14; puppy → adult dog; rock Day 1 → same-looking rock Day 14; toy car Day 1 → same car. Ask what kind of change appears in the living examples.",
          studentWork: "Students add growth/change over time as evidence and revisit uncertain cards.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • BASIC NEEDS",
          scientificKnowledge: "Living organisms depend on resources from their environment to live and grow.",
          exactEvidencePackage: "Show paired observations: plant with water/light continues growing; same-type plant without water becomes wilted; animal eating/drinking. Card asks: What do these living things need from their environment?",
          studentWork: "Students identify basic needs/resources as another line of evidence.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • MOVEMENT TRAP",
          scientificKnowledge: "Movement alone does not prove that something is living; scientists use multiple characteristics as evidence.",
          exactEvidencePackage: "Demonstrate wind-up/toy car moving and a resting plant not visibly moving. Ask: 'If movement alone were our rule, what mistake would we make?'",
          studentWork: "Students reject a one-clue rule and use multiple characteristics to support living/nonliving claims.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Scientists use multiple characteristics and evidence to reason about living organisms and nonliving things; movement alone is not sufficient evidence."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-9",
        lessonNumber: 9,
        title: "Watch It Change",
        ncObjectives: ["LS.K.1.1"],
        primaryPractice: "Making Observations & Analyzing Data",
        directInstructionContext: "Repeated observations over time reveal growth/change patterns.",
        prepare: "Students observe a class plant/seedling and draw exactly what they see, not what they expect.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We are going to become change detectives. Look at this living thing very carefully today so that later we can prove whether anything changed.",
          studentActionsBeforeEvidence: "Children make a first observation using drawing, pointing, counting, or a simple measurement/marker."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • DAY 1 RECORD",
          scientificKnowledge: "A single observation shows what something is like at one moment.",
          exactEvidencePackage: "Provide dated photo plus student observation: height strip, leaf count dots, drawing. Students compare their own first record to the shared record.",
          studentWork: "Students learn that a dated observation creates evidence that can be compared later.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • LATER RECORD",
          scientificKnowledge: "Repeated observations can show how a living organism grows or changes over time.",
          exactEvidencePackage: "Release a photo/measurement from several days later. Students place Day 1 and Later side by side and circle/draw what changed.",
          studentWork: "Students identify change by comparing evidence across time.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • COMPARISON OBJECT",
          scientificKnowledge: "Comparing records across time helps distinguish biological growth/change from objects that do not show that kind of change.",
          exactEvidencePackage: "Show the same classroom block photographed on both dates. Ask: 'Both were here for several days. Did both show the same kind of change?'",
          studentWork: "Students distinguish biological growth/change evidence from mere passage of time.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Scientists make repeated observations and compare records across time to identify growth and change."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-10",
        lessonNumber: 10,
        title: "What Does It Need?",
        ncObjectives: ["LS.K.1.1"],
        primaryPractice: "Analyzing & Interpreting Data",
        directInstructionContext: "Living things require basic resources; environments must provide appropriate resources.",
        prepare: "Show a habitat model missing key resources. Students decide what they would add and why.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "This living thing has a home, but something may be missing. Your group must decide what it needs in order to live and grow.",
          studentActionsBeforeEvidence: "Children inspect the habitat model, add what they think is needed, and explain their initial reasoning."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • PLANT RESOURCE COMPARISON",
          scientificKnowledge: "Living things need resources from their environment.",
          exactEvidencePackage: "Show same-type seedlings: one with water/light and one without water over several days. Provide simple photo sequence, not a written conclusion.",
          studentWork: "Students infer that access to resources affects living things.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • ANIMAL RESOURCE SCENES",
          scientificKnowledge: "Different living things may obtain resources in different ways, while sharing some basic needs.",
          exactEvidencePackage: "Show bird eating seeds/drinking water and fish obtaining resources in water. Ask what each is getting and where it gets it.",
          studentWork: "Students recognize shared basic needs while noticing resources can be obtained differently.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NEED OR PREFERENCE?",
          scientificKnowledge: "A basic need is required for living or growing; a preference is not.",
          exactEvidencePackage: "Cards: water, food, suitable place/space, decorative sticker/toy crown. Ask which removal would threaten living/growing and which is merely preferred.",
          studentWork: "Students refine the distinction between basic need and optional preference.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Living organisms depend on basic resources from their environments; a need is required for living/growing, not simply something preferred."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-11",
        lessonNumber: 11,
        title: "Body Parts Help Animals",
        ncObjectives: ["LS.K.1.2"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Animal body parts help obtain food/resources, protect, and move.",
        prepare: "Show close-up animal body-part photos without labels. Students ask what each part might help the animal do.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Look closely at these animal body parts. Your group has to figure out: What job might each body part help the animal do?",
          studentActionsBeforeEvidence: "Children match body-part images to possible actions/functions and explain their first ideas."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • GETTING FOOD",
          scientificKnowledge: "Animal body parts can help animals obtain food and other resources.",
          exactEvidencePackage: "Show hummingbird beak reaching nectar / duck bill gathering food / squirrel paws holding food. Pair each with a function-action image.",
          studentWork: "Students connect structures to obtaining food/resources.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • MOVEMENT",
          scientificKnowledge: "Animal body parts can help animals move from place to place.",
          exactEvidencePackage: "Show fish fins in swimming sequence, bird wings in flight, frog legs in jump sequence. Students use a simple body model to imitate the function.",
          studentWork: "Students connect different structures to movement.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • PROTECTION",
          scientificKnowledge: "Animal body parts can also help protect animals; different body parts can serve different functions.",
          exactEvidencePackage: "Show turtle shell, porcupine quills, animal camouflage/body covering examples. Ask: 'Is every body part mainly for moving or eating?'",
          studentWork: "Students expand the model to protection and recognize multiple body-part functions.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Animals use body parts to obtain food/resources, protect themselves, and move from place to place."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-12",
        lessonNumber: 12,
        title: "Can It Move Through Its Home?",
        ncObjectives: ["LS.K.1.2", "PS.K.2.1", "PS.K.2.2"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Habitat arrangement affects movement and access to resources.",
        prepare: "Groups build a simple habitat route for an animal model from shelter to food/water.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Our animal has food and water in its home. But can it actually get to them? Build a path and test your idea with the animal model.",
          studentActionsBeforeEvidence: "Children create and physically test an initial route from shelter to resources."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • HOW THIS ANIMAL MOVES",
          scientificKnowledge: "Animals use their body structures to move in particular ways.",
          exactEvidencePackage: "Release a 3-image movement sequence for the selected animal (crawl/hop/walk/swim representation). Students reproduce the motion with the model.",
          studentWork: "Students use organism movement evidence rather than assuming all animals move the same way.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • RESOURCE POSITION",
          scientificKnowledge: "Where resources are located affects whether an animal can reach them.",
          exactEvidencePackage: "Card: food is BESIDE shelter; water is BEHIND barrier. Students place icons exactly and describe positions to a partner.",
          studentWork: "Students connect relative position to resource access.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • BLOCKED ACCESS TEST",
          scientificKnowledge: "A habitat must not only contain needed resources; the organism must be able to access them.",
          exactEvidencePackage: "Add an obstacle too narrow/high for the model's movement. Ask: 'The habitat has food. Does that mean the animal can get it?'",
          studentWork: "Students revise the habitat based on actual movement/access evidence.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "A useful habitat provides needed resources in positions the organism can access using its body and movement."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-13",
        lessonNumber: 13,
        title: "Rain Comes to the Habitat",
        ncObjectives: ["ESS.K.1.1", "PS.K.1.2"],
        primaryPractice: "Analyzing Data & Designing Solutions",
        directInstructionContext: "Weather changes environmental conditions; material properties influence shelter performance.",
        prepare: "Tell groups rain is coming to their habitat. They predict what may change.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Rain is coming to our animal's home. What might change? Your group must decide what needs protection before we test the rain.",
          studentActionsBeforeEvidence: "Children predict environmental/design changes and identify one feature they would protect or change."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • BEFORE / AFTER RAIN",
          scientificKnowledge: "Weather can cause observable changes in an environment.",
          exactEvidencePackage: "Show same outdoor spot before rain and after rain: dry soil → wet soil/puddle, dry surface → wet surface. Students identify only changes supported by images.",
          studentWork: "Students link weather condition to observable environmental change.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • SHELTER MATERIAL TEST",
          scientificKnowledge: "Materials respond differently to weather conditions such as water, and those properties affect shelter performance.",
          exactEvidencePackage: "Test paper, foil, fabric, and craft foam with equal drops of water. Students record wet-through / stayed drier / changed shape.",
          studentWork: "Students obtain property evidence relevant to shelter choice.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • ACCESS STILL MATTERS",
          scientificKnowledge: "A useful shelter must balance weather protection with the organism's other needs, such as access and movement.",
          exactEvidencePackage: "Reveal: shelter must keep the organism drier BUT the entrance cannot be sealed. Add animal model and run access test after revision.",
          studentWork: "Students balance weather protection with organism access rather than optimizing one criterion only.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Weather can change the environment; tested material properties help designers adapt shelters while maintaining organism needs."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-14",
        lessonNumber: 14,
        title: "Habitat Design Review",
        ncObjectives: ["LS.K.1.1", "LS.K.1.2", "PS.K.1.2"],
        primaryPractice: "Engaging in Argument from Evidence",
        directInstructionContext: "Strong design claims connect habitat features to organism needs/functions using multiple evidence sources.",
        prepare: "Each group claims: 'Our habitat works for __ because __.' Do not let them present yet.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Your group says your habitat works. Today your job is to prove it. Show us how the habitat helps the animal live there.",
          studentActionsBeforeEvidence: "Children choose model features they believe are evidence and prepare an initial claim."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • NEED CHECK",
          scientificKnowledge: "A habitat must provide resources that meet an organism's basic needs.",
          exactEvidencePackage: "Give checklist icons: water, food/resource, suitable space/shelter. Students point to the exact model feature that meets each relevant need and cite prior observation.",
          studentWork: "Students test whether design claims actually address basic needs.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • BODY-PART / MOVEMENT CHECK",
          scientificKnowledge: "A habitat's arrangement must work with the animal's body and movement.",
          exactEvidencePackage: "Give selected animal's movement/body-part card. Students physically test whether the model animal can reach each resource.",
          studentWork: "Students add structure/function and movement evidence.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • WEATHER CHECK",
          scientificKnowledge: "A strong habitat design is supported by multiple kinds of evidence, including needs, access, and environmental/material evidence.",
          exactEvidencePackage: "Apply a small simulated rain/wind condition using the previously tested method. Students compare before/after and identify one revision if needed.",
          studentWork: "Students integrate material/weather evidence into the final argument.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "A habitat design is supported by evidence when its features demonstrably meet organism needs, movement/access, and relevant environmental conditions."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      }
    ]
  },
  {
    id: "project-3",
    projectNumber: 3,
    title: "ANIMAL PROBLEM SOLVERS",
    description: "Analyzing animal individual variations, structural movement, feeding tools, biomimicry, and argument from evidence.",
    lessons: [
      {
        id: "lesson-15",
        lessonNumber: 15,
        title: "Same Kind, Not Exactly the Same",
        ncObjectives: ["LS.K.2.1"],
        primaryPractice: "Analyzing & Interpreting Data",
        directInstructionContext: "Same-type animals share characteristics and also vary individually.",
        prepare: "Give four photographs of the same animal type with visible individual differences. Students sort SAME / DIFFERENT observations.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "These animals are the same kind, but they do not look exactly the same. Your group must find what is the same and what is different.",
          studentActionsBeforeEvidence: "Children inspect multiple individuals and create a visual SAME/DIFFERENT representation."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • WHAT THEY SHARE",
          scientificKnowledge: "Individuals of the same kind of animal share important characteristics.",
          exactEvidencePackage: "Provide body-feature icons matching all four animals: same basic body parts/overall structure. Students place shared-feature markers.",
          studentWork: "Students identify similarities across individuals.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • INDIVIDUAL DIFFERENCES",
          scientificKnowledge: "Individuals of the same kind of animal can also differ in observable characteristics such as size, color, or pattern.",
          exactEvidencePackage: "Provide simple data/picture comparisons for color/pattern/size. Students mark which individuals differ.",
          studentWork: "Students identify variation within the same type.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • EXTREME-LOOKING INDIVIDUAL",
          scientificKnowledge: "A visible individual difference does not automatically mean two animals are different kinds.",
          exactEvidencePackage: "Add one individual with unusual color/size but same defining structures. Ask whether appearance difference alone makes it a different animal type.",
          studentWork: "Students revise overreliance on one visible difference.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Individuals of the same animal type have similarities and observable differences; data can show both."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-16",
        lessonNumber: 16,
        title: "Feet, Wings, Fins, and More",
        ncObjectives: ["LS.K.1.2", "PS.K.2.2"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Animal structures support different movement patterns in different environments.",
        prepare: "Show movement clips/image sequences without naming the body part function. Students notice and imitate motion.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Watch how these animals move. Your group must figure out which body parts are helping them move and how.",
          studentActionsBeforeEvidence: "Children imitate/represent movement and connect an observed structure to an initial movement idea."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • LEGS / FEET",
          scientificKnowledge: "Legs and feet can support forms of land movement such as walking, running, or hopping.",
          exactEvidencePackage: "Image sequences: rabbit hopping, horse walking/running. Students point to structures changing position during movement.",
          studentWork: "Students connect legs/feet to land movement.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • WINGS / FINS",
          scientificKnowledge: "Wings, fins, and other structures support movement in different environments.",
          exactEvidencePackage: "Image sequences: bird flying, fish swimming. Students compare the structures used and environment moved through.",
          studentWork: "Students expand structure-function relationships across environments.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • SAME GOAL, DIFFERENT STRUCTURE",
          scientificKnowledge: "Different structures can sometimes accomplish similar movement functions.",
          exactEvidencePackage: "Show bird and butterfly both moving through air, or fish and dolphin moving through water, with visibly different structures. Ask whether one structure is the only possible solution.",
          studentWork: "Students see multiple structures can support related movement functions.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Different animal body structures support movement; more than one structural solution can serve a similar movement function."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-17",
        lessonNumber: 17,
        title: "Getting Food",
        ncObjectives: ["LS.K.1.2"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Structure usefulness depends on the resource and action required.",
        prepare: "Provide model 'beaks/tools' such as spoon, clothespin, straw/dropper and pretend foods such as pom-poms, beads, water.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "These pretend foods are hard to pick up. Your group must choose a tool that you think will work best and test your idea.",
          studentActionsBeforeEvidence: "Children select a model tool, predict, and conduct an initial attempt before comparative evidence is released."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • TOOL TEST A",
          scientificKnowledge: "A body structure can be more useful for obtaining one kind of resource than another.",
          exactEvidencePackage: "Students use each tool to pick up the same dry 'food' for 20 seconds and count successful pickups.",
          studentWork: "Students obtain comparative function data.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • CHANGE THE RESOURCE",
          scientificKnowledge: "When the resource changes, a different structure or action may work better.",
          exactEvidencePackage: "Switch to a different resource such as water or narrow-container food. Repeat the same tools. Results change.",
          studentWork: "Students see a structure useful for one resource may not be best for another.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • REAL ANIMAL CONNECTION",
          scientificKnowledge: "Models can help explain structure-function relationships, but a model is not identical to the real animal structure.",
          exactEvidencePackage: "Show a curated animal image whose beak/mouth/paws function resembles one tested action. Card asks: What does our model help explain? What is different from the real animal?",
          studentWork: "Students connect model evidence to real structure/function while recognizing model limits.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Animal structures help obtain resources in ways related to the resource and action required; models can represent these functions."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-18",
        lessonNumber: 18,
        title: "Protection Challenge",
        ncObjectives: ["LS.K.1.2", "PS.K.1.2"],
        primaryPractice: "Designing Solutions & Argument from Evidence",
        directInstructionContext: "Protective designs depend on material properties and may involve trade-offs with movement.",
        prepare: "Students cover a toy animal/egg-shaped model using foil, fabric, foam, paper, or craft materials.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Our animal needs protection, but it still needs to move. Build a first protective covering that you think can do both.",
          studentActionsBeforeEvidence: "Children make a first prototype and state which material/property they think will help."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • PROTECTION TEST",
          scientificKnowledge: "Protective structures or materials work because of their physical properties.",
          exactEvidencePackage: "Use a standardized gentle 'rain' or falling pom-pom impact test. Students record whether the model remains dry/covered/protected.",
          studentWork: "Students obtain direct performance evidence.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • MOVEMENT TEST",
          scientificKnowledge: "A protective solution can affect another function, such as movement.",
          exactEvidencePackage: "After covering, model must pass through a fixed-width opening or move its limb/appendage. Students record pass/cannot pass or moves/cannot move.",
          studentWork: "Students discover protection can interfere with movement.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • TRADE-OFF CARD",
          scientificKnowledge: "The best overall solution may require balancing more than one criterion rather than maximizing only protection.",
          exactEvidencePackage: "Reveal criteria: 'Protect the body AND still allow movement through the opening.' Students compare both data columns before revising.",
          studentWork: "Students choose using multiple criteria rather than one strongest property.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Useful protective solutions match properties to multiple functions; a design may need to balance protection and movement."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-19",
        lessonNumber: 19,
        title: "Movement Course",
        ncObjectives: ["PS.K.2.1", "PS.K.2.2"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Clear models communicate movement paths and relative positions.",
        prepare: "Groups build a route with blocks and arrows for an animal model.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Another group must be able to move the animal through your course without you showing them. Build a route and think about how you will communicate it.",
          studentActionsBeforeEvidence: "Children build an initial route/model and try giving a partner directions."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • REQUIRED MOVEMENT",
          scientificKnowledge: "Movement paths can be represented in a model.",
          exactEvidencePackage: "Release movement card: straight then zigzag, or back-and-forth around a feature. Students revise route to include the represented motion.",
          studentWork: "Students encode movement type into a model.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • POSITION DIRECTIONS",
          scientificKnowledge: "Relative-position words can communicate where a mover should go in relation to reference objects.",
          exactEvidencePackage: "Give a direction card: go BETWEEN blocks, UNDER bridge, BESIDE pond. Partner follows without seeing original plan.",
          studentWork: "Students test whether relative-position language communicates the route.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • AMBIGUOUS MESSAGE",
          scientificKnowledge: "A spatial direction is clearer when the reference object is identified.",
          exactEvidencePackage: "Give only 'go beside it' with two possible reference objects. Partner intentionally chooses either. Ask what information is missing.",
          studentWork: "Students identify need for a clear reference object.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Movement paths and relative positions can be represented in models and communicated precisely using reference objects."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-20",
        lessonNumber: 20,
        title: "Animal-Inspired Design",
        ncObjectives: ["LS.K.1.2", "PS.K.1.2"],
        primaryPractice: "Defining Problems & Designing Solutions",
        directInstructionContext: "Animal structures can inspire designs when designers transfer function, not merely appearance.",
        prepare: "Choose problem: pick up tiny objects, move through water, protect something, grip a surface. Students sketch an animal-inspired first idea.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Animals solve problems with their body parts. Your group will use one animal idea to solve a problem for people. First decide what the animal part actually helps the animal do.",
          studentActionsBeforeEvidence: "Children select a problem/animal inspiration and sketch or build an initial function-based idea."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • STRUCTURE-FUNCTION CLOSE-UP",
          scientificKnowledge: "Animal structures have functions that can inspire solutions to human problems.",
          exactEvidencePackage: "Show selected animal structure in action in 2–3 sequential images. Students state what the structure DOES, not what it looks like.",
          studentWork: "Students identify transferable function.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • MATERIAL OPTIONS",
          scientificKnowledge: "A material should be selected because its properties help reproduce the needed function, not just the animal's appearance.",
          exactEvidencePackage: "Provide 3 materials with prior property cards (flexible/stiff, smooth/rough, water response). Students select properties needed to imitate the function.",
          studentWork: "Students connect function to material choice.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • FUNCTION TEST",
          scientificKnowledge: "An animal-inspired design must be tested to determine whether the transferred function actually solves the new problem.",
          exactEvidencePackage: "Use a standardized task matching the human problem. A visually animal-like prototype that fails the function provides counterevidence.",
          studentWork: "Students revise toward functional performance rather than decorative resemblance.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Bio-inspired design transfers a useful function from an observed biological structure and tests whether the new solution meets its own criteria."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-21",
        lessonNumber: 21,
        title: "Evidence Expo",
        ncObjectives: ["LS.K.2.1", "LS.K.1.2"],
        primaryPractice: "Communicating Information & Argument from Evidence",
        directInstructionContext: "Relevant evidence supports claims; explanations can strengthen through additional evidence and transfer.",
        prepare: "Students choose one claim about animal similarity/difference or body-part function and one artifact.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "You have done a lot of animal science. Choose one idea you believe is true and one piece of work that helps prove it.",
          studentActionsBeforeEvidence: "Children select a claim and artifact, then practice a short oral/model-based explanation."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • PEER QUESTION",
          scientificKnowledge: "Evidence is useful when it directly supports the claim being made.",
          exactEvidencePackage: "Peer uses card: 'How does that show your idea?' Presenter must point to a specific feature/data/result.",
          studentWork: "Students distinguish showing an artifact from explaining evidence.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • SECOND SOURCE",
          scientificKnowledge: "A second relevant source of evidence can strengthen, extend, or challenge an explanation.",
          exactEvidencePackage: "Facilitator gives a second relevant animal image/data point. Students decide whether it supports, adds to, or challenges the claim.",
          studentWork: "Students integrate more than one source.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NEW ANIMAL CASE",
          scientificKnowledge: "Scientific reasoning should transfer to a new case, not only a familiar example.",
          exactEvidencePackage: "Show a new animal with an analogous/different structure. Students apply the same reasoning without rehearsed materials.",
          studentWork: "Students demonstrate transfer of structure/function or variation reasoning.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Scientific communication links a claim to relevant evidence and can be revised or extended when new evidence appears."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      }
    ]
  },
  {
    id: "project-4",
    projectNumber: 4,
    title: "WEATHER-READY SCHOOL",
    description: "Investigating weather patterns, environmental changes, seasonal dynamics, weather-resistant materials, and engineering solutions.",
    lessons: [
      {
        id: "lesson-22",
        lessonNumber: 22,
        title: "What Has Our Weather Been Doing?",
        ncObjectives: ["ESS.K.1.2"],
        primaryPractice: "Using Mathematics & Analyzing Data",
        directInstructionContext: "Organized daily weather observations reveal patterns and changes; patterns do not mean every day is identical.",
        prepare: "Spread several weeks of the class's accumulated weather icons/photos. Students notice without being told the pattern.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We have been collecting weather information for many days. Your group must figure out what our weather has been doing without me telling you the pattern.",
          studentActionsBeforeEvidence: "Children sort/count accumulated weather records and make an initial pattern statement."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • SORT AND COUNT",
          scientificKnowledge: "Daily weather observations can be organized into categories and counted.",
          exactEvidencePackage: "Groups sort 10–14 dated weather icons into categories and physically count each category using cubes.",
          studentWork: "Students transform observations into simple count data.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • COMPARE TWO PERIODS",
          scientificKnowledge: "Comparing weather counts across time helps reveal changes and patterns.",
          exactEvidencePackage: "Give two week/month strips with counts. Students use more/less/same cards to compare sunny/rainy/cloudy/windy observations.",
          studentWork: "Students identify changes/patterns across periods.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • EXCEPTION DAY",
          scientificKnowledge: "A weather pattern describes what is common or repeated; it does not mean every day must be the same.",
          exactEvidencePackage: "Add a weather day that differs from the most common pattern. Ask whether one exception erases the pattern or whether 'pattern' means 'every day.'",
          studentWork: "Students refine pattern language and avoid absolute claims.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Daily weather changes; counting and comparing repeated observations helps describe patterns over time, and patterns can include exceptions."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-23",
        lessonNumber: 23,
        title: "Weather Changes Our Place",
        ncObjectives: ["ESS.K.1.1"],
        primaryPractice: "Making Observations & Analyzing Data",
        directInstructionContext: "Weather can cause observable environmental changes; not every change is caused by weather.",
        prepare: "Show two photos of the same schoolyard location taken under different conditions.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "These are pictures of the same place at school on different days. Your group must find what changed and decide what might have caused the change.",
          studentActionsBeforeEvidence: "Children compare images, mark visible differences, and make a tentative cause claim."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • BEFORE / AFTER RAIN",
          scientificKnowledge: "Weather conditions can cause observable changes in the environment.",
          exactEvidencePackage: "Photo pair: dry pavement/soil before rain; wet pavement/puddle after rain. Students mark observed changes only.",
          studentWork: "Students identify evidence-supported environmental changes associated with rain.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • WIND OBSERVATION",
          scientificKnowledge: "Different weather conditions can produce different kinds of environmental change.",
          exactEvidencePackage: "Photo/video sequence: still flag/leaves versus moving flag/leaves during wind. Students describe what changed in the environment.",
          studentWork: "Students connect another weather condition to observable change.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NOT WEATHER",
          scientificKnowledge: "Not every environmental difference is caused by weather; scientists use evidence to evaluate likely causes.",
          exactEvidencePackage: "Add before/after photo where a chair/trash can was moved by a person. Tell students a custodian moved it. Ask whether every difference between photos is weather evidence.",
          studentWork: "Students learn to evaluate cause rather than attribute all changes to weather.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Weather conditions can produce observable changes in the environment; scientists compare evidence and consider whether weather is actually the cause."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-24",
        lessonNumber: 24,
        title: "Season Detectives",
        ncObjectives: ["ESS.K.1.3"],
        primaryPractice: "Obtaining, Evaluating & Communicating Information",
        directInstructionContext: "Seasonal patterns are supported by repeated weather information and allow exceptions.",
        prepare: "Give class photo/data folders from two seasons without labels. Students compare.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "These weather records came from different times of the year. Your group must become season detectives and find patterns that could help identify the seasons.",
          studentActionsBeforeEvidence: "Children compare seasonal data/photo sets and make an initial evidence-based guess."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • FREQUENCY COMPARISON",
          scientificKnowledge: "Seasonal weather patterns are identified from repeated observations over time.",
          exactEvidencePackage: "Provide icon counts from two seasonal periods, e.g., more hot/warm observations in one, more cool/cold in another, based on class records.",
          studentWork: "Students identify a repeated seasonal difference from data.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • SECOND INFORMATION SOURCE",
          scientificKnowledge: "More than one source of information can support a seasonal comparison.",
          exactEvidencePackage: "Add schoolyard/clothing/daylight-related visual evidence appropriate to the local season records. Students decide whether it supports the emerging pattern.",
          studentWork: "Students obtain/evaluate multiple information sources.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • UNUSUAL DAY",
          scientificKnowledge: "Seasonal patterns describe what is common, not what always happens; unusual days can occur.",
          exactEvidencePackage: "Show one unusually warm/cool day within the opposite seasonal pattern. Ask students to revise any 'always' statement.",
          studentWork: "Students communicate seasonal patterns using 'often/more common' rather than absolute rules.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Weather patterns can be compared from season to season using repeated observations and information; a pattern is common, not guaranteed every day."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-25",
        lessonNumber: 25,
        title: "Which Materials Handle Weather?",
        ncObjectives: ["PS.K.1.1", "PS.K.1.2"],
        primaryPractice: "Planning Investigations & Argument from Evidence",
        directInstructionContext: "Material choice for weather problems depends on tested properties and purpose.",
        prepare: "Problem: choose a material for a small outdoor sign/cover. Initial choices are made before tests.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We need a material that can handle weather outside. Your group must choose one now, but later you will have to test whether your choice really works.",
          studentActionsBeforeEvidence: "Children inspect materials, make an initial choice for a stated job, and explain what property they are relying on."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • WATER RESPONSE TABLE",
          scientificKnowledge: "Materials differ in how they respond to weather-related conditions such as water and wind.",
          exactEvidencePackage: "Students test equal-size paper, foil, fabric, plastic sheet with equal water drops. Record soak-through/beading/shape change with icons.",
          studentWork: "Students obtain comparable water-response data.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • WIND / FLEX TEST",
          scientificKnowledge: "A material's physical properties make it more or less useful for a particular weather-related job.",
          exactEvidencePackage: "Use same fan setting at same distance; observe whether each sample flaps, bends, tears, or stays in place when clipped the same way.",
          studentWork: "Students add movement/flexibility/strength evidence relevant to weather.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • CHANGE THE JOB",
          scientificKnowledge: "The same material can be a strong choice for one job and a weak choice for another because the criteria are different.",
          exactEvidencePackage: "Reveal two different jobs: flexible rain cover versus stiff outdoor sign backing. Students must choose separately using the same data.",
          studentWork: "Students see that no material is simply 'best'; suitability depends on job criteria.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Physical properties make materials more or less suitable for particular weather-related uses."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-26",
        lessonNumber: 26,
        title: "Wind and Movement",
        ncObjectives: ["PS.K.2.2", "ESS.K.1.1"],
        primaryPractice: "Planning & Carrying Out Investigations",
        directInstructionContext: "Moving air changes motion; object characteristics/design can change observed movement.",
        prepare: "Students place paper strip/pom-pom/card near a fan before it is turned on and predict movement.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "What will moving air do to these objects? Your group must predict which will move more, less, or differently before we turn on the fan.",
          studentActionsBeforeEvidence: "Children order/predict object responses and explain the basis for their prediction."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • SAME WIND, DIFFERENT OBJECTS",
          scientificKnowledge: "Moving air can change the motion of objects.",
          exactEvidencePackage: "At fixed fan setting/distance, test tissue strip, index card, pom-pom. Mark moved a lot / some / little.",
          studentWork: "Students observe different motion responses under the same weather-like condition.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • SAME MATERIAL, DIFFERENT SHAPE",
          scientificKnowledge: "Different objects or shapes can respond differently under the same moving-air condition.",
          exactEvidencePackage: "Test flat paper and same-size paper crumpled/rolled under same fan condition.",
          studentWork: "Students see design/shape can change motion response even when material is the same.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • SECURED VERSION",
          scientificKnowledge: "Changing an object's shape or how it is secured can change its motion even when the wind condition stays the same.",
          exactEvidencePackage: "Clip one edge of the previously moving paper and retest. Ask what changed: wind or object setup?",
          studentWork: "Students isolate a changed condition and use evidence to explain different motion.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Wind can affect object motion, and object characteristics or how an object is arranged can change the motion observed."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-27",
        lessonNumber: 27,
        title: "Design a Weather-Ready Solution",
        ncObjectives: ["ESS.K.1.1", "PS.K.1.2", "PS.K.2.1"],
        primaryPractice: "Defining Problems & Designing Solutions",
        directInstructionContext: "Weather-ready designs connect a real weather need to material and placement evidence.",
        prepare: "Groups choose one school problem: wet waiting area, wind-blown papers, puddle near path, shade/rain cover model.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Our school has a weather problem. Your group must build a first solution using what you already know from our weather and material investigations.",
          studentActionsBeforeEvidence: "Children define the selected problem in their own words and create an initial prototype/plan."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • OUR WEATHER DATA",
          scientificKnowledge: "A useful engineering problem is defined from evidence about a real need or condition.",
          exactEvidencePackage: "Give a relevant slice of class weather/environment records showing the problem condition has occurred. Students identify the specific need.",
          studentWork: "Students define a problem from local evidence rather than imagination alone.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • MATERIAL TEST RECORDS",
          scientificKnowledge: "Material-test evidence can guide which materials are selected for a solution.",
          exactEvidencePackage: "Return prior water/wind/property data cards. Students must cite at least one result in choosing prototype material.",
          studentWork: "Students reuse scientific evidence in design.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • LOCATION / ACCESS CARD",
          scientificKnowledge: "Where a solution is placed is part of the design; placement must meet access and position constraints.",
          exactEvidencePackage: "Reveal a placement constraint: must be BESIDE entrance but NOT block path; or ABOVE area while leaving route open. Test with toy people.",
          studentWork: "Students integrate spatial criteria and revise.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Engineering solutions should be based on evidence about the problem, relevant material properties, and where/how the solution must function."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-28",
        lessonNumber: 28,
        title: "Weather Preparedness Showcase",
        ncObjectives: ["ESS.K.1.1", "ESS.K.1.2", "ESS.K.1.3"],
        primaryPractice: "Communicating Information & Argument",
        directInstructionContext: "Design arguments need both evidence that the weather need exists and evidence the solution works.",
        prepare: "Groups state: 'Our solution helps when __.'",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Your weather-ready solution is finished. Now you must convince another group that the problem is real AND that your solution can help.",
          studentActionsBeforeEvidence: "Children choose initial weather evidence and prototype evidence for a presentation."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • PATTERN PROOF",
          scientificKnowledge: "Weather-pattern evidence can explain why a preparedness solution is needed.",
          exactEvidencePackage: "Students select one class weather graph/season comparison that shows when the problem is likely/relevant.",
          studentWork: "Students support why the design is needed.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • PERFORMANCE PROOF",
          scientificKnowledge: "Prototype-test evidence can show whether the solution works.",
          exactEvidencePackage: "Students select or repeat one prototype test and report the observable result.",
          studentWork: "Students support whether the design works.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • DIFFERENT-SEASON SCENARIO",
          scientificKnowledge: "A solution may work under some weather or seasonal conditions but need revision under others.",
          exactEvidencePackage: "Give a contrasting weather/season card. Ask: 'Would your design still be useful? Would anything need to change?'",
          studentWork: "Students identify conditions/limits and transfer seasonal reasoning.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "A strong weather-design explanation connects weather pattern evidence, environmental need, and prototype performance evidence."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      }
    ]
  },
  {
    id: "project-5",
    projectNumber: 5,
    title: "OUR LIVING LEARNING PLACE",
    description: "Designing a living learning space, analyzing plant variations, integrating living and nonliving components, spatial placement, light/water needs, and final transfer showcase.",
    lessons: [
      {
        id: "lesson-29",
        lessonNumber: 29,
        title: "Plants: Same Kind, Different Individuals",
        ncObjectives: ["LS.K.2.2"],
        primaryPractice: "Analyzing & Interpreting Data",
        directInstructionContext: "Same-type plants share characteristics and also show individual variation.",
        prepare: "Give 4–5 real seedlings/photos of the same plant type. Students make a SAME / DIFFERENT chart using drawings/icons.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "These plants are the same kind, but they are not identical. Your group must find what they share and what is different about each plant.",
          studentActionsBeforeEvidence: "Children observe several same-type plants and make an initial SAME/DIFFERENT representation."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • SHARED STRUCTURES",
          scientificKnowledge: "Plants of the same kind share important structures and characteristics.",
          exactEvidencePackage: "Close-up cards show all individuals with roots/stem/leaves appropriate to the plant. Students mark features seen across the set.",
          studentWork: "Students identify similarities.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • INDIVIDUAL DATA",
          scientificKnowledge: "Individual plants of the same kind can differ in observable characteristics such as height, leaf number, size, or color.",
          exactEvidencePackage: "Give simple leaf-count/height-strip or visual color/shape comparisons for each plant. Students compare individuals.",
          studentWork: "Students identify observable differences within the same type.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • UNUSUAL INDIVIDUAL",
          scientificKnowledge: "One individual difference does not automatically make a plant a different kind.",
          exactEvidencePackage: "Add one shorter/taller/differently colored individual of the same type. Ask whether one difference changes its type.",
          studentWork: "Students avoid classifying plant type from one variable characteristic.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Individuals of the same plant type share characteristics and also differ in observable ways."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-30",
        lessonNumber: 30,
        title: "What Belongs in Our Living Place?",
        ncObjectives: ["LS.K.1.1", "PS.K.1.1"],
        primaryPractice: "Defining Problems & Analyzing Evidence",
        directInstructionContext: "Living places include living organisms and useful nonliving resources/materials that support needs.",
        prepare: "Give candidate cards: plant, worm/bird image, water, soil, rock, plastic decoration, shade material, food/resource, toy.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We are designing a living place at school. Your group must decide what belongs there and what does not. Be ready to explain what job each chosen thing has.",
          studentActionsBeforeEvidence: "Children select living/nonliving components and connect each selected item to an initial purpose."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • NEED CONNECTIONS",
          scientificKnowledge: "Living things depend on resources in their environment.",
          exactEvidencePackage: "Give living-thing need cards from Project 2. Students connect each proposed organism to resources it needs in the designed place.",
          studentWork: "Students choose components based on needs.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • NONLIVING JOBS",
          scientificKnowledge: "Nonliving materials and resources can perform important functions that support living things.",
          exactEvidencePackage: "Give property/function cards: soil holds plant/root area, water provides resource, rock can create boundary, shade material blocks/changes exposure. Students test/observe simple examples where possible.",
          studentWork: "Students see nonliving components can have essential functions.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • REMOVE ONE",
          scientificKnowledge: "Nonliving does not mean unimportant; an essential nonliving component can be necessary for a living system or design.",
          exactEvidencePackage: "Facilitator removes one nonliving but essential resource/component and asks what consequence follows; then removes a decorative item for comparison.",
          studentWork: "Students distinguish nonliving from unimportant.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Living things depend on environments containing needed resources, including important nonliving components; material choices can serve specific functions."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-31",
        lessonNumber: 31,
        title: "Where Should Everything Go?",
        ncObjectives: ["PS.K.2.1"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Relative position choices affect function and can be communicated in models.",
        prepare: "Groups place plant area, water/resource area, path, shelter/shade, seating/observation spot on a base map.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We have all the parts for our living place, but where should each part go? Your group must arrange the model so the place can actually work.",
          studentActionsBeforeEvidence: "Children place features on a base model and explain initial spatial relationships."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • ACCESS RELATIONSHIPS",
          scientificKnowledge: "Relative position affects how features in a designed place function together.",
          exactEvidencePackage: "Card: observation spot must be BESIDE path; water source must be NEAR/BESIDE plant area but not ON TOP OF path. Students revise model.",
          studentWork: "Students use relative positions to meet function.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • PARTNER REBUILD",
          scientificKnowledge: "Clear position language allows another person to interpret or reconstruct a model.",
          exactEvidencePackage: "Partner gets only oral directions using position words and loose feature cards. Compare rebuilt model to original.",
          studentWork: "Students test whether spatial language communicates the design.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NEW PLACEMENT CONSTRAINT",
          scientificKnowledge: "A design may need several position relationships to be true at the same time.",
          exactEvidencePackage: "Add a constraint: shelter must be BEHIND plants and IN FRONT OF exit wall. Test if all position rules can be satisfied.",
          studentWork: "Students adjust model layout until multiple spatial constraints are met.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Relative position words precisely describe spatial relationships; good layout designs satisfy multiple position constraints simultaneously."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-32",
        lessonNumber: 32,
        title: "Light & Water for Living Things",
        ncObjectives: ["LS.K.1.1", "ESS.K.1.1"],
        primaryPractice: "Planning & Carrying Out Investigations",
        directInstructionContext: "Living plants require light and water from their environment to survive and grow.",
        prepare: "Show 4 small class plants under different conditions: sun + water, sun + no water, shade + water, shade + no water.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "We have four plants in different spots. Your group must figure out which spot gives plants what they need to stay healthy.",
          studentActionsBeforeEvidence: "Children predict which plant condition will grow best and record their predictions on a grid."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • WATER CONDITION DATA",
          scientificKnowledge: "Water is an essential basic need for plants.",
          exactEvidencePackage: "Provide 7-day photo cards comparing watered vs non-watered seedlings. Students sort by healthy vs wilted.",
          studentWork: "Students connect water presence directly to plant condition.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • SUNLIGHT CONDITION DATA",
          scientificKnowledge: "Sunlight is an essential environmental resource for plant growth.",
          exactEvidencePackage: "Provide 7-day photo cards comparing sunny location vs dark box location. Both receive water.",
          studentWork: "Students identify light as another essential requirement alongside water.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • COMBINED RESOURCE MATRIX",
          scientificKnowledge: "Plants require BOTH sunlight and water simultaneously; one resource alone is insufficient.",
          exactEvidencePackage: "Show 2x2 grid data matrix of all 4 conditions. Ask: Which condition is the ONLY one where plants thrive?",
          studentWork: "Students conclude that basic needs work together and all essential resources must be present.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Plants need both sunlight and water to grow and stay healthy; lacking either resource restricts growth."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-33",
        lessonNumber: 33,
        title: "Weather Protection for Our Place",
        ncObjectives: ["ESS.K.1.1", "PS.K.1.2"],
        primaryPractice: "Designing Solutions",
        directInstructionContext: "Structures can protect living things and learning areas from harsh weather like heavy rain or strong sun.",
        prepare: "Provide mini building materials (foil, clear plastic, fabric, cardstock, sticks, clay) and a outdoor model bed.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Strong sun and heavy rain come to our living learning place. Build a cover structure that keeps plants and seating safe.",
          studentActionsBeforeEvidence: "Children sketch or assemble a prototype roof/shade structure for the garden model."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • SHADE TEST",
          scientificKnowledge: "Opaque or tinted materials block intense sunlight and create cooler shade areas.",
          exactEvidencePackage: "Hold flashlights/heat lamp over fabric, cardstock, and clear plastic. Measure shadow quality and surface warmth.",
          studentWork: "Students select shade materials based on tested light-blocking properties.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • RAIN WATERPROOF TEST",
          scientificKnowledge: "Waterproof materials prevent water from dripping onto protected areas underneath.",
          exactEvidencePackage: "Use a water spray bottle over each roof prototype. Check paper indicator beneath for wet spots.",
          studentWork: "Students modify roof angle or material choice to shed water effectively.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • LIGHT FOR PLANTS CONSTRAINT",
          scientificKnowledge: "Protective covers must not block ALL sunlight if living plants are located underneath.",
          exactEvidencePackage: "Reveal constraint card: 'Plants still need sunlight!' Show that total black-out roof starves plants.",
          studentWork: "Students redesign cover to allow partial light/sunlight access while shielding excessive heat/rain.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Weather protection structures balance multiple criteria: blocking heavy rain and harsh sun while allowing sufficient light for living plants."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-34",
        lessonNumber: 34,
        title: "Animal Visitors & Structures",
        ncObjectives: ["LS.K.1.2", "LS.K.2.1"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Animals use specific body structures to interact with garden habitats (birds, insects, worms).",
        prepare: "Provide cards of garden animal visitors: earthworm, honeybee, songbird, ladybug, squirrel.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Animals will visit our living learning place! Your group must design features that help helpful animal visitors.",
          studentActionsBeforeEvidence: "Children choose one animal visitor and sketch a feature (bird bath, bug hotel, soil box) to welcome it."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • ANIMAL BODY STRUCTURE CARDS",
          scientificKnowledge: "Animal body parts (wings, beaks, legs, mouthparts) dictate how they interact with plants.",
          exactEvidencePackage: "Show bee probe mouthpiece for nectar, bird beak for seeds, worm segment body for burrowing.",
          studentWork: "Students match physical features of animals to garden habitat resources.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • HABITAT FEATURE MATCH",
          scientificKnowledge: "Different animals require distinct structural features in their environment.",
          exactEvidencePackage: "Provide feature options: shallow water dish with stones, hollow tubes, loose moist soil, seed tray.",
          studentWork: "Students assign specific habitat structures to corresponding animal body structures.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • SAFETY & PROTECTION CHECK",
          scientificKnowledge: "Animal habitat features must protect visitors from predators and harsh weather.",
          exactEvidencePackage: "Test if bird feeder is placed too low (cat risk) or if bug hotel gets flooded in rain.",
          studentWork: "Students adjust location and height of animal support structures.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Designing garden habitats for animal visitors requires matching environment features to animal body structures and needs."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-35",
        lessonNumber: 35,
        title: "Living Learning Place Review",
        ncObjectives: ["LS.K.1.1", "LS.K.2.2", "PS.K.1.2"],
        primaryPractice: "Engaging in Argument from Evidence",
        directInstructionContext: "Comprehensive design evaluation checks living needs, weather protection, and spatial layout against test data.",
        prepare: "Assemble full group models of the Living Learning Place with all integrated components.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Today we inspect our complete Living Learning Place models. Your group must prove that your design meets all user & plant needs.",
          studentActionsBeforeEvidence: "Groups present their initial complete model claim to a peer review pair."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • PLANT & ANIMAL NEED CHECK",
          scientificKnowledge: "A complete habitat design must satisfy all basic needs of included living organisms.",
          exactEvidencePackage: "Audit checklist cards: Light source? Water source? Soil/Root space? Shelter/Protection?",
          studentWork: "Students verify every living organism in their model has access to basic needs.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • WEATHER RESILIENCE CHECK",
          scientificKnowledge: "Design solutions must withstand local weather conditions over time.",
          exactEvidencePackage: "Simulate wind gust (fan) and rain pour (water bottle) across the model.",
          studentWork: "Students reinforce unstable structural components or fix leaky covers.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • STUDENT ACCESSIBILITY CHECK",
          scientificKnowledge: "Human users must be able to move safely and access learning features without harming habitat components.",
          exactEvidencePackage: "Run toy student figure through pathways: Can students reach seats without stepping on seedlings?",
          studentWork: "Students optimize walking paths and seating locations.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Successful living learning places integrate plant needs, animal supports, weather resilience, and human access in a balanced layout."
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      },
      {
        id: "lesson-36",
        lessonNumber: 36,
        title: "Classroom Living Place Showcase & Transfer",
        ncObjectives: ["LS.K.1.1", "ESS.K.1.1", "PS.K.1.1"],
        primaryPractice: "Communicating Information & Transfer",
        directInstructionContext: "Scientific understanding is demonstrated by communicating evidence-based design claims and transferring ideas to new contexts.",
        prepare: "Set up presentation stations with models, evidence logs, and transfer cards.",
        launch: {
          prompt: "Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.",
          kindergartenTaskScript: "Welcome to the Kindergarten Science Showcase! Today your group presents your Living Learning Place and explains your evidence.",
          studentActionsBeforeEvidence: "Students arrange their model, evidence cards, and test records at their showcase station."
        },
        accessPathways: {
          languageRepresentation: "Use objects/pictures and two-choice or matching supports; require a science decision plus pointing/showing evidence.",
          supportedInvestigation: "Make steps visible with icons; facilitator models the process once, not the answer.",
          coreInvestigation: "Students decide how to organize or represent initial thinking.",
          extendedChallenge: "Ask for a second possible explanation or what evidence would be needed to decide."
        },
        evidence1: {
          title: "EVIDENCE 1 • EVIDENCE EXPLANATION CARDS",
          scientificKnowledge: "Claims are convincing when backed by observable test data and material properties.",
          exactEvidencePackage: "Presenters point to 3 specific evidence cards (Material test, Water test, Position test) during oral explanation.",
          studentWork: "Students explain WHY choices were made using collected test evidence.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • PEER REVIEW & FEEDBACK",
          scientificKnowledge: "Constructive feedback from peers helps identify hidden flaws or new opportunities for revision.",
          exactEvidencePackage: "Visiting peers use 'I like...' and 'What if...' feedback tokens on model areas.",
          studentWork: "Presenters evaluate peer questions and defend or adjust their design model.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NEW SCENARIO TRANSFER CHALLENGE",
          scientificKnowledge: "Scientific principles of needs, materials, and motion apply equally to new environments.",
          exactEvidencePackage: "Give individual transfer prompt card: 'How would you design a living place for a desert tortoise or a cold mountain habitat?'",
          studentWork: "Each student applies evidence-release reasoning to a completely novel environmental context.",
          facilitatorPrompts: ["Does your old rule still work?", "What exactly must change?", "Which evidence made you revise?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What is the most important new idea in this evidence? Does your old idea still work? Point to what you need to change.",
            coreReasoning: "How does Evidence 3 change or strengthen your claim/model/design? Which evidence is most important and why?",
            challengeExtend: "Can you find a counterexample, boundary case, or new situation where the rule needs to be used carefully? What would make you revise again?"
          }
        },
        consolidation: {
          duration: "2–4 Minutes Only",
          content: "Scientists and engineers use evidence to solve problems, defend solutions, and transfer learnings to build better places for people, plants, and animals!"
        },
        individualTransferAssessment: "Give one NEW object/image/data point/model condition not used in the group evidence. Ask the child to apply the scientific relationship and explain/show which evidence supports the decision.",
        facilitatorChecklist: [
          "Student participated in the named science/engineering practice.",
          "Student used an observation/test/data/model as evidence.",
          "Student revised or strengthened thinking after a later evidence release.",
          "Student applied the idea to the new individual transfer case.",
          "Support changed access/language, not the scientific thinking goal."
        ]
      }
    ]
  }
];
