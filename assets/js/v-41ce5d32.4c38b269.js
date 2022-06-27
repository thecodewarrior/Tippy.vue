"use strict";(self.webpackChunktippy_vue=self.webpackChunktippy_vue||[]).push([[995],{6648:function(n,t,a){a.r(t),a.d(t,{data:function(){return s}});const s={key:"v-41ce5d32",path:"/reference/tippy.html",title:"<tippy>",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Example",slug:"example",children:[]},{level:2,title:"Props",slug:"props",children:[{level:3,title:"target",slug:"target",children:[]},{level:3,title:"deep-search",slug:"deep-search",children:[]},{level:3,title:"singleton",slug:"singleton",children:[]},{level:3,title:"visible",slug:"visible",children:[]},{level:3,title:"eager",slug:"eager",children:[]}]},{level:2,title:"Common props",slug:"common-props",children:[{level:3,title:"extra",slug:"extra",children:[]},{level:3,title:"enabled",slug:"enabled",children:[]},{level:3,title:"placement",slug:"placement",children:[]},{level:3,title:"interactive",slug:"interactive",children:[]},{level:3,title:"on-body",slug:"on-body",children:[]},{level:3,title:"trigger",slug:"trigger",children:[]},{level:3,title:"hide-on-click",slug:"hide-on-click",children:[]},{level:3,title:"delay",slug:"delay",children:[]}]},{level:2,title:"Events",slug:"events",children:[{level:3,title:"attach",slug:"attach",children:[]},{level:3,title:"Common events",slug:"common-events",children:[]}]},{level:2,title:"Target Binding",slug:"target-binding",children:[]},{level:2,title:"Singleton Binding",slug:"singleton-binding",children:[]}],filePathRelative:"reference/tippy.md",git:{updatedTime:1656284872e3,contributors:[{name:"Pierce Corcoran",email:"pierce.corcoran@dfstudio.com",commits:6}]}}},9567:function(n,t,a){a.r(t),a.d(t,{default:function(){return Da}});var s=a(6252),e=a(3577);const p=(0,s._)("h1",{id:"tippy",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#tippy","aria-hidden":"true"},"#"),(0,s.Uk)(),(0,s._)("code",null,"<tippy>")],-1),o=(0,s.Uk)("For anything other than the simplest tooltips, the "),l=(0,s._)("code",null,"<tippy>",-1),c=(0,s.Uk)(" component will be the best (or only) option. When it gets mounted it searches for a matching "),i=(0,s._)("code",null,"v-tippy",-1),u=(0,s.Uk)(" target"),r=(0,s.Uk)(" and binds itself to that element. Details on the search algorithm are in the "),k=(0,s._)("a",{href:"#target-binding"},"target binding",-1),g=(0,s.Uk)(" section."),d=(0,s._)("h2",{id:"example",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#example","aria-hidden":"true"},"#"),(0,s.Uk)(" Example")],-1),h=(0,s._)("p",null,[(0,s.Uk)("The basic usage of "),(0,s._)("code",null,"<tippy>"),(0,s.Uk)(" involves marking an element as a tippy target and then adding a matching "),(0,s._)("code",null,"<tippy>"),(0,s.Uk)(" sibling element.")],-1),m=[(0,s.Uk)("Plain")],b=[(0,s.Uk)("HTML")],_=(0,s.Uk)("Bold time: "),y=(0,s.uE)('<div class="language-vue ext-vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span>Plain<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span><span class="token punctuation">&gt;</span></span>Plain time: {{seconds}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-tippy:</span>html</span><span class="token punctuation">&gt;</span></span>HTML<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>html<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Bold time: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">&gt;</span></span>{{seconds}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><p>Note that a bare attribute is identical to <code>&#39;&#39;</code>. This is used for several flag-like properties. (e.g. <code>&lt;tippy interactive&gt;&lt;/tippy&gt;</code>)</p>',3),v={id:"target",tabindex:"-1"},U=(0,s._)("a",{class:"header-anchor",href:"#target","aria-hidden":"true"},"#",-1),f=(0,s.Uk)(),W=(0,s.Uk)("target"),w=(0,s.Uk)(),x=(0,s.Uk)(),T=(0,s.Uk)(),j=(0,s._)("p",null,[(0,s.Uk)("Sets the "),(0,s._)("code",null,"v-tippy"),(0,s.Uk)(" target name this component will bind to. When set to "),(0,s._)("code",null,"_parent"),(0,s.Uk)(", it will bind to its direct parent element. Details on how exactly this binding process works are in the "),(0,s._)("a",{href:"#target-binding"},"target binding"),(0,s.Uk)(" section.")],-1),q={id:"deep-search",tabindex:"-1"},E=(0,s._)("a",{class:"header-anchor",href:"#deep-search","aria-hidden":"true"},"#",-1),S=(0,s.Uk)(),P=(0,s.Uk)("deep-search"),C=(0,s.Uk)(),I=(0,s.Uk)(),B=(0,s.Uk)(),L=(0,s._)("p",null,[(0,s.Uk)("When specified, the component will perform the target search using "),(0,s._)("code",null,"querySelector"),(0,s.Uk)(" on its parent, as opposed to only searching its siblings.")],-1),D={id:"singleton",tabindex:"-1"},H=(0,s._)("a",{class:"header-anchor",href:"#singleton","aria-hidden":"true"},"#",-1),V=(0,s.Uk)(),M=(0,s.Uk)("singleton"),O=(0,s.Uk)(),z=(0,s.Uk)(),A=(0,s.Uk)(),N=(0,s._)("p",null,[(0,s.Uk)("The name of a "),(0,s._)("code",null,"<tippy-singleton>"),(0,s.Uk)(" to bind to. Details on how singleton binding works are in the "),(0,s._)("a",{href:"#singleton-binding"},"singleton binding"),(0,s.Uk)(" section.")],-1),R={id:"visible",tabindex:"-1"},Z=(0,s._)("a",{class:"header-anchor",href:"#visible","aria-hidden":"true"},"#",-1),F=(0,s.Uk)(),Q=(0,s.Uk)("visible"),Y=(0,s.Uk)(),G=(0,s._)("p",null,[(0,s.Uk)("Controls the visibility of the tooltip when the "),(0,s._)("a",{href:"#trigger"},[(0,s._)("code",null,"trigger")]),(0,s.Uk)(" is set to "),(0,s._)("code",null,"'manual'"),(0,s.Uk)(". To manually show/hide the tooltip when using another trigger, use "),(0,s._)("code",null,"component.tip.show()"),(0,s.Uk)(" and "),(0,s._)("code",null,"component.tip.hide()")],-1),J={id:"eager",tabindex:"-1"},K=(0,s._)("a",{class:"header-anchor",href:"#eager","aria-hidden":"true"},"#",-1),X=(0,s.Uk)(),$=(0,s.Uk)("eager"),nn=(0,s.Uk)(),tn=(0,s._)("p",null,"Controls whether the tooltip content should be rendered eagerly or only when the tooltip is actually visible.",-1),an=(0,s._)("h2",{id:"common-props",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#common-props","aria-hidden":"true"},"#"),(0,s.Uk)(" Common props")],-1),sn=(0,s._)("p",null,[(0,s.Uk)("These options are common to both "),(0,s._)("code",null,"<tippy>"),(0,s.Uk)(" and "),(0,s._)("code",null,"<tippy-singleton>")],-1),en={id:"extra",tabindex:"-1"},pn=(0,s._)("a",{class:"header-anchor",href:"#extra","aria-hidden":"true"},"#",-1),on=(0,s.Uk)(),ln=(0,s.Uk)("extra"),cn=(0,s.Uk)(),un=(0,s.Uk)("Extra "),rn={href:"https://atomiks.github.io/tippyjs/v6/all-props/",target:"_blank",rel:"noopener noreferrer"},kn=(0,s.Uk)("Tippy.js options"),gn={id:"enabled",tabindex:"-1"},dn=(0,s._)("a",{class:"header-anchor",href:"#enabled","aria-hidden":"true"},"#",-1),hn=(0,s.Uk)(),mn=(0,s.Uk)("enabled"),bn=(0,s.Uk)(),_n=(0,s.Uk)("Whether the tooltip should be "),yn={href:"https://atomiks.github.io/tippyjs/v6/methods/#disable",target:"_blank",rel:"noopener noreferrer"},vn=(0,s.Uk)("enabled"),Un={id:"placement",tabindex:"-1"},fn=(0,s._)("a",{class:"header-anchor",href:"#placement","aria-hidden":"true"},"#",-1),Wn=(0,s.Uk)(),wn=(0,s.Uk)("placement"),xn=(0,s.Uk)(),Tn=(0,s.Uk)("The "),jn={href:"https://atomiks.github.io/tippyjs/v6/all-props/#placement",target:"_blank",rel:"noopener noreferrer"},qn=(0,s.Uk)("Tippy.js placement"),En=(0,s.Uk)(". Defaults to "),Sn=(0,s._)("code",null,"'top'",-1),Pn={id:"interactive",tabindex:"-1"},Cn=(0,s._)("a",{class:"header-anchor",href:"#interactive","aria-hidden":"true"},"#",-1),In=(0,s.Uk)(),Bn=(0,s.Uk)("interactive"),Ln=(0,s.Uk)(),Dn=(0,s.Uk)(),Hn=(0,s.Uk)(),Vn=(0,s.Uk)("The "),Mn={href:"https://atomiks.github.io/tippyjs/v6/all-props/#interactive",target:"_blank",rel:"noopener noreferrer"},On=(0,s.Uk)("Tippy.js interactive flag"),zn=(0,s.Uk)(". The "),An=(0,s._)("code",null,"on-body",-1),Nn=(0,s.Uk)(" prop implements the "),Rn=(0,s._)("code",null,"appendTo: () => document.body",-1),Zn=(0,s.Uk)(" workaround mentioned in the linked documentation."),Fn={id:"on-body",tabindex:"-1"},Qn=(0,s._)("a",{class:"header-anchor",href:"#on-body","aria-hidden":"true"},"#",-1),Yn=(0,s.Uk)(),Gn=(0,s.Uk)("on-body"),Jn=(0,s.Uk)(),Kn=(0,s.Uk)(),Xn=(0,s.Uk)(),$n=(0,s.Uk)("Whether to place an interactive tooltip in the "),nt=(0,s._)("code",null,"<body>",-1),tt=(0,s.Uk)(" instead of next to the target. This can be useful when you need to isolate the styles (a rogue selector may be trying to style the tooltip contents) or to "),at={href:"https://atomiks.github.io/tippyjs/v6/accessibility/#clipping-issues",target:"_blank",rel:"noopener noreferrer"},st=(0,s.Uk)("avoid clipping issues"),et=(0,s.Uk)("."),pt={id:"trigger",tabindex:"-1"},ot=(0,s._)("a",{class:"header-anchor",href:"#trigger","aria-hidden":"true"},"#",-1),lt=(0,s.Uk)(),ct=(0,s.Uk)("trigger"),it=(0,s.Uk)(),ut=(0,s.Uk)("The "),rt={href:"https://atomiks.github.io/tippyjs/v6/all-props/#trigger",target:"_blank",rel:"noopener noreferrer"},kt=(0,s.Uk)("Tippy.js trigger"),gt=(0,s.Uk)("."),dt={id:"hide-on-click",tabindex:"-1"},ht=(0,s._)("a",{class:"header-anchor",href:"#hide-on-click","aria-hidden":"true"},"#",-1),mt=(0,s.Uk)(),bt=(0,s.Uk)("hide-on-click"),_t=(0,s.Uk)(),yt=(0,s._)("p",null,[(0,s.Uk)("Whether to hide the tooltip when clicking outside it. This defaults to false when using "),(0,s._)("code",null,'trigger="manual"'),(0,s.Uk)(" and true otherwise.")],-1),vt={id:"delay",tabindex:"-1"},Ut=(0,s._)("a",{class:"header-anchor",href:"#delay","aria-hidden":"true"},"#",-1),ft=(0,s.Uk)(),Wt=(0,s.Uk)("delay"),wt=(0,s.Uk)(),xt=(0,s.Uk)(),Tt=(0,s.Uk)(),jt=(0,s.Uk)(),qt=(0,s.Uk)(),Et=(0,s.Uk)("The "),St={href:"https://atomiks.github.io/tippyjs/v6/all-props/#delay",target:"_blank",rel:"noopener noreferrer"},Pt=(0,s.Uk)("Tippy.js delay property"),Ct=(0,s.Uk)(", but with some added parsing for convenience. The property supports directly passing either a number or an array to the underlying tippy instance. If passed a string, it will either parse it as a number or as two comma-separated elements, each of which can be either a positive number or a "),It=(0,s._)("code",null,"-",-1),Bt=(0,s.Uk)(", which corresponds to null in the two-element-array form of the Tippy.js prop"),Lt=(0,s.uE)('<div class="language-vue ext-vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- show and hide delay are 100ms --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">delay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span> \n<span class="token comment">&lt;!-- show delay is 100ms, hide delay is 200ms --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">delay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100,200<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n<span class="token comment">&lt;!-- show delay is 100ms, hide delay is the default --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">delay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100,-<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span> \n</code></pre></div><h2 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2>',2),Dt={id:"attach",tabindex:"-1"},Ht=(0,s._)("a",{class:"header-anchor",href:"#attach","aria-hidden":"true"},"#",-1),Vt=(0,s.Uk)(),Mt=(0,s.Uk)("attach"),Ot=(0,s._)("p",null,[(0,s._)("code",null,"<tippy>"),(0,s.Uk)(" fires the "),(0,s._)("code",null,"attach"),(0,s.Uk)(" event after the tippy instance is been created and has been attached to the target element.")],-1),zt=(0,s._)("h3",{id:"common-events",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#common-events","aria-hidden":"true"},"#"),(0,s.Uk)(" Common events")],-1),At=(0,s.Uk)("The "),Nt=(0,s._)("code",null,"<tippy>",-1),Rt=(0,s.Uk)(" component exposes several of the "),Zt={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onhidden",target:"_blank",rel:"noopener noreferrer"},Ft=(0,s.Uk)("Tippy.js events"),Qt=(0,s.Uk)(" as Vue events:"),Yt=(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",null,"Tippy.js event"),(0,s._)("th",null,"Vue event"),(0,s._)("th",null,"Vue event parameters")])],-1),Gt={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onshow",target:"_blank",rel:"noopener noreferrer"},Jt=(0,s._)("code",null,"onShow",-1),Kt=(0,s._)("td",null,[(0,s._)("code",null,"show")],-1),Xt=(0,s._)("td",null,[(0,s._)("code",null,"(tip)")],-1),$t={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onshown",target:"_blank",rel:"noopener noreferrer"},na=(0,s._)("code",null,"onShown",-1),ta=(0,s._)("td",null,[(0,s._)("code",null,"shown")],-1),aa=(0,s._)("td",null,[(0,s._)("code",null,"(tip)")],-1),sa={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onhidden",target:"_blank",rel:"noopener noreferrer"},ea=(0,s._)("code",null,"onHidden",-1),pa=(0,s._)("td",null,[(0,s._)("code",null,"hidden")],-1),oa=(0,s._)("td",null,[(0,s._)("code",null,"(tip)")],-1),la={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onhide",target:"_blank",rel:"noopener noreferrer"},ca=(0,s._)("code",null,"onHide",-1),ia=(0,s._)("td",null,[(0,s._)("code",null,"hide")],-1),ua=(0,s._)("td",null,[(0,s._)("code",null,"(tip)")],-1),ra={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onmount",target:"_blank",rel:"noopener noreferrer"},ka=(0,s._)("code",null,"onMount",-1),ga=(0,s._)("td",null,[(0,s._)("code",null,"mount")],-1),da=(0,s._)("td",null,[(0,s._)("code",null,"(tip)")],-1),ha={href:"https://atomiks.github.io/tippyjs/v6/all-props/#ontrigger",target:"_blank",rel:"noopener noreferrer"},ma=(0,s._)("code",null,"onTrigger",-1),ba=(0,s._)("td",null,[(0,s._)("code",null,"trigger")],-1),_a=(0,s._)("td",null,[(0,s._)("code",null,"(tip, triggerEvent)")],-1),ya={href:"https://atomiks.github.io/tippyjs/v6/all-props/#onuntrigger",target:"_blank",rel:"noopener noreferrer"},va=(0,s._)("code",null,"onUntrigger",-1),Ua=(0,s._)("td",null,[(0,s._)("code",null,"untrigger")],-1),fa=(0,s._)("td",null,[(0,s._)("code",null,"(tip, triggerEvent)")],-1),Wa=(0,s.uE)('<h2 id="target-binding" tabindex="-1"><a class="header-anchor" href="#target-binding" aria-hidden="true">#</a> Target Binding</h2><p>After the <code>&lt;tippy&gt;</code> element is mounted it will search for an element with a matching <code>v-tippy</code> name, starting with the nearest preceding siblings and then the subsequent siblings. This allows easily creating lists, since you can repeat tippy elements without them interfering.</p><p>The default algorithm only searches among the <code>&lt;tippy&gt;</code> element&#39;s direct siblings. If you need to search through the entire hierarchy you can use the <a href="#deep-search"><code>deep-search</code></a> flag, which will use <code>querySelector</code> on the <code>&lt;tippy&gt;</code> component&#39;s parent element.</p><div class="language-vue ext-vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- Search order: --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 3 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 2 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 1 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 4 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 5 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 6 --&gt;</span>\n\n<span class="token comment">&lt;!-- Lists: --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span>Item 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> \n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span><span class="token punctuation">&gt;</span></span>Tip 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- binds to the previous button --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span>Item 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span><span class="token punctuation">&gt;</span></span>Tip 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- binds to the previous button --&gt;</span>\n\n<span class="token comment">&lt;!-- Only siblings: --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- won&#39;t search outside its parent--&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- won&#39;t drill into nested elements --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',4),wa=(0,s.Uk)("Because of the order that things are mounted, "),xa=(0,s._)("code",null,"<tippy>",-1),Ta=(0,s.Uk)(" defers this check until the tick after it gets mounted. If it searched immediately, subsequent elements may not be fully mounted, and so "),ja=(0,s._)("code",null,"v-tippy",-1),qa=(0,s.Uk)(" won't have had a chance to add the "),Ea=(0,s._)("code",null,"data-tippy-target",-1),Sa=(0,s.Uk)(" attribute. See "),Pa={href:"https://v3.vuejs.org/api/global-api.html#nexttick",target:"_blank",rel:"noopener noreferrer"},Ca=(0,s._)("code",null,"Vue.nextTick",-1),Ia=(0,s.Uk)(" for information on Vue ticks."),Ba=(0,s.uE)('<h2 id="singleton-binding" tabindex="-1"><a class="header-anchor" href="#singleton-binding" aria-hidden="true">#</a> Singleton Binding</h2><p>The algorithm for binding to a <code>&lt;tippy-singleton&gt;</code> is in essence the same as target binding, but applied to all the component&#39;s ancestors. It first applies the standard search order among its siblings, then its parent&#39;s siblings, then up the hierarchy until it finds a match.</p><div class="language-vue ext-vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- Search order: --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>   <span class="token comment">&lt;!-- 5 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 2 --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 1 --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">singleton</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 3 --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span> <span class="token comment">&lt;!-- 4 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>   <span class="token comment">&lt;!-- 6 --&gt;</span>\n\n<span class="token comment">&lt;!-- Lists: --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy-singleton</span><span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span>Item 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">singleton</span><span class="token punctuation">&gt;</span></span>Tip 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-tippy</span><span class="token punctuation">&gt;</span></span>Item 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">singleton</span><span class="token punctuation">&gt;</span></span>Tip 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token comment">&lt;!-- Nearest parent: --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy-singleton</span><span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy-singleton</span><span class="token punctuation">/&gt;</span></span> <span class="token comment">&lt;!-- They&#39;ll bind here --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">singleton</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">singleton</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tippy</span> <span class="token attr-name">singleton</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tippy</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',3),La={};var Da=(0,a(3744).Z)(La,[["render",function(n,t){const a=(0,s.up)("RouterLink"),La=(0,s.up)("tippy"),Da=(0,s.up)("demo"),Ha=(0,s.up)("type"),Va=(0,s.up)("OutboundLink"),Ma=(0,s.Q2)("tippy");return(0,s.wg)(),(0,s.iD)(s.HY,null,[p,(0,s._)("p",null,[o,l,c,(0,s.Wm)(a,{to:"/reference/v-tippy.html#target-mode"},{default:(0,s.w5)((()=>[i,u])),_:1}),r,k,g]),d,h,(0,s.Wm)(Da,null,{default:(0,s.w5)((({seconds:n})=>[(0,s.wy)((0,s._)("button",null,m,512),[[Ma]]),(0,s.Wm)(La,null,{default:(0,s.w5)((()=>[(0,s.Uk)("Plain time: "+(0,e.zw)(n),1)])),_:2},1024),(0,s.wy)((0,s._)("button",null,b,512),[[Ma,void 0,"html"]]),(0,s.Wm)(La,{target:"html"},{default:(0,s.w5)((()=>[_,(0,s._)("b",null,(0,e.zw)(n),1)])),_:2},1024)])),_:1}),y,(0,s._)("h3",v,[U,f,(0,s._)("code",null,[W,(0,s.Wm)(Ha,{op:":"}),w,(0,s.Wm)(Ha,{builtin:"string"}),x,(0,s.Wm)(Ha,{op:"|"}),T,(0,s.Wm)(Ha,{string:"'_parent'"})])]),j,(0,s._)("h3",q,[E,S,(0,s._)("code",null,[P,(0,s.Wm)(Ha,{op:":"}),C,(0,s.Wm)(Ha,{builtin:"boolean"}),I,(0,s.Wm)(Ha,{op:"|"}),B,(0,s.Wm)(Ha,{string:"''"})])]),L,(0,s._)("h3",D,[H,V,(0,s._)("code",null,[M,(0,s.Wm)(Ha,{op:":"}),O,(0,s.Wm)(Ha,{builtin:"string"}),z,(0,s.Wm)(Ha,{op:"|"}),A,(0,s.Wm)(Ha,{string:"''"})])]),N,(0,s._)("h3",R,[Z,F,(0,s._)("code",null,[Q,(0,s.Wm)(Ha,{op:":"}),Y,(0,s.Wm)(Ha,{builtin:"boolean"})])]),G,(0,s._)("h3",J,[K,X,(0,s._)("code",null,[$,(0,s.Wm)(Ha,{op:":"}),nn,(0,s.Wm)(Ha,{builtin:"boolean"})])]),tn,an,sn,(0,s._)("h3",en,[pn,on,(0,s._)("code",null,[ln,(0,s.Wm)(Ha,{op:":"}),cn,(0,s.Wm)(Ha,{type:"Props",link:"https://atomiks.github.io/tippyjs/v6/all-props/"})])]),(0,s._)("p",null,[un,(0,s._)("a",rn,[kn,(0,s.Wm)(Va)])]),(0,s._)("h3",gn,[dn,hn,(0,s._)("code",null,[mn,(0,s.Wm)(Ha,{op:":"}),bn,(0,s.Wm)(Ha,{builtin:"boolean"})])]),(0,s._)("p",null,[_n,(0,s._)("a",yn,[vn,(0,s.Wm)(Va)])]),(0,s._)("h3",Un,[fn,Wn,(0,s._)("code",null,[wn,(0,s.Wm)(Ha,{op:":"}),xn,(0,s.Wm)(Ha,{type:"Placement",link:"https://atomiks.github.io/tippyjs/v6/all-props/#placement"})])]),(0,s._)("p",null,[Tn,(0,s._)("a",jn,[qn,(0,s.Wm)(Va)]),En,Sn]),(0,s._)("h3",Pn,[Cn,In,(0,s._)("code",null,[Bn,(0,s.Wm)(Ha,{op:":"}),Ln,(0,s.Wm)(Ha,{builtin:"boolean"}),Dn,(0,s.Wm)(Ha,{op:"|"}),Hn,(0,s.Wm)(Ha,{string:"''"})])]),(0,s._)("p",null,[Vn,(0,s._)("a",Mn,[On,(0,s.Wm)(Va)]),zn,An,Nn,Rn,Zn]),(0,s._)("h3",Fn,[Qn,Yn,(0,s._)("code",null,[Gn,(0,s.Wm)(Ha,{op:":"}),Jn,(0,s.Wm)(Ha,{builtin:"boolean"}),Kn,(0,s.Wm)(Ha,{op:"|"}),Xn,(0,s.Wm)(Ha,{string:"''"})])]),(0,s._)("p",null,[$n,nt,tt,(0,s._)("a",at,[st,(0,s.Wm)(Va)]),et]),(0,s._)("h3",pt,[ot,lt,(0,s._)("code",null,[ct,(0,s.Wm)(Ha,{op:":"}),it,(0,s.Wm)(Ha,{builtin:"string"})])]),(0,s._)("p",null,[ut,(0,s._)("a",rt,[kt,(0,s.Wm)(Va)]),gt]),(0,s._)("h3",dt,[ht,mt,(0,s._)("code",null,[bt,(0,s.Wm)(Ha,{op:":"}),_t,(0,s.Wm)(Ha,{builtin:"boolean"})])]),yt,(0,s._)("h3",vt,[Ut,ft,(0,s._)("code",null,[Wt,(0,s.Wm)(Ha,{op:":"}),wt,(0,s.Wm)(Ha,{builtin:"string"}),xt,(0,s.Wm)(Ha,{op:"|"}),Tt,(0,s.Wm)(Ha,{builtin:"number"}),jt,(0,s.Wm)(Ha,{op:"|"}),qt,(0,s.Wm)(Ha,{type:"Array"})])]),(0,s._)("p",null,[Et,(0,s._)("a",St,[Pt,(0,s.Wm)(Va)]),Ct,It,Bt]),Lt,(0,s._)("h3",Dt,[Ht,Vt,(0,s._)("code",null,[Mt,(0,s.Wm)(Ha,{punc:"("}),(0,s.Wm)(Ha,{link:"https://atomiks.github.io/tippyjs/v6/tippy-instance/",type:"tip"}),(0,s.Wm)(Ha,{punc:")"})])]),Ot,zt,(0,s._)("p",null,[At,Nt,Rt,(0,s._)("a",Zt,[Ft,(0,s.Wm)(Va)]),Qt]),(0,s._)("table",null,[Yt,(0,s._)("tbody",null,[(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",Gt,[Jt,(0,s.Wm)(Va)])]),Kt,Xt]),(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",$t,[na,(0,s.Wm)(Va)])]),ta,aa]),(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",sa,[ea,(0,s.Wm)(Va)])]),pa,oa]),(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",la,[ca,(0,s.Wm)(Va)])]),ia,ua]),(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",ra,[ka,(0,s.Wm)(Va)])]),ga,da]),(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",ha,[ma,(0,s.Wm)(Va)])]),ba,_a]),(0,s._)("tr",null,[(0,s._)("td",null,[(0,s._)("a",ya,[va,(0,s.Wm)(Va)])]),Ua,fa])])]),Wa,(0,s._)("p",null,[wa,xa,Ta,ja,qa,Ea,Sa,(0,s._)("a",Pa,[Ca,(0,s.Wm)(Va)]),Ia]),Ba],64)}]])},3744:function(n,t){t.Z=(n,t)=>{const a=n.__vccOpts||n;for(const[n,s]of t)a[n]=s;return a}}}]);