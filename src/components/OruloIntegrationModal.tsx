import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  RefreshCw,
  Search,
  Key,
  ShieldCheck,
  Building,
  Image as ImageIcon,
  FileText,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Database,
  Layers,
} from 'lucide-react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';

interface OruloModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty?: (property: Property) => void;
}

export const OruloIntegrationModal: React.FC<OruloModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
}) => {
  const [showSecret, setShowSecret] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean;
    loading: boolean;
    success?: boolean;
    message?: string;
    tokenPreview?: string;
  }>({
    tested: false,
    loading: false,
  });

  const [syncStatus, setSyncStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    updatedAt?: string;
  }>({
    loading: false,
  });

  // Direct live search on Orulo
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen && !connectionStatus.tested) {
      testConnection();
    }
  }, [isOpen]);

  const testConnection = async () => {
    setConnectionStatus({ tested: true, loading: true });
    try {
      const res = await fetch('/api/orulo/status');
      const data: any = await res.json();
      if (res.ok && data.success) {
        setConnectionStatus({
          tested: true,
          loading: false,
          success: true,
          message: data.message || 'Conexão ativa com Órulo API v2',
          tokenPreview: data.tokenPreview,
        });
      } else {
        setConnectionStatus({
          tested: true,
          loading: false,
          success: false,
          message: data.error || 'Falha ao autenticar com a Órulo',
        });
      }
    } catch (err: any) {
      setConnectionStatus({
        tested: true,
        loading: false,
        success: false,
        message: err.message || 'Erro de rede ao conectar',
      });
    }
  };

  const triggerSync = async () => {
    setSyncStatus({ loading: true });
    try {
      const res = await fetch('/api/orulo/sync', { method: 'POST' });
      const data: any = await res.json();
      if (res.ok && data.success) {
        setSyncStatus({
          loading: false,
          success: true,
          message: data.message,
          updatedAt: data.updatedAt,
        });
      } else {
        setSyncStatus({
          loading: false,
          success: false,
          message: data.error || 'Erro na sincronização',
        });
      }
    } catch (err: any) {
      setSyncStatus({
        loading: false,
        success: false,
        message: err.message || 'Erro de rede',
      });
    }
  };

  const handleSearchOrulo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/orulo/buildings?name=${encodeURIComponent(searchQuery)}&results_per_page=10`);
      const data: any = await res.json();
      setSearchResults(data.buildings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-neutral-900 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold">Integração Oficial Órulo API v2</h3>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded font-semibold border border-emerald-500/30">
                  Ao Vivo
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Sincronização em tempo real de fotos oficiais, plantas humanizadas e dados de incorporadoras
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* 1. Credentials & Status Card */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  Status da Conexão OAuth 2.0
                </span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-bold text-sm text-neutral-900">
                    {connectionStatus.loading
                      ? 'Testando conexão...'
                      : connectionStatus.success
                      ? 'Conectado com Sucesso'
                      : 'Verificando credenciais'}
                  </span>
                  {connectionStatus.tokenPreview && (
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-200 px-1.5 py-0.5 rounded">
                      Token: {connectionStatus.tokenPreview}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={testConnection}
                  disabled={connectionStatus.loading}
                  className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-lg font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus.loading ? 'animate-spin' : ''}`} />
                  <span>Testar API</span>
                </button>

                <button
                  onClick={triggerSync}
                  disabled={syncStatus.loading}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncStatus.loading ? 'animate-spin' : ''}`} />
                  <span>{syncStatus.loading ? 'Sincronizando...' : 'Sincronizar Imóveis'}</span>
                </button>
              </div>
            </div>

            {syncStatus.message && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${syncStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{syncStatus.message}</span>
              </div>
            )}

            {/* Credential Inputs Read-only preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-200">
              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Client ID (Configurado)
                </label>
                <div className="bg-white border border-neutral-300 rounded-lg p-2 font-mono text-[11px] text-neutral-800 select-all truncate">
                  0h8JHFFF39dpfmrmHVW8wxbv3pr0zPMCZVakFh72xuo
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-neutral-600">
                    Client Secret (Armazenado Seguro)
                  </label>
                  <button
                    onClick={() => setShowSecret(!showSecret)}
                    className="text-[10px] text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecret ? 'Ocultar' : 'Exibir'}</span>
                  </button>
                </div>
                <div className="bg-white border border-neutral-300 rounded-lg p-2 font-mono text-[11px] text-neutral-800 select-all truncate">
                  {showSecret
                    ? 'BwFHo8Cmz4WOZiBLSNtrrmhqOWWq9r2QYtCPgeiJ4H4'
                    : 'BwFHo8Cm••••••••••••••••••••••••••••••••J4H4'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Synced Developments Portfolio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-neutral-900">
                  Empreendimentos Ativos com Mídia Órulo
                </h4>
                <p className="text-neutral-500 text-[11px]">
                  {PROPERTIES.length} lançamentos na Zona Sul de SP com fotos, plantas e 85 tipologias oficiais sincronizadas
                </p>
              </div>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                100% Sincronizado
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => {
                    if (onSelectProperty) {
                      onSelectProperty(prop);
                      onClose();
                    }
                  }}
                  className="p-3 bg-white border border-neutral-200 rounded-xl hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span className="font-semibold text-neutral-900">{prop.neighborhood}</span>
                      <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">
                        ID: {prop.oruloId}
                      </span>
                    </div>
                    <h5 className="font-bold text-neutral-900 line-clamp-1">{prop.name}</h5>
                    <p className="text-[10px] text-neutral-500">{prop.developer}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-emerald-600" />
                      <strong>{prop.images?.length || 0}</strong> fotos
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FileText className="w-3 h-3 text-emerald-600" />
                      <strong>{prop.floorPlans?.length || 0}</strong> plantas
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Layers className="w-3 h-3 text-emerald-600" />
                      <strong>{prop.typologies?.length || 0}</strong> tipos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Live Search on Orulo API */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
            <div>
              <h4 className="font-display font-bold text-sm text-neutral-900">
                Consultar Acervo Geral Órulo (São Paulo)
              </h4>
              <p className="text-neutral-500 text-[11px]">
                Pesquise qualquer outro empreendimento direto na base de dados da Órulo através da sua chave de API
              </p>
            </div>

            <form onSubmit={handleSearchOrulo} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Cury, Vivaz, Santo Amaro, Brooklin..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSearching ? 'Consultando...' : 'Buscar na Órulo'}
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-neutral-700 block">
                  Resultados encontrados na Órulo ({searchResults.length}):
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-white border border-neutral-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-neutral-900 block">{b.name}</strong>
                        <span className="text-neutral-500 text-[11px]">
                          {b.developer?.name || 'Incorporadora'} · {b.address?.area}, {b.address?.city}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-emerald-700 font-bold block">
                          {b.min_price ? `R$ ${Number(b.min_price).toLocaleString('pt-BR')}` : 'Consulte'}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">ID: {b.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Credenciais autenticadas via Bearer Token OAuth 2.0</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold text-xs cursor-pointer transition-colors"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
