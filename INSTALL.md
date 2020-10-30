Build and Install
=================

Latest notes - slight guessing games.

No Build step is needed.

Installation requires Firebase.

I successfully updated the Firebase CLI tools in a **Windows CMD** console:

```console
npm install -g firebase-tools
```

I successfully deployed from a **Git-Bash** console using these commands:

- Make sure Firebase is using the right project:

```bash
firebase list
```

- If it is, then deploy:

```bash
firebase deploy --debug
```

**Note**: if not used for a while, you might get authentication errors,
even if it also reports you are logged in.

- The solution might be to log out and log in again.
- If it (also) complains about not being interactive, you can add
  `--interactive` as a command switch.
- You might also need to log out/log in again if you update the
  Firebase tools significantly.
