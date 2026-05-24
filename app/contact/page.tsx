// app/contact/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

const C={blue:"#1a56db",dark:"#0f172a",green:"#16a34a",amber:"#d97706"};

const CONTACTS=[
  {icon:"📧",label:"Email Us",value:"hello@fathershops.com",sub:"We reply within 4 hours"},
  {icon:"📞",label:"Call Us",value:"+1 (555) 123-4567",sub:"Mon–Fri, 9am–6pm PST"},
  {icon:"💬",label:"Live Chat",value:"Available 24/7",sub:"From your merchant dashboard"},
  {icon:"📍",label:"Head Office",value:"123 Commerce Street",sub:"San Francisco, CA 94102, USA"},
];

const FAQS=[
  {q:"How long does KYC verification take?",a:"Our team reviews ID submissions within 24 hours on business days. You'll receive an email notification once approved."},
  {q:"What is the merchant profit margin?",a:"Margin is set by our admin team on a per-merchant basis. You'll see your exact margin in your merchant dashboard after approval. Typical margins range from 15–30%."},
  {q:"Which cryptocurrencies do you support?",a:"We support Bitcoin (BTC), Ethereum (ETH), and Tether USDT on both TRC20 (TRON) and ERC20 (Ethereum) networks."},
  {q:"How fast are orders shipped?",a:"All orders are shipped within 3 business days from the date of purchase. Customers receive tracking numbers once the order ships."},
  {q:"What happens if my store gets blocked?",a:"Stores are blocked if orders cannot be processed due to insufficient wallet funds. Only our admin team can unblock a store. Contact support immediately."},
  {q:"Can I change my store plan?",a:"Yes. Contact our team and we'll update your plan. Plan changes affect your commission rate and product limits."},
];

export default function ContactPage(){
  const [form,setForm]=useState({name:"",email:"",subject:"General Enquiry",message:""});
  const [sent,setSent]=useState(false);
  const [sending,setSending]=useState(false);

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();setSending(true);
    setTimeout(()=>{setSent(true);setSending(false);setForm({name:"",email:"",subject:"General Enquiry",message:""});},1200);
  }

  const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",background:"#fff",boxSizing:"border-box" as const,transition:"border .15s"};
  const lbl:React.CSSProperties={display:"block",fontSize:11,fontWeight:700,color:"#374151",marginBottom:5,textTransform:"uppercase" as const,letterSpacing:".5px"};

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
            {[{l:"Home",h:"/"},{l:"Products",h:"/products"},{l:"About",h:"/about"}].map(n=>(
              <Link key={n.l} href={n.h} style={{padding:"7px 13px",borderRadius:8,textDecoration:"none",color:"#6b7280",fontWeight:600,fontSize:14}}>{n.l}</Link>
            ))}
            <Link href="http://localhost:3001/signup" style={{padding:"8px 18px",borderRadius:9,background:`linear-gradient(135deg,${C.blue},#7c3aed)`,textDecoration:"none",color:"#fff",fontWeight:700,fontSize:14}}>Start Free →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:"linear-gradient(160deg,#eff4ff,#f5f0ff,#f4f6fb)",padding:"60px 5% 70px",textAlign:"center"}}>
        <div style={{maxWidth:580,margin:"0 auto"}}>
          <h1 style={{fontWeight:900,fontSize:"clamp(30px,5vw,52px)",letterSpacing:"-2px",lineHeight:1.1,marginBottom:16}}>Get in Touch</h1>
          <p style={{fontSize:"clamp(15px,2vw,17px)",color:"#6b7280",lineHeight:1.7}}>
            Have a question, need support, or want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section style={{padding:"50px 5%",background:"#fff",borderBottom:"1px solid #f3f4f6"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
          {CONTACTS.map(c=>(
            <div key={c.label} style={{background:"#f8fafc",border:"1.5px solid #e5e7eb",borderRadius:14,padding:"20px 18px",textAlign:"center"}}>
              <div style={{fontSize:30,marginBottom:10}}>{c.icon}</div>
              <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{c.label}</div>
              <div style={{fontSize:14,color:C.blue,fontWeight:600,marginBottom:3}}>{c.value}</div>
              <div style={{fontSize:12,color:"#9ca3af"}}>{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section style={{padding:"56px 5%",background:"#f8fafc"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:32,alignItems:"start"}}>

          {/* Form */}
          <div style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:18,padding:28,boxShadow:"0 2px 12px rgba(0,0,0,.05)"}}>
            <h2 style={{fontWeight:800,fontSize:22,letterSpacing:"-.3px",marginBottom:6}}>Send a Message</h2>
            <p style={{fontSize:13,color:"#6b7280",marginBottom:22}}>We'll get back to you within 4 business hours.</p>
            {sent?(
              <div style={{textAlign:"center",padding:"32px 0"}}>
                <div style={{fontSize:48,marginBottom:14}}>✅</div>
                <div style={{fontWeight:700,fontSize:18,marginBottom:6}}>Message Sent!</div>
                <div style={{fontSize:14,color:"#6b7280",marginBottom:20}}>We'll reply to your email within 4 hours.</div>
                <button onClick={()=>setSent(false)} style={{padding:"10px 24px",borderRadius:9,border:"1.5px solid #e5e7eb",background:"transparent",fontWeight:700,fontSize:14,cursor:"pointer"}}>Send Another</button>
              </div>
            ):(
              <form onSubmit={handleSubmit}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                  <div>
                    <label style={lbl}>Name</label>
                    <input style={inp} required placeholder="Your full name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} onFocus={e=>(e.target.style.borderColor=C.blue)} onBlur={e=>(e.target.style.borderColor="#e5e7eb")}/>
                  </div>
                  <div>
                    <label style={lbl}>Email</label>
                    <input style={inp} type="email" required placeholder="you@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} onFocus={e=>(e.target.style.borderColor=C.blue)} onBlur={e=>(e.target.style.borderColor="#e5e7eb")}/>
                  </div>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={lbl}>Subject</label>
                  <select style={{...inp,cursor:"pointer"}} value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}>
                    {["General Enquiry","Merchant Support","KYC Verification","Withdrawal Help","Store Blocked","Partnership","Technical Issue","Other"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:20}}>
                  <label style={lbl}>Message</label>
                  <textarea style={{...inp,minHeight:130,resize:"vertical" as const}} required placeholder="Describe your issue or question in detail…" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} onFocus={e=>(e.target.style.borderColor=C.blue)} onBlur={e=>(e.target.style.borderColor="#e5e7eb")}/>
                </div>
                <button type="submit" disabled={sending} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:sending?"#93c5fd":`linear-gradient(135deg,${C.blue},#7c3aed)`,color:"#fff",fontWeight:700,fontSize:15,cursor:sending?"not-allowed":"pointer"}}>
                  {sending?"Sending…":"Send Message →"}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{fontWeight:800,fontSize:22,letterSpacing:"-.3px",marginBottom:20}}>Frequently Asked Questions</h2>
            <div style={{display:"grid",gap:12}}>
              {FAQS.map(faq=>(
                <div key={faq.q} style={{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:12,padding:"16px 18px"}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:6,color:C.dark}}>{faq.q}</div>
                  <div style={{fontSize:13,color:"#6b7280",lineHeight:1.6}}>{faq.a}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,padding:"16px 18px",background:`${C.blue}0a`,border:`1px solid ${C.blue}25`,borderRadius:12}}>
              <div style={{fontWeight:700,fontSize:14,color:C.blue,marginBottom:4}}>💬 Need faster help?</div>
              <div style={{fontSize:13,color:"#6b7280"}}>Log in to your merchant dashboard and use the Live Chat button for real-time support from our team.</div>
              <Link href="http://localhost:3001/login" style={{display:"inline-block",marginTop:8,fontSize:13,fontWeight:700,color:C.blue,textDecoration:"none"}}>Go to Dashboard →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder / location */}
      <section style={{padding:"50px 5%",background:"#fff"}}>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontWeight:800,fontSize:"clamp(22px,3.5vw,32px)",letterSpacing:"-.3px",marginBottom:8}}>Visit Our Office</h2>
          <p style={{color:"#6b7280",fontSize:15,marginBottom:32}}>We welcome merchants and partners to meet us in person.</p>
          <div style={{background:"linear-gradient(160deg,#eff4ff,#e0e7ff)",borderRadius:18,padding:"44px 24px",border:"2px solid #c7d2fe",marginBottom:24}}>
            <div style={{fontSize:52,marginBottom:16}}>📍</div>
            <div style={{fontWeight:800,fontSize:20,marginBottom:6}}>123 Commerce Street</div>
            <div style={{fontSize:15,color:"#6b7280",marginBottom:4}}>San Francisco, CA 94102</div>
            <div style={{fontSize:14,color:"#6b7280",marginBottom:20}}>United States of America</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,maxWidth:480,margin:"0 auto"}}>
              {[{icon:"🚇",l:"Civic Center BART",sub:"2 min walk"},{icon:"🚗",l:"Parking",sub:"Available on Market St"},{icon:"🕐",l:"Office Hours",sub:"Mon–Fri 9am–6pm PST"}].map(d=>(
                <div key={d.l} style={{background:"rgba(255,255,255,.7)",borderRadius:10,padding:"12px 8px"}}>
                  <div style={{fontSize:20,marginBottom:4}}>{d.icon}</div>
                  <div style={{fontSize:12,fontWeight:700}}>{d.l}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{d.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:"#080c18",color:"rgba(255,255,255,.5)",padding:"28px 5%",textAlign:"center"}}>
        <div style={{fontSize:13}}>© 2025 FatherShops. All rights reserved. · <Link href="/about" style={{color:"rgba(255,255,255,.4)",textDecoration:"none"}}>About</Link> · <Link href="/products" style={{color:"rgba(255,255,255,.4)",textDecoration:"none"}}>Products</Link></div>
      </footer>
    </div>
  );
}
