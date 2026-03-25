import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, Check, Car, Bike, Ship, Sofa, Scissors, Layers, User } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo García
const LOGO_URL = "https://customer-assets.emergentagent.com/job_9370add9-2aa9-46bc-b598-8f17b97f9224/artifacts/sukuekzz_IMG_0328.png";

// Images
const IMAGES = {
  hero: "https://images.pexels.com/photos/4452603/pexels-photo-4452603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920",
  automobile: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  moto: "https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg?w=800",
  nautisme: "https://images.pexels.com/photos/271681/pexels-photo-271681.jpeg?w=800",
  mobilier: "https://images.pexels.com/photos/3328224/pexels-photo-3328224.jpeg?w=800",
  leather: "https://images.pexels.com/photos/4452603/pexels-photo-4452603.jpeg?w=800"
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
    features: ["Réfection de sièges", "Ciels de toit", "Volants gainés", "Panneaux de portes"]
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

// Gallery data
const galleryItems = [
  { id: 1, title: "Intérieur automobile premium", desc: "Réfection complète avec cuir matelassé", category: "Automobile", image: IMAGES.automobile },
  { id: 2, title: "Restauration classique", desc: "Sièges en cuir rouge vintage", category: "Automobile", image: "https://images.pexels.com/photos/4480526/pexels-photo-4480526.jpeg?w=800" },
  { id: 3, title: "Selle moto custom", desc: "Cuir matelassé noir avec surpiqûres", category: "Moto", image: IMAGES.moto },
  { id: 4, title: "Finition premium", desc: "Détails de couture professionnelle", category: "Moto", image: "https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg?w=800" },
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

            {/* Materials */}
            <motion.div variants={fadeUp}>
              <p className="text-light font-semibold text-sm tracking-wider uppercase mb-4">Matériaux Utilisés</p>
              <div className="flex flex-wrap gap-2">
                {materials.map((material, i) => (
                  <span key={i} className="text-sm text-light/70 border border-light/20 px-4 py-2 hover:border-mint hover:text-mint transition-colors cursor-default">
                    {material}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Right Content - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex gap-6 p-6 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors"
                data-testid={`feature-${index}`}
              >
                <IconBox icon={feature.icon} />
                <div>
                  <h4 className="text-xl font-bold text-light mb-2">{feature.title}</h4>
                  <p className="text-light/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-64 overflow-hidden"
            >
              <img
                src={IMAGES.leather}
                alt="Détail cuir artisanal"
                className="w-full h-full object-cover"
              />
            </motion.div>
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
    <section id="contact" className="py-24 bg-dark" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-6">
              <Badge>Contact</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-light mb-8">
              Parlons de votre <span className="text-mint">projet</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-light/60 mb-12 text-lg">
              Que ce soit pour une rénovation, une création sur-mesure ou un simple conseil, je suis à votre écoute.
            </motion.p>
            
            <motion.div variants={fadeUp} className="space-y-4">
              <a href="tel:0643320178" className="group flex items-center gap-6 p-6 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-phone">
                <IconBox icon={Phone} />
                <div>
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">Téléphone</p>
                  <p className="text-light text-lg font-semibold">06 43 32 01 78</p>
                </div>
              </a>
              
              <a href="mailto:selleriegarniture.garcia@gmail.com" className="group flex items-center gap-6 p-6 bg-dark-lighter border border-light/10 hover:border-mint/30 transition-colors" data-testid="contact-email">
                <IconBox icon={Mail} />
                <div>
                  <p className="text-light/50 text-xs font-semibold tracking-wider uppercase mb-1">Email</p>
                  <p className="text-light text-lg font-semibold">selleriegarniture.garcia@gmail.com</p>
                </div>
              </a>
            </motion.div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="bg-dark-lighter border border-light/10 p-8 lg:p-10" data-testid="contact-form-container">
              <h3 className="text-2xl font-bold text-light mb-8">Demande de devis</h3>
              
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                  data-testid="form-success"
                >
                  <div className="w-20 h-20 bg-mint flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-dark" />
                  </div>
                  <p className="text-light text-xl font-bold mb-2">Demande envoyée !</p>
                  <p className="text-light/60">Je vous recontacte très rapidement.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-3 block">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark text-light px-4 py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors"
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-3 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark text-light px-4 py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-3 block">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-dark text-light px-4 py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-3 block">Type de projet *</label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-dark text-light px-4 py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors cursor-pointer"
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
                    <label className="text-light/70 text-xs font-semibold tracking-wider uppercase mb-3 block">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-dark text-light px-4 py-4 border border-light/20 focus:border-mint focus:outline-none transition-colors resize-none"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-mint text-dark py-4 font-semibold hover:bg-mint/90 transition-all duration-300 disabled:opacity-50"
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
