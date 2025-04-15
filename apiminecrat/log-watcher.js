const fs = require("fs");
const path = require("path");

const logFilePath = path.join("C:", "xeno", "minecraft", "minecraft-server", "logs", "latest.log");
const deathsFile = path.join(__dirname, "deaths.txt");

const deathTriggers = [
  "was slain",
  "was shot",
  "was blown up",
  "was killed",
  "hit the ground",
  "drowned",
  "tried to swim",
  "was fireballed",
  "was burnt",
  "fell from",
  "died",
  "was pummeled",
  "was impaled",
  "was squashed",
  "was poked",
  "was slain by",
  "was killed by"
];

let deaths = {};

// Загружаем предыдущие смерти (если файл уже существует)
if (fs.existsSync(deathsFile)) {
  try {
    deaths = JSON.parse(fs.readFileSync(deathsFile, "utf-8"));
  } catch (err) {
    console.error("Ошибка при чтении deaths.txt:", err);
  }
}

// Функция для обработки новой строки
function handleLogLine(line) {
  for (const trigger of deathTriggers) {
    if (line.includes(trigger)) {
      const match = line.match(/: (.*?) /);
      if (match && match[1]) {
        const player = match[1];
        if (!deaths[player]) {
          deaths[player] = 0;
        }
        deaths[player]++;
        console.log(`💀 ${player} умер. Всего: ${deaths[player]}`);

        // Обновляем файл
        fs.writeFileSync(deathsFile, JSON.stringify(deaths, null, 2), "utf-8");
      }
      break;
    }
  }
}

// Следим за изменениями в логе
fs.watchFile(logFilePath, { interval: 1000 }, (curr, prev) => {
  const stream = fs.createReadStream(logFilePath, {
    start: prev.size,
    end: curr.size,
    encoding: "utf-8",
  });

  let buffer = "";
  stream.on("data", (data) => {
    buffer += data;
    const lines = buffer.split(/\r?\n/);
    lines.forEach((line) => {
      if (line.trim() !== "") {
        handleLogLine(line);
      }
    });
  });
});

console.log("👀 Следим за логами Minecraft...");