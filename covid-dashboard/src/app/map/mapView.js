export default class MapModel {
  render() {
    const mapOptions = {
      center: [52.721219, 41.452274],
      zoom: 4,
      worldCopyJump: true,
    };

    const map = new L.map('sample', mapOptions);
    const layer = new L.TileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );
    map.addLayer(layer);
  }
}
