import os

folder_path = "./uploads"

allowed_prefixes = ("thumbnail_", "small_", "medium_", "large_", "xlarge_")

for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)

    if os.path.isfile(file_path) and filename.lower().endswith(('.jpg', '.png')):
        if not filename.startswith(allowed_prefixes):
            os.remove(file_path)
            print(f"Deleted: {filename}")

print("Cleanup complete!")
