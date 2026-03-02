import type { LearningModule } from "@/lib/modules/types";

export const PreKGeography101Module: LearningModule = {
  "id": "pre-k-geography-101",
  "title": "Pre-K My World Around Me",
  "description": "A fun geography adventure for children ages 3-5. Explore your home, neighborhood, land and water, maps, weather, and the seven continents — discovering the wonderful world all around you!",
  "subject": "Geography",
  "tags": [
    "pre-k",
    "curriculum",
    "interactive"
  ],
  "minAge": 3,
  "maxAge": 5,
  "version": "4.0.0",
  "difficultyBand": "beginner",
  "localeSupport": [
    "en",
    "es"
  ],
  "thumbnail": "/placeholders/lesson-robot.svg",
  "learningObjectives": [
    "Name rooms in a home and who lives in each one",
    "Describe places in a neighborhood: school, store, park, library",
    "Tell the difference between land and water",
    "Read a simple picture map with a key",
    "Describe hot and cold weather and what to wear",
    "Name the seven continents and one fact about each",
    "Sort geographical features into land and water groups"
  ],
  "lessons": [
    {
      "id": "prek-geography-l01",
      "title": "My Home",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Name four rooms in a home: kitchen, bedroom, bathroom, living room",
        "Tell what people do in each room",
        "Describe what makes a home feel safe and cozy"
      ],
      "chunks": [
        {
          "id": "prek-geography-l01-c1",
          "title": "Kitchen and Bedroom",
          "content": "The kitchen is where the family makes yummy food like mac and cheese 🧀. The bedroom has a cozy bed where you dream about flying to the moon!"
        },
        {
          "id": "prek-geography-l01-c2",
          "title": "Bathroom and Living Room",
          "content": "The bathroom has a tub for splash time and a sink to brush your sparkly teeth! The living room is where the whole family sits together to read stories or play games. 🛋️"
        },
        {
          "id": "prek-geography-l01-c3",
          "title": "Home Sweet Home",
          "content": "Different families live in different homes — apartments, houses, or even boats! What matters most is the love inside. Home is wherever your family is! 🏠"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l01-f1",
          "front": "Where do you cook food?",
          "back": "Kitchen! 🍳"
        },
        {
          "id": "prek-geography-l01-f2",
          "front": "Where do you sleep?",
          "back": "Bedroom! 🛏️"
        },
        {
          "id": "prek-geography-l01-f3",
          "front": "Where do you brush your teeth?",
          "back": "Bathroom! 🪥"
        },
        {
          "id": "prek-geography-l01-f4",
          "front": "Where does the family play together?",
          "back": "Living room! 🛋️"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l01-q1",
          "text": "Where does the family cook food?",
          "options": [
            {
              "id": "a",
              "text": "Kitchen"
            },
            {
              "id": "b",
              "text": "Bedroom"
            },
            {
              "id": "c",
              "text": "Bathroom"
            },
            {
              "id": "d",
              "text": "Garage"
            }
          ],
          "correctOptionId": "a",
          "explanation": "We cook food in the kitchen!"
        },
        {
          "id": "prek-geography-l01-q2",
          "text": "Where do you sleep at night?",
          "options": [
            {
              "id": "a",
              "text": "Bedroom"
            },
            {
              "id": "b",
              "text": "Kitchen"
            },
            {
              "id": "c",
              "text": "Living room"
            },
            {
              "id": "d",
              "text": "Backyard"
            }
          ],
          "correctOptionId": "a",
          "explanation": "We sleep in the bedroom!"
        },
        {
          "id": "prek-geography-l01-q3",
          "text": "Where do you brush your teeth?",
          "options": [
            {
              "id": "a",
              "text": "Bathroom"
            },
            {
              "id": "b",
              "text": "Bedroom"
            },
            {
              "id": "c",
              "text": "Kitchen"
            },
            {
              "id": "d",
              "text": "Living room"
            }
          ],
          "correctOptionId": "a",
          "explanation": "We brush teeth in the bathroom!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l01-act1",
          "type": "drawing_canvas",
          "title": "My Home Tour",
          "description": "Walk through your home with a grown-up. Visit each room, name it, and say one thing you do there. Then draw your favorite room!"
        }
      ],
      "learningAids": [
        {
          "id": "prek-geography-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "prek-geography-l02",
      "title": "My Neighborhood",
      "type": "interactive",
      "duration": 8,
      "objectives": [
        "Name five places in a neighborhood: school, store, park, library, fire station",
        "Describe what happens at each place",
        "Understand that neighbors help each other"
      ],
      "chunks": [
        {
          "id": "prek-geography-l02-c1",
          "title": "School and Store",
          "content": "School is where you learn ABCs and make new friends! The store has shelves full of food and treats — you pick out apples 🍎 and put them in the cart."
        },
        {
          "id": "prek-geography-l02-c2",
          "title": "Park and Library",
          "content": "The park has swings, slides, and green grass for running! 🌳 The library is a quiet place full of picture books you can borrow for free — like a book treasure chest!"
        },
        {
          "id": "prek-geography-l02-c3",
          "title": "Fire Station",
          "content": "The fire station has big red trucks and brave firefighters who keep everyone safe. They wear cool helmets and slide down a pole! 🚒"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l02-f1",
          "front": "Where do you learn ABCs?",
          "back": "School! 🏫"
        },
        {
          "id": "prek-geography-l02-f2",
          "front": "Where do you buy apples?",
          "back": "Store! 🏪"
        },
        {
          "id": "prek-geography-l02-f3",
          "front": "Where are the swings?",
          "back": "Park! 🌳"
        },
        {
          "id": "prek-geography-l02-f4",
          "front": "Where do you borrow books for free?",
          "back": "Library! 📚"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l02-q1",
          "text": "Where do you learn ABCs and make friends?",
          "options": [
            {
              "id": "a",
              "text": "School"
            },
            {
              "id": "b",
              "text": "Store"
            },
            {
              "id": "c",
              "text": "Fire station"
            },
            {
              "id": "d",
              "text": "Park"
            }
          ],
          "correctOptionId": "a",
          "explanation": "School is where we learn!"
        },
        {
          "id": "prek-geography-l02-q2",
          "text": "Where are the swings and slides?",
          "options": [
            {
              "id": "a",
              "text": "Park"
            },
            {
              "id": "b",
              "text": "Library"
            },
            {
              "id": "c",
              "text": "Store"
            },
            {
              "id": "d",
              "text": "School"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Swings are at the park!"
        },
        {
          "id": "prek-geography-l02-q3",
          "text": "Where can you borrow books for free?",
          "options": [
            {
              "id": "a",
              "text": "Library"
            },
            {
              "id": "b",
              "text": "Fire station"
            },
            {
              "id": "c",
              "text": "Park"
            },
            {
              "id": "d",
              "text": "Store"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Libraries lend books for free!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l02-act1",
          "type": "matching_pairs",
          "title": "Neighborhood Walk",
          "description": "Take a walk with a grown-up in your neighborhood. Point to the school, store, park, or library. Wave to a neighbor and say hello!"
        }
      ],
      "learningAids": [
        {
          "id": "prek-geography-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "prek-geography-l03",
      "title": "Land and Water",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Tell the difference between land and water",
        "Name three land features: mountain, hill, valley",
        "Name three water features: ocean, river, lake"
      ],
      "chunks": [
        {
          "id": "prek-geography-l03-c1",
          "title": "Land Features",
          "content": "Land is the solid ground where we walk and play. A mountain is super tall and touches the clouds! ⛰️ A hill is a small mountain, and a valley is the low ground between two hills."
        },
        {
          "id": "prek-geography-l03-c2",
          "title": "Water Features",
          "content": "An ocean is so big you can't see the other side — it is full of saltwater and fish! 🌊 A river flows like a long twisty snake, and a lake is water with land all around it like a big puddle."
        },
        {
          "id": "prek-geography-l03-c3",
          "title": "Land and Water Together",
          "content": "Our world has both land and water — and they are best friends! Fish live in water, and rabbits live on land. Some animals, like ducks, love both! 🦆"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l03-f1",
          "front": "What is super tall and touches the clouds?",
          "back": "Mountain! ⛰️"
        },
        {
          "id": "prek-geography-l03-f2",
          "front": "What is a giant body of saltwater?",
          "back": "Ocean! 🌊"
        },
        {
          "id": "prek-geography-l03-f3",
          "front": "What flows like a long twisty snake?",
          "back": "River! 🏞️"
        },
        {
          "id": "prek-geography-l03-f4",
          "front": "What is water with land all around it?",
          "back": "Lake!"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l03-q1",
          "text": "What is super tall and touches the clouds?",
          "options": [
            {
              "id": "a",
              "text": "Mountain"
            },
            {
              "id": "b",
              "text": "Lake"
            },
            {
              "id": "c",
              "text": "River"
            },
            {
              "id": "d",
              "text": "Valley"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Mountains are super tall!"
        },
        {
          "id": "prek-geography-l03-q2",
          "text": "What is the giant body of saltwater?",
          "options": [
            {
              "id": "a",
              "text": "Ocean"
            },
            {
              "id": "b",
              "text": "Lake"
            },
            {
              "id": "c",
              "text": "River"
            },
            {
              "id": "d",
              "text": "Hill"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Oceans are huge and salty!"
        },
        {
          "id": "prek-geography-l03-q3",
          "text": "What flows like a long twisty snake?",
          "options": [
            {
              "id": "a",
              "text": "River"
            },
            {
              "id": "b",
              "text": "Mountain"
            },
            {
              "id": "c",
              "text": "Valley"
            },
            {
              "id": "d",
              "text": "Ocean"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Rivers flow like snakes!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l03-act1",
          "type": "sorting_buckets",
          "title": "Land or Water Sort",
          "description": "Look at pictures of mountains, oceans, rivers, and hills. Sort them into two piles: LAND and WATER. How fast can you do it?"
        }
      ],
      "learningAids": [
        {
          "id": "prek-geography-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "prek-geography-l04",
      "title": "Geography Checkpoint",
      "type": "quiz",
      "duration": 5,
      "objectives": [
        "Review homes, neighborhoods, and land versus water",
        "Match places with what you do there"
      ],
      "chunks": [
        {
          "id": "prek-geography-l04-c1",
          "title": "Home Review",
          "content": "You live in a home with rooms like a kitchen, bedroom, bathroom, and living room!"
        },
        {
          "id": "prek-geography-l04-c2",
          "title": "Neighborhood Review",
          "content": "Schools, stores, parks, libraries, and fire stations are all around your neighborhood."
        },
        {
          "id": "prek-geography-l04-c3",
          "title": "Land and Water Review",
          "content": "Our world has tall mountains, flowing rivers, big oceans, and cozy valleys."
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l04-f1",
          "front": "Where do you cook?",
          "back": "Kitchen! 🍳"
        },
        {
          "id": "prek-geography-l04-f2",
          "front": "Where do you borrow books?",
          "back": "Library! 📚"
        },
        {
          "id": "prek-geography-l04-f3",
          "front": "What is super tall?",
          "back": "Mountain! ⛰️"
        },
        {
          "id": "prek-geography-l04-f4",
          "front": "What is salty and huge?",
          "back": "Ocean! 🌊"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l04-q1",
          "text": "Where does the family cook food?",
          "options": [
            {
              "id": "a",
              "text": "Kitchen"
            },
            {
              "id": "b",
              "text": "Park"
            },
            {
              "id": "c",
              "text": "Ocean"
            },
            {
              "id": "d",
              "text": "Library"
            }
          ],
          "correctOptionId": "a",
          "explanation": "We cook in the kitchen!"
        },
        {
          "id": "prek-geography-l04-q2",
          "text": "Where are the swings and slides?",
          "options": [
            {
              "id": "a",
              "text": "Park"
            },
            {
              "id": "b",
              "text": "Mountain"
            },
            {
              "id": "c",
              "text": "Bedroom"
            },
            {
              "id": "d",
              "text": "River"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Swings are at the park!"
        },
        {
          "id": "prek-geography-l04-q3",
          "text": "What is the giant body of saltwater?",
          "options": [
            {
              "id": "a",
              "text": "Ocean"
            },
            {
              "id": "b",
              "text": "Kitchen"
            },
            {
              "id": "c",
              "text": "School"
            },
            {
              "id": "d",
              "text": "Hill"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Oceans are big and salty!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l04-act1",
          "type": "sorting_buckets",
          "title": "Place Match Game",
          "description": "Say the name of a place. Then tell one thing you do there. Kitchen — cook! Park — swing! Mountain — climb! Can you go faster?"
        }
      ],
      "learningAids": [
        {
          "id": "prek-geography-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "prek-geography-l05",
      "title": "Maps",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Understand that a map is a picture of a place from above",
        "Use a simple key to read a picture map",
        "Follow a simple path on a map to find a treasure"
      ],
      "chunks": [
        {
          "id": "prek-geography-l05-c1",
          "title": "What Is a Map?",
          "content": "A map is like a bird's-eye picture of a place. Imagine you are a bird flying high — you see the playground, the street, and the houses from way up top! 🗺️"
        },
        {
          "id": "prek-geography-l05-c2",
          "title": "Map Key",
          "content": "A key on a map uses tiny pictures to tell you what things are — a star means school, a tree means park, a house means home. The key is like a secret code!"
        },
        {
          "id": "prek-geography-l05-c3",
          "title": "Following a Path",
          "content": "Drag your finger along the path from the house to the park. Turn left at the store, turn right at the tree, and you found the treasure! 🎉"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l05-f1",
          "front": "What is a bird's-eye picture of a place?",
          "back": "Map! 🗺️"
        },
        {
          "id": "prek-geography-l05-f2",
          "front": "What tells you what the pictures on a map mean?",
          "back": "Key!"
        },
        {
          "id": "prek-geography-l05-f3",
          "front": "What shape might mean 'school' on a map?",
          "back": "Star! ⭐"
        },
        {
          "id": "prek-geography-l05-f4",
          "front": "What do you follow on a map?",
          "back": "Path!"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l05-q1",
          "text": "What is a bird's-eye picture of a place?",
          "options": [
            {
              "id": "a",
              "text": "Map"
            },
            {
              "id": "b",
              "text": "Book"
            },
            {
              "id": "c",
              "text": "Song"
            },
            {
              "id": "d",
              "text": "Clock"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Maps are pictures from above!"
        },
        {
          "id": "prek-geography-l05-q2",
          "text": "What tells you what the pictures on a map mean?",
          "options": [
            {
              "id": "a",
              "text": "Key"
            },
            {
              "id": "b",
              "text": "Lock"
            },
            {
              "id": "c",
              "text": "Door"
            },
            {
              "id": "d",
              "text": "Window"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A key explains the map symbols!"
        },
        {
          "id": "prek-geography-l05-q3",
          "text": "What do you follow on a map to get somewhere?",
          "options": [
            {
              "id": "a",
              "text": "Path"
            },
            {
              "id": "b",
              "text": "Clouds"
            },
            {
              "id": "c",
              "text": "Stars"
            },
            {
              "id": "d",
              "text": "Food"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Follow the path on a map!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l05-act1",
          "type": "drawing_canvas",
          "title": "Draw Your Room Map",
          "description": "Pretend you are a bird flying above your bedroom. Draw where the bed, door, and toys are. Add a key with tiny pictures!"
        }
      ]
    },
    {
      "id": "prek-geography-l06",
      "title": "Hot and Cold Places",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Tell the difference between hot places and cold places",
        "Name animals that live in each: camel (hot), penguin (cold)",
        "Choose the right clothing for hot and cold weather"
      ],
      "chunks": [
        {
          "id": "prek-geography-l06-c1",
          "title": "Hot Places",
          "content": "Deserts are super hot and sandy — camels live there and store water in their humps. In the jungle it is warm and rainy all the time with bright parrots and monkeys! ☀️"
        },
        {
          "id": "prek-geography-l06-c2",
          "title": "Cold Places",
          "content": "The North Pole is freezing cold with snow everywhere! Penguins waddle on the ice and polar bears have thick fur like a warm coat. Brrr! ❄️"
        },
        {
          "id": "prek-geography-l06-c3",
          "title": "What to Wear",
          "content": "In hot weather wear shorts and sunscreen. In cold weather bundle up with a coat, hat, and mittens. Dressing right keeps you comfy! 🧤"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l06-f1",
          "front": "What animal lives in the hot desert?",
          "back": "Camel! 🐪"
        },
        {
          "id": "prek-geography-l06-f2",
          "front": "What animal waddles on cold ice?",
          "back": "Penguin! 🐧"
        },
        {
          "id": "prek-geography-l06-f3",
          "front": "What do you wear in hot weather?",
          "back": "Shorts and sunscreen! ☀️"
        },
        {
          "id": "prek-geography-l06-f4",
          "front": "What do you wear in cold weather?",
          "back": "Coat, hat, and mittens! 🧤"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l06-q1",
          "text": "What animal lives in the hot sandy desert?",
          "options": [
            {
              "id": "a",
              "text": "Camel"
            },
            {
              "id": "b",
              "text": "Penguin"
            },
            {
              "id": "c",
              "text": "Polar bear"
            },
            {
              "id": "d",
              "text": "Seal"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Camels live in hot deserts!"
        },
        {
          "id": "prek-geography-l06-q2",
          "text": "What animal waddles on cold ice?",
          "options": [
            {
              "id": "a",
              "text": "Penguin"
            },
            {
              "id": "b",
              "text": "Camel"
            },
            {
              "id": "c",
              "text": "Monkey"
            },
            {
              "id": "d",
              "text": "Parrot"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Penguins waddle on ice!"
        },
        {
          "id": "prek-geography-l06-q3",
          "text": "What should you wear on a cold snowy day?",
          "options": [
            {
              "id": "a",
              "text": "Coat, hat, and mittens"
            },
            {
              "id": "b",
              "text": "Shorts and flip flops"
            },
            {
              "id": "c",
              "text": "Swimsuit"
            },
            {
              "id": "d",
              "text": "Just socks"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Bundle up when it is cold!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l06-act1",
          "type": "sorting_buckets",
          "title": "Hot or Cold?",
          "description": "Look at pictures of deserts, ice, jungles, and snow. Sort each picture into HOT or COLD. Then pick the right outfit for each!"
        }
      ]
    },
    {
      "id": "prek-geography-l07",
      "title": "Continents",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Know that there are seven continents on Earth",
        "Name the seven continents",
        "Tell one fun fact about each continent"
      ],
      "chunks": [
        {
          "id": "prek-geography-l07-c1",
          "title": "North America, South America, Europe",
          "content": "North America has the Grand Canyon and yummy pizza. South America has the Amazon jungle with colorful toucans! 🌎 Europe has the tall Eiffel Tower in Paris."
        },
        {
          "id": "prek-geography-l07-c2",
          "title": "Africa, Asia, Australia",
          "content": "Africa has lions and the Sahara Desert. Asia has pandas and the Great Wall of China! 🐼 Australia has bouncing kangaroos and cuddly koalas."
        },
        {
          "id": "prek-geography-l07-c3",
          "title": "Antarctica",
          "content": "Antarctica is the coldest place on Earth — it is covered in ice and only penguins live there. No houses, no stores, just ice and snow! 🧊"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l07-f1",
          "front": "Where is the Grand Canyon?",
          "back": "North America! 🌎"
        },
        {
          "id": "prek-geography-l07-f2",
          "front": "Where do pandas live?",
          "back": "Asia! 🐼"
        },
        {
          "id": "prek-geography-l07-f3",
          "front": "Where do kangaroos bounce?",
          "back": "Australia! 🦘"
        },
        {
          "id": "prek-geography-l07-f4",
          "front": "What is the coldest continent?",
          "back": "Antarctica! 🧊"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l07-q1",
          "text": "Where is the Grand Canyon?",
          "options": [
            {
              "id": "a",
              "text": "North America"
            },
            {
              "id": "b",
              "text": "Africa"
            },
            {
              "id": "c",
              "text": "Antarctica"
            },
            {
              "id": "d",
              "text": "Asia"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Grand Canyon is in North America!"
        },
        {
          "id": "prek-geography-l07-q2",
          "text": "Where do pandas live?",
          "options": [
            {
              "id": "a",
              "text": "Asia"
            },
            {
              "id": "b",
              "text": "Australia"
            },
            {
              "id": "c",
              "text": "Europe"
            },
            {
              "id": "d",
              "text": "South America"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Pandas live in Asia!"
        },
        {
          "id": "prek-geography-l07-q3",
          "text": "What is the coldest continent with only penguins?",
          "options": [
            {
              "id": "a",
              "text": "Antarctica"
            },
            {
              "id": "b",
              "text": "Africa"
            },
            {
              "id": "c",
              "text": "Australia"
            },
            {
              "id": "d",
              "text": "Europe"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Antarctica is the coldest!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l07-act1",
          "type": "matching_pairs",
          "title": "Continent Song",
          "description": "Sing the seven continents to the tune of 'Twinkle Twinkle': North America, South America, Europe, Africa, Asia too, Australia, Antarctica — now I know, how about you!"
        }
      ]
    },
    {
      "id": "prek-geography-l08",
      "title": "Geography Celebration Quiz",
      "type": "quiz",
      "duration": 5,
      "objectives": [
        "Review everything about homes, neighborhoods, maps, and continents",
        "Demonstrate knowledge of land versus water features",
        "Show understanding of hot and cold places"
      ],
      "chunks": [
        {
          "id": "prek-geography-l08-c1",
          "title": "Places We Know",
          "content": "You know about homes, neighborhoods, maps, and the big wide world. Amazing explorer! 🗺️"
        },
        {
          "id": "prek-geography-l08-c2",
          "title": "Land and Water",
          "content": "Mountains reach the clouds, rivers twist and turn, oceans are salty and huge."
        },
        {
          "id": "prek-geography-l08-c3",
          "title": "Seven Continents",
          "content": "North America, South America, Europe, Africa, Asia, Australia, Antarctica — seven big chunks of land!"
        }
      ],
      "flashcards": [
        {
          "id": "prek-geography-l08-f1",
          "front": "Where do you cook?",
          "back": "Kitchen! 🍳"
        },
        {
          "id": "prek-geography-l08-f2",
          "front": "What is super tall and touches clouds?",
          "back": "Mountain! ⛰️"
        },
        {
          "id": "prek-geography-l08-f3",
          "front": "How many continents are there?",
          "back": "Seven! 🌍"
        },
        {
          "id": "prek-geography-l08-f4",
          "front": "What animal lives in cold Antarctica?",
          "back": "Penguin! 🐧"
        }
      ],
      "questions": [
        {
          "id": "prek-geography-l08-q1",
          "text": "Where does the family cook food?",
          "options": [
            {
              "id": "a",
              "text": "Kitchen"
            },
            {
              "id": "b",
              "text": "Antarctica"
            },
            {
              "id": "c",
              "text": "Ocean"
            },
            {
              "id": "d",
              "text": "Mountain"
            }
          ],
          "correctOptionId": "a",
          "explanation": "We cook in the kitchen!"
        },
        {
          "id": "prek-geography-l08-q2",
          "text": "What is a bird's-eye picture of a place?",
          "options": [
            {
              "id": "a",
              "text": "Map"
            },
            {
              "id": "b",
              "text": "Song"
            },
            {
              "id": "c",
              "text": "Story"
            },
            {
              "id": "d",
              "text": "Painting"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A map shows places from above!"
        },
        {
          "id": "prek-geography-l08-q3",
          "text": "How many continents are on Earth?",
          "options": [
            {
              "id": "a",
              "text": "Seven"
            },
            {
              "id": "b",
              "text": "Three"
            },
            {
              "id": "c",
              "text": "Twelve"
            },
            {
              "id": "d",
              "text": "One"
            }
          ],
          "correctOptionId": "a",
          "explanation": "There are seven continents!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-geography-l08-act1",
          "type": "drawing_canvas",
          "title": "My World Map",
          "description": "Draw a big circle for the Earth. Color the water blue and the land green. Write the name of one continent you remember. You are a super explorer! 🌍"
        }
      ]
    }
  ]
};
