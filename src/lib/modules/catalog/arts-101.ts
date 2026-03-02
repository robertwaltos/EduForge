import type { LearningModule } from "@/lib/modules/types";

export const Arts101Module: LearningModule = {
  "id": "arts-101",
  "title": "Creative Arts Studio",
  "description": "Explore the elements of art, color theory, drawing techniques, famous artists, sculpture, and nature art through hands-on projects and real-world examples.",
  "subject": "Arts",
  "tags": [
    "arts",
    "creativity",
    "interactive",
    "curriculum"
  ],
  "minAge": 7,
  "maxAge": 18,
  "version": "2.0.0",
  "learningObjectives": [
    "Identify the seven elements of art: line, shape, color, texture, space, form, and value",
    "Understand the color wheel including primary, secondary, complementary, and warm/cool colors",
    "Apply drawing techniques such as contour, shading, and proportion",
    "Recognize famous artists and their signature styles",
    "Create 3D art using clay, paper mâché, and assemblage",
    "Discover patterns, symmetry, and fractals in nature art"
  ],
  "lessons": [
    {
      "id": "arts-101-l01",
      "title": "Elements of Art",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "arts-101-l01-c1",
          "title": "Line and Shape",
          "content": "Line is the most basic element of art — a mark made by a moving point. Lines can be straight, curved, zigzag, thick, or thin. Shapes are formed when lines connect. Geometric shapes like circles, squares, and triangles have exact measurements. Organic shapes like clouds and leaves are irregular and found in nature."
        },
        {
          "id": "arts-101-l01-c2",
          "title": "Color, Value, and Texture",
          "content": "Color has three properties: hue (the name — red, blue), value (how light or dark), and intensity (how bright or dull). Texture is how a surface feels or looks like it feels — smooth, rough, bumpy, or soft. You can create texture in a drawing by using dots, lines, or shading. Vincent van Gogh's thick paint strokes created real texture you can feel on the canvas."
        },
        {
          "id": "arts-101-l01-c3",
          "title": "Space and Form",
          "content": "Space is the area around, between, and within objects. Positive space is the subject. Negative space is the empty area around it. Form is a 3D shape — a sphere instead of a circle, a cube instead of a square. Artists create the illusion of form on flat paper using shading and perspective."
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l01-f1",
          "front": "A mark made by a moving point",
          "back": "Line"
        },
        {
          "id": "arts-101-l01-f2",
          "front": "Area enclosed when lines connect",
          "back": "Shape"
        },
        {
          "id": "arts-101-l01-f3",
          "front": "How a surface feels or looks like it feels",
          "back": "Texture"
        },
        {
          "id": "arts-101-l01-f4",
          "front": "A 3D shape like a sphere or cube",
          "back": "Form"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l01-q1",
          "text": "Which element of art describes how a surface feels?",
          "options": [
            {
              "id": "a",
              "text": "Texture"
            },
            {
              "id": "b",
              "text": "Line"
            },
            {
              "id": "c",
              "text": "Shape"
            },
            {
              "id": "d",
              "text": "Space"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Texture is how a surface feels — rough, smooth, bumpy!"
        },
        {
          "id": "arts-101-l01-q2",
          "text": "What is the empty area around a subject called?",
          "options": [
            {
              "id": "a",
              "text": "Negative space"
            },
            {
              "id": "b",
              "text": "Positive space"
            },
            {
              "id": "c",
              "text": "Texture"
            },
            {
              "id": "d",
              "text": "Form"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Negative space is the empty area around objects!"
        },
        {
          "id": "arts-101-l01-q3",
          "text": "Geometric shapes like circles and squares have",
          "options": [
            {
              "id": "a",
              "text": "Exact measurements"
            },
            {
              "id": "b",
              "text": "Irregular edges"
            },
            {
              "id": "c",
              "text": "No lines"
            },
            {
              "id": "d",
              "text": "Rough texture"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Geometric shapes are precise and measurable!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l01-act1",
          "type": "drawing_canvas",
          "title": "Elements scavenger hunt",
          "description": "Look around your room and find one example each of line, shape, color, texture, space, and form. Draw or photograph each one and label it."
        }
      ],
      "learningAids": [
        {
          "id": "arts-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "arts-101-l02",
      "title": "The Color Wheel",
      "type": "interactive",
      "duration": 12,
      "chunks": [
        {
          "id": "arts-101-l02-c1",
          "title": "Primary and Secondary Colors",
          "content": "Primary colors are red, yellow, and blue — they cannot be made by mixing other colors. Secondary colors are made by mixing two primaries: red + yellow = orange, yellow + blue = green, blue + red = purple. Sir Isaac Newton created the first color wheel in 1666 by bending the spectrum of light into a circle."
        },
        {
          "id": "arts-101-l02-c2",
          "title": "Warm and Cool Colors",
          "content": "Warm colors (red, orange, yellow) remind us of fire and sunlight — they seem to come forward in a painting. Cool colors (blue, green, purple) remind us of water and ice — they seem to recede. Artists use warm and cool colors to create depth and mood in their work."
        },
        {
          "id": "arts-101-l02-c3",
          "title": "Complementary Colors",
          "content": "Complementary colors are opposite each other on the color wheel: red and green, blue and orange, yellow and purple. When placed side by side, they make each other look brighter and more vibrant. Claude Monet used complementary colors in his Water Lilies paintings to make the colors glow."
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l02-f1",
          "front": "Colors that cannot be made by mixing others",
          "back": "Primary colors (red, yellow, blue)"
        },
        {
          "id": "arts-101-l02-f2",
          "front": "Red + yellow = ?",
          "back": "Orange"
        },
        {
          "id": "arts-101-l02-f3",
          "front": "Colors opposite on the color wheel",
          "back": "Complementary colors"
        },
        {
          "id": "arts-101-l02-f4",
          "front": "Colors that remind us of fire and sunlight",
          "back": "Warm colors (red, orange, yellow)"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l02-q1",
          "text": "What do you get when you mix red and yellow?",
          "options": [
            {
              "id": "a",
              "text": "Orange"
            },
            {
              "id": "b",
              "text": "Green"
            },
            {
              "id": "c",
              "text": "Purple"
            },
            {
              "id": "d",
              "text": "Brown"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Red + yellow = orange — a secondary color!"
        },
        {
          "id": "arts-101-l02-q2",
          "text": "Which pair are complementary colors?",
          "options": [
            {
              "id": "a",
              "text": "Red and green"
            },
            {
              "id": "b",
              "text": "Red and orange"
            },
            {
              "id": "c",
              "text": "Blue and purple"
            },
            {
              "id": "d",
              "text": "Yellow and orange"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Red and green are opposite on the color wheel!"
        },
        {
          "id": "arts-101-l02-q3",
          "text": "Warm colors like red and orange seem to",
          "options": [
            {
              "id": "a",
              "text": "Come forward in a painting"
            },
            {
              "id": "b",
              "text": "Disappear completely"
            },
            {
              "id": "c",
              "text": "Turn into cool colors"
            },
            {
              "id": "d",
              "text": "Recede into the background"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Warm colors pop forward while cool colors recede!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l02-act1",
          "type": "drawing_canvas",
          "title": "Color wheel painting",
          "description": "Using only red, yellow, and blue paint, mix and paint a full 12-color wheel. Label each slice with its color name and whether it is primary, secondary, or tertiary."
        }
      ],
      "learningAids": [
        {
          "id": "arts-101-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "arts-101-l03",
      "title": "Drawing Techniques",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "arts-101-l03-c1",
          "title": "Contour Drawing",
          "content": "Contour drawing means drawing the outline and edges of an object without lifting your pencil. It trains your eye to really see what you are drawing. Try blind contour drawing — look only at the object, not at your paper. The famous artist Egon Schiele used bold contour lines in his expressive figure drawings."
        },
        {
          "id": "arts-101-l03-c2",
          "title": "Shading and Value",
          "content": "Shading gives flat drawings a 3D look. There are several shading techniques: hatching (parallel lines), cross-hatching (overlapping lines), stippling (dots), and blending (smooth gradients with a pencil or finger). Leonardo da Vinci was a master of sfumato — a soft, smoky shading technique he used on the Mona Lisa."
        },
        {
          "id": "arts-101-l03-c3",
          "title": "Proportion",
          "content": "Proportion is the size relationship between parts of a drawing. The average human face follows a pattern: eyes are halfway down the head, the nose is halfway between the eyes and chin, and the mouth is one-third of the way from the nose to the chin. Using these guidelines helps you draw realistic faces."
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l03-f1",
          "front": "Drawing only the outline and edges of an object",
          "back": "Contour drawing"
        },
        {
          "id": "arts-101-l03-f2",
          "front": "Technique using parallel lines to create value",
          "back": "Hatching"
        },
        {
          "id": "arts-101-l03-f3",
          "front": "Size relationship between parts of a drawing",
          "back": "Proportion"
        },
        {
          "id": "arts-101-l03-f4",
          "front": "Soft, smoky shading technique used by da Vinci",
          "back": "Sfumato"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l03-q1",
          "text": "What is drawing only the outline and edges of an object called?",
          "options": [
            {
              "id": "a",
              "text": "Contour drawing"
            },
            {
              "id": "b",
              "text": "Shading"
            },
            {
              "id": "c",
              "text": "Stippling"
            },
            {
              "id": "d",
              "text": "Proportion"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Contour drawing captures the outline of objects!"
        },
        {
          "id": "arts-101-l03-q2",
          "text": "Shading with tiny dots is called",
          "options": [
            {
              "id": "a",
              "text": "Stippling"
            },
            {
              "id": "b",
              "text": "Hatching"
            },
            {
              "id": "c",
              "text": "Contour"
            },
            {
              "id": "d",
              "text": "Proportion"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Stippling uses many small dots to create value!"
        },
        {
          "id": "arts-101-l03-q3",
          "text": "On the average human face, the eyes are located",
          "options": [
            {
              "id": "a",
              "text": "Halfway down the head"
            },
            {
              "id": "b",
              "text": "At the top of the head"
            },
            {
              "id": "c",
              "text": "One-third down"
            },
            {
              "id": "d",
              "text": "Near the chin"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Eyes sit at the midpoint of the head height!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l03-act1",
          "type": "drawing_canvas",
          "title": "Shading sampler",
          "description": "Draw four squares. Fill each with a different shading technique: hatching, cross-hatching, stippling, and blending. Then draw a sphere and shade it with your favorite technique to make it look 3D."
        }
      ],
      "learningAids": [
        {
          "id": "arts-101-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "arts-101-l04",
      "title": "Art Checkpoint",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "arts-101-l04-c1",
          "title": "Elements and Color Review",
          "content": "You learned the seven elements of art: line, shape, color, texture, space, form, and value. Primary colors mix to make secondary colors. Complementary colors are opposite on the wheel."
        },
        {
          "id": "arts-101-l04-c2",
          "title": "Drawing Techniques Review",
          "content": "Contour drawing captures outlines. Shading (hatching, cross-hatching, stippling, blending) adds depth. Proportion guidelines help draw realistic faces and figures."
        },
        {
          "id": "arts-101-l04-c3",
          "title": "You Are Growing as an Artist!",
          "content": "You now know the building blocks of all visual art. Every painting, drawing, and sculpture uses these same elements and techniques."
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l04-f1",
          "front": "Three primary colors",
          "back": "Red, yellow, blue"
        },
        {
          "id": "arts-101-l04-f2",
          "front": "Element that describes how light or dark",
          "back": "Value"
        },
        {
          "id": "arts-101-l04-f3",
          "front": "Drawing the outline without lifting your pencil",
          "back": "Contour drawing"
        },
        {
          "id": "arts-101-l04-f4",
          "front": "Colors opposite on the color wheel",
          "back": "Complementary colors"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l04-q1",
          "text": "Which are the three primary colors?",
          "options": [
            {
              "id": "a",
              "text": "Red, yellow, blue"
            },
            {
              "id": "b",
              "text": "Orange, green, purple"
            },
            {
              "id": "c",
              "text": "Red, green, blue"
            },
            {
              "id": "d",
              "text": "Black, white, gray"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Primary colors cannot be made by mixing others!"
        },
        {
          "id": "arts-101-l04-q2",
          "text": "What shading technique uses overlapping sets of lines?",
          "options": [
            {
              "id": "a",
              "text": "Cross-hatching"
            },
            {
              "id": "b",
              "text": "Stippling"
            },
            {
              "id": "c",
              "text": "Blending"
            },
            {
              "id": "d",
              "text": "Contour"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Cross-hatching layers lines in different directions!"
        },
        {
          "id": "arts-101-l04-q3",
          "text": "Negative space is",
          "options": [
            {
              "id": "a",
              "text": "The empty area around a subject"
            },
            {
              "id": "b",
              "text": "The main subject of the art"
            },
            {
              "id": "c",
              "text": "A type of shading"
            },
            {
              "id": "d",
              "text": "A warm color"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Negative space is the area surrounding the subject!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l04-act1",
          "type": "drawing_canvas",
          "title": "Mini gallery review",
          "description": "Collect your best drawing from each of the first three lessons. Write one sentence about which element or technique you used in each piece."
        }
      ],
      "learningAids": [
        {
          "id": "arts-101-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "arts-101-l05",
      "title": "Famous Artists",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "arts-101-l05-c1",
          "title": "Claude Monet — Impressionism",
          "content": "Claude Monet (1840–1926) was a French painter who started the Impressionist movement. He painted outdoors to capture light and color as they changed throughout the day. His Water Lilies series includes over 250 paintings of his garden pond. His brushstrokes are loose and visible, creating a shimmering, dreamlike effect."
        },
        {
          "id": "arts-101-l05-c2",
          "title": "Vincent van Gogh — Post-Impressionism",
          "content": "Vincent van Gogh (1853–1890) used thick, swirling brushstrokes called impasto. His painting The Starry Night (1889) shows a night sky full of movement and emotion with bold blues and yellows. During his lifetime he only sold one painting, but today his works sell for tens of millions of dollars."
        },
        {
          "id": "arts-101-l05-c3",
          "title": "Frida Kahlo — Self-Portraits",
          "content": "Frida Kahlo (1907–1954) was a Mexican artist known for bold, symbolic self-portraits. Her painting Self-Portrait with Thorn Necklace and Hummingbird uses plants, animals, and bright colors to express pain and strength. She is one of the most recognized artists of the 20th century."
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l05-f1",
          "front": "Painted Water Lilies with loose brushstrokes",
          "back": "Claude Monet"
        },
        {
          "id": "arts-101-l05-f2",
          "front": "Thick paint technique using swirling brushstrokes",
          "back": "Impasto (Van Gogh)"
        },
        {
          "id": "arts-101-l05-f3",
          "front": "Mexican artist known for bold self-portraits",
          "back": "Frida Kahlo"
        },
        {
          "id": "arts-101-l05-f4",
          "front": "Painting of a swirling night sky from 1889",
          "back": "The Starry Night (Van Gogh)"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l05-q1",
          "text": "Which artist started the Impressionist movement and painted Water Lilies?",
          "options": [
            {
              "id": "a",
              "text": "Claude Monet"
            },
            {
              "id": "b",
              "text": "Vincent van Gogh"
            },
            {
              "id": "c",
              "text": "Frida Kahlo"
            },
            {
              "id": "d",
              "text": "Pablo Picasso"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Monet is the father of Impressionism!"
        },
        {
          "id": "arts-101-l05-q2",
          "text": "What technique did Van Gogh use to create thick, textured paint?",
          "options": [
            {
              "id": "a",
              "text": "Impasto"
            },
            {
              "id": "b",
              "text": "Contour"
            },
            {
              "id": "c",
              "text": "Stippling"
            },
            {
              "id": "d",
              "text": "Blending"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Impasto means thick, textured paint applied with bold strokes!"
        },
        {
          "id": "arts-101-l05-q3",
          "text": "Frida Kahlo is best known for her",
          "options": [
            {
              "id": "a",
              "text": "Bold self-portraits"
            },
            {
              "id": "b",
              "text": "Water lily paintings"
            },
            {
              "id": "c",
              "text": "Sculpture"
            },
            {
              "id": "d",
              "text": "Architecture"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Kahlo created powerful symbolic self-portraits!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l05-act1",
          "type": "drawing_canvas",
          "title": "Artist style study",
          "description": "Pick one famous artist from the lesson. Create a short artwork inspired by their style. If you pick Monet, use loose brushstrokes. If Van Gogh, use thick swirls. If Kahlo, create a symbolic self-portrait."
        }
      ]
    },
    {
      "id": "arts-101-l06",
      "title": "Sculpture and 3D Art",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "arts-101-l06-c1",
          "title": "Clay Sculpture",
          "content": "Clay can be pinched, rolled, or coiled. Ancient Greek artists made clay vases and figures. Make a simple pinch pot and add textures with a pencil or fork."
        },
        {
          "id": "arts-101-l06-c2",
          "title": "Paper Mâché",
          "content": "Paper mâché uses strips of newspaper dipped in glue-water mix over a balloon or cardboard. Auguste Rodin used real models, but you can make a colorful mask or animal that dries hard."
        },
        {
          "id": "arts-101-l06-c3",
          "title": "Assemblage",
          "content": "Assemblage is sculpture from found objects. Pablo Picasso glued newspaper, string, and wood in his Still Life with Chair Caning. Collect safe recycled items and build a robot or creature."
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l06-f1",
          "front": "3D art made by pinching and shaping soft material",
          "back": "Clay sculpture"
        },
        {
          "id": "arts-101-l06-f2",
          "front": "Sculpture made from newspaper and glue",
          "back": "Paper mâché"
        },
        {
          "id": "arts-101-l06-f3",
          "front": "Art made by gluing found objects together",
          "back": "Assemblage"
        },
        {
          "id": "arts-101-l06-f4",
          "front": "Famous for Still Life with Chair Caning assemblage",
          "back": "Pablo Picasso"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l06-q1",
          "text": "What sculpture technique uses strips of newspaper and glue?",
          "options": [
            {
              "id": "a",
              "text": "Paper mâché"
            },
            {
              "id": "b",
              "text": "Clay pinching"
            },
            {
              "id": "c",
              "text": "Assemblage"
            },
            {
              "id": "d",
              "text": "Contour drawing"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Paper mâché uses wet newspaper strips!"
        },
        {
          "id": "arts-101-l06-q2",
          "text": "What 3D art is made by gluing recycled objects?",
          "options": [
            {
              "id": "a",
              "text": "Assemblage"
            },
            {
              "id": "b",
              "text": "Paper mâché"
            },
            {
              "id": "c",
              "text": "Clay"
            },
            {
              "id": "d",
              "text": "Shading"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Assemblage uses found objects!"
        },
        {
          "id": "arts-101-l06-q3",
          "text": "Pinch pots and coils are made with",
          "options": [
            {
              "id": "a",
              "text": "Clay"
            },
            {
              "id": "b",
              "text": "Newspaper"
            },
            {
              "id": "c",
              "text": "Cardboard"
            },
            {
              "id": "d",
              "text": "Crayons"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Clay is soft and perfect for pinching!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l06-act1",
          "type": "project_builder",
          "title": "Recycled robot assemblage",
          "description": "Gather clean cardboard tubes, bottle caps, egg cartons, glue, tape, and markers. Build and decorate a standing robot or creature."
        }
      ]
    },
    {
      "id": "arts-101-l07",
      "title": "Art in Nature",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "arts-101-l07-c1",
          "title": "Patterns in Nature",
          "content": "Leaves have repeating vein patterns. Sunflowers show spiral patterns. Andy Goldsworthy arranges leaves and stones into temporary nature art that shows perfect patterns."
        },
        {
          "id": "arts-101-l07-c2",
          "title": "Symmetry",
          "content": "Symmetry means one side mirrors the other — like a butterfly's wings or a snowflake. Look at a real leaf: fold it and see the matching halves. Georgia O'Keeffe painted giant symmetrical flowers."
        },
        {
          "id": "arts-101-l07-c3",
          "title": "Fractals and Repeating Shapes",
          "content": "Fractals are shapes that repeat smaller and smaller — like the branches of a tree or the spirals in a seashell. Draw a tree and keep making smaller branches — that's a fractal pattern!"
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l07-f1",
          "front": "Repeating shapes that get smaller",
          "back": "Fractals"
        },
        {
          "id": "arts-101-l07-f2",
          "front": "One side mirrors the other",
          "back": "Symmetry"
        },
        {
          "id": "arts-101-l07-f3",
          "front": "Repeating lines in leaves or petals",
          "back": "Patterns"
        },
        {
          "id": "arts-101-l07-f4",
          "front": "Artist who arranges leaves and stones outdoors",
          "back": "Andy Goldsworthy"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l07-q1",
          "text": "When one side of a butterfly's wings matches the other, it has",
          "options": [
            {
              "id": "a",
              "text": "Symmetry"
            },
            {
              "id": "b",
              "text": "Fractals"
            },
            {
              "id": "c",
              "text": "Shading"
            },
            {
              "id": "d",
              "text": "Contour"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Symmetry means mirror halves!"
        },
        {
          "id": "arts-101-l07-q2",
          "text": "Repeating smaller and smaller branches in a tree is an example of",
          "options": [
            {
              "id": "a",
              "text": "Fractals"
            },
            {
              "id": "b",
              "text": "Symmetry"
            },
            {
              "id": "c",
              "text": "Color wheel"
            },
            {
              "id": "d",
              "text": "Proportion"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Fractals repeat at smaller scales!"
        },
        {
          "id": "arts-101-l07-q3",
          "text": "Repeating vein lines in a leaf create a",
          "options": [
            {
              "id": "a",
              "text": "Pattern"
            },
            {
              "id": "b",
              "text": "Shading"
            },
            {
              "id": "c",
              "text": "Contour"
            },
            {
              "id": "d",
              "text": "Space"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Patterns repeat over and over!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l07-act1",
          "type": "drawing_canvas",
          "title": "Nature symmetry print",
          "description": "Go outside and collect flat leaves or flowers. Paint one side, fold paper over it, press, and open to see the mirror image. Label it 'Nature Symmetry'."
        }
      ]
    },
    {
      "id": "arts-101-l08",
      "title": "Final Portfolio Assessment",
      "type": "quiz",
      "duration": 10,
      "chunks": [
        {
          "id": "arts-101-l08-c1",
          "title": "Review All Elements and Techniques",
          "content": "You learned line, shape, color, texture, space, contour, shading, proportion, and how famous artists use them."
        },
        {
          "id": "arts-101-l08-c2",
          "title": "Review 3D and Nature Art",
          "content": "You created clay, paper mâché or assemblage, and found symmetry and patterns in nature."
        },
        {
          "id": "arts-101-l08-c3",
          "title": "Your Artist Statement",
          "content": "Write or tell one sentence about your favorite piece: 'I used shading and complementary colors to make my drawing look 3D and bright.'"
        }
      ],
      "flashcards": [
        {
          "id": "arts-101-l08-f1",
          "front": "Thick paint technique Van Gogh used",
          "back": "Impasto"
        },
        {
          "id": "arts-101-l08-f2",
          "front": "Mirror-image balance in nature",
          "back": "Symmetry"
        },
        {
          "id": "arts-101-l08-f3",
          "front": "Self-portrait artist with thorn necklace",
          "back": "Frida Kahlo"
        },
        {
          "id": "arts-101-l08-f4",
          "front": "Art made from glued found objects",
          "back": "Assemblage"
        }
      ],
      "questions": [
        {
          "id": "arts-101-l08-q1",
          "text": "Which artist painted Water Lilies with loose brushstrokes?",
          "options": [
            {
              "id": "a",
              "text": "Claude Monet"
            },
            {
              "id": "b",
              "text": "Frida Kahlo"
            },
            {
              "id": "c",
              "text": "Pablo Picasso"
            },
            {
              "id": "d",
              "text": "Andy Goldsworthy"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Claude Monet is the impressionist who painted Water Lilies!"
        },
        {
          "id": "arts-101-l08-q2",
          "text": "What technique uses thick swirls of paint?",
          "options": [
            {
              "id": "a",
              "text": "Impasto"
            },
            {
              "id": "b",
              "text": "Contour"
            },
            {
              "id": "c",
              "text": "Symmetry"
            },
            {
              "id": "d",
              "text": "Assemblage"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Impasto is thick, textured paint!"
        },
        {
          "id": "arts-101-l08-q3",
          "text": "Art made by gluing recycled objects is called",
          "options": [
            {
              "id": "a",
              "text": "Assemblage"
            },
            {
              "id": "b",
              "text": "Impasto"
            },
            {
              "id": "c",
              "text": "Contour"
            },
            {
              "id": "d",
              "text": "Shading"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Assemblage uses found objects!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "arts-101-l08-act1",
          "type": "project_builder",
          "title": "Final portfolio",
          "description": "Collect your best 6 pieces from the whole module (drawing, color wheel, sculpture, nature print, etc.). Add a cover with your name and 'My Arts 101 Portfolio'. Present it to family or teacher and explain one thing you learned from each piece."
        }
      ]
    }
  ]
};
