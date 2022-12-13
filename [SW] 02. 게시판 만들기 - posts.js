const { Router } = require('express');
const { Post } = require('../models');
const asyncHandler = require('../utils/async-handler');

const router = Router();

/* 다른 개발자분이 `GET /posts`는 개발해두신 상황 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    if (req.query.write) {
      res.render('post/edit');
      return;
    }

    const posts = await Post.find({}).sort({ createdAt: -1 });

    res.render('post/list', { posts });
  })
);

// CRUD를 하기 위한 코드작성 부분

/* TODO: GET /posts/shortId */
// : 이후 shortID는 변수처럼 취급 된다.
router.get('/:shortID', asyncHandler(async(req, res) => {
  const { shortId } = req.params;
  const post = await Post.findOne({ shortId });

  if (req.query.edit == true)
  {
      res.render("post/edit",{ post })
  }

  res.render('post/view', { Post });
}));


/* TODO: POST /posts */
// 게시물을 생성하는 부분
router.post('/', asyncHandler(async(req, res)=> {
    const {title, content} = req.body;

    // 새로운 내용 등록
    if(!title || !content)
    {
        throw new Error("제목과 내용을 입력해주세요!");
    }

    // shortID는 디폴트로 생성이 되어있기 떄문에 안적어도 된다.
    const post = await Post.create({title, content});
    res.redirect(`/posts/${shortID}`)
}));

/* TODO: POST /posts/shortId */
router.post('/:shortID', asyncHandler(async(req, res) =>{
    const {shortID } = req.params;
    const { title, content } = req.body;

    if(!title || !content){
        throw new Error("제목과 내용을 입력해주세요!");
    }

    await Post.updateOne = ({shortID},{title, content});
    res.redirect(`/posts/${post.shortID}`)

}));

/* TODO: DELETE /posts/shortId */
// 특정 요소를 찾아 삭제하는 부분
router.delete("/:shortID", asyncHandler(async(req, res) => {

    const {shortID} = req.params;
    await Post.deleteOne ({shortId});

    res.send("OK")

}));

module.exports = router;
