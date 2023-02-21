import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import classnames from 'classnames';

import classes from '../CreateNewArticle/CreateNewArticle.module.scss';

import {
  changeArticleInput,
  changeTagInput,
  addTagEdit,
  delTagEdit,
  editArticle,
  addTag,
  changeArticleTagInput,
} from '../../Services/Services';

function EditArticle({
  state,
  changeArticleInput,
  changeTagInput,
  addTagEdit,
  delTagEdit,
  editArticle,
}) {
  const data = state.article;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (article) => {
    article = {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: state.article.tagList,
        token: state.token,
      },
    };
    editArticle(article, state.article.slug);
  };

  const oldTags = (data) =>
    data.tagList.map((item, index) => {
      if (item.length === 0) {
        return null;
      }
      return (
        <div key={index} className={classes.tagWrapper}>
          <input
            className={classes.inputTag}
            value={item}
            onChange={(e) => changeArticleTagInput(e.target.value)}
          />
          <button
            onClick={() => delTagEdit(index)}
            type="button"
            className={classes.deleteBtn}
          >
            Delete
          </button>
        </div>
      );
    });

  let inputTitle = classnames(classes.inputTitle, {
    [classes.inputWrong]: errors.title,
  });
  let inputShortDescription = classnames(classes.inputShortDescription, {
    [classes.inputWrong]: errors.description,
  });
  let inputBody = classnames(classes.inputText, {
    [classes.inputWrong]: errors.body,
  });

  return (
    <form
      className={classes.createNewArticle__wrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className={classes.createNewArticle__header}>Edit Article</header>
      <div className={classes.input__wrapper}>
        <div>
          <div className={classes.input__description}>Title</div>
          <input
            className={inputTitle}
            placeholder="Title"
            type="text"
            defaultValue={data.title}
            {...register('title', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <div classname={classes.input__description}>Short description</div>
          <input
            className={inputShortDescription}
            placeholder="Short-description"
            type="text"
            defaultValue={data.description}
            {...register('description', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <p>{errors.description?.message}</p>
        </div>
        <div>
          <div className={classes.input__description}>Text</div>
          <textarea
            className={inputBody}
            placeholder="Text"
            defaultValue={data.body}
            {...register('body', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <p>{errors.body?.message}</p>
        </div>
        <div className={classes.tagsWrapper}>
          <div className={classes.input__description}>Tags</div>
          <div className={classes.tagWrapper}>
            <input
              className={classes.inputTag}
              placeholder="Tag"
              type="text"
              value={state.tagInput}
              onChange={(e) => changeTagInput(e.target.value)}
            />
            <button
              onClick={() => {
                addTagEdit(state.tagInput);
              }}
              type="button"
              className={classes.addBtn}
            >
              Add tag
            </button>
          </div>
        </div>
        {oldTags(data)}
        <button className={classes.sendButton}>Send</button>
      </div>
    </form>
  );
}

const mapStateProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  changeTagInput: (tag) => dispatch(changeTagInput(tag)),
  addTag: (tag) => dispatch(addTag(tag)),
  addTagEdit: (tag) => dispatch(addTagEdit(tag)),
  changeArticleTagInput: (data, index) =>
  dispatch(changeArticleTagInput(data, index)),
  delTagEdit: (index) => dispatch(delTagEdit(index)),
  editArticle: (data, slug) => dispatch(editArticle(data, slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(EditArticle);
