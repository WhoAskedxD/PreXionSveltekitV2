export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `http://192.168.1.100:5000/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
export const getUserTasks = (user_id) => {
	return `http://192.168.1.100:5000/api/collections/task/records/?filter=(user=${user_id})`;
}