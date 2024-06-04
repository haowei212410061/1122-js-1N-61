import RandomData from "./js/RandomModule.js";
const search_btn = document.querySelector(".search_btn");
const search_btn_inMenu = document.querySelector(".search_book_list");
const loading = document.querySelector(".loading");
const overlay = document.querySelector(".overlay");
const DataTable = document.querySelector(".data_table");
const Create_btn = document.querySelector(".create");
const create_container = document.querySelector(".create_info");
const data_status = document.querySelector(".data_status");
const FilterSelect = document.querySelector(".filter_info");
const FilterInput = document.querySelector(".searchInput");
const next_btn = document.querySelector(".perpage-1");
const last_btn = document.querySelector(".perpage-2");
const Classification = document.querySelector(".classification");
const PopUpDeleteWindow = document.querySelector(".popUp");
const borrowHistory = document.querySelector(".histroy");
const forDivHidden = document.querySelector(".forHidden");
const container = document.querySelector(".container");
const reset_btn = document.querySelector(".reset_btn");
const InsertData_btn = document.querySelector(".create_fast");
const BorrowWindows = document.querySelector(".borrowData");
const Borrow_container = document.querySelector(".borrow_table");
const InsertRandomData = new RandomData();
const Borrowclose_btn = document.querySelector(".close");
let itempage = 0;

/**-----------------------------------------------------------
Note:
1. 使用fetch()會回傳一個response 包含status,body等等
2. 使用FetchApi()函數 會回傳一個JSON data 
3. 使用supabase await supabase.from..... 會回傳一個reponse包含status,body
4. 使用supabase let {data,error} = await supabase.from... 會回傳一個JSON data
5. 使用encodeURI 為中文參數編碼 後端用decodeURI解碼
6. req.query = https://localhost:3000/user?userId=5896544 
   req.query.userId = 5986544
   req.params = https://localhost:3000/:user => https://localhost:3000/5896544
   req.params = 5986544
7. 關聯表刪除要先刪除foreign key那張表的資料 再刪除primary key那張表的資料
8. 關聯表更新：在primary key表先插入一筆新的資料同步foreign key的資料 最後刪除舊資料 

/**---------------------------------------------------------- */
/**
 * @async
 * @function DisplayContent
 * @todo 在頁面上顯示資料
 * @param {Object} database
 * @return {void}
 */
function DisplayContent(database) {
  const displayInHtml = database
    .map((item) => {
      const { book_id, book_name, author_name, classification } = item;
      return `
    <tr>
      <td><span>${book_id}</span></td>
      <td><span>${book_name}</span></td>
      <td><span>${author_name}</span></td>
      <td><span>${classification}</span></td>
      <th>
      <button class="delete${book_id}" width="20px" height="10px">刪除</button>
      <button class="edit${book_id}" width="20px" height="10px">編輯</button>
      <button class="record${book_id}" width="20px" height="10px">借閱紀錄</button>
      </th>
    </tr>
    
    `;
    })
    .join(" ");
  DataTable.innerHTML = displayInHtml;

  /**
   * 取得網頁的按鈕
   */
  let new_response = Object.values(database);
  new_response.forEach((item) => {
    const delete_btn = document.querySelector(
      `${"." + "delete" + item.book_id}`
    );
    const edit_btn = document.querySelector(`${"." + "edit" + item.book_id}`);
    const record_btn = document.querySelector(
      `${"." + "record" + item.book_id}`
    );
    const bookId = item.book_id;

    delete_btn.addEventListener("click", async () => {
      try {
        console.log(bookId);
        await PopUpDeleteWindows(bookId);
      } catch (error) {
        console.log(error);
      }
    });
    edit_btn.addEventListener("click", () => {
      console.log("test");
      overlay.classList.remove("hidden");
      CreateInfo("編輯資料", bookId);
    });
    record_btn.addEventListener("click", async () => {
      const response = await FetchApi(
        `http://localhost:3000/api/v2/borrowRecord/book_id=${bookId}`,
        "GET"
      );
      const DataArray = Object.values(response)
        .map((item) => {
          const { record_id, book_id, user_id, borrow_status, borrow_date } =
            item;
          return `
         
        <tr>
          <td>${record_id}</td>
          <td>${bookId}</td>
          <td>${user_id}</td>
          <td>${borrow_status}</td>
          <th>${borrow_date}</th>
        </tr>
        `;
        })
        .join("");
      BorrowWindows.style.display = "grid";
      overlay.classList.remove("hidden");
      Borrowclose_btn.addEventListener("click", () => {
        overlay.classList.add("hidden");
        BorrowWindows.style.display = "none";
      });
      Borrow_container.innerHTML = DataArray;
      console.log(DataArray);
      console.log("test", response);
    });
  });
}

/**
 * @async
 * @function FetchApi
 * @param {string } url 請求url
 * @param {GET} method 請求方法
 * @returns {JSON}
 * @example FetchApi('http://localhost:3000/api,"GET")
 * 注意:不適用Post,Delete 因為不會回傳data
 */
async function FetchApi(url, method) {
  try {
    const response = await fetch(url, { method: method });
    if (!response.ok) {
      throw new Error(`status:${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
/**
 * @async
 * @function PerpageDisplayData
 * @param {Number} Page 頁數
 * @param {string} url 請求的url
 * @todo 分頁顯示資料(上一頁 / 下一頁)
 */
async function PerpageDisplayData(Page, data) {
  try {
    const limit = 10;
    const start = (Page - 1) * limit;
    const end = start * limit;
    let response_length = Object.values(data).length;
    let new_response = Object.values(data);
    /**
     * 判斷回傳的資料長度是否大於limit
     * @param {number} response_length
     * @param {number} limit
     * @returns {void}
     * @todo
     * 1. 大於limit就執行分頁功能
     * 2. 小於limit直接顯示
     * 3. 等於0顯示no data
     */
    response_length > limit
      ? DisplayContent(new_response.slice(start, end))
      : DisplayContent(new_response),
      data_status.classList.add("hidden");
    new_response.length === 0 ? data_status.classList.remove("hidden") : false;
  } catch (error) {
    alert(error);
  }
}

/**
 * @function DisplayLoading
 * @todo 用於網頁執行動作時的顯示動畫
 */
function DisplayLoading() {
  loading.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

/**
 * @function HiddenLoading
 * @todo 用於執行完動作時隱藏動畫
 */
function HiddenLoading() {
  loading.classList.add("hidden");
  overlay.classList.add("hidden");
}

/**
 * @async
 * @function DisplayEditInput()
 * @todo 在網頁中央顯示輸入框用於新增以及編輯資料
 * @param {string} title
 */
function DisplayEditInput(title) {
  create_container.classList.remove("hidden");
  create_container.innerHTML = `
  <h3>${title}</h3>
  <button class="close-btn">X</button>
  <div class="create-list">
  <label for="book_id">書籍編號</label>
  <input id="book_id" type="text" placeholder="id">
  <label for="book_name">書籍名稱</label>
  <input id="book_name" type="text" placeholder="name">
  <label for="book_author">書籍作者</label>
  <input id="book_author" type="text" placeholder="author">
  <label for="book_class">書籍分類</label>
  <input id="book_class" type="text" placeholder="classification">
  <button class="create-btn">create</button>
  `;
}
/**
 * @async
 * @function CreateInfo
 * @param {string} title
 * @param {string} data
 * @todo 手動新增資料以及編輯資料
 * @returns {Promise}
 */
async function CreateInfo(title, data) {
  DisplayEditInput(title);
  const create_btn = document.querySelector(".create-btn");
  const close_btn = document.querySelector(".close-btn");
  const result_Id = document.querySelector("#book_id");
  const result_Name = document.querySelector("#book_name");
  const result_Author = document.querySelector("#book_author");
  const result_Class = document.querySelector("#book_class");

  console.log(create_btn);
  close_btn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    create_container.classList.add("hidden");
  });
  create_btn.addEventListener("click", async () => {
    if (title === "新增資料") {
      if (
        result_Id.value === "" ||
        result_Name.value === "" ||
        result_Author.value === "" ||
        result_Class.value === ""
      ) {
        result_Id.style.border = "1px solid red";
        result_Name.style.border = "1px solid red";
        result_Author.style.border = "1px solid red";
        result_Class.style.border = "1px solid red";
      }
      const response = await fetch(
        `http://localhost:3000/api/post/book/${result_Id.value}/${
          result_Name.value
        }/${result_Author.value}/${encodeURI(result_Class.value)}`,
        { method: "POST" }
      );
      response.status !== 200 ? false : loading.classList.add("hidden"),
        overlay.classList.add("hidden"),
        create_container.classList.add("hidden");

      console.log(response);
    } else if (title === "編輯資料") {
      /** @type {Array.<string>} */
      let datalist = [];
      datalist.push(result_Id.value);
      datalist.push(result_Name.value);
      datalist.push(result_Author.value);
      datalist.push(result_Class.value);
      UpdateApi(data, datalist);
    }
  });
}

Create_btn.addEventListener("click", () => {
  CreateInfo("新增資料");
  overlay.classList.remove("hidden");
});

/**
 * @async
 * @function SelectOptionValue
 * @todo 取得書籍分類的選單內容
 * @returns {string}
 */
function SelectOptionValue() {
  var selectedOption =
    Classification.options[Classification.selectedIndex].value;
  switch (selectedOption) {
    case "文學":
      console.log("分類為文學");
      break;
    case "藝術":
      console.log("分類為藝術");
      break;
    case "人文":
      console.log("分類為人文");
      break;
    case "歷史":
      console.log("分類為歷史");
      break;
    case "體育":
      console.log("分類為體育");
      break;
    case "奇幻":
      console.log("分類為奇幻");
      break;
    case "武俠":
      console.log("分類為武俠");
      break;
    case "漫畫":
      console.log("分類為漫畫");
      break;
    case "愛情":
      console.log("分類為愛情");
      break;
    case "恐怖":
      console.log("分類為恐怖");
      break;
    case "雜誌":
      console.log("分類為雜誌");
      break;
    default:
      console.log("未知分類");
  }
  return selectedOption;
}
/**
 * @function SelectInfoValue
 * @todo 根據書籍編號 書籍作者 書籍名稱查詢
 */
async function SelectInfoValue() {
  try {
    /**@type {string} */
    var Filter_input = FilterInput.value.trim();
    /**@type {string} */
    var selectedOption = FilterSelect.options[FilterSelect.selectedIndex].value;
    if (
      selectedOption === "book_id" &&
      typeof Filter_input === "string" &&
      Filter_input !== ""
    ) {
      data_status.classList.add("hidden");
      DisplayLoading();
      const response = await FetchApi(
        `http://localhost:3000/api/book_id/${Filter_input}`,
        "GET"
      );
      HiddenLoading();
      datacheck(response);
    } else if (
      selectedOption === "book_name" &&
      typeof Filter_input === "string" &&
      Filter_input !== ""
    ) {
      data_status.classList.add("hidden");
      DisplayLoading();
      const response = await FetchApi(
        `http://localhost:3000/api/book_name/${Filter_input}`,
        "GET"
      );
      HiddenLoading();
      datacheck(response);
    } else if (
      selectedOption === "author_name" &&
      typeof Filter_input === "string" &&
      Filter_input !== ""
    ) {
      data_status.classList.add("hidden");
      DisplayLoading();
      const response = await FetchApi(
        `http://localhost:3000/api/author_name/${Filter_input}`,
        "GET"
      );
      HiddenLoading();
      datacheck(response);
    } else {
      FilterInput.style.border = "1px solid red";
      data_status.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * @function datacheck
 * @param {Object} dataArray
 * @todo 檢查回傳的資料是否為空值 並且顯示對應的狀態
 */
function datacheck(dataArray = Object) {
  const new_response = Object.values(dataArray);
  console.log("1 ");
  new_response.length === 0
    ? data_status.classList.remove("hidden")
    : data_status.classList.add("hidden"),
    DisplayContent(dataArray);
}

/**
 * 目前有兩種搜尋功能
 * 1. 選單內容：書籍編號 書籍作者 書籍名稱 再由右側輸入匡輸入內容
 * 2. 根據書籍分類選單的內容查詢
 * 因為目前只能做到單一查詢
 * 所以為了讓搜尋按鈕區分目前要執行的是哪種搜尋
 * 因此進行以下判斷
 * 1. 若第一種查詢功能的右側輸入匡value為空字串 則代表現在要查詢的是書籍分類
 * 2. 若第一種查詢功能的右側輸入匡value不為空字串 則不使用書籍分類查詢
 */
search_btn.addEventListener("click", async () => {
  const Filter_input = FilterInput.value.trim();
  if (Filter_input === "") {
    let result = SelectOptionValue();
    const response = await FetchApi(
      `http://localhost:3000/api/classification/${result}`,
      "GET"
    );
    PerpageDisplayData(1, response);
    itempage += 1;
  } else {
    SelectInfoValue();
  }
});

/**
 *
 * @function PopUpDeleteWindows
 * @param {string} Popup_column
 * @todo 當點擊刪除後 會彈窗再次確認是否要刪除
 * 1. 點擊確認 -> 刪除
 * 2. 點擊取消 -> 隱藏彈窗 保留資料
 */
function PopUpDeleteWindows(Popup_column) {
  console.log(Popup_column);
  overlay.classList.remove("hidden");
  PopUpDeleteWindow.classList.remove("hidden");
  PopUpDeleteWindow.innerHTML = `
  <div class="delete_title">
    <button class="close_delete">X</button>
  </div>
  <div class="delete_content">
    <p>您確認要刪除此選項嗎？</p>
  </div>
  <div class="button_list">
    <button class="disable">取消</button>
    <button class="check_btn">確認</button>
  </div>
  `;
  DeleteApi(Popup_column);
}

/**
 * 刪除功能
 * @param {string} delete_column
 */
function DeleteApi(delete_column) {
  const close_btn = document.querySelector(".close_delete");
  const disable_btn = document.querySelector(".disable");
  const check_btn = document.querySelector(".check_btn");
  close_btn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    PopUpDeleteWindow.classList.add("hidden");
  });
  disable_btn.addEventListener("click", async () => {
    overlay.classList.add("hidden");
    PopUpDeleteWindow.classList.add("hidden");
    await PerpageDisplayData(itempage, "http://localhost:3000/api/table");
  });
  check_btn.addEventListener("click", async () => {
    try {
      const get_borrow_response = await fetch(
        `http://localhost:3000/api/v2/borrowRecord/book_id=${delete_column}`
      );
      console.log(get_borrow_response);
      get_borrow_response.status === 200
        ? await fetch(
            `http://localhost:3000/api/delete/v1/borrowRecord/${delete_column}`,
            { method: "DELETE" }
          )
        : false;
      console.log("delete success");
      PopUpDeleteWindow.classList.add("hidden");
      overlay.classList.add("hidden");
      PerpageDisplayData(itempage, `http://localhost:3000/api/table`);
    } catch (error) {
      console.log(error);
    }
  });
}

/**
 * @async
 * @function UpdateApi
 * @param {string} filterdata
 * @param {Array.<string>} UpdateArray
 * @todo 更新資料庫內資料
 */
async function UpdateApi(filterdata, UpdateArray = Array) {
  try {
    const response = await FetchApi(
      `http://localhost:3000/api/book_id/${filterdata}`,
      "GET"
    );

    for (const item of response) {
      /**
       * @typedef {Object} BookData
       * @property {string} id
       * @property {string} bookName
       * @property {string} author
       * @property {string} classification
       */
      /**@type {BookData} */
      const data_object = {
        id: item.book_id,
        bookName: item.book_name,
        author: item.author_name,
        classification: item.classification,
      };
      console.log(data_object);

      /**檢查輸入匡內的值是否為空 */
      UpdateArray[0] !== ""
        ? (data_object.id = UpdateArray[0])
        : console.log("輸入值為空");
      UpdateArray[1] !== ""
        ? (data_object.bookName = UpdateArray[1])
        : console.log("輸入值為空");
      UpdateArray[2] !== ""
        ? (data_object.author = UpdateArray[2])
        : console.log("輸入值為空");
      UpdateArray[3] !== ""
        ? (data_object.classification = UpdateArray[3])
        : console.log("輸入值為空");
      console.log(data_object);
    }
    create_container.classList.add("hidden");
    overlay.classList.add("hidden");
    const book_response = await fetch(
      `http://localhost:3000/api/update/${filterdata}/${UpdateArray[0]}/${
        UpdateArray[1]
      }/${UpdateArray[2]}/${encodeURI(UpdateArray[3])}`,
      { method: "PUT" }
    );
    const UpdateApiData = await FetchApi(
      `http://localhost:3000/api/book_id/${UpdateArray[0]}`,
      "GET"
    );
    console.log(UpdateApiData);
    DisplayContent(UpdateApiData);
  } catch (error) {
    console.log(error);
  }
}

/**
 * @function ResetData
 * @todo 管理列表內所有元素恢復默認
 */
async function ResetData() {
  let Empty = [];
  DisplayContent(Empty);
  data_status.classList.remove("hidden");
  Classification.selectedIndex = 0;
  FilterSelect.selectedIndex = 0;
  FilterInput.value = "";
}
reset_btn.addEventListener("click", () => {
  ResetData();
});

/**
 * @function InsertData
 * @todo 快速新增資料
 */

async function InsertData() {
  let book_id = InsertRandomData.RandomId();
  let book_name = InsertRandomData.RandomBookName();
  let author_name = InsertRandomData.RandomAuthorName();
  let classification = InsertRandomData.Randomclassification();
  const InsertBookData = {
    id: book_id,
    Name: book_name,
    author: author_name,
    classification: classification,
  };

  let borrow_id = InsertRandomData.BorrowId();
  let user_id = InsertRandomData.UserId();
  let borrow_status = InsertRandomData.BorrowStatus();
  let borrow_date = InsertRandomData.BorrowDate();
  console.log(borrow_id);

  const InsertBorrowData = {
    borrow_id: borrow_id,
    id: book_id,
    user_id: user_id,
    borrow_status: borrow_status,
    borrow_date: borrow_date,
  };
  const bookdata_response = await FetchApi(
    `http://localhost:3000/api/post/book/${book_id}/${book_name}/${author_name}/${encodeURIComponent(
      classification
    )}`,
    "POST"
  );
  console.log(InsertBookData, InsertBorrowData);
  const borrowdata_response = await FetchApi(
    `http://localhost:3000/api/post/borrowRecord/${borrow_id}/${book_id}/${user_id}/${encodeURIComponent(
      borrow_status
    )}/${encodeURIComponent(borrow_date)}`,
    "POST"
  );
  console.log("borrowdata insert success");
}
InsertData_btn.addEventListener("click", () => {
  InsertData();
});
/**
 * 借閱紀錄頁面
 */
borrowHistory.addEventListener("click", () => {
  forDivHidden.classList.add("hidden");
  container.innerHTML = `
  <iframe src="./page/borrowPage.html" frameborder="no" scrolling="no" allowtransparency="yes" width="1200px" height="1000px" />`;
});

/**
 * @todo 查詢書籍資料頁面
 */
search_btn_inMenu.addEventListener("click", async () => {
  forDivHidden.classList.add("hidden");
  container.innerHTML = `
  <iframe src="./page/bookData.html" frameborder="no" scrolling="no" allowtransparency="yes" width="1050px" height="1000px" />`;
});
