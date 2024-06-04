export default class RandomData {
  constructor() {}
  /**Book random data */
  DataRandom(result) {
    const Rnumber = Math.random();
    const random = Rnumber * result;
    const testNum = Math.ceil(random);
    return testNum;
  }
  RandomId() {
    const Id = String(this.DataRandom(10000000));
    return Id;
  }
  RandomBookName() {
    const Name = String("Book" + this.DataRandom(1000000));
    return Name;
  }
  RandomAuthorName() {
    const Author = String("Author" + this.DataRandom(10000000));
    return Author;
  }
  Randomclassification() {
    const classList = [
      "文學",
      "藝術",
      "人文",
      "歷史",
      "體育",
      "奇幻",
      "武俠",
      "漫畫",
      "雜誌",
      "愛情",
      "恐怖",
    ];
    const number = this.DataRandom(11);
    console.log(number);
    return classList[this.DataRandom(classList.length) - 1];
  }
  /*---------------------------------------------------------------- */
  /*Borrow random data  */

  BorrowId() {
    const titleList = ["a", "b", "c", "d", "e", "f"];
    const BorrowId = `${
      titleList[this.DataRandom(titleList.length) - 1]
    }${this.DataRandom(1000000)}`;
    return BorrowId;
  }
  UserId() {
    const UserId = String("user" + this.DataRandom(10000000));
    return UserId;
  }
  BorrowStatus() {
    const JudgmentStatus = this.DataRandom(10) % 2 === 0 ? true : false;
    const Status = JudgmentStatus ? "已歸還" : "尚未歸還";
    return Status;
  }
  BorrowDate() {
    const dateObject = new Date().toLocaleString("en-US", { timeZone: "UTC" }); // 5/12/2020, 6:50:21 PM
    return dateObject;
  }
}
