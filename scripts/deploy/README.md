# GoodVPN production frontend

Every push to `main` and manual `main` runs build/test user and admin, check SEO artifacts, then deploy both static sites. Other branches never publish.

Repository secrets: `PPANEL_DEPLOY_HOST`, `PPANEL_DEPLOY_USER`, `PPANEL_DEPLOY_PASSWORD`, `PPANEL_DEPLOY_KNOWN_HOSTS`. The host key must come from an independently trusted existing SSH connection, not an unverified scan. No credentials belong in Git. Restrict main write access to trusted maintainers: main can use production credentials.

Targets: `/opt/1panel/www/sites/ppanel-user/index` and `ppanel-admin/index`. No backend, database, service configuration or policy API writes occur. `legal/goodvpn-policies.json` is a reference document; it is not automatically imported into the backend.

The build contains the privacy-policy query cache-key fix that previously required the production importmap override. New entrypoints therefore do not carry the old chunk-specific map.

Deployment backs up both sites under `/opt/1panel/backups/goodvpn-frontend/<commit>-<timestamp>`, copies assets before atomically replacing each entrypoint, and compares served content through local HTTPS against the built bytes. Failure restores prior files. Old hashed chunks are retained for already-open tabs; rollback restores previous files but does not delete newly introduced static files. Backups require periodic operator retention management.

Manual rollback: copy the selected snapshot's non-entry files first and atomically replace `index.html` last for each site, then verify local HTTPS. Do not restore older backend data or modify other hosted sites.

The inherited upstream semantic-release workflow is limited to its upstream repository so it cannot publish releases to the wrong project from this fork.
