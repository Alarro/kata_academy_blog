import React, { useEffect } from "react";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { connect } from "react-redux";
import DeleteArticle from "../DeleteArticle";
import classes from "./ReadFullArticle.module.scss";
import {
	deleteModuleToggle,
	favorite,
	unFavorite,
	getArticle,
} from "../../Services/Services";

function ReadFullArticle({
	state,
	deleteModuleToggle,
	favorite,
	unFavorite,
	getArticle,
	slug
}) {

	useEffect(() => {
		getArticle(slug);
	},[]);

	const data = state.article;
	const { loggedIn } = state;

	const formatCreatedTime = () => {
		const date = data.createdAt;
		return format(new Date(date), "MMMM d, yyyy");
	};

	const tags = () => {
		let id = 0;
		if (data.tagList) {
			return data.tagList.map((item) => {
				if (item.length === 0) {
					return null;
				}
				return (
					<span key={id++} className={classes.tag}>{item}</span>
				);
			});
		}
	};

	let checkBoxStatus = null;
	if (loggedIn === false) {
		checkBoxStatus = true;
	}

	let deleteButtonStyle = classes.deleteButton;
	let editButtonStyle = classes.editButton;

	if (state.article.length !== 0) {
		if (data.author.username !== state.username) {
			deleteButtonStyle = classes.displayNone;
			editButtonStyle = classes.displayNone;
		}
	}

	const checked = data.favorited;

	if (state.article.length !== 0) {
		return (
			<div className={classes.articleWrapper}>
				<header className={classes.articleHeader}>
					<div className={classes.leftSide}>
						<div className={classes.leftSide__header}>
							<div className={classes.title}>
								<Link to={`/articles/${data.slug}`}>{data.title}</Link>
							</div>
							<label className={classes.like}>
								<input
									className={classes.like__input}
									disabled={checkBoxStatus}
									type='checkbox'
									checked={checked}
									onChange={() => {
										if (checked === false) {
											favorite(data.slug).then(() => getArticle(data.slug)
											);
										}
										if (checked === true) {
											unFavorite(data.slug).then(() => getArticle(data.slug)
											);
										}
									}}
								/>
								<span className={classes.like__box} />
								<span className={classes.like__number}>{data.favoritesCount}</span>
							</label>
						</div>
						<div className={classes.leftSide__tagContainer}>{tags()}</div>

						<div className={classes.leftSide__shortDescription}>
							{data.description}
						</div>
					</div>
					<div>
						<button className={classes.articleAccountName}>
							{data.author.username}
						</button>
						<img
							className={classes.articleAccountImage}
							src={data.author.image}
							alt='Profile Pic'
						/>
						<div className={classes.articleDate}>{formatCreatedTime()}</div>
						<button onClick={deleteModuleToggle} className={deleteButtonStyle}>
							Delete
						</button>
						<div className={classes.DeleteArticle}>
							<DeleteArticle />
						</div>

						<Link to={`/articles/${data.slug}/edit`} className={editButtonStyle}>
							Edit
						</Link>
					</div>
				</header>
				<div className={classes.articleText}>
					<Markdown>{data.body}</Markdown>
				</div>
			</div>
		);
	}






}
const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	favorite: (slug) => dispatch(favorite(slug)),
	unFavorite: (slug) => dispatch(unFavorite(slug)),
	getArticle: (slug) => dispatch(getArticle(slug)),
	deleteModuleToggle: () => dispatch(deleteModuleToggle()),
});

export default connect(mapStateProps, mapDispatchToProps)(ReadFullArticle);