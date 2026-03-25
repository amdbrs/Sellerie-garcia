import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, Check, ArrowUpRight } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo García
const LOGO_URL = "https://customer-assets.emergentagent.com/job_9370add9-2aa9-46bc-b598-8f17b97f9224/artifacts/sukuekzz_IMG_0328.png";

// Images from design guidelines
const IMAGES = {
  craftsmanship: "https://images.pexels.com/photos/4452603/pexels-photo-4452603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  automobile: "https://images.unsplash.com/photo-1629991981598-f3fc8f102cb7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2FyJTIwbGVhdGhlciUyMGludGVyaW9yfGVufDB8fHx8MTc3NDQ0NDg2NHww&ixlib=rb-4.1.0&q=85",
  moto: "https://images.pexels.com/photos/36209786/pexels-photo-36209786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  nautisme: "https://images.pexels.com/photos/271681/pexels-photo-271681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  mobilier: "https://images.pexels.com/photos/3328224/pexels-photo-3328224.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  leatherDetail: "https://images.unsplash.com/photo-1765519313320-22b0865e9c32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxsZWF0aGVyJTIwY3JhZnRzbWFuc2hpcCUyMGFydGlzYW58ZW58MHx8fHwxNzc0NDQ0ODY0fDA&ixlib=rb-4.1.0&q=85"
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

// Animated Section Wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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

// Services data
const services = [
  {
    id: "automobile",
    title: "Automobile",
    description: "Redonnez vie à l'intérieur de votre véhicule avec un travail sur-mesure.",
    image: IMAGES.automobile,
    features: ["Réfection de sièges", "Ciels de toit", "Volants gainés", "Panneaux de portes"],
    span: "md:col-span-7 md:row-span-2"
  },
  {
    id: "moto",
    title: "Moto",
    description: "Confort et style personnalisé pour vos deux-roues.",
    image: IMAGES.moto,
    features: ["Selles confort", "Pose de gel", "Personnalisation", "Réparations"],
    span: "md:col-span-5 md:row-span-1"
  },
  {
    id: "nautisme",
    title: "Nautisme",
    description: "Protégez et embellissez votre bateau avec des finitions marines.",
    image: IMAGES.nautisme,
    features: ["Bains de soleil", "Selleries marines", "Tauds de protection", "Coussins sur-mesure"],
    span: "md:col-span-5 md:row-span-1"
  },
  {
    id: "mobilier",
    title: "Mobilier",
    description: "Restauration et création de mobilier avec des matériaux nobles.",
    image: IMAGES.mobilier,
    features: ["Fauteuils", "Canapés", "Tables médicales", "Équipements sportifs"],
    span: "md:col-span-7 md:row-span-1"
  }
];

// Gallery data
const galleryItems = [
  { id: 1, title: "Intérieur automobile premium", desc: "Réfection complète avec cuir matelassé", category: "Automobile", image: IMAGES.automobile },
  { id: 2, title: "Restauration classique", desc: "Sièges en cuir rouge vintage", category: "Automobile", image: "https://images.pexels.com/photos/4480526/pexels-photo-4480526.jpeg?w=800" },
  { id: 3, title: "Selle moto custom", desc: "Cuir matelassé noir avec surpiqûres", category: "Moto", image: IMAGES.moto },
  { id: 4, title: "Finition premium", desc: "Détails de couture professionnelle", category: "Moto", image: IMAGES.leatherDetail },
  { id: 5, title: "Sièges bateau", desc: "Sellerie marine résistante", category: "Nautisme", image: "https://images.pexels.com/photos/28905724/pexels-photo-28905724.jpeg?w=800" },
  { id: 6, title: "Yacht de luxe", desc: "Aménagement intérieur complet", category: "Nautisme", image: IMAGES.nautisme },
  { id: 7, title: "Fauteuil capitonné", desc: "Cuir rouge bordeaux capitonné", category: "Mobilier", image: IMAGES.mobilier },
  { id: 8, title: "Canapé vintage", desc: "Restauration de canapé en cuir", category: "Mobilier", image: "https://images.pexels.com/photos/8232377/pexels-photo-8232377.jpeg?w=800" }
];

const materials = ["Cuir pleine fleur", "Alcantara", "Simili cuir technique", "Tissus nautiques", "Mousse haute densité"];

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
    { id: "savoir-faire", label: "Savoir-Faire" },
    { id: "engagement", label: "Engagement" },
    { id: "galerie", label: "Galerie" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-brand-dark/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => scrollToSection("accueil")} 
            data-testid="logo-link"
            whileHover={{ scale: 1.02 }}
          >
            <img src={LOGO_URL} alt="García Sellerie" className="h-12 w-12 rounded-full ring-2 ring-brand-gold/20 group-hover:ring-brand-gold/50 transition-all duration-300" />
            <div className="hidden sm:block">
              <p className="text-brand-sand font-heading text-lg tracking-tight">García</p>
              <p className="text-brand-gold text-xs tracking-[0.2em] uppercase font-mono">Sellerie Garniture</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide transition-colors duration-300 ${activeSection === item.id ? "text-brand-gold" : "text-brand-sand/70 hover:text-brand-sand"}`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="border border-brand-gold text-brand-gold px-6 py-2.5 text-sm tracking-wide hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="nav-devis-btn"
            >
              Devis gratuit
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-sand p-2"
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
              className="md:hidden overflow-hidden"
              data-testid="mobile-menu"
            >
              <div className="py-4 border-t border-brand-gold/20">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }}
                    className="block w-full text-left py-3 text-brand-sand/80 hover:text-brand-gold transition-colors"
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
  <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark" data-testid="hero-section">
    {/* Background Image */}
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${IMAGES.craftsmanship})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/70" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <motion.p variants={fadeUp} className="text-brand-gold text-xs font-mono tracking-[0.3em] uppercase mb-8">
            Artisan Sellier Garnisseur
          </motion.p>
          
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-heading font-light text-brand-sand leading-[1.1] mb-8">
            Donnez une<br />
            seconde vie à vos<br />
            <span className="text-brand-gold italic">intérieurs</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-brand-sand/60 text-lg max-w-md leading-relaxed mb-12">
            Un seul artisan, de la découpe à la couture finale. Un travail d'orfèvre pour des réalisations uniques en cuir, Alcantara et matériaux premium.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="group border border-brand-gold bg-brand-gold text-brand-dark px-8 py-4 text-sm tracking-wide hover:bg-transparent hover:text-brand-gold transition-all duration-300 inline-flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="hero-cta-btn"
            >
              Demander un devis
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection("savoir-faire")}
              className="border border-brand-sand/30 text-brand-sand px-8 py-4 text-sm tracking-wide hover:border-brand-sand/60 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="hero-discover-btn"
            >
              Découvrir
            </motion.button>
          </motion.div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection className="hidden lg:block">
          <div className="grid grid-cols-2 gap-8">
            {[
              { value: "1", label: "Artisan dédié", sublabel: "De A à Z" },
              { value: "4", label: "Domaines", sublabel: "D'expertise" },
              { value: "100%", label: "Sur-mesure", sublabel: "Personnalisé" },
              { value: "15+", label: "Années", sublabel: "D'expérience" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="border-l border-brand-gold/30 pl-6"
                data-testid={`stat-${i}`}
              >
                <p className="text-5xl font-heading font-light text-brand-gold mb-2">{stat.value}</p>
                <p className="text-brand-sand text-sm tracking-wide">{stat.label}</p>
                <p className="text-brand-sand/50 text-xs">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
    
    {/* Scroll indicator */}
    <motion.button
      onClick={() => scrollToSection("savoir-faire")}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-sand/40 hover:text-brand-gold transition-colors"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      data-testid="scroll-indicator"
    >
      <ChevronDown size={32} />
    </motion.button>
  </section>
);

// Services Section - Bento Grid
const ServicesSection = () => (
  <section id="savoir-faire" className="py-32 bg-brand-dark" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <AnimatedSection>
        <motion.p variants={fadeUp} className="text-brand-gold text-xs font-mono tracking-[0.3em] uppercase mb-4">
          Mon Savoir-Faire
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-light text-brand-sand mb-6 max-w-2xl">
          Quatre domaines d'excellence
        </motion.h2>
        <motion.p variants={fadeUp} className="text-brand-sand/60 max-w-xl mb-16 leading-relaxed">
          De l'automobile au mobilier, chaque projet bénéficie d'un savoir-faire artisanal et de matériaux premium.
        </motion.p>
      </AnimatedSection>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative overflow-hidden ${service.span} ${index === 0 ? 'min-h-[500px]' : 'min-h-[240px]'}`}
            data-testid={`service-card-${service.id}`}
          >
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-dark/40 transition-colors duration-500" />
            </div>
            
            <div className="relative h-full p-8 flex flex-col justify-end">
              <p className="text-brand-gold text-xs font-mono tracking-[0.2em] uppercase mb-2">{service.id}</p>
              <h3 className="text-2xl font-heading text-brand-sand mb-3">{service.title}</h3>
              <p className="text-brand-sand/60 text-sm mb-4 max-w-xs">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs text-brand-sand/80 border border-brand-gold/30 px-3 py-1">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Engagement Section - Light theme for contrast
const EngagementSection = () => (
  <section id="engagement" className="py-32 bg-brand-sand" data-testid="engagement-section">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <AnimatedSection>
          <motion.p variants={fadeUp} className="text-brand-gold text-xs font-mono tracking-[0.3em] uppercase mb-4">
            L'Engagement Artisan
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-light text-brand-dark mb-8 leading-tight">
            Un travail d'orfèvre,<br />de A à Z
          </motion.h2>
          <motion.p variants={fadeUp} className="text-brand-dark/70 mb-6 leading-relaxed">
            De la découpe à la couture finale, chaque projet passe uniquement entre mes mains. Cette approche garantit une attention méticuleuse aux détails et une cohérence parfaite.
          </motion.p>
          <motion.p variants={fadeUp} className="text-brand-dark/70 mb-10 leading-relaxed">
            Seul à l'atelier, je prends le temps nécessaire pour comprendre vos besoins, sélectionner les meilleurs matériaux et réaliser un travail sur-mesure qui dépassera vos attentes.
          </motion.p>

          {/* Materials */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-brand-dark font-medium text-sm tracking-wide mb-4">MATÉRIAUX UTILISÉS</p>
            <div className="flex flex-wrap gap-2">
              {materials.map((material, i) => (
                <span key={i} className="text-sm text-brand-dark/70 border border-brand-dark/20 px-4 py-2 hover:border-brand-gold hover:text-brand-gold transition-colors cursor-default">
                  {material}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeUp} className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Artisanal", desc: "Travaillé à la main avec précision" },
              { title: "Premium", desc: "Matériaux de haute qualité" },
              { title: "Unique", desc: "Un seul interlocuteur de A à Z" }
            ].map((feature, i) => (
              <div key={i} className="border-t-2 border-brand-gold pt-4" data-testid={`feature-${i}`}>
                <h4 className="text-brand-dark font-medium mb-2">{feature.title}</h4>
                <p className="text-brand-dark/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src={IMAGES.craftsmanship}
            alt="Détail couture artisanale"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/90 backdrop-blur-sm p-6">
            <p className="text-brand-sand/80 text-sm italic">Chaque couture raconte une histoire de précision et de passion</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Gallery Section
const GallerySection = () => {
  const [filter, setFilter] = useState("Tous");
  const categories = ["Tous", "Automobile", "Moto", "Nautisme", "Mobilier"];

  const filteredItems = filter === "Tous" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <section id="galerie" className="py-32 bg-brand-dark" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.p variants={fadeUp} className="text-brand-gold text-xs font-mono tracking-[0.3em] uppercase mb-4">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-light text-brand-sand mb-6">
            Galerie de réalisations
          </motion.h2>
          <motion.p variants={fadeUp} className="text-brand-sand/60 max-w-xl mb-12">
            Découvrez quelques exemples de projets réalisés avec passion et précision
          </motion.p>
        </AnimatedSection>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${filter === cat ? "bg-brand-gold text-brand-dark" : "border border-brand-sand/30 text-brand-sand/70 hover:border-brand-gold hover:text-brand-gold"}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry-style Gallery grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden cursor-pointer ${index === 0 || index === 5 ? 'sm:row-span-2' : ''}`}
                style={{ minHeight: index === 0 || index === 5 ? '500px' : '240px' }}
                data-testid={`gallery-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-brand-gold text-xs font-mono tracking-wider mb-2">{item.category}</p>
                  <h4 className="text-brand-sand font-heading text-lg mb-1">{item.title}</h4>
                  <p className="text-brand-sand/60 text-sm">{item.desc}</p>
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-brand-gold p-2">
                    <ArrowUpRight size={16} className="text-brand-dark" />
                  </div>
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
    <section id="contact" className="py-32 bg-brand-dark border-t border-brand-gold/20" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-brand-gold text-xs font-mono tracking-[0.3em] uppercase mb-4">
              Contact
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-light text-brand-sand mb-8">
              Parlons de votre projet
            </motion.h2>
            <motion.p variants={fadeUp} className="text-brand-sand/60 mb-12 max-w-md leading-relaxed">
              Que ce soit pour une rénovation, une création sur-mesure ou un simple conseil, je suis à votre écoute.
            </motion.p>
            
            <motion.div variants={fadeUp} className="space-y-6 mb-12">
              <a href="tel:0643320178" className="group flex items-center gap-6 border border-brand-gold/20 p-6 hover:border-brand-gold/50 transition-colors" data-testid="contact-phone">
                <div className="border border-brand-gold p-4 group-hover:bg-brand-gold transition-colors">
                  <Phone size={20} className="text-brand-gold group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <p className="text-brand-sand/50 text-xs font-mono tracking-wider mb-1">TÉLÉPHONE</p>
                  <p className="text-brand-sand text-lg">06 43 32 01 78</p>
                </div>
              </a>
              
              <a href="mailto:selleriegarniture.garcia@gmail.com" className="group flex items-center gap-6 border border-brand-gold/20 p-6 hover:border-brand-gold/50 transition-colors" data-testid="contact-email">
                <div className="border border-brand-gold p-4 group-hover:bg-brand-gold transition-colors">
                  <Mail size={20} className="text-brand-gold group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <p className="text-brand-sand/50 text-xs font-mono tracking-wider mb-1">EMAIL</p>
                  <p className="text-brand-sand">selleriegarniture.garcia@gmail.com</p>
                </div>
              </a>
            </motion.div>

            <motion.img
              variants={fadeUp}
              src={IMAGES.craftsmanship}
              alt="Atelier Garcia Sellerie"
              className="w-full h-64 object-cover opacity-60"
            />
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="border border-brand-gold/20 p-8 lg:p-12" data-testid="contact-form-container">
              <h3 className="text-brand-sand font-heading text-2xl mb-8">Demande de devis</h3>
              
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                  data-testid="form-success"
                >
                  <div className="border border-brand-gold w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-brand-gold" />
                  </div>
                  <p className="text-brand-sand text-xl font-heading mb-2">Demande envoyée</p>
                  <p className="text-brand-sand/60">Je vous recontacte très rapidement.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <label className="text-brand-sand/70 text-xs font-mono tracking-wider mb-3 block">NOM COMPLET *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent text-brand-sand px-0 py-3 border-b border-brand-gold/30 focus:border-brand-gold focus:outline-none transition-colors"
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-brand-sand/70 text-xs font-mono tracking-wider mb-3 block">EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent text-brand-sand px-0 py-3 border-b border-brand-gold/30 focus:border-brand-gold focus:outline-none transition-colors"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="text-brand-sand/70 text-xs font-mono tracking-wider mb-3 block">TÉLÉPHONE *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent text-brand-sand px-0 py-3 border-b border-brand-gold/30 focus:border-brand-gold focus:outline-none transition-colors"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-brand-sand/70 text-xs font-mono tracking-wider mb-3 block">TYPE DE PROJET *</label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-transparent text-brand-sand px-0 py-3 border-b border-brand-gold/30 focus:border-brand-gold focus:outline-none transition-colors cursor-pointer"
                      data-testid="select-project-type"
                    >
                      <option value="" className="bg-brand-dark">Sélectionnez un type</option>
                      <option value="Automobile" className="bg-brand-dark">Automobile</option>
                      <option value="Moto" className="bg-brand-dark">Moto</option>
                      <option value="Nautisme" className="bg-brand-dark">Nautisme</option>
                      <option value="Mobilier" className="bg-brand-dark">Mobilier</option>
                      <option value="Autre" className="bg-brand-dark">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-brand-sand/70 text-xs font-mono tracking-wider mb-3 block">MESSAGE *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent text-brand-sand px-0 py-3 border-b border-brand-gold/30 focus:border-brand-gold focus:outline-none transition-colors resize-none"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border border-brand-gold bg-brand-gold text-brand-dark py-4 text-sm tracking-wide hover:bg-transparent hover:text-brand-gold transition-all duration-300 disabled:opacity-50 mt-4"
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
  <footer className="bg-brand-dark py-12 border-t border-brand-gold/10" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="García Sellerie" className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-brand-sand font-heading">García</p>
            <p className="text-brand-gold text-xs font-mono tracking-wider">Sellerie Garniture</p>
          </div>
        </div>
        <p className="text-brand-sand/40 text-sm">© 2024 García Sellerie Garniture. Tous droits réservés.</p>
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
      const sections = ["accueil", "savoir-faire", "engagement", "galerie", "contact"];
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
    <div className="App bg-brand-dark min-h-screen" data-testid="app-container">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
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
