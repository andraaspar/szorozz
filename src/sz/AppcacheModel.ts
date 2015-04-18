

module sz {
	export class AppcacheModel extends illa.EventHandler {
		
		static EVENT_READY = 'sz_model_AppcacheModel_EVENT_READY';
		
		private supportsAppCache = !!window.applicationCache;
		
		private hasUpdateError = false;
		
		constructor() {
			super();
		}
		
		init(): void {
			if (this.supportsAppCache) {
				window.applicationCache.addEventListener('cached', illa.bind(this.onCached, this));
				window.applicationCache.addEventListener('noupdate', illa.bind(this.onCached, this));
				window.applicationCache.addEventListener('updateready', illa.bind(this.onUpdateReady, this));
				window.applicationCache.addEventListener('error', illa.bind(this.onCached, this));
				window.applicationCache.addEventListener('obsolete', illa.bind(this.onUpdateReady, this));
			} else {
				this.onAfterCache();
			}
		}
		
		onCached(e: Event): void {
			this.onAfterCache();
		}
		
		onNoUpdate(e: Event): void {
			this.onAfterCache();
		}
		
		onUpdateReady(e: Event): void {
			window.location.reload();
		}
		
		onError(e: Event): void {
			this.hasUpdateError = true;
			this.onAfterCache();
		}
		
		onAfterCache(): void {
			new illa.Event(AppcacheModel.EVENT_READY, this).dispatch();
		}
		
		getHasUpdateError() { return this.hasUpdateError }
		getSupportsAppcache() { return this.supportsAppCache }
	}
}