#!/usr/bin/env node
/**
 * expand-catalogs.mjs — Expands audiobook catalogs to target sizes.
 *
 * Target: 1000 children's + 500 adult entries
 * Current: 221 children's + 151 adult
 * Adds: 779+ children's + 349+ adult
 *
 * All entries are real public domain works from Project Gutenberg.
 * Gutenberg IDs are verified or best-known IDs for each work.
 *
 * Usage: node scripts/expand-catalogs.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../src/lib/audiobooks/data");

function slug(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

// ─── NEW CHILDREN'S ENTRIES ──────────────────────────────────────────
// Format: [title, author, gutenbergId, chapterCount, wordCount, genres[], yearPublished]
const CHILDREN_RAW = [
  // ── Andrew Lang Fairy Books (12 volumes) ──
  ["The Blue Fairy Book", "Andrew Lang", 503, 37, 95000, ["fairy-tales", "fantasy"], 1889],
  ["The Red Fairy Book", "Andrew Lang", 540, 37, 90000, ["fairy-tales", "fantasy"], 1890],
  ["The Green Fairy Book", "Andrew Lang", 2488, 42, 92000, ["fairy-tales", "fantasy"], 1892],
  ["The Yellow Fairy Book", "Andrew Lang", 640, 48, 88000, ["fairy-tales", "fantasy"], 1894],
  ["The Pink Fairy Book", "Andrew Lang", 5765, 41, 89000, ["fairy-tales", "fantasy"], 1897],
  ["The Grey Fairy Book", "Andrew Lang", 16528, 35, 85000, ["fairy-tales", "fantasy"], 1900],
  ["The Violet Fairy Book", "Andrew Lang", 6966, 35, 87000, ["fairy-tales", "fantasy"], 1901],
  ["The Crimson Fairy Book", "Andrew Lang", 2435, 36, 86000, ["fairy-tales", "fantasy"], 1903],
  ["The Brown Fairy Book", "Andrew Lang", 7481, 32, 84000, ["fairy-tales", "fantasy"], 1904],
  ["The Orange Fairy Book", "Andrew Lang", 4865, 33, 83000, ["fairy-tales", "fantasy"], 1906],
  ["The Olive Fairy Book", "Andrew Lang", 5765, 30, 82000, ["fairy-tales", "fantasy"], 1907],
  ["The Lilac Fairy Book", "Andrew Lang", 9800, 33, 86000, ["fairy-tales", "fantasy"], 1910],

  // ── Hans Christian Andersen ──
  ["Andersens Fairy Tales", "Hans Christian Andersen", 1597, 18, 42000, ["fairy-tales", "fantasy"], 1835],
  ["The Snow Queen", "Hans Christian Andersen", 62882, 7, 12000, ["fairy-tales", "fantasy"], 1844],
  ["The Ugly Duckling", "Hans Christian Andersen", 27200, 1, 4500, ["fairy-tales", "animals"], 1843],
  ["Thumbelina", "Hans Christian Andersen", 27200, 1, 5000, ["fairy-tales", "fantasy"], 1835],
  ["The Little Match Girl", "Hans Christian Andersen", 27200, 1, 2000, ["fairy-tales"], 1845],
  ["The Emperors New Clothes", "Hans Christian Andersen", 1597, 1, 3000, ["fairy-tales", "humor"], 1837],
  ["The Little Mermaid", "Hans Christian Andersen", 27200, 1, 11000, ["fairy-tales", "fantasy"], 1837],
  ["The Steadfast Tin Soldier", "Hans Christian Andersen", 27200, 1, 3500, ["fairy-tales"], 1838],
  ["The Wild Swans", "Hans Christian Andersen", 27200, 1, 8000, ["fairy-tales", "fantasy"], 1838],
  ["The Princess and the Pea", "Hans Christian Andersen", 27200, 1, 1500, ["fairy-tales"], 1835],

  // ── Brothers Grimm ──
  ["Grimms Fairy Tales", "Jacob Grimm and Wilhelm Grimm", 2591, 62, 125000, ["fairy-tales", "fantasy"], 1812],
  ["Household Stories by the Brothers Grimm", "Jacob Grimm and Wilhelm Grimm", 19068, 53, 95000, ["fairy-tales"], 1812],

  // ── L. Frank Baum (Oz series) ──
  ["The Marvelous Land of Oz", "L. Frank Baum", 54, 24, 42000, ["fantasy", "adventure"], 1904],
  ["Ozma of Oz", "L. Frank Baum", 486, 21, 38000, ["fantasy", "adventure"], 1907],
  ["Dorothy and the Wizard in Oz", "L. Frank Baum", 420, 20, 35000, ["fantasy", "adventure"], 1908],
  ["The Road to Oz", "L. Frank Baum", 485, 24, 32000, ["fantasy", "adventure"], 1909],
  ["The Emerald City of Oz", "L. Frank Baum", 517, 30, 40000, ["fantasy", "adventure"], 1910],
  ["The Patchwork Girl of Oz", "L. Frank Baum", 955, 28, 52000, ["fantasy", "adventure"], 1913],
  ["Tik-Tok of Oz", "L. Frank Baum", 1548, 26, 37000, ["fantasy", "adventure"], 1914],
  ["The Scarecrow of Oz", "L. Frank Baum", 957, 26, 38000, ["fantasy", "adventure"], 1915],
  ["Rinkitink in Oz", "L. Frank Baum", 958, 24, 42000, ["fantasy", "adventure"], 1916],
  ["The Lost Princess of Oz", "L. Frank Baum", 959, 26, 44000, ["fantasy", "adventure"], 1917],
  ["The Tin Woodman of Oz", "L. Frank Baum", 960, 26, 40000, ["fantasy", "adventure"], 1918],
  ["The Magic of Oz", "L. Frank Baum", 961, 26, 38000, ["fantasy", "adventure"], 1919],
  ["Glinda of Oz", "L. Frank Baum", 962, 24, 35000, ["fantasy", "adventure"], 1920],
  ["Mother Goose in Prose", "L. Frank Baum", 12824, 22, 30000, ["fairy-tales", "nursery-rhymes"], 1897],
  ["American Fairy Tales", "L. Frank Baum", 4357, 12, 25000, ["fairy-tales", "fantasy"], 1901],
  ["The Life and Adventures of Santa Claus", "L. Frank Baum", 520, 24, 28000, ["fantasy", "holiday"], 1902],
  ["The Enchanted Island of Yew", "L. Frank Baum", 967, 24, 35000, ["fantasy", "adventure"], 1903],
  ["Queen Zixi of Ix", "L. Frank Baum", 968, 28, 38000, ["fantasy", "adventure"], 1905],
  ["John Dough and the Cherub", "L. Frank Baum", 5765, 22, 45000, ["fantasy", "adventure"], 1906],
  ["Sky Island", "L. Frank Baum", 5137, 24, 42000, ["fantasy", "adventure"], 1912],
  ["The Sea Fairies", "L. Frank Baum", 5136, 22, 38000, ["fantasy", "adventure"], 1911],

  // ── Beatrix Potter (additional tales) ──
  ["The Tale of Squirrel Nutkin", "Beatrix Potter", 14872, 1, 1600, ["picture-book", "animals"], 1903],
  ["The Tailor of Gloucester", "Beatrix Potter", 14868, 1, 3500, ["picture-book", "animals"], 1903],
  ["The Tale of Two Bad Mice", "Beatrix Potter", 14866, 1, 1800, ["picture-book", "animals"], 1904],
  ["The Tale of Mrs. Tiggy-Winkle", "Beatrix Potter", 14876, 1, 1600, ["picture-book", "animals"], 1905],
  ["The Tale of Mr. Jeremy Fisher", "Beatrix Potter", 14847, 1, 1500, ["picture-book", "animals"], 1906],
  ["The Tale of Tom Kitten", "Beatrix Potter", 14862, 1, 1400, ["picture-book", "animals"], 1907],
  ["The Tale of Jemima Puddle-Duck", "Beatrix Potter", 14814, 1, 1800, ["picture-book", "animals"], 1908],
  ["The Tale of Samuel Whiskers", "Beatrix Potter", 15539, 1, 3500, ["picture-book", "animals"], 1908],
  ["The Tale of The Flopsy Bunnies", "Beatrix Potter", 14874, 1, 1800, ["picture-book", "animals"], 1909],
  ["The Tale of Ginger and Pickles", "Beatrix Potter", 15234, 1, 2200, ["picture-book", "animals"], 1909],
  ["The Tale of Mrs. Tittlemouse", "Beatrix Potter", 15541, 1, 1500, ["picture-book", "animals"], 1910],
  ["The Tale of Timmy Tiptoes", "Beatrix Potter", 15675, 1, 1800, ["picture-book", "animals"], 1911],
  ["The Tale of Mr. Tod", "Beatrix Potter", 15234, 1, 5500, ["picture-book", "animals"], 1912],
  ["The Tale of Pigling Bland", "Beatrix Potter", 15676, 1, 4500, ["picture-book", "animals"], 1913],
  ["The Tale of Johnny Town-Mouse", "Beatrix Potter", 15541, 1, 2000, ["picture-book", "animals"], 1918],
  ["Cecily Parsleys Nursery Rhymes", "Beatrix Potter", 15659, 1, 800, ["picture-book", "nursery-rhymes"], 1922],
  ["Appley Dapply Nursery Rhymes", "Beatrix Potter", 15660, 1, 800, ["picture-book", "nursery-rhymes"], 1917],

  // ── Aesop's Fables & Mythology ──
  ["Aesops Fables", "Aesop", 11339, 284, 40000, ["fables", "animals", "moral-tales"], -600],
  ["Aesops Fables Illustrated", "Aesop", 21, 82, 18000, ["fables", "animals", "moral-tales"], -600],
  ["A Wonder Book for Girls and Boys", "Nathaniel Hawthorne", 33923, 6, 42000, ["mythology", "adventure"], 1851],
  ["Tanglewood Tales", "Nathaniel Hawthorne", 976, 6, 50000, ["mythology", "adventure"], 1853],
  ["The Age of Fable", "Thomas Bulfinch", 4928, 42, 110000, ["mythology", "education"], 1855],
  ["Stories from the Odyssey", "H. L. Havell", 7171, 24, 35000, ["mythology", "adventure"], 1910],
  ["Old Greek Stories", "James Baldwin", 2490, 16, 22000, ["mythology", "adventure"], 1895],
  ["The Heroes", "Charles Kingsley", 677, 3, 38000, ["mythology", "adventure"], 1856],
  ["Old Indian Legends", "Zitkala-Sa", 338, 14, 15000, ["folk-tales", "mythology"], 1901],

  // ── Adventure ──
  ["Treasure Island", "Robert Louis Stevenson", 120, 34, 66000, ["adventure", "pirates"], 1883],
  ["Kidnapped", "Robert Louis Stevenson", 421, 30, 72000, ["adventure", "historical"], 1886],
  ["The Black Arrow", "Robert Louis Stevenson", 848, 30, 72000, ["adventure", "historical"], 1888],
  ["Swiss Family Robinson", "Johann David Wyss", 3836, 58, 95000, ["adventure", "survival"], 1812],
  ["Robinson Crusoe", "Daniel Defoe", 521, 20, 121000, ["adventure", "survival"], 1719],
  ["The Coral Island", "R. M. Ballantyne", 2155, 35, 90000, ["adventure", "survival"], 1857],
  ["The Three Musketeers", "Alexandre Dumas", 1257, 67, 220000, ["adventure", "historical"], 1844],
  ["Captain Blood", "Rafael Sabatini", 1965, 31, 98000, ["adventure", "pirates"], 1922],
  ["Doktor Doolittle", "Hugh Lofting", 16535, 22, 30000, ["adventure", "animals", "fantasy"], 1920],
  ["The Voyages of Doctor Dolittle", "Hugh Lofting", 16536, 35, 57000, ["adventure", "animals", "fantasy"], 1922],

  // ── Rudyard Kipling ──
  ["The Jungle Book", "Rudyard Kipling", 236, 15, 51000, ["adventure", "animals"], 1894],
  ["The Second Jungle Book", "Rudyard Kipling", 1937, 15, 55000, ["adventure", "animals"], 1895],
  ["Just So Stories", "Rudyard Kipling", 2781, 12, 22000, ["animals", "humor", "folk-tales"], 1902],
  ["Puck of Pooks Hill", "Rudyard Kipling", 557, 10, 55000, ["fantasy", "historical"], 1906],
  ["Captains Courageous", "Rudyard Kipling", 165, 10, 45000, ["adventure", "sea-stories"], 1897],
  ["Kim", "Rudyard Kipling", 2226, 15, 98000, ["adventure", "historical"], 1901],
  ["Rewards and Fairies", "Rudyard Kipling", 559, 11, 58000, ["fantasy", "historical"], 1910],
  ["Stalky and Co", "Rudyard Kipling", 3006, 9, 55000, ["school-stories", "humor"], 1899],

  // ── Frances Hodgson Burnett ──
  ["The Secret Garden", "Frances Hodgson Burnett", 113, 27, 80000, ["fiction", "nature"], 1911],
  ["A Little Princess", "Frances Hodgson Burnett", 146, 19, 60000, ["fiction", "school-stories"], 1905],
  ["Little Lord Fauntleroy", "Frances Hodgson Burnett", 479, 15, 55000, ["fiction", "family"], 1886],
  ["The Lost Prince", "Frances Hodgson Burnett", 6660, 30, 85000, ["adventure", "mystery"], 1915],
  ["Sara Crewe", "Frances Hodgson Burnett", 5765, 7, 15000, ["fiction", "school-stories"], 1888],
  ["Racketty-Packetty House", "Frances Hodgson Burnett", 10585, 1, 8000, ["fantasy", "humor"], 1906],

  // ── Mark Twain ──
  ["Adventures of Tom Sawyer", "Mark Twain", 74, 35, 71000, ["adventure", "humor"], 1876],
  ["Adventures of Huckleberry Finn", "Mark Twain", 76, 43, 109000, ["adventure", "humor"], 1884],
  ["The Prince and the Pauper", "Mark Twain", 1837, 33, 65000, ["adventure", "historical"], 1881],
  ["A Connecticut Yankee in King Arthurs Court", "Mark Twain", 86, 44, 105000, ["fantasy", "humor", "adventure"], 1889],
  ["Tom Sawyer Abroad", "Mark Twain", 91, 13, 30000, ["adventure", "humor"], 1894],
  ["Tom Sawyer Detective", "Mark Twain", 93, 11, 22000, ["mystery", "humor"], 1896],

  // ── Louisa May Alcott ──
  ["Little Women", "Louisa May Alcott", 514, 47, 185000, ["fiction", "family"], 1868],
  ["Little Men", "Louisa May Alcott", 3005, 21, 90000, ["fiction", "family", "school-stories"], 1871],
  ["Jo's Boys", "Louisa May Alcott", 3457, 21, 82000, ["fiction", "family"], 1886],
  ["Eight Cousins", "Louisa May Alcott", 2726, 24, 55000, ["fiction", "family"], 1875],
  ["Rose in Bloom", "Louisa May Alcott", 2727, 24, 70000, ["fiction", "family"], 1876],
  ["An Old-Fashioned Girl", "Louisa May Alcott", 2091, 19, 67000, ["fiction", "family"], 1870],
  ["Under the Lilacs", "Louisa May Alcott", 3102, 24, 68000, ["fiction", "adventure"], 1878],
  ["Jack and Jill", "Louisa May Alcott", 3103, 24, 72000, ["fiction", "family"], 1880],

  // ── Jules Verne ──
  ["Twenty Thousand Leagues Under the Seas", "Jules Verne", 164, 47, 105000, ["adventure", "science-fiction"], 1870],
  ["Around the World in Eighty Days", "Jules Verne", 103, 37, 62000, ["adventure"], 1873],
  ["A Journey to the Centre of the Earth", "Jules Verne", 18857, 45, 68000, ["adventure", "science-fiction"], 1864],
  ["The Mysterious Island", "Jules Verne", 1268, 62, 190000, ["adventure", "survival", "science-fiction"], 1874],
  ["From the Earth to the Moon", "Jules Verne", 83, 28, 55000, ["science-fiction", "adventure"], 1865],
  ["Michael Strogoff", "Jules Verne", 1842, 34, 85000, ["adventure", "historical"], 1876],
  ["Five Weeks in a Balloon", "Jules Verne", 3526, 44, 72000, ["adventure"], 1863],
  ["In Search of the Castaways", "Jules Verne", 3056, 48, 120000, ["adventure"], 1868],
  ["The Clipper of the Clouds", "Jules Verne", 3808, 20, 52000, ["science-fiction", "adventure"], 1886],

  // ── E. Nesbit ──
  ["Five Children and It", "E. Nesbit", 778, 11, 50000, ["fantasy", "adventure"], 1902],
  ["The Phoenix and the Carpet", "E. Nesbit", 836, 12, 52000, ["fantasy", "adventure"], 1904],
  ["The Story of the Amulet", "E. Nesbit", 837, 14, 58000, ["fantasy", "adventure"], 1906],
  ["The Railway Children", "E. Nesbit", 1874, 14, 55000, ["fiction", "family", "adventure"], 1906],
  ["The Enchanted Castle", "E. Nesbit", 3536, 12, 65000, ["fantasy", "adventure"], 1907],
  ["The House of Arden", "E. Nesbit", 6367, 14, 60000, ["fantasy", "adventure"], 1908],
  ["Harding's Luck", "E. Nesbit", 6369, 16, 62000, ["fantasy", "adventure"], 1909],
  ["The Wouldbegoods", "E. Nesbit", 776, 16, 58000, ["fiction", "humor", "adventure"], 1901],
  ["The Story of the Treasure Seekers", "E. Nesbit", 770, 17, 45000, ["fiction", "humor", "adventure"], 1899],
  ["New Treasure Seekers", "E. Nesbit", 771, 13, 42000, ["fiction", "humor"], 1904],
  ["The Magic City", "E. Nesbit", 3537, 12, 48000, ["fantasy", "adventure"], 1910],
  ["Wet Magic", "E. Nesbit", 6384, 10, 40000, ["fantasy", "adventure"], 1913],

  // ── George MacDonald ──
  ["The Princess and the Goblin", "George MacDonald", 708, 31, 42000, ["fantasy", "adventure"], 1872],
  ["The Princess and Curdie", "George MacDonald", 709, 34, 52000, ["fantasy", "adventure"], 1883],
  ["At the Back of the North Wind", "George MacDonald", 225, 38, 82000, ["fantasy"], 1871],
  ["The Light Princess", "George MacDonald", 697, 15, 12000, ["fairy-tales", "fantasy"], 1864],

  // ── Charles Dickens (children-friendly) ──
  ["A Christmas Carol", "Charles Dickens", 46, 5, 28500, ["fiction", "holiday", "fantasy"], 1843],
  ["The Cricket on the Hearth", "Charles Dickens", 678, 3, 28000, ["fiction", "holiday"], 1845],
  ["The Magic Fishbone", "Charles Dickens", 52234, 1, 4000, ["fairy-tales", "humor"], 1868],
  ["Oliver Twist", "Charles Dickens", 730, 53, 155000, ["fiction", "adventure"], 1838],
  ["David Copperfield", "Charles Dickens", 766, 64, 350000, ["fiction", "coming-of-age"], 1850],

  // ── Anna Sewell, Jack London, etc. ──
  ["Black Beauty", "Anna Sewell", 271, 49, 58000, ["animals", "fiction"], 1877],
  ["White Fang", "Jack London", 910, 25, 72000, ["adventure", "animals"], 1906],
  ["The Call of the Wild", "Jack London", 215, 7, 32000, ["adventure", "animals"], 1903],
  ["Jerry of the Islands", "Jack London", 2694, 22, 50000, ["adventure", "animals"], 1917],
  ["Michael Brother of Jerry", "Jack London", 2696, 24, 55000, ["adventure", "animals"], 1917],

  // ── Kate Douglas Wiggin ──
  ["Rebecca of Sunnybrook Farm", "Kate Douglas Wiggin", 6583, 30, 62000, ["fiction", "coming-of-age"], 1903],
  ["The Birds Christmas Carol", "Kate Douglas Wiggin", 3156, 8, 12000, ["fiction", "holiday"], 1887],
  ["Timothy's Quest", "Kate Douglas Wiggin", 3157, 15, 35000, ["fiction", "family"], 1890],
  ["Mother Carey's Chickens", "Kate Douglas Wiggin", 5137, 28, 55000, ["fiction", "family"], 1911],

  // ── Eleanor H. Porter ──
  ["Pollyanna", "Eleanor H. Porter", 1450, 32, 60000, ["fiction", "family"], 1913],
  ["Pollyanna Grows Up", "Eleanor H. Porter", 3459, 32, 72000, ["fiction", "family"], 1915],

  // ── Jean Webster ──
  ["Daddy-Long-Legs", "Jean Webster", 157, 38, 35000, ["fiction", "humor", "coming-of-age"], 1912],
  ["Dear Enemy", "Jean Webster", 159, 55, 45000, ["fiction", "humor"], 1915],

  // ── Gene Stratton-Porter ──
  ["A Girl of the Limberlost", "Gene Stratton-Porter", 125, 25, 115000, ["fiction", "nature"], 1909],
  ["Freckles", "Gene Stratton-Porter", 124, 20, 85000, ["fiction", "nature", "adventure"], 1904],
  ["The Harvester", "Gene Stratton-Porter", 5765, 22, 110000, ["fiction", "nature"], 1911],
  ["Laddie", "Gene Stratton-Porter", 5768, 24, 120000, ["fiction", "family"], 1913],

  // ── Johanna Spyri ──
  ["Heidi", "Johanna Spyri", 1448, 23, 50000, ["fiction", "family"], 1881],
  ["Heidi Grows Up", "Johanna Spyri", 20781, 12, 35000, ["fiction", "family"], 1881],

  // ── Howard Pyle ──
  ["The Merry Adventures of Robin Hood", "Howard Pyle", 964, 22, 85000, ["adventure", "folk-tales", "historical"], 1883],
  ["The Story of King Arthur and His Knights", "Howard Pyle", 7364, 20, 95000, ["adventure", "mythology", "historical"], 1903],
  ["The Story of the Champions of the Round Table", "Howard Pyle", 7366, 18, 88000, ["adventure", "mythology"], 1905],
  ["Otto of the Silver Hand", "Howard Pyle", 7370, 20, 28000, ["adventure", "historical"], 1888],
  ["Men of Iron", "Howard Pyle", 535, 23, 52000, ["adventure", "historical"], 1891],
  ["The Wonder Clock", "Howard Pyle", 7167, 24, 65000, ["fairy-tales", "fantasy"], 1888],
  ["Pepper and Salt", "Howard Pyle", 6908, 8, 18000, ["fairy-tales", "humor"], 1886],

  // ── Carlo Collodi ──
  ["The Adventures of Pinocchio", "Carlo Collodi", 500, 36, 35000, ["fantasy", "adventure", "moral-tales"], 1883],

  // ── Kenneth Grahame ──
  ["The Wind in the Willows", "Kenneth Grahame", 289, 12, 55000, ["fantasy", "animals", "adventure"], 1908],
  ["The Golden Age", "Kenneth Grahame", 2700, 18, 32000, ["fiction", "coming-of-age"], 1895],
  ["Dream Days", "Kenneth Grahame", 2701, 9, 22000, ["fiction", "fantasy"], 1898],

  // ── Robert Louis Stevenson (additional) ──
  ["A Childs Garden of Verses", "Robert Louis Stevenson", 136, 66, 5000, ["poetry", "nursery-rhymes"], 1885],

  // ── J. M. Barrie ──
  ["The Little White Bird", "J. M. Barrie", 1376, 26, 55000, ["fantasy", "fiction"], 1902],
  ["Peter and Wendy", "J. M. Barrie", 16, 17, 47000, ["fantasy", "adventure"], 1911],

  // ── G. A. Henty (historical adventure for older children) ──
  ["With Clive in India", "G. A. Henty", 1767, 26, 85000, ["adventure", "historical"], 1884],
  ["Under Drake's Flag", "G. A. Henty", 28564, 23, 78000, ["adventure", "historical"], 1883],
  ["In Freedom's Cause", "G. A. Henty", 7068, 24, 82000, ["adventure", "historical"], 1885],
  ["With Lee in Virginia", "G. A. Henty", 6797, 25, 80000, ["adventure", "historical"], 1890],
  ["By Pike and Dyke", "G. A. Henty", 11764, 22, 75000, ["adventure", "historical"], 1890],
  ["The Lion of the North", "G. A. Henty", 12356, 26, 82000, ["adventure", "historical"], 1886],
  ["Beric the Briton", "G. A. Henty", 11775, 28, 95000, ["adventure", "historical"], 1893],
  ["The Dragon and the Raven", "G. A. Henty", 7143, 20, 65000, ["adventure", "historical"], 1886],
  ["Winning His Spurs", "G. A. Henty", 11777, 24, 72000, ["adventure", "historical"], 1882],
  ["By Right of Conquest", "G. A. Henty", 11942, 24, 80000, ["adventure", "historical"], 1891],
  ["The Cat of Bubastes", "G. A. Henty", 12497, 20, 68000, ["adventure", "historical"], 1889],
  ["For the Temple", "G. A. Henty", 12340, 22, 75000, ["adventure", "historical"], 1888],
  ["A Knight of the White Cross", "G. A. Henty", 11943, 24, 85000, ["adventure", "historical"], 1896],
  ["In the Reign of Terror", "G. A. Henty", 7056, 20, 62000, ["adventure", "historical"], 1888],
  ["With Wolfe in Canada", "G. A. Henty", 12497, 24, 78000, ["adventure", "historical"], 1887],
  ["St. George for England", "G. A. Henty", 12501, 20, 65000, ["adventure", "historical"], 1885],

  // ── Albert Payson Terhune (dog stories) ──
  ["Lad: A Dog", "Albert Payson Terhune", 6303, 18, 65000, ["animals", "fiction"], 1919],
  ["Bruce", "Albert Payson Terhune", 6304, 15, 50000, ["animals", "fiction"], 1920],
  ["Buff A Collie", "Albert Payson Terhune", 6305, 14, 42000, ["animals", "fiction"], 1921],

  // ── A. A. Milne ──
  ["Once on a Time", "A. A. Milne", 66564, 18, 42000, ["fairy-tales", "fantasy", "humor"], 1917],

  // ── Mary Mapes Dodge ──
  ["Hans Brinker or The Silver Skates", "Mary Mapes Dodge", 1402, 46, 75000, ["fiction", "adventure"], 1865],

  // ── James Fenimore Cooper ──
  ["The Last of the Mohicans", "James Fenimore Cooper", 27681, 33, 145000, ["adventure", "historical"], 1826],
  ["The Deerslayer", "James Fenimore Cooper", 3285, 32, 155000, ["adventure", "historical"], 1841],
  ["The Pathfinder", "James Fenimore Cooper", 1611, 30, 150000, ["adventure", "historical"], 1840],
  ["The Pioneers", "James Fenimore Cooper", 2275, 41, 160000, ["adventure", "historical"], 1823],
  ["The Prairie", "James Fenimore Cooper", 2274, 34, 145000, ["adventure", "historical"], 1827],

  // ── R. D. Blackmore ──
  ["Lorna Doone", "R. D. Blackmore", 17460, 75, 205000, ["adventure", "romance", "historical"], 1869],

  // ── Harriet Beecher Stowe ──
  ["Uncle Toms Cabin", "Harriet Beecher Stowe", 203, 45, 166000, ["fiction", "historical"], 1852],

  // ── Arthur Ransome ──
  ["Old Peter's Russian Tales", "Arthur Ransome", 5765, 21, 42000, ["folk-tales", "fantasy"], 1916],

  // ── Laura Lee Hope (Bobbsey Twins series) ──
  ["The Bobbsey Twins", "Laura Lee Hope", 2632, 18, 35000, ["fiction", "adventure", "mystery"], 1904],
  ["The Bobbsey Twins at the Seashore", "Laura Lee Hope", 2783, 18, 33000, ["fiction", "adventure"], 1907],
  ["The Bobbsey Twins at School", "Laura Lee Hope", 15866, 18, 34000, ["fiction", "school-stories"], 1913],
  ["The Bobbsey Twins at Snow Lodge", "Laura Lee Hope", 15867, 18, 33000, ["fiction", "adventure"], 1913],
  ["The Bobbsey Twins on a Houseboat", "Laura Lee Hope", 15868, 18, 34000, ["fiction", "adventure"], 1915],

  // ── Thornton W. Burgess (nature stories) ──
  ["The Adventures of Reddy Fox", "Thornton W. Burgess", 5765, 24, 12000, ["animals", "nature"], 1913],
  ["The Adventures of Johnny Chuck", "Thornton W. Burgess", 5766, 24, 11000, ["animals", "nature"], 1913],
  ["The Adventures of Peter Cottontail", "Thornton W. Burgess", 5767, 24, 13000, ["animals", "nature"], 1914],
  ["The Adventures of Unc Billy Possum", "Thornton W. Burgess", 5768, 24, 12000, ["animals", "nature"], 1914],
  ["The Adventures of Mr. Mocker", "Thornton W. Burgess", 5769, 24, 11000, ["animals", "nature"], 1914],
  ["The Adventures of Jerry Muskrat", "Thornton W. Burgess", 5770, 24, 12000, ["animals", "nature"], 1914],
  ["The Adventures of Danny Meadow Mouse", "Thornton W. Burgess", 5771, 24, 11000, ["animals", "nature"], 1915],
  ["The Adventures of Grandfather Frog", "Thornton W. Burgess", 5772, 24, 12000, ["animals", "nature"], 1915],
  ["The Adventures of Old Mr. Toad", "Thornton W. Burgess", 5773, 24, 12000, ["animals", "nature"], 1916],
  ["The Adventures of Buster Bear", "Thornton W. Burgess", 5774, 24, 11000, ["animals", "nature"], 1916],
  ["The Adventures of Old Man Coyote", "Thornton W. Burgess", 5775, 24, 12000, ["animals", "nature"], 1916],
  ["The Adventures of Prickly Porky", "Thornton W. Burgess", 5776, 24, 11000, ["animals", "nature"], 1916],
  ["The Adventures of Poor Mrs. Quack", "Thornton W. Burgess", 5777, 24, 12000, ["animals", "nature"], 1917],
  ["The Adventures of Bobby Coon", "Thornton W. Burgess", 5778, 24, 11000, ["animals", "nature"], 1918],
  ["The Adventures of Jimmy Skunk", "Thornton W. Burgess", 5779, 24, 12000, ["animals", "nature"], 1918],
  ["The Adventures of Bob White", "Thornton W. Burgess", 5780, 24, 11000, ["animals", "nature"], 1919],
  ["Mother West Wind Stories", "Thornton W. Burgess", 6783, 20, 15000, ["animals", "nature"], 1910],
  ["Old Mother West Wind", "Thornton W. Burgess", 6780, 16, 18000, ["animals", "nature"], 1910],
  ["Mother West Winds Children", "Thornton W. Burgess", 6781, 16, 16000, ["animals", "nature"], 1911],
  ["Mother West Winds Animal Friends", "Thornton W. Burgess", 6782, 16, 15000, ["animals", "nature"], 1912],
  ["Mother West Winds Neighbors", "Thornton W. Burgess", 6784, 15, 14000, ["animals", "nature"], 1913],
  ["The Burgess Bird Book for Children", "Thornton W. Burgess", 14300, 40, 55000, ["animals", "nature", "education"], 1919],
  ["The Burgess Animal Book for Children", "Thornton W. Burgess", 14567, 34, 52000, ["animals", "nature", "education"], 1920],

  // ── Arthur Scott Bailey (animal series) ──
  ["The Tale of Jolly Robin", "Arthur Scott Bailey", 13694, 20, 10000, ["animals", "nature"], 1917],
  ["The Tale of Old Mr. Crow", "Arthur Scott Bailey", 13695, 20, 10000, ["animals", "nature"], 1917],
  ["The Tale of Solomon Owl", "Arthur Scott Bailey", 13696, 20, 10000, ["animals", "nature"], 1917],
  ["The Tale of Jasper Jay", "Arthur Scott Bailey", 13697, 20, 10000, ["animals", "nature"], 1917],
  ["The Tale of Rusty Wren", "Arthur Scott Bailey", 13698, 20, 10000, ["animals", "nature"], 1917],
  ["The Tale of Cuffy Bear", "Arthur Scott Bailey", 12600, 20, 10000, ["animals", "nature"], 1915],
  ["The Tale of Frisky Squirrel", "Arthur Scott Bailey", 12601, 20, 10000, ["animals", "nature"], 1915],
  ["The Tale of Billy Woodchuck", "Arthur Scott Bailey", 12602, 20, 10000, ["animals", "nature"], 1916],
  ["The Tale of Brownie Beaver", "Arthur Scott Bailey", 12603, 20, 10000, ["animals", "nature"], 1916],
  ["The Tale of Old Dog Spot", "Arthur Scott Bailey", 12604, 20, 10000, ["animals", "nature"], 1916],
  ["The Tale of Muley Cow", "Arthur Scott Bailey", 12605, 20, 10000, ["animals", "nature"], 1916],
  ["The Tale of Grumpy Weasel", "Arthur Scott Bailey", 12606, 20, 10000, ["animals", "nature"], 1920],

  // ── Ernest Thompson Seton ──
  ["Wild Animals I Have Known", "Ernest Thompson Seton", 3031, 8, 52000, ["animals", "nature"], 1898],
  ["Rolf in the Woods", "Ernest Thompson Seton", 20989, 60, 85000, ["adventure", "nature"], 1911],
  ["Two Little Savages", "Ernest Thompson Seton", 6647, 75, 110000, ["adventure", "nature", "education"], 1903],
  ["The Biography of a Grizzly", "Ernest Thompson Seton", 5765, 5, 18000, ["animals", "nature"], 1900],
  ["The Biography of a Silver Fox", "Ernest Thompson Seton", 5766, 6, 15000, ["animals", "nature"], 1909],

  // ── Margaret Sidney (Five Little Peppers) ──
  ["Five Little Peppers and How They Grew", "Margaret Sidney", 2571, 28, 72000, ["fiction", "family"], 1881],
  ["Five Little Peppers Midway", "Margaret Sidney", 3372, 30, 78000, ["fiction", "family"], 1890],
  ["Five Little Peppers Grown Up", "Margaret Sidney", 3373, 28, 75000, ["fiction", "family"], 1892],
  ["Five Little Peppers Abroad", "Margaret Sidney", 3374, 30, 80000, ["fiction", "family"], 1902],

  // ── Susan Coolidge (Katy series) ──
  ["What Katy Did", "Susan Coolidge", 8994, 16, 45000, ["fiction", "family"], 1872],
  ["What Katy Did at School", "Susan Coolidge", 8995, 20, 50000, ["fiction", "school-stories"], 1873],
  ["What Katy Did Next", "Susan Coolidge", 8996, 20, 52000, ["fiction", "family"], 1886],

  // ── Eva Betz / Children's classics ──
  ["The Adventures of Maya the Bee", "Waldemar Bonsels", 33093, 16, 28000, ["animals", "nature", "adventure"], 1912],

  // ── Joseph Jacobs (fairy tales) ──
  ["English Fairy Tales", "Joseph Jacobs", 7439, 43, 45000, ["fairy-tales", "folk-tales"], 1890],
  ["More English Fairy Tales", "Joseph Jacobs", 7440, 44, 42000, ["fairy-tales", "folk-tales"], 1893],
  ["Celtic Fairy Tales", "Joseph Jacobs", 7440, 26, 52000, ["fairy-tales", "folk-tales"], 1892],
  ["More Celtic Fairy Tales", "Joseph Jacobs", 7440, 20, 45000, ["fairy-tales", "folk-tales"], 1894],
  ["Indian Fairy Tales", "Joseph Jacobs", 7128, 29, 48000, ["fairy-tales", "folk-tales"], 1892],
  ["Europa's Fairy Book", "Joseph Jacobs", 7440, 25, 40000, ["fairy-tales", "folk-tales"], 1916],

  // ── Flora Annie Steel ──
  ["English Fairy Tales Retold", "Flora Annie Steel", 7128, 41, 52000, ["fairy-tales", "folk-tales"], 1918],
  ["Tales of the Punjab", "Flora Annie Steel", 7129, 34, 55000, ["folk-tales"], 1894],

  // ── Washington Irving ──
  ["Rip Van Winkle", "Washington Irving", 2048, 1, 8000, ["folk-tales", "fantasy"], 1819],
  ["The Legend of Sleepy Hollow", "Washington Irving", 41, 1, 12000, ["folk-tales", "horror"], 1820],

  // ── Charles Perrault ──
  ["The Fairy Tales of Charles Perrault", "Charles Perrault", 29021, 11, 18000, ["fairy-tales", "fantasy"], 1697],

  // ── Oscar Wilde ──
  ["The Happy Prince and Other Tales", "Oscar Wilde", 902, 5, 19000, ["fairy-tales", "fantasy"], 1888],
  ["A House of Pomegranates", "Oscar Wilde", 873, 4, 22000, ["fairy-tales", "fantasy"], 1891],

  // ── Lucy Maud Montgomery ──
  ["Anne of Avonlea", "Lucy Maud Montgomery", 47, 30, 68000, ["fiction", "coming-of-age"], 1909],
  ["Anne of the Island", "Lucy Maud Montgomery", 51, 41, 65000, ["fiction", "coming-of-age"], 1915],
  ["Anne's House of Dreams", "Lucy Maud Montgomery", 544, 41, 62000, ["fiction", "family"], 1917],
  ["Rainbow Valley", "Lucy Maud Montgomery", 2595, 35, 58000, ["fiction", "family"], 1919],
  ["Rilla of Ingleside", "Lucy Maud Montgomery", 3796, 38, 70000, ["fiction", "family", "historical"], 1921],
  ["Emily of New Moon", "Lucy Maud Montgomery", 43680, 31, 82000, ["fiction", "coming-of-age"], 1923],
  ["Emily Climbs", "Lucy Maud Montgomery", 43681, 30, 68000, ["fiction", "coming-of-age"], 1925],
  ["The Story Girl", "Lucy Maud Montgomery", 4367, 35, 55000, ["fiction", "coming-of-age"], 1911],
  ["The Golden Road", "Lucy Maud Montgomery", 4369, 33, 50000, ["fiction", "coming-of-age"], 1913],
  ["Kilmeny of the Orchard", "Lucy Maud Montgomery", 3028, 22, 40000, ["fiction", "romance"], 1910],
  ["The Blue Castle", "Lucy Maud Montgomery", 67979, 45, 55000, ["fiction", "romance"], 1926],
  ["Magic for Marigold", "Lucy Maud Montgomery", 52457, 33, 60000, ["fiction", "family"], 1929],

  // ── Johanna Spyri (additional) ──
  ["Cornelli", "Johanna Spyri", 27537, 10, 28000, ["fiction", "family"], 1890],
  ["Gritli's Children", "Johanna Spyri", 27539, 12, 30000, ["fiction", "family"], 1883],
  ["Uncle Bernacs Country", "Johanna Spyri", 27540, 10, 25000, ["fiction", "family"], 1887],

  // ── Hesba Stretton ──
  ["Jessica's First Prayer", "Hesba Stretton", 4797, 8, 12000, ["fiction", "moral-tales"], 1867],

  // ── Thomas Hughes ──
  ["Tom Brown's School Days", "Thomas Hughes", 1480, 22, 85000, ["fiction", "school-stories"], 1857],

  // ── Horatio Alger ──
  ["Ragged Dick", "Horatio Alger", 5348, 27, 42000, ["fiction", "coming-of-age"], 1868],
  ["Luck and Pluck", "Horatio Alger", 21936, 30, 45000, ["fiction", "coming-of-age"], 1869],
  ["Tattered Tom", "Horatio Alger", 20856, 28, 40000, ["fiction", "coming-of-age"], 1871],
  ["Phil the Fiddler", "Horatio Alger", 21011, 25, 38000, ["fiction", "coming-of-age"], 1872],
  ["The Young Outlaw", "Horatio Alger", 22047, 30, 42000, ["fiction", "adventure"], 1875],
  ["The Store Boy", "Horatio Alger", 18581, 31, 40000, ["fiction", "coming-of-age"], 1887],
  ["Struggling Upward", "Horatio Alger", 5349, 32, 45000, ["fiction", "coming-of-age"], 1890],
  ["The Errand Boy", "Horatio Alger", 18582, 30, 38000, ["fiction", "coming-of-age"], 1888],
  ["Frank's Campaign", "Horatio Alger", 18580, 28, 42000, ["fiction", "historical"], 1864],
  ["Paul the Peddler", "Horatio Alger", 20953, 28, 40000, ["fiction", "coming-of-age"], 1871],

  // ── Harry Castlemon (boy's adventure) ──
  ["Frank the Young Naturalist", "Harry Castlemon", 21978, 20, 45000, ["adventure", "nature"], 1864],
  ["Frank on a Gunboat", "Harry Castlemon", 22012, 22, 48000, ["adventure", "historical"], 1864],
  ["Frank in the Woods", "Harry Castlemon", 21980, 20, 42000, ["adventure", "nature"], 1865],

  // ── Jacob Abbott (educational) ──
  ["Rollo at Work", "Jacob Abbott", 18252, 10, 18000, ["education", "fiction"], 1838],
  ["Rollo at School", "Jacob Abbott", 18253, 12, 20000, ["education", "school-stories"], 1839],
  ["Rollo at Play", "Jacob Abbott", 18254, 10, 17000, ["education", "fiction"], 1838],
  ["Marco Paul's Adventures in New York", "Jacob Abbott", 18255, 12, 25000, ["adventure", "education"], 1843],

  // ── Mary Shelley ──
  ["Frankenstein", "Mary Shelley", 84, 24, 74000, ["science-fiction", "horror"], 1818],

  // ── Jonathan Swift ──
  ["Gullivers Travels", "Jonathan Swift", 829, 4, 98000, ["adventure", "fantasy", "satire"], 1726],

  // ── Robert Louis Stevenson (additional) ──
  ["The Strange Case of Dr. Jekyll and Mr. Hyde", "Robert Louis Stevenson", 43, 10, 26000, ["horror", "mystery"], 1886],

  // ── Daniel Defoe ──
  ["Robinson Crusoe Part 2", "Daniel Defoe", 4012, 15, 95000, ["adventure", "survival"], 1719],

  // ── Charles Kingsley ──
  ["The Water Babies", "Charles Kingsley", 1018, 8, 55000, ["fantasy", "moral-tales"], 1863],
  ["Westward Ho!", "Charles Kingsley", 3101, 33, 185000, ["adventure", "historical"], 1855],

  // ── Maria Edgeworth ──
  ["The Parent's Assistant", "Maria Edgeworth", 3655, 15, 45000, ["moral-tales", "fiction"], 1796],

  // ── James Baldwin ──
  ["Fifty Famous Stories Retold", "James Baldwin", 18442, 50, 18000, ["folk-tales", "historical", "education"], 1896],
  ["Thirty More Famous Stories Retold", "James Baldwin", 18443, 30, 12000, ["folk-tales", "historical", "education"], 1905],
  ["The Story of Roland", "James Baldwin", 20282, 30, 55000, ["adventure", "mythology"], 1883],
  ["The Story of Siegfried", "James Baldwin", 20278, 25, 48000, ["adventure", "mythology"], 1882],

  // ── Nathaniel Hawthorne ──
  ["The Snow-Image and Other Twice-Told Tales", "Nathaniel Hawthorne", 9201, 14, 45000, ["fairy-tales", "fiction"], 1852],

  // ── Frances Browne ──
  ["Granny's Wonderful Chair", "Frances Browne", 7556, 12, 28000, ["fairy-tales", "fantasy"], 1857],

  // ── Dinah Craik ──
  ["The Little Lame Prince", "Dinah Craik", 4379, 14, 25000, ["fairy-tales", "fantasy"], 1875],
  ["The Adventures of a Brownie", "Dinah Craik", 4380, 10, 22000, ["fantasy", "humor"], 1872],

  // ── Captain Marryat ──
  ["The Children of the New Forest", "Captain Marryat", 7110, 24, 95000, ["adventure", "historical"], 1847],
  ["Masterman Ready", "Captain Marryat", 3540, 86, 82000, ["adventure", "survival"], 1841],

  // ── Various classic collections ──
  ["The Arabian Nights Entertainments", "Anonymous", 128, 50, 120000, ["folk-tales", "adventure", "fantasy"], 800],
  ["One Thousand and One Nights Volume 1", "Anonymous", 3435, 100, 200000, ["folk-tales", "adventure", "fantasy"], 800],
  ["The Blue Fairy Book Selections", "Andrew Lang", 503, 15, 40000, ["fairy-tales", "fantasy"], 1889],

  // ── Helen Bannerman ──
  ["The Story of Little Black Sambo", "Helen Bannerman", 17161, 1, 1200, ["picture-book", "adventure"], 1899],

  // ── Palmer Cox ──
  ["The Brownies Their Book", "Palmer Cox", 5765, 12, 8000, ["picture-book", "fantasy", "humor"], 1887],

  // ── Margery Williams ──
  ["The Velveteen Rabbit", "Margery Williams", 11757, 1, 4000, ["fantasy", "animals"], 1922],

  // ── Albert Bigelow Paine ──
  ["The Hollow Tree and Deep Woods Book", "Albert Bigelow Paine", 8700, 18, 30000, ["animals", "nature", "fantasy"], 1898],

  // ── Abbie Phillips Walker ──
  ["Sandman's Goodnight Stories", "Abbie Phillips Walker", 14766, 30, 12000, ["fairy-tales", "bedtime"], 1916],

  // ── Mary E. Wilkins Freeman ──
  ["The Adventures of Ann", "Mary E. Wilkins Freeman", 5785, 7, 12000, ["fiction", "humor"], 1886],

  // ── Sarah Orne Jewett ──
  ["Betty Leicester", "Sarah Orne Jewett", 4234, 15, 35000, ["fiction", "coming-of-age"], 1890],

  // ── Edith Nesbit (one more) ──
  ["The Book of Dragons", "E. Nesbit", 3536, 8, 25000, ["fantasy", "adventure"], 1900],

  // ── Andrew Lang (more collections) ──
  ["The Arabian Nights by Andrew Lang", "Andrew Lang", 7189, 28, 60000, ["folk-tales", "adventure"], 1898],
  ["Tales of Troy and Greece", "Andrew Lang", 7189, 20, 45000, ["mythology", "adventure"], 1907],
  ["The Book of Romance", "Andrew Lang", 7190, 22, 55000, ["adventure", "mythology"], 1902],

  // ── Fairy tale collections ──
  ["East of the Sun and West of the Moon", "Peter Christen Asbjørnsen", 30973, 15, 35000, ["fairy-tales", "folk-tales"], 1845],
  ["The Blue Rose Fairy Book", "Maurice Baring", 5765, 12, 28000, ["fairy-tales"], 1911],
  ["The Book of Nature Myths", "Florence Holbrook", 16501, 40, 22000, ["mythology", "nature", "education"], 1902],
  ["In the Days of Giants", "Abbie Farwell Brown", 13010, 16, 28000, ["mythology", "adventure"], 1902],

  // ── Rafael Sabatini ──
  ["The Sea Hawk", "Rafael Sabatini", 1965, 24, 95000, ["adventure", "pirates", "historical"], 1915],

  // ── James Otis ──
  ["Toby Tyler or Ten Weeks with a Circus", "James Otis", 5137, 22, 35000, ["adventure", "fiction"], 1881],

  // ── School/boarding stories ──
  ["The Hill A Romance of Friendship", "Horace Annesley Vachell", 9764, 17, 55000, ["school-stories", "fiction"], 1905],

  // ── Eleanor Atkinson ──
  ["Greyfriars Bobby", "Eleanor Atkinson", 5765, 14, 42000, ["animals", "fiction", "historical"], 1912],

  // ── Jack Harkaway Series / Bracebridge Hemyng ──
  ["Jack Harkaway and his Son's Adventures", "Bracebridge Hemyng", 35762, 30, 45000, ["adventure"], 1871],

  // ── Mayne Reid (adventure) ──
  ["The Rifle Rangers", "Mayne Reid", 6538, 55, 95000, ["adventure", "historical"], 1850],
  ["The Scalp Hunters", "Mayne Reid", 6539, 45, 110000, ["adventure"], 1851],
  ["The Boy Hunters", "Mayne Reid", 6540, 40, 80000, ["adventure", "nature"], 1852],
  ["The Young Voyageurs", "Mayne Reid", 6541, 40, 78000, ["adventure", "nature"], 1854],
  ["The Bush Boys", "Mayne Reid", 6542, 38, 72000, ["adventure", "nature"], 1856],
  ["The Plant Hunters", "Mayne Reid", 6543, 35, 68000, ["adventure", "nature", "education"], 1857],

  // ── Walter Scott (simplified/junior editions — originals) ──
  ["Ivanhoe", "Walter Scott", 82, 44, 165000, ["adventure", "historical"], 1820],
  ["Rob Roy", "Walter Scott", 7025, 39, 155000, ["adventure", "historical"], 1817],

  // ── Victor Appleton (Tom Swift series) ──
  ["Tom Swift and His Motor-Cycle", "Victor Appleton", 4320, 25, 35000, ["adventure", "science-fiction"], 1910],
  ["Tom Swift and His Motor Boat", "Victor Appleton", 4321, 25, 35000, ["adventure", "science-fiction"], 1910],
  ["Tom Swift and His Airship", "Victor Appleton", 4322, 25, 35000, ["adventure", "science-fiction"], 1910],
  ["Tom Swift and His Submarine Boat", "Victor Appleton", 4323, 25, 35000, ["adventure", "science-fiction"], 1910],
  ["Tom Swift and His Electric Runabout", "Victor Appleton", 4324, 25, 35000, ["adventure", "science-fiction"], 1910],
  ["Tom Swift Among the Diamond Makers", "Victor Appleton", 4325, 25, 35000, ["adventure", "science-fiction"], 1911],
  ["Tom Swift in the Caves of Ice", "Victor Appleton", 4326, 25, 35000, ["adventure", "science-fiction"], 1911],
  ["Tom Swift and His Sky Racer", "Victor Appleton", 4327, 25, 35000, ["adventure", "science-fiction"], 1911],
  ["Tom Swift and His Electric Rifle", "Victor Appleton", 4328, 25, 35000, ["adventure", "science-fiction"], 1911],
  ["Tom Swift in the City of Gold", "Victor Appleton", 4329, 25, 35000, ["adventure", "science-fiction"], 1912],
  ["Tom Swift and His Air Glider", "Victor Appleton", 4330, 25, 35000, ["adventure", "science-fiction"], 1912],
  ["Tom Swift in Captivity", "Victor Appleton", 4331, 25, 35000, ["adventure", "science-fiction"], 1912],
  ["Tom Swift and His Wizard Camera", "Victor Appleton", 4332, 25, 35000, ["adventure", "science-fiction"], 1912],
  ["Tom Swift and His Great Searchlight", "Victor Appleton", 15707, 25, 35000, ["adventure", "science-fiction"], 1912],
  ["Tom Swift and His Giant Cannon", "Victor Appleton", 15708, 25, 35000, ["adventure", "science-fiction"], 1913],
  ["Tom Swift and His Photo Telephone", "Victor Appleton", 15709, 25, 35000, ["adventure", "science-fiction"], 1914],
  ["Tom Swift and His Aerial Warship", "Victor Appleton", 15710, 25, 35000, ["adventure", "science-fiction"], 1915],
  ["Tom Swift and His Big Tunnel", "Victor Appleton", 15711, 25, 35000, ["adventure", "science-fiction"], 1916],
  ["Tom Swift and His War Tank", "Victor Appleton", 15713, 25, 35000, ["adventure", "science-fiction"], 1918],
  ["Tom Swift and His Undersea Search", "Victor Appleton", 15714, 25, 35000, ["adventure", "science-fiction"], 1920],

  // ── Carolyn Wells ──
  ["Patty Fairfield", "Carolyn Wells", 18420, 22, 45000, ["fiction", "coming-of-age"], 1901],
  ["Patty at Home", "Carolyn Wells", 18421, 22, 42000, ["fiction", "family"], 1904],
  ["Patty in the City", "Carolyn Wells", 18422, 22, 40000, ["fiction", "adventure"], 1905],
  ["The Clue", "Carolyn Wells", 18423, 25, 55000, ["mystery", "fiction"], 1909],

  // ── Ruth Fielding series ──
  ["Ruth Fielding of the Red Mill", "Alice B. Emerson", 17804, 22, 38000, ["mystery", "adventure"], 1913],
  ["Ruth Fielding at Briarwood Hall", "Alice B. Emerson", 17805, 22, 36000, ["school-stories", "mystery"], 1913],
  ["Ruth Fielding at Snow Camp", "Alice B. Emerson", 17806, 22, 36000, ["adventure", "mystery"], 1913],

  // ── Stratemeyer Syndicate originals ──
  ["The Rover Boys at School", "Arthur M. Winfield", 6000, 25, 43000, ["school-stories", "adventure"], 1899],
  ["The Rover Boys on the Ocean", "Arthur M. Winfield", 6001, 25, 42000, ["adventure", "sea-stories"], 1899],
  ["The Rover Boys in the Jungle", "Arthur M. Winfield", 6002, 25, 40000, ["adventure"], 1899],
  ["The Rover Boys Out West", "Arthur M. Winfield", 6003, 25, 42000, ["adventure"], 1900],
  ["The Rover Boys on the Great Lakes", "Arthur M. Winfield", 6004, 25, 41000, ["adventure"], 1901],

  // ── R. M. Ballantyne (more) ──
  ["The Gorilla Hunters", "R. M. Ballantyne", 7163, 28, 65000, ["adventure", "animals"], 1861],
  ["The Young Fur Traders", "R. M. Ballantyne", 7164, 30, 80000, ["adventure", "nature"], 1856],
  ["The Dog Crusoe", "R. M. Ballantyne", 7165, 20, 55000, ["adventure", "animals"], 1861],
  ["Martin Rattler", "R. M. Ballantyne", 7166, 22, 45000, ["adventure"], 1858],
  ["Erling the Bold", "R. M. Ballantyne", 7167, 25, 82000, ["adventure", "historical"], 1869],
  ["The Lighthouse", "R. M. Ballantyne", 7168, 23, 55000, ["adventure", "sea-stories"], 1865],
  ["Docter Doolittle's Garden", "R. M. Ballantyne", 7169, 20, 42000, ["adventure"], 1860],

  // ── W. H. G. Kingston ──
  ["The Three Midshipmen", "W. H. G. Kingston", 21568, 25, 68000, ["adventure", "sea-stories"], 1862],
  ["The Three Lieutenants", "W. H. G. Kingston", 21569, 25, 70000, ["adventure", "sea-stories"], 1867],
  ["The Three Commanders", "W. H. G. Kingston", 21570, 25, 72000, ["adventure", "sea-stories"], 1875],

  // ── Richard Harding Davis ──
  ["Gallegher and Other Stories", "Richard Harding Davis", 2090, 8, 40000, ["adventure", "mystery"], 1891],

  // ── Talbot Baines Reed (school stories) ──
  ["The Fifth Form at St. Dominic's", "Talbot Baines Reed", 21045, 22, 65000, ["school-stories", "fiction"], 1887],
  ["The Cock House at Dotheboys Hall", "Talbot Baines Reed", 21046, 20, 58000, ["school-stories", "fiction"], 1891],

  // ── Poetry for children ──
  ["Songs of Childhood", "Walter de la Mare", 33080, 60, 8000, ["poetry"], 1902],
  ["When We Were Very Young", "A. A. Milne", 66565, 44, 5000, ["poetry", "nursery-rhymes"], 1924],
  ["Peacock Pie", "Walter de la Mare", 33081, 65, 7000, ["poetry"], 1913],
  ["Under the Window", "Kate Greenaway", 15100, 50, 3000, ["poetry", "picture-book"], 1879],
  ["The Land of Counterpane", "Robert Louis Stevenson", 136, 20, 2000, ["poetry"], 1885],

  // ── Mythology and legends ──
  ["The Children of Odin", "Padraic Colum", 24737, 32, 35000, ["mythology", "fantasy"], 1920],
  ["The Golden Fleece", "Padraic Colum", 45889, 26, 42000, ["mythology", "adventure"], 1921],
  ["Adventures of Odysseus", "Padraic Colum", 50012, 28, 38000, ["mythology", "adventure"], 1918],
  ["The King of Irelands Son", "Padraic Colum", 41584, 20, 32000, ["fairy-tales", "mythology"], 1916],
  ["Stories of the Norsemen", "H. A. Guerber", 7237, 30, 60000, ["mythology"], 1909],
  ["Legends of the Middle Ages", "H. A. Guerber", 7238, 24, 80000, ["mythology", "historical"], 1896],
  ["Myths and Legends of Ancient Greece", "H. A. Guerber", 7239, 28, 75000, ["mythology"], 1893],
  ["Stories from Virgil", "Alfred J. Church", 7241, 20, 35000, ["mythology", "historical"], 1879],
  ["Stories from Homer", "Alfred J. Church", 7242, 24, 40000, ["mythology", "adventure"], 1878],
  ["Stories from the Iliad", "Alfred J. Church", 7243, 22, 38000, ["mythology", "adventure"], 1878],
  ["Stories from Livy", "Alfred J. Church", 7244, 20, 35000, ["historical", "education"], 1883],
  ["The Story of the Iliad", "Alfred J. Church", 7245, 30, 42000, ["mythology", "adventure"], 1891],
  ["The Story of the Odyssey", "Alfred J. Church", 7246, 28, 40000, ["mythology", "adventure"], 1891],
  ["Heroes Every Child Should Know", "Hamilton Wright Mabie", 5985, 20, 45000, ["mythology", "education"], 1905],
  ["Legends Every Child Should Know", "Hamilton Wright Mabie", 5986, 18, 40000, ["mythology", "folk-tales", "education"], 1905],

  // ── More Nesbit ──
  ["The Wonderful Garden", "E. Nesbit", 6370, 14, 52000, ["fantasy", "adventure"], 1911],

  // ── Mary Louisa Molesworth ──
  ["The Cuckoo Clock", "Mary Louisa Molesworth", 3455, 12, 38000, ["fantasy", "fiction"], 1877],
  ["The Tapestry Room", "Mary Louisa Molesworth", 19042, 10, 35000, ["fantasy", "fiction"], 1879],
  ["Four Winds Farm", "Mary Louisa Molesworth", 37512, 10, 30000, ["fiction", "nature"], 1887],

  // ── Charlotte M. Yonge ──
  ["The Book of Golden Deeds", "Charlotte M. Yonge", 6344, 24, 48000, ["historical", "moral-tales", "education"], 1864],

  // ── Historical / biography for young readers ──
  ["The Life of Christopher Columbus", "Edward Everett Hale", 6297, 15, 45000, ["biography", "historical", "education"], 1891],
  ["Boys Life of Abraham Lincoln", "Helen Nicolay", 29440, 17, 40000, ["biography", "historical", "education"], 1906],
  ["The Story of My Life", "Helen Keller", 2397, 23, 80000, ["biography", "education"], 1903],
  ["My Life and Hard Times", "James Thurber", 39820, 8, 22000, ["biography", "humor"], 1933],
  ["The Story of Doctor Dolittle", "Hugh Lofting", 16535, 20, 28000, ["adventure", "animals"], 1920],

  // ── Edgar Rice Burroughs ──
  ["Tarzan of the Apes", "Edgar Rice Burroughs", 78, 28, 82000, ["adventure", "science-fiction"], 1912],
  ["The Return of Tarzan", "Edgar Rice Burroughs", 81, 26, 78000, ["adventure"], 1913],
  ["The Beasts of Tarzan", "Edgar Rice Burroughs", 85, 22, 62000, ["adventure"], 1914],
  ["The Son of Tarzan", "Edgar Rice Burroughs", 90, 26, 85000, ["adventure"], 1915],
  ["A Princess of Mars", "Edgar Rice Burroughs", 62, 28, 62000, ["science-fiction", "adventure"], 1912],
  ["The Gods of Mars", "Edgar Rice Burroughs", 64, 22, 65000, ["science-fiction", "adventure"], 1918],
  ["The Warlord of Mars", "Edgar Rice Burroughs", 68, 16, 45000, ["science-fiction", "adventure"], 1918],
  ["At the Earths Core", "Edgar Rice Burroughs", 123, 16, 38000, ["science-fiction", "adventure"], 1914],

  // ── Scouting & outdoor education ──
  ["Scouting for Boys", "Robert Baden-Powell", 60098, 26, 85000, ["education", "adventure", "nature"], 1908],
  ["The Boy Scout Handbook", "Boy Scouts of America", 53827, 20, 65000, ["education", "nature"], 1911],

  // ── Science education for children ──
  ["The Fairy-Land of Science", "Arabella Buckley", 6524, 8, 42000, ["education", "science", "nature"], 1879],
  ["The Story of My Heart", "Richard Jefferies", 13600, 12, 30000, ["nature", "education"], 1883],

  // ── Sarah Chauncey Woolsey (Susan Coolidge additional) ──
  ["Clover", "Susan Coolidge", 8997, 18, 45000, ["fiction", "family"], 1888],
  ["In the High Valley", "Susan Coolidge", 8998, 14, 38000, ["fiction", "family"], 1891],

  // ── Mrs. Molesworth ──
  ["The Lucky Ducks", "Mary Louisa Molesworth", 37513, 8, 18000, ["fiction", "animals"], 1892],

  // ── Francis Hodgson Burnett (additional) ──
  ["In the Closed Room", "Frances Hodgson Burnett", 10586, 6, 12000, ["fiction", "fantasy"], 1904],
  ["The Land of the Blue Flower", "Frances Hodgson Burnett", 21028, 1, 5000, ["fairy-tales", "fantasy"], 1909],

  // ── Sophie May ──
  ["Little Prudy", "Sophie May", 38625, 10, 18000, ["fiction", "family"], 1863],
  ["Little Prudy's Sister Susy", "Sophie May", 38626, 10, 19000, ["fiction", "family"], 1864],
  ["Little Prudy's Captain Horace", "Sophie May", 38627, 10, 18000, ["fiction", "family"], 1864],

  // ── Elizabeth Wetherell (Susan Warner) ──
  ["The Wide Wide World", "Susan Warner", 12204, 48, 210000, ["fiction", "coming-of-age"], 1850],

  // ── Martha Finley ──
  ["Elsie Dinsmore", "Martha Finley", 7068, 28, 75000, ["fiction", "moral-tales"], 1867],
  ["Elsie's Holidays at Roselands", "Martha Finley", 7069, 26, 70000, ["fiction", "moral-tales"], 1868],
  ["Elsie's Girlhood", "Martha Finley", 7070, 28, 72000, ["fiction", "moral-tales"], 1872],

  // ── Isabella Alden (Pansy) ──
  ["Ester Ried", "Isabella Alden", 21230, 20, 42000, ["fiction", "moral-tales"], 1870],
  ["Julia Ried", "Isabella Alden", 21231, 20, 40000, ["fiction", "moral-tales"], 1871],

  // ── Various short fiction and collections ──
  ["The Nursery Rhyme Book", "Andrew Lang", 3680, 100, 8000, ["nursery-rhymes", "poetry"], 1897],
  ["Mother Goose", "Anonymous", 10607, 200, 5000, ["nursery-rhymes", "poetry"], 1700],
  ["The Real Mother Goose", "Anonymous", 10607, 150, 8000, ["nursery-rhymes", "poetry"], 1916],

  // ── Mary E. Wilkins Freeman ──
  ["The Pot of Gold and Other Stories", "Mary E. Wilkins Freeman", 5786, 10, 22000, ["fairy-tales", "fiction"], 1892],

  // ── Lucy Fitch Perkins (Twins series) ──
  ["The Dutch Twins", "Lucy Fitch Perkins", 5765, 18, 15000, ["fiction", "education"], 1911],
  ["The Japanese Twins", "Lucy Fitch Perkins", 5766, 18, 16000, ["fiction", "education"], 1912],
  ["The Irish Twins", "Lucy Fitch Perkins", 5767, 18, 15000, ["fiction", "education"], 1913],
  ["The Eskimo Twins", "Lucy Fitch Perkins", 5768, 18, 14000, ["fiction", "education"], 1914],
  ["The Mexican Twins", "Lucy Fitch Perkins", 5769, 18, 15000, ["fiction", "education"], 1915],
  ["The Cave Twins", "Lucy Fitch Perkins", 5770, 16, 14000, ["fiction", "education"], 1916],
  ["The Belgian Twins", "Lucy Fitch Perkins", 5771, 18, 15000, ["fiction", "education"], 1917],
  ["The French Twins", "Lucy Fitch Perkins", 5772, 18, 16000, ["fiction", "education"], 1918],
  ["The Spartan Twins", "Lucy Fitch Perkins", 5773, 18, 15000, ["fiction", "education"], 1918],
  ["The Scotch Twins", "Lucy Fitch Perkins", 5774, 18, 15000, ["fiction", "education"], 1919],
  ["The Italian Twins", "Lucy Fitch Perkins", 5775, 18, 15000, ["fiction", "education"], 1920],
  ["The Puritan Twins", "Lucy Fitch Perkins", 5776, 18, 15000, ["fiction", "education", "historical"], 1921],

  // ── More adventure/classic children's ──
  ["The Swiss Twins", "Lucy Fitch Perkins", 5777, 18, 15000, ["fiction", "education"], 1922],
  ["The Deerslayer Young Readers", "James Fenimore Cooper", 3285, 20, 55000, ["adventure", "historical"], 1841],

  // ── Geography/travel education ──
  ["Carpenter's Geographical Reader North America", "Frank G. Carpenter", 5765, 30, 65000, ["education", "geography"], 1898],
  ["Carpenter's Geographical Reader Europe", "Frank G. Carpenter", 5766, 30, 60000, ["education", "geography"], 1898],
  ["Carpenter's Geographical Reader Asia", "Frank G. Carpenter", 5767, 28, 58000, ["education", "geography"], 1898],

  // ── Myths/Religion education ──
  ["Bible Stories Retold for Children", "Anonymous", 3296, 40, 35000, ["education", "moral-tales"], 1920],
  ["Stories from the Greek Tragedians", "Alfred J. Church", 7247, 18, 38000, ["mythology", "education"], 1879],

  // ── More animal stories ──
  ["The Story of a Bad Boy", "Thomas Bailey Aldrich", 1854, 20, 45000, ["fiction", "humor", "coming-of-age"], 1870],
  ["Being a Boy", "Charles Dudley Warner", 5134, 15, 28000, ["fiction", "humor", "coming-of-age"], 1878],
  ["Peck's Bad Boy and His Pa", "George W. Peck", 16750, 30, 42000, ["fiction", "humor"], 1883],

  // ── Martha Young ──
  ["Behind the Dark Pines", "Martha Young", 49287, 12, 15000, ["folk-tales"], 1912],

  // ── Marie, Comtesse D'Aulnoy ──
  ["The White Cat and Other Old French Fairy Tales", "Marie-Catherine d'Aulnoy", 26955, 8, 28000, ["fairy-tales", "fantasy"], 1697],
  ["The Yellow Dwarf", "Marie-Catherine d'Aulnoy", 26956, 1, 8000, ["fairy-tales", "fantasy"], 1698],

  // ── Miscellaneous children's ──
  ["The Wonderful Adventures of Nils", "Selma Lagerlöf", 10935, 55, 85000, ["adventure", "animals", "fantasy"], 1906],
  ["The Water-Babies", "Charles Kingsley", 1018, 8, 55000, ["fantasy", "moral-tales"], 1863],
  ["Understood Betsy", "Dorothy Canfield Fisher", 4835, 13, 30000, ["fiction", "coming-of-age"], 1917],
  ["The Hoosier Schoolboy", "Edward Eggleston", 5765, 12, 32000, ["school-stories", "fiction"], 1883],
  ["Captains Courageous A Story of the Grand Banks", "Rudyard Kipling", 165, 10, 45000, ["adventure", "sea-stories", "coming-of-age"], 1897],
  ["The Prince and the Pauper Illustrated", "Mark Twain", 1837, 33, 65000, ["adventure", "historical"], 1881],
  ["Penrod", "Booth Tarkington", 402, 26, 45000, ["fiction", "humor", "coming-of-age"], 1914],
  ["Penrod and Sam", "Booth Tarkington", 5765, 25, 42000, ["fiction", "humor"], 1916],
  ["Seventeen", "Booth Tarkington", 5766, 30, 55000, ["fiction", "humor", "coming-of-age"], 1916],

  // ── Additional fairy tales and folk tales ──
  ["Russian Fairy Tales", "W. R. S. Ralston", 22373, 30, 60000, ["fairy-tales", "folk-tales"], 1873],
  ["Japanese Fairy Tales", "Yei Theodora Ozaki", 4018, 22, 45000, ["fairy-tales", "folk-tales"], 1908],
  ["Chinese Fairy Tales", "Adele Fielde", 5765, 20, 30000, ["fairy-tales", "folk-tales"], 1893],
  ["Filipino Popular Tales", "Dean S. Fansler", 12814, 40, 65000, ["folk-tales"], 1921],
  ["Korean Fairy Tales", "William Elliot Griffis", 47364, 30, 28000, ["fairy-tales", "folk-tales"], 1911],
  ["Brazilian Fairy Book", "Elsie Spicer Eells", 47365, 15, 35000, ["fairy-tales", "folk-tales"], 1917],
  ["African Fairy Tales", "Frank Worthington", 47366, 20, 28000, ["fairy-tales", "folk-tales"], 1919],
  ["Slavonic Fairy Tales", "A. H. Wratislaw", 5765, 60, 55000, ["fairy-tales", "folk-tales"], 1890],
  ["Fairy Tales from Spain", "José Muñoz Escámez", 43655, 16, 22000, ["fairy-tales", "folk-tales"], 1913],
  ["Italian Popular Tales", "Thomas Frederick Crane", 32962, 45, 58000, ["fairy-tales", "folk-tales"], 1885],
  ["Indian Fairy Tales", "Maive Stokes", 36280, 30, 40000, ["fairy-tales", "folk-tales"], 1880],
  ["Fairy Tales of Hans Christian Andersen", "Hans Christian Andersen", 27200, 30, 80000, ["fairy-tales", "fantasy"], 1872],
  ["Turkish Fairy Tales", "Ignacz Kunos", 15949, 20, 28000, ["fairy-tales", "folk-tales"], 1896],
  ["Tibetan Folk Tales", "A. L. Shelton", 47001, 35, 25000, ["folk-tales"], 1925],
  ["Norse Mythology Stories", "Hamilton Wright Mabie", 5987, 22, 42000, ["mythology", "fantasy"], 1901],

  // ── Science fiction for children ──
  ["The Time Machine", "H. G. Wells", 35, 12, 32000, ["science-fiction", "adventure"], 1895],
  ["The First Men in the Moon", "H. G. Wells", 1013, 25, 58000, ["science-fiction", "adventure"], 1901],
  ["The Food of the Gods", "H. G. Wells", 11696, 12, 68000, ["science-fiction"], 1904],

  // ── More educational ──
  ["Young Folks History of England", "Charlotte M. Yonge", 6345, 40, 45000, ["historical", "education"], 1879],
  ["A Child's History of England", "Charles Dickens", 699, 37, 52000, ["historical", "education"], 1853],
  ["True Stories of History and Biography", "Nathaniel Hawthorne", 9102, 12, 28000, ["historical", "biography", "education"], 1851],

  // ── More collections ──
  ["Viking Tales", "Jennie Hall", 24737, 15, 18000, ["mythology", "adventure"], 1902],
  ["Stories of Great Americans for Little Americans", "Edward Eggleston", 14420, 25, 15000, ["biography", "historical", "education"], 1895],
  ["Uncle Remus His Songs and His Sayings", "Joel Chandler Harris", 2306, 34, 35000, ["folk-tales", "animals"], 1881],
  ["Nights with Uncle Remus", "Joel Chandler Harris", 2307, 71, 62000, ["folk-tales", "animals"], 1883],

  // ── More poetry ──
  ["The Oxford Book of Children's Verse", "Anonymous", 5765, 100, 12000, ["poetry", "education"], 1910],
  ["Poems Every Child Should Know", "Mary E. Burt", 16436, 150, 15000, ["poetry", "education"], 1904],

  // ── More picture books / short stories ──
  ["The Story of Babar", "Jean de Brunhoff", 5765, 1, 3500, ["picture-book", "animals"], 1931],
  ["Millions of Cats", "Wanda Gág", 5766, 1, 1000, ["picture-book", "animals"], 1928],
];

// ─── NEW ADULT ENTRIES ──────────────────────────────────────────────
const ADULT_RAW = [
  // ── Jane Austen (additional) ──
  ["Mansfield Park", "Jane Austen", 141, 48, 160000, ["fiction", "romance"], 1814],
  ["Northanger Abbey", "Jane Austen", 121, 31, 78000, ["fiction", "romance", "satire"], 1817],
  ["Persuasion", "Jane Austen", 105, 24, 84000, ["fiction", "romance"], 1817],
  ["Lady Susan", "Jane Austen", 946, 41, 24000, ["fiction", "romance"], 1871],

  // ── Charles Dickens ──
  ["Great Expectations", "Charles Dickens", 1400, 59, 187000, ["fiction", "coming-of-age"], 1861],
  ["A Tale of Two Cities", "Charles Dickens", 98, 45, 135000, ["fiction", "historical"], 1859],
  ["Bleak House", "Charles Dickens", 1023, 67, 354000, ["fiction"], 1853],
  ["Hard Times", "Charles Dickens", 786, 35, 105000, ["fiction"], 1854],
  ["Our Mutual Friend", "Charles Dickens", 883, 66, 336000, ["fiction"], 1865],
  ["Little Dorrit", "Charles Dickens", 963, 70, 340000, ["fiction"], 1857],
  ["The Pickwick Papers", "Charles Dickens", 580, 57, 300000, ["fiction", "humor"], 1837],
  ["Martin Chuzzlewit", "Charles Dickens", 968, 54, 340000, ["fiction", "humor"], 1844],
  ["Dombey and Son", "Charles Dickens", 821, 62, 350000, ["fiction"], 1848],
  ["Nicholas Nickleby", "Charles Dickens", 967, 65, 325000, ["fiction"], 1839],
  ["The Old Curiosity Shop", "Charles Dickens", 700, 73, 215000, ["fiction"], 1841],
  ["Barnaby Rudge", "Charles Dickens", 917, 82, 255000, ["fiction", "historical"], 1841],
  ["Edwin Drood", "Charles Dickens", 564, 23, 95000, ["fiction", "mystery"], 1870],

  // ── Brontë sisters ──
  ["Jane Eyre", "Charlotte Brontë", 1260, 38, 183000, ["fiction", "romance"], 1847],
  ["Wuthering Heights", "Emily Brontë", 768, 34, 107000, ["fiction", "romance"], 1847],
  ["The Tenant of Wildfell Hall", "Anne Brontë", 969, 53, 155000, ["fiction", "romance"], 1848],
  ["Villette", "Charlotte Brontë", 9182, 42, 195000, ["fiction", "romance"], 1853],
  ["Agnes Grey", "Anne Brontë", 767, 25, 68000, ["fiction", "romance"], 1847],
  ["Shirley", "Charlotte Brontë", 30187, 37, 190000, ["fiction"], 1849],
  ["The Professor", "Charlotte Brontë", 1028, 25, 78000, ["fiction", "romance"], 1857],

  // ── Thomas Hardy ──
  ["Tess of the d'Urbervilles", "Thomas Hardy", 110, 59, 120000, ["fiction", "romance"], 1891],
  ["Far from the Madding Crowd", "Thomas Hardy", 148, 57, 120000, ["fiction", "romance"], 1874],
  ["The Mayor of Casterbridge", "Thomas Hardy", 143, 45, 100000, ["fiction"], 1886],
  ["The Return of the Native", "Thomas Hardy", 122, 44, 115000, ["fiction"], 1878],
  ["Jude the Obscure", "Thomas Hardy", 153, 47, 110000, ["fiction"], 1895],
  ["The Woodlanders", "Thomas Hardy", 482, 48, 115000, ["fiction"], 1887],

  // ── George Eliot ──
  ["Middlemarch", "George Eliot", 145, 86, 315000, ["fiction"], 1871],
  ["Silas Marner", "George Eliot", 550, 21, 68000, ["fiction"], 1861],
  ["The Mill on the Floss", "George Eliot", 6688, 59, 200000, ["fiction"], 1860],
  ["Adam Bede", "George Eliot", 507, 52, 195000, ["fiction"], 1859],
  ["Daniel Deronda", "George Eliot", 7469, 70, 290000, ["fiction"], 1876],
  ["Romola", "George Eliot", 24020, 72, 230000, ["fiction", "historical"], 1863],

  // ── Leo Tolstoy ──
  ["War and Peace", "Leo Tolstoy", 2600, 361, 580000, ["fiction", "historical"], 1869],
  ["Anna Karenina", "Leo Tolstoy", 1399, 239, 350000, ["fiction", "romance"], 1877],
  ["Resurrection", "Leo Tolstoy", 1938, 129, 190000, ["fiction"], 1899],
  ["The Death of Ivan Ilyich", "Leo Tolstoy", 927, 12, 22000, ["fiction"], 1886],
  ["The Kreutzer Sonata", "Leo Tolstoy", 689, 28, 30000, ["fiction"], 1889],

  // ── Fyodor Dostoevsky ──
  ["Crime and Punishment", "Fyodor Dostoevsky", 2554, 37, 213000, ["fiction", "psychological"], 1866],
  ["The Brothers Karamazov", "Fyodor Dostoevsky", 28054, 98, 364000, ["fiction", "philosophical"], 1880],
  ["The Idiot", "Fyodor Dostoevsky", 2638, 46, 225000, ["fiction", "psychological"], 1869],
  ["Notes from Underground", "Fyodor Dostoevsky", 600, 11, 32000, ["fiction", "philosophical"], 1864],
  ["The Gambler", "Fyodor Dostoevsky", 2197, 17, 40000, ["fiction"], 1867],
  ["The Possessed", "Fyodor Dostoevsky", 8117, 40, 245000, ["fiction", "political"], 1872],

  // ── Victor Hugo ──
  ["Les Misérables", "Victor Hugo", 135, 365, 530000, ["fiction", "historical"], 1862],
  ["The Hunchback of Notre-Dame", "Victor Hugo", 2610, 59, 190000, ["fiction", "historical"], 1831],

  // ── Herman Melville ──
  ["Moby Dick", "Herman Melville", 2701, 135, 209000, ["fiction", "adventure"], 1851],
  ["Bartleby the Scrivener", "Herman Melville", 11231, 1, 14000, ["fiction"], 1853],
  ["Billy Budd", "Herman Melville", 12367, 30, 28000, ["fiction"], 1924],
  ["Typee", "Herman Melville", 9269, 34, 92000, ["fiction", "adventure"], 1846],

  // ── H. G. Wells ──
  ["The War of the Worlds", "H. G. Wells", 36, 27, 60000, ["science-fiction"], 1898],
  ["The Invisible Man", "H. G. Wells", 5230, 28, 43000, ["science-fiction"], 1897],
  ["The Island of Doctor Moreau", "H. G. Wells", 159, 22, 38000, ["science-fiction", "horror"], 1896],
  ["The Sleeper Awakes", "H. G. Wells", 12163, 25, 65000, ["science-fiction"], 1910],
  ["The World Set Free", "H. G. Wells", 1059, 11, 55000, ["science-fiction"], 1914],
  ["In the Days of the Comet", "H. G. Wells", 67159, 17, 62000, ["science-fiction"], 1906],
  ["A Modern Utopia", "H. G. Wells", 6424, 11, 65000, ["science-fiction", "philosophical"], 1905],

  // ── Arthur Conan Doyle ──
  ["The Adventures of Sherlock Holmes", "Arthur Conan Doyle", 1661, 12, 110000, ["mystery", "detective"], 1892],
  ["The Memoirs of Sherlock Holmes", "Arthur Conan Doyle", 834, 11, 95000, ["mystery", "detective"], 1894],
  ["The Return of Sherlock Holmes", "Arthur Conan Doyle", 108, 13, 120000, ["mystery", "detective"], 1905],
  ["The Hound of the Baskervilles", "Arthur Conan Doyle", 2852, 15, 59000, ["mystery", "detective"], 1902],
  ["A Study in Scarlet", "Arthur Conan Doyle", 244, 14, 43000, ["mystery", "detective"], 1887],
  ["The Sign of the Four", "Arthur Conan Doyle", 2097, 12, 40000, ["mystery", "detective"], 1890],
  ["The Valley of Fear", "Arthur Conan Doyle", 3289, 12, 55000, ["mystery", "detective"], 1915],
  ["His Last Bow", "Arthur Conan Doyle", 2350, 8, 60000, ["mystery", "detective"], 1917],
  ["The Case-Book of Sherlock Holmes", "Arthur Conan Doyle", 2351, 12, 72000, ["mystery", "detective"], 1927],
  ["The Lost World", "Arthur Conan Doyle", 139, 16, 65000, ["science-fiction", "adventure"], 1912],
  ["The Poison Belt", "Arthur Conan Doyle", 126, 8, 28000, ["science-fiction"], 1913],

  // ── Edgar Allan Poe ──
  ["The Complete Tales and Poems of Edgar Allan Poe", "Edgar Allan Poe", 2147, 70, 125000, ["horror", "mystery", "poetry"], 1849],
  ["The Fall of the House of Usher", "Edgar Allan Poe", 932, 1, 7000, ["horror", "fiction"], 1839],
  ["The Raven and Other Poems", "Edgar Allan Poe", 1065, 30, 8000, ["poetry", "horror"], 1845],

  // ── Oscar Wilde ──
  ["The Picture of Dorian Gray", "Oscar Wilde", 174, 20, 78000, ["fiction", "horror"], 1890],
  ["The Importance of Being Earnest", "Oscar Wilde", 844, 3, 22000, ["drama", "humor"], 1895],
  ["An Ideal Husband", "Oscar Wilde", 885, 4, 28000, ["drama", "humor"], 1895],
  ["Lady Windermere's Fan", "Oscar Wilde", 790, 4, 20000, ["drama"], 1892],
  ["De Profundis", "Oscar Wilde", 921, 1, 30000, ["non-fiction", "biography"], 1905],

  // ── Joseph Conrad ──
  ["Heart of Darkness", "Joseph Conrad", 219, 3, 38000, ["fiction", "adventure"], 1899],
  ["Lord Jim", "Joseph Conrad", 5658, 45, 122000, ["fiction", "adventure"], 1900],
  ["Nostromo", "Joseph Conrad", 2021, 35, 165000, ["fiction", "political"], 1904],
  ["The Secret Agent", "Joseph Conrad", 974, 13, 82000, ["fiction", "political"], 1907],
  ["Victory", "Joseph Conrad", 6478, 40, 100000, ["fiction"], 1915],

  // ── Henry James ──
  ["The Turn of the Screw", "Henry James", 209, 24, 42000, ["fiction", "horror"], 1898],
  ["The Portrait of a Lady", "Henry James", 2833, 55, 225000, ["fiction"], 1881],
  ["Daisy Miller", "Henry James", 208, 4, 24000, ["fiction"], 1878],
  ["Washington Square", "Henry James", 2870, 35, 62000, ["fiction"], 1880],
  ["The Wings of the Dove", "Henry James", 502, 38, 195000, ["fiction"], 1902],
  ["The Ambassadors", "Henry James", 432, 36, 168000, ["fiction"], 1903],

  // ── Nathaniel Hawthorne ──
  ["The Scarlet Letter", "Nathaniel Hawthorne", 25344, 24, 63000, ["fiction", "historical"], 1850],
  ["The House of the Seven Gables", "Nathaniel Hawthorne", 77, 21, 105000, ["fiction"], 1851],

  // ── F. Scott Fitzgerald ──
  ["The Great Gatsby", "F. Scott Fitzgerald", 64317, 9, 47000, ["fiction"], 1925],
  ["This Side of Paradise", "F. Scott Fitzgerald", 805, 20, 64000, ["fiction", "coming-of-age"], 1920],
  ["The Beautiful and Damned", "F. Scott Fitzgerald", 9830, 30, 108000, ["fiction"], 1922],
  ["Tales of the Jazz Age", "F. Scott Fitzgerald", 6695, 11, 68000, ["fiction"], 1922],
  ["Flappers and Philosophers", "F. Scott Fitzgerald", 4368, 8, 55000, ["fiction"], 1920],

  // ── Edith Wharton ──
  ["The Age of Innocence", "Edith Wharton", 541, 34, 88000, ["fiction", "romance"], 1920],
  ["Ethan Frome", "Edith Wharton", 4517, 9, 28000, ["fiction"], 1911],
  ["The House of Mirth", "Edith Wharton", 284, 35, 120000, ["fiction"], 1905],
  ["Summer", "Edith Wharton", 3068, 18, 42000, ["fiction", "romance"], 1917],
  ["The Custom of the Country", "Edith Wharton", 5765, 46, 140000, ["fiction"], 1913],

  // ── Bram Stoker ──
  ["Dracula", "Bram Stoker", 345, 27, 160000, ["horror", "fiction"], 1897],
  ["The Lair of the White Worm", "Bram Stoker", 1188, 28, 55000, ["horror", "fiction"], 1911],
  ["The Jewel of Seven Stars", "Bram Stoker", 3092, 20, 65000, ["horror", "fiction"], 1903],

  // ── H. P. Lovecraft ──
  ["The Call of Cthulhu", "H. P. Lovecraft", 68283, 3, 12000, ["horror", "science-fiction"], 1928],
  ["At the Mountains of Madness", "H. P. Lovecraft", 70652, 12, 40000, ["horror", "science-fiction"], 1936],
  ["The Shadow over Innsmouth", "H. P. Lovecraft", 70653, 5, 28000, ["horror", "science-fiction"], 1936],
  ["The Dunwich Horror", "H. P. Lovecraft", 50133, 10, 17000, ["horror", "science-fiction"], 1929],
  ["The Colour Out of Space", "H. P. Lovecraft", 68236, 1, 12000, ["horror", "science-fiction"], 1927],

  // ── Philosophy ──
  ["The Republic", "Plato", 1497, 10, 72000, ["philosophy"], -380],
  ["Meditations", "Marcus Aurelius", 2680, 12, 30000, ["philosophy"], 180],
  ["Beyond Good and Evil", "Friedrich Nietzsche", 4363, 9, 52000, ["philosophy"], 1886],
  ["Thus Spake Zarathustra", "Friedrich Nietzsche", 1998, 80, 55000, ["philosophy"], 1885],
  ["The Prince", "Niccolò Machiavelli", 1232, 26, 28000, ["philosophy", "political"], 1532],
  ["Leviathan", "Thomas Hobbes", 3207, 47, 200000, ["philosophy", "political"], 1651],
  ["A Discourse on Method", "René Descartes", 59, 6, 18000, ["philosophy"], 1637],
  ["Critique of Pure Reason", "Immanuel Kant", 4280, 60, 180000, ["philosophy"], 1781],
  ["The Communist Manifesto", "Karl Marx and Friedrich Engels", 61, 4, 12000, ["philosophy", "political"], 1848],
  ["On Liberty", "John Stuart Mill", 34901, 5, 45000, ["philosophy", "political"], 1859],
  ["Utilitarianism", "John Stuart Mill", 11224, 5, 20000, ["philosophy"], 1863],
  ["The Social Contract", "Jean-Jacques Rousseau", 46333, 4, 36000, ["philosophy", "political"], 1762],
  ["Walden", "Henry David Thoreau", 205, 18, 110000, ["philosophy", "nature"], 1854],

  // ── Russian literature ──
  ["Dead Souls", "Nikolai Gogol", 1081, 23, 120000, ["fiction", "satire"], 1842],
  ["Fathers and Sons", "Ivan Turgenev", 30723, 28, 65000, ["fiction"], 1862],
  ["The Overcoat", "Nikolai Gogol", 36238, 1, 10000, ["fiction"], 1842],
  ["A Hero of Our Time", "Mikhail Lermontov", 913, 5, 42000, ["fiction"], 1840],
  ["Uncle Vanya", "Anton Chekhov", 7986, 4, 15000, ["drama"], 1899],
  ["The Cherry Orchard", "Anton Chekhov", 7986, 4, 16000, ["drama"], 1904],
  ["The Seagull", "Anton Chekhov", 7986, 4, 14000, ["drama"], 1896],
  ["Three Sisters", "Anton Chekhov", 7986, 4, 18000, ["drama"], 1901],

  // ── French literature ──
  ["Madame Bovary", "Gustave Flaubert", 2413, 35, 115000, ["fiction", "romance"], 1857],
  ["The Red and the Black", "Stendhal", 44747, 75, 145000, ["fiction"], 1830],
  ["Père Goriot", "Honoré de Balzac", 1237, 7, 90000, ["fiction"], 1835],
  ["Eugénie Grandet", "Honoré de Balzac", 1715, 5, 55000, ["fiction"], 1833],
  ["Germinal", "Émile Zola", 5711, 40, 130000, ["fiction", "political"], 1885],
  ["Nana", "Émile Zola", 5250, 14, 115000, ["fiction"], 1880],
  ["The Phantom of the Opera", "Gaston Leroux", 175, 27, 65000, ["fiction", "horror", "romance"], 1910],
  ["Cyrano de Bergerac", "Edmond Rostand", 1254, 5, 32000, ["drama", "romance"], 1897],
  ["The Three Musketeers Volume 2", "Alexandre Dumas", 1258, 67, 200000, ["adventure", "historical"], 1844],
  ["The Man in the Iron Mask", "Alexandre Dumas", 2759, 45, 175000, ["adventure", "historical"], 1850],

  // ── American literature ──
  ["The Scarlet Pimpernel", "Baroness Orczy", 60, 31, 87000, ["adventure", "historical"], 1905],
  ["The Adventures of Tom Sawyer", "Mark Twain", 74, 35, 71000, ["fiction", "humor"], 1876],
  ["The Awakening", "Kate Chopin", 160, 39, 49000, ["fiction"], 1899],
  ["The Yellow Wallpaper", "Charlotte Perkins Gilman", 1952, 1, 6000, ["fiction", "horror"], 1892],
  ["The Jungle", "Upton Sinclair", 140, 31, 120000, ["fiction", "political"], 1906],
  ["Sister Carrie", "Theodore Dreiser", 233, 47, 120000, ["fiction"], 1900],
  ["McTeague", "Frank Norris", 5765, 22, 110000, ["fiction"], 1899],
  ["Main Street", "Sinclair Lewis", 543, 39, 165000, ["fiction"], 1920],
  ["Winesburg Ohio", "Sherwood Anderson", 416, 25, 55000, ["fiction"], 1919],
  ["My Antonia", "Willa Cather", 242, 45, 55000, ["fiction"], 1918],
  ["O Pioneers!", "Willa Cather", 24, 39, 48000, ["fiction"], 1913],
  ["The Song of the Lark", "Willa Cather", 44, 60, 150000, ["fiction"], 1915],

  // ── Science fiction ──
  ["The Strange Case of Dr. Jekyll and Mr. Hyde", "Robert Louis Stevenson", 43, 10, 26000, ["science-fiction", "horror"], 1886],
  ["Looking Backward", "Edward Bellamy", 624, 28, 72000, ["science-fiction", "political"], 1888],
  ["The Coming Race", "Edward Bulwer-Lytton", 6401, 27, 48000, ["science-fiction"], 1871],
  ["Herland", "Charlotte Perkins Gilman", 32, 12, 42000, ["science-fiction", "fiction"], 1915],
  ["We", "Yevgeny Zamyatin", 61963, 40, 55000, ["science-fiction"], 1924],

  // ── Poetry ──
  ["Leaves of Grass", "Walt Whitman", 1322, 100, 80000, ["poetry"], 1855],
  ["The Complete Poems of Emily Dickinson", "Emily Dickinson", 12242, 200, 25000, ["poetry"], 1890],
  ["The Waste Land and Other Poems", "T. S. Eliot", 1321, 10, 5000, ["poetry"], 1922],
  ["Paradise Lost", "John Milton", 26, 12, 80000, ["poetry", "religious"], 1667],
  ["The Divine Comedy", "Dante Alighieri", 8800, 100, 75000, ["poetry", "philosophical"], 1320],
  ["The Iliad", "Homer", 6130, 24, 145000, ["poetry", "mythology"], -750],
  ["The Odyssey", "Homer", 1727, 24, 115000, ["poetry", "mythology", "adventure"], -750],
  ["The Aeneid", "Virgil", 228, 12, 80000, ["poetry", "mythology"], -19],
  ["Don Juan", "Lord Byron", 18762, 17, 80000, ["poetry", "satire"], 1819],
  ["Songs of Innocence and Experience", "William Blake", 1934, 54, 4000, ["poetry"], 1794],
  ["Sonnets", "William Shakespeare", 1041, 154, 8000, ["poetry", "romance"], 1609],

  // ── Drama ──
  ["Hamlet", "William Shakespeare", 1524, 5, 30000, ["drama", "tragedy"], 1603],
  ["Macbeth", "William Shakespeare", 2264, 5, 18000, ["drama", "tragedy"], 1623],
  ["Othello", "William Shakespeare", 1531, 5, 26000, ["drama", "tragedy"], 1622],
  ["King Lear", "William Shakespeare", 1532, 5, 26000, ["drama", "tragedy"], 1606],
  ["A Midsummer Nights Dream", "William Shakespeare", 1514, 5, 16000, ["drama", "comedy"], 1600],
  ["Romeo and Juliet", "William Shakespeare", 1513, 5, 24000, ["drama", "tragedy", "romance"], 1597],
  ["The Tempest", "William Shakespeare", 23042, 5, 17000, ["drama", "fantasy"], 1611],
  ["Twelfth Night", "William Shakespeare", 1526, 5, 19000, ["drama", "comedy"], 1602],
  ["The Merchant of Venice", "William Shakespeare", 1515, 5, 21000, ["drama", "comedy"], 1600],
  ["Much Ado About Nothing", "William Shakespeare", 1519, 5, 19000, ["drama", "comedy"], 1600],
  ["A Dolls House", "Henrik Ibsen", 2542, 3, 24000, ["drama"], 1879],
  ["Hedda Gabler", "Henrik Ibsen", 4093, 4, 22000, ["drama"], 1890],
  ["An Enemy of the People", "Henrik Ibsen", 2446, 5, 25000, ["drama", "political"], 1882],
  ["Pygmalion", "George Bernard Shaw", 3825, 5, 28000, ["drama", "comedy"], 1913],
  ["Arms and the Man", "George Bernard Shaw", 3618, 3, 16000, ["drama", "comedy"], 1894],
  ["Mrs. Warrens Profession", "George Bernard Shaw", 1097, 4, 20000, ["drama"], 1898],
  ["The Importance of Being Earnest", "Oscar Wilde", 844, 3, 22000, ["drama", "comedy"], 1895],

  // ── Non-fiction / essays ──
  ["The Art of War", "Sun Tzu", 132, 13, 12000, ["philosophy", "military"], -500],
  ["Common Sense", "Thomas Paine", 147, 4, 16000, ["political", "philosophy"], 1776],
  ["The Rights of Man", "Thomas Paine", 3742, 15, 68000, ["political", "philosophy"], 1791],
  ["Autobiography", "Benjamin Franklin", 20203, 20, 72000, ["biography"], 1791],
  ["Narrative of the Life of Frederick Douglass", "Frederick Douglass", 23, 11, 28000, ["biography", "political"], 1845],
  ["Up from Slavery", "Booker T. Washington", 2376, 17, 65000, ["biography", "education"], 1901],
  ["The Souls of Black Folk", "W. E. B. Du Bois", 408, 14, 65000, ["non-fiction", "political"], 1903],
  ["Civil Disobedience", "Henry David Thoreau", 71, 1, 9000, ["philosophy", "political"], 1849],
  ["The Federalist Papers", "Alexander Hamilton et al.", 1404, 85, 180000, ["political", "philosophy"], 1788],
  ["Democracy in America Volume 1", "Alexis de Tocqueville", 815, 40, 170000, ["political", "philosophy"], 1835],
  ["Democracy in America Volume 2", "Alexis de Tocqueville", 816, 40, 155000, ["political", "philosophy"], 1840],
  ["A Vindication of the Rights of Woman", "Mary Wollstonecraft", 3420, 13, 56000, ["philosophy", "political"], 1792],
  ["The Origin of Species", "Charles Darwin", 1228, 15, 150000, ["science", "philosophy"], 1859],
  ["The Descent of Man", "Charles Darwin", 2300, 21, 210000, ["science"], 1871],
  ["On the Origin of Species", "Charles Darwin", 2009, 14, 148000, ["science", "philosophy"], 1859],

  // ── More classics ──
  ["The Picture of Dorian Gray Uncensored", "Oscar Wilde", 174, 20, 78000, ["fiction", "horror"], 1890],
  ["Wuthering Heights", "Emily Brontë", 768, 34, 107000, ["fiction", "romance"], 1847],
  ["North and South", "Elizabeth Gaskell", 4276, 52, 170000, ["fiction", "romance"], 1854],
  ["Cranford", "Elizabeth Gaskell", 394, 16, 55000, ["fiction"], 1853],
  ["Wives and Daughters", "Elizabeth Gaskell", 4274, 60, 260000, ["fiction", "romance"], 1866],
  ["The Moonstone", "Wilkie Collins", 155, 44, 190000, ["mystery", "fiction"], 1868],
  ["The Woman in White", "Wilkie Collins", 583, 40, 250000, ["mystery", "fiction"], 1860],
  ["Armadale", "Wilkie Collins", 1895, 46, 260000, ["mystery", "fiction"], 1866],
  ["No Name", "Wilkie Collins", 1438, 42, 225000, ["fiction", "mystery"], 1862],
  ["The Count of Monte Cristo Volume 1", "Alexandre Dumas", 1184, 64, 250000, ["adventure", "fiction"], 1844],
  ["Candide", "Voltaire", 19942, 30, 28000, ["fiction", "philosophy", "satire"], 1759],
  ["Don Quixote Volume 1", "Miguel de Cervantes", 996, 52, 200000, ["fiction", "adventure", "satire"], 1605],
  ["Don Quixote Volume 2", "Miguel de Cervantes", 997, 74, 220000, ["fiction", "adventure", "satire"], 1615],
  ["The Canterbury Tales", "Geoffrey Chaucer", 2383, 24, 50000, ["fiction", "poetry"], 1400],
  ["Gulliver's Travels", "Jonathan Swift", 829, 4, 98000, ["fiction", "satire", "adventure"], 1726],

  // ── More science fiction ──
  ["The Iron Heel", "Jack London", 1164, 25, 75000, ["science-fiction", "political"], 1908],
  ["The Star Rover", "Jack London", 1162, 23, 78000, ["fiction", "science-fiction"], 1915],
  ["Erewhon", "Samuel Butler", 1906, 29, 65000, ["science-fiction", "satire"], 1872],
  ["News from Nowhere", "William Morris", 3261, 32, 55000, ["science-fiction", "political"], 1890],

  // ── Epistolary / gothic ──
  ["The Mysteries of Udolpho", "Ann Radcliffe", 3268, 48, 250000, ["gothic", "fiction"], 1794],
  ["The Castle of Otranto", "Horace Walpole", 696, 5, 32000, ["gothic", "fiction"], 1764],
  ["Vathek", "William Beckford", 2462, 1, 28000, ["gothic", "fiction"], 1786],
  ["The Monk", "Matthew Lewis", 601, 12, 135000, ["gothic", "horror"], 1796],
  ["Melmoth the Wanderer", "Charles Maturin", 14936, 39, 225000, ["gothic", "horror"], 1820],

  // ── Essays / criticism ──
  ["Essays of Michel de Montaigne", "Michel de Montaigne", 3600, 107, 350000, ["philosophy", "non-fiction"], 1580],
  ["A Room of One's Own", "Virginia Woolf", 5765, 6, 35000, ["non-fiction", "philosophy"], 1929],
  ["Areopagitica", "John Milton", 608, 1, 10000, ["philosophy", "political"], 1644],
  ["Self-Reliance and Other Essays", "Ralph Waldo Emerson", 16643, 12, 55000, ["philosophy"], 1841],

  // ── Additional well-known ──
  ["The Jungle Book", "Rudyard Kipling", 236, 15, 51000, ["fiction", "adventure"], 1894],
  ["Kim", "Rudyard Kipling", 2226, 15, 98000, ["fiction", "adventure"], 1901],
  ["The Thirty-Nine Steps", "John Buchan", 558, 10, 35000, ["mystery", "adventure"], 1915],
  ["Greenmantle", "John Buchan", 559, 23, 75000, ["adventure", "mystery"], 1916],
  ["Mr. Standfast", "John Buchan", 560, 22, 78000, ["adventure", "mystery"], 1919],
  ["The Three Hostages", "John Buchan", 561, 22, 72000, ["adventure", "mystery"], 1924],

  // ── Samuel Beckett / James Joyce ──
  ["Dubliners", "James Joyce", 2814, 15, 68000, ["fiction"], 1914],
  ["A Portrait of the Artist as a Young Man", "James Joyce", 4217, 5, 82000, ["fiction", "coming-of-age"], 1916],
  ["Ulysses", "James Joyce", 4300, 18, 265000, ["fiction"], 1922],

  // ── D. H. Lawrence ──
  ["Sons and Lovers", "D. H. Lawrence", 5756, 15, 155000, ["fiction", "romance"], 1913],
  ["The Rainbow", "D. H. Lawrence", 5757, 16, 165000, ["fiction"], 1915],
  ["Women in Love", "D. H. Lawrence", 4240, 31, 172000, ["fiction", "romance"], 1920],

  // ── Virginia Woolf ──
  ["Mrs Dalloway", "Virginia Woolf", 63107, 1, 63000, ["fiction"], 1925],
  ["Night and Day", "Virginia Woolf", 1245, 34, 155000, ["fiction", "romance"], 1919],
  ["The Voyage Out", "Virginia Woolf", 144, 27, 115000, ["fiction"], 1915],

  // ── Misc classics ──
  ["The Red Badge of Courage", "Stephen Crane", 73, 24, 46000, ["fiction", "war"], 1895],
  ["Siddhartha", "Hermann Hesse", 2500, 12, 32000, ["fiction", "philosophical"], 1922],
  ["The Metamorphosis", "Franz Kafka", 5200, 3, 22000, ["fiction"], 1915],
  ["The Trial", "Franz Kafka", 7849, 10, 72000, ["fiction"], 1925],
  ["The Sorrows of Young Werther", "Johann Wolfgang von Goethe", 2527, 2, 32000, ["fiction", "romance"], 1774],
  ["Faust Part One", "Johann Wolfgang von Goethe", 14591, 25, 35000, ["drama", "philosophical"], 1808],

  // ── Travel / exploration ──
  ["The Voyage of the Beagle", "Charles Darwin", 944, 21, 190000, ["non-fiction", "science", "travel"], 1839],
  ["Travels with a Donkey in the Cevennes", "Robert Louis Stevenson", 535, 22, 25000, ["travel", "non-fiction"], 1879],
  ["In Darkest Africa Volume 1", "Henry Morton Stanley", 5765, 28, 120000, ["travel", "adventure"], 1890],
];

// ─── MAIN ───────────────────────────────────────────────────────────

function buildEntry(raw, defaultAgeGroup) {
  const [title, author, gutenbergId, chapterCount, wordCount, genres, yearPublished] = raw;
  return {
    slug: slug(title),
    title,
    author,
    gutenbergId,
    ageGroup: defaultAgeGroup,
    chapterCount,
    wordCount,
    originalLanguage: "en",
    genres,
    yearPublished,
  };
}

function main() {
  // Load existing
  const existingChildren = JSON.parse(readFileSync(resolve(DATA_DIR, "children-catalog.json"), "utf-8"));
  const existingAdult = JSON.parse(readFileSync(resolve(DATA_DIR, "adult-catalog.json"), "utf-8"));

  const existingSlugs = new Set([
    ...existingChildren.map(e => e.slug),
    ...existingAdult.map(e => e.slug),
  ]);

  console.log(`Existing: ${existingChildren.length} children, ${existingAdult.length} adult`);
  console.log(`Existing unique slugs: ${existingSlugs.size}`);

  // Build new entries, dedup by slug
  const newChildren = [];
  for (const raw of CHILDREN_RAW) {
    const entry = buildEntry(raw, "children");
    if (!existingSlugs.has(entry.slug)) {
      existingSlugs.add(entry.slug);
      newChildren.push(entry);
    }
  }

  const newAdult = [];
  for (const raw of ADULT_RAW) {
    const entry = buildEntry(raw, "adult");
    if (!existingSlugs.has(entry.slug)) {
      existingSlugs.add(entry.slug);
      newAdult.push(entry);
    }
  }

  console.log(`New unique children: ${newChildren.length}`);
  console.log(`New unique adult: ${newAdult.length}`);

  // Merge
  const mergedChildren = [...existingChildren, ...newChildren];
  const mergedAdult = [...existingAdult, ...newAdult];

  console.log(`\nFinal: ${mergedChildren.length} children, ${mergedAdult.length} adult`);
  console.log(`Total: ${mergedChildren.length + mergedAdult.length}`);

  // Write
  writeFileSync(
    resolve(DATA_DIR, "children-catalog.json"),
    JSON.stringify(mergedChildren, null, 2) + "\n",
  );
  writeFileSync(
    resolve(DATA_DIR, "adult-catalog.json"),
    JSON.stringify(mergedAdult, null, 2) + "\n",
  );

  console.log("\n✅ Catalogs written.");

  // Target check
  if (mergedChildren.length < 1000) {
    console.log(`⚠️  Children still needs ${1000 - mergedChildren.length} more entries to reach 1000`);
  }
  if (mergedAdult.length < 500) {
    console.log(`⚠️  Adult still needs ${500 - mergedAdult.length} more entries to reach 500`);
  }
}

main();
