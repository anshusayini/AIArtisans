import sys
import json
import numpy as np
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from sklearn.cluster import KMeans
from transformers import BlipProcessor, BlipForConditionalGeneration

# =========================================================
# LOAD MODELS
# =========================================================
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
blip = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

resnet = models.resnet50(pretrained=True)
resnet.fc = torch.nn.Identity()
resnet.eval()

res_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])


# =========================================================
# COLOR DETECTION
# =========================================================
def detect_dominant_color(image_path):
    img = Image.open(image_path).convert("RGB")
    img_small = img.resize((60, 60))
    arr = np.array(img_small).reshape(-1, 3)

    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(arr)

    r, g, b = kmeans.cluster_centers_[np.argmax(np.bincount(kmeans.labels_))]

    if r > 170 and g < 90 and b < 90:
        return "red"
    if r > 200 and g > 140 and b < 80:
        return "orange"
    if r > 200 and g > 200 and b < 80:
        return "yellow"
    if g > 150 and r < 120 and b < 120:
        return "green"
    if b > 150 and r < 120 and g < 120:
        return "blue"
    if r > 140 and g > 100 and b < 90:
        return "brown"
    if r > 180 and g > 170 and b < 150:
        return "beige"
    if r < 60 and g < 60 and b < 60:
        return "black"
    if r > 200 and g > 200 and b > 200:
        return "white"
    return "neutral"


# =========================================================
# CATEGORY DETECTION
# =========================================================
def detect_category(caption):
    cap = caption.lower()
    if "bowl" in cap or "pottery" in cap or "clay" in cap or "ceramic" in cap:
        return "pottery"
    if "bag" in cap:
        return "handbag"
    if "table" in cap or "wood" in cap:
        return "table"
    if "plate" in cap or "dish" in cap:
        return "plate"
    return "generic"


# =========================================================
# IMPORT YOUR FUNCTIONS
# =========================================================
from your_functions_file import (
    generate_product_description,
    generate_product_details,
    generate_hashtags,
    set_user_material_input,
    predict_price
)


# =========================================================
# MAIN EXECUTION
# =========================================================
def main():

    # Node.js arguments
    image_path = sys.argv[1]              # Path to background removed image
    material_text = sys.argv[2]           # User input: "ceramic 90%" etc.

    # Set global material for pricing model
    set_user_material_input(material_text)

    # Run BLIP captioning
    img = Image.open(image_path).convert("RGB")
    inputs = processor(img, return_tensors="pt")
    out = blip.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)

    # Extract category
    category = detect_category(caption)

    # Extract color
    color_raw = detect_dominant_color(image_path)

    color_map = {
        "brown": "Earthy Brown",
        "beige": "Soft Beige",
        "white": "Clean White",
        "black": "Deep Black",
        "red": "Deep Red",
        "orange": "Warm Orange",
        "neutral": "Natural Toned"
    }
    color_desc = color_map.get(color_raw, "Natural Toned")

    design_desc = "Handcrafted Design"

    # Generate full marketing outputs
    description = generate_product_description(
        category,
        material_text,
        color_desc,
        design_desc
    )

    hashtags = generate_hashtags(
        category,
        material_text,
        color_desc,
        design_desc
    )

    price = predict_price(category)

    # Return JSON to backend
    result = {
        "category": category,
        "description": description,
        "hashtags": hashtags,
        "predicted_price": price
    }

    print(json.dumps(result))


if __name__ == "__main__":
    main()
