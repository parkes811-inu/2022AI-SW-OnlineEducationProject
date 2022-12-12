/*
과제에서 주어진 코드베이스를 확인하고, TODO: 부분을 채워 넣어주어진 과제를 해결하기.

여러 폴더와 파일이 존재하지만 주로 다룰 파일은
app.js, index.js, index.pug

Template Engine을 활용해서 이미 있는 코드들 사이에 기능 추가하기
Template Engine : JavaScript를 사용해 HTML을 렌더링할 수 있게 해주는 엔진
PUG : 템플릿 엔진 중 Express View 엔진으로 npm으로 설치가 가능하다.

*/

/* 프로젝트 진행에 필요한 다양한 모듈을 불러오기*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dayjs = require('dayjs');


/* TODO: indexRouter 연동 */ 

/*Express 객체를 불러오기 위한 모듈*/
const app = express();

// view engine setup
// 랜더링 라이브러리 pug를 사용
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

// looger는 프로그램 동작을 녹화하는 부분
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // 웹 사이트에 정보를 임시 저장하는 쿠키를 사용한다고 선언
app.use(express.static(path.join(__dirname, 'public')));

/* TODO: indexRoute 연동 */ 


// catch 404 and forward to error handler
// 오류처리 핸들러, arrow 함수
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
