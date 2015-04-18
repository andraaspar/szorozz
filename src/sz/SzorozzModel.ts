

module sz {
	export class SzorozzModel extends illa.EventHandler {
		
		static OPERATOR_MULTIPLY = 'multiply';
		static OPERATOR_DIVIDE = 'divide';
		
		private count: number = 0;
		private operator: string;
		private factors: [number, number] = [NaN, NaN];
		private product: number;
		
		constructor() {
			super();
		}
		
		newQuestion(): void {
			this.count++;
			this.operator = Math.round(Math.random()) == 0 ? SzorozzModel.OPERATOR_MULTIPLY : SzorozzModel.OPERATOR_DIVIDE;
			this.factors = this.getRandomFactors();
			this.product = this.factors[0] * this.factors[1];
			if (this.product == 0) {
				this.operator = SzorozzModel.OPERATOR_MULTIPLY;
			}
		}
		
		getRandomFactors(): [number, number] {
			var r: [number, number] = [this.getRandomFactor(), this.getRandomFactor()];
			while (r[0] == this.factors[0] || r[0] == this.factors[1]) {
				r[0] = (r[0] + 1) % 10;
			}
			while (r[1] == this.factors[0] || r[1] == this.factors[1]) {
				r[1] = (r[1] + 1) % 10;
			}
			return r;
		}
		
		getRandomFactor(): number {
			return Math.round(Math.random() * 10.999 - .5);
		}
		
		getOperator(): string {
			return this.operator;
		}
		
		getFactors(): [number, number] {
			return this.factors;
		}
		
		getProduct(): number {
			return this.product;
		}
		
		getDividend(): number {
			return this.product;
		}
		
		getDivisor(): number {
			return this.factors[0];
		}
		
		getQuotient(): number {
			return this.factors[1];
		}
		
		isResultCorrect(result: number): boolean {
			var correctResult = NaN;
			if (this.operator == SzorozzModel.OPERATOR_MULTIPLY) {
				correctResult = this.getProduct();
			} else if (this.operator == SzorozzModel.OPERATOR_DIVIDE) {
				correctResult = this.getQuotient();
			}
			return result == correctResult;
		}
		
		getCount(): number {
			return this.count;
		}
	}
}