
import pandas as pd

# Load the user list CSV file
user_list_path = "../user_list.csv"
user_list_df = pd.read_csv(user_list_path)

# Extract the list of valid user IDs
valid_users = set(user_list_df.iloc[:, 0])

# Load the edges file
edges_path = "../Brightkite_edges.txt"
edges_df = pd.read_csv(edges_path, sep="\t", header=None, names=["User_A", "User_B"])

# Filter edges to retain only those where both users are in the valid user list
filtered_edges_df = edges_df[edges_df["User_A"].isin(valid_users) & edges_df["User_B"].isin(valid_users)]

save_path = "filtered_edges.csv"
filtered_edges_df.to_csv(save_path, index=False)
print(f"Filtered edges saved to {save_path}")
