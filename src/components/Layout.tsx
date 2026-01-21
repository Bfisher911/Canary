import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Wand2,
    Library,
    MessageSquare,
    Menu,
    X,
    ChevronRight,
    ShieldAlert
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Assistant from './Assistant';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Assessment Wizard', path: '/wizard', icon: Wand2 },
        { name: 'Evidence Library', path: '/library', icon: Library },
    ];

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
            {/* Sidebar */}
            <aside
                className={cn(
                    "sidebar-gradient border-r transition-all duration-300 ease-in-out z-20 flex flex-col",
                    isSidebarOpen ? "w-64" : "w-16"
                )}
            >
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                            <ShieldAlert className="w-6 h-6" />
                            <span>CANARY</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <nav className="flex-1 p-2 space-y-1 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg transition-all group relative",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-card border rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                        className={cn(
                            "flex items-center gap-3 w-full p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-secondary-foreground",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <MessageSquare className="w-5 h-5" />
                        {isSidebarOpen && <span className="font-medium text-sm">Canary Assistant</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <header className="h-14 border-b bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Canary Operations</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium capitalize">
                            {location.pathname === '/' ? 'Dashboard' : location.pathname.substring(1)}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Operational</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </main>

            {/* Assistant Sidebar Overlay/Panel */}
            {isAssistantOpen && (
                <aside className="w-96 border-l glass shadow-2xl flex flex-col z-30 animate-in slide-in-from-right duration-300">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Canary Assistant
                        </h3>
                        <button onClick={() => setIsAssistantOpen(false)}>
                            <X className="w-5 h-5 flex-shrink-0" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Assistant />
                    </div>
                </aside>
            )}
        </div>
    );
};

export default Layout;
