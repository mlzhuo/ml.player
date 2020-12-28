/**
 * @description 暗黑模式
 * @returns
 */
const setModel = () => {
	const hour = new Date().getHours();
	// const styleModel = hour < 7 && hour > 19 ? 'dark-model' : 'light-model';
	const styleModel = hour < 7 && hour > 19 ? 'dark-model' : 'dark-model';
	return styleModel;
};
const mixin = {
	styleModel: setModel()
};

export default mixin;
