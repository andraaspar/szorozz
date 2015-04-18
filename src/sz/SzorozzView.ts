

module sz {
	export class SzorozzView extends berek.Widget {
		
		countOut: jQuery.IInstance;
		feedbackOut: jQuery.IInstance;
		questionOut: jQuery.IInstance;
		resultIn: jQuery.IInstance;
		doneButton: jQuery.IInstance;
		changeLanguageButton: jQuery.IInstance;
		
		constructor(jq: jQuery.IInstance) {
			super(jq);
			
			this.getJQuery().html(illa.Arrkup.createString([
				['div', {'class': 'sz-wrapper'},
					['span', {'class': 'sz-count', 'data-berek-widget-part': 'countOut'}]
				],
				['div', {'class': 'sz-wrapper'},
					['span', {'class': 'sz-question', 'data-berek-widget-part': 'questionOut'}],
					' ',
					['input/', {'class': 'sz-input', 'type': 'number', 'data-berek-widget-part': 'resultIn'}],
					' ',
					['button', {'class': 'sz-button', 'type': 'button', 'data-berek-widget-part': 'doneButton'},
						Main.getLanguage().doneButtonLabel
					]
				],
				['div', {'class': 'sz-wrapper'},
					['span', {'class': 'sz-feedback', 'data-berek-widget-part': 'feedbackOut'}]
				],
				['hr/'],
				['div', {'class': 'sz-wrapper'},
					['span', {'class': 'sz-remark'}, Main.getLanguage().remark]
				],
				['div', {'class': 'sz-wrapper sz-extra-margin'},
					['button', {'class': 'sz-button', 'type': 'button', 'data-berek-widget-part': 'changeLanguageButton'},
						Main.getLanguage().changeLanguageButtonLabel
					]
				],
				['div', {'class': 'sz-wrapper'},
					['span', {'class': 'sz-remark'}, Main.getLanguage().developedBy, ' ',
						['a', {'href': 'https://github.com/andraaspar', 'target': '_blank'}, Main.getLanguage().developerName]
					],
					' ',
					['span', {'class': 'sz-remark'}, Main.getLanguage().sourceCode, ' ',
						['a', {'href': 'https://github.com/andraaspar/szorozz', 'target': '_blank'}, 'GitHub'],
					]
				]
			]));
			
			this.initParts();
		}
	}
}