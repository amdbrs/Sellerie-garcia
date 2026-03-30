import { useState, useEffect, useRef, createContext, useContext } from "react";
import "./App.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, Check, Car, Bike, Ship, Sofa, Scissors, Layers, User, Heart, Building2, Dumbbell, Plane, Anchor, MapPin, Instagram, Globe } from "lucide-react";

// Logo García
const LOGO_URL = "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/8bv8bi5b_IMG_0328.png";

// Images - Photos réelles de l'atelier García avec alt SEO
const IMAGES = {
  hero: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/qq7o0n5l_c54073aa-0c4a-4010-b537-cb187736a669.jpeg", alt: "Atelier Garcia sellerie Yzeure - vue d'ensemble" },
  atelier: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/mhes5mb7_1bb1be00-9a9c-409b-a3de-f9106431bc78.jpeg", alt: "Atelier Garcia sellerie Yzeure" },
  atelierLarge: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/qq7o0n5l_c54073aa-0c4a-4010-b537-cb187736a669.jpeg", alt: "Atelier Garcia sellerie garniture Yzeure Moulins" },
  mobilier: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/605pbkna_9536c389-9b10-4d20-93ed-ec901be33974.jpeg", alt: "Restauration canapé Chesterfield cuir capitonné Yzeure Moulins Allier" },
  vespa: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/ecmsqvii_8d951b09-7e1b-4270-a7ad-c28b525b627d.jpeg", alt: "Confection selle Vespa personnalisée Moulins" },
  motoSport: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/m75tu18a_795c9272-3bc1-4bfe-8fce-d420776783c8.jpeg", alt: "Confection selle moto sport personnalisée Allier" },
  couture: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/nvf1p6p8_c13492b3-b3ec-4389-82ac-e944a39d0699.jpeg", alt: "Couture cuir artisanale sellerie Garcia" },
  coutureCuirMarron: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/my9739q8_0b43e4fd-f93b-4883-ab81-5128b866ce01.jpeg", alt: "Travail du cuir marron atelier Yzeure" },
  siegesOrange: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/9uzitjl3_09cc7c17-d8b6-498b-8d02-72e975df5aa9.jpeg", alt: "Restauration siège auto cuir bicolore Allier" },
  selleHonda: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/d3e1lvkw_5658f4c1-c989-4b32-ae3a-11724c4689d4.jpeg", alt: "Confection selle Honda personnalisée logo brodé" },
  artisanTravail: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/lt2nrwqs_IMG_0322.jpeg", alt: "Artisan sellier Garcia au travail Yzeure" },
  automobile: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/xyya385f_cb4b354d-ebe0-4806-8046-d301dc377a9b.jpeg", alt: "Restauration siège auto cuir Allier" },
  moto: { url: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/0l64azwa_IMG_0325.jpeg", alt: "Confection selle moto personnalisée Moulins" },
  nautisme: { url: "https://images.unsplash.com/photo-1753295687822-b7785d55c24e?w=800&q=80", alt: "Sellerie nautique bateau Allier" }
};

// Translations
const translations = {
  fr: {
    nav: { accueil: "Accueil", services: "Services", galerie: "Galerie", contact: "Contact" },
    hero: {
      badge: "Artisan Sellier Garnisseur",
      title1: "Donnez une seconde vie à vos",
      title2: "intérieurs",
      title3: "et",
      title4: "équipements",
      desc: "Un seul artisan, de la découpe à la couture finale. Un travail d'orfèvre pour des réalisations uniques en cuir, Alcantara et matériaux premium.",
      cta: "Demander un devis gratuit"
    },
    services: {
      badge: "Mon Savoir-Faire",
      title: "Quatre domaines d'",
      titleHighlight: "excellence",
      desc: "De l'automobile au mobilier, chaque projet bénéficie d'un savoir-faire artisanal et de matériaux premium pour un résultat durable et unique.",
      automobile: { title: "Automobile", desc: "Redonnez vie à l'intérieur de votre véhicule avec un travail sur-mesure.", features: ["Réfection de sièges", "Ciels de toit", "Panneaux de portes"] },
      moto: { title: "Moto", desc: "Confort et style personnalisé pour vos deux-roues.", features: ["Selles confort", "Pose de gel", "Personnalisation", "Réparations"] },
      nautisme: { title: "Nautisme", desc: "Protégez et embellissez votre bateau avec des finitions marines.", features: ["Bains de soleil", "Selleries marines", "Tauds de protection", "Coussins sur-mesure"] },
      mobilier: { title: "Mobilier", desc: "Restauration et création de mobilier avec des matériaux nobles.", features: ["Fauteuils", "Canapés", "Tables médicales", "Équipements sportifs"] }
    },
    engagement: {
      badge: "L'Engagement Artisan",
      title: "Un travail d'",
      titleHighlight: "orfèvre",
      titleEnd: ", de A à Z",
      p1: "De la découpe à la couture finale, chaque projet passe uniquement entre mes mains. Cette approche garantit une attention méticuleuse aux détails et une cohérence parfaite tout au long du processus.",
      p2: "Seul à l'atelier, je prends le temps nécessaire pour comprendre vos besoins, sélectionner les meilleurs matériaux et réaliser un travail sur-mesure qui dépassera vos attentes. Chaque pièce est unique, durable et pensée pour vous.",
      suppliers: "Fournisseurs Certifiés",
      suppliersDesc: "Je sélectionne exclusivement des tissus et cuirs provenant de",
      suppliersHighlight: "fournisseurs professionnels français et européens",
      suppliersEnd: ", répondant aux normes spécifiques de chaque secteur.",
      cta: "Demander un devis gratuit",
      sectors: "Secteurs & Normes",
      myEngagement: "Mon Engagement",
      features: {
        artisanal: { title: "Travail artisanal", desc: "Chaque pièce est travaillée à la main avec précision et passion" },
        premium: { title: "Matériaux premium", desc: "Cuir pleine fleur, Alcantara et tissus techniques de haute qualité" },
        unique: { title: "Interlocuteur unique", desc: "Un seul artisan de A à Z pour garantir la cohérence du projet" }
      },
      norms: {
        medical: { title: "Médical & Bien-être", desc: "Tissus antibactériens, antifongiques et résistants aux produits de désinfection" },
        public: { title: "Espaces Publics", desc: "Normes non-feu M1/M2 pour cinémas, hôtels et restaurants" },
        sport: { title: "Sport & Fitness", desc: "Haute résistance à l'abrasion et à la transpiration" },
        transport: { title: "Transport & Mobilité", desc: "Homologation automobile, aviation et ferroviaire" },
        nautisme: { title: "Nautisme", desc: "Traitements anti-UV et résistance à la salinité" }
      }
    },
    gallery: {
      badge: "Portfolio",
      title: "Galerie de ",
      titleHighlight: "réalisations",
      desc: "Découvrez quelques exemples de projets réalisés avec passion et précision",
      all: "Tous"
    },
    contact: {
      badge: "Contact",
      title: "Parlons de votre ",
      titleHighlight: "projet",
      desc: "Que ce soit pour une rénovation, une création sur-mesure ou un simple conseil, je suis à votre écoute.",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse",
      instagram: "Instagram",
      formTitle: "Demande de devis",
      name: "Nom complet",
      emailField: "Email",
      phoneField: "Téléphone",
      projectType: "Type de projet",
      selectType: "Sélectionnez un type",
      message: "Message",
      submit: "Envoyer ma demande",
      sending: "Envoi en cours...",
      success: "Demande envoyée !",
      successDesc: "Je vous recontacte très rapidement."
    },
    footer: "Tous droits réservés."
  },
  en: {
    nav: { accueil: "Home", services: "Services", galerie: "Gallery", contact: "Contact" },
    hero: {
      badge: "Artisan Upholsterer",
      title1: "Give a second life to your",
      title2: "interiors",
      title3: "and",
      title4: "equipment",
      desc: "One craftsman, from cutting to final stitching. Meticulous work for unique creations in leather, Alcantara and premium materials.",
      cta: "Request a free quote"
    },
    services: {
      badge: "My Expertise",
      title: "Four areas of ",
      titleHighlight: "excellence",
      desc: "From automotive to furniture, each project benefits from artisanal know-how and premium materials for a durable and unique result.",
      automobile: { title: "Automotive", desc: "Bring your vehicle's interior back to life with custom work.", features: ["Seat restoration", "Headliners", "Door panels"] },
      moto: { title: "Motorcycle", desc: "Comfort and personalized style for your two-wheelers.", features: ["Comfort seats", "Gel installation", "Customization", "Repairs"] },
      nautisme: { title: "Marine", desc: "Protect and beautify your boat with marine finishes.", features: ["Sun pads", "Marine upholstery", "Covers", "Custom cushions"] },
      mobilier: { title: "Furniture", desc: "Restoration and creation of furniture with noble materials.", features: ["Armchairs", "Sofas", "Medical tables", "Sports equipment"] }
    },
    engagement: {
      badge: "Artisan Commitment",
      title: "Meticulous ",
      titleHighlight: "craftsmanship",
      titleEnd: " from A to Z",
      p1: "From cutting to final stitching, each project passes only through my hands. This approach guarantees meticulous attention to detail and perfect consistency throughout the process.",
      p2: "Alone in the workshop, I take the time needed to understand your needs, select the best materials and create custom work that will exceed your expectations. Each piece is unique, durable and designed for you.",
      suppliers: "Certified Suppliers",
      suppliersDesc: "I exclusively select fabrics and leathers from",
      suppliersHighlight: "French and European professional suppliers",
      suppliersEnd: ", meeting the specific standards of each sector.",
      cta: "Request a free quote",
      sectors: "Sectors & Standards",
      myEngagement: "My Commitment",
      features: {
        artisanal: { title: "Artisan work", desc: "Each piece is handcrafted with precision and passion" },
        premium: { title: "Premium materials", desc: "Full grain leather, Alcantara and high quality technical fabrics" },
        unique: { title: "Single contact", desc: "One craftsman from A to Z to ensure project consistency" }
      },
      norms: {
        medical: { title: "Medical & Wellness", desc: "Antibacterial, antifungal fabrics resistant to disinfection products" },
        public: { title: "Public Spaces", desc: "Fire-retardant standards M1/M2 for cinemas, hotels and restaurants" },
        sport: { title: "Sport & Fitness", desc: "High resistance to abrasion and perspiration" },
        transport: { title: "Transport & Mobility", desc: "Automotive, aviation and railway certification" },
        nautisme: { title: "Marine", desc: "Anti-UV treatments and salt resistance" }
      }
    },
    gallery: {
      badge: "Portfolio",
      title: "Gallery of ",
      titleHighlight: "achievements",
      desc: "Discover some examples of projects made with passion and precision",
      all: "All"
    },
    contact: {
      badge: "Contact",
      title: "Let's talk about your ",
      titleHighlight: "project",
      desc: "Whether for a renovation, custom creation or simple advice, I'm here to help.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      instagram: "Instagram",
      formTitle: "Quote request",
      name: "Full name",
      emailField: "Email",
      phoneField: "Phone",
      projectType: "Project type",
      selectType: "Select a type",
      message: "Message",
      submit: "Send my request",
      sending: "Sending...",
      success: "Request sent!",
      successDesc: "I'll get back to you very soon."
    },
    footer: "All rights reserved."
  }
};

// Language Context
const LanguageContext = createContext();

const useLanguage = () => useContext(LanguageContext);

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// Animated Section Wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Badge Component
const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 bg-mint text-dark px-4 py-2 text-xs font-semibold tracking-wider uppercase">
    <span className="w-2 h-2 bg-dark rounded-full"></span>
    {children}
  </span>
);

// Icon Box Component
const IconBox = ({ icon: Icon, rotated = false }) => (
  <div className={`w-14 h-14 bg-mint flex items-center justify-center ${rotated ? 'rotate-12' : ''}`}>
    <Icon size={24} className="text-dark" strokeWidth={1.5} />
  </div>
);

// Gallery data - Photos réelles avec traductions FR/EN
const galleryItemsData = [
  { id: 1, titleFr: "Renault 15", titleEn: "Renault 15", descFr: "Sellerie custom simili noir et orange (orange carrosserie d'origine)", descEn: "Custom black and orange faux leather upholstery (original body orange)", category: "Automobile", image: IMAGES.siegesOrange.url },
  { id: 2, titleFr: "Triumph TR5", titleEn: "Triumph TR5", descFr: "Intérieur d'origine (rembourrage des sièges d'origines)", descEn: "Original interior (original seat padding restoration)", category: "Automobile", image: IMAGES.automobile.url },
  { id: 3, titleFr: "Clio 3 RS F1 Team", titleEn: "Clio 3 RS F1 Team", descFr: "Réfection des sièges Recaro", descEn: "Recaro seats restoration", category: "Automobile", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/xnpdtgc2_85df2709-64ae-4e70-a5a7-6651dd092afa.jpeg" },
  { id: 4, titleFr: "Triumph Thruxton 1200cc", titleEn: "Triumph Thruxton 1200cc", descFr: "Selle custom", descEn: "Custom seat", category: "Moto", image: IMAGES.moto.url },
  { id: 5, titleFr: "Ténéré 660 XTZ", titleEn: "Tenere 660 XTZ", descFr: "Selle custom", descEn: "Custom seat", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/xr1tbd6y_3f71fae7-8f3a-4a33-9482-245c7abd23fb.jpeg" },
  { id: 6, titleFr: "Selle atelier", titleEn: "Workshop seat", descFr: "Finition noire surpiqûres blanches", descEn: "Black finish with white stitching", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/dm4i0cr9_5a197c46-ec92-43e6-aabc-b85b190f3a72.jpeg" },
  { id: 7, titleFr: "Selle XSR 700", titleEn: "XSR 700 seat", descFr: "Matelassé losange passepoil rouge", descEn: "Diamond quilted with red piping", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/5ue4fayp_640e8d16-28ac-4af9-b659-33ec2da70ed7.jpeg" },
  { id: 8, titleFr: "Honda 250 XL", titleEn: "Honda 250 XL", descFr: "Réfection selle à l'origine", descEn: "Original seat restoration", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/pelx1f4o_117fd8e4-1117-4a50-9743-8978aeb3002a.jpeg" },
  { id: 9, titleFr: "Peugeot 206", titleEn: "Peugeot 206", descFr: "Dossier en cuir noir (réparation flanc gauche)", descEn: "Black leather backrest (left side repair)", category: "Automobile", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/qwclrlqu_b1972168-c7c8-47f8-b965-9e74101116eb.jpeg" },
  { id: 10, titleFr: "Mobylette", titleEn: "Moped", descFr: "Selle refaite à neuf", descEn: "Seat restored to new", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/fmfm2hei_66126ab0-5d22-4830-9d7b-fc36198c8925.jpeg" },
  { id: 11, titleFr: "Canapé cuir", titleEn: "Leather sofa", descFr: "Rembourrage méridienne", descEn: "Chaise longue padding", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/cjun3hwq_331946c3-7fd4-4fa8-84b2-afabf46544c3.jpeg" },
  { id: 12, titleFr: "Canapé tissu blanc cassé", titleEn: "Off-white fabric sofa", descFr: "Nettoyage et remise en état", descEn: "Cleaning and restoration", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/o2cna4ll_dfdd06b4-2bb1-46ba-9d1d-5b8f0240bb2a.jpeg" },
  { id: 13, titleFr: "Fauteuil d'attente", titleEn: "Waiting room armchair", descFr: "Assise refaite à neuf", descEn: "Seat restored to new", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/965aw8nd_c9fc077a-e22f-4f7f-96d3-4f5ec677f912.jpeg" },
  { id: 14, titleFr: "Chaises restaurées", titleEn: "Restored chairs", descFr: "Assises en simili cuir noir", descEn: "Black faux leather seats", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/m977ytlo_beff6e02-660e-488a-864f-94ccc741d303.jpeg" },
  { id: 15, titleFr: "Canapé Chesterfield", titleEn: "Chesterfield sofa", descFr: "Restauration cuir capitonné marron", descEn: "Brown tufted leather restoration", category: "Mobilier", image: IMAGES.mobilier.url }
];

// Navigation Component
const Navigation = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "accueil", label: t.nav.accueil },
    { id: "services", label: t.nav.services },
    { id: "galerie", label: t.nav.galerie },
    { id: "contact", label: t.nav.contact }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-dark/90 backdrop-blur-xl" : "bg-transparent"}`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="cursor-pointer" 
            onClick={() => scrollToSection("accueil")} 
            data-testid="logo-link"
            whileHover={{ scale: 1.05 }}
          >
            <img src={LOGO_URL} alt="García Sellerie" className="h-14 w-14 rounded-full object-cover" />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide transition-colors duration-300 ${activeSection === item.id ? "text-mint" : "text-light/80 hover:text-light"}`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-2 text-sm text-light/60 hover:text-mint transition-colors border border-light/20 px-3 py-1.5 hover:border-mint/50"
              data-testid="lang-toggle"
            >
              <Globe size={14} />
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-light/60 hover:text-mint transition-colors border border-light/20 px-2 py-1 text-xs"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              className="text-light p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-dark/95 backdrop-blur-xl"
              data-testid="mobile-menu"
            >
              <div className="py-4">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }}
                    className="block w-full text-left py-3 px-4 text-light/80 hover:text-mint transition-colors"
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = ({ scrollToSection }) => {
  const { t } = useLanguage();
  return (
  <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img src={IMAGES.hero.url} alt={IMAGES.hero.alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-dark/70" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
      <AnimatedSection>
        <motion.div variants={fadeUp} className="mb-8">
          <Badge>{t.hero.badge}</Badge>
        </motion.div>
        
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-[1.1] mb-8 max-w-4xl">
          {t.hero.title1}{" "}
          <span className="text-mint">{t.hero.title2}</span> {t.hero.title3}{" "}
          <span className="text-mint">{t.hero.title4}</span>
        </motion.h1>
        
        <motion.p variants={fadeUp} className="text-light/70 text-lg max-w-2xl leading-relaxed mb-10">
          {t.hero.desc}
        </motion.p>
        
        <motion.button
          variants={fadeUp}
          onClick={() => scrollToSection("contact")}
          className="group bg-mint text-dark px-8 py-4 font-semibold hover:bg-mint/90 transition-all duration-300 inline-flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="hero-cta-btn"
        >
          {t.hero.cta}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </motion.button>
      </AnimatedSection>
    </div>
  </section>
  );
};

// Services Section
const ServicesSection = () => {
  const { t } = useLanguage();
  
  const servicesData = [
    {
      id: "automobile",
      title: t.services.automobile.title,
      description: t.services.automobile.desc,
      image: IMAGES.automobile.url,
      imageAlt: IMAGES.automobile.alt,
      icon: Car,
      features: t.services.automobile.features
    },
    {
      id: "moto",
      title: t.services.moto.title,
      description: t.services.moto.desc,
      image: IMAGES.moto.url,
      imageAlt: IMAGES.moto.alt,
      icon: Bike,
      features: t.services.moto.features
    },
    {
      id: "nautisme",
      title: t.services.nautisme.title,
      description: t.services.nautisme.desc,
      image: IMAGES.nautisme.url,
      imageAlt: IMAGES.nautisme.alt,
      icon: Ship,
      features: t.services.nautisme.features
    },
    {
      id: "mobilier",
      title: t.services.mobilier.title,
      description: t.services.mobilier.desc,
      image: IMAGES.mobilier.url,
      imageAlt: IMAGES.mobilier.alt,
      icon: Sofa,
      features: t.services.mobilier.features
    }
  ];

  return (
  <section id="services" className="py-24 bg-dark" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <AnimatedSection>
        <motion.div variants={fadeUp} className="mb-6">
          <Badge>{t.services.badge}</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-6">
          {t.services.title}<span className="text-mint">{t.services.titleHighlight}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-light/60 max-w-2xl mb-16 text-lg">
          {t.services.desc}
        </motion.p>
      </AnimatedSection>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-dark-lighter border border-light/10 overflow-hidden hover:border-mint/30 transition-colors duration-300"
            data-testid={`service-card-${service.id}`}
          >
            {/* Image with Icon */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <IconBox icon={service.icon} rotated />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-light mb-3">{service.title}</h3>
              <p className="text-light/60 mb-6">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-light/80">
                    <Check size={18} className="text-mint flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

// Engagement Section
const EngagementSection = () => {
  const { lang, t } = useLanguage();
  
  const sectorsNorms = [
    { icon: Heart, title: t.engagement.norms.medical.title, description: t.engagement.norms.medical.desc },
    { icon: Building2, title: t.engagement.norms.public.title, description: t.engagement.norms.public.desc },
    { icon: Dumbbell, title: t.engagement.norms.sport.title, description: t.engagement.norms.sport.desc },
    { icon: Plane, title: t.engagement.norms.transport.title, description: t.engagement.norms.transport.desc },
    { icon: Anchor, title: t.engagement.norms.nautisme.title, description: t.engagement.norms.nautisme.desc }
  ];

  const features = [
    { icon: Scissors, title: t.engagement.features.artisanal.title, description: t.engagement.features.artisanal.desc },
    { icon: Layers, title: t.engagement.features.premium.title, description: t.engagement.features.premium.desc },
    { icon: User, title: t.engagement.features.unique.title, description: t.engagement.features.unique.desc }
  ];

  return (
    <section id="engagement" className="py-24 bg-dark" data-testid="engagement-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-6">
              <Badge>{t.engagement.badge}</Badge>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-8 leading-tight">
              {t.engagement.title}<span className="text-mint">{t.engagement.titleHighlight}</span>{t.engagement.titleEnd}
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-light/70 mb-6 text-lg leading-relaxed">
              {t.engagement.p1}
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-light/70 mb-10 text-lg leading-relaxed">
              {t.engagement.p2}
            </motion.p>

            {/* Sourcing Info */}
            <motion.div variants={fadeUp} className="bg-dark-lighter border border-mint/20 p-6 mb-6">
              <p className="text-mint font-semibold text-sm tracking-wider uppercase mb-3">{t.engagement.suppliers}</p>
              <p className="text-light/70 text-sm leading-relaxed mb-6">
                {t.engagement.suppliersDesc} <span className="text-light">{t.engagement.suppliersHighlight}</span>{t.engagement.suppliersEnd}
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-mint text-dark px-6 py-3 font-semibold text-sm hover:bg-mint/90 transition-all duration-300 inline-flex items-center gap-2"
              >
                {t.engagement.cta}
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Artisan Photo - under Fournisseurs */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden"
            >
              <img
                src={IMAGES.artisanTravail.url}
                alt={IMAGES.artisanTravail.alt}
                className="w-full h-72 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-dark/80 backdrop-blur-sm p-4">
                <p className="text-light/80 text-sm">{lang === 'fr' ? "L'artisan au travail dans son atelier" : "The craftsman at work in his workshop"}</p>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Right Content - Sectors & Norms */}
          <div className="space-y-4">
            <p className="text-light font-semibold text-sm tracking-wider uppercase mb-4">{t.engagement.sectors}</p>
            {sectorsNorms.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors"
                data-testid={`sector-${index}`}
              >
                <div className="w-10 h-10 bg-mint/20 flex items-center justify-center flex-shrink-0">
                  <sector.icon size={20} className="text-mint" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-light font-semibold text-sm mb-1">{sector.title}</h4>
                  <p className="text-light/60 text-xs">{sector.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Features */}
            <div className="pt-4 space-y-4">
              <p className="text-light font-semibold text-sm tracking-wider uppercase mb-4">{t.engagement.myEngagement}</p>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
                  className="flex gap-4 p-4 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors"
                  data-testid={`feature-${index}`}
                >
                  <IconBox icon={feature.icon} />
                  <div>
                    <h4 className="text-light font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-light/60 text-xs">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const { lang, t } = useLanguage();
  const allLabel = t.gallery.all;
  const [filter, setFilter] = useState("__all__");
  const categories = ["__all__", "Automobile", "Moto", "Nautisme", "Mobilier"];

  // Build gallery items with translations
  const galleryItems = galleryItemsData.map(item => ({
    ...item,
    title: lang === 'fr' ? item.titleFr : item.titleEn,
    desc: lang === 'fr' ? item.descFr : item.descEn
  }));

  const filteredItems = filter === "__all__" ? galleryItems : galleryItems.filter(item => item.category === filter);

  // Get display label for filter button
  const getFilterLabel = (cat) => cat === "__all__" ? allLabel : cat;

  return (
    <section id="galerie" className="py-24 bg-dark-lighter" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-6">
            <Badge>{t.gallery.badge}</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-6">
            {t.gallery.title}<span className="text-mint">{t.gallery.titleHighlight}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-light/60 max-w-xl mb-12 text-lg">
            {t.gallery.desc}
          </motion.p>
        </AnimatedSection>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${filter === cat ? "bg-mint text-dark" : "border border-light/20 text-light/70 hover:border-mint hover:text-mint"}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`filter-${cat.toLowerCase()}`}
            >
              {getFilterLabel(cat)}
            </motion.button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
                data-testid={`gallery-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/70 transition-colors duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-mint text-xs font-semibold tracking-wider uppercase mb-1">{item.category}</p>
                  <h4 className="text-light font-bold">{item.title}</h4>
                  <p className="text-light/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { lang, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    const formData = new FormData(formRef.current);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        formRef.current.reset();
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(true);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-dark" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-4 md:mb-6">
              <Badge>{t.contact.badge}</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-light mb-6 md:mb-8">
              {t.contact.title}<span className="text-mint">{t.contact.titleHighlight}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-light/60 mb-8 md:mb-10 text-base md:text-lg">
              {t.contact.desc}
            </motion.p>
            
            <motion.div variants={fadeUp} className="space-y-3">
              <a href="tel:0643320178" className="group flex items-center gap-4 p-4 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-phone">
                <IconBox icon={Phone} />
                <div>
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">{t.contact.phone}</p>
                  <p className="text-light text-base font-semibold">06 43 32 01 78</p>
                </div>
              </a>
              
              <a href="mailto:selleriegarniture.garcia@gmail.com" className="group flex items-center gap-4 p-4 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-email">
                <IconBox icon={Mail} />
                <div className="min-w-0">
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">{t.contact.email}</p>
                  <p className="text-light text-sm font-semibold truncate">selleriegarniture.garcia@gmail.com</p>
                </div>
              </a>

              <a href="https://maps.google.com/?q=21+bis+rue+du+8+mai+Yzeure+03400" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-address">
                <IconBox icon={MapPin} />
                <div>
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">{t.contact.address}</p>
                  <p className="text-light text-sm font-semibold">21 bis rue du 8 mai, 03400 Yzeure</p>
                </div>
              </a>

              <a href="https://instagram.com/sellerie_garcia" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-instagram">
                <IconBox icon={Instagram} />
                <div>
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">{t.contact.instagram}</p>
                  <p className="text-light text-base font-semibold">@sellerie_garcia</p>
                </div>
              </a>
            </motion.div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="bg-dark-lighter border border-light/10 p-5 sm:p-6 md:p-8 lg:p-10" data-testid="contact-form-container">
              <h3 className="text-xl md:text-2xl font-bold text-light mb-6 md:mb-8">{t.contact.formTitle}</h3>
              
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 md:py-16"
                  data-testid="form-success"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-mint flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Check size={28} className="text-dark md:hidden" />
                    <Check size={32} className="text-dark hidden md:block" />
                  </div>
                  <p className="text-light text-lg md:text-xl font-bold mb-2">{t.contact.success}</p>
                  <p className="text-light/60 text-sm md:text-base">{t.contact.successDesc}</p>
                </motion.div>
              ) : (
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="space-y-4 md:space-y-6" 
                  data-testid="contact-form"
                >
                  {/* Web3Forms Hidden Fields */}
                  <input type="hidden" name="access_key" value="3919accd-c2c3-420f-8b8f-96a9408e7ae3" />
                  <input type="hidden" name="subject" value={lang === 'fr' ? 'Nouvelle demande de devis - García Sellerie' : 'New quote request - García Sellerie'} />
                  <input type="hidden" name="from_name" value="García Sellerie Garniture" />
                  <input type="checkbox" name="botcheck" className="hidden" />
                  
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">{t.contact.name} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={lang === 'fr' ? 'Votre nom complet' : 'Your full name'}
                      className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors placeholder:text-light/30"
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">{t.contact.emailField} *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={lang === 'fr' ? 'votre@email.com' : 'your@email.com'}
                        className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors placeholder:text-light/30"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">{t.contact.phoneField} *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder={lang === 'fr' ? '06 00 00 00 00' : '+33 6 00 00 00 00'}
                        className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors placeholder:text-light/30"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">{t.contact.projectType} *</label>
                    <select
                      name="project_type"
                      required
                      className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors cursor-pointer"
                      data-testid="select-project-type"
                    >
                      <option value="">{t.contact.selectType}</option>
                      <option value="Automobile">Automobile</option>
                      <option value="Moto">{lang === 'fr' ? 'Moto' : 'Motorcycle'}</option>
                      <option value="Nautisme">{lang === 'fr' ? 'Nautisme' : 'Marine'}</option>
                      <option value="Mobilier">{lang === 'fr' ? 'Mobilier' : 'Furniture'}</option>
                      <option value="Autre">{lang === 'fr' ? 'Autre' : 'Other'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">{t.contact.message} *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder={lang === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'}
                      className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors resize-none placeholder:text-light/30"
                      data-testid="input-message"
                    />
                  </div>

                  {submitError && (
                    <p className="text-red-400 text-sm">
                      {lang === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.'}
                    </p>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-mint text-dark py-3.5 md:py-4 font-semibold text-base hover:bg-mint/90 transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    data-testid="submit-btn"
                  >
                    {isSubmitting ? t.contact.sending : t.contact.submit}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { lang, t } = useLanguage();
  return (
  <footer className="bg-dark py-8 border-t border-light/10" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="García Sellerie" className="h-10 w-10 rounded-full object-cover" />
          <p className="text-light font-semibold">García Sellerie Garniture</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-light/40 text-sm">© 2024 García Sellerie Garniture. {t.footer}</p>
          <a 
            href="https://amdbrs.com/contact" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-light/30 text-xs hover:text-mint transition-colors"
          >
            {lang === 'fr' ? 'Site web designé et développé par' : 'Website designed and developed by'} Amaury De Barros
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState("accueil");
  const [lang, setLang] = useState("fr");
  const t = translations[lang];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["accueil", "services", "engagement", "galerie", "contact"];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className="App bg-dark min-h-screen" data-testid="app-container">
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
        <HeroSection scrollToSection={scrollToSection} />
        <ServicesSection />
        <EngagementSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
