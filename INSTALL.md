Build and Install
=================

No Build step is needed.

Installation requires Firebase.

-- ICM 2026-11-02: Latest recommendation when I ran firebase:

```console
   ╭───────────────────────────────────────────────────────────────────╮
   │                                                                   │
   │                Update available 14.23.0 → 15.34.2                 │
   │          To update to the latest version using npm, run           │
   │                   npm install -g firebase-tools                   │
   │   For other CLI management options, visit the CLI documentation   │
   │                                                                   │
   │                                                                   │
   │                                                                   │
   ╰───────────────────────────────────────────────────────────────────╯
```

I successfully updated the Firebase CLI tools in a **Windows CMD** (non-Admin)
console:

```console
npm install -g firebase-tools
```

Last deployed with the following tools -- ICM 2026-11-02:

- `firebase --version`: 15.34.2
- `node --version`: v26.13.0
- `npm --version`: 11.20.0

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
