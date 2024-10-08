// Create type for bands

type BandList = {
  [key: string]: string[];
}

const bands: BandList = {
  "A": ["AC/DC", "Aerosmith", "Arctic Monkeys", "Arcade Fire", "A Perfect Circle", "Alice in Chains", "Avenged Sevenfold"],
  "B": ["Beatles", "Bee Gees", "Black Sabbath", "Blur", "Black Keys", "Beach Boys", "Bastille"],
  "C": ["Coldplay", "Creedence Clearwater Revival", "Chicago", "Clash", "Cheap Trick", "Cranberries", "Cage the Elephant"],
  "D": ["Doors", "Depeche Mode", "Def Leppard", "Duran Duran", "Disturbed", "Daughtry", "Dropkick Murphys"],
  "E": ["Eagles", "Evanescence", "Earth, Wind & Fire", "Eurythmics", "Elvis Presley", "Elbow", "Eels"],
  "F": ["Fleetwood Mac", "Foo Fighters", "Franz Ferdinand", "Fall Out Boy", "Faith No More", "Foreigner", "Flaming Lips"],
  "G": ["Guns N' Roses", "Green Day", "Genesis", "Gorillaz", "Garbage", "Goldfinger", "Good Charlotte"],
  "H": ["Heart", "Hollies", "Hootie & the Blowfish", "Hate Eternal", "HIM", "Hinder", "Hot Chip"],
  "I": ["INXS", "Imagine Dragons", "Iron Maiden", "Incubus", "Interpol", "Iggy Pop", "Idlewild"],
  "J": ["Journey", "Judas Priest", "Jethro Tull", "Jackson 5", "Jane's Addiction", "Jefferson Airplane", "Jesus and Mary Chain"],
  "K": ["KISS", "Kings of Leon", "Korn", "Killers", "Kaiser Chiefs", "Kamelot", "Kasabian"],
  "L": ["Led Zeppelin", "Linkin Park", "Lynyrd Skynyrd", "Loverboy", "Limp Bizkit", "Lush", "Living Colour"],
  "M": ["Metallica", "Muse", "Motley Crue", "Mumford & Sons", "Megadeth", "My Chemical Romance", "Maroon 5"],
  "N": ["Nirvana", "Nine Inch Nails", "Nickelback", "New Order", "Nightwish", "No Doubt", "Neko Case"],
  "O": ["Oasis", "Offspring", "Our Lady Peace", "Opeth", "Outkast", "Ozzy Osbourne", "Of Monsters and Men"],
  "P": ["Pink Floyd", "Pearl Jam", "Pixies", "Pantera", "Pavement", "Portishead", "Public Enemy"],
  "Q": ["Queen", "Queensryche", "Quiet Riot", "Quavo", "Queens of the Stone Age", "Quicksilver Messenger Service", "Quintessence"],
  "R": ["Red Hot Chili Peppers", "Radiohead", "Rush", "Rammstein", "Rage Against the Machine", "Ramones", "REM"],
  "S": ["Scorpions", "Smashing Pumpkins", "Strokes", "Slayer", "Soundgarden", "Stone Temple Pilots", "Sonic Youth"],
  "T": ["The Who", "Tool", "Talking Heads", "Toto", "Tears for Fears", "Thin Lizzy", "Twisted Sister"],
  "U": ["U2", "Uriah Heep", "Uncle Kracker", "Unleashed", "UFO", "Ultravox", "Underoath"],
  "V": ["Van Halen", "Velvet Underground", "Verve", "Venom", "Vampire Weekend", "Violent Femmes", "Voivod"],
  "W": ["Weezer", "White Stripes", "Whitesnake", "Wolfmother", "Warrant", "Wilco", "War"],
  "X": ["X", "XTC", "X-Ray Spex", "X Japan", "Xandria", "Xibalba", "Xiu Xiu"],
  "Y": ["Yes", "Yardbirds", "Yellowcard", "Yanni", "Yeah Yeah Yeahs", "Yngwie Malmsteen", "Yo La Tengo"],
  "Z": ["ZZ Top", "Zombies", "Zac Brown Band", "Zedd", "Zebrahead", "Zappa", "Zeal & Ardor"]
};

const getRandomBandName = (): string => {
  let letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  let band = bands[letter][Math.floor(Math.random() * bands[letter].length)];
  return band;
}

export { bands, getRandomBandName };