import { img } from "@/lib/utils";

// Every Unsplash ID below was verified (HTTP 200 + visually checked). Photos are shown in
// black & white via the `.photo` CSS class — replace with your own photography (with consent).
export const PHOTO = {
  // Civic life, convenings, crowds
  speakerCrowd: "photo-1544531586-fde5298cdd40", // speaker addressing a packed hall
  audienceDark: "photo-1540575467063-178a50c2df87", // audience in a darkened auditorium
  conference: "photo-1511578314322-379afb476865", // conference hall with stage
  microphone: "photo-1475721027785-f74eccf877e2", // microphone on stage
  eventHall: "photo-1523580494863-6f3031224c94", // seated audience, panel on stage
  workshop: "photo-1529070538774-1843cb3265df", // participants with notebooks
  gathering: "photo-1517457373958-b7bdd4587205", // community gathering under string lights
  crowd: "photo-1560439514-4e9645039924", // large crowd at an event
  armsAround: "photo-1529156069898-49953e39b3ac", // young friends, arms around shoulders
  friends: "photo-1607748862156-7c548e7e98f4", // group of friends laughing
  ballot: "photo-1494172961521-33799ddd43a5", // ballot envelope into a box
  fists: "photo-1591848478625-de43268e6fb8", // raised fists in a crowd
  signing: "photo-1450101499163-c8848c66ca85", // hand signing a document
  boardroom: "photo-1431540015161-0bf868a2d407", // empty boardroom
  meeting: "photo-1517048676732-d65bc937f952", // hands around a meeting table
  seminar: "photo-1524178232363-1fb2b075b655", // training room
  handshake: "photo-1521791136064-7986c2920216", // partnership handshake
  handsStacked: "photo-1523240795612-9a054b0db644", // hands stacked in a circle
  teamLaptop: "photo-1543269865-cbf427effbad", // young team around a laptop
  stemLaptop: "photo-1531482615713-2afd69097998", // young woman coding
  techWoman: "photo-1573164713988-8665fc963095", // Black woman with laptop in a server room
  volunteer: "photo-1559027615-cd4628902d4a", // volunteers packing boxes
  classroom: "photo-1567057419565-4349c49d8a04", // African classroom, green uniforms
  kids: "photo-1509099836639-18ba1795216d", // group of smiling children
  gala: "photo-1519671482749-fd09be7ccebf", // glasses raised at a dinner

  // Cities & the civic centre
  lagosAerial: "photo-1618828665011-0abd973f7bb8", // West African city, aerial
  cityAerial: "photo-1577948000111-9c970dfe3743", // African city skyline
  architecture: "photo-1487958449943-2429e8be8625", // white modern building (rendering stand-in)
  civicBuilding: "photo-1574958269340-fa927503f3dd", // modern glass civic building
  blueprint: "photo-1503387762-592deb58ef4e", // architect with blueprints
  constructionSite: "photo-1541888946425-d81bb19240f5", // engineers on a construction deck
  rebar: "photo-1504307651254-35680f356dfd", // builders tying rebar

  // Portraits
  founder: "photo-1611432579699-484f7990b127", // Black woman, short natural hair, white top
  founderWork: "photo-1611432579402-7037e3e2c1e4", // Black woman in blazer with tablet
  pAmara: "photo-1563132337-f159f484226c", // young Black woman, blazer, arms folded
  pTobi: "photo-1614023342667-6f060e9d1e04", // young Black man with glasses
  pNkechi: "photo-1531123897727-8f129e1688ce", // Black woman close portrait
  pZara: "photo-1589156280159-27698a70f29e", // Black woman with afro, city lights
  pFolake: "photo-1589156191108-c762ff4b96ab", // Black woman with afro, studio
  pAisha: "photo-1589156229687-496a31ad1d1f", // Black woman seated
  pEsi: "photo-1508002366005-75a695ee2d17", // Black woman laughing
  pWanjiru: "photo-1523824921871-d6f1a15151f1", // Black woman, pale wall
  pMaryam: "photo-1618085222100-93f0eecad0aa", // Black woman smiling
  pKwame: "photo-1522529599102-193c0d76b5b6", // Black man smiling
  pChidi: "photo-1531384441138-2736e62e0919", // Black man with glasses
  pEmeka: "photo-1566492031773-4f4e44671857", // Black man with glasses, striped tee
  pAdwoa: "photo-1507152832244-10d45c7eda57", // Black woman with glasses
  pSeun: "photo-1506277886164-e25aa3f4ef7f", // Black man laughing
  pIbrahim: "photo-1504199367641-aba8151af406", // Black man, beard, laughing
  pNadia: "photo-1531300185372-b7cbe2eddf0b", // Black woman, dramatic portrait
} as const;

export type PhotoKey = keyof typeof PHOTO;
export const photo = (key: PhotoKey, w = 1400) => img(PHOTO[key], w);
