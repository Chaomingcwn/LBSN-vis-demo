import json
import pandas as pd

# Load the JSON file
file_path = "detailed_city_checkins.json"
with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

# Convert JSON data into a structured DataFrame
chart_data = []

for entry in data:
    city = entry["city"]
    for detail in entry["details"]:
        user = detail["user"]
        checkin_count = detail["counts"]
        chart_data.append({"city": city, "user": user, "checkins": checkin_count})

# Convert to DataFrame
df = pd.DataFrame(chart_data)
df.to_csv("chart_data.csv", index=False)
print(df.head())

df.to_json("chart_data.json", orient="records", indent=4)
