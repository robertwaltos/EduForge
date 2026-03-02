"""
Regenerate hero-light-03 in 3:2 landscape (1536x1024) with horizontal composition.
Run from the repo root:  python scripts/gen-images-v4.py
"""

import os
import base64
import pathlib
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

OUT_DIR = ROOT / "public" / "generated-images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

client = OpenAI(api_key=API_KEY)

JOBS = [
    {
        "name": "hero-light-03-v4.jpg",
        "size": "1536x1024",   # 3:2 landscape — correct for a hero section
        "prompt": (
            "Painterly editorial illustration, wide 3:2 landscape composition. "
            "A sturdy, human-scaled oak tree with warm golden-yellow foliage stands slightly left of centre, "
            "trunk clearly visible, lowest branch at adult chest-height. "
            "Lush green meadow stretches across the full width. Bright blue sky, soft white clouds. "

            "FOUR characters are spread HORIZONTALLY across the full width of the scene, each prominent and life-sized: "

            "FAR LEFT — A blond toddler, age 2, sitting on the grass beside the base of the tree. "
            "Realistic chubby baby face, orange onesie, both hands on the ground, looking up with wide curious eyes. "
            "The toddler is small but clearly featured in the left foreground. "

            "LEFT-OF-CENTRE — A Black girl, age 8, sitting on the lowest branch of the tree, "
            "legs dangling freely. Upper body clearly visible from waist up. "
            "Realistic face, genuine wide smile, natural curly afro puffs, orange t-shirt, jeans, white sneakers. "
            "She holds an open book. The branch is at adult chest height so she sits naturally. "

            "RIGHT-OF-CENTRE — An East-Asian teenage girl, age 13, sitting cross-legged on a higher branch "
            "slightly right of the trunk. Clearly human-sized — NOT tiny. "
            "Realistic face, dark flowing hair, striped blue-and-white t-shirt, shorts, sneakers. "
            "A laptop open on her knees, looking at the screen. "

            "FAR RIGHT — A brown-haired teenage boy, age 16, sitting cross-legged on the grass "
            "to the right of the tree, reading a thick open book. "
            "Realistic face, calm focused expression, casual open denim shirt over a t-shirt, jeans. "

            "Glowing golden educational symbols are scattered around the canopy between the characters: "
            "E=pi^2, musical notes, a chemistry flask, a colour palette, code brackets. "

            "The four characters together span the full horizontal width of the image. "
            "Warm golden-hour sunlight from the right. "
            "Painterly rich background, photorealistic faces and hands, 8K detail, masterpiece quality."
        ),
    },
]


def generate(job: dict) -> None:
    out_path = OUT_DIR / job["name"]
    print(f"  Generating {job['name']} ({job['size']}) ...", flush=True)
    response = client.images.generate(
        model="gpt-image-1",
        prompt=job["prompt"],
        size=job["size"],          # type: ignore[arg-type]
        quality="high",
        n=1,
        output_format="jpeg",
    )
    b64 = response.data[0].b64_json
    if b64 is None:
        raise ValueError(f"No b64_json in response for {job['name']}")
    out_path.write_bytes(base64.b64decode(b64))
    kb = out_path.stat().st_size // 1024
    print(f"     Saved {out_path.name}  ({kb} KB)", flush=True)


if __name__ == "__main__":
    print(f"Saving images to: {OUT_DIR}\n")
    for job in JOBS:
        generate(job)
    print("\nAll done.")
