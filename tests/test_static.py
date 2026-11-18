"""Local mini-grader for static/collect_static.js.

Runs collect() in a set of Playwright browser configs that differ in one
setting each (a guess at what the real grader varies), then reports:
  - stability: the same config run twice must give the same hash
  - uniqueness: different configs should give different hashes

Usage (from the repo root):
    .venv/bin/python tests/test_static.py
    .venv/bin/python tests/test_static.py --features   # also print feature JSON
"""

import functools
import http.server
import json
import sys
import threading
from collections import defaultdict
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO_ROOT = Path(__file__).resolve().parent.parent

# (name, engine, context options). Each differs from the baseline in one way.
CONFIGS = [
    ("chromium-default", "chromium", {}),
    ("firefox-default", "firefox", {}),
    ("webkit-default", "webkit", {}),
    ("chromium-viewport-800x600", "chromium", {"viewport": {"width": 800, "height": 600}}),
    ("chromium-dpr2", "chromium", {"device_scale_factor": 2}),
    ("chromium-locale-fr", "chromium", {"locale": "fr-FR"}),
    ("chromium-tz-tokyo", "chromium", {"timezone_id": "Asia/Tokyo"}),
    ("chromium-dark", "chromium", {"color_scheme": "dark"}),
    ("chromium-no-preference", "chromium", {"color_scheme": "no-preference"}),
    ("chromium-reduced-motion", "chromium", {"reduced_motion": "reduce"}),
    ("chromium-forced-colors", "chromium", {"forced_colors": "active"}),
    ("chromium-touch", "chromium", {"has_touch": True}),
    ("chromium-mobile", "chromium", {"is_mobile": True, "has_touch": True}),
    ("chromium-custom-ua", "chromium", {"user_agent": "Mozilla/5.0 (X11; Linux x86_64) TestUA/1.0"}),
    ("chromium-geo-granted", "chromium", {
        "permissions": ["geolocation"],
        "geolocation": {"latitude": 32.88, "longitude": -117.23},
    }),
    ("firefox-locale-de", "firefox", {"locale": "de-DE"}),
    ("webkit-dark", "webkit", {"color_scheme": "dark"}),
]

COLLECT_JS = """async () => {
    const m = await import('/static/collect_static.js');
    const hash = await m.collect();
    return [hash, window.__FP_FEATURES__];
}"""


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def start_server():
    """Serve the repo root over HTTP (ES modules can't load from file://)."""
    handler = functools.partial(QuietHandler, directory=str(REPO_ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f"http://127.0.0.1:{server.server_address[1]}"


def run_once(browser, base_url, opts):
    ctx = browser.new_context(**opts)
    try:
        page = ctx.new_page()
        page.goto(f"{base_url}/tests/blank.html")
        return page.evaluate(COLLECT_JS)
    finally:
        ctx.close()


def diff_keys(a_json, b_json):
    a, b = json.loads(a_json), json.loads(b_json)
    return sorted(k for k in a.keys() | b.keys() if a.get(k) != b.get(k))


def main():
    show_features = "--features" in sys.argv
    server, base_url = start_server()
    results = {}  # name -> (hash, features_json)
    unstable = []

    with sync_playwright() as p:
        browsers = {}
        for name, engine, opts in CONFIGS:
            if engine not in browsers:
                browsers[engine] = getattr(p, engine).launch()
            try:
                h1, f1 = run_once(browsers[engine], base_url, opts)
                h2, f2 = run_once(browsers[engine], base_url, opts)
            except Exception as e:
                print(f"  ERROR    {name}: {e}")
                continue
            status = "ok" if h1 == h2 else "UNSTABLE"
            print(f"  {status:<8} {h1}  {name}")
            if h1 != h2:
                unstable.append((name, diff_keys(f1, f2)))
            if show_features:
                print("           " + f1)
            results[name] = (h1, f1)
        for b in browsers.values():
            b.close()
    server.shutdown()

    groups = defaultdict(list)
    for name, (h, _) in results.items():
        groups[h].append(name)
    collisions = [names for names in groups.values() if len(names) > 1]

    print(f"\nUnique: {sum(len(n) == 1 for n in groups.values())}/{len(results)} configs")
    for name, keys in unstable:
        print(f"Unstable: {name} -- features that changed between runs: {keys}")
    for names in collisions:
        print(f"Collision: {', '.join(names)}")
    return 1 if (unstable or collisions) else 0


if __name__ == "__main__":
    sys.exit(main())
