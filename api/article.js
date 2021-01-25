import {request} from '@/plugins/request'

//获取所有文章列表
export const getArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles",
    params
  })
}
//获取feed文章列表
export const getFeedArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params
  })
}
//点赞文章
export const addFavorite = slug => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`,
  })
}
//取消点赞文章
export const removeFavorite = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`,
  })
}
//获取文章详情
export const getArticle = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,
  })
}
//获取评论
export const getComments = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`,
  })
}
//发新文章
export const createArticle = data => {
  return request({
    method: "POST",
    url: `/api/articles`,
    data
  })
}
//编辑文章
export const editArticle = slug => {
  return request({
    method: "PUT",
    url: `/api/articles/${slug}`,
  })
}
//删除文章
export const deleteArticle = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}`,
    data
  })
}