import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  addTag,
  changeTagInput,
  createArticle,
  delTag,
} from '../../Services/Services';

import classes from './CreateNewArticle.module.scss';

function CreateNewArticle({
  state,
  changeTagInput,
  addTag,
  delTag,
  createArticle,
}) {
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
        tagList: state.tagList,
        token: state.token,
      },
    };
    createArticle(article);
  };

  const elements = (state) =>
    state.tagList.map((item, index) => (
      <div key={index} className={classes.tagWrapper}>
        <input className={classes.inputTag} value={item} />
        <button
          onClick={() => delTag(index)}
          type="button"
          className={classes.deleteBtn}
        >
          Delete
        </button>
      </div>
    ));

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
      <header className={classes.createNewArticle__header}>
        Create New Article
      </header>
      <div className={classes.input__wrapper}>
        <div className={classes.input__title}>Title</div>
        <input
          className={inputTitle}
          placeholder="Title"
          type="text"
          {...register('title', {
            required: 'Поле обязательно для заполнения',
          })}
        />
        <p>{errors.title?.message}</p>
      </div>
      <div>
        <div className={classes.input__description}>Short-description</div>
        <input
          className={inputShortDescription}
          placeholder="Short-description"
          type="text"
          {...register('description', {
            required: 'Поле обязательно для заполнения',
          })}
        />
        <p>{errors.description?.message}</p>
      </div>
      <div>
        <div className={classes.inputDescription}>Text</div>
        <textarea
          className={inputBody}
          placeholder="Text"
          {...register('body', {
            required: 'Поле обязательно для заполнения',
          })}
        />
        <p>{errors.body?.message}</p>
      </div>
      <div className={classes.tagsWrapper}>
        <div className={classes.inputDescription}>Tags</div>
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
              addTag(state.tagInput);
            }}
            type="button"
            className={classes.addBtn}
          >
            Add tag
          </button>
        </div>
      </div>
      {elements(state)}
      <button className={classes.sendButton}>Send</button>
    </form>
  );
}

const mapStateProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  changeTagInput: (data) => dispatch(changeTagInput(data)),
  addTag: (tag) => dispatch(addTag(tag)),
  delTag: (index) => dispatch(delTag(index)),
  createArticle: (data) => dispatch(createArticle(data)),
});

export default connect(mapStateProps, mapDispatchToProps)(CreateNewArticle);
