#!/usr/bin/env python3
"""Publish trusted CI-built static assets, retaining old chunks for open sessions."""
import fcntl
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone

stage = Path(sys.argv[1]).resolve()
revision = sys.argv[2]
if not re.fullmatch(r"[0-9a-f]{40}", revision):
    raise SystemExit("Expected a full Git commit SHA")
root = Path("/opt/1panel/www/sites")
backup = Path("/opt/1panel/backups/goodvpn-frontend") / (revision + "-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ"))
backup.mkdir(parents=True, exist_ok=True)
lock = open("/var/lock/goodvpn-frontend.lock", "w")
fcntl.flock(lock, fcntl.LOCK_EX)
for app in ("user", "admin"):
    source = stage / app
    if not (source / "index.html").is_file():
        raise SystemExit(f"Missing {app} entry")
    if any(p.is_symlink() for p in source.rglob("*")):
        raise SystemExit("Symlinks are not allowed in deployment assets")
    for p in source.rglob("*"):
        if p.is_file() and (p.name.startswith(".env") or p.suffix in (".pem", ".key")):
            raise SystemExit("Unexpected sensitive file in artifact")
    target = root / f"ppanel-{app}" / "index"
    if not (backup / app).exists():
        shutil.copytree(target, backup / app)

def publish(source, target):
    files = [p for p in source.rglob("*") if p.is_file()]
    # Commit the entry only after every referenced versioned asset is available.
    files.sort(key=lambda p: p.relative_to(source).as_posix() == "index.html")
    for p in files:
        dest = target / p.relative_to(source)
        dest.parent.mkdir(parents=True, exist_ok=True)
        tmp = dest.with_name(dest.name + ".deploy-tmp")
        shutil.copyfile(p, tmp)
        tmp.chmod(0o644)
        os.replace(tmp, dest)

try:
    for app in ("user", "admin"):
        target = root / f"ppanel-{app}" / "index"
        publish(stage / app, target)
    for app, host in (("user", "goodvpn.app"), ("admin", "admin.goodvpn.app")):
        body = subprocess.check_output(["curl", "--fail", "--silent", "--show-error", "--max-time", "20", "--resolve", f"{host}:443:127.0.0.1", f"https://{host}/"])
        if body != (stage / app / "index.html").read_bytes():
            raise RuntimeError(f"Published {app} entry does not match artifact")
    for path in ("sitemap.xml", "guides/en/", "guides/zh/"):
        body = subprocess.check_output(["curl", "--fail", "--silent", "--show-error", "--max-time", "20", "--resolve", "goodvpn.app:443:127.0.0.1", f"https://goodvpn.app/{path}"])
        asset = stage / "user" / path
        if asset.is_dir():
            asset = asset / "index.html"
        if body != asset.read_bytes():
            raise RuntimeError(f"Published content mismatch: {path}")
except Exception:
    for app in ("user", "admin"):
        publish(backup / app, root / f"ppanel-{app}" / "index")
    raise
(backup / "release.json").write_text(json.dumps({"commit": revision, "verified": True}) + "\n")
print(f"Published and verified frontend {revision}; rollback snapshot: {backup}")
