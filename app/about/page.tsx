// app/about/page.tsx
import Link from "next/link";

const C={blue:"#1a56db",dark:"#0f172a",amber:"#d97706",green:"#16a34a"};

const TEAM=[
  {name:"James Okonkwo",role:"Founder & CEO",bio:"Former logistics executive with 15 years in e-commerce. Built FatherShops to democratise online retail.",avatar:"JO"},
  {name:"Amina Hassan",role:"Head of Operations",bio:"Supply chain specialist who ensures every order ships within 3 days, every time.",avatar:"AH"},
  {name:"David Chen",role:"CTO",bio:"Full-stack engineer and crypto native who built the platform's real-time wallet infrastructure.",avatar:"DC"},
  {name:"Sofia Martins",role:"Merchant Success",bio:"Dedicated to helping merchants grow their stores and maximise their earnings.",avatar:"SM"},
];

const VALUES=[
  {icon:"🤝",title:"Merchant First",desc:"Every decision we make starts with one question: does this help our merchants earn more?"},
  {icon:"🔒",title:"Trusted & Verified",desc:"Every vendor is vetted. Every merchant is identity-verified. Every transaction is secured."},
  {icon:"⚡",title:"Speed Matters",desc:"Orders ship in 3 days or less. Payouts process within 24 hours. We don't believe in waiting."},
  {icon:"🌍",title:"Global Reach",desc:"We connect merchants in 50+ countries with vendors across Asia, Europe and the Americas."},
];

export default function AboutPage(){
  return(
    <div style={{color:C.dark,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      {/* Nav */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.96)",backdropFilter:"blur(10px)",borderBottom:"1px solid #e5e7eb",padding:"0 5%"}}>
        <div style={{maxWidth:1200,margin:"0 auto",height:62,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:C.dark}}>
            <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${C.blue},#7c3aed)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🏬</div>
            <div style={{fontWeight:800,fontSize:19,letterSpacing:"-.3px"}}>FatherShops</div>
          </Link>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            {[{l:"Home",h:"/"},{l:"Products",h:"/products"},{l:"Contact",h:"/contact"}].map(n=>(
              <Link key={n.l} href={n.h} style={{padding:"7px 13px",borderRadius:8,textDecoration:"none",color:"#6b7280",fontWeight:600,fontSize:14}}>{n.l}</Link>
            ))}
            <Link href="http://localhost:3001/signup" style={{padding:"8px 18px",borderRadius:9,background:`linear-gradient(135deg,${C.blue},#7c3aed)`,textDecoration:"none",color:"#fff",fontWeight:700,fontSize:14}}>Start Free →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:"linear-gradient(160deg,#eff4ff,#f5f0ff,#f4f6fb)",padding:"72px 5% 80px",textAlign:"center"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"inline-block",background:"rgba(26,86,219,.1)",border:"1px solid rgba(26,86,219,.2)",borderRadius:99,padding:"6px 18px",marginBottom:20,fontSize:13,fontWeight:600,color:C.blue}}>
            🏬 Our Story
          </div>
          <h1 style={{fontWeight:900,fontSize:"clamp(32px,5vw,56px)",letterSpacing:"-2px",lineHeight:1.1,marginBottom:20}}>
            We Built FatherShops So Anyone Can Sell Online
          </h1>
          <p style={{fontSize:"clamp(15px,2vw,18px)",color:"#6b7280",lineHeight:1.7,maxWidth:560,margin:"0 auto 32px"}}>
            Founded in 2022, FatherShops started with a simple belief — selling online shouldn't require warehouse space, upfront inventory, or technical expertise.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/products" style={{padding:"13px 28px",borderRadius:11,background:`linear-gradient(135deg,${C.blue},#7c3aed)`,color:"#fff",fontWeight:700,fontSize:16,textDecoration:"none"}}>Browse Products</Link>
            <Link href="/contact" style={{padding:"13px 28px",borderRadius:11,border:"2px solid #e5e7eb",color:C.dark,fontWeight:700,fontSize:16,textDecoration:"none"}}>Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:"#fff",padding:"44px 5%",borderBottom:"1px solid #f3f4f6"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:24,textAlign:"center"}}>
          {[{v:"10,000+",l:"Active Merchants"},{v:"50+",l:"Countries Served"},{v:"$2.4M+",l:"Paid to Merchants"},{v:"3 Days",l:"Avg. Delivery"},{v:"4.8★",l:"Merchant Rating"},{v:"24/7",l:"Live Support"}].map(s=>(
            <div key={s.l}>
              <div style={{fontWeight:900,fontSize:"clamp(26px,3.5vw,38px)",letterSpacing:"-1px",color:C.blue,marginBottom:4}}>{s.v}</div>
              <div style={{fontSize:13,color:"#6b7280",fontWeight:500}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{padding:"60px 5%",background:"#f8fafc"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:28,alignItems:"center"}}>
          <div>
            <h2 style={{fontWeight:800,fontSize:"clamp(24px,3.5vw,36px)",letterSpacing:"-.5px",marginBottom:16}}>Our Mission</h2>
            <p style={{fontSize:16,color:"#6b7280",lineHeight:1.8,marginBottom:16}}>
              FatherShops exists to give anyone — anywhere in the world — the tools to run a profitable online store without upfront investment or technical knowledge.
            </p>
            <p style={{fontSize:16,color:"#6b7280",lineHeight:1.8,marginBottom:16}}>
              We handle vendor relationships, logistics, payments, and customer fulfilment. You handle your store and your customers. Simple.
            </p>
            <p style={{fontSize:16,color:"#6b7280",lineHeight:1.8}}>
              Merchants keep a margin set by our admin team — ensuring fair, transparent earnings on every single sale.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {VALUES.map(v=>(
              <div key={v.title} style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:14,padding:18}}>
                <div style={{fontSize:28,marginBottom:10}}>{v.icon}</div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{v.title}</div>
                <div style={{fontSize:13,color:"#6b7280",lineHeight:1.6}}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{padding:"60px 5%",background:"#fff"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <h2 style={{fontWeight:800,fontSize:"clamp(24px,3.5vw,36px)",letterSpacing:"-.5px",marginBottom:10}}>Meet the Team</h2>
            <p style={{color:"#6b7280",fontSize:15}}>The people building and running FatherShops every day</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>
            {TEAM.map(m=>(
              <div key={m.name} style={{background:"#f8fafc",border:"1.5px solid #e5e7eb",borderRadius:16,padding:22,textAlign:"center"}}>
                <div style={{width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},#7c3aed)`,color:"#fff",fontWeight:800,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>{m.avatar}</div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>{m.name}</div>
                <div style={{fontSize:12,color:C.blue,fontWeight:600,marginBottom:10}}>{m.role}</div>
                <div style={{fontSize:13,color:"#6b7280",lineHeight:1.6}}>{m.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section style={{padding:"60px 5%",background:"linear-gradient(160deg,#0f172a,#1e1b4b)",color:"#fff"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontWeight:800,fontSize:"clamp(24px,3.5vw,36px)",letterSpacing:"-.5px",marginBottom:14}}>Where We Are</h2>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:15,lineHeight:1.7,marginBottom:32}}>
            Our team is distributed across three continents, giving us around-the-clock coverage for our global merchant base.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16}}>
            {[
              {city:"San Francisco, CA",role:"Headquarters",flag:"🇺🇸"},
              {city:"Lagos, Nigeria",role:"Africa Operations",flag:"🇳🇬"},
              {city:"Dubai, UAE",role:"Middle East Hub",flag:"🇦🇪"},
              {city:"Singapore",role:"Asia Pacific",flag:"🇸🇬"},
            ].map(l=>(
              <div key={l.city} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:12,padding:"18px 14px",textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:8}}>{l.flag}</div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{l.city}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.55)"}}>{l.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:"#080c18",color:"rgba(255,255,255,.5)",padding:"28px 5%",textAlign:"center"}}>
        <div style={{fontSize:13}}>© 2025 FatherShops. All rights reserved. · <Link href="/contact" style={{color:"rgba(255,255,255,.4)",textDecoration:"none"}}>Contact</Link> · <Link href="/products" style={{color:"rgba(255,255,255,.4)",textDecoration:"none"}}>Products</Link></div>
      </footer>
    </div>
  );
}
