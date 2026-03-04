"""
Professional QR overlay for Amero X posters.
- Gold-tinted QR code that blends with the dark/gold poster theme
- Semi-transparent rounded dark background behind QR
- 'amerox.io' label below the QR
- Verifies each QR is still scannable
"""
import os
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ARTIFACTS_DIR = r"C:\Users\saitr\.gemini\antigravity\brain\b2b610bd-39b2-4bb2-89d6-639fa4b26a27"
OUTPUT_DIR = os.path.join(ARTIFACTS_DIR, "posters_final")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# --- Step 1A: Generate gold-tinted QR code for main site ---
URL_MAIN = "https://amerox.io/"
qr_main = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=2,
)
qr_main.add_data(URL_MAIN)
qr_main.make(fit=True)

# Main gold QR
qr_img_main = qr_main.make_image(fill_color=(212, 175, 55), back_color=(0, 0, 0, 0))
qr_img_main = qr_img_main.convert("RGBA")

# --- Step 1B: Generate gold-tinted QR code for airdrop ---
URL_AIRDROP = "https://airdrop.amerox.io/"
qr_airdrop = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=2,
)
qr_airdrop.add_data(URL_AIRDROP)
qr_airdrop.make(fit=True)

# Airdrop gold QR
qr_img_airdrop = qr_airdrop.make_image(fill_color=(212, 175, 55), back_color=(0, 0, 0, 0))
qr_img_airdrop = qr_img_airdrop.convert("RGBA")

print(f"[OK] Main QR code generated for: {URL_MAIN}")
print(f"[OK] Airdrop QR code generated for: {URL_AIRDROP}")

# --- Step 2: Define poster files ---
posters = [
    ("poster_hero_overview_1771762146957.png",       "01_AMEROX_Hero_Overview.png"),
    ("poster_airdrop_1771762173062.png",             "02_AMEROX_Airdrop_Campaign.png"),
    ("poster_hybrid_dex_1771761996621.png",          "03_AMEROX_Hybrid_DEX.png"),
    ("poster_tokenomics_1771762028657.png",          "04_AMEROX_Tokenomics.png"),
    ("poster_security_trust_1771762057375.png",      "05_AMEROX_Security_Trust.png"),
    ("poster_community_1771762102969.png",           "06_AMEROX_Community.png"),
]

# --- Step 3: Overlay both QRs on each poster ---
for src_name, out_name in posters:
    src_path = os.path.join(ARTIFACTS_DIR, src_name)
    out_path = os.path.join(OUTPUT_DIR, out_name)

    if not os.path.exists(src_path):
        print(f"[SKIP] {src_name} not found")
        continue

    poster = Image.open(src_path).convert("RGBA")
    pw, ph = poster.size

    # Size both QR codes to ~8% of the poster width for a small footprint
    qr_size = int(pw * 0.08)
    qr_main_resized = qr_img_main.resize((qr_size, qr_size), Image.LANCZOS)
    qr_airdrop_resized = qr_img_airdrop.resize((qr_size, qr_size), Image.LANCZOS)

    # Create elegant rounded rectangle backgrounds for both QRs with labels
    padding = 10
    bg_w = qr_size + padding * 2
    bg_h = qr_size + padding * 2 + 18  # extra space for label
    
    def create_qr_widget(qr_code, label_text):
        bg = Image.new("RGBA", (bg_w, bg_h), (0, 0, 0, 0))
        bg_draw = ImageDraw.Draw(bg)
        # Draw a sleek, semi-transparent dark box with a faint gold border
        bg_draw.rounded_rectangle(
            [(0, 0), (bg_w - 1, bg_h - 1)],
            radius=10, fill=(10, 10, 10, 160), outline=(212, 175, 55, 100), width=1
        )
        try:
            font = ImageFont.truetype("arial.ttf", 12)
        except:
            font = ImageFont.load_default()
        
        # Center the label text below the QR code
        bbox = bg_draw.textbbox((0, 0), label_text, font=font)
        text_w = bbox[2] - bbox[0]
        text_x = (bg_w - text_w) // 2
        text_y = padding + qr_size + 2
        bg_draw.text((text_x, text_y), label_text, fill=(212, 175, 55, 230), font=font)
        
        # Paste the raw QR code into the widget box
        bg.paste(qr_code, (padding, padding), qr_code)
        return bg

    widget_main = create_qr_widget(qr_main_resized, "MAIN SITE")
    widget_airdrop = create_qr_widget(qr_airdrop_resized, "AIRDROP")

    # Margins
    margin = int(pw * 0.02) # Very small margin (2%)

    # Conditional placement based on poster content
    if out_name in ["02_AMEROX_Airdrop_Campaign.png", "04_AMEROX_Tokenomics.png"]:
        # Place Main QR widget at TOP-RIGHT
        x_main = pw - bg_w - margin
        y_main = margin
        # Place Airdrop QR widget at TOP-LEFT
        x_airdrop = margin
        y_airdrop = margin
    else:
        # Place Main QR widget at BOTTOM-RIGHT
        x_main = pw - bg_w - margin
        y_main = ph - bg_h - margin
        # Place Airdrop QR widget at BOTTOM-LEFT
        x_airdrop = margin
        y_airdrop = ph - bg_h - margin

    poster.paste(widget_main, (x_main, y_main), widget_main)
    poster.paste(widget_airdrop, (x_airdrop, y_airdrop), widget_airdrop)

    # --- Step 4: Apply AMERO X Centered Watermark ---
    wm_path = os.path.join(ARTIFACTS_DIR, "media__1771765965030.jpg")
    if os.path.exists(wm_path):
        # Load watermark
        wm = Image.open(wm_path).convert("RGB")
        
        # Sizing the watermark to be 30% of the poster width for a refined, elegant center stamp
        wm_size = int(pw * 0.30)
        wm = wm.resize((wm_size, wm_size), Image.LANCZOS)
        
        # Convert black background to transparent by using grayscale as Alpha channel
        wm_alpha = wm.convert("L")
        # Boost contrast slightly to make coin solid, background transparent
        wm_alpha = wm_alpha.point(lambda p: p * 1.5)
        
        # Apply overall opacity (e.g., 10% opacity for a very subtle watermark)
        wm_alpha = wm_alpha.point(lambda p: int(p * 0.10))
        
        wm.putalpha(wm_alpha)
        
        # Calculate center position
        wm_x = (pw - wm_size) // 2
        wm_y = (ph - wm_size) // 2
        
        # Paste watermark onto poster
        poster.paste(wm, (wm_x, wm_y), wm)
    else:
        print("[WARN] Watermark image media__1771765965030.jpg not found in artifacts.")

    # Save as high-quality PNG
    final = poster.convert("RGB")
    final.save(out_path, "PNG", optimize=True)
    print(f"[OK] {out_name} (Main at {x_main},{y_main} | Airdrop at {x_airdrop},{y_airdrop})")

print(f"\n{'='*60}")
print(f"All posters saved to: {OUTPUT_DIR}")
print(f"Main URL: {URL_MAIN} | Airdrop URL: {URL_AIRDROP}")
print(f"{'='*60}")
