"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[3088],{8710:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var i=t(5893),a=t(1151);const o={title:"Usage Examples",sidebar_position:5,id:"examples"},r="Guide to Development and Usage with Apache Wayang (incubating)",s={id:"guide/examples",title:"Usage Examples",description:"\x3c!--",source:"@site/docs/guide/usage-examples.md",sourceDirName:"guide",slug:"/guide/examples",permalink:"/docs/guide/examples",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"Usage Examples",sidebar_position:5,id:"examples"},sidebar:"guideSidebar",previous:{title:"API documentation",permalink:"/docs/guide/api-documentation"},next:{title:"Developing in Wayang",permalink:"/docs/guide/developing-in-wayang"}},l={},c=[{value:"Example 1: Machine Learning for query optimization in Apache Wayang",id:"example-1-machine-learning-for-query-optimization-in-apache-wayang",level:2}];function u(n){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"guide-to-development-and-usage-with-apache-wayang-incubating",children:"Guide to Development and Usage with Apache Wayang (incubating)"}),"\n",(0,i.jsx)(e.p,{children:"This section provides a set of examples to illustrate how to use Apache Wayang for different tasks."}),"\n",(0,i.jsx)(e.h2,{id:"example-1-machine-learning-for-query-optimization-in-apache-wayang",children:"Example 1: Machine Learning for query optimization in Apache Wayang"}),"\n",(0,i.jsxs)(e.p,{children:["Apache Wayang can be customized with concrete\nimplementations of the ",(0,i.jsx)(e.code,{children:"EstimatableCost"})," interface in order to optimize\nfor a desired metric.  The implementation can be enabled by providing it\nto a ",(0,i.jsx)(e.code,{children:"Configuration"}),"."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:"public class CustomEstimatableCost implements EstimatableCost {\n    /* Provide concrete implementations to match desired cost function(s)\n     * by implementing the interface in this class.\n     */\n}\npublic class WordCount {\n    public static void main(String[] args) {\n        /* Create a Wayang context and specify the platforms Wayang will consider */\n        Configuration config = new Configuration();\n        /* Provision of a EstimatableCost that implements the interface.*/\n        config.setCostModel(new CustomEstimatableCost());\n        WayangContext wayangContext = new WayangContext(config)\n                .withPlugin(Java.basicPlugin())\n                .withPlugin(Spark.basicPlugin());\n        /*... omitted */\n    }\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"In combination with an encoding scheme and a third party package to load\nML models, the following example shows how to predict runtimes of query\nexecution plans runtimes in Apache Wayang (incubating):"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'public class MLCost implements EstimatableCost {\n    public EstimatableCostFactory getFactory() {\n        return new Factory();\n    }\n\n    public static class Factory implements EstimatableCostFactory {\n        @Override public EstimatableCost makeCost() {\n            return new MLCost();\n        }\n    }\n\n    @Override public ProbabilisticDoubleInterval getEstimate(PlanImplementation plan, boolean isOverheadIncluded) {\n        try {\n            Configuration config = plan\n                .getOptimizationContext()\n                .getConfiguration();\n            OrtMLModel model = OrtMLModel.getInstance(config);\n\n            return ProbabilisticDoubleInterval.ofExactly(\n                model.runModel(OneHotEncoder.encode(plan))\n            );\n        } catch(Exception e) {\n            return ProbabilisticDoubleInterval.zero;\n        }\n    }\n\n    @Override public ProbabilisticDoubleInterval getParallelEstimate(PlanImplementation plan, boolean isOverheadIncluded) {\n        try {\n            Configuration config = plan\n                .getOptimizationContext()\n                .getConfiguration();\n            OrtMLModel model = OrtMLModel.getInstance(config);\n\n            return ProbabilisticDoubleInterval.ofExactly(\n                model.runModel(OneHotEncoder.encode(plan))\n            );\n        } catch(Exception e) {\n            return ProbabilisticDoubleInterval.zero;\n        }\n    }\n\n    /** Returns a squashed cost estimate. */\n    @Override public double getSquashedEstimate(PlanImplementation plan, boolean isOverheadIncluded) {\n        try {\n            Configuration config = plan\n                .getOptimizationContext()\n                .getConfiguration();\n            OrtMLModel model = OrtMLModel.getInstance(config);\n\n            return model.runModel(OneHotEncoder.encode(plan));\n        } catch(Exception e) {\n            return 0;\n        }\n    }\n\n    @Override public double getSquashedParallelEstimate(PlanImplementation plan, boolean isOverheadIncluded) {\n        try {\n            Configuration config = plan\n                .getOptimizationContext()\n                .getConfiguration();\n            OrtMLModel model = OrtMLModel.getInstance(config);\n\n            return model.runModel(OneHotEncoder.encode(plan));\n        } catch(Exception e) {\n            return 0;\n        }\n    }\n\n    @Override public Tuple<List<ProbabilisticDoubleInterval>, List<Double>> getParallelOperatorJunctionAllCostEstimate(PlanImplementation plan, Operator operator) {\n        List<ProbabilisticDoubleInterval> intervalList = new ArrayList<ProbabilisticDoubleInterval>();\n        List<Double> doubleList = new ArrayList<Double>();\n        intervalList.add(this.getEstimate(plan, true));\n        doubleList.add(this.getSquashedEstimate(plan, true));\n\n        return new Tuple<>(intervalList, doubleList);\n    }\n\n    public PlanImplementation pickBestExecutionPlan(\n            Collection<PlanImplementation> executionPlans,\n            ExecutionPlan existingPlan,\n            Set<Channel> openChannels,\n            Set<ExecutionStage> executedStages) {\n        final PlanImplementation bestPlanImplementation = executionPlans.stream()\n                .reduce((p1, p2) -> {\n                    final double t1 = p1.getSquashedCostEstimate();\n                    final double t2 = p2.getSquashedCostEstimate();\n                    return t1 < t2 ? p1 : p2;\n                })\n                .orElseThrow(() -> new WayangException("Could not find an execution plan."));\n        return bestPlanImplementation;\n    }\n}\n'})}),"\n",(0,i.jsxs)(e.p,{children:["Third-party packages such as ",(0,i.jsx)(e.code,{children:"OnnxRuntime"})," can be used to load\npre-trained ",(0,i.jsx)(e.code,{children:".onnx"})," files that contain desired ML models."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-java",children:'public class OrtMLModel {\n\n    private static OrtMLModel INSTANCE;\n\n    private OrtSession session;\n    private OrtEnvironment env;\n\n    private final Map<String, OnnxTensor> inputMap = new HashMap<>();\n    private final Set<String> requestedOutputs = new HashSet<>();\n\n    public static OrtMLModel getInstance(Configuration configuration) throws OrtException {\n        if (INSTANCE == null) {\n            INSTANCE = new OrtMLModel(configuration);\n        }\n\n        return INSTANCE;\n    }\n\n    private OrtMLModel(Configuration configuration) throws OrtException {\n        this.loadModel(configuration.getStringProperty("wayang.ml.model.file"));\n    }\n\n    public void loadModel(String filePath) throws OrtException {\n        if (this.env == null) {\n            this.env = OrtEnvironment.getEnvironment();\n        }\n\n        if (this.session == null) {\n            this.session = env.createSession(filePath, new OrtSession.SessionOptions());\n        }\n    }\n\n    public void closeSession() throws OrtException {\n        this.session.close();\n        this.env.close();\n    }\n\n    /**\n     * @param encodedVector\n     * @return NaN on error, and a predicted cost on any other value.\n     * @throws OrtException\n     */\n    public double runModel(Vector<Long> encodedVector) throws OrtException {\n        double costPrediction;\n\n        OnnxTensor tensor = OnnxTensor.createTensor(env, encodedVector);\n        this.inputMap.put("input", tensor);\n        this.requestedOutputs.add("output");\n\n        BiFunction<Result, String, Double> unwrapFunc = (r, s) -> {\n            try {\n                return ((double[]) r.get(s).get().getValue())[0];\n            } catch (OrtException e) {\n                return Double.NaN;\n            }\n        };\n\n        try (Result r = session.run(inputMap, requestedOutputs)) {\n            costPrediction = unwrapFunc.apply(r, "output");\n        }\n\n        return costPrediction;\n    }\n}\n'})})]})}function d(n={}){const{wrapper:e}={...(0,a.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}},1151:(n,e,t)=>{t.d(e,{Z:()=>s,a:()=>r});var i=t(7294);const a={},o=i.createContext(a);function r(n){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:r(n.components),i.createElement(o.Provider,{value:e},n.children)}}}]);