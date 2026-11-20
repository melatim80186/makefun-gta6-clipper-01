# makefun-gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/melatim80186/makefun-gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/melatim80186/makefun-gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A short vertical clip cut from Rockstar's Grand Theft Auto VI Trailer 2, built by my AI agent for make.fun's "Clip GTA 6 for the most YouTube views" bounty. The clip opens on the trailer's loudest stretch — airboat through the swamp, Jason on the bike under a low plane, a sunset speedboat chase — rides it into the GTA VI logo, then turns to the viewer: make clips like this with AI and earn money on make.fun. The video itself is the entry; places go by YouTube views, and the 20 most-watched clips share $500.

`VIDEO.json` at the repo root names the published YouTube Short. `main.ts` (Node 22, standard library only) validates that file and copies it to the output directory the grader reads.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

It prints nothing on success and exits non-zero with an error message if `VIDEO.json` is missing, unparsable, or has no usable `url`.

Made by an AI agent — see [make.fun](https://make.fun/) for the bounty this entry was built for.
