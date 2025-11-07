let battery = 100;
let batteryInterval;
let clockInterval;
let alarms = [];

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;

  alarms.forEach((alarm, index) => {
    if (
      alarm.hour == hours &&
      alarm.minute == minutes &&
      alarm.second == seconds
    ) {
      alert(`⏰ 알람 시간입니다! (${hours}:${minutes}:${seconds})`);

      alarms.splice(index, 1);
      updateAlarmList();
    }
  });
}

function updateAlarmList() {
  const list = document.getElementById("alarmList");
  list.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.textContent = `🕒 ${alarm.hour}:${alarm.minute}:${alarm.second} `;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.style.background = "transparent";
    delBtn.style.border = "none";
    delBtn.style.color = "red";
    delBtn.style.cursor = "pointer";
    delBtn.style.fontSize = "16px";
    delBtn.style.padding = "0";

    delBtn.addEventListener("click", () => {
      alarms.splice(index, 1);
      updateAlarmList();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function startBatteryDrain() {
  batteryInterval = setInterval(() => {
    if (battery > 0) {
      battery--;
      document.getElementById("battery").textContent = `🔋 ${battery}%`;
    }

    if (battery === 0) {
      clearInterval(clockInterval);
      document.getElementById("clock").textContent = "";
      document.body.style.backgroundColor = "black";
    }
  }, 1000);
}

document.getElementById("chargeBattery").addEventListener("click", () => {
  battery = 100;
  document.getElementById("battery").textContent = "🔋 100%";
  document.body.style.backgroundColor = "#111";

  clearInterval(clockInterval);
  clockInterval = setInterval(updateClock, 1000);
});

document.getElementById("addAlarm").addEventListener("click", () => {
  const hour = document.getElementById("hour").value.padStart(2, "0");
  const minute = document.getElementById("minute").value.padStart(2, "0");
  const second = document.getElementById("second").value.padStart(2, "0");

  if (!hour || !minute || !second) {
    alert("시, 분, 초를 모두 입력하세요!");
    return;
  }

  if (alarms.length >= 3) {
    alert("최대 3개의 알람만 설정할 수 있습니다!");
    return;
  }

  const alarm = { hour, minute, second };
  alarms.push(alarm);

  updateAlarmList();

  document.getElementById("hour").value = "";
  document.getElementById("minute").value = "";
  document.getElementById("second").value = "";
});

window.onload = () => {
  clockInterval = setInterval(updateClock, 1000);
  startBatteryDrain();
};
