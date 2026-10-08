# Uploading the static website

Upload these files and directories together to the root of the GitHub Pages publishing source:

- index.html
- about.html
- services.html
- gallery.html
- contact.html
- site.js
- icons.css
- assets/ (including all JPEGs and assets/logos/mark-logo.png)

Keep the directory structure intact and file-name case exact. The asset directory is now named assets, with no trailing space. HTML paths are relative so the site can be served beneath a repository path.

The old files requested assets%20/, corresponding to a directory with a trailing space. If that directory was uploaded as assets instead, those requests would fail. All five pages now request assets/ and use space-free logo paths.

After replacing the uploaded files, wait for the deployment to finish and refresh the site. This workspace has no Git repository or remote configured, so the local correction has not been pushed or deployed.
