"""
Surgical face-only improvement of hero-light-03.jpg using the OpenAI images.edit
inpainting endpoint.

Strategy
--------
- Build a mask PNG that is FULLY OPAQUE (keep) everywhere except transparent
  ellipses punched over each character's face.
- The API regenerates ONLY the transparent holes; every other pixel is preserved.
- Prompt is tightly scoped to facial realism only.

Run from repo root:  python scripts/gen-face-fix.py
"""

import io
import os
import base64
import pathlib
from PIL import Image, ImageDraw
from openai import OpenAI

ROOT = pathlib.Path(__file__).parent.parent

def _load_env_file(path: pathlib.Path) -> dict[str, str]:
    result: dict[str, str] = {}
    if not path.exists():
        return result
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        result[k.strip()] = v.strip().strip('"').strip("'")
    return result

_env = _load_env_file(ROOT / ".env")
API_KEY = os.environ.get("OPENAI_API_KEY") or _env.get("OPENAI_API_KEY") or ""
if not API_KEY:
    raise RuntimeError("OPENAI_API_KEY not found in environment or .env")

SRC  = ROOT / "public" / "generated-images" / "hero-light-03.jpg"
OUT  = ROOT / "public" / "generated-images" / "hero-light-03-faces-v3.jpg"
MASK_DEBUG = ROOT / "public" / "generated-images" / "_mask-debug.png"

client = OpenAI(api_key=API_KEY)

# ---------------------------------------------------------------------------
# Face regions — proportional (cx, cy, rx, ry) relative to image (W, H).
# Calibrated against _mask-overlay.jpg on the 1536x1024 original.
# All four circles were verified to land on the actual face, not the body.
#
#   1  Black girl   — left branch, upper-left quadrant
#   2  Asian girl   — higher branch, centre  (original circle was ~100px too high)
#   3  Toddler      — lower-left grass       (original circle was on torso)
#   4  Teen boy     — right side             (original circle was on neck/shoulder)
# ---------------------------------------------------------------------------
FACE_REGIONS = [
    # (cx_r, cy_r, rx_r, ry_r) — face-oval ONLY, not hair, to minimise drift
    # cy shifted DOWN ~0.02 relative to v2 overlay so ellipses stay below the hair
    (0.228, 0.350, 0.046, 0.066),   # 1 Black girl  — face oval below afro puffs
    (0.541, 0.318, 0.046, 0.066),   # 2 Asian girl  — face oval below hair
    (0.169, 0.730, 0.046, 0.066),   # 3 Toddler     — face oval (baby face, slightly wider)
    (0.801, 0.522, 0.046, 0.066),   # 4 Teen boy    — face oval only
]

PROMPT = (
    "Improve only the facial skin and features of each person: add photorealistic skin "
    "texture, clear lifelike eyes with natural highlights, soft eyebrows, and realistic "
    "lip detail. Preserve EXACTLY: each character's age (toddler ~2, girl ~8 with natural "
    "afro puffs, girl ~13, boy ~16), their original hairstyle and hair colour, skin tone, "
    "ethnicity, expression, clothing, body position, background, lighting, colour palette, "
    "and the overall painterly illustration style. No changes outside the face oval."
)


def build_mask(w: int, h: int) -> Image.Image:
    """
    Returns an RGBA PNG mask.
    Opaque white  (alpha=255) = keep this pixel.
    Transparent   (alpha=0)   = inpaint this pixel.
    """
    mask = Image.new("RGBA", (w, h), (255, 255, 255, 255))   # fully opaque
    draw = ImageDraw.Draw(mask)
    for cx_r, cy_r, rx_r, ry_r in FACE_REGIONS:
        cx = int(cx_r * w)
        cy = int(cy_r * h)
        rx = int(rx_r * w)
        ry = int(ry_r * h)
        # Punch a transparent ellipse — the API will inpaint here
        draw.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=(0, 0, 0, 0))
    return mask


def img_to_png_bytes(img: Image.Image) -> bytes:
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def main() -> None:
    # 1 — load source
    src_img = Image.open(SRC).convert("RGBA")
    w, h = src_img.size
    print(f"Source: {SRC.name}  {w}x{h}", flush=True)

    # 2 — build mask and save a debug copy so you can verify coverage
    mask_img = build_mask(w, h)
    mask_img.save(MASK_DEBUG)
    print(f"Mask debug saved: {MASK_DEBUG.name}", flush=True)

    # 3 — encode both as PNG bytes for the API
    src_bytes  = img_to_png_bytes(src_img)
    mask_bytes = img_to_png_bytes(mask_img)

    # 4 — call images.edit (inpainting)
    print("Calling images.edit ...", flush=True)
    response = client.images.edit(
        model="gpt-image-1",
        image=("hero-light-03.png", io.BytesIO(src_bytes), "image/png"),
        mask=("mask.png",           io.BytesIO(mask_bytes), "image/png"),
        prompt=PROMPT,
        size=f"{w}x{h}",           # type: ignore[arg-type]  keep native 1536x1024
        quality="high",
        n=1,
    )

    # 5 — decode and save
    b64 = response.data[0].b64_json
    if b64 is None:
        raise ValueError("No b64_json in response")

    result_img = Image.open(io.BytesIO(base64.b64decode(b64)))
    result_img.convert("RGB").save(OUT, format="JPEG", quality=95)
    kb = OUT.stat().st_size // 1024
    print(f"Saved: {OUT.name}  ({kb} KB)", flush=True)
    print("Done.", flush=True)


if __name__ == "__main__":
    main()
