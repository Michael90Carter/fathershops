import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FatherShops — Premium Dropshipping Platform",
  description: "Curated products from verified vendors. Launch your store in 24 hours. Earn 20% on every sale.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
        <meta name="theme-color" content="#0a0a0a"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </head>
      <body style={{margin:0,padding:0,fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",overflowX:"hidden"}}>
        {children}
        <style>{`
          *{box-sizing:border-box}
          html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
          img{max-width:100%;height:auto}
          a{-webkit-tap-highlight-color:transparent}
          button{-webkit-tap-highlight-color:transparent}
          @media(max-width:767px){
            .desktop-only{display:none!important}
            .mobile-stack{flex-direction:column!important}
          }
          @media(min-width:768px){
            .mobile-only{display:none!important}
          }
        `}</style>
      </body>
    </html>
  );
}
