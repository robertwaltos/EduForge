"""
Revision pass: hero-light-03-v3 (proportion fix) and hero-light-07-v3 (people reshuffle).
Run from the repo root:  python scripts/gen-images-v3.py
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
        "name": "hero-light-03-v3.jpg",
        "size": "1024x1536",
        "prompt": (
            "Painterly editorial illustration, medium-close group composition. "
            "A sturdy, normal-sized oak tree (not giant) with warm golden-yellow foliage fills the upper half of the frame. "
            "The trunk is wide and the lowest branch is at adult chest height — clearly human-scaled. "
            "FOUR characters are the dominant subjects, large and prominent, filling most of the vertical frame: "

            "FOREGROUND LEFT — A Black girl, age 8, sits on the lowest branch at adult chest height. "
            "She fills roughly one-quarter of the frame width. Full upper body visible from hips up. "
            "Realistic face with expressive smile, natural skin texture, curly afro puffs, orange t-shirt, jeans, sneakers. "
            "She holds an open book. Her feet dangle naturally. "

            "FOREGROUND RIGHT — A brown-haired teenage boy, age 16, sits cross-legged on the grass directly "
            "beneath the right side of the tree. He is large in the frame — upper body clearly visible. "
            "Realistic face, casual denim shirt open over a t-shirt, reading an open book. "

            "MIDGROUND CENTER — A blond toddler, age 2, sits in the grass between the two foreground figures. "
            "The toddler is sized naturally relative to the seated girl above — roughly half the height of the girl. "
            "Realistic chubby baby face, orange onesie, looking upward with wide curious eyes. "

            "UPPER BRANCH — An East-Asian teenage girl, age 13, sits cross-legged on a branch clearly above "
            "the Black girl. She is clearly human-sized relative to the branch — NOT tiny. "
            "Laptop open on her knees, realistic face, dark flowing hair, striped blue-and-white t-shirt, shorts. "

            "Glowing educational symbols orbit the canopy: E=pi^2, musical notes, chemistry flask, art palette, code brackets. "
            "Bright blue sky with white clouds. Lush green grass. "
            "Painterly rich background, photorealistic faces and hands, warm golden sunlight, 8K detail."
        ),
    },
    {
        "name": "hero-light-07-v3.jpg",
        "size": "1536x1024",
        "prompt": (
            "Painterly editorial illustration with photorealistic human figures. "
            "A dramatic canyon landscape: deep rocky gorge, lush green trees on cliff edges, "
            "warm afternoon light, modern glass-and-steel university building visible on the far hilltop. "
            "A wide arching bridge spanning the gorge, built entirely from stacked colourful hardcover books — "
            "reds, blues, yellows, greens — arranged like solid masonry. "

            "EXACTLY FIVE people walk in a single-file line left-to-right across the full width of the bridge, "
            "evenly spaced with equal gaps between each person, spread from the left end to the right end of the bridge arc: "
            "(1) Leftmost — a woman in her late 30s, realistic face, medium-length hair, wearing a backpack, walking confidently; "
            "(2) Second from left — a teenage boy around 15, red t-shirt, jeans, school rucksack, realistic features; "
            "(3) Middle — a child around 10, school backpack, casual clothes, slightly shorter than the teen; "
            "(4) Second from right — a child around 7, small backpack, noticeably shorter than the 10-year-old; "
            "(5) Rightmost — a small child around 4-5, tiny, holding the hand of or walking just ahead independently, "
            "clearly the smallest figure. "

            "The five figures decrease in height from left (tallest) to right (shortest), creating a natural visual rhythm. "
            "All figures are well-spaced — no crowding — each clearly separated across the full bridge span. "
            "An open book flies through the bright blue sky like a bird. "
            "Photorealistic human anatomy and faces, cinematic depth of field, warm painterly light, "
            "vivid colours, 8K detail, masterpiece quality."
        ),
    },
]


def generate(job: dict) -> None:
    out_path = OUT_DIR / job["name"]
    print(f"  Generating {job['name']} ...", flush=True)
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
