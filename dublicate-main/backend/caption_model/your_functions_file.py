# ---------------------------------------------------------
#  COLOR DETECTION HELPERS (If needed by other modules)
# ---------------------------------------------------------
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans

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
# MATERIAL INPUT HANDLING
# =========================================================
USER_MATERIAL_INPUT = None  # Global variable to store material text

def set_user_material_input(text):
    """
    Store material text from user:
    Examples:
        "ceramic 90%"
        "terracotta 85%"
        "jute 70%"
        "teak wood 80%"
    """
    global USER_MATERIAL_INPUT
    USER_MATERIAL_INPUT = text.lower().strip()


# =========================================================
#  DESCRIPTION GENERATION
# =========================================================
def generate_product_description(category, material, color_desc, design_desc):
    material = material.capitalize()
    color_desc = color_desc.capitalize()
    design_desc = design_desc.lower()

    # Convert design text into natural phrases
    if "floral" in design_desc:
        design_phrase = "a beautifully crafted floral pattern"
    elif "pattern" in design_desc:
        design_phrase = "an intricately woven pattern"
    elif "stripe" in design_desc:
        design_phrase = "subtle stripe detailing"
    elif "texture" in design_desc:
        design_phrase = "a rich handcrafted textured surface"
    elif "embroidery" in design_desc:
        design_phrase = "detailed artisanal embroidery"
    elif "print" in design_desc:
        design_phrase = "a traditional hand-printed design"
    elif "motif" in design_desc:
        design_phrase = "cultural motif detailing"
    elif "carved" in design_desc:
        design_phrase = "hand-carved decorative detailing"
    elif "plain" in design_desc:
        design_phrase = "a clean, plain minimalist finish"
    else:
        design_phrase = f"a {design_desc}"

    # CATEGORY-WISE DESCRIPTION
    if category == "pottery":
        return (
            f"This handcrafted {material} piece features {design_phrase} with a warm {color_desc} finish. "
            f"Made using traditional pottery techniques, it brings natural charm and artistic detail into any décor space. "
            f"Ideal for gifting, styling, or everyday use."
        )

    if category == "handbag":
        return (
            f"This handcrafted {material} handbag showcases {design_phrase} complemented by a stylish {color_desc} tone. "
            f"Durable, lightweight, and artisan-made — perfect for daily use with both ethnic and modern outfits."
        )

    if category == "table":
        return (
            f"This handcrafted {material} table highlights {design_phrase} enriched by a natural {color_desc} finish. "
            f"Built using traditional woodworking techniques, it ensures long-lasting durability and premium appearance."
        )

    if category == "plate":
        return (
            f"This handcrafted {material} plate features {design_phrase} on a clean {color_desc} surface. "
            f"Ideal for serving, gifting, or home décor, blending beauty with functionality."
        )

    # Default description
    return (
        f"This handcrafted product is made from premium {material}, featuring {design_phrase} with a {color_desc} touch. "
        f"A perfect choice for décor lovers who appreciate artisanal craftsmanship."
    )


# =========================================================
#  HIGHLIGHTED PRODUCT DETAILS
# =========================================================
def generate_product_details(material, color_desc, design_desc, category):

    if category == "pottery":
        return [
            f"• Material: {material}",
            f"• Colour: {color_desc}",
            f"• Finish: {design_desc}",
            "• Traditional pottery craftsmanship",
            "• Durable & artisan-made"
        ]

    if category == "handbag":
        return [
            f"• Material: {material}",
            f"• Colour: {color_desc}",
            f"• Design: {design_desc}",
            "• Lightweight & durable",
            "• Ideal for everyday use"
        ]

    if category == "table":
        return [
            f"• Material: {material}",
            f"• Colour: {color_desc}",
            f"• Finish: {design_desc}",
            "• Sturdy handcrafted build",
            "• Long-lasting furniture quality"
        ]

    if category == "plate":
        return [
            f"• Material: {material}",
            f"• Colour: {color_desc}",
            f"• Surface Finish: {design_desc}",
            "• Food-safe & heat-resistant",
            "• Suitable for dining & décor"
        ]

    return [
        f"• Material: {material}",
        f"• Colour: {color_desc}",
        f"• Finish: {design_desc}",
        "• Artisan-crafted",
        "• Suitable for décor or gifting"
    ]


# =========================================================
#  HASHTAG GENERATOR
# =========================================================
def generate_hashtags(category, material, color_desc, design_desc):

    base = {
        "pottery": ["#ClayArt", "#PotteryVibes", "#TerracottaAesthetic", "#StudioCeramics"],
        "handbag": ["#HandcraftedBags", "#EcoChicStyle", "#ArtisanHandbag"],
        "table": ["#WoodcraftMagic", "#HandmadeFurniture", "#RusticInteriors"],
        "plate": ["#ArtisanTableware", "#CeramicLove", "#HandcraftedDining"]
    }

    tags = base.get(category, ["#HandmadeProduct"]) + [
        "#HandmadeInIndia",
        "#SupportLocalArtisans",
        "#UniqueFinds",
        "#VocalForLocal",
    ]

    # Remove duplicates and limit output
    return list(dict.fromkeys(tags))[:12]


# =========================================================
#  PRICE PREDICTION
# =========================================================
def predict_price(category):

    base_prices = {
        "pottery": 600,
        "handbag": 800,
        "table": 5000,
        "plate": 300
    }

    return base_prices.get(category, 500)
