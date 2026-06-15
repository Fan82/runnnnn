// 社交互動（按讚 / 留言）的 localStorage 存取工具
// scope 用於區分不同來源的貼文，避免 id 衝突：
//   "friend" -> Friends 頁的 MOCK_POSTS（朋友動態）
//   "update" -> Profile 頁的 MY_UPDATES（自己的動態）
// 之後若要改接 Supabase，主要會替換這個檔案內的函式實作

const LIKES_KEY_PREFIX = "social_likes_";

// 取得某個 scope 的「已按讚 post id」陣列
const getLikedIds = (scope) => {
  try {
    const raw = localStorage.getItem(LIKES_KEY_PREFIX + scope);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read liked posts:", e);
    return [];
  }
};

const setLikedIds = (scope, ids) => {
  try {
    localStorage.setItem(LIKES_KEY_PREFIX + scope, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to save liked posts:", e);
  }
};

// 該 post 是否已被按讚（用於初始化元件 state）
export const isLiked = (scope, postId) => {
  return getLikedIds(scope).includes(postId);
};

// 切換按讚狀態，回傳切換後的結果 { liked }
export const toggleLike = (scope, postId) => {
  const ids = getLikedIds(scope);
  const index = ids.indexOf(postId);

  let liked;
  if (index === -1) {
    ids.push(postId);
    liked = true;
  } else {
    ids.splice(index, 1);
    liked = false;
  }

  setLikedIds(scope, ids);
  return { liked };
};
