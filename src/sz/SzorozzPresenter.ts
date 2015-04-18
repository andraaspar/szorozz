/// <reference path='SzorozzView.ts'/>

module sz {
	export class SzorozzPresenter {
		
		private szorozzModel: SzorozzModel;
		private szorozzView: SzorozzView;
		
		constructor() {
			this.szorozzModel = new SzorozzModel();
			
			this.szorozzView = new SzorozzView(jQuery('body'));
			this.szorozzView.resultIn.prop('min', 0).prop('max', 100);
			this.szorozzView.resultIn.on('keyup', illa.bind(this.onKeyUp, this));
			this.szorozzView.doneButton.on('click', illa.bind(this.onDoneButtonClicked, this));
			this.szorozzView.changeLanguageButton.on('click', illa.bind(this.onChangeLanguageButtonClicked, this));
			
			this.ask();
		}
		
		protected onDoneButtonClicked(e: jQuery.IEvent): void {
			this.checkResult();
		}
		
		protected onKeyUp(e: jQuery.IEvent): void {
			if (e.which == 13) {
				this.checkResult();
			}
		}
		
		protected onChangeLanguageButtonClicked(e: jQuery.IEvent): void {
			Main.setLanguage(Main.getLanguage() instanceof LanguageEnglish ? new LanguageHungarian() : new LanguageEnglish());
		}
		
		protected ask(): void {
			this.szorozzModel.newQuestion();
			var question: string;
			switch (this.szorozzModel.getOperator()) {
				case SzorozzModel.OPERATOR_MULTIPLY:
					question = this.szorozzModel.getFactors()[0] + ' ' + Main.getLanguage().multiply + ' ' + this.szorozzModel.getFactors()[1] + ' ='
					break;
				case SzorozzModel.OPERATOR_DIVIDE:
					question = this.szorozzModel.getDividend() + ' ' + Main.getLanguage().divide + ' ' + this.szorozzModel.getDivisor() + ' ='
					break;
			}
			this.szorozzView.countOut.text(this.szorozzModel.getCount() + '.');
			this.szorozzView.questionOut.text(question);
			this.szorozzView.resultIn.val('').focus();
		}
		
		protected checkResult(): void {
			if (this.szorozzModel.isResultCorrect(parseInt(this.szorozzView.resultIn.val()))) {
				this.szorozzView.feedbackOut.text(Main.getLanguage().answerCorrect);
				this.ask();
			} else {
				this.szorozzView.feedbackOut.text(Main.getLanguage().answerIncorrect);
				this.szorozzView.resultIn.val('').focus();
			}
			this.szorozzView.feedbackOut.stop(true, true).fadeOut(0).fadeIn(250).delay(2000);
		}
	}
}