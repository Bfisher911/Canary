import React from 'react';
import { Search, Filter, BookOpen, ExternalLink, Calendar, Tag, Info } from 'lucide-react';

const Library = () => {
    // Mock evidence from our data/demo/evidence.json logic
    const evidence = [
        {
            id: "ev-001",
            title: "Community-based syndromic surveillance for influenza-like illness",
            authors: ["Smith, J.", "Doe, A."],
            journal: "Public Health Reports",
            year: 2023,
            pubDate: "2023-11-15",
            tags: ["surveillance", "influenza", "capacity"],
            hazardFamily: "respiratory",
            whyCanaryCares: "Provides a validated framework for estimating true community prevalence during peak surge."
        },
        {
            id: "ev-002",
            title: "Climate-resilient health infrastructure in coastal regions",
            authors: ["Lee, C.", "Wilson, R."],
            journal: "Environmental Research",
            year: 2024,
            pubDate: "2024-01-10",
            tags: ["infrastructure", "flooding", "resilience"],
            hazardFamily: "flooding",
            whyCanaryCares: "Directly informs facility-level vulnerability assessments for hurricane preparedness."
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Evidence Library</h1>
                    <p className="text-sm text-muted-foreground">Search and filter peer-reviewed literature and agency reports.</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search literature..."
                            className="w-full bg-secondary/30 border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-secondary/50 border rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {evidence.map((item) => (
                    <div key={item.id} className="bg-card/30 border rounded-xl p-6 hover:border-primary/30 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                                        {item.id}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded border">
                                        {item.hazardFamily}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" />
                                        {item.authors.join(', ')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {item.pubDate}
                                    </span>
                                    {item.journal && (
                                        <span className="flex items-center gap-1 italic">
                                            {item.journal}
                                        </span>
                                    )}
                                </div>
                                <div className="p-3 bg-primary/5 border-l-2 border-primary/40 rounded-r-md">
                                    <p className="text-xs italic leading-relaxed text-muted-foreground">
                                        <strong className="text-foreground not-italic mr-1">Why Canary cares:</strong>
                                        {item.whyCanaryCares}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 text-[10px] bg-secondary/30 text-muted-foreground px-2 py-1 rounded-full">
                                            <Tag className="w-3 h-3 opacity-50" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2 shrink-0">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary/80 hover:bg-secondary text-xs px-4 py-2 rounded-lg border transition-colors">
                                    <ExternalLink className="w-3 h-3" />
                                    View Source
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs px-4 py-2 rounded-lg border border-primary/20 transition-colors">
                                    <Info className="w-3 h-3" />
                                    Abstract
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center space-y-2 opacity-50">
                <BookOpen className="w-12 h-12 text-muted-foreground mb-2" />
                <h4 className="text-lg font-semibold text-muted-foreground">End of Search Results</h4>
                <p className="text-sm text-muted-foreground max-w-sm">In real mode, more records are ingested daily from PubMed and agency crawls.</p>
                <button className="mt-4 text-xs text-primary font-bold hover:underline">Trigger Manual Ingestion Job</button>
            </div>
        </div>
    );
};

export default Library;
