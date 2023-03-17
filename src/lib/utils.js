const backend = 'https://prexionpocketbase.clearbooksaccounting.net/api/files/';
export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `${backend}${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const clickOutside = (node) => {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};
	document.addEventListener('click', handleClick, true);
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
