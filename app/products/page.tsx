// app/products/page.tsx — Products with variant selector
"use client";
import { useState, useEffect } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, orderBy } from "firebase/firestore";

const cfg={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID};
const app=getApps().length?getApp():initializeApp(cfg);
const db=getFirestore(app);

const DARK="#0a0a0a"; const GOLD="#c9a84c"; const MUT="#6b6b6b";
const CATS=["All","Electronics & Accessories","Women's Shoes","Men's Shoes","Women's Clothing","Men's Clothing","Women's Bags","Men's Bags","Fitness & Sports","Kitchen & Home","Kids & Baby","Beauty & Skincare","General & Lifestyle"];

const FALLBACK=[
  {id:"f1",name:"Nike Air Force 1 Women's",category:"Women's Shoes",vendorName:"Nike",images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],variants:[{id:"v1",size:"US 7",color:"White",retailPrice:99.99,basePrice:42,stock:45},{id:"v2",size:"US 8",color:"White",retailPrice:99.99,basePrice:42,stock:50},{id:"v3",size:"US 8",color:"Black",retailPrice:104.99,basePrice:44,stock:35}]},
  {id:"f2",name:"Samsung Galaxy Buds2 Pro",category:"Electronics & Accessories",vendorName:"Samsung",images:["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"],variants:[{id:"v1",size:"One Size",color:"Graphite",retailPrice:139.99,basePrice:55,stock:50},{id:"v2",size:"One Size",color:"White",retailPrice:139.99,basePrice:55,stock:45}]},
  {id:"f3",name:"Adidas Ultraboost 23 Men's",category:"Men's Shoes",vendorName:"Adidas",images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],variants:[{id:"v1",size:"US 9",color:"Core Black",retailPrice:139.99,basePrice:58,stock:30},{id:"v2",size:"US 10",color:"Core Black",retailPrice:139.99,basePrice:58,stock:25}]},
  {id:"f4",name:"Zara Satin Midi Dress",category:"Women's Clothing",vendorName:"Zara",images:["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80"],variants:[{id:"v1",size:"S",color:"Black",retailPrice:49.99,basePrice:18,stock:40},{id:"v2",size:"M",color:"Black",retailPrice:49.99,basePrice:18,stock:45},{id:"v3",size:"S",color:"Beige",retailPrice:49.99,basePrice:18,stock:25}]},
  {id:"f5",name:"Levi's 511 Slim Fit Jeans",category:"Men's Clothing",vendorName:"Levi's",images:["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80"],variants:[{id:"v1",size:"W32",color:"Dark Stonewash",retailPrice:64.99,basePrice:25,stock:50},{id:"v2",size:"W34",color:"Dark Stonewash",retailPrice:64.99,basePrice:25,stock:45}]},
  {id:"f6",name:"Anker PowerCore 20000mAh",category:"Electronics & Accessories",vendorName:"Anker",images:["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80"],variants:[{id:"v1",size:"One Size",color:"Black",retailPrice:45.99,basePrice:18,stock:100},{id:"v2",size:"One Size",color:"White",retailPrice:45.99,basePrice:18,stock:80}]},
  {id:"f7",name:"Steve Madden IRENEE Heels",category:"Women's Shoes",vendorName:"Steve Madden",images:["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80"],variants:[{id:"v1",size:"US 7",color:"Nude",retailPrice:59.99,basePrice:22,stock:30},{id:"v2",size:"US 7",color:"Black",retailPrice:59.99,basePrice:22,stock:28},{id:"v3",size:"US 8",color:"Black",retailPrice:59.99,basePrice:22,stock:35}]},
  {id:"f8",name:"Clarks Desert Boot Men's",category:"Men's Shoes",vendorName:"Clarks",images:["https://images.unsplash.com/photo-1613987876445-fcb353b9a2cd?w=500&q=80"],variants:[{id:"v1",size:"US 9",color:"Beeswax",retailPrice:99.99,basePrice:40,stock:25},{id:"v2",size:"US 10",color:"Beeswax",retailPrice:99.99,basePrice:40,stock:22}]},
];

function ProductCard({p}:{p:any}){
  const [selId,setSelId]=useState(p.variants?.[0]?.id??"");
  const [hov,setHov]=useState(false);
  const [showImg2,setShowImg2]=useState(false);
  const selVar=p.variants?.find((v:any)=>v.id===selId)??p.variants?.[0];
  const img1=p.images?.[0]?.startsWith("http")?p.images[0]:null;
  const img2=p.images?.[1]?.startsWith("http")?p.images[1]:null;
  const displayImg=(hov&&img2)||showImg2?img2||img1:img1;
  const minP=p.variants?.length>0?Math.min(...p.variants.map((v:any)=>v.retailPrice)):0;
  const maxP=p.variants?.length>0?Math.max(...p.variants.map((v:any)=>v.retailPrice)):0;
  const sizes=[...new Set(p.variants?.map((v:any)=>v.size)||[])];
  const colors=[...new Set(p.variants?.filter((v:any)=>v.size===selVar?.size).map((v:any)=>v.color)||[])];

  return(
    <div onMouseEnter={()=>{setHov(true);if(img2)setShowImg2(true);}} onMouseLeave={()=>{setHov(false);setShowImg2(false);}}
      style={{background:"#fff",cursor:"pointer"}}>
      {/* Image */}
      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#f5f5f5"}}>
        {displayImg
          ?<img src={displayImg} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s",transform:hov?"scale(1.04)":"scale(1)"}}/>
          :<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,background:"#f0ece4"}}>📦</div>
        }
        {img2&&!hov&&<div style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.5)",borderRadius:4,padding:"2px 7px",fontSize:9,color:"rgba(255,255,255,.9)",fontWeight:600}}>+1</div>}
        {p.variants?.length>0&&<div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,.6)",borderRadius:4,padding:"2px 8px",fontSize:9,color:"#fff",fontWeight:600}}>{p.variants.length} variants</div>}
        {/* Sell CTA on hover */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px",background:"rgba(10,10,10,.9)",transform:hov?"translateY(0)":"translateY(100%)",transition:"transform .3s",textAlign:"center"}}>
          <a href="http://localhost:3001/signup" style={{color:GOLD,fontWeight:700,fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",textDecoration:"none"}}>Sell This Product →</a>
        </div>
      </div>

      {/* Info */}
      <div style={{padding:"14px 4px 4px"}}>
        <div style={{fontSize:9,color:MUT,letterSpacing:"1px",textTransform:"uppercase",marginBottom:4}}>{p.category} · {p.vendorName}</div>
        <div style={{fontWeight:700,fontSize:"clamp(12px,1.4vw,14px)",color:DARK,marginBottom:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>

        {/* Size selector */}
        {sizes.length>1&&<div style={{marginBottom:8}}>
          <div style={{fontSize:9,color:MUT,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Size</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {sizes.map((sz:any)=>{
              const hasStock=p.variants?.some((v:any)=>v.size===sz&&v.stock>0);
              const isSel=selVar?.size===sz;
              return<button key={sz} onClick={()=>{
                const first=p.variants?.find((v:any)=>v.size===sz&&v.stock>0)||p.variants?.find((v:any)=>v.size===sz);
                if(first)setSelId(first.id);
              }} style={{padding:"3px 8px",border:`1px solid ${isSel?DARK:"#e5e5e5"}`,background:isSel?DARK:"#fff",color:isSel?"#fff":hasStock?DARK:"#ccc",fontSize:10,fontWeight:isSel?700:400,cursor:"pointer",textDecoration:hasStock?"none":"line-through"}}>
                {sz}
              </button>;
            })}
          </div>
        </div>}

        {/* Color selector */}
        {colors.length>1&&<div style={{marginBottom:8}}>
          <div style={{fontSize:9,color:MUT,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Color</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {colors.map((col:any)=>{
              const v=p.variants?.find((v:any)=>v.size===selVar?.size&&v.color===col);
              const isSel=selVar?.color===col;
              return<button key={col} onClick={()=>{if(v)setSelId(v.id);}} style={{padding:"3px 8px",border:`1px solid ${isSel?DARK:"#e5e5e5"}`,background:isSel?DARK:"#fff",color:isSel?"#fff":DARK,fontSize:10,cursor:"pointer",fontWeight:isSel?700:400,opacity:v?.stock===0?.4:1}}>
                {col}
              </button>;
            })}
          </div>
        </div>}

        {/* Price + stock */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:6}}>
          <div>
            <span style={{fontWeight:800,fontSize:"clamp(15px,2vw,18px)",color:DARK}}>
              {selVar?`$${selVar.retailPrice.toFixed(2)}`:minP===maxP?`$${minP.toFixed(2)}`:`$${minP.toFixed(2)}–$${maxP.toFixed(2)}`}
            </span>
          </div>
          <span style={{fontSize:10,color:selVar?.stock>0?GOLD:"#dc2626",fontWeight:600}}>
            {selVar?.stock>0?`${selVar.stock} left`:"Out of stock"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("newest");

  useEffect(()=>{
    const constraints:any[]=[where("status","==","active"),orderBy("createdAt","desc")];
    if(cat!=="All") constraints.splice(1,0,where("category","==",cat));
    getDocs(query(collection(db,"products"),...constraints))
      .then(s=>{
        if(s.empty) setProducts(FALLBACK);
        else setProducts(s.docs.map(d=>({id:d.id,...d.data()})));
        setLoading(false);
      }).catch(()=>{setProducts(FALLBACK);setLoading(false);});
  },[cat]);

  let filtered=products.filter(p=>!search||p.name?.toLowerCase().includes(search.toLowerCase())||p.vendorName?.toLowerCase().includes(search.toLowerCase()));
  if(sort==="price-asc") filtered=[...filtered].sort((a,b)=>(a.variants?.[0]?.retailPrice??0)-(b.variants?.[0]?.retailPrice??0));
  if(sort==="price-desc") filtered=[...filtered].sort((a,b)=>(b.variants?.[0]?.retailPrice??0)-(a.variants?.[0]?.retailPrice??0));

  const [scrollY,setScrollY]=useState(0);
  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);
  const navBg=scrollY>40;

  return(
    <div style={{minHeight:"100vh",fontFamily:"'Plus Jakarta Sans',Georgia,sans-serif",paddingTop:64}}>
      {/* Nav */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all .3s",background:navBg?"rgba(10,10,10,.96)":"rgba(10,10,10,.85)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <a href="/" style={{textDecoration:"none",flexShrink:0}}>
            <div style={{fontWeight:900,fontSize:"clamp(16px,3vw,20px)",letterSpacing:"1.5px",color:"#fff",fontFamily:"Georgia,serif"}}>FATHER<span style={{color:GOLD}}>SHOPS</span></div>
          </a>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <a href="/products" style={{color:GOLD,textDecoration:"none",fontSize:12,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>Products</a>
            <a href="/#how-it-works" style={{color:"rgba(255,255,255,.7)",textDecoration:"none",fontSize:12,fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>How It Works</a>
            <a href="http://localhost:3001/login" style={{padding:"7px 18px",border:"1px solid rgba(255,255,255,.35)",color:"#fff",textDecoration:"none",fontSize:12,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>Sign In</a>
          </div>
        </div>
      </nav>
      {/* Header */}
      <div style={{background:DARK,padding:"clamp(32px,5vw,56px) clamp(16px,4vw,40px)",textAlign:"center"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:GOLD,marginBottom:12}}>Product Catalog</div>
        <h1 style={{fontWeight:900,fontSize:"clamp(28px,5vw,52px)",color:"#fff",letterSpacing:"-1px",fontFamily:"Georgia,serif",marginBottom:12}}>Shop the Collection</h1>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:"clamp(13px,1.6vw,15px)",maxWidth:480,margin:"0 auto"}}>
          Premium products from verified global vendors. 3-day delivery. {products.length>0?products.reduce((a,p)=>a+(p.variants?.length??0),0):0}+ variants available.
        </p>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"clamp(24px,4vw,40px) clamp(16px,3vw,32px)"}}>
        {/* Search + sort */}
        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, brands…"
            style={{flex:"1 1 200px",padding:"10px 14px",border:"1.5px solid #e5e5e5",borderRadius:8,fontSize:13,outline:"none",color:DARK}}
            onFocus={e=>(e.target.style.borderColor=DARK)} onBlur={e=>(e.target.style.borderColor="#e5e5e5")}/>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"10px 14px",border:"1.5px solid #e5e5e5",borderRadius:8,fontSize:13,outline:"none",cursor:"pointer",color:DARK,background:"#fff"}}>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Category filter */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12,marginBottom:24}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)}
              style={{padding:"7px 16px",borderRadius:0,flexShrink:0,border:`2px solid ${cat===c?DARK:"#e5e5e5"}`,background:cat===c?DARK:"#fff",color:cat===c?"#fff":DARK,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s"}}>
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{fontSize:13,color:MUT,marginBottom:20}}>{loading?"Loading…":`${filtered.length} product${filtered.length!==1?"s":""} found`}</div>

        {/* Grid */}
        {loading?<div style={{textAlign:"center",padding:"80px 0",color:MUT,fontSize:15}}>Loading products…</div>:
        filtered.length===0?<div style={{textAlign:"center",padding:"80px 0"}}>
          <div style={{fontSize:48,marginBottom:16}}>🔍</div>
          <div style={{fontWeight:700,fontSize:20,marginBottom:8,color:DARK}}>{search?"No products match your search":"No products in this category"}</div>
          <button onClick={()=>{setCat("All");setSearch("");}} style={{padding:"10px 24px",background:DARK,color:"#fff",border:"none",fontWeight:700,fontSize:13,cursor:"pointer",marginTop:8}}>View All Products</button>
        </div>:(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"clamp(16px,2.5vw,24px) clamp(8px,1.5vw,16px)"}}>
            {filtered.map(p=><ProductCard key={p.id} p={p}/>)}
          </div>
        )}

        {/* CTA banner */}
        <div style={{marginTop:64,background:DARK,padding:"clamp(28px,4vw,48px) clamp(20px,3vw,40px)",textAlign:"center"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:GOLD,marginBottom:12}}>Want to Sell These?</div>
          <h2 style={{fontWeight:900,fontSize:"clamp(22px,3.5vw,36px)",color:"#fff",letterSpacing:"-1px",fontFamily:"Georgia,serif",marginBottom:12}}>Open Your Free Store Today</h2>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:"clamp(13px,1.5vw,15px)",marginBottom:28,maxWidth:420,margin:"0 auto 28px"}}>List any of these products. No inventory. No upfront cost. Earn profit on every sale.</p>
          <a href="http://localhost:3001/signup" style={{display:"inline-block",padding:"14px 40px",background:GOLD,color:DARK,fontWeight:800,fontSize:13,letterSpacing:"1.5px",textTransform:"uppercase",textDecoration:"none"}}>Start Selling Free</a>
        </div>
      </div>
    </div>
  );
}
