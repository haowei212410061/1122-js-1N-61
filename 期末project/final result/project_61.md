[my github repo URL('https://github.com/haowei212410061/1122-js-1N-61')]

[My Vercel Homepage('https://1122-js-1-n-61.vercel.app/')]

## API Project 簡要說明

### 簡易的圖書管理系統 可以針對資料進行操作

### 重點 1:新增資料功能

### 重點 2:查詢資料功能

### 重點 3:編輯資料功能

### 重點 4:刪除資料功能

### 重點 5:資料庫關聯表

---

## API 資料及網路資源來源說明

### Api 資料 ： 後端api路由對資料庫CRUD

### 網路資源來源 1 : Loading動畫設計參考資料:https://www.w3schools.com/howto/howto_css_loader.asp

---

## 後端 Supabase 資料庫設計

### SQL schema and data

#### => table 1 : 書籍的資料（書本編號,書本名稱,作者,書籍分類）

#### => table 2 : 書籍的借閱紀錄(借閱編號,書籍編號,使用者,借閱狀態(是否歸還書籍) ,借閱日期)

#### => 提供執行一次就可重新建立 schema 及 data 之 SQL 指令

```
CREATE TABLE BooksData (
  book_id varchar(50) PRIMARY KEY,
  book_name varchar(50),
  author_name varchar(50),
  classification varchar(50)
);


CREATE TABLE BorrowRecord (
  record_id varchar(50) PRIMARY KEY,
  id char(255),
  user_id VARCHAR(255),
  borrow_status VARCHAR(50),
  borrow_date text,
  FOREIGN KEY (id) REFERENCES booksdata(book_id)
);

INSERT INTO booksdata (book_id, book_name, author_name, classification)
VALUES ('160', '1New Book Title', '1Author Name','恐怖');

INSERT INTO borrowrecord(record_id,id,user_id,borrow_status,borrow_date)
VALUES(
  '789456',
  '160',
  'User5050',
  'successful',
  '5/29/2024, 12:12:42 PM'
)
```

---

### 前端程式設計說明

#### => 功能 1:查詢

##### 查詢指定分類下的所有書籍

###### before

![](p1.png)

###### after

![](p2.png)

##### 查詢指定的書籍編號

###### before

![](p3.png)

###### after

![](p4.png)

##### 查詢指定的書籍名稱

###### before

![](p5.png)

###### after

![](p6.png)

##### 查詢指定的作者

###### before

![](p7.png)

###### after

![](p8.png)

##### 查詢指定書籍的借閱紀錄

###### before

![](p9.png)

###### after

![](p10.png)

##### 查詢指定使用者的借閱紀錄

###### before

![](p11.png)

###### after

![](p12.png)

##### 查詢指定借閱狀態下的所有書籍

###### before

![](p13.png)

###### after

![](p14.png)

##### 查詢指定書籍編號的所有借閱紀錄

###### before

![](p15.png)

###### after

![](p16.png)

##### 查詢所有借閱紀錄

###### before

![](p17.png)

###### after

![](p18.png)

#### => 功能 2：新增

##### 手動新增資料:只會新增在booksdata

###### before

![](p19.png)

###### after

![](p20.png)

###### api response

![](p21.png)

#### => 功能 3 : 刪除

##### 刪除指定資料

###### before
![](p24.png)
![](p25.png)

###### after

![](p26.png)

#### => 功能 4 : 編輯指定資料

##### 編輯指定資料

###### before

![](p27.png)
![](p28.png)
###### after

![](p29.png)
![](p30.png)
---

### 解決問題說明

#### => 問題 1 : 分頁功能製作,在系統內有個功能會撈出所有借閱紀錄,為了讓資料不超出表格 所以需要一個分頁功能限制每次呈現在表格內的資料數量

##### => 解決方法:後端撈出所有資料後,前端透過slice方法處理

###### 前端

###### html css => 設計一個上一頁/下一頁按紐

###### js => 點擊下一頁: 變數page + 1 並且調用以下function, data = fetchApi所回傳的資料,一個JSON物件

###### 點擊上一頁: 變數page - 1 並且調用以下function, data = fetchApi所回傳的資料,一個JSON物件

```
async function PerpageDisplayData(Page, data) {
  try {
    const limit = 10;
    const start = (Page - 1) * limit;
    const end = start * limit;
    let response_length = Object.values(data).length;
    let new_response = Object.values(data);

    response_length > limit
      ? DisplayContent(new_response.slice(start, end))
      : DisplayContent(new_response),
      data_status.classList.add("hidden");
    new_response.length === 0 ? data_status.classList.remove("hidden") : false;
  } catch (error) {
    alert(error);
  }
}
```

###### 後端

###### node.js => 定義一個路由,如果前端對這個api發送get請求,此api會從supabase撈出所有資料並回傳

```
app.get("/api/borrowRecord", async (req, res) => {
  try {
    let { data, error } = await supabase.from("borrowrecord").select("*");
    console.log("success!!");
    res.json(data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
```

#### => 問題 2: 兩張表有關聯,booksdata表的book_id欄位是primary key同時又是borrowrecord的foreign key 如何進行CRUD

##### 解決方法

###### 新增一筆資料: 先新增priamry key那張表數據 再新增foreign key那張表數據

###### 刪除一筆資料: 先刪除foreign key那張表的數據 再刪除parmary Key那張表的數據

```
app.delete("/api/delete/v1/borrowRecord/:borrowData", async (req, res) => {
  try {
    const { borrowData } = req.params;
    await supabase.from("borrowrecord").delete().eq("id", borrowData);
    await supabase.from("booksdata").delete().eq("book_id", borrowData);
    res.status(200).send("delete success!!");
  } catch (error) {
    res.status(500).json({ error });
  }
});
```

###### 編輯一筆資料: 先新增一筆資料再priamry key那張表,更改foreign key內的資料, 最後刪除舊的資料

```
app.put(
  "/api/update/:filterId/:id/:bookName/:author/:Updateclass",
  async (req, res) => {
    try {
      const { id, bookName, author, filterId } = req.params;
      const updateclass = decodeURI(req.params.Updateclass);
      await supabase.from("booksdata").insert([{
            book_id: id,
            book_name: bookName,
            author_name: author,
            classification: updateclass,
          },
        ]);
      await supabase.from("borrowrecord").update({ id: id }).eq("id", filterId);
      await supabase.from("booksdata").delete().eq("book_id", filterId);
      let { data } = await supabase
        .from("booksdata")
        .select("*")
        .eq("id", filterId);
      res.status(204).send({ data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

```

#### => 問題 3

#### => 問題 4

#### => 問題 5

---

### 學習甘苦談

#### => 1.

#### => 2.

#### => 3.

#### => 4.

#### => 5.
