import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, Check } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo García
const LOGO_URL = "https://customer-assets.emergentagent.com/job_9370add9-2aa9-46bc-b598-8f17b97f9224/artifacts/sukuekzz_IMG_0328.png";

// Images
const IMAGES = {
  automobile: "https://images.unsplash.com/photo-1760688965950-e8dcca426544?w=800&q=80",
  moto: "https://images.pexels.com/photos/5781796/pexels-photo-5781796.jpeg?w=800",
  nautisme: "https://images.pexels.com/photos/8356420/pexels-photo-8356420.jpeg?w=800",
  mobilier: "https://images.unsplash.com/photo-1763979628017-ea650631b0be?w=800&q=80",
  couture: "https://images.unsplash.com/photo-1762019108554-51759e47148a?w=800&q=80",
  atelier: "https://images.pexels.com/photos/4452603/pexels-photo-4452603.jpeg?w=800",
  autoInterior: "https://images.unsplash.com/photo-1767277974735-a6e70cd71d2f?w=800&q=80",
  autoClassic: "https://images.pexels.com/photos/4480526/pexels-photo-4480526.jpeg?w=800",
  motoCustom: "https://images.pexels.com/photos/5781796/pexels-photo-5781796.jpeg?w=800",
  motoFinition: "https://images.unsplash.com/photo-1710017847858-9f15090b5c0a?w=800&q=80",
  bateau: "https://images.pexels.com/photos/28905724/pexels-photo-28905724.jpeg?w=800",
  yacht: "https://images.pexels.com/photos/8356420/pexels-photo-8356420.jpeg?w=800",
  fauteuil: "https://images.unsplash.com/photo-1763979628017-ea650631b0be?w=800&q=80",
  canape: "https://images.pexels.com/photos/8232377/pexels-photo-8232377.jpeg?w=800"
};

// Services data
const services = [
  {
    id: "automobile",
    title: "Automobile",
    description: "Redonnez vie à l'intérieur de votre véhicule avec un travail sur-mesure.",
    image: IMAGES.automobile,
    features: ["Réfection de sièges", "Ciels de toit", "Volants gainés", "Panneaux de portes"]
  },
  {
    id: "moto",
    title: "Moto",
    description: "Confort et style personnalisé pour vos deux-roues.",
    image: IMAGES.moto,
    features: ["Selles confort", "Pose de gel", "Personnalisation", "Réparations"]
  },
  {
    id: "nautisme",
    title: "Nautisme",
    description: "Protégez et embellissez votre bateau avec des finitions marines.",
    image: IMAGES.nautisme,
    features: ["Bains de soleil", "Selleries marines", "Tauds de protection", "Coussins sur-mesure"]
  },
  {
    id: "mobilier",
    title: "Mobilier",
    description: "Restauration et création de mobilier avec des matériaux nobles.",
    image: IMAGES.mobilier,
    features: ["Fauteuils", "Canapés", "Tables médicales", "Équipements sportifs"]
  }
];

// Gallery data
const galleryItems = [
  { id: 1, title: "Intérieur automobile premium", desc: "Réfection complète avec cuir matelassé", category: "Automobile", image: IMAGES.autoInterior },
  { id: 2, title: "Restauration classique", desc: "Sièges en cuir rouge vintage", category: "Automobile", image: IMAGES.autoClassic },
  { id: 3, title: "Selle moto custom", desc: "Cuir matelassé noir avec surpiqûres", category: "Moto", image: IMAGES.motoCustom },
  { id: 4, title: "Finition premium", desc: "Détails de couture professionnelle", category: "Moto", image: IMAGES.motoFinition },
  { id: 5, title: "Sièges bateau", desc: "Sellerie marine résistante", category: "Nautisme", image: IMAGES.bateau },
  { id: 6, title: "Yacht de luxe", desc: "Aménagement intérieur complet", category: "Nautisme", image: IMAGES.yacht },
  { id: 7, title: "Fauteuil capitonné", desc: "Cuir rouge bordeaux capitonné", category: "Mobilier", image: IMAGES.fauteuil },
  { id: 8, title: "Canapé vintage", desc: "Restauration de canapé en cuir", category: "Mobilier", image: IMAGES.canape }
];

const materials = ["Cuir pleine fleur", "Alcantara", "Simili cuir technique", "Tissus nautiques", "Mousse haute densité"];

// Navigation Component
const Navigation = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#1a2f23]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`} data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("accueil")} data-testid="logo-link">
            <img src={LOGO_URL} alt="García Sellerie" className="h-14 w-14 rounded-full" />
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-lg">García</p>
              <p className="text-[#c9a227] text-xs">Sellerie Garniture</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#c9a227]" : "text-white/80 hover:text-white"}`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#c9a227] text-[#1a2f23] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#d4af37] transition-all"
              data-testid="nav-devis-btn"
            >
              Devis gratuit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1a2f23]/95 backdrop-blur-md py-4 px-4 rounded-b-2xl" data-testid="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }}
                className="block w-full text-left py-3 text-white/80 hover:text-[#c9a227] transition-colors"
                data-testid={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ scrollToSection }) => (
  <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f23] via-[#243b2d] to-[#1a2f23]" />
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
    
    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
      <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-6 animate-fade-in">Artisan Sellier Garnisseur</p>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
        Donnez une seconde vie à vos<br />
        <span className="text-[#c9a227]">intérieurs</span> et <span className="text-[#c9a227]">équipements</span>
      </h1>
      
      <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
        Un seul artisan, de la découpe à la couture finale. Un travail d'orfèvre pour des réalisations uniques en cuir, Alcantara et matériaux premium.
      </p>
      
      <button
        onClick={() => scrollToSection("contact")}
        className="group bg-[#c9a227] text-[#1a2f23] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#d4af37] transition-all inline-flex items-center gap-2"
        data-testid="hero-cta-btn"
      >
        Demander un devis gratuit
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
      </button>
      
      {/* Stats */}
      <div className="flex justify-center gap-12 md:gap-20 mt-16">
        {[
          { value: "1", label: "Artisan dédié" },
          { value: "4", label: "Domaines d'expertise" },
          { value: "100%", label: "Sur-mesure" }
        ].map((stat, i) => (
          <div key={i} className="text-center" data-testid={`stat-${i}`}>
            <p className="text-4xl md:text-5xl font-bold text-[#c9a227]">{stat.value}</p>
            <p className="text-white/60 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* Scroll indicator */}
    <button
      onClick={() => scrollToSection("savoir-faire")}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-[#c9a227] transition-colors animate-bounce"
      data-testid="scroll-indicator"
    >
      <ChevronDown size={32} />
    </button>
  </section>
);

// Services Section
const ServicesSection = () => (
  <section id="savoir-faire" className="py-24 bg-[#0f1a14]" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-4">Mon Savoir-Faire</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Quatre domaines d'excellence</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          De l'automobile au mobilier, chaque projet bénéficie d'un savoir-faire artisanal et de matériaux premium pour un résultat durable et unique.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-[#1a2f23] rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300"
            data-testid={`service-card-${service.id}`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f23] to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-white/60 text-sm mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <Check size={14} className="text-[#c9a227]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Engagement Section
const EngagementSection = () => (
  <section id="engagement" className="py-24 bg-[#1a2f23]" data-testid="engagement-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-4">L'Engagement Artisan</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Un travail d'orfèvre, de A à Z</h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            De la découpe à la couture finale, chaque projet passe uniquement entre mes mains. Cette approche garantit une attention méticuleuse aux détails et une cohérence parfaite tout au long du processus.
          </p>
          <p className="text-white/70 mb-8 leading-relaxed">
            Seul à l'atelier, je prends le temps nécessaire pour comprendre vos besoins, sélectionner les meilleurs matériaux et réaliser un travail sur-mesure qui dépassera vos attentes. Chaque pièce est unique, durable et pensée pour vous.
          </p>

          {/* Materials */}
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4">Matériaux Utilisés</h4>
            <div className="flex flex-wrap gap-2">
              {materials.map((material, i) => (
                <span key={i} className="bg-[#243b2d] text-white/80 px-4 py-2 rounded-full text-sm">
                  {material}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Travail artisanal", desc: "Chaque pièce est travaillée à la main avec précision et passion" },
              { title: "Matériaux premium", desc: "Cuir pleine fleur, Alcantara et tissus techniques de haute qualité" },
              { title: "Interlocuteur unique", desc: "Un seul artisan de A à Z pour garantir la cohérence du projet" }
            ].map((feature, i) => (
              <div key={i} className="bg-[#243b2d] p-4 rounded-xl" data-testid={`feature-${i}`}>
                <h4 className="text-white font-semibold text-sm mb-2">{feature.title}</h4>
                <p className="text-white/60 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src={IMAGES.couture}
            alt="Détail couture artisanale"
            className="rounded-2xl w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-[#1a2f23]/90 backdrop-blur-sm p-4 rounded-xl">
            <p className="text-white/80 text-sm">Détail de finition : chaque couture compte</p>
          </div>
        </div>
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
    <section id="galerie" className="py-24 bg-[#0f1a14]" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Galerie de réalisations</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Découvrez quelques exemples de projets réalisés avec passion et précision
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-[#c9a227] text-[#1a2f23]" : "bg-[#1a2f23] text-white/70 hover:bg-[#243b2d]"}`}
              data-testid={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              data-testid={`gallery-item-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f23] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#c9a227] text-xs font-medium">{item.category}</span>
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
    <section id="contact" className="py-24 bg-[#1a2f23]" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Contactez-moi pour un devis gratuit</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Que ce soit pour une rénovation, une création sur-mesure ou un simple conseil, je suis à votre écoute pour donner vie à votre projet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-8">
              <a href="tel:0643320178" className="flex items-center gap-4 bg-[#243b2d] p-4 rounded-xl hover:bg-[#2d4a38] transition-colors" data-testid="contact-phone">
                <div className="bg-[#c9a227] p-3 rounded-full">
                  <Phone size={20} className="text-[#1a2f23]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Téléphone</p>
                  <p className="text-white font-semibold">06 43 32 01 78</p>
                </div>
              </a>
              
              <a href="mailto:selleriegarniture.garcia@gmail.com" className="flex items-center gap-4 bg-[#243b2d] p-4 rounded-xl hover:bg-[#2d4a38] transition-colors" data-testid="contact-email">
                <div className="bg-[#c9a227] p-3 rounded-full">
                  <Mail size={20} className="text-[#1a2f23]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white font-semibold">selleriegarniture.garcia@gmail.com</p>
                </div>
              </a>
            </div>

            <img
              src={IMAGES.atelier}
              alt="Atelier Garcia Sellerie"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>

          {/* Contact Form */}
          <div className="bg-[#243b2d] p-8 rounded-2xl" data-testid="contact-form-container">
            <h3 className="text-white text-xl font-semibold mb-6">Demande de devis</h3>
            
            {submitSuccess ? (
              <div className="text-center py-12" data-testid="form-success">
                <div className="bg-[#c9a227] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-[#1a2f23]" />
                </div>
                <p className="text-white text-lg font-semibold mb-2">Demande envoyée !</p>
                <p className="text-white/60">Je vous recontacte très rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Nom complet *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a2f23] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#c9a227] focus:outline-none transition-colors"
                    data-testid="input-name"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1a2f23] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#c9a227] focus:outline-none transition-colors"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#1a2f23] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#c9a227] focus:outline-none transition-colors"
                      data-testid="input-phone"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Type de projet *</label>
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#1a2f23] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#c9a227] focus:outline-none transition-colors"
                    data-testid="select-project-type"
                  >
                    <option value="">Sélectionnez un type de projet</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Moto">Moto</option>
                    <option value="Nautisme">Nautisme</option>
                    <option value="Mobilier">Mobilier</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#1a2f23] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#c9a227] focus:outline-none transition-colors resize-none"
                    data-testid="input-message"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c9a227] text-[#1a2f23] py-4 rounded-xl font-semibold hover:bg-[#d4af37] transition-colors disabled:opacity-50"
                  data-testid="submit-btn"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <div className="App bg-[#0f1a14] min-h-screen" data-testid="app-container">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <ServicesSection />
      <EngagementSection />
      <GallerySection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-[#0f1a14] py-8 border-t border-white/10" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src={LOGO_URL} alt="García Sellerie" className="h-12 w-12 rounded-full mx-auto mb-4" />
          <p className="text-white/60 text-sm">© 2024 García Sellerie Garniture. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
