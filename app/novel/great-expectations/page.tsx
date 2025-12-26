"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Users } from "lucide-react";

export default function GreatExpectationsPage() {
    const characters = [
        {
            name: "Pip (Philip Pirrip)",
            role: "The Protagonist",
            description: "An orphan who dreams of becoming a gentleman. His journey of self-discovery, ambition, and moral growth forms the heart of the novel.",
            image: "https://comicbook.com/wp-content/uploads/sites/4/2025/04/arthur-havisham-dickensian-still.jpg", // Placeholder for young man
        },
        {
            name: "Estella Havisham",
            role: "The Love Interest",
            description: "Miss Havisham's beautiful but cold adopted daughter. Raised to break men's hearts, she is Pip's unattainable love.",
            image: "https://th.bing.com/th/id/R.0ac82df772e506b8b65cac13a5e6f42e?rik=biez%2bFzA7WUU2g&riu=http%3a%2f%2fwww.aceshowbiz.com%2fimages%2fstill%2fgreat-expecations-omg01.jpg&ehk=PyQ%2frDUVN6kaYk8SPRksSDdbz0tTZnkfQOMPTiH%2bBg8%3d&risl=&pid=ImgRaw&r=0", // Placeholder for elegant woman
        },
        {
            name: "Miss Havisham",
            role: "The Eccentric",
            description: "A wealthy spinster who was left at the altar. She lives in Satis House, wearing her wedding dress, frozen in time and bitter.",
            image: "https://3.bp.blogspot.com/-3FtZNLwjnnU/UTn5luoRwfI/AAAAAAAAAWQ/3IsUn6d7TeY/s1600/Helena-Bonham-Carter-As-Miss-Havisham.jpg", // Placeholder for older woman
        },
        {
            name: "Abel Magwitch",
            role: "The Benefactor",
            description: "A fearsome convict whom Pip helps as a child. He later becomes Pip's secret benefactor, funding his transformation into a gentleman.",
            image: "https://ichef.bbci.co.uk/images/ic/480x270/p02cdjlt.jpg",
        },
        {
            name: "Joe Gargery",
            role: "The Faithful Friend",
            description: "Pip's brother-in-law, a blacksmith. He represents simple kindness, loyalty, and unconditional love throughout Pip's life.",
            image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71f0e52e-90da-423b-b8dc-e46aa03d8247/di4dm3d-f6fe4336-e69f-4040-af4a-2dd447ae00c3.jpg/v1/fill/w_1024,h_768,q_75,strp/joe_gargery__great_expectations___a_large__strong__by_jameshosie1995_di4dm3d-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvNzFmMGU1MmUtOTBkYS00MjNiLWI4ZGMtZTQ2YWEwM2Q4MjQ3XC9kaTRkbTNkLWY2ZmU0MzM2LWU2OWYtNDA0MC1hZjRhLTJkZDQ0N2FlMDBjMy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.I_ft-UCgs9fxi-SW0liWVAQEl5_Yp1uYadIRjkawBE8", // Placeholder for kind man
        },
        {
    name: "Biddy",
    role: "Wisdom and Simplicity",
    description: "A kind, intelligent village girl who helps Pip with his education. She represents moral clarity, humility, and contentment. Pip later realizes her true worth.",
    image: "https://image.tmdb.org/t/p/original/fD2cEAUsjmuyRAoiLhyUgMtQNnP.jpg", 
        },
{
    name: "Mrs. Joe Gargery",
    role: "Harsh Authority",
    description: "Pip’s elder sister who raises him 'by hand'. She is violent, bitter, and dominating. After being attacked, she becomes quieter, showing how cruelty damages relationships.",
    image: "https://tse2.mm.bing.net/th/id/OIP.dLyjyhrzNmwgwVnQZad8MwHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", // Placeholder for stern woman
},
{
    name: "Herbert Pocket",
    role: "The Loyal Friend",
    description: "Pip’s closest friend in London. Cheerful, honest, and supportive, Herbert stands by Pip during financial trouble and helps plan Magwitch’s escape.",
    image: "https://th.bing.com/th/id/R.3104d8ad0d6159aa69a8ac94c2705c16?rik=AsdrMABPNa1A9Q&pid=ImgRaw&r=0", // Placeholder for friendly young man
},
{
    name: "Mr. Jaggers",
    role: "Law and Power",
    description: "A powerful and intimidating lawyer who manages Pip’s expectations. He represents the cold, emotionless nature of the legal system and social power.",
    image: "https://th.bing.com/th/id/OIP.jQ-u9oHKDPwvoywLYaMVKQHaDz?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", // Placeholder for stern lawyer
},
{
    name: "Wemmick",
    role: "Dual Personality",
    description: "Jaggers’ clerk who shows two personalities: cold and practical at work, but warm and caring at home. He teaches Pip the importance of separating work from personal life.",
    image: "https://th.bing.com/th/id/R.c4b49daa16765065aa551b2ebf13f2f4?rik=XJ%2bKWfKUjvdFkg&pid=ImgRaw&r=0", // Placeholder for quirky man
},

    ];

    return (
        <div className="min-h-screen bg-background text-foreground pt-28">
            {/* Header Area */}
            <section className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-6">
                        <ArrowLeft size={20} className="mr-2" /> Back to Home
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Great Expectations</h1>
                        <p className="text-xl text-gray-300 font-light">Charles Dickens • XII Class Standard</p>
                    </motion.div>
                </div>
            </section>

            {/* Book Iframe Section */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
                >
                    <iframe
                        allowFullScreen
                        scrolling="no"
                        className="w-full h-full border-none"
                        src="https://heyzine.com/flip-book/16b9353d31.html"
                    ></iframe>
                </motion.div>
                <div className="flex justify-center mt-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><BookOpen size={16} /> Interactive Flipbook Experience</p>
                </div>
            </section>

            {/* Characters Section */}
            <section className="bg-secondary/20 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-full mb-4">
                            <Users className="text-amber-600 size-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-primary">Key Characters</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Meet the memorable cast that brings this classic tale of ambition and redemption to life.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {characters.map((char, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 group"
                            >
                                <div className="relative h-64 overflow-hidden bg-slate-200">
                                    <Image
                                        src={char.image}
                                        alt={char.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold">{char.name}</h3>
                                        <p className="text-amber-300 text-sm font-medium">{char.role}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-muted-foreground leading-relaxed">{char.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
