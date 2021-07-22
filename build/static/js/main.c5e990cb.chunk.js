(this["webpackJsonpcrypto-portfolio-binance"]=this["webpackJsonpcrypto-portfolio-binance"]||[]).push([[0],{107:function(t,e,a){},123:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(9),c=a.n(i),o=(a(107),a(164)),s=a(165),l=a(153),u=a(154),d=a(151),j=a(155),b=a(2),m=Object(d.a)((function(t){return{appBar:{zIndex:t.zIndex.drawer+1,marginBottom:"20px",paddingBottom:"10px"},toolBar:{justifyContent:"center"}}}));function f(){var t=m();return Object(b.jsx)(l.a,{position:"relative",className:t.appBar,children:Object(b.jsx)(u.a,{className:t.toolBar,children:Object(b.jsxs)("div",{style:{textAlign:"center"},children:[Object(b.jsx)(j.a,{variant:"h3",children:" Crypto Portfolio"}),Object(b.jsxs)(j.a,{variant:"h6",children:["Keep track of your coins. Add coins, average the cost.",Object(b.jsx)("br",{}),' Works for the currency pair "the name of your coin" / BUSD. Prices are pulled from the Binance exchange.']})]})})})}var x=a(28),h=a.n(x),y=a(49),O=a(11),p=a(50),N=a(62),v=a(29),C=a(81),g=a(52);function P(t){return fetch("https://www.binance.com/api/v3/ticker/price?symbol=".concat(t,"BUSD")).then((function(t){return t.json()})).catch((function(t){console.log("error",t)}))}var q,S=a(65);var w=Object(g.b)("mainTable/getCoinPrice",function(){var t=Object(y.a)(h.a.mark((function t(e){var a,n,r,i,c,o;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a={},n=Object(C.a)(e),t.prev=2,n.s();case 4:if((r=n.n()).done){t.next=14;break}return i=r.value,t.next=8,P(i.coinName);case 8:(c=t.sent).symbol=c.symbol.substring(0,c.symbol.indexOf("BUSD")),o=+c.price,a[c.symbol]=o.toFixed(2);case 12:t.next=4;break;case 14:t.next=19;break;case 16:t.prev=16,t.t0=t.catch(2),n.e(t.t0);case 19:return t.prev=19,n.f(),t.finish(19);case 22:return t.abrupt("return",a);case 23:case"end":return t.stop()}}),t,null,[[2,16,19,22]])})));return function(e){return t.apply(this,arguments)}}()),B={userCoins:function(){var t=function(){try{var t=localStorage.getItem("userCoins");if(null===t)return;return JSON.parse(t)}catch(e){return void console.warn(e)}}();return t||[]}(),calculatedCoinsData:null,portfolioStatus:null,status:"idle"},D=Object(g.c)({name:"mainTable",initialState:B,reducers:{addCoin:function(t,e){var a=e.payload,n={coinName:a.coinName,quantity:+a.quantity,startPrice:+a.startPrice};t.userCoins=[].concat(Object(v.a)(t.userCoins),[n]),localStorage.setItem("userCoins",JSON.stringify(t.userCoins))},averageCoinCost:function(t,e){var a=e.payload,n=a.values,r=a.coins.map((function(t){if(t.coinName===n.coinName){var e={};return e.coinName=n.coinName,e.quantity=t.quantity+ +n.quantity,e.startPrice=(+n.quantity*+n.startPrice+t.quantity*t.startPrice)/(+n.quantity+t.quantity),e}return t}));t.userCoins=Object(v.a)(r),localStorage.setItem("userCoins",JSON.stringify(t.userCoins))},sellCoins:function(t,e){var a=e.payload,n=a.values,r=a.coins.map((function(t){if(t.coinName===n.coinName){var e={};return e.coinName=n.coinName,e.quantity=t.quantity-+n.quantity,e.startPrice=t.startPrice,e}return t}));t.userCoins=Object(v.a)(r),localStorage.setItem("userCoins",JSON.stringify(t.userCoins))},delCoin:function(t,e){var a=e.payload,n=a.values,r=a.coins,i=Object(v.a)(r);i.splice(i.indexOf(i.find((function(t){return t.coinName===n.coinName})),0),1),t.userCoins=Object(v.a)(i),localStorage.setItem("userCoins",JSON.stringify(t.userCoins))},caclCoinsData:function(t,e){var a=e.payload,n=a.coins,r=a.coinsPrice;if(n&&r){var i=[];n.forEach((function(t,e){var a={number:e,coinName:t.coinName,quantity:t.quantity.toFixed(4),startPrice:+t.startPrice+" $",startCost:(t.quantity*t.startPrice).toFixed(2)+" $",currentPrice:r[t.coinName]+" $",currentCost:(t.quantity*r[t.coinName]).toFixed(2)+" $",profitDollar:(t.quantity*r[t.coinName]-t.quantity*t.startPrice).toFixed(2)+" $",profitPercent:((t.quantity*r[t.coinName]-t.quantity*t.startPrice)/(t.quantity*t.startPrice)*100).toFixed(0)+" %"};i.push(a)})),t.calculatedCoinsData=[].concat(i)}},caclPortfolioStatus:function(t,e){var a=e.payload,n=a.coins,r=a.coinsPrice;if(n&&r){var i=[];n.forEach((function(t,e){var a={number:e,coinName:t.coinName,quantity:t.quantity.toFixed(4),startPrice:+t.startPrice,startCost:(t.quantity*t.startPrice).toFixed(2),currentPrice:r[t.coinName],currentCost:(t.quantity*r[t.coinName]).toFixed(2),profitDollar:(t.quantity*r[t.coinName]-t.quantity*t.startPrice).toFixed(2),profitPercent:((t.quantity*r[t.coinName]-t.quantity*t.startPrice)/(t.quantity*t.startPrice)*100).toFixed(0)};i.push(a)}));var c={startCost:0,currentCost:0,profitDollar:0,profitPercent:0};i.forEach((function(t){var e=t.startCost,a=t.currentCost,n=t.profitDollar;c.startCost=+c.startCost+ +e,c.currentCost=+c.currentCost+ +a,c.profitDollar=+c.profitDollar+ +n})),c=Object(N.a)(Object(N.a)({},c),{},{profitPercent:c.profitDollar/c.startCost}),t.portfolioStatus=Object(N.a)({},c)}},downloadData:function(){var t=localStorage.getItem("userCoins"),e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t)),a=document.createElement("a");a.setAttribute("href",e),a.setAttribute("download","test.json"),document.body.appendChild(a),a.click(),a.remove()},uploadData:function(t,e){t.userCoins=Object(v.a)(e.payload)},loadDemoData:function(t){localStorage.setItem("userCoins",S);var e=JSON.parse(S);t.userCoins=Object(v.a)(e)},clearAllData:function(t){localStorage.setItem("userCoins",[]),t.userCoins=[]}},extraReducers:(q={},Object(p.a)(q,w.pending,(function(t){t.status="loading"})),Object(p.a)(q,w.fulfilled,(function(t,e){t.status="idle",t.coinsPrice=e.payload})),q)}),A=D.actions,k=A.addCoin,I=A.caclCoinsData,E=A.caclPortfolioStatus,T=A.averageCoinCost,F=A.sellCoins,R=A.delCoin,$=A.downloadData,J=A.uploadData,H=A.loadDemoData,L=A.clearAllData,U=function(t){return t.mainTable.userCoins},W=function(t){return t.mainTable.coinsPrice},z=function(t){return t.mainTable.calculatedCoinsData},V=function(t){return t.mainTable.portfolioStatus},X=D.reducer,M=a(61),G=a(168),Q=a(161),K=a(156),Z=a(157),Y=a(167),_=Object(d.a)((function(t){return{root:{"& > *":{margin:t.spacing(1),width:"25ch",display:"flex",flexDirection:"column"}},card:{minHeight:"327px"},cardContent:{textAlign:"center"},submitButton:{marginTop:"20px"},form:{display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"247px"},textField:{width:"100%"},errorBox:{color:"red",textAlign:"left",fontSize:"12px"}}}));function tt(){var t=Object(O.b)(),e=Object(O.c)(U),a=function(){var t=Object(y.a)(h.a.mark((function t(e){var a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,P(e);case 2:return a=t.sent,t.abrupt("return",!a);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),n=_();return Object(b.jsx)(K.a,{className:n.card,children:Object(b.jsxs)(Z.a,{className:n.cardContent,children:[Object(b.jsx)(j.a,{variant:"h6",color:"textSecondary",gutterBottom:!0,children:"Add New Coin"}),Object(b.jsx)(M.a,{initialValues:{coinName:"",quantity:"",startPrice:""},validate:function(){var t=Object(y.a)(h.a.mark((function t(n){var r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r={},n.coinName){t.next=5;break}r.coinName="Required",t.next=17;break;case 5:if(/(^[A-Z]+$)/.test(n.coinName)){t.next=9;break}r.coinName="Allows only capital letters",t.next=17;break;case 9:if(!e.find((function(t){return t.coinName===n.coinName}))){t.next=13;break}r.coinName="This coin already exist",t.next=17;break;case 13:return t.next=15,a(n.coinName);case 15:if(!t.sent){t.next=17;break}r.coinName="".concat(n.coinName,"/BUSD doesn't exists on the Binance");case 17:return n.quantity?/(^[0-9\.]+$)/g.test(n.quantity)||(r.quantity="Allows only digits"):r.quantity="Required",n.startPrice?/(^[0-9\.]+$)/g.test(n.startPrice)||(r.startPrice="Allows only digits"):r.startPrice="Required",t.abrupt("return",r);case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),onSubmit:function(e,a){var n=a.setSubmitting;t(k(e)),n(!1)},children:function(t){var e=t.values,a=t.errors,r=t.touched,i=t.handleChange,c=t.handleBlur,o=t.handleSubmit,s=t.isSubmitting;return Object(b.jsxs)("form",{onSubmit:o,className:n.form,autoComplete:"off",children:[Object(b.jsxs)(Y.a,{children:[Object(b.jsx)(G.a,{type:"text",name:"coinName",onChange:i,onBlur:c,label:"Coin name",value:e.coinName,className:n.textField}),a.coinName&&r.coinName&&Object(b.jsx)("div",{className:n.errorBox,children:a.coinName}),Object(b.jsx)(G.a,{type:"text",name:"quantity",onChange:i,onBlur:c,label:"Quantity",value:e.quantity,className:n.textField}),a.quantity&&r.quantity&&Object(b.jsx)("div",{className:n.errorBox,children:a.quantity}),Object(b.jsx)(G.a,{type:"text",name:"startPrice",onChange:i,onBlur:c,label:"Purchase price",value:e.startPrice,className:n.textField}),a.startPrice&&r.startPrice&&Object(b.jsx)("div",{className:n.errorBox,children:a.startPrice})]}),Object(b.jsx)(Q.a,{type:"submit",disabled:s,variant:"contained",color:"primary",className:n.submitButton,children:"Submit"})]})}})]})})}var et=a(16),at=a(166),nt=a(171),rt=a(170),it=a(160),ct=Object(d.a)((function(t){return{root:{"& > *":{margin:t.spacing(1),width:"25ch",display:"flex",flexDirection:"column"}},card:{minHeight:"327px"},cardContent:{textAlign:"center"},submitButton:{marginTop:"20px"},form:{display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"246px"},dropdown:{},errorBox:{color:"red",textAlign:"left",fontSize:"12px"}}}));function ot(){var t=Object(O.b)(),e=ct(),a=Object(O.c)(U),r=Object(n.useState)(),i=Object(et.a)(r,2),c=i[0],o=i[1],s=Object(n.useState)(),l=Object(et.a)(s,2),u=l[0];l[1];return Object(b.jsx)(K.a,{className:e.card,children:Object(b.jsxs)(Z.a,{className:e.cardContent,children:[Object(b.jsx)(j.a,{variant:"h6",color:"textSecondary",gutterBottom:!0,children:"Buy/Sell/Delete coins"}),Object(b.jsx)(M.a,{initialValues:{selectedAction:"",coinName:"",quantity:"",startPrice:""},validate:function(t){var e={};return t.selectedAction||(e.selectedAction="Required"),t.coinName||(e.coinName="Required"),"buyCoins"===c||"sellCoins"===c&&!t.quantity?e.quantity="Required":("buyCoins"===c||"sellCoins"===c&&!/(^[0-9\.]+$)/g.test(t.quantity))&&(e.quantity="Allows only digits"),"buyCoins"!==c||t.startPrice?"buyCoins"!==c||/(^[0-9\.]+$)/g.test(t.startPrice)||(e.startPrice="Allows only digits"):e.startPrice="Required",e},onSubmit:function(e,n){var r=n.setSubmitting;switch(setTimeout((function(){r(!1)}),400),e.selectedAction){case"buyCoins":t(T({values:e,coins:a}));break;case"sellCoins":t(F({values:e,coins:a}));break;case"deleteCoins":t(R({values:e,coins:a}));break;default:console.log("Sorry, we are out of ".concat(e.selectedAction,"."))}},children:function(t){var n=t.values,r=t.errors,i=t.touched,s=t.handleChange,l=t.handleBlur,d=t.handleSubmit,j=t.isSubmitting;return Object(b.jsxs)("form",{onSubmit:d,className:e.form,noValidate:!0,autoComplete:"off",children:[Object(b.jsxs)(Y.a,{style:{display:"flex",flexDirection:"column",height:"192px"},children:[Object(b.jsxs)(it.a,{children:[Object(b.jsx)(rt.a,{children:"Select action:"}),Object(b.jsxs)(at.a,{onChange:function(t){s(t),o(t.target.value)},className:e.dropdown,value:c,name:"selectedAction",children:[Object(b.jsx)(nt.a,{value:"buyCoins",children:Object(b.jsx)("em",{children:"Buy more coins"})}),Object(b.jsx)(nt.a,{value:"sellCoins",children:Object(b.jsx)("em",{children:"Sell coins"})}),Object(b.jsx)(nt.a,{value:"deleteCoins",children:Object(b.jsx)("em",{children:"Delete"})})]})]}),r.selectedAction&&i.selectedAction&&Object(b.jsx)("div",{className:e.errorBox,children:r.selectedAction}),Object(b.jsxs)(it.a,{children:[Object(b.jsx)(rt.a,{children:"Choose your coin:"}),Object(b.jsx)(at.a,{onChange:s,className:e.dropdown,value:u,name:"coinName",children:a.map((function(t){return Object(b.jsx)(nt.a,{value:t.coinName,children:Object(b.jsx)("em",{children:t.coinName})})}))})]}),r.coinName&&i.coinName&&Object(b.jsx)("div",{className:e.errorBox,children:r.coinName}),"buyCoins"===c||"sellCoins"===c?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(G.a,{type:"text",name:"quantity",onChange:s,onBlur:l,label:"Quantity",value:n.quantity}),r.quantity&&i.quantity&&Object(b.jsx)("div",{className:e.errorBox,children:r.quantity})]}):null,"buyCoins"===c?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(G.a,{type:"text",name:"startPrice",onChange:s,onBlur:l,label:"Purchase price",value:n.startPrice}),r.startPrice&&i.startPrice&&Object(b.jsx)("div",{className:e.errorBox,children:r.startPrice})]}):null]}),Object(b.jsx)(Q.a,{type:"submit",disabled:j,variant:"contained",color:"primary",className:e.submitButton,children:"Submit"})]})}})]})})}var st=a(162),lt=Object(d.a)((function(t){return{root:{"& > *":{margin:t.spacing(1),width:"25ch",display:"flex",flexDirection:"column"}},card:{minHeight:"327px"},cardContent:{textAlign:"center",height:"100%"},portfolioRow:{display:"flex",justifyContent:"space-between",marginBottom:"20px"},spinnerBox:{height:"202px",display:"flex",justifyContent:"center",alignItems:"center"}}}));function ut(){var t=lt(),e=Object(O.b)(),a=Object(O.c)(U),r=Object(O.c)(W),i=Object(O.c)(z),c=Object(O.c)(V),o=Object(n.useState)(null),s=Object(et.a)(o,2),l=s[0],u=s[1];Object(n.useEffect)((function(){e(E({coins:a,coinsPrice:r}))}),[i]),Object(n.useEffect)((function(){c&&u(c)}),[c]);var d=Object(n.useState)(!0),m=Object(et.a)(d,2),f=m[0],x=m[1];return Object(n.useEffect)((function(){c&&c.startCost>0&&x(!1)}),[c]),Object(b.jsx)(K.a,{className:t.card,children:Object(b.jsxs)(Z.a,{className:t.cardContent,children:[Object(b.jsx)(Y.a,{children:Object(b.jsx)(j.a,{variant:"h6",color:"textSecondary",gutterBottom:!0,children:"Portfolio Status"})}),Object(b.jsx)(Y.a,{className:!l||!a.length>0?t.spinnerBox:null,children:a.length>0?f>0?Object(b.jsx)(st.a,{}):Object(b.jsxs)(j.a,{component:"div",children:[Object(b.jsxs)(Y.a,{className:t.portfolioRow,children:[Object(b.jsx)(j.a,{variant:"body1",color:"textSecondary",children:"Total Amount Start:"}),Object(b.jsxs)(j.a,{variant:"body1",color:"textSecondary",fontWeight:"fontWeightBold",children:[l.startCost.toFixed(2),"$"]})]}),Object(b.jsxs)(Y.a,{className:t.portfolioRow,children:[Object(b.jsx)(j.a,{variant:"body1",color:"textSecondary",children:"Total Amount Current:"}),Object(b.jsxs)(j.a,{variant:"body1",color:"textSecondary",fontWeight:"fontWeightBold",children:[l.currentCost.toFixed(2),"$"]})]}),Object(b.jsxs)(Y.a,{className:t.portfolioRow,children:[Object(b.jsx)(j.a,{variant:"body1",color:"textSecondary",children:"Total profit $:"}),Object(b.jsxs)(j.a,{variant:"body1",color:"textSecondary",fontWeight:"fontWeightBold",children:[l.profitDollar.toFixed(2),"$"]})]}),Object(b.jsxs)(Y.a,{className:t.portfolioRow,children:[Object(b.jsx)(j.a,{variant:"body1",color:"textSecondary",children:"Total profit %:"}),Object(b.jsxs)(j.a,{variant:"body1",color:"textSecondary",fontWeight:800,m:1,children:[(100*l.profitPercent).toFixed(2),"%"]})]})]}):Object(b.jsx)("h3",{children:"Please add some coins to start using your wallet"})})]})})}var dt=Object(d.a)((function(t){return{root:{"& > *":{margin:t.spacing(1),width:"25ch",display:"flex",flexDirection:"column"}},card:{minHeight:"327px"},cardContent:{display:"flex",flexDirection:"column",minHeight:"287px",justifyContent:"space-between",textAlign:"center"},button:{display:"block",width:"100%"}}}));function jt(){var t=Object(O.b)(),e=dt();return Object(n.useEffect)((function(){function e(t){var e=new FileReader;e.onload=a,e.readAsText(t.target.files[0])}function a(e){var a=JSON.parse(e.target.result),n=JSON.parse(a);t(J(n)),localStorage.setItem("userCoins",a)}return document.getElementById("file").addEventListener("change",e),function(){document.getElementById("file").removeEventListener("change",e)}})),Object(b.jsx)(K.a,{className:e.card,children:Object(b.jsxs)(Z.a,{className:e.cardContent,children:[Object(b.jsx)(j.a,{variant:"h6",color:"textSecondary",children:"Data settings"}),Object(b.jsx)(Q.a,{id:"downloadAnchorElem",onClick:function(){t($())},variant:"contained",color:"primary",className:e.button,children:"Download your data"}),Object(b.jsxs)(Q.a,{component:"label",variant:"contained",color:"primary",className:e.button,children:["Upload your data",Object(b.jsx)("input",{type:"file",id:"file",accept:".json",hidden:!0})]}),Object(b.jsx)(Q.a,{onClick:function(){t(H())},variant:"contained",color:"secondary",className:e.button,children:"Load demo data"}),Object(b.jsx)(Q.a,{id:"clearStorage",onClick:function(){t(L())},variant:"contained",color:"secondary",className:e.button,children:"Clear all data"})]})})}var bt=a(84),mt=a.n(bt);function ft(){return Object(O.c)(U).map((function(t){return Object(b.jsx)(K.a,{style:{marginBottom:"20px"},children:Object(b.jsx)(Z.a,{children:Object(b.jsx)(mt.a,{symbol:"BINANCE:".concat(t.coinName,"BUSD"),width:"100%"})})})}))}var xt=a(85),ht=(a(121),a(122),a(37)),yt=a(163),Ot=Object(d.a)((function(){return{root:{"& > *":{borderRadius:"5px"},"& .ag-root-wrapper-body":{height:"100%"},"& .ag-header-cell-label":{justifyContent:"center"},"& .ag-center-cols-viewport":{overflowX:"hidden !important"}}}}));function pt(){var t=Object(O.b)(),e=Ot(),a=Object(ht.a)(),r=Object(yt.a)(a.breakpoints.down("sm")),i=Object(O.c)(U),c=Object(O.c)(W),o=Object(O.c)(z),s=Object(n.useState)(null),l=Object(et.a)(s,2),u=l[0],d=l[1],j=Object(n.useState)(null),m=Object(et.a)(j,2),f=(m[0],m[1]),x=Object(n.useState)([]),h=Object(et.a)(x,2),y=h[0],p=h[1],N=[{headerName:"\u2116",field:"number",width:50},{headerName:"Coin Name",field:"coinName"},{headerName:"Quantity",field:"quantity"},{headerName:"Start Cost",field:"startCost"},{headerName:"Start/Avarage Price",field:"startPrice"},{headerName:"Current Price",field:"currentPrice"},{headerName:"Current Cost",field:"currentCost"},{headerName:"Profit $",field:"profitDollar"},{headerName:"Profit %",field:"profitPercent"}],v=[{headerName:"Coin Name",field:"coinName"},{headerName:"Current Cost",field:"currentCost"},{headerName:"Profit $",field:"profitDollar"},{headerName:"Profit %",field:"profitPercent"}],C=Object(n.useState)(v),g=Object(et.a)(C,2),P=g[0],q=g[1];Object(n.useEffect)((function(){q(r?v:N)}),[r]),Object(n.useEffect)((function(){u&&u.refreshCells()}),[P]);var S=Object(n.useState)(!0),B=Object(et.a)(S,2),D=B[0],A=B[1];Object(n.useEffect)((function(){var e=setInterval((function(){t(w(i))}),3500);return function(){clearInterval(e)}}),[i]),Object(n.useEffect)((function(){A(!0),i&&c&&i.length===Object.keys(c).length&&(t(I({coins:i,coinsPrice:c})),A(!1))}),[i,c]),Object(n.useEffect)((function(){o&&p(o)}),[o]);return Object(n.useEffect)((function(){u&&u.sizeColumnsToFit()})),Object(n.useEffect)((function(){y&&y.length>0&&A(!1)}),[y]),Object(b.jsx)(K.a,{children:Object(b.jsx)(Z.a,{style:{textAlign:"center"},children:i.length>0?D?Object(b.jsx)(st.a,{style:{margin:"20px 0"}}):Object(b.jsx)("div",{className:"ag-theme-balham",style:{width:"100%"},children:Object(b.jsx)(xt.AgGridReact,{rowData:y,columnDefs:P,onGridReady:function(t){d(t.api),f(t.columnApi)},className:e.root})}):Object(b.jsx)("h1",{children:"Please add some coins to start using your wallet"})})})}var Nt=function(){return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(f,{}),Object(b.jsx)(o.a,{children:Object(b.jsxs)(s.a,{container:!0,spacing:3,children:[Object(b.jsx)(s.a,{item:!0,xs:12,lg:3,children:Object(b.jsx)(ut,{})}),Object(b.jsx)(s.a,{item:!0,xs:12,lg:3,children:Object(b.jsx)(tt,{})}),Object(b.jsx)(s.a,{item:!0,xs:12,lg:3,children:Object(b.jsx)(ot,{})}),Object(b.jsx)(s.a,{item:!0,xs:12,lg:3,children:Object(b.jsx)(jt,{})}),Object(b.jsx)(s.a,{item:!0,xs:12,children:Object(b.jsx)(pt,{})}),Object(b.jsx)(s.a,{item:!0,xs:12,children:Object(b.jsx)(ft,{})})]})})]})},vt=Object(g.a)({reducer:{mainTable:X}});c.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(O.a,{store:vt,children:Object(b.jsx)(Nt,{})})}),document.getElementById("root"))},65:function(t){t.exports=JSON.parse('"[{\\"coinName\\":\\"BTC\\",\\"quantity\\":0.007489,\\"startPrice\\":37351},{\\"coinName\\":\\"ETH\\",\\"quantity\\":0.05226765,\\"startPrice\\":3253.54},{\\"coinName\\":\\"BNB\\",\\"quantity\\":0.119,\\"startPrice\\":632},{\\"coinName\\":\\"ADA\\",\\"quantity\\":37.47,\\"startPrice\\":1.99},{\\"coinName\\":\\"DOGE\\",\\"quantity\\":55.4,\\"startPrice\\":0.7},{\\"coinName\\":\\"XRP\\",\\"quantity\\":138.04,\\"startPrice\\":1.05},{\\"coinName\\":\\"BCH\\",\\"quantity\\":0.0368,\\"startPrice\\":1366.42},{\\"coinName\\":\\"LTC\\",\\"quantity\\":0.3855,\\"startPrice\\":257.56},{\\"coinName\\":\\"UNI\\",\\"quantity\\":0.978,\\"startPrice\\":39.5},{\\"coinName\\":\\"LINK\\",\\"quantity\\":1.744,\\"startPrice\\":40.8},{\\"coinName\\":\\"XLM\\",\\"quantity\\":73.1,\\"startPrice\\":0.68},{\\"coinName\\":\\"SOL\\",\\"quantity\\":3.188,\\"startPrice\\":31.37},{\\"coinName\\":\\"AAVE\\",\\"quantity\\":0.0455,\\"startPrice\\":658},{\\"coinName\\":\\"XMR\\",\\"quantity\\":0.08,\\"startPrice\\":459.19},{\\"coinName\\":\\"IOTA\\",\\"quantity\\":16.84,\\"startPrice\\":1.9165},{\\"coinName\\":\\"AVAX\\",\\"quantity\\":0.57,\\"startPrice\\":36.7},{\\"coinName\\":\\"ZIL\\",\\"quantity\\":137,\\"startPrice\\":0.21},{\\"coinName\\":\\"HOT\\",\\"quantity\\":1363.6,\\"startPrice\\":0.01},{\\"coinName\\":\\"INJ\\",\\"quantity\\":1.129,\\"startPrice\\":17.69},{\\"coinName\\":\\"DNT\\",\\"quantity\\":145.8,\\"startPrice\\":0.21},{\\"coinName\\":\\"DIA\\",\\"quantity\\":5.5,\\"startPrice\\":3.62},{\\"coinName\\":\\"MATIC\\",\\"quantity\\":29,\\"startPrice\\":2.27}]"')}},[[123,1,2]]]);
//# sourceMappingURL=main.c5e990cb.chunk.js.map