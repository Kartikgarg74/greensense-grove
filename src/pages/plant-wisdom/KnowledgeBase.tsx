
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Tag, Clock, ArrowUpDown, Star, Bookmark, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AYURVEDIC_ARTICLES = [
  {
    id: 1,
    title: 'Understanding Tulsi (Holy Basil) in Ayurvedic Medicine',
    excerpt: 'Explore the extensive benefits and traditional uses of Tulsi in Ayurvedic healing practices.',
    tags: ['Respiratory', 'Immunity', 'Adaptogen'],
    date: '2 weeks ago',
    readTime: '8 min read',
    bookmarked: true
  },
  {
    id: 2,
    title: 'Triphala: The Three Fruits Blend for Digestive Health',
    excerpt: 'Discover how this powerful combination of Amalaki, Bibhitaki, and Haritaki promotes digestive wellness.',
    tags: ['Digestion', 'Detox', 'Balance'],
    date: '1 month ago',
    readTime: '12 min read',
    bookmarked: false
  },
  {
    id: 3,
    title: 'Ashwagandha: Ancient Remedy for Modern Stress',
    excerpt: 'Learn how this powerful adaptogenic herb helps combat stress and promotes overall wellbeing.',
    tags: ['Stress', 'Sleep', 'Vitality'],
    date: '2 months ago',
    readTime: '10 min read',
    bookmarked: true
  },
  {
    id: 4,
    title: 'The Five Elements (Pancha Mahabhutas) in Ayurveda',
    excerpt: 'Understanding the elemental foundations of Ayurvedic medicine and their role in health balance.',
    tags: ['Philosophy', 'Elements', 'Balance'],
    date: '3 months ago',
    readTime: '15 min read',
    bookmarked: false
  },
  {
    id: 5,
    title: 'Seasonal Herbs: Adapting Ayurvedic Practices Through the Year',
    excerpt: 'How to adjust your herbal supplements and practices according to seasonal changes.',
    tags: ['Seasonal', 'Herbs', 'Routine'],
    date: '4 months ago',
    readTime: '9 min read',
    bookmarked: false
  }
];

const POPULAR_TAGS = ['Immunity', 'Digestion', 'Stress Relief', 'Sleep', 'Respiratory', 'Skin Health', 'Detox', 'Women\'s Health', 'Energy', 'Brain Function'];

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [articles, setArticles] = useState(AYURVEDIC_ARTICLES);
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'bookmarked') {
      return matchesSearch && article.bookmarked;
    }
    
    return matchesSearch;
  });

  const toggleBookmark = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, bookmarked: !article.bookmarked } : article
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-amber-50 py-8 md:py-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/fdf6e3/c5a855?text=Ayurvedic+Knowledge')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-amber-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-amber-100 text-amber-600 text-sm font-medium mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>Ayurvedic Knowledge Base</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Ancient Wisdom for <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Modern Wellness</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Explore our comprehensive collection of Ayurvedic knowledge, from plant properties to traditional formulations and modern applications.
                  </p>
                  
                  <div className="relative max-w-xl">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for plants, conditions, or treatments..."
                      className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-8 px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Articles List */}
                <div className="lg:col-span-2">
                  <GlassCard className="p-5 h-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="sm:flex-1">
                        <TabsList className="w-full sm:max-w-[300px] bg-muted/50">
                          <TabsTrigger value="all" className="flex-1">All Articles</TabsTrigger>
                          <TabsTrigger value="bookmarked" className="flex-1">Bookmarked</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Filter className="h-3 w-3" />
                          <span>Filter</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ArrowUpDown className="h-3 w-3" />
                          <span>Sort</span>
                        </Button>
                      </div>
                    </div>
                    
                    {filteredArticles.length > 0 ? (
                      <div className="space-y-6">
                        {filteredArticles.map((article) => (
                          <div key={article.id} className="border border-gray-100 rounded-lg p-5 hover:border-amber-200 transition-colors">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                                {article.title}
                              </h3>
                              <button 
                                onClick={() => toggleBookmark(article.id)}
                                className="text-gray-400 hover:text-amber-500 transition-colors"
                              >
                                <Bookmark className={`h-5 w-5 ${article.bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                              </button>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{article.excerpt}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.map((tag) => (
                                <div 
                                  key={tag} 
                                  className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-full flex items-center gap-1"
                                >
                                  <Tag className="h-3 w-3" />
                                  <span>{tag}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{article.date}</span>
                                </span>
                                <span>{article.readTime}</span>
                              </div>
                              
                              <Button variant="link" size="sm" className="text-amber-600 p-0 h-auto">
                                <span>Read More</span>
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-500 mb-1">No articles found</h3>
                        <p className="text-gray-400">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </GlassCard>
                </div>
                
                {/* Right Panel - Tags & Categories */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <GlassCard className="p-5">
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-amber-500" />
                        <span>Popular Categories</span>
                      </h2>
                      
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_TAGS.map((tag) => (
                          <div 
                            key={tag} 
                            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 text-sm rounded-full cursor-pointer transition-colors flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-5">
                      <h2 className="text-lg font-semibold mb-4">Ayurvedic Resources</h2>
                      
                      <div className="space-y-3">
                        {['Doshas & Prakruti', 'Herbs & Remedies', 'Seasonal Wellness', 'Diet & Nutrition', 'Ancient Texts'].map((resource) => (
                          <div 
                            key={resource} 
                            className="p-3 bg-white rounded-lg border border-gray-100 hover:border-amber-200 cursor-pointer transition-colors flex items-center justify-between"
                          >
                            <span className="font-medium text-gray-700">{resource}</span>
                            <ArrowUpDown className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-5 bg-amber-50">
                      <div className="text-center">
                        <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-amber-800 mb-2">Ask the Experts</h3>
                        <p className="text-amber-700 mb-4 text-sm">
                          Have specific questions about Ayurvedic practices or plant properties?
                        </p>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          Connect with Ayurvedic Practitioner
                        </Button>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default KnowledgeBase;
