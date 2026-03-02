import type { LearningModule } from "@/lib/modules/types";

export const PreKGeneralScience101Module: LearningModule = {
  "id": "pre-k-general-science-101",
  "title": "Little Scientists: Exploring Our World",
  "description": "Discover science wonders! Learn about states of matter, forces like push and pull, simple machines, the water cycle, habitats, and the human body through fun experiments and activities.",
  "subject": "Science",
  "tags": [
    "pre-k",
    "science",
    "interactive",
    "curriculum"
  ],
  "minAge": 3,
  "maxAge": 5,
  "version": "4.0.0",
  "learningObjectives": [
    "Identify the three states of matter: solid, liquid, and gas",
    "Understand basic forces including push, pull, gravity, and friction",
    "Recognize simple machines like ramps, levers, and wheels",
    "Describe the water cycle: evaporation, condensation, precipitation",
    "Match animals to their habitats",
    "Name major parts of the human body and their functions"
  ],
  "lessons": [
    {
      "id": "pre-k-general-science-101-l01",
      "title": "States of Matter",
      "type": "video",
      "duration": 10,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l01-c1",
          "title": "Solids",
          "content": "Solids keep their shape! A rock, a toy block, and a crayon are all solids. You can hold them, stack them, and they stay the same. Solids do not change shape when you put them in a cup."
        },
        {
          "id": "pre-k-general-science-101-l01-c2",
          "title": "Liquids",
          "content": "Liquids flow and take the shape of their container. Water, juice, and milk are liquids. Pour water into a cup — it fills the cup's shape. Pour it into a bowl — it fills the bowl's shape!"
        },
        {
          "id": "pre-k-general-science-101-l01-c3",
          "title": "Gases",
          "content": "Gases spread out to fill any space. You cannot see most gases, but you can feel air when the wind blows! Blow up a balloon — the air inside is gas pushing on the balloon's walls."
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l01-f1",
          "front": "Keeps its own shape",
          "back": "Solid"
        },
        {
          "id": "pre-k-general-science-101-l01-f2",
          "front": "Flows and takes the shape of its container",
          "back": "Liquid"
        },
        {
          "id": "pre-k-general-science-101-l01-f3",
          "front": "Spreads out to fill any space",
          "back": "Gas"
        },
        {
          "id": "pre-k-general-science-101-l01-f4",
          "front": "A balloon is filled with this state of matter",
          "back": "Gas (air)"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l01-q1",
          "text": "Which one is a solid?",
          "options": [
            {
              "id": "a",
              "text": "A rock"
            },
            {
              "id": "b",
              "text": "Water"
            },
            {
              "id": "c",
              "text": "Air"
            },
            {
              "id": "d",
              "text": "Juice"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A rock keeps its shape — it's a solid!"
        },
        {
          "id": "pre-k-general-science-101-l01-q2",
          "text": "What happens when you pour water into a cup?",
          "options": [
            {
              "id": "a",
              "text": "It takes the cup's shape"
            },
            {
              "id": "b",
              "text": "It stays a ball"
            },
            {
              "id": "c",
              "text": "It disappears"
            },
            {
              "id": "d",
              "text": "It turns to ice"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Liquids flow and fill their container!"
        },
        {
          "id": "pre-k-general-science-101-l01-q3",
          "text": "You cannot see most gases, but you can",
          "options": [
            {
              "id": "a",
              "text": "Feel air (wind)"
            },
            {
              "id": "b",
              "text": "Hold them"
            },
            {
              "id": "c",
              "text": "Stack them"
            },
            {
              "id": "d",
              "text": "Pour them in a cup"
            }
          ],
          "correctOptionId": "a",
          "explanation": "You feel gas when the wind blows on your face!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l01-act1",
          "type": "sorting_game",
          "title": "Sort the matter",
          "description": "Gather 6 items from home (ice cube, water, balloon, toy car, soap, steam from a pot). Sort them into Solid, Liquid, or Gas."
        }
      ],
      "learningAids": [
        {
          "id": "pre-k-general-science-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l02",
      "title": "Forces: Push and Pull",
      "type": "interactive",
      "duration": 10,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l02-c1",
          "title": "Push and Pull",
          "content": "A push moves things away from you — like pushing a swing or a toy car. A pull brings things toward you — like pulling a wagon or opening a drawer. Pushes and pulls are called forces."
        },
        {
          "id": "pre-k-general-science-101-l02-c2",
          "title": "Gravity",
          "content": "Gravity is a force that pulls everything down toward the ground. Drop a ball — gravity pulls it down! Jump up — gravity pulls you back. Without gravity, we would float away like astronauts in space."
        },
        {
          "id": "pre-k-general-science-101-l02-c3",
          "title": "Friction",
          "content": "Friction slows things down. Rub your hands together fast — that warm feeling is friction! Smooth surfaces like ice have less friction so you slide easily. Rough surfaces like sandpaper have more friction."
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l02-f1",
          "front": "Moves things away from you",
          "back": "Push"
        },
        {
          "id": "pre-k-general-science-101-l02-f2",
          "front": "Brings things toward you",
          "back": "Pull"
        },
        {
          "id": "pre-k-general-science-101-l02-f3",
          "front": "Force that pulls things down to the ground",
          "back": "Gravity"
        },
        {
          "id": "pre-k-general-science-101-l02-f4",
          "front": "Force that slows things down",
          "back": "Friction"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l02-q1",
          "text": "When you push a toy car, it moves",
          "options": [
            {
              "id": "a",
              "text": "Away from you"
            },
            {
              "id": "b",
              "text": "Toward you"
            },
            {
              "id": "c",
              "text": "Up to the sky"
            },
            {
              "id": "d",
              "text": "Under water"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A push moves things away from you!"
        },
        {
          "id": "pre-k-general-science-101-l02-q2",
          "text": "What force pulls you back down after you jump?",
          "options": [
            {
              "id": "a",
              "text": "Gravity"
            },
            {
              "id": "b",
              "text": "Friction"
            },
            {
              "id": "c",
              "text": "Push"
            },
            {
              "id": "d",
              "text": "Wind"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Gravity always pulls things toward the ground!"
        },
        {
          "id": "pre-k-general-science-101-l02-q3",
          "text": "Why do your hands feel warm when you rub them together?",
          "options": [
            {
              "id": "a",
              "text": "Friction"
            },
            {
              "id": "b",
              "text": "Gravity"
            },
            {
              "id": "c",
              "text": "Push"
            },
            {
              "id": "d",
              "text": "Pull"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Rubbing creates friction, which makes heat!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l02-act1",
          "type": "sorting_game",
          "title": "Push or pull walk",
          "description": "Walk around your home and find 5 things you push (door, button) and 5 things you pull (drawer, rope). Draw or name them."
        }
      ],
      "learningAids": [
        {
          "id": "pre-k-general-science-101-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l03",
      "title": "Simple Machines",
      "type": "video",
      "duration": 10,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l03-c1",
          "title": "Ramps (Inclined Planes)",
          "content": "A ramp makes it easier to move things up. Rolling a ball up a ramp is easier than lifting it straight up. Slides at the playground are ramps — gravity pulls you down!"
        },
        {
          "id": "pre-k-general-science-101-l03-c2",
          "title": "Levers",
          "content": "A lever is a bar that rests on a point (called a fulcrum) to lift things. A seesaw is a lever. Push one side down and the other side goes up. Levers help you lift heavy things with less effort."
        },
        {
          "id": "pre-k-general-science-101-l03-c3",
          "title": "Wheels and Axles",
          "content": "Wheels make things roll instead of slide. A wagon has wheels so you can pull it easily. Without wheels, you would have to drag everything — that is a lot of friction!"
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l03-f1",
          "front": "A slanted surface that helps you move things up",
          "back": "Ramp (inclined plane)"
        },
        {
          "id": "pre-k-general-science-101-l03-f2",
          "front": "A bar that rests on a point to lift things",
          "back": "Lever"
        },
        {
          "id": "pre-k-general-science-101-l03-f3",
          "front": "The balance point of a lever",
          "back": "Fulcrum"
        },
        {
          "id": "pre-k-general-science-101-l03-f4",
          "front": "Round objects that reduce friction and help things roll",
          "back": "Wheels"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l03-q1",
          "text": "A slide at the playground is an example of",
          "options": [
            {
              "id": "a",
              "text": "A ramp"
            },
            {
              "id": "b",
              "text": "A lever"
            },
            {
              "id": "c",
              "text": "A wheel"
            },
            {
              "id": "d",
              "text": "A magnet"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Slides are ramps — gravity pulls you down!"
        },
        {
          "id": "pre-k-general-science-101-l03-q2",
          "text": "A seesaw is an example of",
          "options": [
            {
              "id": "a",
              "text": "A lever"
            },
            {
              "id": "b",
              "text": "A ramp"
            },
            {
              "id": "c",
              "text": "A wheel"
            },
            {
              "id": "d",
              "text": "A pulley"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A seesaw lifts one side when you push down the other!"
        },
        {
          "id": "pre-k-general-science-101-l03-q3",
          "text": "Wheels help reduce",
          "options": [
            {
              "id": "a",
              "text": "Friction"
            },
            {
              "id": "b",
              "text": "Gravity"
            },
            {
              "id": "c",
              "text": "Sound"
            },
            {
              "id": "d",
              "text": "Light"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Wheels roll instead of sliding, reducing friction!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l03-act1",
          "type": "project_builder",
          "title": "Ramp experiment",
          "description": "Build a ramp with a book propped against a box. Roll a toy car down and see how far it goes. Try different heights — higher ramp means more speed!"
        }
      ],
      "learningAids": [
        {
          "id": "pre-k-general-science-101-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l04",
      "title": "Science Checkpoint",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l04-c1",
          "title": "Matter Review",
          "content": "Solids keep their shape. Liquids flow. Gases spread out. Ice is solid, water is liquid, and steam is gas — all the same thing in different states!"
        },
        {
          "id": "pre-k-general-science-101-l04-c2",
          "title": "Forces Review",
          "content": "Pushing moves things away. Pulling brings things closer. Gravity pulls everything down. Friction slows things down."
        },
        {
          "id": "pre-k-general-science-101-l04-c3",
          "title": "Simple Machines Review",
          "content": "Ramps help move things up. Levers lift heavy things. Wheels reduce friction and make rolling easy."
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l04-f1",
          "front": "Three states of matter",
          "back": "Solid, liquid, gas"
        },
        {
          "id": "pre-k-general-science-101-l04-f2",
          "front": "Force that pulls everything down",
          "back": "Gravity"
        },
        {
          "id": "pre-k-general-science-101-l04-f3",
          "front": "Force that slows things down",
          "back": "Friction"
        },
        {
          "id": "pre-k-general-science-101-l04-f4",
          "front": "Playground slide is this simple machine",
          "back": "Ramp"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l04-q1",
          "text": "Ice is a",
          "options": [
            {
              "id": "a",
              "text": "Solid"
            },
            {
              "id": "b",
              "text": "Liquid"
            },
            {
              "id": "c",
              "text": "Gas"
            },
            {
              "id": "d",
              "text": "Machine"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Ice keeps its shape, so it is a solid!"
        },
        {
          "id": "pre-k-general-science-101-l04-q2",
          "text": "Opening a drawer is an example of",
          "options": [
            {
              "id": "a",
              "text": "A pull"
            },
            {
              "id": "b",
              "text": "A push"
            },
            {
              "id": "c",
              "text": "Gravity"
            },
            {
              "id": "d",
              "text": "A ramp"
            }
          ],
          "correctOptionId": "a",
          "explanation": "You pull a drawer toward you!"
        },
        {
          "id": "pre-k-general-science-101-l04-q3",
          "text": "A seesaw uses what simple machine?",
          "options": [
            {
              "id": "a",
              "text": "Lever"
            },
            {
              "id": "b",
              "text": "Wheel"
            },
            {
              "id": "c",
              "text": "Ramp"
            },
            {
              "id": "d",
              "text": "Magnet"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A seesaw is a lever with a fulcrum in the middle!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l04-act1",
          "type": "drawing_canvas",
          "title": "Science doodle review",
          "description": "Draw three things: a solid, a force, and a simple machine. Label each one."
        }
      ],
      "learningAids": [
        {
          "id": "pre-k-general-science-101-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l05",
      "title": "The Water Cycle",
      "type": "video",
      "duration": 10,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l05-c1",
          "title": "Evaporation",
          "content": "When the sun heats water in puddles, lakes, and oceans, some water turns into invisible water vapor and floats up into the sky. This is called evaporation — liquid becomes gas! You see it when a wet sidewalk dries in the sun."
        },
        {
          "id": "pre-k-general-science-101-l05-c2",
          "title": "Condensation",
          "content": "When water vapor rises high and meets cold air, it turns back into tiny water droplets. This is condensation — gas becomes liquid! Those droplets clump together to form clouds. Breathe on a cold window — the fog is condensation!"
        },
        {
          "id": "pre-k-general-science-101-l05-c3",
          "title": "Precipitation",
          "content": "When clouds get too full of water droplets, the water falls back down as rain, snow, sleet, or hail. This is precipitation! The water flows into rivers and oceans, and the cycle starts again."
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l05-f1",
          "front": "Water turns into vapor and rises",
          "back": "Evaporation"
        },
        {
          "id": "pre-k-general-science-101-l05-f2",
          "front": "Water vapor turns back into tiny droplets",
          "back": "Condensation"
        },
        {
          "id": "pre-k-general-science-101-l05-f3",
          "front": "Water falls from clouds as rain or snow",
          "back": "Precipitation"
        },
        {
          "id": "pre-k-general-science-101-l05-f4",
          "front": "Evaporation → condensation → precipitation → repeat",
          "back": "The water cycle"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l05-q1",
          "text": "When the sun heats a puddle and it dries up, that is",
          "options": [
            {
              "id": "a",
              "text": "Evaporation"
            },
            {
              "id": "b",
              "text": "Precipitation"
            },
            {
              "id": "c",
              "text": "Condensation"
            },
            {
              "id": "d",
              "text": "Freezing"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The puddle evaporates — liquid becomes water vapor!"
        },
        {
          "id": "pre-k-general-science-101-l05-q2",
          "text": "Fog on a cold window is an example of",
          "options": [
            {
              "id": "a",
              "text": "Condensation"
            },
            {
              "id": "b",
              "text": "Evaporation"
            },
            {
              "id": "c",
              "text": "Precipitation"
            },
            {
              "id": "d",
              "text": "Gravity"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Warm breath meets cold glass, water vapor becomes droplets!"
        },
        {
          "id": "pre-k-general-science-101-l05-q3",
          "text": "Rain falling from clouds is called",
          "options": [
            {
              "id": "a",
              "text": "Precipitation"
            },
            {
              "id": "b",
              "text": "Evaporation"
            },
            {
              "id": "c",
              "text": "Condensation"
            },
            {
              "id": "d",
              "text": "Friction"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Rain, snow, sleet, and hail are all precipitation!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l05-act1",
          "type": "project_builder",
          "title": "Water cycle in a bag",
          "description": "Draw a sun and clouds on a zip-lock bag. Add a little water, seal it, and tape it to a sunny window. Watch evaporation and condensation happen inside the bag!"
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l06",
      "title": "Habitats",
      "type": "video",
      "duration": 10,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l06-c1",
          "title": "What Is a Habitat?",
          "content": "A habitat is a place where an animal lives that gives it food, water, and shelter. A pond is a frog's habitat. A forest is a bear's habitat. Every animal is suited to its home!"
        },
        {
          "id": "pre-k-general-science-101-l06-c2",
          "title": "Forest and Desert",
          "content": "Forests are full of trees, shade, and rain. Deer, owls, and squirrels live there. Deserts are dry and hot. Camels have humps of fat for energy, and lizards cool off under rocks."
        },
        {
          "id": "pre-k-general-science-101-l06-c3",
          "title": "Ocean and Arctic",
          "content": "The ocean is full of fish, dolphins, and sea turtles. Coral reefs are underwater cities! The Arctic is freezing cold. Polar bears have thick fur and fat to stay warm on the ice."
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l06-f1",
          "front": "A place where an animal lives, eats, and finds shelter",
          "back": "Habitat"
        },
        {
          "id": "pre-k-general-science-101-l06-f2",
          "front": "Animal with humps that lives in the desert",
          "back": "Camel"
        },
        {
          "id": "pre-k-general-science-101-l06-f3",
          "front": "Underwater city made of living organisms",
          "back": "Coral reef"
        },
        {
          "id": "pre-k-general-science-101-l06-f4",
          "front": "Arctic animal with thick fur and fat",
          "back": "Polar bear"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l06-q1",
          "text": "A frogs habitat is a",
          "options": [
            {
              "id": "a",
              "text": "Pond"
            },
            {
              "id": "b",
              "text": "Desert"
            },
            {
              "id": "c",
              "text": "Arctic"
            },
            {
              "id": "d",
              "text": "Sky"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Frogs live in and around ponds!"
        },
        {
          "id": "pre-k-general-science-101-l06-q2",
          "text": "A camel lives in",
          "options": [
            {
              "id": "a",
              "text": "A desert"
            },
            {
              "id": "b",
              "text": "A pond"
            },
            {
              "id": "c",
              "text": "The Arctic"
            },
            {
              "id": "d",
              "text": "A forest"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Camels are adapted to hot, dry deserts!"
        },
        {
          "id": "pre-k-general-science-101-l06-q3",
          "text": "Polar bears stay warm because they have",
          "options": [
            {
              "id": "a",
              "text": "Thick fur and fat"
            },
            {
              "id": "b",
              "text": "Thin skin"
            },
            {
              "id": "c",
              "text": "Cold blood"
            },
            {
              "id": "d",
              "text": "Wings"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Thick fur and blubber keep polar bears warm!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l06-act1",
          "type": "matching_pairs",
          "title": "Animal habitat match",
          "description": "Match each animal to its habitat: frog→pond, camel→desert, polar bear→Arctic, deer→forest, dolphin→ocean."
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l07",
      "title": "The Human Body",
      "type": "video",
      "duration": 10,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l07-c1",
          "title": "Bones and Muscles",
          "content": "Your body has about 206 bones that make up your skeleton. Bones hold you up and protect soft organs like your brain and heart. Muscles are attached to bones and help you move — they pull on bones when they tighten (contract)."
        },
        {
          "id": "pre-k-general-science-101-l07-c2",
          "title": "Heart and Lungs",
          "content": "Your heart is a muscle that pumps blood all through your body. Put your hand on your chest — you can feel it beating! Your lungs help you breathe. Breathe in — lungs fill with air. Breathe out — lungs push air out."
        },
        {
          "id": "pre-k-general-science-101-l07-c3",
          "title": "Brain and Senses",
          "content": "Your brain is the boss of your body! It tells your muscles to move, helps you think, and lets you feel emotions. Your five senses — sight, hearing, smell, taste, and touch — send messages to your brain."
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l07-f1",
          "front": "Number of bones in the human body (around)",
          "back": "206"
        },
        {
          "id": "pre-k-general-science-101-l07-f2",
          "front": "Muscle that pumps blood all through your body",
          "back": "Heart"
        },
        {
          "id": "pre-k-general-science-101-l07-f3",
          "front": "Organs that help you breathe",
          "back": "Lungs"
        },
        {
          "id": "pre-k-general-science-101-l07-f4",
          "front": "The boss of your body",
          "back": "Brain"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l07-q1",
          "text": "What holds your body up and protects your organs?",
          "options": [
            {
              "id": "a",
              "text": "Bones"
            },
            {
              "id": "b",
              "text": "Lungs"
            },
            {
              "id": "c",
              "text": "Eyes"
            },
            {
              "id": "d",
              "text": "Skin"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Your skeleton of bones holds you up and protects you!"
        },
        {
          "id": "pre-k-general-science-101-l07-q2",
          "text": "Your heart is a special",
          "options": [
            {
              "id": "a",
              "text": "Muscle"
            },
            {
              "id": "b",
              "text": "Bone"
            },
            {
              "id": "c",
              "text": "Lung"
            },
            {
              "id": "d",
              "text": "Nerve"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Your heart is a powerful muscle that pumps blood!"
        },
        {
          "id": "pre-k-general-science-101-l07-q3",
          "text": "How many senses do we have?",
          "options": [
            {
              "id": "a",
              "text": "5"
            },
            {
              "id": "b",
              "text": "3"
            },
            {
              "id": "c",
              "text": "10"
            },
            {
              "id": "d",
              "text": "2"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Sight, hearing, smell, taste, and touch — that's 5!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l07-act1",
          "type": "drawing_canvas",
          "title": "Body map",
          "description": "Lie down on a big piece of paper and have someone trace your outline. Draw and label your bones, heart, lungs, and brain inside the outline."
        }
      ]
    },
    {
      "id": "pre-k-general-science-101-l08",
      "title": "Final Science Assessment",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "pre-k-general-science-101-l08-c1",
          "title": "Matter and Forces Review",
          "content": "Solids, liquids, and gases are the three states of matter. Forces like push, pull, gravity, and friction move and stop objects."
        },
        {
          "id": "pre-k-general-science-101-l08-c2",
          "title": "Earth and Life Review",
          "content": "The water cycle goes round and round: evaporation, condensation, precipitation. Animals live in habitats that give them food, water, and shelter."
        },
        {
          "id": "pre-k-general-science-101-l08-c3",
          "title": "Body Review",
          "content": "Your skeleton has 206 bones. Your heart pumps blood. Your lungs breathe air. Your brain controls everything. Your five senses help you explore the world!"
        }
      ],
      "flashcards": [
        {
          "id": "pre-k-general-science-101-l08-f1",
          "front": "Water turning to vapor",
          "back": "Evaporation"
        },
        {
          "id": "pre-k-general-science-101-l08-f2",
          "front": "A place where an animal lives",
          "back": "Habitat"
        },
        {
          "id": "pre-k-general-science-101-l08-f3",
          "front": "Muscle that pumps blood",
          "back": "Heart"
        },
        {
          "id": "pre-k-general-science-101-l08-f4",
          "front": "Force that pulls you down",
          "back": "Gravity"
        }
      ],
      "questions": [
        {
          "id": "pre-k-general-science-101-l08-q1",
          "text": "Steam rising from a pot is an example of",
          "options": [
            {
              "id": "a",
              "text": "Evaporation"
            },
            {
              "id": "b",
              "text": "Precipitation"
            },
            {
              "id": "c",
              "text": "Friction"
            },
            {
              "id": "d",
              "text": "A lever"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Hot water turns to steam — liquid becomes gas!"
        },
        {
          "id": "pre-k-general-science-101-l08-q2",
          "text": "A dolphin's habitat is the",
          "options": [
            {
              "id": "a",
              "text": "Ocean"
            },
            {
              "id": "b",
              "text": "Desert"
            },
            {
              "id": "c",
              "text": "Forest"
            },
            {
              "id": "d",
              "text": "Arctic"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Dolphins swim and find food in the ocean!"
        },
        {
          "id": "pre-k-general-science-101-l08-q3",
          "text": "Your brain is",
          "options": [
            {
              "id": "a",
              "text": "The boss of your body"
            },
            {
              "id": "b",
              "text": "A bone"
            },
            {
              "id": "c",
              "text": "A lung"
            },
            {
              "id": "d",
              "text": "A habitat"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Your brain controls thinking, moving, and feeling!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "pre-k-general-science-101-l08-act1",
          "type": "drawing_canvas",
          "title": "Science poster",
          "description": "Make a poster with sections for Matter, Forces, Water Cycle, Habitats, and the Human Body. Draw one picture in each section and explain it to a grown-up."
        }
      ]
    }
  ]
};
