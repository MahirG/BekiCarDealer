"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  ChevronDown,
  CircleCheck,
  Clock3,
  Facebook,
  Gauge,
  Globe2,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import legacy from "@/data/legacy-content.json";
import { Logo } from "@/components/Logo";

type LegacyItem = { tag: string; text: string };
type LegacyLink = { href?: string; title?: string; "aria-label"?: string; target?: string };

type CarRecord = {
  id: number;
  make: string;
  model: string;
  year: number;
  category: "sale" | "rent";
  price: number;
  priceLabel: string;
  transmission: string;
  fuel: string;
  mileage: string;
  img?: string;
  urgent?: boolean;
  badge?: string;
  bodyType?: string;
  engine?: string;
  driveType?: string;
  gasMileage?: string;
  plateNo?: string;
  condition?: string;
  origin?: string;
  contact?: string;
  telegramNote?: string;
  telegramLink?: string;
  features?: string[];
  desc: string;
};

const cars: CarRecord[] = [
  {
    id: 11,
    make: "Toyota",
    model: "Hilux Revo",
    year: 2019,
    category: "sale",
    price: 6800000,
    priceLabel: "6.8M ETB",
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "62,000 km",
    bodyType: "Double-Cab Pickup",
    engine: "2.4L Diesel 150HP",
    driveType: "4WD",
    gasMileage: "12 KM/L",
    plateNo: "3AZ*** A",
    condition: "Very Good",
    origin: "Japan Import",
    contact: "0912 387 513",
    telegramNote: "ተጨማሪ የፎቶ እና ዋጋ ዝርዝር ለማወቅ የቴሌግራም ቻናላችንን ይቀላቀሉ",
    telegramLink: "https://t.me/bekiautocar",
    features: [
      "Sport Hardtop Canopy",
      "All-Terrain Alloy Wheels",
      "LED Headlights & DRL",
      "Tinted Windows",
      "Side Steps / Running Boards",
      "Mud Flaps All Round",
      "Reverse Camera",
      "Bluetooth Infotainment",
      "Dual Airbags",
      "ABS with EBD",
      "4WD High & Low Range",
      "Roof Rails",
    ],
    desc: "Powerful 2019 Toyota Hilux Revo Double Cab in gun-metal grey. Japan import, full 4WD with high/low range. 2.4L diesel engine, 62,000 km. Fitted with sport hardtop canopy, all-terrain alloy wheels, LED lighting, reverse camera, Bluetooth. Immaculate inside and out. Plate 3AZ*** A. Price negotiable. Contact 0912 387 513.",
  },
  {
    id: 10,
    make: "Hyundai",
    model: "Tucson",
    year: 2022,
    category: "sale",
    price: 5400000,
    priceLabel: "5.4M ETB",
    transmission: "8-Speed Automatic",
    fuel: "Benzine (Petrol)",
    mileage: "40,000 km",
    urgent: true,
    badge: "Urgent Sale",
    bodyType: "SUV Sport Utility",
    engine: "L4 1.6 Turbo 187HP",
    driveType: "FWD",
    gasMileage: "16 KM/L",
    plateNo: "B7*** Code 2",
    condition: "Almost Brand New",
    origin: "Korea Standard",
    contact: "0912 387 513",
    telegramNote: "ተጨማሪ የመኪናውን ፎቶ እንዲሁም ዋጋ የሚቀንሱ መኪናዎችን ለማየት የቴሌግራም ቻናላችንን ይቀላቀሉን",
    telegramLink: "https://t.me/joinchat/AAAAAEhK0YVSL_hizSLjoA",
    features: [
      "ABS – Anti-Lock Brake System",
      "Airbags – Front, Side, Curtain & Centre",
      "Electronic Stability Control (ESC)",
      "Lane Keep Assist (LKA)",
      "Rear Cross Traffic Collision Avoidance",
      "Electric Parking Brake with Auto Hold",
      "DBC – Downhill Brake Control",
      "Auto Windscreen Wipers with Rain Sensor",
      "Bluetooth Connectivity",
      "Parking Sensors – Front & Rear",
      "Blind Spot Collision Avoidance Assist",
      "Auto-Dimming Rearview Mirror",
      "Premium Synthetic Seats",
    ],
    desc: "Almost brand new 2022 Hyundai Tucson Europe Standard — Korea-spec with full safety suite. 1.6 Turbo 187HP engine, 8-speed automatic, FWD. 40,000 km on the clock, immaculate condition. Full features including Lane Keep Assist, BSA, ESC, and premium synthetic leather seats. Plate B7*** Code 2. Price negotiable. Contact: 0912 387 513.",
  },
  { id: 1, make: "Toyota", model: "Vitz RS", year: 2020, img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&q=80", category: "sale", price: 2800000, priceLabel: "2.8M ETB", transmission: "Automatic", fuel: "Petrol", mileage: "28,000 km", desc: "Well-maintained Toyota Vitz RS sourced from a single owner. Full service history available. Reverse camera, climate control A/C, and alloy wheels. Clean documents, ready for transfer." },
  { id: 2, make: "Suzuki", model: "Dzire", year: 2021, img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=700&q=80", category: "sale", price: 1950000, priceLabel: "1.95M ETB", transmission: "Automatic", fuel: "Petrol", mileage: "18,500 km", desc: "Fuel-efficient Suzuki Dzire in excellent condition. 23 km/L fuel economy, dual airbags, ABS, Bluetooth infotainment, and rear parking sensors. Ideal for Addis daily commute." },
  { id: 3, make: "Toyota", model: "Yaris", year: 2022, img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=700&q=80", category: "sale", price: 3100000, priceLabel: "3.1M ETB", transmission: "CVT", fuel: "Petrol", mileage: "12,000 km", desc: "Nearly-new Toyota Yaris with low mileage. Comes with Toyota Safety Sense, lane departure alert, Apple CarPlay, and full climate control. A premium compact sedan at a great price." },
  { id: 4, make: "Toyota", model: "Corolla", year: 2019, img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=700&q=80", category: "sale", price: 4200000, priceLabel: "4.2M ETB", transmission: "Automatic", fuel: "Petrol", mileage: "45,000 km", desc: "Toyota Corolla with full service history and single owner. Pre-collision system, reverse camera, Apple CarPlay / Android Auto. Locally registered with clear title. Immaculate interior." },
  { id: 5, make: "Hyundai", model: "Accent", year: 2020, img: "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?w=700&q=80", category: "sale", price: 2400000, priceLabel: "2.4M ETB", transmission: "Automatic", fuel: "Petrol", mileage: "32,000 km", desc: "Hyundai Accent in excellent shape. 6-speed automatic, rear camera, Bluetooth audio, heated front seats, and ABS/EBD. Clear title with all customs documents. Great value commuter." },
  { id: 6, make: "Kia", model: "Rio", year: 2021, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80", category: "sale", price: 2650000, priceLabel: "2.65M ETB", transmission: "Automatic", fuel: "Petrol", mileage: "22,000 km", desc: "Kia Rio compact hatchback with sporty styling and modern features. 8\" touchscreen, Apple CarPlay, lane keeping assist, and forward collision avoidance. Economical and reliable." },
  { id: 7, make: "Toyota", model: "Vitz", year: 2019, img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&q=80", category: "rent", price: 1800, priceLabel: "1,800 ETB / day", transmission: "Automatic", fuel: "Petrol", mileage: "Fleet Managed", desc: "Premium daily rental Toyota Vitz — clean, fully insured, and maintained to fleet standards. Includes GPS, Bluetooth audio. Minimum 2-day rental. Driver available on request." },
  { id: 8, make: "Toyota", model: "Corolla", year: 2020, img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=700&q=80", category: "rent", price: 2500, priceLabel: "2,500 ETB / day", transmission: "Automatic", fuel: "Petrol", mileage: "Fleet Managed", desc: "Executive rental Toyota Corolla for business or VIP events. Full A/C, spacious cabin, and professional presentation. Fully insured. Available with professional driver." },
  { id: 9, make: "Hyundai", model: "Tucson", year: 2021, img: "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?w=700&q=80", category: "rent", price: 3500, priceLabel: "3,500 ETB / day", transmission: "Automatic", fuel: "Petrol", mileage: "Fleet Managed", desc: "Spacious Hyundai Tucson SUV rental — perfect for family trips, airport transfers, or project site visits. AWD option, panoramic sunroof, and full climate control. Book via Telegram." },
];

const items = legacy.visible as LegacyItem[];
const originalLinks = legacy.links as LegacyLink[];
let anchorCursor = 0;
const enriched = items.map((item, index) => ({
  ...item,
  index,
  href: item.tag === "a" ? originalLinks[anchorCursor++]?.href : undefined,
}));

const indexOf = (text: string, from = 0) => {
  const idx = enriched.findIndex((item, i) => i >= from && item.text === text);
  return idx === -1 ? enriched.length : idx;
};

const streamBetween = (start: string, end?: string) => {
  const startIndex = indexOf(start);
  const endIndex = end ? indexOf(end, startIndex + 1) : enriched.length;
  return enriched.slice(startIndex, endIndex);
};

function ContentStream({ content, className = "" }: { content: typeof enriched; className?: string }) {
  return (
    <div className={`contentStream ${className}`.trim()}>
      {content.map((item) => {
        const key = `${item.index}-${item.text}`;
        if (item.tag === "h1") return <h1 key={key}>{item.text}</h1>;
        if (item.tag === "h2") return <h2 key={key}>{item.text}</h2>;
        if (item.tag === "h3") return <h3 key={key}>{item.text}</h3>;
        if (item.tag === "p") return <p key={key}>{item.text}</p>;
        if (item.tag === "strong") return <strong key={key}>{item.text}</strong>;
        if (item.tag === "em") return <em key={key}>{item.text}</em>;
        if (item.tag === "a") return <a key={key} href={item.href || "#"} target={item.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{item.text}</a>;
        if (item.tag === "label") return <span className="streamLabel" key={key}>{item.text}</span>;
        if (item.tag === "button") return <span className="streamButton" key={key}>{item.text}</span>;
        return <span key={key}>{item.text}</span>;
      })}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarRecord | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | "sale" | "rent">("all");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const filteredCars = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = cars.filter((car) => {
      const matchesQuery = !q || `${car.make} ${car.model} ${car.fuel} ${car.transmission}`.toLowerCase().includes(q);
      const matchesCategory = category === "all" || car.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    if (sort === "desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [query, category, sort]);

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInquirySent(true);
  };

  const seoEnglish = streamBetween("Cars for Sale in Ethiopia – Your Ultimate Mekina Market", "በኢትዮጵያ ቀዳሚው የመኪና ገበያ - የሚሸጡ መኪናዎች");
  const seoAmharic = streamBetween("በኢትዮጵያ ቀዳሚው የመኪና ገበያ - የሚሸጡ መኪናዎች", "Frequently Asked Questions / በተደጋጋሚ የሚነሱ ጥያቄዎች");
  const faq = streamBetween("Frequently Asked Questions / በተደጋጋሚ የሚነሱ ጥያቄዎች", "Cars for Sale Ethiopia 2026 – BEKI AUTOCAR Addis Ababa");
  const seoTail = streamBetween("Cars for Sale Ethiopia 2026 – BEKI AUTOCAR Addis Ababa", "BEKI AUTOCAR");

  return (
    <main id="top">
      <header className="siteHeader">
        <div className="shell navInner">
          <a href="#top" aria-label="Beki AutoCar home"><Logo /></a>
          <nav className="desktopNav" aria-label="Main navigation">
            <a href="#top">Home</a>
            <a href="#services">Services</a>
            <a href="#cars">Cars</a>
            <a href="#updates">Updates</a>
            <a href="#showroom">Showroom</a>
            <a href="#inquire">Inquire</a>
          </nav>
          <div className="navTools">
            <button className="iconButton" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={16} /></button>
            <button className="accountButton" onClick={() => setAuthOpen(true)}><UserRound size={14} /> Sign In</button>
            <a className="navPhone" href="tel:+251912387513">0912 387 513</a>
            <button className="menuButton" onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu"><Menu size={18} /></button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobileNav shell">
            {[["Home", "#top"], ["Services", "#services"], ["Cars", "#cars"], ["Updates", "#updates"], ["Showroom", "#showroom"], ["Inquire", "#inquire"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a href="https://t.me/Beckyyyyyy" target="_blank" rel="noreferrer">Contact Beki on Telegram</a>
          </nav>
        )}
      </header>

      <div className="liveStrip">
        <div className="shell liveInner">
          <span className="liveBadge"><i /> Live</span>
          <span>🇯🇵 Japan imports weekly · 🇦🇪 UAE sourcing · ⚡ EVs & hybrids in stock</span>
          <a href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">Join Channel <ArrowRight size={12} /></a>
        </div>
      </div>

      <section className="hero shell">
        <div className="heroCopy">
          <div className="eyebrow"><span /> Elite Brokerage Experience</div>
          <h1>Looking to buy or sell?</h1>
          <em>We save your precious time.</em>
          <p>Sourcing pristine zero-mile luxury imports, certified pre-owned options, and executive rentals across Ethiopia with unmatched legal safety and market discretion.</p>
          <div className="heroActions">
            <a className="buttonPrimary" href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">View Telegram Channel <ArrowRight size={14} /></a>
            <a className="textLink" href="https://t.me/Beckyyyyyy" target="_blank" rel="noreferrer">Direct Message <MessageCircle size={13} /></a>
            <a className="textLink" href="tel:+251912387513">Call Now <Phone size={13} /></a>
          </div>
          <div className="heroTrust">
            <div><strong>500+</strong><span>Vehicles Sourced</span></div>
            <div><strong>4</strong><span>Import Sources</span></div>
            <div><strong>100%</strong><span>Legal & Certified</span></div>
            <div><strong>3</strong><span>Languages Supported</span></div>
          </div>
        </div>
        <div className="heroVisual" aria-label="Premium vehicle showcase">
          <div className="luxuryList">
            <article><span>01</span><div><strong>Rolls-Royce Ghost</strong><small>Ultra Luxury · Import Available</small></div></article>
            <article><span>02</span><div><strong>Lamborghini Urus</strong><small>Super SUV · Direct Source</small></div></article>
            <article><span>03</span><div><strong>Mercedes-Benz S-Class</strong><small>Executive Sedan · UAE Import</small></div></article>
          </div>
          <div className="heroCarGraphic"><Car size={74} strokeWidth={1.05} /><span>BEKI / PREMIUM MOBILITY</span></div>
        </div>
      </section>

      <section className="inventory section shell" id="cars">
        <div className="sectionHead">
          <div><span className="sectionIndex">Live Inventory</span><h2>Cars Available Now</h2><p>Everyday vehicles sourced for the Ethiopian market — verified, priced fairly, ready to go.</p></div>
          <a className="textLink" href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">@bekiautocar <ArrowRight size={13} /></a>
        </div>
        <div className="inventoryTools">
          <label className="searchBox"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search make, model, or fuel" /></label>
          <div className="categoryPills" role="tablist">
            <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>All</button>
            <button className={category === "sale" ? "active" : ""} onClick={() => setCategory("sale")}>For Sale</button>
            <button className={category === "rent" ? "active" : ""} onClick={() => setCategory("rent")}>For Rent</button>
          </div>
          <label className="sortBox">Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="default">Sort: Default</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
            <ChevronDown size={13} />
          </label>
          <div className="resultCount"><strong>{filteredCars.length}</strong><span>vehicles found</span></div>
          {(query || category !== "all" || sort !== "default") && <button className="resetButton" onClick={() => { setQuery(""); setCategory("all"); setSort("default"); }}>Reset filters</button>}
        </div>

        {filteredCars.length ? (
          <div className="carGrid">
            {filteredCars.map((car) => (
              <article className="carCard" key={car.id} onClick={() => setSelectedCar(car)}>
                <div className={`carMedia ${!car.img ? "graphic" : ""}`}>
                  {car.img ? <img src={car.img} alt={`${car.make} ${car.model}`} /> : <div className="fallbackCar"><Car size={54} strokeWidth={1.1} /></div>}
                  <span className={`categoryBadge ${car.category}`}>{car.category === "sale" ? "For Sale" : "For Rent"}</span>
                  {car.urgent && <span className="urgentBadge">Urgent Sale</span>}
                  <span className="yearBadge">{car.year}</span>
                </div>
                <div className="carInfo">
                  <div><h3>{car.make} {car.model}</h3><p>{car.year} · {car.category === "sale" ? "For Sale" : "For Rent"}</p></div>
                  <div className="specChips"><span>{car.transmission}</span><span>{car.fuel}</span><span>{car.mileage}</span></div>
                  <p className="carDesc">{car.desc}</p>
                  <div className="carPrice"><div><small>{car.category === "sale" ? "Asking Price" : "Daily Rate"}</small><strong>{car.priceLabel}</strong></div><button aria-label={`View ${car.make} ${car.model}`}><ArrowRight size={14} /></button></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="emptyState"><Search size={24} /><h3>No vehicles found</h3><p>Try adjusting your search or filters to discover available listings.</p><button onClick={() => { setQuery(""); setCategory("all"); setSort("default"); }}>Clear Filters</button></div>
        )}
        <p className="inventoryNote">Live inventory updated continuously — <a href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">@bekiautocar</a>. New arrivals posted daily.</p>
      </section>

      <section className="servicesBand" id="services">
        <div className="shell section">
          <div className="sectionHead light"><div><span className="sectionIndex">Our Expertise</span><h2>Premium Services</h2><p>Complete automotive solutions for the premium Ethiopian market.</p></div></div>
          <div className="servicesGrid">
            <article><span>01</span><div className="serviceIcon"><Globe2 size={20} /></div><h3>Import Sourcing</h3><p>Comprehensive sourcing from Japan, UAE, and European auction houses. Every vehicle arrives with full documentation, verified chassis history, and duty clearance handled end-to-end by our specialist team.</p><small>Japan · UAE · Europe</small><a href="#inquire">Explore <ArrowRight size={13} /></a></article>
            <article><span>02</span><div className="serviceIcon"><Car size={20} /></div><h3>Car Rentals</h3><p>Flexible short-term and premium project configurations. Access perfectly detailed premium luxury sedans and heavy SUVs kept to rigorous operational standards.</p><small>VIP & Luxury Fleet</small><a href="#inquire">Book <ArrowRight size={13} /></a></article>
            <article><span>03</span><div className="serviceIcon"><ShieldCheck size={20} /></div><h3>Commission Works</h3><p>Delegate the complete negotiation, photography curation, and buyer screening sequence to our professional network. Fixed tiers with zero underlying fee schemes.</p><small>Transparent Brokerage</small><a href="#inquire">Consign <ArrowRight size={13} /></a></article>
          </div>
        </div>
      </section>

      <section className="updates section shell" id="updates">
        <div className="updatesIntro">
          <span className="sectionIndex">Latest Updates</span>
          <h2>Live From Our <em>Telegram Channel</em></h2>
          <p>Every new arrival, price drop, and exclusive deal posted live on our Telegram channel — directly from Beki AutoCar.</p>
          <div className="channelCard"><div><strong>@bekiautocar</strong><small>Official Channel · Addis Ababa</small></div><span><i /> Live</span><a href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">Join <ArrowRight size={13} /></a></div>
        </div>
        <div className="updatesGrid">
          {[['New Arrival Posted','Latest vehicles with photos & prices'],['Photo Gallery Updates','Detailed car photos & walkaround videos'],['Price Drops & Deals','Negotiated prices & special offers'],['Import Arrivals','Fresh from Japan, UAE & Europe']].map(([title, copy]) => (
            <a key={title} href="https://t.me/bekiautocar" target="_blank" rel="noreferrer"><span>{title}</span><p>{copy}</p><small>View on Telegram →</small></a>
          ))}
        </div>
        <div className="centerAction"><a className="buttonDark" href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">View All Posts on Telegram <ArrowRight size={14} /></a></div>
      </section>

      <section className="showroom" id="showroom">
        <div className="shell showroomGrid">
          <div className="mapGraphic"><MapPin size={38} strokeWidth={1.2} /><span>Addis Ababa · Ethiopia</span></div>
          <div className="showroomCopy">
            <span className="sectionIndex">Our Location</span>
            <h2>Visit Our Showroom</h2>
            <p>Looking for a face-to-face consultation? Verify a vehicle logbook or discuss a premium inquiry at our office.</p>
            <strong>Beki AutoCar Showroom</strong>
            <a className="textLink" href="https://maps.google.com/?q=9.0054,38.7636" target="_blank" rel="noreferrer">Open in Maps <ArrowRight size={13} /></a>
            <div className="showroomFacts">
              <div><Clock3 size={16} /><span><b>Working Hours</b>Monday – Saturday: 8:00 – 7:00<br />Sunday: By Appointment</span></div>
              <div><Phone size={16} /><span><b>Direct Line</b><a href="tel:+251912387513">0912 387 513</a><br />Also: 0949 322 969</span></div>
              <div><MessageCircle size={16} /><span><b>Telegram</b><a href="https://t.me/Beckyyyyyy" target="_blank" rel="noreferrer">@Beckyyyyyy</a><br />Fastest response channel</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="founder section shell">
        <div className="founderMark">BB</div>
        <div><span className="sectionIndex">Premium Car Brokerage · Ethiopia</span><h2>Bereket Beshir</h2><strong>Founder, Owner & Manager</strong><p>Leading BEKI AUTOCAR to deliver the most reliable, transparent, and trusted automotive marketplace experience in Addis Ababa and throughout Ethiopia.</p><div className="socialLinks"><a href="https://wa.me/251912387513" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://t.me/Beckyyyyyy" target="_blank" rel="noreferrer">Telegram</a><a href="https://www.instagram.com/bekiautocar" target="_blank" rel="noreferrer">Instagram</a></div></div>
      </section>

      <section className="contactBand" id="inquire">
        <div className="shell contactGrid">
          <div className="contactCopy">
            <span className="sectionIndex">Direct Contact</span><h2>Get in Touch with Us</h2><p>Have questions about a vehicle? Reach out directly through our social channels or drop us a fast inquiry.</p>
            <div className="contactCards">
              <a href="https://wa.me/251912387513" target="_blank" rel="noreferrer"><MessageCircle size={16} /><span><b>WhatsApp</b>+251 912 387 513</span></a>
              <a href="https://t.me/Beckyyyyyy" target="_blank" rel="noreferrer"><MessageCircle size={16} /><span><b>Telegram</b>@Beckyyyyyy</span></a>
              <a href="https://www.instagram.com/bekiautocar" target="_blank" rel="noreferrer"><Instagram size={16} /><span><b>Instagram</b>@bekiautocar</span></a>
              <a href="https://www.facebook.com/bekiautocar" target="_blank" rel="noreferrer"><Facebook size={16} /><span><b>Facebook</b>Beki Auto Car</span></a>
            </div>
            <div className="phoneRow"><a href="tel:+251912387513">0912 387 513</a><a href="tel:+251949322969">0949 322 969</a></div>
          </div>
          <form className="inquiryForm" onSubmit={submitInquiry}>
            <h3>Send a Direct Inquiry</h3><p>We respond within a few hours via your preferred channel.</p>
            <label>Full Name<input required name="name" placeholder="Your full name" /></label>
            <label>Phone Number<input required name="phone" placeholder="09..." inputMode="tel" /></label>
            <label>Vehicle of Interest<input name="vehicle" placeholder="e.g. Toyota Hilux Revo" /></label>
            <label>Your Message<textarea name="message" rows={4} placeholder="Tell us what you need" /></label>
            <button className="buttonPrimary" type="submit">Submit Inquiry <ArrowRight size={14} /></button>
          </form>
        </div>
      </section>

      <section className="knowledge section shell" id="about-market">
        <div className="knowledgeHead"><span className="sectionIndex">Original Market Guide</span><h2>Everything from the original Beki AutoCar page.</h2><p>The full English and Amharic automotive guide, finance notes, EV guidance, FAQs, search terms, and service-area information are retained below without rewriting.</p></div>
        <div className="knowledgeGrid"><article><ContentStream content={seoEnglish} /></article><article lang="am"><ContentStream content={seoAmharic} /></article></div>
        <div className="faqPanel"><ContentStream content={faq} /></div>
        <div className="seoTail"><ContentStream content={seoTail} /></div>
      </section>

      <footer>
        <div className="shell footerTop">
          <div className="footerBrand"><Logo /><span>Premium Mobility Brokerage · Ethiopia</span><p>Ethiopia&apos;s most trusted automotive brokerage. Sourcing pristine luxury vehicles from Japan, UAE, and Europe with unmatched discretion and legal safety.</p></div>
          <div><strong>Navigation</strong><a href="#top">Home</a><a href="#services">Services</a><a href="#cars">Cars</a><a href="#updates">Updates</a><a href="#inquire">Contact</a></div>
          <div><strong>Services</strong><a href="#services">Import Sourcing</a><a href="#services">Car Rentals</a><a href="#services">Commission Works</a><a href="#showroom">Visit Showroom</a></div>
          <div><strong>Contact</strong><a href="tel:+251912387513">0912 387 513</a><a href="tel:+251949322969">0949 322 969</a><a href="https://t.me/Beckyyyyyy" target="_blank" rel="noreferrer">@Beckyyyyyy</a><a href="https://t.me/bekiautocar" target="_blank" rel="noreferrer">@bekiautocar</a></div>
        </div>
        <div className="shell footerBottom"><span>© 2025 Beki AutoCar. All rights reserved. · Addis Ababa, Ethiopia</span><span>Crafted by <a href="tel:+251924093037">Mahir Aman</a> · 0924 093 037</span></div>
      </footer>

      {searchOpen && <div className="overlay" onMouseDown={() => setSearchOpen(false)}><div className="searchDrawer" onMouseDown={(e) => e.stopPropagation()}><button className="modalClose" onClick={() => setSearchOpen(false)}><X size={17} /></button><div className="eyebrow"><span /> Popular Searches</div><h2>Browse By</h2><label className="searchBox large"><Search size={17} /><input autoFocus placeholder="Search make, model, or fuel type" onChange={(e) => { setQuery(e.target.value); }} /></label><div className="searchSuggestions">{["Toyota Hilux Revo","Hyundai Tucson","Toyota Vitz","Suzuki Dzire","Toyota Corolla","Electric Vehicles","For Rent"].map((s) => <button key={s} onClick={() => { setQuery(s.replace(" Vehicles", "")); setSearchOpen(false); document.getElementById("cars")?.scrollIntoView(); }}>{s}</button>)}</div><p>No vehicles found</p><small>Try a different make, model, or fuel type</small><a className="textLink" href="#cars" onClick={() => setSearchOpen(false)}>See all →</a></div></div>}

      {selectedCar && <div className="overlay" onMouseDown={() => setSelectedCar(null)}><article className="carModal" onMouseDown={(e) => e.stopPropagation()}><button className="modalClose" onClick={() => setSelectedCar(null)}><X size={17} /></button><span className="sectionIndex">{selectedCar.category === "sale" ? "For Sale" : "For Rent"}</span><h2>{selectedCar.year} {selectedCar.make} {selectedCar.model}</h2><div className="modalPrice">{selectedCar.priceLabel}</div><p>{selectedCar.desc}</p><div className="modalSpecs">{[["Transmission",selectedCar.transmission],["Fuel",selectedCar.fuel],["Mileage",selectedCar.mileage],["Body",selectedCar.bodyType],["Engine",selectedCar.engine],["Drive",selectedCar.driveType],["Fuel economy",selectedCar.gasMileage],["Plate",selectedCar.plateNo],["Condition",selectedCar.condition],["Origin",selectedCar.origin]].filter(([,v])=>v).map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div>{selectedCar.features && <div className="featureList"><h3>Key Features & Highlights</h3>{selectedCar.features.map((f)=><span key={f}><CircleCheck size={13}/>{f}</span>)}</div>}{selectedCar.telegramNote && <p lang="am" className="telegramNote">{selectedCar.telegramNote}</p>}<div className="modalActions"><a className="buttonPrimary" href="#inquire" onClick={()=>setSelectedCar(null)}>Send Inquiry <ArrowRight size={13}/></a><a className="buttonDark" href={selectedCar.telegramLink || "https://t.me/Beckyyyyyy"} target="_blank" rel="noreferrer">Message on Telegram <MessageCircle size={13}/></a></div></article></div>}

      {authOpen && <div className="overlay" onMouseDown={() => setAuthOpen(false)}><div className="authModal" onMouseDown={(e) => e.stopPropagation()}><button className="modalClose" onClick={() => setAuthOpen(false)}><X size={17}/></button><div className="authBrand">BEKI AUTOCAR<small>Premium Mobility Brokerage</small></div><h3>Welcome back</h3><p>Sign in to view full vehicle details, prices & seller contact.</p><div className="roleCards"><button><UserRound size={16}/><span>I&apos;m a Buyer<small>Browse & inquire</small></span></button><button><Car size={16}/><span>I&apos;m a Seller<small>List my vehicle</small></span></button></div><label>Full Name<input placeholder="Full Name" /></label><span className="validationCopy">Please enter your name.</span><label>Email Address<input type="email" placeholder="Email Address" /></label><span className="validationCopy">Enter a valid email address.</span><label>Phone Number<input placeholder="Phone Number" /></label><span className="validationCopy">Enter a valid Ethiopian phone number.</span><label>Password<input type="password" placeholder="Password" /></label><span className="validationCopy">At least 6 characters.</span><button className="buttonPrimary">Sign In <ArrowRight size={13}/></button><p className="terms">By creating an account you agree to Beki AutoCar&apos;s terms & privacy policy.</p><div className="createAccount"><span>New to Beki AutoCar?</span><button>Create an account</button></div><div className="accountPreview"><div>Signed in as<strong>—</strong><span>Buyer</span></div><div><b>0</b><small>Saved</small></div><div><b>0</b><small>Viewed</small></div><div><b>0</b><small>Inquiries</small></div><button>Sign Out</button></div></div></div>}

      {inquirySent && <div className="overlay" onMouseDown={() => setInquirySent(false)}><div className="successModal" onMouseDown={(e) => e.stopPropagation()}><CircleCheck size={34}/><p>Inquiry Received</p><h2>Thank You</h2><p>Your inquiry has been sent to Beki AutoCar. We&apos;ll reach out to you shortly — we value every minute of your time.</p><button className="buttonDark" onClick={() => setInquirySent(false)}>Close</button></div></div>}
    </main>
  );
}
