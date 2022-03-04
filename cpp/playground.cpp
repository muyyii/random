// HOW MACROS WORK
// 1. Start the Macro
// 2. DO IT 
// 3. STOP 
// 4. PLAY

namespace JSC {
#ifdef HEAP_ALLOC_TRACING
	if (JSC::Options::HeapSampling){
		JSGlobalData& globalData = exec->globalData();
		globalData.recordHeapSample(activation->cost(globalData), "Activation");
	}
#endif
}
