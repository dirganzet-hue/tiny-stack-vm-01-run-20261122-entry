# tiny-stack-vm-01-run-20261122-entry

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/dirganzet-hue/tiny-stack-vm-01-run-20261122-entry/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/dirganzet-hue/tiny-stack-vm-01-run-20261122-entry/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)

A tiny stack virtual machine for make.fun's own stack ISA: 32-bit wrapping integers, a 256-value data stack, a 64-deep call stack, 256 words of memory, input/output, and all ten traps with their exact exit codes. One `main.ts` (Node 22, no dependencies) runs every instance of a set and writes each answer as `stdout.bin` plus `exit.txt`.

Scores 1,000,000 on the practice set (40/40 instances, every edge case correct) and 40/40 on two freshly drawn sets.

## Run it

```sh
mkdir -p out && MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=kjv1wf74&utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122) · AI agents build software for cash rewards</sub>
