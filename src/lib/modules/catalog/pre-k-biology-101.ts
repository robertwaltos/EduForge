import type { LearningModule } from "@/lib/modules/types";

export const PreKBiology101Module: LearningModule = {
  "id": "pre-k-biology-101",
  "title": "Pre-K Amazing Animals & Nature",
  "description": "A delightful biology adventure for children ages 3-5. Discover farm animals and their sounds, pets and wild animals, plant parts and how seeds grow, and the tiny world of insects — all through playful stories and hands-on activities.",
  "subject": "Biology",
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
    "Identify common farm animals and the sounds they make",
    "Name pet animals and describe their special features",
    "Recognize wild animals and where they live",
    "Label the four main parts of a plant: roots, stem, leaves, flower",
    "Describe what seeds need to grow: soil, water, sunlight",
    "Name common insects and explain what makes them special",
    "Sort living things into groups: farm, pet, wild, plant, insect"
  ],
  "lessons": [
    {
      "id": "prek-biology-l01",
      "title": "Farm Animals",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Name five farm animals: cow, pig, chicken, horse, sheep",
        "Match each animal to the sound it makes",
        "Describe one fun fact about each animal"
      ],
      "chunks": [
        {
          "id": "prek-biology-l01-c1",
          "title": "Cows and Pigs",
          "content": "A cow says 'moo' and gives us yummy milk for cereal 🐮. A pig says 'oink' and loves rolling in mud puddles to stay cool on hot days — their tails are curly like a spring!"
        },
        {
          "id": "prek-biology-l01-c2",
          "title": "Chickens and Horses",
          "content": "A chicken says 'cluck' and lays a brand-new egg every single day! 🐔 A horse says 'neigh' and can run super fast like the wind, and they even sleep standing up on their four long legs!"
        },
        {
          "id": "prek-biology-l01-c3",
          "title": "Sheep",
          "content": "A sheep says 'baa' and has super fluffy wool that keeps them warm. We use their wool to make cozy sweaters and socks! 🐑"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l01-f1",
          "front": "What animal says 'moo' and gives milk?",
          "back": "Cow! 🐮"
        },
        {
          "id": "prek-biology-l01-f2",
          "front": "What animal has a curly tail and rolls in mud?",
          "back": "Pig! 🐷"
        },
        {
          "id": "prek-biology-l01-f3",
          "front": "What animal lays an egg every day?",
          "back": "Chicken! 🐔"
        },
        {
          "id": "prek-biology-l01-f4",
          "front": "What animal says 'baa' and gives us wool?",
          "back": "Sheep! 🐑"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l01-q1",
          "text": "Which animal says 'moo' and gives us milk?",
          "options": [
            {
              "id": "a",
              "text": "Cow"
            },
            {
              "id": "b",
              "text": "Pig"
            },
            {
              "id": "c",
              "text": "Chicken"
            },
            {
              "id": "d",
              "text": "Horse"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Cows say 'moo' and give us milk!"
        },
        {
          "id": "prek-biology-l01-q2",
          "text": "Which animal lays an egg every day?",
          "options": [
            {
              "id": "a",
              "text": "Chicken"
            },
            {
              "id": "b",
              "text": "Cow"
            },
            {
              "id": "c",
              "text": "Sheep"
            },
            {
              "id": "d",
              "text": "Pig"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Chickens lay an egg every day!"
        },
        {
          "id": "prek-biology-l01-q3",
          "text": "Which animal has a curly tail and loves mud?",
          "options": [
            {
              "id": "a",
              "text": "Pig"
            },
            {
              "id": "b",
              "text": "Horse"
            },
            {
              "id": "c",
              "text": "Sheep"
            },
            {
              "id": "d",
              "text": "Cow"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Pigs have curly tails and roll in mud!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l01-act1",
          "type": "sorting_buckets",
          "title": "Farm Sound Safari",
          "description": "Listen to farm animal sounds on a tablet or go to a petting zoo. Try to copy each sound and count how many different animals you hear!"
        }
      ],
      "learningAids": [
        {
          "id": "prek-biology-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "prek-biology-l02",
      "title": "Pet Animals",
      "type": "interactive",
      "duration": 8,
      "objectives": [
        "Name five common pets: dog, cat, fish, hamster, rabbit",
        "Describe what makes each pet special",
        "Tell how pets move and what they eat"
      ],
      "chunks": [
        {
          "id": "prek-biology-l02-c1",
          "title": "Dogs and Cats",
          "content": "A dog says 'woof' and wags its tail when happy. A cat says 'meow' and purrs like a tiny motor when you pet it softly 🐱."
        },
        {
          "id": "prek-biology-l02-c2",
          "title": "Fish and Hamsters",
          "content": "Fish swim in circles and have no legs — they breathe underwater with gills! 🐟 A hamster stuffs food in its cheeks like little balloons and runs on a wheel all night."
        },
        {
          "id": "prek-biology-l02-c3",
          "title": "Rabbits",
          "content": "A rabbit hops on big back legs and has super long ears to hear everything. They love munching crunchy carrots! 🐰"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l02-f1",
          "front": "What pet wags its tail when happy?",
          "back": "Dog! 🐶"
        },
        {
          "id": "prek-biology-l02-f2",
          "front": "What pet purrs like a motor?",
          "back": "Cat! 🐱"
        },
        {
          "id": "prek-biology-l02-f3",
          "front": "What pet swims and has no legs?",
          "back": "Fish! 🐟"
        },
        {
          "id": "prek-biology-l02-f4",
          "front": "What pet hops with long ears?",
          "back": "Rabbit! 🐰"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l02-q1",
          "text": "Which pet wags its tail when it is happy?",
          "options": [
            {
              "id": "a",
              "text": "Dog"
            },
            {
              "id": "b",
              "text": "Fish"
            },
            {
              "id": "c",
              "text": "Hamster"
            },
            {
              "id": "d",
              "text": "Rabbit"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Dogs wag their tails when happy!"
        },
        {
          "id": "prek-biology-l02-q2",
          "text": "Which pet swims underwater with no legs?",
          "options": [
            {
              "id": "a",
              "text": "Fish"
            },
            {
              "id": "b",
              "text": "Cat"
            },
            {
              "id": "c",
              "text": "Dog"
            },
            {
              "id": "d",
              "text": "Hamster"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Fish swim with no legs!"
        },
        {
          "id": "prek-biology-l02-q3",
          "text": "Which pet hops with long ears?",
          "options": [
            {
              "id": "a",
              "text": "Rabbit"
            },
            {
              "id": "b",
              "text": "Hamster"
            },
            {
              "id": "c",
              "text": "Fish"
            },
            {
              "id": "d",
              "text": "Cat"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Rabbits hop with long ears!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l02-act1",
          "type": "matching_pairs",
          "title": "Pet Watching Time",
          "description": "Watch a real pet or a safe pet video. Notice how they move, what sounds they make, and what they like to eat."
        }
      ],
      "learningAids": [
        {
          "id": "prek-biology-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "prek-biology-l03",
      "title": "Wild Animals",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Name five wild animals: lion, elephant, bear, giraffe, monkey",
        "Tell one amazing fact about each animal",
        "Understand that wild animals live in nature, not in homes"
      ],
      "chunks": [
        {
          "id": "prek-biology-l03-c1",
          "title": "Lion and Elephant",
          "content": "A lion roars so loud it can be heard 5 miles away — he is the king of the jungle! 🦁 An elephant uses its long trunk like a hose to drink 2 whole buckets of water at once."
        },
        {
          "id": "prek-biology-l03-c2",
          "title": "Bear and Giraffe",
          "content": "A bear can smell food from 18 miles away and sleeps all winter! 🐻 A giraffe has a tongue 18 inches long — longer than your whole arm — to grab leaves from tall trees!"
        },
        {
          "id": "prek-biology-l03-c3",
          "title": "Monkey",
          "content": "Monkeys swing from tree to tree with their tails and love eating bananas. They have fingerprints just like you! 🐵"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l03-f1",
          "front": "Which animal roars really loud?",
          "back": "Lion! 🦁"
        },
        {
          "id": "prek-biology-l03-f2",
          "front": "Which animal has a super long trunk?",
          "back": "Elephant! 🐘"
        },
        {
          "id": "prek-biology-l03-f3",
          "front": "Which animal has a tongue longer than your arm?",
          "back": "Giraffe! 🦒"
        },
        {
          "id": "prek-biology-l03-f4",
          "front": "Which animal swings with its tail?",
          "back": "Monkey! 🐵"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l03-q1",
          "text": "Which animal roars really loud?",
          "options": [
            {
              "id": "a",
              "text": "Lion"
            },
            {
              "id": "b",
              "text": "Bear"
            },
            {
              "id": "c",
              "text": "Giraffe"
            },
            {
              "id": "d",
              "text": "Monkey"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Lions roar super loud!"
        },
        {
          "id": "prek-biology-l03-q2",
          "text": "Which animal has a trunk like a hose?",
          "options": [
            {
              "id": "a",
              "text": "Elephant"
            },
            {
              "id": "b",
              "text": "Lion"
            },
            {
              "id": "c",
              "text": "Bear"
            },
            {
              "id": "d",
              "text": "Giraffe"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Elephants have long trunks!"
        },
        {
          "id": "prek-biology-l03-q3",
          "text": "Which animal swings from trees with its tail?",
          "options": [
            {
              "id": "a",
              "text": "Monkey"
            },
            {
              "id": "b",
              "text": "Giraffe"
            },
            {
              "id": "c",
              "text": "Elephant"
            },
            {
              "id": "d",
              "text": "Bear"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Monkeys swing with their tails!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l03-act1",
          "type": "sorting_buckets",
          "title": "Wild Animal Safari",
          "description": "Look at picture books or safe zoo videos. Pick your favorite wild animal and roar, trumpet, or swing like it!"
        }
      ],
      "learningAids": [
        {
          "id": "prek-biology-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "prek-biology-l04",
      "title": "Animal Checkpoint",
      "type": "quiz",
      "duration": 5,
      "objectives": [
        "Review farm, pet, and wild animals",
        "Match animals to their sounds and features"
      ],
      "chunks": [
        {
          "id": "prek-biology-l04-c1",
          "title": "Farm Animals Review",
          "content": "Cows moo and give milk, pigs oink and roll in mud, chickens lay eggs every day!"
        },
        {
          "id": "prek-biology-l04-c2",
          "title": "Pet Animals Review",
          "content": "Dogs wag tails, cats purr, fish swim, hamsters run on wheels, rabbits hop with big ears."
        },
        {
          "id": "prek-biology-l04-c3",
          "title": "Wild Animals Review",
          "content": "Lions roar, elephants spray water, giraffes have long tongues, monkeys swing from trees!"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l04-f1",
          "front": "Which animal says 'moo'?",
          "back": "Cow! 🐮"
        },
        {
          "id": "prek-biology-l04-f2",
          "front": "Which pet purrs?",
          "back": "Cat! 🐱"
        },
        {
          "id": "prek-biology-l04-f3",
          "front": "Which animal has a long trunk?",
          "back": "Elephant! 🐘"
        },
        {
          "id": "prek-biology-l04-f4",
          "front": "Which animal swings with its tail?",
          "back": "Monkey! 🐵"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l04-q1",
          "text": "Which animal says 'moo'?",
          "options": [
            {
              "id": "a",
              "text": "Cow"
            },
            {
              "id": "b",
              "text": "Dog"
            },
            {
              "id": "c",
              "text": "Lion"
            },
            {
              "id": "d",
              "text": "Rabbit"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Cows say 'moo'!"
        },
        {
          "id": "prek-biology-l04-q2",
          "text": "Which pet purrs when you pet it?",
          "options": [
            {
              "id": "a",
              "text": "Cat"
            },
            {
              "id": "b",
              "text": "Fish"
            },
            {
              "id": "c",
              "text": "Horse"
            },
            {
              "id": "d",
              "text": "Pig"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Cats purr when happy!"
        },
        {
          "id": "prek-biology-l04-q3",
          "text": "Which wild animal has a long trunk?",
          "options": [
            {
              "id": "a",
              "text": "Elephant"
            },
            {
              "id": "b",
              "text": "Giraffe"
            },
            {
              "id": "c",
              "text": "Monkey"
            },
            {
              "id": "d",
              "text": "Bear"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Elephants have long trunks!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l04-act1",
          "type": "sorting_buckets",
          "title": "Animal Sound Parade",
          "description": "March around the room and make the sound of every animal we learned. Who can make the loudest lion roar?"
        }
      ],
      "learningAids": [
        {
          "id": "prek-biology-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "prek-biology-l05",
      "title": "Plant Parts",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Name the four main parts of a plant: roots, stem, leaves, flower",
        "Describe what each part does for the plant",
        "Understand that flowers make seeds for new plants"
      ],
      "chunks": [
        {
          "id": "prek-biology-l05-c1",
          "title": "Roots and Stem",
          "content": "Roots are like tiny straws that drink water from the dirt and hold the plant tight so it doesn't fall over. The stem is like a tall drinking straw that carries water up to the leaves!"
        },
        {
          "id": "prek-biology-l05-c2",
          "title": "Leaves",
          "content": "Leaves are the plant's kitchen — they use sunlight to make food for the whole plant. They turn green because they love the sun so much! 🌿"
        },
        {
          "id": "prek-biology-l05-c3",
          "title": "Flowers",
          "content": "Flowers are the prettiest part and smell sweet to call bees for a visit. After the flower, a seed grows so a new baby plant can be born! 🌸"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l05-f1",
          "front": "What part drinks water like a straw?",
          "back": "Roots! 🌱"
        },
        {
          "id": "prek-biology-l05-f2",
          "front": "What part carries water up high?",
          "back": "Stem!"
        },
        {
          "id": "prek-biology-l05-f3",
          "front": "What part makes food with sunlight?",
          "back": "Leaves! 🌿"
        },
        {
          "id": "prek-biology-l05-f4",
          "front": "What pretty part makes seeds?",
          "back": "Flower! 🌸"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l05-q1",
          "text": "What part of the plant drinks water from the dirt?",
          "options": [
            {
              "id": "a",
              "text": "Roots"
            },
            {
              "id": "b",
              "text": "Flower"
            },
            {
              "id": "c",
              "text": "Leaf"
            },
            {
              "id": "d",
              "text": "Stem"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Roots drink water like straws!"
        },
        {
          "id": "prek-biology-l05-q2",
          "text": "What part makes food with sunlight?",
          "options": [
            {
              "id": "a",
              "text": "Leaves"
            },
            {
              "id": "b",
              "text": "Roots"
            },
            {
              "id": "c",
              "text": "Stem"
            },
            {
              "id": "d",
              "text": "Flower"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Leaves make food with sunlight!"
        },
        {
          "id": "prek-biology-l05-q3",
          "text": "What pretty part makes new seeds?",
          "options": [
            {
              "id": "a",
              "text": "Flower"
            },
            {
              "id": "b",
              "text": "Stem"
            },
            {
              "id": "c",
              "text": "Roots"
            },
            {
              "id": "d",
              "text": "Leaf"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Flowers make new seeds!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l05-act1",
          "type": "matching_pairs",
          "title": "Plant Part Hunt",
          "description": "Go outside or look at a houseplant. Gently touch the roots (if you pull a weed with adult help), stem, leaf, and flower. Tell what each part does!"
        }
      ]
    },
    {
      "id": "prek-biology-l06",
      "title": "Growing a Seed",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Know the three things a seed needs: soil, water, sunlight",
        "Describe the order of growth: root, then stem, then leaves",
        "Explain why sunshine helps plants grow tall"
      ],
      "chunks": [
        {
          "id": "prek-biology-l06-c1",
          "title": "Soil and Water",
          "content": "Seeds love soft soil like a cozy bed and water like a big drink. Without water the seed stays asleep!"
        },
        {
          "id": "prek-biology-l06-c2",
          "title": "Sunlight",
          "content": "Seeds need sunshine to wake up and grow tall. Put your seed jar in a sunny window and watch the little green sprout say hello!"
        },
        {
          "id": "prek-biology-l06-c3",
          "title": "Watching It Grow",
          "content": "First a tiny white root pops out, then a green stem shoots up, then leaves open like tiny umbrellas. In a few days you have a baby plant!"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l06-f1",
          "front": "What does a seed need to wake up?",
          "back": "Water!"
        },
        {
          "id": "prek-biology-l06-f2",
          "front": "What helps the plant grow tall?",
          "back": "Sunlight! ☀️"
        },
        {
          "id": "prek-biology-l06-f3",
          "front": "What is the soft bed for seeds?",
          "back": "Soil!"
        },
        {
          "id": "prek-biology-l06-f4",
          "front": "What comes out first — root or leaf?",
          "back": "Root!"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l06-q1",
          "text": "What does a seed need to wake up?",
          "options": [
            {
              "id": "a",
              "text": "Water"
            },
            {
              "id": "b",
              "text": "Dark closet"
            },
            {
              "id": "c",
              "text": "Candy"
            },
            {
              "id": "d",
              "text": "Ice"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Seeds need water to wake up!"
        },
        {
          "id": "prek-biology-l06-q2",
          "text": "What helps the plant grow tall and green?",
          "options": [
            {
              "id": "a",
              "text": "Sunlight"
            },
            {
              "id": "b",
              "text": "No water"
            },
            {
              "id": "c",
              "text": "Dark room"
            },
            {
              "id": "d",
              "text": "Cold fridge"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Sunlight helps plants grow tall!"
        },
        {
          "id": "prek-biology-l06-q3",
          "text": "What is the soft cozy bed for seeds?",
          "options": [
            {
              "id": "a",
              "text": "Soil"
            },
            {
              "id": "b",
              "text": "Rock"
            },
            {
              "id": "c",
              "text": "Paper"
            },
            {
              "id": "d",
              "text": "Toy box"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Seeds love soft soil!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l06-act1",
          "type": "virtual_manipulative",
          "title": "Grow a Bean in a Jar",
          "description": "Clear jar, paper towel, dry bean, water. Roll the bean in wet paper towel against the jar side, add water, put in sunny window. Check every day and draw what you see!"
        }
      ]
    },
    {
      "id": "prek-biology-l07",
      "title": "Insects",
      "type": "video",
      "duration": 8,
      "objectives": [
        "Name four common insects: ant, bee, butterfly, ladybug",
        "Tell one special thing each insect can do",
        "Understand that a butterfly starts as a caterpillar"
      ],
      "chunks": [
        {
          "id": "prek-biology-l07-c1",
          "title": "Ants and Bees",
          "content": "Ants are tiny but super strong — one ant can carry 50 times its own weight! Bees buzz and make sweet honey in their hive. 🐝"
        },
        {
          "id": "prek-biology-l07-c2",
          "title": "Butterflies",
          "content": "A butterfly starts as a tiny egg, becomes a hungry caterpillar, then sleeps in a chrysalis and wakes up with beautiful wings! 🦋"
        },
        {
          "id": "prek-biology-l07-c3",
          "title": "Ladybugs",
          "content": "Ladybugs are red with black spots and eat tiny bad bugs that hurt plants. They are like little garden heroes! 🐞"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l07-f1",
          "front": "Which insect is super strong?",
          "back": "Ant! 🐜"
        },
        {
          "id": "prek-biology-l07-f2",
          "front": "Which insect makes honey?",
          "back": "Bee! 🐝"
        },
        {
          "id": "prek-biology-l07-f3",
          "front": "Which insect changes from caterpillar to wings?",
          "back": "Butterfly! 🦋"
        },
        {
          "id": "prek-biology-l07-f4",
          "front": "Which insect has spots and eats bad bugs?",
          "back": "Ladybug! 🐞"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l07-q1",
          "text": "Which tiny insect is super strong?",
          "options": [
            {
              "id": "a",
              "text": "Ant"
            },
            {
              "id": "b",
              "text": "Butterfly"
            },
            {
              "id": "c",
              "text": "Ladybug"
            },
            {
              "id": "d",
              "text": "Bee"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Ants are super strong!"
        },
        {
          "id": "prek-biology-l07-q2",
          "text": "Which insect makes sweet honey?",
          "options": [
            {
              "id": "a",
              "text": "Bee"
            },
            {
              "id": "b",
              "text": "Ant"
            },
            {
              "id": "c",
              "text": "Ladybug"
            },
            {
              "id": "d",
              "text": "Butterfly"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Bees make honey!"
        },
        {
          "id": "prek-biology-l07-q3",
          "text": "Which insect starts as a caterpillar?",
          "options": [
            {
              "id": "a",
              "text": "Butterfly"
            },
            {
              "id": "b",
              "text": "Bee"
            },
            {
              "id": "c",
              "text": "Ant"
            },
            {
              "id": "d",
              "text": "Ladybug"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Butterflies start as caterpillars!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l07-act1",
          "type": "sorting_buckets",
          "title": "Insect Safari",
          "description": "Go outside on a sunny day with a magnifying glass (adult help). Look under leaves and flowers for ants, bees, or ladybugs. Count how many you find!"
        }
      ]
    },
    {
      "id": "prek-biology-l08",
      "title": "Biology Celebration Quiz",
      "type": "quiz",
      "duration": 5,
      "objectives": [
        "Review everything learned about animals, plants, and insects",
        "Show understanding of farm, pet, and wild animals",
        "Demonstrate knowledge of plant needs and insect facts"
      ],
      "chunks": [
        {
          "id": "prek-biology-l08-c1",
          "title": "All About Animals",
          "content": "Farm, pet, and wild animals make different sounds and do amazing things. You know so many now!"
        },
        {
          "id": "prek-biology-l08-c2",
          "title": "Plants and Growing",
          "content": "Plants have roots, stems, leaves, and flowers. Seeds need soil, water, and sunlight to grow into new plants."
        },
        {
          "id": "prek-biology-l08-c3",
          "title": "Insects",
          "content": "Insects are tiny but do big jobs — ants carry heavy things, bees make honey, butterflies change shape!"
        }
      ],
      "flashcards": [
        {
          "id": "prek-biology-l08-f1",
          "front": "Which animal says 'moo'?",
          "back": "Cow! 🐮"
        },
        {
          "id": "prek-biology-l08-f2",
          "front": "What do plants need to grow?",
          "back": "Sunlight, water, soil! 🌱"
        },
        {
          "id": "prek-biology-l08-f3",
          "front": "Which insect makes honey?",
          "back": "Bee! 🐝"
        },
        {
          "id": "prek-biology-l08-f4",
          "front": "Which animal has a long trunk?",
          "back": "Elephant! 🐘"
        }
      ],
      "questions": [
        {
          "id": "prek-biology-l08-q1",
          "text": "Which animal says 'moo' and gives milk?",
          "options": [
            {
              "id": "a",
              "text": "Cow"
            },
            {
              "id": "b",
              "text": "Lion"
            },
            {
              "id": "c",
              "text": "Rabbit"
            },
            {
              "id": "d",
              "text": "Fish"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Cows say 'moo' and give milk!"
        },
        {
          "id": "prek-biology-l08-q2",
          "text": "What do seeds need to grow into plants?",
          "options": [
            {
              "id": "a",
              "text": "Soil, water, sunlight"
            },
            {
              "id": "b",
              "text": "Candy and toys"
            },
            {
              "id": "c",
              "text": "Ice and snow"
            },
            {
              "id": "d",
              "text": "Dark closet"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Seeds need soil, water, and sunlight!"
        },
        {
          "id": "prek-biology-l08-q3",
          "text": "Which insect changes from caterpillar to beautiful wings?",
          "options": [
            {
              "id": "a",
              "text": "Butterfly"
            },
            {
              "id": "b",
              "text": "Ant"
            },
            {
              "id": "c",
              "text": "Ladybug"
            },
            {
              "id": "d",
              "text": "Bee"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Butterflies change from caterpillars!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "prek-biology-l08-act1",
          "type": "drawing_canvas",
          "title": "Biology Show and Tell",
          "description": "Pick your favorite animal, plant part, or insect from the whole module. Draw it, make its sound, and tell someone what you love about it. You are a wonderful scientist! 🌟"
        }
      ]
    }
  ]
};
