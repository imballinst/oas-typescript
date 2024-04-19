(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[16],{8734:function(bt){(function(it,F){bt.exports=F()})(this,function(){"use strict";return function(it,F){var rt=F.prototype,x=rt.format;rt.format=function(j){var E=this,ot=this.$locale();if(!this.isValid())return x.bind(this)(j);var h=this.$utils(),k=(j||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(P){switch(P){case"Q":return Math.ceil((E.$M+1)/3);case"Do":return ot.ordinal(E.$D);case"gggg":return E.weekYear();case"GGGG":return E.isoWeekYear();case"wo":return ot.ordinal(E.week(),"W");case"w":case"ww":return h.s(E.week(),P==="w"?1:2,"0");case"W":case"WW":return h.s(E.isoWeek(),P==="W"?1:2,"0");case"k":case"kk":return h.s(String(E.$H===0?24:E.$H),P==="k"?1:2,"0");case"X":return Math.floor(E.$d.getTime()/1e3);case"x":return E.$d.getTime();case"z":return"["+E.offsetName()+"]";case"zzz":return"["+E.offsetName("long")+"]";default:return P}});return x.bind(this)(k)}}})},285:function(bt){(function(it,F){bt.exports=F()})(this,function(){"use strict";var it={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},F=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,rt=/\d\d/,x=/\d\d?/,j=/\d*[^-_:/,()\s\d]+/,E={},ot=function(y){return(y=+y)+(y>68?1900:2e3)},h=function(y){return function(_){this[y]=+_}},k=[/[+-]\d\d:?(\d\d)?|Z/,function(y){(this.zone||(this.zone={})).offset=function(_){if(!_||_==="Z")return 0;var I=_.match(/([+-]|\d\d)/g),A=60*I[1]+(+I[2]||0);return A===0?0:I[0]==="+"?-A:A}(y)}],P=function(y){var _=E[y];return _&&(_.indexOf?_:_.s.concat(_.f))},X=function(y,_){var I,A=E.meridiem;if(A){for(var B=1;B<=24;B+=1)if(y.indexOf(A(B,0,_))>-1){I=B>12;break}}else I=y===(_?"pm":"PM");return I},pt={A:[j,function(y){this.afternoon=X(y,!1)}],a:[j,function(y){this.afternoon=X(y,!0)}],S:[/\d/,function(y){this.milliseconds=100*+y}],SS:[rt,function(y){this.milliseconds=10*+y}],SSS:[/\d{3}/,function(y){this.milliseconds=+y}],s:[x,h("seconds")],ss:[x,h("seconds")],m:[x,h("minutes")],mm:[x,h("minutes")],H:[x,h("hours")],h:[x,h("hours")],HH:[x,h("hours")],hh:[x,h("hours")],D:[x,h("day")],DD:[rt,h("day")],Do:[j,function(y){var _=E.ordinal,I=y.match(/\d+/);if(this.day=I[0],_)for(var A=1;A<=31;A+=1)_(A).replace(/\[|\]/g,"")===y&&(this.day=A)}],M:[x,h("month")],MM:[rt,h("month")],MMM:[j,function(y){var _=P("months"),I=(P("monthsShort")||_.map(function(A){return A.slice(0,3)})).indexOf(y)+1;if(I<1)throw new Error;this.month=I%12||I}],MMMM:[j,function(y){var _=P("months").indexOf(y)+1;if(_<1)throw new Error;this.month=_%12||_}],Y:[/[+-]?\d+/,h("year")],YY:[rt,function(y){this.year=ot(y)}],YYYY:[/\d{4}/,h("year")],Z:k,ZZ:k};function N(y){var _,I;_=y,I=E&&E.formats;for(var A=(y=_.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(ct,J,V){var R=V&&V.toUpperCase();return J||I[V]||it[V]||I[R].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function($,tt,ut){return tt||ut.slice(1)})})).match(F),B=A.length,G=0;G<B;G+=1){var lt=A[G],Q=pt[lt],z=Q&&Q[0],H=Q&&Q[1];A[G]=H?{regex:z,parser:H}:lt.replace(/^\[|\]$/g,"")}return function(ct){for(var J={},V=0,R=0;V<B;V+=1){var $=A[V];if(typeof $=="string")R+=$.length;else{var tt=$.regex,ut=$.parser,xt=ct.slice(R),kt=tt.exec(xt)[0];ut.call(J,kt),ct=ct.replace(kt,"")}}return function(dt){var K=dt.afternoon;if(K!==void 0){var yt=dt.hours;K?yt<12&&(dt.hours+=12):yt===12&&(dt.hours=0),delete dt.afternoon}}(J),J}}return function(y,_,I){I.p.customParseFormat=!0,y&&y.parseTwoDigitYear&&(ot=y.parseTwoDigitYear);var A=_.prototype,B=A.parse;A.parse=function(G){var lt=G.date,Q=G.utc,z=G.args;this.$u=Q;var H=z[1];if(typeof H=="string"){var ct=z[2]===!0,J=z[3]===!0,V=ct||J,R=z[2];J&&(R=z[2]),E=this.$locale(),!ct&&R&&(E=I.Ls[R]),this.$d=function(xt,kt,dt){try{if(["x","X"].indexOf(kt)>-1)return new Date((kt==="X"?1e3:1)*xt);var K=N(kt)(xt),yt=K.year,_t=K.month,Qt=K.day,Jt=K.hours,$t=K.minutes,te=K.seconds,ee=K.milliseconds,zt=K.zone,St=new Date,Mt=Qt||(yt||_t?1:St.getDate()),Lt=yt||St.getFullYear(),wt=0;yt&&!_t||(wt=_t>0?_t-1:St.getMonth());var At=Jt||0,It=$t||0,Yt=te||0,Ft=ee||0;return zt?new Date(Date.UTC(Lt,wt,Mt,At,It,Yt,Ft+60*zt.offset*1e3)):dt?new Date(Date.UTC(Lt,wt,Mt,At,It,Yt,Ft)):new Date(Lt,wt,Mt,At,It,Yt,Ft)}catch{return new Date("")}}(lt,H,Q),this.init(),R&&R!==!0&&(this.$L=this.locale(R).$L),V&&lt!=this.format(H)&&(this.$d=new Date("")),E={}}else if(H instanceof Array)for(var $=H.length,tt=1;tt<=$;tt+=1){z[1]=H[tt-1];var ut=I.apply(this,z);if(ut.isValid()){this.$d=ut.$d,this.$L=ut.$L,this.init();break}tt===$&&(this.$d=new Date(""))}else B.call(this,G)}}})},9542:function(bt){(function(it,F){bt.exports=F()})(this,function(){"use strict";var it="day";return function(F,rt,x){var j=function(h){return h.add(4-h.isoWeekday(),it)},E=rt.prototype;E.isoWeekYear=function(){return j(this).year()},E.isoWeek=function(h){if(!this.$utils().u(h))return this.add(7*(h-this.isoWeek()),it);var k,P,X,pt,N=j(this),y=(k=this.isoWeekYear(),P=this.$u,X=(P?x.utc:x)().year(k).startOf("year"),pt=4-X.isoWeekday(),X.isoWeekday()>4&&(pt+=7),X.add(pt,it));return N.diff(y,"week")+1},E.isoWeekday=function(h){return this.$utils().u(h)?this.day()||7:this.day(this.day()%7?h:h-7)};var ot=E.startOf;E.startOf=function(h,k){var P=this.$utils(),X=!!P.u(k)||k;return P.p(h)==="isoweek"?X?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):ot.bind(this)(h,k)}}})},8016:(bt,it,F)=>{"use strict";F.d(it,{diagram:()=>Ye});var rt=F(7967),x=F(7484),j=F(9542),E=F(285),ot=F(8734),h=F(5322),k=F(7934),P=F(7856),X=function(){var t=function(v,n,u,d){for(u=u||{},d=v.length;d--;u[v[d]]=n);return u},s=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],i=[1,25],a=[1,26],r=[1,27],m=[1,28],f=[1,29],q=[1,30],U=[1,31],Ot=[1,9],at=[1,10],et=[1,11],Tt=[1,12],gt=[1,13],st=[1,14],S=[1,15],Rt=[1,16],Nt=[1,18],Ut=[1,19],Zt=[1,20],jt=[1,21],Xt=[1,22],Gt=[1,24],Ht=[1,32],g={trace:function(){},yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:function(n,u,d,c,p,e,W){var l=e.length-1;switch(p){case 1:return e[l-1];case 2:this.$=[];break;case 3:e[l-1].push(e[l]),this.$=e[l-1];break;case 4:case 5:this.$=e[l];break;case 6:case 7:this.$=[];break;case 8:c.setWeekday("monday");break;case 9:c.setWeekday("tuesday");break;case 10:c.setWeekday("wednesday");break;case 11:c.setWeekday("thursday");break;case 12:c.setWeekday("friday");break;case 13:c.setWeekday("saturday");break;case 14:c.setWeekday("sunday");break;case 15:c.setDateFormat(e[l].substr(11)),this.$=e[l].substr(11);break;case 16:c.enableInclusiveEndDates(),this.$=e[l].substr(18);break;case 17:c.TopAxis(),this.$=e[l].substr(8);break;case 18:c.setAxisFormat(e[l].substr(11)),this.$=e[l].substr(11);break;case 19:c.setTickInterval(e[l].substr(13)),this.$=e[l].substr(13);break;case 20:c.setExcludes(e[l].substr(9)),this.$=e[l].substr(9);break;case 21:c.setIncludes(e[l].substr(9)),this.$=e[l].substr(9);break;case 22:c.setTodayMarker(e[l].substr(12)),this.$=e[l].substr(12);break;case 24:c.setDiagramTitle(e[l].substr(6)),this.$=e[l].substr(6);break;case 25:this.$=e[l].trim(),c.setAccTitle(this.$);break;case 26:case 27:this.$=e[l].trim(),c.setAccDescription(this.$);break;case 28:c.addSection(e[l].substr(8)),this.$=e[l].substr(8);break;case 30:c.addTask(e[l-1],e[l]),this.$="task";break;case 31:this.$=e[l-1],c.setClickEvent(e[l-1],e[l],null);break;case 32:this.$=e[l-2],c.setClickEvent(e[l-2],e[l-1],e[l]);break;case 33:this.$=e[l-2],c.setClickEvent(e[l-2],e[l-1],null),c.setLink(e[l-2],e[l]);break;case 34:this.$=e[l-3],c.setClickEvent(e[l-3],e[l-2],e[l-1]),c.setLink(e[l-3],e[l]);break;case 35:this.$=e[l-2],c.setClickEvent(e[l-2],e[l],null),c.setLink(e[l-2],e[l-1]);break;case 36:this.$=e[l-3],c.setClickEvent(e[l-3],e[l-1],e[l]),c.setLink(e[l-3],e[l-2]);break;case 37:this.$=e[l-1],c.setLink(e[l-1],e[l]);break;case 38:case 44:this.$=e[l-1]+" "+e[l];break;case 39:case 40:case 42:this.$=e[l-2]+" "+e[l-1]+" "+e[l];break;case 41:case 43:this.$=e[l-3]+" "+e[l-2]+" "+e[l-1]+" "+e[l];break}},table:[{3:1,4:[1,2]},{1:[3]},t(s,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:a,14:r,15:m,16:f,17:q,18:U,19:Ot,20:at,21:et,22:Tt,23:gt,24:st,25:S,26:Rt,27:Nt,28:Ut,30:Zt,32:jt,33:Xt,34:23,35:Gt,37:Ht},t(s,[2,7],{1:[2,1]}),t(s,[2,3]),{9:33,11:17,12:i,13:a,14:r,15:m,16:f,17:q,18:U,19:Ot,20:at,21:et,22:Tt,23:gt,24:st,25:S,26:Rt,27:Nt,28:Ut,30:Zt,32:jt,33:Xt,34:23,35:Gt,37:Ht},t(s,[2,5]),t(s,[2,6]),t(s,[2,15]),t(s,[2,16]),t(s,[2,17]),t(s,[2,18]),t(s,[2,19]),t(s,[2,20]),t(s,[2,21]),t(s,[2,22]),t(s,[2,23]),t(s,[2,24]),{29:[1,34]},{31:[1,35]},t(s,[2,27]),t(s,[2,28]),t(s,[2,29]),{36:[1,36]},t(s,[2,8]),t(s,[2,9]),t(s,[2,10]),t(s,[2,11]),t(s,[2,12]),t(s,[2,13]),t(s,[2,14]),{38:[1,37],40:[1,38]},t(s,[2,4]),t(s,[2,25]),t(s,[2,26]),t(s,[2,30]),t(s,[2,31],{39:[1,39],40:[1,40]}),t(s,[2,37],{38:[1,41]}),t(s,[2,32],{40:[1,42]}),t(s,[2,33]),t(s,[2,35],{39:[1,43]}),t(s,[2,34]),t(s,[2,36])],defaultActions:{},parseError:function(n,u){if(u.recoverable)this.trace(n);else{var d=new Error(n);throw d.hash=u,d}},parse:function(n){var u=this,d=[0],c=[],p=[null],e=[],W=this.table,l="",o=0,T=0,Y=2,C=1,M=e.slice.call(arguments,1),D=Object.create(this.lexer),L={yy:{}};for(var Wt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Wt)&&(L.yy[Wt]=this.yy[Wt]);D.setInput(n,L.yy),L.yy.lexer=D,L.yy.parser=this,typeof D.yylloc>"u"&&(D.yylloc={});var Pt=D.yylloc;e.push(Pt);var Fe=D.options&&D.options.ranges;typeof L.yy.parseError=="function"?this.parseError=L.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Oe(){var mt;return mt=c.pop()||D.lex()||C,typeof mt!="number"&&(mt instanceof Array&&(c=mt,mt=c.pop()),mt=u.symbols_[mt]||mt),mt}for(var Z,vt,nt,ie,Ct={},Kt,ht,ge,qt;;){if(vt=d[d.length-1],this.defaultActions[vt]?nt=this.defaultActions[vt]:((Z===null||typeof Z>"u")&&(Z=Oe()),nt=W[vt]&&W[vt][Z]),typeof nt>"u"||!nt.length||!nt[0]){var re="";qt=[];for(Kt in W[vt])this.terminals_[Kt]&&Kt>Y&&qt.push("'"+this.terminals_[Kt]+"'");D.showPosition?re="Parse error on line "+(o+1)+`:
`+D.showPosition()+`
Expecting `+qt.join(", ")+", got '"+(this.terminals_[Z]||Z)+"'":re="Parse error on line "+(o+1)+": Unexpected "+(Z==C?"end of input":"'"+(this.terminals_[Z]||Z)+"'"),this.parseError(re,{text:D.match,token:this.terminals_[Z]||Z,line:D.yylineno,loc:Pt,expected:qt})}if(nt[0]instanceof Array&&nt.length>1)throw new Error("Parse Error: multiple actions possible at state: "+vt+", token: "+Z);switch(nt[0]){case 1:d.push(Z),p.push(D.yytext),e.push(D.yylloc),d.push(nt[1]),Z=null,T=D.yyleng,l=D.yytext,o=D.yylineno,Pt=D.yylloc;break;case 2:if(ht=this.productions_[nt[1]][1],Ct.$=p[p.length-ht],Ct._$={first_line:e[e.length-(ht||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(ht||1)].first_column,last_column:e[e.length-1].last_column},Fe&&(Ct._$.range=[e[e.length-(ht||1)].range[0],e[e.length-1].range[1]]),ie=this.performAction.apply(Ct,[l,T,o,L.yy,nt[1],p,e].concat(M)),typeof ie<"u")return ie;ht&&(d=d.slice(0,-1*ht*2),p=p.slice(0,-1*ht),e=e.slice(0,-1*ht)),d.push(this.productions_[nt[1]][0]),p.push(Ct.$),e.push(Ct._$),ge=W[d[d.length-2]][d[d.length-1]],d.push(ge);break;case 3:return!0}}return!0}},w=function(){var v={EOF:1,parseError:function(u,d){if(this.yy.parser)this.yy.parser.parseError(u,d);else throw new Error(u)},setInput:function(n,u){return this.yy=u||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var u=n.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var u=n.length,d=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var c=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var p=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===c.length?this.yylloc.first_column:0)+c[c.length-d.length].length-d[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[p[0],p[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),u=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+u+"^"},test_match:function(n,u){var d,c,p;if(this.options.backtrack_lexer&&(p={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(p.yylloc.range=this.yylloc.range.slice(0))),c=n[0].match(/(?:\r\n?|\n).*/g),c&&(this.yylineno+=c.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:c?c[c.length-1].length-c[c.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],d=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var e in p)this[e]=p[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,u,d,c;this._more||(this.yytext="",this.match="");for(var p=this._currentRules(),e=0;e<p.length;e++)if(d=this._input.match(this.rules[p[e]]),d&&(!u||d[0].length>u[0].length)){if(u=d,c=e,this.options.backtrack_lexer){if(n=this.test_match(d,p[e]),n!==!1)return n;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(n=this.test_match(u,p[c]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var u=this.next();return u||this.lex()},begin:function(u){this.conditionStack.push(u)},popState:function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},pushState:function(u){this.begin(u)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(u,d,c,p){switch(c){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),28;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),30;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:break;case 15:this.begin("href");break;case 16:this.popState();break;case 17:return 40;case 18:this.begin("callbackname");break;case 19:this.popState();break;case 20:this.popState(),this.begin("callbackargs");break;case 21:return 38;case 22:this.popState();break;case 23:return 39;case 24:this.begin("click");break;case 25:this.popState();break;case 26:return 37;case 27:return 4;case 28:return 19;case 29:return 20;case 30:return 21;case 31:return 22;case 32:return 23;case 33:return 25;case 34:return 24;case 35:return 26;case 36:return 12;case 37:return 13;case 38:return 14;case 39:return 15;case 40:return 16;case 41:return 17;case 42:return 18;case 43:return"date";case 44:return 27;case 45:return"accDescription";case 46:return 33;case 47:return 35;case 48:return 36;case 49:return":";case 50:return 6;case 51:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[22,23],inclusive:!1},callbackname:{rules:[19,20,21],inclusive:!1},href:{rules:[16,17],inclusive:!1},click:{rules:[25,26],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,15,18,24,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],inclusive:!0}}};return v}();g.lexer=w;function b(){this.yy={}}return b.prototype=g,g.Parser=b,new b}();X.parser=X;const pt=X;x.extend(j),x.extend(E),x.extend(ot);let N="",y="",_,I="",A=[],B=[],G={},lt=[],Q=[],z="",H="";const ct=["active","done","crit","milestone"];let J=[],V=!1,R=!1,$="sunday",tt=0;const ut=function(){lt=[],Q=[],z="",J=[],Vt=0,ne=void 0,Bt=void 0,O=[],N="",y="",H="",_=void 0,I="",A=[],B=[],V=!1,R=!1,tt=0,G={},(0,h.t)(),$="sunday"},xt=function(t){y=t},kt=function(){return y},dt=function(t){_=t},K=function(){return _},yt=function(t){I=t},_t=function(){return I},Qt=function(t){N=t},Jt=function(){V=!0},$t=function(){return V},te=function(){R=!0},ee=function(){return R},zt=function(t){H=t},St=function(){return H},Mt=function(){return N},Lt=function(t){A=t.toLowerCase().split(/[\s,]+/)},wt=function(){return A},At=function(t){B=t.toLowerCase().split(/[\s,]+/)},It=function(){return B},Yt=function(){return G},Ft=function(t){z=t,lt.push(t)},ae=function(){return lt},pe=function(){let t=fe();const s=10;let i=0;for(;!t&&i<s;)t=fe(),i++;return Q=O,Q},ce=function(t,s,i,a){return a.includes(t.format(s.trim()))?!1:t.isoWeekday()>=6&&i.includes("weekends")||i.includes(t.format("dddd").toLowerCase())?!0:i.includes(t.format(s.trim()))},Te=function(t){$=t},ve=function(){return $},oe=function(t,s,i,a){if(!i.length||t.manualEndTime)return;let r;t.startTime instanceof Date?r=x(t.startTime):r=x(t.startTime,s,!0),r=r.add(1,"d");let m;t.endTime instanceof Date?m=x(t.endTime):m=x(t.endTime,s,!0);const[f,q]=be(r,m,s,i,a);t.endTime=f.toDate(),t.renderEndTime=q},be=function(t,s,i,a,r){let m=!1,f=null;for(;t<=s;)m||(f=s.toDate()),m=ce(t,i,a,r),m&&(s=s.add(1,"d")),t=t.add(1,"d");return[s,f]},se=function(t,s,i){i=i.trim();const r=/^after\s+([\d\w- ]+)/.exec(i.trim());if(r!==null){let f=null;if(r[1].split(" ").forEach(function(q){let U=Et(q);U!==void 0&&(f?U.endTime>f.endTime&&(f=U):f=U)}),f)return f.endTime;{const q=new Date;return q.setHours(0,0,0,0),q}}let m=x(i,s.trim(),!0);if(m.isValid())return m.toDate();{h.l.debug("Invalid date:"+i),h.l.debug("With date format:"+s.trim());const f=new Date(i);if(f===void 0||isNaN(f.getTime())||f.getFullYear()<-1e4||f.getFullYear()>1e4)throw new Error("Invalid date:"+i);return f}},le=function(t){const s=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return s!==null?[Number.parseFloat(s[1]),s[2]]:[NaN,"ms"]},ue=function(t,s,i,a=!1){i=i.trim();let r=x(i,s.trim(),!0);if(r.isValid())return a&&(r=r.add(1,"d")),r.toDate();let m=x(t);const[f,q]=le(i);if(!Number.isNaN(f)){const U=m.add(f,q);U.isValid()&&(m=U)}return m.toDate()};let Vt=0;const Dt=function(t){return t===void 0?(Vt=Vt+1,"task"+Vt):t},xe=function(t,s){let i;s.substr(0,1)===":"?i=s.substr(1,s.length):i=s;const a=i.split(","),r={};ke(a,r,ct);for(let f=0;f<a.length;f++)a[f]=a[f].trim();let m="";switch(a.length){case 1:r.id=Dt(),r.startTime=t.endTime,m=a[0];break;case 2:r.id=Dt(),r.startTime=se(void 0,N,a[0]),m=a[1];break;case 3:r.id=Dt(a[0]),r.startTime=se(void 0,N,a[1]),m=a[2];break}return m&&(r.endTime=ue(r.startTime,N,m,V),r.manualEndTime=x(m,"YYYY-MM-DD",!0).isValid(),oe(r,N,B,A)),r},_e=function(t,s){let i;s.substr(0,1)===":"?i=s.substr(1,s.length):i=s;const a=i.split(","),r={};ke(a,r,ct);for(let m=0;m<a.length;m++)a[m]=a[m].trim();switch(a.length){case 1:r.id=Dt(),r.startTime={type:"prevTaskEnd",id:t},r.endTime={data:a[0]};break;case 2:r.id=Dt(),r.startTime={type:"getStartDate",startData:a[0]},r.endTime={data:a[1]};break;case 3:r.id=Dt(a[0]),r.startTime={type:"getStartDate",startData:a[1]},r.endTime={data:a[2]};break}return r};let ne,Bt,O=[];const de={},we=function(t,s){const i={section:z,type:z,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:s},task:t,classes:[]},a=_e(Bt,s);i.raw.startTime=a.startTime,i.raw.endTime=a.endTime,i.id=a.id,i.prevTaskId=Bt,i.active=a.active,i.done=a.done,i.crit=a.crit,i.milestone=a.milestone,i.order=tt,tt++;const r=O.push(i);Bt=i.id,de[i.id]=r-1},Et=function(t){const s=de[t];return O[s]},De=function(t,s){const i={section:z,type:z,description:t,task:t,classes:[]},a=xe(ne,s);i.startTime=a.startTime,i.endTime=a.endTime,i.id=a.id,i.active=a.active,i.done=a.done,i.crit=a.crit,i.milestone=a.milestone,ne=i,Q.push(i)},fe=function(){const t=function(i){const a=O[i];let r="";switch(O[i].raw.startTime.type){case"prevTaskEnd":{const m=Et(a.prevTaskId);a.startTime=m.endTime;break}case"getStartDate":r=se(void 0,N,O[i].raw.startTime.startData),r&&(O[i].startTime=r);break}return O[i].startTime&&(O[i].endTime=ue(O[i].startTime,N,O[i].raw.endTime.data,V),O[i].endTime&&(O[i].processed=!0,O[i].manualEndTime=x(O[i].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),oe(O[i],N,B,A))),O[i].processed};let s=!0;for(const[i,a]of O.entries())t(i),s=s&&a.processed;return s},Ee=function(t,s){let i=s;(0,h.c)().securityLevel!=="loose"&&(i=(0,rt.Nm)(s)),t.split(",").forEach(function(a){Et(a)!==void 0&&(me(a,()=>{window.open(i,"_self")}),G[a]=i)}),he(t,"clickable")},he=function(t,s){t.split(",").forEach(function(i){let a=Et(i);a!==void 0&&a.classes.push(s)})},Ce=function(t,s,i){if((0,h.c)().securityLevel!=="loose"||s===void 0)return;let a=[];if(typeof i=="string"){a=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let m=0;m<a.length;m++){let f=a[m].trim();f.charAt(0)==='"'&&f.charAt(f.length-1)==='"'&&(f=f.substr(1,f.length-2)),a[m]=f}}a.length===0&&a.push(t),Et(t)!==void 0&&me(t,()=>{h.u.runFunc(s,...a)})},me=function(t,s){J.push(function(){const i=document.querySelector(`[id="${t}"]`);i!==null&&i.addEventListener("click",function(){s()})},function(){const i=document.querySelector(`[id="${t}-text"]`);i!==null&&i.addEventListener("click",function(){s()})})},Se=function(t,s,i){t.split(",").forEach(function(a){Ce(a,s,i)}),he(t,"clickable")},Me=function(t){J.forEach(function(s){s(t)})},Le={getConfig:()=>(0,h.c)().gantt,clear:ut,setDateFormat:Qt,getDateFormat:Mt,enableInclusiveEndDates:Jt,endDatesAreInclusive:$t,enableTopAxis:te,topAxisEnabled:ee,setAxisFormat:xt,getAxisFormat:kt,setTickInterval:dt,getTickInterval:K,setTodayMarker:yt,getTodayMarker:_t,setAccTitle:h.s,getAccTitle:h.g,setDiagramTitle:h.q,getDiagramTitle:h.r,setDisplayMode:zt,getDisplayMode:St,setAccDescription:h.b,getAccDescription:h.a,addSection:Ft,getSections:ae,getTasks:pe,addTask:we,findTaskById:Et,addTaskOrg:De,setIncludes:Lt,getIncludes:wt,setExcludes:At,getExcludes:It,setClickEvent:Se,setLink:Ee,getLinks:Yt,bindFunctions:Me,parseDuration:le,isInvalidDate:ce,setWeekday:Te,getWeekday:ve};function ke(t,s,i){let a=!0;for(;a;)a=!1,i.forEach(function(r){const m="^\\s*"+r+"\\s*$",f=new RegExp(m);t[0].match(f)&&(s[r]=!0,t.shift(1),a=!0)})}const Ae=function(){h.l.debug("Something is calling, setConf, remove the call")},ye={monday:k.Ox9,tuesday:k.YDX,wednesday:k.EFj,thursday:k.Igq,friday:k.y2j,saturday:k.LqH,sunday:k.Zyz},Ie=(t,s)=>{let i=[...t].map(()=>-1/0),a=[...t].sort((m,f)=>m.startTime-f.startTime||m.order-f.order),r=0;for(const m of a)for(let f=0;f<i.length;f++)if(m.startTime>=i[f]){i[f]=m.endTime,m.order=f+s,f>r&&(r=f);break}return r};let ft;const Ye={parser:pt,db:Le,renderer:{setConf:Ae,draw:function(t,s,i,a){const r=(0,h.c)().gantt,m=(0,h.c)().securityLevel;let f;m==="sandbox"&&(f=(0,k.Ys)("#i"+s));const q=m==="sandbox"?(0,k.Ys)(f.nodes()[0].contentDocument.body):(0,k.Ys)("body"),U=m==="sandbox"?f.nodes()[0].contentDocument:document,Ot=U.getElementById(s);ft=Ot.parentElement.offsetWidth,ft===void 0&&(ft=1200),r.useWidth!==void 0&&(ft=r.useWidth);const at=a.db.getTasks();let et=[];for(const g of at)et.push(g.type);et=Ht(et);const Tt={};let gt=2*r.topPadding;if(a.db.getDisplayMode()==="compact"||r.displayMode==="compact"){const g={};for(const b of at)g[b.section]===void 0?g[b.section]=[b]:g[b.section].push(b);let w=0;for(const b of Object.keys(g)){const v=Ie(g[b],w)+1;w+=v,gt+=v*(r.barHeight+r.barGap),Tt[b]=v}}else{gt+=at.length*(r.barHeight+r.barGap);for(const g of et)Tt[g]=at.filter(w=>w.type===g).length}Ot.setAttribute("viewBox","0 0 "+ft+" "+gt);const st=q.select(`[id="${s}"]`),S=(0,k.Xf)().domain([(0,k.VV$)(at,function(g){return g.startTime}),(0,k.Fp7)(at,function(g){return g.endTime})]).rangeRound([0,ft-r.leftPadding-r.rightPadding]);function Rt(g,w){const b=g.startTime,v=w.startTime;let n=0;return b>v?n=1:b<v&&(n=-1),n}at.sort(Rt),Nt(at,ft,gt),(0,h.i)(st,gt,ft,r.useMaxWidth),st.append("text").text(a.db.getDiagramTitle()).attr("x",ft/2).attr("y",r.titleTopMargin).attr("class","titleText");function Nt(g,w,b){const v=r.barHeight,n=v+r.barGap,u=r.topPadding,d=r.leftPadding,c=(0,k.BYU)().domain([0,et.length]).range(["#00B9FA","#F95002"]).interpolate(k.JHv);Zt(n,u,d,w,b,g,a.db.getExcludes(),a.db.getIncludes()),jt(d,u,w,b),Ut(g,n,u,d,v,c,w),Xt(n,u),Gt(d,u,w,b)}function Ut(g,w,b,v,n,u,d){const p=[...new Set(g.map(o=>o.order))].map(o=>g.find(T=>T.order===o));st.append("g").selectAll("rect").data(p).enter().append("rect").attr("x",0).attr("y",function(o,T){return T=o.order,T*w+b-2}).attr("width",function(){return d-r.rightPadding/2}).attr("height",w).attr("class",function(o){for(const[T,Y]of et.entries())if(o.type===Y)return"section section"+T%r.numberSectionStyles;return"section section0"});const e=st.append("g").selectAll("rect").data(g).enter(),W=a.db.getLinks();if(e.append("rect").attr("id",function(o){return o.id}).attr("rx",3).attr("ry",3).attr("x",function(o){return o.milestone?S(o.startTime)+v+.5*(S(o.endTime)-S(o.startTime))-.5*n:S(o.startTime)+v}).attr("y",function(o,T){return T=o.order,T*w+b}).attr("width",function(o){return o.milestone?n:S(o.renderEndTime||o.endTime)-S(o.startTime)}).attr("height",n).attr("transform-origin",function(o,T){return T=o.order,(S(o.startTime)+v+.5*(S(o.endTime)-S(o.startTime))).toString()+"px "+(T*w+b+.5*n).toString()+"px"}).attr("class",function(o){const T="task";let Y="";o.classes.length>0&&(Y=o.classes.join(" "));let C=0;for(const[D,L]of et.entries())o.type===L&&(C=D%r.numberSectionStyles);let M="";return o.active?o.crit?M+=" activeCrit":M=" active":o.done?o.crit?M=" doneCrit":M=" done":o.crit&&(M+=" crit"),M.length===0&&(M=" task"),o.milestone&&(M=" milestone "+M),M+=C,M+=" "+Y,T+M}),e.append("text").attr("id",function(o){return o.id+"-text"}).text(function(o){return o.task}).attr("font-size",r.fontSize).attr("x",function(o){let T=S(o.startTime),Y=S(o.renderEndTime||o.endTime);o.milestone&&(T+=.5*(S(o.endTime)-S(o.startTime))-.5*n),o.milestone&&(Y=T+n);const C=this.getBBox().width;return C>Y-T?Y+C+1.5*r.leftPadding>d?T+v-5:Y+v+5:(Y-T)/2+T+v}).attr("y",function(o,T){return T=o.order,T*w+r.barHeight/2+(r.fontSize/2-2)+b}).attr("text-height",n).attr("class",function(o){const T=S(o.startTime);let Y=S(o.endTime);o.milestone&&(Y=T+n);const C=this.getBBox().width;let M="";o.classes.length>0&&(M=o.classes.join(" "));let D=0;for(const[Wt,Pt]of et.entries())o.type===Pt&&(D=Wt%r.numberSectionStyles);let L="";return o.active&&(o.crit?L="activeCritText"+D:L="activeText"+D),o.done?o.crit?L=L+" doneCritText"+D:L=L+" doneText"+D:o.crit&&(L=L+" critText"+D),o.milestone&&(L+=" milestoneText"),C>Y-T?Y+C+1.5*r.leftPadding>d?M+" taskTextOutsideLeft taskTextOutside"+D+" "+L:M+" taskTextOutsideRight taskTextOutside"+D+" "+L+" width-"+C:M+" taskText taskText"+D+" "+L+" width-"+C}),(0,h.c)().securityLevel==="sandbox"){let o;o=(0,k.Ys)("#i"+s);const T=o.nodes()[0].contentDocument;e.filter(function(Y){return W[Y.id]!==void 0}).each(function(Y){var C=T.querySelector("#"+Y.id),M=T.querySelector("#"+Y.id+"-text");const D=C.parentNode;var L=T.createElement("a");L.setAttribute("xlink:href",W[Y.id]),L.setAttribute("target","_top"),D.appendChild(L),L.appendChild(C),L.appendChild(M)})}}function Zt(g,w,b,v,n,u,d,c){if(d.length===0&&c.length===0)return;let p,e;for(const{startTime:C,endTime:M}of u)(p===void 0||C<p)&&(p=C),(e===void 0||M>e)&&(e=M);if(!p||!e)return;if(x(e).diff(x(p),"year")>5){h.l.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const W=a.db.getDateFormat(),l=[];let o=null,T=x(p);for(;T.valueOf()<=e;)a.db.isInvalidDate(T,W,d,c)?o?o.end=T:o={start:T,end:T}:o&&(l.push(o),o=null),T=T.add(1,"d");st.append("g").selectAll("rect").data(l).enter().append("rect").attr("id",function(C){return"exclude-"+C.start.format("YYYY-MM-DD")}).attr("x",function(C){return S(C.start)+b}).attr("y",r.gridLineStartPadding).attr("width",function(C){const M=C.end.add(1,"day");return S(M)-S(C.start)}).attr("height",n-w-r.gridLineStartPadding).attr("transform-origin",function(C,M){return(S(C.start)+b+.5*(S(C.end)-S(C.start))).toString()+"px "+(M*g+.5*n).toString()+"px"}).attr("class","exclude-range")}function jt(g,w,b,v){let n=(0,k.LLu)(S).tickSize(-v+w+r.gridLineStartPadding).tickFormat((0,k.i$Z)(a.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));const d=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(a.db.getTickInterval()||r.tickInterval);if(d!==null){const c=d[1],p=d[2],e=a.db.getWeekday()||r.weekday;switch(p){case"millisecond":n.ticks(k.U8T.every(c));break;case"second":n.ticks(k.S1K.every(c));break;case"minute":n.ticks(k.Z_i.every(c));break;case"hour":n.ticks(k.WQD.every(c));break;case"day":n.ticks(k.rr1.every(c));break;case"week":n.ticks(ye[e].every(c));break;case"month":n.ticks(k.F0B.every(c));break}}if(st.append("g").attr("class","grid").attr("transform","translate("+g+", "+(v-50)+")").call(n).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),a.db.topAxisEnabled()||r.topAxis){let c=(0,k.F5q)(S).tickSize(-v+w+r.gridLineStartPadding).tickFormat((0,k.i$Z)(a.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));if(d!==null){const p=d[1],e=d[2],W=a.db.getWeekday()||r.weekday;switch(e){case"millisecond":c.ticks(k.U8T.every(p));break;case"second":c.ticks(k.S1K.every(p));break;case"minute":c.ticks(k.Z_i.every(p));break;case"hour":c.ticks(k.WQD.every(p));break;case"day":c.ticks(k.rr1.every(p));break;case"week":c.ticks(ye[W].every(p));break;case"month":c.ticks(k.F0B.every(p));break}}st.append("g").attr("class","grid").attr("transform","translate("+g+", "+w+")").call(c).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function Xt(g,w){let b=0;const v=Object.keys(Tt).map(n=>[n,Tt[n]]);st.append("g").selectAll("text").data(v).enter().append(function(n){const u=n[0].split(h.e.lineBreakRegex),d=-(u.length-1)/2,c=U.createElementNS("http://www.w3.org/2000/svg","text");c.setAttribute("dy",d+"em");for(const[p,e]of u.entries()){const W=U.createElementNS("http://www.w3.org/2000/svg","tspan");W.setAttribute("alignment-baseline","central"),W.setAttribute("x","10"),p>0&&W.setAttribute("dy","1em"),W.textContent=e,c.appendChild(W)}return c}).attr("x",10).attr("y",function(n,u){if(u>0)for(let d=0;d<u;d++)return b+=v[u-1][1],n[1]*g/2+b*g+w;else return n[1]*g/2+w}).attr("font-size",r.sectionFontSize).attr("class",function(n){for(const[u,d]of et.entries())if(n[0]===d)return"sectionTitle sectionTitle"+u%r.numberSectionStyles;return"sectionTitle"})}function Gt(g,w,b,v){const n=a.db.getTodayMarker();if(n==="off")return;const u=st.append("g").attr("class","today"),d=new Date,c=u.append("line");c.attr("x1",S(d)+g).attr("x2",S(d)+g).attr("y1",r.titleTopMargin).attr("y2",v-r.titleTopMargin).attr("class","today"),n!==""&&c.attr("style",n.replace(/,/g,";"))}function Ht(g){const w={},b=[];for(let v=0,n=g.length;v<n;++v)Object.prototype.hasOwnProperty.call(w,g[v])||(w[g[v]]=!0,b.push(g[v]));return b}}},styles:t=>`
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
  }

  /* Special case clickable */
  .task.clickable {
    cursor: pointer;
  }
  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`}}}]);
