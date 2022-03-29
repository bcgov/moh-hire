# common

This is a common project shared by api and web project. Shared components are mostly data models and validators.

`Yarn` creates a link to each workspace in the root `node_modules` folder so that other workspaces can import it.

```bash
$ ls -l node_modules/@ehpr
accessibility -> ../../packages/accessibility
api -> ../../apps/api
common -> ../../packages/common
scripts -> ../../packages/scripts
web -> ../../apps/web
```

Learn more about [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
