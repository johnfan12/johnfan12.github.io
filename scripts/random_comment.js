function showcomment() {
var commentIds = ["杨盼盼", "周经美", "全思", "龚贤武", "朱进玉", "张维为", "Wilson Edwards","李登峰"];
var comments = [
    "博主分析的好透測，坐等看长安大学未來的狀況，希望可以發展成一流大学",
    "博主的分析很有啟發！",
    "精闢分析；觀察入微；淺顯易懂；深入人心。",
    "中午好，謝謝博主分享更新節目。午飯時間節目相伴。",
    "有理有據，非常感謝🙏！",
    "博主的分析很有啟發！",
    "古今中外，大學都是一個國家的精神象徵，是一個國家的軟實力，是一個國家的未來💪。",
    "博主知识渊博，分析透彻，让人受益匪浅！",
    "Thank you for your wisdom and kindness for everyone on the planet."
];

var person_links = ["https://ys.mihoyo.com/"]
// 获取显示评论的元素
var randomCommentElement = document.getElementById("random-comment");

// 生成随机索引
var randomIndex = Math.floor(Math.random() * commentIds.length);
var randomcomment = Math.floor(Math.random() * comments.length);
// 获取随机评论的ID和内容
var randomCommentId = commentIds[randomIndex];
if (randomCommentId === "Wilson Edwards"){
    randomcomment = 8;
}

var randomCommentContent = comments[randomcomment];
randomCommentElement.innerHTML = `
  <h3>
    <img src="../images/user.jpg" alt="Commenter" >
    <a href=${person_links}>
      ${randomCommentId}: 
    </a>
  </h3>
  <p>${randomCommentContent}</p>
`;
}

showcomment();
