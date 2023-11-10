'use strict'

const menu = $('.menu');

$.ajax(
	{
		url: 'coffee.json',
		dataType: 'json'
	}
)
	.done(data => {
		generateListCoffee(data);
		getCoffee(data);
	})
	.fail(error => {
		$('body').html(`<div class="error">Error ${error.status}</div>`);
	});

function generateListCoffee(data) {
	$.each(data, (index, element) => {
		menu.append(`<li class="menu__item">${element.name}</li>`);
	});
}

function getCoffee(data) {
	menu.on('click', 'li', function () {
		const target = $(this);
		const temp = target.text();

		const currentCoffee = data.filter(element => element.name === temp);
		const recipe = currentCoffee[0].recipe;

		generateIngredients(recipe);

		target
			.addClass('menu__item_active')
			.siblings()
			.removeClass('menu__item_active');
	});
}

function generateIngredients(data) {
	const ingredients = $('.ingredients');

	ingredients.html('');

	$.each(data, (index, element) => {
		ingredients.append(`<div class="${element.className}" style="height: ${element.volume}00px">
								${element.ingredient}
							</div>`);
	});
}