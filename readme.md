![current release](https://img.shields.io/github/release/pattern-lab/edition-node-gulp.svg) ![license](https://img.shields.io/github/license/pattern-lab/edition-node-gulp.svg) [![Join the chat at Gitter](https://badges.gitter.im/pattern-lab/node.svg)](https://gitter.im/pattern-lab/node)

# Pattern Lab Node - Gulp Edition

The Gulp wrapper around [Pattern Lab Node Core](https://github.com/pattern-lab/patternlab-node), the default PatternEngine, and supporting frontend assets.

## Prerequisites

This Edition uses [Node](https://nodejs.org) for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [gulp.js](http://gulpjs.com/) to run tasks and interface with the core library. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm.

## Getting Started

This edition comes pre-packaged with a couple simple gulp tasks. Extend them as needed.

**build** patterns, copy assets, and construct ui

```bash
gulp patternlab:build
```

build patterns, copy assets, and construct ui, watch source files, and **serve** locally

```bash
gulp patternlab:serve
```

logs Pattern Lab Node usage and **help** content

```bash
gulp patternlab:help
```

To interact further with Pattern Lab Node, such as to install plugins or starterkits, check out the rest of the `gulpfile.js`. You could also install the [Pattern Lab Node Command Line Interface](https://github.com/pattern-lab/patternlab-node-cli) or learn more about the [core API](https://github.com/pattern-lab/patternlab-node#usage).

## Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository, and the [master instructions for core](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading). The components are listed at the top of the README.
