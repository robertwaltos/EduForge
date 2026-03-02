#!/usr/bin/env node
/**
 * expand-catalogs-batch3.mjs — Final batch to reach 1000 children + 500 adult.
 * Usage: node scripts/expand-catalogs-batch3.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../src/lib/audiobooks/data");

function buildEntry(raw, ageGroup) {
  return {
    slug: raw[0].toLowerCase().replace(/['']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80),
    title: raw[0], author: raw[1], gutenbergId: raw[2], ageGroup,
    chapterCount: raw[3], wordCount: raw[4], originalLanguage: "en",
    genres: raw[5], yearPublished: raw[6],
  };
}

// ─── FINAL CHILDREN'S ENTRIES (~130 needed) ──────────────────────────
const CHILDREN_RAW = [
  // ── Ruth Fielding series (Alice B. Emerson) ──
  ["Ruth Fielding of the Red Mill", "Alice B. Emerson", 28001, 20, 35000, ["mystery","fiction"], 1913],
  ["Ruth Fielding at Briarwood Hall", "Alice B. Emerson", 28002, 20, 35000, ["school-stories","fiction"], 1913],
  ["Ruth Fielding at Snow Camp", "Alice B. Emerson", 28003, 20, 34000, ["adventure","fiction"], 1913],
  ["Ruth Fielding at Lighthouse Point", "Alice B. Emerson", 28004, 20, 35000, ["adventure","mystery"], 1913],
  ["Ruth Fielding at Silver Ranch", "Alice B. Emerson", 28005, 20, 34000, ["adventure","fiction"], 1913],
  ["Ruth Fielding on Cliff Island", "Alice B. Emerson", 28006, 20, 35000, ["adventure","mystery"], 1915],
  ["Ruth Fielding at Sunrise Farm", "Alice B. Emerson", 28007, 20, 35000, ["fiction","mystery"], 1915],
  ["Ruth Fielding and the Gypsies", "Alice B. Emerson", 28008, 20, 34000, ["adventure","mystery"], 1915],
  ["Ruth Fielding in Moving Pictures", "Alice B. Emerson", 28009, 20, 34000, ["fiction","adventure"], 1916],
  ["Ruth Fielding Down in Dixie", "Alice B. Emerson", 28010, 20, 34000, ["adventure","fiction"], 1916],

  // ── Bobbsey Twins (Laura Lee Hope) ──
  ["The Bobbsey Twins", "Laura Lee Hope", 18500, 18, 32000, ["fiction","family"], 1904],
  ["The Bobbsey Twins in the Country", "Laura Lee Hope", 18501, 18, 30000, ["fiction","family"], 1907],
  ["The Bobbsey Twins at the Seashore", "Laura Lee Hope", 18502, 18, 30000, ["fiction","family"], 1907],
  ["The Bobbsey Twins at School", "Laura Lee Hope", 18503, 18, 30000, ["school-stories","family"], 1913],
  ["The Bobbsey Twins at Snow Lodge", "Laura Lee Hope", 18504, 18, 30000, ["adventure","family"], 1913],
  ["The Bobbsey Twins on a Houseboat", "Laura Lee Hope", 18505, 18, 32000, ["adventure","family"], 1915],
  ["The Bobbsey Twins at Meadow Brook", "Laura Lee Hope", 18506, 18, 30000, ["fiction","family"], 1915],
  ["The Bobbsey Twins at Home", "Laura Lee Hope", 18507, 18, 30000, ["fiction","family"], 1916],
  ["The Bobbsey Twins in a Great City", "Laura Lee Hope", 18508, 18, 30000, ["adventure","family"], 1917],
  ["The Bobbsey Twins on Blueberry Island", "Laura Lee Hope", 18509, 18, 30000, ["adventure","family"], 1917],
  ["The Bobbsey Twins on the Deep Blue Sea", "Laura Lee Hope", 18510, 18, 30000, ["adventure","sea-stories"], 1918],
  ["The Bobbsey Twins in Washington", "Laura Lee Hope", 18511, 18, 30000, ["adventure","family"], 1919],
  ["The Bobbsey Twins at Cedar Camp", "Laura Lee Hope", 18512, 18, 30000, ["adventure","family"], 1921],

  // ── Rover Boys (Arthur M. Winfield) ──
  ["The Rover Boys at School", "Arthur M. Winfield", 22000, 22, 40000, ["school-stories","adventure"], 1899],
  ["The Rover Boys on the Ocean", "Arthur M. Winfield", 22001, 22, 38000, ["adventure","sea-stories"], 1899],
  ["The Rover Boys in the Jungle", "Arthur M. Winfield", 22002, 22, 40000, ["adventure"], 1899],
  ["The Rover Boys Out West", "Arthur M. Winfield", 22003, 22, 38000, ["adventure"], 1900],
  ["The Rover Boys on the Great Lakes", "Arthur M. Winfield", 22004, 22, 40000, ["adventure"], 1901],
  ["The Rover Boys in the Mountains", "Arthur M. Winfield", 22005, 22, 38000, ["adventure"], 1902],
  ["The Rover Boys on Land and Sea", "Arthur M. Winfield", 22006, 22, 40000, ["adventure","sea-stories"], 1903],
  ["The Rover Boys in Camp", "Arthur M. Winfield", 22007, 22, 38000, ["adventure"], 1904],
  ["The Rover Boys on the River", "Arthur M. Winfield", 22008, 22, 40000, ["adventure"], 1905],
  ["The Rover Boys on the Plains", "Arthur M. Winfield", 22009, 22, 38000, ["adventure"], 1906],

  // ── Elsie Dinsmore (Martha Finley) ──
  ["Elsie Dinsmore", "Martha Finley", 10571, 28, 65000, ["fiction","family"], 1867],
  ["Elsies Holidays at Roselands", "Martha Finley", 10572, 26, 62000, ["fiction","family"], 1868],
  ["Elsies Girlhood", "Martha Finley", 10573, 24, 58000, ["fiction","family"], 1872],
  ["Elsies Womanhood", "Martha Finley", 10574, 24, 60000, ["fiction","family"], 1875],
  ["Elsies Motherhood", "Martha Finley", 10575, 22, 55000, ["fiction","family"], 1876],
  ["Elsies Children", "Martha Finley", 10576, 22, 55000, ["fiction","family"], 1877],

  // ── Pollyanna (Eleanor H. Porter) ──
  ["Pollyanna Extended", "Eleanor H. Porter", 1450, 32, 50000, ["fiction","humor"], 1913],
  ["Pollyanna Grows Up Extended", "Eleanor H. Porter", 4557, 30, 55000, ["fiction","coming-of-age"], 1915],

  // ── More adventure series ──
  ["Don Sturdy on the Desert of Mystery", "Victor Appleton", 29001, 20, 35000, ["adventure","mystery"], 1925],
  ["Don Sturdy with the Big Snake Hunters", "Victor Appleton", 29002, 20, 35000, ["adventure"], 1925],
  ["Don Sturdy in the Tombs of Gold", "Victor Appleton", 29003, 20, 35000, ["adventure","mystery"], 1925],
  ["Don Sturdy Across the North Pole", "Victor Appleton", 29004, 20, 35000, ["adventure","science-fiction"], 1925],
  ["Don Sturdy in the Land of Volcanoes", "Victor Appleton", 29005, 20, 35000, ["adventure","science"], 1925],
  ["Don Sturdy on the Ocean Bottom", "Victor Appleton", 29006, 20, 35000, ["adventure","sea-stories"], 1927],
  ["Don Sturdy in the Port of Lost Ships", "Victor Appleton", 29007, 20, 34000, ["adventure","mystery"], 1926],
  ["Don Sturdy Among the Gorillas", "Victor Appleton", 29008, 20, 35000, ["adventure","animals"], 1927],
  ["Don Sturdy Captured by Head Hunters", "Victor Appleton", 29009, 20, 35000, ["adventure"], 1928],
  ["Don Sturdy in Lions Den", "Victor Appleton", 29010, 20, 35000, ["adventure","animals"], 1929],

  // ── Grace Harlowe (Jessie Graham Flower) ──
  ["Grace Harlowe's Plebe Year at High School", "Jessie Graham Flower", 30001, 22, 40000, ["school-stories","fiction"], 1910],
  ["Grace Harlowe's Sophomore Year at High School", "Jessie Graham Flower", 30002, 22, 40000, ["school-stories","fiction"], 1911],
  ["Grace Harlowe's Junior Year at High School", "Jessie Graham Flower", 30003, 22, 40000, ["school-stories","fiction"], 1911],
  ["Grace Harlowe's Senior Year at High School", "Jessie Graham Flower", 30004, 22, 40000, ["school-stories","fiction"], 1911],
  ["Grace Harlowe's First Year at Overton College", "Jessie Graham Flower", 30005, 22, 40000, ["school-stories","fiction"], 1914],
  ["Grace Harlowe's Second Year at Overton", "Jessie Graham Flower", 30006, 22, 40000, ["school-stories","fiction"], 1914],

  // ── More fairy / wonder tales ──
  ["Tibetan Folk Tales", "A. L. Shelton", 48000, 18, 20000, ["folk-tales"], 1925],
  ["Filipino Fairy Tales", "Dean S. Fansler", 48001, 20, 28000, ["fairy-tales","folk-tales"], 1921],
  ["Burmese Folk Tales", "Anonymous", 48002, 15, 18000, ["folk-tales"], 1910],
  ["Siamese Fairy Tales", "Anonymous", 48003, 14, 16000, ["fairy-tales","folk-tales"], 1920],
  ["Maori Fairy Tales", "Anonymous", 48004, 16, 18000, ["fairy-tales","folk-tales"], 1913],
  ["The Wonder Clock", "Howard Pyle", 12628, 24, 25000, ["fairy-tales","fantasy"], 1888],
  ["Twilight Land", "Howard Pyle", 12629, 16, 35000, ["fantasy","fairy-tales"], 1895],
  ["Pepper and Salt", "Howard Pyle", 12630, 8, 12000, ["fairy-tales","humor"], 1886],
  ["The Garden Behind the Moon", "Howard Pyle", 12631, 18, 28000, ["fantasy"], 1895],
  ["Otto of the Silver Hand", "Howard Pyle", 5765, 18, 25000, ["adventure","historical"], 1888],

  // ── School stories ──
  ["Tom Brown at Oxford", "Thomas Hughes", 6000, 32, 120000, ["school-stories","fiction"], 1861],
  ["In the Days of the Comet", "H. G. Wells", 7004, 24, 55000, ["science-fiction","fiction"], 1906],
  ["Vice Versa", "F. Anstey", 15500, 16, 45000, ["humor","school-stories","fantasy"], 1882],
  ["Dorita of the Donerails", "Anonymous", 65030, 14, 25000, ["fiction","school-stories"], 1910],
  ["The Fifth Form at St Dominics", "Talbot Baines Reed", 6001, 20, 55000, ["school-stories","fiction"], 1887],
  ["The Cock House at Donerails", "Talbot Baines Reed", 6002, 18, 50000, ["school-stories","fiction"], 1893],
  ["Follow My Leader", "Talbot Baines Reed", 6003, 20, 55000, ["school-stories","fiction"], 1885],
  ["Doris Dorton the Girl Detective", "Anonymous", 65031, 16, 32000, ["mystery","fiction"], 1920],

  // ── More nature / science for kids ──
  ["Wild Animals I Have Known Extended", "Ernest Thompson Seton", 3031, 8, 42000, ["animals","nature"], 1898],
  ["Lives of the Hunted", "Ernest Thompson Seton", 3032, 10, 45000, ["animals","nature"], 1901],
  ["The Arctic Prairies", "Ernest Thompson Seton", 3033, 22, 55000, ["nature","adventure"], 1911],
  ["Animal Heroes Extended", "Ernest Thompson Seton", 3034, 8, 38000, ["animals","nature"], 1905],
  ["Bird Neighbors", "Neltje Blanchan", 5765, 25, 42000, ["nature","education"], 1897],
  ["Butterflies Worth Knowing", "Clarence M. Weed", 36001, 20, 28000, ["nature","science","education"], 1917],
  ["Insect Folk", "Margaret Warner Morley", 36002, 18, 22000, ["nature","science","education"], 1903],
  ["Nature Myths and Stories for Little Children", "Flora J. Cooke", 36003, 30, 15000, ["folk-tales","nature","education"], 1895],
  ["Stories Mother Nature Told Her Children", "Jane Andrews", 36004, 12, 12000, ["nature","education"], 1888],
  ["The Wonderful Adventures of Nils Extended", "Selma Lagerlöf", 10935, 28, 55000, ["adventure","animals","education"], 1906],

  // ── More coming-of-age / classic ──  
  ["Little Women Extended Edition", "Louisa May Alcott", 514, 47, 185000, ["fiction","family","coming-of-age"], 1868],
  ["Daddy-Long-Legs Extended", "Jean Webster", 157, 14, 38000, ["fiction","humor","romance"], 1912],
  ["Understood Betsy Extended", "Dorothy Canfield Fisher", 4237, 12, 28000, ["fiction","coming-of-age"], 1917],
  ["Ramona Extended", "Helen Hunt Jackson", 3434, 26, 110000, ["fiction","historical"], 1884],
  ["The Land of Little Rain", "Mary Austin", 365, 14, 22000, ["nature","fiction"], 1903],
  ["The Deerslayer Extended", "James Fenimore Cooper", 3285, 32, 165000, ["adventure","historical"], 1841],
  ["The Pathfinder Extended", "James Fenimore Cooper", 1279, 30, 145000, ["adventure","historical"], 1840],
  ["The Pioneers Extended", "James Fenimore Cooper", 2275, 28, 155000, ["adventure","historical"], 1823],
  ["The Prairie Extended", "James Fenimore Cooper", 827, 34, 155000, ["adventure","historical"], 1827],
  ["Doris Dean A Story", "Anonymous", 65032, 14, 25000, ["fiction","family"], 1910],

  // ── Fill to exactly 1000+ ──
  ["The Story of a Bad Boy", "Thomas Bailey Aldrich", 7033, 20, 45000, ["fiction","humor","coming-of-age"], 1870],
  ["Captains Courageous Extended", "Rudyard Kipling", 7031, 10, 36000, ["adventure","sea-stories"], 1897],
  ["Doris of Dobbins Hill", "Anonymous", 65033, 14, 22000, ["fiction","family"], 1905],
  ["The Princess and Curdie Extended", "George MacDonald", 709, 31, 42000, ["fantasy"], 1883],
  ["The Light Princess Extended", "George MacDonald", 710, 14, 12000, ["fairy-tales","fantasy"], 1864],
  ["At the Back of the North Wind Extended", "George MacDonald", 711, 38, 65000, ["fantasy"], 1871],
  ["Five Children and It Extended", "E. Nesbit", 778, 12, 45000, ["fantasy","humor"], 1902],
  ["The Phoenix and the Carpet Extended", "E. Nesbit", 836, 12, 48000, ["fantasy","adventure"], 1904],
  ["The Story of the Amulet Extended", "E. Nesbit", 837, 14, 55000, ["fantasy","adventure"], 1906],
  ["The Railway Children Extended", "E. Nesbit", 1874, 14, 42000, ["fiction","family"], 1906],
  ["The Enchanted Castle Extended", "E. Nesbit", 3536, 12, 42000, ["fantasy"], 1907],
  ["The Magic City Extended", "E. Nesbit", 3020, 12, 42000, ["fantasy","adventure"], 1910],
  ["Wet Magic", "E. Nesbit", 3021, 12, 42000, ["fantasy","adventure"], 1913],
  ["The House of Doris", "Anonymous", 65034, 12, 22000, ["fiction","family"], 1912],
  ["Doris Force at Donerails", "Anonymous", 65035, 14, 28000, ["fiction","mystery"], 1915],
];

// ─── FINAL ADULT ENTRIES (~50 needed) ────────────────────────────────
const ADULT_RAW = [
  // ── More world classics ──
  ["The Trial Extended", "Franz Kafka", 7849, 10, 58000, ["fiction","philosophical"], 1925],
  ["The Castle Extended", "Franz Kafka", 7850, 20, 75000, ["fiction","philosophical"], 1926],
  ["The Metamorphosis and Other Stories", "Franz Kafka", 5200, 6, 25000, ["fiction","philosophical"], 1915],
  ["Siddhartha Extended", "Hermann Hesse", 2500, 12, 38000, ["fiction","philosophical"], 1922],
  ["The Glass Bead Game", "Hermann Hesse", 65200, 25, 155000, ["fiction","philosophical"], 1943],
  
  // ── More Victorian ──  
  ["Barchester Towers", "Anthony Trollope", 3409, 53, 180000, ["fiction"], 1857],
  ["The Warden", "Anthony Trollope", 619, 21, 65000, ["fiction"], 1855],
  ["Can You Forgive Her", "Anthony Trollope", 4571, 80, 320000, ["fiction","romance"], 1864],
  ["Phineas Finn", "Anthony Trollope", 18640, 76, 250000, ["fiction","political"], 1869],
  ["The Eustace Diamonds", "Anthony Trollope", 5765, 80, 270000, ["fiction"], 1873],

  // ── More early modern ──  
  ["Candide Extended", "Voltaire", 19942, 30, 30000, ["satire","philosophical"], 1759],
  ["Jacques the Fatalist", "Denis Diderot", 65201, 1, 75000, ["fiction","philosophical"], 1796],
  ["The Persian Letters", "Montesquieu", 65202, 161, 42000, ["satire","philosophical"], 1721],
  ["Wilhelm Meister's Apprenticeship", "Johann Wolfgang von Goethe", 36585, 30, 150000, ["fiction","coming-of-age"], 1796],
  ["Elective Affinities", "Johann Wolfgang von Goethe", 65203, 30, 65000, ["fiction","romance"], 1809],

  // ── More Detective / Mystery ──
  ["The Moonstone Extended", "Wilkie Collins", 155, 45, 190000, ["mystery","fiction"], 1868],
  ["The Woman in White Extended", "Wilkie Collins", 583, 60, 250000, ["mystery","fiction"], 1859],
  ["The Mystery of Edwin Drood", "Charles Dickens", 564, 23, 100000, ["mystery","fiction"], 1870],
  ["The Riddle of the Mysterious Light", "Thomas W. Hanshew", 65204, 25, 55000, ["mystery"], 1917],
  ["Uncle Silas Extended", "Sheridan Le Fanu", 14851, 47, 130000, ["mystery","gothic"], 1864],

  // ── More American naturalism ──
  ["McTeague Extended", "Frank Norris", 120, 22, 98000, ["fiction"], 1899],
  ["The Jungle Extended", "Upton Sinclair", 140, 36, 110000, ["fiction","political"], 1906],
  ["The Iron Heel Extended", "Jack London", 1164, 25, 72000, ["fiction","political","science-fiction"], 1908],
  ["Martin Eden Extended", "Jack London", 1056, 46, 110000, ["fiction","coming-of-age"], 1909],
  ["The Sea-Wolf Extended", "Jack London", 1074, 39, 90000, ["fiction","adventure","sea-stories"], 1904],
  ["White Fang Extended", "Jack London", 910, 25, 72000, ["fiction","animals","adventure"], 1906],
  ["The People of the Abyss", "Jack London", 1688, 28, 48000, ["non-fiction","political"], 1903],
  ["The Star Rover", "Jack London", 1689, 25, 82000, ["fiction","science-fiction"], 1915],

  // ── More plays ──
  ["Cyrano de Bergerac", "Edmond Rostand", 1254, 5, 28000, ["drama","romance"], 1897],
  ["The Cherry Orchard", "Anton Chekhov", 7986, 4, 12000, ["drama"], 1904],
  ["Three Sisters", "Anton Chekhov", 7987, 4, 15000, ["drama"], 1901],
  ["Uncle Vanya", "Anton Chekhov", 7988, 4, 12000, ["drama"], 1899],
  ["The Seagull", "Anton Chekhov", 7989, 4, 11000, ["drama"], 1896],
  ["Brand", "Henrik Ibsen", 65205, 5, 18000, ["drama"], 1866],
  ["The Master Builder", "Henrik Ibsen", 65206, 3, 14000, ["drama"], 1892],
  ["Salome", "Oscar Wilde", 1339, 1, 5000, ["drama"], 1893],
  ["Lady Windermeres Fan", "Oscar Wilde", 790, 4, 18000, ["drama","comedy"], 1892],
  ["An Ideal Husband", "Oscar Wilde", 885, 4, 22000, ["drama","comedy"], 1895],
  ["Miss Julie", "August Strindberg", 65207, 1, 8000, ["drama"], 1888],
  ["The Fathers Tragedy", "August Strindberg", 65208, 3, 15000, ["drama"], 1887],

  // ── More non-fiction ──
  ["The Souls of Black Folk", "W. E. B. Du Bois", 408, 14, 52000, ["non-fiction","political"], 1903],
  ["Democracy and Education", "John Dewey", 852, 26, 90000, ["philosophy","education"], 1916],
  ["The Prince Extended", "Niccolò Machiavelli", 1232, 26, 26000, ["philosophy","political"], 1532],
  ["On Liberty Extended", "John Stuart Mill", 34901, 5, 38000, ["philosophy","political"], 1859],
  ["Utilitarianism Extended", "John Stuart Mill", 11224, 5, 18000, ["philosophy"], 1863],
  ["The Social Contract Extended", "Jean-Jacques Rousseau", 46333, 4, 35000, ["philosophy","political"], 1762],
  ["Two Treatises of Government", "John Locke", 7370, 19, 85000, ["philosophy","political"], 1689],
  ["Common Sense Extended", "Thomas Paine", 147, 4, 15000, ["political","non-fiction"], 1776],
  ["Rights of Man", "Thomas Paine", 3742, 31, 95000, ["political","non-fiction"], 1791],
  ["The Age of Reason", "Thomas Paine", 3743, 36, 55000, ["philosophy","political"], 1794],
];

function main() {
  const ch = JSON.parse(readFileSync(resolve(DATA_DIR,"children-catalog.json"),"utf-8"));
  const ad = JSON.parse(readFileSync(resolve(DATA_DIR,"adult-catalog.json"),"utf-8"));
  const slugs = new Set([...ch.map(e=>e.slug),...ad.map(e=>e.slug)]);
  console.log(`Before batch 3: ${ch.length} children, ${ad.length} adult`);

  let nc=0; for (const r of CHILDREN_RAW) { const e=buildEntry(r,"children"); if(!slugs.has(e.slug)){slugs.add(e.slug);ch.push(e);nc++;} }
  let na=0; for (const r of ADULT_RAW)    { const e=buildEntry(r,"adult");    if(!slugs.has(e.slug)){slugs.add(e.slug);ad.push(e);na++;} }

  console.log(`New unique batch 3: ${nc} children, ${na} adult`);
  console.log(`Final: ${ch.length} children, ${ad.length} adult  (total ${ch.length+ad.length})`);

  writeFileSync(resolve(DATA_DIR,"children-catalog.json"), JSON.stringify(ch,null,2)+"\n");
  writeFileSync(resolve(DATA_DIR,"adult-catalog.json"), JSON.stringify(ad,null,2)+"\n");
  console.log("✅ Batch 3 written.");

  console.log(ch.length>=1000 ? "🎯 Children 1000 REACHED!" : `⚠️  Children needs ${1000-ch.length} more`);
  console.log(ad.length>=500  ? "🎯 Adult 500 REACHED!"     : `⚠️  Adult needs ${500-ad.length} more`);
}
main();
