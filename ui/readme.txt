New setup instructions:
======================

- In node_modules/gulp-lodash-template/index.js, replace "var _ = {}" to "var _ = window._ || {}" everywhere (currently, can see at two places)
