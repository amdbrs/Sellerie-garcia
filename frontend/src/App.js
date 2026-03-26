import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, Check, Car, Bike, Ship, Sofa, Scissors, Layers, User, Heart, Building2, Dumbbell, Plane, Anchor } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo García
const LOGO_URL = "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/8bv8bi5b_IMG_0328.png";

// Images - Photos réelles de l'atelier García
const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/qq7o0n5l_c54073aa-0c4a-4010-b537-cb187736a669.jpeg",
  atelier: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/mhes5mb7_1bb1be00-9a9c-409b-a3de-f9106431bc78.jpeg",
  atelierLarge: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/qq7o0n5l_c54073aa-0c4a-4010-b537-cb187736a669.jpeg",
  mobilier: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/m977ytlo_beff6e02-660e-488a-864f-94ccc741d303.jpeg",
  vespa: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/ecmsqvii_8d951b09-7e1b-4270-a7ad-c28b525b627d.jpeg",
  motoSport: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/m75tu18a_795c9272-3bc1-4bfe-8fce-d420776783c8.jpeg",
  couture: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/nvf1p6p8_c13492b3-b3ec-4389-82ac-e944a39d0699.jpeg",
  coutureCuirMarron: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/my9739q8_0b43e4fd-f93b-4883-ab81-5128b866ce01.jpeg",
  siegesOrange: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/9uzitjl3_09cc7c17-d8b6-498b-8d02-72e975df5aa9.jpeg",
  selleHonda: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/d3e1lvkw_5658f4c1-c989-4b32-ae3a-11724c4689d4.jpeg",
  artisanTravail: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/16okuyv0_IMG_0322.jpeg",
  automobile: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/xyya385f_cb4b354d-ebe0-4806-8046-d301dc377a9b.jpeg",
  moto: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/0l64azwa_IMG_0325.jpeg",
  nautisme: "https://images.unsplash.com/photo-1753295687822-b7785d55c24e?w=800&q=80"
};

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

// Services data
const services = [
  {
    id: "automobile",
    title: "Automobile",
    description: "Redonnez vie à l'intérieur de votre véhicule avec un travail sur-mesure.",
    image: IMAGES.automobile,
    icon: Car,
    features: ["Réfection de sièges", "Ciels de toit", "Panneaux de portes"]
  },
  {
    id: "moto",
    title: "Moto",
    description: "Confort et style personnalisé pour vos deux-roues.",
    image: IMAGES.moto,
    icon: Bike,
    features: ["Selles confort", "Pose de gel", "Personnalisation", "Réparations"]
  },
  {
    id: "nautisme",
    title: "Nautisme",
    description: "Protégez et embellissez votre bateau avec des finitions marines.",
    image: IMAGES.nautisme,
    icon: Ship,
    features: ["Bains de soleil", "Selleries marines", "Tauds de protection", "Coussins sur-mesure"]
  },
  {
    id: "mobilier",
    title: "Mobilier",
    description: "Restauration et création de mobilier avec des matériaux nobles.",
    image: IMAGES.mobilier,
    icon: Sofa,
    features: ["Fauteuils", "Canapés", "Tables médicales", "Équipements sportifs"]
  }
];

// Gallery data - Photos réelles
const galleryItems = [
  { id: 1, title: "Sièges bicolores", desc: "Sièges auto orange et noir sur-mesure", category: "Automobile", image: IMAGES.siegesOrange },
  { id: 2, title: "Intérieur voiture collection", desc: "Sièges cuir noir avec passepoil", category: "Automobile", image: IMAGES.automobile },
  { id: 3, title: "Sièges sport", desc: "Tissu technique surpiqûres blanches", category: "Automobile", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/xnpdtgc2_85df2709-64ae-4e70-a5a7-6651dd092afa.jpeg" },
  { id: 4, title: "Selle Triumph Thruxton", desc: "Selle matelassée avec logo García", category: "Moto", image: IMAGES.moto },
  { id: 5, title: "Selle café racer", desc: "Finition grise matelassée", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/xr1tbd6y_3f71fae7-8f3a-4a33-9482-245c7abd23fb.jpeg" },
  { id: 6, title: "Selle atelier", desc: "Finition noire surpiqûres blanches", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/dm4i0cr9_5a197c46-ec92-43e6-aabc-b85b190f3a72.jpeg" },
  { id: 7, title: "Selle XSR 700", desc: "Matelassé losange passepoil rouge", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/5ue4fayp_640e8d16-28ac-4af9-b659-33ec2da70ed7.jpeg" },
  { id: 8, title: "Selle Honda XL", desc: "Logo brodé personnalisé", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/pelx1f4o_117fd8e4-1117-4a50-9743-8978aeb3002a.jpeg" },
  { id: 9, title: "Assise cuir noir", desc: "Finition lisse sur établi", category: "Automobile", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/qwclrlqu_b1972168-c7c8-47f8-b965-9e74101116eb.jpeg" },
  { id: 10, title: "Armature selle", desc: "Structure ressorts avant garnissage", category: "Moto", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/fmfm2hei_66126ab0-5d22-4830-9d7b-fc36198c8925.jpeg" },
  { id: 11, title: "Canapé cuir capitonné", desc: "Cuir gris design moderne", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/cjun3hwq_331946c3-7fd4-4fa8-84b2-afabf46544c3.jpeg" },
  { id: 12, title: "Canapé modulaire", desc: "Tissu gris chiné", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/o2cna4ll_dfdd06b4-2bb1-46ba-9d1d-5b8f0240bb2a.jpeg" },
  { id: 13, title: "Fauteuil club", desc: "Simili cuir noir", category: "Mobilier", image: "https://customer-assets.emergentagent.com/job_brave-dhawan-3/artifacts/965aw8nd_c9fc077a-e22f-4f7f-96d3-4f5ec677f912.jpeg" },
  { id: 14, title: "Chaises restaurées", desc: "Assises en simili cuir noir", category: "Mobilier", image: IMAGES.mobilier }
];

const materials = [];

// Secteurs et normes
const sectorsNorms = [
  {
    icon: Heart,
    title: "Médical & Bien-être",
    description: "Tissus antibactériens, antifongiques et résistants aux produits de désinfection"
  },
  {
    icon: Building2,
    title: "Espaces Publics",
    description: "Normes non-feu M1/M2 pour cinémas, hôtels et restaurants"
  },
  {
    icon: Dumbbell,
    title: "Sport & Fitness",
    description: "Haute résistance à l'abrasion et à la transpiration"
  },
  {
    icon: Plane,
    title: "Transport & Mobilité",
    description: "Homologation automobile, aviation et ferroviaire"
  },
  {
    icon: Anchor,
    title: "Nautisme",
    description: "Traitements anti-UV et résistance à la salinité"
  }
];

// Navigation Component
const Navigation = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "services", label: "Services" },
    { id: "galerie", label: "Galerie" },
    { id: "contact", label: "Contact" }
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
            <img src={LOGO_URL} alt="García Sellerie" className="h-14 w-14" />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-light p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
const HeroSection = ({ scrollToSection }) => (
  <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-dark/70" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
      <AnimatedSection>
        <motion.div variants={fadeUp} className="mb-8">
          <Badge>Artisan Sellier Garnisseur</Badge>
        </motion.div>
        
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-[1.1] mb-8 max-w-4xl">
          Donnez une seconde vie à vos{" "}
          <span className="text-mint">intérieurs</span> et{" "}
          <span className="text-mint">équipements</span>
        </motion.h1>
        
        <motion.p variants={fadeUp} className="text-light/70 text-lg max-w-2xl leading-relaxed mb-10">
          Un seul artisan, de la découpe à la couture finale. Un travail d'orfèvre pour des réalisations uniques en cuir, Alcantara et matériaux premium.
        </motion.p>
        
        <motion.button
          variants={fadeUp}
          onClick={() => scrollToSection("contact")}
          className="group bg-mint text-dark px-8 py-4 font-semibold hover:bg-mint/90 transition-all duration-300 inline-flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="hero-cta-btn"
        >
          Demander un devis gratuit
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </motion.button>
      </AnimatedSection>
    </div>
  </section>
);

// Services Section
const ServicesSection = () => (
  <section id="services" className="py-24 bg-dark" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <AnimatedSection>
        <motion.div variants={fadeUp} className="mb-6">
          <Badge>Mon Savoir-Faire</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-6">
          Quatre domaines d'<span className="text-mint">excellence</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-light/60 max-w-2xl mb-16 text-lg">
          De l'automobile au mobilier, chaque projet bénéficie d'un savoir-faire artisanal et de matériaux premium pour un résultat durable et unique.
        </motion.p>
      </AnimatedSection>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
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

// Engagement Section
const EngagementSection = () => {
  const features = [
    {
      icon: Scissors,
      title: "Travail artisanal",
      description: "Chaque pièce est travaillée à la main avec précision et passion"
    },
    {
      icon: Layers,
      title: "Matériaux premium",
      description: "Cuir pleine fleur, Alcantara et tissus techniques de haute qualité"
    },
    {
      icon: User,
      title: "Interlocuteur unique",
      description: "Un seul artisan de A à Z pour garantir la cohérence du projet"
    }
  ];

  return (
    <section id="engagement" className="py-24 bg-dark" data-testid="engagement-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-6">
              <Badge>L'Engagement Artisan</Badge>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-8 leading-tight">
              Un travail d'<span className="text-mint">orfèvre</span>, de A à Z
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-light/70 mb-6 text-lg leading-relaxed">
              De la découpe à la couture finale, chaque projet passe uniquement entre mes mains. Cette approche garantit une attention méticuleuse aux détails et une cohérence parfaite tout au long du processus.
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-light/70 mb-10 text-lg leading-relaxed">
              Seul à l'atelier, je prends le temps nécessaire pour comprendre vos besoins, sélectionner les meilleurs matériaux et réaliser un travail sur-mesure qui dépassera vos attentes. Chaque pièce est unique, durable et pensée pour vous.
            </motion.p>

            {/* Sourcing Info */}
            <motion.div variants={fadeUp} className="bg-dark-lighter border border-mint/20 p-6 mb-6">
              <p className="text-mint font-semibold text-sm tracking-wider uppercase mb-3">Fournisseurs Certifiés</p>
              <p className="text-light/70 text-sm leading-relaxed">
                Je sélectionne exclusivement des tissus et cuirs provenant de <span className="text-light">fournisseurs professionnels français et européens</span>, répondant aux normes spécifiques de chaque secteur.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Right Content - Sectors & Norms */}
          <div className="space-y-4">
            <p className="text-light font-semibold text-sm tracking-wider uppercase mb-4">Secteurs & Normes</p>
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
              <p className="text-light font-semibold text-sm tracking-wider uppercase mb-4">Mon Engagement</p>
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
  const [filter, setFilter] = useState("Tous");
  const categories = ["Tous", "Automobile", "Moto", "Nautisme", "Mobilier"];

  const filteredItems = filter === "Tous" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <section id="galerie" className="py-24 bg-dark-lighter" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-6">
            <Badge>Portfolio</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-6">
            Galerie de <span className="text-mint">réalisations</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-light/60 max-w-xl mb-12 text-lg">
            Découvrez quelques exemples de projets réalisés avec passion et précision
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
              {cat}
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
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
              <Badge>Contact</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-light mb-6 md:mb-8">
              Parlons de votre <span className="text-mint">projet</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-light/60 mb-8 md:mb-12 text-base md:text-lg">
              Que ce soit pour une rénovation, une création sur-mesure ou un simple conseil, je suis à votre écoute.
            </motion.p>
            
            <motion.div variants={fadeUp} className="space-y-3 md:space-y-4">
              <a href="tel:0643320178" className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-phone">
                <IconBox icon={Phone} />
                <div>
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">Téléphone</p>
                  <p className="text-light text-base md:text-lg font-semibold">06 43 32 01 78</p>
                </div>
              </a>
              
              <a href="mailto:selleriegarniture.garcia@gmail.com" className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-email">
                <IconBox icon={Mail} />
                <div className="min-w-0">
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">Email</p>
                  <p className="text-light text-sm md:text-lg font-semibold truncate">selleriegarniture.garcia@gmail.com</p>
                </div>
              </a>
            </motion.div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="bg-dark-lighter border border-light/10 p-5 sm:p-6 md:p-8 lg:p-10" data-testid="contact-form-container">
              <h3 className="text-xl md:text-2xl font-bold text-light mb-6 md:mb-8">Demande de devis</h3>
              
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
                  <p className="text-light text-lg md:text-xl font-bold mb-2">Demande envoyée !</p>
                  <p className="text-light/60 text-sm md:text-base">Je vous recontacte très rapidement.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" data-testid="contact-form">
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors"
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">Type de projet *</label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors cursor-pointer"
                      data-testid="select-project-type"
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="Automobile">Automobile</option>
                      <option value="Moto">Moto</option>
                      <option value="Nautisme">Nautisme</option>
                      <option value="Mobilier">Mobilier</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-2 md:mb-3 block">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-dark text-light text-base px-4 py-3 md:py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors resize-none"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-mint text-dark py-3.5 md:py-4 font-semibold text-base hover:bg-mint/90 transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    data-testid="submit-btn"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
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
const Footer = () => (
  <footer className="bg-dark py-8 border-t border-light/10" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="García Sellerie" className="h-10 w-10" />
          <p className="text-light font-semibold">García Sellerie Garniture</p>
        </div>
        <p className="text-light/40 text-sm">© 2024 García Sellerie Garniture. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState("accueil");

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
    <div className="App bg-dark min-h-screen" data-testid="app-container">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <ServicesSection />
      <EngagementSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
