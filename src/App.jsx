import { useState, useEffect, useRef } from "react";

/* ============================================================
   All original styles, verbatim. Injected once via a <style> tag
   so the page renders identically to the source HTML.
   ============================================================ */
const CSS = `
:root {
  --rose:#E6B7BD; --rose-dk:#D4929A; --rose-lt:#F4DEE1; --rose-xs:#FBF1F3;
  --plum:#8E4257; --plum-dk:#6B2F40;
  --ink:#241B1D; --ink-2:#3A2A2D;
  --bone:#F7F2EC; --champ:#C2A878; --greige:#BCAEA3; --white:#FFFFFF;
  --serif:"Fraunces",Georgia,serif;
  --sans:"Hanken Grotesk",system-ui,sans-serif;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:hidden}
body{font-family:var(--sans);background:var(--rose);color:var(--ink);overflow-x:hidden;-webkit-font-smoothing:antialiased;display:block;min-height:100vh}
#root{width:100%;max-width:none;min-height:100vh;margin:0;padding:0;text-align:left}
a{text-decoration:none;color:inherit}
img,video{display:block;max-width:100%}
button{cursor:pointer;border:none;background:none;font-family:inherit}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:20px 48px;transition:background .4s,backdrop-filter .4s}
.nav.stuck{background:rgba(230,183,189,.88);backdrop-filter:blur(18px);border-bottom:1px solid rgba(142,66,87,.15)}
.nav-name{font-family:var(--serif);font-size:18px;font-weight:500;color:var(--ink);letter-spacing:.02em}
.nav-name b{color:var(--plum)}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);opacity:.75;transition:opacity .2s,color .2s}
.nav-links a:hover{opacity:1;color:var(--plum)}
.nav-btn{padding:11px 26px;background:var(--ink);color:var(--rose) !important;border-radius:40px;font-size:12.5px !important;font-weight:700 !important;letter-spacing:.1em !important;text-transform:uppercase !important;transition:background .2s,transform .15s;opacity:1 !important}
.nav-btn:hover{background:var(--plum) !important;transform:translateY(-1px)}
.nav-burger{display:none;flex-direction:column;gap:5px}
.nav-burger span{width:22px;height:1.5px;background:var(--ink);display:block;transition:.3s}
@media(max-width:800px){
  .nav{padding:18px 24px}
  .nav-links-wrap{display:none;position:absolute;top:100%;left:0;right:0;background:var(--rose);padding:12px 0;border-top:1px solid rgba(142,66,87,.15)}
  .nav-links-wrap.open{display:block}
  .nav-links{flex-direction:column;gap:0}
  .nav-links li{padding:14px 28px;border-bottom:1px solid rgba(142,66,87,.08)}
  .nav-burger{display:flex}
}

/* HERO */
.hero{position:relative;height:100vh;min-height:600px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:var(--ink)}
.hero-video{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;opacity:.5}
.hero-fallback{position:absolute;inset:0;z-index:0;background:linear-gradient(145deg,#3A1F25 0%,#8E4257 40%,#241B1D 80%,#C2A878 100%)}
.hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(160deg,rgba(142,66,87,.6) 0%,rgba(36,27,29,.5) 50%,rgba(194,168,120,.2) 100%)}
.hero-content{position:relative;z-index:2;text-align:center;padding:0 24px}
.hero-name{font-family:var(--serif);font-weight:900;font-size:clamp(64px,12vw,172px);line-height:.92;letter-spacing:-.04em;color:var(--rose);display:block;text-shadow:0 2px 40px rgba(230,183,189,.3),0 0 80px rgba(142,66,87,.5);animation:nameIn 1.2s cubic-bezier(.22,.68,0,1) both}
.hero-name .dot{color:var(--champ)}
.hero-tag{font-family:var(--serif);font-style:italic;font-size:clamp(17px,2.4vw,25px);color:rgba(247,242,236,.85);margin-top:24px;animation:fadeUp .9s .6s both}
.hero-pills-row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:18px;animation:fadeUp .9s .8s both}
.hero-pill{padding:7px 18px;border:1px solid rgba(230,183,189,.45);border-radius:40px;font-size:11.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(247,242,236,.8);transition:background .2s,color .2s}
.hero-pill:hover{background:var(--rose);color:var(--ink)}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:28px;animation:fadeUp .9s 1s both}
.btn-rose-solid{padding:14px 34px;background:var(--rose);color:var(--ink);border-radius:40px;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;transition:background .2s,transform .15s}
.btn-rose-solid:hover{background:var(--rose-lt);transform:translateY(-2px)}
.btn-outline-w{padding:14px 30px;border:1.5px solid rgba(247,242,236,.4);color:rgba(247,242,236,.9);border-radius:40px;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:.2s}
.btn-outline-w:hover{border-color:var(--rose);color:var(--rose);transform:translateY(-2px)}
.hero-scroll-hint{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:8px;font-size:10.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(247,242,236,.35);animation:fadeUp .6s 1.4s both}
.scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,rgba(230,183,189,.6),transparent);animation:scrollPulse 2s infinite}

/* TICKER */
.ticker-bar{background:var(--plum);padding:14px 0;overflow:hidden;white-space:nowrap}
.ticker-track{display:inline-flex;animation:ticker 28s linear infinite}
.ticker-item{display:inline-flex;align-items:center;gap:18px;padding:0 28px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--rose-lt)}
.ticker-item .sep{width:5px;height:5px;border-radius:50%;background:var(--rose);opacity:.6;flex-shrink:0}

/* ABOUT */
.about{background:var(--rose);padding:100px 48px}
.about-eyebrow{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--plum);display:block;margin-bottom:18px}
.about-headline{font-family:var(--serif);font-size:clamp(38px,6vw,72px);font-weight:800;line-height:.95;letter-spacing:-.025em;color:var(--ink);margin-bottom:52px}
.about-headline em{font-style:italic;color:var(--plum)}
.bento{display:grid;grid-template-columns:repeat(12,1fr);gap:14px}
.b-cell{border-radius:16px;overflow:hidden;transition:transform .3s cubic-bezier(.22,.68,0,1.2)}
.b-cell:hover{transform:translateY(-4px) scale(1.01)}
.b-1{grid-column:1/6;grid-row:1/3}
.b-2{grid-column:6/9;grid-row:1/2}
.b-3{grid-column:9/13;grid-row:1/2}
.b-4{grid-column:6/9;grid-row:2/3}
.b-5{grid-column:9/13;grid-row:2/3}
.b-ink{background:var(--ink);padding:36px}
.b-plum{background:var(--plum);padding:36px}
.b-bone{background:var(--bone);padding:36px}
.b-rose-lt{background:var(--rose-lt);padding:36px}
.b-photo{width:100%;height:100%;min-height:380px;background:linear-gradient(135deg,var(--rose-dk) 0%,var(--plum) 55%,var(--ink) 100%);display:flex;align-items:flex-end;padding:32px;position:relative}
.b-photo .photo-lbl{font-family:var(--serif);font-size:30px;font-weight:800;color:var(--rose-lt);line-height:1.1;position:relative;z-index:1}
.b-photo::after{content:"";position:absolute;top:20px;left:20px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(247,242,236,.3)}
.b-quote blockquote{font-family:var(--serif);font-style:italic;font-size:clamp(17px,2vw,22px);color:var(--rose-lt);line-height:1.45}
.b-quote cite{display:block;margin-top:14px;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--champ);font-style:normal}
.b-stat .sn{font-family:var(--serif);font-weight:900;font-size:clamp(42px,5.5vw,64px);line-height:1;color:var(--rose)}
.b-stat .sl{font-size:12.5px;font-weight:600;letter-spacing:.05em;color:rgba(247,242,236,.6);margin-top:8px}
.b-roles{display:flex;flex-direction:column;gap:10px}
.b-role-tag{display:inline-block;padding:9px 18px;border-radius:40px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;width:fit-content}
.rt1{background:var(--plum);color:var(--rose-lt)}
.rt2{background:rgba(142,66,87,.12);color:var(--plum);border:1px solid rgba(142,66,87,.25)}
.rt3{background:var(--champ);color:var(--ink)}
.b-bio{font-size:14.5px;line-height:1.65;color:var(--ink-2)}
.b-bio strong{color:var(--plum);font-weight:700}
@media(max-width:900px){
  .about{padding:80px 24px}
  .bento{grid-template-columns:1fr 1fr;gap:12px}
  .b-1,.b-2,.b-3,.b-4,.b-5{grid-column:auto;grid-row:auto}
  .b-photo{height:auto;min-height:0;aspect-ratio:3/4}
}
@media(max-width:540px){.bento{grid-template-columns:1fr}}

/* CAREER */
.career{background:var(--ink);padding:100px 0 0}
.career-head{padding:0 48px 60px}
.c-eyebrow{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--champ);display:block;margin-bottom:18px}
.c-title{font-family:var(--serif);font-size:clamp(38px,6vw,76px);font-weight:800;line-height:.95;letter-spacing:-.025em;color:var(--bone)}
.c-title em{color:var(--rose);font-style:italic}
.c-sub{font-size:16px;color:rgba(247,242,236,.5);margin-top:18px;max-width:48ch;line-height:1.6}
.career-shell{position:relative}
.career-sticky{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center}
.career-shell.static .career-sticky{position:static;height:auto;justify-content:flex-start;padding-bottom:20px}
.career-track-outer{overflow:hidden}
.career-track{display:flex;padding:0 48px;will-change:transform}
.career-node{flex:0 0 360px;padding-right:48px}
.cn-line{height:1px;background:linear-gradient(to right,var(--rose),transparent);margin-bottom:30px;position:relative}
.cn-line::before{content:"";position:absolute;left:0;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:var(--rose);box-shadow:0 0 0 3px rgba(230,183,189,.2)}
.cn-year{font-family:var(--serif);font-style:italic;font-size:50px;font-weight:300;line-height:1;color:var(--champ);margin-bottom:12px}
.cn-role{font-family:var(--serif);font-weight:700;font-size:21px;color:var(--bone);margin-bottom:6px;line-height:1.2}
.cn-place{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--rose);margin-bottom:12px}
.cn-desc{font-size:14px;color:rgba(247,242,236,.52);line-height:1.65}
.career-prog-row{padding:22px 48px 40px;display:flex;align-items:center;gap:16px}
.career-prog-track{flex:1;height:1px;background:rgba(247,242,236,.08)}
.career-prog-fill{height:100%;width:0;background:linear-gradient(to right,var(--rose),var(--champ));transition:width .08s linear}
.career-drag{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(247,242,236,.22);white-space:nowrap}
@media(max-width:800px){
  .career-head{padding:0 24px 48px}
  /* Mobile: native horizontal swipe instead of the desktop scroll-hijack */
  .career-shell{height:auto !important}
  .career-sticky{position:static;height:auto;overflow:visible;justify-content:flex-start}
  .career-track-outer{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;scrollbar-width:none;overscroll-behavior-x:contain}
  .career-track-outer::-webkit-scrollbar{display:none}
  .career-track{padding:0 24px;transform:none !important}
  .career-node{flex:0 0 82%;padding-right:20px;scroll-snap-align:start}
  .career-prog-row{padding:16px 24px 40px}
}

/* BUILDS */
.builds{background:var(--rose-xs);padding:100px 48px}
.builds-inner{max-width:1200px;margin:0 auto}
.sec-ey-plum{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--plum);display:block;margin-bottom:18px}
.sec-h{font-family:var(--serif);font-size:clamp(38px,6vw,70px);font-weight:800;line-height:.95;letter-spacing:-.025em;color:var(--ink);margin-bottom:52px}
.builds-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.bcard{border-radius:16px;overflow:hidden;border:1px solid rgba(142,66,87,.1);transition:transform .3s cubic-bezier(.22,.68,0,1.2),box-shadow .3s}
.bcard:hover{transform:translateY(-6px);box-shadow:0 24px 48px rgba(142,66,87,.14)}
.bc-top{padding:36px;background:var(--ink)}
.bc-num{font-family:var(--serif);font-style:italic;font-size:38px;font-weight:300;color:var(--champ);line-height:1;margin-bottom:16px}
.bc-name{font-family:var(--serif);font-weight:700;font-size:clamp(20px,2.8vw,28px);color:var(--bone);line-height:1.1;margin-bottom:8px}
.bc-sub{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--rose)}
.bc-body{padding:26px 36px;background:var(--white)}
.bc-body p{font-size:14.5px;color:var(--ink);opacity:.72;line-height:1.65}
.bc-link{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:12.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--plum);transition:gap .2s}
.bc-link:hover{gap:14px}
.bc-link::after{content:"→"}
@media(max-width:760px){.builds{padding:80px 24px}.builds-grid{grid-template-columns:1fr}}

/* JAPADA */
.japada{background:var(--plum);padding:100px 48px;position:relative;overflow:hidden}
.japada-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:1}
.j-eyebrow{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--rose);display:block;margin-bottom:18px}
.j-title{font-family:var(--serif);font-size:clamp(36px,5.5vw,64px);font-weight:800;line-height:.95;letter-spacing:-.025em;color:var(--white)}
.j-title em{font-style:italic;color:var(--rose)}
.j-body{font-size:16.5px;color:rgba(255,255,255,.68);line-height:1.7;margin-top:18px;max-width:44ch}
.j-eps{margin-top:36px;display:flex;flex-direction:column;gap:2px}
.ep-row{display:flex;align-items:center;gap:18px;padding:15px 18px;border-radius:10px;background:rgba(255,255,255,.07);transition:background .2s;cursor:pointer}
.ep-row:hover{background:rgba(255,255,255,.14)}
.ep-n{font-family:var(--serif);font-style:italic;font-size:21px;color:var(--rose);font-weight:300;min-width:30px}
.ep-t{font-size:14px;font-weight:600;color:var(--white);line-height:1.3}
.ep-badge{margin-left:auto;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.32)}
.j-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:36px}
.btn-bone{padding:14px 32px;background:var(--bone);color:var(--ink);border-radius:40px;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;transition:background .2s,transform .15s}
.btn-bone:hover{background:var(--rose);transform:translateY(-2px)}
.btn-ghost-w{padding:14px 28px;border:1.5px solid rgba(255,255,255,.3);color:var(--white);border-radius:40px;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:.2s}
.btn-ghost-w:hover{border-color:var(--rose);color:var(--rose)}
.j-stats{display:flex;flex-direction:column;gap:44px}
.jstat .jn{font-family:var(--serif);font-weight:900;font-size:clamp(56px,8vw,96px);line-height:1;color:var(--white);letter-spacing:-.03em}
.jstat .jn em{color:var(--rose);font-style:normal}
.jstat .jl{font-size:13.5px;color:rgba(255,255,255,.48);font-weight:500;margin-top:6px}
@media(max-width:800px){.japada{padding:80px 24px}.japada-inner{grid-template-columns:1fr;gap:48px}}

/* PRESS */
.press{background:var(--rose-lt);padding:70px 48px}
.press-label{font-size:10.5px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--greige);text-align:center;display:block;margin-bottom:44px}
.press-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(142,66,87,.1);border-radius:12px;overflow:hidden}
.press-card{background:var(--white);padding:36px 30px;text-align:center;transition:background .2s}
.press-card:hover{background:var(--rose-xs)}
.press-q{font-family:var(--serif);font-style:italic;font-size:15.5px;color:var(--ink);line-height:1.6;margin-bottom:14px;opacity:.8}
.press-src{font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--plum)}
@media(max-width:760px){.press{padding:60px 24px}.press-grid{grid-template-columns:1fr}}

/* CONTACT */
.contact{background:var(--ink);padding:110px 48px}
.contact-inner{max-width:1200px;margin:0 auto}
.sec-ey-champ{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--champ);display:block;margin-bottom:18px}
.contact-title{font-family:var(--serif);font-size:clamp(44px,8vw,96px);font-weight:900;line-height:.9;letter-spacing:-.03em;color:var(--rose);margin-bottom:64px}
.contact-title .ct-sub{color:rgba(247,242,236,.5);font-weight:300;font-style:italic;display:block}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
.c-links{display:flex;flex-direction:column;gap:0}
.c-link{display:flex;align-items:center;gap:18px;padding:20px 0;border-bottom:1px solid rgba(247,242,236,.07);transition:padding .2s}
.c-link:hover{padding-left:8px}
.c-link:hover .cl-icon{background:var(--plum);border-color:var(--plum)}
.cl-icon{width:46px;height:46px;border-radius:50%;border:1px solid rgba(230,183,189,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,border-color .2s}
.cl-icon svg{stroke:var(--rose);fill:none;stroke-width:1.5}
.cl-lbl{font-size:10.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--champ);display:block;margin-bottom:3px}
.cl-val{font-size:15px;color:var(--bone)}
.cform{background:rgba(255,255,255,.04);border:1px solid rgba(247,242,236,.08);border-radius:14px;padding:44px 40px}
.cform-title{font-family:var(--serif);font-size:21px;font-weight:500;color:var(--bone);margin-bottom:28px}
.fg{margin-bottom:18px}
.fg label{display:block;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--champ);margin-bottom:8px}
.fg input,.fg textarea,.fg select{width:100%;padding:13px 16px;background:rgba(255,255,255,.06);border:1px solid rgba(247,242,236,.1);border-radius:8px;color:var(--bone);font-family:var(--sans);font-size:15px;outline:none;transition:border-color .2s;appearance:none}
.fg input::placeholder,.fg textarea::placeholder{color:rgba(247,242,236,.3)}
.fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--rose)}
.fg select option{background:var(--ink-2);color:var(--bone)}
.fg textarea{resize:vertical;min-height:108px}
.fg-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.cform-btn{width:100%;padding:16px;background:var(--rose);color:var(--ink);border-radius:40px;font-size:13.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;transition:background .2s,transform .15s;margin-top:6px}
.cform-btn:hover{background:var(--rose-lt);transform:translateY(-1px)}
.cform-note{font-size:11.5px;color:rgba(247,242,236,.26);text-align:center;margin-top:12px;line-height:1.5}
@media(max-width:900px){.contact-grid{grid-template-columns:1fr}}
@media(max-width:760px){.contact{padding:80px 24px}.cform{padding:32px 26px}.fg-row{grid-template-columns:1fr}}

/* FOOTER */
.footer{background:var(--ink-2);border-top:1px solid rgba(247,242,236,.05);padding:40px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.footer-name{font-family:var(--serif);font-size:20px;font-weight:700;color:var(--rose)}
.footer-links{display:flex;gap:24px;list-style:none}
.footer-links a{font-size:11.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(247,242,236,.32);transition:color .2s}
.footer-links a:hover{color:var(--rose)}
.footer-copy{font-size:11.5px;color:rgba(247,242,236,.2);letter-spacing:.04em}
@media(max-width:760px){.footer{padding:32px 24px;flex-direction:column;align-items:flex-start;gap:18px}}

/* REVEALS */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.22,.68,0,1),transform .8s cubic-bezier(.22,.68,0,1)}
.reveal.in{opacity:1;transform:none}
.reveal-l{opacity:0;transform:translateX(-26px);transition:opacity .8s cubic-bezier(.22,.68,0,1),transform .8s cubic-bezier(.22,.68,0,1)}
.reveal-l.in{opacity:1;transform:none}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

/* KEYFRAMES */
@keyframes nameIn{from{opacity:0;transform:translateY(22px) scale(.97)}to{opacity:1;transform:none}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes scrollPulse{0%,100%{opacity:.35;transform:scaleY(1)}50%{opacity:.7;transform:scaleY(1.3)}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}}
`;

/* ============================================================
   BACKGROUND VIDEO
   Set this to switch on the looping video behind the hero.
   - Hosted file:  "https://your-cdn.com/hero-loop.mp4"
   - Local file:   drop hero.mp4 into the project's /public folder,
                   then set this to "/hero.mp4"
   Leave it "" to keep the gradient fallback.
   ============================================================ */
const HERO_VIDEO = "/hero.mp4";

export default function App() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sendState, setSendState] = useState("idle"); // idle | sending | sent

  const vidRef = useRef(null);
  const fbRef = useRef(null);
  const shellRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  /* Inject Google Fonts (originally in <head>) */
  useEffect(() => {
    const defs = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..700&family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap",
      },
    ];
    const els = defs.map((d) => {
      const l = document.createElement("link");
      Object.entries(d).forEach(([k, v]) => l.setAttribute(k, v));
      document.head.appendChild(l);
      return l;
    });
    return () => els.forEach((l) => l.remove());
  }, []);

  /* NAV — stuck on scroll */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* VIDEO — fade the gradient out once the clip can play; keep it on error */
  useEffect(() => {
    const vid = vidRef.current;
    const fb = fbRef.current;
    if (!HERO_VIDEO || !vid) return; // no video set → gradient stays
    const onCanPlay = () => { if (fb) fb.style.opacity = "0"; };
    const onError = () => { vid.style.display = "none"; };
    vid.addEventListener("canplay", onCanPlay);
    vid.addEventListener("error", onError);
    return () => {
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeEventListener("error", onError);
    };
  }, []);

  /* SCROLL REVEALS */
  useEffect(() => {
    const rio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            rio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal,.reveal-l").forEach((el) => rio.observe(el));
    return () => rio.disconnect();
  }, []);

  /* CAREER — desktop: scroll-driven horizontal (rAF-smoothed).
     mobile: native touch side-scroll. Progress bar tracks both. */
  useEffect(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const outer = track ? track.parentElement : null;
    if (!shell || !track || !outer) return;

    const mq = window.matchMedia("(max-width: 800px)");
    let winHandler = null; // desktop: window scroll
    let outHandler = null; // mobile: container scroll
    let ticking = false;

    const clearDesktop = () => {
      if (winHandler) { window.removeEventListener("scroll", winHandler); winHandler = null; }
      shell.style.height = "";
      track.style.transform = "";
      shell.classList.remove("static");
    };
    const clearMobile = () => {
      if (outHandler) { outer.removeEventListener("scroll", outHandler); outHandler = null; }
    };

    const initDesktop = () => {
      clearMobile();
      shell.classList.remove("static");
      shell.style.height = "";
      track.style.transform = "";
      const scrollDist = track.scrollWidth - outer.offsetWidth;
      if (scrollDist <= 0) {
        // Everything already fits → no hijack, and no empty 100vh band.
        shell.classList.add("static");
        if (fill) fill.style.width = "0%";
        return;
      }
      shell.style.height = window.innerHeight + scrollDist + "px";
      const apply = () => {
        const rect = shell.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, -rect.top / scrollDist));
        track.style.transform = "translate3d(" + (-prog * scrollDist) + "px,0,0)";
        if (fill) fill.style.width = prog * 100 + "%";
        ticking = false;
      };
      winHandler = () => {
        if (!ticking) { ticking = true; requestAnimationFrame(apply); }
      };
      window.addEventListener("scroll", winHandler, { passive: true });
      apply();
    };

    const initMobile = () => {
      clearDesktop(); // drop any desktop height/transform left over
      const apply = () => {
        const max = outer.scrollWidth - outer.clientWidth;
        const prog = max > 0 ? outer.scrollLeft / max : 0;
        if (fill) fill.style.width = prog * 100 + "%";
        ticking = false;
      };
      outHandler = () => {
        if (!ticking) { ticking = true; requestAnimationFrame(apply); }
      };
      outer.addEventListener("scroll", outHandler, { passive: true });
      apply();
    };

    const init = () => { (mq.matches ? initMobile : initDesktop)(); };

    const onResize = () => { setTimeout(init, 100); };
    init();
    window.addEventListener("resize", onResize);
    if (mq.addEventListener) mq.addEventListener("change", init);
    else if (mq.addListener) mq.addListener(init);

    return () => {
      window.removeEventListener("resize", onResize);
      if (mq.removeEventListener) mq.removeEventListener("change", init);
      else if (mq.removeListener) mq.removeListener(init);
      clearDesktop();
      clearMobile();
    };
  }, []);

  /* FORM */
  const handleSubmit = () => {
    if (sendState !== "idle") return;
    setSendState("sending");
    setTimeout(() => setSendState("sent"), 1200);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className={`nav${stuck ? " stuck" : ""}`} id="nav">
        <span className="nav-name">
          Oluwaseyi <b>Makinde</b>
        </span>
        <div className={`nav-links-wrap${menuOpen ? " open" : ""}`} id="nav-links-wrap">
          <ul className="nav-links">
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#career" onClick={closeMenu}>Journey</a></li>
            <li><a href="#builds" onClick={closeMenu}>Work</a></li>
            <li><a href="#japada" onClick={closeMenu}>Japada</a></li>
            <li><a href="#contact" className="nav-btn" onClick={closeMenu}>Work with me</a></li>
          </ul>
        </div>
        <button
          className="nav-burger"
          id="burger"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        {/*
          Background video plays here, behind the hero content.
          Flip it on by setting HERO_VIDEO at the top of this file.
          Use a muted, looping MP4 (~5–10MB) so it loads fast.
        */}
        {HERO_VIDEO && (
          <video
            className="hero-video"
            id="hero-vid"
            ref={vidRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        <div
          className="hero-fallback"
          id="hero-fallback"
          ref={fbRef}
          style={{ transition: "opacity .8s ease" }}
        ></div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
  <style dangerouslySetInnerHTML={{ __html: `
    .hero-logo{
      width:min(800px,80vw);
      height:auto;
      display:block;
      margin:0 auto;
      filter:drop-shadow(0 2px 40px rgba(230,183,189,.3)) drop-shadow(0 0 80px rgba(142,66,87,.5));
      animation:nameIn 1.2s cubic-bezier(.22,.68,0,1) both;
    }
  ` }} />

  <img
    className="hero-logo"
    src="/logo.png"
    alt="Oluwaseyi Makinde"
  />

  <div className="hero-ctas">
    <a href="#about" className="btn-rose-solid">Discover Oluwaseyi</a>
    <a href="#contact" className="btn-outline-w">Work with me</a>
  </div>
</div>

        <div className="hero-scroll-hint">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-bar" aria-hidden="true">
        <div className="ticker-track">

          <span className="ticker-item">Strategic advisor <span className="sep"></span></span>
          <span className="ticker-item">Co-Founder · Dome <span className="sep"></span></span>
          <span className="ticker-item">@mommychoplife <span className="sep"></span></span>
          <span className="ticker-item">The Japada Series <span className="sep"></span></span>
          <span className="ticker-item"> Community builder/leader<span className="sep"></span></span>
          <span className="ticker-item">Lagos · Nigeria <span className="sep"></span></span>
          <span className="ticker-item"> Thorough execution <span className="sep"></span></span>
          <span className="ticker-item">Chief of Staff <span className="sep"></span></span>
          <span className="ticker-item">Solutions Partner <span className="sep"></span></span>
          <span className="ticker-item">Co-Founder · Dome <span className="sep"></span></span>
          <span className="ticker-item">@mommychoplife <span className="sep"></span></span>
          <span className="ticker-item">The Japada Series <span className="sep"></span></span>
          <span className="ticker-item">Growth Consultant <span className="sep"></span></span>
          <span className="ticker-item">Lagos · Nigeria <span className="sep"></span></span>
         
        </div>
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span className="about-eyebrow reveal">About</span>
          <h2 className="about-headline reveal d1">
            The quiet force driving big visions through  <em>relentless execution.</em>
          </h2>
          <div className="bento">
           <div className="b-cell b-1 reveal reveal-l">
  <div className="b-photo">
    <img
      src="/oluwaseyi.jpg"
      alt="Oluwaseyi Makinde"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
        zIndex: 0,
      }}
    />
   
  </div>
</div>

            <div className="b-cell b-2 b-ink b-quote reveal d1">
              <blockquote>
                "My job is to know what needs attention, what needs protection, what needs to be said, and what must remain confidential."
              </blockquote>
              <cite>Oluwaseyi Makinde</cite>
            </div>

            <div className="b-cell b-3 b-rose-lt b-roles reveal d2">
  <style dangerouslySetInnerHTML={{ __html: `
    .rt-ink{background:var(--ink);color:var(--rose-lt)}
  ` }} />
              <div className="b-role-tag rt2">Strategic Advisor</div>
              <div className="b-role-tag rt1">Co-Founder · Dome</div>
              <div className="b-role-tag rt-ink">Consultant</div>
              <div className="b-role-tag rt2">Creator · @mommychoplife</div>
              <div className="b-role-tag rt3">Japada Series</div>
            </div>

        
            <div className="b-cell b-4 b-bone reveal d2">
              <p className="b-bio">
        Oluwaseyi Makinde is a <strong> strategic advisor</strong> to high-profile leaders, trusted to act on their behalf with sound judgment and discretion while shielding them from unnecessary distractions and operational burdens. Her career spans international governments, global brands and nonprofit organizations across four countries and three continents. 
              </p>
            </div>
          </div>
        </div>
      </section>

     

      {/* BUILDS */}
      <section className="builds" id="builds">
        <div className="builds-inner">
          <span className="sec-ey-plum reveal">What She Builds</span>
          <h2 className="sec-h reveal d1">Work &amp; ventures.</h2>
          <div className="builds-grid">
            <div className="bcard reveal d1"><div className="bc-top"><div className="bc-num">01.</div><div className="bc-name"> Strategic Advisor</div><div className="bc-sub">Strategic Advisor · High profile Leaders</div></div><div className="bc-body"><p>Leaders rely on Oluwaseyi to anticipate and solve problems before they surface, protect their time, reputation and vision.</p><a href="#contact" className="bc-link">Enquire about working together</a></div></div>
            <div className="bcard reveal d2"><div className="bc-top"><div className="bc-num">02.</div><div className="bc-name">Dome</div><div className="bc-sub">PROPTECH STARTUP · Nigeria</div></div><div className="bc-body"><p>Dome gives you the real story before you rent, with verified reviews and neighbourhood insights that make finding your next home simpler and more transparent.</p><a href="https://usedome.app/" className="bc-link">Download the app</a></div></div>
            <div className="bcard reveal d1"><div className="bc-top"><div className="bc-num">03.</div><div className="bc-name">@mommychoplife</div><div className="bc-sub">Lifestyle · Community · Creator</div></div><div className="bc-body"><p>The home of the Japada series chronicling her journey of relocating from Canada to Nigeria and sharing insights on building a meaningful life back home.</p><a href="https://www.instagram.com/mommychoplife/" target="_blank" rel="noopener" className="bc-link">Follow on Instagram</a></div></div>
            <div className="bcard reveal d2"><div className="bc-top"><div className="bc-num">04.</div><div className="bc-name">Speaking &amp; Media</div><div className="bc-sub">Keynote · Panels · Features</div></div><div className="bc-body"><p>Available for keynotes, panels and media features on the Japada movement, women in executive leadership and building strong, intentional personal brands.</p><a href="#contact" className="bc-link">Book a speaking engagement</a></div></div>
          </div>
        </div>
      </section>

      {/* JAPADA */}
     {/* JAPADA */}
<section className="japada" id="japada">
  <style dangerouslySetInnerHTML={{ __html: `
    .japada-inner{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
    .japada-photo{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/5;
      box-shadow:0 30px 60px rgba(36,27,29,.35)}
    .japada-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
    .japada-photo::after{content:"";position:absolute;inset:0;
      background:linear-gradient(160deg,rgba(230,183,189,0) 55%,rgba(142,66,87,.35) 100%)}
    @media(max-width:820px){
      .japada-inner{grid-template-columns:1fr;gap:40px}
      .japada-photo{aspect-ratio:3/4;max-width:460px;margin:0 auto;order:2}
    }
  ` }} />

  <div className="japada-inner">
    <div className="reveal reveal-l">
      <span className="j-eyebrow">The Japada Series</span>
      <h2 className="j-title">
        When everyone<br />was leaving,<br />she found <em>balance</em> <br/> by coming <em>back </em>.
      </h2>
     
      <div className="j-eps">
        <div className="ep-row"><span className="ep-n">01</span><span className="ep-t">Why I came back when everyone was leaving</span><span className="ep-badge">Ep. 1</span></div>
        <div className="ep-row"><span className="ep-n">02</span><span className="ep-t">The real cost of settling in Lagos — the numbers</span><span className="ep-badge">Ep. 2</span></div>
        <div className="ep-row"><span className="ep-n">03</span><span className="ep-t">Raising my kids here vs. there</span><span className="ep-badge">Ep. 3</span></div>
        <div className="ep-row"><span className="ep-n">04</span><span className="ep-t">The artisan wahala nobody warns you about</span><span className="ep-badge">Ep. 4</span></div>
        <div className="ep-row"><span className="ep-n">05</span><span className="ep-t">Multi-currency life: making it actually work</span><span className="ep-badge">Ep. 5</span></div>
      </div>
      <div className="j-ctas">
        <a href="https://www.instagram.com/mommychoplife/" target="_blank" rel="noopener" className="btn-bone">Watch the series</a>
      </div>
    </div>

    <div className="japada-photo reveal d2">
      <img src="/japada.jpg" alt="Oluwaseyi Makinde in Lagos" />
    </div>
  </div>
</section>
{/* RECOMMENDATIONS */}
<section className="recs" id="recommendations">
  <style dangerouslySetInnerHTML={{ __html: `
    .recs{background:var(--bone);padding:100px 48px;overflow:hidden}
    .recs-inner{max-width:1200px;margin:0 auto}
    .recs-head{margin-bottom:56px}
    .recs-eyebrow{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--plum);display:block;margin-bottom:18px}
    .recs-title{font-family:var(--serif);font-size:clamp(38px,6vw,70px);font-weight:800;line-height:.95;letter-spacing:-.025em;color:var(--ink)}
    .recs-title em{font-style:italic;color:var(--plum)}
    .recs-sub{font-size:16px;color:var(--ink-2);opacity:.7;margin-top:16px;max-width:52ch;line-height:1.6}
    .recs-grid{columns:3;column-gap:20px}
    .rec-card{break-inside:avoid;margin-bottom:20px;background:var(--white);border:1px solid rgba(142,66,87,.1);border-radius:16px;padding:30px 28px;transition:transform .3s cubic-bezier(.22,.68,0,1.2),box-shadow .3s}
    .rec-card:hover{transform:translateY(-5px);box-shadow:0 22px 44px rgba(142,66,87,.13)}
    .rec-stars{color:var(--champ);font-size:15px;letter-spacing:2px;margin-bottom:16px}
    .rec-quote{font-size:14.5px;line-height:1.65;color:var(--ink-2)}
    .rec-quote::before{content:"“";font-family:var(--serif);color:var(--rose-dk);font-size:20px;font-weight:700}
    .rec-quote::after{content:"”";font-family:var(--serif);color:var(--rose-dk);font-size:20px;font-weight:700}
    .rec-who{display:flex;align-items:center;gap:12px;margin-top:20px;padding-top:18px;border-top:1px solid rgba(142,66,87,.1)}
    .rec-avatar{width:42px;height:42px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-weight:800;font-size:16px;color:var(--white);background:var(--plum);object-fit:cover}
    .rec-name{font-size:14px;font-weight:700;color:var(--ink);line-height:1.2}
    .rec-role{font-size:11.5px;color:var(--ink-2);opacity:.65;line-height:1.3;margin-top:2px}
    @media(max-width:900px){.recs-grid{columns:2}}
    @media(max-width:600px){.recs{padding:80px 24px}.recs-grid{columns:1}}
  ` }} />

  <div className="recs-inner">
    <div className="recs-head reveal">
      <span className="recs-eyebrow">Recommendations</span>
      <h2 className="recs-title">In their <em>own words.</em></h2>
      <p className="recs-sub">Principals, partners and peers across marketing, finance and tech on what it’s like to work with Oluwaseyi</p>
    </div>

    <div className="recs-grid">

      <div className="rec-card reveal">
        <div className="rec-stars">★★★★★</div>
        <p className="rec-quote">I was particularly inspired as well as impressed by Seyi's ability to handle even the toughest clients effortlessly. A skill that often takes a very long time to master appeared to be natural to her..
No matter how tense a meeting turned out, you could rely on Seyi to make sure everyone left with a smile. </p>
        <div className="rec-who">
          <div className="rec-avatar">E</div>
          <div>
            <div className="rec-name">Emmanuel Mang Dickson-Dieke, CDMP</div>
            <div className="rec-role">Performance Marketing Strategist @ Hey Digital</div>
          </div>
        </div>
      </div>

      <div className="rec-card reveal">
        <div className="rec-stars">★★★★★</div>
        <p className="rec-quote">Not only is Seyi a marketing guru, she is
also kind, personable, and very easy to work with. She takes professionalism to a new level. I really enjoyed working with her and already have other projects lined up for her. I absolutely enjoyed working with her and will recommend her to anyone without any reservations</p>
        <div className="rec-who">
          <div className="rec-avatar">E</div>
          <div>
            <div className="rec-name">Efe Ukala, Esq.</div>
            <div className="rec-role">VP, Assistant General Counsel at JPMorgan</div>
          </div>
        </div>
      </div>

      <div className="rec-card reveal">
        <div className="rec-stars">★★★★★</div>
        <p className="rec-quote">I've worked with Seyi in different capacities and on different projects  she is a brilliant and thorough professional. Always available to dissect any brief and provide the best approach to demonstrate value for money. I would not hesitate to recommend her to any organisation that values talent.</p>
        <div className="rec-who">
          <div className="rec-avatar">O</div>
          <div>
            <div className="rec-name">Odianosen Iseyare, ACIM</div>
            <div className="rec-role">Marketing Leader · Growth &amp; Digital Strategy</div>
          </div>
        </div>
      </div>

      <div className="rec-card reveal">
        <div className="rec-stars">★★★★★</div>
        <p className="rec-quote">Seyi is such an amazing person to work with. She cares not only about the work but also about your personal and career growth. Seyi is highly brilliant at digital strategy and is a brainbox of ideas - you can always count on her to deliver. During my time working with Seyi, she really inspired me to pursue excellence. Seyi has my highest recommendations anytime.</p>
        <div className="rec-who">
          <div className="rec-avatar">P</div>
          <div>
            <div className="rec-name">Peace Itimi</div>
            <div className="rec-role">Marketing, Media &amp; Startups · MBA, Imperial College London</div>
          </div>
        </div>
      </div>

      <div className="rec-card reveal">
        <div className="rec-stars">★★★★★</div>
        <p className="rec-quote">Without exaggeration, Seyi is the most passionate, well-educated and accomplished person I've had the privilege of working with. Always reliable and professional  her drive to excel is matched only by her generosity of spirit. She'll be a great asset to any organisation she joins.</p>
        <div className="rec-who">
          <div className="rec-avatar">M</div>
          <div>
            <div className="rec-name">Marc Menard</div>
            <div className="rec-role">Knowledge &amp; Support Advisor at Alterna Savings</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
      {/* PRESS */}
      <div className="press">
        <span className="press-label">As featured in &amp; recognised by</span>
        <div className="press-grid reveal">
          <div className="press-card"><p className="press-q">"When Japa Turns to Japada — a conversation about returning home with purpose and a plan."</p><span className="press-src">Gbemi and toolz O· OffAir Show</span></div>
          <div className="press-card"><p className="press-q">"Being born and raised in Nigeria doesn't mean lack of exposure"</p><span className="press-src">The Japada Pod</span></div>
          <div className="press-card"><p className="press-q">"
She Gave Up Canada... And Never Looked Back "</p><span className="press-src">The Japada Pod</span></div>
        </div>
      </div>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="reveal">
            <span className="sec-ey-champ">Get in Touch</span>
            <h2 className="contact-title">
              Let's build<br /><span className="ct-sub">something beautiful.</span>
            </h2>
          </div>
          <div className="contact-grid">
            <div className="reveal reveal-l">
              <div className="c-links">
                <a href="https://www.instagram.com/mommychoplife/" target="_blank" rel="noopener" className="c-link">
                  <div className="cl-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.2" fill="var(--rose)" stroke="none" />
                    </svg>
                  </div>
                  <div><span className="cl-lbl">Instagram</span><span className="cl-val">@mommychoplife</span></div>
                </a>
                <a href="https://www.linkedin.com/in/oluwaseyimakinde" target="_blank" rel="noopener" className="c-link">
                  <div className="cl-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div><span className="cl-lbl">LinkedIn</span><span className="cl-val">Oluwaseyi Makinde</span></div>
                </a>
                <a href="mailto:hello@iamoluwaseyi.com" className="c-link">
                  <div className="cl-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div><span className="cl-lbl">Email</span><span className="cl-val">hello@iamoluwaseyi.com</span></div>
                </a>
              </div>
            </div>
            <div className="cform reveal d2">
              <p className="cform-title">Send a message</p>
              <div className="fg-row">
                <div className="fg"><label>First name</label><input type="text" placeholder="Your first name" /></div>
                <div className="fg"><label>Last name</label><input type="text" placeholder="Your last name" /></div>
              </div>
              <div className="fg"><label>Email</label><input type="email" placeholder="your@email.com" /></div>
              <div className="fg">
                <label>I'm reaching out about</label>
                <select defaultValue="">
                  <option value="" disabled>Select a reason</option>
                  <option>Working with Oluwaseyi (strategic Advisor )</option>
                  <option>Dome — property review startup</option>
                  <option>Speaking or media feature</option>
                  <option>Brand partnership or collaboration</option>
                  <option>The Japada Playbook</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="fg"><label>Message</label><textarea placeholder="Tell me what you have in mind…"></textarea></div>
              <button
                className="cform-btn"
                onClick={handleSubmit}
                disabled={sendState !== "idle"}
                style={sendState === "sent" ? { background: "var(--champ)" } : undefined}
              >
                {sendState === "idle" ? "Send message" : sendState === "sending" ? "Sending…" : "Sent ✓ Thank you!"}
              </button>
              <p className="cform-note">Responses within 48 hours · Discretion guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">

        <ul className="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#career">Journey</a></li>
          <li><a href="#builds">Work</a></li>
          <li><a href="#japada">Japada</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <span className="footer-copy">© 2026 Oluwaseyi Makinde </span>
      </footer>
    </>
  );
}