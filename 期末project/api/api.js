/**導入後端框架express */
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();

/**導入supabaseAPI and supabaseURL */
const { createClient } = require("@supabase/supabase-js");
const supabase_url = "https://csutzncxyvmaoeujpols.supabase.co";
const supabase_api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzdXR6bmN4eXZtYW9ldWpwb2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNTg2MDgsImV4cCI6MjAyOTkzNDYwOH0.BjiNueEyc3r7Wcu-K4HPoZrb23vc0vSz2P9ZCfPJYnQ";
const supabase = createClient(supabase_url, supabase_api);

/**創建HTTP伺服器 */
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end("hello world\n");
});

/**監聽端口 */
const PORT = process.env.PORT || 3000;
const rend_url = process.env.REND_URL;
app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});

/*
 * 提醒:每次改code前 先停止後端運作 改完後再啟動
 */
/**
 * @route POST /api/post/book/book_id/book_name/author_name/classification
 * @todo 創建一筆完整的資料
 */
app.post(
  "/api/post/book/:book_id/:book_name/:author_name/:classification",
  async (req, res) => {
    try {
      const classification = decodeURI(req.params.classification);
      const { book_id, book_name, author_name } = req.params;

      const { data, error } = await supabase
        .from("booksdata")
        .insert([
          {
            book_id: book_id,
            book_name: book_name,
            author_name: author_name,
            classification: classification,
          },
        ])
        .select();
      res.send([
        {
          id: book_id,
          book_name: book_name,
          author_name: author_name,
          classification: classification,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
);

/**---------------------------------------------------------------------- */

/**
 * @route GET /api/table
 * @return {JSON}
 * @todo 撈出booksdata表的所有紀錄
 */
app.get("/api/table", async (req, res) => {
  try {
    let { data, error } = await supabase.from("booksdata").select("*");
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @route GET /api/column/searchdata
 * @todo 查詢booksdata的表 指定欄位下的資料
 */
app.get("/api/:column/:searchdata", async (req, res) => {
  try {
    const { column, searchdata } = req.params;
    const { data, error } = await supabase
      .from("booksdata")
      .select("*")
      .eq(column, searchdata);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

/**
 * @route PUT /api/:book_id/:book_name/:author/:classification
 * @todo 更新兩張表的資料
 */
app.put(
  "/api/update/:filterId/:id/:bookName/:author/:Updateclass",
  async (req, res) => {
    try {
      const { id, bookName, author, filterId } = req.params;
      const updateclass = decodeURI(req.params.Updateclass);
      await supabase.from("booksdata").insert([
        {
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
        .eq("book_id", id);
      console.log({
        book_id: id,
        book_name: bookName,
        author_name: author,
        classification: updateclass,
      });
      res.status(204).send({ data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/**
 * @route POST /api/borrow_id/book_id/user_id/status/date
 * @todo 新增一筆借閱紀錄
 */
app.post(
  "/api/post/borrowRecord/:BrNum/:Bid/:user/:status/:date",
  async (req, res) => {
    try {
      const { BrNum, Bid, user } = req.params;
      const new_status = decodeURIComponent(req.params.status);
      const new_date = decodeURIComponent(req.params.date);
      let { data, error } = await supabase
        .from("borrowrecord")
        .insert([
          {
            record_id: BrNum,
            id: Bid,
            user_id: user,
            borrow_status: new_status,
            borrow_date: new_date,
          },
        ])
        .select();
      console.log({
        record_id: BrNum,
        id: Bid,
        user_id: user,
        borrow_status: new_status,
        borrow_date: new_date,
      });
      res.status(200).send({ message: "Insert Success!!" }).end();
    } catch (error) {
      console.log(error);
      res.status(400).send(error).end();
    }
  }
);

/**
 * @route GET /api/borrowRecord
 * @todo 查詢所有的借閱紀錄
 */
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

/**
 * @route GET /api/borrowRecord/:book_id
 * @todo 查詢指定書籍編號的借閱紀錄
 */

app.get("/api/v2/borrowRecord/book_id=:bookId", async (req, res) => {
  try {
    const book_Id = req.params.bookId;
    const { data, error } = await supabase
      .from("borrowrecord")
      .select(
        `record_id, user_id, borrow_status, borrow_date ,booksdata(book_id)`
      )
      .eq("id", book_Id);
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/**
 * @route DELETE /api/v1/borrowRecord/:column=$:borrowData
 * @todo 刪除兩張表的紀錄
 */
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

/**
 * @route GET /api/v3/borrowRecord/column/result
 * @todo 查詢借閱紀錄的表 指定欄位下的資料
 */
app.get("/api/v3/borrowReocrd/:column/:result", async (req, res) => {
  try {
    const { column, result } = req.params;
    const { data } = await supabase
      .from("borrowrecord")
      .select("*")
      .eq(column, result);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
