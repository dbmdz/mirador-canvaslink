# mirador-canvaslink

[![npm package][npm-badge]][npm]
[![required Mirador version][mirador-badge]][mirador]

A Mirador 3 plugin which adds a dialog for sharing links via mail or WhatsApp or to Facebook, Pinterest and Twitter.

![Screenshot][screenshot]

## Installation

Currently the plugin can only be used if you build your own Mirador JavaScript bundle.
To include the plugin in your Mirador installation, you need to install it
from npm with `npm install mirador-canvaslink`, import it into your project
and pass it to Mirador when you instantiate the viewer:

```javascript
import Mirador from 'mirador/dist/es/src/index';
import canvasLinkPlugin from 'mirador-canvaslink/es';

const miradorConfig = {
  // Your Mirador configuration
}
Mirador.viewer(config, [...canvasLinkPlugin]);
```

## Configuration

You can configure the plugin globally for all windows and/or individually for
every window.

For global configuration add the `canvasLink` entry to the top-level
`window` configuration (globally for all windows) or to the individual window
object:

```javascript
const miradorConfig = {
  window: {
    // ....
    canvasLink: {
      // Global config for all windows, see available settings below
    },
  },
  windows: [{
    // ....
    canvasLink: {
      // config for an individual window, see available settings below
    },
  }, // ...
}
```

You can view an example configuration in [demo/src/index.js][demo-cfg].

The available settings are:

- `getCanvasLink`: **Required**. A function that returns a link for the currently visible canvases.
  Receives this information about the current window:
  ```
  {
    manifestId: ...,
    visibleCanvases: [...],
  }
  ```
  Must return a string.
- `dialogOpen`: If the share dialog is open. Boolean, defaults to `false`.
- `enabled`: If the plugin is enabled. Boolean, defaults to `true`.
- `showRightsInformation`: If rights information defined in the manifest should be shown. Boolean, defaults to `true`.
- `singleCanvasOnly`: Set to true, if `getCanvasLink` can only generate links for a single canvas, this will
  disable the "Share" button in book view.

## Contributing

Found a bug? The plugin is not working with your manifest? Want a new
feature? Create an issue, or if you want to take a shot at fixing it
yourself, make a fork, create a pull request, we're always open to
contributions :-)

For larger changes/features, it's usually wise to open an issue before
starting the work, so we can discuss if it's a fit.

**Note**: The package requires Node.js `16` and npm in major version `8`.

[demo-cfg]: https://github.com/dbmdz/mirador-canvaslink/blob/main/demo/src/index.js#L5-L38
[mirador]: https://github.com/ProjectMirador/mirador/releases/tag/v3.3.0
[mirador-badge]: https://img.shields.io/badge/Mirador-%E2%89%A53.3.0-blueviolet
[npm]: https://www.npmjs.org/package/mirador-canvaslink
[npm-badge]: https://img.shields.io/npm/v/mirador-canvaslink.png?style=flat-square
[screenshot]: .docassets/screenshot.png
