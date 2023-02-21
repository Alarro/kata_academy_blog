import React from 'react';

import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Article.module.scss';

import {
  favorite,
  unFavorite,
  getArticles,
  getArticle,
} from '../../Services/Services';

function Article({ data, loggedIn, state, favorite, unFavorite, getArticles }) {
  const formatCreatedTime = () => {
    const date = data.createdAt;
    return format(new Date(date), 'MMMM d, yyyy');
  };

  const tags = () => {
    let id = 0;
    return data.tagList.map((item) => {
      if (item.length === 0) {
        return null;
      }
      return (
        <span key={id++} className={classes.tag}>
          {item}
        </span>
      );
    });
  };

  let checkBoxStatus = null;
  if (loggedIn === false) {
    checkBoxStatus = true;
  }

  const checked = data.favorited;

  return (
    <div className={classes.articleWrapper}>
      <header className={classes.articleHeader}>
        <div className={classes.leftSide}>
          <div className={classes.leftSide__header}>
            <Link to={`/articles/${data.slug}`} className={classes.title}>
              {data.title}
            </Link>
            <label className={classes.like}>
              <input
                className={classes.like__input}
                disabled={checkBoxStatus}
                checked={checked}
                onChange={() => {
                  if (!checked) {
                    favorite(data.slug).then(() =>
                      getArticles((state.currentPage - 1) * 5)
                    );
                  }
                  if (checked) {
                    unFavorite(data.slug).then(() =>
                      getArticles((state.currentPage - 1) * 5)
                    );
                  }
                }}
                type="checkbox"
              />
              <span className={classes.like__box} />
              <span className={classes.like__number}>
                {data.favoritesCount}
              </span>
            </label>
          </div>
          <div className={classes.leftSide__tagWrapper}>{tags()}</div>
          <p className={classes.leftSide__description}>{data.description}</p>
        </div>
        <div>
          <button className={classes.articleProfileName}>
            {data.author.username}
          </button>
          <img
            className={classes.articleProfilePic}
            src={data.author.image}
            alt="profile picture"
          />
          <div className={classes.articleDate}>{formatCreatedTime()}</div>
        </div>
      </header>
    </div>
  );
}

const mapStateProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) => dispatch(favorite(slug)),
  unFavorite: (slug) => dispatch(unFavorite(slug)),
  getArticles: (offset) => dispatch(getArticles(offset)),
  getArticle: (slug) => dispatch(getArticle(slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(Article);
