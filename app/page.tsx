import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  ChevronRight,
  Gauge,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { CarArt } from "@/components/CarArt";
import { Logo } from "@/components/Logo";

const cars = [
  { name: "Toyota Land Cruiser", meta: "2024 · Automatic", price: "From 12.8M ETB", tag: "SUV", tone: "sand" },
  { name: "Mercedes-Benz C-Class", meta: "2023 · Automatic", price: "From 8.9M ETB", tag: "Sedan", tone: "silver" },
  { name: "Hyundai Tucson", meta: "2024 · Automatic", price: "From 6.2M ETB", tag: "Crossover", tone: "blue" },
];

export default function Home() {
  return (
    <main id="top">
      <header className="siteHeader">
        <div className="shell navInner">
          <Logo />
          <nav className="desktopNav" aria-label="Main navigation">
            <a href="#inventory">Inventory</a>
            <a href="#why-us">Why Beki</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="navCta" href="#inventory">Browse cars <ArrowRight size={13} /></a>
          <button className="menuButton" aria-label="Open menu"><Menu size={18} /></button>
        </div>
      </header>

      <section className="hero shell">
        <div className="heroCopy">
          <div className="eyebrow"><span /> Addis Ababa · Ethiopia</div>
          <h1>Cars, clearly<br />selected.</h1>
          <p>Quality vehicles. Verified details. A calmer way to choose your next car.</p>
          <div className="heroActions">
            <a className="buttonPrimary" href="#inventory">Explore inventory <ArrowRight size={14} /></a>
            <a className="textLink" href="#contact">Sell your car <ChevronRight size={14} /></a>
          </div>
          <div className="heroTrust">
            <div><strong>100%</strong><span>verified listings</span></div>
            <div><strong>01</strong><span>simple process</span></div>
            <div><strong>24/7</strong><span>digital browsing</span></div>
          </div>
        </div>
        <CarArt />
      </section>

      <section className="searchBand">
        <div className="shell searchPanel">
          <div className="searchLabel"><Search size={15} /><span>Find your car</span></div>
          <div className="searchField"><small>MAKE</small><strong>Any brand</strong><ChevronRight size={14} /></div>
          <div className="searchField"><small>TYPE</small><strong>Any body</strong><ChevronRight size={14} /></div>
          <div className="searchField"><small>BUDGET</small><strong>Any price</strong><ChevronRight size={14} /></div>
          <button className="searchButton">Search <ArrowRight size={14} /></button>
        </div>
      </section>

      <section className="section shell" id="inventory">
        <div className="sectionHead">
          <div><span className="sectionIndex">01 / INVENTORY</span><h2>Selected this week.</h2></div>
          <a className="textLink" href="#inventory">View all cars <ArrowRight size={14} /></a>
        </div>
        <div className="carGrid">
          {cars.map((car, index) => (
            <article className="carCard" key={car.name}>
              <div className={`miniCar ${car.tone}`}>
                <span className="carTag">{car.tag}</span>
                <div className="miniCarShape"><i /><b /></div>
                <span className="cardNumber">0{index + 1}</span>
              </div>
              <div className="carInfo">
                <div><h3>{car.name}</h3><p>{car.meta}</p></div>
                <div className="carPrice"><strong>{car.price}</strong><button aria-label={`Open ${car.name}`}><ArrowRight size={14} /></button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement" id="why-us">
        <div className="shell statementInner">
          <span className="statementIndex">02</span>
          <p>Buying a car should feel <em>considered</em>, not complicated.</p>
          <div className="statementNote">BEKI / APPROACH</div>
        </div>
      </section>

      <section className="section shell" id="services">
        <div className="sectionHead compact">
          <div><span className="sectionIndex">03 / WHY BEKI</span><h2>Small details. Better decisions.</h2></div>
        </div>
        <div className="featureGrid">
          <article><span><BadgeCheck size={17} /></span><h3>Verified vehicles</h3><p>Core details reviewed before a listing reaches you.</p></article>
          <article><span><ShieldCheck size={17} /></span><h3>Clear process</h3><p>Simple steps from discovery to final conversation.</p></article>
          <article><span><Gauge size={17} /></span><h3>Fast comparison</h3><p>Essential specs presented without the clutter.</p></article>
          <article><span><Wrench size={17} /></span><h3>After-sale support</h3><p>Practical guidance after you choose your vehicle.</p></article>
        </div>
      </section>

      <section className="experience shell">
        <div className="experienceVisual">
          <div className="experienceOrb"><CarFront size={36} strokeWidth={1.3} /></div>
          <span className="floatChip chipOne"><Sparkles size={12} /> Curated</span>
          <span className="floatChip chipTwo"><ShieldCheck size={12} /> Checked</span>
          <div className="gridMark" />
        </div>
        <div className="experienceCopy">
          <span className="sectionIndex">04 / EXPERIENCE</span>
          <h2>Less noise.<br />More confidence.</h2>
          <p>We designed Beki AutoCar around one idea: show the information that matters and make every next step obvious.</p>
          <a className="buttonDark" href="#contact">Talk to Beki <ArrowRight size={14} /></a>
        </div>
      </section>

      <footer id="contact">
        <div className="shell footerTop">
          <div><Logo /><p>Modern car discovery in Ethiopia.</p></div>
          <div className="footerCta"><span>Ready for the next one?</span><a href="mailto:hello@bekiautocar.com">Start a conversation <ArrowRight size={15} /></a></div>
        </div>
        <div className="shell footerBottom"><span>© 2026 Beki AutoCar</span><span>Addis Ababa, Ethiopia</span><span>Built for clarity.</span></div>
      </footer>
    </main>
  );
}
