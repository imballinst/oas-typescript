"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[183],{2183:(gt,X,S)=>{S.d(X,{diagram:()=>At});var k=S(5322),V=S(7934),R=S(3317),st=S(7484),nt=S(7967),it=S(7856),z=function(){var t=function(g,s,r,a){for(r=r||{},a=g.length;a--;r[g[a]]=s);return r},e=[6,8,10,11,12,14,16,17,18],i=[1,9],o=[1,10],n=[1,11],h=[1,12],c=[1,13],f=[1,14],d={trace:function(){},yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:function(s,r,a,y,p,l,C){var w=l.length-1;switch(p){case 1:return l[w-1];case 2:this.$=[];break;case 3:l[w-1].push(l[w]),this.$=l[w-1];break;case 4:case 5:this.$=l[w];break;case 6:case 7:this.$=[];break;case 8:y.setDiagramTitle(l[w].substr(6)),this.$=l[w].substr(6);break;case 9:this.$=l[w].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=l[w].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(l[w].substr(8)),this.$=l[w].substr(8);break;case 13:y.addTask(l[w-1],l[w]),this.$="task";break}},table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:o,14:n,16:h,17:c,18:f},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:o,14:n,16:h,17:c,18:f},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:function(s,r){if(r.recoverable)this.trace(s);else{var a=new Error(s);throw a.hash=r,a}},parse:function(s){var r=this,a=[0],y=[],p=[null],l=[],C=this.table,w="",K=0,dt=0,Lt=2,ft=1,Rt=l.slice.call(arguments,1),b=Object.create(this.lexer),F={yy:{}};for(var q in this.yy)Object.prototype.hasOwnProperty.call(this.yy,q)&&(F.yy[q]=this.yy[q]);b.setInput(s,F.yy),F.yy.lexer=b,F.yy.parser=this,typeof b.yylloc>"u"&&(b.yylloc={});var D=b.yylloc;l.push(D);var Ot=b.options&&b.options.ranges;typeof F.yy.parseError=="function"?this.parseError=F.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Vt(){var L;return L=y.pop()||b.lex()||ft,typeof L!="number"&&(L instanceof Array&&(y=L,L=y.pop()),L=r.symbols_[L]||L),L}for(var M,N,$,tt,j={},G,A,pt,H;;){if(N=a[a.length-1],this.defaultActions[N]?$=this.defaultActions[N]:((M===null||typeof M>"u")&&(M=Vt()),$=C[N]&&C[N][M]),typeof $>"u"||!$.length||!$[0]){var et="";H=[];for(G in C[N])this.terminals_[G]&&G>Lt&&H.push("'"+this.terminals_[G]+"'");b.showPosition?et="Parse error on line "+(K+1)+`:
`+b.showPosition()+`
Expecting `+H.join(", ")+", got '"+(this.terminals_[M]||M)+"'":et="Parse error on line "+(K+1)+": Unexpected "+(M==ft?"end of input":"'"+(this.terminals_[M]||M)+"'"),this.parseError(et,{text:b.match,token:this.terminals_[M]||M,line:b.yylineno,loc:D,expected:H})}if($[0]instanceof Array&&$.length>1)throw new Error("Parse Error: multiple actions possible at state: "+N+", token: "+M);switch($[0]){case 1:a.push(M),p.push(b.yytext),l.push(b.yylloc),a.push($[1]),M=null,dt=b.yyleng,w=b.yytext,K=b.yylineno,D=b.yylloc;break;case 2:if(A=this.productions_[$[1]][1],j.$=p[p.length-A],j._$={first_line:l[l.length-(A||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-(A||1)].first_column,last_column:l[l.length-1].last_column},Ot&&(j._$.range=[l[l.length-(A||1)].range[0],l[l.length-1].range[1]]),tt=this.performAction.apply(j,[w,dt,K,F.yy,$[1],p,l].concat(Rt)),typeof tt<"u")return tt;A&&(a=a.slice(0,-1*A*2),p=p.slice(0,-1*A),l=l.slice(0,-1*A)),a.push(this.productions_[$[1]][0]),p.push(j.$),l.push(j._$),pt=C[a[a.length-2]][a[a.length-1]],a.push(pt);break;case 3:return!0}}return!0}},_=function(){var g={EOF:1,parseError:function(r,a){if(this.yy.parser)this.yy.parser.parseError(r,a);else throw new Error(r)},setInput:function(s,r){return this.yy=r||this.yy||{},this._input=s,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var s=this._input[0];this.yytext+=s,this.yyleng++,this.offset++,this.match+=s,this.matched+=s;var r=s.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),s},unput:function(s){var r=s.length,a=s.split(/(?:\r\n?|\n)/g);this._input=s+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var y=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),a.length-1&&(this.yylineno-=a.length-1);var p=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:a?(a.length===y.length?this.yylloc.first_column:0)+y[y.length-a.length].length-a[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[p[0],p[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(s){this.unput(this.match.slice(s))},pastInput:function(){var s=this.matched.substr(0,this.matched.length-this.match.length);return(s.length>20?"...":"")+s.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var s=this.match;return s.length<20&&(s+=this._input.substr(0,20-s.length)),(s.substr(0,20)+(s.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var s=this.pastInput(),r=new Array(s.length+1).join("-");return s+this.upcomingInput()+`
`+r+"^"},test_match:function(s,r){var a,y,p;if(this.options.backtrack_lexer&&(p={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(p.yylloc.range=this.yylloc.range.slice(0))),y=s[0].match(/(?:\r\n?|\n).*/g),y&&(this.yylineno+=y.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:y?y[y.length-1].length-y[y.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],a=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a)return a;if(this._backtrack){for(var l in p)this[l]=p[l];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var s,r,a,y;this._more||(this.yytext="",this.match="");for(var p=this._currentRules(),l=0;l<p.length;l++)if(a=this._input.match(this.rules[p[l]]),a&&(!r||a[0].length>r[0].length)){if(r=a,y=l,this.options.backtrack_lexer){if(s=this.test_match(a,p[l]),s!==!1)return s;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(s=this.test_match(r,p[y]),s!==!1?s:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var r=this.next();return r||this.lex()},begin:function(r){this.conditionStack.push(r)},popState:function(){var r=this.conditionStack.length-1;return r>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(r){return r=this.conditionStack.length-1-Math.abs(r||0),r>=0?this.conditionStack[r]:"INITIAL"},pushState:function(r){this.begin(r)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(r,a,y,p){switch(y){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return g}();d.lexer=_;function x(){this.yy={}}return x.prototype=d,d.Parser=x,new x}();z.parser=z;const Z=z;let O="";const E=[],u=[],m=[],v=function(){E.length=0,u.length=0,O="",m.length=0,(0,k.t)()},T=function(t){O=t,E.push(t)},W=function(){return E},mt=function(){let t=rt();const e=100;let i=0;for(;!t&&i<e;)t=rt(),i++;return u.push(...m),u},xt=function(){const t=[];return u.forEach(i=>{i.people&&t.push(...i.people)}),[...new Set(t)].sort()},_t=function(t,e){const i=e.substr(1).split(":");let o=0,n=[];i.length===1?(o=Number(i[0]),n=[]):(o=Number(i[0]),n=i[1].split(","));const h=n.map(f=>f.trim()),c={section:O,type:O,people:h,task:t,score:o};m.push(c)},kt=function(t){const e={section:O,type:O,description:t,task:t,classes:[]};u.push(e)},rt=function(){const t=function(i){return m[i].processed};let e=!0;for(const[i,o]of m.entries())t(i),e=e&&o.processed;return e},bt=function(){return xt()},at={getConfig:()=>(0,k.c)().journey,clear:v,setDiagramTitle:k.q,getDiagramTitle:k.r,setAccTitle:k.s,getAccTitle:k.g,setAccDescription:k.b,getAccDescription:k.a,addSection:T,getSections:W,getTasks:mt,addTask:_t,addTaskOrg:kt,getActors:bt},vt=t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
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
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,J=function(t,e){return(0,R.d)(t,e)},wt=function(t,e){const o=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");n.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function h(d){const _=(0,V.Nb1)().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);d.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function c(d){const _=(0,V.Nb1)().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);d.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function f(d){d.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return e.score>3?h(n):e.score<3?c(n):f(n),o},lt=function(t,e){const i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),i.class!==void 0&&i.attr("class",i.class),e.title!==void 0&&i.append("title").text(e.title),i},ot=function(t,e){return(0,R.f)(t,e)},Et=function(t,e){function i(n,h,c,f,d){return n+","+h+" "+(n+c)+","+h+" "+(n+c)+","+(h+f-d)+" "+(n+c-d*1.2)+","+(h+f)+" "+n+","+(h+f)}const o=t.append("polygon");o.attr("points",i(e.x,e.y,50,20,7)),o.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,ot(t,e)},Mt=function(t,e,i){const o=t.append("g"),n=(0,R.g)();n.x=e.x,n.y=e.y,n.fill=e.fill,n.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),n.height=i.height,n.class="journey-section section-type-"+e.num,n.rx=3,n.ry=3,J(o,n),ht(i)(e.text,o,n.x,n.y,n.width,n.height,{class:"journey-section section-type-"+e.num},i,e.colour)};let ct=-1;const Tt=function(t,e,i){const o=e.x+i.width/2,n=t.append("g");ct++;const h=300+5*30;n.append("line").attr("id","task"+ct).attr("x1",o).attr("y1",e.y).attr("x2",o).attr("y2",h).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),wt(n,{cx:o,cy:300+(5-e.score)*30,score:e.score});const c=(0,R.g)();c.x=e.x,c.y=e.y,c.fill=e.fill,c.width=i.width,c.height=i.height,c.class="task task-type-"+e.num,c.rx=3,c.ry=3,J(n,c);let f=e.x+14;e.people.forEach(d=>{const _=e.actors[d].color,x={cx:f,cy:e.y,r:7,fill:_,stroke:"#000",title:d,pos:e.actors[d].position};lt(n,x),f+=10}),ht(i)(e.task,n,c.x,c.y,c.width,c.height,{class:"task"},i,e.colour)},Pt=function(t,e){(0,R.a)(t,e)},ht=function(){function t(n,h,c,f,d,_,x,g){const s=h.append("text").attr("x",c+d/2).attr("y",f+_/2+5).style("font-color",g).style("text-anchor","middle").text(n);o(s,x)}function e(n,h,c,f,d,_,x,g,s){const{taskFontSize:r,taskFontFamily:a}=g,y=n.split(/<br\s*\/?>/gi);for(let p=0;p<y.length;p++){const l=p*r-r*(y.length-1)/2,C=h.append("text").attr("x",c+d/2).attr("y",f).attr("fill",s).style("text-anchor","middle").style("font-size",r).style("font-family",a);C.append("tspan").attr("x",c+d/2).attr("dy",l).text(y[p]),C.attr("y",f+_/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),o(C,x)}}function i(n,h,c,f,d,_,x,g){const s=h.append("switch"),a=s.append("foreignObject").attr("x",c).attr("y",f).attr("width",d).attr("height",_).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");a.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(n),e(n,s,c,f,d,_,x,g),o(a,x)}function o(n,h){for(const c in h)c in h&&n.attr(c,h[c])}return function(n){return n.textPlacement==="fo"?i:n.textPlacement==="old"?t:e}}(),Y={drawRect:J,drawCircle:lt,drawSection:Mt,drawText:ot,drawLabel:Et,drawTask:Tt,drawBackgroundRect:Pt,initGraphics:function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")}},$t=function(t){Object.keys(t).forEach(function(i){U[i]=t[i]})},I={};function St(t){const e=(0,k.c)().journey;let i=60;Object.keys(I).forEach(o=>{const n=I[o].color,h={cx:20,cy:i,r:7,fill:n,stroke:"#000",pos:I[o].position};Y.drawCircle(t,h);const c={x:40,y:i+7,fill:"#666",text:o,textMargin:e.boxTextMargin|5};Y.drawText(t,c),i+=20})}const U=(0,k.c)().journey,B=U.leftMargin,It=function(t,e,i,o){const n=(0,k.c)().journey,h=(0,k.c)().securityLevel;let c;h==="sandbox"&&(c=(0,V.Ys)("#i"+e));const f=h==="sandbox"?(0,V.Ys)(c.nodes()[0].contentDocument.body):(0,V.Ys)("body");P.init();const d=f.select("#"+e);Y.initGraphics(d);const _=o.db.getTasks(),x=o.db.getDiagramTitle(),g=o.db.getActors();for(const l in I)delete I[l];let s=0;g.forEach(l=>{I[l]={color:n.actorColours[s%n.actorColours.length],position:s},s++}),St(d),P.insert(0,0,B,Object.keys(I).length*50),Ct(d,_,0);const r=P.getBounds();x&&d.append("text").text(x).attr("x",B).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const a=r.stopy-r.starty+2*n.diagramMarginY,y=B+r.stopx+2*n.diagramMarginX;(0,k.i)(d,a,y,n.useMaxWidth),d.append("line").attr("x1",B).attr("y1",n.height*4).attr("x2",y-B-4).attr("y2",n.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const p=x?70:0;d.attr("viewBox",`${r.startx} -25 ${y} ${a+p}`),d.attr("preserveAspectRatio","xMinYMin meet"),d.attr("height",a+p+25)},P={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,i,o){t[e]===void 0?t[e]=i:t[e]=o(i,t[e])},updateBounds:function(t,e,i,o){const n=(0,k.c)().journey,h=this;let c=0;function f(d){return function(x){c++;const g=h.sequenceItems.length-c+1;h.updateVal(x,"starty",e-g*n.boxMargin,Math.min),h.updateVal(x,"stopy",o+g*n.boxMargin,Math.max),h.updateVal(P.data,"startx",t-g*n.boxMargin,Math.min),h.updateVal(P.data,"stopx",i+g*n.boxMargin,Math.max),d!=="activation"&&(h.updateVal(x,"startx",t-g*n.boxMargin,Math.min),h.updateVal(x,"stopx",i+g*n.boxMargin,Math.max),h.updateVal(P.data,"starty",e-g*n.boxMargin,Math.min),h.updateVal(P.data,"stopy",o+g*n.boxMargin,Math.max))}}this.sequenceItems.forEach(f())},insert:function(t,e,i,o){const n=Math.min(t,i),h=Math.max(t,i),c=Math.min(e,o),f=Math.max(e,o);this.updateVal(P.data,"startx",n,Math.min),this.updateVal(P.data,"starty",c,Math.min),this.updateVal(P.data,"stopx",h,Math.max),this.updateVal(P.data,"stopy",f,Math.max),this.updateBounds(n,c,h,f)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},Q=U.sectionFills,ut=U.sectionColours,Ct=function(t,e,i){const o=(0,k.c)().journey;let n="";const h=o.height*2+o.diagramMarginY,c=i+h;let f=0,d="#CCC",_="black",x=0;for(const[g,s]of e.entries()){if(n!==s.section){d=Q[f%Q.length],x=f%Q.length,_=ut[f%ut.length];let a=0;const y=s.section;for(let l=g;l<e.length&&e[l].section==y;l++)a=a+1;const p={x:g*o.taskMargin+g*o.width+B,y:50,text:s.section,fill:d,num:x,colour:_,taskCount:a};Y.drawSection(t,p,o),n=s.section,f++}const r=s.people.reduce((a,y)=>(I[y]&&(a[y]=I[y]),a),{});s.x=g*o.taskMargin+g*o.width+B,s.y=c,s.width=o.diagramMarginX,s.height=o.diagramMarginY,s.colour=_,s.fill=d,s.num=x,s.actors=r,Y.drawTask(t,s,o),P.insert(s.x,s.y,s.x+s.width+o.taskMargin,300+5*30)}},yt={setConf:$t,draw:It},At={parser:Z,db:at,renderer:yt,styles:vt,init:t=>{yt.setConf(t.journey),at.clear()}}},3317:(gt,X,S)=>{S.d(X,{a:()=>st,b:()=>z,c:()=>it,d:()=>R,e:()=>O,f:()=>nt,g:()=>Z});var k=S(7967),V=S(5322);const R=(E,u)=>{const m=E.append("rect");if(m.attr("x",u.x),m.attr("y",u.y),m.attr("fill",u.fill),m.attr("stroke",u.stroke),m.attr("width",u.width),m.attr("height",u.height),u.rx!==void 0&&m.attr("rx",u.rx),u.ry!==void 0&&m.attr("ry",u.ry),u.attrs!==void 0)for(const v in u.attrs)m.attr(v,u.attrs[v]);return u.class!==void 0&&m.attr("class",u.class),m},st=(E,u)=>{const m={x:u.startx,y:u.starty,width:u.stopx-u.startx,height:u.stopy-u.starty,fill:u.fill,stroke:u.stroke,class:"rect"};R(E,m).lower()},nt=(E,u)=>{const m=u.text.replace(V.H," "),v=E.append("text");v.attr("x",u.x),v.attr("y",u.y),v.attr("class","legend"),v.style("text-anchor",u.anchor),u.class!==void 0&&v.attr("class",u.class);const T=v.append("tspan");return T.attr("x",u.x+u.textMargin*2),T.text(m),v},it=(E,u,m,v)=>{const T=E.append("image");T.attr("x",u),T.attr("y",m);const W=(0,k.Nm)(v);T.attr("xlink:href",W)},z=(E,u,m,v)=>{const T=E.append("use");T.attr("x",u),T.attr("y",m);const W=(0,k.Nm)(v);T.attr("xlink:href",`#${W}`)},Z=()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),O=()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0})}}]);
