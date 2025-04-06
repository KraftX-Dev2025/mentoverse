import os

# Define the file structure
file_structure = [
    # App directory
    "src/app/page.tsx",
    "src/app/about-us/page.tsx",
    "src/app/contact-us/page.tsx",
    "src/app/mentors/page.tsx",
    "src/app/resources/page.tsx",
    "src/app/services/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/booking/page.tsx",
    "src/app/layout.tsx",
    "src/app/globals.css",
    
    # API routes
    "src/app/api/auth/[...nextauth]/route.ts",
    "src/app/api/mentors/route.ts",
    "src/app/api/bookings/route.ts",
    "src/app/api/services/route.ts",
    "src/app/api/resources/route.ts",
    
    # Lib directory
    "src/lib/utils.ts",
    "src/lib/constants.ts",
    "src/lib/types.ts",
    "src/lib/db/schema.ts",
    "src/lib/db/client.ts",
    
    # Styles directory
    "src/styles/theme.ts"
]

def create_file_structure():
    """Create all directories and files in the defined structure."""
    for path in file_structure:
        # Create full path
        full_path = os.path.join(os.getcwd(), path)
        
        # Get directory path
        dir_path = os.path.dirname(full_path)
        
        # Create directories if they don't exist
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
            print(f"Created directory: {dir_path}")
        
        # Create the file if it doesn't exist
        if not os.path.exists(full_path):
            with open(full_path, 'w') as f:
                # Leave file empty
                pass
            print(f"Created file: {full_path}")
        else:
            print(f"File already exists: {full_path}")

if __name__ == "__main__":
    create_file_structure()
    print("File structure creation complete!")