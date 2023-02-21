import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classes from './SignUp.module.scss';
import { createNewUser } from '../../Services/Services';
import classnames from 'classnames';

function SignUp({ state, createNewUser }) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    user = {
      user: {
        email: user.email,
        password: user.password,
        username: user.username,
      },
    };
    createNewUser(user);
  };

  let usernameInput = classnames(classes.inputField, {
    [classes.inputWrong]: errors.username,
  });
  let emailInput = classnames(classes.inputField, {
    [classes.inputWrong]: errors.email,
  });
  let passwordInput = classnames(classes.inputField, {
    [classes.inputWrong]: errors.password,
  });
  let passwordRepeat = classnames(classes.inputField, {
    [classes.inputWrong]: errors.passwordRepeat,
  });

  return (
    <form className={classes.signUp} onSubmit={handleSubmit(onSubmit)}>
      <header className={classes.signUpHeader}>Create New Account</header>
      <div>
        <span className={classes.inputSign}>Username</span>
        <input
          placeholder={'Username'}
          className={usernameInput}
          {...register('username', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 4,
              message: 'Минимум 4 символа',
            },
            maxLength: {
              value: 20,
              message: 'Максимум 20 символов',
            },
          })}
        />

        <p>{errors.username?.message}</p>
        <p>{state.errors?.username}</p>
      </div>
      <div>
        <span className={classes.inputSign}>Email address</span>
        <input
          placeholder={'Email address'}
          className={emailInput}
          {...register('email', {
            required: 'Поле обязательно для заполнения',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Адрес введён некорректно',
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <p>{state.errors?.email}</p>
      </div>
      <div>
        <span className={classes.inputSign}>Password</span>
        <input
          placeholder={'Password'}
          className={passwordInput}
          type="password"
          {...register('password', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов',
            },
            maxLength: {
              value: 40,
              message: 'Максимум 40 символов',
            },
          })}
        />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <span className={classes.inputSign}>Repeat Password</span>
        <input
          placeholder={'Repeat Password'}
          className={passwordRepeat}
          type="password"
          {...register('passwordRepeat', {
            required: 'Поле обязательно для заполнения',
            validate: (value) =>
              value === watch('password') || 'Пароли не совпадают',
          })}
        />
        <p>{errors.passwordRepeat?.message}</p>
      </div>
      <label className={classes.check}>
        <input
          type="checkbox"
          className={classes.check__input}
          {...register('checkbox', {
            required:
              'Требуется ваше согласие на обработку персональных данных',
          })}
        />
        <span className={classes.check__box} />
        <span className={classes.check__description}>
          I agree to the processing of my personal information
        </span>
      </label>
      <p>{errors.checkbox?.message}</p>
      <div className={classes.signUp__footer}>
        <button className={classes.btnCreate}>Create</button>
        <span className={classes.footerCaption}>
          Already have account?{' '}
          <Link to="/sign-in/" className={classes.signUpFooter__a}>
            Sign In
          </Link>
        </span>
      </div>
    </form>
  );
}

const mapStateProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (user) => dispatch(createNewUser(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(SignUp);
