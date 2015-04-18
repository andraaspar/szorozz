

module sz {
	export class LanguageHungarian implements LanguageInterface {
		
		multiply: string = '·';
		divide: string = '/';
		answerCorrect: string = 'Jó válasz! Itt a következő.';
		answerIncorrect: string = 'Hibás. Próbáld újra!';
		doneButtonLabel: string = 'Kész';
		remark: string = '★ Jelölj be kedvencnek! Internet nélkül is működöm!';
		changeLanguageButtonLabel: string = 'English';
	}
}