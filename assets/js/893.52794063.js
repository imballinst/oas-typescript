"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[893],{3349:(U,L,a)=>{a.d(L,{a:()=>d});var E=a(6225);function d(r,P){var M=r.append("foreignObject").attr("width","100000"),f=M.append("xhtml:div");f.attr("xmlns","http://www.w3.org/1999/xhtml");var T=P.label;switch(typeof T){case"function":f.insert(T);break;case"object":f.insert(function(){return T});break;default:f.html(T)}E.bg(f,P.labelStyle),f.style("display","inline-block"),f.style("white-space","nowrap");var I=f.node().getBoundingClientRect();return M.attr("width",I.width).attr("height",I.height),M}},6225:(U,L,a)=>{a.d(L,{$p:()=>I,O1:()=>P,WR:()=>N,bF:()=>r,bg:()=>T});var E=a(7514),d=a(3234);function r(i,w){return!!i.children(w).length}function P(i){return f(i.v)+":"+f(i.w)+":"+f(i.name)}var M=/:/g;function f(i){return i?String(i).replace(M,"\\:"):""}function T(i,w){w&&i.attr("style",w)}function I(i,w,g){w&&i.attr("class",w).attr("class",g+" "+i.attr("class"))}function N(i,w){var g=w.graph();if(E.Z(g)){var O=g.transition;if(d.Z(O))return O(i)}return i}},9893:(U,L,a)=>{a.d(L,{diagram:()=>w});var E=a(8955),d=a(1358),r=a(5322),P=a(7934),M=a(5625),f=a(1644),T=a(9354),I=a(7484),N=a(7967),i=a(7856);const w={parser:E.p,db:E.f,renderer:d.f,styles:d.a,init:g=>{g.flowchart||(g.flowchart={}),g.flowchart.arrowMarkerAbsolute=g.arrowMarkerAbsolute,(0,r.p)({flowchart:{arrowMarkerAbsolute:g.arrowMarkerAbsolute}}),d.f.setConf(g.flowchart),E.f.clear(),E.f.setGen("gen-2")}}},1358:(U,L,a)=>{a.d(L,{a:()=>V,f:()=>G});var E=a(5625),d=a(7934),r=a(5322),P=a(7936),M=a(3349),f=a(1691),T=a(1610);const N=(t,c)=>f.Z.lang.round(T.Z.parse(t)[c]);var i=a(1117);const w={},g=function(t){const c=Object.keys(t);for(const S of c)w[S]=t[S]},O=function(t,c,S,p,b,y){const k=p.select(`[id="${S}"]`);Object.keys(t).forEach(function(h){const l=t[h];let m="default";l.classes.length>0&&(m=l.classes.join(" ")),m=m+" flowchart-label";const v=(0,r.k)(l.styles);let e=l.text!==void 0?l.text:l.id,n;if(r.l.info("vertex",l,l.labelType),l.labelType==="markdown")r.l.info("vertex",l,l.labelType);else if((0,r.m)((0,r.c)().flowchart.htmlLabels)){const A={label:e.replace(/fa[blrs]?:fa-[\w-]+/g,C=>`<i class='${C.replace(":"," ")}'></i>`)};n=(0,M.a)(k,A).node(),n.parentNode.removeChild(n)}else{const A=b.createElementNS("http://www.w3.org/2000/svg","text");A.setAttribute("style",v.labelStyle.replace("color:","fill:"));const C=e.split(r.e.lineBreakRegex);for(const R of C){const B=b.createElementNS("http://www.w3.org/2000/svg","tspan");B.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),B.setAttribute("dy","1em"),B.setAttribute("x","1"),B.textContent=R,A.appendChild(B)}n=A}let u=0,o="";switch(l.type){case"round":u=5,o="rect";break;case"square":o="rect";break;case"diamond":o="question";break;case"hexagon":o="hexagon";break;case"odd":o="rect_left_inv_arrow";break;case"lean_right":o="lean_right";break;case"lean_left":o="lean_left";break;case"trapezoid":o="trapezoid";break;case"inv_trapezoid":o="inv_trapezoid";break;case"odd_right":o="rect_left_inv_arrow";break;case"circle":o="circle";break;case"ellipse":o="ellipse";break;case"stadium":o="stadium";break;case"subroutine":o="subroutine";break;case"cylinder":o="cylinder";break;case"group":o="rect";break;case"doublecircle":o="doublecircle";break;default:o="rect"}c.setNode(l.id,{labelStyle:v.labelStyle,shape:o,labelText:e,labelType:l.labelType,rx:u,ry:u,class:m,style:v.style,id:l.id,link:l.link,linkTarget:l.linkTarget,tooltip:y.db.getTooltip(l.id)||"",domId:y.db.lookUpDomId(l.id),haveCallback:l.haveCallback,width:l.type==="group"?500:void 0,dir:l.dir,type:l.type,props:l.props,padding:(0,r.c)().flowchart.padding}),r.l.info("setNode",{labelStyle:v.labelStyle,labelType:l.labelType,shape:o,labelText:e,rx:u,ry:u,class:m,style:v.style,id:l.id,domId:y.db.lookUpDomId(l.id),width:l.type==="group"?500:void 0,type:l.type,dir:l.dir,props:l.props,padding:(0,r.c)().flowchart.padding})})},W=function(t,c,S){r.l.info("abc78 edges = ",t);let p=0,b={},y,k;if(t.defaultStyle!==void 0){const s=(0,r.k)(t.defaultStyle);y=s.style,k=s.labelStyle}t.forEach(function(s){p++;const h="L-"+s.start+"-"+s.end;b[h]===void 0?(b[h]=0,r.l.info("abc78 new entry",h,b[h])):(b[h]++,r.l.info("abc78 new entry",h,b[h]));let l=h+"-"+b[h];r.l.info("abc78 new link id to be used is",h,l,b[h]);const m="LS-"+s.start,v="LE-"+s.end,e={style:"",labelStyle:""};switch(e.minlen=s.length||1,s.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",s.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let n="",u="";switch(s.stroke){case"normal":n="fill:none;",y!==void 0&&(n=y),k!==void 0&&(u=k),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(s.style!==void 0){const o=(0,r.k)(s.style);n=o.style,u=o.labelStyle}e.style=e.style+=n,e.labelStyle=e.labelStyle+=u,s.interpolate!==void 0?e.curve=(0,r.n)(s.interpolate,d.c_6):t.defaultInterpolate!==void 0?e.curve=(0,r.n)(t.defaultInterpolate,d.c_6):e.curve=(0,r.n)(w.curve,d.c_6),s.text===void 0?s.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType=s.labelType,e.label=s.text.replace(r.e.lineBreakRegex,`
`),s.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=l,e.classes="flowchart-link "+m+" "+v,c.setEdge(s.start,s.end,e,p)})},G={setConf:g,addVertices:O,addEdges:W,getClasses:function(t,c){return c.db.getClasses()},draw:async function(t,c,S,p){r.l.info("Drawing flowchart");let b=p.db.getDirection();b===void 0&&(b="TD");const{securityLevel:y,flowchart:k}=(0,r.c)(),s=k.nodeSpacing||50,h=k.rankSpacing||50;let l;y==="sandbox"&&(l=(0,d.Ys)("#i"+c));const m=y==="sandbox"?(0,d.Ys)(l.nodes()[0].contentDocument.body):(0,d.Ys)("body"),v=y==="sandbox"?l.nodes()[0].contentDocument:document,e=new E.k({multigraph:!0,compound:!0}).setGraph({rankdir:b,nodesep:s,ranksep:h,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let n;const u=p.db.getSubGraphs();r.l.info("Subgraphs - ",u);for(let _=u.length-1;_>=0;_--)n=u[_],r.l.info("Subgraph - ",n),p.db.addVertex(n.id,{text:n.title,type:n.labelType},"group",void 0,n.classes,n.dir);const o=p.db.getVertices(),A=p.db.getEdges();r.l.info("Edges",A);let C=0;for(C=u.length-1;C>=0;C--){n=u[C],(0,d.td_)("cluster").append("text");for(let _=0;_<n.nodes.length;_++)r.l.info("Setting up subgraphs",n.nodes[_],n.id),e.setParent(n.nodes[_],n.id)}O(o,e,c,m,v,p),W(A,e);const R=m.select(`[id="${c}"]`),B=m.select("#"+c+" g");if(await(0,P.r)(B,e,["point","circle","cross"],"flowchart",c),r.u.insertTitle(R,"flowchartTitleText",k.titleTopMargin,p.db.getDiagramTitle()),(0,r.o)(e,R,k.diagramPadding,k.useMaxWidth),p.db.indexNodes("subGraph"+C),!k.htmlLabels){const _=v.querySelectorAll('[id="'+c+'"] .edgeLabel .label');for(const D of _){const $=D.getBBox(),x=v.createElementNS("http://www.w3.org/2000/svg","rect");x.setAttribute("rx",0),x.setAttribute("ry",0),x.setAttribute("width",$.width),x.setAttribute("height",$.height),D.insertBefore(x,D.firstChild)}}Object.keys(o).forEach(function(_){const D=o[_];if(D.link){const $=(0,d.Ys)("#"+c+' [id="'+_+'"]');if($){const x=v.createElementNS("http://www.w3.org/2000/svg","a");x.setAttributeNS("http://www.w3.org/2000/svg","class",D.classes.join(" ")),x.setAttributeNS("http://www.w3.org/2000/svg","href",D.link),x.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),y==="sandbox"?x.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):D.linkTarget&&x.setAttributeNS("http://www.w3.org/2000/svg","target",D.linkTarget);const K=$.insert(function(){return x},":first-child"),j=$.select(".label-container");j&&K.append(function(){return j.node()});const z=$.select(".label");z&&K.append(function(){return z.node()})}}})}},Z=(t,c)=>{const S=N,p=S(t,"r"),b=S(t,"g"),y=S(t,"b");return i.Z(p,b,y,c)},V=t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span,p {
    color: ${t.titleColor};
  }

  .label text,span,p {
    fill: ${t.nodeTextColor||t.textColor};
    color: ${t.nodeTextColor||t.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${Z(t.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span,p {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
`}}]);
