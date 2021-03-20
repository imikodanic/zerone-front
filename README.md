# Zerone

### Starting up

```
npm install

npm run dev
```

Make sure you set up your File watcher if you're using Webstorm

1. Go to settings
2. File watchers
3. Add a file watcher and select "custom"
4. Set up the configuration like this

```
Name: Prettier
File type: Any
Scope: Project Files
Program: $ProjectFileDir$/node_modules/.bin/prettier
Arguments: --write $FilePathRelativeToProjectRoot$
Output paths to refresh: $FilePathRelativeToProjectRoot$
Working directory: $ProjectFileDir$

-- Advanced --
Auto-save edited files to trigger the watcher: false
```
