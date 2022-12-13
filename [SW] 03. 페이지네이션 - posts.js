const { Router } = require('express');
const { Post } = require('../models');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  if (req.query.write) {
    res.render('post/edit');
    return;
  }
  
  /* TODO: 페이지네이션을 위한 로직을 추가합니다 */
  // url 쿼리에서 page 받기, 기본값 1
  const page = Number(req.query.page || 1)
  
  // url 쿼리에서 peRage 받기, 기본값 10
  const perPage = Number(req.query.perPage || 10)

  const [total, posts] = await Promise.all([
    Post.countDocuments({}),
    Post
      .find({})
      .sort({ createdAt : -1 })

      /* skip은 특정횟수만큼 Post를 찾는 과정에서 생략 */ 
      .skip(perPage * (page - 1))

      // perPage : 1,2,3 ... n 까지 페이지 당 보여줄 페이지 리스트
      // page : 지금 보고 있는 Page의 인덱스

      /* 찾고자하는 데이터의 양을 제한하는 요소 */ 
      .limit(perPage),
  ]);

  const totalPage = Math.ceil(total / perPage);
  
  res.render('post/list', { posts, page, perPage, totalPage });
}));

router.get('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const post = await Post.findOne({ shortId });
  
  if (req.query.edit) {
    res.render('post/edit', { post });
    return;
  }
  
  res.render('post/view', { post });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    throw new Error('제목과 내용을 입력 해 주세요');
  }

  const post = await Post.create({ title, content });
  res.redirect(`/posts/${post.shortId}`);
}));

router.post('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const { title, content } = req.body;
  
  if (!title || !content) {
    throw new Error('제목과 내용을 입력 해 주세요');
  }
    
  await Post.updateOne({ shortId }, { title, content });
  res.redirect(`/posts/${shortId}`);
}));

router.delete('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  await Post.deleteOne({ shortId });
  res.send('OK');
}));

module.exports = router;
