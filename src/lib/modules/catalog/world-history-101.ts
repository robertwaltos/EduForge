import type { LearningModule } from "@/lib/modules/types";

export const WorldHistory101Module: LearningModule = {
  "id": "world-history-101",
  "title": "World History: Civilizations Through Time",
  "description": "Travel through time from ancient Mesopotamia and Egypt to Greece, Rome, the medieval world, and the Renaissance. Discover how civilizations rose, innovated, and shaped the modern world.",
  "subject": "History Worldwide",
  "tags": [
    "history",
    "social-studies",
    "interactive",
    "curriculum"
  ],
  "minAge": 7,
  "maxAge": 18,
  "version": "2.0.0",
  "learningObjectives": [
    "Describe Mesopotamia as the cradle of civilization and its key inventions",
    "Explain the importance of the Nile to ancient Egypt and its cultural achievements",
    "Compare Athenian democracy, Greek philosophy, and the Olympic Games",
    "Analyze the Roman Republic, its engineering, and the fall of Rome",
    "Identify key features of medieval society including feudalism and the Crusades",
    "Understand the Renaissance as a rebirth of art, science, and exploration"
  ],
  "lessons": [
    {
      "id": "world-history-101-l01",
      "title": "Ancient Mesopotamia",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "world-history-101-l01-c1",
          "title": "The Cradle of Civilization",
          "content": "Mesopotamia means 'land between the rivers' — the Tigris and Euphrates in modern-day Iraq. Around 3500 BCE, the Sumerians built some of the world's first cities, including Ur and Uruk. They invented the wheel, the plow, and sailed on the first boats."
        },
        {
          "id": "world-history-101-l01-c2",
          "title": "Cuneiform and Writing",
          "content": "The Sumerians invented cuneiform — one of the earliest writing systems. They pressed a wedge-shaped reed into wet clay tablets to record laws, trade deals, and stories. The Epic of Gilgamesh, written in cuneiform, is one of the oldest stories ever recorded."
        },
        {
          "id": "world-history-101-l01-c3",
          "title": "Hammurabi's Code",
          "content": "King Hammurabi of Babylon created one of the first written law codes around 1754 BCE. It had 282 laws carved on a tall stone pillar for all to see. One famous rule: 'an eye for an eye, a tooth for a tooth.' This idea that laws should be public and fair shaped legal systems for thousands of years."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l01-f1",
          "front": "Region between the Tigris and Euphrates rivers",
          "back": "Mesopotamia"
        },
        {
          "id": "world-history-101-l01-f2",
          "front": "One of the earliest writing systems using wedge-shaped marks",
          "back": "Cuneiform"
        },
        {
          "id": "world-history-101-l01-f3",
          "front": "King who created one of the first written law codes",
          "back": "Hammurabi"
        },
        {
          "id": "world-history-101-l01-f4",
          "front": "Oldest known epic story, written in cuneiform",
          "back": "The Epic of Gilgamesh"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l01-q1",
          "text": "Mesopotamia was located between which two rivers?",
          "options": [
            {
              "id": "a",
              "text": "Tigris and Euphrates"
            },
            {
              "id": "b",
              "text": "Nile and Amazon"
            },
            {
              "id": "c",
              "text": "Mississippi and Ohio"
            },
            {
              "id": "d",
              "text": "Yangtze and Yellow"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Mesopotamia means 'land between the rivers' — Tigris and Euphrates!"
        },
        {
          "id": "world-history-101-l01-q2",
          "text": "The Sumerians invented which writing system?",
          "options": [
            {
              "id": "a",
              "text": "Cuneiform"
            },
            {
              "id": "b",
              "text": "Hieroglyphics"
            },
            {
              "id": "c",
              "text": "The alphabet"
            },
            {
              "id": "d",
              "text": "Braille"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Cuneiform used wedge-shaped marks pressed into clay!"
        },
        {
          "id": "world-history-101-l01-q3",
          "text": "Hammurabi's Code was important because",
          "options": [
            {
              "id": "a",
              "text": "Laws were written down and made public"
            },
            {
              "id": "b",
              "text": "It taught people to read"
            },
            {
              "id": "c",
              "text": "It ended all wars"
            },
            {
              "id": "d",
              "text": "It invented the wheel"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Public, written laws meant fairness and accountability!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l01-act1",
          "type": "project_builder",
          "title": "Clay tablet writing",
          "description": "Flatten a ball of clay or playdough into a tablet. Use a pencil or stick to press wedge-shaped marks like cuneiform. Write your name or a short message. Let it dry and you have your own ancient tablet!"
        }
      ],
      "learningAids": [
        {
          "id": "world-history-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "world-history-101-l02",
      "title": "Ancient Egypt",
      "type": "interactive",
      "duration": 12,
      "chunks": [
        {
          "id": "world-history-101-l02-c1",
          "title": "Gift of the Nile",
          "content": "Ancient Egypt grew along the Nile River in northeast Africa. Each year the Nile flooded, leaving rich black soil for farming. The Greek historian Herodotus called Egypt the 'Gift of the Nile' because without the river the land would be desert."
        },
        {
          "id": "world-history-101-l02-c2",
          "title": "Pharaohs and Pyramids",
          "content": "Pharaohs were Egypt's god-kings. They built massive pyramids as tombs. The Great Pyramid of Giza — built around 2560 BCE — used over 2 million stone blocks. It was the tallest structure on Earth for nearly 4,000 years. King Tutankhamun's tomb was discovered in 1922 with treasures intact."
        },
        {
          "id": "world-history-101-l02-c3",
          "title": "Hieroglyphics and Mummies",
          "content": "Egyptians wrote with hieroglyphics — picture symbols carved on temple walls and written on papyrus. The Rosetta Stone, found in 1799, helped scholars decode hieroglyphics. Egyptians preserved bodies as mummies because they believed in an afterlife where the soul needed its body."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l02-f1",
          "front": "River essential to ancient Egypt's farming",
          "back": "The Nile"
        },
        {
          "id": "world-history-101-l02-f2",
          "front": "Egypt's god-kings",
          "back": "Pharaohs"
        },
        {
          "id": "world-history-101-l02-f3",
          "front": "Picture writing system of ancient Egypt",
          "back": "Hieroglyphics"
        },
        {
          "id": "world-history-101-l02-f4",
          "front": "Stone that helped decode hieroglyphics",
          "back": "Rosetta Stone"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l02-q1",
          "text": "Egypt was called the 'Gift of the Nile' because",
          "options": [
            {
              "id": "a",
              "text": "The Nile's floods left rich soil for farming"
            },
            {
              "id": "b",
              "text": "The Nile was full of gold"
            },
            {
              "id": "c",
              "text": "The Nile had pyramids"
            },
            {
              "id": "d",
              "text": "The Nile was in Europe"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Annual floods deposited fertile soil along the river banks!"
        },
        {
          "id": "world-history-101-l02-q2",
          "text": "The Great Pyramid of Giza used over",
          "options": [
            {
              "id": "a",
              "text": "2 million stone blocks"
            },
            {
              "id": "b",
              "text": "100 bricks"
            },
            {
              "id": "c",
              "text": "500 wooden logs"
            },
            {
              "id": "d",
              "text": "1,000 metal beams"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Over 2 million massive stone blocks were used to build the Great Pyramid!"
        },
        {
          "id": "world-history-101-l02-q3",
          "text": "Egyptians made mummies because they believed",
          "options": [
            {
              "id": "a",
              "text": "The soul needed its body in the afterlife"
            },
            {
              "id": "b",
              "text": "Bodies were art"
            },
            {
              "id": "c",
              "text": "It was required by law"
            },
            {
              "id": "d",
              "text": "It made better fertilizer"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Preservation ensured the soul could return to its body!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l02-act1",
          "type": "drawing_canvas",
          "title": "Hieroglyphic name card",
          "description": "Look up an Egyptian hieroglyphics chart. Write your name using hieroglyphic symbols on a piece of paper made to look like papyrus (stain it with tea bags). Add a cartouche (oval border) around your name like the pharaohs did."
        }
      ],
      "learningAids": [
        {
          "id": "world-history-101-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "world-history-101-l03",
      "title": "Ancient Greece",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "world-history-101-l03-c1",
          "title": "Democracy in Athens",
          "content": "Athens created the world's first democracy around 508 BCE. Citizens (free adult men) could vote on laws directly. A leader named Cleisthenes introduced reforms. Not everyone could vote — women, enslaved people, and foreigners were excluded. But the idea that people should have a voice in government changed the world forever."
        },
        {
          "id": "world-history-101-l03-c2",
          "title": "Greek Philosophy",
          "content": "Greek thinkers asked big questions. Socrates taught by asking questions (the Socratic method). His student Plato wrote about the ideal society in The Republic. Plato's student Aristotle studied science, logic, and politics. These three philosophers shaped Western thought for over 2,000 years."
        },
        {
          "id": "world-history-101-l03-c3",
          "title": "Olympics and Culture",
          "content": "The first Olympic Games were held in Olympia in 776 BCE to honor the god Zeus. Athletes competed in running, wrestling, and chariot racing. Greece also gave us theater (tragedy and comedy), the Parthenon temple, and myths about gods like Zeus, Athena, and Poseidon."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l03-f1",
          "front": "First city to practice democracy",
          "back": "Athens (around 508 BCE)"
        },
        {
          "id": "world-history-101-l03-f2",
          "front": "Teaching by asking questions",
          "back": "The Socratic method"
        },
        {
          "id": "world-history-101-l03-f3",
          "front": "Year the first Olympic Games were held",
          "back": "776 BCE"
        },
        {
          "id": "world-history-101-l03-f4",
          "front": "Chain: Socrates taught ___, who taught Aristotle",
          "back": "Plato"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l03-q1",
          "text": "The first democracy was created in",
          "options": [
            {
              "id": "a",
              "text": "Athens"
            },
            {
              "id": "b",
              "text": "Rome"
            },
            {
              "id": "c",
              "text": "Sparta"
            },
            {
              "id": "d",
              "text": "Egypt"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Athens introduced direct democracy around 508 BCE!"
        },
        {
          "id": "world-history-101-l03-q2",
          "text": "Which philosopher taught by asking questions?",
          "options": [
            {
              "id": "a",
              "text": "Socrates"
            },
            {
              "id": "b",
              "text": "Plato"
            },
            {
              "id": "c",
              "text": "Aristotle"
            },
            {
              "id": "d",
              "text": "Homer"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Socratic method is still used in classrooms today!"
        },
        {
          "id": "world-history-101-l03-q3",
          "text": "The Olympic Games were held to honor",
          "options": [
            {
              "id": "a",
              "text": "Zeus"
            },
            {
              "id": "b",
              "text": "Athena"
            },
            {
              "id": "c",
              "text": "Poseidon"
            },
            {
              "id": "d",
              "text": "Apollo"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Olympics honored Zeus, king of the Greek gods!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l03-act1",
          "type": "project_builder",
          "title": "Classroom Olympics",
          "description": "Organize a mini Olympics with 3-4 events: a short race, a standing long jump, a paper airplane throw (javelin), and a balance challenge. Award olive branch crowns to winners, just like ancient Greece!"
        }
      ],
      "learningAids": [
        {
          "id": "world-history-101-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "world-history-101-l04",
      "title": "Ancient Civilizations Checkpoint",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "world-history-101-l04-c1",
          "title": "Mesopotamia and Egypt Review",
          "content": "Mesopotamia gave us cuneiform, the wheel, and Hammurabi's law code. Egypt built pyramids, wrote in hieroglyphics, and depended on the Nile."
        },
        {
          "id": "world-history-101-l04-c2",
          "title": "Greece Review",
          "content": "Athens invented democracy. Socrates, Plato, and Aristotle shaped philosophy. The Olympics began in 776 BCE."
        },
        {
          "id": "world-history-101-l04-c3",
          "title": "Onward Through History!",
          "content": "You have explored three ancient civilizations. Next: the Roman Empire, the medieval world, and the Renaissance!"
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l04-f1",
          "front": "Writing system pressed into clay",
          "back": "Cuneiform"
        },
        {
          "id": "world-history-101-l04-f2",
          "front": "Egyptian picture writing",
          "back": "Hieroglyphics"
        },
        {
          "id": "world-history-101-l04-f3",
          "front": "Greek word for government by the people",
          "back": "Democracy"
        },
        {
          "id": "world-history-101-l04-f4",
          "front": "Hammurabi's famous principle",
          "back": "An eye for an eye"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l04-q1",
          "text": "Cuneiform was written on",
          "options": [
            {
              "id": "a",
              "text": "Clay tablets"
            },
            {
              "id": "b",
              "text": "Paper"
            },
            {
              "id": "c",
              "text": "Stone walls"
            },
            {
              "id": "d",
              "text": "Bamboo"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Sumerians pressed wedge-shaped marks into wet clay!"
        },
        {
          "id": "world-history-101-l04-q2",
          "text": "The Rosetta Stone helped scholars decode",
          "options": [
            {
              "id": "a",
              "text": "Hieroglyphics"
            },
            {
              "id": "b",
              "text": "Cuneiform"
            },
            {
              "id": "c",
              "text": "Latin"
            },
            {
              "id": "d",
              "text": "Greek"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Rosetta Stone had the same text in three scripts, unlocking hieroglyphics!"
        },
        {
          "id": "world-history-101-l04-q3",
          "text": "Plato was the student of",
          "options": [
            {
              "id": "a",
              "text": "Socrates"
            },
            {
              "id": "b",
              "text": "Aristotle"
            },
            {
              "id": "c",
              "text": "Homer"
            },
            {
              "id": "d",
              "text": "Zeus"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Socrates taught Plato, who then taught Aristotle!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l04-act1",
          "type": "drawing_canvas",
          "title": "Civilization comparison chart",
          "description": "Make a 3-column chart: Mesopotamia, Egypt, Greece. For each, write their river, writing system, famous leader/thinker, and one big invention or idea."
        }
      ],
      "learningAids": [
        {
          "id": "world-history-101-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "world-history-101-l05",
      "title": "Ancient Rome",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "world-history-101-l05-c1",
          "title": "The Roman Republic",
          "content": "Rome began as a small city in Italy around 753 BCE. By 509 BCE, Romans overthrew their king and created a republic — a government where elected officials represent the people. The Senate made laws, and two consuls led the government. Rome's republic inspired the United States Constitution."
        },
        {
          "id": "world-history-101-l05-c2",
          "title": "Roman Engineering",
          "content": "Romans were master builders. They invented concrete, built aqueducts to carry water for miles, and constructed roads that connected their vast empire — some are still used today! The Colosseum in Rome could seat 50,000 people for gladiator fights and public events."
        },
        {
          "id": "world-history-101-l05-c3",
          "title": "Fall of Rome",
          "content": "The Roman Empire grew too large to govern. It split into Western and Eastern halves in 285 CE. The Western Roman Empire fell in 476 CE due to invasions, economic problems, and political instability. The Eastern (Byzantine) Empire lasted nearly 1,000 more years until 1453 CE."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l05-f1",
          "front": "Government where elected officials represent the people",
          "back": "Republic"
        },
        {
          "id": "world-history-101-l05-f2",
          "front": "Roman structure that carried water for miles",
          "back": "Aqueduct"
        },
        {
          "id": "world-history-101-l05-f3",
          "front": "Arena that seated 50,000 in Rome",
          "back": "Colosseum"
        },
        {
          "id": "world-history-101-l05-f4",
          "front": "Year the Western Roman Empire fell",
          "back": "476 CE"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l05-q1",
          "text": "A republic is a government where",
          "options": [
            {
              "id": "a",
              "text": "Elected officials represent the people"
            },
            {
              "id": "b",
              "text": "A king rules alone"
            },
            {
              "id": "c",
              "text": "Everyone votes on every law"
            },
            {
              "id": "d",
              "text": "The military is in charge"
            }
          ],
          "correctOptionId": "a",
          "explanation": "In a republic, citizens elect representatives to govern!"
        },
        {
          "id": "world-history-101-l05-q2",
          "text": "Romans built aqueducts to",
          "options": [
            {
              "id": "a",
              "text": "Carry water across long distances"
            },
            {
              "id": "b",
              "text": "Transport soldiers"
            },
            {
              "id": "c",
              "text": "Store grain"
            },
            {
              "id": "d",
              "text": "Hold gladiator fights"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Aqueducts moved fresh water from mountains to cities!"
        },
        {
          "id": "world-history-101-l05-q3",
          "text": "The Western Roman Empire fell in",
          "options": [
            {
              "id": "a",
              "text": "476 CE"
            },
            {
              "id": "b",
              "text": "753 BCE"
            },
            {
              "id": "c",
              "text": "1453 CE"
            },
            {
              "id": "d",
              "text": "100 CE"
            }
          ],
          "correctOptionId": "a",
          "explanation": "476 CE marks the traditional end of the Western Roman Empire!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l05-act1",
          "type": "project_builder",
          "title": "Aqueduct model",
          "description": "Build an aqueduct model using cardboard tubes, aluminum foil for the water channel, and blocks or books for arches. Test it by pouring a small amount of water through — does it flow all the way?"
        }
      ]
    },
    {
      "id": "world-history-101-l06",
      "title": "The Medieval World",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "world-history-101-l06-c1",
          "title": "Feudalism",
          "content": "After Rome fell, Europe entered the Middle Ages (roughly 500–1500 CE). Feudalism organized society: kings gave land to lords, lords gave land to knights, and serfs (peasants) farmed the land in exchange for protection. Castles were built as fortresses for defense."
        },
        {
          "id": "world-history-101-l06-c2",
          "title": "The Black Death",
          "content": "In 1347, the Black Death (bubonic plague) swept through Europe, killing about one-third of the population — roughly 25 million people. It spread through fleas on rats. The massive death toll changed society: labor became scarce, peasants demanded higher wages, and feudalism began to weaken."
        },
        {
          "id": "world-history-101-l06-c3",
          "title": "The Crusades",
          "content": "The Crusades (1096–1291) were a series of religious wars where European Christians tried to reclaim the Holy Land from Muslim rule. Though ultimately unsuccessful militarily, the Crusades increased trade between Europe and Asia, bringing back spices, silk, and new ideas."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l06-f1",
          "front": "Social system: king → lords → knights → serfs",
          "back": "Feudalism"
        },
        {
          "id": "world-history-101-l06-f2",
          "front": "Plague that killed one-third of Europe in 1347",
          "back": "The Black Death"
        },
        {
          "id": "world-history-101-l06-f3",
          "front": "Religious wars to reclaim the Holy Land (1096–1291)",
          "back": "The Crusades"
        },
        {
          "id": "world-history-101-l06-f4",
          "front": "Medieval time period",
          "back": "About 500–1500 CE"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l06-q1",
          "text": "In feudalism, who farmed the land?",
          "options": [
            {
              "id": "a",
              "text": "Serfs (peasants)"
            },
            {
              "id": "b",
              "text": "Kings"
            },
            {
              "id": "c",
              "text": "Knights"
            },
            {
              "id": "d",
              "text": "Merchants"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Serfs worked the land in exchange for protection!"
        },
        {
          "id": "world-history-101-l06-q2",
          "text": "The Black Death killed approximately",
          "options": [
            {
              "id": "a",
              "text": "One-third of Europe's population"
            },
            {
              "id": "b",
              "text": "Only a few hundred people"
            },
            {
              "id": "c",
              "text": "Everyone in Europe"
            },
            {
              "id": "d",
              "text": "Only kings and queens"
            }
          ],
          "correctOptionId": "a",
          "explanation": "About 25 million people — roughly one in three Europeans!"
        },
        {
          "id": "world-history-101-l06-q3",
          "text": "The Crusades increased",
          "options": [
            {
              "id": "a",
              "text": "Trade between Europe and Asia"
            },
            {
              "id": "b",
              "text": "The number of kings"
            },
            {
              "id": "c",
              "text": "The size of Rome"
            },
            {
              "id": "d",
              "text": "Pyramid building"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Crusaders brought back spices, silk, and new ideas from Asia!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l06-act1",
          "type": "drawing_canvas",
          "title": "Feudalism pyramid diagram",
          "description": "Draw a triangle divided into 4 levels. Label from top to bottom: King, Lords, Knights, Serfs. Write one sentence for each level explaining their role. Add drawings of a crown, castle, sword, and plow."
        }
      ]
    },
    {
      "id": "world-history-101-l07",
      "title": "Renaissance and Age of Exploration",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "world-history-101-l07-c1",
          "title": "The Renaissance",
          "content": "The Renaissance ('rebirth') began in Italy around 1400 and spread across Europe. People rediscovered Greek and Roman ideas about art, science, and philosophy. Leonardo da Vinci painted the Mona Lisa and designed flying machines. Michelangelo painted the Sistine Chapel ceiling and sculpted David."
        },
        {
          "id": "world-history-101-l07-c2",
          "title": "The Printing Press",
          "content": "Around 1440, Johannes Gutenberg invented the printing press with movable type. Before this, books were copied by hand — slow and expensive. The printing press made books affordable and spread knowledge faster than ever. It helped start the Scientific Revolution and the Reformation."
        },
        {
          "id": "world-history-101-l07-c3",
          "title": "Age of Exploration",
          "content": "In the 1400s–1600s, European explorers sailed the oceans seeking new trade routes. Christopher Columbus reached the Americas in 1492. Ferdinand Magellan's crew completed the first voyage around the world (1519–1522). These voyages connected continents but also brought disease and colonization to indigenous peoples."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l07-f1",
          "front": "Means 'rebirth' — began in Italy around 1400",
          "back": "Renaissance"
        },
        {
          "id": "world-history-101-l07-f2",
          "front": "Painted the Mona Lisa and designed flying machines",
          "back": "Leonardo da Vinci"
        },
        {
          "id": "world-history-101-l07-f3",
          "front": "Invented the printing press around 1440",
          "back": "Johannes Gutenberg"
        },
        {
          "id": "world-history-101-l07-f4",
          "front": "Year Columbus reached the Americas",
          "back": "1492"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l07-q1",
          "text": "The Renaissance means",
          "options": [
            {
              "id": "a",
              "text": "Rebirth"
            },
            {
              "id": "b",
              "text": "War"
            },
            {
              "id": "c",
              "text": "Discovery"
            },
            {
              "id": "d",
              "text": "Kingdom"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Renaissance literally means 'rebirth' — a rebirth of art, science, and learning!"
        },
        {
          "id": "world-history-101-l07-q2",
          "text": "The printing press was important because",
          "options": [
            {
              "id": "a",
              "text": "It made books affordable and spread knowledge"
            },
            {
              "id": "b",
              "text": "It built bridges"
            },
            {
              "id": "c",
              "text": "It powered ships"
            },
            {
              "id": "d",
              "text": "It created new food"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Affordable books meant more people could read and learn!"
        },
        {
          "id": "world-history-101-l07-q3",
          "text": "Columbus reached the Americas in",
          "options": [
            {
              "id": "a",
              "text": "1492"
            },
            {
              "id": "b",
              "text": "1776"
            },
            {
              "id": "c",
              "text": "1066"
            },
            {
              "id": "d",
              "text": "476"
            }
          ],
          "correctOptionId": "a",
          "explanation": "In 1492, Columbus sailed from Spain and reached the Caribbean!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l07-act1",
          "type": "project_builder",
          "title": "Renaissance inventor notebook",
          "description": "Like Leonardo da Vinci's famous notebooks, create your own. Draw an invention idea with labeled parts. Write a short paragraph explaining how it works. Da Vinci wrote in mirror script — try it for fun!"
        }
      ]
    },
    {
      "id": "world-history-101-l08",
      "title": "Final World History Assessment",
      "type": "quiz",
      "duration": 10,
      "chunks": [
        {
          "id": "world-history-101-l08-c1",
          "title": "Ancient Civilizations Review",
          "content": "Mesopotamia invented cuneiform and the Code of Hammurabi. Egypt built pyramids along the Nile. Greece created democracy, philosophy, and the Olympics."
        },
        {
          "id": "world-history-101-l08-c2",
          "title": "Rome and Medieval Review",
          "content": "Rome gave us the republic, aqueducts, and concrete. The Middle Ages brought feudalism, the Black Death, and the Crusades."
        },
        {
          "id": "world-history-101-l08-c3",
          "title": "Renaissance and Exploration Review",
          "content": "The Renaissance revived art and science. Gutenberg's press spread knowledge. Explorers connected the world — but at a great cost to indigenous peoples."
        }
      ],
      "flashcards": [
        {
          "id": "world-history-101-l08-f1",
          "front": "Land between the Tigris and Euphrates",
          "back": "Mesopotamia"
        },
        {
          "id": "world-history-101-l08-f2",
          "front": "Arena seating 50,000 in Rome",
          "back": "Colosseum"
        },
        {
          "id": "world-history-101-l08-f3",
          "front": "Social system in the Middle Ages",
          "back": "Feudalism"
        },
        {
          "id": "world-history-101-l08-f4",
          "front": "Gutenberg's invention",
          "back": "Printing press"
        }
      ],
      "questions": [
        {
          "id": "world-history-101-l08-q1",
          "text": "The Epic of Gilgamesh was written in",
          "options": [
            {
              "id": "a",
              "text": "Cuneiform"
            },
            {
              "id": "b",
              "text": "Hieroglyphics"
            },
            {
              "id": "c",
              "text": "Latin"
            },
            {
              "id": "d",
              "text": "English"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The oldest known story was written in Sumerian cuneiform!"
        },
        {
          "id": "world-history-101-l08-q2",
          "text": "The Roman government that inspired the U.S. Constitution was",
          "options": [
            {
              "id": "a",
              "text": "A republic"
            },
            {
              "id": "b",
              "text": "A monarchy"
            },
            {
              "id": "c",
              "text": "Feudalism"
            },
            {
              "id": "d",
              "text": "Direct democracy"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Roman Republic's elected Senate inspired America's government!"
        },
        {
          "id": "world-history-101-l08-q3",
          "text": "Who painted the Sistine Chapel ceiling?",
          "options": [
            {
              "id": "a",
              "text": "Michelangelo"
            },
            {
              "id": "b",
              "text": "Leonardo da Vinci"
            },
            {
              "id": "c",
              "text": "Gutenberg"
            },
            {
              "id": "d",
              "text": "Columbus"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Michelangelo spent 4 years painting the Sistine Chapel ceiling!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "world-history-101-l08-act1",
          "type": "project_builder",
          "title": "History timeline",
          "description": "Create a timeline from 3500 BCE to 1500 CE. Mark at least 8 events: Sumerian writing, Pyramids, Olympics, Roman Republic, Fall of Rome, Crusades, Black Death, Gutenberg's press, Columbus. Add drawings for each!"
        }
      ]
    }
  ]
};
