// 獲取當前系統時間
function getCurrentTime() {
  return new Date();
}

// 計算兩個日期之間的差異
function getDiffDays(date1, date2) {
  const diff = date2 - date1;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// 判斷事件是否已過期
function isEventExpired(event) {
  const currentTime = getCurrentTime();
  const eventTime = new Date(event.time);
  const diffDays = getDiffDays(eventTime, currentTime);
  return diffDays > 3;
}

function time_format(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

  return days + " 天 " + hours + " 时 " + minutes + " 分";
}

// 渲染事件
function renderEvent(event) {
  const currentTime = getCurrentTime();
  const eventTime = new Date(event.time);
  const diffDays = getDiffDays(eventTime, currentTime);

  const li = document.createElement("li");
  const diff_time = eventTime - currentTime;
  if (diff_time < 0) {
    li.textContent = event.title + ' ' + event.time + ' 已过期';
  }
  else if (diff_time <= 1000 * 60 * 60 * 24 * 2) {
    li.textContent = '《' + event.title + "》"+ ' 时间: ' + event.time + ' 剩余时间: ' + time_format(diff_time);
    li.style.color = "red";
  }
  else {
    li.textContent = '《' + event.title + "》"+ ' 时间: ' + event.time + ' 剩余时间: ' + time_format(diff_time);
  }

  if (diff_time < 0) {
    // 已過期
    if (diffDays <= 3) {
      // 三天內
      li.style.textDecoration = "line-through";
    } else {
      // 三天以上
      li.style.display = "none";
    }
  }

  return li;
}

function compare(a, b) {
  const aDate = new Date(a.time);
  const bDate = new Date(b.time);
  return aDate - bDate;
}

// 初始化日程表
function initCalendar() {
  const data = `
  S1601010.56	形势与政策	期末考试	时间未安排	时间未安排	地点未安排	地点未安排	正常	
S3202030.05	计算机程序设计综合实验	期末考试	时间未安排	时间未安排	地点未安排	地点未安排	正常	
X3202030.07	自动控制原理	期中考试	2023-11-18	14:00~16:00	WH1303	96	正常	
X3202030.07	自动控制原理	期末考试	2024-01-09	14:30~16:30	WT1101*	38	正常	
X3202040.11	传感器与检测技术	期末考试	2023-12-12	19:00~20:35	WM2201	111	正常	
X3205140.01	电子电路III	期末考试	2023-12-21	10:15~11:50	WT1101*	118	正常	
X3205140.01	电子电路III	期中考试	2023-11-04	19:00~20:35	无		正常	
Z3202040.04	电机及拖动基础	期中考试	2023-11-17	15:55~17:30	WT1202*	61	正常	
Z3202040.04	电机及拖动基础	期末考试	2023-12-26	19:00~20:35	WT1204*	71	正常	
Z3202050.03	电力电子技术	期末考试	2023-12-01	19:00~21:00	WT1101*	99	正常	
Z3202060.03	数据结构与算法	期末考试	2023-11-28	14:00~15:35	WM3201	62	正常	
Z3204020.01	机器视觉	期末考试	2023-11-15	15:55~17:30	WM3201	2	正常	
Z3204030.01	供电技术	期末考试	2024-01-03	10:15~11:50	WM3201	107	正常	
Z3204040.02	嵌入式系统及应用	期末考试	时间未安排	时间未安排	地点未安排	地点未安排	正常	
`;
  let count = 0;
  const events = getEventList(data);

  // 排序
  events.sort(compare);
  // 遍歷事件列表
  for (const event of events) {
    // 渲染事件
    let li = renderEvent(event);

    // 添加到日程表
    document.getElementById("calendar").querySelector("ul").appendChild(li);
    if (!li.textContent.includes("过期"))
    count++;
  }
  
  if (count == 0) {
    const ci = document.createElement("li");
    ci.textContent = "没有考试哦，放心玩吧！🎉🎉";
    document.getElementById("calendar").querySelector("ul").appendChild(ci)
}
  else if (count < 3) {
    const ci = document.createElement("li");
    ci.textContent = "你只有" + count + "门考试，放心玩吧！";
    document.getElementById("calendar").querySelector("ul").appendChild(ci);
  }
  else {
    const ci = document.createElement("li");
    ci.textContent = "😱😱还有" + count + "门考试，赶紧去复习吧！";
    document.getElementById("calendar").querySelector("ul").appendChild(ci);
  }
}

function getEventList(data) {

  const events = [];

  const lines = data.trim().split('\n');

  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 7 && parts[3] !== '时间未安排') {
      const title = `${parts[1]} ${parts[5]}`;
      const time = parts[3] + ' ' + parts[4].split('~')[0];
      
      events.push({ title, time });
    }
  }
  return events;
}


window.onload = initCalendar;
