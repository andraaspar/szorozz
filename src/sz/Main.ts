/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Arrkup.ts'/>
/// <reference path='../../lib/illa/Event.ts'/>
/// <reference path='../../lib/illa/EventHandler.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>

/// <reference path='../../lib/berek/Widget.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

/// <reference path='AppcacheModel.ts'/>
/// <reference path='LanguageEnglish.ts'/>
/// <reference path='LanguageHungarian.ts'/>
/// <reference path='LanguageInterface.ts'/>
/// <reference path='SzorozzModel.ts'/>
/// <reference path='SzorozzPresenter.ts'/>

module sz {
	export class Main {
		
		private static instance = new Main();
		
		private language: LanguageInterface;
		
		private appcacheModel: AppcacheModel;
		
		private szorozzPresenter: SzorozzPresenter;
		
		constructor() {
			this.chooseLanguage();
			
			jQuery(illa.bind(this.onDomLoaded, this));
		}
		
		onDomLoaded(): void {
			illa.Log.info('DOM loaded.');
			
			this.appcacheModel = new AppcacheModel();
			this.appcacheModel.addEventCallback(AppcacheModel.EVENT_READY, this.onAppcacheReady, this);
			this.appcacheModel.init();
		}
		
		protected onAppcacheReady(e: illa.Event): void {
			illa.Log.info('Appcache ready.');
			
			this.szorozzPresenter = new SzorozzPresenter();
		}
		
		chooseLanguage(): void {
			var detected = '';
			try {
				detected = navigator['languages'] ? navigator['languages'][0] : (navigator.language || navigator.userLanguage);
			} catch (e) {};
			detected = (detected + '').toLowerCase();
			var detectedArr = detected.split(/[-_]/);
			
			switch (detectedArr[0]) {
				case 'hu':
					this.language = new LanguageHungarian();
					break;
				default:
					this.language = new LanguageEnglish();
			}
		}
		
		static getLanguage(): LanguageInterface {
			return this.instance.language;
		}
		
		static setLanguage(v: LanguageInterface): void {
			this.instance.language = v;
			jQuery('body').empty();
			this.instance.szorozzPresenter = new SzorozzPresenter();
		}
	}
}