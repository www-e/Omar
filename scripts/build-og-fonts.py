#!/usr/bin/env python3
"""Generate the static font instances that app/opengraph-image.tsx renders with.

Why this exists: satori (the engine behind next/og) crashes on the project's
variable TTFs ("Cannot read properties of undefined (reading '256')"), so the
share-card route cannot load public/fonts/*-VariableFont*.ttf directly. These
are single-weight, latin-subset copies of the same two faces, which keeps the
OG image on the portfolio's own typography (DM Sans display / Epilogue body).

Re-run after changing a source font or adding a weight to the OG design:

    python scripts/build-og-fonts.py
"""

from pathlib import Path
from fontTools import ttLib
from fontTools.varLib import instancer
from fontTools.subset import Subsetter, Options

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "fonts"
OUT = ROOT / "fonts" / "og"

# Keep any English copy working: printable ASCII + the punctuation a rewrite
# would plausibly need (dashes, curly quotes, ellipsis, currency).
UNICODES = "U+0020-007E,U+2013-2014,U+2018-2019,U+201C-201D,U+2026,U+00A0,U+20AC,U+00A9"

TARGETS = [
    (SRC / "DMSans-VariableFont_opsz,wght.ttf", {"opsz": 12, "wght": 700}, "DM-Sans-700.ttf"),
    (SRC / "Epilogue-VariableFont_wght.ttf", {"wght": 400}, "Epilogue-400.ttf"),
    (SRC / "Epilogue-VariableFont_wght.ttf", {"wght": 600}, "Epilogue-600.ttf"),
]


def build(source: Path, axes: dict, destination: str) -> None:
    font = ttLib.TTFont(source)
    # Pinning every axis makes instancer drop fvar/gvar, i.e. a real static font.
    # updateFontNames stays off: DM Sans' STAT table has no opsz=12 axis value,
    # and satori is given the family/weight explicitly in the route anyway.
    font = instancer.instantiateVariableFont(font, axes)

    options = Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    options.recalc_bounds = True
    options.drop_tables += ["DSIG"]
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=_expand_ranges(UNICODES))
    subsetter.subset(font)
    font.save(OUT / destination)
    size_kb = (OUT / destination).stat().st_size / 1024
    print(f"  {destination:<20} {size_kb:6.1f} KiB  <- {source.name} {axes}")


def _expand_ranges(spec: str) -> list:
    codes = []
    for part in spec.split(","):
        part = part.strip().lstrip("U+")
        if "-" in part:
            low, high = part.split("-")
            codes.extend(range(int(low, 16), int(high, 16) + 1))
        elif part:
            codes.append(int(part, 16))
    return codes


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"Writing static OG fonts to {OUT.relative_to(ROOT)}:")
    for source, axes, destination in TARGETS:
        build(source, axes, destination)
    print("Done.")
