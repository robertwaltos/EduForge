import type { LearningModule } from "@/lib/modules/types";

export const Gardening101Module: LearningModule = {
  "id": "gardening-101",
  "title": "Gardening Foundations",
  "description": "Build practical gardening skills: soil health, watering strategy, plant nutrition, and seasonal planning.",
  "subject": "Gardening",
  "tags": [
    "curriculum",
    "interactive",
    "life-skills"
  ],
  "minAge": 10,
  "maxAge": 99,
  "version": "1.1.0",
  "difficultyBand": "beginner",
  "thumbnail": "/placeholders/lesson-robot.svg",
  "learningObjectives": [
    "Explain how soil, light, and water influence plant growth.",
    "Plan planting and maintenance by season and climate.",
    "Diagnose common plant health problems and choose corrective actions."
  ],
  "lessons": [
    {
      "id": "gardening-101-l01",
      "title": "Soil and Root Health",
      "type": "video",
      "duration": 10,
      "chunks": [
        {
          "id": "gardening-101-l01-c1",
          "title": "What Healthy Soil Does",
          "content": "Healthy soil holds water and nutrients while still allowing air to reach plant roots."
        },
        {
          "id": "gardening-101-l01-c2",
          "title": "Soil Structure",
          "content": "Sand, silt, clay, and organic matter each change drainage and nutrient availability."
        },
        {
          "id": "gardening-101-l01-c3",
          "title": "Root Zone Basics",
          "content": "Root depth and root spread determine watering depth and spacing decisions."
        }
      ],
      "flashcards": [
        {
          "id": "gardening-101-l01-f1",
          "front": "Loam",
          "back": "Balanced soil texture with good drainage and nutrient retention."
        },
        {
          "id": "gardening-101-l01-f2",
          "front": "Compost",
          "back": "Decomposed organic matter that improves soil structure and fertility."
        }
      ],
      "learningAids": [
        {
          "id": "gardening-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "gardening-101-l02",
      "title": "Watering and Irrigation",
      "type": "interactive",
      "duration": 12,
      "interactiveActivities": [
        {
          "id": "gardening-101-l02-ia1",
          "type": "matching_pairs",
          "title": "Match Symptoms to Watering Issues",
          "description": "Connect common plant symptoms to likely irrigation causes.",
          "estimatedMinutes": 8,
          "difficultyLevel": "easy",
          "data": {
            "left": [
              {
                "id": "l1",
                "label": "Yellow lower leaves + soggy soil"
              },
              {
                "id": "l2",
                "label": "Wilted leaves + dry topsoil"
              },
              {
                "id": "l3",
                "label": "Leaf burn in midday sun"
              }
            ],
            "right": [
              {
                "id": "r1",
                "label": "Overwatering and low oxygen at roots"
              },
              {
                "id": "r2",
                "label": "Underwatering or shallow watering"
              },
              {
                "id": "r3",
                "label": "Heat stress and evapotranspiration spike"
              }
            ],
            "pairs": [
              {
                "leftId": "l1",
                "rightId": "r1"
              },
              {
                "leftId": "l2",
                "rightId": "r2"
              },
              {
                "leftId": "l3",
                "rightId": "r3"
              }
            ]
          }
        }
      ],
      "learningAids": [
        {
          "id": "gardening-101-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Follow the prompt sequence and document your reasoning."
        }
      ]
    },
    {
      "id": "gardening-101-l03",
      "title": "Checkpoint: Plant Growth Basics",
      "type": "quiz",
      "duration": 10,
      "questions": [
        {
          "id": "gardening-101-l03-q1",
          "text": "What is the main benefit of adding compost to garden beds?",
          "skillId": "gardening-101-skill-soil",
          "options": [
            {
              "id": "a",
              "text": "Improves structure, moisture balance, and nutrient availability."
            },
            {
              "id": "b",
              "text": "Instantly removes all pests."
            },
            {
              "id": "c",
              "text": "Prevents roots from spreading."
            },
            {
              "id": "d",
              "text": "Eliminates need for sunlight."
            }
          ],
          "correctOptionId": "a"
        },
        {
          "id": "gardening-101-l03-q2",
          "text": "Why is deep watering often better than frequent shallow watering?",
          "skillId": "gardening-101-skill-water",
          "options": [
            {
              "id": "a",
              "text": "It encourages deeper root growth and resilience."
            },
            {
              "id": "b",
              "text": "It keeps only top leaves wet."
            },
            {
              "id": "c",
              "text": "It always increases disease pressure."
            },
            {
              "id": "d",
              "text": "It replaces the need for mulch."
            }
          ],
          "correctOptionId": "a"
        },
        {
          "id": "gardening-101-l03-q3",
          "text": "Which factor most directly affects photosynthesis rate?",
          "skillId": "gardening-101-skill-light",
          "options": [
            {
              "id": "a",
              "text": "Light exposure and leaf health."
            },
            {
              "id": "b",
              "text": "Pot color only."
            },
            {
              "id": "c",
              "text": "Seed packet design."
            },
            {
              "id": "d",
              "text": "Tool brand."
            }
          ],
          "correctOptionId": "a"
        }
      ]
    },
    {
      "id": "gardening-101-l04",
      "title": "Seasonal Planning and Crop Rotation",
      "type": "video",
      "duration": 11,
      "chunks": [
        {
          "id": "gardening-101-l04-c1",
          "title": "Planting Windows",
          "content": "Use local frost dates and temperature ranges to choose planting windows."
        },
        {
          "id": "gardening-101-l04-c2",
          "title": "Rotation Strategy",
          "content": "Rotate plant families to reduce soil nutrient depletion and disease carryover."
        },
        {
          "id": "gardening-101-l04-c3",
          "title": "Low-Waste Garden System",
          "content": "Mulch, compost, and rain capture create a more resilient and sustainable system."
        }
      ]
    },
    {
      "id": "gardening-101-l05",
      "title": "Capstone: Build a Garden Plan",
      "type": "interactive",
      "duration": 14,
      "interactiveActivities": [
        {
          "id": "gardening-101-l05-ia1",
          "type": "project_builder",
          "title": "Garden Planner",
          "description": "Design a one-season plan for a small home garden.",
          "estimatedMinutes": 12,
          "difficultyLevel": "medium",
          "instructions": [
            "Pick 3-5 crops suitable for your climate and season.",
            "Define watering cadence and soil preparation steps.",
            "Add one pest prevention and one recovery plan."
          ]
        }
      ],
      "learningAids": [
        {
          "id": "gardening-101-l05-a1",
          "type": "mnemonic",
          "title": "S-L-W-N",
          "content": "Soil, Light, Water, Nutrients: check these in order for plant issues."
        }
      ]
    },
    {
      "id": "gardening-101-l06",
      "title": "Checkpoint 2: Troubleshooting and Seasonal Decisions",
      "type": "quiz",
      "duration": 10,
      "questions": [
        {
          "id": "gardening-101-l06-q1",
          "text": "A plant has yellow leaves and soggy soil for several days. What is the best first action?",
          "skillId": "gardening-101-skill-troubleshoot",
          "options": [
            {
              "id": "a",
              "text": "Reduce watering, improve drainage, and monitor root-zone moisture."
            },
            {
              "id": "b",
              "text": "Add more water immediately."
            },
            {
              "id": "c",
              "text": "Ignore symptoms for one month."
            },
            {
              "id": "d",
              "text": "Remove all mulch and fertilizer at once."
            }
          ],
          "correctOptionId": "a"
        },
        {
          "id": "gardening-101-l06-q2",
          "text": "Why is crop rotation useful in small gardens?",
          "skillId": "gardening-101-skill-season",
          "options": [
            {
              "id": "a",
              "text": "It helps reduce pest/disease buildup and balances soil nutrient demand."
            },
            {
              "id": "b",
              "text": "It guarantees no weeds will appear."
            },
            {
              "id": "c",
              "text": "It removes the need for sunlight."
            },
            {
              "id": "d",
              "text": "It replaces all irrigation planning."
            }
          ],
          "correctOptionId": "a"
        },
        {
          "id": "gardening-101-l06-q3",
          "text": "Which metric is most useful when tuning a watering schedule?",
          "skillId": "gardening-101-skill-water",
          "options": [
            {
              "id": "a",
              "text": "Soil moisture trend and plant recovery pattern."
            },
            {
              "id": "b",
              "text": "Tool color preference."
            },
            {
              "id": "c",
              "text": "Pot label design."
            },
            {
              "id": "d",
              "text": "Seed packet artwork."
            }
          ],
          "correctOptionId": "a"
        },
        {
          "id": "gardening-101-l06-q4",
          "text": "A resilient home-garden plan should always include:",
          "skillId": "gardening-101-skill-plan",
          "options": [
            {
              "id": "a",
              "text": "A prevention step, a monitoring checkpoint, and a recovery action."
            },
            {
              "id": "b",
              "text": "Only one crop type for every season."
            },
            {
              "id": "c",
              "text": "No backup plan for pests or weather shifts."
            },
            {
              "id": "d",
              "text": "Random planting dates without climate checks."
            }
          ],
          "correctOptionId": "a"
        }
      ],
      "learningAids": [
        {
          "id": "gardening-101-l06-a1",
          "type": "practice",
          "title": "Troubleshooting Card",
          "content": "Use symptom, cause, action, and follow-up metric before final decisions."
        }
      ]
    }
  ]
};
