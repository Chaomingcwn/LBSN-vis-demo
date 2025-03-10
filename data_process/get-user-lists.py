import pandas as pd
# Display the extracted user list

# Load the CSV file
file_path = "checkin_counts_greater_than_10.csv"
df = pd.read_csv(file_path)

# Display the first few rows to understand its structure
df.head()

# Extract unique users
unique_users = df["user"].unique()

# Convert to DataFrame for display
user_list_df = pd.DataFrame(unique_users, columns=["User ID"])

save_path = "user_list.csv"
user_list_df.to_csv(save_path, index=False)
print(f"User list saved to {save_path}")
