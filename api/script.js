require([
  "esri/config",
    "esri/views/MapView",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/VectorTileLayer",
    "esri/widgets/Expand",
    "esri/widgets/Slider",
    "esri/widgets/Home",
    "esri/symbols/support/cimSymbolUtils",
    "esri/portal/Portal",
    "esri/widgets/BasemapGallery",
    "esri/Graphic",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/AreaMeasurement2D"
  ], function (
    esriConfig,
    MapView,
    Map,
    FeatureLayer,
    VectorTileLayer,
    Expand,
    Slider,
    Home,
    cimSymbolUtils,
    Portal,
    BasemapGallery,
    Graphic,
    DistanceMeasurement2D,
    AreaMeasurement2D
  ) { esriConfig.portalUrl = "https://jsapi.maps.arcgis.com";
var portal = new Portal();
portal
.load()
.then(function () {
  console.log(portal);
  var basemap = portal.useVectorBasemaps
    ? portal.defaultVectorBasemap
    : portal.defaultBasemap;
  var map = new Map({
    basemap: "osm"
  });
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [34 , 26.3],
    zoom: 9
  });
  const home = new Home({
      view: view
    });
    view.ui.add(home, "top-left");
  var basemapGallery = new BasemapGallery({
    view: view
  });
  var bgExpand = new Expand({
    view: view,
    content: basemapGallery
  });
  view.ui.add(bgExpand, "bottom-left");
  var polygon = {
type: "polygon",
rings: [
[34.326, 26.084],
[33.836, 25.921],
[32.803, 25.688],
[32.744, 25.761],
[32.767, 25.802],
[32.741, 25.838],
[32.725, 25.873],
[32.727, 25.907],
[32.765, 25.957],
[32.772, 26.049],
[32.758, 26.123],
[32.717, 26.176],
[32.629, 26.187],
[32.829, 26.392],
[33.964, 26.930],
[33.966, 26.921],
[33.989, 26.920],
[33.991, 26.895],
[34.000, 26.872],
[33.994, 26.858],
[33.968, 26.881],
[33.940, 26.848],
[33.944, 26.814],
[33.932, 26.809],
[33.954, 26.769],
[33.941, 26.754],
[33.933, 26.706],
[33.933, 26.687],
[33.957, 26.665],
[34.002, 26.638],

]

};
var fillSymbol = {
type: "simple-fill", 
color: [227, 139, 0, 0.2],
outline: {
color: [255, 255, 75],
width: 1,

}
};

var polygonGraphic = new Graphic({
geometry: polygon,
symbol: fillSymbol
});

view.graphics.addMany([ polygonGraphic]);

var activeWidget = null;
view.ui.add("topbar", "top-right");

document
.getElementById("distanceButton")
.addEventListener("click", function () {
setActiveWidget(null);
if (!this.classList.contains("active")) {
setActiveWidget("distance");
} else {
setActiveButton(null);
}
});

document
.getElementById("areaButton")
.addEventListener("click", function () {
setActiveWidget(null);
if (!this.classList.contains("active")) {
setActiveWidget("area");
} else {
setActiveButton(null);
}
});

function setActiveWidget(type) {
switch (type) {
case "distance":
activeWidget = new DistanceMeasurement2D({
view: view
});

activeWidget.viewModel.newMeasurement();

view.ui.add(activeWidget, "top-right");
setActiveButton(document.getElementById("distanceButton"));
break;
case "area":
activeWidget = new AreaMeasurement2D({
view: view
});

activeWidget.viewModel.newMeasurement();

view.ui.add(activeWidget, "top-right");
setActiveButton(document.getElementById("areaButton"));
break;
case null:
if (activeWidget) {
view.ui.remove(activeWidget);
activeWidget.destroy();
activeWidget = null;
}
break;
}
}

function setActiveButton(selectedButton) {
view.focus();
var elements = document.getElementsByClassName("active");
for (var i = 0; i < elements.length; i++) {
elements[i].classList.remove("active");
}
if (selectedButton) {
selectedButton.classList.add("active");
}
}
})
.catch(function (error) {
  console.warn(error);
});

});
  
  

   