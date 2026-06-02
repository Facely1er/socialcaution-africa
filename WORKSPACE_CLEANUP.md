# Workspace cleanup (completed)

## Removed from workspace

| Folder | Status |
|--------|--------|
| `ERMITS-SocialCaution-persona` | Deleted |
| `socialcaution-continental` | Deleted |
| `socialcaution-africa-visible-update` | **Could not delete** — `node_modules` locked (esbuild/rollup in use) |

## Canonical repo

Use only:

`c:\Users\facel\Downloads\GitHub\ERMITS_DEPLOYMENTS\socialcaution-africa`

## Manual step (if visible-update still exists)

1. Stop any `npm run dev` or Vite process using that folder
2. Close Cursor workspace roots pointing at the old copies
3. Delete manually:

```powershell
Remove-Item -Recurse -Force "c:\Users\facel\Downloads\socialcaution-africa-visible-update"
```

Merged content from visible-update and persona is already in `socialcaution-africa`.
