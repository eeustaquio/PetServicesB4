const fs = require('fs');
const path = require('path');

const TODO_FILE = path.join(__dirname, 'ComprehensiveBuildTodoLists.md');
const DASHBOARD_FILE = path.join(__dirname, 'ProgressDashboard.md');

const PHASES = [
  ['Project Foundation', ['ENV', 'ARCH', 'CICD']],
  ['Core Features', ['AUTH', 'PROF', 'SERV', 'PROV', 'BOOK', 'PET']],
  ['Advanced Features', ['PAY', 'TRANS', 'NOTIF', 'AI', 'ADMIN']],
  ['Quality & Perf.', ['TEST', 'SEC', 'MOBILE', 'ACCESS']],
  ['Deployment/Launch', ['DEPLOY', 'PERF', 'LAUNCH', 'SUPPORT']],
];
const FEATURES = [
  ['AUTH_PROGRESS', ['AUTH']],
  ['PROF_PROGRESS', ['PROF']],
  ['SERV_PROGRESS', ['SERV', 'PROV']],
  ['BOOK_PROGRESS', ['BOOK']],
  ['PET_PROGRESS', ['PET']],
  ['PAY_PROGRESS', ['PAY', 'TRANS']],
  ['NOTIF_PROGRESS', ['NOTIF']],
  ['AI_PROGRESS', ['AI']],
  ['ADMIN_PROGRESS', ['ADMIN']],
  ['TEST_PROGRESS', ['TEST', 'SEC']],
  ['ACCESS_PROGRESS', ['MOBILE', 'ACCESS']],
  ['DEPLOY_PROGRESS', ['DEPLOY', 'PERF', 'LAUNCH', 'SUPPORT']],
];

const TASK_RE = /^- \[( |x|X)\] \*\*(\w+)-\d+\*\*/;


const todoLines = fs.readFileSync(TODO_FILE, 'utf8').split(/\r?\n/);
const tasks = [];
todoLines.forEach((line, idx) => {
  const m = TASK_RE.exec(line);
  if (m) {
    const status = m[1];
    const code = m[2];
    tasks.push({ code, status, line: line.trim(), lineNumber: idx + 1 });
  }
});

// DEBUG: Print parsed tasks and their statuses
console.log('--- Parsed Tasks ---');
tasks.forEach(t => {
  console.log(`Line ${t.lineNumber}: [${t.status}] ${t.code} | ${t.line}`);
});
console.log(`Total parsed tasks: ${tasks.length}`);

function countTasks(codes) {
  const filtered = tasks.filter(t => codes.includes(t.code));
  const total = filtered.length;
  const completed = filtered.filter(t => t.status.toLowerCase() === 'x').length;
  const inprogress = 0; // Not tracked
  const notstarted = total - completed;
  const rate = total ? Math.round((completed / total) * 100) : 0;
  return { total, completed, inprogress, notstarted, rate };
}

const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.status.toLowerCase() === 'x').length;
const inprogressTasks = 0;
const notstartedTasks = totalTasks - completedTasks;
const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

const phaseStats = PHASES.map(([name, prefixes]) => {
  const stat = countTasks(prefixes);
  return { name, ...stat };
});

const featureStats = FEATURES.map(([varname, prefixes]) => {
  const stat = countTasks(prefixes);
  return { varname, rate: stat.rate };
});

let dashboard = fs.readFileSync(DASHBOARD_FILE, 'utf8');
const replacements = {
  '<!--TOTAL_TASKS-->': totalTasks,
  '<!--COMPLETED_TASKS-->': completedTasks,
  '<!--IN_PROGRESS_TASKS-->': inprogressTasks,
  '<!--NOT_STARTED_TASKS-->': notstartedTasks,
  '<!--COMPLETION_RATE-->': completionRate,
};
phaseStats.forEach((stat, i) => {
  const idx = i + 1;
  replacements[`<!--PHASE${idx}_TOTAL-->`] = stat.total;
  replacements[`<!--PHASE${idx}_COMPLETED-->`] = stat.completed;
  replacements[`<!--PHASE${idx}_INPROGRESS-->`] = stat.inprogress;
  replacements[`<!--PHASE${idx}_NOTSTARTED-->`] = stat.notstarted;
  replacements[`<!--PHASE${idx}_RATE-->`] = stat.rate;
});
featureStats.forEach(({ varname, rate }) => {
  replacements[`<!--${varname}-->`] = `${rate}%`;
});
Object.entries(replacements).forEach(([k, v]) => {
  dashboard = dashboard.replace(new RegExp(k, 'g'), v);
});
fs.writeFileSync(DASHBOARD_FILE, dashboard, 'utf8');
console.log('Progress dashboard updated.');
