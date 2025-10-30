"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  Unlock,
  BookOpen,
  User as UserIcon,
  X,
  Loader2,
  Copy,
  CheckCheck,
  MessageSquare,
  Shield,
  CheckCircle2,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book, PaymentCode } from "@/components/interface";
import { books as booksData } from "@/components/booksdata";
import { Rancho } from "next/font/google";

const rancho = Rancho({
  weight: "400",
  subsets: ["latin"],
});

// -----------------------------
// Types
// -----------------------------
export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  purchasedBooks: string[];
  usedCodes: string[];
}

// -----------------------------
// Helpers
// -----------------------------
const LS_USER = "bookLibraryUser_v2";
const LS_CODES = "bookLibraryCodes_v2";

const defaultPaymentCodes: PaymentCode[] = [
  { code: "IELTS1", bookId: "4", used: false, usedBy: null, usedAt: null, expiresAt: "2025-12-31" },
  { code: "IELTS2", bookId: "4", used: false, usedBy: null, usedAt: null, expiresAt: "2025-12-31" },
  { code: "WRITE1", bookId: "6", used: false, usedBy: null, usedAt: null, expiresAt: "2025-12-31" },
  { code: "EMAIL1", bookId: "8", used: false, usedBy: null, usedAt: null, expiresAt: "2025-12-31" },
];

const whatsappNumber = "03161941733";
const whatsappName = "Watch to Lead";

// small util to safely parse JSON
function safeParse<T>(v: string | null, fallback: T): T {
  try {
    return v ? (JSON.parse(v) as T) : fallback;
  } catch (e) {
    return fallback;
  }
}

// -----------------------------
// Main Page
// -----------------------------
export default function BooksLibraryPage() {
  // State initialization without localStorage on server
  const [user, setUser] = useState<User | null>(null);
  const [paymentCodes, setPaymentCodes] = useState<PaymentCode[]>(defaultPaymentCodes);
  const [isClient, setIsClient] = useState(false);

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [paymentFormCode, setPaymentFormCode] = useState("");
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // login form
  const [loginForm, setLoginForm] = useState({ name: "", phone: "", email: "" });

  // Initialize client-side state after component mounts
  useEffect(() => {
    setIsClient(true);
    // Now we can safely access localStorage
    const storedUser = safeParse(localStorage.getItem(LS_USER), null);
    const storedCodes = safeParse(localStorage.getItem(LS_CODES), defaultPaymentCodes);
    
    setUser(storedUser);
    setPaymentCodes(storedCodes);
  }, []);

  // responsive
  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isClient]);

  // persist payment codes & user
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(LS_CODES, JSON.stringify(paymentCodes));
  }, [paymentCodes, isClient]);

  useEffect(() => {
    if (!isClient) return;
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_USER);
  }, [user, isClient]);

  // class filters
  const classOptions = [
    { value: "all", label: "All Classes" },
    { value: "IX", label: "Class IX" },
    { value: "X", label: "Class X" },
    { value: "XI", label: "Class XI" },
    { value: "XII", label: "Class XII" },
    { value: "ADS", label: "Class ADS" },
    { value: "Advanced", label: "Advanced" },
  ];

  // basic filters
  const filtered = useMemo(() => {
    return booksData.filter((b) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQ =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)

      const matchesClass = selectedClass === "all" || b.level === selectedClass;
      const matchesFree = !showFreeOnly || !b.isPaid;

      return matchesQ && matchesClass && matchesFree;
    });
  }, [searchQuery, selectedClass, showFreeOnly]);

  const sortedBooks = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "popular") return (b.downloadCount || 0) - (a.downloadCount || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "newest") return new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime();
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [filtered, sortBy]);

  // --- Authentication ---
  const handleLogin = () => {
    if (!loginForm.name || !loginForm.phone) {
      alert("Please enter name and phone number");
      return;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name: loginForm.name,
      phone: loginForm.phone,
      email: loginForm.email || undefined,
      purchasedBooks: user?.purchasedBooks || [],
      usedCodes: user?.usedCodes || [],
    };
    setUser(newUser);
    setShowLoginModal(false);
    setLoginForm({ name: "", phone: "", email: "" });

    // if there was an intent to buy
    if (selectedBook) {
      if (selectedBook.isPaid) setShowPaymentModal(true);
      else triggerDownload(selectedBook);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // copy whatsapp number
  const copyToClipboard = async (txt: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // download flow with checks
  const onDownloadClick = (book: Book) => {
    // if book is paid and user hasn't purchased
    if (book.isPaid && !user?.purchasedBooks.includes(book.id)) {
      setSelectedBook(book);
      if (!user) setShowLoginModal(true);
      else setShowPaymentModal(true);
      return;
    }

    triggerDownload(book);
  };

  // simulate download (keeps code simple, replace with actual streaming later)
  const triggerDownload = async (book: Book) => {
    setDownloadProgress((p) => ({ ...p, [book.id]: 0 }));

    for (let i = 0; i <= 100; i += 20) {
      // small wait
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 120));
      setDownloadProgress((p) => ({ ...p, [book.id]: i }));
    }

    // actual anchor-based download (works for public static PDFs)
    const a = document.createElement("a");
    a.href = book.pdfUrl;
    a.download = `${book.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // reset progress
    setTimeout(() => setDownloadProgress((p) => ({ ...p, [book.id]: 0 })), 800);
  };

  // payment form submission
  const handlePaymentSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!selectedBook || !user) return;
    const code = paymentFormCode.trim().toUpperCase();
    if (!code) return alert("Please enter the 6-digit code you received on WhatsApp.");

    setIsLoading(true);
    // simulate verification
    await new Promise((r) => setTimeout(r, 800));

    // find matching code
    const idx = paymentCodes.findIndex((pc) => pc.code === code && pc.bookId === selectedBook.id);
    if (idx === -1) {
      setIsLoading(false);
      return alert("Invalid code for this book. Please check or contact support.");
    }

    const entry = paymentCodes[idx];
    const expired = new Date(entry.expiresAt).getTime() < Date.now();
    if (entry.used || expired) {
      setIsLoading(false);
      return alert("Code already used or expired. Contact admin for support.");
    }

    // mark used
    const updated = [...paymentCodes];
    updated[idx] = { ...entry, used: true, usedBy: user.id, usedAt: new Date().toISOString() };
    setPaymentCodes(updated);

    // update user purchases
    const updatedUser: User = {
      ...user,
      purchasedBooks: [...user.purchasedBooks, selectedBook.id].filter((v, i, a) => a.indexOf(v) === i),
      usedCodes: [...user.usedCodes, code],
    };
    setUser(updatedUser);

    setIsLoading(false);
    setShowPaymentModal(false);
    setPaymentFormCode("");

    // auto-download
    setTimeout(() => triggerDownload(selectedBook), 300);
  };

  // Don't render anything until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="pt-24 md:pt-20 min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-muted-foreground">Loading library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-20 min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/10">
      {/* Top bar for logged in user */}
      {user && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center">
              <UserIcon className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-semibold text-xs md:text-sm">Welcome, {user.name}</span>
              <span className="text-white/80 text-xs md:ml-2">• {user.purchasedBooks.length} books purchased</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20 h-6 md:h-8 px-2 md:px-3 text-xs">
            <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Logout
          </Button>
        </div>
      )}

      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800 p-3 md:p-6 mb-6 md:mb-8 shadow-lg">
          <div className="mb-4 md:mb-5">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by Class</span>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-64 border-green-200 dark:border-green-800">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-5">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search books, authors, or topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 border-green-200 dark:border-green-800 h-9 md:h-11 text-sm" aria-label="Search books" />
            </div>

            <div className="flex items-center gap-2 col-span-1 sm:col-span-1 lg:col-span-3 justify-end">
              <div className="flex items-center gap-2">
                <Switch checked={showFreeOnly} onCheckedChange={setShowFreeOnly} className="scale-90 md:scale-100" />
                <Label className="text-sm font-medium">Free Books Only</Label>
              </div>
            </div>
          </div>
        </div>

        {sortedBooks.length > 0 ? (
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <AnimatePresence>
              {sortedBooks.map((book, i) => (
                <motion.div key={book.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.03 }}>
                  <BookCard book={book} onDownload={onDownloadClick} downloadProgress={downloadProgress[book.id] || 0} isPurchased={user?.purchasedBooks.includes(book.id) || false} user={user} isMobile={isMobile} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">No books found</h3>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base px-4">Try adjusting your filters or search terms.</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedClass("all"); setShowFreeOnly(false); }} className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-6 py-2 rounded"> <Filter className="w-4 h-4 mr-2"/> Reset Filters</Button>
          </div>
        )}
      </main>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <ModalContainer onClose={() => setShowLoginModal(false)}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white"><UserIcon /></div>
                  <div>
                    <h3 className="text-lg font-bold">Create Account</h3>
                    <p className="text-sm text-muted-foreground">Join to unlock premium books</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowLoginModal(false)}><X /></Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={loginForm.name} onChange={(e) => setLoginForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" value={loginForm.phone} onChange={(e) => setLoginForm((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={loginForm.email} onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))} />
                </div>

                <div className="bg-green-50 rounded-lg p-3 border">
                  <div className="flex gap-3 items-start">
                    <Shield />
                    <div>
                      <p className="font-semibold">Secure & Personal</p>
                      <p className="text-sm text-muted-foreground">We use your details only to manage purchases and progress.</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-green-600 to-blue-600">Create Account & Continue</Button>
              </div>
            </div>
          </ModalContainer>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedBook && (
          <ModalContainer onClose={() => setShowPaymentModal(false)}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Unlock Premium Book</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowPaymentModal(false)}><X /></Button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-3 border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-white flex items-center justify-center"><UserIcon /></div>
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.phone} • {user?.purchasedBooks.length} books</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-green-50 rounded-lg border">
                  <div className="w-14 h-20 rounded bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white"><BookOpen /></div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedBook.title}</h4>
                    <p className="text-sm text-muted-foreground">by {selectedBook.author}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xl font-bold">Rs. {selectedBook.price}</div>
                      <Badge className="text-sm">{selectedBook.pages} pages</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3 border">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">1</div>
                      <div className="flex-1">
                        <div className="font-semibold">Contact on WhatsApp</div>
                        <div className="mt-2 flex items-center justify-between bg-white rounded p-2">
                          <div className="font-mono font-bold">{whatsappNumber}</div>
                          <Button size="sm" onClick={() => copyToClipboard(whatsappNumber)}>{copiedNumber ? <><CheckCheck/>Copied</> : <><Copy/>Copy</>}</Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Send: <strong>{selectedBook.title}</strong> and payment screenshot. We'll reply with a unique code.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3 border">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center">2</div>
                      <div>
                        <div className="font-semibold">Receive Personal Code</div>
                        <p className="text-sm text-muted-foreground">You will get a 6-character code on WhatsApp. Enter it below to unlock download.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 border">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center">!</div>
                      <div>
                        <div className="font-semibold">Code Security</div>
                        <p className="text-sm text-muted-foreground">Codes are single-use and tied to your account. Sharing won't work.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="code">6-character Code</Label>
                    <Input id="code" value={paymentFormCode} onChange={(e) => setPaymentFormCode(e.target.value.toUpperCase())} placeholder="Enter code from WhatsApp" maxLength={8} />
                  </div>

                  <Button type="submit" disabled={isLoading || paymentFormCode.trim().length < 4} className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                    {isLoading ? (<><Loader2 className="animate-spin"/> Verifying...</>) : (<><CheckCircle2/> Verify & Download</>)}
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">Need help? Message us on WhatsApp.</div>
              </div>
            </div>
          </ModalContainer>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------
// Modal wrapper component
// -----------------------------
function ModalContainer({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 z-50" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white dark:bg-gray-900 rounded-xl p-4 w-full max-w-md shadow-2xl border" onClick={(e) => e.stopPropagation()}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// -----------------------------
// BookCard Component
// -----------------------------
function BookCard({ book, onDownload, downloadProgress, isPurchased, user, isMobile }: { book: Book; onDownload: (b: Book) => void; downloadProgress: number; isPurchased: boolean; user: User | null; isMobile: boolean; }) {
  const [hover, setHover] = useState(false);

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 border rounded-lg overflow-hidden shadow transition hover:shadow-lg" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className={cn("relative overflow-hidden", isMobile ? "w-full h-64" : "sm:w-48 md:w-56 h-48")}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 z-10" />
            <Image src={book.coverImage} alt={book.title} width={400} height={420} className="w-full h-auto max-h-[420px] object-cover rounded-xl sm:max-h-[360px] md:max-h-[400px] lg:max-h-[420px]" />
            <div className="absolute top-3 left-3 z-20">
              {book.isPaid ? (<Badge className="bg-gradient-to-r from-red-500 to-red-500 text-white px-3 py-1"> <Lock className="w-3 h-3 mr-1"/> Premium</Badge>) : (<Badge className="bg-green-100 text-green-700 px-3 py-1"><Unlock className="w-3 h-3 mr-1"/> Free</Badge>)}
            </div>
            {!isMobile && (
              <motion.div initial={false} animate={{ opacity: hover ? 1 : 0 }} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"> <Eye className="w-8 h-8"/> </motion.div>
            )}
          </div>

          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <div className="min-w-0">
                  <h3 className={`${rancho.className} text-3xl font-bold line-clamp-2`}>{book.title}</h3>
                  <p className="text-sm text-muted-foreground">Download your book from Watch to Lead</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{book.level}</Badge>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {book.isPaid ? (<div className="text-xl font-bold">Rs. {book.price}</div>) : (<Badge className="px-3 py-1">Free</Badge>)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-xs text-muted-foreground">Uploaded: {new Date(book.uploadedDate).toLocaleDateString()}</div>
              <Button onClick={() => onDownload(book)} disabled={downloadProgress > 0} className={cn("gap-2 min-w-[140px] text-xs", book.isPaid && !isPurchased ? "bg-gradient-to-r from-green-600 to-green-600 text-white" : "bg-gradient-to-r from-green-600 to-green-600 text-white")}>
                {downloadProgress > 0 ? (<><Loader2 className="animate-spin"/> {downloadProgress}%</>) : book.isPaid && !isPurchased ? (<><ShoppingCart/> {user ? "Buy Now" : "Register to Buy"}</>) : (<><Download/> Download PDF</>) }
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}