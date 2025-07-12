class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }
  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(`${this.#brand} ${this.#model}
			speed: ${this.speed}km/h
			trunk: ${trunkStatus}`);
  }
  go() {
    if (this.isTrunkOpen === true) {
      console.log("Car can not go with opened trunk");
      return;
    }
    if (this.speed + 5 > 200) {
      console.log("Car can not go that fast");
      return;
    }
    this.speed += 5;
  }
  break() {
    if (this.speed - 5 < 0) {
      console.log("Car can not go slowlier than 0");
      return;
    }
    this.speed -= 5;
  }
  openTrank() {
    if (this.isTrunkOpen === true) {
      console.log("trunk already is open ");
    }
    if (this.speed != 0) {
      console.log("can not open trunk when Car is moving");
      return;
    }
    this.isTrunkOpen = true;
  }
  closeTrank() {
    if (this.isTrunkOpen === false) {
      console.log("trunk already is closed ");
    }
    this.isTrunkOpen = false;
  }
  getBrand() {
    return this.#brand;
  }
  getModel() {
    return this.#model;
  }
}
class RaceCar extends Car {
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
  go() {
    if (this.speed + 5 > 300) {
      console.log("RaceCar can not go that fast");
      return;
    }
    this.speed += this.acceleration;
  }
  openTrank() {
    console.log("RaceCar does not have trunk");
  }
  closeTrank() {
    console.log("RaceCar does not have trunk");
  }
  displayInfo() {
    console.log(`${this.brand} ${this.model}
			accseleration: ${this.acceleration}
			speed: ${this.speed}km/h`);
  }
}
/*
const Toyota = new Car({
  brand: "Toyota",
  model: "Carolla",
});

Toyota.displayInfo();
Toyota.go();
Toyota.closeTrank();
Toyota.closeTrank();
Toyota.go();
Toyota.displayInfo();
while (Toyota.speed != 200) {
  Toyota.go();
}
Toyota.displayInfo();
Toyota.go();
Toyota.displayInfo();
Toyota.openTrank();
while (Toyota.speed != 0) {
  Toyota.break();
}
Toyota.break();
Toyota.displayInfo();
Toyota.openTrank();
Toyota.openTrank();
*/
const raceCar = new RaceCar({
  brand: "Mclaren",
  model: "F1",
  acceleration: 20,
});
raceCar.closeTrank();
raceCar.displayInfo();
raceCar.go();
raceCar.displayInfo();
