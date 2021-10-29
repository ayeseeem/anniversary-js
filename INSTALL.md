Build and Install
=================

Latest notes - slight guessing games.

No Build step is needed.

Installation requires Firebase.
Last modified with the following tools -- ICM 2021-10-29:

- `firebase --version`: 8.14.1
- `node --version`: v14.15.0
- `npm --version`: 6.14.8

I successfully updated the Firebase CLI tools in a **Windows CMD** (non-Admin?)
console:

```console
npm install -g firebase-tools
```

-- ICM 2020-10-30: Latest recommendation when I run firebase:

```console
   ╭───────────────────────────────────────────╮
   │     Update available 6.0.1 → 8.14.1       │
   │   Run npm i -g firebase-tools to update   │
   │                                           │
   ╰───────────────────────────────────────────╯
```

I successfully deployed from a **Windows CMD** (non-Admin) console (previously
used/succeeded with Git-Bash) using these commands:

- Make sure Firebase is using the right project:

```console
firebase projects:list
```

- If it is, then deploy:

```console
firebase deploy --debug
```

**Note**: if not used for a while, you might get authentication errors,
or timeout errors, even if it also reports you are logged in.

- The solution might be to log out and log in again -
  `firebase logout`, `firebase login`
- If it (also) complains about not being interactive, you can add
  `--interactive` as a command switch.
- You might also need to log out/log in again if you update the
  Firebase tools significantly.
