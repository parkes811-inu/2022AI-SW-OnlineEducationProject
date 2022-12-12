/*
어떤 요청이 들어왔을 때 무엇을 해라 라는 부분의 Router를 정의
index.js
*/

/* TODO: router를 선언한 후, index를 반환하도록 해봅시다. */

// Router 객체 선언
// express로부터 Router 함수를 가져온다.
const { Router } = require("express");

// 위에서 실행한 결과 함수 Router를 변수 router에 저장
const router = Router()

// '/'는 경로를 나타낸다, arrow function에 () 안은 인자, {} 는 어떤 일을 수행할지 작성
router.get('/',(req,res)=>{
    // 특정 페이지를 PUG를 이용해서 렌더링한다.
    res.render('index')

});
