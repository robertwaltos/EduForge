import type { LearningModule } from "@/lib/modules/types";

export const UsCivics201Module: LearningModule = {
  "id": "us-civics-201",
  "title": "U.S. Civics: Government & the Constitution",
  "description": "Explore the foundations of American democracy — from the Constitution and Bill of Rights to the amendment process, federal courts, elections, and state and local government. Understand how citizens shape their government.",
  "subject": "Social Studies",
  "tags": [
    "civics",
    "government",
    "history",
    "curriculum",
    "interactive"
  ],
  "minAge": 12,
  "maxAge": 18,
  "version": "2.0.0",
  "difficultyBand": "intermediate",
  "localeSupport": [
    "en",
    "es"
  ],
  "learningObjectives": [
    "Explain the structure and purpose of the U.S. Constitution",
    "Identify key rights protected by the Bill of Rights and their modern applications",
    "Describe how the amendment process works and why it is intentionally difficult",
    "Explain the role of federal courts and the power of judicial review",
    "Analyze the U.S. election process including the Electoral College",
    "Compare the roles of state and local government to the federal government"
  ],
  "lessons": [
    {
      "id": "us-civics-201-l01",
      "title": "The U.S. Constitution",
      "type": "video",
      "duration": 13,
      "chunks": [
        {
          "id": "us-civics-201-l01-c1",
          "title": "Why a Constitution?",
          "content": "The U.S. Constitution, ratified in 1788, is the supreme law of the land. It replaced the Articles of Confederation, which created a central government too weak to collect taxes, regulate trade, or enforce laws. The Founding Fathers met at the Constitutional Convention in Philadelphia in 1787. Their goal: create a government strong enough to function but limited enough to protect individual liberty."
        },
        {
          "id": "us-civics-201-l01-c2",
          "title": "Three Branches of Government",
          "content": "The Constitution establishes three branches to prevent any one group from having too much power — this is called separation of powers. Legislative (Congress: Senate + House of Representatives) makes laws. Executive (President + Cabinet) enforces laws. Judicial (Supreme Court + federal courts) interprets laws. Each branch can check the others: the President can veto Congress's laws, Congress can override a veto with 2/3 vote, and the Supreme Court can declare laws unconstitutional."
        },
        {
          "id": "us-civics-201-l01-c3",
          "title": "Federalism and the Preamble",
          "content": "Federalism divides power between the national government and state governments. The national government handles defense, currency, and foreign policy. States handle education, driver's licenses, and local law enforcement. The Preamble begins 'We the People' — those three words mean the government's power comes from the citizens, not a king. The Preamble lists six goals: form a more perfect union, establish justice, ensure domestic tranquility, provide for common defense, promote general welfare, and secure the blessings of liberty."
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l01-f1",
          "front": "The year the U.S. Constitution was ratified",
          "back": "1788"
        },
        {
          "id": "us-civics-201-l01-f2",
          "front": "The principle of dividing government into three branches",
          "back": "Separation of powers"
        },
        {
          "id": "us-civics-201-l01-f3",
          "front": "System dividing power between national and state governments",
          "back": "Federalism"
        },
        {
          "id": "us-civics-201-l01-f4",
          "front": "The ability of each branch to limit the others' power",
          "back": "Checks and balances"
        }
      ],
      "questions": [
        {
          "id": "us-civics-201-l01-q1",
          "text": "Which branch of government makes laws?",
          "options": [
            {
              "id": "a",
              "text": "Legislative (Congress)"
            },
            {
              "id": "b",
              "text": "Executive (President)"
            },
            {
              "id": "c",
              "text": "Judicial (Supreme Court)"
            },
            {
              "id": "d",
              "text": "Military"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Congress (Senate + House) is the legislative branch — they write and pass laws!"
        },
        {
          "id": "us-civics-201-l01-q2",
          "text": "The Constitution replaced the",
          "options": [
            {
              "id": "a",
              "text": "Articles of Confederation"
            },
            {
              "id": "b",
              "text": "Declaration of Independence"
            },
            {
              "id": "c",
              "text": "Magna Carta"
            },
            {
              "id": "d",
              "text": "Emancipation Proclamation"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Articles of Confederation were too weak — the Constitution created a stronger federal government!"
        },
        {
          "id": "us-civics-201-l01-q3",
          "text": "'We the People' in the Preamble means",
          "options": [
            {
              "id": "a",
              "text": "The government's power comes from the citizens"
            },
            {
              "id": "b",
              "text": "Only elected officials have rights"
            },
            {
              "id": "c",
              "text": "The President rules alone"
            },
            {
              "id": "d",
              "text": "Laws cannot be changed"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Popular sovereignty — the people are the source of government power!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "us-civics-201-l01-act1",
          "type": "sorting_buckets",
          "title": "Branch sorting",
          "description": "Sort these powers into the correct branch: Makes laws, Vetoes bills, Rules laws unconstitutional, Commands the military, Confirms judges, Interprets the Constitution."
        }
      ],
      "learningAids": [
        {
          "id": "us-civics-201-l01-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "us-civics-201-l02",
      "title": "The Bill of Rights",
      "type": "interactive",
      "duration": 13,
      "chunks": [
        {
          "id": "us-civics-201-l02-c1",
          "title": "Why the Bill of Rights?",
          "content": "Many states refused to ratify the Constitution without a guarantee of individual rights. James Madison drafted the Bill of Rights — the first 10 amendments — ratified in 1791. They protect citizens from government overreach. Without them, the Constitution might never have been approved. The Anti-Federalists demanded these protections because they feared a powerful central government could become tyrannical."
        },
        {
          "id": "us-civics-201-l02-c2",
          "title": "Key Amendments 1-5",
          "content": "1st Amendment: freedom of speech, religion, press, assembly, and petition. You can criticize the government, practice any religion, and protest peacefully. 2nd: right to bear arms. 3rd: no quartering soldiers in homes. 4th: protection against unreasonable search and seizure — police need a warrant. 5th: rights of the accused — no self-incrimination ('pleading the Fifth'), no double jeopardy (tried twice for same crime), right to due process."
        },
        {
          "id": "us-civics-201-l02-c3",
          "title": "Key Amendments 6-10",
          "content": "6th: right to a speedy and public trial by jury, right to a lawyer. 7th: right to jury trial in civil cases over $20. 8th: no excessive bail or cruel and unusual punishment. 9th: rights not listed in the Constitution still belong to the people. 10th: powers not given to the federal government are reserved to the states or the people. Together, these amendments balance government power with individual freedom."
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l02-f1",
          "front": "The first 10 amendments to the Constitution",
          "back": "The Bill of Rights (ratified 1791)"
        },
        {
          "id": "us-civics-201-l02-f2",
          "front": "Amendment protecting freedom of speech, religion, press, assembly, and petition",
          "back": "1st Amendment"
        },
        {
          "id": "us-civics-201-l02-f3",
          "front": "Amendment requiring police to have a warrant for searches",
          "back": "4th Amendment"
        },
        {
          "id": "us-civics-201-l02-f4",
          "front": "The right to remain silent and not incriminate yourself",
          "back": "5th Amendment ('pleading the Fifth')"
        }
      ],
      "questions": [
        {
          "id": "us-civics-201-l02-q1",
          "text": "The 1st Amendment protects all of these EXCEPT",
          "options": [
            {
              "id": "a",
              "text": "The right to bear arms"
            },
            {
              "id": "b",
              "text": "Freedom of speech"
            },
            {
              "id": "c",
              "text": "Freedom of religion"
            },
            {
              "id": "d",
              "text": "Freedom of the press"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The right to bear arms is the 2nd Amendment, not the 1st!"
        },
        {
          "id": "us-civics-201-l02-q2",
          "text": "'Pleading the Fifth' means",
          "options": [
            {
              "id": "a",
              "text": "Exercising the right not to incriminate yourself"
            },
            {
              "id": "b",
              "text": "Asking for a jury trial"
            },
            {
              "id": "c",
              "text": "Requesting a lawyer"
            },
            {
              "id": "d",
              "text": "Appealing a court decision"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 5th Amendment protects you from being forced to testify against yourself!"
        },
        {
          "id": "us-civics-201-l02-q3",
          "text": "The 10th Amendment says powers not given to the federal government belong to",
          "options": [
            {
              "id": "a",
              "text": "The states or the people"
            },
            {
              "id": "b",
              "text": "The President"
            },
            {
              "id": "c",
              "text": "The Supreme Court"
            },
            {
              "id": "d",
              "text": "The military"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 10th Amendment reserves unlisted powers to states and citizens!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "us-civics-201-l02-act1",
          "type": "matching_pairs",
          "title": "Amendment matcher",
          "description": "Match each amendment number with its protection: 1st → Free speech/religion, 2nd → Bear arms, 4th → No unreasonable search, 5th → No self-incrimination, 6th → Speedy trial, 8th → No cruel punishment."
        }
      ],
      "learningAids": [
        {
          "id": "us-civics-201-l02-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "us-civics-201-l03",
      "title": "The Amendment Process",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "us-civics-201-l03-c1",
          "title": "How Amendments Are Proposed",
          "content": "The Constitution can be amended, but it's intentionally hard — the Founders wanted a stable foundation. There are two ways to propose an amendment: (1) Two-thirds vote in BOTH the House and Senate (this is how all 27 amendments have been proposed), or (2) A national convention called by two-thirds of state legislatures (this has NEVER been used). The high threshold ensures only widely-supported changes move forward."
        },
        {
          "id": "us-civics-201-l03-c2",
          "title": "How Amendments Are Ratified",
          "content": "After proposal, an amendment must be ratified (approved) by three-fourths of the states (38 out of 50 today). States can ratify through their legislatures or special state conventions. Only the 21st Amendment (repealing Prohibition) used the convention method. This two-step process — proposal then ratification — means even popular ideas must have overwhelming national support."
        },
        {
          "id": "us-civics-201-l03-c3",
          "title": "Important Amendments Beyond the Bill of Rights",
          "content": "The Constitution has been amended 27 times total. Key additions: 13th (1865) — abolished slavery. 14th (1868) — equal protection and due process for all citizens, birthright citizenship. 15th (1870) — voting rights regardless of race. 19th (1920) — women's right to vote. 22nd (1951) — presidential two-term limit. 26th (1971) — voting age lowered to 18. Each amendment reflects a moment when Americans demanded change."
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l03-f1",
          "front": "Fraction of Congress needed to propose an amendment",
          "back": "Two-thirds of both the House and Senate"
        },
        {
          "id": "us-civics-201-l03-f2",
          "front": "Fraction of states needed to ratify an amendment",
          "back": "Three-fourths (38 out of 50)"
        },
        {
          "id": "us-civics-201-l03-f3",
          "front": "Amendment that abolished slavery (1865)",
          "back": "13th Amendment"
        },
        {
          "id": "us-civics-201-l03-f4",
          "front": "Amendment that gave women the right to vote (1920)",
          "back": "19th Amendment"
        }
      ],
      "questions": [
        {
          "id": "us-civics-201-l03-q1",
          "text": "How many states must ratify an amendment for it to become law?",
          "options": [
            {
              "id": "a",
              "text": "Three-fourths (38 out of 50)"
            },
            {
              "id": "b",
              "text": "Half (25 out of 50)"
            },
            {
              "id": "c",
              "text": "All 50"
            },
            {
              "id": "d",
              "text": "Two-thirds (34 out of 50)"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Three-fourths = 75% of states must approve — a very high bar!"
        },
        {
          "id": "us-civics-201-l03-q2",
          "text": "The 19th Amendment (1920) gave which group the right to vote?",
          "options": [
            {
              "id": "a",
              "text": "Women"
            },
            {
              "id": "b",
              "text": "18-year-olds"
            },
            {
              "id": "c",
              "text": "Non-citizens"
            },
            {
              "id": "d",
              "text": "Formerly enslaved people"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 19th Amendment guaranteed women's suffrage nationwide!"
        },
        {
          "id": "us-civics-201-l03-q3",
          "text": "How many times has the Constitution been amended?",
          "options": [
            {
              "id": "a",
              "text": "27 times"
            },
            {
              "id": "b",
              "text": "10 times"
            },
            {
              "id": "c",
              "text": "50 times"
            },
            {
              "id": "d",
              "text": "100 times"
            }
          ],
          "correctOptionId": "a",
          "explanation": "27 amendments total — 10 were the Bill of Rights, 17 came later!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "us-civics-201-l03-act1",
          "type": "timeline_builder",
          "title": "Amendment timeline",
          "description": "Put these amendments in chronological order: Bill of Rights (1791), 13th Abolishes Slavery (1865), 19th Women's Vote (1920), 26th Voting Age 18 (1971)."
        }
      ],
      "learningAids": [
        {
          "id": "us-civics-201-l03-a1",
          "type": "image",
          "title": "Concept Card",
          "content": "Visual summary of the lesson's main concept."
        }
      ]
    },
    {
      "id": "us-civics-201-l04",
      "title": "Civics Checkpoint",
      "type": "quiz",
      "duration": 8,
      "questions": [
        {
          "id": "us-civics-201-l04-q1",
          "text": "Which branch of government interprets laws and can declare them unconstitutional?",
          "options": [
            {
              "id": "a",
              "text": "Judicial (Supreme Court)"
            },
            {
              "id": "b",
              "text": "Legislative (Congress)"
            },
            {
              "id": "c",
              "text": "Executive (President)"
            },
            {
              "id": "d",
              "text": "Military"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The judicial branch interprets the Constitution and can strike down unconstitutional laws!"
        },
        {
          "id": "us-civics-201-l04-q2",
          "text": "The 4th Amendment protects citizens from",
          "options": [
            {
              "id": "a",
              "text": "Unreasonable search and seizure without a warrant"
            },
            {
              "id": "b",
              "text": "Being forced to house soldiers"
            },
            {
              "id": "c",
              "text": "Excessive taxes"
            },
            {
              "id": "d",
              "text": "Having to serve on a jury"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 4th Amendment requires police to obtain a warrant based on probable cause!"
        },
        {
          "id": "us-civics-201-l04-q3",
          "text": "The amendment process requires two steps:",
          "options": [
            {
              "id": "a",
              "text": "Proposal (2/3 of Congress) then ratification (3/4 of states)"
            },
            {
              "id": "b",
              "text": "The President signs it alone"
            },
            {
              "id": "c",
              "text": "The Supreme Court votes on it"
            },
            {
              "id": "d",
              "text": "A national popular vote"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Two-thirds of Congress proposes, then three-fourths of states ratify!"
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l04-f1",
          "front": "Total number of amendments to the U.S. Constitution",
          "back": "27"
        },
        {
          "id": "us-civics-201-l04-f2",
          "front": "Who wrote the Bill of Rights?",
          "back": "James Madison"
        },
        {
          "id": "us-civics-201-l04-f3",
          "front": "Government system where power is divided between national and state levels",
          "back": "Federalism"
        },
        {
          "id": "us-civics-201-l04-f4",
          "front": "Amendment that abolished slavery",
          "back": "13th Amendment (1865)"
        }
      ],
      "learningAids": [
        {
          "id": "us-civics-201-l04-a1",
          "type": "mnemonic",
          "title": "Memory Cue",
          "content": "Use Plan, Solve, Explain to structure each response."
        }
      ]
    },
    {
      "id": "us-civics-201-l05",
      "title": "Federal Courts",
      "type": "video",
      "duration": 13,
      "chunks": [
        {
          "id": "us-civics-201-l05-c1",
          "title": "The Court System Structure",
          "content": "The federal court system has three levels. District Courts (94 total) are trial courts where cases start — they hear evidence and witnesses. Circuit Courts of Appeals (13 circuits) review district court decisions for legal errors. The Supreme Court (9 justices) is the highest court — its decisions are final and apply nationwide. Most cases never reach the Supreme Court; it hears only about 80 cases per year out of ~7,000 requests."
        },
        {
          "id": "us-civics-201-l05-c2",
          "title": "Judicial Review",
          "content": "Judicial review is the Supreme Court's power to declare laws or executive actions unconstitutional. This power wasn't explicitly written in the Constitution — it was established by the landmark case Marbury v. Madison (1803), decided by Chief Justice John Marshall. This case made the judiciary a co-equal branch. Famous examples: Brown v. Board of Education (1954) declared school segregation unconstitutional. Miranda v. Arizona (1966) required police to inform suspects of their rights."
        },
        {
          "id": "us-civics-201-l05-c3",
          "title": "How Justices Are Selected",
          "content": "The President nominates Supreme Court justices, and the Senate must confirm them by majority vote. Justices serve for life ('during good behavior'), which insulates them from political pressure. Currently there are 9 justices — 1 Chief Justice and 8 Associate Justices. Confirmation hearings can be contentious because the Court's decisions affect every American. Notable Chief Justices include John Marshall, Earl Warren, and John Roberts."
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l05-f1",
          "front": "The power to declare laws unconstitutional",
          "back": "Judicial review (established by Marbury v. Madison, 1803)"
        },
        {
          "id": "us-civics-201-l05-f2",
          "front": "Case that declared school segregation unconstitutional (1954)",
          "back": "Brown v. Board of Education"
        },
        {
          "id": "us-civics-201-l05-f3",
          "front": "Number of justices on the Supreme Court",
          "back": "9 (1 Chief Justice + 8 Associate Justices)"
        },
        {
          "id": "us-civics-201-l05-f4",
          "front": "How long Supreme Court justices serve",
          "back": "For life (during good behavior)"
        }
      ],
      "questions": [
        {
          "id": "us-civics-201-l05-q1",
          "text": "Judicial review was established by which landmark case?",
          "options": [
            {
              "id": "a",
              "text": "Marbury v. Madison (1803)"
            },
            {
              "id": "b",
              "text": "Brown v. Board of Education (1954)"
            },
            {
              "id": "c",
              "text": "Miranda v. Arizona (1966)"
            },
            {
              "id": "d",
              "text": "Roe v. Wade (1973)"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Marbury v. Madison established the Supreme Court's power to strike down unconstitutional laws!"
        },
        {
          "id": "us-civics-201-l05-q2",
          "text": "How many Supreme Court justices are there?",
          "options": [
            {
              "id": "a",
              "text": "9"
            },
            {
              "id": "b",
              "text": "12"
            },
            {
              "id": "c",
              "text": "7"
            },
            {
              "id": "d",
              "text": "15"
            }
          ],
          "correctOptionId": "a",
          "explanation": "9 justices: 1 Chief Justice and 8 Associate Justices!"
        },
        {
          "id": "us-civics-201-l05-q3",
          "text": "Who nominates Supreme Court justices?",
          "options": [
            {
              "id": "a",
              "text": "The President"
            },
            {
              "id": "b",
              "text": "Congress"
            },
            {
              "id": "c",
              "text": "State governors"
            },
            {
              "id": "d",
              "text": "The existing justices"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The President nominates, and the Senate confirms by majority vote!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "us-civics-201-l05-act1",
          "type": "matching_pairs",
          "title": "Landmark case matcher",
          "description": "Match each landmark case to its ruling: Marbury v. Madison → Judicial review, Brown v. Board → End school segregation, Miranda v. Arizona → Right to be informed of rights."
        }
      ]
    },
    {
      "id": "us-civics-201-l06",
      "title": "Elections and Voting",
      "type": "video",
      "duration": 13,
      "chunks": [
        {
          "id": "us-civics-201-l06-c1",
          "title": "The Electoral College",
          "content": "The President is NOT elected by popular vote alone — the Electoral College decides. Each state gets electors equal to its total members of Congress (senators + representatives). There are 538 total electoral votes; a candidate needs 270 to win. Most states are 'winner-take-all' — whoever wins the state's popular vote gets ALL its electoral votes. This means a candidate can win the presidency while losing the national popular vote (happened in 2000 and 2016)."
        },
        {
          "id": "us-civics-201-l06-c2",
          "title": "Voting Rights and Barriers",
          "content": "Voting rights expanded over time through amendments: 15th (race, 1870), 19th (women, 1920), 24th (no poll taxes, 1964), 26th (age 18, 1971). The Voting Rights Act of 1965 banned literacy tests and other discriminatory practices. Today, challenges include voter ID laws, gerrymandering (drawing district lines to favor one party), and access for voters with disabilities. Every citizen 18+ has the right to register and vote."
        },
        {
          "id": "us-civics-201-l06-c3",
          "title": "How Elections Work",
          "content": "Presidential elections happen every 4 years in November. The process: primaries/caucuses (parties choose nominees, January-June), national conventions (official nominations, summer), general election campaign (fall), Election Day (first Tuesday after first Monday in November). Congressional elections: all 435 House seats every 2 years, 1/3 of Senate seats every 2 years. Midterm elections (between presidential years) often serve as a referendum on the sitting President."
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l06-f1",
          "front": "Number of electoral votes needed to win the presidency",
          "back": "270 out of 538"
        },
        {
          "id": "us-civics-201-l06-f2",
          "front": "Drawing district boundaries to favor one party",
          "back": "Gerrymandering"
        },
        {
          "id": "us-civics-201-l06-f3",
          "front": "Law that banned literacy tests and discriminatory voting practices (1965)",
          "back": "Voting Rights Act"
        },
        {
          "id": "us-civics-201-l06-f4",
          "front": "Elections held between presidential elections",
          "back": "Midterm elections"
        }
      ],
      "questions": [
        {
          "id": "us-civics-201-l06-q1",
          "text": "How many electoral votes are needed to win the presidency?",
          "options": [
            {
              "id": "a",
              "text": "270"
            },
            {
              "id": "b",
              "text": "200"
            },
            {
              "id": "c",
              "text": "538"
            },
            {
              "id": "d",
              "text": "435"
            }
          ],
          "correctOptionId": "a",
          "explanation": "A candidate needs a majority of the 538 electoral votes — that's 270!"
        },
        {
          "id": "us-civics-201-l06-q2",
          "text": "The 24th Amendment (1964) banned",
          "options": [
            {
              "id": "a",
              "text": "Poll taxes"
            },
            {
              "id": "b",
              "text": "Slavery"
            },
            {
              "id": "c",
              "text": "Alcohol"
            },
            {
              "id": "d",
              "text": "Cruel punishment"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Poll taxes had been used to prevent poor people and minorities from voting!"
        },
        {
          "id": "us-civics-201-l06-q3",
          "text": "Gerrymandering means",
          "options": [
            {
              "id": "a",
              "text": "Drawing district boundaries to favor one political party"
            },
            {
              "id": "b",
              "text": "Registering to vote"
            },
            {
              "id": "c",
              "text": "Counting ballots"
            },
            {
              "id": "d",
              "text": "Running for office"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Gerrymandering manipulates district maps to give one party an unfair advantage!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "us-civics-201-l06-act1",
          "type": "timeline_builder",
          "title": "Voting rights timeline",
          "description": "Arrange these voting expansions chronologically: 15th Amendment (race), 19th Amendment (women), 24th Amendment (poll taxes), Voting Rights Act, 26th Amendment (age 18)."
        }
      ]
    },
    {
      "id": "us-civics-201-l07",
      "title": "State and Local Government",
      "type": "video",
      "duration": 12,
      "chunks": [
        {
          "id": "us-civics-201-l07-c1",
          "title": "State Government Structure",
          "content": "Every state has its own constitution, governor, legislature, and court system — mirroring the federal structure. The governor is the state's chief executive, elected by the state's voters. State legislatures (usually a Senate and House/Assembly) make state laws. States handle education, healthcare (Medicaid), transportation (highways), criminal law, and business licensing. The 10th Amendment reserves these powers to the states."
        },
        {
          "id": "us-civics-201-l07-c2",
          "title": "Local Government",
          "content": "Local governments are closest to citizens. Counties, cities, and towns handle police and fire departments, public schools, libraries, parks, water and sewage, zoning (what can be built where), and local roads. Mayors, city councils, county commissioners, and school boards are elected by local voters. Local government directly impacts daily life — the quality of your roads, schools, and parks depends on decisions made at city hall."
        },
        {
          "id": "us-civics-201-l07-c3",
          "title": "How Citizens Participate",
          "content": "Democracy works best when citizens participate beyond just voting. Citizens can attend town hall meetings, speak at school board hearings, write letters to representatives, serve jury duty, run for local office, organize community events, and petition the government for change. Civic engagement strengthens communities. As the saying goes: all politics is local — the decisions that affect you most happen in your own city and state."
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l07-f1",
          "front": "The chief executive of a state government",
          "back": "Governor"
        },
        {
          "id": "us-civics-201-l07-f2",
          "front": "Local government bodies that oversee public education",
          "back": "School boards"
        },
        {
          "id": "us-civics-201-l07-f3",
          "front": "Laws that determine what types of buildings can be built where",
          "back": "Zoning laws"
        },
        {
          "id": "us-civics-201-l07-f4",
          "front": "The principle that citizens actively participate in their government",
          "back": "Civic engagement"
        }
      ],
      "questions": [
        {
          "id": "us-civics-201-l07-q1",
          "text": "Which level of government typically manages public schools?",
          "options": [
            {
              "id": "a",
              "text": "Local government (school boards)"
            },
            {
              "id": "b",
              "text": "The President"
            },
            {
              "id": "c",
              "text": "The Supreme Court"
            },
            {
              "id": "d",
              "text": "The United Nations"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Local school boards make decisions about curriculum, budgets, and school policies!"
        },
        {
          "id": "us-civics-201-l07-q2",
          "text": "A governor is the chief executive of",
          "options": [
            {
              "id": "a",
              "text": "A state"
            },
            {
              "id": "b",
              "text": "The nation"
            },
            {
              "id": "c",
              "text": "A city"
            },
            {
              "id": "d",
              "text": "A county"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The governor leads the state government, similar to how the President leads the federal government!"
        },
        {
          "id": "us-civics-201-l07-q3",
          "text": "Citizens can participate in government by doing all of these EXCEPT",
          "options": [
            {
              "id": "a",
              "text": "Declaring laws unconstitutional"
            },
            {
              "id": "b",
              "text": "Attending town hall meetings"
            },
            {
              "id": "c",
              "text": "Voting in elections"
            },
            {
              "id": "d",
              "text": "Writing to representatives"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Only the courts can declare laws unconstitutional — citizens participate through voting, attending meetings, and civic engagement!"
        }
      ],
      "interactiveActivities": [
        {
          "id": "us-civics-201-l07-act1",
          "type": "sorting_buckets",
          "title": "Government level sort",
          "description": "Sort these responsibilities: Federal, State, or Local? National defense, Public schools, Fire department, Interstate highways, Driver's licenses, Foreign policy, Parks and recreation, Criminal law."
        }
      ]
    },
    {
      "id": "us-civics-201-l08",
      "title": "Civics Final Assessment",
      "type": "quiz",
      "duration": 10,
      "questions": [
        {
          "id": "us-civics-201-l08-q1",
          "text": "The system of checks and balances means",
          "options": [
            {
              "id": "a",
              "text": "Each branch can limit the power of the other branches"
            },
            {
              "id": "b",
              "text": "The President controls all branches"
            },
            {
              "id": "c",
              "text": "Laws cannot be changed"
            },
            {
              "id": "d",
              "text": "States have no power"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Checks and balances prevent any one branch from becoming too powerful!"
        },
        {
          "id": "us-civics-201-l08-q2",
          "text": "Brown v. Board of Education (1954) ruled that",
          "options": [
            {
              "id": "a",
              "text": "School segregation is unconstitutional"
            },
            {
              "id": "b",
              "text": "Women can vote"
            },
            {
              "id": "c",
              "text": "The President can serve three terms"
            },
            {
              "id": "d",
              "text": "Poll taxes are legal"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The Supreme Court declared 'separate but equal' schools violated the 14th Amendment!"
        },
        {
          "id": "us-civics-201-l08-q3",
          "text": "Each state's number of electoral votes equals",
          "options": [
            {
              "id": "a",
              "text": "Its total members of Congress (senators + representatives)"
            },
            {
              "id": "b",
              "text": "Its population in millions"
            },
            {
              "id": "c",
              "text": "The number of counties in the state"
            },
            {
              "id": "d",
              "text": "10 per state equally"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Electoral votes = 2 senators + number of House representatives (based on population)!"
        }
      ],
      "flashcards": [
        {
          "id": "us-civics-201-l08-f1",
          "front": "The supreme law of the United States",
          "back": "The Constitution"
        },
        {
          "id": "us-civics-201-l08-f2",
          "front": "Number of electoral votes to win the presidency",
          "back": "270 out of 538"
        },
        {
          "id": "us-civics-201-l08-f3",
          "front": "Case establishing judicial review",
          "back": "Marbury v. Madison (1803)"
        },
        {
          "id": "us-civics-201-l08-f4",
          "front": "The first three words of the Constitution",
          "back": "'We the People'"
        }
      ]
    }
  ]
};
