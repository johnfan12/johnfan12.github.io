function showcomment() {
var commentIds = ["杨盼盼", "周经美", 369, "龚贤武", "孙大炮"];
var comments = [
    "博主分析的好透測，坐等看长安大学未來的狀況，希望可以發展成一流大学",
    "博主的分析很有啟發！",
    "精闢分析；觀察入微；淺顯易懂；深入人心。",
    "中午好，謝謝博主分享更新節目。午飯時間節目相伴。",
    "有理有據，非常感謝🙏！"
];

// 获取显示评论的元素
var randomCommentElement = document.getElementById("random-comment");

// 生成随机索引
var randomIndex = Math.floor(Math.random() * commentIds.length);

// 获取随机评论的ID和内容
var randomCommentId = commentIds[randomIndex];
var randomCommentContent = comments[randomIndex];
randomCommentElement.innerHTML = "<h3>" + randomCommentId + ":" + "</h3><p>" + randomCommentContent + "</p>";
}

showcomment();