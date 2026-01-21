import React, { useState, useRef, useEffect } from 'react';
import {
    Send,
    Bot,
    User,
    Download,
    ExternalLink,
    Sparkles,
    RefreshCcw,
    X
} from 'lucide-react';
import { clsx } from 'clsx';

interface Message {
    role: 'assistant' | 'user';
    content: string;
    type?: 'text' | 'table' | 'checklist' | 'alert';
}

const Assistant = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! I'm Canary, your operational decision support assistant. How can I help you improve preparedness today?",
            type: 'text'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const starters = [
        "Generate today's local public health preparedness brief for Cook County.",
        "Build a heat and power outage vulnerability worksheet for Miami.",
        "What hazards should we plan for in the next 14 days?",
    ];

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulated response for demo mode
        setTimeout(() => {
            let response: Message = { role: 'assistant', content: '', type: 'text' };

            if (text.toLowerCase().includes('brief')) {
                response.content = "I've compiled today's operational brief for Cook County. Key indicators suggest a rising respiratory risk profile. Would you like me to export this as a checklist?";
            } else if (text.toLowerCase().includes('vulnerability')) {
                response.content = "Generating a heat vulnerability worksheet for Miami-Dade. I'm factoring in current humidity indexes and historical power grid stability data.";
                response.type = 'alert';
            } else {
                response.content = "Understood. I'm reviewing the current Evidence Library and Risk Radar for relevant signals. Please standby.";
            }

            setMessages(prev => [...prev, response]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-card/10">
            {/* Headers/Starters */}
            <div className="p-4 border-b border-white/5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Operational Starters
                </p>
                <div className="flex flex-wrap gap-2">
                    {starters.map(s => (
                        <button
                            key={s}
                            onClick={() => handleSend(s)}
                            className="text-[10px] bg-secondary/30 hover:bg-secondary/50 border rounded-lg px-2 py-1 text-left line-clamp-1 max-w-[200px] transition-colors"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-6 scroll-smooth">
                {messages.map((m, i) => (
                    <div key={i} className={clsx("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "")}>
                        <div className={clsx(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                            m.role === 'assistant' ? "bg-primary/20 border-primary/30 text-primary" : "bg-secondary border-white/10 text-muted-foreground"
                        )}>
                            {m.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={clsx(
                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                            m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary/50 border border-white/5",
                            m.type === 'alert' ? "border-orange-500/30 bg-orange-500/5" : ""
                        )}>
                            {m.content}
                            {m.role === 'assistant' && (
                                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3">
                                    <button className="text-[10px] flex items-center gap-1 hover:text-primary transition-colors">
                                        <Download className="w-3 h-3" /> Export MD
                                    </button>
                                    <button className="text-[10px] flex items-center gap-1 hover:text-primary transition-colors">
                                        <ExternalLink className="w-3 h-3" /> Cite Sources
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                            <RefreshCcw className="w-4 h-4 text-primary animate-spin" />
                        </div>
                        <div className="bg-secondary/30 border border-white/5 rounded-2xl px-4 py-3">
                            <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200"></span>
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-white/5 bg-card/30">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="relative"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Review latest respiratory signals..."
                        className="w-full bg-secondary/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-inner"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shrink-0 shadow-lg shadow-primary/20"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
                <p className="text-[9px] text-center text-muted-foreground mt-3 uppercase tracking-tighter opacity-50">
                    Canary AI can make mistakes. Cross-reference with physical stockpiles and official agency notices.
                </p>
            </div>
        </div>
    );
};

export default Assistant;
