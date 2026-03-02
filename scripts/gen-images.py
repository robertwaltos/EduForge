"""
One-shot image generation script for Koydo hero + background assets.
Uses gpt-image-1 at high quality, 1536x1024 (landscape).
Run from the repo root:  python scripts/gen-images.py
"""

import os
import re
import base64
import pathlib
from openai import OpenAI

# ---------------------------------------------------------------------------
# Resolve OPENAI_API_KEY from the environment or nearest .env file
# ---------------------------------------------------------------------------
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
        "name": "hero-light-03-v2.jpg",
        "size": "1024x1536",   # portrait – original is portrait
        "prompt": (
            "Painterly editorial illustration with photorealistic human characters. "
            "A majestic glowing golden tree in a sunlit green meadow under a bright blue sky with white clouds. "
            "Four diverse learners: "
            "(1) A Black girl around age 8 sitting on a low branch, holding an open book, smiling joyfully — "
            "lifelike realistic face, expressive brown eyes, orange t-shirt, jeans, sneakers; "
            "(2) An East-Asian teenage girl around age 13 sitting cross-legged on a higher branch with a laptop open on her knees — "
            "realistic face with natural skin texture, striped blue-and-white shirt, shorts, dark flowing hair; "
            "(3) A blond toddler around age 2 sitting in the grass below the tree looking up curiously — "
            "realistic chubby baby face, orange onesie; "
            "(4) A brown-haired teenage boy around age 16 sitting cross-legged in the grass, reading a thick open book — "
            "realistic face, casual denim shirt, jeans. "
            "Glowing educational symbols float around the tree: math equations (E=π², √a+b²), musical notes, "
            "a chemistry flask, a colour palette, code brackets. "
            "Warm golden-hour sunlight, lush grass, storybook atmosphere. "
            "Photorealistic human faces, accurate hand anatomy, painterly rich background. "
            "Cinematic lighting, 8K detail, masterpiece quality."
        ),
    },
    {
        "name": "hero-light-07-v2.jpg",
        "size": "1536x1024",   # landscape
        "prompt": (
            "Painterly editorial illustration with photorealistic human figures. "
            "A dramatic canyon landscape: deep rocky gorge with lush green trees on the cliff edges, "
            "warm afternoon light, and a modern glass-and-steel university campus building visible on the far hilltop. "
            "A wide arching bridge spanning the gorge, built entirely from stacked colourful hardcover books — "
            "reds, blues, yellows, greens — arranged like solid masonry. "
            "Four people walk across the bridge left-to-right in a line: "
            "(1) An elderly man in his 70s, realistic weathered face, silver hair, light shirt and casual trousers; "
            "(2) A woman in her 40s, realistic face, wearing a hiking backpack; "
            "(3) A teenage boy around 15 with a green school rucksack, realistic features; "
            "(4) A young child around 7 with short hair and a small backpack. "
            "An open book flies through the bright blue sky like a bird. "
            "Photorealistic human anatomy and faces, cinematic depth of field, warm painterly light, "
            "vivid colours, 8K detail, masterpiece quality."
        ),
    },
    {
        "name": "bg-starry-v2.jpg",
        "size": "1536x1024",
        "prompt": (
            "Breathtaking photorealistic night-sky panorama. "
            "The full arc of the Milky Way galaxy sweeps across a deep dark blue-black sky — "
            "densely packed with thousands of crisp stars, glowing nebula clouds in soft whites, pale blues and golds, "
            "wispy cosmic dust lanes. Warm faint orange glow hugging the flat horizon line. "
            "In the lower portion of the frame, dramatically silhouetted futuristic crystalline gothic spires "
            "and towers of varying heights — intricate, tall, slightly luminescent at their tips — rise against the starfield. "
            "Wide cinematic composition, ultra-high dynamic range, 8K astrophotography quality, "
            "deep cosmic grandeur, no text, no people."
        ),
    },
    {
        "name": "bg-day-v2.jpg",
        "size": "1536x1024",
        "prompt": (
            "Photorealistic cinematic panoramic landscape, seamlessly split between day and night. "
            "Left half: a grand classical university building with a prominent clock tower, "
            "warm golden-hour light, red-brick and pale stone architecture, ivy-covered walls, "
            "manicured deep-green lawn and a winding stone path in the foreground. "
            "Right half: the same scene transitions smoothly into a deep blue-black night sky "
            "filled with the glowing Milky Way galaxy and thousands of stars. "
            "On the right, tall luminescent futuristic crystalline spires rise against the night, "
            "their blue-white glow contrasting beautifully with the warm academic architecture on the left. "
            "The day-to-night boundary is a seamless gradient across the sky. "
            "Ultra-realistic, 8K cinematic photography quality, rich colours, dramatic lighting, no text."
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
