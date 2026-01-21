import React, { useEffect, useState } from 'react';
import {
    TrendingUp,
    AlertTriangle,
    BookOpen,
    Activity,
    Download,
    Info,
    Layers,
    Map as MapIcon,
    ChevronRight
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data for the chart
const timelineData = [
    { date: '01/14', score: 35, confidence: 0.8 },
    { date: '01/15', score: 38, confidence: 0.82 },
    { date: '01/16', score: 45, confidence: 0.85 },
    { date: '01/17', score: 52, confidence: 0.88 },
    { date: '01/18', score: 60, confidence: 0.9 },
    { date: '01/19', score: 58, confidence: 0.88 },
    { date: '01/20', score: 65, confidence: 0.92 },
    { date: '01/21', score: 72, confidence: 0.95 },
];

const Dashboard = () => {
    const [activeAlerts, setActiveAlerts] = useState(3);
    const [dataFreshness, setDataFreshness] = useState('2h ago');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Row: Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Data Freshness', value: dataFreshness, sub: 'All sources active', icon: Activity, color: 'text-blue-400' },
                    { label: 'Active Alerts', value: activeAlerts, sub: '2 High, 1 Moderate', icon: AlertTriangle, color: 'text-orange-400' },
                    { label: 'Risk Radar Top 5', value: 'Surge', sub: 'Cook County, IL', icon: TrendingUp, color: 'text-red-400' },
                    { label: 'Evidence Today', value: '12', sub: 'PubMed Ingestion', icon: BookOpen, color: 'text-green-400' },
                ].map((card, i) => (
                    <div key={i} className="bg-card/50 border rounded-xl p-4 flex items-start justify-between group hover:border-primary/50 transition-colors cursor-default">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                        </div>
                        <div className={card.color}>
                            <card.icon className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Row: Map and Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Map Panel */}
                <div className="bg-card/30 border rounded-xl overflow-hidden flex flex-col h-[450px]">
                    <div className="p-4 border-b flex items-center justify-between bg-card/50">
                        <h3 className="font-semibold flex items-center gap-2">
                            <MapIcon className="w-4 h-4 text-primary" />
                            Regional Risk Map
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-xs bg-secondary/50 px-2 py-1 rounded border hover:bg-secondary transition-colors">Heatmap</button>
                            <button className="text-xs bg-secondary/50 px-2 py-1 rounded border hover:bg-secondary transition-colors">Alerts</button>
                        </div>
                    </div>
                    <div className="flex-1 relative bg-slate-900">
                        <MapContainer
                            center={[41.8781, -87.6298]}
                            zoom={10}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                className="grayscale-map"
                            />
                            <CircleMarker
                                center={[41.8781, -87.6298]}
                                radius={20}
                                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.3 }}
                            >
                                <Popup>
                                    <div className="text-slate-900 font-sans">
                                        <strong>Cook County, IL</strong><br />
                                        Risk Level: High (72)<br />
                                        Primary Hazard: Respiratory Surge
                                    </div>
                                </Popup>
                            </CircleMarker>
                        </MapContainer>
                        <div className="absolute bottom-4 left-4 z-[1000] bg-card/80 backdrop-blur-sm p-3 border rounded-lg text-[10px] space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span>High Risk (&gt;70)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <span>Moderate Risk (40-70)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span>Low Risk (&lt;40)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Timeline Panel */}
                <div className="bg-card/30 border rounded-xl overflow-hidden flex flex-col h-[450px]">
                    <div className="p-4 border-b flex items-center justify-between bg-card/50">
                        <h3 className="font-semibold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Risk Timeline & Radar
                        </h3>
                        <button className="text-xs flex items-center gap-1 hover:text-primary transition-colors">
                            <Info className="w-3 h-3" />
                            Explain Scoring
                        </button>
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={timelineData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <h4 className="text-xs font-bold uppercase tracking-tight text-primary mb-2 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Priority Hazard: Respiratory Outbreak (H5N1 Proxy)
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Confidence in this assessment is <strong>High (0.95)</strong>. Observed metrics show an atypical acceleration in ED visits for ILI-symptoms, diverging from 5-year seasonal baselines.
                            </p>
                            <div className="mt-3 flex gap-2">
                                <span className="text-[10px] bg-secondary/80 px-2 py-0.5 rounded border">Surveillance Data</span>
                                <span className="text-[10px] bg-secondary/80 px-2 py-0.5 rounded border">Historical Analogs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Daily Brief */}
            <div className="bg-card/30 border rounded-xl overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between bg-card/50">
                    <h3 className="font-semibold flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-400" />
                        Operational Daily Brief
                    </h3>
                    <div className="flex gap-2">
                        <button className="text-xs flex items-center gap-1 bg-secondary/50 px-3 py-1.5 rounded border hover:bg-secondary transition-colors">
                            <Download className="w-3 h-3" />
                            Markdown
                        </button>
                        <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            View Full Brief
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="prose prose-invert max-w-none">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-1 bg-primary rounded-full"></div>
                            <div>
                                <h2 className="text-lg font-bold mb-0">Executive Summary: Cook County Preparedness</h2>
                                <p className="text-xs text-muted-foreground m-0">Generated Wednesday, Jan 21, 2026 • 08:15 AM</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div>
                                <h4 className="text-sm font-bold border-b border-white/5 pb-2 mb-3">Situational Awareness</h4>
                                <p className="text-sm text-muted-foreground">
                                    Regional respiratory activity remains the primary concern. Wastewater signals in the Metropolitan Water Reclamation District (MWRD) indicate a 22% increase in viral load over the last 72 hours. While hospital capacity remains stable (Currently at 78% occupancy), surge protocols should be reviewed for potential implementation by early February.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold border-b border-white/5 pb-2 mb-3">Priority Actions</h4>
                                <ul className="text-sm text-muted-foreground space-y-2 list-none p-0">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <span>Distribute updated guidance to regional health centers.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <span>Verify current inventory of antiviral therapeutics.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <span>Brief leadership on 14-day risk projections for respiratory surge.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
