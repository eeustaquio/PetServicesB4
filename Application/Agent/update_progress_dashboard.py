import re
from collections import defaultdict

# Path to your todo list markdown
TODO_FILE = r"c:/elzar/code/PetServicesb3/Application/Agent/ComprehensiveBuildTodoLists.md"
DASHBOARD_FILE = r"c:/elzar/code/PetServicesb3/Application/Agent/ProgressDashboard.md"

# Define phase and feature area mapping (by task code prefix)
PHASES = [
    ("Project Foundation", ["ENV", "ARCH", "CICD"]),
    ("Core Features", ["AUTH", "PROF", "SERV", "PROV", "BOOK", "PET"]),
    ("Advanced Features", ["PAY", "TRANS", "NOTIF", "AI", "ADMIN"]),
    ("Quality & Perf.", ["TEST", "SEC", "MOBILE", "ACCESS"]),
    ("Deployment/Launch", ["DEPLOY", "PERF", "LAUNCH", "SUPPORT"]),
]
FEATURES = [
    ("AUTH_PROGRESS", ["AUTH"]),
    ("PROF_PROGRESS", ["PROF"]),
    ("SERV_PROGRESS", ["SERV", "PROV"]),
    ("BOOK_PROGRESS", ["BOOK"]),
    ("PET_PROGRESS", ["PET"]),
    ("PAY_PROGRESS", ["PAY", "TRANS"]),
    ("NOTIF_PROGRESS", ["NOTIF"]),
    ("AI_PROGRESS", ["AI"]),
    ("ADMIN_PROGRESS", ["ADMIN"]),
    ("TEST_PROGRESS", ["TEST", "SEC"]),
    ("ACCESS_PROGRESS", ["MOBILE", "ACCESS"]),
    ("DEPLOY_PROGRESS", ["DEPLOY", "PERF", "LAUNCH", "SUPPORT"]),
]

# Regex to match tasks
TASK_RE = re.compile(r"^- \[( |x|X)\] \*\*(\w+)-\d+\*\*")

# Parse tasks
with open(TODO_FILE, encoding="utf-8") as f:
    lines = f.readlines()

tasks = []
for line in lines:
    m = TASK_RE.match(line)
    if m:
        status = m.group(1)
        code = m.group(2)
        tasks.append((code, status))

def count_tasks(codes):
    filtered = [s for c, s in tasks if c in codes]
    total = len(filtered)
    completed = sum(1 for s in filtered if s.lower() == "x")
    inprogress = 0  # Not tracked in this format
    notstarted = total - completed
    rate = int((completed / total) * 100) if total else 0
    return total, completed, inprogress, notstarted, rate

# Overall
total_tasks = len(tasks)
completed_tasks = sum(1 for _, s in tasks if s.lower() == "x")
inprogress_tasks = 0  # Not tracked
notstarted_tasks = total_tasks - completed_tasks
completion_rate = int((completed_tasks / total_tasks) * 100) if total_tasks else 0

# By phase
phase_stats = []
for name, prefixes in PHASES:
    codes = set(prefixes)
    stat = count_tasks(codes)
    phase_stats.append((name, *stat))

# By feature
feature_stats = []
for var, prefixes in FEATURES:
    codes = set(prefixes)
    stat = count_tasks(codes)
    feature_stats.append((var, stat[4]))

# Read dashboard template
with open(DASHBOARD_FILE, encoding="utf-8") as f:
    dashboard = f.read()

# Replace placeholders
replacements = {
    "<!--TOTAL_TASKS-->": str(total_tasks),
    "<!--COMPLETED_TASKS-->": str(completed_tasks),
    "<!--IN_PROGRESS_TASKS-->": str(inprogress_tasks),
    "<!--NOT_STARTED_TASKS-->": str(notstarted_tasks),
    "<!--COMPLETION_RATE-->": str(completion_rate),
}
for i, (name, total, completed, inprogress, notstarted, rate) in enumerate(phase_stats, 1):
    replacements[f"<!--PHASE{i}_TOTAL-->"] = str(total)
    replacements[f"<!--PHASE{i}_COMPLETED-->"] = str(completed)
    replacements[f"<!--PHASE{i}_INPROGRESS-->"] = str(inprogress)
    replacements[f"<!--PHASE{i}_NOTSTARTED-->"] = str(notstarted)
    replacements[f"<!--PHASE{i}_RATE-->"] = str(rate)
for var, rate in feature_stats:
    replacements[f"<!--{var}-->"] = f"{rate}%"

for k, v in replacements.items():
    dashboard = dashboard.replace(k, v)

with open(DASHBOARD_FILE, "w", encoding="utf-8") as f:
    f.write(dashboard)

print("Progress dashboard updated.")
