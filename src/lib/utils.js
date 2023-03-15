const backend = "https://prexionpocketbase.clearbooksaccounting.net/api/files/"
export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `${backend}${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
