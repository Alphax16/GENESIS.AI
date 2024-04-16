function isAnyValueEmpty(obj: any) {
	console.log('obj:', obj);
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (!obj[key]) {
				return true;
			}
		}
	}
	return false;
}

export { isAnyValueEmpty };
