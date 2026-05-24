// app/page.tsx — FatherShops website v2 — full rebuild
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, limit } from "firebase/firestore";

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = getApps().length ? getApp() : initializeApp(cfg);
const db  = getFirestore(app);

// ── Colours ───────────────────────────────────────────────────
const DARK = "#0a0a0a";
const GOLD = "#c9a84c";
const MUT  = "#6b6b6b";
const WHITE = "#ffffff";

// ── Language map ──────────────────────────────────────────────
const LANGS = [
  { code:"en", flag:"🇬🇧", label:"English"  },
  { code:"es", flag:"🇪🇸", label:"Español"  },
  { code:"fr", flag:"🇫🇷", label:"Français" },
  { code:"de", flag:"🇩🇪", label:"Deutsch"  },
  { code:"ar", flag:"🇸🇦", label:"العربية"  },
  { code:"zh", flag:"🇨🇳", label:"中文"      },
];

// ── Hero slides ───────────────────────────────────────────────
const SLIDES = [
  {
    title: "New Season\nArrivals",
    sub: "Premium products from 50+ verified global vendors. Curated, quality-guaranteed.",
    cta: "Shop Now",
    img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=85",
  },
  {
    title: "Sell Without\nInventory",
    sub: "List products, get orders, keep the profit. Bank transfer, mobile money and crypto payouts.",
    cta: "Start Free",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85",
  },
  {
    title: "3-Day\nDelivery",
    sub: "Every order ships within 3 business days from our verified vendor network worldwide.",
    cta: "Browse Products",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85",
  },
];

// ── Categories ────────────────────────────────────────────────
const CATS = [
  { name:"Women's Shoes",    img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",  col:2, row:2 },
  { name:"Men's Shoes",      img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",  col:1, row:1 },
  { name:"Women's Clothing", img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",col:1, row:1 },
  { name:"Men's Clothing",   img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",col:1, row:1 },
  { name:"Electronics",      img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",col:1, row:1 },
  { name:"Women's Bags",     img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",col:1, row:1 },
  { name:"Men's Bags",       img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",  col:1, row:1 },
  { name:"Fitness & Sports", img:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",col:1, row:1 },
];

// ── Fallback products ─────────────────────────────────────────
const FALLBACK_PRODUCTS = [
  { id:"p1", name:"Nike Air Force 1 Women's",   category:"Women's Shoes",   vendorName:"Nike",        images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],  variants:[{id:"v1",size:"US 7",color:"White",retailPrice:99.99},{id:"v2",size:"US 8",color:"White",retailPrice:99.99},{id:"v3",size:"US 8",color:"Black",retailPrice:104.99}] },
  { id:"p2", name:"Samsung Galaxy Buds2 Pro",   category:"Electronics",     vendorName:"Samsung",     images:["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"],  variants:[{id:"v1",size:"One Size",color:"Graphite",retailPrice:139.99},{id:"v2",size:"One Size",color:"White",retailPrice:139.99}] },
  { id:"p3", name:"Zara Satin Midi Dress",      category:"Women's Clothing", vendorName:"Zara",        images:["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80"],  variants:[{id:"v1",size:"S",color:"Black",retailPrice:49.99},{id:"v2",size:"M",color:"Black",retailPrice:49.99},{id:"v3",size:"S",color:"Beige",retailPrice:49.99}] },
  { id:"p4", name:"Adidas Ultraboost 23",       category:"Men's Shoes",     vendorName:"Adidas",      images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],  variants:[{id:"v1",size:"US 9",color:"Core Black",retailPrice:139.99},{id:"v2",size:"US 10",color:"Core Black",retailPrice:139.99}] },
  { id:"p5", name:"Levi's 511 Slim Jeans",      category:"Men's Clothing",  vendorName:"Levi's",      images:["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80"],  variants:[{id:"v1",size:"W32",color:"Dark Stonewash",retailPrice:64.99},{id:"v2",size:"W34",color:"Dark Stonewash",retailPrice:64.99}] },
  { id:"p6", name:"Kate Spade Satchel",         category:"Women's Bags",    vendorName:"Kate Spade",  images:["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80"],  variants:[{id:"v1",size:"One Size",color:"Black",retailPrice:129.99},{id:"v2",size:"One Size",color:"Camel",retailPrice:129.99}] },
  { id:"p7", name:"Steve Madden IRENEE Heels",  category:"Women's Shoes",   vendorName:"Steve Madden",images:["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80"],  variants:[{id:"v1",size:"US 7",color:"Nude",retailPrice:59.99},{id:"v2",size:"US 7",color:"Black",retailPrice:59.99}] },
  { id:"p8", name:"Anker 65W GaN Charger",      category:"Electronics",     vendorName:"Anker",       images:["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80"],  variants:[{id:"v1",size:"One Size",color:"White",retailPrice:35.99},{id:"v2",size:"One Size",color:"Black",retailPrice:35.99}] },
];

// ── Stats ─────────────────────────────────────────────────────
const STATS = [
  { v:"10,000+", l:"Active Merchants" },
  { v:"50+",     l:"Countries" },
  { v:"5",       l:"Product Categories" },
  { v:"3 Days",  l:"Guaranteed Delivery" },
];

// ── How it works steps ────────────────────────────────────────
const STEPS = [
  { n:"01", icon:"🏪", t:"Open Your Store",  d:"Sign up free, verify your identity, and go live within 24 hours. No warehouse needed." },
  { n:"02", icon:"📦", t:"Add Products",      d:"Browse 60+ products from verified vendors. Add to your store with one click." },
  { n:"03", icon:"🛒", t:"Receive Orders",    d:"Customers order from your store. Submit the order to start processing." },
  { n:"04", icon:"🚚", t:"Vendor Ships",      d:"Vendor ships directly to your customer within 3 days. You never handle stock." },
  { n:"05", icon:"💰", t:"Get Paid",          d:"Earn profit on every sale. Bank transfer, mobile money, and crypto all supported." },
];

// ── Vendors ───────────────────────────────────────────────────
const VENDORS = [
  { name:"Nike",        logo:"NK", specialty:"Athletic Footwear" },
  { name:"Adidas",      logo:"AD", specialty:"Sports & Lifestyle" },
  { name:"Samsung",     logo:"SG", specialty:"Consumer Electronics" },
  { name:"Zara",        logo:"ZR", specialty:"Contemporary Fashion" },
  { name:"Levi's",      logo:"LV", specialty:"Denim & Casual" },
  { name:"Steve Madden",logo:"SM", specialty:"Women's Footwear" },
  { name:"Anker",       logo:"AK", specialty:"Tech Accessories" },
  { name:"H&M",         logo:"HM", specialty:"Affordable Fashion" },
];

// ── Product Card ──────────────────────────────────────────────
function ProductCard({ p }: { p: any }) {
  const [selId, setSelId]       = useState(p.variants?.[0]?.id ?? "");
  const [hov, setHov]           = useState(false);
  const selVar = p.variants?.find((v: any) => v.id === selId) ?? p.variants?.[0];
  const img1   = p.images?.[0]?.startsWith("http") ? p.images[0] : null;
  const img2   = p.images?.[1]?.startsWith("http") ? p.images[1] : null;
  const sizes  = [...new Set(p.variants?.map((v: any) => v.size) ?? [])];
  const colors = [...new Set(p.variants?.filter((v: any) => v.size === selVar?.size).map((v: any) => v.color) ?? [])];
  const minP   = p.variants?.length ? Math.min(...p.variants.map((v: any) => v.retailPrice)) : 0;
  const maxP   = p.variants?.length ? Math.max(...p.variants.map((v: any) => v.retailPrice)) : 0;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor:"pointer", background:WHITE }}
    >
      {/* Image */}
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", background:"#f5f5f5" }}>
        {img1
          ? <>
              <img src={img1} alt={p.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transition:"opacity .4s", opacity:hov&&img2?0:1 }}/>
              {img2 && <img src={img2} alt={p.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transition:"opacity .4s", opacity:hov?1:0 }}/>}
            </>
          : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, background:"#f0ece4" }}>📦</div>
        }
        {img2 && !hov && <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,.5)", borderRadius:4, padding:"2px 8px", fontSize:9, color:"rgba(255,255,255,.9)", fontWeight:600 }}>+1</div>}
        {p.variants?.length > 1 && <div style={{ position:"absolute", top:10, left:10, background:"rgba(0,0,0,.6)", borderRadius:4, padding:"2px 8px", fontSize:9, color:"#fff", fontWeight:600 }}>{p.variants.length} variants</div>}
        {/* Hover CTA */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px", background:"rgba(10,10,10,.92)", transform:hov?"translateY(0)":"translateY(100%)", transition:"transform .3s", textAlign:"center" }}>
          <a href="http://localhost:3001/signup" style={{ color:GOLD, fontWeight:700, fontSize:11, letterSpacing:"1.5px", textTransform:"uppercase", textDecoration:"none" }}>
            Sell This Product →
          </a>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:"14px 2px 8px" }}>
        <div style={{ fontSize:9, color:MUT, letterSpacing:"1px", textTransform:"uppercase", marginBottom:5 }}>
          {p.category} · {p.vendorName}
        </div>
        <div style={{ fontWeight:700, fontSize:"clamp(12px,1.4vw,14px)", color:DARK, marginBottom:10, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {p.name}
        </div>

        {/* Size selector */}
        {sizes.length > 1 && (
          <div style={{ marginBottom:6 }}>
            <div style={{ fontSize:9, color:MUT, marginBottom:4, textTransform:"uppercase", letterSpacing:".5px" }}>Size</div>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {(sizes as string[]).map(sz => {
                const isSel = selVar?.size === sz;
                return (
                  <button key={sz} onClick={() => {
                    const first = p.variants?.find((v: any) => v.size === sz);
                    if (first) setSelId(first.id);
                  }} style={{ padding:"3px 8px", border:`1px solid ${isSel?DARK:"#e5e5e5"}`, background:isSel?DARK:WHITE, color:isSel?WHITE:DARK, fontSize:10, cursor:"pointer", fontWeight:isSel?700:400 }}>
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Color selector */}
        {colors.length > 1 && (
          <div style={{ marginBottom:8 }}>
            <div style={{ fontSize:9, color:MUT, marginBottom:4, textTransform:"uppercase", letterSpacing:".5px" }}>Color</div>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {(colors as string[]).map(col => {
                const v = p.variants?.find((v: any) => v.size === selVar?.size && v.color === col);
                const isSel = selVar?.color === col;
                return (
                  <button key={col} onClick={() => { if (v) setSelId(v.id); }} style={{ padding:"3px 8px", border:`1px solid ${isSel?DARK:"#e5e5e5"}`, background:isSel?DARK:WHITE, color:isSel?WHITE:DARK, fontSize:10, cursor:"pointer", opacity:v?.stock===0?.4:1 }}>
                    {col}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontWeight:800, fontSize:"clamp(15px,1.8vw,18px)", color:DARK }}>
            {selVar ? `$${selVar.retailPrice.toFixed(2)}` : minP === maxP ? `$${minP.toFixed(2)}` : `$${minP.toFixed(2)}–$${maxP.toFixed(2)}`}
          </span>
          <span style={{ fontSize:10, color:GOLD, fontWeight:700 }}>20% margin</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function HomePage() {
  const [slide, setSlide]         = useState(0);
  const [scrollY, setScrollY]     = useState(0);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [lang, setLang]           = useState("en");
  const [showLang, setShowLang]   = useState(false);
  const [products, setProducts]   = useState<any[]>([]);
  const [loadingP, setLoadingP]   = useState(true);
  const [email, setEmail]         = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const curLang = LANGS.find(l => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    getDocs(query(collection(db, "products"), where("status", "==", "active"), limit(8)))
      .then(s => {
        setProducts(s.empty ? FALLBACK_PRODUCTS : s.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoadingP(false);
      })
      .catch(() => { setProducts(FALLBACK_PRODUCTS); setLoadingP(false); });
  }, []);

  const s = SLIDES[slide];
  const navScrolled = scrollY > 60 || menuOpen;

  return (
    <div style={{ minHeight:"100vh", fontFamily:"'Plus Jakarta Sans',Georgia,sans-serif", background:WHITE, overflowX:"hidden" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"all .3s",
        background: navScrolled ? "rgba(10,10,10,.97)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(255,255,255,.07)" : "none" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration:"none", flexShrink:0 }}>
            <div style={{ fontWeight:900, fontSize:"clamp(17px,3vw,22px)", letterSpacing:"2px", color:WHITE, fontFamily:"Georgia,serif" }}>
              FATHER<span style={{ color:GOLD }}>SHOPS</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div style={{ display:"flex", gap:28, fontSize:11, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" }} className="desk-nav">
            {[["Products","/products"],["How It Works","/#how-it-works"],["Vendors","/#vendors"],["Start Selling","http://localhost:3001/signup"]].map(([l,h]) => (
              <a key={l} href={h} style={{ color:"rgba(255,255,255,.8)", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.8)")}>{l}</a>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            {/* Language */}
            <div style={{ position:"relative" }}>
              <button onClick={() => { setShowLang(v => !v); setMenuOpen(false); }}
                style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", borderRadius:6, padding:"5px 10px", cursor:"pointer", color:"rgba(255,255,255,.9)", fontSize:12, fontWeight:600 }}>
                <span style={{ fontSize:15 }}>{curLang.flag}</span>
                <span className="desk-nav">{curLang.label}</span>
                <span style={{ fontSize:8 }}>▼</span>
              </button>
              {showLang && (
                <div style={{ position:"absolute", right:0, top:38, background:"#0a0a0a", border:"1px solid rgba(255,255,255,.1)", borderRadius:10, overflow:"hidden", zIndex:200, minWidth:150 }}>
                  {LANGS.map(l => (
                    <div key={l.code} onClick={() => { setLang(l.code); setShowLang(false); }}
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", cursor:"pointer",
                        background: lang === l.code ? "rgba(201,168,76,.15)" : "transparent",
                        color: lang === l.code ? GOLD : "rgba(255,255,255,.7)", fontSize:13 }}>
                      <span style={{ fontSize:18 }}>{l.flag}</span>
                      <span style={{ flex:1 }}>{l.label}</span>
                      {lang === l.code && <span style={{ fontSize:11 }}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sign in — desktop */}
            <a href="http://localhost:3001/login" className="desk-nav"
              style={{ padding:"7px 18px", border:"1px solid rgba(255,255,255,.4)", color:WHITE, textDecoration:"none", fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", transition:"all .2s" }}
              onMouseEnter={e => { (e.currentTarget as any).style.background=GOLD; (e.currentTarget as any).style.color=DARK; (e.currentTarget as any).style.borderColor=GOLD; }}
              onMouseLeave={e => { (e.currentTarget as any).style.background="transparent"; (e.currentTarget as any).style.color=WHITE; (e.currentTarget as any).style.borderColor="rgba(255,255,255,.4)"; }}>
              Sign In
            </a>

            {/* Hamburger */}
            <button onClick={() => { setMenuOpen(v => !v); setShowLang(false); }} className="mob-only"
              style={{ width:36, height:36, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", borderRadius:6, color:WHITE, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background:"rgba(10,10,10,.98)", padding:"16px 20px 24px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
            {[["Products","/products"],["How It Works","/#how-it-works"],["Vendors","/#vendors"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)}
                style={{ display:"block", padding:"14px 0", color:"rgba(255,255,255,.85)", textDecoration:"none", fontSize:16, fontWeight:600, borderBottom:"1px solid rgba(255,255,255,.06)" }}>{l}</a>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18 }}>
              <a href="http://localhost:3001/login" style={{ padding:"13px", textAlign:"center", border:"1px solid rgba(255,255,255,.3)", color:WHITE, textDecoration:"none", fontWeight:700, fontSize:14 }}>Sign In</a>
              <a href="http://localhost:3001/signup" style={{ padding:"13px", textAlign:"center", background:GOLD, color:DARK, textDecoration:"none", fontWeight:700, fontSize:14 }}>Start Free</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:"relative", height:"100vh", minHeight:560, overflow:"hidden" }}>
        {/* Background image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${s.img})`, backgroundSize:"cover", backgroundPosition:"center", transition:"all 1.5s ease" }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.82) 0%,rgba(0,0,0,.4) 55%,rgba(0,0,0,.1) 100%)" }}/>
        </div>

        {/* Content */}
        <div style={{ position:"relative", height:"100%", maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center" }}>
          <div style={{ maxWidth:580 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:36, height:1, background:GOLD }}/>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:GOLD }}>FatherShops Platform</span>
            </div>
            <h1 style={{ fontWeight:900, fontSize:"clamp(42px,7vw,88px)", letterSpacing:"-3px", lineHeight:.92, color:WHITE, marginBottom:20, fontFamily:"Georgia,serif", whiteSpace:"pre-line" }}>
              {s.title}
            </h1>
            <p style={{ fontSize:"clamp(15px,1.8vw,18px)", color:"rgba(255,255,255,.7)", lineHeight:1.7, marginBottom:40, maxWidth:440 }}>
              {s.sub}
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href="/products" style={{ padding:"16px 40px", background:GOLD, color:DARK, fontWeight:800, fontSize:13, letterSpacing:"1.5px", textTransform:"uppercase", textDecoration:"none", transition:"all .2s" }}
                onMouseEnter={e => ((e.currentTarget as any).style.background=WHITE)}
                onMouseLeave={e => ((e.currentTarget as any).style.background=GOLD)}>
                {s.cta}
              </a>
              <a href="http://localhost:3001/signup" style={{ padding:"16px 40px", border:"1px solid rgba(255,255,255,.45)", color:WHITE, fontWeight:700, fontSize:13, letterSpacing:"1.5px", textTransform:"uppercase", textDecoration:"none", transition:"border-color .2s" }}
                onMouseEnter={e => ((e.currentTarget as any).style.borderColor=WHITE)}
                onMouseLeave={e => ((e.currentTarget as any).style.borderColor="rgba(255,255,255,.45)")}>
                Open Free Store
              </a>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8 }}>
          {SLIDES.map((_,i) => (
            <div key={i} onClick={() => setSlide(i)}
              style={{ height:2, width:i===slide?44:12, background:i===slide?GOLD:"rgba(255,255,255,.3)", cursor:"pointer", transition:"all .3s", borderRadius:99 }}/>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(0,0,0,.65)", backdropFilter:"blur(10px)", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"16px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:12 }}>
            {STATS.map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontWeight:900, fontSize:"clamp(18px,2.5vw,26px)", color:WHITE, letterSpacing:"-1px" }}>{s.v}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.5)", textTransform:"uppercase", letterSpacing:"1px", marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:DARK, padding:"12px 0", overflow:"hidden", borderBottom:`1px solid ${GOLD}30` }}>
        <div style={{ display:"flex", animation:"marquee 28s linear infinite", whiteSpace:"nowrap" }}>
          {[...Array(3)].map((_,ri) => (
            <div key={ri} style={{ display:"flex", flexShrink:0 }}>
              {["FREE SHIPPING OVER $50","VERIFIED GLOBAL VENDORS","EARN ON EVERY SALE","3-DAY DELIVERY GUARANTEED","BANK · MOBILE MONEY · CRYPTO","IDENTITY-VERIFIED MERCHANTS"].map(t => (
                <span key={t} style={{ fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,.45)", padding:"0 28px" }}>
                  {t} <span style={{ color:GOLD, margin:"0 10px", fontSize:7 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section style={{ padding:"clamp(56px,8vw,88px) clamp(16px,4vw,40px)", maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"clamp(32px,4vw,52px)", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:GOLD, marginBottom:10 }}>Shop by Category</div>
            <h2 style={{ fontWeight:900, fontSize:"clamp(26px,4vw,46px)", letterSpacing:"-1.5px", fontFamily:"Georgia,serif", lineHeight:1 }}>Explore Our World</h2>
          </div>
          <a href="/products" style={{ fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", color:DARK, textDecoration:"none", borderBottom:`2px solid ${DARK}`, paddingBottom:2 }}>All Products →</a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:3 }}>
          {CATS.map((cat, i) => (
            <a key={cat.name} href={`/products?cat=${encodeURIComponent(cat.name)}`}
              style={{ position:"relative", aspectRatio:i===0?"1/1":"2/3", overflow:"hidden", display:"block", textDecoration:"none",
                gridColumn: i===0 ? "span 2" : "span 1", gridRow: i===0 ? "span 2" : "span 1" }}>
              <img src={cat.img} alt={cat.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s" }}
                onMouseEnter={e => ((e.currentTarget as any).style.transform="scale(1.06)")}
                onMouseLeave={e => ((e.currentTarget as any).style.transform="scale(1)")}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 50%)" }}/>
              <div style={{ position:"absolute", bottom:14, left:14, right:14 }}>
                <div style={{ fontSize:i===0?"clamp(13px,2vw,16px)":"clamp(10px,1.5vw,12px)", fontWeight:800, letterSpacing:"1px", textTransform:"uppercase", color:WHITE }}>{cat.name}</div>
                <div style={{ fontSize:9, color:GOLD, marginTop:4, fontWeight:700, letterSpacing:"1px" }}>Shop →</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding:"clamp(40px,6vw,72px) clamp(16px,4vw,40px)", maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"clamp(28px,4vw,44px)", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:GOLD, marginBottom:10 }}>Featured</div>
            <h2 style={{ fontWeight:900, fontSize:"clamp(26px,4vw,44px)", letterSpacing:"-1px", fontFamily:"Georgia,serif" }}>Curated For You</h2>
          </div>
          <a href="/products" style={{ fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", color:DARK, textDecoration:"none", borderBottom:`2px solid ${DARK}`, paddingBottom:2 }}>View All →</a>
        </div>
        {loadingP
          ? <div style={{ textAlign:"center", padding:"60px 0", color:MUT, fontSize:14 }}>Loading products…</div>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"clamp(16px,2.5vw,28px) clamp(8px,1.5vw,16px)" }}>
              {products.map(p => <ProductCard key={p.id} p={p}/>)}
            </div>
        }
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section style={{ position:"relative", height:"clamp(320px,50vw,540px)", overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85" alt="sale" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.58)" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px" }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"4px", textTransform:"uppercase", color:GOLD, marginBottom:16 }}>Limited Time</div>
          <h2 style={{ fontWeight:900, fontSize:"clamp(30px,6vw,72px)", color:WHITE, letterSpacing:"-2px", lineHeight:.92, marginBottom:18, fontFamily:"Georgia,serif" }}>
            Up to 40% Off<br/>Selected Items
          </h2>
          <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:"rgba(255,255,255,.65)", marginBottom:36, maxWidth:420, lineHeight:1.7 }}>
            Premium products. Limited stock. Shop before it's gone.
          </p>
          <a href="/products" style={{ padding:"16px 52px", background:GOLD, color:DARK, fontWeight:800, fontSize:13, letterSpacing:"1.5px", textTransform:"uppercase", textDecoration:"none" }}>
            Shop the Sale
          </a>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding:"clamp(56px,8vw,96px) clamp(16px,4vw,40px)", background:"#f9f7f4" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(40px,6vw,64px)" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:GOLD, marginBottom:12 }}>The Model</div>
            <h2 style={{ fontWeight:900, fontSize:"clamp(26px,4vw,46px)", letterSpacing:"-1.5px", fontFamily:"Georgia,serif", marginBottom:16 }}>How Dropshipping Works</h2>
            <p style={{ fontSize:"clamp(14px,1.6vw,16px)", color:MUT, maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
              Sell products online without holding inventory. List, sell, earn — we handle everything else.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:0, marginBottom:48 }}>
            {STEPS.map((step, i) => (
              <div key={i} className="how-step" style={{ padding:"clamp(24px,3vw,36px) clamp(16px,2vw,24px)", textAlign:"center", borderRight:i<STEPS.length-1?"1px solid #e8e4dc":"none" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:DARK, color:GOLD, fontFamily:"Georgia,serif", fontWeight:900, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>{step.n}</div>
                <div style={{ fontSize:"clamp(26px,3.5vw,34px)", marginBottom:12 }}>{step.icon}</div>
                <div style={{ fontWeight:800, fontSize:"clamp(13px,1.5vw,15px)", marginBottom:10 }}>{step.t}</div>
                <div style={{ fontSize:"clamp(11px,1.3vw,13px)", color:MUT, lineHeight:1.75 }}>{step.d}</div>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:2 }}>
            {/* Traditional */}
            <div style={{ background:"#ede9e0", padding:"clamp(24px,4vw,40px)" }}>
              <div style={{ fontWeight:800, fontSize:"clamp(16px,2vw,20px)", marginBottom:18 }}>Traditional Retail ❌</div>
              {["Buy inventory upfront ($1,000s)","Rent warehouse space","Handle shipping yourself","Risk of unsold stock","Takes months to start","High ongoing overhead"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <span style={{ color:"#dc2626", fontSize:14, flexShrink:0 }}>✕</span>
                  <span style={{ fontSize:"clamp(12px,1.4vw,14px)", color:MUT }}>{t}</span>
                </div>
              ))}
            </div>
            {/* FatherShops */}
            <div style={{ background:DARK, padding:"clamp(24px,4vw,40px)" }}>
              <div style={{ fontWeight:800, fontSize:"clamp(16px,2vw,20px)", marginBottom:18, color:GOLD }}>FatherShops ✅</div>
              {["Zero upfront inventory cost","No warehouse needed","Vendor ships for you","No unsold stock risk","Live in 24 hours","Earn 20% on every sale"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <span style={{ color:GOLD, fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:"clamp(12px,1.4vw,14px)", color:"rgba(255,255,255,.7)" }}>{t}</span>
                </div>
              ))}
            </div>
            {/* CTA panel */}
            <div style={{ background:GOLD, padding:"clamp(24px,4vw,40px)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center" }}>
              <div style={{ fontSize:"clamp(36px,5vw,52px)", marginBottom:14 }}>💸</div>
              <div style={{ fontWeight:900, fontSize:"clamp(18px,2.5vw,24px)", marginBottom:10, color:DARK }}>Start Earning Today</div>
              <div style={{ fontSize:"clamp(12px,1.4vw,14px)", marginBottom:28, color:"rgba(0,0,0,.6)", lineHeight:1.7 }}>
                Free to join. No monthly fees.<br/>Get paid your way.
              </div>
              <a href="http://localhost:3001/signup" style={{ display:"inline-block", padding:"14px 32px", background:DARK, color:GOLD, fontWeight:800, fontSize:12, letterSpacing:"1.5px", textTransform:"uppercase", textDecoration:"none" }}>
                Open Free Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── VENDORS ── */}
      <section id="vendors" style={{ padding:"clamp(56px,7vw,88px) clamp(16px,4vw,40px)", background:WHITE }}>
        <div style={{ maxWidth:1280, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:GOLD, marginBottom:12 }}>Our Partners</div>
          <h2 style={{ fontWeight:900, fontSize:"clamp(24px,4vw,42px)", letterSpacing:"-1px", fontFamily:"Georgia,serif", marginBottom:14 }}>Verified Vendor Network</h2>
          <p style={{ fontSize:"clamp(13px,1.6vw,15px)", color:MUT, maxWidth:480, margin:"0 auto 48px", lineHeight:1.8 }}>
            Every vendor is vetted for quality, reliability, and ethical supply chains before joining the platform.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:1 }}>
            {VENDORS.map(v => (
              <div key={v.name} style={{ padding:"clamp(20px,3vw,32px) clamp(14px,2vw,20px)", textAlign:"center",
                background:"#f9f7f4", borderTop:"3px solid transparent", transition:"border-color .2s, background .2s", cursor:"default" }}
                onMouseEnter={e => { (e.currentTarget as any).style.borderColor=GOLD; (e.currentTarget as any).style.background="#fff"; }}
                onMouseLeave={e => { (e.currentTarget as any).style.borderColor="transparent"; (e.currentTarget as any).style.background="#f9f7f4"; }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:DARK, color:GOLD, fontWeight:900, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>{v.logo}</div>
                <div style={{ fontWeight:800, fontSize:"clamp(13px,1.5vw,15px)", marginBottom:5 }}>{v.name}</div>
                <div style={{ fontSize:"clamp(10px,1.2vw,12px)", color:MUT }}>{v.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CTA ── */}
      <section style={{ padding:"clamp(56px,8vw,96px) clamp(16px,4vw,40px)", background:DARK, textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"4px", textTransform:"uppercase", color:GOLD, marginBottom:16 }}>Join FatherShops</div>
          <h2 style={{ fontWeight:900, fontSize:"clamp(30px,5.5vw,62px)", color:WHITE, letterSpacing:"-2px", lineHeight:.92, marginBottom:18, fontFamily:"Georgia,serif" }}>
            Start Selling<br/>in 24 Hours
          </h2>
          <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:"rgba(255,255,255,.55)", marginBottom:40, lineHeight:1.7 }}>
            Free account. 60+ products. 50+ vendors.<br/>Get paid your way — bank, mobile money, or crypto.
          </p>
          {emailSent ? (
            <div style={{ padding:"16px 32px", background:"rgba(201,168,76,.15)", border:`1px solid ${GOLD}`, borderRadius:4, color:GOLD, fontWeight:700, fontSize:14 }}>
              ✓ Thanks! We'll be in touch soon.
            </div>
          ) : (
            <div style={{ display:"flex", gap:0, maxWidth:440, margin:"0 auto", flexWrap:"wrap", gap:8 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{ flex:"1 1 200px", padding:"15px 20px", border:"1px solid rgba(255,255,255,.2)", background:"rgba(255,255,255,.06)", color:WHITE, fontSize:14, outline:"none" }}/>
              <button onClick={() => { if(email.includes("@")) { setEmailSent(true); } }}
                style={{ padding:"15px 28px", background:GOLD, color:DARK, border:"none", fontWeight:800, fontSize:13, letterSpacing:"1px", textTransform:"uppercase", cursor:"pointer", flexShrink:0 }}>
                Get Started
              </button>
            </div>
          )}
          <p style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginTop:16 }}>No credit card · No setup fees · Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#050508", color:"rgba(255,255,255,.45)", padding:"clamp(48px,7vw,72px) clamp(16px,4vw,40px) 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"clamp(28px,4vw,48px)", marginBottom:56 }}>
            <div>
              <div style={{ fontWeight:900, fontSize:"clamp(18px,2.5vw,22px)", letterSpacing:"2px", color:WHITE, fontFamily:"Georgia,serif", marginBottom:14 }}>
                FATHER<span style={{ color:GOLD }}>SHOPS</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.8, color:"rgba(255,255,255,.4)", marginBottom:16 }}>
                Premium dropshipping platform. Sell globally, get paid your way.
              </p>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.3)", lineHeight:1.8 }}>
                📧 hello@fathershops.com<br/>
                📞 +1 (555) 123-4567
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:WHITE, marginBottom:14, fontSize:11, letterSpacing:"2px", textTransform:"uppercase" }}>Shop</div>
              {[["New Arrivals","/products"],["Women's Shoes","/products?cat=Women's+Shoes"],["Men's Shoes","/products?cat=Men's+Shoes"],["Electronics","/products?cat=Electronics"],["Women's Clothing","/products?cat=Women's+Clothing"]].map(([l,h]) => (
                <div key={l} style={{ marginBottom:9 }}>
                  <a href={h} style={{ color:"rgba(255,255,255,.4)", textDecoration:"none", fontSize:13, transition:"color .15s" }}
                    onMouseEnter={e => ((e.currentTarget as any).style.color=GOLD)}
                    onMouseLeave={e => ((e.currentTarget as any).style.color="rgba(255,255,255,.4)")}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, color:WHITE, marginBottom:14, fontSize:11, letterSpacing:"2px", textTransform:"uppercase" }}>Company</div>
              {[["About Us","/about"],["How It Works","/#how-it-works"],["Our Vendors","/#vendors"],["Become a Merchant","http://localhost:3001/signup"],["Admin Portal","http://localhost:3000/login"]].map(([l,h]) => (
                <div key={l} style={{ marginBottom:9 }}>
                  <a href={h} style={{ color:"rgba(255,255,255,.4)", textDecoration:"none", fontSize:13, transition:"color .15s" }}
                    onMouseEnter={e => ((e.currentTarget as any).style.color=GOLD)}
                    onMouseLeave={e => ((e.currentTarget as any).style.color="rgba(255,255,255,.4)")}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, color:WHITE, marginBottom:14, fontSize:11, letterSpacing:"2px", textTransform:"uppercase" }}>Payments</div>
              {["🏦 Bank Transfer","📱 Mobile Money","₿ Bitcoin (BTC)","Ξ Ethereum (ETH)","💵 USDT (TRC20 & ERC20)"].map(t => (
                <div key={t} style={{ fontSize:12, color:"rgba(255,255,255,.4)", marginBottom:10, lineHeight:1.5 }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div style={{ fontSize:12 }}>© 2026 FatherShops. All rights reserved.</div>
            <div style={{ display:"flex", gap:20 }}>
              {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
                <a key={l} href="#" style={{ fontSize:12, color:"rgba(255,255,255,.3)", textDecoration:"none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @media(min-width:768px){.desk-nav{display:flex!important}.mob-only{display:none!important}}
        @media(max-width:767px){.desk-nav{display:none!important}.mob-only{display:flex!important}.how-step{border-right:none!important;border-bottom:1px solid #e8e4dc!important}}
        *{box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
        input::placeholder{color:rgba(255,255,255,.3)}
        img{max-width:100%}
        a{-webkit-tap-highlight-color:transparent}
        button{-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:99px}
      `}}/>
    </div>
  );
}
