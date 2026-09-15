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
  subtitle: "Clear Scientific Evidence-Release Curriculum (Detailed Facilitator Playbook Edition)",
  grade: "Kindergarten (K)",
  subject: "Science & Engineering",
  totalLessons: 36,
  totalProjects: 5,
  playbookIncluded: true,
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
      },
      {
        id: "lesson-4",
        lessonNumber: 4,
        title: "The Drop Mystery",
        ncObjectives: ["PS.K.2.2"],
        primaryPractice: "Planning & Carrying Out Investigations",
        directInstructionContext: "Released unsupported objects fall toward the ground, although shape/material can change how the fall looks.",
        prepare: "TEACHER-READY SET: Give each group a foam ball, wooden block, cotton ball, and crumpled paper ball. Provide a DROP HERE mark 24 inches above a tray and prediction cards: straight down / not straight down. Drop only one object at a time. Keep a plastic linking cube aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "I am going to let go of these objects. Your group must predict where each one will go and show what you think its movement will look like.",
          studentActionsBeforeEvidence: "Children make predictions with objects/picture icons before any drop demonstration."
        },
        accessPathways: {
          languageRepresentation: "Use only the foam ball and cotton ball. Give DOWN arrow and NOT DOWN card. Say: ‘Point where you think it will go when I let go.’ Drop from the marked height; students point/draw the direction they observed.",
          supportedInvestigation: "Use all four objects, one at a time. Students predict with cards, watch the drop, then move their prediction card if evidence disagrees. Say: ‘What happened every time?’",
          coreInvestigation: "Students make a prediction table for all four objects, conduct repeated drops from the same marked height, and use arrows/gestures to describe motion. They state a claim supported by more than one drop.",
          extendedChallenge: "Ask: ‘What if the object is lighter, softer, or a different shape—will it still move downward when released?’ Students choose a new classroom-safe object, predict, test, and explain whether it challenges the rule."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a plastic linking cube aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SET: Teddy problem: a 6-inch toy bed must stay dry. Give each group equal 6x6-inch pieces of paper towel, aluminum foil, cotton cloth, wax paper, and felt; 1 dropper; 20 mL water; and a dry paper square under each test material. Keep a 6x6-inch plastic grocery-bag square aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Teddy needs a cover for his little bed so it will not get wet. Your group must choose a material, but be ready to prove why your choice should work.",
          studentActionsBeforeEvidence: "Children inspect available materials, make an initial material choice, and give a reason based on what they currently notice."
        },
        accessPathways: {
          languageRepresentation: "Offer paper towel and foil first. Say: ‘Teddy must stay dry. Touch the materials. Which one do you choose?’ Students place a choice card, add 5 drops of water, and point to DRY/WET evidence.",
          supportedInvestigation: "Give four materials and a simple TEST card: choose → 5 drops → wait → lift → check paper underneath. Students follow the same test for each material and mark dry/wet with icons.",
          coreInvestigation: "Give all five materials. Students decide how to test them fairly using equal-size pieces and equal water, record results, and choose the best bed cover using evidence.",
          extendedChallenge: "Ask: ‘Dry is important, but Teddy also needs the cover to bend around the bed. Does your best water material still work?’ Students add flexibility as a second criterion and defend or revise the choice."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a 6x6-inch plastic grocery-bag square aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SET: Give each group a 12x18-inch classroom base mat, 4 student figures, 2 table blocks, 4 chair blocks, 1 rug card, 1 bookshelf block, 1 supply-bin block, and 1 door card. Add two rules: students must reach supplies and the door path must stay open. Keep one extra table block hidden for Evidence 3/transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We need to build a classroom where students can learn, get materials, and move around. Your group will build the first version. It does not have to be perfect.",
          studentActionsBeforeEvidence: "Children build an initial mini-classroom and explain one placement/material decision."
        },
        accessPathways: {
          languageRepresentation: "Give the base mat, door, rug, one table, supply bin, and two students. Say: ‘Make a clear path from the door to the supplies.’ Students physically move a figure along the route and change one item if blocked.",
          supportedInvestigation: "Give the full model plus the two rule cards. Students build, then use a figure to test door → seat → supplies. Provide a three-picture test sequence and ask them to fix the first failed step.",
          coreInvestigation: "Students independently organize all model pieces to satisfy both constraints, run the reach/path tests, and explain at least one placement decision with evidence.",
          extendedChallenge: "Add the hidden extra table and say: ‘We need one more table, but both rules still count.’ Students redesign without removing required features and compare two possible solutions."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use one extra table block hidden for Evidence 3/transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SET: Reuse the Lesson 6 classroom model. Add one new student figure and a backpack block. Give groups a TEST ROUTE card: door → seat → supplies → rug. Keep a wheelchair-user figure/card as the new transfer condition.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Our classroom design worked yesterday, but a new student is joining us. Will the same design still work? Your group must test it.",
          studentActionsBeforeEvidence: "Children begin by predicting whether the existing model needs any change and identify what they would test first."
        },
        accessPathways: {
          languageRepresentation: "Use the existing model plus new student figure only. Show the route card one step at a time. Say: ‘Can the new student get from the door to the seat? Move the figure and show me where it works or gets stuck.’",
          supportedInvestigation: "Give the full route card: door → seat → supplies → rug. Students test each segment, place a STOP marker where access fails, and revise that part before retesting.",
          coreInvestigation: "Students run the complete route for the new student and backpack, document one problem, revise the classroom model, and explain which evidence caused the change.",
          extendedChallenge: "Introduce the wheelchair-user figure/card. Say: ‘The classroom must work for this student too. What must change—and what can stay?’ Students identify a new constraint, redesign, and justify the revision."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a wheelchair-user figure/card as the new transfer condition. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY CARD SET: Per group provide 8 picture/name cards: live potted bean plant, classroom child, earthworm, goldfish, rock, plastic toy car, wooden pencil, stuffed teddy bear. Give three mats labeled LIVING / NONLIVING / NOT SURE. Keep a mushroom card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Some things here are living, some are not living, and some might be tricky. Your group must sort them, but you may use a NOT SURE group when you need more evidence.",
          studentActionsBeforeEvidence: "Children sort cards/objects and state one reason for at least one choice; uncertainty is explicitly allowed."
        },
        accessPathways: {
          languageRepresentation: "Use 6 cards: puppy, tree, flower, rock, toy car, chair. Give LIVING / NOT LIVING / NOT SURE mats. Say: ‘Choose one card. Does it grow? Does it need things to live? Show which group you choose.’ Allow pointing and picture cues for grow/move/need.",
          supportedInvestigation: "Use the full card set and a five-icon checklist: structure, growth, change, movement, needs. Students inspect one card at a time, check observed/known characteristics, then place it on a mat.",
          coreInvestigation: "Students classify the full set, choose one tricky example, and defend the placement using at least two characteristics rather than appearance alone.",
          extendedChallenge: "Add a dormant seed or realistic robot image. Ask: ‘This one makes our rule harder. What evidence would we need before deciding?’ Students identify missing evidence and may use NOT SURE scientifically."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Show the mushroom card. Ask the child to place it in LIVING / NONLIVING / NOT SURE and show or tell what evidence they would need.",
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
        prepare: "TEACHER-READY OBSERVATION SET: Use one fast-growing bean seedling per group or one class plant photographed on Day 1, Day 3, and Day 5 from the same angle. Give children a 3-box observation strip labeled FIRST / LATER / NOW and crayons. Keep a baby-to-adult chicken image sequence aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We are going to become change detectives. Look at this living thing very carefully today so that later we can prove whether anything changed.",
          studentActionsBeforeEvidence: "Children make a first observation using drawing, pointing, counting, or a simple measurement/marker."
        },
        accessPathways: {
          languageRepresentation: "Give today’s plant/organism photo and one earlier photo side by side. Say: ‘Point to something that stayed the same. Point to something that changed.’ Students circle/draw one visible change with facilitator scribing if needed.",
          supportedInvestigation: "Provide a 3-image sequence. Students order the images, use SAME/CHANGED icons, and describe one change using ‘Before… now…’. Facilitator prompts observation rather than explanation first.",
          coreInvestigation: "Students compare dated observations, identify a pattern of growth/change, and create a simple before/after model showing evidence from at least two observations.",
          extendedChallenge: "Remove the dates and mix the images. Ask students to reconstruct the sequence from evidence and defend the order. Then ask what future change they predict and why."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a baby-to-adult chicken image sequence aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY PROBLEM SET: Use one potted bean plant. Show four resource cards: WATER, LIGHT, AIR, and TOY. Give each group a plant-home mat and duplicate resource cards to place around the plant. Keep a second scenario card—plant in a dark closed box with water—aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "This living thing has a home, but something may be missing. Your group must decide what it needs in order to live and grow.",
          studentActionsBeforeEvidence: "Children inspect the habitat model, add what they think is needed, and explain their initial reasoning."
        },
        accessPathways: {
          languageRepresentation: "Offer the living-thing model plus picture cards for WATER, FOOD, AIR, SHELTER/SPACE. Say: ‘Choose one thing it needs. Show where it would get it in this home.’ Students match one need to one resource.",
          supportedInvestigation: "Give all need cards and a habitat mat. Students match needs to resources one at a time, then identify one missing resource in the model and add it.",
          coreInvestigation: "Students inspect the habitat, determine which needs are met/not met, revise the habitat, and explain how each added feature supports the living thing.",
          extendedChallenge: "Remove or limit one resource. Ask: ‘If we cannot add more space/water/food here, how could we redesign the home?’ Students compare solutions and explain tradeoffs."
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
          exactEvidencePackage: "Show bird eating seeds/drinking water and fish obtaining resources in water. Card asks: What is each getting and where does it get it?",
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a second scenario card—plant in a dark closed box with water—aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY ANIMAL SET: Give each group 4 animal cards: duck (webbed feet + beak), rabbit (hind legs + front teeth), turtle (shell + legs), elephant (trunk + legs). Give function cards: GET FOOD / MOVE / PROTECT. Keep a woodpecker card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Look closely at these animal body parts. Your group has to figure out: What job might each body part help the animal do?”",
          studentActionsBeforeEvidence: "Children match body-part images to possible actions/functions and explain their first ideas."
        },
        accessPathways: {
          languageRepresentation: "Use 4 animal cards with one body part visually highlighted. Say: ‘Point to the body part. What can the animal do with it—get food, move, or protect itself?’ Students match the card to one function icon and demonstrate with gesture.",
          supportedInvestigation: "Give animal cards plus FOOD / MOVE / PROTECT mats. Students sort by what a highlighted body part helps the animal do and explain one match orally.",
          coreInvestigation: "Students choose two animals, identify body parts, build/draw a body-part → function model, and explain how the structure helps obtain resources, protect, or move.",
          extendedChallenge: "Ask students to compare two different body parts that solve the same problem, or one body part that helps with more than one function. They defend which evidence supports each function."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a woodpecker card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY HABITAT SET: Give each group one rabbit figure, a cardboard shelter, food card, water card, 6 craft sticks, 4 blocks, and a 12x18-inch habitat base. Place food and water on opposite sides so children must build/test a usable route. Keep a fallen-log obstacle card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Our animal has food and water in its home. But can it actually get to them? Build a path and test your idea with the animal model.”",
          studentActionsBeforeEvidence: "Children create and physically test an initial route from shelter to resources."
        },
        accessPathways: {
          languageRepresentation: "Use a simple habitat with animal, food, and water. Give one straight path strip. Say: ‘Move the animal to the food. Can it get there? Show where the path works or is blocked.’",
          supportedInvestigation: "Add two obstacles and path pieces. Students predict a route, move the animal model, place a STOP marker at failures, then change the route and retest.",
          coreInvestigation: "Students design and test a route that lets the animal reach food, water, and shelter. They use position/movement words to explain the successful path.",
          extendedChallenge: "Add a new obstacle or move the food. Students must redesign with the same number of path pieces and explain why the new route still meets the animal’s needs."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a fallen-log obstacle card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY RAIN TEST: Reuse a simple animal habitat. Give each group 1 animal figure, 1 shelter, soil/sponge ground, 30 mL water in a squeeze bottle labeled RAIN, and 3 possible roof materials: paper, foil, fabric. Keep a WIND + RAIN condition card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Rain is coming to our animal's home. What might change? Your group must decide what needs protection before we test the rain.”",
          studentActionsBeforeEvidence: "Children predict environmental/design changes and identify one feature they would protect or change."
        },
        accessPathways: {
          languageRepresentation: "Show the habitat and a RAIN card. Say: ‘Point to what might get wet. Which part should we protect first?’ Students choose one feature and cover/move it before a gentle spray test.",
          supportedInvestigation: "Give two possible protective materials and a simple rain-test sequence. Students choose, test with equal spray/drop amounts, observe what changed, and revise one habitat feature.",
          coreInvestigation: "Students identify likely rain effects, select materials/placement changes, conduct the rain simulation, and use observations to justify revisions.",
          extendedChallenge: "Add a constraint: ‘The animal still needs air and a way in and out.’ Students redesign protection so it handles rain without blocking another need."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a WIND + RAIN condition card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY REVIEW KIT: Give each group its habitat model plus 4 proof cards: FOOD, WATER, SHELTER/PROTECTION, MOVEMENT PATH. Students physically point to or place each proof card where the habitat meets that need. Keep a NEW ANIMAL: rabbit card aside and ask whether the same habitat would work.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Your group says your habitat works. Today your job is to prove it. Show us how the habitat helps the animal live there.”",
          studentActionsBeforeEvidence: "Children choose model features they believe are evidence and prepare an initial claim."
        },
        accessPathways: {
          languageRepresentation: "Give the completed habitat plus NEED icons. Say: ‘Show me where the animal gets water. Show me where it gets food. Show me where it can move/rest.’ Students point and demonstrate each feature.",
          supportedInvestigation: "Use a four-step review card: choose a need → show the feature → test it → say/draw what happened. Students review one need at a time and fix a failed feature.",
          coreInvestigation: "Groups conduct a full evidence review of habitat needs, movement/access, and material choices; they identify one strength and one revision before presenting.",
          extendedChallenge: "Have another group test the habitat without explanation first. Designers may only watch and record problems, then revise based on peer evidence and defend the most important change."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a NEW ANIMAL: rabbit card aside and ask whether the same habitat would work. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY ANIMAL SET: Use four domestic cats: (A) orange short-haired tabby, (B) black short-haired cat, (C) white long-haired cat, (D) gray striped short-haired cat. All four should visibly have four legs, fur, ears, eyes, and a tail, while differing in color/pattern/hair length/size. Give each group a SAME / DIFFERENT mat. Evidence 3 uses a hairless Sphynx cat card. Keep a dog set aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "These animals are the same kind, but they do not look exactly the same. Your group must find what is the same and what is different.”",
          studentActionsBeforeEvidence: "Children inspect multiple individuals and create a visual SAME/DIFFERENT representation."
        },
        accessPathways: {
          languageRepresentation: "Give the four cat cards: orange tabby, black short-haired, white long-haired, gray striped. Place SAME and DIFFERENT mats. Say: ‘Pick two cats. Point to one thing that is the same. Now point to one thing that is different.’ Offer picture cues: fur color, pattern, hair length, body parts.",
          supportedInvestigation: "Give all four cat cards and a SAME/DIFFERENT recording mat. Students compare two cats at a time, place one observation on each side, then check another pair to see whether the idea still works.",
          coreInvestigation: "Students analyze all four cats, identify characteristics shared by the kind and individual differences, and create a visual claim: ‘Cats are alike in ___; individual cats can differ in ___.’",
          extendedChallenge: "Reveal the Sphynx cat card. Say: ‘This cat looks very different. Does it change your idea about what cats share?’ Students revise the shared-characteristics claim. Then compare the new dog set to transfer the same-kind/individual-variation idea."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Show four dogs (small brown short-haired dog, large black long-haired dog, white spotted dog, curly-haired tan dog). Ask: “What shows these are the same kind? What is different about the individuals?”",
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
        prepare: "TEACHER-READY MOVEMENT SET: Use four animal image sequences/cards: rabbit hopping with hind legs, duck walking/swimming with feet, bird flying with wings, fish swimming with fins. Give BODY PART and MOVEMENT matching mats. Evidence 3 compares bird wings and insect wings as different structures used for flight. Keep a snake-slithering card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Watch how these animals move. Your group must figure out which body parts are helping them move and how.”",
          studentActionsBeforeEvidence: "Children imitate/represent movement and connect an observed structure to an initial movement idea."
        },
        accessPathways: {
          languageRepresentation: "Give one bird, fish, and dog card/model. Highlight wing, fin, and legs. Say: ‘Show me the part that helps it move. Now move your hand/body the way the animal moves.’ Students match body part to movement picture.",
          supportedInvestigation: "Students use three animal cards and MOVE cards (fly/swim/walk). They match body part → movement, then test the match by acting/modeling the motion.",
          coreInvestigation: "Students compare several animals, create body-part → movement models, and explain how different structures support different movement patterns.",
          extendedChallenge: "Ask: ‘Can different body parts help animals move through the same place? Can the same kind of body part be used differently?’ Students compare cases and defend a generalization with evidence."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a snake-slithering card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY FOOD-TOOL TEST: Put 12 pom-poms (“food”) in a tray. Give each group 4 tools that model mouth structures: clothespin, spoon, drinking straw, and tweezers. Children move food to a cup without using fingers. Keep a wide craft-stick “beak” tool aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "These pretend foods are hard to pick up. Your group must choose a tool that you think will work best and test your idea.”",
          studentActionsBeforeEvidence: "Children select a model tool, predict, and conduct an initial attempt before comparative evidence is released."
        },
        accessPathways: {
          languageRepresentation: "Give two tools that mimic animal feeding parts (clothespin and spoon) plus large pretend food pieces. Say: ‘Which tool can pick up this food? Try both.’ Students choose, test, and point to the tool that worked.",
          supportedInvestigation: "Give 3 tools and 2 food types. Students predict a tool for each food, test, and mark WORKED / DID NOT WORK. Prompt: ‘What shape/action helped?’",
          coreInvestigation: "Students test all provided beak/mouth-tool models with different pretend foods, compare results, and connect tool structure to animal feeding function.",
          extendedChallenge: "Give a new food type or restrict one tool. Students design their own fair comparison and predict which structure will work best, then revise their explanation from results."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a wide craft-stick “beak” tool aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY PROTECTION TEST: Give each group one small animal figure, 2 index cards, 1 piece of felt, 4 craft sticks, 2 rubber bands, tape, and 6 linking cubes. Protection test: gently roll a foam ball toward the animal. Movement test: animal must still travel 12 inches. Keep a “must also fit through a narrow tunnel” card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Our animal needs protection, but it still needs to move. Build a first protective covering that you think can do both.”",
          studentActionsBeforeEvidence: "Children make a first prototype and state which material/property they think will help."
        },
        accessPathways: {
          languageRepresentation: "Give an animal figure, cotton/fabric/foil pieces, and two icons: PROTECT and MOVE. Say: ‘Cover the animal so it is protected. Now move it. Can it still move?’ Students test both goals.",
          supportedInvestigation: "Provide a build-test card: cover → gentle impact/water test → movement test → change one thing. Students use two materials and compare which meets both goals better.",
          coreInvestigation: "Students design a protective covering, define how they will test protection and movement, collect evidence, and revise the design to satisfy both criteria.",
          extendedChallenge: "Add a new constraint such as ‘use half as much material’ or ‘animal must move faster.’ Students optimize the design and explain the tradeoff between protection and movement."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a “must also fit through a narrow tunnel” card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY MOVEMENT COURSE: Give each group 6 blocks/cones, 1 animal figure, 4 arrow cards, and a 12x18-inch base. Required route must include one straight section, one turn/zigzag, and one around-an-object section. Another group must follow the route using only the model/arrows. Keep a new START position card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Another group must be able to move the animal through your course without you showing them. Build a route and think about how you will communicate it.”",
          studentActionsBeforeEvidence: "Children build an initial route/model and try giving a partner directions."
        },
        accessPathways: {
          languageRepresentation: "Give a start, finish, and 4 path arrows. Say: ‘Make a path. Move the animal along it. Now show your partner with arrows where to go.’ Students use one position/movement word at a time.",
          supportedInvestigation: "Give path tiles and position-word cards. Students build a route, create 3 direction cards, and have a partner test them without extra pointing. Revise unclear directions.",
          coreInvestigation: "Groups design a movement course and a communication model that another group can follow independently; they collect peer-test evidence and revise.",
          extendedChallenge: "Require two different successful routes or add a blocked path. Students compare efficiency/clarity and defend which route/directions work better and why."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a new START position card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY BIO-INSPIRED SET: Offer 4 animal inspiration cards: duck webbed feet → push water; bird wing → move through air; turtle shell → protect body; elephant trunk → reach/grasp. Give paper, craft sticks, straws, foil, tape, cups, and pom-poms. Groups choose ONE function and build a human-use solution. Keep a gecko-foot/grip card aside for transfer discussion.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Animals solve problems with their body parts. Your group will use one animal idea to solve a problem for people. First decide what the animal part actually helps the animal do.”",
          studentActionsBeforeEvidence: "Children select a problem/animal inspiration and sketch or build an initial function-based idea."
        },
        accessPathways: {
          languageRepresentation: "Show one animal inspiration card and one human problem card. Say: ‘What does this body part help the animal do? Which part of our design could do a similar job?’ Students choose from two design pieces and build a simple model.",
          supportedInvestigation: "Give 2–3 animal structure cards and a defined problem. Students select one useful function, sketch/build a matching feature, test it, and explain the connection with a sentence frame.",
          coreInvestigation: "Students independently choose an animal structure/function to inspire a solution, build a prototype, define a test, and revise from evidence.",
          extendedChallenge: "Ask students to combine two animal ideas or compare two different animal-inspired solutions to the same problem. They must justify which feature is essential and what evidence would change their choice."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a gecko-foot/grip card aside for transfer discussion. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY EXPO KIT: Give each group its best artifact from Lessons 15–20 plus three evidence labels: I NOTICED / I TESTED / I CHANGED MY IDEA. Provide one display mat with spaces for CLAIM, EVIDENCE, MODEL. Keep one unfamiliar animal card (penguin) for visitor transfer questions.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "You have done a lot of animal science. Choose one idea you believe is true and one piece of work that helps prove it.”",
          studentActionsBeforeEvidence: "Children select a claim and artifact, then practice a short oral/model-based explanation."
        },
        accessPathways: {
          languageRepresentation: "Preselect two artifacts for the group (for example, cat SAME/DIFFERENT mat and body-part/function model). Say: ‘Pick one idea you learned. Point to the part of your work that proves it.’ Give oral frames: ‘I think ___. My evidence is ___.’ Facilitator scribes if needed.",
          supportedInvestigation: "Give each group 3–4 completed animal-science artifacts and CLAIM / EVIDENCE cards. Students choose one claim, match one artifact as evidence, rehearse the explanation with a partner, then switch speaker/evidence-holder roles.",
          coreInvestigation: "Students choose their own animal-science claim and strongest artifact, prepare a short evidence explanation, present it to another group, and answer one peer question using the artifact rather than facilitator help.",
          extendedChallenge: "After the first explanation, give a peer challenge card: ‘What other evidence supports your idea?’ or ‘Would this be true for another animal?’ Students add a second artifact/example, strengthen or revise the claim, and explain why the new evidence matters."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use one unfamiliar animal card (penguin) for visitor transfer questions. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY WEATHER DATA: Use a prepared 10-day class weather strip with these icon counts: 5 sunny, 3 cloudy, 2 rainy; temperature arrows: 4 warmer, 3 same, 3 cooler; wind: 6 calm/light, 4 windy. Give counters and a MORE / LESS / SAME mat. Keep an additional Day 11 rainy-and-windy card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We have been collecting weather information for many days. Your group must figure out what our weather has been doing without me telling you the pattern.”",
          studentActionsBeforeEvidence: "Children sort/count accumulated weather records and make an initial pattern statement."
        },
        accessPathways: {
          languageRepresentation: "Give only one week of the class weather calendar plus SUNNY/CLOUDY/RAINY/WINDY icons. Say: ‘Which weather happened most? Point and count with me.’ Students place counters on matching days and compare more/less.",
          supportedInvestigation: "Give two weeks of weather records and a simple count mat. Students sort days by condition, count each category, and state one pattern using ‘more/less/same.’",
          coreInvestigation: "Give the accumulated class weather data. Students choose a way to organize/count it, identify a day-to-day or longer pattern, and support the pattern with numbers/icons from the record.",
          extendedChallenge: "Ask students to compare two different time windows or identify a pattern that is not always true. They explain what additional data would make the claim stronger."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use an additional Day 11 rainy-and-windy card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SAME-PLACE SET: Show three images/illustrations of the SAME school playground: (A) sunny/dry ground, (B) rainy/wet puddles, (C) windy with leaves/branches moving. Give CHANGE and WEATHER CAUSE cards. Keep a snowy/icy playground image aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "These are pictures of the same place at school on different days. Your group must find what changed and decide what might have caused the change.”",
          studentActionsBeforeEvidence: "Children compare images, mark visible differences, and make a tentative cause claim."
        },
        accessPathways: {
          languageRepresentation: "Use two photos of the same school location on contrasting weather days. Say: ‘Point to something that changed. Was it wetter, drier, brighter, darker, moving, or still?’ Students match one change icon to the photo pair.",
          supportedInvestigation: "Give 3–4 same-location weather photos. Students pair each with a weather card, identify one environmental change, and connect it with ‘When ___, I notice ___.’",
          coreInvestigation: "Students analyze multiple same-location observations, make a claim about how weather changes the environment, and cite visible evidence from at least two images/records.",
          extendedChallenge: "Show a photo where the cause is ambiguous. Ask: ‘Can we be sure weather caused this? What other evidence would we need?’ Students distinguish observation from inference and propose additional evidence."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a snowy/icy playground image aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SEASON SET: Give each group four season evidence cards for the same tree/location: spring—new green leaves/rain; summer—full green leaves/hot sunny days; fall—colored/falling leaves/cooler; winter—bare branches/cold. Add simple monthly weather-icon strips. Keep a second-location season card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "These weather records came from different times of the year. Your group must become season detectives and find patterns that could help identify the seasons.”",
          studentActionsBeforeEvidence: "Children compare seasonal data/photo sets and make an initial evidence-based guess."
        },
        accessPathways: {
          languageRepresentation: "Give two season photo/data sets with obvious contrasts. Say: ‘Which set looks warmer/cooler? What do you see that helps you decide?’ Students match season icons after pointing to evidence.",
          supportedInvestigation: "Give four seasonal data/photo sets plus a feature mat (temperature feel, precipitation, daylight/plant clues as provided). Students compare one feature at a time and group records by season.",
          coreInvestigation: "Students analyze the class yearlong weather records and seasonal evidence, identify recurring patterns, and communicate similarities/differences among seasons.",
          extendedChallenge: "Mix records without season labels and include an unusual day. Students classify by overall pattern rather than one day, defend the classification, and explain why a single weather event does not define a season."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a second-location season card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY WEATHER-MATERIAL TEST: Give equal 6x6-inch pieces of paper, cardboard, cotton cloth, aluminum foil, and plastic sheet. Test 10 mL “rain” with a dropper/squeeze bottle and 10 seconds of fan “wind.” Put dry tissue underneath to reveal water passage. Keep wax paper aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We need a material that can handle weather outside. Your group must choose one now, but later you will have to test whether your choice really works.”",
          studentActionsBeforeEvidence: "Children inspect materials, make an initial choice for a stated job, and explain what property they are relying on."
        },
        accessPathways: {
          languageRepresentation: "Give two materials and one weather condition first (water). Say: ‘Which material do you think will handle rain better? Test both the same way.’ Students mark WORKS / NEEDS CHANGE.",
          supportedInvestigation: "Give 3–4 materials and two weather tests. Students use a visible test sequence, keep the test amount/distance consistent, and record results with icons.",
          coreInvestigation: "Students compare all assigned materials across weather-related properties, organize test data, and choose a material for a specific outdoor job using evidence.",
          extendedChallenge: "Add a second criterion such as flexibility, strength, or limited material supply. Students determine whether the original ‘best’ material remains best and defend a revised choice."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use wax paper aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY WIND TEST: Give each group a feather, cotton ball, craft stick, linking cube, and crumpled paper ball. Place each at the same taped start line 12 inches from a fan on LOW. Mark how far each moves using floor/table grid squares. Keep a flat index card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "What will moving air do to these objects? Your group must predict which will move more, less, or differently before we turn on the fan.”",
          studentActionsBeforeEvidence: "Children order/predict object responses and explain the basis for their prediction."
        },
        accessPathways: {
          languageRepresentation: "Use fan on one fixed setting and two objects with clear contrast. Say: ‘Which one will move more? Point to your prediction.’ Test from the same tape line and let students show movement with arrows.",
          supportedInvestigation: "Give several objects and a test mat with SAME START LINE. Students predict, test one at a time with the fan unchanged, and compare how far/how the objects move.",
          coreInvestigation: "Students plan and carry out a fair wind investigation, record movement paths/speed comparisons, and make an evidence-based claim about object response to moving air.",
          extendedChallenge: "Allow students to change one variable—fan distance, object orientation, or material—while keeping others the same. They predict how the change will affect motion and explain the result."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a flat index card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SCHOOL WEATHER PROBLEM: Problem card: “Rain makes a puddle at the classroom door and students need a dry path.” Give a 12x18-inch base, door card, 30 mL water, foil, plastic sheet, craft sticks, sponge, blocks, tape, and student figures. Keep a “strong wind is added” constraint card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Our school has a weather problem. Your group must build a first solution using what you already know from our weather and material investigations.”",
          studentActionsBeforeEvidence: "Children define the selected problem in their own words and create an initial prototype/plan."
        },
        accessPathways: {
          languageRepresentation: "Give one clearly defined school weather problem and two material choices. Say: ‘What is the problem? Which material/shape might help?’ Students build a small first solution and test one condition.",
          supportedInvestigation: "Provide a problem card, 3 material options, and a build → test → fix visual. Students choose materials, build, run the specified weather test, and revise one feature.",
          coreInvestigation: "Groups use prior weather and material evidence to design a solution, identify criteria, test it under relevant conditions, and revise based on recorded evidence.",
          extendedChallenge: "Add an unexpected weather condition or resource limit. Students adapt the solution while preserving the original function and explain which evidence guided the tradeoff."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a “strong wind is added” constraint card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SHOWCASE KIT: Give each group its Lesson 27 solution, the original puddle problem card, one photo/drawing of its test, and three presentation cards: PROBLEM / EVIDENCE / HOW OUR DESIGN HELPS. Keep a “two students must pass at the same time” visitor challenge card aside.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Your weather-ready solution is finished. Now you must convince another group that the problem is real AND that your solution can help.”",
          studentActionsBeforeEvidence: "Children choose initial weather evidence and prototype evidence for a presentation."
        },
        accessPathways: {
          languageRepresentation: "Give the group’s finished solution plus two prompt cards: PROBLEM and EVIDENCE. Say: ‘Show the problem. Now show one part of your model that helps.’ Students point/demonstrate while facilitator scribes words if needed.",
          supportedInvestigation: "Students use a 3-part presentation mat: weather problem → test evidence → solution feature. They rehearse each part with a partner and answer one prepared peer question.",
          coreInvestigation: "Groups present the weather problem, evidence from class data/material tests, how the solution works, and one revision made because of evidence. Peers ask a science question.",
          extendedChallenge: "Give a skeptical audience prompt: ‘How do you know it will work in another weather condition?’ Students use a second piece of evidence, acknowledge limits, or propose a new test."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a “two students must pass at the same time” visitor challenge card aside. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY PLANT SET: Use four bean plants of the same type or four clear photo cards: tall plant with 6 leaves, shorter plant with 5 leaves, plant with one slightly yellow leaf, bushier plant with 7 leaves. Give SAME / DIFFERENT mat and leaf/height counters. Keep four sunflower individuals aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "These plants are the same kind, but they are not identical. Your group must find what they share and what is different about each plant.”",
          studentActionsBeforeEvidence: "Children observe several same-type plants and make an initial SAME/DIFFERENT representation."
        },
        accessPathways: {
          languageRepresentation: "Give two plants of the same kind with visible differences. Say: ‘Point to one part both plants have. Now point to something that is different.’ Use picture cues for leaf, stem, height, color/shape.",
          supportedInvestigation: "Give 3–4 same-kind plant images/specimens and SAME/DIFFERENT mat. Students compare pairs, record one shared characteristic and one individual difference, then check another pair.",
          coreInvestigation: "Students analyze the full plant set, distinguish kind-level similarities from individual variation, and create a visual claim supported by multiple observations.",
          extendedChallenge: "Reveal an unusual individual of the same plant kind. Students decide which shared characteristics still hold, revise overgeneralizations, and transfer the idea to a new plant kind."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Show four sunflower individuals with visible height/leaf/flower-size differences. Ask the child to identify one shared characteristic and one individual difference.",
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
        prepare: "TEACHER-READY LIVING-PLACE SET: Give cards/miniatures for bean plant, small bird, butterfly, child, water dish, shelter/shrub, sunlight area, rock, bench, plastic toy, and trash item. Groups choose what belongs and place each chosen item on a WHY IT HELPS mat. Keep a pesticide/spray warning card aside as a new constraint.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We are designing a living place at school. Your group must decide what belongs there and what does not. Be ready to explain what job each chosen thing has.”",
          studentActionsBeforeEvidence: "Children select living/nonliving components and connect each selected item to an initial purpose."
        },
        accessPathways: {
          languageRepresentation: "Give 6 component cards, including obvious needed/not-needed examples. Say: ‘Pick one. Does it help a plant, animal, or person in our living place? Show who uses it.’ Students match component → user/need.",
          supportedInvestigation: "Give all component cards plus PEOPLE / PLANTS / ANIMALS / DOES NOT HELP mats. Students place one card at a time and explain its job; allow one card to serve more than one group.",
          coreInvestigation: "Students select the components for the living place, connect each to a need/function, remove unnecessary items, and defend the final set with evidence from prior lessons.",
          extendedChallenge: "Introduce limited space: ‘You can keep only five components.’ Students prioritize, compare tradeoffs, and justify which features are essential versus helpful."
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
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a pesticide/spray warning card aside as a new constraint. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        prepare: "TEACHER-READY SITE MODEL: Give a 12x18-inch schoolyard base with fixed SUN area, SHADE area, DOOR, and WATER SOURCE. Add plant card, bird shelter, butterfly flower patch, bench, path pieces, and water dish. Groups position every component and use position-word cards. Keep a second DOOR location card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We have all the parts for our living place, but where should each part go? Your group must arrange the model so the place can actually work.”",
          studentActionsBeforeEvidence: "Children place features on a base model and explain initial spatial relationships."
        },
        accessPathways: {
          languageRepresentation: "Use only 4 site features and position cards beside/near/under/in front of. Say: ‘Put the water dish near the animal shelter. Show me near.’ Then students choose placements and demonstrate access with a figure.",
          supportedInvestigation: "Use the full site model with a placement checklist. Students position one feature at a time, state its relationship to a reference point, and test whether the intended user can reach it.",
          coreInvestigation: "Groups arrange every site component to meet functional needs, use relative-position language to document placements, and revise after movement/access tests.",
          extendedChallenge: "Move the DOOR to the hidden second location. Students redesign without changing required components and explain which spatial relationships had to change and which could remain."
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
          exactEvidencePackage: "Add: shade must be ABOVE part of plant area; shelter is BETWEEN two boundaries. Students revise and explain.",
          studentWork: "Students coordinate multiple relative-position relationships.",
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
          content: "Relative-position language and models communicate where features are placed, and placement can be chosen to support function."
        },
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a second DOOR location card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        title: "Paths for People and Animals",
        ncObjectives: ["PS.K.2.2", "LS.K.1.2"],
        primaryPractice: "Developing & Using Models",
        directInstructionContext: "Path design depends on how intended users/organisms move.",
        prepare: "TEACHER-READY PATH DESIGN: Give one child figure, one small animal figure, 8 path tiles, 4 blocks, 2 plant cards, and a 12x18-inch site base. Path must connect ENTRANCE → WATER → PLANT AREA without crushing plants. Keep a puddle obstacle card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "People and animals both need to move through our living place. Build a first path that you think will work for both.”",
          studentActionsBeforeEvidence: "Children create and test an initial shared route using person and animal models."
        },
        accessPathways: {
          languageRepresentation: "Give entrance, water, plant area, child figure, animal figure, and 5 path tiles. Say: ‘First make a path for the child. Now try the animal. Where does either one get stuck?’ Students place a STOP icon and change one tile.",
          supportedInvestigation: "Give the full path kit and a route card. Students build, test with child and animal separately, mark failures, and revise until both can reach required places without crushing plants.",
          coreInvestigation: "Students design a shared route under all constraints, collect movement evidence from both users, and justify the final path using position/motion language.",
          extendedChallenge: "Add the puddle obstacle card. Students create an alternate route using the same tile limit and compare which design is more resilient to change."
        },
        evidence1: {
          title: "EVIDENCE 1 • TWO MOVERS",
          scientificKnowledge: "Different people and animals can have different movement and access needs.",
          exactEvidencePackage: "Give movement cards for a walking person and selected small animal. Students model each through the same path.",
          studentWork: "Students notice different movement/access needs.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • OBSTACLE TEST",
          scientificKnowledge: "Testing a path with intended users can reveal obstacles or failures.",
          exactEvidencePackage: "Place a barrier/narrow point. Physically test whether both models can continue along the intended path.",
          studentWork: "Students collect path-performance evidence.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • CONFLICTING USERS",
          scientificKnowledge: "A path design may need to balance the needs of multiple users or organisms.",
          exactEvidencePackage: "Reveal that both people and animals need access but one area must remain protected. Students create separate/shared route solution and test.",
          studentWork: "Students revise from multiple-user constraints.",
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
          content: "Paths should be designed and tested based on how people/animals move and which areas/resources they need to reach."
        },
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a puddle obstacle card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        title: "Materials That Fit the Job",
        ncObjectives: ["PS.K.1.1", "PS.K.1.2"],
        primaryPractice: "Argument from Evidence",
        directInstructionContext: "Previously collected property evidence can be transferred to new material-selection jobs.",
        prepare: "TEACHER-READY MATERIAL-JOB SET: Jobs: SHADE ROOF, PATH, WATER HOLDER, PLANT SUPPORT. Materials: foil, cardboard, craft sticks, cotton cloth, plastic cup, paper, sponge, string. Give one JOB → MATERIAL mat. Children must assign materials and test at least one choice. Keep a “material supply is cut in half” constraint card aside.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "We have several jobs to do in our living place, but one material will not necessarily work for every job. Choose materials for the first version and explain why.”",
          studentActionsBeforeEvidence: "Children match materials to site jobs using remembered/observable properties before old evidence records return."
        },
        accessPathways: {
          languageRepresentation: "Give two jobs and four materials first. Say: ‘Touch the material. Which job could it do? Show me why.’ Students match one material to one job using an observable property.",
          supportedInvestigation: "Give all four job cards and materials plus JOB → MATERIAL mat. Students make matches, test one uncertain choice with a provided procedure, and revise the match if needed.",
          coreInvestigation: "Students assign materials to all site jobs, reuse prior material evidence, conduct targeted tests where evidence is missing, and justify each choice by property/function.",
          extendedChallenge: "Reveal ‘material supply is cut in half.’ Students redesign material assignments, decide where the strongest evidence matters most, and defend substitutions/tradeoffs."
        },
        evidence1: {
          title: "EVIDENCE 1 • RETURN OF WATER DATA",
          scientificKnowledge: "Scientific evidence about material properties can be reused in a new context.",
          exactEvidencePackage: "Give actual class/teacher-prepared water-test record from earlier project. Students use it to eliminate/choose candidates for water-related job.",
          studentWork: "Students transfer evidence across contexts.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • RETURN OF FLEXIBILITY / WEIGHT DATA",
          scientificKnowledge: "Different jobs require different combinations of material properties.",
          exactEvidencePackage: "Give bend and relative-weight record. Students match properties to flexible-cover or stable-boundary jobs.",
          studentWork: "Students integrate multiple property records.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • MULTI-PROPERTY JOB",
          scientificKnowledge: "When a job requires more than one property, material choices should be based on multiple pieces of evidence.",
          exactEvidencePackage: "Reveal one component must be both flexible and water resistant. Students compare two evidence columns and defend choice.",
          studentWork: "Students combine evidence rather than using a single property.",
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
          content: "Material suitability depends on the properties required by the job; scientific evidence from earlier investigations can support new decisions."
        },
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a “material supply is cut in half” constraint card aside. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        title: "Will It Work Through Changing Weather?",
        ncObjectives: ["ESS.K.1.1", "ESS.K.1.2", "ESS.K.1.3"],
        primaryPractice: "Analyzing Data & Designing Solutions",
        directInstructionContext: "Design performance can change with weather/season; pattern evidence helps anticipate conditions.",
        prepare: "TEACHER-READY SEASON STRESS TEST: Give each group its living-place model plus four condition cards: HOT/SUNNY, HEAVY RAIN, WINDY, COLD. Groups draw one card at a time and identify what may stop working. Keep a combined HOT + DRY condition card aside for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Your living place works today. But will it still work when the weather and season change? Your group must predict one future problem.”",
          studentActionsBeforeEvidence: "Children inspect the current design and identify a feature they think could be affected by changing conditions."
        },
        accessPathways: {
          languageRepresentation: "Give one weather card at a time. Say: ‘Look at your model. What part could have trouble in this weather?’ Students place the card beside one vulnerable feature and show one possible change.",
          supportedInvestigation: "Use the four condition cards with a stress-test mat: weather → feature affected → what might happen → change. Students complete one condition at a time and revise after each.",
          coreInvestigation: "Groups use seasonal/weather evidence to stress-test the whole living-place design, identify vulnerabilities, make revisions, and explain which evidence predicts each problem.",
          extendedChallenge: "Use the combined HOT + DRY card. Students reason about two conditions at once, prioritize revisions, and explain whether one change solves both problems or creates a tradeoff."
        },
        evidence1: {
          title: "EVIDENCE 1 • SEASON A DATA",
          scientificKnowledge: "Weather patterns can help predict conditions a design may need to handle.",
          exactEvidencePackage: "Give class data/photo set from one season showing a common condition relevant to site design. Students predict specific effects.",
          studentWork: "Students use seasonal pattern evidence to stress-test design.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • ENVIRONMENT CHANGE",
          scientificKnowledge: "Weather can produce environmental changes that affect how a design functions.",
          exactEvidencePackage: "Show before/after evidence of how that condition changes soil/path/material/plant area. Students identify vulnerable features.",
          studentWork: "Students connect weather to environmental change.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • CONTRASTING SEASON",
          scientificKnowledge: "A revision that helps in one seasonal condition may create a problem in another, so designs may require trade-offs.",
          exactEvidencePackage: "Give a different season's data with a different common condition. Students test whether first revision creates a new problem.",
          studentWork: "Students reason about trade-offs across changing conditions.",
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
          content: "Weather and seasonal patterns can be used to anticipate environmental changes and revise designs for different conditions."
        },
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use a combined HOT + DRY condition card aside for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        title: "Capstone Build, Test, Revise",
        ncObjectives: ["All objectives"],
        primaryPractice: "Multiple SEPs / Designing Solutions",
        directInstructionContext: "Integrated understanding is shown by using multiple evidence sources to build, test, explain, and revise.",
        prepare: "TEACHER-READY CAPSTONE KIT: Provide the group’s site model plus a common build tray: cardboard base, craft sticks, foil, paper, fabric, string, tape, blocks, cups, plant/animal/people figures, and weather cards. Require three tests: movement path, water/weather, and living-thing needs. Keep one surprise condition card—“part of the path is blocked”—for final transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "This is our final build, but scientists and engineers still test finished ideas. Build your best version, then be ready to let evidence change it.”",
          studentActionsBeforeEvidence: "Children construct a first capstone version using accumulated project artifacts and explain two evidence-based choices."
        },
        accessPathways: {
          languageRepresentation: "Give the group model and one test at a time: movement first, then water/weather, then living-thing needs. Say: ‘Run this test. Show me one place that works and one place that needs a change.’ Students revise after each test.",
          supportedInvestigation: "Provide the three-test checklist with icons. Students complete test → mark pass/problem → change one feature → retest before moving to the next test.",
          coreInvestigation: "Groups independently run all three capstone tests, collect evidence, prioritize revisions, and prepare an explanation linking final design features to living things, materials, motion/position, and weather.",
          extendedChallenge: "Reveal the surprise ‘part of the path is blocked’ condition. Students adapt the integrated design without undoing other successful features and defend the smallest effective revision."
        },
        evidence1: {
          title: "EVIDENCE 1 • USER / MOVEMENT TEST",
          scientificKnowledge: "Scientific and engineering solutions can integrate evidence about living things, materials, motion, position, and weather.",
          exactEvidencePackage: "Another group runs a toy person/animal through the model using position and movement criteria card; records one success and one problem.",
          studentWork: "Students use peer test evidence to revise spatial/movement design.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • WEATHER / MATERIAL TEST",
          scientificKnowledge: "Testing a model provides new evidence about whether an integrated solution works.",
          exactEvidencePackage: "Apply one standardized rain/wind simulation to relevant component. Compare result with prior material evidence.",
          studentWork: "Students test transfer of property/weather reasoning.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • LIVING-THING NEED / NEW CONSTRAINT",
          scientificKnowledge: "New evidence or constraints can require revision even near the end of the design process.",
          exactEvidencePackage: "Reveal a selected organism or new user need. Students point to resources/access and revise if the model does not meet it.",
          studentWork: "Students integrate life, physical, earth science, and engineering evidence.",
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
          content: "Scientists and engineers integrate evidence from multiple investigations to solve new problems and revise solutions."
        },
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use one surprise condition card—“part of the path is blocked”—for final transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
        title: "Science Portfolio Conference",
        ncObjectives: ["All objectives"],
        primaryPractice: "Communicating Information & Argument from Evidence",
        directInstructionContext: "Learning is visible in evidence-based revision and transfer, not vocabulary recall.",
        prepare: "TEACHER-READY PORTFOLIO KIT: Preselect or ask each child to choose one early-year artifact (sorting/model/weather drawing) and one later artifact (habitat/weather-ready/capstone). Give a two-panel MY THINKING THEN / MY THINKING NOW sheet and three oral prompt cards: I USED TO THINK… / NOW I THINK… / MY EVIDENCE IS…. Keep one new mixed science card showing a windy school garden with a bird and bent plant for transfer.",
        launch: {
          prompt: "Facilitator: “Look closely. What do you notice? What are you wondering? What does your group think right now? Show your thinking so another group can understand it.”",
          kindergartenTaskScript: "Choose one piece of science work from earlier in the year and one from later. Your job is to show how your thinking grew or changed.”",
          studentActionsBeforeEvidence: "Children select artifacts and prepare to explain a change in reasoning, not merely describe the pages."
        },
        accessPathways: {
          languageRepresentation: "Place one early and one later artifact in front of the child. Use THEN / NOW cards. Say: ‘Point to something you did before. Point to something you do differently now.’ Offer oral frames and scribe the child’s evidence statement.",
          supportedInvestigation: "Give the two-panel reflection sheet and three oral prompt cards. Student selects one change, rehearses with a partner, and attaches/points to the artifact detail that shows the change.",
          coreInvestigation: "Students independently compare early/later artifacts, explain how their scientific thinking or use of evidence changed, and support the reflection with specific work samples.",
          extendedChallenge: "Show the new mixed science card (windy school garden with bird and bent plant). Ask: ‘Use what you know now. What science ideas can help explain or improve this situation?’ Student integrates at least two ideas/practices from different projects."
        },
        evidence1: {
          title: "EVIDENCE 1 • EARLY VS LATER ARTIFACT",
          scientificKnowledge: "Scientists can compare earlier and later work to identify how their thinking changed.",
          exactEvidencePackage: "Place an early and later model/drawing side by side. Ask student to point to one scientific idea that changed and the evidence that changed it.",
          studentWork: "Student identifies growth in reasoning.",
          facilitatorPrompts: ["What new information do you have now?", "What does it support?", "What might you change?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "What do you notice in this evidence? Show me the part that matches the new information. What changed from your first idea?",
            coreReasoning: "How does this scientific information help you make a better decision/model/sort? What evidence from your work connects to it?",
            challengeExtend: "Where might this information NOT be enough by itself? What additional evidence would you want before making a stronger claim?"
          }
        },
        evidence2: {
          title: "EVIDENCE 2 • CROSS-PROJECT CONNECTION",
          scientificKnowledge: "Using the same scientific idea in a different project is evidence of transfer.",
          exactEvidencePackage: "Pair two artifacts using the same idea in different projects, e.g., material properties in Teddy cover and weather-ready design.",
          studentWork: "Student demonstrates transfer across contexts.",
          facilitatorPrompts: ["Use BOTH evidence sets. What pattern or relationship can your group see now?", "What can you say now that you could not say before?"],
          requiredGroupAction: "Visibly revise the group sort/model/claim/design or add an evidence marker before the next release.",
          questions: {
            slowDown: "Say the new scientific information in your own words. Can you show it with an object, picture, gesture, or model? How is it connected to Evidence 1?",
            coreReasoning: "Use Evidence 1 and Evidence 2 together. What relationship or pattern can you now explain?",
            challengeExtend: "Can you create or predict a case where Evidence 1 and Evidence 2 lead to different decisions? What variable or condition matters?"
          }
        },
        evidence3: {
          title: "EVIDENCE 3 • NOVEL WHAT-IF",
          scientificKnowledge: "Understanding is stronger when a learner can apply evidence-based reasoning to a new, unfamiliar situation.",
          exactEvidencePackage: "Give one new picture/object/scenario aligned to a covered objective. Student predicts/chooses/models and explains which prior evidence helps.",
          studentWork: "Student applies knowledge independently beyond rehearsed artifacts.",
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
          content: "Scientific understanding is demonstrated when students can explain how evidence changed their thinking and apply an idea to a new context."
        },
        individualTransferAssessment: "INDIVIDUAL TRANSFER: Use one new mixed science card showing a windy school garden with a bird and bent plant for transfer. Ask the child to apply the lesson’s scientific relationship to this NEW case and show or explain the evidence for the decision. A full written sentence is not required.",
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
