The script performs the following tasks:
1. **Loads Sentinel-2 Harmonized Image Collection**: The script starts by loading the Sentinel-2 Harmonized Image Collection from Google Earth Engine.
2. **Defines the Geometry**: A specific region is defined using a polygon geometry.
3. **Filters Images**: The Sentinel-2 images are filtered based on cloud cover percentage and date range.
4. **Cloud Masking**: The script loads the Cloud Score+ collection and adds Cloud Score+ bands to each Sentinel-2 image in the collection. It then masks pixels with low Cloud Score+ QA scores.
5. **Scales Pixel Values**: The pixel values are scaled to reflectance.
6. **Computes NDVI**: The script computes the Normalized Difference Vegetation Index (NDVI) for each image and adds it as a band.
7. **Displays Time-Series Chart**: The script displays a time-series chart of NDVI for the specified region.
![ee-chart](https://github.com/user-attachments/assets/a65db433-4f56-494b-a89a-6fb28626ffd8)
