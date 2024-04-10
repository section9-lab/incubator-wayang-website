"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[6977],{9283:(n,e,a)=>{a.r(e),a.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var t=a(5893),s=a(1151);const o={slug:"wayang-python-api",title:"Pywayang - Apache Wayang's Python API",authors:["juripetersen"],tags:["wayang","python"]},i="Pywayang - Apache Wayang's Python API",r={permalink:"/blog/wayang-python-api",source:"@site/blog/2024-04-09-python-api.md",title:"Pywayang - Apache Wayang's Python API",description:"In the vast landscape of data processing, efficiency and flexibility are",date:"2024-04-09T00:00:00.000Z",formattedDate:"April 9, 2024",tags:[{label:"wayang",permalink:"/blog/tags/wayang"},{label:"python",permalink:"/blog/tags/python"}],readingTime:3.815,hasTruncateMarker:!0,authors:[{name:"Juri Petersen",title:"Apache Committer",url:"https://github.com/juripetersen",imageURL:"https://avatars.githubusercontent.com/u/43411515?v=4",key:"juripetersen"}],frontMatter:{slug:"wayang-python-api",title:"Pywayang - Apache Wayang's Python API",authors:["juripetersen"],tags:["wayang","python"]},unlisted:!1,nextItem:{title:"Apache Kafka meets Apache Wayang - Part 3",permalink:"/blog/kafka-meets-wayang-3"}},c={authorsImageUrls:[void 0]},p=[{value:"Expanding Apache Wayang&#39;s APIs",id:"expanding-apache-wayangs-apis",level:2}];function l(n){const e={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.p,{children:"In the vast landscape of data processing, efficiency and flexibility are\nimportant. However, navigating through a multitude of tools and\nlanguages often is a major inconvenience.\nApache Wayang's upcoming Python API will allow you to seamlessly\norchestrate data processing tasks without ever leaving the comfort\nof Python, irrespective of the underlying framework written in Java."}),"\n",(0,t.jsx)(e.h2,{id:"expanding-apache-wayangs-apis",children:"Expanding Apache Wayang's APIs"}),"\n",(0,t.jsx)(e.p,{children:"Apache Wayang's architecture decouples the process of planning from the\nresulting execution, allowing users to specify platform agnostic plans\nthrough the provided APIs."}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("img",{width:"75%",alt:"wayang stack",src:"/img/architecture/wayang-stack.png"}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsxs)(e.p,{children:["Python's popularity and convenience for data\nprocessing workloads makes it an obvious candidate for a desired API.\nPrevious APIs, such as the Scala API ",(0,t.jsx)(e.code,{children:"wayang-api-scala-java"})," benefited\nfrom the interoperability of Java and Scala that allows to reuse objects\nfrom other languages to provide new interfaces. Accessing JVM objects in\nPython is possible through several libraries, but in doing so,\nfuture APIs in other programming languages would need similar libraries and\nimplementations in order to exist. As a contrast to that, providing an\nAPI within Apache Wayang that receives input plans from any source and\nexecutes them within allows to create plans and submit them in any\nprogramming language. The following figure shows the architecture of ",(0,t.jsx)(e.code,{children:"pywayang"}),":"]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("img",{width:"75%",alt:"pywayang stack",src:"/img/architecture/pywayang.png"}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsxs)(e.p,{children:["The Python API allows users to specify WayangPlans with UDFs in Python.\n",(0,t.jsx)(e.code,{children:"pywayang"})," then serializes the UDFs and constructs the WayangPlan in\nJSON format, preparing it to be sent to Apache Wayang's JSON API.\nWhen receiving a valid JSON plan, the JSON API uses the optimizer to\nconstruct an execution plan. However, since UDFs are defined in Python\nand thus need to be executed in Python as well, an operators function needs to be\nwrapped into a ",(0,t.jsx)(e.code,{children:"WrappedPythonFunction"}),":"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-scala",children:"val mapOperator = new MapPartitionsOperator[Input, Output](\n  new MapPartitionsDescriptor[Input, Output](\n    new WrappedPythonFunction[Input, Output](\n      ByteString.copyFromUtf8(udf)\n    ),\n    classOf[Input],\n    classOf[Output],\n  )\n)\n"})}),"\n",(0,t.jsxs)(e.p,{children:["This wrapped functional descriptor allows to handle execution of\nUDFs in Python through a socket connection with the ",(0,t.jsx)(e.code,{children:"pywayang"})," worker.\nInput data is sourced from the platform chosen by the optimizer and Apache\nWayang handles routing the output data to the next operator."]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(e.p,{children:"A new API in any programming languages would have\nto specify two things:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"A way to create plans that conform to a JSON format specified in the\nWayang JSON API."}),"\n",(0,t.jsxs)(e.li,{children:["A ",(0,t.jsx)(e.code,{children:"worker"})," that handles encoding and decoding of user defined\nfunctions (UDFs), as they need to\nbe executed on iterables in their respective language.\nAfter that, the API can be added as a module in Wayang, so that\noperators will be wrapped and UDFs can be executed in the desired\nprogramming language."]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},1151:(n,e,a)=>{a.d(e,{Z:()=>r,a:()=>i});var t=a(7294);const s={},o=t.createContext(s);function i(n){const e=t.useContext(o);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),t.createElement(o.Provider,{value:e},n.children)}}}]);