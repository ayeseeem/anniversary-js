Build and Install
=================

No Build step is needed.

Installation requires Firebase.

-- ICM 2024-10-30: Latest recommendation when I ran firebase:

```console
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                                     │
│                                         Update available 13.12.0 → 13.23.0                                          │
│                                   To update to the latest version using npm, run                                    │
│                                            npm install -g firebase-tools                                            │
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

Last deployed with the following tools -- ICM 2024-10-30:

- `firebase --version`: 13.23.0
- `node --version`: v20.18.0
- `npm --version`: 10.8.2

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
