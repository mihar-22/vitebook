# [0.26.0](https://github.com/vitebook/vitebook/compare/v0.25.3...v0.26.0) (2022-05-27)

### Features

- **svelte:** new stores for easier app context access ([aacb232](https://github.com/vitebook/vitebook/commit/aacb232b1b925c579a57e0777d898259bc2ebde9))

## [0.25.3](https://github.com/vitebook/vitebook/compare/v0.25.2...v0.25.3) (2022-05-27)

### Bug Fixes

- **create:** output global styles file by default ([fa6fda0](https://github.com/vitebook/vitebook/commit/fa6fda056c5ea58fff173ba7535537a6f682a0f1))

## [0.25.2](https://github.com/vitebook/vitebook/compare/v0.25.0...v0.25.2) (2022-05-27)

### Bug Fixes

- **core:** add workspace root `node_modules` to allowed files ([4350e8d](https://github.com/vitebook/vitebook/commit/4350e8dbba7f5e59ada9d536bfacb13f92a42e1c))
- **core:** do not crawl links inside `<head>` ([91be5f2](https://github.com/vitebook/vitebook/commit/91be5f2078ba70b94662d98835f205274cf6b9b8))
- **create:** add markdown files to tailwind content ([c787350](https://github.com/vitebook/vitebook/commit/c78735071d3f68b4b5dc8b1e5bb09b91a9a5e515))
- **create:** add missing svelte globals to `shim.d.ts` ([76327fd](https://github.com/vitebook/vitebook/commit/76327fd8b69c7f2cc390558b3bcb416d20b69481))
- **create:** inject global css file in root `index.html` to avoid FOUC ([dcae9ab](https://github.com/vitebook/vitebook/commit/dcae9ab7f14dd1cd85622b9d60bc1af0920586fd))

# [0.25.0](https://github.com/vitebook/vitebook/compare/v0.24.2...v0.25.0) (2022-05-26)

### Features

- **core:** add dynamic routes support ([f5fe291](https://github.com/vitebook/vitebook/commit/f5fe2911b8e07aed1bbddbcd562c0324bd034c77))
- **core:** hash and flatten data in production ([ae77531](https://github.com/vitebook/vitebook/commit/ae77531d8e22de8e231764888529b429b545f04a))
- **core:** new server `loader` for layouts/pages ([c46d44d](https://github.com/vitebook/vitebook/commit/c46d44d797729c8c852480b1c4e7cb8c9b6c5b5c))
- refactor core to be library agnostic ([6dccaaf](https://github.com/vitebook/vitebook/commit/6dccaaf61efdffd3ac8ae6310a43223ac4638b69))

## [0.24.2](https://github.com/vitebook/vitebook/compare/v0.24.1...v0.24.2) (2022-05-18)

### Bug Fixes

- **core:** add `exclude` option for markdoc nodes ([e5aff07](https://github.com/vitebook/vitebook/commit/e5aff0742c7d94bf8c1e98f15a0a9ede30853c3b))
- **core:** index pages are not built correctly ([050c08b](https://github.com/vitebook/vitebook/commit/050c08b38684d1dc086c7bdd24f1102135a0e9b9))

## [0.24.1](https://github.com/vitebook/vitebook/compare/v0.24.0...v0.24.1) (2022-05-18)

### Bug Fixes

- bundle some troublesome deps ([4fda565](https://github.com/vitebook/vitebook/commit/4fda56574d9bc17ab05e4ca3d12af8b177862d29))
- **core:** add `exclude` option to pages config ([6c71e5a](https://github.com/vitebook/vitebook/commit/6c71e5a690e24d38541c60dbb32afa4624997775))
- **core:** delete extra `language` prop when passed to component ([2cd8edd](https://github.com/vitebook/vitebook/commit/2cd8eddf9d48e389283a950848a0ebf1eeb5a2c6))
- **create:** add missing `@vitebook/svelte` dep ([e075811](https://github.com/vitebook/vitebook/commit/e075811531e5bb7b1f445d6dd2cfd910bf6f2a31))

# [0.24.0](https://github.com/vitebook/vitebook/compare/v0.23.6...v0.24.0) (2022-05-18)

### Bug Fixes

- **create:** small create fixes ([61a0996](https://github.com/vitebook/vitebook/commit/61a0996472574cd4b5cd0e1009c5c603a336b891))
- remove everything and refactor core ([cd39d19](https://github.com/vitebook/vitebook/commit/cd39d1938de9d8a3d11edeae1ba9e5bbf5a6e4ab))

### Features

- add layouts support ([eb9474a](https://github.com/vitebook/vitebook/commit/eb9474aa4945fd481d11538fb5c22358f4867fe5))
- markdoc integration ([09de4f7](https://github.com/vitebook/vitebook/commit/09de4f7f12d5483711e8c9e2e3637861f907c94a))
- new markdown support ([940d481](https://github.com/vitebook/vitebook/commit/940d4816bcbb831e9a0902c08fdc8382b12ebbc4))
- refactor svelte package out of core ([6382d48](https://github.com/vitebook/vitebook/commit/6382d48503e875a4e7a46f3cfef01ffd13c2973a))

## [0.23.6](https://github.com/vitebook/vitebook/compare/v0.23.5...v0.23.6) (2022-04-21)

### Bug Fixes

- **client:** event in svelte custom event ([#57](https://github.com/vitebook/vitebook/issues/57)) ([#73](https://github.com/vitebook/vitebook/issues/73)) ([8f33feb](https://github.com/vitebook/vitebook/commit/8f33febb6d09c6fabdf00bb3115466863c870a33))
- **core:** fix windows absolute path related bug ([#77](https://github.com/vitebook/vitebook/issues/77)) ([0d132d4](https://github.com/vitebook/vitebook/commit/0d132d48ab1dad89d1d3967ed9e56a6eb13531e3))

## <small>0.23.5 (2022-04-06)</small>

- fix: add inBrowser check to ButtonLink (#68) ([c94ce61](https://github.com/vitebook/vitebook/commit/c94ce61)), closes [#68](https://github.com/vitebook/vitebook/issues/68)
- fix(theme-default): use list-style decimal for ol (#49) ([ab30ea2](https://github.com/vitebook/vitebook/commit/ab30ea2)), closes [#49](https://github.com/vitebook/vitebook/issues/49)

## <small>0.23.4 (2022-03-01)</small>

- fix: make `filePathToRoute` synchronous (#47) ([05cd5f9](https://github.com/vitebook/vitebook/commit/05cd5f9)), closes [#47](https://github.com/vitebook/vitebook/issues/47)

## <small>0.23.3 (2022-03-01)</small>

- fix: ordered relative markdown links throw (#46) ([c3f05be](https://github.com/vitebook/vitebook/commit/c3f05be)), closes [#46](https://github.com/vitebook/vitebook/issues/46) [#45](https://github.com/vitebook/vitebook/issues/45)

## <small>0.23.2 (2022-02-27)</small>

- fix: page sorting by file name order is not working ([783b1a4](https://github.com/vitebook/vitebook/commit/783b1a4)), closes [#43](https://github.com/vitebook/vitebook/issues/43)

## <small>0.23.1 (2022-02-25)</small>

- feat: allow `root` to be passed to preview command ([ab0e947](https://github.com/vitebook/vitebook/commit/ab0e947))

## 0.23.0 (2022-02-24)

- feat(create): provide helpful tip when adding markdown support to existing vite config ([da9e098](https://github.com/vitebook/vitebook/commit/da9e098))
- fix(vue): `configureApp` is not a function ([aa9e162](https://github.com/vitebook/vitebook/commit/aa9e162)), closes [#37](https://github.com/vitebook/vitebook/issues/37) [#39](https://github.com/vitebook/vitebook/issues/39)

# [0.22.0](https://github.com/vitebook/vitebook/compare/v0.21.3...v0.22.0) (2022-02-11)

### Bug Fixes

- reading `etag` of `undefined` - vite `^2.8.0` ([c442030](https://github.com/vitebook/vitebook/commit/c442030d8fc35a691faad8cd6b1ba75834c5d744))
- **theme-default:** addons should not scroll with page ([024290c](https://github.com/vitebook/vitebook/commit/024290ccb4795ed72df891e9df306873659f86d1))

## [0.21.3](https://github.com/vitebook/vitebook/compare/v0.21.2...v0.21.3) (2022-02-08)

### Bug Fixes

- page container should flow vertically ([8454fc0](https://github.com/vitebook/vitebook/commit/8454fc0bc64d3cfd03615e2690c4220e2ac2046c)), closes [#34](https://github.com/vitebook/vitebook/issues/34)

## [0.21.2](https://github.com/vitebook/vitebook/compare/v0.21.1...v0.21.2) (2022-02-08)

### Bug Fixes

- **core:** filter out duplicate routes and log warning ([b221e51](https://github.com/vitebook/vitebook/commit/b221e515947b812bff71779a990df24bb49adef2)), closes [#28](https://github.com/vitebook/vitebook/issues/28)
- **core:** improve initial custom route detection when using `__route` ([934c18c](https://github.com/vitebook/vitebook/commit/934c18c042871fa748a4d3e96f4fd740fe8a1cbf)), closes [#28](https://github.com/vitebook/vitebook/issues/28)
- use CI-safe `$app` alias for svelte kit ([679d500](https://github.com/vitebook/vitebook/commit/679d500fd389bb54d618abbef69645e85b008e98)), closes [#26](https://github.com/vitebook/vitebook/issues/26)

## [0.21.1](https://github.com/vitebook/vitebook/compare/v0.21.0...v0.21.1) (2022-02-07)

### Bug Fixes

- **create:** do not mess with order of pkg scripts ([661e64e](https://github.com/vitebook/vitebook/commit/661e64e4da188af0504bc7b83b4eeb06a5eea83a))
- **create:** features are being incorrectly filtered ([6d3a76e](https://github.com/vitebook/vitebook/commit/6d3a76ebe9dd2875ef3d6dbf94c577d2659f7721))
- **create:** remove some annoying side-effects when creating in existing dir ([afd0883](https://github.com/vitebook/vitebook/commit/afd0883eda124fb09eb0806ff3e46932f1e147db))
- **create:** set initial prompt value for theme to `default` ([aad1bc4](https://github.com/vitebook/vitebook/commit/aad1bc4b56f55f01a3389866c38dcf7309920e45))

# [0.21.0](https://github.com/vitebook/vitebook/compare/v0.20.2...v0.21.0) (2022-02-07)

### Features

- custom page routes ([ffe7b54](https://github.com/vitebook/vitebook/commit/ffe7b54e0bb7f7b4c179f31c33e9e70453832912)), closes [#28](https://github.com/vitebook/vitebook/issues/28)

## [0.20.2](https://github.com/vitebook/vitebook/compare/v0.20.1...v0.20.2) (2022-02-06)

### Bug Fixes

- config for svelte requires `hydratable` compiler option ([6bc3d32](https://github.com/vitebook/vitebook/commit/6bc3d32e52ca9b890bf191f6b13afb26532479cb)), closes [#30](https://github.com/vitebook/vitebook/issues/30) [#32](https://github.com/vitebook/vitebook/issues/32)

## [0.20.1](https://github.com/vitebook/vitebook/compare/v0.20.0...v0.20.1) (2022-02-03)

### Bug Fixes

- mark framework vite packages as external in node builds ([e9de643](https://github.com/vitebook/vitebook/commit/e9de643b852318060a40c588fc458fdff70179e8))

# [0.20.0](https://github.com/vitebook/vitebook/compare/v0.19.11...v0.20.0) (2022-02-02)

### Bug Fixes

- **create:** try to detect package manager based on lockfile ([616cf86](https://github.com/vitebook/vitebook/commit/616cf86a95e2034a72f58dc152e0842838924d2c))
- improve framework vite plugin resolution to work with pnpm ([0abb983](https://github.com/vitebook/vitebook/commit/0abb983e6cbe597f90f9889f5523b0063cbaf9c3)), closes [#25](https://github.com/vitebook/vitebook/issues/25)
- remove `just-*` deps from vite optimization ([d803b87](https://github.com/vitebook/vitebook/commit/d803b877768d6dc1eb594ef4d083e3466921f5c5)), closes [#25](https://github.com/vitebook/vitebook/issues/25)

### Features

- **create:** detect svelte-kit and adjust config ([be08a33](https://github.com/vitebook/vitebook/commit/be08a337dae14098d1a48bd97553a86fb117555c))

## [0.19.11](https://github.com/vitebook/vitebook/compare/v0.19.10...v0.19.11) (2022-02-02)

### Bug Fixes

- incorrect usage of `clicked` in markdown examples ([#19](https://github.com/vitebook/vitebook/issues/19)) ([76f4e19](https://github.com/vitebook/vitebook/commit/76f4e196d687ccf172d0ae84dcc42beedffe2bdc))
- ordered page numbers are showing in sidebar ([9d9c126](https://github.com/vitebook/vitebook/commit/9d9c126b228402a7bbc7b60dd6c363bfdcb99d61)), closes [#23](https://github.com/vitebook/vitebook/issues/23)
- windows path resolving of '.' in create-vitebook ([#24](https://github.com/vitebook/vitebook/issues/24)) ([f73c051](https://github.com/vitebook/vitebook/commit/f73c051be0b7f811304e33df624816a19d386cf6))

## [0.19.10](https://github.com/vitebook/vitebook/compare/v0.19.9...v0.19.10) (2022-01-31)

### Bug Fixes

- **create:** prefer `.story.*` extension by default ([8c5ebcc](https://github.com/vitebook/vitebook/commit/8c5ebcc931fb09b8bb4d99a0e6471394f0fd629d))

## [0.19.9](https://github.com/vitebook/vitebook/compare/v0.19.8...v0.19.9) (2022-01-31)

### Bug Fixes

- framework-specific vite plugin should be provided out of the box ([82578b3](https://github.com/vitebook/vitebook/commit/82578b3a0b47b8b0cd80eb7f5f9c42a4a1c7bef9))

## [0.19.8](https://github.com/vitebook/vitebook/compare/v0.19.7...v0.19.8) (2022-01-30)

### Bug Fixes

- **create:** update preact app files ([d44a30b](https://github.com/vitebook/vitebook/commit/d44a30b0c20aa93a484236e04468a79a105897c8))

## [0.19.7](https://github.com/vitebook/vitebook/compare/v0.19.6...v0.19.7) (2022-01-30)

### Bug Fixes

- preact/react broken due to multiple copies being imported ([4c2a54a](https://github.com/vitebook/vitebook/commit/4c2a54ad4340662ab0774a624c015e669ccb486b))

## [0.19.6](https://github.com/vitebook/vitebook/compare/v0.19.5...v0.19.6) (2022-01-29)

### Bug Fixes

- **theme-default:** normalize folder name casing to avoid git issues ([baf7e75](https://github.com/vitebook/vitebook/commit/baf7e75b8d183827887573ee506e19f001cb00ec))

## [0.19.5](https://github.com/vitebook/vitebook/compare/v0.19.4...v0.19.5) (2022-01-29)

### Bug Fixes

- move vite and all plugins to peer deps ([c971e78](https://github.com/vitebook/vitebook/commit/c971e78acbf0e6397d5db306a945f06e9c3d31f6)), closes [#18](https://github.com/vitebook/vitebook/issues/18) [#17](https://github.com/vitebook/vitebook/issues/17)

## <small>0.19.4 (2022-01-20)</small>

- fix(create): `useVitePreprocess` configured incorrectly ([5dd1cbc](https://github.com/vitebook/vitebook/commit/5dd1cbc))

## [0.19.3](https://github.com/vitebook/vitebook/compare/v0.19.2...v0.19.3) (2022-01-17)

### Bug Fixes

- **preact:** revert 3d0fd8424d1151e9a2251bd9e90b4c7d060239b7 ([76d1cda](https://github.com/vitebook/vitebook/commit/76d1cda72472b5ef57eb31b1de0ea94dc3123fa2))

## [0.19.2](https://github.com/vitebook/vitebook/compare/v0.19.1...v0.19.2) (2022-01-17)

### Bug Fixes

- **preact:** include few preact required vite optimizations ([216ace8](https://github.com/vitebook/vitebook/commit/216ace8697c93ab0de29ad6c1b000a32386147c3))

## [0.19.1](https://github.com/vitebook/vitebook/compare/v0.19.0...v0.19.1) (2022-01-17)

### Bug Fixes

- **preact:** simplify dep optimization due to breaking dev env ([3d0fd84](https://github.com/vitebook/vitebook/commit/3d0fd8424d1151e9a2251bd9e90b4c7d060239b7))

# [0.19.0](https://github.com/vitebook/vitebook/compare/v0.18.6...v0.19.0) (2022-01-17)

### Features

- **preact:** bump `@preact/preset-vite` from `2.1.5` to `2.1.7` ([80b0aaa](https://github.com/vitebook/vitebook/commit/80b0aaaaa1679c214bb11caf6deccedab1ab1210))

## [0.18.6](https://github.com/vitebook/vitebook/compare/v0.18.5...v0.18.6) (2022-01-17)

### Bug Fixes

- **theme-default:** flex addon portal and set direction to column ([08b11d9](https://github.com/vitebook/vitebook/commit/08b11d9c8a68855c87cfb0090ad5d3005d7adbd7))

## [0.18.5](https://github.com/vitebook/vitebook/compare/v0.18.4...v0.18.5) (2022-01-17)

### Bug Fixes

- **preact:** include missing `preact/*` deps from vite optmization ([e6b9b33](https://github.com/vitebook/vitebook/commit/e6b9b33ffd8237b8e111cfe231b5d206b293d38d))

## [0.18.4](https://github.com/vitebook/vitebook/compare/v0.18.3...v0.18.4) (2022-01-17)

### Bug Fixes

- **client:** include throttle/debounce deps in vite optimization ([7055c73](https://github.com/vitebook/vitebook/commit/7055c738d66ab83b137244b63a66f74c222413f8))
- **core:** improve handling of unlinked pages ([9275473](https://github.com/vitebook/vitebook/commit/92754737ad5b4311e1e6577152320702e14dddc3))

## [0.18.3](https://github.com/vitebook/vitebook/compare/v0.18.2...v0.18.3) (2022-01-14)

### Bug Fixes

- give up on prismjs for now -\_- ([c84e0c2](https://github.com/vitebook/vitebook/commit/c84e0c201be518b6fde71048363fa13f926f6178))

## [0.18.2](https://github.com/vitebook/vitebook/compare/v0.18.1...v0.18.2) (2022-01-14)

### Bug Fixes

- **client:** prism does not export correctly when bundled (attempt 2) ([e9f843e](https://github.com/vitebook/vitebook/commit/e9f843e3bbf58f4ea7591e0697ee2f447d397539))

## [0.18.1](https://github.com/vitebook/vitebook/compare/v0.18.0...v0.18.1) (2022-01-14)

### Bug Fixes

- **client:** prism does not export correctly when bundled ([cfe6524](https://github.com/vitebook/vitebook/commit/cfe6524d810e706c549d4a3ac7d5be62d8f8b062))

# [0.18.0](https://github.com/vitebook/vitebook/compare/v0.17.0...v0.18.0) (2022-01-14)

### Features

- **client:** allow `eventCallback` whitelist to be extended ([1f0ea35](https://github.com/vitebook/vitebook/commit/1f0ea35e2abebaa4fbb966d7d3cf7c5aaf65fed1))
- **theme-default:** add event output syntax highlighting in addon ([835a332](https://github.com/vitebook/vitebook/commit/835a332e1f85268f21b1889125d6a5b36c390138))

# [0.17.0](https://github.com/vitebook/vitebook/compare/v0.16.2...v0.17.0) (2022-01-14)

### Bug Fixes

- story hmr closing addons panel ([39d216f](https://github.com/vitebook/vitebook/commit/39d216f7cf9455c1ea43b454c39559ae9c7f3e2a))
- **theme-default:** file matching dir name matching failing ([e60c7e6](https://github.com/vitebook/vitebook/commit/e60c7e696d2372d26804f09aeed87d34e7d4ca2f))

### Features

- **theme-default:** save active addon panel to local storage ([8b5b927](https://github.com/vitebook/vitebook/commit/8b5b9276cf84352faab1b1c2bb2eeac89869152e))

## [0.16.2](https://github.com/vitebook/vitebook/compare/v0.16.1...v0.16.2) (2022-01-11)

### Bug Fixes

- allow `public/logo.svg` to specify own dimensions ([a8fa6d2](https://github.com/vitebook/vitebook/commit/a8fa6d2ce3d4bf81a3a69c51d55618ea2104e004))
- improve inferred sidebar titles ([d05b225](https://github.com/vitebook/vitebook/commit/d05b2256bcdb853b86260d779732e258b69b6772))

## [0.16.1](https://github.com/vitebook/vitebook/compare/v0.16.0...v0.16.1) (2022-01-11)

### Bug Fixes

- **create:** svelte is now a core dependency ([4e71f4a](https://github.com/vitebook/vitebook/commit/4e71f4a0d06831237373d8ce473b4108608410a7))

# [0.16.0](https://github.com/vitebook/vitebook/compare/v0.15.1...v0.16.0) (2022-01-11)

### Bug Fixes

- **client:** prefer vite preprocessing `.svelte` files ([9596b28](https://github.com/vitebook/vitebook/commit/9596b2828cb42e05f3825d00bc26e96835fa50db))
- move framework deps to `peerDependencies` ([1f19433](https://github.com/vitebook/vitebook/commit/1f1943313216a8fb0c443d58e6d50f5d1c147455))

### Features

- add `debouncedEventCallback` for `EventsAddon` ([c708320](https://github.com/vitebook/vitebook/commit/c708320ba004c5705b7bfb7354db888ca0f0be42))
- add `throttledEventCallback` for `EventsAddon` ([a3fbb2e](https://github.com/vitebook/vitebook/commit/a3fbb2e7af987b44f7170ea7259223cc02c49981))
- improve logging events in `EventsAddon` ([45b52f9](https://github.com/vitebook/vitebook/commit/45b52f992cc83b99f7cb19911735a6e3a687f7be))

## [0.15.1](https://github.com/vitebook/vitebook/compare/v0.15.0...v0.15.1) (2022-01-11)

### Bug Fixes

- **create:** include `vite/client` in tsconfig `types` ([2fd2573](https://github.com/vitebook/vitebook/commit/2fd25738c02c3cb49d1366f5a80a481428e95d5d))

# [0.15.0](https://github.com/vitebook/vitebook/compare/v0.14.1...v0.15.0) (2022-01-11)

### Bug Fixes

- **vue:** `EventsAddon` not destroyed correctly ([31cce9b](https://github.com/vitebook/vitebook/commit/31cce9bc4797f251f886d52a1ed3a1e401180bfe))

### Features

- emit `enter`/`exit` events on `Variant` ([d88d6b2](https://github.com/vitebook/vitebook/commit/d88d6b2eeab928b81623dbbdfd60e7cce1de2c02))

## [0.14.1](https://github.com/vitebook/vitebook/compare/v0.14.0...v0.14.1) (2022-01-10)

### Bug Fixes

- get rid of use `flex-end` warning ([b8c1c1c](https://github.com/vitebook/vitebook/commit/b8c1c1cbe5e4f1c0c6757b7cf2a099858babfb26))

# [0.14.0](https://github.com/vitebook/vitebook/compare/v0.13.1...v0.14.0) (2022-01-10)

### Bug Fixes

- `focus-visible` polyfill error msg on build ([8820244](https://github.com/vitebook/vitebook/commit/88202446bd9c7bb52c9c97e233b80b51306dae9e))

### Features

- **create:** add tailwind feature ([9b87318](https://github.com/vitebook/vitebook/commit/9b8731880d6e0818707b910045e6e5de6240ebba))
- preact addons ([38077cc](https://github.com/vitebook/vitebook/commit/38077cc93f9a6a2b248fb745ff62a463ecd262ee)), closes [#2](https://github.com/vitebook/vitebook/issues/2) [#3](https://github.com/vitebook/vitebook/issues/3) [#5](https://github.com/vitebook/vitebook/issues/5)
- simplify addon import paths ([4d3013a](https://github.com/vitebook/vitebook/commit/4d3013acda297641aea3c63301bd6cee454fc4b8))
- svelte events addon ([fd44d24](https://github.com/vitebook/vitebook/commit/fd44d24bac00ff43998a011d7463b6e1b6a22155)), closes [#5](https://github.com/vitebook/vitebook/issues/5)
- svelte page addons ([#12](https://github.com/vitebook/vitebook/issues/12)) ([63b6782](https://github.com/vitebook/vitebook/commit/63b67823615448f51e96226ed8740796b029eae2))
- vue addons ([4249bd8](https://github.com/vitebook/vitebook/commit/4249bd8a18609b81e368e13bfd81d9e050810567)), closes [#2](https://github.com/vitebook/vitebook/issues/2) [#3](https://github.com/vitebook/vitebook/issues/3) [#5](https://github.com/vitebook/vitebook/issues/5)

## [0.13.1](https://github.com/vitebook/vitebook/compare/v0.13.0...v0.13.1) (2022-01-02)

### Bug Fixes

- **create:** remove `??=` so `create` package works on node `>=14` ([3f7a447](https://github.com/vitebook/vitebook/commit/3f7a447c2266c4b1592051c6f8591ecf47f24df7))

# [0.13.0](https://github.com/vitebook/vitebook/compare/v0.12.1...v0.13.0) (2022-01-02)

### Features

- **create:** add warning and instructions for node `<16` ([2984311](https://github.com/vitebook/vitebook/commit/298431139dde65730ac7c881d8f77fb4511bd7f3))
- toggle now updates `dark` class instead of attr for tailwind users ([16a3b87](https://github.com/vitebook/vitebook/commit/16a3b87c0b38326c7e05aa4e0176c45e8562e23b))

## [0.12.1](https://github.com/vitebook/vitebook/compare/v0.12.0...v0.12.1) (2021-12-13)

### Bug Fixes

- **core:** sort ordered directories correctly ([38f44f9](https://github.com/vitebook/vitebook/commit/38f44f9bd5c7b3ea00e08250095b3aea43154bb6))
- **markdown-vue:** temp disable external link icons - breaking vue builds ([42648a8](https://github.com/vitebook/vitebook/commit/42648a87a783c9ee6d114b5c63bd5280177710c1))
- **theme-default:** improve floating markdown toc responsiveness ([0c78f75](https://github.com/vitebook/vitebook/commit/0c78f7574621e52ee657e01ab691463cec95ddea))
- **theme-default:** navbar fallback fouc in dark mode ([b253a75](https://github.com/vitebook/vitebook/commit/b253a75d0ebbe08916e8c757d5b413c8c3ef1e44))
- **theme-default:** variants menu not opening on mobile ([fae78bf](https://github.com/vitebook/vitebook/commit/fae78bf6ef3ddfe98209265eb50fc38338376573))

# [0.12.0](https://github.com/vitebook/vitebook/compare/v0.11.0...v0.12.0) (2021-12-13)

### Features

- bump `vite` to `2.7.1` ([a80bfe4](https://github.com/vitebook/vitebook/commit/a80bfe4d0fa993aaef29eae7f2361e5fe7567a71))

# [0.11.0](https://github.com/vitebook/vitebook/compare/v0.10.0...v0.11.0) (2021-11-24)

### Bug Fixes

- **theme-default:** code highlight color hard to see on light theme ([1d7a90a](https://github.com/vitebook/vitebook/commit/1d7a90ad743dfa7c9481114fd0577257b53dcbd0))

### Features

- add global app component to config dir ([1342846](https://github.com/vitebook/vitebook/commit/13428460a8d1a4771e1fc277b8cce38c05dd0e93))

# [0.10.0](https://github.com/vitebook/vitebook/compare/v0.9.0...v0.10.0) (2021-11-16)

### Bug Fixes

- **client:** tabs with `groupId` not setting default value ([a029ae0](https://github.com/vitebook/vitebook/commit/a029ae0e3af605c0447953c7d003291676dde0e1))
- **create:** add `// [@ts-check](https://github.com/ts-check)` to non-ts config files ([d5e915e](https://github.com/vitebook/vitebook/commit/d5e915e4f45fe7f8b0a692f358571f1064300105))
- increase tabs margin to `2rem` from `1.15rem` ([c476d56](https://github.com/vitebook/vitebook/commit/c476d56fb2f281cff977eef64e312372c1a6a5e2))
- remove potentially unused imports from main exports ([c431a3f](https://github.com/vitebook/vitebook/commit/c431a3f0ea7ec07edf69e356091de5912abc4ed2))
- **theme-default:** focus box shadow missing from prev/next md links ([579c85c](https://github.com/vitebook/vitebook/commit/579c85c51ce03ba28ced2d46f874577ad31f7192))
- **theme-default:** md toc issues when last header is at page bottom ([3ee5166](https://github.com/vitebook/vitebook/commit/3ee51664b0c9ed569d94898e7d81ab5d90a302f4))

### Features

- **client:** optimize svelte markdown files using static analysis ([43a223f](https://github.com/vitebook/vitebook/commit/43a223f05fdb3f47fd174459db16b605cbb5b4e3))

# [0.9.0](https://github.com/vitebook/vitebook/compare/v0.8.3...v0.9.0) (2021-11-15)

### Bug Fixes

- **theme-default:** initialize dark mode in production correctly ([e14ff6e](https://github.com/vitebook/vitebook/commit/e14ff6ec9f4a171e2c3cc0bc4707cdb6dc50e7f0))
- **theme-default:** no active header links on mobile ([60612be](https://github.com/vitebook/vitebook/commit/60612be57c5a23a0ebbc37a899e35f0278a8eeac))

### Features

- new `<Tabs />` component ([76e9f2a](https://github.com/vitebook/vitebook/commit/76e9f2a3602bf134e564f1d62a5356fe4812c53d))

## [0.8.3](https://github.com/vitebook/vitebook/compare/v0.8.2...v0.8.3) (2021-11-11)

### Bug Fixes

- **client:** improve hash routing ([84d653e](https://github.com/vitebook/vitebook/commit/84d653ece35bb1d36f7d5ff7b34df6a57302d8b8))
- **theme-default:** body scrolling broken on larger devices ([ba15d3a](https://github.com/vitebook/vitebook/commit/ba15d3aa77022beb1970ba0b89669e6394630629))
- **theme-default:** make sure body bg-color matches theme ([3345438](https://github.com/vitebook/vitebook/commit/3345438dbe1c5d371b334f1a31d9253539664773))
- **theme-default:** prevent light/dark theme flash on initial load (2) ([9987096](https://github.com/vitebook/vitebook/commit/99870961ea98366bd2e49fc90a8b51586e32b440))
- **theme-default:** prevent page/sidebar sliding left/right on touch ([f12684e](https://github.com/vitebook/vitebook/commit/f12684e22e5820b8d33488fceda662aada66ef15))
- **theme-default:** prevent sidebar shifting up on short md pages ([e2f0b1c](https://github.com/vitebook/vitebook/commit/e2f0b1ce6223e589b4394414b47bd2c80a1e69cc))
- **theme-default:** prevent taps on mobile going through scrim ([e5597cf](https://github.com/vitebook/vitebook/commit/e5597cfc457c47f51add511b825f24b44ac6afc8))

## [0.8.2](https://github.com/vitebook/vitebook/compare/v0.8.1...v0.8.2) (2021-11-10)

### Bug Fixes

- **theme-default:** ensure `header-anchor` is visible on smaller devices ([5883ced](https://github.com/vitebook/vitebook/commit/5883ced89245ce7ba5b7ed203831a3a3d2ab3701))
- **theme-default:** improve prev/next links on mobile ([cafca73](https://github.com/vitebook/vitebook/commit/cafca735072b6c282d6096dcaf30d8bdcf8ea510))
- **theme-default:** prevent `undefined` showing while repo icon loading ([081691e](https://github.com/vitebook/vitebook/commit/081691e9e5620d8ad3440e67df1e45cb50c75801))
- **theme-default:** prevent light/dark theme flash on initial load ([4eb2df8](https://github.com/vitebook/vitebook/commit/4eb2df88bf0f6d79698ecbd583a519a8cf27455e))
- **theme-default:** set active hashes only after user scrolls ([4e02e19](https://github.com/vitebook/vitebook/commit/4e02e19c821328180170fe9198ab44a7a640dbef))

## [0.8.1](https://github.com/vitebook/vitebook/compare/v0.8.0...v0.8.1) (2021-11-10)

### Bug Fixes

- **core:** `cssCodeSplit` breaking prod builds ([6d006cf](https://github.com/vitebook/vitebook/commit/6d006cf617810698569ea73f02f87d4676c05196))

# [0.8.0](https://github.com/vitebook/vitebook/compare/v0.7.1...v0.8.0) (2021-11-10)

### Features

- render preload directives for svelte/vue ssr rendered components ([7a5db2b](https://github.com/vitebook/vitebook/commit/7a5db2b7acd78222f3ba5ee00c6f61f6014a7228))

## [0.7.1](https://github.com/vitebook/vitebook/compare/v0.7.0...v0.7.1) (2021-11-10)

### Bug Fixes

- downgrade `vite` to `2.7.0-beta.1` ([3a50dd0](https://github.com/vitebook/vitebook/commit/3a50dd0999b9a0073f2db28732622d6ff5225b30))

# [0.7.0](https://github.com/vitebook/vitebook/compare/v0.6.1...v0.7.0) (2021-11-10)

### Bug Fixes

- **core:** duplicate entry chunk preload tags ([96607d3](https://github.com/vitebook/vitebook/commit/96607d32270cf4b7f0fef796a993bda11332cc1d))
- **core:** social tags being rendered incorrectly ([110dc94](https://github.com/vitebook/vitebook/commit/110dc944dc1c3925c2b66d3b68bd8638484d8deb))

### Features

- bump `vite` to `2.7.0-beta.3` ([b9730d9](https://github.com/vitebook/vitebook/commit/b9730d9d068b988197d048d0af6de8eebccc0a8b))
- **core:** split `svelte` internals into separate chunk ([4edbd64](https://github.com/vitebook/vitebook/commit/4edbd645d59ea0e309ed8a364262dae0f1a3c1d6))
- **core:** tidy up css/js chunk file names ([d6af983](https://github.com/vitebook/vitebook/commit/d6af9830d0c46797f82061aa8716e441b0ed3474))

## [0.6.1](https://github.com/vitebook/vitebook/compare/v0.6.0...v0.6.1) (2021-11-10)

### Bug Fixes

- **theme-default:** `MarkdownFloatingToc` not found in CI due to casing ([89d1a05](https://github.com/vitebook/vitebook/commit/89d1a05f4562654cb5202186019ac656301fcd04))

# [0.6.0](https://github.com/vitebook/vitebook/compare/v0.5.0...v0.6.0) (2021-11-09)

### Bug Fixes

- **client:** emoji in url hash not working ([8ea7021](https://github.com/vitebook/vitebook/commit/8ea702101530f071882483b051de1c4f8c85bfb3))
- hmr not working with vue/svelte markdown ([41d5751](https://github.com/vitebook/vitebook/commit/41d5751e278ecbd7676cdab0cdcffbc9ac834317))
- **markdown:** comments are stripped out breaking svelte templates ([5c96b08](https://github.com/vitebook/vitebook/commit/5c96b08346f322da24234a252e283ff178871ccb))
- **theme-default:** add default list style ([c06f15e](https://github.com/vitebook/vitebook/commit/c06f15ef8ca8724a1fec84284ca80ca4cf10cc17))
- **theme-default:** multi-sidebar config not resolving paths correctly ([066663b](https://github.com/vitebook/vitebook/commit/066663baa285a05d72c372d3169640bdb283d998))
- **theme-default:** remove padding on markdown container above `1400px` ([701b9d4](https://github.com/vitebook/vitebook/commit/701b9d4c88f3ade7e1866ea2140d4278df23c100))
- **theme-default:** sidebar body should scroll under header ([b1f71f2](https://github.com/vitebook/vitebook/commit/b1f71f2d8ee4e8110285ec0d7bc4ca726bb022b4))
- **theme-default:** sidebar category item should not be focusable ([e50abfd](https://github.com/vitebook/vitebook/commit/e50abfdd0e7e8869691b62fc99e1f05b6de576e2))

### Features

- bump `svelte` to `3.44.1` ([2fc5990](https://github.com/vitebook/vitebook/commit/2fc5990e5d9728a59019ec4d95956edf5af2f54b))
- **core:** allow pages to be sorted via `[\d]` file name prefix ([7882313](https://github.com/vitebook/vitebook/commit/7882313bf988ca311d84c5f5f2caa5cfd2708638))
- **theme-default:** add links for repo and socials in navbar/sidebar ([5d8d8bc](https://github.com/vitebook/vitebook/commit/5d8d8bc6618c0a1f4a677a68b0944af7f82fbb0c))
- **theme-default:** enable different sidebar styles based on path ([2d43b90](https://github.com/vitebook/vitebook/commit/2d43b90f9cdf6f276823fce564cd54f076ac446e))
- **theme-default:** normalize internal link extensions to `.html` ([0142045](https://github.com/vitebook/vitebook/commit/0142045bea49331384c876da587fe4b10a84559c))

# [0.5.0](https://github.com/vitebook/vitebook/compare/v0.4.1...v0.5.0) (2021-11-05)

### Features

- **create:** new `custom` theme which replaces old `blank` theme ([0807098](https://github.com/vitebook/vitebook/commit/08070980ab822daeeecab1751a3d967c65216414))

## [0.4.1](https://github.com/vitebook/vitebook/compare/v0.4.0...v0.4.1) (2021-11-05)

### Bug Fixes

- **core:** drop superfluous `StoryMeta` (use `PageMeta`) ([19c6bc3](https://github.com/vitebook/vitebook/commit/19c6bc39e095eed1b87edcb55dffce70d3530ddd))
- **create:** drop `.story` in include statements (let user decide) ([8a2a042](https://github.com/vitebook/vitebook/commit/8a2a0427065e0e1ca9c7632c929a5876b1d3f5a5))
- **create:** drop `svelte-preprocess` by default (let user decide) ([ee95617](https://github.com/vitebook/vitebook/commit/ee95617e5f6f61b8e3145f6774eadf69099184e7))

# [0.4.0](https://github.com/vitebook/vitebook/compare/v0.3.1...v0.4.0) (2021-11-03)

### Features

- **create:** change `--local` option to `--link` with improved yarn support ([3e5c716](https://github.com/vitebook/vitebook/commit/3e5c716edf9e21aed482a862028a898efb1d7724))
- **theme-default:** sidebar categories + styles `explorer`/`docs` ([eccfc68](https://github.com/vitebook/vitebook/commit/eccfc68d55f504889f69ffaf4a0a7ba5fef306b8))

## [0.3.1](https://github.com/vitebook/vitebook/compare/v0.3.0...v0.3.1) (2021-11-03)

### Bug Fixes

- **create:** `--template` option is not checked ([2bc9e98](https://github.com/vitebook/vitebook/commit/2bc9e98cd5ee638cf89b70f82324fb4ec1d6a02a))
- **preact:** patch `@prefresh/vite` to support new `{ ssr }` option ([4c0bd94](https://github.com/vitebook/vitebook/commit/4c0bd94b8c2ce32fee921ec2661b3994a36c06d0))

# [0.3.0](https://github.com/vitebook/vitebook/compare/v0.2.2...v0.3.0) (2021-11-03)

### Bug Fixes

- **create:** change lib `es2017` to `esnext` ([4e8d8b2](https://github.com/vitebook/vitebook/commit/4e8d8b20ffec8c39f9bed8313e5f123896f68145))
- **create:** invalid regular expression in preact-ts starter ([0d3951f](https://github.com/vitebook/vitebook/commit/0d3951fd03faba1f9dcf8910d77547fe05097382))
- **create:** missing `)` in preact-ts starter ([b1939f0](https://github.com/vitebook/vitebook/commit/b1939f08aabc83993d2a778eca28fe875e3e22cd))
- **create:** simplify include regular expressions ([d1349c6](https://github.com/vitebook/vitebook/commit/d1349c6d487ceb89758097e0a021c86f91b9caff))

### Features

- bump `@prefresh/vite` to `2.2.3` ([10f079f](https://github.com/vitebook/vitebook/commit/10f079f6c6f9758226a44818b1adbe394ea1c2a0))
- bump `@sveltejs/vite-plugin-svelte` to `1.0.0-next.30` ([a4d764b](https://github.com/vitebook/vitebook/commit/a4d764b308655354d3de74c8ee3c79bbd72b4f6c))
- bump `@vitejs/plugin-vue` to `1.10.0-beta.0` ([2487134](https://github.com/vitebook/vitebook/commit/2487134cbae48259bcf9d7c1d050a9eff0da038f))
- bump vite to `2.7.0-beta.1` ([d937115](https://github.com/vitebook/vitebook/commit/d937115057a269a51bc3b04ccf516f84d8617038))

## [0.2.2](https://github.com/vitebook/vitebook/compare/v0.2.1...v0.2.2) (2021-11-03)

### Bug Fixes

- drop unnecessary peer deps ([6be2a33](https://github.com/vitebook/vitebook/commit/6be2a33ce788b7ca561dd69d8959cbc7256fd257))

## [0.2.1](https://github.com/vitebook/vitebook/compare/v0.2.0...v0.2.1) (2021-11-03)

### Features

- we can release on latest since <1.0 ([a9f3dc0](https://github.com/vitebook/vitebook/commit/a9f3dc0ceadd391dd771e24e703034a38c8f6bd9))

# [0.2.0](https://github.com/vitebook/vitebook/compare/v0.1.1...v0.2.0) (2021-11-03)

### Bug Fixes

- resolve prebuild issues ([6e08f38](https://github.com/vitebook/vitebook/commit/6e08f3871e68cbe7e4cc5cedb22cb71db3f13b56))

### Features

- **create:** include `--local` option for using local vitebook packages ([bffb3fb](https://github.com/vitebook/vitebook/commit/bffb3fb7e81ff36e2c4bf0a87a192e8301db4c40))

## [0.1.1](https://github.com/vitebook/vitebook/compare/v0.1.0...v0.1.1) (2021-11-02)

### Bug Fixes

- add theme scope class to prebuilt client builds ([3ef2325](https://github.com/vitebook/vitebook/commit/3ef2325b736b921112ef7517630d03e387adbca4))
- **client:** app cannot find entry file module ([a2b5232](https://github.com/vitebook/vitebook/commit/a2b5232047b9bf719f8c15b8c6f703c4d91a8363))
- **client:** avoid crashing when no route exists ([174f187](https://github.com/vitebook/vitebook/commit/174f1872a154ed7326bdedb787ef459396d8887e))

# [0.1.0](https://github.com/vitebook/vitebook/compare/v0.0.3...v0.1.0) (2021-11-02)

### Bug Fixes

- avoid minification and treeshaking on client builds ([8917335](https://github.com/vitebook/vitebook/commit/891733505c68356876d9242e24fc426236e67033))

### Features

- **core:** print preview server urls ([24473ee](https://github.com/vitebook/vitebook/commit/24473ee61ce3c11f2b49fcd6c99cdce8e8451015))
- **create:** first draft of `npm init vitebook` package ([d1a78d5](https://github.com/vitebook/vitebook/commit/d1a78d51b4336e1afda20f5f27649cb2d875abd8))
- prebuild all packages and includes types ([0cd6212](https://github.com/vitebook/vitebook/commit/0cd621284b4a5dece15671f9172330972589dbb7))

## [0.0.3](https://github.com/vitebook/vitebook/compare/v0.0.2...v0.0.3) (2021-10-28)

### Bug Fixes

- **core:** dev command does not print http urls for dev server ([d4333fe](https://github.com/vitebook/vitebook/commit/d4333fe660e72148aca2f73791399a39411883f8))
- **core:** vite injected browser hash breaking singletons ([0d40957](https://github.com/vitebook/vitebook/commit/0d4095760464665eac84ea4d1a85a9a33b679611))

### Features

- **core:** print vitebook version on build ([bea46c1](https://github.com/vitebook/vitebook/commit/bea46c12cbfa4b71f18e77e1493432e300116cab))

## [0.0.2](https://github.com/vitebook/vitebook/compare/v0.0.1...v0.0.2) (2021-10-28)

### Bug Fixes

- **client:** remove cyclic dependency between client and theme packages ([ac67ab6](https://github.com/vitebook/vitebook/commit/ac67ab6b118a571bd2f038ad2d7aaa5675562a60))
- **core:** vitebook virtual paths breaking due to vite optimizations ([b4fe76c](https://github.com/vitebook/vitebook/commit/b4fe76c5aeadab196ca0ada5797e758706c5ef73))

## 0.0.1 (2021-10-28)

### Features

- initial release ([b8d827c](https://github.com/vitebook/vitebook/commit/b8d827c316096d2f9b9206187d9aa3977bf4ae7e))
