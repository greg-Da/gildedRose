const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  // it("full test", () => {
  //   const items = [
  //     new Item("+5 Dexterity Vest", 10, 20),
  //     new Item("Aged Brie", 2, 0),
  //     new Item("Elixir of the Mongoose", 5, 7),
  //     new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  //     new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

  //     // This Conjured item does not work properly yet
  //     new Item("Conjured Mana Cake", 3, 6),
  //   ];

  //   const days = Number(process.argv[2]) || 2;
  //   const gildedRose = new Shop(items);

  //   for (let day = 0; day < days; day++) {
  //     console.log(`\n-------- day ${day} --------`);
  //     console.log("name, sellIn, quality");
  //     items.forEach((item) =>
  //       console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
  //     );
  //     gildedRose.updateQuality();
  //   }
  // });


  it("Item quality cannot go below 0", function () {
    const gildedRose = new Shop([
      new Item("Magic Wand", 5, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Item quality cannot go more than 50", function () {
    const gildedRose = new Shop([
      new Item("Aged Brie", 5, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("Backstage passes should increase by 1 if +10 days ", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(31);
  });


  it("Backstage passes should increase by +2 if >=10 && < 5 ", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(32);
  });

  it("Backstage passes should increase by +3", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 30),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(33);
  });

  it("Sulfuras, Hand of Ragnaros should stay the same", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[1].quality).toBe(80);
    expect(items[2].quality).toBe(80);

    expect(items[0].sellIn).toBe(0);
    expect(items[1].sellIn).toBe(-1);
    expect(items[2].sellIn).toBe(1);
  });

  it("Aged Brie should increase in quality if sellIn > 0", function () {
    const gildedRose = new Shop([
      new Item("Aged Brie", 2, 0),
      
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    
  });  

  it("Normal item sellIn <= 0 decrease twice faster", function () {
    const gildedRose = new Shop([
      new Item("Mana Cake", 1, 6),
      new Item("Mana Cake", 0, 6),
      
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
    expect(items[1].quality).toBe(4);
    
  });  

  it("Conjured item decrease twice faster", function () {
    const gildedRose = new Shop([
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 0, 6),
      
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
    expect(items[1].quality).toBe(2);
    
  });  



  it("Special items quality should drop to 0 after sellIn <= 0 / except Sulfuras", function () {
    const gildedRose = new Shop([
      new Item("Aged Brie", 1, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),

    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(80);
  
  }); 

});
