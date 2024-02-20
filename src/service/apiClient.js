import { API_URL } from "./constants"

async function login(email, password) {
  return await post("login", { email, password }, false)
}

async function register(email, password) {
  await post("users", { email, password }, false)
  return await login(email, password)
}

async function createProfile(userId, firstName, lastName, githubUrl, bio) {
  return await patch(`users/${userId}`, {
    firstName,
    lastName,
    githubUrl,
    bio,
  })
}

async function getPosts() {
  const res = await get("posts")
  return res.data.posts
}

async function postPost(newPost) {
  const res = await post("posts", newPost)
  return res.data.post
}

async function getUserByName(firstName) {
  const res = await get(`users?name=${firstName}`)
  return res.data.users
}

async function getCommentsByPostId(postId) {
  const res = await get(`comments/${postId}`)
  return res.data.comments
}

async function postComment(comment) {
  const res = await post("comments", comment)
  return res.data
}

async function getCohorts() {
  const res = await get("cohorts")
  return res.data 
}

async function getTeachers() {
  const res = await get("teachers")
  return res.data.teachers
}

async function getSelfTeacher() {
  const res = await get("teachers/me")
  return res.data
}

async function getSelfStudent() {
  const res = await get("students/me")
  return res.data
}

async function getStudentsByCohortId(cohort_id) {
  const res = await get(`cohorts/${cohort_id}/students`)
  return res.students
}

async function post(endpoint, data, auth = true) {
  return await request("POST", endpoint, data, auth)
}

async function patch(endpoint, data, auth = true) {
  return await request("PATCH", endpoint, data, auth)
}

async function get(endpoint, auth = true) {
  return await request("GET", endpoint, null, auth)
}

async function getSelf() {
  const res = await get("users/me")
  return res.data.user
}

async function getUsers() {
  const res = await get("users")
  return res.data.users
}

async function getUserById(userId) {
    return get(`users/:${userId}`)
  }

async function put(endpoint, data, auth = true) {
  return await request("PUT", endpoint, data, auth)
}

async function del(endpoint, auth = true) {
  return await request("DELETE", endpoint, null, auth)
}

async function deletePost(postId) {
  return del(`posts/${postId}`)
}

async function editPost(postId, updatedContent) {
  return put(`posts/${postId}`, updatedContent)
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  }

  if (data) {
    opts.body = JSON.stringify(data)
  }

  if (auth) {
    opts.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts)

  return response.json()
}

async function toggleLike(postId) {
  const response = await post(`posts/${postId}/like`)
  return response
}

async function getStudents() {
  const response = await get('students')
  return response.data.students
}

export {
  login,
  getPosts,
  register,
  createProfile,
  getUsers,
  postPost,
  getUserByName,
  deletePost,
  editPost,
  toggleLike,
  postComment,
  getCommentsByPostId,
  getSelf,
  getCohorts,
  getTeachers,
  getStudentsByCohortId,
  getUserById,
  getStudents,
  getSelfTeacher,
  getSelfStudent
}
