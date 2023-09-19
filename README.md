# PoC Say as a Web Component

This repository contains some hacks to show how Say could be added as a Web Component.  The structure is not intended to be clean it is mostly here as a showcase that this approach can be a viable approach.

## Why?

A Web Component could make it easier for others to embed Say.  The approach in itself could also help to discover ways in which Say can be configured in other frameworks or more simple websites.

## Available setups

A few tryouts are provided here, some nicer than others.  These are tryouts and they should be seen as such.  Code duplication is embraced as a perfectly viable discovery strategy at this point.

## index.html

A first approach for rendering a web component.  This tryout tries to mimic the example embedding of embeddable in a web component and does not require the use of a web server.  Visit the file under `file://` and it should work.

This approach has been iterated on later.

## index2.html

Similar to the first approach but this one depends on a hosted module instead.  In order to visit this, use the accompanied docker-compose.yml to easily boot up a web server with these local files hosted.  Visit `http://localhost:8888/index2.html` to see the result.

The example creates a web component by loading in external sources as an ES6 module.  The component could be loaded from an external source also, but here it is provided locally.  Minimal configuratino is provided in the hopes that it provides a sense of understanding what is going on.

## embeddables.html

Can be opened in the browser directly through a `file://` link.  No need to install a web server.

This example renders two editors.  Documentation is in-line.  You can use `<say-editor></say-editor>` to use the editor in this setup and it can be used before or after defining the web component.

The code has been cleaned up and extended a bit.  There is an `init=` argument which may be supplied a globally available function to execute when the editor has been initialized.  This allows you to set initial contents.
