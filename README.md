/* ─────────────────────────────────────────────────
   RESET & BASE
───────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-bg:           #F7F7F5;
  --color-surface:      #FFFFFF;
  --color-border:       #E4E4E0;
  --color-border-hover: #C8C8C2;

  --color-text-primary:   #1A1A18;
  --color-text-secondary: #6B6B66;
  --color-text-hint:      #A0A09A;

  --color-accent:         #534AB7;   /* purple — primary action */
  --color-accent-hover:   #3C3489;

  --color-high:   #E24B4A;   /* red dot — high priority */
  --color-medium: #EF9F27;   /* amber dot — medium */
  --color-low:    #1D9E75;   /* teal dot — low */

  --color-success-bg:   #EAF3DE;
  --color-success-text: #3B6D11;

  --color-danger-text: #A32D2D;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-pill: 999px;

  --shadow-card: 0 1px 3px rgba(0,0,0,0.07), 0 0 0 0.5px rgba(0,0,0,0.06);

  --font: 'Inter', system-ui, sans-serif;
  --transition: 0.15s ease;
}

body {
  font-family: var(--font);
  background: var(--color-bg);
  color: var(--color-text-primary);
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ─────────────────────────────────────────────────
   LAYOUT
───────────────────────────────────────────────── */
.container {
  max-width: 560px;
  margin: 0 auto;
}

/* ─────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────── */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.app-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-title .ti {
  font-size: 22px;
  color: var(--color-accent);
}

.task-count {
  font-size: 13px;
  color: var(--color-text-secondary);
}

/* ─────────────────────────────────────────────────
   ADD TASK SECTION
───────────────────────────────────────────────── */
.add-task-section {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 0.5px solid var(--color-border);
  box-shadow: var(--shadow-card);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.input-row {
  display: flex;
  gap: 8px;
}

/* Text input */
.task-input {
  flex: 1;
  font-family: var(--font);
  font-size: 15px;
  color: var(--color-text-primary);
  background: var(--color-bg);
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 12px;
  height: 38px;
  outline: none;
  transition: border-color var(--transition);
}

.task-input::placeholder {
  color: var(--color-text-hint);
}

.task-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(83,74,183,0.12);
}

.task-input.error {
  border-color: var(--color-high);
  box-shadow: 0 0 0 3px rgba(226,75,74,0.12);
}

/* Priority select */
.priority-select {
  font-family: var(--font);
  font-size: 13px;
  color: var(--color-text-secondary);
  background: var(--color-bg);
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 8px;
  height: 38px;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition);
}

.priority-select:focus {
  border-color: var(--color-accent);
}

/* Add button */
.add-btn {
  font-family: var(--font);
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-md);
  padding: 0 16px;
  height: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background var(--transition), transform var(--transition);
  white-space: nowrap;
}

.add-btn:hover  { background: var(--color-accent-hover); }
.add-btn:active { transform: scale(0.97); }

.add-btn .ti { font-size: 16px; }

/* Inline error hint */
.input-hint {
  font-size: 12px;
  color: var(--color-high);
  margin-top: 6px;
  min-height: 16px;
}

/* ─────────────────────────────────────────────────
   FILTER BAR
───────────────────────────────────────────────── */
.filter-bar {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-btn {
  font-family: var(--font);
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-secondary);
  background: transparent;
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: 5px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background var(--transition), color var(--transition), border-color var(--transition);
}

.filter-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
}

.filter-btn.active {
  background: var(--color-surface);
  border-color: var(--color-accent);
  color: var(--color-accent);
  font-weight: 500;
  box-shadow: var(--shadow-card);
}

.filter-btn .ti { font-size: 13px; color: var(--color-high); }

/* ─────────────────────────────────────────────────
   TASK LIST
───────────────────────────────────────────────── */
.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Each task row */
.task-item {
  background: var(--color-surface);
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: border-color var(--transition), transform var(--transition);
  animation: slideIn 0.15s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.task-item:hover {
  border-color: var(--color-border-hover);
}

/* Checkbox circle */
.task-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border-hover);
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), border-color var(--transition);
}

.task-checkbox:hover {
  border-color: var(--color-accent);
}

.task-checkbox.done {
  background: var(--color-success-text);
  border-color: var(--color-success-text);
}

.task-checkbox .ti {
  font-size: 12px;
  color: #fff;
  display: none;
}

.task-checkbox.done .ti {
  display: block;
}

/* Priority color dot */
.priority-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Task text */
.task-text {
  flex: 1;
  font-size: 15px;
  color: var(--color-text-primary);
  word-break: break-word;
  transition: color var(--transition);
}

.task-text.done {
  text-decoration: line-through;
  color: var(--color-text-hint);
}

/* Priority badge (shown inline next to text) */
.priority-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  flex-shrink: 0;
}

.priority-badge.high   { background: #FCEBEB; color: #A32D2D; }
.priority-badge.medium { background: #FAEEDA; color: #854F0B; }
.priority-badge.low    { background: #E1F5EE; color: #0F6E56; }

/* Delete button (hidden until hover) */
.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-hint);
  padding: 4px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  opacity: 0;
  transition: color var(--transition), background var(--transition), opacity var(--transition);
  flex-shrink: 0;
}

.task-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: var(--color-high);
  background: #FCEBEB;
}

.delete-btn .ti { font-size: 16px; }

/* ─────────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: var(--color-text-hint);
}

.empty-state .ti {
  font-size: 36px;
  display: block;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 14px;
}

/* ─────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────── */
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--color-border);
}

.remaining {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.clear-btn {
  font-family: var(--font);
  font-size: 13px;
  color: var(--color-danger-text);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}

.clear-btn:hover {
  background: #FCEBEB;
}

/* ─────────────────────────────────────────────────
   RESPONSIVE (mobile)
───────────────────────────────────────────────── */
@media (max-width: 480px) {
  body { padding: 1.25rem 0.75rem 3rem; }

  .input-row { flex-wrap: wrap; }
  .task-input { width: 100%; }
  .priority-select { flex: 1; }
  .add-btn { flex: 1; justify-content: center; }

  .delete-btn { opacity: 1; }  /* always visible on touch screens */
}
