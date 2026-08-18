'use client';
import React, { useState, useEffect, useRef } from 'react';
const printingResources = {
  botbuilder: [
    // Student Lab Notebooks
    { id: 'bb-notebook-intro', category: 'Student Lab Notebooks', title: 'Unit Introduction Notebook', part: 'intro', pages: 8, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Contains initial chatbot observations, KWL charts, and Scratch account details.' },
    { id: 'bb-notebook-p1', category: 'Student Lab Notebooks', title: 'Part 1: Data, Data, Data Notebook', part: 'part1', pages: 12, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Records role definitions, cleaned lunch menus, and logic sequence maps.' },
    { id: 'bb-notebook-p2', category: 'Student Lab Notebooks', title: 'Part 2: All About Algorithms Notebook', part: 'part2', pages: 10, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Guides students through step-by-step algorithms, flowcharting, and sequence tracing.' },
    { id: 'bb-notebook-p3', category: 'Student Lab Notebooks', title: 'Part 3: Introduction to Variables Notebook', part: 'part3', pages: 10, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Focuses on variable storage, naming rules, and dynamic inputs.' },
    { id: 'bb-notebook-p4', category: 'Student Lab Notebooks', title: 'Part 4: Loops & Repetition Notebook', part: 'part4', pages: 12, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Teaches nested conditionals, decision rules, and test tables.' },
    { id: 'bb-notebook-share', category: 'Student Lab Notebooks', title: 'Unit Share / Reflection Notebook', part: 'share', pages: 6, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Final reflection worksheets, user surveys, and peer feedback metrics.' },

    // Student Learning Resources (Part 1)
    { id: 'bb-res-mission', category: 'Student Learning Resources', title: 'AI Engineer Mission Sheet', part: 'intro', pages: 2, ratio: '1 per student', mode: 'Printable Recommended', directions: 'Introduces the chatbot challenge scenario, team roles, and initial system problem.' },
    { id: 'bb-res-inquiry', category: 'Student Learning Resources', title: 'Human vs. AI Language Challenge', part: 'part1', pages: 1, ratio: '1 per pair', mode: 'Digital + Printable', directions: 'Worksheet comparing how humans and computers process similar phrases.' },
    { id: 'bb-res-detective', category: 'Student Learning Resources', title: 'Data Detective Challenge', part: 'part1', pages: 3, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Contains the messy lunch menu database containing duplicate records, spelling typos, and outdated pricing.' },
    { id: 'bb-res-brainstorm', category: 'Student Learning Resources', title: 'Real-World Problem Brainstorm', part: 'part1', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Structured brainstorm map using the Problem -> User -> Data -> Solution framework.' },

    // Student Learning Resources (Part 2)
    { id: 'bb-res-robot-map', category: 'Student Learning Resources', title: 'School Robot Navigation Map', part: 'part2', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'School blueprint grid showing Nurse office, room 205, intersections, hallways, charging station, and stairs.' },
    { id: 'bb-res-alg-plan', category: 'Student Learning Resources', title: 'Algorithm Planning Sheet', part: 'part2', pages: 2, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Drafting sheet for writing exact, step-by-step sequential movement rules for the delivery robot.' },
    { id: 'bb-res-flow-symbol', category: 'Student Learning Resources', title: 'Flowchart Symbol Reference Card', part: 'part2', pages: 1, ratio: '1 per pair', mode: 'Digital + Printable', directions: 'Reference definition card for Oval (Start/End), Rectangle (Action), and Diamond (Decision) symbols.' },
    { id: 'bb-res-flow-canvas', category: 'Student Learning Resources', title: 'Flowchart Design Canvas', part: 'part2', pages: 2, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Grid canvas template for drawing algorithm logic using shapes connected by direction arrows.' },
    { id: 'bb-res-block-card', category: 'Student Learning Resources', title: 'New Information Card: Hallway Blocked', part: 'part2', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Scenario card detailing blocked hallways to trigger dynamic route iteration.' },
    { id: 'bb-res-bat-card', category: 'Student Learning Resources', title: 'New Constraint Card: Low Battery', part: 'part2', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Rerouting override condition card triggering charging station checks if battery drops below 20%.' },
    { id: 'bb-res-door-card', category: 'Student Learning Resources', title: 'New Constraint Card: Door Closed', part: 'part2', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Exception handler card defining robot response behaviors if Room 205 door is locked.' },
    { id: 'bb-res-scenario-cards', category: 'Student Learning Resources', title: 'Scenario Stress-Test Cards', part: 'part2', pages: 2, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Stress testing scenario deck combining obstacle configurations, low battery, and locked target rooms.' },
    { id: 'bb-res-test-log', category: 'Student Learning Resources', title: 'Engineering Test Log', part: 'part2', pages: 2, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Audit table for logging inputs, expected paths, actual paths, failure points, and debug suggestions.' },
    { id: 'bb-res-alg-revision', category: 'Student Learning Resources', title: 'Algorithm Revision Sheet', part: 'part2', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Log sheet to document code and logic fixes made during debugging loops.' },
    { id: 'bb-res-gallery-walk', category: 'Student Learning Resources', title: 'Gallery Walk Feedback Sheet', part: 'part2', pages: 1, ratio: '1 per student', mode: 'Printable Recommended', directions: 'Peer review evaluation sheet tracking I Noticed, I Wonder, and Have You Considered feedback.' },
    { id: 'bb-res-exit-ticket', category: 'Student Learning Resources', title: 'AI Engineer Exit Ticket', part: 'part2', pages: 2, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Individual metacognitive exit ticket covering algorithms, sequence, and efficiency.' },

    // Student Learning Resources (Part 3)
    { id: 'bb-res-greenhouse-mission', category: 'Student Learning Resources', title: 'Smart Greenhouse Mission Card', part: 'part3', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Introduction sheet outlining the smart greenhouse challenge and plant health conditions.' },
    { id: 'bb-res-sort-cards', category: 'Student Learning Resources', title: 'Stays the Same / Can Change Cards', part: 'part3', pages: 1, ratio: '1 set per team', mode: 'Printable Recommended', directions: 'Sorting cards for classifying greenhouse name, windows, temperature, soil moisture, and water tank variables.' },
    { id: 'bb-res-mem-box', category: 'Student Learning Resources', title: 'Variable Memory Box Cards', part: 'part3', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Physical labels for Temperature, Soil Moisture, and Water Level memory cups or envelopes.' },
    { id: 'bb-res-event-cards', category: 'Student Learning Resources', title: 'Greenhouse Event Cards', part: 'part3', pages: 2, ratio: '1 set per team', mode: 'Printable Recommended', directions: 'Scenario event cards (Sun, Plant uses water, Water turns on, Night) that trigger changes to variables.' },
    { id: 'bb-res-conditions-timeline', category: 'Student Learning Resources', title: 'Changing Conditions Timeline', part: 'part3', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'A worksheet timeline tracking variable changes from morning to afternoon.' },
    { id: 'bb-res-greenhouse-canvas', category: 'Student Learning Resources', title: 'Smart Greenhouse Design Canvas', part: 'part3', pages: 2, ratio: '1 per team', mode: 'Printable Recommended', directions: 'System design canvas with 10 questions covering plant protection rules and logic checkpoints.' },
    { id: 'bb-res-var-plan', category: 'Student Learning Resources', title: 'Variable Planning Sheet', part: 'part3', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'A simple sheet mapping variable names to starting values and events.' },
    { id: 'bb-res-stress-scenarios', category: 'Student Learning Resources', title: 'Greenhouse Scenario Cards', part: 'part3', pages: 1, ratio: '1 set per pair', mode: 'Optional Print', directions: 'Stress-testing scenarios (A to E) to audit greenhouse reaction rules.' },
    { id: 'bb-res-greenhouse-test-log', category: 'Student Learning Resources', title: 'Variable Test Log', part: 'part3', pages: 2, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Audit table logging Starting Values | What Changed? | Expected New Value | Expected Response.' },
    { id: 'bb-res-greenhouse-debug', category: 'Student Learning Resources', title: 'Debugging Sheet', part: 'part3', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Diagnostics checklist for tracing variable bugs, resets, and checks.' },
    { id: 'bb-res-water-saving', category: 'Student Learning Resources', title: 'Water-Saving Challenge Card', part: 'part3', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Optimization card explaining the water-saving rules and trade-offs.' },
    { id: 'bb-res-var-gallery-walk', category: 'Student Learning Resources', title: 'Gallery Walk Feedback Sheet', part: 'part3', pages: 1, ratio: '1 per student', mode: 'Printable Recommended', directions: 'Peer review sheets with I noticed, I wonder, and Have you considered columns.' },
    { id: 'bb-res-var-exit-ticket', category: 'Student Learning Resources', title: 'Exit Ticket', part: 'part3', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Individual exit ticket with 8 conceptual and reflection questions for Grades 4-5.' },
    
    // Student Learning Resources (Part 4)
    { id: 'bb-res-recycling-mission', category: 'Student Learning Resources', title: 'Smart Recycling Sorter Mission Card', part: 'part4', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Introduction to the school conveyor belt challenge, waste categories, and roles.' },
    { id: 'bb-res-recycling-items', category: 'Student Learning Resources', title: 'Recycling Item Cards', part: 'part4', pages: 2, ratio: '1 set per team', mode: 'Printable Recommended', directions: 'Conveyor belt item cards representing plastic bottles, paper, cans, and food waste.' },
    { id: 'bb-res-bin-labels', category: 'Student Learning Resources', title: 'Sorting Bin Labels', part: 'part4', pages: 1, ratio: '1 set per team', mode: 'Printable Recommended', directions: 'Labels for Plastic, Paper, Can, and Food Waste physical sorting bins.' },
    { id: 'bb-res-20-items', category: 'Student Learning Resources', title: '20-Item Challenge Card', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Problem-solving activity card demonstrating the inefficiency of copy-pasting code blocks.' },
    { id: 'bb-res-repeated-instructions', category: 'Student Learning Resources', title: 'Repeated Instruction Cards', part: 'part4', pages: 1, ratio: '1 set per team', mode: 'Printable Recommended', directions: 'Shorthand code block templates for identifying patterns in repeated execution.' },
    { id: 'bb-res-loop-detective', category: 'Student Learning Resources', title: 'Loop Detective Cards', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Auditing sheet for mapping everyday routines to REPEAT loop structures.' },
    { id: 'bb-res-unknown-items', category: 'Student Learning Resources', title: 'Unknown Number of Items Card', part: 'part4', pages: 1, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Lesson hook introducing unknown stream counts and conditional loop rules.' },
    { id: 'bb-res-count-constraint', category: 'Student Learning Resources', title: 'Count the Items Constraint Card', part: 'part4', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Instructional card explaining how variables increment inside conveyor loops.' },
    { id: 'bb-res-counter-cards', category: 'Student Learning Resources', title: 'Recycling Counter Cards', part: 'part4', pages: 1, ratio: '1 set per pair', mode: 'Optional Print', directions: 'Memory registry card tracking variable totals for plastic, paper, and cans.' },
    { id: 'bb-res-infinite-loop', category: 'Student Learning Resources', title: 'Infinite Loop Challenge Card', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Diagnostics sheet showing what causes frozen loops and how to fix them.' },
    { id: 'bb-res-sorter-canvas', category: 'Student Learning Resources', title: 'Smart Sorter Design Canvas', part: 'part4', pages: 2, ratio: '1 per team', mode: 'Printable Recommended', directions: '10-point system canvas outlining loop boundaries, variables, and error paths.' },
    { id: 'bb-res-loop-plan', category: 'Student Learning Resources', title: 'Loop Planning Sheet', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Scratch loop implementation blueprint for building conveyor cycles.' },
    { id: 'bb-res-stress-scenarios-loop', category: 'Student Learning Resources', title: 'Recycling Scenario Cards', part: 'part4', pages: 1, ratio: '1 set per team', mode: 'Optional Print', directions: 'Sorter stress test items to check loop counts, categories, and stops.' },
    { id: 'bb-res-loop-test-log', category: 'Student Learning Resources', title: 'Loop Test Log', part: 'part4', pages: 2, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Auditing log tracking Expected vs. Actual Repeats, counts, and errors.' },
    { id: 'bb-res-loop-debug', category: 'Student Learning Resources', title: 'Loop Debugging Sheet', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Troubleshooting sheet for infinite loops, early-stops, and incorrect variables.' },
    { id: 'bb-res-recycling-rush', category: 'Student Learning Resources', title: 'School Recycling Rush Card', part: 'part4', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Final conveyor rush challenge card evaluating automation efficiency.' },
    { id: 'bb-res-loop-gallery', category: 'Student Learning Resources', title: 'Gallery Walk Feedback Sheet', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Printable Recommended', directions: 'Peer review form tracking observations, wonders, and ideas.' },
    { id: 'bb-res-loop-exit-ticket', category: 'Student Learning Resources', title: 'Exit Ticket', part: 'part4', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: '10 individual reflection questions mapping loop concepts to Grades 4-5.' },
    
    // Student Learning Resources (Unit Share)
    { id: 'bb-res-eng-check', category: 'Student Learning Resources', title: 'Final Engineering Checklist', part: 'share', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: '9-point final check list covering problem definition, target user, knowledge lists, variables, and improvements.' },
    { id: 'bb-res-user-test', category: 'Student Learning Resources', title: 'User Testing Form', part: 'share', pages: 2, ratio: '1 per pair', mode: 'Digital + Printable', directions: 'Authentic user test logs for outside peers to record questions asked, confusion points, and helpful comments.' },
    { id: 'bb-res-iteration', category: 'Student Learning Resources', title: 'Final Iteration Canvas', part: 'share', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Design improvement template to document before/after code adjustments based on user observations.' },
    { id: 'bb-res-expo-guide', category: 'Student Learning Resources', title: 'Design Expo Presentation Guide', part: 'share', pages: 2, ratio: '1 per team', mode: 'Digital + Printable', directions: '10-step speech structure guide covering problem, user, algorithm, variables, live demo, and version 2 plans.' },
    { id: 'bb-res-peer-feed', category: 'Student Learning Resources', title: 'Peer Feedback Form', part: 'share', pages: 1, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Audience evaluation sheets tracking Strength, Idea, and Question (S-I-Q) metrics.' },
    { id: 'bb-res-individual-ref', category: 'Student Learning Resources', title: 'Individual AI Engineer Reflection', part: 'share', pages: 2, ratio: '1 per student', mode: 'Digital + Printable', directions: '10-question metacognitive evaluation worksheet covering personal contribution and coding concepts.' }
  ],
  ecoengineering: [
    { id: 'eco-res-runoff', category: 'Student Learning Resources', title: 'Runoff Drainage Simulation Sheet', part: 'part1', pages: 2, ratio: '1 per student', mode: 'Printable Recommended', directions: 'Guides students through physical soil layers, recording porosity variables, and testing infiltration rates.' },
    { id: 'eco-res-turbine', category: 'Student Learning Resources', title: 'Wind Turbine Vectors Map', part: 'part2', pages: 1, ratio: '1 per team', mode: 'Digital + Printable', directions: 'Traces blade counts and angle pitch calculations against grid energy loads.' },
    { id: 'eco-res-chem', category: 'Student Learning Resources', title: 'Chemical Filtration Logs', part: 'part3', pages: 2, ratio: '1 per student', mode: 'Digital + Printable', directions: 'Worksheets for mapping pH values and drops needed to neutralize acidic stormwater.' },
    { id: 'eco-res-tower', category: 'Student Learning Resources', title: 'Structural Loads Blueprint', part: 'part4', pages: 3, ratio: '1 per team', mode: 'Printable Recommended', directions: 'Blueprints for building seismic resistant towers and recording shake table load tests.' }
  ]
};

const prepChecklist = {
  botbuilder: {
    all: [
      'Preview Teacher Mode lesson steps and PD guides.',
      'Confirm student Scratch accounts are active and working.',
      'Prepare teacher chatbot demonstration example.',
      'Set up KWL chart paper or digital whiteboard.',
      'Print student notebooks and distribute to teams.'
    ],
    intro: [
      'Read through the Unit Story: The School Menu Distraction.',
      'Verify students have access to Scratch tutorials.',
      'Prepare the Pair Programming manifesto pad.',
      'Print Team Role cards (1 set per team).'
    ],
    part1: [
      'Preview PD guides: "Data Quality and AI" and "Facilitating Data Detective".',
      'Print Data Detective Challenge sheet (1 per team).',
      'Print Knowledge Base Design Canvas (1 per team).',
      'Prepare Scratch List reference cards (1 per pair).',
      'Print Break the Bot testing sheets if using paper logs.'
    ],
    part2: [
      'Read PD guides: "Teaching Algorithms" and "Computational Thinking".',
      'Print School Robot Navigation Maps (1 per team).',
      'Print Algorithm Planning Sheets and Flowchart Design Canvases.',
      'Prepare Scenario Cards (Hallway Blocked, Low Battery, Door Closed) and Stress-Test Cards.',
      'Print Engineering Test Logs and Algorithm Revision Sheets.',
      'Verify student Scratch workspace has the robot sprite and school backdrop configured.',
      'Print AI Engineer Exit Tickets (1 per student).'
    ],
    part3: [
      'Read PD guides: "Understanding Variables" and "Scratch Variables".',
      'Print Smart Greenhouse Mission Cards (1 per team).',
      'Print Stays the Same / Can Change Sorting Cards (1 set per team).',
      'Prepare physical Memory Boxes/envelopes and label cards.',
      'Print Greenhouse Event Cards & limited water constraint cards.',
      'Print Changing Conditions Timeline worksheets.',
      'Print Smart Greenhouse Design Canvas (1 per team).',
      'Print Variable Planning Sheets & Scenario Cards.',
      'Print Variable Test Logs and Debugging Sheets (1 per team).',
      'Print Water-Saving Challenge Cards & Exit Tickets.'
    ],
    part4: [
      'Read PD guides: "Understanding Loops" and "Repetition in Programming".',
      'Print Smart Recycling Sorter Mission Cards (1 per team).',
      'Print Sorting Bin Labels and waste item cards (plastic, paper, can, food).',
      'Print 20-Item Challenge cards and Loop Detective Sheets.',
      'Prepare physical bins (labeled Plastic, Paper, Can, Food) for Hour 1 activity.',
      'Print Smart Sorter Design Canvas (1 per team).',
      'Print Loop Planning Sheets (1 per student).',
      'Print Recycling Stress-Test Scenario Cards & Loop Test Logs.',
      'Print Loop Debugging Sheets (1 per student).',
      'Print School Recycling Rush Challenge Cards & Exit Tickets.'
    ],
    share: [
      'Read PD guides: "Facilitating Presentations" and "Peer Feedback Protocols".',
      'Print User Testing Form (1 set per pair).',
      'Print Final Engineering Checklist (1 per team).',
      'Prepare peer evaluation cards and sentence starters.'
    ]
  },
  ecoengineering: {
    all: [
      'Check water quality testing sensors calibration.',
      'Verify students have soil sample kits ready.',
      'Prepare storm simulation runoff container layers.'
    ],
    intro: ['Explain rain stormwater impacts on urban ponds.'],
    part1: ['Set soil moisture sensors threshold settings.'],
    part2: ['Assemble wind turbine rotor blades kits.'],
    part3: ['Prepare chemical pH test indicator drop sets.'],
    part4: ['Construct wooden base shake tables for towers.'],
    share: ['Design final sustainable environmental map posters.']
  }
};

const pdResources = {
  botbuilder: [
    {
      id: "understanding-algorithms",
      title: "Teaching Algorithms",
      category: "Concept Knowledge",
      categoryColor: "indigo",
      description: "Learn how to introduce algorithms to Grades 4-5 as ordered, specific sequences of directions using off-screen roleplays.",
      whyThisMatters: "Students must understand that computers cannot guess intent; they execute exact sequences literally.",
      whatTeachersNeedToKnow: "Focus on sequence, completeness, and literal execution. Keep definitions simple: 'An algorithm is a step-by-step recipe.'",
      whenToUseThis: "Recommended before: Part 2 - Hour 1: Robot Teacher Challenge",
      whatToSay: '"An algorithm is like a recipe. If you scramble the order or miss a step, the program won\'t work."',
      questions: [
        "What happens when steps are out of order?",
        "Why must instructions be specific?"
      ],
      misconceptions: [
        "Students think computers are smart enough to guess missing instructions. Emphasize literal execution."
      ],
      lookFor: "Students explaining the sequence logically.",
      quickStrategy: "Perform the 'Robot Sandwich' demonstration where you make a mess by following vague steps literally."
    },
    {
      id: "comp-thinking",
      title: "Computational Thinking",
      category: "Concept Knowledge",
      categoryColor: "indigo",
      description: "Introduction to decomposition, pattern recognition, and abstraction in chatbot architectures.",
      whyThisMatters: "Builds problem-solving skills that map to standard software planning frameworks.",
      whatTeachersNeedToKnow: "Decomposition breaks the chatbot into Data, Algorithms, Variables, and Conditionals. Abstraction ignores minor wording differences to match keywords.",
      whenToUseThis: "Recommended before: Part 2 - Hour 1",
      whatToSay: '"We solve big problems by breaking them down into steps, ignoring useless details, and writing rules."',
      questions: [
        "How can we simplify our user question categories?",
        "What patterns are we matching?"
      ],
      misconceptions: [
        "Computational thinking requires code. Remind students it is a thinking process used in daily tasks."
      ],
      lookFor: "Students breaking tasks into flow diagrams.",
      quickStrategy: "Ask students to write down their morning routine in exactly 4 steps."
    },
    {
      id: "debug-strategies",
      title: "Debugging Strategies",
      category: "Facilitation Strategy",
      categoryColor: "amber",
      description: "Support productive struggle by guiding students to diagnose coding issues without giving them the answers.",
      whyThisMatters: "Builds persistence, metacognition, and self-sufficiency in software design.",
      whatTeachersNeedToKnow: "Ask tracing questions rather than pointing to syntax. Guide students to check their design flowchart.",
      whenToUseThis: "Recommended before: Part 2 - Hour 2",
      whatToSay: 'Let\'s trace it. What line does the computer execute first? What does it do next?',
      questions: [
        "What did you expect to happen?",
        "Where does the program diverge from your plan?"
      ],
      lookFor: "Students reading through their block sequences step-by-step.",
      quickStrategy: "Have students use a rubber duck to explain their code line-by-line."
    },
    {
      id: "understanding-variables",
      title: "Understanding Variables",
      category: "Concept Knowledge",
      categoryColor: "indigo",
      description: "Conceptual breakdown of variables as labeled containers that hold dynamic, changing values.",
      whyThisMatters: "Variables allow programs to personalize interactions and store states in memory.",
      whatTeachersNeedToKnow: "A variable has a Name (constant label, e.g., userName) and a Value (changing content, e.g., 'Maya').",
      whenToUseThis: "Recommended before: Part 3 - Hour 1",
      whatToSay: '"A variable is like a storage box. The label on the box stays the same, but we can change what\'s inside."',
      questions: [
        "What stays the same about a variable? What changes?",
        "Why does a chatbot need to remember info?"
      ],
      misconceptions: [
        "Students confuse the label with the value. Clarify with physical boxes."
      ],
      lookFor: "Students referring to variables by their descriptive names.",
      quickStrategy: "Use labeled envelopes containing index cards to physically demonstrate variable updates."
    },
    {
      id: "scratch-variables",
      title: "Scratch Variables",
      category: "Scratch Support",
      categoryColor: "blue",
      description: "Step-by-step visual support for initializing, updating, and outputting variables in Scratch blocks.",
      whyThisMatters: "Translates the abstract concept of memory variables into block execution states.",
      whatTeachersNeedToKnow: "Use 'make a variable' in the orange block section. Initialize them at start, and use 'join' blocks to print them.",
      whenToUseThis: "Recommended before: Part 3 - Hour 2",
      whatToSay: 'We use the orange SET block to store values, and drag the round variable circle into our SAY block to output it.'
    },
    {
      id: "conceptual-analogies",
      title: "Supporting Conceptual Understanding",
      category: "Facilitation Strategy",
      categoryColor: "amber",
      description: "Using physically interactive models (boxes, roleplaying) to clarify dynamic computer memory.",
      whyThisMatters: "Provides hands-on models for abstract CS elements to bridge concrete and symbolic reasoning.",
      whatTeachersNeedToKnow: "Guide students to perform the physical variables badge game before coding in Scratch.",
      whenToUseThis: "Recommended before: Part 3 - Hour 1"
    },
    {
      id: "teaching-conditionals",
      title: "Teaching Conditionals",
      category: "Concept Knowledge",
      categoryColor: "indigo",
      description: "Learn how to guide students to build branch logic using IF/THEN and IF/THEN/ELSE conditional blocks.",
      whyThisMatters: "Conditionals are the gateway to programmatic decision-making and logic gating.",
      whatTeachersNeedToKnow: "An IF statement checks if a rule is True. IF/ELSE provides a backup pathway if it is False.",
      whenToUseThis: "Recommended before: Part 4 - Hour 1",
      whatToSay: 'IF the condition is met, do Action A. ELSE, do Action B.'
    },
    {
      id: "decision-trees",
      title: "Decision Trees",
      category: "Facilitation Strategy",
      categoryColor: "amber",
      description: "How to help students map nested logic rules visually using yes/no decision tree branches.",
      whyThisMatters: "Simplifies complex logic chains before coding, preventing syntax spaghetti errors.",
      whatTeachersNeedToKnow: "Ensure every decision diamond has exactly two outgoing paths: YES and NO.",
      whenToUseThis: "Recommended before: Part 4 - Hour 1"
    },
    {
      id: "testing-edge-cases",
      title: "Testing and Edge Cases",
      category: "Facilitation Strategy",
      categoryColor: "amber",
      description: "Guidance for facilitating stress-tests, handling typos, and managing unexpected user inputs.",
      whyThisMatters: "Encourages students to build resilient systems and acknowledge limitations gracefully.",
      whatTeachersNeedToKnow: "Guide students to test nonsense queries ('xyz') to verify that their ELSE fallback block triggers correctly.",
      whenToUseThis: "Recommended before: Part 4 - Hour 2"
    },
    {
      id: "facilitating-presentations",
      title: "Facilitating Student Presentations",
      category: "Facilitation Strategy",
      categoryColor: "amber",
      description: "Strategies for structuring student live demonstrations, audience interactions, and 'Break the Bot' showcases.",
      whyThisMatters: "Promotes student agency, public speaking, and confidence in design ownership.",
      whatTeachersNeedToKnow: "Enforce the 10-point presentation structure. Keep presentations concise (~3 minutes per team).",
      whenToUseThis: "Recommended before: Unit Share - Expo Day"
    },
    {
      id: "peer-feedback-protocols",
      title: "Peer Feedback",
      category: "Assessment",
      categoryColor: "rose",
      description: "Establish routines for collecting specific, helpful, and kind peer feedback using Strength-Idea-Question cards.",
      whyThisMatters: "Builds a collaborative classroom culture and constructive code-review practices.",
      whatTeachersNeedToKnow: "Sentence starters prevent generic 'good job' feedback and lead to actionable upgrades.",
      whenToUseThis: "Recommended before: Unit Share - Day 23"
    },
    {
      id: "authentic-assessment",
      title: "Authentic Assessment",
      category: "Assessment",
      categoryColor: "rose",
      description: "Rubrics and matrices for evaluating student progress in problem solving, logic flows, variables, and iteration.",
      whyThisMatters: "Ensures assessment reflects engineering practices and concept mastery rather than syntax memorization.",
      whatTeachersNeedToKnow: "Assess students iteratively using observations, notebooks, and design canvases.",
      whenToUseThis: "Recommended before: Unit Share - Day 25"
    }
  ],
  ecoengineering: [
    {
      id: "eco-overview",
      title: "EcoEngineering Overview",
      category: "Concept Knowledge",
      categoryColor: "indigo",
      description: "Overview of runoff water filtration, stormwater retention, and sustainable civil design.",
      whyThisMatters: "Connects physics and engineering to environmental protection.",
      whatTeachersNeedToKnow: "Urban infrastructure prevents flooding by using permeable surfaces, retention ponds, and bioswales.",
      whenToUseThis: "Recommended before: Unit Introduction"
    },
    {
      id: "runoff-dynamics",
      title: "Stormwater Runoff Dynamics",
      category: "Concept Knowledge",
      categoryColor: "indigo",
      description: "Introduction to soil porosity, impermeable surfaces, and urban flood variables.",
      whyThisMatters: "Explains soil filtration variables.",
      whatTeachersNeedToKnow: "Soil porosity and material layers filter out toxins before water reaches underground aquifers.",
      whenToUseThis: "Recommended before: Part 1 - Irrigation & Soil Codes"
    },
    {
      id: "scratch-physics",
      title: "Teaching Variables in Physical Simulations",
      category: "Scratch Support",
      categoryColor: "blue",
      description: "Strategies for guiding students to configure multiple variables (height, load, pitch) dynamically.",
      whyThisMatters: "Helps students understand how physical values map to code variables.",
      whatTeachersNeedToKnow: "Variables in physical simulations correspond directly to material parameters and environmental forces.",
      whenToUseThis: "Recommended before: Part 3 - Chemical Filtration"
    }
  ]
};
const getCategoryStyles = (category) => {
  switch (category) {
    case 'Concept Knowledge': return { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' };
    case 'Facilitation Strategy': return { bg: 'rgba(245°, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245°, 158, 11, 0.2)' };
    case 'Scratch Support': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)' };
    case 'Student Agency': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)' };
    case 'Assessment': return { bg: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.2)' };
    case 'Responsible AI': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.2)' };
    case 'Career Connection': return { bg: 'rgba(20, 184, 166, 0.1)', color: '#2dd4bf', border: '1px solid rgba(20, 184, 166, 0.2)' };
    default: return { bg: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' };
  }
};
export default function Curriculum() {
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'teacher'
  const [schoolLevel, setSchoolLevel] = useState('elementary'); // 'elementary' or 'middle'
  const [activeChallenge, setActiveChallenge] = useState(null); // null, 'chatbot', 'solar', 'chemistry', 'bridge', 'irrig', 'wind', 'water', 'tower'
  const [activeDay, setActiveDay] = useState(1);
  const [points, setPoints] = useState(0);
  /* --- Teacher Mode States --- */
const [teacherUnit, setTeacherUnit] = useState('botbuilder'); // 'botbuilder' or 'ecoengineering'
const [activeTeacherTab, setActiveTeacherTab] = useState('overview');
const [activePart1SubTab, setActivePart1SubTab] = useState('overview');
  const [activePart2SubTab, setActivePart2SubTab] = useState('overview');
  const [activePart3SubTab, setActivePart3SubTab] = useState('overview');
  const [activePart4SubTab, setActivePart4SubTab] = useState('overview');
  const [chatbotMissions, setChatbotMissions] = useState({
    c2Blocks: [
      { id: '3', text: '3. Identify matching information.' },
      { id: '1', text: '1. Listen to user question.' },
      { id: '5', text: '5. Display response.' },
      { id: '2', text: '2. Extract query keywords.' },
      { id: '4', text: '4. Retrieve matching data.' }
    ],
    c2IsAlgoCorrect: false,
    c3VarHunt: {
      studentName: null,
      currentScore: null,
      favoriteColor: null,
      questionsCount: null,
      schoolName: null,
      chatbotTitle: null
    },
    c5Checklist: {
      problem: false,
      user: false,
      data: false,
      algorithm: false,
      variable: false,
      conditional: false,
      testing: false,
      limitation: false,
      iteration: false
    }
  });

  const updateMissionField = (key, val) => {
    setChatbotMissions(prev => ({ ...prev, [key]: val }));
  };

  const triggerPrintResource = (res) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow pop-ups to open the print layout!");
      return;
    }

    let contentHtml = '';

    if (res.id === 'bb-role-cards-badge') {
      contentHtml = `
        <div class="header">
          <h1>Discovery Lab - AI BotBuilder</h1>
          <h2>Team Engineering Role Badges</h2>
          <p class="meta">Print, cut out, and fold these badges for team roles</p>
        </div>
        <div class="badges-grid">
          <div class="badge-card primary">
            <span class="badge-role">AI Engineer / User</span>
            <p>Responsible for drafting user prompts, identifying edge cases, and verifying search responses.</p>
            <div class="badge-cut-line">Cut out here</div>
          </div>
          <div class="badge-card secondary">
            <span class="badge-role">AI Bot sprite / Chatbot</span>
            <p>Acts out the algorithm literally. Executes exact conditional rules and keyword matching instructions.</p>
            <div class="badge-cut-line">Cut out here</div>
          </div>
          <div class="badge-card success">
            <span class="badge-role">Algorithm Engineer</span>
            <p>Designs logic flowcharts, initializes memory variables, and writes Scratch command code blocks.</p>
            <div class="badge-cut-line">Cut out here</div>
          </div>
        </div>
      `;
    } else if (res.id === 'bb-all-notebooks') {
      contentHtml = `
        <div class="header">
          <h1>Discovery Lab - AI BotBuilder</h1>
          <h2>Combined Student Lab Notebooks Booklet</h2>
          <p class="meta">Complete 52-page workbook sequence for Grades 4-5</p>
        </div>
        <div class="content">
          <div class="booklet-section">
            <h3>Module 1: Unit Introduction (KWL & Accounts)</h3>
            <p>Write Scratch accounts, password details, and fill out what you know about chatbots:</p>
            <div class="notes-box" style="height: 100px;"></div>
          </div>
          <div class="booklet-section">
            <h3>Module 2: Part 1 - Data, Data, Data (Cleaning Menu)</h3>
            <p>Identify duplicate Pizza entrees, typos in Chicken Nuggets, and design user persona:</p>
            <div class="notes-box" style="height: 100px;"></div>
          </div>
          <div class="booklet-section">
            <h3>Module 3: Part 2 - All About Algorithms (Flowcharts)</h3>
            <p>Draft Ovals (Start), Rectangles (Action), and Diamonds (Decisions) flowchart sequence:</p>
            <div class="notes-box" style="height: 100px;"></div>
          </div>
          <div class="booklet-section">
            <h3>Module 4: Part 3 - Introduction to Variables (userName Memory)</h3>
            <p>Define custom variable storage names and values (e.g. userName = Student):</p>
            <div class="notes-box" style="height: 100px;"></div>
          </div>
          <div class="booklet-section">
            <h3>Module 5: Part 4 - Crazy About Conditionals (IF/THEN/ELSE)</h3>
            <p>Map keyword rules and fallback triggers for unhandled inputs:</p>
            <div class="notes-box" style="height: 100px;"></div>
          </div>
          <div class="booklet-section">
            <h3>Module 6: Unit Share - Design Expo Pitch</h3>
            <p>Draft presentation talking points and compile peer S-I-Q feedback ratings:</p>
            <div class="notes-box" style="height: 100px;"></div>
          </div>
        </div>
      `;
    } else if (res.id.includes('bb-notebook')) {
      contentHtml = `
        <div class="header">
          <h1>Discovery Lab Student Lab Notebook</h1>
          <h2>${res.title}</h2>
          <p class="meta">Lesson Connection: ${res.part.toUpperCase()} | Pages: ${res.pages} | quantity: ${res.ratio}</p>
        </div>
        <div class="content">
          <h3>Student Learning Directions</h3>
          <p>${res.directions}</p>
          
          <div class="section-box">
            <h3>1. Lesson KWL Brainstorming</h3>
            <table class="print-table">
              <thead>
                <tr>
                  <th style="width:33%">What I KNOW (K)</th>
                  <th style="width:33%">What I WANT to Learn (W)</th>
                  <th style="width:33%">What I LEARNED (L)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="height:120px">
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <h3>2. Lab Activities Observations & Tracing</h3>
            <p>Record your algorithm loops, Scratch screenshots, variable parameters, and testing inputs here:</p>
            <div class="notes-box" style="height:180px;"></div>
          </div>
        </div>
      `;
    } else if (res.id === 'bb-res-detective') {
      contentHtml = `
        <div class="header">
          <h1>Discovery Lab Worksheet</h1>
          <h2>${res.title}</h2>
          <p class="meta">Connection: ${res.part.toUpperCase()} | recommended: ${res.ratio}</p>
        </div>
        <div class="content">
          <h3>Student Directions</h3>
          <p>${res.directions}</p>
          
          <h3>Messy Lunch Menu Dataset</h3>
          <p>Clean the following database table by removing duplicate monday pizza entrees, correcting spelling errors, and assigning pricing:</p>
          <table class="print-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Entree Option</th>
                <th>Price</th>
                <th>Validation / Cleanup Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Monday</td><td>Cheese Pizza</td><td>$3.00</td><td></td></tr>
              <tr><td>Monday</td><td>Cheese Pizza (Duplicate)</td><td>$3.00</td><td>[DUPLICATE - Delete this record]</td></tr>
              <tr><td>Tuesday</td><td>Checken Nugets (Typo)</td><td>--</td><td>[TYPO - Change to Chicken Nuggets, assign $3.50]</td></tr>
              <tr><td>Wednesday</td><td>Salad</td><td>$2.50</td><td></td></tr>
              <tr><td>Thursday</td><td>Spaghetti (Outdated)</td><td>$1.50</td><td>[OUTDATED - Check pricing]</td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else {
      contentHtml = `
        <div class="header">
          <h1>Discovery Lab Worksheet</h1>
          <h2>${res.title}</h2>
          <p class="meta">Lesson Connection: ${res.part.toUpperCase()} | Pages: ${res.pages} | quantity: address ${res.ratio}</p>
        </div>
        <div class="content">
          <h3>Worksheet Directions</h3>
          <p>${res.directions}</p>
          
          <div class="section-box">
            <h3>Activity Workspace</h3>
            <p>Use the workspace below to document your calculations, draw flowchart lines, or draft pseudocode rules:</p>
            <div class="notes-box" style="height:250px"></div>
          </div>

          <div class="section-box">
            <h3>Team Checkpoint</h3>
            <table class="print-table">
              <tr>
                <th style="width:50%">Partner Check Signature</th>
                <th style="width:50%">Teacher Sign-off</th>
              </tr>
              <tr style="height:50px">
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      `;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${res.title}</title>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; color: #000; padding: 40px; margin: 0; line-height: 1.5; }
            .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            h1 { font-size: 18pt; margin: 0; color: #111; }
            h2 { font-size: 14pt; margin: 5px 0 0 0; color: #444; }
            .meta { font-size: 9pt; color: #666; margin: 5px 0 0 0; font-style: italic; }
            h3 { font-size: 11pt; margin: 15px 0 5px 0; color: #111; text-transform: uppercase; letter-spacing: 0.05em; }
            p { font-size: 10pt; color: #333; margin: 0 0 10px 0; }
            .print-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
            .print-table th, .print-table td { border: 1px solid #aaa; padding: 10px; font-size: 9pt; text-align: left; }
            .print-table th { background: #f5f5f5; font-weight: bold; }
            .section-box { border: 1px solid #ddd; border-radius: 6px; padding: 15px; margin-top: 20px; }
            .notes-box { border: 1px dashed #aaa; border-radius: 4px; height: 180px; margin-top: 10px; }
            
            /* Badges layout */
            .badges-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
            .badge-card { border: 2px solid #333; border-radius: 8px; padding: 20px; position: relative; background: #fff; }
            .badge-card.primary { border-color: #6366f1; }
            .badge-card.secondary { border-color: #ec4899; }
            .badge-card.success { border-color: #10b981; }
            .badge-role { font-size: 14pt; font-weight: bold; display: block; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 10px; }
            .badge-cut-line { font-size: 7pt; color: #888; border-top: 1px dashed #888; margin-top: 20px; padding-top: 4px; text-align: center; }
            
            @media print {
              body { padding: 10px; }
              .badge-card { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${contentHtml}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
/* --- Enhanced Student Day 1 to 5 States --- */
const [c1StudentRole, setC1StudentRole] = useState(null);
const [c1PizzaCleaned, setC1PizzaCleaned] = useState(false);
const [c1ChickenCleaned, setC1ChickenCleaned] = useState(false);
const [c1SpaghettiCleaned, setC1SpaghettiCleaned] = useState(false);
const [c1CanvasBotHelp, setC1CanvasBotHelp] = useState('');
const [c1CanvasBotProblem, setC1CanvasBotProblem] = useState('');
const [c1CanvasApproved, setC1CanvasApproved] = useState(false);
const [c1TestExpected, setC1TestExpected] = useState(false);
const [c1TestPhrasing, setC1TestPhrasing] = useState(false);
const [c1TestTypo, setC1TestTypo] = useState(false);
const [c1TestUnexpected, setC1TestUnexpected] = useState(false);
/* --- Elementary Challenge 1 States --- */
const [c1CableConnected, setC1CableConnected] = useState(false);
const [selectedResource, setSelectedResource] = useState(null);
const [pdSearchQuery, setPdSearchQuery] = useState('');
const [activeOverviewSubTab, setActiveOverviewSubTab] = useState('curriculum');
const [printFilter, setPrintFilter] = useState('all');
const [previewResource, setPreviewResource] = useState(null);
const [checkedPrepItems, setCheckedPrepItems] = useState({});
const initialBlocks = [
  { id: '3', text: '3. IF (hallway open) ➔ Go straight; ELSE ➔ Take alternate route' },
  { id: '1', text: "1. START: Pick up package at Nurse's office" },
  { id: '5', text: '5. END: Delivery complete, return to standby' },
  { id: '2', text: '2. IF (battery < 20%) ➔ Go to charging station; ELSE ➔ Continue' },
  { id: '4', text: '4. IF (door open) ➔ Deliver package; ELSE ➔ Wait and alert' }
];
const [blocks, setBlocks] = useState(initialBlocks);
const [isAlgoCorrect, setIsAlgoCorrect] = useState(false);
const [userNameInput, setUserNameInput] = useState('');
const [userName, setUserName] = useState('');
const [chatMessages, setChatMessages] = useState([]);
const [chatInput, setChatInput] = useState('');
const [isBotTyping, setIsBotTyping] = useState(false);
  /* --- Smart Greenhouse Challenge (Part 3 / Day 4) States --- */
  const [ghTemp, setGhTemp] = useState(72);
  const [ghMoisture, setGhMoisture] = useState(70);
  const [ghWater, setGhWater] = useState(80);
  const [ghG1, setGhG1] = useState(false);
  const [ghG2, setGhG2] = useState(false);
  const [ghG3, setGhG3] = useState(false);
  /* --- Smart Recycling Sorter (Part 4 / Day 5) States --- */
  const [rsBelt, setRsBelt] = useState(['plastic', 'paper', 'can', 'food', 'unknown']);
  const [rsPlasticCount, setRsPlasticCount] = useState(0);
  const [rsPaperCount, setRsPaperCount] = useState(0);
  const [rsCanCount, setRsCanCount] = useState(0);
  const [rsFoodCount, setRsFoodCount] = useState(0);
  const [rsTotalCount, setRsTotalCount] = useState(0);
  const [rsCurrentItem, setRsCurrentItem] = useState(null);
  const [rsLoopType, setRsLoopType] = useState('step');
  const [rsStatus, setRsStatus] = useState('idle');
  const [rsG1, setRsG1] = useState(false);
  const [rsG2, setRsG2] = useState(false);
  const [rsG3, setRsG3] = useState(false);
  const [rsG4, setRsG4] = useState(false);

  const processNextRecyclingItem = (isInfiniteBug = false) => {
    if (rsBelt.length === 0) {
      setRsStatus('idle');
      return;
    }
    const nextItem = rsBelt[0];
    setRsCurrentItem(nextItem);
    
    if (nextItem === 'plastic') {
      setRsPlasticCount(p => p + 1);
    } else if (nextItem === 'paper') {
      setRsPaperCount(p => p + 1);
    } else if (nextItem === 'can') {
      setRsCanCount(p => p + 1);
    } else if (nextItem === 'food') {
      setRsFoodCount(p => p + 1);
    } else {
      setRsG3(true);
    }
    setRsTotalCount(t => t + 1);

    if (isInfiniteBug) {
      setRsStatus('infinite');
    } else {
      setRsBelt(prev => prev.slice(1));
    }
  };

  const handleRunSorter = () => {
    if (rsBelt.length === 0) {
      alert("Conveyor belt is empty! Please load some items first.");
      return;
    }
    
    if (rsLoopType === 'step') {
      processNextRecyclingItem();
    } else if (rsLoopType === 'repeat5') {
      setRsStatus('running');
      setRsG1(true);
      let count = 0;
      const interval = setInterval(() => {
        setRsBelt(prev => {
          if (prev.length === 0 || count >= 5) {
            clearInterval(interval);
            setRsStatus('idle');
            return prev;
          }
          const item = prev[0];
          setRsCurrentItem(item);
          if (item === 'plastic') setRsPlasticCount(p => p + 1);
          else if (item === 'paper') setRsPaperCount(p => p + 1);
          else if (item === 'can') setRsCanCount(p => p + 1);
          else if (item === 'food') setRsFoodCount(p => p + 1);
          else setRsG3(true);
          setRsTotalCount(t => t + 1);
          count++;
          return prev.slice(1);
        });
      }, 600);
    } else if (rsLoopType === 'untilEmpty') {
      setRsStatus('running');
      setRsG2(true);
      const interval = setInterval(() => {
        setRsBelt(prev => {
          if (prev.length === 0) {
            clearInterval(interval);
            setRsStatus('idle');
            return prev;
          }
          const item = prev[0];
          setRsCurrentItem(item);
          if (item === 'plastic') setRsPlasticCount(p => p + 1);
          else if (item === 'paper') setRsPaperCount(p => p + 1);
          else if (item === 'can') setRsCanCount(p => p + 1);
          else if (item === 'food') setRsFoodCount(p => p + 1);
          else setRsG3(true);
          setRsTotalCount(t => t + 1);
          return prev.slice(1);
        });
      }, 600);
    }
  };

  const triggerInfiniteLoopBug = () => {
    setRsStatus('infinite');
    const interval = setInterval(() => {
      setRsStatus(current => {
        if (current !== 'infinite') {
          clearInterval(interval);
          return current;
        }
        setRsTotalCount(t => t + 1);
        const rand = Math.random();
        if (rand < 0.25) setRsPlasticCount(p => p + 1);
        else if (rand < 0.5) setRsPaperCount(p => p + 1);
        else if (rand < 0.75) setRsCanCount(p => p + 1);
        else setRsFoodCount(f => f + 1);
        return current;
      });
    }, 100);
  };

  const fixInfiniteLoop = () => {
    if (rsStatus === 'infinite') {
      setRsStatus('idle');
      setRsG4(true);
      setRsBelt(prev => prev.slice(1));
    }
  };
const chatEndRef = useRef(null);
/* --- Elementary Challenge 2 States --- */
const [solarAngle, setSolarAngle] = useState(20);
const [solarVoltage, setSolarVoltage] = useState(60);
const [solarStatus, setSolarStatus] = useState('underpowered');
const [solarLog, setSolarLog] = useState('Configure panel variables and run load test.');
/* --- Elementary Challenge 3 States --- */
const [phLevel, setPhLevel] = useState(2.0);
const [chemLog, setChemLog] = useState('Highly acidic (pH 2.0). Add base drops (pH+) to neutralize it.');
/* --- Elementary Challenge 4 States --- */
const [bridgeType, setBridgeType] = useState('beam');
const [bridgeMaterial, setBridgeMaterial] = useState('balsa');
const [bridgeSupports, setBridgeSupports] = useState(2);
const [bridgeLoad, setBridgeLoad] = useState(20);
const [bridgeStatus, setBridgeStatus] = useState('initial');
const [bridgeLog, setBridgeLog] = useState('Design your bridge parameters and run load test.');
/* --- Middle School Challenge 1 (Irrigation) States --- */
const [irrigMoisture, setIrrigMoisture] = useState(30);
const [irrigDuration, setIrrigDuration] = useState(3);
const [irrigStatus, setIrrigStatus] = useState('initial');
const [irrigLog, setIrrigLog] = useState('Configure moisture parameters and run test.');
/* --- Middle School Challenge 2 (Wind Turbine) States --- */
const [windAngle, setWindAngle] = useState(10);
const [windBlades, setWindBlades] = useState(3);
const [windSpeed, setWindSpeed] = useState(15);
const [windStatus, setWindStatus] = useState('initial');
const [windLog, setWindLog] = useState('Configure turbine variables and test energy grid.');
/* --- Middle School Challenge 3 (Wastewater) States --- */
const [waterCarbon, setWaterCarbon] = useState(2);
const [waterFlocculent, setWaterFlocculent] = useState(2);
const [waterStatus, setWaterStatus] = useState('initial');
const [waterLog, setWaterLog] = useState('Configure layers and run purification test.');
/* --- Middle School Challenge 4 (Earthquake Tower) States --- */
const [towerIsolation, setTowerIsolation] = useState('fixed');
const [towerBracing, setTowerBracing] = useState('single');
const [towerHeight, setTowerHeight] = useState(20);
const [towerStatus, setTowerStatus] = useState('initial');
const [towerLog, setTowerLog] = useState('Configure tower and test seismic resistance.');
// Scroll chatbot history
useEffect(() => {
chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [chatMessages, isBotTyping]);
// Welcome inside Chatbot Day 5
useEffect(() => {
if (activeChallenge === 'chatbot' && activeDay === 5 && chatMessages.length === 0) {
setIsBotTyping(true);
setTimeout(() => {
setIsBotTyping(false);
setChatMessages([
{ id: 1, sender: 'bot', text: `Hi there ${userName || 'Student'}! I'm Lunchie. Ask me "Monday" or test a typo like "mondy"!` }
]);
}, 800);
}
}, [activeChallenge, activeDay, chatMessages.length, userName]);
/* --- Logic Actions --- */
const moveBlock = (index, direction) => {
const updated = [...blocks];
if (direction === 'up' && index > 0) {
const temp = updated[index];
updated[index] = updated[index - 1];
updated[index - 1] = temp;
} else if (direction === 'down' && index < blocks.length - 1) {
const temp = updated[index];
updated[index] = updated[index + 1];
updated[index + 1] = temp;
}
setBlocks(updated);
};
const verifyAlgorithm = () => {
  const sequence = blocks.map(b => b.id).join('');
  if (sequence === '12345') {
    setIsAlgoCorrect(true);
    alert("🎉 Robot navigation algorithm verified! The route is safe and efficient. Click 'Go to Day 4' to learn about Variables.");
  } else {
    alert("⚠️ Logic Error: The robot got confused or ran out of battery! Re-read the steps and try again.");
  }
};
return (
<section id="curriculum" style={{ padding: '80px 0', position: 'relative' }}>
<div className="container">
{/* Upper Header */}
<div style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
flexWrap: 'wrap',
gap: '16px',
marginBottom: '32px'
}}>
<div>
<h2 style={{ fontSize: '2rem', background: 'linear-gradient(135°°deg, #fff 0%, var(--secondary-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
Discovery Lab Curriculum
</h2>
<p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
Student Agency Portal // Learning Score: <strong style={{ color: c1CableConnected ? 'var(--success)' : '#fbbf24' }}>{points} PTS</strong>
</p>
</div>
<div style={{
display: 'flex',
background: 'rgba(255,255,255,0.03)',
padding: '4px',
borderRadius: '10px',
border: '1px solid rgba(255,255,255,0.08)'
}}>
<button
onClick={() => { setViewMode('student'); setActiveChallenge(null); setActiveDay(1); }}
style={{
padding: '8px 16px',
borderRadius: '8px',
background: viewMode === 'student' ? 'linear-gradient(135°°deg, var(--primary) 0%, #6366f1 100%)' : 'none',
color: '#fff',
border: 'none',
cursor: 'pointer',
fontWeight: 600,
fontSize: '0.85rem'
}}
>
🎒 Student Mode
</button>
      <button
        onClick={() => { setViewMode('teacher'); setActiveChallenge(null); setActiveDay(1); }}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          background: viewMode === 'teacher' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
          border: '1px solid ' + (viewMode === 'teacher' ? 'rgba(255,255,255,0.15)' : 'transparent'),
          color: viewMode === 'teacher' ? '#fff' : 'var(--text-muted)',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.85rem'
        }}
      >
        🏫 Teacher Mode
</button>
</div>
</div>
{/* --- STUDENT MODE --- */}
{viewMode === 'student' && (
<>
{/* School level selector tabs (only when no challenge is open) */}
{activeChallenge === null && (
<div style={{
display: 'flex',
justifyContent: 'center',
gap: '12px',
marginBottom: '32px'
}}>
<button
onClick={() => setSchoolLevel('elementary')}
style={{
padding: '12px 24px',
borderRadius: '30px',
background: schoolLevel === 'elementary' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
border: schoolLevel === 'elementary' ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
color: schoolLevel === 'elementary' ? '#fff' : 'var(--text-secondary)',
fontWeight: 'bold',
fontSize: '0.9rem',
cursor: 'pointer',
transition: 'all 0.2s'
}}
>
🎒 Elementary School (Grades 4-5)
</button>
      <button
        onClick={() => setSchoolLevel('middle')}
        style={{
          padding: '12px 24px',
          borderRadius: '30px',
          background: schoolLevel === 'middle' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
          border: schoolLevel === 'middle' ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
          color: schoolLevel === 'middle' ? '#fff' : 'var(--text-secondary)',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        🎓 Middle School (Grades 6-8)
</button>
</div>
)}
{activeChallenge === null ? (
// Week Dashboard selection
<div>
{schoolLevel === 'elementary' ? (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  }}>
    {teacherUnit === 'botbuilder' ? (
      <>
        {/* BotBuilder Card 1 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>🤖💬</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 1 (Days 1-2)</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 1: Data, Data, Data</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Determine chatbot goals, organize databases, clean menu entries, and identify keywords.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('chatbot'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* BotBuilder Card 2 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>⚙️🗺️🔋</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 2 (Day 3)</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 2: All About Algorithms</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Program an autonomous school robot using sequences, obstacles, IF/ELSE decision logic, and efficiency loops.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('chatbot'); setActiveDay(3); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* BotBuilder Card 3 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>📦💾📥</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 3 (Day 4)</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 3: Variables & Memory</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Configure memory containers, store usernames, and run dynamic chatbot greeting tests.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('chatbot'); setActiveDay(4); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* BotBuilder Card 4 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>🔀♻️📊</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 4 (Day 5)</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 4: Loops & Repetition</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Program an automated recycling sorter to process items. Use repetition loops to sort waste, count items with variables, and handle errors.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('chatbot'); setActiveDay(5); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* BotBuilder Card 5 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>🏆🎤✨</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Unit Share (Day 5+)</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Unit Share: Expo</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Conduct user testing, iterate on feedback, and present your chatbot at the final expo.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('share'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Expo 🚀</button>
        </div>
      </>
    ) : (
      <>
        {/* EcoEngineering Elementary Card 1 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.5, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>💧🌱</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 1</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 1: Smart Irrigation</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Irrigation lab is only available in Middle School mode. Focus on solar energy below!
            </p>
          </div>
          <button disabled className="btn btn-secondary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem', cursor: 'not-allowed' }}>Locked 🔒</button>
        </div>

        {/* EcoEngineering Elementary Card 2 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>☀️🌱🔋</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 2</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 2: Greenhouse Solar</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Investigate solar panel angle alignments and battery voltage limits in the greenhouse lab.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('solar'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* EcoEngineering Elementary Card 3 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>🧪🎨📊</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 3</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 3: Chemistry Lab</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Neutralize acidic water elements using chemical base drops and record pH variable metrics.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('chemistry'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* EcoEngineering Elementary Card 4 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>🌉🪵🗼</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Part 4</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Part 4: Bridge Building</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Design support trusses and test load vectors under physical weights and forces.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('bridge'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
        </div>

        {/* EcoEngineering Elementary Card 5 */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div>
            <span style={{ fontSize: '2rem' }}>🏆🎤✨</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Unit Share</span>
            <h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Unit Share: Expo</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
              Compile your engineering data maps, prepare charts, and present at the expo.
            </p>
          </div>
          <button onClick={() => { setActiveChallenge('share'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Expo 🚀</button>
        </div>
      </>
    )}
  </div>) : (
<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
gap: '20px'
}}>
{/* Middle School Card 1 */}
<div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
<div>
<span style={{ fontSize: '2rem' }}>☀️🌱🔋</span>
<span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--secondary-light)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Week 1 (Days 1-5)</span>
<h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Smart Irrigation</h3>
<p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
Program automated plant soil moisture thresholds and pump durations to optimize plant health.
</p>
</div>
<button onClick={() => { setActiveChallenge('irrig'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
</div>
{/* Middle School Card 2 */}
<div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
<div>
<span style={{ fontSize: '2rem' }}>☀️🌱🔋</span>
<span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--secondary-light)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Week 2 (Days 6-10)</span>
<h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Wind Turbine Grid</h3>
<p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
Calibrate wind speed, blade pitch angle, and count parameters to maximize clean electricity output.
</p>
</div>
<button onClick={() => { setActiveChallenge('wind'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
</div>
{/* Middle School Card 3 */}
<div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
<div>
<span style={{ fontSize: '2rem' }}>☀️🌱🔋</span>
<span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--secondary-light)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Week 3 (Days 11-15)</span>
<h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Water Purification</h3>
<p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
Purify toxic runoff. Configure gravel sand filters and chemical drops to clear suspended sediments.
</p>
</div>
<button onClick={() => { setActiveChallenge('water'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
</div>
{/* Middle School Card 4 */}
<div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
<div>
<span style={{ fontSize: '2rem' }}>☀️🌱🔋</span>
<span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--secondary-light)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '6px' }}>Week 4 (Days 16-20)</span>
<h3 style={{ margin: '6px 0 8px 0', fontSize: '1.1rem', color: '#fff', textAlign: 'left' }}>Seismic Skyscraper</h3>
<p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
Configure structural isolation pads, height, and cross-bracing to survive a magnitude 7.0 shake.
</p>
</div>
<button onClick={() => { setActiveChallenge('tower'); setActiveDay(1); }} className="btn btn-primary" style={{ marginTop: '16px', padding: '8px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Launch Lab 🚀</button>
</div>
</div>
)}
</div>
) : (
// Active Challenge Frame
<div style={{
background: 'var(--glass-bg)',
backdropFilter: 'var(--glass-blur)',
border: '1px solid var(--glass-border)',
borderRadius: 'var(--border-radius-lg)',
overflow: 'hidden',
boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
}}>
{/* Challenge Header / Navigation */}
<div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
<button onClick={() => setActiveChallenge(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
◀ Back to Dashboard
</button>
{/* Day Stepper Progress Bar */}
<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
{Array.from({ length: 5 }, (_, i) => i + 1).map((dayNum) => {
const isCompleted = activeDay > dayNum;
const isActive = activeDay === dayNum;
let offset = 0;
if (activeChallenge === 'solar' || activeChallenge === 'wind') offset = 5;
if (activeChallenge === 'chemistry' || activeChallenge === 'water') offset = 10;
if (activeChallenge === 'bridge' || activeChallenge === 'tower') offset = 15;
if (activeChallenge === 'share') offset = 20;
const absoluteDay = dayNum + offset;
return (
<button
key={dayNum}
onClick={() => {
if (activeChallenge === 'chatbot' && dayNum > 3 && !isAlgoCorrect) {
alert("Please solve the algorithm puzzle on Day 3 first!");
return;
}
setActiveDay(dayNum);
}}
style={{
padding: '6px 12px',
borderRadius: '20px',
background: isActive ? 'var(--primary)' : isCompleted ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)',
border: isActive ? '1px solid var(--primary-light)' : '1px solid rgba(255,255,255,0.08)',
color: isActive || isCompleted ? '#fff' : 'var(--text-secondary)',
fontSize: '0.75rem',
fontWeight: 'bold',
cursor: 'pointer'
}}
>
Day {absoluteDay} {isCompleted ? '✓' : ''}
</button>
);
})}
</div>
<strong style={{ color: 'var(--secondary-light)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
{activeChallenge === 'chatbot' ? 'Week 1: Software' : activeChallenge === 'solar' ? 'Week 2: Solar' : activeChallenge === 'chemistry' ? 'Week 3: Chemistry' : activeChallenge === 'bridge' ? 'Week 4: Bridge' : activeChallenge === 'irrig' ? 'Week 1: Irrigation' : activeChallenge === 'wind' ? 'Week 2: Wind' : activeChallenge === 'water' ? 'Week 3: Purification' : 'Week 4: Seismic Tower'}
</strong>
</div>
{/* Day-by-Day Content Container */}
<div style={{ padding: '36px' }}>
{/* --- ELEMENTARY WEEK 1: Coding & Algorithms --- */}
{activeChallenge === 'chatbot' && (
<div>
{/* Day 1: AI Engineer Challenge & Hook */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', marginBottom: '16px' }}>
<strong style={{ color: '#fff', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MISSION HOOK</strong>
<p style={{ fontSize: '0.8rem', color: '#fff', margin: '4px 0 0 0', lineHeight: '1.4' }}>
"Our school needs a chatbot that can help students find information quickly. Your engineering team has been hired to design it. Before you can program the chatbot, you must determine what information it needs, how that information should be organized, and what could happen if the data is incomplete or incorrect."
</p>
</div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 1: AI Engineer Mission Hook</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
Welcome to the team! You are acting as an <strong>AI engineer and problem solver</strong>. First, review your team's specialized developer roles on the right and select the role you will take for this mission.
</p>
<div style={{ display: 'flex', gap: '10px' }}>
{c1CableConnected && (
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 2 ➜</button>
)}
</div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<span style={{ fontSize: '0.8rem', color: 'var(--secondary-light)', fontWeight: 'bold', marginBottom: '10px' }}>Select Your Engineering Role:</span>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
{[
{ id: 'ai', icon: '🤖', title: 'AI Engineer', desc: 'Designs system architecture and program logic loops.' },
{ id: 'data', icon: '📊', title: 'Data Engineer', desc: 'Cleans, structures and organizes the knowledge base.' },
{ id: 'dev', icon: '💻', title: 'Developer', desc: 'Writes the code, creating lists and queries in Scratch.' },
{ id: 'tester', icon: '🕵️', title: 'AI Tester', desc: 'Stress tests the bot and logs logic failures.' }
].map(role => (
<button
key={role.id}
type="button"
onClick={() => setC1StudentRole(role.id)}
style={{
padding: '8px',
background: c1StudentRole === role.id ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
border: '1px solid rgba(255,255,255,0.08)',
borderRadius: '6px',
color: '#fff',
cursor: 'pointer',
textAlign: 'left',
transition: 'all 0.2s'
}}
>
<div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{role.icon} {role.title}</div>
<div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.2' }}>{role.desc}</div>
</button>
))}
</div>
{c1StudentRole && (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: c1CableConnected ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245°°, 158, 11, 0.08)', border: c1CableConnected ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245°°, 158, 11, 0.2)', padding: '12px', borderRadius: '6px' }}>
<span style={{ fontSize: '2rem' }}>☀️🌱🔋</span>
<h5 style={{ color: 'var(--success)', fontSize: '0.85rem', margin: '4px 0 8px 0' }}>
{c1CableConnected ? 'Database Connection Active! Mission Unlocked.' : 'Role Selected! Connect Database Cable to Begin'}
</h5>
{!c1CableConnected ? (
<button onClick={() => setC1CableConnected(true)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem', width: '100%' }}>
Connect Database Cable 🔌
</button>
) : (
<p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Troubleshooting complete. Data connection established!</p>
)}
</div>
)}
</div>
</div>
)}
{/* Day 2: Human vs. AI & Data Detective */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 2: Data Detective & Inquiry</h4>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
<strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>💬 Human vs. AI Inquiry:</strong>
<p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
"What is for lunch today?" ➔ "What food are they serving?"<br />
<strong>How does a human know these ask for the same thing? How could a computer recognize this?</strong> Computers rely on organized patterns.
</p>
</div>
<p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
🕵️ <strong>Data Detective Challenge:</strong> Before loading lists into Scratch, clean the messy school menu on the right. Fix the spelling typos, remove duplicates, and update outdated entries.
</p>
{c1PizzaCleaned && c1ChickenCleaned && c1SpaghettiCleaned ? (
<div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '4px solid #10b981', padding: '10px', borderRadius: '4px', marginBottom: '12px' }}>
<strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block' }}>✓ Dataset Successfully Cleaned!</strong>
<span style={{ fontSize: '0.7rem' }}>Better data leads to better system responses. You have unlocked Day 3.</span>
</div>
) : null}
<div style={{ display: 'flex', gap: '10px' }}>
{c1PizzaCleaned && c1ChickenCleaned && c1SpaghettiCleaned && (
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 3 ➜</button>
)}
</div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '16px' }}>
<span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', marginBottom: '8px' }}>Messy Lunch Database (Click Red Errors to Fix):</span>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
{/* Item 1: Duplicate Pizza */}
<div style={{ padding: '8px', background: c1PizzaCleaned ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: c1PizzaCleaned ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div>
<div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff' }}>Monday: Cheese Pizza</div>
<div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
{c1PizzaCleaned ? 'Cleaned: Duplicates merged' : 'Error: Duplicate Cheese Pizza entries'}
</div>
</div>
{!c1PizzaCleaned && (
<button onClick={() => setC1PizzaCleaned(true)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer' }}>Merge Duplicate</button>
)}
</div>
{/* Item 2: Typo Chicken */}
<div style={{ padding: '8px', background: c1ChickenCleaned ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: c1ChickenCleaned ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div>
<div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff' }}>Tuesday: {c1ChickenCleaned ? 'Chicken Nuggets' : 'Checken Nugets'}</div>
<div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
{c1ChickenCleaned ? 'Cleaned: Typo resolved' : 'Error: Spelling typo will break queries'}
</div>
</div>
{!c1ChickenCleaned && (
<button onClick={() => setC1ChickenCleaned(true)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer' }}>Fix Spelling</button>
)}
</div>
{/* Item 3: Outdated Spaghetti */}
<div style={{ padding: '8px', background: c1SpaghettiCleaned ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: c1SpaghettiCleaned ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div>
<div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fff' }}>Wednesday: Spaghetti</div>
<div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
{c1SpaghettiCleaned ? 'Price: $3.50 (2026 Active)' : 'Price: $1.50 (Outdated 2021 Price)'}
</div>
</div>
{!c1SpaghettiCleaned && (
<button onClick={() => setC1SpaghettiCleaned(true)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer' }}>Update Price</button>
)}
</div>
</div>
</div>
</div>
)}
{/* Day 3: Design Canvas & Sorting */}
{activeDay === 3 && (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px' }}>
    <div>
      <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 3: Robot Algorithm Planning Canvas</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
        Students act as Algorithm Engineers. Program the school otonom delivery robot to safely carry a package from the Nurse's Office to Room 205. Complete the design rules on the left, then sort the robot instructions on the right.
      </p>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        <strong style={{ color: 'var(--primary-light)', fontSize: '0.75rem' }}>📋 Robot Navigation Design Rules:</strong>
        <div>
          <label style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)' }}>1. Package Destination Room (e.g. Room 205):</label>
          <input type="text" value={c1CanvasBotHelp} onChange={e => setC1CanvasBotHelp(e.target.value)} placeholder="e.g. Room 205..." style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)' }}>2. Low Battery Recharge Threshold (e.g. 20%):</label>
          <input type="text" value={c1CanvasBotProblem} onChange={e => setC1CanvasBotProblem(e.target.value)} placeholder="e.g. 20%..." style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
        </div>
        {!c1CanvasApproved ? (
          <button onClick={() => setC1CanvasApproved(true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>Save Design Canvas</button>
        ) : (
          <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold' }}>✓ Design Canvas Approved! Now sort the logic sequence.</div>
        )}
      </div>
      {isAlgoCorrect && c1CanvasApproved && (
        <button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 4 ➜</button>
      )}
    </div>
    <div>
      <span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Robot Instruction Sequence:</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
        {blocks.map((block, idx) => (
          <div key={block.id} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#fff' }}>
            <span>{block.text}</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              <button type="button" onClick={() => moveBlock(idx, 'up')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '20px', height: '20px', borderRadius: '3px', cursor: 'pointer' }}>▲</button>
              <button type="button" onClick={() => moveBlock(idx, 'down')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '20px', height: '20px', borderRadius: '3px', cursor: 'pointer' }}>▼</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={verifyAlgorithm} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem' }}>Verify Logic Gate</button>
    </div>
  </div>
)}
{/* Day 4: Variables & Architecture */}
{activeDay === 4 && (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px' }}>
    <div>
      <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 4: Smart Greenhouse Challenge</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
        Program a Smart Greenhouse to keep plants healthy under changing conditions. You must test the system rules by triggering all three engineering test objectives below!
      </p>

      {/* Sensor Dashboard (Variables in Memory) */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        <strong style={{ color: 'var(--primary-light)', fontSize: '0.75rem' }}>🌱 Variable Memory Boxes (Current State):</strong>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)' }}>🌡️ Temp</span>
            <strong style={{ color: ghTemp > 85 ? 'var(--warning)' : '#fff', fontSize: '1.1rem' }}>{ghTemp}°F</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)' }}>🌱 Moisture</span>
            <strong style={{ color: ghMoisture < 30 ? 'var(--danger)' : '#fff', fontSize: '1.1rem' }}>{ghMoisture}%</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)' }}>💧 Water Level</span>
            <strong style={{ color: ghWater < 20 ? 'var(--danger)' : '#fff', fontSize: '1.1rem' }}>{ghWater}%</strong>
          </div>
        </div>
      </div>

      {/* Actuators (System actions based on variables) */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
        <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem' }}>⚙️ System Responses (Rules):</strong>
        <div style={{ fontSize: '0.75rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🌀 Ventilator Fan (IF temp &gt; 85°F):</span>
            <strong style={{ color: ghTemp > 85 ? 'var(--warning)' : 'var(--text-muted)' }}>{ghTemp > 85 ? 'RUNNING 🟢' : 'STANDBY ⚪'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>💧 Irrigation Pump (IF moisture &lt; 30% AND water &gt; 20%):</span>
            <strong style={{ color: (ghMoisture < 30 && ghWater > 20) ? 'var(--success)' : 'var(--text-muted)' }}>{(ghMoisture < 30 && ghWater > 20) ? 'ACTIVE 🟢' : 'STANDBY ⚪'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🚨 Water Alert (IF water level &lt; 20%):</span>
            <strong style={{ color: ghWater < 20 ? 'var(--danger)' : 'var(--text-muted)' }}>{ghWater < 20 ? 'LOW WATER ALARM 🔴' : 'SAFE ⚪'}</strong>
          </div>
        </div>
      </div>

      {ghG1 && ghG2 && ghG3 ? (
        <button onClick={() => {
          setActiveDay(5);
          setChatMessages([
            { id: 1, sender: 'bot', text: 'Systems calibrated! Smart Greenhouse variables tested. Let\'s proceed to Conditionals!' }
          ]);
        }} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px', width: '100%' }}>Go to Day 5 ➜</button>
      ) : (
        <div style={{ color: 'var(--warning)', fontSize: '0.75rem', padding: '8px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
          🔒 Unlock Day 5 by triggering all three engineering test objectives!
        </div>
      )}
    </div>

    {/* Simulation Controller & Objectives */}
    <div>
      <span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Environmental Controls:</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        <button onClick={() => {
          setGhTemp(prev => Math.min(100, prev + 15));
          setGhMoisture(prev => Math.max(0, prev - 15));
          if (ghTemp + 15 > 85) setGhG1(true);
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
          ☀️ Heat Wave (Temp +15, Moist -15)
        </button>
        <button onClick={() => {
          if (ghWater > 20) {
            setGhMoisture(prev => Math.min(100, prev + 25));
            setGhWater(prev => Math.max(0, prev - 15));
            setGhG2(true);
            if (ghWater - 15 < 20) setGhG3(true);
          } else {
            alert('Cannot water plants: Water tank is empty!');
          }
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
          💧 Water Plants (Moist +25, Water -15)
        </button>
        <button onClick={() => {
          setGhWater(90);
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
          🌧️ Refill Tank (Water = 90%)
        </button>
        <button onClick={() => {
          setGhTemp(prev => Math.max(40, prev - 12));
          setGhMoisture(prev => Math.min(100, prev + 5));
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
          🌙 Cool Night (Temp -12, Moist +5)
        </button>
      </div>

      {/* Objectives Checkbox checklist */}
      <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: '8px' }}>🎯 Engineering Test Objectives:</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={ghG1} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: ghG1 ? 'var(--success)' : '#fff' }}>1. Trigger Ventilator Fan (Temp &gt; 85°F)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={ghG2} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: ghG2 ? 'var(--success)' : '#fff' }}>2. Trigger Irrigation Pump (Moist &lt; 30%, Water &gt; 20%)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={ghG3} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: ghG3 ? 'var(--success)' : '#fff' }}>3. Trigger Low Water Warning (Water &lt; 20%)</span>
          </label>
        </div>
      </div>
    </div>
  </div>
)}

{/* Day 5: Break the Bot Test Challenge */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 5: "Break the Bot" Test</h4>
<p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
Play the role of an <strong>AI Tester</strong>. Send these queries in the chat console to test your logic tolerances and check them off:
</p>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>
<label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
<input type="checkbox" checked={c1TestExpected} readOnly style={{ accentColor: 'var(--primary)' }} />
<span style={{ color: c1TestExpected ? 'var(--success)' : '#fff' }}>1. Expected Question (type "Monday")</span>
</label>
<label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
<input type="checkbox" checked={c1TestPhrasing} readOnly style={{ accentColor: 'var(--primary)' }} />
<span style={{ color: c1TestPhrasing ? 'var(--success)' : '#fff' }}>2. Phrasing Variation (type "menu")</span>
</label>
<label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
<input type="checkbox" checked={c1TestTypo} readOnly style={{ accentColor: 'var(--primary)' }} />
<span style={{ color: c1TestTypo ? 'var(--success)' : '#fff' }}>3. Spelling Typo (type "mondy")</span>
</label>
<label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
<input type="checkbox" checked={c1TestUnexpected} readOnly style={{ accentColor: 'var(--primary)' }} />
<span style={{ color: c1TestUnexpected ? 'var(--success)' : '#fff' }}>4. Unknown Request (type "hello")</span>
</label>
</div>
{c1TestExpected && c1TestPhrasing && c1TestTypo && c1TestUnexpected ? (
<div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '4px solid #10b981', padding: '10px', borderRadius: '4px', marginBottom: '12px' }}>
<strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block' }}>✓ Verification Completed!</strong>
<span style={{ fontSize: '0.7rem' }}>Exit ticket ready. You are certified for Level 2!</span>
</div>
) : null}
{c1TestExpected && c1TestPhrasing && c1TestTypo && c1TestUnexpected && (
<button onClick={() => handleFinishWeek(10)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 1! 🏆</button>
)}
</div>
<div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '14px', display: 'flex', flexDirection: 'column', height: '260px' }}>
<div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
{chatMessages.map(m => (
<div key={m.id} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', padding: '6px 10px', borderRadius: '8px', fontSize: '0.7rem', background: m.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: '#fff' }}>
{m.text}
</div>
))}
{isBotTyping && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Lunchie is typing...</div>}
<div ref={chatEndRef} />
</div>
<div style={{ display: 'flex', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px', marginTop: '6px' }}>
<input
type="text"
value={chatInput}
onChange={e => setChatInput(e.target.value)}
onKeyDown={e => {
if (e.key === 'Enter') {
e.preventDefault();
const text = chatInput.trim().toLowerCase();
if (!text) return;
// Track checklist triggers
if (text.includes('monday')) setC1TestExpected(true);
if (text.includes('menu')) setC1TestPhrasing(true);
if (text.includes('mondy')) setC1TestTypo(true);
if (text.includes('hello')) setC1TestUnexpected(true);
const userMsg = { id: Date.now(), sender: 'user', text: chatInput };
setChatMessages(prev => [...prev, userMsg]);
setChatInput('');
setIsBotTyping(true);
setTimeout(() => {
setIsBotTyping(false);
let botResponse = '';
if (text.includes('monday') || text.includes('mondy')) {
botResponse = 'Hi ' + (userName || 'Student') + '! Monday\'s cleaned entree is Cheese Pizza!';
} else if (text.includes('menu')) {
botResponse = 'Hi ' + (userName || 'Student') + '! I searched my database lists. Our entrees are Cheese Pizza, Chicken Nuggets, and Salad!';
} else if (text.includes('hello')) {
botResponse = 'Hello ' + (userName || 'Student') + '! I registered your hello token. Let\'s start the test check!';
} else {
botResponse = 'Unknown input: "' + chatInput + '". I checked my lists, but that query returned 0 matches.';
}
setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
}, 600);
}
}}
placeholder="Press Enter to send (e.g. monday, menu)..."
style={{ flexGrow: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '0.7rem', outline: 'none' }}
/>
</div>
</div>
</div>
)}
</div>
)}{activeChallenge === 'solar' && (
<div>
{/* Day 6: Greenhouse Needs */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 6: Greenhouse Solar Needs</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Welcome to Week 2. The lab greenhouse heating lights failed! We must design a solar array and power regulator to generate energy cleanly.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
We must align two variables: Solar panel angle (0° to 90°) to capture solar photons, and target battery voltage (V) to regulate output.
</p>
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 7 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '24px' }}>
<span style={{ fontSize: '3rem' }}>☀️🌱🔋</span>
<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>Greenhouse Status: NO POWER</span>
</div>
</div>
)}
{/* Day 7: Solar Angle */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 7: Angle of Incidence</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Solar panels are most efficient when they face the sun directly. The angle of the panel changes the amount of light energy absorbed.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Adjust the panel angle variable on the right close to **45°°°** to capture the sun's rays optimally, then click Next Day.
</p>
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 8 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Panel Angle:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{solarAngle}°</strong>
</div>
<input type="range" min="0" max="90" value={solarAngle} onChange={e => setSolarAngle(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
<div style={{ fontSize: '2.5rem', textAlign: 'center', marginTop: '20px', transform: `rotate(${solarAngle}deg)`, transition: 'transform 0.2s' }}>🛰️</div>
</div>
</div>
)}
{/* Day 8: Voltage Regulator */}
{activeDay === 3 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 8: Voltage Calibration</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Batteries require regulated voltage. If voltage is too low, the lights flicker. If too high, the batteries overload and burst.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Calibrate the voltage variable slider on the right between **80V and 120V** for optimal grid charging.
</p>
<button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 9 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Battery Voltage:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{solarVoltage} V</strong>
</div>
<input type="range" min="0" max="200" value={solarVoltage} onChange={e => setSolarVoltage(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
<div style={{ fontSize: '2.5rem', textAlign: 'center', marginTop: '20px' }}>🔋</div>
</div>
</div>
)}
{/* Day 9: Run Load Test */}
{activeDay === 4 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 9: Load Test</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Let's run a system check. The grid will combine your Solar Angle and Battery Voltage variables to test safety limits.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Run System Check". If it fails, adjust your angle and voltage sliders on the previous days to fix it!
</p>
{solarStatus === 'success' && (
<button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 10 ▶</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<button onClick={runSolarTest} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>Run System Check ⚡</button>
<div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', width: '100%' }}>
{solarLog}
</div>
</div>
</div>
)}
{/* Day 10: Successful Grid */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 10: Grid Active</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Congratulations! The solar array is aligned, battery charging is stable, and the greenhouse light is glowing brightly.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
You successfully engineered a renewable solar grid. Click "Finish Week" to claim your points.
</p>
<button onClick={() => handleFinishWeek(10)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 2! 🎉</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
<div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px #eab308)' }}>💡🪴</div>
<h5 style={{ color: 'var(--success)', marginTop: '12px', fontSize: '0.85rem' }}>GREENHOUSE POWERED</h5>
</div>
</div>
)}
</div>
)}
{/* --- MIDDLE SCHOOL WEEK 1: Smart Irrigation --- */}
{activeChallenge === 'irrig' && (
<div>
{/* Day 1: Soil Moisture Analysis */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 1: Soil Moisture Analysis</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Welcome to Middle School Week 1. The lab botany project is dying because of irregular manual watering! We must code a micro-controller to automate moisture reading.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Before coding, examine the target threshold. Healthy plants require moisture levels between **40% and 65%** in soil register. Click Next Day to calibrate.
</p>
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 2 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '24px' }}>
<span style={{ fontSize: '3rem' }}>🥀🌱</span>
<span style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '12px', fontWeight: 'bold' }}>Current Moisture: 15% (CRITICAL DRY)</span>
</div>
</div>
)}
{/* Day 2: Sensor Calibrator */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 2: Sensor Threshold Calibration</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Analog sensors map voltage ranges to numeric percentages. We define the trigger value: if moisture drops below the threshold, the pump starts.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Calibrate the soil moisture trigger threshold slider on the right to **50%**.
</p>
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 3 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Trigger Threshold:</span>
<strong style={{ color: 'var(--primary-light)' }}>{irrigMoisture}%</strong>
</div>
<input type="range" min="10" max="90" value={irrigMoisture} onChange={e => setIrrigMoisture(e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)' }} />
</div>
</div>
)}
{/* Day 3: Valve Flow Duration */}
{activeDay === 3 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 3: Water Pump Duration</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Once the pump activates, it needs a timer duration. Too short means only the surface gets wet. Too long floods the roots.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Configure the pump duration variable on the right between **3 and 6 seconds** for moderate water intake.
</p>
<button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 4 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Pump Run Time:</span>
<strong style={{ color: 'var(--primary-light)' }}>{irrigDuration} sec</strong>
</div>
<input type="range" min="1" max="10" value={irrigDuration} onChange={e => setIrrigDuration(e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)' }} />
</div>
</div>
)}
{/* Day 4: Loop Check */}
{activeDay === 4 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 4: Run Loop Test</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Let's run a loop cycle to test the sensor and valve variables together.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Run Irrigation Cycle Test". If the plant rots or wilts, go back and adjust your triggers.
</p>
{irrigStatus === 'success' && (
<button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 5 ▶</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<button onClick={runIrrigTest} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>Run Irrigation Cycle Test 💧</button>
<div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', width: '100%' }}>
{irrigLog}
</div>
</div>
</div>
)}
{/* Day 5: Irrigation Active */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 5: Garden Regulated</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Awesome engineering! The plants are thriving on auto-pilot. Moisture and duration variables are perfectly balanced in program memory.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Finish Week" to log your Middle School learning score.
</p>
<button onClick={() => handleFinishWeek(15)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 1! 🎉</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
<div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px #10b981)' }}>🌻🌿</div>
<h5 style={{ color: 'var(--success)', marginTop: '12px', fontSize: '0.85rem' }}>GARDEN AUTOMATED</h5>
</div>
</div>
)}
</div>
)}
{/* --- MIDDLE SCHOOL WEEK 2: Wind Turbine Grid --- */}
{activeChallenge === 'wind' && (
<div>
{/* Day 6: Aerodynamics Intro */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 6: Wind Farm Engineering</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Welcome to Week 2. A rural school wants to offset its power grid using wind energy!
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
We must design a functional three-blade wind turbine by adjusting blade count, blade pitch angle, and testing wind speeds.
</p>
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 7 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '24px' }}>
<span style={{ fontSize: '3rem' }}>🌀💨</span>
<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>Grid Output: 0 W (OFFLINE)</span>
</div>
</div>
)}
{/* Day 7: Blade Counts */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 7: Blade Count Variables</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
More blades increase initial torque but add drag at high speeds. 3 blades is the global aerodynamic sweet spot.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Choose your blade count on the right. 3 Blades are recommended.
</p>
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 8 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', marginBottom: '10px' }}>Blade Count:</span>
<div style={{ display: 'flex', gap: '8px' }}>
{[2, 3, 4].map(b => (
<button key={b} onClick={() => setWindBlades(b)} style={{ flexGrow: 1, padding: '10px', background: windBlades === b ? 'var(--secondary)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
{b} Blades
</button>
))}
</div>
</div>
</div>
)}
{/* Day 8: Blade Pitch */}
{activeDay === 3 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 8: Pitch Angle (AoA)</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Blade pitch angle defines the tilt of the rotor blades. Flat angles spin fast but stall in high wind. Steep angles capture wind easily but turn slowly.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Adjust blade pitch angle slider close to **35°°°** for balanced drag resistance.
</p>
<button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 9 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Blade Pitch Angle:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{windAngle}°</strong>
</div>
<input type="range" min="5" max="80" value={windAngle} onChange={e => setWindAngle(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
</div>
</div>
)}
{/* Day 9: Test Wind Speeds */}
{activeDay === 4 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 9: Test Aerodynamic Load</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Let's run a wind tunnel test. Slide wind speed to **30 mph** and run the test load.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
If the turbine structural joint snaps or stalls, adjust pitch angle on Day 8 to fix it!
</p>
{windStatus === 'success' && (
<button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 10 ▶</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px', width: '100%' }}>
<span>Simulated Wind Speed:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{windSpeed} mph</strong>
</div>
<input type="range" min="10" max="60" value={windSpeed} onChange={e => setWindSpeed(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)', marginBottom: '12px' }} />
<button onClick={runWindTest} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>Test Wind Grid 🌀</button>
<div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', width: '100%' }}>
{windLog}
</div>
</div>
</div>
)}
{/* Day 10: Clean Grid Active */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 10: Clean Energy Online</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Incredible turbine design! Electricity output is safe, stabilized, and powering the municipal school loop.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Finish Week" to log your score.
</p>
<button onClick={() => handleFinishWeek(15)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 2! 🎉</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
<div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px #ec4899)' }}>🌀⚡</div>
<h5 style={{ color: 'var(--secondary-light)', marginTop: '12px', fontSize: '0.85rem' }}>TURBINE ONLINE</h5>
</div>
</div>
)}
</div>
)}
{/* --- ELEMENTARY WEEK 3: Chemistry pH Lab --- */}
{activeChallenge === 'chemistry' && (
<div>
{/* Day 11: Spill Incident */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 11: The Acidic Spill</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Welcome to Week 3. A chemical spill happened in the storage room! Before we can clean it up, we must determine its acidity or alkalinity.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
The pH scale measures concentration of hydrogen ions. Click Next Day to learn how colors represent safe or dangerous levels.
</p>
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 12 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '8px', padding: '24px' }}>
<span style={{ fontSize: '3rem' }}>🧪⚠️</span>
<span style={{ fontSize: '0.85rem', color: '#f87171', marginTop: '12px', fontWeight: 'bold' }}>SPILL pH: 2.0 (HAZARD)</span>
</div>
</div>
)}
{/* Day 12: Indicators */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 12: pH Color Indicators</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Chemical indicators change color to match chemical reactions.
</p>
<ul style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
<li>🔴 <strong style={{ color: '#f87171' }}>Red (pH 1-4)</strong>: Dangerous Acid</li>
<li>🟢 <strong style={{ color: '#34d399' }}>Green (pH 7)</strong>: Safe Neutral Water</li>
<li>🔵 <strong style={{ color: '#60a5fa' }}>Blue (pH 10-14)</strong>: Dangerous Alkaline / Base</li>
</ul>
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 13 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', justifyContent: 'center' }}>
<span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', marginBottom: '10px' }}>pH Color Guide:</span>
<div style={{ display: 'flex', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
<div style={{ flexGrow: 1, background: '#ef4444' }} title="Acidic"></div>
<div style={{ flexGrow: 1, background: '#f59e0b' }}></div>
<div style={{ flexGrow: 1, background: '#10b981' }} title="Neutral"></div>
<div style={{ flexGrow: 1, background: '#3b82f6' }} title="Alkaline"></div>
<div style={{ flexGrow: 1, background: '#8b5cf6' }} title="Base"></div>
</div>
<span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
<span>pH 1 (Acid)</span>
<span>pH 7 (Neutral)</span>
<span>pH 14 (Base)</span>
</span>
</div>
</div>
)}
{/* Day 13: Neutralize */}
{activeDay === 3 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 13: Adding Base Drops</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
To neutralize an acid, we must add drops of base (pH+). Adding base reduces the hydrogen ion concentration, raising the pH values.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Add Base Drop" on the right to bring the starting pH of 2.0 closer to neutral green.
</p>
{phLevel >= 6.0 && (
<button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 14 ▶</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<button onClick={() => changepH(1.0)} className="btn" style={{ padding: '8px 12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#60a5fa', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '12px', width: '100%' }}>Add Base Drop (+1.0 pH) 💧</button>
<strong style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Beaker: pH {phLevel}</strong>
<div style={{ width: '60px', height: '60px', borderRadius: '50%', background: getBeakerColor(), transition: 'background 0.3s' }}></div>
<div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{chemLog}</div>
</div>
</div>
)}
{/* Day 14: Fine-Tuning */}
{activeDay === 4 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 14: Fine-Tuning</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
We must match the chemical compound to exactly **pH 7.0**. Going above 7.0 makes the mixture basic (blue), which is also hazardous.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Use the fine-tuning Base (+0.1) and Acid (-0.1) drops to calibrate the beaker to exactly **7.0**.
</p>
{phLevel === 7.0 && (
<button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 15 ▶</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<div style={{ display: 'flex', gap: '6px', width: '100%', marginBottom: '10px' }}>
<button onClick={() => changepH(0.1)} style={{ flexGrow: 1, padding: '6px', fontSize: '0.7rem', background: 'none', border: '1px solid #3b82f6', color: '#60a5fa', cursor: 'pointer', borderRadius: '4px' }}>Base +0.1 💧</button>
<button onClick={() => changepH(-0.1)} style={{ flexGrow: 1, padding: '6px', fontSize: '0.7rem', background: 'none', border: '1px solid #ef4444', color: '#f87171', cursor: 'pointer', borderRadius: '4px' }}>Acid -0.1 🧪</button>
</div>
<strong style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Beaker: pH {phLevel}</strong>
<div style={{ width: '60px', height: '60px', borderRadius: '50%', background: getBeakerColor() }}></div>
<div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{chemLog}</div>
</div>
</div>
)}
{/* Day 15: Safe Cleanup */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 15: Spill Neutralized!</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Success! The chemical compound has been calibrated to safe neutral green water (pH 7.0).
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
You safely managed the hazard using titration variables. Click "Finish Week" to log your score.
</p>
<button onClick={() => handleFinishWeek(10)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 3! 🎉</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
<div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px #10b981)' }}>🧪💚</div>
<h5 style={{ color: 'var(--success)', marginTop: '12px', fontSize: '0.85rem' }}>pH 7.0 NEUTRAL & SAFE</h5>
</div>
</div>
)}
</div>
)}
{/* --- ELEMENTARY WEEK 4: Bridge Engineering --- */}
{activeChallenge === 'bridge' && (
    <div>
      {/* Day 16: Conditions Everywhere & Human IF/THEN */}
      {activeDay === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 16: Real-World Decisions</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
              Welcome to Week 4! Chatbots need decision rules to make sense of what we say. We write decision paths using IF/THEN and ELSE blocks.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--primary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>🔀 Mission 1: Conditions in Real Life</strong>
              <label style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Write one everyday IF/THEN conditional rule (e.g. IF battery low, THEN charge):
              </label>
              <textarea
                value={chatbotMissions.c4ConditionsInput || ''}
                onChange={e => updateMissionField('c4ConditionsInput', e.target.value)}
                placeholder="e.g. IF it is raining, THEN wear a raincoat..."
                style={{ width: '100%', height: '60px', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px', resize: 'none', marginBottom: '8px' }}
              />
              {!chatbotMissions.c4ConditionsDone ? (
                <button onClick={() => updateMissionField('c4ConditionsDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>Save Scenario</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold' }}>✓ Saved!</div>
              )}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>🏃 Mission 2: IF/THEN Challenge Game</span>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Engage in the classroom physical command rules. Check the ones you performed:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={chatbotMissions.c4GameClap || false} onChange={e => updateMissionField('c4GameClap', e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                <span>IF wearing sneakers ➔ Clap once</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={chatbotMissions.c4GameStand || false} onChange={e => updateMissionField('c4GameStand', e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                <span>IF birthday Jan-June ➔ Stand up</span>
              </label>
              {!chatbotMissions.c4GameDone ? (
                <button onClick={() => {
                  if (chatbotMissions.c4GameClap && chatbotMissions.c4GameStand) {
                    updateMissionField('c4GameDone', true);
                  } else {
                    alert("Execute both conditional classroom actions!");
                  }
                }} style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '4px' }}>Submit Game Result</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px' }}>✓ Game Logged!</div>
              )}
            </div>
            {chatbotMissions.c4ConditionsDone && chatbotMissions.c4GameDone && (
              <button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 17 ➜</button>
            )}
          </div>
        </div>
      )}

      {/* Day 17: Decision Trees & Custom Logic Branching */}
      {activeDay === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 17: Mapping Decision Trees</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>🌿 Mission 3: Decision Tree Trace</strong>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Trace this search: User asks: "Do you have science books?"<br />
                Rule: <strong>IF question contains "science" ➔ Output Section B. ELSE ➔ Output Section A.</strong>
              </p>
              <label style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '4px' }}>
                Where will the chatbot direct the user?
              </label>
              <input type="text" value={chatbotMissions.c4TreeTraceInput || ''} onChange={e => updateMissionField('c4TreeTraceInput', e.target.value)} placeholder="e.g. Section B" style={{ width: '100%', padding: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px', marginBottom: '8px' }} />
              {!chatbotMissions.c4TreeTraceDone ? (
                <button onClick={() => updateMissionField('c4TreeTraceDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>Validate Path</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold' }}>✓ Decision Path Validated!</div>
              )}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>📐 Mission 4: Design My Decision Branches</span>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Design at least two custom keyword branches and one fallback path for your project:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>IF input contains KEYWORD A:</label>
                <input type="text" value={chatbotMissions.c4BranchA || ''} onChange={e => updateMissionField('c4BranchA', e.target.value)} placeholder="e.g. menu ➔ say lunch entree" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>IF input contains KEYWORD B:</label>
                <input type="text" value={chatbotMissions.c4BranchB || ''} onChange={e => updateMissionField('c4BranchB', e.target.value)} placeholder="e.g. price ➔ say entrees cost $3.50" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ELSE (unknown fallback response):</label>
                <input type="text" value={chatbotMissions.c4BranchElse || ''} onChange={e => updateMissionField('c4BranchElse', e.target.value)} placeholder="e.g. I do not understand that question yet." style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              {!chatbotMissions.c4BranchDone ? (
                <button onClick={() => updateMissionField('c4BranchDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '4px' }}>Save Decision Rules</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px' }}>✓ Rules Saved!</div>
              )}
            </div>
            {chatbotMissions.c4TreeTraceDone && chatbotMissions.c4BranchDone && (
              <button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 18 ➜</button>
            )}
          </div>
        </div>
      )}

      {/* Day 18: Build IF and ELSE logic in Scratch */}
      {activeDay === 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 18: Coding Decision Branches</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>💻 Mission 5: Build IF logic in Scratch</strong>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                Open Scratch, use the green <strong>[contains]</strong> block and the control <strong>if/then</strong> blocks to trigger responses based on keywords.
              </p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={chatbotMissions.c4ScratchIfDone || false} onChange={e => updateMissionField('c4ScratchIfDone', e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                <span>My keyword decision branches are successfully coded in Scratch.</span>
              </label>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>🛡️ Mission 6: Fallback ELSE Block</span>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                Add an <strong>if/then/else</strong> block. The ELSE pathway should output a fallback response like: <em>"I do not understand that yet."</em>
              </p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={chatbotMissions.c4ScratchElseDone || false} onChange={e => updateMissionField('c4ScratchElseDone', e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                <span>My fallback ELSE logic is configured in Scratch.</span>
              </label>
            </div>
            {chatbotMissions.c4ScratchIfDone && chatbotMissions.c4ScratchElseDone && (
              <button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 19 ➜</button>
            )}
          </div>
        </div>
      )}

      {/* Day 19: Path Testing & Edge Cases */}
      {activeDay === 4 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 19: Path Testing & Edge Cases</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>📊 Mission 7: Decision Path Testing Table</strong>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Verify different inputs and ensure the correct branch executes:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.7rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="checkbox" checked={chatbotMissions.c4Path1 || false} onChange={e => updateMissionField('c4Path1', e.target.checked)} />
                  <span>Keyword A (e.g. "menu") ➔ Match A</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="checkbox" checked={chatbotMissions.c4Path2 || false} onChange={e => updateMissionField('c4Path2', e.target.checked)} />
                  <span>Keyword B (e.g. "price") ➔ Match B</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="checkbox" checked={chatbotMissions.c4Path3 || false} onChange={e => updateMissionField('c4Path3', e.target.checked)} />
                  <span>Unknown Query (e.g. "weather") ➔ Fallback Else</span>
                </label>
              </div>
              <button
                onClick={() => {
                  if (chatbotMissions.c4Path1 && chatbotMissions.c4Path2 && chatbotMissions.c4Path3) {
                    updateMissionField('c4PathTestDone', true);
                  } else {
                    alert("Complete all three path test runs!");
                  }
                }}
                style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '8px', width: '100%' }}
              >
                Validate Paths
              </button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>⚠️ Mission 8: Edge Case Stress Test</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Enter an unexpected query (e.g., long string, special symbols, or typos) and record how the bot handles it.
              </p>
              <textarea
                value={chatbotMissions.c4EdgeInput || ''}
                onChange={e => updateMissionField('c4EdgeInput', e.target.value)}
                placeholder="e.g. Tested: 'spaghett!!' ➔ Result: fallback triggered because typo broke contains block..."
                style={{ width: '100%', height: '60px', padding: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px', resize: 'none' }}
              />
              {!chatbotMissions.c4EdgeDone ? (
                <button onClick={() => updateMissionField('c4EdgeDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '4px' }}>Submit Edge Case Log</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px' }}>✓ Edge Case Logged!</div>
              )}
            </div>
            {chatbotMissions.c4PathTestDone && chatbotMissions.c4EdgeDone && (
              <button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 20 ➜</button>
            )}
          </div>
        </div>
      )}

      {/* Day 20: Week 4 Reflection */}
      {activeDay === 5 && (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px' }}>
    <div>
      <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 5: Smart Recycling Sorter Challenge</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
        Program an automated recycling sorter to process items on a conveyor belt. Use a loop to repeat the sorting cycle, tracking counts with variables, and avoiding infinite loop freezes!
      </p>

      {/* Sorter Dashboard (Variables in Memory) */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        <strong style={{ color: 'var(--primary-light)', fontSize: '0.75rem' }}>📊 Sorter Variable Counters (Memory):</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 4px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.6rem', display: 'block', color: 'var(--text-secondary)' }}>🧴 Plastic</span>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{rsPlasticCount}</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 4px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.6rem', display: 'block', color: 'var(--text-secondary)' }}>📰 Paper</span>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{rsPaperCount}</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 4px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.6rem', display: 'block', color: 'var(--text-secondary)' }}>🥫 Can</span>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{rsCanCount}</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '6px 4px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.6rem', display: 'block', color: 'var(--text-secondary)' }}>🍎 Food</span>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{rsFoodCount}</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 4px', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--primary)' }}>
            <span style={{ fontSize: '0.6rem', display: 'block', color: 'var(--primary-light)' }}>🔢 Total</span>
            <strong style={{ color: 'var(--primary-light)', fontSize: '1.1rem' }}>{rsTotalCount}</strong>
          </div>
        </div>
      </div>

      {/* Sorter Loop Logic Settings */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem' }}>🔁 Loop Instruction Rules:</strong>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer', color: '#fff' }}>
            <input type="radio" name="loopType" checked={rsLoopType === 'step'} onChange={() => setRsLoopType('step')} style={{ accentColor: 'var(--primary)' }} />
            <span>Single Cycle (No Loop - Manual sorting one-by-one)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer', color: '#fff' }}>
            <input type="radio" name="loopType" checked={rsLoopType === 'repeat5'} onChange={() => setRsLoopType('repeat5')} style={{ accentColor: 'var(--primary)' }} />
            <span>REPEAT 5 TIMES (Processes next 5 items)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer', color: '#fff' }}>
            <input type="radio" name="loopType" checked={rsLoopType === 'untilEmpty'} onChange={() => setRsLoopType('untilEmpty')} style={{ accentColor: 'var(--primary)' }} />
            <span>REPEAT UNTIL conveyor_belt = empty (Process everything)</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.75rem' }}>Sorter Status:</span>
          <strong style={{ 
            fontSize: '0.75rem', 
            color: rsStatus === 'infinite' ? 'var(--danger)' : rsStatus === 'running' ? 'var(--success)' : 'var(--text-muted)' 
          }}>
            {rsStatus === 'infinite' ? '🚨 INFINITE LOOP FREEZE' : rsStatus === 'running' ? 'RUNNING 🔄' : 'IDLE ⚪'}
          </strong>
        </div>

        {rsStatus === 'infinite' ? (
          <button onClick={fixInfiniteLoop} className="btn" style={{ background: 'var(--success)', border: 'none', color: '#fff', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
            🔧 Apply Loop Fix (Advance Conveyor Belt)
          </button>
        ) : (
          <button onClick={handleRunSorter} disabled={rsStatus === 'running'} className="btn btn-primary" style={{ padding: '8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.75rem' }}>
            {rsLoopType === 'step' ? 'Sort Next Item ➡️' : 'Run Sorter Loop 🔄'}
          </button>
        )}
      </div>

      {rsG1 && rsG2 && rsG3 && rsG4 ? (
        <button onClick={() => {
          handleFinishWeek(10);
        }} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}>Finish Week 4 Challenge! 🏆</button>
      ) : (
        <div style={{ color: 'var(--warning)', fontSize: '0.75rem', padding: '8px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
          🔒 Unlock Final Reward by completing all four engineering test objectives!
        </div>
      )}
    </div>

    {/* Conveyor Belt Simulation & Objectives */}
    <div>
      <span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
        Conveyor Belt (Next items waiting):
      </span>
      
      {/* Visual conveyor belt */}
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '8px', minHeight: '60px', alignItems: 'center' }}>
          {rsBelt.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 'auto', fontStyle: 'italic' }}>
              Conveyor belt is empty. Load a batch!
            </div>
          ) : (
            rsBelt.map((item, idx) => (
              <div key={idx} style={{ 
                background: idx === 0 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.04)', 
                border: idx === 0 ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                padding: '8px 12px',
                borderRadius: '6px',
                textAlign: 'center',
                minWidth: '70px',
                fontSize: '0.7rem',
                position: 'relative',
                animation: 'slideUp 0.2s',
                color: '#fff'
              }}>
                {idx === 0 && <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#fff', fontSize: '0.5rem', padding: '1px 4px', borderRadius: '4px', fontWeight: 'bold' }}>SENSOR</span>}
                <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>
                  {item === 'plastic' ? '🧴' : item === 'paper' ? '📰' : item === 'can' ? '🥫' : item === 'food' ? '🍎' : '❓'}
                </div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                  {item === 'can' ? 'aluminum' : item}
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderStyle: 'dashed', borderWidth: '1px 0 0 0' }}></div>
      </div>

      {/* Simulator Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        <button onClick={() => {
          setRsBelt(prev => [...prev, 'plastic', 'paper', 'can', 'food']);
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
          ➕ Load Normal Batch
        </button>
        <button onClick={() => {
          setRsBelt(prev => [...prev, 'unknown']);
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
          ❓ Add Unknown Item
        </button>
        <button onClick={triggerInfiniteLoopBug} disabled={rsStatus === 'running' || rsBelt.length === 0} className="btn" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--danger-light)', fontSize: '0.7rem', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
          ⚠️ Trigger Infinite Loop Bug
        </button>
        <button onClick={() => {
          setRsPlasticCount(0);
          setRsPaperCount(0);
          setRsCanCount(0);
          setRsFoodCount(0);
          setRsTotalCount(0);
          setRsCurrentItem(null);
          setRsBelt(['plastic', 'paper', 'can', 'food', 'unknown']);
          setRsStatus('idle');
        }} className="btn" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
          🔄 Reset Sorter
        </button>
      </div>

      {/* Objectives Checkbox checklist */}
      <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: '8px' }}>🎯 Sorter Testing Objectives:</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={rsG1} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: rsG1 ? 'var(--success)' : '#fff' }}>1. Run a REPEAT 5 TIMES Sorter Loop</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={rsG2} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: rsG2 ? 'var(--success)' : '#fff' }}>2. Run a REPEAT UNTIL EMPTY Loop to clear a batch</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={rsG3} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: rsG3 ? 'var(--success)' : '#fff' }}>3. Sort an Unknown Item safely without stopping</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={rsG4} readOnly style={{ accentColor: 'var(--primary)' }} />
            <span style={{ color: rsG4 ? 'var(--success)' : '#fff' }}>4. Diagnose and Fix an Infinite Sorter Loop Bug</span>
          </label>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  )}
{/* --- MIDDLE SCHOOL WEEK 3: Water Purification --- */}
{activeChallenge === 'share' && (
    <div>
      {/* Day 21: Engineering Check & User Testing */}
      {activeDay === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 21: Final Checks & User Tests</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>🏁 Mission 1: Final Engineering Check</strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.65rem' }}>
                {[
                  { key: 'problem', text: 'Solves clear problem' },
                  { key: 'user', text: 'Identified user target' },
                  { key: 'data', text: 'Clean list database' },
                  { key: 'algorithm', text: 'Search algorithm coded' },
                  { key: 'variable', text: 'Used userName variable' },
                  { key: 'conditional', text: 'Coded IF/ELSE keyword rules' },
                  { key: 'testing', text: 'Tested edge case entries' },
                  { key: 'limitation', text: 'Identified system limits' },
                  { key: 'iteration', text: 'Improved based on logs' }
                ].map(item => (
                  <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={chatbotMissions.c5Checklist[item.key] || false} onChange={e => updateMissionField('c5Checklist', { ...chatbotMissions.c5Checklist, [item.key]: e.target.checked })} />
                    <span>{item.text}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => {
                  const check = chatbotMissions.c5Checklist;
                  const allDone = Object.values(check).every(v => v === true);
                  if (allDone) {
                    updateMissionField('c5ChecklistDone', true);
                  } else {
                    alert("Complete all 9 compliance items before submitting!");
                  }
                }}
                style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '8px', width: '100%' }}
              >
                Submit Engineering Audit
              </button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>👥 Mission 2: User Testing Lab</span>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Have another student team test your chatbot without giving them hints. Document observations:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>What did they ask?</label>
                <input type="text" value={chatbotMissions.c5TestAsk || ''} onChange={e => updateMissionField('c5TestAsk', e.target.value)} placeholder="e.g. Wednesday menu" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>What worked well?</label>
                <input type="text" value={chatbotMissions.c5TestSuccess || ''} onChange={e => updateMissionField('c5TestSuccess', e.target.value)} placeholder="e.g. Greeted them by name immediately" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>What confused them?</label>
                <input type="text" value={chatbotMissions.c5TestConfused || ''} onChange={e => updateMissionField('c5TestConfused', e.target.value)} placeholder="e.g. Typos caused the fallback to trigger" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              {!chatbotMissions.c5UserTestDone ? (
                <button onClick={() => updateMissionField('c5UserTestDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '4px' }}>Save Test Feedback</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px' }}>✓ Testing Feedback Logged!</div>
              )}
            </div>
            {chatbotMissions.c5ChecklistDone && chatbotMissions.c5UserTestDone && (
              <button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 22 ➜</button>
            )}
          </div>
        </div>
      )}

      {/* Day 22: Final Upgrade & Expo Preparation */}
      {activeDay === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 22: Code Upgrades & Pitch Prep</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>🛠️ Mission 3: Final Upgrade</strong>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                Review feedback from Day 21 and make one final coding or database correction in Scratch.
              </p>
              <textarea
                value={chatbotMissions.c5UpgradeNotes || ''}
                onChange={e => updateMissionField('c5UpgradeNotes', e.target.value)}
                placeholder="e.g. Added a contains rule for 'cost' to resolve price search confusion..."
                style={{ width: '100%', height: '65px', padding: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px', resize: 'none' }}
              />
              {!chatbotMissions.c5UpgradeDone ? (
                <button onClick={() => updateMissionField('c5UpgradeDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '6px' }}>Log Final Upgrade</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '6px' }}>✓ Final Upgrade Logged!</div>
              )}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>🎤 Mission 4: Prepare Expo Presentation</span>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Draft your design pitch talking points:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Chatbot Title:</label>
                <input type="text" value={chatbotMissions.c5ExpoTitle || ''} onChange={e => updateMissionField('c5ExpoTitle', e.target.value)} placeholder="e.g. LunchBot 2000" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Target User:</label>
                <input type="text" value={chatbotMissions.c5ExpoUser || ''} onChange={e => updateMissionField('c5ExpoUser', e.target.value)} placeholder="e.g. Students in the cafeteria" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Key Tech Used:</label>
                <input type="text" value={chatbotMissions.c5ExpoTech || ''} onChange={e => updateMissionField('c5ExpoTech', e.target.value)} placeholder="e.g. userName variable and IF/ELSE keyword matches" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px' }} />
              </div>
              {!chatbotMissions.c5ExpoDone ? (
                <button onClick={() => updateMissionField('c5ExpoDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '4px' }}>Save Pitch Notes</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px' }}>✓ Pitch Notes Saved! Ready to present.</div>
              )}
            </div>
            {chatbotMissions.c5UpgradeDone && chatbotMissions.c5ExpoDone && (
              <button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 23 ➜</button>
            )}
          </div>
        </div>
      )}

      {/* Day 23: Live Expo Presentations */}
      {activeDay === 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 23: Design Expo Presentation</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>🎤 Mission 5: Present to the Expo</strong>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '10px' }}>
                Present your 3-5 minute live demonstration covering the Problem, the User, the Data, the Search Sequence, Variables, and the Live test run.
              </p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={chatbotMissions.c5PresentationDone || false} onChange={e => updateMissionField('c5PresentationDone', e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                <span>Our team completed our live Design Expo showcase.</span>
              </label>
            </div>
            {chatbotMissions.c5PresentationDone && (
              <button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 24 ➜</button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '8px', padding: '24px' }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🚀</span>
            <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>Live Showcase Stage</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
              Showcase variables, database queries, and invite classmates to test unexpected edge cases!
            </span>
          </div>
        </div>
      )}

      {/* Day 24: Audience Feedback Collection */}
      {activeDay === 4 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 24: Peer Review & Feedback</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--secondary-light)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>💡 Mission 6: Strength-Idea-Question (S-I-Q)</strong>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Collect or write feedback for another team's chatbot:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.7rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)' }}>⭐ One Strength (I noticed that...):</label>
                  <input type="text" value={chatbotMissions.c5FeedbackStrength || ''} onChange={e => updateMissionField('c5FeedbackStrength', e.target.value)} placeholder="e.g. The database menu pricing is completely clean and matching." style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)' }}>💡 One Idea (One upgrade to consider is...):</label>
                  <input type="text" value={chatbotMissions.c5FeedbackIdea || ''} onChange={e => updateMissionField('c5FeedbackIdea', e.target.value)} placeholder="e.g. Add a variable to track how many times the user asks a question." style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)' }}>❓ One Question (I wonder what happens if...):</label>
                  <input type="text" value={chatbotMissions.c5FeedbackQuestion || ''} onChange={e => updateMissionField('c5FeedbackQuestion', e.target.value)} placeholder="e.g. What happens if you type capital letters?" style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }} />
                </div>
              </div>
              {!chatbotMissions.c5FeedbackDone ? (
                <button onClick={() => updateMissionField('c5FeedbackDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '8px' }}>Log Peer Review</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '6px' }}>✓ Peer Review Logged!</div>
              )}
            </div>
            {chatbotMissions.c5FeedbackDone && (
              <button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Go to Day 25 ➜</button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', lineHeight: '1.4' }}>
            <span style={{ fontWeight: 'bold', color: '#fff', display: 'block', marginBottom: '6px' }}>Constructive Review Prompts:</span>
            <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
              <li>• "Your chatbot was effective when..."</li>
              <li>• "I wonder what would happen if you input..."</li>
              <li>• "One logic pathway improvement is..."</li>
            </ul>
          </div>
        </div>
      )}

      {/* Day 25: Metacognitive & Career Reflection */}
      {activeDay === 5 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Day 25: Individual Reflection</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px', maxHeight: '350px', overflowY: 'auto' }}>
              <strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>📝 Mission 7: AI Engineer Reflection</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.7rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)' }}>What real-world problem did your chatbot solve?</label>
                  <input type="text" value={chatbotMissions.c5RefProblem || ''} onChange={e => updateMissionField('c5RefProblem', e.target.value)} style={{ width: '100%', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)' }}>What did you learn about algorithms and code sequencing?</label>
                  <textarea value={chatbotMissions.c5RefAlgo || ''} onChange={e => updateMissionField('c5RefAlgo', e.target.value)} style={{ width: '100%', height: '40px', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', resize: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)' }}>Which engineering role did you enjoy most and why?</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '4px 0' }}>
                    {['AI Engineer', 'Data Engineer', 'Scratch Developer', 'AI Tester'].map(role => (
                      <button key={role} type="button" onClick={() => updateMissionField('c5SelectedRole', role)} style={{ padding: '3px 8px', fontSize: '0.65rem', borderRadius: '12px', border: 'none', background: chatbotMissions.c5SelectedRole === role ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }}>{role}</button>
                    ))}
                  </div>
                  <textarea value={chatbotMissions.c5RoleReason || ''} onChange={e => updateMissionField('c5RoleReason', e.target.value)} placeholder="Explain why..." style={{ width: '100%', height: '40px', padding: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', resize: 'none' }} />
                </div>
              </div>
              {!chatbotMissions.c5RefDone ? (
                <button onClick={() => updateMissionField('c5RefDone', true)} style={{ background: 'var(--secondary)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', cursor: 'pointer', marginTop: '8px' }}>Submit Expo Reflection</button>
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '6px' }}>✓ Reflection Logged!</div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🎓✨</span>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Curriculum Completed!</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '240px', lineHeight: '1.4', marginBottom: '16px' }}>
              You have completed the entire Grades 4-5 AI BotBuilder curriculum!
            </p>
            {chatbotMissions.c5RefDone && (
              <button onClick={() => handleFinishWeek(10)} className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '6px' }}>Finish Expo Challenge! 🎓</button>
            )}
          </div>
        </div>
      )}
    </div>
  )}

{activeChallenge === 'water' && (
<div>
{/* Day 11: Runoff contamination */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 11: Stormwater Runoff</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Welcome to Week 3. Heavy rain flooded the school parking lot, washing toxic chemical particulates into the local pond!
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
We must design a mechanical and chemical water filtration system. Click Next Day to learn about filtering layers.
</p>
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 12 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '8px', padding: '24px' }}>
<span style={{ fontSize: '3rem' }}>🌑🧪</span>
<span style={{ fontSize: '0.85rem', color: '#f87171', marginTop: '12px', fontWeight: 'bold' }}>WATER STATUS: CONTAMINATED</span>
</div>
</div>
)}
{/* Day 12: Filtering layers */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 12: Mechanical Filter Media</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Active carbon (charcoal) absorbs organic chemicals, chlorine, and odors, while gravel sand traps larger mud particles.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Select your active carbon layer thickness variable on the right (at least **3 or 4 layers** are recommended for heavy mud).
</p>
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 13 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Carbon Layer Thickness:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{waterCarbon} Layers</strong>
</div>
<input type="range" min="1" max="5" value={waterCarbon} onChange={e => setWaterCarbon(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
</div>
</div>
)}
{/* Day 13: Flocculent drops */}
{activeDay === 3 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 13: Chemical Flocculation</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Flocculents are chemical compounds that make microscopic particles clump together (floc), making them large enough to be trapped by filters.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Adjust chemical flocculent drops variable on the right (keep between **2 and 6 drops** to avoid toxic excess).
</p>
<button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 14 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Chemical Flocculent:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{waterFlocculent} Drops</strong>
</div>
<input type="range" min="0" max="10" value={waterFlocculent} onChange={e => setWaterFlocculent(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
</div>
</div>
)}
{/* Day 14: Purification test */}
{activeDay === 4 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 14: Run Purification Test</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Let's run the water cycle test. The purifier will mix your carbon thickness and chemical drops to measure purity levels.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Run Purification Cycle". If toxic elements are detected, reduce chemical drops on Day 13.
</p>
{waterStatus === 'success' && (
<button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 15 ▶</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<button onClick={runWaterTest} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>Run Purification Cycle 💧</button>
<div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', width: '100%' }}>
{waterLog}
</div>
</div>
</div>
)}
{/* Day 15: Pure water active */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 15: Runoff Pure & Clear</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Congratulations! You successfully designed a dual chemical-mechanical water filtration layout.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Click "Finish Week" to log your score.
</p>
<button onClick={() => handleFinishWeek(15)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 3! 🎉</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
<div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px #10b981)' }}>💧💚</div>
<h5 style={{ color: 'var(--success)', marginTop: '12px', fontSize: '0.85rem' }}>WATER PURIFIED</h5>
</div>
</div>
)}
</div>
)}
{/* --- MIDDLE SCHOOL WEEK 4: Seismic Skyscraper --- */}
{activeChallenge === 'tower' && (
<div>
{/* Day 16: Seismic gaps */}
{activeDay === 1 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 16: Skyscraper Shake Challenge</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Welcome to Week 4. The school district is building a new science tower in an active seismic fault zone!
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
We must engineer a structure that can survive a magnitude 7.0 earthquake using base isolation pads, cross-bracings, and height calibration variables.
</p>
<button onClick={() => setActiveDay(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 17 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '24px' }}>
<span style={{ fontSize: '3rem' }}>🌉⚠️</span>
<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>Tower Status: UNTESTED</span>
</div>
</div>
)}
{/* Day 17: Base isolation */}
{activeDay === 2 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 17: Base Isolation Systems</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Rigidly fixed bases shake violently during ground motion. Base isolation (rubber elastomeric pads or sliding rollers) decouples the building from the moving ground.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Select the foundation base type on the right. Rubber pads or rollers are highly recommended for tall structures.
</p>
<button onClick={() => setActiveDay(3)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 18 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', marginBottom: '10px' }}>Foundation System:</span>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
{['fixed', 'rubber', 'rollers'].map(item => (
<button key={item} onClick={() => setTowerIsolation(item)} style={{ padding: '8px', background: towerIsolation === item ? 'var(--secondary)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', borderRadius: '4px', textTransform: 'capitalize', cursor: 'pointer', fontSize: '0.75rem' }}>
{item === 'fixed' ? 'Rigidly Fixed' : item === 'rubber' ? 'Elastomeric Rubber Pads' : 'Friction Sliding Rollers'}
</button>
))}
</div>
</div>
</div>
)}
{/* Day 18: Cross bracing */}
{activeDay === 3 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 18: Structural Lateral Bracing</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Earthquake forces push buildings sideways (lateral load). Double X-bracing and solid concrete shear walls distribute tension stresses.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Select structural reinforcement on the right.
</p>
<button onClick={() => setActiveDay(4)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 19 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<span style={{ fontSize: '0.75rem', color: 'var(--secondary-light)', fontWeight: 'bold', marginBottom: '10px' }}>Bracing System:</span>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
{['single', 'shear', 'xbracing'].map(item => (
<button key={item} onClick={() => setTowerBracing(item)} style={{ padding: '8px', background: towerBracing === item ? 'var(--secondary)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', borderRadius: '4px', textTransform: 'capitalize', cursor: 'pointer', fontSize: '0.75rem' }}>
{item === 'single' ? 'Single Beam (Basic)' : item === 'shear' ? 'Reinforced Shear Wall' : 'Steel Double X-Bracing'}
</button>
))}
</div>
</div>
</div>
)}
{/* Day 19: Structural Height */}
{activeDay === 4 && (
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 19: Building Height & Resonance</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Taller buildings experience higher leverage forces. If a tower is tall, it requires robust base damping to avoid tipping over.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
Select building height (floors count) on the right.
</p>
<button onClick={() => setActiveDay(5)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Go to Day 20 ▶</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
<span>Building Height:</span>
<strong style={{ color: 'var(--secondary-light)' }}>{towerHeight} Floors</strong>
</div>
<input type="range" min="10" max="50" value={towerHeight} onChange={e => setTowerHeight(e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
</div>
</div>
)}
{/* Day 20: Seismic shake test */}
{activeDay === 5 && (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
<div>
<h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '12px' }}>Day 20: Seismic Shake Test</h4>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
Trigger a magnitude 7.0 earthquake simulation.
</p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
If the structural frame cracks or collapses, go back and reinforce your foundations or bracing variables!
</p>
<div style={{ display: 'flex', gap: '10px' }}>
{towerStatus === 'success' && (
<button onClick={() => handleFinishWeek(15)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px' }}>Finish Week 4! 🎉</button>
)}
</div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', padding: '20px', alignItems: 'center' }}>
<button onClick={runTowerTest} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>Test Seismic Resistance 🏢💨</button>
<div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', width: '100%' }}>
{towerLog}
</div>
</div>
</div>
)}
</div>
)}
</div>
</div>
)}
</>
)}
{/* --- TEACHER/FACILITATOR MODE --- */}
{viewMode === 'teacher' && (
<div style={{
display: 'flex',
flexDirection: 'column',
background: '#1d1726',
borderRadius: 'var(--border-radius-lg)',
border: '2px solid rgba(139, 92, 246, 0.25)',
boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
overflow: 'hidden'
}} className="curriculum-teacher-container">
{/* Unit Selection Header */}
<div style={{
padding: '16px 24px',
background: '#241a30',
borderBottom: '1px solid rgba(255,255,255,0.08)',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
flexWrap: 'wrap',
gap: '12px'
}}>
<div>
<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Facilitator Console</span>
<h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '2px 0 0 0' }}>Curriculum Solution & Lesson Guides</h3>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Select Active Unit:</span>
<select
value={teacherUnit}
onChange={e => { setTeacherUnit(e.target.value); setActiveTeacherTab('overview'); setSelectedResource(null); setPrintFilter('all'); setPreviewResource(null); setActiveOverviewSubTab('curriculum'); }}
style={{
background: 'rgba(255,255,255,0.05)',
border: '1px solid rgba(255,255,255,0.15)',
color: '#fff',
borderRadius: '6px',
padding: '6px 12px',
fontSize: '0.8rem',
outline: 'none',
cursor: 'pointer'
}}
>
<option value="botbuilder">🎒 Grades 4-5 - AI BotBuilder</option>
<option value="ecoengineering">🎓 Grades 6-8 - EcoEngineering</option>
</select>
</div>
</div>
{/* Inner Dual-Pane Container */}
<div style={{ display: 'flex', minHeight: '480px' }}>
{/* LEFT SIDEBAR: Inkling Style */}
<div style={{
width: '280px',
background: '#282130',
borderRight: '1px solid rgba(255,255,255,0.08)',
display: 'flex',
flexDirection: 'column',
flexShrink: 0
}}>
<div style={{ display: 'flex', flexDirection: 'column', padding: '12px 6px', gap: '4px', overflowY: 'auto' }}>
{[
{ id: 'overview', text: 'Unit Overview' },
{ id: 'pd', text: 'Professional Development Resources' },
{ id: 'printing', text: 'Student Resource Printing & Prep' },
{ id: 'intro', text: 'Unit Introduction' },
{ id: 'part1', text: teacherUnit === 'botbuilder' ? 'Part 1: Data, Data, Data' : 'Part 1: Irrigation & Soil Codes' },
{ id: 'part2', text: teacherUnit === 'botbuilder' ? 'Part 2: All About Algorithms' : 'Part 2: Wind Forces' },
{ id: 'part3', text: teacherUnit === 'botbuilder' ? 'Part 3: Introduction to Variables' : 'Part 3: Chemical Filtration' },
{ id: 'part4', text: teacherUnit === 'botbuilder' ? 'Part 4: Loops & Repetition' : 'Part 4: Seismic Structural Loads' },
{ id: 'share', text: 'Unit Share' }
].map((item) => {
const isActive = activeTeacherTab === item.id;
return (
<button
key={item.id}
onClick={() => { setActiveTeacherTab(item.id); setSelectedResource(null); setPrintFilter('all'); setPreviewResource(null); }}
style={{
textAlign: 'left',
padding: '10px 14px',
background: 'none',
color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
border: isActive ? '2px solid #0284c7' : '2px solid transparent',
borderRadius: '6px',
cursor: 'pointer',
fontSize: '0.8rem',
fontWeight: isActive ? 600 : 400,
display: 'flex',
alignItems: 'center',
gap: '10px',
transition: 'all 0.15s ease'
}}
>
<span style={{ opacity: 0.5 }}>☰</span>
<span style={{ lineHeight: '1.3' }}>{item.text}</span>
</button>
);
})}
</div>
</div>
{/* RIGHT PANEL: Dynamic Curriculum Content */}
<div style={{
flexGrow: 1,
padding: '36px',
overflowY: 'auto',
maxHeight: '480px',
background: 'rgba(0,0,0,0.1)'
}}>
{activeTeacherTab === 'overview' && (
<div style={{ animation: 'slideUp 0.2s', textAlign: 'left', color: 'var(--text-secondary)' }}>
<h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>Unit Overview</h3>
<p style={{ fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '16px' }}>
Access the full unit scope, standards mapping, learning journey roadmap, key vocabulary, and teacher preparation snapshot.
</p>
{/* Sub-Tab Navigation */}
<div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '20px' }}>
{[
{ id: 'curriculum', label: '🎯 Core Curriculum', color: '#818cf8' },
{ id: 'prep', label: '🔧 Prep & Timing', color: '#fbbf24' },
{ id: 'assessment', label: '📊 Standards & Assessment', color: '#fb7185' },
{ id: 'pedagogy', label: '💡 Pedagogy & Context', color: '#2dd4bf' }
].map(tab => (
<button
key={tab.id}
onClick={() => setActiveOverviewSubTab(tab.id)}
style={{
background: activeOverviewSubTab === tab.id ? 'rgba(255,255,255,0.06)' : 'transparent',
border: '1px solid ' + (activeOverviewSubTab === tab.id ? tab.color : 'transparent'),
color: activeOverviewSubTab === tab.id ? '#fff' : 'var(--text-muted)',
padding: '6px 12px',
borderRadius: '6px',
fontSize: '0.75rem',
fontWeight: 'bold',
cursor: 'pointer',
outline: 'none',
transition: 'all 0.2s'
}}
>
{tab.label}
</button>
))}
</div>
{/* SUB-TAB 1: CORE CURRICULUM */}
{activeOverviewSubTab === 'curriculum' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.2s' }}>
{/* Section 1: Story / Big Picture */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
📖 Unit Story & Big Picture
</h4>
<p style={{ fontSize: '0.8rem', lineHeight: '1.6', margin: 0 }}>
{teacherUnit === 'botbuilder' ? (
"Students step into the role of AI engineers as they explore how data, algorithms, variables, and conditionals work together to create interactive chatbot systems. Through inquiry, design, coding, testing, and reflection, students investigate how computers use structured information and programmed logic to respond to users. The unit emphasizes real-world problem solving, computational thinking, collaboration, responsible AI, and iterative engineering."
) : (
"Students step into the role of environmental and civil engineers to address stormwater management in urban centers. Across the unit, students analyze physical soil layers, model porous filtration media, design lift coefficients in turbine blade physics, and run seismic testing loads on high-rise structures. The unit connects math modeling and physics variables to sustainable urban infrastructure."
)}
</p>
</div>
{/* Section 2: Essential Questions */}
<div style={{ background: 'rgba(129, 140, 248, 0.03)', border: '1px solid rgba(129, 140, 248, 0.15)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#818cf8', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>❓ Driving Essential Questions</h4>
<ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px', color: '#fff' }}>
{teacherUnit === 'botbuilder' ? (
<>
<li>How can computers use data to respond to human questions?</li>
<li>How do algorithms help a program make decisions?</li>
<li>How can variables help a program remember and use information?</li>
<li>How do conditionals allow a program to respond differently in different situations?</li>
<li>How can engineers test and improve an AI-inspired system?</li>
</>
) : (
<>
<li>How does storm water runoff affect community environment safety?</li>
<li>How do soil compositions affect filtration rates?</li>
<li>How do blade mechanics translate wind into electrical grid energy?</li>
<li>How do geometric structures resist seismic stress loads?</li>
</>
)}
</ul>
</div>
{/* Section 3: Learning Objectives */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '12px' }}>🎯 Learning Objectives</h4>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
{teacherUnit === 'botbuilder' ? (
<>
<div>
<strong style={{ color: '#818cf8', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Data & Knowledge Bases</strong>
<ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li>Identify the data a system needs to function.</li>
<li>Organize information into categories and lists.</li>
<li>Explain why accurate and organized data matters in AI.</li>
</ul>
</div>
<div>
<strong style={{ color: '#818cf8', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Algorithms</strong>
<ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li>Describe an algorithm as an ordered sequence of instructions.</li>
<li>Create and test simple algorithms.</li>
<li>Analyze how algorithms influence system responses.</li>
</ul>
</div>
<div>
<strong style={{ color: '#818cf8', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Variables & Memory</strong>
<ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li>Explain how variables store changing information.</li>
<li>Create and use variables inside Scratch scripts.</li>
<li>Connect variables to user input and program logic flow.</li>
</ul>
</div>
<div>
<strong style={{ color: '#818cf8', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Conditionals & Gating</strong>
<ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li>Apply IF / THEN logic to branch programs.</li>
<li>Create conditional decision pathways.</li>
<li>Verify how different inputs produce correct outputs.</li>
</ul>
</div>
</>
) : (
<>
<div>
<strong style={{ color: '#818cf8', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Filtration Mechanics</strong>
<ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li>Calculate water drainage velocities across mediums.</li>
<li>Compare absorption metrics of permeable surfaces.</li>
</ul>
</div>
<div>
<strong style={{ color: '#818cf8', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Seismology Loads</strong>
<ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li>Test horizontal stress resilience under vibrations.</li>
<li>Optimize truss angles in model high-rises.</li>
</ul>
</div>
</>
)}
</div>
</div>
{/* Section 5: Unit Learning Journey (Roadmap) */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '14px' }}>🗺️ Unit Learning Journey (Roadmap)</h4>
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
{[
{ id: 'intro', step: 'INTRO', title: 'The Chatbot Challenge', desc: teacherUnit === 'botbuilder' ? 'Students investigate chatbots and identify the real-world problem.' : 'Identify urban stormwater hazards.' },
{ id: 'part1', step: 'PART 1', title: teacherUnit === 'botbuilder' ? 'Data, Data, Data' : 'Irrigation & Filtration', desc: teacherUnit === 'botbuilder' ? 'Students organize information, design a knowledge base, and build lists.' : 'Measure soil composition permeability.' },
{ id: 'part2', step: 'PART 2', title: teacherUnit === 'botbuilder' ? 'All About Algorithms' : 'Wind Turbine Mechanics', desc: teacherUnit === 'botbuilder' ? 'Students construct sequential search logic.' : 'Optimize rotor blade pitches.' },
{ id: 'part3', step: 'PART 3', title: teacherUnit === 'botbuilder' ? 'Introduction to Variables' : 'Chemical Filtration', desc: teacherUnit === 'botbuilder' ? 'Students use variables to track user input.' : 'Use pH sensors to neutralize acidity.' },
{ id: 'part4', step: 'PART 4', title: teacherUnit === 'botbuilder' ? 'Crazy About Conditionals' : 'Seismic Structures', desc: teacherUnit === 'botbuilder' ? 'Students code logic decision gates.' : 'Build seismic resistant buildings.' },
{ id: 'share', step: 'UNIT SHARE', title: 'Test, Present, Reflect', desc: 'Present prototypes, gather peer feedback, and reflect on iterative improvements.' }
].map(journey => (
<button
key={journey.id}
onClick={() => setActiveTeacherTab(journey.id)}
style={{
background: 'rgba(255,255,255,0.02)',
border: '1px solid rgba(255,255,255,0.05)',
borderRadius: '6px',
padding: '8px 12px',
color: 'var(--text-secondary)',
cursor: 'pointer',
display: 'flex',
alignItems: 'center',
width: '100%',
gap: '12px',
textAlign: 'left',
outline: 'none',
transition: 'all 0.2s'
}}
>
<span style={{ fontSize: '0.65rem', background: 'var(--primary)', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{journey.step}</span>
<div style={{ flexGrow: 1 }}>
<strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block' }}>{journey.title}</strong>
<span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{journey.desc}</span>
</div>
<span style={{ color: 'var(--primary-light)', fontSize: '0.75rem' }}>Jump ➜</span>
</button>
))}
</div>
</div>
{/* Section 6: Engineering Design Cycle */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '6px', textAlign: 'left' }}>🔄 The Engineering Design Cycle</h4>
<p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px', textAlign: 'left' }}>
Students navigate this cycle iteratively. They test and refine systems continuously rather than following a single linear sequence.
</p>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '6px', fontSize: '0.65rem', fontWeight: 'bold' }}>
{['ASK', 'INVESTIGATE', 'ORGANIZE DATA', 'DESIGN', 'BUILD', 'TEST', 'IMPROVE', 'REFLECT'].map((step, idx) => (
<div key={step} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
<span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '4px 8px', borderRadius: '12px' }}>{step}</span>
{idx < 7 && <span style={{ color: 'var(--text-muted)' }}>➔</span>}
</div>
))}
</div>
</div>
</div>
)}
{/* SUB-TAB 2: PREP & TIMING */}
{activeOverviewSubTab === 'prep' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.2s' }}>
{/* Section 12: Before You Begin Snapshot */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '12px' }}>🛠️ Before You Begin Snapshot</h4>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.75rem' }}>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Required Software</strong>
<span>{teacherUnit === 'botbuilder' ? 'Scratch Desktop or Web' : 'Storm Sim Web app & physical probes'}</span>
</div>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Student Grouping</strong>
<span>Pairs or Teams of 2-4 students</span>
</div>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Device Requirements</strong>
<span>Laptops/Tablets with modern browser & Internet</span>
</div>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Recommended Prep</strong>
<span style={{ color: 'var(--primary-light)' }}>
Review PD guides "Understanding AI" & "Scratch Lists".
</span>
</div>
</div>
</div>
{/* Section 13: Suggested Unit Timing */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '12px' }}>⏱️ Suggested Pacing & Pacing Flexibility</h4>
<p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
Adjust pacing to fit your class scheduling. Standard path represents a total of 10-12 instructional periods.
</p>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '4px' }}>
<span>Unit Introduction</span>
<strong>1 Session (~45°° mins)</strong>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '4px' }}>
<span>Part 1: Data / Infiltration</span>
<strong>2 Instructional Hours</strong>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '4px' }}>
<span>Part 2: Algorithms / Turbine Blade</span>
<strong>2 Instructional Hours</strong>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '4px' }}>
<span>Part 3: Variables / Chemical filtration</span>
<strong>2 Instructional Hours</strong>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '4px' }}>
<span>Part 4: Loops & Repetition / Seismic brace</span>
<strong>2 Instructional Hours</strong>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '4px' }}>
<span>Unit Share & Reflect</span>
<strong>1-2 Sessions (~90 mins)</strong>
</div>
</div>
</div>
{/* Section 14: Student Agency Opportunities */}
<div style={{ background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#10b981', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>🌟 Student Agency & Choices</h4>
<p style={{ fontSize: '0.75rem', lineHeight: '1.5', margin: 0 }}>
Discovery Lab is an open-ended inquiry experience, not a cookbook coding sequence. Students make original choices in:
</p>
<ul style={{ margin: '8px 0 0 0', paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<li><strong>Selecting a Problem:</strong> Deciding which community or school service problem the system solves.</li>
<li><strong>Defining target user:</strong> Tailoring bot vocabulary and response tones.</li>
<li><strong>Data formatting:</strong> Defining original keywords and structural list templates.</li>
<li><strong>Iterative adjustments:</strong> Formulating custom debugging tests and fixing original bugs.</li>
</ul>
</div>
</div>
)}
{/* SUB-TAB 3: STANDARDS & ASSESSMENT */}
{activeOverviewSubTab === 'assessment' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.2s' }}>
{/* Section 4: Standards Alignment (Collapsible) */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>📜 Standards Alignment</h4>
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
<details style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px' }}>
<summary style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
Computer Science Standards (CSTA / NGSS)
</summary>
<div style={{ padding: '8px 4px 0 4px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<div>
<strong>Standard:</strong> Develop programs with sequences, events, loops, and conditionals.
</div>
<div>
<strong>Student Evidence:</strong> Students build and test Scratch logic for chatbot responses.
</div>
<div>
<strong>Unit Connection:</strong> Part 2 and Part 4.
</div>
</div>
</details>
<details style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px' }}>
<summary style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
Science & Engineering Practices
</summary>
<div style={{ padding: '8px 4px 0 4px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<div>
<strong>Standard:</strong> Define a simple design problem reflecting a need or a want.
</div>
<div>
<strong>Student Evidence:</strong> Formulate chatbot problem statements for users.
</div>
<div>
<strong>Unit Connection:</strong> Unit Introduction.
</div>
</div>
</details>
</div>
</div>
{/* Section 10: What Will Students Create? */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>📦 What Will Students Create? (Evidence of Learning)</h4>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.75rem' }}>
<div>✓ AI Engineer Notebook responses</div>
<div>✓ Data Detective analysis sheet</div>
<div>✓ Real-World Problem statement</div>
<div>✓ Knowledge Base Design Canvas</div>
<div>✓ Active Scratch database lists</div>
<div>✓ Logical sequences and logic maps</div>
<div>✓ Break the Bot QA testing reports</div>
<div>✓ Final chatbot prototype & Reflection</div>
</div>
</div>
{/* Section 11: Assessment Across the Unit */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '12px' }}>📊 Assessment Overview</h4>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '0.75rem' }}>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
<strong style={{ color: '#fb7185', display: 'block', marginBottom: '4px' }}>Formative</strong>
<span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
Teacher questioning, student notebook entries, design checkpoints, code testing logs, Scratch block checks.
</span>
</div>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
<strong style={{ color: '#fb7185', display: 'block', marginBottom: '4px' }}>Performance</strong>
<span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
Cleaned database list layouts, working code pathways, QA spreadsheet bug traces.
</span>
</div>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
<strong style={{ color: '#fb7185', display: 'block', marginBottom: '4px' }}>Summative</strong>
<span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
Hack-a-thon presentation, student logic explanations, and engineering design loop reflections.
</span>
</div>
</div>
</div>
{/* Section 15: Teacher Look-Fors Across the Unit */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>🔍 Facilitator Look-Fors</h4>
<ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<li>Can students explain the real-world problem they are trying to solve?</li>
<li>Do students understand how data lists map to variables and outputs?</li>
<li>Can they trace their algorithm logic sequences step-by-step?</li>
<li>Do they test intentionally using failures as productive bug-hunting metrics?</li>
</ul>
</div>
</div>
)}
{/* SUB-TAB 4: PEDAGOGY & CONTEXT */}
{activeOverviewSubTab === 'pedagogy' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.2s' }}>
{/* Section 7: Real-World STEAM Connection */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '8px' }}>🌐 Real-World STEAM Connection</h4>
<p style={{ fontSize: '0.75rem', lineHeight: '1.5', margin: 0 }}>
{teacherUnit === 'botbuilder' ? (
"The chatbot students build serves as a simplified, hands-on model to help them grasp foundational AI and Computer Science concepts. This project directly maps to real-world software applications, such as customer support help desks, school information centers, online library catalog search databases, and automated service triage systems."
) : (
"The runoff dynamics students model simulate civil drainage systems, reservoir architectures, and municipal environmental safety grids. These models connect directly to real-world urban stormwater networks, permeable parking lot planning, and eco-sustainable flood prevention infrastructure."
)}
</p>
</div>
{/* Section 8: Career Connections */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '12px' }}>💼 STEAM Career Connections</h4>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
{[
{ title: 'AI Engineer', desc: 'Designs computer programs that can read user inputs and output intelligent matched responses.' },
{ title: 'Software Engineer', desc: 'Writes and organizes lines of code to build games, apps, and interactive programs.' },
{ title: 'Data Engineer', desc: 'Organizes, structures, and cleans data lists so databases search efficiently.' },
{ title: 'Data Scientist', desc: 'Audits information trends and finds patterns in massive collections of data.' },
{ title: 'UX Designer', desc: 'Designs how apps look and feel so they are easy and fun for humans to use.' },
{ title: 'QA / Software Tester', desc: 'Runs deliberate test cycles to find bugs and make software systems more stable.' }
].map(career => (
<div key={career.title} style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
<strong style={{ color: '#2dd4bf', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>{career.title}</strong>
<span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{career.desc}</span>
</div>
))}
</div>
</div>
{/* Section 9: Key Vocabulary (Collapsible Details) */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>📖 Key Vocabulary</h4>
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
{[
{ word: 'Artificial Intelligence', tDef: 'Systems that perform tasks typically requiring human intelligence.', sDef: 'Smart computer programs designed to find patterns in data.' },
{ word: 'Chatbot', tDef: 'A program that conducts conversation via auditory or textual methods.', sDef: 'A computer program you can chat with that matches your keywords to answers.' },
{ word: 'Data', tDef: 'Quantities, characters, or symbols on which operations are performed.', sDef: 'Information stored and used by a computer.' },
{ word: 'Algorithm', tDef: 'A process or set of rules to be followed in calculations or problem-solving.', sDef: 'A list of step-by-step instructions to complete a task.' },
{ word: 'Variable', tDef: 'A storage location paired with an associated symbolic name.', sDef: 'A memory box that remembers a single changing value (e.g. name or score).' },
{ word: 'Conditional', tDef: 'Features of a programming language which perform different actions based on state evaluation.', sDef: 'If/Then decisions that make the computer run different code based on what is true.' },
{ word: 'Debugging', tDef: 'The process of identifying and removing errors from computer hardware or software.', sDef: 'Finding and fixing errors (bugs) in code.' }
].map(vocab => (
<details key={vocab.word} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '6px' }}>
<summary style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>{vocab.word}</summary>
<div style={{ padding: '6px 4px 0 4px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
<div><strong style={{ color: '#2dd4bf' }}>Teacher Definition:</strong> {vocab.tDef}</div>
<div><strong style={{ color: '#fb7185' }}>Student Definition:</strong> {vocab.sDef}</div>
</div>
</details>
))}
</div>
</div>
{/* Section 16: Common Misconceptions */}
<div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
<h4 style={{ color: '#fff', fontSize: '0.9rem', marginTop: 0, marginBottom: '10px' }}>⚠️ Common Student Misconceptions</h4>
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
<div style={{ borderLeft: '3px solid #f87171', paddingLeft: '8px' }}>
<strong style={{ color: '#fff', display: 'block' }}>Misconception: AI knows everything and thinks like humans.</strong>
<span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
<em>Facilitation Tip:</em> Remind students that chatbots only look up match lists. Show them that entering a question not in the list returns an error or fallback.
</span>
</div>
<div style={{ borderLeft: '3px solid #f87171', paddingLeft: '8px' }}>
<strong style={{ color: '#fff', display: 'block' }}>Misconception: A program that runs once successfully is finished.</strong>
<span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
<em>Facilitation Tip:</em> Reframe coding as iterative. Challenge them to test alternative spelling variations and edge cases to find hidden bugs.
</span>
</div>
</div>
</div>
</div>
)}
</div>
)}{activeTeacherTab === 'pd' && (
<div style={{ animation: 'slideUp 0.2s', color: 'var(--text-secondary)' }}>
{selectedResource ? (
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'slideUp 0.15s', textAlign: 'left' }}>
<button onClick={() => setSelectedResource(null)} style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', outline: 'none' }}>
← Back to PD Resources
</button>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
<h3 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>{selectedResource.title}</h3>
<span style={{
padding: '3px 8px',
borderRadius: '12px',
fontSize: '0.65rem',
fontWeight: 'bold',
background: getCategoryStyles(selectedResource.category).bg,
color: getCategoryStyles(selectedResource.category).color,
border: getCategoryStyles(selectedResource.category).border
}}>{selectedResource.category}</span>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
<div>
<strong style={{ color: '#fff', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Why This Matters</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.5' }}>{selectedResource.whyThisMatters}</p>
</div>
<div>
<strong style={{ color: '#fff', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>What Teachers Need to Know</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.5' }}>{selectedResource.whatTeachersNeedToKnow}</p>
</div>
{selectedResource.whatToSay && (
<div style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--primary)', padding: '10px 12px', borderRadius: '4px' }}>
<strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>What to Say to the Class</strong>
<span style={{ fontSize: '0.75rem', fontStyle: 'italic', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>{selectedResource.whatToSay}</span>
</div>
)}
{selectedResource.quickStrategy && (
<div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.15)', padding: '10px 12px', borderRadius: '6px' }}>
<strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Quick Classroom Strategy</strong>
<span style={{ fontSize: '0.75rem', lineHeight: '1.5', color: '#a7f3d0' }}>{selectedResource.quickStrategy}</span>
</div>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
<div>
<strong style={{ color: 'var(--primary-light)', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>When to Use This</strong>
<span style={{ fontSize: '0.75rem', color: '#fff' }}>{selectedResource.whenToUseThis}</span>
</div>
{selectedResource.questions && selectedResource.questions.length > 0 && (
<div>
<strong style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Questions to Ask Students</strong>
<ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
{selectedResource.questions.map((q, idx) => <li key={idx} style={{ color: 'rgba(255,255,255,0.85)' }}>{q}</li>)}
</ul>
</div>
)}
{selectedResource.misconceptions && selectedResource.misconceptions.length > 0 && (
<div>
<strong style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Common Misconceptions</strong>
<ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', color: '#f87171', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
{selectedResource.misconceptions.map((m, idx) => <li key={idx}>{m}</li>)}
</ul>
</div>
)}
{selectedResource.lookFor && (
<div>
<strong style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Observable Evidence (Look For)</strong>
<span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>{selectedResource.lookFor}</span>
</div>
)}
</div>
</div>
</div>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'slideUp 0.15s', textAlign: 'left' }}>
<h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>Professional Development Resources</h3>
<p style={{ fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>
The resources in this section provide practical support for facilitating this Discovery Lab unit. Use them before or during instruction to strengthen content knowledge, instructional strategies, student agency, collaboration, and STEAM integration.
</p>
{/* Recommended for this Unit */}
<div>
<span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended for This Unit</span>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
{(pdResources[teacherUnit] || []).filter(r => 
teacherUnit === 'botbuilder' ? [
'understanding-ai', 'data-knowledge-bases', 'scratch-lists', 'agency-steam', 'fac-break-bot', 'responsible-ai'
].includes(r.id) : [
'eco-overview', 'runoff-dynamics', 'scratch-physics'
].includes(r.id)
).map(res => (
<div key={res.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
<div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
<span style={{
padding: '2px 6px',
borderRadius: '8px',
fontSize: '0.55rem',
fontWeight: 'bold',
background: getCategoryStyles(res.category).bg,
color: getCategoryStyles(res.category).color,
border: getCategoryStyles(res.category).border
}}>{res.category}</span>
</div>
<strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', lineHeight: '1.3', marginBottom: '4px' }}>{res.title}</strong>
<p style={{ fontSize: '0.65rem', margin: 0, lineHeight: '1.3', color: 'var(--text-muted)' }}>{res.description.substring(0, 70)}...</p>
</div>
<button onClick={() => setSelectedResource(res)} style={{ background: 'none', border: 'none', color: 'var(--primary-light)', padding: 0, fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'left', cursor: 'pointer', marginTop: '8px', outline: 'none' }}>
Read Guide ➜
</button>
</div>
))}
</div>
</div>
{/* All Resources Table */}
<div style={{ marginTop: '10px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
<span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>All Professional Development Resources</span>
<input 
type="text" 
placeholder="Search resources..." 
value={pdSearchQuery}
onChange={e => setPdSearchQuery(e.target.value)}
style={{
background: 'rgba(255,255,255,0.05)',
border: '1px solid rgba(255,255,255,0.1)',
borderRadius: '4px',
padding: '4px 8px',
fontSize: '0.7rem',
color: '#fff',
outline: 'none',
width: '180px'
}}
/>
</div>
<div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
<thead>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
<th style={{ padding: '8px 12px', textAlign: 'left', color: '#fff', fontWeight: 'bold', width: '220px' }}>Resource Title</th>
<th style={{ padding: '8px 12px', textAlign: 'left', color: '#fff', fontWeight: 'bold' }}>Description</th>
<th style={{ padding: '8px 12px', textAlign: 'right', color: '#fff', fontWeight: 'bold', width: '80px' }}>Action</th>
</tr>
</thead>
<tbody>
{(pdResources[teacherUnit] || []).filter(res => 
res.title.toLowerCase().includes(pdSearchQuery.toLowerCase()) ||
res.category.toLowerCase().includes(pdSearchQuery.toLowerCase())
).map(res => (
<tr key={res.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
<td style={{ padding: '8px 12px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
<strong style={{ color: '#fff', fontSize: '0.75rem' }}>{res.title}</strong>
<span style={{
padding: '1px 5px',
borderRadius: '6px',
fontSize: '0.55rem',
fontWeight: 'bold',
background: getCategoryStyles(res.category).bg,
color: getCategoryStyles(res.category).color,
border: getCategoryStyles(res.category).border
}}>{res.category}</span>
</div>
</td>
<td style={{ padding: '8px 12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{res.description}</td>
<td style={{ padding: '8px 12px', textAlign: 'right' }}>
<button onClick={() => setSelectedResource(res)} style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.65rem', outline: 'none' }}>
View ➜
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
)}
</div>
)}{activeTeacherTab === 'printing' && (
<div style={{ animation: 'slideUp 0.2s', color: 'var(--text-secondary)' }}>
<h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>Student Resource Printing & Preparation</h3>
<p style={{ fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '16px', textAlign: 'left' }}>
Use this page to preview, print, and prepare all student-facing materials for the active Discovery Lab unit. Resources are organized by lesson section so facilitators can quickly identify what students will need before instruction begins.
</p>
{/* Lesson Filters and Batch Actions */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
<div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
{[
{ id: 'all', label: 'Entire Unit' },
{ id: 'intro', label: 'Unit Intro' },
{ id: 'part1', label: teacherUnit === 'botbuilder' ? 'Part 1' : 'Part 1' },
{ id: 'part2', label: teacherUnit === 'botbuilder' ? 'Part 2' : 'Part 2' },
{ id: 'part3', label: teacherUnit === 'botbuilder' ? 'Part 3' : 'Part 3' },
{ id: 'part4', label: teacherUnit === 'botbuilder' ? 'Part 4' : 'Part 4' },
{ id: 'share', label: 'Unit Share' }
].map(f => (
<button
key={f.id}
onClick={() => setPrintFilter(f.id)}
style={{
background: printFilter === f.id ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
border: '1px solid rgba(255,255,255,0.08)',
color: '#fff',
padding: '4px 10px',
borderRadius: '4px',
fontSize: '0.7rem',
cursor: 'pointer',
outline: 'none',
fontWeight: printFilter === f.id ? 'bold' : 'normal'
}}
>
{f.label}
</button>
))}
</div>
<button
onClick={() => {
const filteredRes = (printingResources[teacherUnit] || []).filter(r => printFilter === 'all' || r.part === printFilter);
alert('Simulating printing ' + filteredRes.length + ' documents for the active lesson filter. Check your browser printer queue!');
}}
style={{
background: 'var(--secondary)',
border: 'none',
color: '#fff',
padding: '6px 12px',
borderRadius: '4px',
fontSize: '0.7rem',
fontWeight: 'bold',
cursor: 'pointer',
outline: 'none',
display: 'flex',
alignItems: 'center',
gap: '6px'
}}
>
Print Everything for This Lesson 🖨️
</button>
</div>
{/* Before the Lesson Checklist */}
<div style={{ background: 'rgba(245°°, 158, 11, 0.03)', border: '1px solid rgba(245°°, 158, 11, 0.15)', borderRadius: '8px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
<span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>📋 Before the Lesson Checklist</span>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
{[
...(prepChecklist[teacherUnit]?.all || []),
...(printFilter !== 'all' ? (prepChecklist[teacherUnit]?.[printFilter] || []) : [])
].map((item, idx) => {
const itemKey = teacherUnit + '_' + printFilter + '_' + idx;
const isChecked = !!checkedPrepItems[itemKey];
return (
<label key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.75rem', color: isChecked ? 'var(--text-muted)' : '#fff', textDecoration: isChecked ? 'line-through' : 'none', cursor: 'pointer' }}>
<input
type="checkbox"
checked={isChecked}
onChange={() => setCheckedPrepItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }))}
style={{ accentColor: '#fbbf24', marginTop: '2px' }}
/>
<span>{item}</span>
</label>
);
})}
</div>
</div>
{/* Resources grouped by Category */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
{['Student Lab Notebooks', 'Student Learning Resources', 'Programming Support Cards', 'Team Role Cards', 'Assessment Resources'].map(cat => {
const catResources = (printingResources[teacherUnit] || []).filter(r => r.category === cat && (printFilter === 'all' || r.part === printFilter));
if (catResources.length === 0) return null;
return (
<div key={cat} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '14px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
<span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold' }}>{cat}</span>
{cat === 'Team Role Cards' && (
<button onClick={() => triggerPrintResource({ id: 'bb-role-cards-badge', title: 'Team Role Badges' })} style={{ background: 'rgba(59, 130, 246, 0.2)', border: 'none', color: '#60a5fa', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
Print Team Role Cards 🎴
</button>
)}
{cat === 'Student Lab Notebooks' && (
<button onClick={() => triggerPrintResource({ id: 'bb-all-notebooks', title: 'Combined Student Notebook Booklet' })} style={{ background: 'rgba(16, 185, 129, 0.2)', border: 'none', color: '#34d399', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
Print All Student Notebooks 📚
</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
{catResources.map(res => (
<div key={res.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
<strong style={{ color: '#fff', fontSize: '0.75rem' }}>{res.title}</strong>
<div style={{ display: 'flex', gap: '4px' }}>
<span style={{ fontSize: '0.55rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{res.ratio}</span>
<span style={{ fontSize: '0.55rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{res.pages} pages</span>
</div>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
<span style={{
fontSize: '0.6rem',
padding: '2px 6px',
borderRadius: '8px',
fontWeight: 'bold',
background: res.mode.includes('Printable Recommended') ? 'rgba(245°°, 158, 11, 0.1)' : res.mode.includes('Digital Only') ? 'rgba(255,255,255,0.05)' : res.mode.includes('Optional Print') ? 'rgba(59, 130, 246, 0.1)' : 'rgba(20, 184, 166, 0.1)',
color: res.mode.includes('Printable Recommended') ? '#fbbf24' : res.mode.includes('Digital Only') ? 'var(--text-muted)' : res.mode.includes('Optional Print') ? '#60a5fa' : '#2dd4bf',
border: '1px solid ' + (res.mode.includes('Printable Recommended') ? 'rgba(245°°, 158, 11, 0.2)' : res.mode.includes('Digital Only') ? 'rgba(255,255,255,0.1)' : res.mode.includes('Optional Print') ? 'rgba(59, 130, 246, 0.2)' : 'rgba(20, 184, 166, 0.2)')
}}>{res.mode}</span>
<button onClick={() => setPreviewResource(res)} style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.65rem', outline: 'none' }}>
Preview ➜
</button>
</div>
</div>
))}
</div>
</div>
);
})}
</div>
{/* Resource Preview Panel Modal */}
{previewResource && (
<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
<div style={{ background: '#251e2c', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px', width: '480px', maxWidth: '90%', animation: 'scaleUp 0.15s', textAlign: 'left' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '14px' }}>
<div>
<span style={{ fontSize: '0.6rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase' }}>Document Preview</span>
<h4 style={{ color: '#fff', margin: '2px 0 0 0', fontSize: '1.1rem' }}>{previewResource.title}</h4>
</div>
<button onClick={() => setPreviewResource(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', outline: 'none', padding: 0 }}>&times;</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.75rem', marginBottom: '20px' }}>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Lesson Connection</strong>
<span style={{ textTransform: 'capitalize' }}>{previewResource.part.replace('part', 'Part ')}</span>
</div>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Student Directions</strong>
<p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>{previewResource.directions}</p>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Pages Count</strong>
<span>{previewResource.pages} page(s)</span>
</div>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Recommended Quantity</strong>
<span>{previewResource.ratio}</span>
</div>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Digital Availability</strong>
<span>{previewResource.mode}</span>
</div>
</div>
</div>
<div style={{ display: 'flex', justifySelf: 'flex-end', gap: '8px' }}>
<button onClick={() => setPreviewResource(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', outline: 'none' }}>Close</button>
<button onClick={() => { triggerPrintResource(previewResource); setPreviewResource(null); }} style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', outline: 'none' }}>Print Document 🖨️</button>
</div>
</div>
</div>
)}
</div>
)}{activeTeacherTab === 'intro' && (
<div style={{ animation: 'slideUp 0.2s' }}>
<h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>
{teacherUnit === 'botbuilder' ? 'Unit Introduction: The Chatbot Challenge' : 'Unit Introduction: EcoEngineering Launch'}
</h3>
{teacherUnit === 'botbuilder' ? (
<div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
{/* Overview Header */}
<div style={{ background: 'linear-gradient(135°°deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
<span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unit Launch</span>
<h4 style={{ color: '#fff', margin: '4px 0 8px 0', fontSize: '1.1rem' }}>The Chatbot Challenge Overview</h4>
<p style={{ lineHeight: '1.6', margin: 0 }}>
Introduce students to the core unit story and the final Hack-a-thon performance task. Elicit prior knowledge using a collaborative KWL chart, establish a pair-programming classroom manifesto, and run introductory Scratch orientation tutorials.
</p>
</div>
{/* Lesson Agenda */}
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.95rem' }}>Introduction Hour Timeline</strong>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)' }}>
<thead>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
<th style={{ padding: '6px 8px', textAlign: 'left', color: '#fff' }}>Activity Block</th>
<th style={{ padding: '6px 8px', textAlign: 'right', color: '#fff' }}>Time</th>
</tr>
</thead>
<tbody>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '6px 8px' }}>1. Unit Story: The School Menu Distraction</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>10 minutes</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '6px 8px' }}>2. Hack-a-Thon Performance Challenge Reveal</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>10 minutes</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '6px 8px' }}>3. Class KWL (Know, Want-to-Know, Learned) Charting</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>10 minutes</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '6px 8px' }}>4. Pair Programming Rules & Scratch Setup</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>25 minutes</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}><td style={{ padding: '6px 8px' }}>5. Closing: Reflection on Team Coding</td><td style={{ padding: '6px 8px', textAlign: 'right' }}>5 minutes</td></tr>
<tr style={{ fontWeight: 'bold' }}><td style={{ padding: '6px 8px', color: '#fff' }}>Total Time</td><td style={{ padding: '6px 8px', textAlign: 'right', color: '#fff' }}>1 hour</td></tr>
</tbody>
</table>
</div>
{/* Active Vocabulary */}
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '10px', fontSize: '0.95rem' }}>Core Terminology</strong>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
<div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: 'var(--primary-light)', display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Artificial Intelligence (AI)</strong>
<span style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Technology that uses structured data to learn, recognize patterns, and make human-like decisions.</span>
</div>
<div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: 'var(--primary-light)', display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Chatbot</strong>
<span style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>A computer program designed to simulate human conversations using matching keywords.</span>
</div>
<div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: 'var(--primary-light)', display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Pair Programming</strong>
<span style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>A collaborative coding practice where two developers work at one computer, sharing design roles.</span>
</div>
</div>
</div>
{/* Facilitation Steps */}
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '12px', fontSize: '0.95rem' }}>Unit Launch Steps</strong>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
{/* Step 1 */}
<div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '16px', background: 'rgba(239, 68, 68, 0.02)', padding: '12px', borderRadius: '6px' }}>
<strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>1. The School Menu Dilemma (10 min)</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
Elicit student attention with the unit story. Introduce the scenario where the secretary is flooded with phone calls because the school lunch website is down.
</p>
<div style={{ margin: '8px 0 0 0', padding: '10px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '4px', fontSize: '0.75rem', borderLeft: '2px solid #ef4444' }}>
<strong>📕 Book Talk Discussion Prompt:</strong>
<ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
<li>• What was the primary disruption in the office story? (Answer: Constant student inquiries).</li>
<li>• How did the characters decide to solve it? (Answer: Designing a conversational menu chatbot).</li>
</ul>
</div>
</div>
{/* Step 2 */}
<div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '16px', background: 'rgba(245°°, 158, 11, 0.02)', padding: '12px', borderRadius: '6px' }}>
<strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>2. Hack-a-Thon Performance Reveal (10 min)</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
Reveal the final performance task: students will work in pairs to design an AI Chatbot that answers questions for a real-world problem (e.g. event schedules, campus navigation, library resources). Explain that at the end of the unit, they will participate in a team Hack-a-thon, competing to build solutions for new user cases.
</p>
</div>
{/* Step 3 */}
<div style={{ borderLeft: '3px solid #10b981', paddingLeft: '16px', background: 'rgba(16, 185, 129, 0.02)', padding: '12px', borderRadius: '6px' }}>
<strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>3. Class KWL & Background Check (10 min)</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
Draw a large KWL table on chart paper. Ask students to share what they know (K) and want to know (W) about AI and chatbot interactions.
</p>
<div style={{ margin: '8px 0 0 0', padding: '10px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '4px', fontSize: '0.75rem', borderLeft: '2px solid #10b981' }}>
<strong>❓ Driving Inquiry Questions:</strong>
<ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
<li>• What applications or devices run AI models in your daily life? (e.g. Siri, Alexa, ChatGPT).</li>
<li>• How do you think programmers store answers to prevent system errors?</li>
</ul>
</div>
</div>
{/* Step 4 */}
<div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '16px', background: 'rgba(59, 130, 246, 0.02)', padding: '12px', borderRadius: '6px' }}>
<strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>4. The Programmer Manifesto & Roles (25 min)</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
Introduce pair programming concepts: <strong>Driver</strong> (writes code) and <strong>Navigator</strong> (reviews code). Have students brainstorm and sign a "Class Manifesto" of commitments:
</p>
<ul style={{ margin: '6px 0', paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
<li>✓ I will be open to ideas from my programming partner.</li>
<li>✓ I will give specific, kind, and constructive review feedback.</li>
<li>✓ I will rotate turns as the driver and navigator.</li>
</ul>
<div style={{ margin: '6px 0 0 0', padding: '10px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '4px', fontSize: '0.75rem', borderLeft: '2px solid #3b82f6' }}>
<strong>👥 Role Dilemma Solvers:</strong> When assigning roles, have students use decision-making tricks (asking preferences, rock-paper-scissors, or closest birthday) to select the first driver.
</div>
</div>
{/* Step 5 */}
<div style={{ borderLeft: '3px solid #8b5cf6', paddingLeft: '16px', background: 'rgba(139, 92, 246, 0.02)', padding: '12px', borderRadius: '6px' }}>
<strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>5. Closing & Scratch Launch (5 min)</strong>
<p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
Log into Scratch. Guide students through basic interface tutorials: adding a sprite, choosing a backdrop, and resizing components. Ask: "What was it like to write code together? Did anything surprise you?"
</p>
</div>
</div>
</div>
</div>
) : (
<div>
<h4 style={{ color: '#a78bfa', fontSize: '0.9rem', margin: '14px 0 6px 0', textAlign: 'left' }}>Unit Introduction: EcoEngineering</h4>
<p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', textAlign: 'left' }}>
Introduce the storm runoff water crisis. Explain how high rainfall floods park surfaces and carries toxic elements into local ponds.
</p>
</div>
)}
</div>
)}
{activeTeacherTab === 'part1' && (
<div style={{ animation: 'slideUp 0.2s' }}>
<h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>
{teacherUnit === 'botbuilder' ? 'Part 1: Data, Data, Data (AI BotBuilder)' : 'Part 1: Irrigation & Soil Codes'}
</h3>
{teacherUnit === 'botbuilder' ? (
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
{/* Sub-Tab Navigation */}
<div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
{[
{ id: 'overview', label: '📋 Mission & Careers' },
{ id: 'hour1', label: '💭 Hour 1: Think' },
{ id: 'hour2', label: '💻 Hour 2: Build & Test' }
].map(subTab => (
<button
key={subTab.id}
onClick={() => setActivePart1SubTab(subTab.id)}
style={{
flex: 1,
padding: '8px 12px',
fontSize: '0.75rem',
borderRadius: '6px',
border: 'none',
cursor: 'pointer',
background: activePart1SubTab === subTab.id ? 'var(--primary)' : 'transparent',
color: activePart1SubTab === subTab.id ? '#fff' : 'var(--text-secondary)',
transition: 'all 0.2s',
fontWeight: activePart1SubTab === subTab.id ? 'bold' : 'normal'
}}
>
{subTab.label}
</button>
))}
</div>
{/* SUBTAB CONTENT: OVERVIEW */}
{activePart1SubTab === 'overview' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
{/* AI Engineer Mission hook */}
<div style={{ background: 'linear-gradient(135°°deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '16px', borderRadius: '8px' }}>
<span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Engineer Mission Hook</span>
<h4 style={{ color: '#fff', margin: '4px 0 8px 0', fontSize: '1.05rem' }}>Challenge: Designing a School Helper</h4>
<p style={{ lineHeight: '1.5', margin: 0, fontSize: '0.8rem' }}>
Introduce the lesson with this scenario: 
<em style={{ display: 'block', margin: '8px 0', color: '#fff', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>
"Our school needs a chatbot that can help students find information quickly. Your engineering team has been hired to design it. Before you can program the chatbot, you must determine what information it needs, how that information should be organized, and what could happen if the data is incomplete or incorrect."
</em>
Frame students as active <strong>AI engineers and problem solvers</strong>, rather than just completing a coding exercise.
</p>
</div>
{/* Student Engineering Roles */}
<div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Student Collaborative Engineering Roles</strong>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: '#60a5fa', fontSize: '0.75rem', display: 'block' }}>🤖 AI Engineer</strong>
<span style={{ fontSize: '0.7rem' }}>Focuses on the high-level architecture: how the system logic flows and maps inputs to outputs.</span>
</div>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block' }}>📊 Data Engineer</strong>
<span style={{ fontSize: '0.7rem' }}>Organizes the chatbot knowledge base, cleaning raw input and formatting databases.</span>
</div>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: '#f59e0b', fontSize: '0.75rem', display: 'block' }}>💻 Scratch Developer</strong>
<span style={{ fontSize: '0.7rem' }}>Translates concepts into Scratch, creating and manipulating data list variables.</span>
</div>
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
<strong style={{ color: '#a78bfa', fontSize: '0.75rem', display: 'block' }}>🕵️ AI Tester</strong>
<span style={{ fontSize: '0.7rem' }}>Runs stress tests, tries to break the logic, and tracks failures to report back.</span>
</div>
</div>
<span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
💡 <em>Facilitator Tip:</em> Have students switch roles periodically so they experience multiple engineering practices.
</span>
</div>
{/* STEAM Career Spotlight */}
<div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px' }}>
<strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '0.8rem' }}>💼 STEAM Career Spotlight</strong>
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
{['AI Engineer', 'Data Scientist', 'Software Engineer', 'UX Designer', 'Data Engineer'].map(career => (
<span key={career} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '12px' }}>
{career}
</span>
))}
</div>
<p style={{ fontSize: '0.75rem', margin: '8px 0 0 0', lineHeight: '1.4' }}>
Highlight that real-world technology teams combine these diverse disciplines to build, audit, and improve intelligent services.
</p>
</div>
</div>
)}
{/* SUBTAB CONTENT: HOUR 1 (THINK) */}
{activePart1SubTab === 'hour1' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
{/* Human vs AI Inquiry */}
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
<span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 1: Human vs. AI Inquiry</span>
<p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
Present students with multiple ways of asking the same query:
</p>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', color: '#fff', marginBottom: '10px' }}>
<div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>• "What is for lunch today?"</div>
<div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>• "What are we eating today?"</div>
<div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>• "What's on the lunch menu?"</div>
<div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>• "What food are they serving?"</div>
</div>
<strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Inquiry Prompt:</strong>
<p style={{ fontStyle: 'italic', margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>
"How does a human know these questions are asking for similar information? How could a computer recognize this? Let's discuss patterns, keywords, context, and meaning."
</p>
</div>
{/* Data Detective Challenge */}
<div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
<span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 2: Data Detective Mini-Challenge</span>
<p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
Show teams a messy dataset containing duplicates, typos, empty records, and outdated menu entries:
</p>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem', background: 'rgba(0,0,0,0.2)', marginBottom: '10px' }}>
<thead>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
<th style={{ padding: '4px', textAlign: 'left', color: '#fff' }}>Day</th>
<th style={{ padding: '4px', textAlign: 'left', color: '#fff' }}>Entree Option</th>
<th style={{ padding: '4px', textAlign: 'right', color: '#fff' }}>Price</th>
</tr>
</thead>
<tbody>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>Monday</td><td>Cheese Pizza</td><td style={{ textAlign: 'right' }}>$3.00</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>Monday</td><td>Cheese Pizza (Duplicate)</td><td style={{ textAlign: 'right' }}>$3.00</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>Tuesday</td><td>Checken Nugets (Typo)</td><td style={{ textAlign: 'right' }}>-- (Missing)</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>Wednesday</td><td>Salad (Inconsistent)</td><td style={{ textAlign: 'right' }}>$2.50</td></tr>
<tr><td>Thursday</td><td>Spaghetti (Outdated 2021)</td><td style={{ textAlign: 'right' }}>$1.50</td></tr>
</tbody>
</table>
<strong style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Data Cleansing Prompts:</strong>
<ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
<li>What information is missing or duplicate?</li>
<li>What typos might confuse the chatbot lookup logic?</li>
<li>How can we organize it cleanly? (Concept: <em>Better data leads to better system responses</em>).</li>
</ul>
</div>
{/* Problem Brainstorm & Canvas */}
<div style={{ background: 'rgba(16, 185, 129, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
<span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 3: Problem Selection & Design Canvas</span>
<p style={{ margin: '6px 0 8px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
Scaffold brainstorming using the <strong>Problem ➔ User ➔ Data ➔ Solution</strong> design framework:
</p>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.7rem', background: 'rgba(255,255,255,0.01)', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
<div><strong>Problem:</strong> What issue are we trying to solve?</div>
<div><strong>User:</strong> Who is our targeted chatbot user?</div>
<div><strong>Questions:</strong> What will they ask?</div>
<div><strong>Data:</strong> What list information must we feed it?</div>
</div>
<strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '0.75rem' }}>Knowledge Base Design Canvas</strong>
<div style={{ background: 'rgba(0,0,0,0.15)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', lineHeight: '1.5' }}>
<div>1. Our chatbot helps: [__________]</div>
<div>2. The problem it solves is: [__________]</div>
<div>3. Our users might ask: [__________]</div>
<div>4. Important keywords include: [__________]</div>
<div>5. The database lists we need are: [__________]</div>
<div>6. One situation our bot may not understand: [__________]</div>
</div>
<span style={{ fontSize: '0.7rem', color: '#34d399', display: 'block', marginTop: '6px' }}>
⚠️ <em>Facilitator Action:</em> Sign off on each team's physical design canvas before letting them open Scratch.
</span>
</div>
</div>
)}
{/* SUBTAB CONTENT: HOUR 2 (BUILD & TEST) */}
{activePart1SubTab === 'hour2' && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
{/* Scratch connection */}
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
<span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 4: Build Scratch Knowledge Base</span>
<p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
Students program their design canvas categories into Scratch variables and lists. Explicitly connect the data flow to the architecture:
<strong style={{ display: 'block', margin: '6px 0', color: '#fff', fontSize: '0.75rem', textAlign: 'center' }}>
User Question ➔ Identify Keywords ➔ Search List Records ➔ Generate Response
</strong>
Students must explain what each list stores and why the algorithm queries it.
</p>
</div>
{/* Break the Bot challenge */}
<div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
<span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 5: "Break the Bot" Testing Challenge</span>
<p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
Pairs trade laptops. The testing team intentionally runs stress tests to audit the code.
</p>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem', background: 'rgba(0,0,0,0.2)', marginBottom: '8px' }}>
<thead>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
<th style={{ padding: '4px', textAlign: 'left', color: '#fff' }}>Test Type</th>
<th style={{ padding: '4px', textAlign: 'left', color: '#fff' }}>Example</th>
</tr>
</thead>
<tbody>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>1. Expected Question</td><td>Direct match from data map.</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>2. Phrasing Variation</td><td>Using different words for same query.</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>3. Typo/Spelling Shift</td><td>Typing "piza" or "chiken".</td></tr>
<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>4. Empty/Missing Entry</td><td>Pressing enter without typing.</td></tr>
<tr><td>5. Unexpected Input</td><td>Asking an unrelated question.</td></tr>
</tbody>
</table>
<div style={{ background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
<div>📊 Test Log: What we asked | What bot did | What was expected | Engineering notes.</div>
</div>
</div>
{/* Responsible AI */}
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
<span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 6: Responsible AI Discussion</span>
<p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
<strong>"Can an AI system give a wrong answer?"</strong> Explain that computers don't "think" incorrectly—they parse bad data. Discuss: Who is responsible for validating the database records? Why must engineering systems be tested?
</p>
</div>
{/* Exit Ticket */}
<div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
<span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>📝 AI Engineer Exit Ticket</span>
<ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
<li>1. What problem does your chatbot solve, and who is the user?</li>
<li>2. Why does organizing data into clear lists matter?</li>
<li>3. What happened when another group tried to "Break the Bot"?</li>
<li>4. What is one improvement or career skill you learned today?</li>
</ul>
</div>
{/* Level Up extension */}
<div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '12px', borderRadius: '8px' }}>
<strong style={{ color: '#a78bfa', display: 'block', fontSize: '0.75rem' }}>🚀 Level-Up Challenge (Extension)</strong>
<ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
<li>• Program responses to capture and handle unknown questions gracefully.</li>
<li>• Map multiple keyword triggers to the search loops.</li>
<li>• Formally document the limitations of your current chatbot version.</li>
</ul>
</div>
</div>
)}
</div>
) : (
<div>
<h4 style={{ color: '#a78bfa', fontSize: '0.9rem', margin: '14px 0 6px 0', textAlign: 'left' }}>Challenge Solution Cheatsheet</h4>
<p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', textAlign: 'left' }}>
Middle School Challenge 1 (IoT Irrigation): Set soil moisture threshold slider to 50% and pump duration to 4 seconds to balance plant root health.
</p>
</div>
)}
</div>
)}{activeTeacherTab === 'part2' && (
  <div style={{ animation: 'slideUp 0.2s' }}>
    <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>
      {teacherUnit === 'botbuilder' ? 'Part 2: All About Algorithms (AI BotBuilder)' : 'Part 2: Vector Wind Power'}
    </h3>
    {teacherUnit === 'botbuilder' ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
        {/* Sub-Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { id: 'overview', label: '📋 Mission & Careers' },
            { id: 'hour1', label: '💭 Hour 1: Think' },
            { id: 'hour2', label: '💻 Hour 2: Build & Test' }
          ].map(subTab => (
            <button
              key={subTab.id}
              onClick={() => setActivePart2SubTab(subTab.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activePart2SubTab === subTab.id ? 'var(--primary)' : 'transparent',
                color: activePart2SubTab === subTab.id ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s',
                fontWeight: activePart2SubTab === subTab.id ? 'bold' : 'normal'
              }}
            >
              {subTab.label}
            </button>
          ))}
        </div>

        {/* SUBTAB CONTENT: OVERVIEW */}
        {activePart2SubTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            {/* AI Engineer Mission Hook */}
            <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Engineer Mission Hook</span>
              <h4 style={{ color: '#fff', margin: '4px 0 8px 0', fontSize: '1.05rem' }}>Challenge: Program the Emergency Delivery Robot</h4>
              <p style={{ lineHeight: '1.5', margin: 0, fontSize: '0.8rem' }}>
                Introduce the scenario:
                <em style={{ display: 'block', margin: '8px 0', color: '#fff', borderLeft: '3px solid var(--primary)', paddingLeft: '10px', fontStyle: 'normal' }}>
                  "The nurse's office needs to send an important package to Room 205. The school's delivery robot can carry it—but there is one problem. The robot cannot decide what to do on its own. Your engineering team must design the algorithm that safely gets the robot to its destination."
                </em>
                Set the foundational concept: <strong>"A robot does exactly what you tell it to do—not what you meant for it to do."</strong> An <strong>algorithm</strong> is a clear, ordered set of instructions used to complete a task or solve a problem.
              </p>
            </div>

            {/* Student Collaborative Engineering Roles */}
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Student Collaborative Engineering Roles</strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#60a5fa', fontSize: '0.75rem', display: 'block' }}>🤖 Algorithm Engineer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Designs the movement sequences, decision nodes, and recovery logics for the system.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block' }}>🗺️ Navigation Engineer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Studies the school floor map layout, analyzing corridors, intersections, and charging routes.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#a78bfa', fontSize: '0.75rem', display: 'block' }}>🕵️ Systems Tester</strong>
                  <span style={{ fontSize: '0.7rem' }}>Audits the design, searching for blocking variables, battery drain limits, and closed door failures.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#f59e0b', fontSize: '0.75rem', display: 'block' }}>💻 Scratch Developer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Translates the finalized, audited algorithm flowchart plan into executable Scratch scripts.</span>
                </div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                💡 <em>Facilitator Tip:</em> Have students switch roles periodically so they experience multiple engineering practices.
              </span>
            </div>

            {/* STEAM Career Spotlight */}
            <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px' }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '0.8rem' }}>💼 STEAM Career Spotlight</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Robotics Engineer', 'Autonomous Systems Engineer', 'Software Engineer', 'Algorithm Engineer', 'Logistics Engineer'].map(career => (
                  <span key={career} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '12px' }}>
                    {career}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', margin: '8px 0 0 0', lineHeight: '1.4' }}>
                Similar systems are used in warehouse robots, hospital delivery robots, autonomous vehicles, drones, package delivery systems, and Mars rovers.
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: HOUR 1 (THINK) */}
        {activePart2SubTab === 'hour1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            
            {/* Activity 1: Be the Robot */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 1: Be the Robot (Map Challenge)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams write exact instructions to guide the robot from the Nurse's Office to Room 205. One student physically acts as the robot or moves a token on the navigation map, following directions literally.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', color: '#fff', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace' }}>
                • Move forward 3 spaces ➔ Turn right ➔ Move forward 4 spaces ➔ Turn left ➔ Stop at Room 205.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> School Robot Navigation Map, Algorithm Planning Sheet</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "What did you assume the robot already knew? Which instruction was unclear? Does the order of steps matter?"</div>
                <div>🔍 <strong>Look-fors:</strong> Students writing precise directions (like step counts) rather than vague commands like "Go to Room 205".</div>
                <div>⚠️ <strong>Misconceptions:</strong> Thinking that the robot can guess intent. Emphasize literal execution.</div>
                <div>⚡ <strong>Differentiation & Extension:</strong> Advanced teams can use exact rotation angles (e.g. 90° or 45°) and distance rules.</div>
              </div>
            </div>

            {/* Activity 2: Sequence Matters */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 2: Sequence Matters (Algorithm Scramble)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Provide a short navigation algorithm with steps in the wrong order. Students identify the routing failure, reorder the steps into the correct sequence, and explain why order determines output.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Shuffled Algorithm Scramble Cards</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Can an algorithm contain correct instructions but still fail? Why is sequence critical?"</div>
                <div>🔍 <strong>Look-fors:</strong> Teams tracing the scrambled path physically to demonstrate the failure point.</div>
              </div>
            </div>

            {/* Activity 3: Hallway Blocked */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 3: Unexpected Problem (Hallway Blocked)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Provide a new event card: 🚧 <strong>NEW INFORMATION: The main hallway is blocked.</strong> Ask: "Does your original algorithm still work?" Students revise the route using the side hallway path.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Hallway Blocked Event Card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Where does your algorithm fail now? What needs to change? Do you need to rewrite everything?"</div>
                <div>🔍 <strong>Look-fors:</strong> Students identifying the point of failure and modifying only the affected sequence segment.</div>
              </div>
            </div>

            {/* Activity 4: IF/ELSE Decisions */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 4: Decision Point (Introducing IF/ELSE)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Challenge: "Sometimes the hallway is open. Sometimes it is blocked. You will not know ahead of time." Students design **one single algorithm** that works in both situations. Formally introduce <strong>IF/ELSE logic</strong>.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', color: '#fff', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace' }}>
                IF (hallway is open) ➔ continue straight<br/>
                ELSE ➔ take the side hallway
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Algorithm Planning Sheet</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "How does a system choose actions based on conditions? What checks does it run?"</div>
              </div>
            </div>

            {/* Activity 5: Flowcharting */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 5: Convert to Flowchart Symbols</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Introduce flowchart symbols: <strong>Oval (Start/End)</strong>, <strong>Rectangle (Action)</strong>, <strong>Diamond (Decision)</strong>, and <strong>Arrow (Direction)</strong>. Students convert their route algorithm into a visual flowchart.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ textAlign: 'center' }}>🟢 Start / End (Oval)</div>
                <div style={{ textAlign: 'center' }}>🟦 Action (Rectangle)</div>
                <div style={{ textAlign: 'center' }}>🔶 Decision (Diamond)</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Flowchart Reference, Flowchart Design Canvas</div>
                <div>🔍 <strong>Look-fors:</strong> Correct branching arrows (YES/NO paths) stemming from decision diamonds.</div>
              </div>
            </div>

            {/* Activity 6: Low Battery */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 6: New Constraint (Low Battery Check)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Event Card: 🔋 <strong>NEW CONSTRAINT: If the battery drops below 20%, the robot must visit the charging station first.</strong> Students determine where to place this check and revise their flowcharts.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Low Battery Constraint Card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Where should the robot check its battery? Once or multiple times? What happens after charging?"</div>
                <div>🔍 <strong>Look-fors:</strong> Decision diamonds checking battery levels and routing to charging station coordinates on the map.</div>
              </div>
            </div>

            {/* Activity 7: Closed Door */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 7: Exception Handling (Locked Destination)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Constraint Card: 🚪 <strong>Room 205's door may be closed when the robot arrives.</strong> Students design an exception handling step: wait, retry, return, or alert. Teams justify their design decision.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Door Closed Constraint Card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "What makes today's door exception similar to programming an error fallback in search code?"</div>
              </div>
            </div>

            {/* Activity 8: Efficiency Challenge */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 8: Efficiency Challenge</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Challenge: "Deliver the package safely using the fewest steps while still handling the battery and blocked hallway." Teams count movements, decisions, and repeated steps to justify their algorithm's efficiency.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Floor Map</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Is the shortest route always the best? What if it is less reliable?"</div>
              </div>
            </div>

            {/* Hour 1 Checkpoint */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hour 1 Checkpoint Requirements</span>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li>✅ Clear route and sequential algorithm.</li>
                <li>✅ Visual flowchart with start/end ovals, rectangles, and decision diamonds.</li>
                <li>✅ IF/ELSE logic for blocked hallway, low battery, and closed door.</li>
                <li>✅ Total movement/decision counts showing path efficiency.</li>
              </ul>
              <span style={{ fontSize: '0.7rem', color: '#34d399', display: 'block', marginTop: '8px' }}>
                ⚠️ <em>Facilitator Action:</em> Review and sign off on each team's physical flowchart canvas before they start coding.
              </span>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: HOUR 2 (BUILD & TEST) */}
        {activePart2SubTab === 'hour2' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            
            {/* Activity 9: Build Simulation */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 9: Build the Robot Simulation in Scratch</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students translate their flowchart blueprints into Scratch. Backdrops represent the school floor grids, and a robot sprite acts as the receiver. Connect flowchart structures to coding constructs:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>• Flowchart sequence ➔ ordered Scratch blocks</div>
                <div>• Decisions ➔ IF / ELSE blocks</div>
                <div>• Conditions ➔ Sensors / color-touch blocks</div>
                <div>• Repeats ➔ Repeat loops</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Computers with Scratch, Flowchart Design Canvas</div>
                <div>🔍 <strong>Look-fors:</strong> Students tracing their flowchart shapes to make coding decisions.</div>
                <div>⚠️ <strong>Misconceptions:</strong> Creating movements without checking bounds. Keep loops inside conditional boundary sensors.</div>
              </div>
            </div>

            {/* Activity 10: Trace Before You Run */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 10: Trace Before You Run</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students write down their predictions on their planning sheets (expected paths, decisions, and destination outcomes) before running their program.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Trace Sheet, Algorithm Planning Sheet</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Did the robot do what you predicted? If not, why?"</div>
              </div>
            </div>

            {/* Activity 11: Systems Stress Test */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 11: Systems Stress Test</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams trade laptops. The testing team runs stress scenarios using cards and logs results in the <strong>Engineering Test Log</strong>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>• Scenario A: Hallway open, battery 80%, door open.</div>
                <div>• Scenario B: Hallway blocked, battery 75%, door open.</div>
                <div>• Scenario C: Hallway open, battery 15%, door open.</div>
                <div>• Scenario D: Hallway blocked, battery 15%, door closed.</div>
                <div>• Scenario E: Battery low after passing charging station.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Scenario Cards, Engineering Test Log</div>
                <div>🔍 <strong>Look-fors:</strong> Students logging failure paths accurately.</div>
              </div>
            </div>

            {/* Activity 12: Debug the Logic */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 12: Debug the Logic</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Define <strong>debugging</strong> as finding and fixing logical errors. Teams identify at least two failures and document: What happened? Why did it happen? Was the bug in the flowchart logic or the Scratch blocks? Document revisions.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Algorithm Revision Sheet</div>
                <div>⚠️ <strong>Important:</strong> Require students to update both their flowchart canvas and Scratch blocks.</div>
              </div>
            </div>

            {/* Activity 13: Final Optimization */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 13: Final Optimization Challenge (Three Deliveries)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                The nurse has 3 packages. Students optimize routing order, battery triggers, and obstacle handling. Teams defend their choices (trade-offs between path duration and battery limits).
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Map grid, Algorithm Planning Sheet</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "What trade-offs did you make? Why is your route efficient?"</div>
              </div>
            </div>

            {/* Gallery Walk */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Gallery Walk & Peer Review</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams display maps, flowcharts, logs, and simulations. Peer feedback uses three columns:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div>"I noticed..."</div>
                <div>"I wonder..."</div>
                <div>"Have you considered...?"</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Gallery Walk Feedback Sheet</div>
              </div>
            </div>

            {/* Reflection Exit Ticket */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>📝 AI Engineer Exit Ticket</span>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li>1. What is an algorithm?</li>
                <li>2. Why does sequence order matter?</li>
                <li>3. How did IF/ELSE improve your robot?</li>
                <li>4. What caused your algorithm to fail during testing?</li>
                <li>5. How did your team debug the problem?</li>
                <li>6. What makes one algorithm better than another?</li>
                <li>7. What trade-off did your team make?</li>
                <li>8. How is today's work different from the data work in Part 1?</li>
              </ul>
              <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '10px', borderRadius: '6px', marginTop: '10px', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: '1.4' }}>
                💡 <strong>Core Concept:</strong> "In Part 1, you designed what a computer system KNOWS (Data). In Part 2, you designed what a computer system DOES (Algorithms). Soon, we will bring those ideas back together to make our chatbot more powerful."
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> AI Engineer Exit Ticket</div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>
        <h4 style={{ color: '#a78bfa', fontSize: '0.9rem', margin: '14px 0 6px 0', textAlign: 'left' }}>Challenge Solution Cheatsheet</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', textAlign: 'left' }}>
          Middle School Challenge 2 (Wind Turbine Vectors): Set wind rotor angle pitch to 35 degrees and blade count to 3 to optimize grid load distribution.
        </p>
      </div>
    )}
  </div>
)}
{activeTeacherTab === 'part3' && (
  <div style={{ animation: 'slideUp 0.2s' }}>
    <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>
      {teacherUnit === 'botbuilder' ? 'Part 3: Introduction to Variables (AI BotBuilder)' : 'Part 3: Chemical Spill Titrations'}
    </h3>
    {teacherUnit === 'botbuilder' ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
        {/* Sub-Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { id: 'overview', label: '📋 Mission & Careers' },
            { id: 'hour1', label: '💭 Hour 1: Think' },
            { id: 'hour2', label: '💻 Hour 2: Build & Test' }
          ].map(subTab => (
            <button
              key={subTab.id}
              onClick={() => setActivePart3SubTab(subTab.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activePart3SubTab === subTab.id ? 'var(--primary)' : 'transparent',
                color: activePart3SubTab === subTab.id ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s',
                fontWeight: activePart3SubTab === subTab.id ? 'bold' : 'normal'
              }}
            >
              {subTab.label}
            </button>
          ))}
        </div>

        {/* SUBTAB CONTENT: OVERVIEW */}
        {activePart3SubTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            {/* Smart Greenhouse Mission Hook */}
            <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Smart Systems Engineer Hook</span>
              <h4 style={{ color: '#fff', margin: '4px 0 8px 0', fontSize: '1.05rem' }}>Challenge: Keep the Plant Healthy</h4>
              <p style={{ lineHeight: '1.5', margin: 0, fontSize: '0.8rem' }}>
                Introduce the greenhouse challenge:
                <em style={{ display: 'block', margin: '8px 0', color: '#fff', borderLeft: '3px solid var(--primary)', paddingLeft: '10px', fontStyle: 'normal' }}>
                  "Our school wants to grow healthy plants in a smart greenhouse. But the greenhouse keeps changing. It can get hotter, the soil can become dry, and the water tank can become low. Your engineering team must design a smart system that can keep track of these changes and help protect the plant."
                </em>
                Set the foundational inquiry: <strong>"How does a computer system remember information that can change?"</strong> Avoid introducing the word <em>variable</em> immediately. Let students discover the need for a system memory first.
              </p>
            </div>

            {/* Smart Systems Team Roles */}
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Smart Systems Collaborative Roles</strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#60a5fa', fontSize: '0.75rem', display: 'block' }}>🌱 Smart Systems Engineer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Thinks about the whole greenhouse design and decides what conditions the computer needs to monitor.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block' }}>📊 Data Monitor</strong>
                  <span style={{ fontSize: '0.7rem' }}>Keeps track of changing values (temperatures, moisture levels) and updates the memory indicators.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#a78bfa', fontSize: '0.75rem', display: 'block' }}>🧪 Systems Tester</strong>
                  <span style={{ fontSize: '0.7rem' }}>Triggers environmental changes (heat waves, dry spells) and audits if the system responds correctly.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#f59e0b', fontSize: '0.75rem', display: 'block' }}>💻 Scratch Developer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Translates the approved sensors, memory logic, and response rules into Scratch code variables.</span>
                </div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                💡 <em>Facilitator Tip:</em> Rotate team roles during activities so every student experiences physical monitoring, logic auditing, and code building.
              </span>
            </div>

            {/* STEAM Career Spotlight */}
            <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px' }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '0.8rem' }}>💼 STEAM Career Spotlight</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {['Agricultural Engineer', 'Environmental Engineer', 'Software Engineer', 'Automation Engineer', 'Smart Systems Engineer'].map(career => (
                  <span key={career} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '12px' }}>
                    {career}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
                Smart Systems Engineers build technology that automates farms, regulates vertical greenhouse setups, records weather dynamics, and designs energy-efficient systems for smart homes.
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: HOUR 1 (THINK) */}
        {activePart3SubTab === 'hour1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            
            {/* Activity 1: What Changes? */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 1: What Changes? (Information Sort)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams sort six greenhouse information cards into two groups: <strong>STAYS THE SAME</strong> (Greenhouse Name, Windows, Plant Type) and <strong>CAN CHANGE</strong> (Temperature, Soil Moisture, Water Tank).
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Info Sorting Cards, Stays/Changes Sheet</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "What changes in one hour? What changes when the sun comes out? Why does the name stay the same?"</div>
                <div>🔍 <strong>Look-fors:</strong> Students classifying dynamic values apart from static configuration tags.</div>
                <div>⚠️ <strong>Misconceptions:</strong> Thinking all information is variable. Emphasize if the system needs to constantly update it.</div>
              </div>
            </div>

            {/* Activity 2: Human Memory Box */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 2: Human Memory Box Challenge</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams use labeled boxes (Temp, Moisture, Water) with starting values (72, 70, 80). Introduce weather events sequentially. Students physically replace cards with new values as conditions fluctuate.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> 3 labeled cups/envelopes, value card slips</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Where did we put the new value? What happened to the old number? Did the box label change?"</div>
                <div>🔍 <strong>Look-fors:</strong> Data Monitors removing old cards and inserting new numbers.</div>
              </div>
            </div>

            {/* Activity 3: Unexpected Change */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 3: Unexpected Change — It's Getting Hot!</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Event card: ☀️ <strong>Temperature rises to 88°F.</strong> Guide students to update the Temperature box without adding a new cup. Formally define <strong>VARIABLE</strong> as a named memory container holding changeable values.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#fff', marginBottom: '8px' }}>
                temperature = 88 ➔ [Name: temperature] [Value: 88]
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Event Card, Concept Reference Card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "How does a program store changing information? What is the difference between a variable's name and its value?"</div>
              </div>
            </div>

            {/* Activity 4: Variable Detective */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 4: Variable Detective</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students review items (Game Score, School Address, Lives count, Class number, Battery level) and identify whether they should be stored in variables. Teams justify their reasoning.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Detective card list</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Does this value change during the program? Why does the computer need to remember it?"</div>
              </div>
            </div>

            {/* Activity 5: Connect Variables to Algorithms */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 5: Connect Variables to Algorithms</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Explain the interaction: <strong>Variables REMEMBER, Algorithms DECIDE based on memory.</strong> Model the rule: <code>IF temperature &gt; 85°F ➔ Turn on Fan</code>. Students map variables to decisions on a planner.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--primary-light)', textAlign: 'center', fontFamily: 'monospace' }}>
                OBSERVE (Variable) ➔ CHECK (Algorithm) ➔ ACT (Output)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Link-up Worksheets</div>
              </div>
            </div>

            {/* Activity 6: New Constraint */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 6: New Constraint (Limited Water)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Introduce limited resources: 🚨 <strong>NEW CONSTRAINT: Water tank has only 20% water left.</strong> Students combine checks: <code>IF soil moisture is dry AND water tank &gt; 20% ➔ water plant</code>. Otherwise, sound warning alert.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Limited Water Constraint Cards</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "How do we write a rule that checks two things? What happens if only one is true?"</div>
              </div>
            </div>

            {/* Activity 7: Conditions Keep Changing */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 7: Conditions Keep Changing Timeline</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students trace changing parameters from morning (Temp 70, Moist 60) to midday (Temp +10, Moist -10) to afternoon. Students log values and observe that variables hold the state representing right now.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Timeline Log Worksheet</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Which number should the system use - the start number or the newest number? Why?"</div>
              </div>
            </div>

            {/* Activity 8: Design Canvas */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 8: Smart Greenhouse Design Canvas</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams compile their plan before coding. Design rules must answer: What are we protecting? What 3 variables do we track? What are the start values? What rules regulate the fan, pump, and low-water alerts?
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Smart Greenhouse Design Canvas</div>
              </div>
            </div>

            {/* Hour 1 Checkpoint */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hour 1 Checkpoint Requirements</span>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li>✅ Three clearly named variables (temperature, soil moisture, water level).</li>
                <li>✅ Defined starting values and logic change triggers for each variable.</li>
                <li>✅ System rules utilizing decisions with at least two checks.</li>
                <li>✅ Completed Smart Greenhouse Design Canvas signed by the facilitator.</li>
              </ul>
              <span style={{ fontSize: '0.7rem', color: '#34d399', display: 'block', marginTop: '8px' }}>
                🗣️ <em>Facilitator Prompt:</em> Ask students: "What does this variable represent? Show me how your algorithm makes decisions using this value."
              </span>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: HOUR 2 (BUILD & TEST) */}
        {activePart3SubTab === 'hour2' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            
            {/* Activity 9: Build the Memory */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 9: Build the Greenhouse Memory in Scratch</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students create three variables (<code>temperature</code>, <code>soil moisture</code>, <code>water level</code>) and set starting values (72, 70, 80) under the initial program launch trigger.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Computers with Scratch, Variable Planning Canvas</div>
                <div>🔍 <strong>Look-fors:</strong> Students naming variables lowercase without spaces to ensure Scratch compatibility.</div>
              </div>
            </div>

            {/* Activity 10: Make It Change */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 10: Make the Greenhouse Change</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students program keys or event buttons to update variables (Sun event: temp +5; Plant dry event: moisture -10; Water event: moisture +20, water tank -10; Night event: temp -5).
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Scratch Editor</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Did one event change multiple variables? What happened to the old values?"</div>
              </div>
            </div>

            {/* Activity 11: Make It Respond */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 11: Make the Greenhouse Respond</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Connect variables to actuators using IF blocks (IF temp &gt; 85 ➔ Fan ON; IF moisture &lt; 30 ➔ Water ON; IF water &lt; 10 ➔ Refill warning). Trace execution loops.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff', fontFamily: 'monospace' }}>
                OBSERVE (Variable) ➔ REMEMBER ➔ CHECK (Condition) ➔ ACT (Response)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Scratch logic blocks</div>
              </div>
            </div>

            {/* Activity 12: Stress Test */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 12: Greenhouse Stress Test</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams swap computers. Testers feed environmental parameters (Scenarios A to E) to verify if indicators, alerts, and actuators respond correctly. Results are logged in the <strong>Variable Test Log</strong>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>• Scenario A: Temp 90, Moisture 60, Water 70 (Fan ON)</div>
                <div>• Scenario B: Temp 70, Moisture 20, Water 80 (Pump ON)</div>
                <div>• Scenario C: Temp 70, Moisture 20, Water 5 (Warning ON, Pump OFF)</div>
                <div>• Scenario D: Temp 92, Moisture 15, Water 5 (Fan ON, Warning ON, Pump OFF)</div>
                <div>• Scenario E: Consecutive temperature shifts to check value resets</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Scenario Cards, Variable Test Log</div>
              </div>
            </div>

            {/* Activity 13: Debug the Memory */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 13: Debug the Memory</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams diagnose and repair logical errors: values updating the wrong variable, checks comparing outdated values, reset failures, or missing initial sets. Revisions are logged on the debugging sheet.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Variable Debugging Sheet</div>
                <div>⚠️ <strong>Look-fors:</strong> Code check confirming variables are reset when the green flag is clicked.</div>
              </div>
            </div>

            {/* Activity 14: Protect the Plant */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 14: Protect the Plant for One Day</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Smart Greenhouse must run automatically to protect the tomato plant. Safe bounds: Temperature (65-85°F), Soil Moisture (30-80%), and Water Level kept above 10%. Verify if the system handles the timeline.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Map/Timeline guide, Simulation workspace</div>
              </div>
            </div>

            {/* Activity 15: Make It Better */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 15: Make It Better (Water-Saving Challenge)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Challenge: Keep the plant safe while using the least water possible. Compare rules: watering only when critical vs. preemptive watering. Discuss efficiency and resource trade-offs.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Water-saving challenge card, Planning Sheet</div>
              </div>
            </div>

            {/* Gallery Walk */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Gallery Walk & Peer Review</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams show their smart greenhouse canvas, test logs, and simulations. Peer feedback uses sticky notes with three columns: "I noticed...", "I wonder...", "Have you considered...?"
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Gallery Walk Feedback Sheet</div>
              </div>
            </div>

            {/* Final Connection to AI BotBuilder */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Final Connection to AI BotBuilder</span>
              <p style={{ margin: '6px 0 8px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Reconnect: What does a chatbot need to remember? (e.g. userName, question index, score, or dynamic topics). Summarize the unit story:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div><strong>Part 1: DATA</strong><br/>What does a system KNOW?</div>
                <div><strong>Part 2: ALGORITHMS</strong><br/>What does a system DO?</div>
                <div><strong>Part 3: VARIABLES</strong><br/>What does a system REMEMBER as things change?</div>
              </div>
            </div>

            {/* Reflection Exit Ticket */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>📝 Exit Ticket & Evaluation</span>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li>1. What is a variable?</li>
                <li>2. What is the difference between a variable name and its value?</li>
                <li>3. Name one variable from your greenhouse and what caused it to change.</li>
                <li>4. How did your algorithm use a variable to make a decision?</li>
                <li>5. Describe a bug you found and how you debugged it.</li>
                <li>6. Why do smart systems need variables?</li>
              </ul>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Exit Ticket Sheet</div>
              </div>
            </div>

            {/* Level-Up Challenges */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <strong style={{ color: '#a78bfa', display: 'block', fontSize: '0.75rem', marginBottom: '6px' }}>🚀 Level-Up Challenges (Extensions)</strong>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li><strong>Level 1:</strong> Add a <code>plant growth</code> variable tracking heights.</li>
                <li><strong>Level 2:</strong> Add a <code>day/time</code> clock simulation tracking elapsed time.</li>
                <li><strong>Level 3:</strong> Program plant growth rates to change based on Temp and Moisture.</li>
                <li><strong>Level 4:</strong> Show warnings when multiple parameters are simultaneously unsafe.</li>
                <li><strong>Level 5:</strong> Keep plant healthy using the absolute minimal water.</li>
              </ul>
            </div>

            {/* Common Misconceptions */}
            <div style={{ background: 'rgba(245, 158, 11, 0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
              <span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚠️ Common Misconceptions & Facilitation Tips</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', fontSize: '0.75rem', lineHeight: '1.4' }}>
                <div>
                  <strong style={{ color: '#fff' }}>1. "A variable is just a number."</strong><br/>
                  <em>Clarify:</em> A variable is the named box in memory (container). The number is the value inside. E.g. <code>temperature = 72</code>.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>2. "Name and value are the same thing."</strong><br/>
                  <em>Clarify:</em> <code>temperature</code> stays constant, but its value changes from 72 to 88.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>3. "We need a new variable when numbers change."</strong><br/>
                  <em>Clarify:</em> The same variable updates its contents. Old data is overwritten.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>4. "Variables change on their own."</strong><br/>
                  <em>Clarify:</em> Ask: "What instruction or event changed this number?"
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>5. "Variables and algorithms are the same."</strong><br/>
                  <em>Clarify:</em> Variables REMEMBER, algorithms DECIDE.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>6. "More water is always better."</strong><br/>
                  <em>Clarify:</em> Discuss engineering trade-offs and natural balances.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>7. "If code runs, it is correct."</strong><br/>
                  <em>Clarify:</em> Ask: "Have you tested extreme hot or dry conditions?"
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>
        <h4 style={{ color: '#a78bfa', fontSize: '0.9rem', margin: '14px 0 6px 0', textAlign: 'left' }}>Challenge Solution Cheatsheet</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', textAlign: 'left' }}>
          Middle School Challenge 3 (Stormwater Titrations): Add 15 drops of pH+ basic neutralizer to bring acidic stormwater (pH 2.0) to exactly pH 7.0.
        </p>
      </div>
    )}
  </div>
)}
{activeTeacherTab === 'part4' && (
  <div style={{ animation: 'slideUp 0.2s' }}>
    <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>
      {teacherUnit === 'botbuilder' ? 'Part 4: Loops & Repetition (AI BotBuilder)' : 'Part 4: Seismic Structural Loads'}
    </h3>
    {teacherUnit === 'botbuilder' ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
        {/* Sub-Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { id: 'overview', label: '📋 Mission & Careers' },
            { id: 'hour1', label: '💭 Hour 1: Think' },
            { id: 'hour2', label: '💻 Hour 2: Build & Test' }
          ].map(subTab => (
            <button
              key={subTab.id}
              onClick={() => setActivePart4SubTab(subTab.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activePart4SubTab === subTab.id ? 'var(--primary)' : 'transparent',
                color: activePart4SubTab === subTab.id ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s',
                fontWeight: activePart4SubTab === subTab.id ? 'bold' : 'normal'
              }}
            >
              {subTab.label}
            </button>
          ))}
        </div>

        {/* SUBTAB CONTENT: OVERVIEW */}
        {activePart4SubTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            {/* Smart Recycling Sorter Hook */}
            <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Automation Engineer Mission Hook</span>
              <h4 style={{ color: '#fff', margin: '4px 0 8px 0', fontSize: '1.05rem' }}>Challenge: Redesign the Recycling Machine</h4>
              <p style={{ lineHeight: '1.5', margin: 0, fontSize: '0.8rem' }}>
                Introduce the school waste challenge:
                <em style={{ display: 'block', margin: '8px 0', color: '#fff', borderLeft: '3px solid var(--primary)', paddingLeft: '10px', fontStyle: 'normal' }}>
                  "Our school wants to recycle, but sorting waste takes too long. We have a conveyor belt machine, but right now it only sorts ONE object and then stops! Your engineering team must program the system so it repeats the sorting process automatically without us having to click start for every single item."
                </em>
                Set the big inquiry question: <strong>"How can a computer repeat a task without us giving the same instructions again and again?"</strong> Let students feel the frustration of manual duplication first.
              </p>
            </div>

            {/* Automation Team Roles */}
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Sorter System Team Roles</strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#60a5fa', fontSize: '0.75rem', display: 'block' }}>⚙️ Automation Engineer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Designs how the conveyor belt interacts with sensors and decides how items move through the system.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#34d399', fontSize: '0.75rem', display: 'block' }}>🔁 Process Engineer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Looks for repeated steps in the sorting sequence and configures loop rules for maximum efficiency.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#a78bfa', fontSize: '0.75rem', display: 'block' }}>🧪 Systems Tester</strong>
                  <span style={{ fontSize: '0.7rem' }}>Runs stress tests with mixed recycling streams and diagnoses early-stopping or infinite loop bugs.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <strong style={{ color: '#f59e0b', fontSize: '0.75rem', display: 'block' }}>💻 Scratch Developer</strong>
                  <span style={{ fontSize: '0.7rem' }}>Translates approved conveyor loops, category sensors, and variable count logs into Scratch block logic.</span>
                </div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                💡 <em>Facilitator Tip:</em> Ensure students rotate roles as they transition from physical flow exercises to Scratch implementation.
              </span>
            </div>

            {/* STEAM Career Spotlight */}
            <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px' }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '0.8rem' }}>💼 STEAM Career Spotlight</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {['Automation Engineer', 'Robotics Engineer', 'Environmental Engineer', 'Manufacturing Engineer', 'Software Engineer'].map(career => (
                  <span key={career} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '12px' }}>
                    {career}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
                Automation Engineers design robotic systems that sort luggage at airport baggage systems, pack orders at fulfillment warehouses, assemble cars on factory conveyor belts, and process materials at recycling facilities.
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: HOUR 1 (THINK) */}
        {activePart4SubTab === 'hour1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            
            {/* Activity 1: Human Sorter */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 1: Human Recycling Sorter</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                One student acts as the machine. Given 5 sequential instructions (Pick up item ➔ Inspect ➔ Decide category ➔ Sort into bin ➔ Stop). The machine processes 1 item and freezes. Give it a second item.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Item cards (plastic, paper, can, food), 4 bin labels</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Our code worked for one item, but why did it stop when another item arrived? How do we tell it to continue?"</div>
                <div>🔍 <strong>Look-fors:</strong> Students recognizing that the algorithm's exit code (`Stop`) terminates the process too early.</div>
                <div>⚠️ <strong>Misconceptions:</strong> Students might suggest copy-pasting the instructions again and again. Do not teach loops yet; let them hit the barrier.</div>
              </div>
            </div>

            {/* Activity 2: The 20-Item Problem */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 2: The 20-Item Challenge</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Ask teams to write instructions to process 20 items. Let them write a few entries (Cycle 1: Pick up ➔ Sort; Cycle 2: Pick up ➔ Sort...) until they realize it's tedious. Ask them to find a pattern.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Writing sheets, Repeated Instruction cards</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Which exact blocks are we duplicating? Is there a shorthand way to write this pattern?"</div>
                <div>🔍 <strong>Look-fors:</strong> Identifying the repeated sub-sequence of instructions.</div>
              </div>
            </div>

            {/* Activity 3: Introduce the Loop */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 3: Introduce the Loop Concept</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Introduce the definition: <strong>LOOP = An instruction that repeats a block of code.</strong> Model the conversion: Instead of copy-pasting 20 times, wrap the core cycle inside a <code>REPEAT 20 TIMES</code> container block.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#fff', marginBottom: '8px' }}>
                REPEAT 20 TIMES [ Pick up item ➔ Inspect ➔ Sort item ]
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Loop reference card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Did the final output change? Why is this design easier to read and modify?"</div>
              </div>
            </div>

            {/* Activity 4: Loop Detective */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 4: Loop Detective</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students inspect common routines (e.g., doing 10 jumping jacks, watering 5 flowers, brushing teeth, blinking lights 6 times). Teams identify the repeating action and rewrite using <code>REPEAT X TIMES</code> format.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Loop Detective cards</div>
              </div>
            </div>

            {/* Activity 5: Unknown Number of Items */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 5: Unknown Number of Items</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Introduce new conditions: 🚨 <strong>NEW INFORMATION: We do not know how many items are arriving today.</strong> Can we still use a fixed number loop? Introduce conditional loops: <code>REPEAT UNTIL conveyor is empty</code>.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Unknown Item count event card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "What condition tells this machine when it can safely stop? How does this differ from a fixed count?"</div>
              </div>
            </div>

            {/* Activity 6: Count the Items */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 6: Count the Items (Connect Variables)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                School request: 📊 <strong>NEW CONSTRAINT: Count total items sorted.</strong> Connect back to variables: Initialize <code>items_sorted = 0</code>. Inside the loop, change value by <code>+1</code> on every cycle.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--primary-light)', textAlign: 'center' }}>
                🔁 LOOP = Repeats the Job | 💾 VARIABLE = Remembers the Counts
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Sorter Counter card, Variable chips</div>
              </div>
            </div>

            {/* Activity 7: Count Each Category */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 7: Count Each Category</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Introduce separate tracking variables: <code>plastic count</code>, <code>paper count</code>, <code>aluminum count</code>, <code>food count</code>. Ensure variables increment only when that specific category is sorted.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Category count trackers</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Where should we place the variable increment blocks? Should they be inside or outside the category checks?"</div>
              </div>
            </div>

            {/* Activity 8: Infinite Loop Challenge */}
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 8: Infinite Loop Challenge</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Give teams a broken loop rule: <code>REPEAT FOREVER [ Inspect item ➔ Sort item ]</code> but without removing the sorted item. The conveyor belt stays full, processing the same item infinitely.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Infinite Loop card</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "Why did our machine freeze? What is missing from the loop body to let it advance and terminate?"</div>
              </div>
            </div>

            {/* Activity 9: Sorter Efficiency */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 9: Sorter Efficiency Challenge</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Compare two pseudocode systems sorting 15 items: System A write steps 15 times; System B uses a single loop block. Discuss which is easier to write, inspect, debug, or change.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Efficiency cards</div>
              </div>
            </div>

            {/* Activity 10: Smart Sorter Design Canvas */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 10: Smart Sorter Design Canvas</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams compile their structural system plan: categories to sort, repeated cycle steps, loop start/stop rules, variable counter names, and debugging checklists.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Smart Sorter Design Canvas</div>
              </div>
            </div>

            {/* Hour 1 Checkpoint */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hour 1 Checkpoint Requirements</span>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li>✅ Defined sorting rules for plastic, paper, can, and food waste.</li>
                <li>✅ A repeating cycle sequence wrapped in loop block logic.</li>
                <li>✅ A clear, logical condition that stops the loop when the belt is empty.</li>
                <li>✅ Labeled variables for tracking total counts and category totals.</li>
                <li>✅ Completed Smart Sorter Design Canvas signed by the facilitator.</li>
              </ul>
              <span style={{ fontSize: '0.7rem', color: '#34d399', display: 'block', marginTop: '8px' }}>
                🗣️ <em>Facilitator Inquiry:</em> Ask: "When does your loop stop? Show me which variable counts your plastic cans."
              </span>
            </div>
          </div>
        )}

        {/* SUBTAB CONTENT: HOUR 2 (BUILD & TEST) */}
        {activePart4SubTab === 'hour2' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'slideUp 0.15s' }}>
            
            {/* Activity 11: Build One Cycle */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 11: Build One Sorting Cycle</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students program Scratch to process exactly ONE item. The system checks sensor inputs (using <code>IF/ELSE</code> blocks) and moves the item sprite to the correct bin. Test with one item.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Computers with Scratch, Design Canvas</div>
                <div>🔍 <strong>Look-fors:</strong> Students validating single cycle logic before wrapping it inside a loop block.</div>
              </div>
            </div>

            {/* Activity 12: Add the Loop */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 12: Add the Sorter Loop</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students wrap their sorting blocks in a loop: first test with <code>repeat 5</code>, then program a conditional <code>repeat until</code> block to run until the conveyor list is empty.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Scratch Editor</div>
                <div>🗣️ <strong>Facilitator Questions:</strong> "How many blocks did you save by wrapping this in a loop? What controls when it stops?"</div>
              </div>
            </div>

            {/* Activity 13: Add the Counters */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 13: Add the Counters (Variables)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Students create variables (<code>total items</code>, <code>plastic</code>, <code>paper</code>, <code>can</code>, <code>food</code>). Program blocks to set all counters to 0 when flag is clicked, and increment correctly inside the loop.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Scratch Variable blocks</div>
                <div>🔍 <strong>Look-fors:</strong> Ensuring counter variable increments are placed inside the loop body, not outside.</div>
              </div>
            </div>

            {/* Activity 14: Sorting Stress Test */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 14: Sorter Stress Test</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams swap computers. Testers run the system with specified Scenario Cards (A to F) containing different sequences (e.g., empty belt, unknown items, mixed items) and log results in the <strong>Loop Test Log</strong>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>• Scenario A: 3 plastic bottles (Counts correct?)</div>
                <div>• Scenario B: Paper ➔ Can ➔ Bottle (Correct order?)</div>
                <div>• Scenario C: 10 mixed items (Loop runs completely?)</div>
                <div>• Scenario D: Empty belt (Does not crash?)</div>
                <div>• Scenario E: One unknown item (Handle safely?)</div>
                <div>• Scenario F: Long continuous stream (Loops run?)</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Loop Test Log, Scenario Cards</div>
              </div>
            </div>

            {/* Activity 15: Debug the Loop */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 15: Debug the Loop</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams debug common loops bugs: loop stopping too early (some items remain), loop running too many times (trying to sort empty air), infinite loops (belt stuck), or double counting.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Loop Debugging Sheet</div>
              </div>
            </div>

            {/* Activity 16: School Recycling Rush */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 16: School Recycling Rush</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Conveyor belt receives a fast, mixed, unknown sequence of school waste. Sorter must run automatically, sort every item into correct categories, increment counts, handle unknown cards safely, and terminate when clear.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 20 mins | 🛠️ <strong>Materials:</strong> Recycling Rush cards, Scratch environment</div>
              </div>
            </div>

            {/* Activity 17: Sorter Simplification */}
            <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>Activity 17: Sorter Simplification (Make It Better)</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Challenge: Reduce instructions count without altering system actions. Clean up repeated code blocks outside loops or duplicate checks. Compare designs on efficiency metrics.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Code cleanup checklist</div>
              </div>
            </div>

            {/* Gallery Walk */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 'bold' }}>Gallery Walk & Peer Review</span>
              <p style={{ margin: '6px 0 10px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Teams showcase sorter design canvases, loop test logs, and running simulations. Peers record: "I noticed...", "I wonder...", "Have you considered...?" Formulate iteration plan.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 15 mins | 🛠️ <strong>Materials:</strong> Gallery Walk Feedback Sheet</div>
              </div>
            </div>

            {/* Final Connection to AI BotBuilder */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Final Connection to AI BotBuilder</span>
              <p style={{ margin: '6px 0 8px 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
                How do loops connect to chatbot systems? A chatbot must run continuously to process user questions. It loops: Wait for User Input ➔ Search Knowledge ➔ Respond ➔ Repeat.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', fontSize: '0.65rem', color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div><strong>Part 1: DATA</strong><br/>What system KNOWS</div>
                <div><strong>Part 2: ALGORITHMS</strong><br/>What system DOES</div>
                <div><strong>Part 3: VARIABLES</strong><br/>What system REMEMBERS</div>
                <div><strong>Part 4: LOOPS</strong><br/>What system REPEATS efficiently</div>
              </div>
            </div>

            {/* Reflection Exit Ticket */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>📝 Exit Ticket & Evaluation</span>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li>1. What is a loop?</li>
                <li>2. Why do programmers use loops?</li>
                <li>3. What repeated inside your recycling conveyor belt algorithm?</li>
                <li>4. What condition told your loop when it should stop?</li>
                <li>5. What variable did your loop update during each cycle?</li>
                <li>6. What is an infinite loop and how did you debug it?</li>
              </ul>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⏱️ <strong>Estimated Time:</strong> 10 mins | 🛠️ <strong>Materials:</strong> Exit Ticket Sheet</div>
              </div>
            </div>

            {/* Level-Up Challenges */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <strong style={{ color: '#a78bfa', display: 'block', fontSize: '0.75rem', marginBottom: '6px' }}>🚀 Level-Up Challenges (Extensions)</strong>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                <li><strong>Level 1:</strong> Add an <code>energy cost</code> variable decrementing by 1 per item sorted.</li>
                <li><strong>Level 2:</strong> Sort a 5th category <code>cardboard</code> and allocate a new count variable.</li>
                <li><strong>Level 3:</strong> sound warning buzzer if <code>unknown item</code> is detected.</li>
                <li><strong>Level 4:</strong> Design a system that stops sorting if any single category bin is full (count &gt;= 10).</li>
                <li><strong>Level 5:</strong> Optimize code block counts to the absolute minimal set.</li>
              </ul>
            </div>

            {/* Common Misconceptions */}
            <div style={{ background: 'rgba(245, 158, 11, 0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
              <span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚠️ Common Misconceptions & Facilitation Tips</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', fontSize: '0.75rem', lineHeight: '1.4' }}>
                <div>
                  <strong style={{ color: '#fff' }}>1. "Loops make computer execute code faster."</strong><br/>
                  <em>Clarify:</em> Loop instructions save coding effort and file size; execution time is controlled by system hardware speed.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>2. "REPEAT 10 means do 10 different tasks."</strong><br/>
                  <em>Clarify:</em> It executes the exact same task sequence 10 times.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>3. "All loops repeat forever."</strong><br/>
                  <em>Clarify:</em> Loops have exit constraints (number of counts or conditional changes). Unintentional forever runs are infinite loops.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>4. "Loop and variable are similar coding items."</strong><br/>
                  <em>Clarify:</em> 🔁 LOOP = repeats the task | 💾 VARIABLE = remembers values.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>5. "If my code compiles, it works under all situations."</strong><br/>
                  <em>Clarify:</em> Run stress tests with edge inputs (e.g. empty lists, weird sizes) to audit loop boundaries.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>
        <h4 style={{ color: '#a78bfa', fontSize: '0.9rem', margin: '14px 0 6px 0', textAlign: 'left' }}>Challenge Solution Cheatsheet</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', textAlign: 'left' }}>
          Middle School Challenge 4 (Seismic Structural Loads): Select steel cross braces as reinforcement materials and calibrate frequency bounds to sustain simulation vibrations.
        </p>
      </div>
    )}
  </div>
)}
{activeTeacherTab === 'share' && (
  <div style={{ animation: 'slideUp 0.2s' }}>
    <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', textAlign: 'left' }}>
      {teacherUnit === 'botbuilder' ? 'Unit Share: AI BotBuilder Design Expo' : 'Unit Share: Sustainable City Map'}
    </h3>
    {teacherUnit === 'botbuilder' ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unit Share Roadmap</span>
          <h4 style={{ color: '#fff', margin: '4px 0 8px 0', fontSize: '1.05rem' }}>Design Expo Cycle</h4>
          <p style={{ lineHeight: '1.5', margin: 0, fontSize: '0.8rem' }}>
            Guide students through the 6-phase engineering share cycle:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginTop: '10px', fontSize: '0.75rem', color: '#fff' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>1. Verification Audit</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>2. User Testing</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>3. Final Upgrades</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>4. Pitch Planning</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>5. Live Expo Demo</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>6. S-I-Q Peer Review</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <strong style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>🏫 Facilitation Guide: Expo Presentations</strong>
          <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
            Enforce the 10-point presentation structure (Problem, User, Data, Algorithm, Variable, Conditional, Live Demo, Limitations, Next Version). Provide Strength-Idea-Question (S-I-Q) cards for constructive feedback.
          </p>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px' }}>
          <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '6px', fontSize: '0.8rem' }}>🧠 Final Exit Reflection</strong>
          <p style={{ fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
            Students choose their favorite engineering role (AI Engineer, Data Engineer, Scratch Developer, AI Tester) and write a reflection justifying their contribution.
          </p>
        </div>
      </div>
    ) : (
      <div>
        <h4 style={{ color: '#a78bfa', fontSize: '0.9rem', margin: '14px 0 6px 0', textAlign: 'left' }}>Challenge Solution Cheatsheet</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', textAlign: 'left' }}>
          Middle School Unit Share: Complete the integrated environmental sustainable map, detailing vectors, pH filtration, load tolerances, and soil sensors outputs.
        </p>
      </div>
    )}
  </div>
)}
</div>
</div>
</div>
)}
</div>
</section>
);
}