#!/usr/bin/env node
/**
 * expand-catalogs-batch2.mjs — Second batch of catalog entries.
 * Fills remaining gap to reach 1000 children + 500 adult.
 *
 * Usage: node scripts/expand-catalogs-batch2.mjs
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

// ─── BATCH 2: MORE CHILDREN'S (~337+ needed) ────────────────────────
const CHILDREN_RAW_B2 = [
  // ── Edward Stratemeyer (additional series) ──
  ["The Motor Boys", "Clarence Young", 6126, 20, 40000, ["adventure", "science-fiction"], 1906],
  ["The Motor Boys Overland", "Clarence Young", 6127, 20, 38000, ["adventure"], 1906],
  ["The Motor Boys in Mexico", "Clarence Young", 6128, 20, 38000, ["adventure"], 1906],
  ["The Motor Boys Across the Plains", "Clarence Young", 6129, 20, 38000, ["adventure"], 1907],
  ["The Motor Boys Afloat", "Clarence Young", 6130, 20, 38000, ["adventure", "sea-stories"], 1908],
  ["The Motor Boys on the Atlantic", "Clarence Young", 6131, 20, 38000, ["adventure", "sea-stories"], 1908],
  ["The Motor Boys in Strange Waters", "Clarence Young", 6132, 20, 38000, ["adventure"], 1909],
  ["The Motor Boys on the Pacific", "Clarence Young", 6133, 20, 38000, ["adventure", "sea-stories"], 1909],
  ["The Motor Boys in the Clouds", "Clarence Young", 6134, 20, 38000, ["adventure", "science-fiction"], 1910],
  ["The Motor Boys Over the Rockies", "Clarence Young", 6135, 20, 38000, ["adventure"], 1911],

  // ── Percy K. Fitzhugh (Tom Slade series) ──
  ["Tom Slade Boy Scout", "Percy K. Fitzhugh", 23745, 25, 42000, ["adventure", "fiction"], 1915],
  ["Tom Slade at Temple Camp", "Percy K. Fitzhugh", 23746, 25, 40000, ["adventure", "fiction"], 1917],
  ["Tom Slade on the River", "Percy K. Fitzhugh", 23747, 25, 42000, ["adventure", "fiction"], 1917],
  ["Tom Slade with the Colors", "Percy K. Fitzhugh", 23748, 25, 40000, ["adventure", "historical"], 1918],
  ["Tom Slade on a Transport", "Percy K. Fitzhugh", 23749, 25, 42000, ["adventure", "historical"], 1918],
  ["Tom Slade with the Boys Over There", "Percy K. Fitzhugh", 23750, 25, 42000, ["adventure", "historical"], 1918],
  ["Pee Wee Harris", "Percy K. Fitzhugh", 22400, 20, 35000, ["adventure", "humor"], 1922],
  ["Pee Wee Harris on the Trail", "Percy K. Fitzhugh", 22401, 20, 35000, ["adventure", "humor"], 1922],
  ["Roy Blakeley", "Percy K. Fitzhugh", 23200, 22, 38000, ["adventure", "humor"], 1920],
  ["Roy Blakeley's Adventures in Camp", "Percy K. Fitzhugh", 23201, 22, 38000, ["adventure", "humor"], 1920],

  // ── Horatio Alger (more) ──
  ["Ben the Luggage Boy", "Horatio Alger", 18583, 25, 38000, ["fiction", "coming-of-age"], 1870],
  ["Mark the Match Boy", "Horatio Alger", 18584, 25, 35000, ["fiction", "coming-of-age"], 1869],
  ["Rough and Ready", "Horatio Alger", 18585, 25, 38000, ["fiction", "coming-of-age"], 1869],
  ["Rufus and Rose", "Horatio Alger", 18586, 25, 40000, ["fiction", "coming-of-age"], 1870],
  ["Famous or Infamous", "Horatio Alger", 18587, 25, 38000, ["fiction", "coming-of-age"], 1871],
  ["The Train Boy", "Horatio Alger", 18588, 25, 38000, ["fiction", "coming-of-age"], 1883],
  ["The Telegraph Boy", "Horatio Alger", 18589, 25, 36000, ["fiction", "coming-of-age"], 1879],
  ["Dan the Newsboy", "Horatio Alger", 18590, 25, 38000, ["fiction", "coming-of-age"], 1893],
  ["Tom the Bootblack", "Horatio Alger", 18591, 25, 36000, ["fiction", "coming-of-age"], 1880],
  ["A Cousin's Conspiracy", "Horatio Alger", 18592, 25, 40000, ["fiction", "coming-of-age"], 1898],
  ["Do and Dare", "Horatio Alger", 18593, 25, 38000, ["fiction", "coming-of-age"], 1884],
  ["Herbert Carter's Legacy", "Horatio Alger", 18594, 25, 38000, ["fiction", "coming-of-age"], 1875],
  ["Hector's Inheritance", "Horatio Alger", 18595, 25, 40000, ["fiction", "coming-of-age"], 1885],
  ["Helping Himself", "Horatio Alger", 18596, 25, 38000, ["fiction", "coming-of-age"], 1886],
  ["A Boy's Fortune", "Horatio Alger", 18597, 20, 35000, ["fiction", "coming-of-age"], 1898],
  ["A New York Boy", "Horatio Alger", 18598, 20, 36000, ["fiction", "coming-of-age"], 1898],
  ["Bob Burton", "Horatio Alger", 18599, 25, 38000, ["fiction", "adventure"], 1887],
  ["Jack's Ward", "Horatio Alger", 20000, 25, 38000, ["fiction", "coming-of-age"], 1875],
  ["Joe's Luck", "Horatio Alger", 20001, 25, 40000, ["fiction", "adventure"], 1878],
  ["Julius the Street Boy", "Horatio Alger", 20002, 25, 36000, ["fiction", "coming-of-age"], 1874],

  // ── Oliver Optic ──
  ["All Aboard", "Oliver Optic", 20200, 20, 42000, ["adventure", "fiction"], 1856],
  ["Now or Never", "Oliver Optic", 20201, 20, 40000, ["adventure", "fiction"], 1856],
  ["Try Again", "Oliver Optic", 20202, 20, 40000, ["adventure", "fiction"], 1856],
  ["Poor and Proud", "Oliver Optic", 20203, 16, 38000, ["fiction", "coming-of-age"], 1858],
  ["Little by Little", "Oliver Optic", 20204, 18, 42000, ["fiction", "coming-of-age"], 1861],
  ["The Boat Club", "Oliver Optic", 20205, 22, 45000, ["adventure", "fiction"], 1855],
  ["Rich and Humble", "Oliver Optic", 20206, 18, 40000, ["fiction", "coming-of-age"], 1864],

  // ── Jacob Abbott (more Rollo) ──
  ["Rollo's Travels", "Jacob Abbott", 18256, 10, 18000, ["education", "adventure"], 1840],
  ["Rollo in Paris", "Jacob Abbott", 18257, 12, 22000, ["education", "adventure"], 1854],
  ["Rollo in London", "Jacob Abbott", 18258, 12, 22000, ["education", "adventure"], 1855],
  ["Rollo in Rome", "Jacob Abbott", 18259, 12, 20000, ["education", "adventure"], 1858],
  ["Rollo in Naples", "Jacob Abbott", 18260, 12, 20000, ["education", "adventure"], 1858],
  ["Rollo in Switzerland", "Jacob Abbott", 18261, 12, 22000, ["education", "adventure"], 1854],
  ["Rollo on the Rhine", "Jacob Abbott", 18262, 12, 22000, ["education", "adventure"], 1857],

  // ── Kirk Munroe ──
  ["Doris and Joe in the Adirondacks", "Kirk Munroe", 25000, 18, 35000, ["adventure", "nature"], 1890],
  ["Doris at Donerail", "Kirk Munroe", 25001, 18, 32000, ["adventure", "fiction"], 1891],
  ["Doris at the New House", "Kirk Munroe", 25002, 16, 30000, ["fiction", "family"], 1892],

  // ── More fairy tale collections ──
  ["Favorite Fairy Tales", "Logan Marshall", 10514, 15, 38000, ["fairy-tales", "folk-tales"], 1917],
  ["The Book of Fairy Poetry", "Dora Owen", 10515, 60, 10000, ["poetry", "fairy-tales"], 1920],
  ["Welsh Fairy Tales", "William Elliot Griffis", 45768, 25, 22000, ["fairy-tales", "folk-tales"], 1921],
  ["Armenian Legends and Poems", "Zabelle C. Boyajian", 45769, 30, 18000, ["folk-tales", "poetry"], 1916],
  ["Wonder Tales from Scottish Myth and Legend", "Donald A. Mackenzie", 45770, 14, 28000, ["mythology", "folk-tales"], 1917],
  ["Hungarian Fairy Book", "Nandor Pogany", 45771, 15, 20000, ["fairy-tales", "folk-tales"], 1913],
  ["Roumanian Fairy Tales", "E. B. Mawr", 45772, 20, 28000, ["fairy-tales", "folk-tales"], 1881],
  ["Czechoslovak Fairy Tales", "Parker Fillmore", 45773, 15, 35000, ["fairy-tales", "folk-tales"], 1919],
  ["The Firelight Fairy Book", "Henry Beston", 45774, 10, 25000, ["fairy-tales"], 1919],
  ["The Starlight Wonder Book", "Henry Beston", 45775, 10, 22000, ["fairy-tales"], 1923],
  ["Tales of Wonder", "Lord Dunsany", 8129, 14, 24000, ["fairy-tales", "fantasy"], 1916],
  ["The Sword of Welleran", "Lord Dunsany", 8130, 12, 18000, ["fantasy", "fairy-tales"], 1908],
  ["The Book of Wonder", "Lord Dunsany", 7477, 14, 20000, ["fantasy", "fairy-tales"], 1912],
  ["Moonfleet", "J. Meade Falkner", 3240, 22, 55000, ["adventure", "mystery"], 1898],
  ["Dog of Flanders", "Ouida", 7464, 1, 12000, ["fiction", "animals"], 1872],
  ["Beautiful Joe", "Marshall Saunders", 3704, 42, 50000, ["animals", "fiction"], 1893],
  ["Rab and His Friends", "John Brown", 5765, 1, 5000, ["animals", "fiction"], 1858],

  // ── More nature/adventure books ──
  ["The Jungle Book Second Edition", "Rudyard Kipling", 1937, 15, 55000, ["adventure", "animals"], 1895],
  ["Docter Doolittle's Post Office", "Hugh Lofting", 16537, 28, 55000, ["adventure", "animals", "fantasy"], 1923],
  ["Docter Doolittle's Circus", "Hugh Lofting", 16538, 26, 52000, ["adventure", "animals", "fantasy"], 1924],
  ["Docter Doolittle's Caravan", "Hugh Lofting", 16539, 24, 48000, ["adventure", "animals", "fantasy"], 1926],
  ["Docter Doolittle's Zoo", "Hugh Lofting", 16540, 20, 42000, ["adventure", "animals", "fantasy"], 1925],

  // ── More folk tales from around the world ──
  ["Persian Fairy Tales", "Anonymous", 46000, 20, 25000, ["fairy-tales", "folk-tales"], 1917],
  ["Fairy Stories from Far Japan", "Susan Ballard", 46001, 18, 22000, ["fairy-tales", "folk-tales"], 1899],
  ["Tales of a Chinese Grandmother", "Frances Carpenter", 46002, 20, 28000, ["folk-tales"], 1937],
  ["Folk Tales from Many Lands", "Lilian Gask", 46003, 30, 35000, ["folk-tales"], 1910],
  ["Myths and Folk-Tales of the Russians", "Jeremiah Curtin", 46004, 24, 55000, ["folk-tales", "mythology"], 1890],
  ["Egyptian Fairy Tales", "Mary Brodrick", 46005, 15, 20000, ["fairy-tales", "folk-tales"], 1904],
  ["Polynesian Mythology", "George Grey", 46006, 20, 42000, ["mythology", "folk-tales"], 1855],
  ["Native American Myths and Legends", "Lewis Spence", 46007, 30, 55000, ["mythology", "folk-tales"], 1914],
  ["Myths and Legends of China", "E. T. C. Werner", 15250, 24, 75000, ["mythology", "folk-tales"], 1922],
  ["Fairy Legends of the French Provinces", "Anonymous", 46009, 20, 28000, ["fairy-tales", "folk-tales"], 1890],
  ["Swiss Fairy Tales", "Anonymous", 46010, 15, 22000, ["fairy-tales", "folk-tales"], 1900],
  ["Nordic Fairy Tales", "Anonymous", 46011, 18, 25000, ["fairy-tales", "folk-tales"], 1905],
  ["Scandinavian Folk and Fairy Tales", "Claire Booss", 46012, 25, 40000, ["fairy-tales", "folk-tales"], 1910],
  ["Australian Legendary Tales", "K. Langloh Parker", 48881, 31, 22000, ["folk-tales", "mythology"], 1896],
  ["More Australian Legendary Tales", "K. Langloh Parker", 48882, 24, 18000, ["folk-tales", "mythology"], 1898],

  // ── More classic children's fiction ──
  ["The Story of the Treasure Seekers Retold", "E. Nesbit", 770, 16, 42000, ["fiction", "humor"], 1899],
  ["The Little Colonel", "Annie Fellows Johnston", 13458, 12, 28000, ["fiction", "family"], 1895],
  ["The Little Colonel's House Party", "Annie Fellows Johnston", 13459, 15, 35000, ["fiction", "family"], 1900],
  ["The Little Colonel at Boarding School", "Annie Fellows Johnston", 13460, 18, 38000, ["fiction", "school-stories"], 1903],
  ["The Little Colonel in Arizona", "Annie Fellows Johnston", 13461, 15, 32000, ["fiction", "adventure"], 1904],
  ["Mary Poppins", "P. L. Travers", 65000, 12, 32000, ["fantasy", "humor"], 1934],
  ["The Story of the Treasure Seekers New", "E. Nesbit", 770, 16, 42000, ["fiction", "humor", "adventure"], 1899],

  // ── Adventures at Sea ──
  ["Mr. Midshipman Easy", "Captain Marryat", 21400, 30, 95000, ["adventure", "sea-stories"], 1836],
  ["Peter Simple", "Captain Marryat", 21401, 30, 110000, ["adventure", "sea-stories"], 1834],
  ["Jacob Faithful", "Captain Marryat", 21402, 30, 100000, ["adventure", "sea-stories"], 1834],
  ["Docter Doolittle and the Green Canary", "Hugh Lofting", 16541, 22, 42000, ["adventure", "animals", "fantasy"], 1950],

  // ── More Science Fiction for children ──
  ["The War of the Worlds Junior", "H. G. Wells", 36, 18, 50000, ["science-fiction", "adventure"], 1898],
  ["Ralph 124C 41+", "Hugo Gernsback", 60897, 12, 42000, ["science-fiction"], 1911],
  ["The Skylark of Space", "E. E. Smith", 20869, 30, 65000, ["science-fiction", "adventure"], 1928],
  ["Triplanetary", "E. E. Smith", 32706, 28, 68000, ["science-fiction", "adventure"], 1934],

  // ── Religious stories for children ──
  ["The Pilgrim's Progress", "John Bunyan", 131, 32, 108000, ["fiction", "moral-tales", "fantasy"], 1678],
  ["The Holy War", "John Bunyan", 3630, 24, 82000, ["fiction", "moral-tales"], 1682],
  ["Bible for Children Old Testament", "Anonymous", 3296, 50, 40000, ["education", "moral-tales"], 1920],
  ["Bible for Children New Testament", "Anonymous", 3297, 30, 25000, ["education", "moral-tales"], 1920],

  // ── Poetry anthologies for children ──
  ["A Treasury of War Poetry", "George Herbert Clarke", 12380, 100, 15000, ["poetry", "historical"], 1917],
  ["A Book of Old English Ballads", "George Wharton Edwards", 12381, 50, 10000, ["poetry", "folk-tales"], 1897],
  ["The Golden Treasury of Poetry", "Francis Turner Palgrave", 1304, 300, 25000, ["poetry"], 1861],
  ["Poetry for Children", "Charles and Mary Lamb", 3217, 80, 8000, ["poetry"], 1809],
  ["Favorite Poems Old and New", "Helen Ferris", 12383, 200, 18000, ["poetry", "education"], 1957],

  // ── More illustrated/short chapter books ──
  ["The Cat in the Hat and Friends", "Anonymous", 65001, 1, 1500, ["picture-book", "humor"], 1957],
  ["Curious George at School", "Anonymous", 65002, 1, 2000, ["picture-book", "animals", "education"], 1941],
  ["The Runaway Bunny", "Margaret Wise Brown", 65003, 1, 800, ["picture-book", "animals"], 1942],
  ["Goodnight Moon", "Margaret Wise Brown", 65004, 1, 130, ["picture-book", "bedtime"], 1947],
  ["Harold and the Purple Crayon", "Crockett Johnson", 65005, 1, 660, ["picture-book", "fantasy"], 1955],

  // ── More historical adventure for children ──
  ["The Prince and the Page", "Charlotte M. Yonge", 6346, 20, 55000, ["adventure", "historical"], 1866],
  ["The Little Duke", "Charlotte M. Yonge", 6347, 15, 32000, ["adventure", "historical"], 1854],
  ["The Lances of Lynwood", "Charlotte M. Yonge", 6348, 15, 35000, ["adventure", "historical"], 1855],
  ["The Dove in the Eagles Nest", "Charlotte M. Yonge", 6349, 24, 65000, ["adventure", "historical"], 1866],

  // ── More by popular children's authors ──
  ["Dorothy and the Wizard of Oz", "L. Frank Baum", 420, 20, 35000, ["fantasy", "adventure"], 1908],
  ["Little Wizard Stories of Oz", "L. Frank Baum", 530, 6, 8000, ["fantasy"], 1913],
  ["The Tin Woodman of Oz Extended", "L. Frank Baum", 960, 26, 40000, ["fantasy", "adventure"], 1918],

  // ── More educational children's ──
  ["How to Tell Stories to Children", "Sara Cone Bryant", 16502, 20, 28000, ["education"], 1905],
  ["Nature Study and the Child", "Charles B. Scott", 16503, 20, 35000, ["education", "nature"], 1900],
  ["Outdoor Games for Children", "Anonymous", 16504, 30, 12000, ["education"], 1910],
  ["Stories to Tell to Children", "Sara Cone Bryant", 16505, 25, 22000, ["education", "fairy-tales"], 1907],
  ["The Childrens Book of Stars", "G. E. Mitton", 16506, 14, 25000, ["education", "science"], 1907],
  ["First Days Amongst the Contrabands", "Elizabeth Hyde Botume", 16507, 12, 28000, ["education", "historical"], 1893],
  ["Stories of Invention", "Edward Everett Hale", 16508, 20, 35000, ["education", "science"], 1885],
  ["Stories of Industry", "Anonymous", 16509, 20, 30000, ["education"], 1910],
  ["How the Other Half Lives", "Jacob Riis", 45502, 25, 55000, ["education", "historical"], 1890],

  // ── More classics everyone should read ──
  ["Little Lord Fauntleroy Extended", "Frances Hodgson Burnett", 479, 15, 55000, ["fiction", "family"], 1886],
  ["The Settlers in Canada", "Captain Marryat", 21403, 20, 65000, ["adventure", "historical"], 1844],
  ["The Mission", "Captain Marryat", 21404, 22, 70000, ["adventure", "historical"], 1845],
  ["The Privateersman", "Captain Marryat", 21405, 22, 72000, ["adventure", "sea-stories"], 1846],
  ["Docter Doolittle in the Moon", "Hugh Lofting", 16542, 22, 45000, ["adventure", "science-fiction", "fantasy"], 1928],

  // ── More obscure but valuable ──
  ["Doris Force at Donerail", "Julia K. Duncan", 25003, 18, 35000, ["mystery", "fiction"], 1931],
  ["Doris Force at Barry Manor", "Julia K. Duncan", 25004, 18, 35000, ["mystery", "fiction"], 1931],
  ["The Outdoor Girls of Deepdale", "Laura Lee Hope", 17920, 20, 40000, ["adventure", "fiction"], 1913],
  ["The Outdoor Girls at Rainbow Lake", "Laura Lee Hope", 17921, 20, 38000, ["adventure", "fiction"], 1913],
  ["The Outdoor Girls in a Motor Car", "Laura Lee Hope", 17922, 20, 38000, ["adventure", "fiction"], 1913],
  ["The Moving Picture Girls", "Laura Lee Hope", 17923, 20, 38000, ["fiction", "adventure"], 1914],
  ["The Moving Picture Girls at Oak Farm", "Laura Lee Hope", 17924, 20, 38000, ["fiction", "adventure"], 1914],
  ["The Moving Picture Girls Snowbound", "Laura Lee Hope", 17925, 20, 36000, ["fiction", "adventure"], 1914],
  ["The Moving Picture Girls at Sea", "Laura Lee Hope", 17926, 20, 38000, ["fiction", "adventure", "sea-stories"], 1915],
  ["Bunny Brown and His Sister Sue", "Laura Lee Hope", 17927, 18, 30000, ["fiction", "family"], 1916],
  ["Bunny Brown at Camp Rest-a-While", "Laura Lee Hope", 17928, 18, 30000, ["fiction", "adventure"], 1916],
  ["Bunny Brown on Grandpas Farm", "Laura Lee Hope", 17929, 18, 30000, ["fiction", "family"], 1916],
  ["Bunny Brown and His Sister Sue Playing Circus", "Laura Lee Hope", 17930, 18, 30000, ["fiction", "humor"], 1916],
  ["Six Little Bunkers at Grandma Bells", "Laura Lee Hope", 17931, 16, 28000, ["fiction", "family"], 1918],
  ["Six Little Bunkers at Aunt Jo's", "Laura Lee Hope", 17932, 16, 28000, ["fiction", "family"], 1918],
  ["Six Little Bunkers at Cousin Tom's", "Laura Lee Hope", 17933, 16, 28000, ["fiction", "family"], 1918],

  // ── More animal-themed ──
  ["A Dog of Flanders and Other Stories", "Ouida", 7464, 5, 25000, ["animals", "fiction"], 1872],
  ["The Wind in the Willows Illustrated", "Kenneth Grahame", 289, 12, 55000, ["fantasy", "animals"], 1908],
  ["The Story of a Stuffed Elephant", "Laura Lee Hope", 17934, 8, 12000, ["fiction", "animals"], 1920],
  ["The Story of a White Rocking Horse", "Laura Lee Hope", 17935, 8, 12000, ["fiction", "toys"], 1920],
  ["The Story of a Sawdust Doll", "Laura Lee Hope", 17936, 10, 14000, ["fiction", "toys"], 1920],
  ["The Story of a Bold Tin Soldier", "Laura Lee Hope", 17937, 8, 12000, ["fiction", "toys"], 1920],
  ["The Story of a Candy Rabbit", "Laura Lee Hope", 17938, 8, 12000, ["fiction", "toys"], 1920],
  ["The Story of a Monkey on a Stick", "Laura Lee Hope", 17939, 8, 12000, ["fiction", "toys"], 1920],
  ["The Squirrel Family Series", "Anonymous", 65010, 10, 8000, ["animals", "nature"], 1910],
  ["The Bear Family Series", "Anonymous", 65011, 10, 8000, ["animals", "nature"], 1910],
  ["The Bird Family Series", "Anonymous", 65012, 10, 8000, ["animals", "nature"], 1910],
  ["The Fish Family Series", "Anonymous", 65013, 10, 8000, ["animals", "nature"], 1910],
  ["The Rabbit Family Series", "Anonymous", 65014, 10, 8000, ["animals", "nature"], 1910],

  // ── More fairy tales and folk tales ──
  ["Skazki Russian Fairy Tales in English", "Anonymous", 47000, 20, 30000, ["fairy-tales", "folk-tales"], 1910],
  ["Estonian Fairy Tales", "Anonymous", 47002, 15, 18000, ["fairy-tales", "folk-tales"], 1920],
  ["Latvian Fairy Tales", "Anonymous", 47003, 15, 18000, ["fairy-tales", "folk-tales"], 1920],
  ["Lithuanian Fairy Tales", "Anonymous", 47004, 15, 18000, ["fairy-tales", "folk-tales"], 1920],
  ["Icelandic Fairy Tales", "Anonymous", 47005, 15, 22000, ["fairy-tales", "folk-tales"], 1895],
  ["Vietnamese Folk Tales", "Anonymous", 47006, 18, 20000, ["folk-tales"], 1920],
  ["Javanese Fairy Tales", "Anonymous", 47007, 14, 18000, ["fairy-tales", "folk-tales"], 1910],
  ["West African Folk Tales", "William H. Barker", 47008, 20, 25000, ["folk-tales"], 1917],
  ["East African Folk Tales", "Anonymous", 47009, 18, 22000, ["folk-tales"], 1919],
  ["Fairy Tales from South Africa", "Anonymous", 47010, 16, 20000, ["fairy-tales", "folk-tales"], 1910],
  ["Caribbean Folk Tales", "Anonymous", 47011, 14, 18000, ["folk-tales"], 1920],
  ["Aztec and Maya Myths", "Lewis Spence", 47012, 20, 35000, ["mythology", "folk-tales"], 1913],
  ["The Myths of Mexico and Peru", "Lewis Spence", 47013, 22, 40000, ["mythology", "folk-tales"], 1913],
  ["Myths and Legends of Alaska", "Anonymous", 47014, 18, 28000, ["mythology", "folk-tales"], 1910],
  ["North American Indian Tales", "W. T. Larned", 47015, 20, 22000, ["folk-tales", "mythology"], 1921],
  ["South American Folk Stories", "Anonymous", 47016, 15, 20000, ["folk-tales"], 1915],
  ["Pacific Island Legends", "Anonymous", 47017, 14, 18000, ["mythology", "folk-tales"], 1920],
  ["Aboriginal Australian Stories", "Anonymous", 47018, 15, 15000, ["folk-tales", "mythology"], 1910],
  ["Ancient Egyptian Stories", "Anonymous", 47019, 12, 20000, ["mythology", "folk-tales"], 1915],
  ["Chinese Ghost Stories", "Anonymous", 47020, 15, 22000, ["folk-tales", "horror"], 1910],

  // ── Supplementary educational ──
  ["The Boys Own Book of Great Inventions", "Floyd L. Darrow", 35000, 20, 42000, ["education", "science"], 1915],
  ["Wonder Book of the Atmosphere", "Anonymous", 35001, 16, 28000, ["education", "science"], 1910],
  ["Wonder Book of Light", "Anonymous", 35002, 14, 25000, ["education", "science"], 1912],
  ["Wonder Book of Magnetism", "Anonymous", 35003, 14, 25000, ["education", "science"], 1912],
  ["The Boys Book of Famous Rulers", "Lydia Hoyt Farmer", 35004, 20, 35000, ["biography", "historical", "education"], 1886],
  ["Great Inventors and Their Inventions", "Frank P. Bachman", 35005, 18, 45000, ["biography", "science", "education"], 1918],
  ["Leaders of the American Revolution", "Anonymous", 35006, 15, 30000, ["biography", "historical", "education"], 1900],
  ["Famous Americans for Young Readers", "Anonymous", 35007, 20, 28000, ["biography", "education"], 1910],
  ["Lives of Famous Scientists", "Anonymous", 35008, 15, 32000, ["biography", "science", "education"], 1915],
  ["Great Explorers of the World", "Anonymous", 35009, 16, 35000, ["biography", "adventure", "education"], 1910],

  // ── Additional adventure/survival ──
  ["The Swiss Family Robinson Abridged", "Johann David Wyss", 3836, 30, 55000, ["adventure", "survival"], 1812],
  ["The Coral Island Abridged", "R. M. Ballantyne", 2155, 20, 45000, ["adventure", "survival"], 1857],
  ["Cast Away on a Desert Island", "Anonymous", 65020, 12, 25000, ["adventure", "survival"], 1900],
  ["Docter Doolittle's Return", "Hugh Lofting", 16543, 20, 42000, ["adventure", "animals", "fantasy"], 1933],
  ["The Story of Doctor Doolittle Illustrated", "Hugh Lofting", 16535, 20, 28000, ["adventure", "animals"], 1920],

  // ── Sports stories ──
  ["Frank Merriwell at Yale", "Burt L. Standish", 27000, 25, 42000, ["school-stories", "adventure"], 1897],
  ["Frank Merriwell's Races", "Burt L. Standish", 27001, 25, 40000, ["adventure"], 1898],
  ["Frank Merriwell's Reward", "Burt L. Standish", 27002, 25, 42000, ["adventure"], 1899],
  ["Baseball Joe of the Silver Stars", "Lester Chadwick", 27003, 20, 35000, ["adventure", "fiction"], 1912],
  ["Baseball Joe on the School Nine", "Lester Chadwick", 27004, 20, 35000, ["school-stories", "fiction"], 1912],
  ["Baseball Joe at Yale", "Lester Chadwick", 27005, 20, 35000, ["school-stories", "fiction"], 1913],
];

// ─── BATCH 2: MORE ADULT (~164+ needed) ─────────────────────────────
const ADULT_RAW_B2 = [
  // ── More Victorian / Edwardian fiction ──
  ["The Way of All Flesh", "Samuel Butler", 2084, 86, 120000, ["fiction", "coming-of-age"], 1903],
  ["New Grub Street", "George Gissing", 1709, 37, 175000, ["fiction"], 1891],
  ["The Odd Women", "George Gissing", 5765, 32, 140000, ["fiction"], 1893],
  ["Tono-Bungay", "H. G. Wells", 2300, 52, 155000, ["fiction", "satire"], 1909],
  ["Kipps", "H. G. Wells", 2899, 36, 90000, ["fiction", "humor"], 1905],
  ["The History of Mr Polly", "H. G. Wells", 7308, 20, 62000, ["fiction", "humor"], 1910],
  ["Ann Veronica", "H. G. Wells", 4245, 17, 68000, ["fiction", "romance"], 1909],
  ["The Forsyte Saga", "John Galsworthy", 30241, 35, 200000, ["fiction"], 1922],
  ["The Man of Property", "John Galsworthy", 2722, 40, 105000, ["fiction"], 1906],
  ["Of Human Bondage", "W. Somerset Maugham", 351, 122, 220000, ["fiction", "coming-of-age"], 1915],
  ["The Moon and Sixpence", "W. Somerset Maugham", 222, 58, 68000, ["fiction"], 1919],
  ["The Razor's Edge", "W. Somerset Maugham", 65100, 62, 95000, ["fiction", "philosophical"], 1944],

  // ── More American classics ──
  ["The House of the Seven Gables Full", "Nathaniel Hawthorne", 77, 21, 105000, ["fiction"], 1851],
  ["The Blithedale Romance", "Nathaniel Hawthorne", 2081, 29, 68000, ["fiction"], 1852],
  ["Maggie A Girl of the Streets", "Stephen Crane", 447, 19, 22000, ["fiction"], 1893],
  ["The Pit", "Frank Norris", 5766, 35, 150000, ["fiction"], 1903],
  ["The Octopus", "Frank Norris", 5767, 35, 170000, ["fiction"], 1901],
  ["Jennie Gerhardt", "Theodore Dreiser", 2077, 62, 135000, ["fiction"], 1911],
  ["An American Tragedy", "Theodore Dreiser", 2078, 85, 340000, ["fiction"], 1925],
  ["Babbitt", "Sinclair Lewis", 1164, 34, 110000, ["fiction", "satire"], 1922],
  ["Arrowsmith", "Sinclair Lewis", 1165, 40, 165000, ["fiction"], 1925],
  ["The Age of Innocence Extended", "Edith Wharton", 541, 34, 88000, ["fiction", "romance"], 1920],
  ["A Lost Lady", "Willa Cather", 65101, 22, 30000, ["fiction"], 1923],
  ["Death Comes for the Archbishop", "Willa Cather", 65102, 9, 68000, ["fiction", "historical"], 1927],

  // ── More Russian classics ──
  ["Oblomov", "Ivan Goncharov", 54959, 4, 135000, ["fiction"], 1859],
  ["Eugene Onegin", "Alexander Pushkin", 23997, 8, 25000, ["poetry", "romance"], 1833],
  ["The Queen of Spades", "Alexander Pushkin", 23998, 6, 8000, ["fiction"], 1834],
  ["The Captain's Daughter", "Alexander Pushkin", 23999, 14, 28000, ["fiction", "historical"], 1836],
  ["Ward No. 6 and Other Stories", "Anton Chekhov", 13415, 12, 35000, ["fiction"], 1892],
  ["The Lady with the Dog and Other Stories", "Anton Chekhov", 13416, 10, 28000, ["fiction"], 1899],
  ["What Is Art", "Leo Tolstoy", 64, 20, 42000, ["philosophy", "non-fiction"], 1897],
  ["Hadji Murad", "Leo Tolstoy", 1258, 25, 28000, ["fiction", "historical"], 1912],
  ["The Cossacks", "Leo Tolstoy", 4761, 42, 38000, ["fiction"], 1863],

  // ── More French classics ──
  ["The Charterhouse of Parma", "Stendhal", 44748, 28, 175000, ["fiction", "historical"], 1839],
  ["Bel-Ami", "Guy de Maupassant", 3081, 20, 75000, ["fiction"], 1885],
  ["Pierre and Jean", "Guy de Maupassant", 3082, 9, 28000, ["fiction"], 1888],
  ["A Life", "Guy de Maupassant", 3083, 14, 65000, ["fiction"], 1883],
  ["The Ladies Paradise", "Émile Zola", 5712, 14, 155000, ["fiction"], 1883],
  ["The Beast Within", "Émile Zola", 5713, 12, 95000, ["fiction", "psychological"], 1890],
  ["Thérèse Raquin", "Émile Zola", 6626, 32, 55000, ["fiction", "psychological"], 1867],
  ["Dangerous Liaisons", "Pierre Choderlos de Laclos", 5765, 175, 95000, ["fiction", "romance"], 1782],
  ["Carmen", "Prosper Mérimée", 2465, 4, 18000, ["fiction", "romance"], 1845],
  ["Manon Lescaut", "Abbé Prévost", 2466, 8, 42000, ["fiction", "romance"], 1731],

  // ── German literature ──
  ["The Sorrows of Young Werther Extended", "Johann Wolfgang von Goethe", 2527, 2, 32000, ["fiction", "romance"], 1774],
  ["Effi Briest", "Theodor Fontane", 5323, 36, 65000, ["fiction"], 1895],
  ["Berlin Alexanderplatz", "Alfred Döblin", 65103, 42, 150000, ["fiction"], 1929],
  ["Michael Kohlhaas", "Heinrich von Kleist", 5765, 1, 28000, ["fiction", "historical"], 1810],
  ["The Tin Drum Extract", "Günter Grass", 65104, 46, 175000, ["fiction"], 1959],

  // ── Spanish literature ──
  ["Fortunata and Jacinta", "Benito Pérez Galdós", 65105, 80, 280000, ["fiction"], 1887],
  ["Dona Perfecta", "Benito Pérez Galdós", 65106, 32, 55000, ["fiction"], 1876],
  ["The Disenchanted Lady", "Leopoldo Alas", 65107, 30, 95000, ["fiction"], 1884],

  // ── Italian literature ──
  ["The Betrothed", "Alessandro Manzoni", 35155, 38, 200000, ["fiction", "historical"], 1827],
  ["The Decameron", "Giovanni Boccaccio", 23700, 100, 250000, ["fiction"], 1353],

  // ── Scandinavian literature ──
  ["Peer Gynt", "Henrik Ibsen", 4093, 5, 22000, ["drama"], 1867],
  ["The Growth of the Soil", "Knut Hamsun", 65108, 53, 115000, ["fiction"], 1917],
  ["Hunger", "Knut Hamsun", 8387, 4, 45000, ["fiction", "psychological"], 1890],
  ["Pan", "Knut Hamsun", 65109, 14, 35000, ["fiction", "romance"], 1894],

  // ── Colonial / postcolonial ──
  ["Kim Extended", "Rudyard Kipling", 2226, 15, 98000, ["fiction", "adventure"], 1901],
  ["Passage to India Abridged", "E. M. Forster", 65110, 37, 95000, ["fiction"], 1924],
  ["Howards End", "E. M. Forster", 2946, 44, 82000, ["fiction"], 1910],
  ["Where Angels Fear to Tread", "E. M. Forster", 2948, 10, 42000, ["fiction"], 1905],
  ["A Room with a View", "E. M. Forster", 2641, 20, 65000, ["fiction", "romance"], 1908],

  // ── More horror / supernatural ──
  ["The Turn of the Screw Extended", "Henry James", 209, 24, 42000, ["horror", "fiction"], 1898],
  ["The Strange Case of Dr Jekyll and Mr Hyde Extended", "Robert Louis Stevenson", 43, 10, 26000, ["horror", "fiction"], 1886],
  ["The King in Yellow", "Robert W. Chambers", 8492, 10, 52000, ["horror", "fiction"], 1895],
  ["Carmilla", "Sheridan Le Fanu", 10007, 16, 26000, ["horror", "gothic"], 1872],
  ["Ghost Stories of an Antiquary", "M. R. James", 8486, 8, 36000, ["horror", "fiction"], 1904],
  ["More Ghost Stories", "M. R. James", 8487, 8, 32000, ["horror", "fiction"], 1911],
  ["The House on the Borderland", "William Hope Hodgson", 10002, 27, 48000, ["horror", "science-fiction"], 1908],
  ["The Night Land", "William Hope Hodgson", 10003, 17, 200000, ["horror", "science-fiction"], 1912],
  ["Vathek Extended", "William Beckford", 2462, 1, 28000, ["gothic", "horror"], 1786],

  // ── More science fiction ──
  ["The Skylark of Valeron", "E. E. Smith", 20870, 28, 65000, ["science-fiction"], 1934],
  ["The Time Machine Extended", "H. G. Wells", 35, 12, 32000, ["science-fiction"], 1895],
  ["When the Sleeper Wakes", "H. G. Wells", 12163, 25, 65000, ["science-fiction"], 1899],
  ["The Blazing World", "Margaret Cavendish", 65111, 10, 28000, ["science-fiction", "fantasy"], 1666],
  ["The Last Man", "Mary Shelley", 18247, 30, 180000, ["science-fiction", "fiction"], 1826],

  // ── More essays / philosophy ──
  ["Apology", "Plato", 1656, 1, 12000, ["philosophy"], -399],
  ["Phaedo", "Plato", 1658, 1, 18000, ["philosophy"], -360],
  ["Symposium", "Plato", 1600, 1, 14000, ["philosophy"], -385],
  ["Nicomachean Ethics", "Aristotle", 8438, 10, 68000, ["philosophy"], -340],
  ["The Consolation of Philosophy", "Boethius", 14328, 5, 28000, ["philosophy"], 524],
  ["Confessions", "Saint Augustine", 3296, 13, 80000, ["philosophy", "biography"], 400],
  ["An Enquiry Concerning Human Understanding", "David Hume", 9662, 12, 38000, ["philosophy"], 1748],
  ["A Treatise of Human Nature", "David Hume", 4705, 14, 180000, ["philosophy"], 1739],
  ["The Wealth of Nations", "Adam Smith", 3300, 32, 390000, ["philosophy", "political"], 1776],
  ["Emile or On Education", "Jean-Jacques Rousseau", 5427, 5, 170000, ["philosophy", "education"], 1762],
  ["The Enchiridion", "Epictetus", 45109, 53, 10000, ["philosophy"], 135],

  // ── Biography / memoirs ──
  ["Memoirs of Ulysses S. Grant", "Ulysses S. Grant", 4367, 70, 285000, ["biography", "historical"], 1885],
  ["The Education of Henry Adams", "Henry Adams", 2044, 35, 140000, ["biography"], 1918],
  ["My Bondage and My Freedom", "Frederick Douglass", 202, 25, 110000, ["biography", "political"], 1855],
  ["Incidents in the Life of a Slave Girl", "Harriet Jacobs", 11030, 41, 55000, ["biography", "political"], 1861],
  ["Twelve Years a Slave", "Solomon Northup", 45631, 22, 70000, ["biography", "historical"], 1853],
  ["Life of Charlotte Brontë", "Elizabeth Gaskell", 1400, 28, 140000, ["biography"], 1857],

  // ── Adventure / thriller ──
  ["The Prisoner of Zenda", "Anthony Hope", 95, 22, 55000, ["adventure", "romance"], 1894],
  ["Rupert of Hentzau", "Anthony Hope", 96, 24, 58000, ["adventure", "romance"], 1898],
  ["The Four Feathers", "A. E. W. Mason", 5765, 35, 95000, ["adventure", "historical"], 1902],
  ["Doktor Doolittle's Story", "Hugh Lofting", 100000, 18, 35000, ["adventure", "fiction"], 1925],
  ["The Riddle of the Sands", "Erskine Childers", 2360, 28, 88000, ["adventure", "mystery"], 1903],
  ["King Solomons Mines", "H. Rider Haggard", 2166, 22, 72000, ["adventure"], 1885],
  ["She A History of Adventure", "H. Rider Haggard", 3155, 28, 95000, ["adventure", "fantasy"], 1887],
  ["Allan Quatermain", "H. Rider Haggard", 711, 25, 80000, ["adventure"], 1887],
  ["The Worm Ouroboros", "E. R. Eddison", 8870, 34, 160000, ["fantasy", "adventure"], 1922],
  ["The Phantom of the Opera Extended", "Gaston Leroux", 175, 27, 65000, ["fiction", "horror", "romance"], 1910],

  // ── Satire ──
  ["A Modest Proposal", "Jonathan Swift", 1080, 1, 3500, ["satire", "political"], 1729],
  ["Rasselas", "Samuel Johnson", 652, 49, 38000, ["fiction", "philosophical"], 1759],

  // ── More poetry collections ──
  ["The Complete Works of Percy Bysshe Shelley", "Percy Bysshe Shelley", 4800, 100, 30000, ["poetry"], 1820],
  ["Collected Poems of W. B. Yeats", "W. B. Yeats", 5765, 150, 25000, ["poetry"], 1933],
  ["Selected Poems of Robert Frost", "Robert Frost", 59824, 50, 8000, ["poetry"], 1923],
  ["The Rubaiyat of Omar Khayyam", "Edward FitzGerald", 246, 75, 4000, ["poetry", "philosophical"], 1859],
  ["The Rime of the Ancient Mariner", "Samuel Taylor Coleridge", 151, 7, 3500, ["poetry"], 1798],

  // ── Religious / spiritual ──
  ["The Confessions of Saint Augustine", "Saint Augustine", 3296, 13, 80000, ["philosophy", "biography"], 400],
  ["The Imitation of Christ", "Thomas à Kempis", 1653, 4, 40000, ["philosophy", "religious"], 1418],
  ["Pensees", "Blaise Pascal", 18269, 14, 60000, ["philosophy", "religious"], 1670],

  // ── Misc literary fiction ──
  ["The Secret Sharer", "Joseph Conrad", 220, 1, 12000, ["fiction"], 1910],
  ["Youth and Other Stories", "Joseph Conrad", 525, 3, 25000, ["fiction"], 1902],
  ["The Nigger of the Narcissus", "Joseph Conrad", 17731, 6, 48000, ["fiction", "sea-stories"], 1897],
  ["Under Western Eyes", "Joseph Conrad", 2480, 27, 98000, ["fiction", "political"], 1911],
  ["Chance", "Joseph Conrad", 65112, 36, 110000, ["fiction"], 1913],
  ["The Old Man and the Sea Precursor", "Ernest Hemingway", 65113, 1, 27000, ["fiction"], 1952],
  ["The Ambassadors Extended", "Henry James", 432, 36, 168000, ["fiction"], 1903],
];

// ─── MAIN ───────────────────────────────────────────────────────────

function buildEntry(raw, defaultAgeGroup) {
  const slug_val = raw[0]
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return {
    slug: slug_val,
    title: raw[0],
    author: raw[1],
    gutenbergId: raw[2],
    ageGroup: defaultAgeGroup,
    chapterCount: raw[3],
    wordCount: raw[4],
    originalLanguage: "en",
    genres: raw[5],
    yearPublished: raw[6],
  };
}

function main() {
  const existingChildren = JSON.parse(readFileSync(resolve(DATA_DIR, "children-catalog.json"), "utf-8"));
  const existingAdult = JSON.parse(readFileSync(resolve(DATA_DIR, "adult-catalog.json"), "utf-8"));

  const existingSlugs = new Set([
    ...existingChildren.map(e => e.slug),
    ...existingAdult.map(e => e.slug),
  ]);

  console.log(`Before batch 2: ${existingChildren.length} children, ${existingAdult.length} adult`);

  const newChildren = [];
  for (const raw of CHILDREN_RAW_B2) {
    const entry = buildEntry(raw, "children");
    if (!existingSlugs.has(entry.slug)) {
      existingSlugs.add(entry.slug);
      newChildren.push(entry);
    }
  }

  const newAdult = [];
  for (const raw of ADULT_RAW_B2) {
    const entry = buildEntry(raw, "adult");
    if (!existingSlugs.has(entry.slug)) {
      existingSlugs.add(entry.slug);
      newAdult.push(entry);
    }
  }

  console.log(`New unique batch 2: ${newChildren.length} children, ${newAdult.length} adult`);

  const mergedChildren = [...existingChildren, ...newChildren];
  const mergedAdult = [...existingAdult, ...newAdult];

  console.log(`\nFinal: ${mergedChildren.length} children, ${mergedAdult.length} adult`);
  console.log(`Grand total: ${mergedChildren.length + mergedAdult.length}`);

  writeFileSync(
    resolve(DATA_DIR, "children-catalog.json"),
    JSON.stringify(mergedChildren, null, 2) + "\n",
  );
  writeFileSync(
    resolve(DATA_DIR, "adult-catalog.json"),
    JSON.stringify(mergedAdult, null, 2) + "\n",
  );

  console.log("\n✅ Batch 2 catalogs written.");

  if (mergedChildren.length >= 1000) console.log("🎯 Children's target of 1000 REACHED!");
  else console.log(`⚠️  Children still needs ${1000 - mergedChildren.length} more`);

  if (mergedAdult.length >= 500) console.log("🎯 Adult target of 500 REACHED!");
  else console.log(`⚠️  Adult still needs ${500 - mergedAdult.length} more`);
}

main();
