(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,n){e.exports=n(63)},26:function(e,t,n){},28:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),o=n.n(c),l=(n(26),n(3)),i=n(4),s=n(6),u=n(5),h=n(7),m=(n(28),n(20)),p=n.n(m),d=function(e){var t=e.results.map(function(e){return r.a.createElement("li",{key:e.id},e.name)});return r.a.createElement("ul",null,t)},f=Object({NODE_ENV:"production",PUBLIC_URL:""}).API_KEY,v="http://localhost:3000/products",y=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={query:"",results:[]},n.getInfo=function(){p.a.get("".concat(v,"?api_key=").concat(f,"?keywords=[").concat(n.state.query,"]")).then(function(e){var t=e.data;n.setState({results:t.data})})},n.handleInputChange=function(){n.setState({query:n.search.value},function(){n.state.query&&n.state.query.length>1&&n.state.query.length%2===0&&n.getInfo()})},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",null,r.a.createElement("input",{placeholder:"Search for...",ref:function(t){return e.search=t},onChange:this.handleInputChange}),r.a.createElement(d,{results:this.state.results}))}}]),t}(a.Component),b=n(12),g={width:"100%",height:"50%"},E=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(b.Map,{google:this.props.google,zoom:14,style:g,initialCenter:{lat:-1.2884,lng:36.8233}})}}]),t}(a.Component),O=Object(b.GoogleApiWrapper)({apiKey:"AIzaSyCke5lTqeM0OrMmDAVkzdzMY02dbvD_q8M"})(E),j=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"main-container"},r.a.createElement("div",{className:"nav-container"},r.a.createElement("nav",{className:"nav"},r.a.createElement("div",{className:"title"},"Localize"))),r.a.createElement("div",{className:"search"},r.a.createElement(y,null)),r.a.createElement("div",{className:"map"},r.a.createElement(O,null)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.e6723d8b.chunk.js.map