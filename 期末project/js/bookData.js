const search_btn = document.querySelector(".search_btn");
const loading = document.querySelector(".loading");
const overlay = document.querySelector(".overlay");
const DataTable = document.querySelector(".data_table");
const create_container = document.querySelector(".create_info");
const data_status = document.querySelector(".data_status");
const FilterSelect = document.querySelector(".filter_info");
const FilterInput = document.querySelector(".searchInput");
const next_btn = document.querySelector(".perpage-1");
const last_btn = document.querySelector(".perpage-2");
const Classification = document.querySelector(".classification");
const PopUpDeleteWindow = document.querySelector(".popUp");
const reset_btn = document.querySelector(".reset_btn");
const BorrowWindows = document.querySelector(".borrowData_bookPage");
const Borrow_container = document.querySelector(".borrow_table");
const close_btn = document.querySelector(".close");
const Render_url = "https://library-system-x1f7.onrender.com/";
let itempage = 1;
/**-----------------------------------------------------------

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
        `${Render_url}api/v2/borrowRecord/book_id=${bookId}`,
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
      close_btn.addEventListener("click", () => {
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
 * @example FetchApi('${Render_url}api,"GET")
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
    let new_response = Object.values(data);
    const limit = 10;
    const start = (Page - 1) * limit;
    const end = start * limit;
    let response_length = Object.values(data).length;
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
  <input id="book_id" name="book_id" type="text" >
  <label for="book_name">書籍名稱</label>
  <input id="book_name" name="book_name" type="text" >
  <label for="book_author">書籍作者</label>
  <input id="book_author" name="book_author" type="text" >
  <label for="book_class">書籍分類</label>
  <input id="book_class" name="book_class" type="text" >
  <button class="create-btn">create</button>
  </div>
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
        `${Render_url}api/${result_Id.value}/${result_Name.value}/${
          result_Author.value
        }/${encodeURI(result_Class.value)}`,
        { method: "POST" }
      );
      response.status !== 200 ? false : loading.classList.add("hidden"),
        overlay.classList.add("hidden"),
        create_container.classList.add("hidden");
      console.log(response);
      const create_data = await FetchApi(
        `${Render_url}api/book_id/${result_Id.value}`
      );
      data_status.classList.add("hidden");
      DisplayContent(create_data);
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
        `${Render_url}api/book_id/${Filter_input}`,
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
        `${Render_url}api/book_name/${Filter_input}`,
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
        `${Render_url}api/author_name/${Filter_input}`,
        "GET"
      );
      DisplayLoading();
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
    DisplayLoading();
    const response = await FetchApi(
      `${Render_url}api/classification/${result}`,
      "GET"
    );
    HiddenLoading();
    Object.values(response).length === 0
      ? AlertWindows(`沒有${result}種類的書籍`)
      : PerpageDisplayData(1, response);
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
  const delete_result = Popup_column;
  PopUpDeleteWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
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
  DeleteApi(delete_result);
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
    PopUpDeleteWindow.classList.add("hidden");
  });
  disable_btn.addEventListener("click", async () => {
    PopUpDeleteWindow.classList.add("hidden");
    await PerpageDisplayData(itempage, "${Render_url}api/table");
  });
  check_btn.addEventListener("click", async () => {
    try {
      DisplayLoading();
      const get_borrow_response = await fetch(
        `${Render_url}api/v2/borrowRecord/book_id=${delete_column}`
      );
      console.log(get_borrow_response);
      get_borrow_response.status === 200
        ? await fetch(
            `${Render_url}api/delete/v1/borrowRecord/${delete_column}`,
            { method: "DELETE" }
          )
        : false;
      console.log("delete success");
      HiddenLoading();
      PopUpDeleteWindow.classList.add("hidden");
      overlay.classList.add("hidden");
      DataTable.innerHTML = "";
      data_status.classList.remove("hidden");
      const get_all_data = await FetchApi(`${Render_url}api/table`);
      AlertWindows(`書籍編號為${delete_column}的資料已經被刪除`);
      console.log(get_all_data);
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
      `${Render_url}api/book_id/${filterdata}`,
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
    DisplayLoading();
    const book_response = await fetch(
      `${Render_url}api/update/${filterdata}/${UpdateArray[0]}/${
        UpdateArray[1]
      }/${UpdateArray[2]}/${encodeURI(UpdateArray[3])}`,
      { method: "PUT" }
    );
    const UpdateApiData = await FetchApi(
      `${Render_url}api/book_id/${UpdateArray[0]}`,
      "GET"
    );
    HiddenLoading();
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

function AlertWindows(message = String) {
  PopUpAlertWindows.classList.remove("hidden");
  overlay.classList.remove("hidden");
  PopUpAlertWindows.innerHTML = `
  <div class="alert_windows">   
    <div class="alert_content">
      <p>${message}</p>
    </div>
    <div class="alert_enter_btn">
      <span>OK</span>
    </div>
  </div>
  `;
  const Alert_Enter_btn = document.querySelector(".alert_enter_btn");
  Alert_Enter_btn.addEventListener("click", () => {
    PopUpAlertWindows.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}
