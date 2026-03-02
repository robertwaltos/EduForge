import type { LearningModule } from "@/lib/modules/types";

export const Astronomy101Module: LearningModule = {
  "id": "astronomy-101",
  "title": "Astronomy: Exploring the Universe",
  "description": "Journey through our solar system, study the Sun and Moon, discover stars and constellations, explore galaxies, and learn about space exploration from ancient observers to modern missions.",
  "subject": "Astronomy",
  "tags": [
    "astronomy",
    "science",
    "interactive",
    "curriculum",
    "enriched-from-epub"
  ],
  "minAge": 7,
  "maxAge": 18,
  "version": "2.0.0",
  "learningObjectives": [
    "Name the eight planets in order from the Sun",
    "Describe the Sun's structure and importance to life on Earth",
    "Explain the Moon's phases and its role in tides",
    "Identify major constellations and understand how stars form",
    "Compare types of galaxies and locate the Milky Way",
    "Trace the history of space exploration from Sputnik to Mars rovers"
  ],
  "lessons": [
    {
      "id": "astronomy-101-l01",
      "title": "Our Solar System",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "astronomy-101-l01-c1",
          "title": "The Sun and Inner Planets",
          "content": "Our solar system has one star — the Sun — and eight planets. The four inner planets are called rocky planets: Mercury is the closest and has no atmosphere, Venus is the hottest with thick clouds, Earth is the only planet with liquid water, and Mars — the Red Planet — has iron-rust soil and the tallest volcano, Olympus Mons."
        },
        {
          "id": "astronomy-101-l01-c2",
          "title": "The Outer Planets",
          "content": "Beyond Mars is the asteroid belt, then the gas giants. Jupiter is the largest planet with a Great Red Spot storm. Saturn is famous for its wide, icy rings. Uranus tilts on its side and spins like a rolling ball. Neptune is deep blue with the fastest winds in the solar system."
        },
        {
          "id": "astronomy-101-l01-c3",
          "title": "Dwarf Planets and Beyond",
          "content": "Pluto was reclassified as a dwarf planet in 2006. Other dwarf planets include Eris and Ceres. The Kuiper Belt beyond Neptune is filled with icy objects, and the Oort Cloud extends trillions of miles from the Sun."
        },
        {
          "id": "astronomy-101-l01-c4",
          "title": "The Cosmic Perspective on Our Solar System",
          "content": "Carl Sagan described our solar system as a small neighborhood in the vast cosmic ocean. Earth is a 'pale blue dot' — a tiny world orbiting a medium-sized star in the outskirts of the Milky Way. Neil deGrasse Tyson expanded on this by introducing the 'Goldilocks zone' — the habitable region around a star where conditions are just right for liquid water to exist. Venus is too hot, Mars is too cold, but Earth sits in the zone that is just right for life. Understanding our cosmic address helps us appreciate how special and fragile our place in the universe truly is."
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l01-f1",
          "front": "The four rocky inner planets in order",
          "back": "Mercury, Venus, Earth, Mars"
        },
        {
          "id": "astronomy-101-l01-f2",
          "front": "Planet with the Great Red Spot",
          "back": "Jupiter"
        },
        {
          "id": "astronomy-101-l01-f3",
          "front": "Planet famous for its icy rings",
          "back": "Saturn"
        },
        {
          "id": "astronomy-101-l01-f4",
          "front": "Why Pluto is no longer a full planet (since 2006)",
          "back": "Reclassified as a dwarf planet"
        },
        {
          "id": "astronomy-101-l01-f5",
          "front": "What is Earth's 'cosmic address' according to Carl Sagan?",
          "back": "Earth is a small planet orbiting a medium-sized star in the outskirts of the Milky Way galaxy — a pale blue dot in the vast cosmic ocean."
        },
        {
          "id": "astronomy-101-l01-f6",
          "front": "What is the 'Goldilocks zone' (habitable zone) around a star?",
          "back": "The region where conditions are 'just right' for liquid water — not too hot (like Venus), not too cold (like Mars), but just right for life as we know it."
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l01-q1",
          "text": "Which planet is closest to the Sun?",
          "options": [
            {
              "id": "a",
              "text": "Mercury"
            },
            {
              "id": "b",
              "text": "Venus"
            },
            {
              "id": "c",
              "text": "Earth"
            },
            {
              "id": "d",
              "text": "Mars"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Mercury orbits nearest to the Sun!"
        },
        {
          "id": "astronomy-101-l01-q2",
          "text": "Which planet is the largest in our solar system?",
          "options": [
            {
              "id": "a",
              "text": "Jupiter"
            },
            {
              "id": "b",
              "text": "Saturn"
            },
            {
              "id": "c",
              "text": "Neptune"
            },
            {
              "id": "d",
              "text": "Earth"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Jupiter is the biggest — over 1,300 Earths could fit inside it!"
        },
        {
          "id": "astronomy-101-l01-q3",
          "text": "Mars is called the Red Planet because of",
          "options": [
            {
              "id": "a",
              "text": "Iron-rust colored soil"
            },
            {
              "id": "b",
              "text": "Hot lava on the surface"
            },
            {
              "id": "c",
              "text": "Red clouds"
            },
            {
              "id": "d",
              "text": "The sunset color"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Iron oxide (rust) in the soil gives Mars its red color!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l01-act1",
          "type": "project_builder",
          "title": "Solar system scale model",
          "description": "Use different sized balls or fruits to represent each planet. A basketball for Jupiter, a marble for Mercury. Lay them out in order from the Sun and label each one."
        }
      ],
      "learningAids": [
        {
          "id": "astronomy-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "astronomy-101-l02",
      "title": "The Sun",
      "type": "interactive",
      "duration": 12,
      "chunks": [
        {
          "id": "astronomy-101-l02-c1",
          "title": "What the Sun Is",
          "content": "The Sun is a medium-sized star — a giant ball of hot gas made mostly of hydrogen and helium. Nuclear fusion in its core converts hydrogen into helium, releasing enormous energy as light and heat. About 1.3 million Earths could fit inside the Sun."
        },
        {
          "id": "astronomy-101-l02-c2",
          "title": "Layers of the Sun",
          "content": "The Sun has layers: the core (where fusion happens), the radiative zone, the convective zone, the photosphere (the visible surface), the chromosphere, and the corona (the outer atmosphere you see during a total eclipse)."
        },
        {
          "id": "astronomy-101-l02-c3",
          "title": "Why the Sun Matters",
          "content": "The Sun provides the light and heat Earth needs for life. Plants use sunlight for photosynthesis, which produces oxygen. The Sun also drives weather, ocean currents, and the water cycle. Never look directly at the Sun — it can damage your eyes!"
        },
        {
          "id": "astronomy-101-l02-c4",
          "title": "Reading the Sun's Light: Spectroscopy",
          "content": "As Neil deGrasse Tyson explains, when 19th-century astronomers first turned laboratory prisms toward the Sun, they discovered that spectra contain far more than beautiful rainbows — they reveal a star's temperature and chemical composition through unique patterns of bright and dark lines. Each chemical element leaves its own fingerprint in the spectrum. This revolutionized astronomy: we could determine what the Sun is made of without ever visiting it. Isaac Newton showed that the same laws of physics operate on Earth and across the cosmos, meaning these spectral techniques work for any star in any galaxy."
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l02-f1",
          "front": "Process that powers the Sun",
          "back": "Nuclear fusion"
        },
        {
          "id": "astronomy-101-l02-f2",
          "front": "The two main gases in the Sun",
          "back": "Hydrogen and helium"
        },
        {
          "id": "astronomy-101-l02-f3",
          "front": "The visible surface of the Sun",
          "back": "Photosphere"
        },
        {
          "id": "astronomy-101-l02-f4",
          "front": "Sun's outer atmosphere seen during an eclipse",
          "back": "Corona"
        },
        {
          "id": "astronomy-101-l02-f5",
          "front": "How do astronomers determine what the Sun is made of without visiting it?",
          "back": "By using spectroscopy — splitting sunlight into a spectrum that reveals unique patterns (spectral lines) for each chemical element present."
        },
        {
          "id": "astronomy-101-l02-f6",
          "front": "What did Newton's universal law of gravitation reveal about the Sun?",
          "back": "The same force of gravity that pulls apples from trees also keeps all planets orbiting the Sun — the laws of physics are universal throughout the cosmos."
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l02-q1",
          "text": "What process powers the Sun?",
          "options": [
            {
              "id": "a",
              "text": "Nuclear fusion"
            },
            {
              "id": "b",
              "text": "Burning wood"
            },
            {
              "id": "c",
              "text": "Electricity"
            },
            {
              "id": "d",
              "text": "Friction"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Sun fuses hydrogen atoms into helium, releasing energy!"
        },
        {
          "id": "astronomy-101-l02-q2",
          "text": "The corona is the Sun's",
          "options": [
            {
              "id": "a",
              "text": "Outer atmosphere"
            },
            {
              "id": "b",
              "text": "Core"
            },
            {
              "id": "c",
              "text": "Visible surface"
            },
            {
              "id": "d",
              "text": "Inner layer"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The corona is visible as a glowing halo during a total solar eclipse!"
        },
        {
          "id": "astronomy-101-l02-q3",
          "text": "Plants use sunlight for",
          "options": [
            {
              "id": "a",
              "text": "Photosynthesis"
            },
            {
              "id": "b",
              "text": "Gravity"
            },
            {
              "id": "c",
              "text": "Friction"
            },
            {
              "id": "d",
              "text": "Evaporation"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Photosynthesis converts sunlight into food and oxygen!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l02-act1",
          "type": "drawing_canvas",
          "title": "Sun layers diagram",
          "description": "Draw a cross-section of the Sun showing its six layers: core, radiative zone, convective zone, photosphere, chromosphere, and corona. Label and color each layer."
        }
      ],
      "learningAids": [
        {
          "id": "astronomy-101-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "astronomy-101-l03",
      "title": "Earth's Moon",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "astronomy-101-l03-c1",
          "title": "Moon Facts",
          "content": "The Moon is Earth's only natural satellite. It is about 238,900 miles away. The Moon has no atmosphere, no wind, and no water. Temperatures range from 260°F in sunlight to −280°F in shadow. Astronaut footprints from 1969 are still there because there is no wind to erase them."
        },
        {
          "id": "astronomy-101-l03-c2",
          "title": "Phases of the Moon",
          "content": "The Moon does not produce its own light — it reflects sunlight. As the Moon orbits Earth (about 29.5 days), we see different amounts of the lit side: new moon (dark), waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, third quarter, waning crescent, then back to new moon."
        },
        {
          "id": "astronomy-101-l03-c3",
          "title": "Tides and Eclipses",
          "content": "The Moon's gravity pulls on Earth's oceans, causing tides. High tide happens on the side facing the Moon and on the opposite side. A solar eclipse occurs when the Moon passes between the Sun and Earth. A lunar eclipse happens when Earth's shadow falls on the Moon."
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l03-f1",
          "front": "How long the Moon takes to orbit Earth",
          "back": "About 29.5 days"
        },
        {
          "id": "astronomy-101-l03-f2",
          "front": "Moon phase when the entire face is lit",
          "back": "Full moon"
        },
        {
          "id": "astronomy-101-l03-f3",
          "front": "What causes ocean tides on Earth",
          "back": "The Moon's gravity"
        },
        {
          "id": "astronomy-101-l03-f4",
          "front": "When the Moon blocks the Sun",
          "back": "Solar eclipse"
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l03-q1",
          "text": "Why are astronaut footprints still on the Moon?",
          "options": [
            {
              "id": "a",
              "text": "No wind or atmosphere to erase them"
            },
            {
              "id": "b",
              "text": "They were painted on"
            },
            {
              "id": "c",
              "text": "Moon rock is very soft"
            },
            {
              "id": "d",
              "text": "Rain washed them deeper"
            }
          ],
          "correctOptionId": "a",
          "explanation": "With no wind or weather, nothing disturbs the footprints!"
        },
        {
          "id": "astronomy-101-l03-q2",
          "text": "The Moon produces its own light.",
          "options": [
            {
              "id": "a",
              "text": "False — it reflects sunlight"
            },
            {
              "id": "b",
              "text": "True"
            },
            {
              "id": "c",
              "text": "Only during full moon"
            },
            {
              "id": "d",
              "text": "Only at night"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Moon shines because it reflects the Sun's light!"
        },
        {
          "id": "astronomy-101-l03-q3",
          "text": "What causes tides on Earth?",
          "options": [
            {
              "id": "a",
              "text": "The Moon's gravitational pull"
            },
            {
              "id": "b",
              "text": "Wind"
            },
            {
              "id": "c",
              "text": "The Sun's heat"
            },
            {
              "id": "d",
              "text": "Earth's rotation alone"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Moon's gravity pulls on Earth's oceans, creating tides!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l03-act1",
          "type": "drawing_canvas",
          "title": "Moon phase tracker",
          "description": "Over one week, draw the Moon's shape each night. Label the phase (crescent, quarter, gibbous, or full). After a month you will see the full cycle."
        }
      ],
      "learningAids": [
        {
          "id": "astronomy-101-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "astronomy-101-l04",
      "title": "Astronomy Checkpoint",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "astronomy-101-l04-c1",
          "title": "Solar System Review",
          "content": "Eight planets orbit the Sun: four rocky inner planets and four gas/ice giants. Jupiter is the largest. Mercury is the closest to the Sun."
        },
        {
          "id": "astronomy-101-l04-c2",
          "title": "Sun and Moon Review",
          "content": "The Sun is powered by nuclear fusion. The Moon reflects sunlight, orbits Earth in 29.5 days, and causes tides with its gravity."
        },
        {
          "id": "astronomy-101-l04-c3",
          "title": "Keep Looking Up!",
          "content": "You know the planets, the Sun's structure, and how the Moon works. Next you will explore stars, galaxies, and space missions!"
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l04-f1",
          "front": "Number of planets in our solar system",
          "back": "Eight"
        },
        {
          "id": "astronomy-101-l04-f2",
          "front": "The Sun fuses hydrogen into this element",
          "back": "Helium"
        },
        {
          "id": "astronomy-101-l04-f3",
          "front": "Moon phase that is completely dark",
          "back": "New moon"
        },
        {
          "id": "astronomy-101-l04-f4",
          "front": "Tallest volcano in the solar system (on Mars)",
          "back": "Olympus Mons"
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l04-q1",
          "text": "How many planets are in our solar system?",
          "options": [
            {
              "id": "a",
              "text": "8"
            },
            {
              "id": "b",
              "text": "9"
            },
            {
              "id": "c",
              "text": "7"
            },
            {
              "id": "d",
              "text": "10"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Since 2006, there are 8 planets — Pluto is a dwarf planet!"
        },
        {
          "id": "astronomy-101-l04-q2",
          "text": "Saturn is famous for its",
          "options": [
            {
              "id": "a",
              "text": "Rings"
            },
            {
              "id": "b",
              "text": "Great Red Spot"
            },
            {
              "id": "c",
              "text": "Sideways tilt"
            },
            {
              "id": "d",
              "text": "Blue color"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Saturn has beautiful rings made of ice and rock!"
        },
        {
          "id": "astronomy-101-l04-q3",
          "text": "A solar eclipse happens when",
          "options": [
            {
              "id": "a",
              "text": "The Moon blocks the Sun"
            },
            {
              "id": "b",
              "text": "Earth blocks the Sun"
            },
            {
              "id": "c",
              "text": "The Sun turns off"
            },
            {
              "id": "d",
              "text": "Stars move in front of the Sun"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Moon passes between the Sun and Earth during a solar eclipse!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l04-act1",
          "type": "drawing_canvas",
          "title": "Solar system poster review",
          "description": "Draw the Sun and all 8 planets in order. Add one fact next to each planet."
        }
      ],
      "learningAids": [
        {
          "id": "astronomy-101-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "astronomy-101-l05",
      "title": "Stars and Constellations",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "astronomy-101-l05-c1",
          "title": "What Are Stars?",
          "content": "Stars are giant balls of hot gas that produce light and heat through nuclear fusion. They come in different sizes: red dwarfs are small and cool, yellow dwarfs (like our Sun) are medium, and blue giants are huge and extremely hot. A star's life begins in a nebula — a cloud of gas and dust."
        },
        {
          "id": "astronomy-101-l05-c2",
          "title": "Constellations",
          "content": "Constellations are patterns of stars that ancient people connected like dot-to-dot pictures. Orion the Hunter has three stars in a row for his belt. Ursa Major (Great Bear) contains the Big Dipper. The North Star (Polaris) sits at the tip of the Little Dipper and points north."
        },
        {
          "id": "astronomy-101-l05-c3",
          "title": "Star Life Cycle",
          "content": "Stars are born in nebulae, burn hydrogen for millions or billions of years, then die. Small stars become white dwarfs. Large stars explode as supernovae and may leave behind a neutron star or black hole. The elements in your body were made inside ancient stars!"
        },
        {
          "id": "astronomy-101-l05-c4",
          "title": "We Are Star Stuff: Cosmic Origins of the Elements",
          "content": "Carl Sagan famously declared 'We are made of star stuff.' Every carbon atom in our muscles, every calcium atom in our bones, and every iron atom in our blood was forged deep inside a star that lived and died long before our solar system formed. Neil deGrasse Tyson calls this process stellar nucleosynthesis: stars fuse hydrogen into helium, then helium into carbon, oxygen, and heavier elements up to iron. When massive stars explode as supernovae, they scatter these elements into space, seeding the gas clouds (nebulae) from which new stars and planets — including Earth — are born. The periodic table is, in a very real sense, a cosmic story written in starlight."
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l05-f1",
          "front": "Cloud of gas and dust where stars are born",
          "back": "Nebula"
        },
        {
          "id": "astronomy-101-l05-f2",
          "front": "Constellation with three stars in a belt",
          "back": "Orion"
        },
        {
          "id": "astronomy-101-l05-f3",
          "front": "Star that always points north",
          "back": "Polaris (North Star)"
        },
        {
          "id": "astronomy-101-l05-f4",
          "front": "Explosive death of a massive star",
          "back": "Supernova"
        },
        {
          "id": "astronomy-101-l05-f5",
          "front": "What did Carl Sagan mean by 'We are made of star stuff'?",
          "back": "Every atom of carbon, nitrogen, and oxygen in our bodies was forged inside ancient stars that exploded as supernovae, scattering their elements across the cosmos to form new worlds and life."
        },
        {
          "id": "astronomy-101-l05-f6",
          "front": "What is stellar nucleosynthesis?",
          "back": "The process by which stars forge heavier elements (carbon, oxygen, iron) from lighter ones (hydrogen, helium) through nuclear fusion in their cores and during supernova explosions."
        },
        {
          "id": "astronomy-101-l05-f7",
          "front": "Why is the periodic table also a cosmic story, according to Tyson?",
          "back": "Because nearly every element heavier than hydrogen and helium was created inside stars — each element's existence is evidence of stellar processes that occurred billions of years ago."
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l05-q1",
          "text": "Where are stars born?",
          "options": [
            {
              "id": "a",
              "text": "In a nebula"
            },
            {
              "id": "b",
              "text": "On a planet"
            },
            {
              "id": "c",
              "text": "Inside the Sun"
            },
            {
              "id": "d",
              "text": "In the ocean"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Stars form inside nebulae — clouds of gas and dust!"
        },
        {
          "id": "astronomy-101-l05-q2",
          "text": "Which constellation has three stars in a row forming a belt?",
          "options": [
            {
              "id": "a",
              "text": "Orion"
            },
            {
              "id": "b",
              "text": "Ursa Major"
            },
            {
              "id": "c",
              "text": "Cassiopeia"
            },
            {
              "id": "d",
              "text": "Leo"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Orion's Belt is one of the most recognizable patterns in the sky!"
        },
        {
          "id": "astronomy-101-l05-q3",
          "text": "When a massive star explodes, it is called a",
          "options": [
            {
              "id": "a",
              "text": "Supernova"
            },
            {
              "id": "b",
              "text": "Solar eclipse"
            },
            {
              "id": "c",
              "text": "White dwarf"
            },
            {
              "id": "d",
              "text": "Nebula"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A supernova is the brilliant explosion of a dying massive star!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l05-act1",
          "type": "drawing_canvas",
          "title": "Constellation creator",
          "description": "On black paper, use a white crayon or chalk to place dots for stars. Connect them into a real constellation (Orion, Big Dipper) or invent your own. Name it and write a short story about it."
        }
      ]
    },
    {
      "id": "astronomy-101-l06",
      "title": "Galaxies",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "astronomy-101-l06-c1",
          "title": "What Is a Galaxy?",
          "content": "A galaxy is a huge collection of stars, gas, dust, and dark matter held together by gravity. Our galaxy, the Milky Way, contains over 200 billion stars. From the side it looks like a flat disk, and from above it has spiral arms."
        },
        {
          "id": "astronomy-101-l06-c2",
          "title": "Types of Galaxies",
          "content": "There are three main types of galaxies. Spiral galaxies (like the Milky Way and Andromeda) have curved arms. Elliptical galaxies are smooth, oval-shaped, and contain mostly older stars. Irregular galaxies have no clear shape — the Large Magellanic Cloud is one."
        },
        {
          "id": "astronomy-101-l06-c3",
          "title": "The Observable Universe",
          "content": "There are over two trillion galaxies in the observable universe! The Hubble Space Telescope took a famous Deep Field photo showing thousands of galaxies in a tiny spot of sky. Light from the most distant galaxies has traveled over 13 billion years to reach us."
        },
        {
          "id": "astronomy-101-l06-c4",
          "title": "The Shores of the Cosmic Ocean",
          "content": "Carl Sagan opened Cosmos by inviting us to stand on 'the shores of the cosmic ocean' — a metaphor for humanity's position at the edge of an incomprehensibly vast universe. Our entire Milky Way galaxy, with its 200+ billion stars, is just one among trillions. Neil deGrasse Tyson reinforces this perspective: the same laws of physics — gravity, electromagnetism, nuclear forces — operate identically in the most distant galaxy as they do here on Earth. This universality means we can study galaxies billions of light-years away using the same science we develop in our laboratories, making the entire cosmos knowable through reason and observation."
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l06-f1",
          "front": "Our home galaxy",
          "back": "The Milky Way"
        },
        {
          "id": "astronomy-101-l06-f2",
          "front": "Galaxy type with curved arms",
          "back": "Spiral galaxy"
        },
        {
          "id": "astronomy-101-l06-f3",
          "front": "Nearest large spiral galaxy to the Milky Way",
          "back": "Andromeda"
        },
        {
          "id": "astronomy-101-l06-f4",
          "front": "Estimated number of galaxies in the observable universe",
          "back": "Over two trillion"
        },
        {
          "id": "astronomy-101-l06-f5",
          "front": "How did Carl Sagan describe humanity's place among the galaxies?",
          "back": "We are like voyagers on the shores of a cosmic ocean — our planet is a tiny speck in an incomprehensibly vast universe containing trillions of galaxies, each with hundreds of billions of stars."
        },
        {
          "id": "astronomy-101-l06-f6",
          "front": "Why can we study distant galaxies from Earth, according to Tyson?",
          "back": "Because the laws of physics are universal — the same gravity, electromagnetism, and nuclear forces operate identically everywhere in the cosmos, making distant galaxies knowable through the same science we use on Earth."
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l06-q1",
          "text": "What type of galaxy is the Milky Way?",
          "options": [
            {
              "id": "a",
              "text": "Spiral"
            },
            {
              "id": "b",
              "text": "Elliptical"
            },
            {
              "id": "c",
              "text": "Irregular"
            },
            {
              "id": "d",
              "text": "Ring"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Milky Way is a spiral galaxy with curved arms!"
        },
        {
          "id": "astronomy-101-l06-q2",
          "text": "Approximately how many stars are in the Milky Way?",
          "options": [
            {
              "id": "a",
              "text": "Over 200 billion"
            },
            {
              "id": "b",
              "text": "About 1 million"
            },
            {
              "id": "c",
              "text": "A few thousand"
            },
            {
              "id": "d",
              "text": "Exactly 100"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Milky Way has over 200 billion stars!"
        },
        {
          "id": "astronomy-101-l06-q3",
          "text": "Which telescope took the famous Deep Field photo of galaxies?",
          "options": [
            {
              "id": "a",
              "text": "Hubble"
            },
            {
              "id": "b",
              "text": "Galileo's telescope"
            },
            {
              "id": "c",
              "text": "James Webb (no, it was Hubble first)"
            },
            {
              "id": "d",
              "text": "A backyard telescope"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Hubble Space Telescope captured thousands of galaxies in one tiny patch of sky!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l06-act1",
          "type": "drawing_canvas",
          "title": "Galaxy gallery",
          "description": "Draw three galaxies: one spiral (with arms), one elliptical (smooth oval), and one irregular (random shape). Label each type and add stars with white dots."
        }
      ]
    },
    {
      "id": "astronomy-101-l07",
      "title": "Space Exploration",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "astronomy-101-l07-c1",
          "title": "The Space Race",
          "content": "In 1957, the Soviet Union launched Sputnik, the first artificial satellite. In 1961, Yuri Gagarin became the first human in space. The U.S. responded with the Apollo program, and on July 20, 1969, Neil Armstrong and Buzz Aldrin walked on the Moon. Armstrong said: 'That's one small step for man, one giant leap for mankind.'"
        },
        {
          "id": "astronomy-101-l07-c2",
          "title": "Rovers and Probes",
          "content": "NASA's Mars rovers — Spirit, Opportunity, Curiosity, and Perseverance — explore Mars's surface. Voyager 1 and 2, launched in 1977, have left the solar system and carry Golden Records with sounds and images of Earth. The James Webb Space Telescope (launched 2021) captures images from the early universe."
        },
        {
          "id": "astronomy-101-l07-c3",
          "title": "The International Space Station",
          "content": "The ISS is a laboratory orbiting Earth where astronauts from many countries live and work. It orbits at about 17,500 mph and circles Earth every 90 minutes. Astronauts grow plants, study bones and muscles in microgravity, and prepare for future missions to Mars."
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l07-f1",
          "front": "First artificial satellite (1957)",
          "back": "Sputnik"
        },
        {
          "id": "astronomy-101-l07-f2",
          "front": "First human to walk on the Moon (1969)",
          "back": "Neil Armstrong"
        },
        {
          "id": "astronomy-101-l07-f3",
          "front": "Mars rover launched in 2020",
          "back": "Perseverance"
        },
        {
          "id": "astronomy-101-l07-f4",
          "front": "Laboratory orbiting Earth",
          "back": "International Space Station (ISS)"
        },
        {
          "id": "astronomy-101-l07-f5",
          "front": "What role did Carl Sagan play in the Voyager mission?",
          "back": "Sagan chaired the committee that designed the Voyager Golden Record — a message from Earth containing sounds, images, and greetings in 55 languages sent into interstellar space as a cosmic message in a bottle."
        },
        {
          "id": "astronomy-101-l07-f6",
          "front": "What is the 'Pale Blue Dot' and why is it significant?",
          "back": "A photograph of Earth taken by Voyager 1 from 3.7 billion miles away, showing our planet as a tiny speck in a sunbeam. Sagan used it to remind humanity that this fragile world is the only home we have ever known."
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l07-q1",
          "text": "What was the first artificial satellite launched into space?",
          "options": [
            {
              "id": "a",
              "text": "Sputnik"
            },
            {
              "id": "b",
              "text": "Apollo 11"
            },
            {
              "id": "c",
              "text": "Hubble"
            },
            {
              "id": "d",
              "text": "ISS"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Soviet Union launched Sputnik in 1957!"
        },
        {
          "id": "astronomy-101-l07-q2",
          "text": "Who was the first person to walk on the Moon?",
          "options": [
            {
              "id": "a",
              "text": "Neil Armstrong"
            },
            {
              "id": "b",
              "text": "Yuri Gagarin"
            },
            {
              "id": "c",
              "text": "Buzz Aldrin"
            },
            {
              "id": "d",
              "text": "John Glenn"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Neil Armstrong stepped onto the Moon on July 20, 1969!"
        },
        {
          "id": "astronomy-101-l07-q3",
          "text": "The ISS orbits Earth approximately every",
          "options": [
            {
              "id": "a",
              "text": "90 minutes"
            },
            {
              "id": "b",
              "text": "24 hours"
            },
            {
              "id": "c",
              "text": "7 days"
            },
            {
              "id": "d",
              "text": "1 year"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The ISS travels at 17,500 mph and circles Earth every 90 minutes!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l07-act1",
          "type": "project_builder",
          "title": "Space exploration timeline",
          "description": "Create a timeline from 1957 to today. Mark Sputnik (1957), Gagarin (1961), Moon landing (1969), Voyager (1977), ISS (1998), and James Webb (2021). Add a drawing for each event."
        }
      ]
    },
    {
      "id": "astronomy-101-l08",
      "title": "Final Astronomy Assessment",
      "type": "quiz",
      "duration": 10,
      "chunks": [
        {
          "id": "astronomy-101-l08-c1",
          "title": "Solar System and Sun Review",
          "content": "Eight planets orbit the Sun. The Sun is powered by nuclear fusion. Inner planets are rocky; outer planets are gas and ice giants."
        },
        {
          "id": "astronomy-101-l08-c2",
          "title": "Moon, Stars, and Galaxies Review",
          "content": "The Moon reflects sunlight and causes tides. Stars are born in nebulae and may die as supernovae. The Milky Way is a spiral galaxy among trillions."
        },
        {
          "id": "astronomy-101-l08-c3",
          "title": "Space Exploration Review",
          "content": "Sputnik was first in space (1957). Humans walked on the Moon (1969). Rovers explore Mars. The ISS is an orbiting laboratory. Keep exploring!"
        }
      ],
      "flashcards": [
        {
          "id": "astronomy-101-l08-f1",
          "front": "Eight planets in order from the Sun",
          "back": "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune"
        },
        {
          "id": "astronomy-101-l08-f2",
          "front": "Cloud where stars are born",
          "back": "Nebula"
        },
        {
          "id": "astronomy-101-l08-f3",
          "front": "Our galaxy's type",
          "back": "Spiral"
        },
        {
          "id": "astronomy-101-l08-f4",
          "front": "First satellite in space",
          "back": "Sputnik (1957)"
        }
      ],
      "questions": [
        {
          "id": "astronomy-101-l08-q1",
          "text": "Which planet has the fastest winds in the solar system?",
          "options": [
            {
              "id": "a",
              "text": "Neptune"
            },
            {
              "id": "b",
              "text": "Jupiter"
            },
            {
              "id": "c",
              "text": "Saturn"
            },
            {
              "id": "d",
              "text": "Earth"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Neptune has wind speeds over 1,200 mph — the fastest of any planet!"
        },
        {
          "id": "astronomy-101-l08-q2",
          "text": "Stars produce light and heat through",
          "options": [
            {
              "id": "a",
              "text": "Nuclear fusion"
            },
            {
              "id": "b",
              "text": "Electricity"
            },
            {
              "id": "c",
              "text": "Burning coal"
            },
            {
              "id": "d",
              "text": "Reflection"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Fusion combines hydrogen into helium, releasing enormous energy!"
        },
        {
          "id": "astronomy-101-l08-q3",
          "text": "The Voyager probes carry",
          "options": [
            {
              "id": "a",
              "text": "Golden Records with sounds and images of Earth"
            },
            {
              "id": "b",
              "text": "Astronauts"
            },
            {
              "id": "c",
              "text": "Mars soil samples"
            },
            {
              "id": "d",
              "text": "Seeds for planting"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Golden Records are a message from humanity to any finder in space!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "astronomy-101-l08-act1",
          "type": "project_builder",
          "title": "Astronomy journal",
          "description": "Create a small journal with one page per topic: Solar System, Sun, Moon, Stars, Galaxies, and Space Exploration. Write 2-3 facts and draw a picture on each page. Share it with someone and teach them what you learned!"
        }
      ]
    }
  ]
};
