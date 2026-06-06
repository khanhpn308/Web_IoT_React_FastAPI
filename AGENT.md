## Cost-aware multi-agent workflow

This project uses a cost-aware agent workflow.

### Model usage policy

Do not use GPT-5.5 xhigh for routine work.

Use `espidf-architect-gpt55-xhigh` only for:
- architecture decisions;
- FreeRTOS task/queue/semaphore/timer design;
- sdkconfig changes;
- partition table changes;
- pin mapping changes;
- CMake/component structure changes;
- complex runtime failures;
- high-risk firmware decisions.

Use lower-cost agents for routine work:
- `espidf-docs-gpt54-mini` for TASKS.md, DECISIONS.md, changelogs.md, TEST_REPORT.md.
- `espidf-coder-gpt54` for implementation.
- `espidf-reviewer-gpt55` for review.
- `espidf-log-analyzer-gpt54` for logs.

### Dispatcher rule

The main dispatcher must not read the entire repository unless necessary.

Prefer:
- targeted file reads;
- `git status --short`;
- `git diff --stat`;
- `git diff --unified=0`;
- reading AGENTS.md, TASKS.md, changelogs.md, TEST_REPORT.md first.

### Documentation delegation rule

The dispatcher should delegate documentation updates to `espidf-docs-gpt54-mini`.

GPT-5.5 xhigh must not be used to write routine changelog, task list, or test report entries.