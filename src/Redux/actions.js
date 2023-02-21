export const getArticlesAction = (articles) => ({
	type: "getArticlesAction",
	articles,
});

export const getArticleAction = (article) => ({
	type: "getArticleAction",
	article,
});

export const changeCurrentPageAction = (currentPage) => ({
	type: "changeCurrentPageAction",
	currentPage,
});

export const createNewUserAction = (data) => ({
	type: "createNewUser",
	data,
});

export const logInAction = (data) => ({
	type: "logInAction",
	data,
});

export const userErrorsAction = (errors) => ({
	type: "userErrorsAction",
	errors,
});

export const logOutAction = () => ({
	type: "logOutAction",
});

export const editProfileAction = (data) => ({
	type: "editProfileAction",
	data,
});

export const changeTagInputAction = (data) => ({
	type: "changeTagInputAction",
	data,
});

export const addTagAction = (tag) => ({
	type: "addTagAction",
	tag,
});

export const delTagAction = (index) => ({
	type: "delTagAction",
	index,
});

export const createArticleAction = (data) => ({
	type: "createArticleAction",
	data,
});

export const changeArticleTagInputAction = (data, index) => ({
	type: "changeArticleTagInputAction",
	data,
	index,
});

export const addTagEditAction = (tag) => ({
	type: "addTagEditAction",
	tag,
});

export const delTagEditAction = (index) => ({
	type: "delTagEditAction",
	index,
});

export const editArticleAction = (data, slug) => ({
	type: "editArticleAction",
	data,
	slug,
});

export const deleteModuleToggleAction = () => ({
	type: "deleteModuleToggleAction",
});

export const deleteArticleAction = () => ({
	type: "deleteArticleAction",
});

export const favoriteAction = (data) => ({
	type: "favoriteAction",
	data,
});

export const unFavoriteAction = (data) => ({
	type: "unFavoriteAction",
	data,
});

export const cleanArticleAction = () => ({
	type: "cleanArticleAction"
});