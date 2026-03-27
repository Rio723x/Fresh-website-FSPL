const fs = require('fs');
const path = 'c:/Users/user/Desktop/Kimi_Agent_Deployment_v4/assets/index-CWq5cBdG.js';
let content = fs.readFileSync(path, 'utf8');

// The old static map with hover states
const mapOldStr = `M3.map((r,o)=>x.jsxs("div",{"code-path":"src/sections/Benefits.tsx:196:13",className:"absolute w-[280px] h-[340px] bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom hover:!z-50 hover:!scale-110 hover:-translate-y-8 flex flex-col items-center text-center " + ["rotate-[-16deg] -translate-x-32 translate-y-12 z-10 group-hover:-translate-x-48 group-hover:rotate-[-24deg] group-hover:translate-y-4", "rotate-[-6deg] -translate-x-12 translate-y-4 z-20 group-hover:-translate-x-16 group-hover:rotate-[-10deg] group-hover:-translate-y-2", "rotate-[6deg] translate-x-12 translate-y-4 z-30 group-hover:translate-x-16 group-hover:rotate-[10deg] group-hover:-translate-y-2", "rotate-[16deg] translate-x-32 translate-y-12 z-40 group-hover:translate-x-48 group-hover:rotate-[24deg] group-hover:translate-y-4"][o],children:[x.jsx("div",{className:"w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white",children:r.icon}),x.jsx("h4",{className:"text-xl font-bold text-black mb-4",children:r.title}),x.jsx("p",{className:"text-sm text-gray-600 leading-relaxed",children:r.description})]},o))`;

// The new map that relies on indexed CSS animation classes (defined in index.css shortly)
const mapNewStr = `M3.map((r,o)=>x.jsxs("div",{"code-path":"src/sections/Benefits.tsx:196:13",className: "absolute w-[280px] h-[340px] bg-white rounded-3xl p-8 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-200 transition-transform duration-[800ms] flex flex-col items-center text-center origin-bottom card-swap-anim-" + o, children:[x.jsx("div",{className:"w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6",children:r.icon}),x.jsx("h4",{className:"text-xl font-bold text-black mb-4",children:r.title}),x.jsx("p",{className:"text-sm text-gray-600 leading-relaxed",children:r.description})]},o))`;

if (content.includes(mapOldStr)) {
    content = content.replace(mapOldStr, mapNewStr);
    console.log("Map replaced");
} else {
    // regex fallback
    const regexMap = /M3\.map\(\(r,o\).*?\},o\)\)/;
    if (regexMap.test(content)) {
        content = content.replace(regexMap, mapNewStr);
        console.log("Map replaced with REGEX");
    } else {
        console.log("Map NOT FOUND with REGEX either");
    }
}
fs.writeFileSync(path, content, 'utf8');
console.log("Done");
