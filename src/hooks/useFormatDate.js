const useFormatDate = () => {
	const formatDate = (date, option) => {
		if (!date) return '';

		if (option === 'ISO') {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		}
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return formatDate;
};

export default useFormatDate;
