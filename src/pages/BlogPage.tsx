import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types/property';
import { updateDocumentSEO } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';

interface BlogPageProps {
  onOpenLeadModal: (source: string) => void;
  onNavigate: (path: string) => void;
  initialPostSlug?: string | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onOpenLeadModal,
  onNavigate,
  initialPostSlug,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  useEffect(() => {
    if (initialPostSlug) {
      const found = BLOG_POSTS.find((p) => p.slug === initialPostSlug);
      if (found) setSelectedPost(found);
    }
  }, [initialPostSlug]);

  useEffect(() => {
    if (selectedPost) {
      updateDocumentSEO({
        title: `${selectedPost.title} | Blog ProntoApto`,
        description: selectedPost.excerpt,
        canonicalPath: `/blog/${selectedPost.slug}`,
        ogType: 'article',
      });
      trackEvent('view_item', { item_type: 'blog_post', title: selectedPost.title });
    } else {
      updateDocumentSEO({
        title: 'Blog Imobiliário e Guia MCMV na Zona Sul | ProntoApto',
        description: 'Artigos práticos, dicas para comprar o primeiro apartamento, regras do Minha Casa Minha Vida, uso do FGTS e guias de bairros na Zona Sul de SP.',
        canonicalPath: '/blog',
      });
      trackEvent('page_view', { page: 'blog_hub' });
    }
  }, [selectedPost]);

  const filteredPosts = BLOG_POSTS.filter((p) => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  });

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todos os artigos</span>
        </button>

        <article className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {selectedPost.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium pt-1">
              <span>{selectedPost.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.author}</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-100 rounded-xl text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed italic border-l-4 border-emerald-600">
            {selectedPost.excerpt}
          </div>

          <div className="space-y-4 text-sm text-neutral-800 leading-relaxed pt-4">
            {selectedPost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>

        {/* Post Footer CTA */}
        <div className="p-7 bg-neutral-900 text-white rounded-2xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border border-neutral-800">
          <div className="space-y-1">
            <h3 className="font-display text-base font-bold text-white">
              Quer saber quais apartamentos se enquadram no seu perfil?
            </h3>
            <p className="text-xs text-neutral-400">
              Faça uma simulação sem custos com nossa equipe de especialistas na Zona Sul.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenLeadModal(`Blog: ${selectedPost.title}`)}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Simular agora
            </button>
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl border border-neutral-700"
              title="Falar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Central de Conhecimento Imobiliário</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Blog ProntoApto: Dicas, MCMV e Financiamento
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Informações claras, sem juridiquês e sem promessas milagrosas, para ajudar você a conquistar seu imóvel na Zona Sul com segurança orçamentária.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
        {[
          { label: 'Todos os artigos', val: 'todos' },
          { label: 'Minha Casa Minha Vida', val: 'Minha Casa Minha Vida' },
          { label: 'Financiamento', val: 'Financiamento' },
          { label: 'FGTS', val: 'FGTS' },
          { label: 'Primeiro Apartamento', val: 'Primeiro Apartamento' },
          { label: 'Zona Sul', val: 'Zona Sul' },
        ].map((cat) => (
          <button
            key={cat.val}
            onClick={() => setSelectedCategory(cat.val)}
            className={`py-1.5 px-3.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === cat.val
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col justify-between space-y-4 hover:border-neutral-300 transition-colors cursor-pointer group hover:shadow-xs"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-emerald-700">{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="font-display text-lg font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {post.title}
              </h2>

              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>{post.publishedDate}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                Ler artigo <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
