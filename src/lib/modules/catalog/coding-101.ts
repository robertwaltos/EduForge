import type { LearningModule } from "@/lib/modules/types";

export const Coding101Module: LearningModule = {
  "id": "coding-101",
  "title": "Coding: From Zero to Programmer",
  "description": "Learn the foundations of programming from scratch! Understand what code is, work with variables, conditionals, loops, functions, and basic data structures through hands-on examples and challenges.",
  "subject": "Coding",
  "tags": [
    "coding",
    "computer-science",
    "interactive",
    "curriculum"
  ],
  "minAge": 7,
  "maxAge": 18,
  "version": "2.0.0",
  "learningObjectives": [
    "Explain what code is and how computers follow instructions",
    "Create and use variables to store different data types",
    "Write conditional statements using if, elif, and else",
    "Build loops (for and while) to repeat actions efficiently",
    "Define and call functions to organize reusable code",
    "Use lists and basic data structures to manage collections of data"
  ],
  "lessons": [
    {
      "id": "coding-101-l01",
      "title": "What is Code?",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "coding-101-l01-c1",
          "title": "Code Is Instructions",
          "content": "Code is a set of instructions that tells a computer what to do — like a recipe tells a chef how to cook. Computers are very fast but not smart on their own. They follow your instructions exactly, step by step. A single typo can change the outcome!"
        },
        {
          "id": "coding-101-l01-c2",
          "title": "Programming Languages",
          "content": "Humans speak English, Spanish, or Mandarin. Computers understand programming languages like Python, JavaScript, and Scratch. Python reads almost like English: print('Hello, World!') tells the computer to display those words on screen."
        },
        {
          "id": "coding-101-l01-c3",
          "title": "Algorithms",
          "content": "An algorithm is a step-by-step plan to solve a problem. Example: Algorithm for making a peanut butter sandwich — 1. Get two slices of bread. 2. Spread peanut butter on one slice. 3. Put the other slice on top. Coding is writing algorithms in a language the computer understands."
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l01-f1",
          "front": "A set of instructions that tells a computer what to do",
          "back": "Code"
        },
        {
          "id": "coding-101-l01-f2",
          "front": "A step-by-step plan to solve a problem",
          "back": "Algorithm"
        },
        {
          "id": "coding-101-l01-f3",
          "front": "A language that reads almost like English",
          "back": "Python"
        },
        {
          "id": "coding-101-l01-f4",
          "front": "The first program most beginners write",
          "back": "Hello, World!"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l01-q1",
          "text": "Code is like a",
          "options": [
            {
              "id": "a",
              "text": "Recipe for a computer"
            },
            {
              "id": "b",
              "text": "Song for your ears"
            },
            {
              "id": "c",
              "text": "Painting for your eyes"
            },
            {
              "id": "d",
              "text": "Game you play outside"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Code gives step-by-step instructions, just like a recipe!"
        },
        {
          "id": "coding-101-l01-q2",
          "text": "A step-by-step plan to solve a problem is called",
          "options": [
            {
              "id": "a",
              "text": "An algorithm"
            },
            {
              "id": "b",
              "text": "A variable"
            },
            {
              "id": "c",
              "text": "A loop"
            },
            {
              "id": "d",
              "text": "A function"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Algorithms are the planning step before coding!"
        },
        {
          "id": "coding-101-l01-q3",
          "text": "print('Hello, World!') is written in",
          "options": [
            {
              "id": "a",
              "text": "Python"
            },
            {
              "id": "b",
              "text": "English"
            },
            {
              "id": "c",
              "text": "Spanish"
            },
            {
              "id": "d",
              "text": "Math"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Python is a programming language that reads almost like English!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l01-act1",
          "type": "project_builder",
          "title": "Write an algorithm",
          "description": "Write an algorithm (step-by-step instructions) for something you do every day — like brushing your teeth or getting dressed. Write at least 6 steps. Be very specific — remember, a computer would follow them literally!"
        }
      ],
      "learningAids": [
        {
          "id": "coding-101-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "coding-101-l02",
      "title": "Variables and Data Types",
      "type": "interactive",
      "duration": 12,
      "chunks": [
        {
          "id": "coding-101-l02-c1",
          "title": "What Are Variables?",
          "content": "A variable is like a labeled box that holds a value. In Python: name = 'Alex' stores the text Alex in a box called name. age = 10 stores the number 10 in a box called age. You can change what's in the box anytime: age = 11."
        },
        {
          "id": "coding-101-l02-c2",
          "title": "Data Types",
          "content": "Variables store different types of data. Strings are text in quotes: 'Hello'. Integers are whole numbers: 42. Floats are decimal numbers: 3.14. Booleans are True or False. Knowing the type matters — you can add numbers (5 + 3 = 8) but adding strings joins them ('Hi' + ' there' = 'Hi there')."
        },
        {
          "id": "coding-101-l02-c3",
          "title": "Naming Variables",
          "content": "Good variable names describe what they hold: player_score, favorite_color, total_cost. Python rules: no spaces (use underscores), cannot start with a number, and case matters (Age and age are different). Clear names make your code easier to read!"
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l02-f1",
          "front": "A labeled box that holds a value",
          "back": "Variable"
        },
        {
          "id": "coding-101-l02-f2",
          "front": "Data type for text in quotes",
          "back": "String"
        },
        {
          "id": "coding-101-l02-f3",
          "front": "Data type for whole numbers (like 42)",
          "back": "Integer"
        },
        {
          "id": "coding-101-l02-f4",
          "front": "Data type that is either True or False",
          "back": "Boolean"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l02-q1",
          "text": "In Python, name = 'Alex' creates a",
          "options": [
            {
              "id": "a",
              "text": "Variable holding a string"
            },
            {
              "id": "b",
              "text": "Loop"
            },
            {
              "id": "c",
              "text": "Function"
            },
            {
              "id": "d",
              "text": "Algorithm"
            }
          ],
          "correctOptionId": "a",
          "explanation": "name is a variable and 'Alex' is a string (text)!"
        },
        {
          "id": "coding-101-l02-q2",
          "text": "3.14 is an example of which data type?",
          "options": [
            {
              "id": "a",
              "text": "Float"
            },
            {
              "id": "b",
              "text": "Integer"
            },
            {
              "id": "c",
              "text": "String"
            },
            {
              "id": "d",
              "text": "Boolean"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Floats are numbers with decimal points!"
        },
        {
          "id": "coding-101-l02-q3",
          "text": "Which is a good variable name?",
          "options": [
            {
              "id": "a",
              "text": "player_score"
            },
            {
              "id": "b",
              "text": "123abc"
            },
            {
              "id": "c",
              "text": "my score"
            },
            {
              "id": "d",
              "text": "x"
            }
          ],
          "correctOptionId": "a",
          "explanation": "player_score is descriptive, uses underscores, and follows Python rules!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l02-act1",
          "type": "project_builder",
          "title": "Variable bio card",
          "description": "On paper or in a code editor, create variables about yourself: my_name = 'Your Name', my_age = your age, favorite_food = 'your food', is_student = True. Then write print statements for each one."
        }
      ],
      "learningAids": [
        {
          "id": "coding-101-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "coding-101-l03",
      "title": "Conditionals: If, Elif, Else",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "coding-101-l03-c1",
          "title": "If Statements",
          "content": "An if statement lets the computer make decisions. In Python:\n\nif temperature > 90:\n    print('It is hot!')\n\nThe computer checks: is the temperature greater than 90? If yes (True), it prints the message. If no (False), it skips it."
        },
        {
          "id": "coding-101-l03-c2",
          "title": "Elif and Else",
          "content": "elif means 'else if' — another condition to check. else is the fallback when nothing else matches.\n\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('Keep trying!')\n\nPython checks each condition top-to-bottom and runs the first match."
        },
        {
          "id": "coding-101-l03-c3",
          "title": "Comparison Operators",
          "content": "Conditionals use comparison operators: == (equals), != (not equals), > (greater than), < (less than), >= (greater or equal), <= (less or equal). Important: = assigns a value, but == compares two values. 5 == 5 is True. 5 == 3 is False."
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l03-f1",
          "front": "Lets the computer make a decision",
          "back": "If statement"
        },
        {
          "id": "coding-101-l03-f2",
          "front": "Means 'else if' — another condition to check",
          "back": "elif"
        },
        {
          "id": "coding-101-l03-f3",
          "front": "Runs when no other condition is True",
          "back": "else"
        },
        {
          "id": "coding-101-l03-f4",
          "front": "== checks equality, but = does this",
          "back": "Assigns a value"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l03-q1",
          "text": "What does an if statement do?",
          "options": [
            {
              "id": "a",
              "text": "Lets the computer make a decision"
            },
            {
              "id": "b",
              "text": "Stores a value"
            },
            {
              "id": "c",
              "text": "Repeats code"
            },
            {
              "id": "d",
              "text": "Defines a function"
            }
          ],
          "correctOptionId": "a",
          "explanation": "If statements check a condition and decide what to do!"
        },
        {
          "id": "coding-101-l03-q2",
          "text": "If score = 85, which branch runs?\nif score >= 90: print('A')\nelif score >= 80: print('B')\nelse: print('C')",
          "options": [
            {
              "id": "a",
              "text": "B"
            },
            {
              "id": "b",
              "text": "A"
            },
            {
              "id": "c",
              "text": "C"
            },
            {
              "id": "d",
              "text": "Nothing"
            }
          ],
          "correctOptionId": "a",
          "explanation": "85 is not >= 90, but it IS >= 80, so the elif branch runs: B!"
        },
        {
          "id": "coding-101-l03-q3",
          "text": "The operator == checks",
          "options": [
            {
              "id": "a",
              "text": "If two values are equal"
            },
            {
              "id": "b",
              "text": "If a value is greater"
            },
            {
              "id": "c",
              "text": "If a value is less"
            },
            {
              "id": "d",
              "text": "Assigns a value"
            }
          ],
          "correctOptionId": "a",
          "explanation": "== compares, = assigns. Important difference!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l03-act1",
          "type": "project_builder",
          "title": "Weather advisor",
          "description": "Write a program (on paper or in code) that asks for the temperature and gives advice:\nif temp > 85: 'Wear sunscreen!'\nelif temp > 60: 'Nice day!'\nelif temp > 32: 'Grab a jacket!'\nelse: 'Stay warm — it's freezing!'"
        }
      ],
      "learningAids": [
        {
          "id": "coding-101-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "coding-101-l04",
      "title": "Coding Checkpoint",
      "type": "quiz",
      "duration": 8,
      "chunks": [
        {
          "id": "coding-101-l04-c1",
          "title": "Code and Algorithms Review",
          "content": "Code gives computers step-by-step instructions. Algorithms are plans before you code. Programming languages include Python, JavaScript, and Scratch."
        },
        {
          "id": "coding-101-l04-c2",
          "title": "Variables and Conditionals Review",
          "content": "Variables store data (strings, integers, floats, booleans). Conditionals (if/elif/else) let the computer make decisions based on conditions."
        },
        {
          "id": "coding-101-l04-c3",
          "title": "Keep Coding!",
          "content": "You understand the basics: instructions, data storage, and decision-making. Next: loops, functions, and data structures!"
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l04-f1",
          "front": "Text in quotes like 'hello'",
          "back": "String"
        },
        {
          "id": "coding-101-l04-f2",
          "front": "True or False data type",
          "back": "Boolean"
        },
        {
          "id": "coding-101-l04-f3",
          "front": "Keyword for 'else if' in Python",
          "back": "elif"
        },
        {
          "id": "coding-101-l04-f4",
          "front": "Set of instructions for a computer",
          "back": "Code"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l04-q1",
          "text": "Which data type stores whole numbers?",
          "options": [
            {
              "id": "a",
              "text": "Integer"
            },
            {
              "id": "b",
              "text": "String"
            },
            {
              "id": "c",
              "text": "Boolean"
            },
            {
              "id": "d",
              "text": "Float"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Integers are whole numbers like 1, 42, or -7!"
        },
        {
          "id": "coding-101-l04-q2",
          "text": "What runs when no if or elif condition is True?",
          "options": [
            {
              "id": "a",
              "text": "else"
            },
            {
              "id": "b",
              "text": "elif"
            },
            {
              "id": "c",
              "text": "if"
            },
            {
              "id": "d",
              "text": "print"
            }
          ],
          "correctOptionId": "a",
          "explanation": "else is the fallback — it catches everything else!"
        },
        {
          "id": "coding-101-l04-q3",
          "text": "A plan to solve a problem step-by-step is called",
          "options": [
            {
              "id": "a",
              "text": "An algorithm"
            },
            {
              "id": "b",
              "text": "A variable"
            },
            {
              "id": "c",
              "text": "A string"
            },
            {
              "id": "d",
              "text": "A condition"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Algorithms plan out the steps before writing code!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l04-act1",
          "type": "project_builder",
          "title": "Debug challenge",
          "description": "Find the errors in this pseudocode and fix them:\nmy name = 'Alex' (hint: spaces!)\nif age = 10: (hint: = vs ==)\n    print('You are ten')\nelif:\n    print('Not ten') (hint: elif needs a condition!)"
        }
      ],
      "learningAids": [
        {
          "id": "coding-101-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "coding-101-l05",
      "title": "Loops: For and While",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "coding-101-l05-c1",
          "title": "For Loops",
          "content": "A for loop repeats code a set number of times.\n\nfor i in range(5):\n    print('Hello!')\n\nThis prints 'Hello!' five times. range(5) generates numbers 0, 1, 2, 3, 4. For loops are great when you know how many times to repeat."
        },
        {
          "id": "coding-101-l05-c2",
          "title": "While Loops",
          "content": "A while loop repeats as long as a condition is True.\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count = count + 1\n\nThis prints 0, 1, 2. When count reaches 3 the condition is False and the loop stops. Warning: forgetting count = count + 1 creates an infinite loop!"
        },
        {
          "id": "coding-101-l05-c3",
          "title": "When to Use Each",
          "content": "Use a for loop when you know exactly how many times to repeat (like counting 1 to 10). Use a while loop when you want to repeat until something changes (like asking for a password until it's correct). Loops save you from writing the same code over and over."
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l05-f1",
          "front": "Repeats code a specific number of times",
          "back": "For loop"
        },
        {
          "id": "coding-101-l05-f2",
          "front": "Repeats as long as a condition is True",
          "back": "While loop"
        },
        {
          "id": "coding-101-l05-f3",
          "front": "range(5) produces these numbers",
          "back": "0, 1, 2, 3, 4"
        },
        {
          "id": "coding-101-l05-f4",
          "front": "A loop that never stops because the condition never becomes False",
          "back": "Infinite loop"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l05-q1",
          "text": "for i in range(3): print(i) will print",
          "options": [
            {
              "id": "a",
              "text": "0, 1, 2"
            },
            {
              "id": "b",
              "text": "1, 2, 3"
            },
            {
              "id": "c",
              "text": "3, 2, 1"
            },
            {
              "id": "d",
              "text": "0, 1, 2, 3"
            }
          ],
          "correctOptionId": "a",
          "explanation": "range(3) starts at 0 and goes up to but not including 3!"
        },
        {
          "id": "coding-101-l05-q2",
          "text": "A while loop stops when",
          "options": [
            {
              "id": "a",
              "text": "Its condition becomes False"
            },
            {
              "id": "b",
              "text": "It runs once"
            },
            {
              "id": "c",
              "text": "The computer gets tired"
            },
            {
              "id": "d",
              "text": "It reaches 100"
            }
          ],
          "correctOptionId": "a",
          "explanation": "While loops check their condition each time — False means stop!"
        },
        {
          "id": "coding-101-l05-q3",
          "text": "Use a for loop when you",
          "options": [
            {
              "id": "a",
              "text": "Know how many times to repeat"
            },
            {
              "id": "b",
              "text": "Don't know when to stop"
            },
            {
              "id": "c",
              "text": "Want to make a decision"
            },
            {
              "id": "d",
              "text": "Store a value"
            }
          ],
          "correctOptionId": "a",
          "explanation": "For loops are ideal when the number of repetitions is known!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l05-act1",
          "type": "project_builder",
          "title": "Countdown timer",
          "description": "Write a program that counts down from 10 to 1 and then prints 'Blast off!'. Try it with both a for loop (for i in range(10, 0, -1)) and a while loop (while count > 0). Which feels easier?"
        }
      ]
    },
    {
      "id": "coding-101-l06",
      "title": "Functions",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "coding-101-l06-c1",
          "title": "What Are Functions?",
          "content": "A function is a reusable block of code with a name. In Python:\n\ndef greet(name):\n    print('Hello, ' + name + '!')\n\ngreet('Alex')  # prints: Hello, Alex!\ngreet('Sam')   # prints: Hello, Sam!\n\ndef means 'define a function'. You write the code once and call it many times."
        },
        {
          "id": "coding-101-l06-c2",
          "title": "Parameters and Return Values",
          "content": "Parameters are inputs a function needs. Return values are the outputs.\n\ndef add(a, b):\n    return a + b\n\nresult = add(3, 5)  # result is 8\n\nThe function takes two numbers, adds them, and sends back the answer with return."
        },
        {
          "id": "coding-101-l06-c3",
          "title": "Why Functions Matter",
          "content": "Functions keep your code organized, avoid repetition, and make debugging easier. If something breaks, you fix it in one function instead of many places. Python has built-in functions too: print(), len(), input(), range(). You can build your own library of useful functions!"
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l06-f1",
          "front": "A reusable block of code with a name",
          "back": "Function"
        },
        {
          "id": "coding-101-l06-f2",
          "front": "Inputs that a function needs to work",
          "back": "Parameters (arguments)"
        },
        {
          "id": "coding-101-l06-f3",
          "front": "Keyword that sends a value back from a function",
          "back": "return"
        },
        {
          "id": "coding-101-l06-f4",
          "front": "Keyword used to create a function in Python",
          "back": "def"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l06-q1",
          "text": "def greet(name): — what is 'name'?",
          "options": [
            {
              "id": "a",
              "text": "A parameter"
            },
            {
              "id": "b",
              "text": "A loop"
            },
            {
              "id": "c",
              "text": "A condition"
            },
            {
              "id": "d",
              "text": "A data type"
            }
          ],
          "correctOptionId": "a",
          "explanation": "name is an input (parameter) the function needs!"
        },
        {
          "id": "coding-101-l06-q2",
          "text": "What does 'return' do in a function?",
          "options": [
            {
              "id": "a",
              "text": "Sends a value back to the caller"
            },
            {
              "id": "b",
              "text": "Prints text on screen"
            },
            {
              "id": "c",
              "text": "Creates a loop"
            },
            {
              "id": "d",
              "text": "Stores a variable"
            }
          ],
          "correctOptionId": "a",
          "explanation": "return sends the result back so you can use it!"
        },
        {
          "id": "coding-101-l06-q3",
          "text": "Functions help you avoid",
          "options": [
            {
              "id": "a",
              "text": "Repeating the same code"
            },
            {
              "id": "b",
              "text": "Using variables"
            },
            {
              "id": "c",
              "text": "Making decisions"
            },
            {
              "id": "d",
              "text": "Using numbers"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Write once, call many times — no repetition!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l06-act1",
          "type": "project_builder",
          "title": "Calculator functions",
          "description": "Write four functions: add(a, b), subtract(a, b), multiply(a, b), and divide(a, b). Each should return the result. Test each one with print(add(10, 5)) and so on."
        }
      ]
    },
    {
      "id": "coding-101-l07",
      "title": "Lists and Basic Data Structures",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "coding-101-l07-c1",
          "title": "What Are Lists?",
          "content": "A list stores multiple values in one variable.\n\nfruits = ['apple', 'banana', 'cherry']\n\nAccess items by index (position, starting at 0): fruits[0] is 'apple', fruits[1] is 'banana'. Add items: fruits.append('grape'). Remove items: fruits.remove('banana')."
        },
        {
          "id": "coding-101-l07-c2",
          "title": "Looping Through Lists",
          "content": "Combine lists with for loops to process each item:\n\nfor fruit in fruits:\n    print(fruit)\n\nThis prints every fruit in the list. You can also use len(fruits) to find how many items are in the list. Lists make it easy to manage collections of data."
        },
        {
          "id": "coding-101-l07-c3",
          "title": "Dictionaries",
          "content": "A dictionary stores key-value pairs — like a real dictionary where each word has a definition.\n\nstudent = {'name': 'Alex', 'age': 10, 'grade': 5}\nprint(student['name'])  # Alex\n\nDictionaries are great when you want to look up a value by its label instead of a number."
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l07-f1",
          "front": "A variable that stores multiple values in order",
          "back": "List"
        },
        {
          "id": "coding-101-l07-f2",
          "front": "Index of the first item in a list",
          "back": "0 (zero)"
        },
        {
          "id": "coding-101-l07-f3",
          "front": "Adds an item to the end of a list",
          "back": ".append()"
        },
        {
          "id": "coding-101-l07-f4",
          "front": "Stores key-value pairs",
          "back": "Dictionary"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l07-q1",
          "text": "fruits = ['apple', 'banana', 'cherry']. What is fruits[0]?",
          "options": [
            {
              "id": "a",
              "text": "'apple'"
            },
            {
              "id": "b",
              "text": "'banana'"
            },
            {
              "id": "c",
              "text": "'cherry'"
            },
            {
              "id": "d",
              "text": "0"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Lists start counting at index 0, so fruits[0] is 'apple'!"
        },
        {
          "id": "coding-101-l07-q2",
          "text": "To add 'grape' to a list called fruits, you write",
          "options": [
            {
              "id": "a",
              "text": "fruits.append('grape')"
            },
            {
              "id": "b",
              "text": "fruits.add('grape')"
            },
            {
              "id": "c",
              "text": "fruits + 'grape'"
            },
            {
              "id": "d",
              "text": "fruits[grape]"
            }
          ],
          "correctOptionId": "a",
          "explanation": ".append() adds an item to the end of a list!"
        },
        {
          "id": "coding-101-l07-q3",
          "text": "A dictionary stores",
          "options": [
            {
              "id": "a",
              "text": "Key-value pairs"
            },
            {
              "id": "b",
              "text": "Only numbers"
            },
            {
              "id": "c",
              "text": "Only strings"
            },
            {
              "id": "d",
              "text": "A single value"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Dictionaries pair keys with values, like 'name': 'Alex'!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l07-act1",
          "type": "project_builder",
          "title": "Favorites list program",
          "description": "Create a list of your 5 favorite movies. Write a for loop that prints each one numbered: '1. Movie Name'. Use a counter variable or enumerate(). Then create a dictionary for your top movie with keys: title, year, genre, rating."
        }
      ]
    },
    {
      "id": "coding-101-l08",
      "title": "Final Coding Assessment",
      "type": "quiz",
      "duration": 10,
      "chunks": [
        {
          "id": "coding-101-l08-c1",
          "title": "Code, Variables, and Conditionals Review",
          "content": "Code is instructions for computers. Variables store data (strings, integers, floats, booleans). Conditionals (if/elif/else) make decisions."
        },
        {
          "id": "coding-101-l08-c2",
          "title": "Loops and Functions Review",
          "content": "For loops repeat a known number of times. While loops repeat until a condition is False. Functions are reusable blocks of code with parameters and return values."
        },
        {
          "id": "coding-101-l08-c3",
          "title": "Data Structures Review",
          "content": "Lists store ordered collections accessed by index. Dictionaries store key-value pairs. Combining these tools lets you build real programs!"
        }
      ],
      "flashcards": [
        {
          "id": "coding-101-l08-f1",
          "front": "def means",
          "back": "Define a function"
        },
        {
          "id": "coding-101-l08-f2",
          "front": "range(3) produces",
          "back": "0, 1, 2"
        },
        {
          "id": "coding-101-l08-f3",
          "front": "List index starts at",
          "back": "0"
        },
        {
          "id": "coding-101-l08-f4",
          "front": "= assigns, == does this",
          "back": "Compares for equality"
        }
      ],
      "questions": [
        {
          "id": "coding-101-l08-q1",
          "text": "What is the output of: add(4, 6) where def add(a, b): return a + b",
          "options": [
            {
              "id": "a",
              "text": "10"
            },
            {
              "id": "b",
              "text": "46"
            },
            {
              "id": "c",
              "text": "4"
            },
            {
              "id": "d",
              "text": "Error"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The function adds 4 + 6 and returns 10!"
        },
        {
          "id": "coding-101-l08-q2",
          "text": "A loop that never stops is called",
          "options": [
            {
              "id": "a",
              "text": "An infinite loop"
            },
            {
              "id": "b",
              "text": "A broken loop"
            },
            {
              "id": "c",
              "text": "A dead loop"
            },
            {
              "id": "d",
              "text": "A final loop"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Infinite loops run forever because the condition never becomes False!"
        },
        {
          "id": "coding-101-l08-q3",
          "text": "student = {'name': 'Sam', 'age': 12}. student['age'] returns",
          "options": [
            {
              "id": "a",
              "text": "12"
            },
            {
              "id": "b",
              "text": "'Sam'"
            },
            {
              "id": "c",
              "text": "'age'"
            },
            {
              "id": "d",
              "text": "{'name': 'Sam'}"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The key 'age' maps to the value 12 in the dictionary!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "coding-101-l08-act1",
          "type": "project_builder",
          "title": "Mini quiz program",
          "description": "Build a quiz program that stores questions in a list, uses a for loop to ask each one, uses an if statement to check the answer, and uses a score variable to track correct answers. Print the final score at the end!"
        }
      ]
    }
  ]
};
