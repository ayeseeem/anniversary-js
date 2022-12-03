Build and Install
=================

Latest notes - slight guessing games.

No Build step is needed.

Installation requires Firebase.

-- ICM 2022-12-03: Latest recommendation when I ran firebase:

```console
   ╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
   │                                                                                                                     │
   │                                          Update available 9.21.0 → 11.16.1                                          │
   │                    To update to the latest version using npm, run npm install -g firebase-tools                     │
   │   For other CLI management options, visit the CLI documentation (https://firebase.google.com/docs/cli#update-cli)   │
   │                                                                                                                     │
   │                                                                                                                     │
   │                                                                                                                     │
   ╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

I successfully updated the Firebase CLI tools in a **Windows CMD** (non-Admin)
console:

```console
npm install -g firebase-tools
```

Last deployed with the following tools -- ICM 2022-12-03:

- `firebase --version`: 11.16.1
- `node --version`: v18.12.1
- `npm --version`: 9.1.3

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
