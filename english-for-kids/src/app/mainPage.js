import categoriesData from '...';
import CardCategory from '...';
class Categories(){
	renderMainPage(){
		
	}
}

function () {
	const fragment = document.createDocumentFragment();
	for( const item of categoriesData){
		const card = new CardCategory(item.category, item.img);
		card.init();
		fragment.append(card.node);
	}
	return fragment;
}