import sys, os, json, uuid
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import cv2
from transformers import BlipProcessor, BlipForConditionalGeneration
import torch

# -------------------------------------------------------
# LOAD BLIP MODEL
# -------------------------------------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
).to(device)


# -------------------------------------------------------
# HELPER FUNCTIONS
# -------------------------------------------------------
def load_image(path):
    return Image.open(path).convert("RGB")


def save_image(img, folder, prefix):
    os.makedirs(folder, exist_ok=True)
    filename = f"{prefix}_{uuid.uuid4().hex[:6]}.png"
    out_path = os.path.join(folder, filename)
    img.save(out_path)
    return out_path


def enhance_fabric(pil_img):
    img_cv = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    # CLAHE enhancement
    lab = cv2.cvtColor(img_cv, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    l2 = clahe.apply(l)
    lab2 = cv2.merge((l2, a, b))
    enhanced_cv = cv2.cvtColor(lab2, cv2.COLOR_LAB2RGB)

    enhanced = Image.fromarray(enhanced_cv)
    enhanced = ImageEnhance.Sharpness(enhanced).enhance(1.2)
    return enhanced


def tile_texture(tex, size):
    W, H = size
    tw, th = tex.size
    canvas = Image.new("RGB", (W, H))
    for x in range(0, W, tw):
        for y in range(0, H, th):
            canvas.paste(tex, (x, y))
    return canvas


def apply_mockup(template, mask, fabric):
    W, H = template.size
    fabric_tile = tile_texture(fabric, (W, H))

    mask = mask.convert("L").resize((W, H))
    mask = mask.filter(ImageFilter.GaussianBlur(2))

    final = Image.composite(fabric_tile, template, mask)
    return final


def generate_caption(img):
    try:
        inputs = processor(images=img, return_tensors="pt").to(device)
        out = blip_model.generate(**inputs, max_length=40)
        caption = processor.decode(out[0], skip_special_tokens=True)
        return caption
    except:
        return "Fabric with unique texture"


# -------------------------------------------------------
# MAIN EXECUTION (BACKEND MODE)
# -------------------------------------------------------

# MUST get 2 arguments: inputPath, outputDir
if len(sys.argv) < 3:
    print(json.dumps({"error": "Missing arguments"}))
    sys.exit()

input_path = sys.argv[1]
output_dir = sys.argv[2]

# Load cloth image
fabric = load_image(input_path)
enhanced = enhance_fabric(fabric)

# Generate caption
caption = generate_caption(fabric)

# Load templates from templates/ folder in backend
template_dir = os.path.join(os.getcwd(), "templates")

mockup_files = [
    ("pillow.png", "pillow_mask.png", "pillow"),
    ("tote.png", "tote_mask.png", "tote"),
    ("dress.png", "dress_mask.png", "dress"),
]

results = {"caption": caption}

for tpl, mask, label in mockup_files:
    tpl_path = os.path.join(template_dir, tpl)
    mask_path = os.path.join(template_dir, mask)

    if os.path.exists(tpl_path) and os.path.exists(mask_path):
        template = load_image(tpl_path)
        mask_img = load_image(mask_path)

        out = apply_mockup(template, mask_img, enhanced)
        saved = save_image(out, output_dir, label)

        results[label] = saved

# Return JSON to server.js
print(json.dumps(results))
