var s2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED');
Map.addLayer(geometry, {color: 'red'}, 'Farm');
Map.centerObject(geometry);

var filtered = s2
  .filter(ee.Filter.date('2017-01-01', '2018-01-01'))
  .filter(ee.Filter.bounds(geometry));

var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
var csPlusBands = csPlus.first().bandNames();

var filteredS2WithCs = filtered.linkCollection(csPlus, csPlusBands);

var maskLowQA = function(image) {
  var qaBand = 'cs';
  var clearThreshold = 0.5;
  var mask = image.select(qaBand).gte(clearThreshold);
  return image.updateMask(mask);
};

var filteredMasked = filteredS2WithCs
  .map(maskLowQA)
  .select('B.*');

var scaleValues = function(image) {
  var scaledImage = image.multiply(0.0001);
  return scaledImage
    .copyProperties(image, ['system:time_start']);
};

var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return image.addBands(ndvi);
};

var withNdvi = filteredMasked
  .map(scaleValues)
  .map(addNDVI);

var chart = ui.Chart.image.series({
  imageCollection: withNdvi.select('ndvi'),
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 10
}).setOptions({
  lineWidth: 1,
  pointSize: 2,
  title: 'NDVI Time Series',
  interpolateNulls: true,
  vAxis: {title: 'NDVI'},
  hAxis: {title: '', format: 'YYYY-MMM'}
});

print(chart);
