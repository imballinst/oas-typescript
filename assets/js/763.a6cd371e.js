"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[763],{3349:(mt,lt,p)=>{p.d(lt,{a:()=>z});var tt=p(6225);function z(c,S){var N=c.append("foreignObject").attr("width","100000"),B=N.append("xhtml:div");B.attr("xmlns","http://www.w3.org/1999/xhtml");var J=S.label;switch(typeof J){case"function":B.insert(J);break;case"object":B.insert(function(){return J});break;default:B.html(J)}tt.bg(B,S.labelStyle),B.style("display","inline-block"),B.style("white-space","nowrap");var ot=B.node().getBoundingClientRect();return N.attr("width",ot.width).attr("height",ot.height),N}},6225:(mt,lt,p)=>{p.d(lt,{$p:()=>ot,O1:()=>S,WR:()=>x,bF:()=>c,bg:()=>J});var tt=p(7514),z=p(3234);function c(A,V){return!!A.children(V).length}function S(A){return B(A.v)+":"+B(A.w)+":"+B(A.name)}var N=/:/g;function B(A){return A?String(A).replace(N,"\\:"):""}function J(A,V){V&&A.attr("style",V)}function ot(A,V,st){V&&A.attr("class",V).attr("class",st+" "+A.attr("class"))}function x(A,V){var st=V.graph();if(tt.Z(st)){var it=st.transition;if(z.Z(it))return it(A)}return A}},1763:(mt,lt,p)=>{p.d(lt,{diagram:()=>ne});var tt=p(8955),z=p(5625),c=p(7934),S=p(5322),N=p(7452),B=p(3688),J=p(870),ot=p(1644),x=p(6225),A={normal:st,vee:it,undirected:gt};function V(r){A=r}function st(r,e,t,n){var a=r.append("marker").attr("id",e).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto"),s=a.append("path").attr("d","M 0 0 L 10 5 L 0 10 z").style("stroke-width",1).style("stroke-dasharray","1,0");x.bg(s,t[n+"Style"]),t[n+"Class"]&&s.attr("class",t[n+"Class"])}function it(r,e,t,n){var a=r.append("marker").attr("id",e).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto"),s=a.append("path").attr("d","M 0 0 L 10 5 L 0 10 L 4 5 z").style("stroke-width",1).style("stroke-dasharray","1,0");x.bg(s,t[n+"Style"]),t[n+"Class"]&&s.attr("class",t[n+"Class"])}function gt(r,e,t,n){var a=r.append("marker").attr("id",e).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto"),s=a.append("path").attr("d","M 0 5 L 10 5").style("stroke-width",1).style("stroke-dasharray","1,0");x.bg(s,t[n+"Style"]),t[n+"Class"]&&s.attr("class",t[n+"Class"])}var kt=p(3349);function Nt(r,e){var t=r;return t.node().appendChild(e.label),x.bg(t,e.labelStyle),t}function St(r,e){for(var t=r.append("text"),n=Tt(e.label).split(`
`),a=0;a<n.length;a++)t.append("tspan").attr("xml:space","preserve").attr("dy","1em").attr("x","1").text(n[a]);return x.bg(t,e.labelStyle),t}function Tt(r){for(var e="",t=!1,n,a=0;a<r.length;++a)if(n=r[a],t){switch(n){case"n":e+=`
`;break;default:e+=n}t=!1}else n==="\\"?t=!0:e+=n;return e}function bt(r,e,t){var n=e.label,a=r.append("g");e.labelType==="svg"?Nt(a,e):typeof n!="string"||e.labelType==="html"?(0,kt.a)(a,e):St(a,e);var s=a.node().getBBox(),l;switch(t){case"top":l=-e.height/2;break;case"bottom":l=e.height/2-s.height;break;default:l=-s.height/2}return a.attr("transform","translate("+-s.width/2+","+l+")"),a}var yt=function(r,e){var t=e.nodes().filter(function(s){return x.bF(e,s)}),n=r.selectAll("g.cluster").data(t,function(s){return s});x.WR(n.exit(),e).style("opacity",0).remove();var a=n.enter().append("g").attr("class","cluster").attr("id",function(s){var l=e.node(s);return l.id}).style("opacity",0).each(function(s){var l=e.node(s),o=c.Ys(this);c.Ys(this).append("rect");var d=o.append("g").attr("class","label");bt(d,l,l.clusterLabelPos)});return n=n.merge(a),n=x.WR(n,e).style("opacity",1),n.selectAll("rect").each(function(s){var l=e.node(s),o=c.Ys(this);x.bg(o,l.style)}),n};function u(r){yt=r}let L=function(r,e){var t=r.selectAll("g.edgeLabel").data(e.edges(),function(a){return x.O1(a)}).classed("update",!0);t.exit().remove(),t.enter().append("g").classed("edgeLabel",!0).style("opacity",0),t=r.selectAll("g.edgeLabel"),t.each(function(a){var s=c.Ys(this);s.select(".label").remove();var l=e.edge(a),o=bt(s,e.edge(a),0).classed("label",!0),d=o.node().getBBox();l.labelId&&o.attr("id",l.labelId),N.Z(l,"width")||(l.width=d.width),N.Z(l,"height")||(l.height=d.height)});var n;return t.exit?n=t.exit():n=t.selectAll(null),x.WR(n,e).style("opacity",0).remove(),t};function Q(r){L=r}var M=p(6749),R=p(4379);function P(r,e){return r.intersect(e)}var U=function(r,e,t){var n=r.selectAll("g.edgePath").data(e.edges(),function(l){return x.O1(l)}).classed("update",!0),a=h(n,e);T(n,e);var s=n.merge!==void 0?n.merge(a):n;return x.WR(s,e).style("opacity",1),s.each(function(l){var o=c.Ys(this),d=e.edge(l);d.elem=this,d.id&&o.attr("id",d.id),x.$p(o,d.class,(o.classed("update")?"update ":"")+"edgePath")}),s.selectAll("path.path").each(function(l){var o=e.edge(l);o.arrowheadId=M.Z("arrowhead");var d=c.Ys(this).attr("marker-end",function(){return"url("+Y(location.href,o.arrowheadId)+")"}).style("fill","none");x.WR(d,e).attr("d",function(y){return f(e,y)}),x.bg(d,o.style)}),s.selectAll("defs *").remove(),s.selectAll("defs").each(function(l){var o=e.edge(l),d=t[o.arrowhead];d(c.Ys(this),o.arrowheadId,o,"arrowhead")}),s};function k(r){U=r}function Y(r,e){var t=r.split("#")[0];return t+"#"+e}function f(r,e){var t=r.edge(e),n=r.node(e.v),a=r.node(e.w),s=t.points.slice(1,t.points.length-1);return s.unshift(P(n,s[0])),s.push(P(a,s[s.length-1])),X(t,s)}function X(r,e){var t=(c.jvg||c.YPS.line)().x(function(n){return n.x}).y(function(n){return n.y});return(t.curve||t.interpolate)(r.curve),t(e)}function F(r){var e=r.getBBox(),t=r.ownerSVGElement.getScreenCTM().inverse().multiply(r.getScreenCTM()).translate(e.width/2,e.height/2);return{x:t.e,y:t.f}}function h(r,e){var t=r.enter().append("g").attr("class","edgePath").style("opacity",0);return t.append("path").attr("class","path").attr("d",function(n){var a=e.edge(n),s=e.node(n.v).elem,l=R.Z(a.points.length).map(function(){return F(s)});return X(a,l)}),t.append("defs"),t}function T(r,e){var t=r.exit();x.WR(t,e).style("opacity",0).remove()}var W=p(1666),w=function(r,e,t){var n=e.nodes().filter(function(l){return!x.bF(e,l)}),a=r.selectAll("g.node").data(n,function(l){return l}).classed("update",!0);a.exit().remove(),a.enter().append("g").attr("class","node").style("opacity",0),a=r.selectAll("g.node"),a.each(function(l){var o=e.node(l),d=c.Ys(this);x.$p(d,o.class,(d.classed("update")?"update ":"")+"node"),d.select("g.label").remove();var y=d.append("g").attr("class","label"),i=bt(y,o),E=t[o.shape],v=W.Z(i.node().getBBox(),"width","height");o.elem=this,o.id&&d.attr("id",o.id),o.labelId&&y.attr("id",o.labelId),N.Z(o,"width")&&(v.width=o.width),N.Z(o,"height")&&(v.height=o.height),v.width+=o.paddingLeft+o.paddingRight,v.height+=o.paddingTop+o.paddingBottom,y.attr("transform","translate("+(o.paddingLeft-o.paddingRight)/2+","+(o.paddingTop-o.paddingBottom)/2+")");var g=c.Ys(this);g.select(".label-container").remove();var m=E(g,v,o).classed("label-container",!0);x.bg(m,o.style);var D=m.node().getBBox();o.width=D.width,o.height=D.height});var s;return a.exit?s=a.exit():s=a.selectAll(null),x.WR(s,e).style("opacity",0).remove(),a};function et(r){w=r}function O(r,e){var t=r.filter(function(){return!c.Ys(this).classed("update")});function n(a){var s=e.node(a);return"translate("+s.x+","+s.y+")"}t.attr("transform",n),x.WR(r,e).style("opacity",1).attr("transform",n),x.WR(t.selectAll("rect"),e).attr("width",function(a){return e.node(a).width}).attr("height",function(a){return e.node(a).height}).attr("x",function(a){var s=e.node(a);return-s.width/2}).attr("y",function(a){var s=e.node(a);return-s.height/2})}function dt(r,e){var t=r.filter(function(){return!c.Ys(this).classed("update")});function n(a){var s=e.edge(a);return N.Z(s,"x")?"translate("+s.x+","+s.y+")":""}t.attr("transform",n),x.WR(r,e).style("opacity",1).attr("transform",n)}function at(r,e){var t=r.filter(function(){return!c.Ys(this).classed("update")});function n(a){var s=e.node(a);return"translate("+s.x+","+s.y+")"}t.attr("transform",n),x.WR(r,e).style("opacity",1).attr("transform",n)}function Et(r,e,t,n){var a=r.x,s=r.y,l=a-n.x,o=s-n.y,d=Math.sqrt(e*e*o*o+t*t*l*l),y=Math.abs(e*t*l/d);n.x<a&&(y=-y);var i=Math.abs(e*t*o/d);return n.y<s&&(i=-i),{x:a+y,y:s+i}}function _(r,e,t){return Et(r,e,e,t)}function j(r,e,t,n){var a,s,l,o,d,y,i,E,v,g,m,D,b,I,H;if(a=e.y-r.y,l=r.x-e.x,d=e.x*r.y-r.x*e.y,v=a*t.x+l*t.y+d,g=a*n.x+l*n.y+d,!(v!==0&&g!==0&&rt(v,g))&&(s=n.y-t.y,o=t.x-n.x,y=n.x*t.y-t.x*n.y,i=s*r.x+o*r.y+y,E=s*e.x+o*e.y+y,!(i!==0&&E!==0&&rt(i,E))&&(m=a*o-s*l,m!==0)))return D=Math.abs(m/2),b=l*y-o*d,I=b<0?(b-D)/m:(b+D)/m,b=s*d-a*y,H=b<0?(b-D)/m:(b+D)/m,{x:I,y:H}}function rt(r,e){return r*e>0}function C(r,e,t){var n=r.x,a=r.y,s=[],l=Number.POSITIVE_INFINITY,o=Number.POSITIVE_INFINITY;e.forEach(function(m){l=Math.min(l,m.x),o=Math.min(o,m.y)});for(var d=n-r.width/2-l,y=a-r.height/2-o,i=0;i<e.length;i++){var E=e[i],v=e[i<e.length-1?i+1:0],g=j(r,t,{x:d+E.x,y:y+E.y},{x:d+v.x,y:y+v.y});g&&s.push(g)}return s.length?(s.length>1&&s.sort(function(m,D){var b=m.x-t.x,I=m.y-t.y,H=Math.sqrt(b*b+I*I),ft=D.x-t.x,q=D.y-t.y,Lt=Math.sqrt(ft*ft+q*q);return H<Lt?-1:H===Lt?0:1}),s[0]):(console.log("NO INTERSECTION FOUND, RETURN NODE CENTER",r),r)}function ht(r,e){var t=r.x,n=r.y,a=e.x-t,s=e.y-n,l=r.width/2,o=r.height/2,d,y;return Math.abs(s)*l>Math.abs(a)*o?(s<0&&(o=-o),d=s===0?0:o*a/s,y=o):(a<0&&(l=-l),d=l,y=a===0?0:l*s/a),{x:t+d,y:n+y}}var ut={rect:Vt,ellipse:Xt,circle:Ft,diamond:Ht};function wt(r){ut=r}function Vt(r,e,t){var n=r.insert("rect",":first-child").attr("rx",t.rx).attr("ry",t.ry).attr("x",-e.width/2).attr("y",-e.height/2).attr("width",e.width).attr("height",e.height);return t.intersect=function(a){return ht(t,a)},n}function Xt(r,e,t){var n=e.width/2,a=e.height/2,s=r.insert("ellipse",":first-child").attr("x",-e.width/2).attr("y",-e.height/2).attr("rx",n).attr("ry",a);return t.intersect=function(l){return Et(t,n,a,l)},s}function Ft(r,e,t){var n=Math.max(e.width,e.height)/2,a=r.insert("circle",":first-child").attr("x",-e.width/2).attr("y",-e.height/2).attr("r",n);return t.intersect=function(s){return _(t,n,s)},a}function Ht(r,e,t){var n=e.width*Math.SQRT2/2,a=e.height*Math.SQRT2/2,s=[{x:0,y:-a},{x:-n,y:0},{x:0,y:a},{x:n,y:0}],l=r.insert("polygon",":first-child").attr("points",s.map(function(o){return o.x+","+o.y}).join(" "));return t.intersect=function(o){return C(t,s,o)},l}function Kt(){var r=function(e,t){Ot(t);var n=vt(e,"output"),a=vt(n,"clusters"),s=vt(n,"edgePaths"),l=L(vt(n,"edgeLabels"),t),o=w(vt(n,"nodes"),t,ut);(0,ot.bK)(t),at(o,t),dt(l,t),U(s,t,A);var d=yt(a,t);O(d,t),jt(t)};return r.createNodes=function(e){return arguments.length?(et(e),r):w},r.createClusters=function(e){return arguments.length?(u(e),r):yt},r.createEdgeLabels=function(e){return arguments.length?(Q(e),r):L},r.createEdgePaths=function(e){return arguments.length?(k(e),r):U},r.shapes=function(e){return arguments.length?(wt(e),r):ut},r.arrows=function(e){return arguments.length?(V(e),r):A},r}var Qt={paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10,rx:0,ry:0,shape:"rect"},Jt={arrowhead:"normal",curve:c.c_6};function Ot(r){r.nodes().forEach(function(e){var t=r.node(e);!N.Z(t,"label")&&!r.children(e).length&&(t.label=e),N.Z(t,"paddingX")&&B.Z(t,{paddingLeft:t.paddingX,paddingRight:t.paddingX}),N.Z(t,"paddingY")&&B.Z(t,{paddingTop:t.paddingY,paddingBottom:t.paddingY}),N.Z(t,"padding")&&B.Z(t,{paddingLeft:t.padding,paddingRight:t.padding,paddingTop:t.padding,paddingBottom:t.padding}),B.Z(t,Qt),J.Z(["paddingLeft","paddingRight","paddingTop","paddingBottom"],function(n){t[n]=Number(t[n])}),N.Z(t,"width")&&(t._prevWidth=t.width),N.Z(t,"height")&&(t._prevHeight=t.height)}),r.edges().forEach(function(e){var t=r.edge(e);N.Z(t,"label")||(t.label=""),B.Z(t,Jt)})}function jt(r){J.Z(r.nodes(),function(e){var t=r.node(e);N.Z(t,"_prevWidth")?t.width=t._prevWidth:delete t.width,N.Z(t,"_prevHeight")?t.height=t._prevHeight:delete t.height,delete t._prevWidth,delete t._prevHeight})}function vt(r,e){var t=r.select("g."+e);return t.empty()&&(t=r.append("g").attr("class",e)),t}var At=p(1358),se=p(7484),le=p(7967),oe=p(7856),ie=p(9354);function It(r,e,t){const n=e.width,a=e.height,s=(n+a)*.9,l=[{x:s/2,y:0},{x:s,y:-s/2},{x:s/2,y:-s},{x:0,y:-s/2}],o=nt(r,s,s,l);return t.intersect=function(d){return C(t,l,d)},o}function Bt(r,e,t){const a=e.height,s=a/4,l=e.width+2*s,o=[{x:s,y:0},{x:l-s,y:0},{x:l,y:-a/2},{x:l-s,y:-a},{x:s,y:-a},{x:0,y:-a/2}],d=nt(r,l,a,o);return t.intersect=function(y){return C(t,o,y)},d}function Dt(r,e,t){const n=e.width,a=e.height,s=[{x:-a/2,y:0},{x:n,y:0},{x:n,y:-a},{x:-a/2,y:-a},{x:0,y:-a/2}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function $t(r,e,t){const n=e.width,a=e.height,s=[{x:-2*a/6,y:0},{x:n-a/6,y:0},{x:n+2*a/6,y:-a},{x:a/6,y:-a}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function Rt(r,e,t){const n=e.width,a=e.height,s=[{x:2*a/6,y:0},{x:n+a/6,y:0},{x:n-2*a/6,y:-a},{x:-a/6,y:-a}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function Mt(r,e,t){const n=e.width,a=e.height,s=[{x:-2*a/6,y:0},{x:n+2*a/6,y:0},{x:n-a/6,y:-a},{x:a/6,y:-a}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function Pt(r,e,t){const n=e.width,a=e.height,s=[{x:a/6,y:0},{x:n-a/6,y:0},{x:n+2*a/6,y:-a},{x:-2*a/6,y:-a}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function Yt(r,e,t){const n=e.width,a=e.height,s=[{x:0,y:0},{x:n+a/2,y:0},{x:n,y:-a/2},{x:n+a/2,y:-a},{x:0,y:-a}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function Wt(r,e,t){const n=e.height,a=e.width+n/4,s=r.insert("rect",":first-child").attr("rx",n/2).attr("ry",n/2).attr("x",-a/2).attr("y",-n/2).attr("width",a).attr("height",n);return t.intersect=function(l){return ht(t,l)},s}function Zt(r,e,t){const n=e.width,a=e.height,s=[{x:0,y:0},{x:n,y:0},{x:n,y:-a},{x:0,y:-a},{x:0,y:0},{x:-8,y:0},{x:n+8,y:0},{x:n+8,y:-a},{x:-8,y:-a},{x:-8,y:0}],l=nt(r,n,a,s);return t.intersect=function(o){return C(t,s,o)},l}function Ut(r,e,t){const n=e.width,a=n/2,s=a/(2.5+n/50),l=e.height+s,o="M 0,"+s+" a "+a+","+s+" 0,0,0 "+n+" 0 a "+a+","+s+" 0,0,0 "+-n+" 0 l 0,"+l+" a "+a+","+s+" 0,0,0 "+n+" 0 l 0,"+-l,d=r.attr("label-offset-y",s).insert("path",":first-child").attr("d",o).attr("transform","translate("+-n/2+","+-(l/2+s)+")");return t.intersect=function(y){const i=ht(t,y),E=i.x-t.x;if(a!=0&&(Math.abs(E)<t.width/2||Math.abs(E)==t.width/2&&Math.abs(i.y-t.y)>t.height/2-s)){let v=s*s*(1-E*E/(a*a));v!=0&&(v=Math.sqrt(v)),v=s-v,y.y-t.y>0&&(v=-v),i.y+=v}return i},d}function qt(r){r.shapes().question=It,r.shapes().hexagon=Bt,r.shapes().stadium=Wt,r.shapes().subroutine=Zt,r.shapes().cylinder=Ut,r.shapes().rect_left_inv_arrow=Dt,r.shapes().lean_right=$t,r.shapes().lean_left=Rt,r.shapes().trapezoid=Mt,r.shapes().inv_trapezoid=Pt,r.shapes().rect_right_inv_arrow=Yt}function te(r){r({question:It}),r({hexagon:Bt}),r({stadium:Wt}),r({subroutine:Zt}),r({cylinder:Ut}),r({rect_left_inv_arrow:Dt}),r({lean_right:$t}),r({lean_left:Rt}),r({trapezoid:Mt}),r({inv_trapezoid:Pt}),r({rect_right_inv_arrow:Yt})}function nt(r,e,t,n){return r.insert("polygon",":first-child").attr("points",n.map(function(a){return a.x+","+a.y}).join(" ")).attr("transform","translate("+-e/2+","+t/2+")")}const ee={addToRender:qt,addToRenderV2:te},Gt={},re=function(r){const e=Object.keys(r);for(const t of e)Gt[t]=r[t]},_t=function(r,e,t,n,a,s){const l=n?n.select(`[id="${t}"]`):(0,c.Ys)(`[id="${t}"]`),o=a||document;Object.keys(r).forEach(function(y){const i=r[y];let E="default";i.classes.length>0&&(E=i.classes.join(" "));const v=(0,S.k)(i.styles);let g=i.text!==void 0?i.text:i.id,m;if((0,S.m)((0,S.c)().flowchart.htmlLabels)){const I={label:g.replace(/fa[blrs]?:fa-[\w-]+/g,H=>`<i class='${H.replace(":"," ")}'></i>`)};m=(0,kt.a)(l,I).node(),m.parentNode.removeChild(m)}else{const I=o.createElementNS("http://www.w3.org/2000/svg","text");I.setAttribute("style",v.labelStyle.replace("color:","fill:"));const H=g.split(S.e.lineBreakRegex);for(const ft of H){const q=o.createElementNS("http://www.w3.org/2000/svg","tspan");q.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),q.setAttribute("dy","1em"),q.setAttribute("x","1"),q.textContent=ft,I.appendChild(q)}m=I}let D=0,b="";switch(i.type){case"round":D=5,b="rect";break;case"square":b="rect";break;case"diamond":b="question";break;case"hexagon":b="hexagon";break;case"odd":b="rect_left_inv_arrow";break;case"lean_right":b="lean_right";break;case"lean_left":b="lean_left";break;case"trapezoid":b="trapezoid";break;case"inv_trapezoid":b="inv_trapezoid";break;case"odd_right":b="rect_left_inv_arrow";break;case"circle":b="circle";break;case"ellipse":b="ellipse";break;case"stadium":b="stadium";break;case"subroutine":b="subroutine";break;case"cylinder":b="cylinder";break;case"group":b="rect";break;default:b="rect"}S.l.warn("Adding node",i.id,i.domId),e.setNode(s.db.lookUpDomId(i.id),{labelType:"svg",labelStyle:v.labelStyle,shape:b,label:m,rx:D,ry:D,class:E,style:v.style,id:s.db.lookUpDomId(i.id)})})},zt=function(r,e,t){let n=0,a,s;if(r.defaultStyle!==void 0){const l=(0,S.k)(r.defaultStyle);a=l.style,s=l.labelStyle}r.forEach(function(l){n++;const o="L-"+l.start+"-"+l.end,d="LS-"+l.start,y="LE-"+l.end,i={};l.type==="arrow_open"?i.arrowhead="none":i.arrowhead="normal";let E="",v="";if(l.style!==void 0){const g=(0,S.k)(l.style);E=g.style,v=g.labelStyle}else switch(l.stroke){case"normal":E="fill:none",a!==void 0&&(E=a),s!==void 0&&(v=s);break;case"dotted":E="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":E=" stroke-width: 3.5px;fill:none";break}i.style=E,i.labelStyle=v,l.interpolate!==void 0?i.curve=(0,S.n)(l.interpolate,c.c_6):r.defaultInterpolate!==void 0?i.curve=(0,S.n)(r.defaultInterpolate,c.c_6):i.curve=(0,S.n)(Gt.curve,c.c_6),l.text===void 0?l.style!==void 0&&(i.arrowheadStyle="fill: #333"):(i.arrowheadStyle="fill: #333",i.labelpos="c",(0,S.m)((0,S.c)().flowchart.htmlLabels)?(i.labelType="html",i.label=`<span id="L-${o}" class="edgeLabel L-${d}' L-${y}" style="${i.labelStyle}">${l.text.replace(/fa[blrs]?:fa-[\w-]+/g,g=>`<i class='${g.replace(":"," ")}'></i>`)}</span>`):(i.labelType="text",i.label=l.text.replace(S.e.lineBreakRegex,`
`),l.style===void 0&&(i.style=i.style||"stroke: #333; stroke-width: 1.5px;fill:none"),i.labelStyle=i.labelStyle.replace("color:","fill:"))),i.id=o,i.class=d+" "+y,i.minlen=l.length||1,e.setEdge(t.db.lookUpDomId(l.start),t.db.lookUpDomId(l.end),i,n)})},ae={setConf:re,addVertices:_t,addEdges:zt,getClasses:function(r,e){return S.l.info("Extracting classes"),e.db.getClasses()},draw:function(r,e,t,n){S.l.info("Drawing flowchart");const{securityLevel:a,flowchart:s}=(0,S.c)();let l;a==="sandbox"&&(l=(0,c.Ys)("#i"+e));const o=a==="sandbox"?(0,c.Ys)(l.nodes()[0].contentDocument.body):(0,c.Ys)("body"),d=a==="sandbox"?l.nodes()[0].contentDocument:document;let y=n.db.getDirection();y===void 0&&(y="TD");const i=s.nodeSpacing||50,E=s.rankSpacing||50,v=new z.k({multigraph:!0,compound:!0}).setGraph({rankdir:y,nodesep:i,ranksep:E,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});let g;const m=n.db.getSubGraphs();for(let $=m.length-1;$>=0;$--)g=m[$],n.db.addVertex(g.id,g.title,"group",void 0,g.classes);const D=n.db.getVertices();S.l.warn("Get vertices",D);const b=n.db.getEdges();let I=0;for(I=m.length-1;I>=0;I--){g=m[I],(0,c.td_)("cluster").append("text");for(let $=0;$<g.nodes.length;$++)S.l.warn("Setting subgraph",g.nodes[$],n.db.lookUpDomId(g.nodes[$]),n.db.lookUpDomId(g.id)),v.setParent(n.db.lookUpDomId(g.nodes[$]),n.db.lookUpDomId(g.id))}_t(D,v,e,o,d,n),zt(b,v,n);const H=new Kt;ee.addToRender(H),H.arrows().none=function(G,K,Z,pt){const ct=G.append("marker").attr("id",K).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto").append("path").attr("d","M 0 0 L 0 0 L 0 0 z");(0,x.bg)(ct,Z[pt+"Style"])},H.arrows().normal=function(G,K){G.append("marker").attr("id",K).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","arrowheadPath").style("stroke-width",1).style("stroke-dasharray","1,0")};const ft=o.select(`[id="${e}"]`),q=o.select("#"+e+" g");for(H(q,v),q.selectAll("g.node").attr("title",function(){return n.db.getTooltip(this.id)}),n.db.indexNodes("subGraph"+I),I=0;I<m.length;I++)if(g=m[I],g.title!=="undefined"){const $=d.querySelectorAll("#"+e+' [id="'+n.db.lookUpDomId(g.id)+'"] rect'),G=d.querySelectorAll("#"+e+' [id="'+n.db.lookUpDomId(g.id)+'"]'),K=$[0].x.baseVal.value,Z=$[0].y.baseVal.value,pt=$[0].width.baseVal.value,ct=(0,c.Ys)(G[0]).select(".label");ct.attr("transform",`translate(${K+pt/2}, ${Z+14})`),ct.attr("id",e+"Text");for(let Ct=0;Ct<g.classes.length;Ct++)G[0].classList.add(g.classes[Ct])}if(!s.htmlLabels){const $=d.querySelectorAll('[id="'+e+'"] .edgeLabel .label');for(const G of $){const K=G.getBBox(),Z=d.createElementNS("http://www.w3.org/2000/svg","rect");Z.setAttribute("rx",0),Z.setAttribute("ry",0),Z.setAttribute("width",K.width),Z.setAttribute("height",K.height),G.insertBefore(Z,G.firstChild)}}(0,S.o)(v,ft,s.diagramPadding,s.useMaxWidth),Object.keys(D).forEach(function($){const G=D[$];if(G.link){const K=o.select("#"+e+' [id="'+n.db.lookUpDomId($)+'"]');if(K){const Z=d.createElementNS("http://www.w3.org/2000/svg","a");Z.setAttributeNS("http://www.w3.org/2000/svg","class",G.classes.join(" ")),Z.setAttributeNS("http://www.w3.org/2000/svg","href",G.link),Z.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),a==="sandbox"?Z.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):G.linkTarget&&Z.setAttributeNS("http://www.w3.org/2000/svg","target",G.linkTarget);const pt=K.insert(function(){return Z},":first-child"),xt=K.select(".label-container");xt&&pt.append(function(){return xt.node()});const ct=K.select(".label");ct&&pt.append(function(){return ct.node()})}}})}},ne={parser:tt.p,db:tt.f,renderer:At.f,styles:At.a,init:r=>{r.flowchart||(r.flowchart={}),r.flowchart.arrowMarkerAbsolute=r.arrowMarkerAbsolute,ae.setConf(r.flowchart),tt.f.clear(),tt.f.setGen("gen-1")}}},1358:(mt,lt,p)=>{p.d(lt,{a:()=>yt,f:()=>St});var tt=p(5625),z=p(7934),c=p(5322),S=p(7936),N=p(3349),B=p(1691),J=p(1610);const x=(u,L)=>B.Z.lang.round(J.Z.parse(u)[L]);var A=p(1117);const V={},st=function(u){const L=Object.keys(u);for(const Q of L)V[Q]=u[Q]},it=function(u,L,Q,M,R,P){const U=M.select(`[id="${Q}"]`);Object.keys(u).forEach(function(Y){const f=u[Y];let X="default";f.classes.length>0&&(X=f.classes.join(" ")),X=X+" flowchart-label";const F=(0,c.k)(f.styles);let h=f.text!==void 0?f.text:f.id,T;if(c.l.info("vertex",f,f.labelType),f.labelType==="markdown")c.l.info("vertex",f,f.labelType);else if((0,c.m)((0,c.c)().flowchart.htmlLabels)){const et={label:h.replace(/fa[blrs]?:fa-[\w-]+/g,O=>`<i class='${O.replace(":"," ")}'></i>`)};T=(0,N.a)(U,et).node(),T.parentNode.removeChild(T)}else{const et=R.createElementNS("http://www.w3.org/2000/svg","text");et.setAttribute("style",F.labelStyle.replace("color:","fill:"));const O=h.split(c.e.lineBreakRegex);for(const dt of O){const at=R.createElementNS("http://www.w3.org/2000/svg","tspan");at.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),at.setAttribute("dy","1em"),at.setAttribute("x","1"),at.textContent=dt,et.appendChild(at)}T=et}let W=0,w="";switch(f.type){case"round":W=5,w="rect";break;case"square":w="rect";break;case"diamond":w="question";break;case"hexagon":w="hexagon";break;case"odd":w="rect_left_inv_arrow";break;case"lean_right":w="lean_right";break;case"lean_left":w="lean_left";break;case"trapezoid":w="trapezoid";break;case"inv_trapezoid":w="inv_trapezoid";break;case"odd_right":w="rect_left_inv_arrow";break;case"circle":w="circle";break;case"ellipse":w="ellipse";break;case"stadium":w="stadium";break;case"subroutine":w="subroutine";break;case"cylinder":w="cylinder";break;case"group":w="rect";break;case"doublecircle":w="doublecircle";break;default:w="rect"}L.setNode(f.id,{labelStyle:F.labelStyle,shape:w,labelText:h,labelType:f.labelType,rx:W,ry:W,class:X,style:F.style,id:f.id,link:f.link,linkTarget:f.linkTarget,tooltip:P.db.getTooltip(f.id)||"",domId:P.db.lookUpDomId(f.id),haveCallback:f.haveCallback,width:f.type==="group"?500:void 0,dir:f.dir,type:f.type,props:f.props,padding:(0,c.c)().flowchart.padding}),c.l.info("setNode",{labelStyle:F.labelStyle,labelType:f.labelType,shape:w,labelText:h,rx:W,ry:W,class:X,style:F.style,id:f.id,domId:P.db.lookUpDomId(f.id),width:f.type==="group"?500:void 0,type:f.type,dir:f.dir,props:f.props,padding:(0,c.c)().flowchart.padding})})},gt=function(u,L,Q){c.l.info("abc78 edges = ",u);let M=0,R={},P,U;if(u.defaultStyle!==void 0){const k=(0,c.k)(u.defaultStyle);P=k.style,U=k.labelStyle}u.forEach(function(k){M++;const Y="L-"+k.start+"-"+k.end;R[Y]===void 0?(R[Y]=0,c.l.info("abc78 new entry",Y,R[Y])):(R[Y]++,c.l.info("abc78 new entry",Y,R[Y]));let f=Y+"-"+R[Y];c.l.info("abc78 new link id to be used is",Y,f,R[Y]);const X="LS-"+k.start,F="LE-"+k.end,h={style:"",labelStyle:""};switch(h.minlen=k.length||1,k.type==="arrow_open"?h.arrowhead="none":h.arrowhead="normal",h.arrowTypeStart="arrow_open",h.arrowTypeEnd="arrow_open",k.type){case"double_arrow_cross":h.arrowTypeStart="arrow_cross";case"arrow_cross":h.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":h.arrowTypeStart="arrow_point";case"arrow_point":h.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":h.arrowTypeStart="arrow_circle";case"arrow_circle":h.arrowTypeEnd="arrow_circle";break}let T="",W="";switch(k.stroke){case"normal":T="fill:none;",P!==void 0&&(T=P),U!==void 0&&(W=U),h.thickness="normal",h.pattern="solid";break;case"dotted":h.thickness="normal",h.pattern="dotted",h.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":h.thickness="thick",h.pattern="solid",h.style="stroke-width: 3.5px;fill:none;";break;case"invisible":h.thickness="invisible",h.pattern="solid",h.style="stroke-width: 0;fill:none;";break}if(k.style!==void 0){const w=(0,c.k)(k.style);T=w.style,W=w.labelStyle}h.style=h.style+=T,h.labelStyle=h.labelStyle+=W,k.interpolate!==void 0?h.curve=(0,c.n)(k.interpolate,z.c_6):u.defaultInterpolate!==void 0?h.curve=(0,c.n)(u.defaultInterpolate,z.c_6):h.curve=(0,c.n)(V.curve,z.c_6),k.text===void 0?k.style!==void 0&&(h.arrowheadStyle="fill: #333"):(h.arrowheadStyle="fill: #333",h.labelpos="c"),h.labelType=k.labelType,h.label=k.text.replace(c.e.lineBreakRegex,`
`),k.style===void 0&&(h.style=h.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),h.labelStyle=h.labelStyle.replace("color:","fill:"),h.id=f,h.classes="flowchart-link "+X+" "+F,L.setEdge(k.start,k.end,h,M)})},St={setConf:st,addVertices:it,addEdges:gt,getClasses:function(u,L){return L.db.getClasses()},draw:async function(u,L,Q,M){c.l.info("Drawing flowchart");let R=M.db.getDirection();R===void 0&&(R="TD");const{securityLevel:P,flowchart:U}=(0,c.c)(),k=U.nodeSpacing||50,Y=U.rankSpacing||50;let f;P==="sandbox"&&(f=(0,z.Ys)("#i"+L));const X=P==="sandbox"?(0,z.Ys)(f.nodes()[0].contentDocument.body):(0,z.Ys)("body"),F=P==="sandbox"?f.nodes()[0].contentDocument:document,h=new tt.k({multigraph:!0,compound:!0}).setGraph({rankdir:R,nodesep:k,ranksep:Y,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let T;const W=M.db.getSubGraphs();c.l.info("Subgraphs - ",W);for(let _=W.length-1;_>=0;_--)T=W[_],c.l.info("Subgraph - ",T),M.db.addVertex(T.id,{text:T.title,type:T.labelType},"group",void 0,T.classes,T.dir);const w=M.db.getVertices(),et=M.db.getEdges();c.l.info("Edges",et);let O=0;for(O=W.length-1;O>=0;O--){T=W[O],(0,z.td_)("cluster").append("text");for(let _=0;_<T.nodes.length;_++)c.l.info("Setting up subgraphs",T.nodes[_],T.id),h.setParent(T.nodes[_],T.id)}it(w,h,L,X,F,M),gt(et,h);const dt=X.select(`[id="${L}"]`),at=X.select("#"+L+" g");if(await(0,S.r)(at,h,["point","circle","cross"],"flowchart",L),c.u.insertTitle(dt,"flowchartTitleText",U.titleTopMargin,M.db.getDiagramTitle()),(0,c.o)(h,dt,U.diagramPadding,U.useMaxWidth),M.db.indexNodes("subGraph"+O),!U.htmlLabels){const _=F.querySelectorAll('[id="'+L+'"] .edgeLabel .label');for(const j of _){const rt=j.getBBox(),C=F.createElementNS("http://www.w3.org/2000/svg","rect");C.setAttribute("rx",0),C.setAttribute("ry",0),C.setAttribute("width",rt.width),C.setAttribute("height",rt.height),j.insertBefore(C,j.firstChild)}}Object.keys(w).forEach(function(_){const j=w[_];if(j.link){const rt=(0,z.Ys)("#"+L+' [id="'+_+'"]');if(rt){const C=F.createElementNS("http://www.w3.org/2000/svg","a");C.setAttributeNS("http://www.w3.org/2000/svg","class",j.classes.join(" ")),C.setAttributeNS("http://www.w3.org/2000/svg","href",j.link),C.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),P==="sandbox"?C.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):j.linkTarget&&C.setAttributeNS("http://www.w3.org/2000/svg","target",j.linkTarget);const ht=rt.insert(function(){return C},":first-child"),ut=rt.select(".label-container");ut&&ht.append(function(){return ut.node()});const wt=rt.select(".label");wt&&ht.append(function(){return wt.node()})}}})}},Tt=(u,L)=>{const Q=x,M=Q(u,"r"),R=Q(u,"g"),P=Q(u,"b");return A.Z(M,R,P,L)},yt=u=>`.label {
    font-family: ${u.fontFamily};
    color: ${u.nodeTextColor||u.textColor};
  }
  .cluster-label text {
    fill: ${u.titleColor};
  }
  .cluster-label span,p {
    color: ${u.titleColor};
  }

  .label text,span,p {
    fill: ${u.nodeTextColor||u.textColor};
    color: ${u.nodeTextColor||u.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${u.mainBkg};
    stroke: ${u.nodeBorder};
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
    fill: ${u.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${u.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${u.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${u.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${u.edgeLabelBackground};
      fill: ${u.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${Tt(u.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${u.clusterBkg};
    stroke: ${u.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${u.titleColor};
  }

  .cluster span,p {
    color: ${u.titleColor};
  }
  /* .cluster div {
    color: ${u.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${u.fontFamily};
    font-size: 12px;
    background: ${u.tertiaryColor};
    border: 1px solid ${u.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${u.textColor};
  }
`}}]);
