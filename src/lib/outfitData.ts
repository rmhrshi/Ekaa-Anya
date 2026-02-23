export interface ShoppingItem {
  name: string;
  category: string;
  platform: "Amazon" | "Myntra" | "Zara";
  url: string;
}

export interface OutfitData {
  gender: string;
  occasion: string;
  skin_tone: string;
  skin_hex: string;
  skin_description: string;
  rgb: { r: number; g: number; b: number };
  dress_codes: string[];
  suggested_outfit: string;
  top: { color: string; type: string; brand: string; fabric: string };
  bottom: { color: string; type: string; brand: string; fabric: string };
  shoes: { color: string; type: string; brand: string };
  hairstyle: { style_name: string; how_to: string };
  accessories: string[];
  color_palette: { primary: string; secondary: string; accent: string };
  why_it_works: string;
  shopping_items: ShoppingItem[];
}

export const outfitData: OutfitData[] = [
  {
    gender: "Male",
    occasion: "Formal",
    skin_tone: "Deep",
    skin_hex: "#3B1F0F",
    skin_description: "Rich Deep Tone with Warm Undertones",
    rgb: { r: 59, g: 31, b: 15 },
    dress_codes: ["Formal", "Black Tie", "Business"],
    suggested_outfit: "A commanding navy blue slim-fit suit paired with a crisp white Oxford shirt, dark cognac leather oxford shoes, and a burgundy silk pocket square creates a powerful formal presence. The deep navy creates a striking jewel-toned contrast against a deep complexion making the look undeniably sophisticated. Finish with a leather-strap watch and simple silver cufflinks for a refined editorial edge.",
    top: { color: "White", type: "Oxford Dress Shirt", brand: "Calvin Klein", fabric: "100% Cotton" },
    bottom: { color: "Navy Blue", type: "Slim Fit Suit Trousers", brand: "Raymond", fabric: "Wool Blend" },
    shoes: { color: "Dark Cognac", type: "Oxford Lace-ups", brand: "Clarks" },
    hairstyle: { style_name: "Low Fade with Defined Coils", how_to: "Visit your barber every 3 weeks for a clean low fade. Apply a curl-defining cream to damp hair and scrunch upward to activate your natural coil pattern. Finish with a light oil sheen spray for lasting moisture and shine." },
    accessories: ["Cognac Leather Strap Watch", "Burgundy Silk Pocket Square", "Dark Brown Leather Belt", "Silver Cufflinks", "Aviator Sunglasses"],
    color_palette: { primary: "#1B2A4A", secondary: "#F5F5F5", accent: "#8B4513" },
    why_it_works: "Navy and white create a high-contrast pairing that makes deep skin tones glow with an elegant intensity that lighter palettes simply cannot match. The cognac leather accessories introduce a warm earthy richness that harmonizes perfectly with the natural warmth in a deep complexion. Together this palette tells a confident, intentional color story that reads as sophisticated in every lighting condition.",
    shopping_items: [
      { name: "Navy Slim Suit", category: "Outfit", platform: "Myntra", url: "https://www.amazon.in/s?k=navy+blue+slim+fit+suit+men" },
      { name: "White Oxford Shirt", category: "Top", platform: "Amazon", url: "https://www.amazon.in/s?k=white+oxford+dress+shirt+men" },
      { name: "Cognac Oxford Shoes", category: "Shoes", platform: "Amazon", url: "https://www.amazon.in/s?k=dark+brown+oxford+shoes+men" },
      { name: "Leather Strap Watch", category: "Accessory", platform: "Amazon", url: "https://www.amazon.in/s?k=cognac+leather+watch+men" },
      { name: "Pocket Square", category: "Accessory", platform: "Myntra", url: "https://www.amazon.in/s?k=burgundy+silk+pocket+square" },
    ],
  },
  {
    gender: "Female",
    occasion: "Party",
    skin_tone: "Medium",
    skin_hex: "#C68642",
    skin_description: "Warm Medium Tone with Golden Undertones",
    rgb: { r: 198, g: 134, b: 66 },
    dress_codes: ["Party", "Cocktail", "Evening"],
    suggested_outfit: "A rich emerald green wrap midi dress with a plunging V-neckline and fluid georgette fabric creates an effortlessly glamorous party statement. The jewel-toned green sits in perfect complementary contrast against medium warm skin giving the look an almost luminous quality. Strappy gold heeled sandals and layered gold jewelry complete a look that commands every room.",
    top: { color: "Emerald Green", type: "Wrap Midi Dress", brand: "Zara", fabric: "Georgette" },
    bottom: { color: "Emerald Green", type: "Flowy Midi Skirt", brand: "Zara", fabric: "Georgette" },
    shoes: { color: "Gold", type: "Strappy Heeled Sandals", brand: "Steve Madden" },
    hairstyle: { style_name: "Loose Romantic Waves", how_to: "Protect hair with heat spray then use a 1.5-inch wand to curl sections from mid-length downward. Once cool gently finger-comb and mist with flexible-hold spray. Pin back one side with a gold barrette to reveal the face and echo the gold jewelry theme." },
    accessories: ["Layered Gold Chain Necklace", "Large Gold Hoop Earrings", "Delicate Gold Bracelet Stack", "Emerald Satin Clutch", "Nude Backup Flats"],
    color_palette: { primary: "#046307", secondary: "#D4AF37", accent: "#C68642" },
    why_it_works: "Emerald green is scientifically one of the most universally flattering colors for medium warm skin tones because it sits directly opposite warm golden undertones on the color wheel creating a vibrant complementary contrast. The gold accessories mirror and amplify the natural warmth in a medium complexion making skin appear to glow from within. This combination photographs beautifully under every lighting condition from golden hour to club lighting.",
    shopping_items: [
      { name: "Emerald Wrap Dress", category: "Outfit", platform: "Zara", url: "https://www.amazon.in/s?k=emerald+green+wrap+midi+dress+women" },
      { name: "Gold Heeled Sandals", category: "Shoes", platform: "Myntra", url: "https://www.amazon.in/s?k=gold+strappy+heeled+sandals+women" },
      { name: "Gold Layered Necklace", category: "Accessory", platform: "Amazon", url: "https://www.amazon.in/s?k=layered+gold+necklace+women" },
      { name: "Gold Hoop Earrings", category: "Accessory", platform: "Amazon", url: "https://www.amazon.in/s?k=large+gold+hoop+earrings" },
      { name: "Emerald Clutch Bag", category: "Accessory", platform: "Myntra", url: "https://www.amazon.in/s?k=emerald+green+clutch+bag" },
    ],
  },
  {
    gender: "Male",
    occasion: "Casual",
    skin_tone: "Olive",
    skin_hex: "#8D5524",
    skin_description: "Warm Olive Tone with Mediterranean Undertones",
    rgb: { r: 141, g: 85, b: 36 },
    dress_codes: ["Casual", "Smart Casual", "Weekend"],
    suggested_outfit: "A burnt orange linen shirt worn untucked and slightly open at the collar over slim white chinos and white Stan Smith sneakers is the effortless Mediterranean summer look that olive skin was made for. The earthy warm orange mirrors the natural warmth in olive skin creating a monochromatic warmth story rather than a jarring contrast. Roll the sleeves twice, leave the shirt slightly oversized, and let the relaxed fit do the work.",
    top: { color: "Burnt Orange", type: "Relaxed Linen Shirt", brand: "Uniqlo", fabric: "100% Linen" },
    bottom: { color: "White", type: "Slim Chinos", brand: "Bonobos", fabric: "Cotton Stretch" },
    shoes: { color: "White", type: "Low-Top Leather Sneakers", brand: "Adidas Stan Smith" },
    hairstyle: { style_name: "Textured Crop with Natural Side Part", how_to: "Ask for a textured crop with a disconnected undercut on the sides and back. Work a small amount of matte clay through slightly damp hair pushing the top section naturally to one side. Do not over-style — the slightly undone texture is the entire point and works beautifully with olive skin's natural richness." },
    accessories: ["Brown Suede Strap Watch", "Matte Black Aviator Sunglasses", "Minimal Thin Silver Ring", "Natural Canvas Tote"],
    color_palette: { primary: "#CC5500", secondary: "#F5F5DC", accent: "#8B7355" },
    why_it_works: "Burnt orange and warm ivory are the two colors that most naturally extend the warm yellow-green undertone signature of olive skin rather than fighting against it. White sneakers and chinos act as a clean neutral base that prevents the warm palette from feeling heavy or overwhelming. The result is a cohesive head-to-toe warmth that feels like the outfit was designed specifically for your complexion because in a sense it was.",
    shopping_items: [
      { name: "Burnt Orange Linen Shirt", category: "Top", platform: "Amazon", url: "https://www.amazon.in/s?k=burnt+orange+linen+shirt+men" },
      { name: "White Slim Chinos", category: "Bottom", platform: "Myntra", url: "https://www.amazon.in/s?k=white+slim+chinos+men" },
      { name: "White Leather Sneakers", category: "Shoes", platform: "Amazon", url: "https://www.amazon.in/s?k=white+leather+low+top+sneakers+men" },
      { name: "Brown Suede Watch", category: "Accessory", platform: "Amazon", url: "https://www.amazon.in/s?k=brown+suede+strap+watch+men" },
      { name: "Matte Black Sunglasses", category: "Accessory", platform: "Myntra", url: "https://www.amazon.in/s?k=matte+black+aviator+sunglasses+men" },
    ],
  },
  {
    gender: "Female",
    occasion: "Business",
    skin_tone: "Fair",
    skin_hex: "#FDDBB4",
    skin_description: "Light Fair Tone with Cool Pink Undertones",
    rgb: { r: 253, g: 219, b: 180 },
    dress_codes: ["Business Casual", "Office", "Smart"],
    suggested_outfit: "A dusty rose structured blazer worn over a tucked-in ivory silk blouse, high-waisted slate grey wide-leg trousers, and nude pointed-toe block heels creates a polished feminine business look with genuine editorial quality. The muted rose echoes and deepens the natural pink undertone in fair skin without competing with the complexion. A structured cream leather tote and minimal gold jewelry keep the look professional without feeling austere.",
    top: { color: "Dusty Rose", type: "Structured Blazer over Ivory Blouse", brand: "Mango", fabric: "Crepe and Silk" },
    bottom: { color: "Slate Grey", type: "High-Waisted Wide Leg Trousers", brand: "H&M", fabric: "Polyester Blend" },
    shoes: { color: "Nude Blush", type: "Pointed Block Heels", brand: "Aldo" },
    hairstyle: { style_name: "Sleek Low Bun", how_to: "Blow-dry hair completely smooth and apply a small amount of shine serum from mid-length to ends. Pull all hair back to the nape of the neck, twist tightly, and pin into a clean bun with bobby pins. Pull two thin face-framing pieces loose at the front and lock everything with a light-hold spray for a polished look that holds through a full work day." },
    accessories: ["Delicate Gold Stud Earrings", "Thin Gold Chain Necklace", "Cream Structured Leather Tote", "Thin Gold Chain Belt at waist", "Single Gold Bangle"],
    color_palette: { primary: "#D4A5A5", secondary: "#708090", accent: "#F5F0E8" },
    why_it_works: "Dusty muted rose is the single most flattering color for fair cool-undertoned skin because it mirrors the complexion's own pink base creating a harmonious flush rather than a washed-out or overwhelming contrast. Slate grey grounds the soft rose palette with professional authority without the harshness that black creates against very fair skin. The result is a palette of deliberate restraint that reads as sophisticated confidence.",
    shopping_items: [
      { name: "Dusty Rose Blazer", category: "Top", platform: "Myntra", url: "https://www.amazon.in/s?k=dusty+rose+blazer+women" },
      { name: "Grey Wide Leg Trousers", category: "Bottom", platform: "Amazon", url: "https://www.amazon.in/s?k=slate+grey+wide+leg+trousers+women" },
      { name: "Nude Block Heel Pumps", category: "Shoes", platform: "Myntra", url: "https://www.amazon.in/s?k=nude+block+heel+pointed+pumps+women" },
      { name: "Thin Gold Necklace", category: "Accessory", platform: "Amazon", url: "https://www.amazon.in/s?k=thin+gold+chain+necklace+women" },
      { name: "Cream Leather Tote", category: "Accessory", platform: "Amazon", url: "https://www.amazon.in/s?k=cream+leather+structured+tote+bag+women" },
    ],
  },
];

export function getOutfit(gender: string, occasion: string, skinTone: string): OutfitData {
  // Try to match gender + occasion
  const genderMatch = outfitData.filter(o => o.gender.toLowerCase() === gender.toLowerCase());
  if (genderMatch.length > 0) {
    const occasionMatch = genderMatch.find(o =>
      o.occasion.toLowerCase() === occasion.toLowerCase() ||
      o.dress_codes.some(d => d.toLowerCase() === occasion.toLowerCase())
    );
    if (occasionMatch) return occasionMatch;
    return genderMatch[0];
  }
  return outfitData[0];
}

export const galleryOutfits = [
  {
    id: 1,
    name: "Midnight Navy Power Suit",
    occasion: "Formal",
    skinTone: "Deep",
    gradient: "linear-gradient(135deg, #1B2A4A 0%, #2D4A7A 50%, #8B4513 100%)",
    description: "Commanding navy slim-fit with cognac leather details",
    palette: ["#1B2A4A", "#F5F5F5", "#8B4513"],
  },
  {
    id: 2,
    name: "Emerald Party Goddess",
    occasion: "Party",
    skinTone: "Medium",
    gradient: "linear-gradient(135deg, #046307 0%, #0a8c0d 50%, #D4AF37 100%)",
    description: "Jewel-toned wrap dress with gold accessories",
    palette: ["#046307", "#D4AF37", "#C68642"],
  },
  {
    id: 3,
    name: "Mediterranean Linen Dream",
    occasion: "Casual",
    skinTone: "Olive",
    gradient: "linear-gradient(135deg, #CC5500 0%, #E8824A 50%, #F5F5DC 100%)",
    description: "Burnt orange linen with white chinos and clean sneakers",
    palette: ["#CC5500", "#F5F5DC", "#8B7355"],
  },
  {
    id: 4,
    name: "Dusty Rose Executive",
    occasion: "Business",
    skinTone: "Fair",
    gradient: "linear-gradient(135deg, #D4A5A5 0%, #A87D7D 50%, #708090 100%)",
    description: "Structured rose blazer with slate grey trousers",
    palette: ["#D4A5A5", "#708090", "#F5F0E8"],
  },
  {
    id: 5,
    name: "Cobalt Confidence",
    occasion: "Business",
    skinTone: "Tan",
    gradient: "linear-gradient(135deg, #1A3A6B 0%, #2E5EAA 50%, #C0A060 100%)",
    description: "Bold cobalt suit with gold pocket detail",
    palette: ["#1A3A6B", "#2E5EAA", "#C0A060"],
  },
  {
    id: 6,
    name: "Terracotta Evening",
    occasion: "Party",
    skinTone: "Light",
    gradient: "linear-gradient(135deg, #C9956A 0%, #E8B48A 50%, #1A1A2E 100%)",
    description: "Rich terracotta gown with dark accessories",
    palette: ["#C9956A", "#E8B48A", "#1A1A2E"],
  },
  {
    id: 7,
    name: "Champagne Date Night",
    occasion: "Party",
    skinTone: "Fair",
    gradient: "linear-gradient(135deg, #D4AF37 0%, #F5D16A 50%, #8B7355 100%)",
    description: "Champagne slip dress with nude heels",
    palette: ["#D4AF37", "#F5D16A", "#8B7355"],
  },
  {
    id: 8,
    name: "Sage Sunday Brunch",
    occasion: "Casual",
    skinTone: "Medium",
    gradient: "linear-gradient(135deg, #7D9E7A 0%, #A8C4A5 50%, #F5E8D0 100%)",
    description: "Sage linen co-ord with minimal gold jewelry",
    palette: ["#7D9E7A", "#A8C4A5", "#F5E8D0"],
  },
  {
    id: 9,
    name: "Burgundy Power",
    occasion: "Formal",
    skinTone: "Olive",
    gradient: "linear-gradient(135deg, #800020 0%, #A83240 50%, #F5F5DC 100%)",
    description: "Burgundy structured suit with ivory shirt",
    palette: ["#800020", "#A83240", "#F5F5DC"],
  },
  {
    id: 10,
    name: "Ivory Minimalist",
    occasion: "Business",
    skinTone: "Deep",
    gradient: "linear-gradient(135deg, #F5F0E8 0%, #E8D8C0 50%, #2D2D2D 100%)",
    description: "Head-to-toe ivory with one bold dark accessory",
    palette: ["#F5F0E8", "#E8D8C0", "#2D2D2D"],
  },
  {
    id: 11,
    name: "Electric Violet Evening",
    occasion: "Party",
    skinTone: "Tan",
    gradient: "linear-gradient(135deg, #6B21A8 0%, #9333EA 50%, #D4AF37 100%)",
    description: "Rich violet wrap with statement gold earrings",
    palette: ["#6B21A8", "#9333EA", "#D4AF37"],
  },
  {
    id: 12,
    name: "Khaki Street Smart",
    occasion: "Casual",
    skinTone: "Light",
    gradient: "linear-gradient(135deg, #8B7355 0%, #A89070 50%, #2D2D2D 100%)",
    description: "Khaki cargo trousers with vintage tee and white sneakers",
    palette: ["#8B7355", "#A89070", "#2D2D2D"],
  },
  {
    id: 13,
    name: "Forest Intellect",
    occasion: "Business",
    skinTone: "Medium",
    gradient: "linear-gradient(135deg, #2D5A3D 0%, #4A8A60 50%, #D4AF37 100%)",
    description: "Deep forest blazer over cream with gold accessories",
    palette: ["#2D5A3D", "#4A8A60", "#D4AF37"],
  },
  {
    id: 14,
    name: "Blush Editorial",
    occasion: "Party",
    skinTone: "Fair",
    gradient: "linear-gradient(135deg, #FFB3BA 0%, #FF8FA3 50%, #1A1A2E 100%)",
    description: "Blush tulle skirt with structured black blazer",
    palette: ["#FFB3BA", "#FF8FA3", "#1A1A2E"],
  },
];
