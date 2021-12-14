# @iyowei/callsite-home

> 获取引用当前模块的脚本被调用时所在应用的根目录。

命令行应用会有诸如读取 "默认模板"、“默认配置” 一类需要，如果这些默认文件被设计放在应用安装目录下，就需要先获取该应用被安装的绝对路径，这与 `process.cwd()` 得到的当前工作目录是不同的，当前工作目录是执行命令行应用所在的位置。

## 使用

```js
import { log } from 'console';
import { callsiteHome, callsiteHomeSync } from '@iyowei/callsite-home';

log(callsiteHomeSync('create-esm'));
// /Users/iyowei/Development/iyowei/create-esm

(async () => {
  const tmpPath = await callsiteHome();
  log(tmpPath);
  // /Users/iyowei/Development/iyowei/create-esm
})();
```

## API

### callsiteHome([pathSegment])

- pathSegment {String} 路径片段，一般是应用的名称，不提供的情况下会自动识别，但推荐手动提供，**选填**；
- 返回 {`Promise<String>`} 引用当前模块的脚本被调用时所在应用的根目录。

### callsiteHomeSync([pathSegment])

- pathSegment {String} 路径片段，一般是应用的名称，不提供的情况下会自动识别，但推荐手动提供，**选填**；
- 返回 {String} 引用当前模块的脚本被调用时所在应用的根目录。

## 安装

[![Node version](https://img.shields.io/badge/node.js-%3E%3D12.20.0-brightgreen?style=flat&logo=Node.js)](https://nodejs.org/en/download/)

```shell
# Pnpm
pnpm add @iyowei/callsite-home

# yarn
yarn add @iyowei/callsite-home

# npm
npm add @iyowei/callsite-home
```

## 参与贡献
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)
