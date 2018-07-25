# Contribution Guidelines

## Commit Messages (for Internal AppNexus Contributors)

Prepend your commit message with the approrpiate JIRA ticket number: `CR-####: ...`.

## Merging Branches

Squashing commits is not mandatory, but can optionally be done to clean up Git history if your change is particularly large.

## Raising Github Issues 

If you are an external (non-AppNexus employee) contributor, feel free to create Github issues, and the internal team will respond as soon as possible.

# Development Guidelines

## Installation

Run the following from the directory where you want the repo to live in

```
git clone <this-repo-url> html5-lib
cd html5-lib
npm install
```

<br /><br />
## Development

You can develop and test on the fly by running:

```
npm run watch
```
This will automatically rebuild `appnexus-html5-lib.js` when any of the files under `src` change.


To view example creatives, simply double click on them to open them up in your browser.

<br /><br />
## Building

To build the minified version run:

```
npm run build
```

This will build two files, `appnexus-html5-lib.js` and `appnexus-html5-lib.min.js`.

<br /><br />
## Deploying

For deploying run:

```
npm version [major|minor|patch]
```

This will build the library, test it, and create a tag with the new version if tests don't fail.


The appnexus-html-lib.min.js needs to be placed on the CDN in a folder corresponding to its version number. for example `https://acdn.adnxs.com/html5-lib/1.0.0/appnexus-html5-lib.min.js`. Always use the version tag file under dist.

Dont forget to update the examples to point to the latest tag been released.

<br /><br />
