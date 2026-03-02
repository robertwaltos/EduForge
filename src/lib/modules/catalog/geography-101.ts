import type { LearningModule } from "@/lib/modules/types";

export const Geography101Module: LearningModule = {
  "id": "geography-101",
  "title": "Geography: Our Amazing World",
  "description": "Explore Earth's continents and oceans, learn to read maps, discover landforms and climate zones, navigate world rivers and lakes, and study countries and capitals from every region.",
  "subject": "Geography",
  "tags": [
    "geography",
    "social-studies",
    "interactive",
    "curriculum"
  ],
  "minAge": 7,
  "maxAge": 18,
  "version": "2.0.0",
  "learningObjectives": [
    "Name and locate the seven continents and five oceans",
    "Read maps using a compass rose, scale, and legend",
    "Identify major landforms including mountains, valleys, plateaus, and islands",
    "Describe Earth's climate zones and what determines climate",
    "Locate major world rivers and lakes on a map",
    "Match countries to their capitals across all continents"
  ],
  "lessons": [
    {
      "id": "geography-101-l01",
      "title": "Continents and Oceans",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "geography-101-l01-c1",
          "title": "The Seven Continents",
          "content": "Earth has seven continents: Asia (the largest), Africa, North America, South America, Antarctica (the coldest — no permanent residents!), Europe, and Australia/Oceania (the smallest). Together they cover about 29% of Earth's surface. The rest is water!"
        },
        {
          "id": "geography-101-l01-c2",
          "title": "The Five Oceans",
          "content": "Earth's five oceans are the Pacific (the largest and deepest), Atlantic, Indian, Southern (around Antarctica), and Arctic (the smallest and coldest). Oceans cover about 71% of the planet and hold 97% of Earth's water."
        },
        {
          "id": "geography-101-l01-c3",
          "title": "How Continents Formed",
          "content": "About 200 million years ago, all continents were joined in one supercontinent called Pangaea. Tectonic plates slowly moved them apart — and they are still moving today! That is why South America and Africa look like puzzle pieces that fit together."
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l01-f1",
          "front": "Largest continent by area",
          "back": "Asia"
        },
        {
          "id": "geography-101-l01-f2",
          "front": "Largest and deepest ocean",
          "back": "Pacific Ocean"
        },
        {
          "id": "geography-101-l01-f3",
          "front": "Supercontinent that broke apart 200 million years ago",
          "back": "Pangaea"
        },
        {
          "id": "geography-101-l01-f4",
          "front": "Percentage of Earth's surface covered by water",
          "back": "About 71%"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l01-q1",
          "text": "Which is the largest continent?",
          "options": [
            {
              "id": "a",
              "text": "Asia"
            },
            {
              "id": "b",
              "text": "Africa"
            },
            {
              "id": "c",
              "text": "North America"
            },
            {
              "id": "d",
              "text": "Europe"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Asia is the largest continent by both area and population!"
        },
        {
          "id": "geography-101-l01-q2",
          "text": "How many oceans does Earth have?",
          "options": [
            {
              "id": "a",
              "text": "5"
            },
            {
              "id": "b",
              "text": "4"
            },
            {
              "id": "c",
              "text": "7"
            },
            {
              "id": "d",
              "text": "3"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Pacific, Atlantic, Indian, Southern, and Arctic — 5 oceans!"
        },
        {
          "id": "geography-101-l01-q3",
          "text": "The ancient supercontinent was called",
          "options": [
            {
              "id": "a",
              "text": "Pangaea"
            },
            {
              "id": "b",
              "text": "Atlantis"
            },
            {
              "id": "c",
              "text": "Oceania"
            },
            {
              "id": "d",
              "text": "Europa"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Pangaea means 'all lands' — it broke apart into today's continents!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l01-act1",
          "type": "drag_and_drop",
          "title": "Label the map",
          "description": "On a blank world map, write the name of each continent and ocean in the correct location. Color each continent a different color."
        }
      ],
      "learningAids": [
        {
          "id": "geography-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "geography-101-l02",
      "title": "Reading Maps",
      "type": "interactive",
      "duration": 12,
      "chunks": [
        {
          "id": "geography-101-l02-c1",
          "title": "Compass Rose and Directions",
          "content": "A compass rose shows the four cardinal directions: North, South, East, and West. A memory trick: 'Never Eat Soggy Waffles' going clockwise. In-between directions are northeast, southeast, southwest, and northwest."
        },
        {
          "id": "geography-101-l02-c2",
          "title": "Map Scale",
          "content": "A map scale shows the relationship between distance on the map and real distance. For example, 1 inch = 100 miles. If two cities are 3 inches apart on the map, they are 300 miles apart in real life. Scales help you plan trips!"
        },
        {
          "id": "geography-101-l02-c3",
          "title": "Map Legend (Key)",
          "content": "A map legend (also called a key) explains the symbols on a map. A blue line might mean a river. A small black dot might mean a city. A star usually marks a capital city. Always check the legend before reading a map."
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l02-f1",
          "front": "Shows N, S, E, W on a map",
          "back": "Compass rose"
        },
        {
          "id": "geography-101-l02-f2",
          "front": "Shows how map distance relates to real distance",
          "back": "Map scale"
        },
        {
          "id": "geography-101-l02-f3",
          "front": "Explains symbols on a map",
          "back": "Legend (key)"
        },
        {
          "id": "geography-101-l02-f4",
          "front": "Memory trick for directions clockwise",
          "back": "Never Eat Soggy Waffles"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l02-q1",
          "text": "A compass rose shows",
          "options": [
            {
              "id": "a",
              "text": "Directions (N, S, E, W)"
            },
            {
              "id": "b",
              "text": "The weather"
            },
            {
              "id": "c",
              "text": "Population size"
            },
            {
              "id": "d",
              "text": "Elevation"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The compass rose shows cardinal directions on a map!"
        },
        {
          "id": "geography-101-l02-q2",
          "text": "If 1 inch = 100 miles and two cities are 4 inches apart, they are",
          "options": [
            {
              "id": "a",
              "text": "400 miles apart"
            },
            {
              "id": "b",
              "text": "100 miles apart"
            },
            {
              "id": "c",
              "text": "4 miles apart"
            },
            {
              "id": "d",
              "text": "1,000 miles apart"
            }
          ],
          "correctOptionId": "a",
          "explanation": "4 inches × 100 miles = 400 miles!"
        },
        {
          "id": "geography-101-l02-q3",
          "text": "A star symbol on a map usually means",
          "options": [
            {
              "id": "a",
              "text": "Capital city"
            },
            {
              "id": "b",
              "text": "Mountain"
            },
            {
              "id": "c",
              "text": "River"
            },
            {
              "id": "d",
              "text": "Ocean"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Stars mark capital cities on most maps!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l02-act1",
          "type": "project_builder",
          "title": "Treasure map",
          "description": "Draw a map of your room or backyard. Include a compass rose, a scale (1 inch = 1 foot), and a legend with symbols for furniture or landmarks. Mark an X for hidden treasure!"
        }
      ],
      "learningAids": [
        {
          "id": "geography-101-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "geography-101-l03",
      "title": "Landforms",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "geography-101-l03-c1",
          "title": "Mountains and Valleys",
          "content": "Mountains are tall landforms pushed up by tectonic plates. Mount Everest, in the Himalayas, is the tallest at 29,032 feet. A valley is the low area between mountains or hills, often carved by rivers. The Grand Canyon is a famous valley carved by the Colorado River over millions of years."
        },
        {
          "id": "geography-101-l03-c2",
          "title": "Plateaus and Plains",
          "content": "A plateau is a flat-topped area raised above the land around it — like a table. The Tibetan Plateau is called the 'Roof of the World' at 15,000 feet high. Plains are wide, flat areas of land. The Great Plains of the United States are used for farming."
        },
        {
          "id": "geography-101-l03-c3",
          "title": "Islands and Peninsulas",
          "content": "An island is land completely surrounded by water. Greenland is the world's largest island. A peninsula is land surrounded by water on three sides — like Florida or Italy (which looks like a boot!)."
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l03-f1",
          "front": "Tallest mountain in the world",
          "back": "Mount Everest (29,032 feet)"
        },
        {
          "id": "geography-101-l03-f2",
          "front": "Flat-topped elevated landform",
          "back": "Plateau"
        },
        {
          "id": "geography-101-l03-f3",
          "front": "Land completely surrounded by water",
          "back": "Island"
        },
        {
          "id": "geography-101-l03-f4",
          "front": "Land surrounded by water on three sides",
          "back": "Peninsula"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l03-q1",
          "text": "The tallest mountain in the world is",
          "options": [
            {
              "id": "a",
              "text": "Mount Everest"
            },
            {
              "id": "b",
              "text": "Mount Kilimanjaro"
            },
            {
              "id": "c",
              "text": "Mount Fuji"
            },
            {
              "id": "d",
              "text": "Mount McKinley"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Mount Everest stands at 29,032 feet in the Himalayas!"
        },
        {
          "id": "geography-101-l03-q2",
          "text": "Florida is an example of a",
          "options": [
            {
              "id": "a",
              "text": "Peninsula"
            },
            {
              "id": "b",
              "text": "Island"
            },
            {
              "id": "c",
              "text": "Plateau"
            },
            {
              "id": "d",
              "text": "Mountain"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Florida is surrounded by water on three sides!"
        },
        {
          "id": "geography-101-l03-q3",
          "text": "Wide, flat areas of land used for farming are called",
          "options": [
            {
              "id": "a",
              "text": "Plains"
            },
            {
              "id": "b",
              "text": "Mountains"
            },
            {
              "id": "c",
              "text": "Islands"
            },
            {
              "id": "d",
              "text": "Valleys"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Plains are flat and great for agriculture like the Great Plains!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l03-act1",
          "type": "drawing_canvas",
          "title": "Landform diorama sketch",
          "description": "Draw a landscape that includes at least 4 landforms: a mountain, a valley, a plateau, and an island in a surrounding lake. Label each one."
        }
      ],
      "learningAids": [
        {
          "id": "geography-101-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "geography-101-l04",
      "title": "Geography Checkpoint",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "geography-101-l04-c1",
          "title": "Continents and Maps Review",
          "content": "Seven continents, five oceans. Maps use compass roses, scales, and legends to convey information."
        },
        {
          "id": "geography-101-l04-c2",
          "title": "Landforms Review",
          "content": "Mountains, valleys, plateaus, plains, islands, and peninsulas each have unique features. Tectonic plates shape Earth's surface."
        },
        {
          "id": "geography-101-l04-c3",
          "title": "Great Progress!",
          "content": "You can now read maps and identify landforms. Next: climate zones, rivers, lakes, and world capitals!"
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l04-f1",
          "front": "Number of continents",
          "back": "Seven"
        },
        {
          "id": "geography-101-l04-f2",
          "front": "What a compass rose shows",
          "back": "Directions (N, S, E, W)"
        },
        {
          "id": "geography-101-l04-f3",
          "front": "Grand Canyon was carved by this river",
          "back": "Colorado River"
        },
        {
          "id": "geography-101-l04-f4",
          "front": "The 'Roof of the World' plateau",
          "back": "Tibetan Plateau"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l04-q1",
          "text": "How many continents are there?",
          "options": [
            {
              "id": "a",
              "text": "7"
            },
            {
              "id": "b",
              "text": "5"
            },
            {
              "id": "c",
              "text": "6"
            },
            {
              "id": "d",
              "text": "8"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Asia, Africa, North America, South America, Antarctica, Europe, Australia — 7!"
        },
        {
          "id": "geography-101-l04-q2",
          "text": "A map legend explains",
          "options": [
            {
              "id": "a",
              "text": "The symbols on the map"
            },
            {
              "id": "b",
              "text": "The weather"
            },
            {
              "id": "c",
              "text": "The continent names"
            },
            {
              "id": "d",
              "text": "The time zone"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The legend tells you what each symbol means!"
        },
        {
          "id": "geography-101-l04-q3",
          "text": "Greenland is the world's largest",
          "options": [
            {
              "id": "a",
              "text": "Island"
            },
            {
              "id": "b",
              "text": "Continent"
            },
            {
              "id": "c",
              "text": "Mountain"
            },
            {
              "id": "d",
              "text": "Peninsula"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Greenland is the largest island — but not big enough to be a continent!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l04-act1",
          "type": "drawing_canvas",
          "title": "Map and landform review sheet",
          "description": "Draw a mini world map with all 7 continents labeled. Below it, draw and label 3 landforms you learned about."
        }
      ],
      "learningAids": [
        {
          "id": "geography-101-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "geography-101-l05",
      "title": "Climate Zones",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "geography-101-l05-c1",
          "title": "Tropical Zone",
          "content": "The tropical zone is near the equator. It is hot year-round with lots of rain. Tropical rainforests like the Amazon are found here. The equator is an imaginary line that divides the Northern and Southern Hemispheres."
        },
        {
          "id": "geography-101-l05-c2",
          "title": "Temperate Zone",
          "content": "Temperate zones are between the tropics and the poles. They have four distinct seasons: spring, summer, fall, and winter. Most of the United States, Europe, and eastern China are in temperate zones."
        },
        {
          "id": "geography-101-l05-c3",
          "title": "Polar Zone",
          "content": "Polar zones are near the North and South Poles. They are extremely cold with long winters and short summers. The Arctic and Antarctica are polar regions. Climate is affected by latitude, altitude, and distance from the ocean."
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l05-f1",
          "front": "Hot zone near the equator",
          "back": "Tropical zone"
        },
        {
          "id": "geography-101-l05-f2",
          "front": "Zone with four distinct seasons",
          "back": "Temperate zone"
        },
        {
          "id": "geography-101-l05-f3",
          "front": "Extremely cold zone near the poles",
          "back": "Polar zone"
        },
        {
          "id": "geography-101-l05-f4",
          "front": "Imaginary line dividing Earth into Northern and Southern Hemispheres",
          "back": "Equator"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l05-q1",
          "text": "The tropical zone is located near the",
          "options": [
            {
              "id": "a",
              "text": "Equator"
            },
            {
              "id": "b",
              "text": "North Pole"
            },
            {
              "id": "c",
              "text": "South Pole"
            },
            {
              "id": "d",
              "text": "Moon"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Tropical zones wrap around the equator where it is hottest!"
        },
        {
          "id": "geography-101-l05-q2",
          "text": "Which zone has four distinct seasons?",
          "options": [
            {
              "id": "a",
              "text": "Temperate"
            },
            {
              "id": "b",
              "text": "Tropical"
            },
            {
              "id": "c",
              "text": "Polar"
            },
            {
              "id": "d",
              "text": "Desert"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Temperate zones experience spring, summer, fall, and winter!"
        },
        {
          "id": "geography-101-l05-q3",
          "text": "Three things that affect climate are latitude, altitude, and",
          "options": [
            {
              "id": "a",
              "text": "Distance from the ocean"
            },
            {
              "id": "b",
              "text": "Population"
            },
            {
              "id": "c",
              "text": "Number of cities"
            },
            {
              "id": "d",
              "text": "Language spoken"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Oceans moderate temperatures — coastal areas are milder!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l05-act1",
          "type": "drawing_canvas",
          "title": "Climate zone map",
          "description": "On a world map, color the tropical zone red, the temperate zones green, and the polar zones blue. Draw the equator and label each zone."
        }
      ]
    },
    {
      "id": "geography-101-l06",
      "title": "World Rivers and Lakes",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "geography-101-l06-c1",
          "title": "Major World Rivers",
          "content": "The Nile (Africa) is the longest river at about 4,130 miles. The Amazon (South America) carries the most water and flows through the world's largest rainforest. The Mississippi (North America) drains 31 U.S. states. The Yangtze (China) is Asia's longest river."
        },
        {
          "id": "geography-101-l06-c2",
          "title": "Major World Lakes",
          "content": "The Caspian Sea (Asia/Europe border) is the world's largest lake by area. Lake Superior (North America) is the largest freshwater lake by surface area. Lake Baikal (Russia) is the deepest lake and holds about 20% of the world's unfrozen fresh water."
        },
        {
          "id": "geography-101-l06-c3",
          "title": "Why Rivers and Lakes Matter",
          "content": "Rivers and lakes provide drinking water, irrigation for farms, transportation, and habitats for wildlife. Ancient civilizations like Egypt grew along the Nile because of its fertile flood plains."
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l06-f1",
          "front": "Longest river in the world",
          "back": "Nile River (about 4,130 miles)"
        },
        {
          "id": "geography-101-l06-f2",
          "front": "River that carries the most water",
          "back": "Amazon River"
        },
        {
          "id": "geography-101-l06-f3",
          "front": "Deepest lake in the world",
          "back": "Lake Baikal (Russia)"
        },
        {
          "id": "geography-101-l06-f4",
          "front": "World's largest lake (by area)",
          "back": "Caspian Sea"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l06-q1",
          "text": "Which is the longest river in the world?",
          "options": [
            {
              "id": "a",
              "text": "Nile"
            },
            {
              "id": "b",
              "text": "Amazon"
            },
            {
              "id": "c",
              "text": "Mississippi"
            },
            {
              "id": "d",
              "text": "Yangtze"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Nile flows about 4,130 miles through Africa!"
        },
        {
          "id": "geography-101-l06-q2",
          "text": "The deepest lake in the world is",
          "options": [
            {
              "id": "a",
              "text": "Lake Baikal"
            },
            {
              "id": "b",
              "text": "Lake Superior"
            },
            {
              "id": "c",
              "text": "Caspian Sea"
            },
            {
              "id": "d",
              "text": "Lake Victoria"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Lake Baikal in Russia is over 5,300 feet deep!"
        },
        {
          "id": "geography-101-l06-q3",
          "text": "Ancient Egypt grew along the Nile because of its",
          "options": [
            {
              "id": "a",
              "text": "Fertile flood plains"
            },
            {
              "id": "b",
              "text": "Cold temperatures"
            },
            {
              "id": "c",
              "text": "Mountains"
            },
            {
              "id": "d",
              "text": "Polar ice"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Nile's annual floods left rich soil for farming!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l06-act1",
          "type": "drawing_canvas",
          "title": "River and lake map",
          "description": "On a world map, draw and label the Nile, Amazon, Mississippi, and Yangtze rivers in blue. Mark Lake Baikal, Lake Superior, and the Caspian Sea. Add arrows showing which direction each river flows."
        }
      ]
    },
    {
      "id": "geography-101-l07",
      "title": "Countries and Capitals",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "geography-101-l07-c1",
          "title": "The Americas",
          "content": "The United States' capital is Washington, D.C. Canada's capital is Ottawa. Mexico's capital is Mexico City — one of the world's largest cities. Brazil, the largest country in South America, has its capital in Brasília (not Rio de Janeiro!)."
        },
        {
          "id": "geography-101-l07-c2",
          "title": "Europe, Asia, and Africa",
          "content": "France: Paris. United Kingdom: London. Germany: Berlin. Russia (the world's largest country): Moscow. China: Beijing. India: New Delhi. Japan: Tokyo. Egypt: Cairo. South Africa has three capitals: Pretoria, Cape Town, and Bloemfontein!"
        },
        {
          "id": "geography-101-l07-c3",
          "title": "Australia and Fun Facts",
          "content": "Australia's capital is Canberra (not Sydney!). There are about 195 countries in the world. The smallest country is Vatican City (inside Rome, Italy). The newest country is South Sudan (2011)."
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l07-f1",
          "front": "Capital of the United States",
          "back": "Washington, D.C."
        },
        {
          "id": "geography-101-l07-f2",
          "front": "Capital of Japan",
          "back": "Tokyo"
        },
        {
          "id": "geography-101-l07-f3",
          "front": "Smallest country in the world",
          "back": "Vatican City"
        },
        {
          "id": "geography-101-l07-f4",
          "front": "Capital of Australia (not Sydney!)",
          "back": "Canberra"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l07-q1",
          "text": "The capital of Brazil is",
          "options": [
            {
              "id": "a",
              "text": "Brasília"
            },
            {
              "id": "b",
              "text": "Rio de Janeiro"
            },
            {
              "id": "c",
              "text": "São Paulo"
            },
            {
              "id": "d",
              "text": "Buenos Aires"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Brasília is the planned capital, not the more famous Rio!"
        },
        {
          "id": "geography-101-l07-q2",
          "text": "The smallest country in the world is",
          "options": [
            {
              "id": "a",
              "text": "Vatican City"
            },
            {
              "id": "b",
              "text": "Monaco"
            },
            {
              "id": "c",
              "text": "Luxembourg"
            },
            {
              "id": "d",
              "text": "Singapore"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Vatican City is inside Rome and is only 0.17 square miles!"
        },
        {
          "id": "geography-101-l07-q3",
          "text": "The capital of Australia is",
          "options": [
            {
              "id": "a",
              "text": "Canberra"
            },
            {
              "id": "b",
              "text": "Sydney"
            },
            {
              "id": "c",
              "text": "Melbourne"
            },
            {
              "id": "d",
              "text": "Brisbane"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Canberra was chosen as a compromise between Sydney and Melbourne!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l07-act1",
          "type": "matching_pairs",
          "title": "Capital city match",
          "description": "Match each country to its capital: USA→Washington D.C., Japan→Tokyo, France→Paris, Brazil→Brasília, Australia→Canberra, Egypt→Cairo. Try to do it from memory!"
        }
      ]
    },
    {
      "id": "geography-101-l08",
      "title": "Final Geography Assessment",
      "type": "quiz",
      "duration": 10,
      "chunks": [
        {
          "id": "geography-101-l08-c1",
          "title": "Continents, Maps, and Landforms Review",
          "content": "Seven continents, five oceans. Maps use compass roses, scales, and legends. Major landforms include mountains, valleys, plateaus, plains, islands, and peninsulas."
        },
        {
          "id": "geography-101-l08-c2",
          "title": "Climate, Rivers, and Lakes Review",
          "content": "Three climate zones: tropical, temperate, and polar. The Nile is the longest river. Lake Baikal is the deepest lake. Rivers support farming, drinking water, and transportation."
        },
        {
          "id": "geography-101-l08-c3",
          "title": "Countries and Capitals Review",
          "content": "195 countries, each with a capital city. Vatican City is the smallest country. You are now a world geography expert!"
        }
      ],
      "flashcards": [
        {
          "id": "geography-101-l08-f1",
          "front": "Longest river",
          "back": "Nile"
        },
        {
          "id": "geography-101-l08-f2",
          "front": "Largest continent",
          "back": "Asia"
        },
        {
          "id": "geography-101-l08-f3",
          "front": "Zone with four seasons",
          "back": "Temperate"
        },
        {
          "id": "geography-101-l08-f4",
          "front": "Tallest mountain",
          "back": "Mount Everest"
        }
      ],
      "questions": [
        {
          "id": "geography-101-l08-q1",
          "text": "Which ocean is the largest?",
          "options": [
            {
              "id": "a",
              "text": "Pacific"
            },
            {
              "id": "b",
              "text": "Atlantic"
            },
            {
              "id": "c",
              "text": "Indian"
            },
            {
              "id": "d",
              "text": "Arctic"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Pacific Ocean is the largest and deepest!"
        },
        {
          "id": "geography-101-l08-q2",
          "text": "Italy is shaped like a boot and is an example of a",
          "options": [
            {
              "id": "a",
              "text": "Peninsula"
            },
            {
              "id": "b",
              "text": "Island"
            },
            {
              "id": "c",
              "text": "Plateau"
            },
            {
              "id": "d",
              "text": "Plain"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Italy is surrounded by water on three sides — a peninsula!"
        },
        {
          "id": "geography-101-l08-q3",
          "text": "The Amazon River flows through the world's largest",
          "options": [
            {
              "id": "a",
              "text": "Rainforest"
            },
            {
              "id": "b",
              "text": "Desert"
            },
            {
              "id": "c",
              "text": "Ice cap"
            },
            {
              "id": "d",
              "text": "Mountain range"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Amazon River flows through the Amazon Rainforest in South America!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "geography-101-l08-act1",
          "type": "project_builder",
          "title": "Geography journal",
          "description": "Create a geography journal with one page per lesson topic: Continents, Maps, Landforms, Climate, Rivers/Lakes, and Countries. Write 2-3 facts and draw a picture for each. Share your journal with someone and quiz them!"
        }
      ]
    }
  ]
};
