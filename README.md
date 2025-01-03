# E2E Guru Testing

### Install packages (PLaywright + cucumber-js)

```shell
 git clone https://github.com/axelSchouten/e2e-guru.git
 cd e2e-guru
 npm install
```

The Structure

```shell
├── Makefile
├── README.md
├── cucumber.js
├── e2e
├── node_modules
├── package-lock.json
├── package.json
├── support
└── tsconfig.json
```

### Launch Test

```shell
make open-tags ARGS="your tag here...""
```