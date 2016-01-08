(function() {
	var products = [
	'сыр', 'молоко', 'простокваша', 'творог', 'йогурт с черникой', 'йогурт с клубникой', 'сметана', 'сливочное масло', 'сливки 20%', 'взбитые сливки', 'майонез',
	'свиной фарш', 'свиной стейк', 'рыбный стейк', 'куриные грудки', 'филе индейки', 'гусь', 'мидии', 'замороженый кальмар', 'королевские креветки', 'форель', 'семга', 'дорадо',
	'огурцы', 'помидоры', 'укроп', 'петрушка', 'зеленый лук', 'салат', 'сельдерей', 'картофель', 'морковка', 'лук', 'чеснок', 'кабачки',
	'клубника', 'малина', 'персики', 'абрикосы', 'черешня', 'вишня', 'мандарины', 'апельсины', 'памело', 'грейпфрут', 'гранат', 'бананы', 'виноград', 'авокадо',
	'корнишоны', 'зеленый горошек в банке', 'кукуруза в банке', 'соленые помидоры', 'соленые патисоны', 'паштет', 'сайра в банке', 'тунец', 'шпроты в масле',
	'черный перец', 'соль', 'сахар', 'оливковое масло', 'подсолнечное масло', 'кетчуп', 'горчица', 'васаби', 'мука', 'хлеб', 'куриные яйца', 'перепелиные яйца',
	];

	function generatePseudoRandFromArray(source, count) {
		var result = [];
		var step = Math.floor(source.length/count);
		for (var i=0; i<count; i++) {
			var rand = Math.round(Math.random()*(step-1));
			result.push(source[i*step+rand]);
		}
		return result;		
	}

	function productList(level) {
		this.coef = level === 'easy'? 0.2 : level === 'hard' ? 1 : 0.5;
		this.products = generatePseudoRandFromArray(products, Math.round(this.coef*products.length));
		this.productsMentioned = {};
		this.currentPart = [];
		for(var i=0;i<this.products.length;i++) this.productsMentioned[this.products[i]] = false;
		for(var i=0;i<this.currentPart.length;i++) this.productsMentioned[this.currentPart[i]] = true;
	};
	productList.prototype.getPart = function() {
		var rand = Math.round(Math.random()*3)+4;
		for(var i=0;i<this.currentPart.length;i++) this.productsMentioned[this.currentPart[i]] = true;
		this.currentPart = generatePseudoRandFromArray(this.products, rand);
		var result = {};
		for (var i=0;i<this.currentPart.length; i++) {
			result[this.currentPart[i]] = this.productsMentioned[this.currentPart[i]];
		}
		return result;
	};
	window.productList = productList;
})();