const reducer = (
	state = {
		articles: [],
		article: [],
		articlesCount: null,
		currentPage: 1,
		loading: true,
		loggedIn: false,
		username: null,
		email: null,
		token: null,
		image: null,
		tagList: [],
		tagInput: "",
		errors: null,
		deleteModule: false,
	},
	action
) => {
	if (action.type === "getArticlesAction") {
		return {
			...state,
			loading: false,
			articles: action.articles.articles,
			articlesCount: action.articles.articlesCount,
		};
	} if (action.type === "getArticleAction") {
		return {
			...state,
			loading: false,
			article: action.article.article,
		};
	} if (action.type === "changeCurrentPageAction") {
		return {
			...state,
			loading: true,
			currentPage: action.currentPage,
		};
	} if (action.type === "createNewUser") {
		return {
			...state,
			username: action.data.user.username,
			email: action.data.user.email,
			token: action.data.user.token,
			loggedIn: true,
			errors: null,
		};
	} if (action.type === "logInAction") {
		return {
			...state,
			username: action.data.user.username,
			email: action.data.user.email,
			token: action.data.user.token,
			image: action.data.user.image,
			loggedIn: true,
			errors: null,
		};
	} if (action.type === "userErrorsAction") {
		return {
			...state,
			errors: action.errors,
		};
	} if (action.type === "logOutAction") {
		return {
			...state,
			loggedIn: false,
			username: null,
			email: null,
			token: null,
			image: null,
			errors: null,
		};
	} if (action.type === "editProfileAction") {
		return {
			...state,
			username: action.data.user.username,
			email: action.data.user.email,
			token: action.data.user.token,
			image: action.data.user.image ? action.data.user.image : null,
			loggedIn: true,
			errors: null,
		};
	} if (action.type === "changeTagInputAction") {
		return {
			...state,
			tagInput: action.data,
		};
	} if (action.type === "addTagAction") {
		if (action.tag.length !== 0) {
			return {
				...state,
				tagList: [action.tag, ...state.tagList],
				tagInput: "",
			};
		} 
		return {
			...state,
		};
    
	} if (action.type === "delTagAction") {
		let newArr = [];
		state.tagList.forEach((item, index) => {
			if (index !== action.index) {
				newArr.push(item);
			}
		});
		return {
			...state,
			tagList: newArr,
		};
	} if (action.type === "createArticleAction") {
		window.history.back();
		return {
			...state, tagList: [], tagInput: ""
		};
	} if (action.type === "changeArticleTagInputAction") {

		state.article.tagList[action.index] = action.data;
		return {
			...state,
		};
	} if (action.type === "addTagEditAction") {
		state.article.tagList = [action.tag, ...state.article.tagList];
		return {
			...state,
			tagInput: "",
		};
	} if (action.type === "delTagEditAction") {
		let newArr = [];
		state.article.tagList.forEach((item, index) => {
			if (index !== action.index) {
				newArr.push(item);
			}
		});
		state.article.tagList = newArr;
		return {
			...state,
		};
	} if (action.type === "editArticleAction") {
		window.history.back();
		return {
			...state, tagInput: "",
		};
	} if (action.type === "deleteModuleToggleAction") {
		return {
			...state,
			deleteModule: !state.deleteModule,
		};
	} if (action.type === "deleteArticleAction") {
		window.history.back();
		return {
			...state,
			deleteModule: !state.deleteModule,
		};
	} if (action.type === "favoriteAction") {
		return {
			...state,
		};
	}  if (action.type === "cleanArticleAction") {
		return {
			...state, article: [],
		};
	}
	return state;
  
};

export default reducer;