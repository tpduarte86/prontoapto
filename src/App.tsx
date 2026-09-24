import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { OruloIntegrationModal } from './components/OruloIntegrationModal';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { MapViewPage } from './pages/MapViewPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { McmvPage } from './pages/McmvPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { NeighborhoodsPage } from './pages/NeighborhoodsPage';
import { BlogPage } from './pages/BlogPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { Property } from './types/property';
import { PROPERTIES } from './data/properties';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [initialNeighborhoodFilter, setInitialNeighborhoodFilter] = useState<string>('all');
  const [blogPostSlug, setBlogPostSlug] = useState<string | null>(null);

  // Lead modal state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalSource, setLeadModalSource] = useState('Geral');
  const [leadModalProperty, setLeadModalProperty] = useState<Property | undefined>(undefined);

  // Orulo API management modal state
  const [isOruloModalOpen, setIsOruloModalOpen] = useState(false);

  // Sync with browser URL
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname || '/';
      const searchParams = new URLSearchParams(window.location.search);
      const bairroParam = searchParams.get('bairro');

      if (bairroParam) {
        setInitialNeighborhoodFilter(bairroParam);
      } else {
        setInitialNeighborhoodFilter('all');
      }

      // Check if property detail slug
      if (pathname.startsWith('/empreendimentos/')) {
        const slug = pathname.replace('/empreendimentos/', '').replace(/\/$/, '');
        const found = PROPERTIES.find((p) => p.slug === slug);
        if (found) {
          setSelectedProperty(found);
        }
      } else {
        setSelectedProperty(null);
      }

      // Check if blog post slug
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
        setBlogPostSlug(slug);
      } else {
        setBlogPostSlug(null);
      }

      setCurrentPath(pathname);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    
    // Parse query params if any
    const [pathname, search] = path.split('?');
    if (search) {
      const searchParams = new URLSearchParams(search);
      const b = searchParams.get('bairro');
      if (b) setInitialNeighborhoodFilter(b);
    }

    if (pathname.startsWith('/empreendimentos/')) {
      const slug = pathname.replace('/empreendimentos/', '').replace(/\/$/, '');
      const found = PROPERTIES.find((p) => p.slug === slug);
      setSelectedProperty(found || null);
    } else {
      setSelectedProperty(null);
    }

    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
      setBlogPostSlug(slug);
    } else {
      setBlogPostSlug(null);
    }

    setCurrentPath(pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    navigate(`/empreendimentos/${property.slug}`);
  };

  const handleOpenLeadModal = (source: string, property?: Property) => {
    setLeadModalSource(source);
    setLeadModalProperty(property || selectedProperty || undefined);
    setIsLeadModalOpen(true);
  };

  const handleNavigateToCatalogWithNeighborhood = (neighborhood: string) => {
    setInitialNeighborhoodFilter(neighborhood);
    navigate(`/empreendimentos?bairro=${encodeURIComponent(neighborhood)}`);
  };

  // Render current view
  const renderContent = () => {
    // 1. Single Property Detail View
    if (selectedProperty) {
      return (
        <PropertyDetailPage
          property={selectedProperty}
          onBack={() => navigate('/empreendimentos')}
          onOpenLeadModal={(source) => handleOpenLeadModal(source, selectedProperty)}
          onSelectProperty={handleSelectProperty}
        />
      );
    }

    // 2. Exact Path Router
    if (currentPath === '/empreendimentos') {
      return (
        <PropertiesPage
          onSelectProperty={handleSelectProperty}
          initialNeighborhood={initialNeighborhoodFilter}
          onOpenLeadModal={(source) => handleOpenLeadModal(source)}
        />
      );
    }

    if (currentPath === '/mapa') {
      return (
        <MapViewPage
          onSelectProperty={handleSelectProperty}
          onNavigateToCatalog={() => navigate('/empreendimentos')}
          onOpenLeadModal={(source) => handleOpenLeadModal(source || 'Mapa')}
          initialNeighborhood={initialNeighborhoodFilter}
        />
      );
    }

    if (currentPath === '/mcmv' || currentPath === '/mcmv/zona-sul') {
      return (
        <McmvPage
          onSelectProperty={handleSelectProperty}
          onNavigate={navigate}
          onOpenLeadModal={(source) => handleOpenLeadModal(source)}
        />
      );
    }

    if (currentPath === '/simulador') {
      return (
        <SimulatorPage
          onSelectProperty={handleSelectProperty}
          onOpenLeadModal={(source) => handleOpenLeadModal(source)}
        />
      );
    }

    if (currentPath === '/bairros') {
      return (
        <NeighborhoodsPage
          onNavigateToCatalogWithNeighborhood={handleNavigateToCatalogWithNeighborhood}
          onOpenLeadModal={(source) => handleOpenLeadModal(source)}
        />
      );
    }

    if (currentPath.startsWith('/blog')) {
      return (
        <BlogPage
          onOpenLeadModal={(source) => handleOpenLeadModal(source)}
          onNavigate={navigate}
          initialPostSlug={blogPostSlug}
        />
      );
    }

    if (currentPath === '/politica-de-privacidade') {
      return <LegalPage type="privacidade" />;
    }

    if (currentPath === '/termos-de-uso') {
      return <LegalPage type="termos" />;
    }

    if (currentPath === '/contato') {
      return (
        <ContactPage
          onOpenLeadModal={(source) => handleOpenLeadModal(source)}
        />
      );
    }

    // Default: Home Page
    return (
      <HomePage
        onSelectProperty={handleSelectProperty}
        onNavigate={navigate}
        onOpenLeadModal={(source) => handleOpenLeadModal(source)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      
      {/* Top Bar Navigation */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenLeadModal={(source) => handleOpenLeadModal(source || 'Header')}
        onOpenOruloModal={() => setIsOruloModalOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Trust & Legal Footer */}
      <Footer
        onNavigate={navigate}
        onOpenOruloModal={() => setIsOruloModalOpen(true)}
      />

      {/* Floating Contextual WhatsApp */}
      <WhatsAppFloating />

      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        propertyName={leadModalProperty?.name}
        neighborhood={leadModalProperty?.neighborhood}
        source={leadModalSource}
      />

      {/* Orulo API Live Integration Panel */}
      <OruloIntegrationModal
        isOpen={isOruloModalOpen}
        onClose={() => setIsOruloModalOpen(false)}
        onSelectProperty={handleSelectProperty}
      />

    </div>
  );
}
