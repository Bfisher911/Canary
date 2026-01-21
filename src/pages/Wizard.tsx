import React, { useState } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    MapPin,
    AlertTriangle,
    Users,
    FileText,
    Download,
    AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

const steps = [
    { id: 1, title: 'Geography', icon: MapPin },
    { id: 2, title: 'Hazard', icon: AlertTriangle },
    { id: 3, title: 'Factors', icon: Users },
    { id: 4, title: 'Worksheet', icon: FileText },
];

const Wizard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        location: '',
        hazard: 'heat',
        populationFactors: [],
        infrastructureFactors: [],
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const hazardFamilies = [
        { id: 'heat', label: 'Extreme Heat', description: 'Thermal stress and health impacts.' },
        { id: 'flooding', label: 'Coastal/Inland Flooding', description: 'Surge, runoff, and infrastructure risk.' },
        { id: 'respiratory', label: 'Respiratory Outbreak', description: 'Flu, COVID, or emerging pathogens.' },
        { id: 'wildfire_smoke', label: 'Wildfire Smoke (AQI)', description: 'Particulate matter and respiratory health.' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Guided Assessment Wizard</h1>
                <p className="text-sm text-muted-foreground">Develop a site-specific vulnerability worksheet in four steps.</p>
            </div>

            {/* Stepper */}
            <div className="relative flex justify-between items-center px-4">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -translate-y-1/2 -z-10"></div>
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                        <div
                            className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                currentStep >= step.id ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-card border-secondary text-muted-foreground"
                            )}
                        >
                            {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                        </div>
                        <span className={clsx("text-xs font-medium", currentStep >= step.id ? "text-primary" : "text-muted-foreground")}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-card/30 border rounded-2xl p-8 min-h-[400px] flex flex-col">
                {currentStep === 1 && (
                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Step 1: Define Geography</h2>
                            <p className="text-sm text-muted-foreground">Select the jurisdiction or specific assets for this assessment.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State / Region</label>
                                <select className="w-full bg-secondary/50 border rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none">
                                    <option>Illinois</option>
                                    <option>Florida</option>
                                    <option>California</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">County / Municipality</label>
                                <select className="w-full bg-secondary/50 border rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none">
                                    <option>Cook County</option>
                                    <option>Miami-Dade</option>
                                    <option>Los Angeles</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 p-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                <MapPin className="w-8 h-8 text-muted-foreground" />
                                <div className="text-xs text-muted-foreground">Custom Polygon Drawing (Demo Placeholder)</div>
                                <button className="text-[10px] bg-secondary px-3 py-1 rounded border">Launch Map Selector</button>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Step 2: Select Hazard Family</h2>
                            <p className="text-sm text-muted-foreground">Which primary hazard drives this vulnerability assessment?</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hazardFamilies.map((h) => (
                                <button
                                    key={h.id}
                                    onClick={() => setFormData({ ...formData, hazard: h.id })}
                                    className={clsx(
                                        "flex flex-col text-left p-4 rounded-xl border transition-all",
                                        formData.hazard === h.id ? "bg-primary/10 border-primary ring-1 ring-primary" : "bg-secondary/30 border-white/5 hover:border-white/10"
                                    )}
                                >
                                    <span className="font-bold">{h.label}</span>
                                    <span className="text-xs text-muted-foreground mt-1">{h.description}</span>
                                </button>
                            ))}
                            <div className="md:col-span-2">
                                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-4">
                                    <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                    <div className="text-xs text-orange-400 leading-relaxed">
                                        <strong>Note:</strong> Multi-hazard assessments (e.g., Cascading Infrastructure Failure) are available in the advanced panel.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Step 3: Asset & Population Factors</h2>
                            <p className="text-sm text-muted-foreground">Select the variables that contribute to sensitivity and adaptive capacity.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Population Sensitivity</h4>
                                {['Age (65+)', 'Pre-existing respiratory condition', 'Income below poverty level', 'Limited English proficiency'].map(f => (
                                    <label key={f} className="flex items-center gap-3 group cursor-pointer">
                                        <input type="checkbox" className="rounded bg-secondary/50 border-white/10 text-primary focus:ring-primary w-4 h-4" />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{f}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Infrastructure Capacity</h4>
                                {['Hospital beds per 1k', 'Emergency Shelter capacity', 'Power redundance (Microgrids)', 'Evacuation route density'].map(f => (
                                    <label key={f} className="flex items-center gap-3 group cursor-pointer">
                                        <input type="checkbox" className="rounded bg-secondary/50 border-white/10 text-primary focus:ring-primary w-4 h-4" />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{f}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Step 4: Generated Worksheet</h2>
                            <p className="text-sm text-muted-foreground">Review your vulnerability assessment based on current indicators.</p>
                        </div>
                        <div className="overflow-hidden border rounded-xl bg-secondary/20">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-secondary/40 text-muted-foreground uppercase tracking-tight font-bold">
                                    <tr>
                                        <th className="p-3">Geography Unit</th>
                                        <th className="p-3">Exposure</th>
                                        <th className="p-3">Sensitivity</th>
                                        <th className="p-3">Adaptive Cap.</th>
                                        <th className="p-3">V-Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="p-3 font-medium">District {i}</td>
                                            <td className="p-3 text-red-400">High</td>
                                            <td className="p-3 text-orange-400">Mod</td>
                                            <td className="p-3 text-green-400">Strong</td>
                                            <td className="p-3 font-bold">{Math.floor(Math.random() * 40) + 50}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold p-3 rounded-xl border border-primary/20 transition-all">
                                <Download className="w-4 h-4" />
                                Download CSV
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold p-3 rounded-xl border border-primary/20 transition-all">
                                <Download className="w-4 h-4" />
                                Download XLSX
                            </button>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-0 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>
                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        {currentStep === steps.length ? 'Restart Wizard' : 'Next Step'}
                        {currentStep !== steps.length && <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Wizard;
