# SkyGIS fork notes

This is the SkyGIS fork of `pnext/three-loader`. **Ship from the
`skygis-deviation` branch only.** The SkyGIS app depends on it as
`github:ivancsicsmarkus/three-loader#skygis-deviation`, pinned by commit sha
in its `pnpm-lock.yaml`, and installs the COMMITTED `build/` folder (nothing
is compiled on install).

The full guide (features, who uses them, the change-and-rebuild recipe,
gotchas) lives in the app repo: `docs/three-loader-fork.md`.

## Added over upstream

- `material.customScalarRgbBelow` — `number | null`. Under
  `PointColorType.CUSTOM_SCALAR`, a point whose scalar is at or below it (or
  NaN) draws its own RGB instead of the gradient; class colours still win.
  Uniform-only. (SkyGIS clearance: the "Colour + RGB" mode, RGB beyond the
  outermost near-miss band.)
- `material.customScalarClassColors` — `{ [classification]: Color }`, up to
  `CUSTOM_SCALAR_CLASS_SLOTS` (4). Under `PointColorType.CUSTOM_SCALAR` those
  classes draw in a fixed colour instead of the gradient. Uniform-only.
  (SkyGIS clearance: track bed 24, noise 25.)
- `PointColorType.CUSTOM_SCALAR` (51) — colour by any extra attribute:
  `customAttributeName`, `customScalarRange`, `gradient`.
- Potree v1 octrees whose nodes are whole LAZ/LAS files
  (`src/loading/laz-node-loader.ts`, `src/workers/laz-decoder.worker.js`).
- Potree 2 Brotli-encoded octrees (`src/loading2/brotli-decoder.ts`).
- Committed `build/`, `prepare` script.

## Releasing a change

1. Edit `src/`; `npm ci --ignore-scripts && npm run build`.
2. `npx prettier --write "build/**/*.{js,ts}"` (the committed build is
   prettier-formatted, or the diff is minified noise).
3. Commit `src/` + `build/` together, push `skygis-deviation`.
4. In the app: replace the old sha with the new one in `pnpm-lock.yaml`,
   `pnpm install --frozen-lockfile`, `pnpm typecheck` in `app/`.
