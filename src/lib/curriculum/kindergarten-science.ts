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
  subtitle: "Clear Scientific Evidence-Release Curriculum (Teacher-Ready Edition)",
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
    { step: 3, name: "Evidence 1", description: "Facilitator gives the exact object/data/image/test described in the lesson - not a verbal answer." },
    { step: 4, name: "Student Practice", description: "Students observe, test, analyze, model, compare, argue, or communicate with Evidence 1." },
    { step: 5, name: "Evidence 2", description: "A second concrete scientific information source extends the idea." },
    { step: 6, name: "Student Practice", description: "Students integrate Evidence 1 + 2 and revise." },
    { step: 7, name: "Evidence 3", description: "A counterexample, new data set, or constraint makes the scientific relationship clearer and forces revision." },
    { step: 8, name: "Consolidation", description: "Facilitator formalizes the scientific relationship and vocabulary in 2–4 minutes." },
    { step: 9, name: "Transfer Assessment", description: "Each child applies the relationship to a new case through talk, drawing, model, gesture, or sorting." }
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
        prepare: "TEACHER-READY SET: For each group place 12 objects in one tray: red rubber ball, blue plastic bottle cap, red wooden cube, yellow kitchen sponge, wooden craft stick, cotton ball, 4-inch fabric square, smooth pebble, rough pebble, large interlocking block, small interlocking block, and rubber band. Also provide 3 hoops or paper plates for sorting and 3 blank group-label cards. Keep a small metal spoon aside for the individual transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "These objects are all mixed up. Your group needs to organize them. There is no rule yet. Decide together how you want to group them.",
          studentActionsBeforeEvidence: "Children handle all objects, agree on an initial grouping, and prepare to show another group why their objects belong together."
        },
        accessPathways: {
          languageRepresentation: "Place only 6 of the 12 objects in front of the group (red ball, blue cap, red cube, sponge, smooth pebble, rough pebble). Say: ‘Touch two. Same or different? Show me.’ Offer picture cards for COLOR, SHAPE, SIZE, TEXTURE. Students point to one property card, place matching objects together, and show evidence by touching the feature.",
          supportedInvestigation: "Use all 12 objects but give two hoops first. Say: ‘Pick one thing you notice. Put together objects that are the same in that way.’ Model the process with two unrelated practice objects, not an answer from the tray. Then students sort and explain one grouping with ‘We put these together because ___.’",
          coreInvestigation: "Give the full 12-object tray, 3 hoops, and blank labels. Say: ‘Decide your own rule. Organize the whole collection and make a label that another group can understand.’ Students negotiate a rule, sort, label, and defend it without facilitator choosing the property.",
          extendedChallenge: "After the first valid sort, say: ‘Now make a completely different sort using the same objects.’ Then ask: ‘Can one object belong in two different groups depending on the rule? Find one and prove it.’ Students create and defend a second classification."
        },
        evidence1: {
          title: "EVIDENCE 1 • WHAT WE CAN SEE AND FEEL",
          scientificKnowledge: "Objects have observable physical properties such as color, size, shape, and texture.",
          exactEvidencePackage: "Give each group three comparison pairs: (A) red rubber ball + blue rubber ball; (B) red wooden cube + red rubber ball; (C) smooth stone + rough stone. Evidence card says: LOOK • TOUCH • COMPARE. What is the same? What is different?",
          studentWork: "Students compare visible/touchable properties and re-sort. Do not name all properties first. After students describe them, attach the words color, shape, size, texture.",
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Hand the child the small metal spoon. Ask: “Show one way you could classify this object. What property are you using? Could it belong in a different group too?” Child may point, place, draw, or explain.",
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
        prepare: "TEACHER-READY SET: Build one tabletop classroom model per group with: 1 paper rectangle labeled DOOR, 1 rectangle labeled RUG, 2 small tables, 4 chairs, 1 supply bin, 1 bookshelf block, and 1 student figure. Give each group position-word cards: in front of, behind, between, on top of, under, above, below, beside. Keep a second student figure aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "A new student cannot find our classroom objects. Your group must make a model that helps the student know exactly where things are.",
          studentActionsBeforeEvidence: "Children place objects in a mini-classroom and give a partner location directions without pointing."
        },
        accessPathways: {
          languageRepresentation: "Use the mini-classroom with only DOOR, RUG, TABLE, and one student figure. Give four position cards: beside, under, on top of, in front of. Say: ‘Put the student beside the rug. Show me beside.’ Then let the child choose a card and place the figure to match it.",
          supportedInvestigation: "Use the full classroom model and four position cards at a time. Say: ‘Choose a card, place the student, then tell your partner where to look.’ Partner follows the direction without pointing. Add the remaining position cards after success.",
          coreInvestigation: "Give the full model and all position cards. Say: ‘Make three location clues that help a new student find classroom places without pointing.’ Partners test the clues and revise any clue that is unclear.",
          extendedChallenge: "Say: ‘Make two different directions that lead to the same place.’ Then move one classroom object and ask students to revise the directions. Challenge them to explain why a location word only works when a reference object is named."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a second student figure aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SET: Give each group a toy car, marble, foam ball, paper pinwheel, and 4 path cards showing straight, zigzag, round-and-round, and back-and-forth. Mark a 3-foot test lane with tape. Students test each object in the same lane. Keep a small plastic cup aside as the transfer object.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Can you make these objects move in different ways? Your group needs to show at least two movements that do not look the same.",
          studentActionsBeforeEvidence: "Children move toys/objects, imitate movement, and create an initial motion representation with arrows or gestures."
        },
        accessPathways: {
          languageRepresentation: "Use the toy car and foam ball plus STRAIGHT and ZIGZAG cards. Say: ‘Move it like this card. Now show me the path with your finger.’ Students match object movement to a path card and trace the path.",
          supportedInvestigation: "Give car, marble, foam ball and the four path cards. Students choose a card, predict a movement, test it in the taped lane, and match the result to the card. Say: ‘Show the path, not the toy.’",
          coreInvestigation: "Give all objects and path cards. Say: ‘Make one object move in two different ways. Record each path with arrows.’ Students compare path and speed and explain what changed.",
          extendedChallenge: "Say: ‘Can you make the same object travel the same path but at a different speed? Can you make two different objects travel the same path?’ Students design and demonstrate tests that separate path from speed/object type."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a small plastic cup aside as the transfer object. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
