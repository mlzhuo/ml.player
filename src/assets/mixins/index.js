/**
 * @description 暗黑模式
 * @returns
 */
const setModel = () => {
	const hour = new Date().getHours();
	const styleModel = hour < 7 || hour > 18 ? 'dark-model' : 'light-model';
	return styleModel;
};
const mixin = {
	styleModel: setModel()
};

export default mixin;
