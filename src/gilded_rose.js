class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let qualityMultiplier = 1;
      let conjured = false;

      this.items[i].name === "Sulfuras, Hand of Ragnaros"
        ? ""
        : (this.items[i].sellIn -= 1);

      if (this.items[i].sellIn <= 0) {
        qualityMultiplier *= 2;
      }

      if (this.items[i].name.includes("Conjured")) {
        qualityMultiplier *= 2;
        conjured = true;
        this.items[i].name = this.items[i].name.replace("Conjured ", "");
      }

      switch (this.items[i].name) {
        case "Aged Brie":
          this.items[i].quality += 1;
          if (this.items[i].sellIn <= 0) {
            this.items[i].quality = 0;
          }
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (this.items[i].sellIn > 10) {
            this.items[i].quality += 1;
          } else if (this.items[i].sellIn <= 10 && this.items[i].sellIn > 5) {
            this.items[i].quality += 2;
          } else if (this.items[i].sellIn <= 5 && this.items[i].sellIn > 0) {
            this.items[i].quality += 3;
          } else {
            this.items[i].quality = 0;
          }
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        default:
          this.items[i].quality -= qualityMultiplier;
          break;
      }

      if (
        this.items[i].name !== "Sulfuras, Hand of Ragnaros" &&
        this.items[i].quality > 50
      ) {
        this.items[i].quality = 50;
      } else if (this.items[i].quality < 0) {
        this.items[i].quality = 0;
      }

      conjured ? (this.items[i].name = "Conjured " + this.items[i].name) : "";
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
