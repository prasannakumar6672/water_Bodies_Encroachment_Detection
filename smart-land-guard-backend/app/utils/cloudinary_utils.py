import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_image(file, folder="smart_land_guard/observations"):
    """
    Uploads a file to Cloudinary and returns the secure URL.
    'file' can be a file-like object (e.g. from FastAPI UploadFile.file)
    """
    try:
        response = cloudinary.uploader.upload(file, folder=folder)
        return response.get("secure_url")
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None

def upload_multiple_images(files, folder="smart_land_guard/observations"):
    """
    Uploads a list of files to Cloudinary and returns a list of secure URLs.
    """
    urls = []
    for file in files:
        url = upload_image(file, folder)
        if url:
            urls.append(url)
    return urls
