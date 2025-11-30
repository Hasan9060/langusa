'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if it's mobile
        const isMobile = window.innerWidth < 768;

        if (!isMobile) return;

        // Check if it's iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIosDevice);

        // Check if running in standalone mode (already installed)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

        if (isStandalone) return;

        // Check if user already dismissed it
        const dismissed = localStorage.getItem('install-prompt-dismissed');
        if (dismissed) return;

        // Handle Android/Desktop install prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Show prompt after delay
        const timer = setTimeout(() => {
            setShowPrompt(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowPrompt(false);
                localStorage.setItem('install-prompt-dismissed', 'true');
            }
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('install-prompt-dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
                >
                    <div className="bg-background/95 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-2xl flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <img src="/favicon.png" alt="App Icon" className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">Install App</h3>
                                    <p className="text-xs text-muted-foreground">Add to Home Screen for better experience</p>
                                </div>
                            </div>
                            <button
                                onClick={handleDismiss}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {isIOS ? (
                            <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    1. Tap the <Share size={16} /> Share button
                                </div>
                                <div className="flex items-center gap-2">
                                    2. Scroll down and tap "Add to Home Screen"
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={handleInstallClick}
                                className="w-full bg-primary text-primary-foreground font-bold rounded-xl"
                            >
                                <Download size={18} className="mr-2" />
                                Install Now
                            </Button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
