# 109-2 Web Programming Hackathon 3 -- Simple MRT Distance Calculator

## 在開始 Coding 前

1. 如果你還沒看過 [preREADME.md](https://hackmd.io/@UTZnTlSqR46n46iMn1U_lQ/H1b03gV_d)，請先看過並確保你已經完成上面的事項。

2. 在 `/wp1092/hack3/` 目錄，安裝底下套件：
```
yarn add axios cors dotenv express mongoose 
```
3. 同樣在 hack3 目錄，安裝底下套件：
```
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env nodemon
``` 

4. 從 Ceiba 上下載 `hack3-hook.zip` 或是 `hack3-class.zip`。請直接在 `/wp1092/hack3/` 底下解壓縮，若有重複的檔案一律直接覆蓋。
> 使用 Macbook 的同學可能會解壓縮出另一個資料夾，請將資料夾裡的檔案全部移到 hack3 底下，請注意是否有將 .env .babelrc .gitignore 一起移過去。


5. 檔案結構如下:
```
wp1092
├── hack3
|   |── .babelrc
|   ├── .env
|   ├── .gitignore
|   ├── README.md
│   ├── cypress
│   │   └── ...
│   ├── cypress.json
│   ├── node_modules
│   │   └── ...
│   ├── nodemon.json
│   ├── package.json
│   ├── public
│   │   └── ...
│   ├── server
│   │   ├── models
│   │   │   └── station.js
│   │   ├── routes
│   │   │   ├── index.js
│   │   │   └── station.js
│   │   ├── server.js
│   │   └── upload.js
│   ├── src
│   │   ├── ...
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── routeGraph.js
│   │   │   ├── station.js
│   │   │   └── stationInfo.js
│   │   ├── containers
│   │   │   └── App.js
│   │   ├── index.js
│   │   ├── styles
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   └── ...
│   └── yarn.lock
└── ...
```
6. 欲執行 frontend，打開 terminal / cmd 執行：
```
cd wp1092/hack3
yarn start
```
7. 欲執行 backend，打開第二個 terminal / cmd 分頁，執行：
```
cd wp1092/hack3
yarn server
```

8. 請仔細閱讀以下的 checkpoints 以及 requirements。

9. **前端將會是 localhost:3000，後端將會是 localhost:4000**。

## 題目說明
這次題目是一個簡易的 Taipei MRT 站到站的距離計算系統。

題目講解請參考這個影片 (16'07")：https://youtu.be/LXU7Fr1R6LY

> 在前端，你需要把詳細的資訊呈現出來，並可以選取 "起始站" 與 "終點站"，然後將必要的參數傳到後端，並在得到結果後呈現在畫面上。

> 在後端，你需要把 server 連接上 MongoDB (i.e. 你的 Mongoose 帳號)，server 在啟動以後會把題目所需到的捷運系統資料寫入你的 database。同時，也需要接收前端傳過來的參數，並計算兩站之間的距離後回傳正確格式的物件給前端。

詳細操作畫面請參考示範影片 (0'39")：https://youtu.be/rht2xGDd1Ac

為了簡化這次的題目，測驗的參考資料只有現淡水信義線(紅線) & 松山新店線(綠線)，同時，我們假裝紅線只有 10 站，綠線只有 11 站，兩線交會在中正紀念堂站。

**<span style="color:red">[Warning] 給同學用來考試的資料，將會是紅線 & 綠線，但批改測試是會用助教的 database，不一定只用這兩條路線，也不一定只有 10 or 11 站，所以請同學在寫的時候要小心，不要把 object 的 key 寫死，不然有可能會拿不到分數。</span>**

以下是每一個站的詳細資料型態：
![](https://i.imgur.com/FEzWWAs.png)

* **紅線的代號是 R，範圍是 R1~R10；綠線的代號是 G，範圍是 G1~G11。**
* **station_type 只會有一個英文字，但測試的時候不一定是 R 或 G。**
* **請特別注意，station_id 與 station_order 都是從 1 開始。**
* **distance_to_next 代表該站到下一站的距離，最後一站的 value 會是 -1。**

## 題目的檔案架構
### 前端
![](https://i.imgur.com/zj1wz5R.png)

### 後端
![](https://i.imgur.com/nrOHryo.png)

## 題目 Functions 說明
### 前端 (src / containers / App.js)
* getStations()：去跟後端要資料庫裡的資料，也就是每一個站的資料
* calculateDistance()：將起始站與終點站的參數傳到後端，計算兩者之間距離，並得到回傳數值。

### 後端 (routes / station.js)
* tidyUpData()：將資料庫裡面的資料整理成題目規定的格式。
* calculate()：計算兩站之間的距離。
* GetStations()：後端 API **(GET)**，負責回傳給前端所有站的資料。
* CalculateDistance()：後端 API **(GET)**，負責計算前端所傳的兩站距離，並回傳該數值。

**考試時，若發現沒有自己需要的 functions，請自己寫，因為助教不打算硬性規定函數的名字跟傳的方式。**

## Checkpoints & Requirements
### Easy (65%)
#### 後端
1. **連接 MongoDB (5%)**
    * 請修改 .env，將自己的 Mongo 連結貼上去，並在 server.js 加入適當的程式碼，讓後端可以連接到資料庫。
    * **請不要將 Mongo 連結寫死在 server.js，因為批改測試會用助教自己的 .env，如果寫死會直接零分。**
    * 在 server.js 加上連接 Mongo 的程式碼後，請在 callback function 加上這行程式碼：
        ```
        dataInit()
        ```
    * dboptions 可加可不加。

2. **設定正確的 API Path (5%)**
    * 請在 routes / index.js 設定正確的 API 路徑，並將路徑與相對應的函數 connect 在一起。
    * **函數請用 wrap 包起來，像這樣：`wrap(function_name)`。**
    * 用來回傳所有站的資料的 API，請將路徑設為 `/api/getStations`，相對應的函數是 GetStations，**此 API 請用 GET 宣告**。
    * 用來回傳兩站距離的 API，請將路徑設為 `/api/calculateDistance`，相對應的函數是 CalculateDistance，**此 API 請用 GET 宣告**。

3. **完成後端第一個 API (20%)**
    * 請完成 routes / station.js 裡面的第一個 API function。
    * 在 GetStations() 裡面：
        * 請利用 Station 這個已經寫好的 schema，從資料庫取出所有資料。
        * 請完成 tidyUpData()，將 data 按照下列格式組裝、排序、回傳：![](https://i.imgur.com/z22gMFF.png)
        * 組裝完的 data 應該要是一個物件，兩個 key 分別是兩條捷運路線的代號 (**再次提醒，考試時給的是 R G 不代表批改也會是 R G**)。
        * data.R (或是 data.G) 裡面是一個 array，每一個 item 就是一個站的詳細資訊，**請將這兩個 array sort 過，sort 的依據是按照 station_order 由小到大排序。**

        * Hint：ES6 可以用 Set(Array) 來取得 unique value
        * Hint：JS 的 Array 排序如下： Array.sort((a, b) => a - b)

        * 完成後請以 Status Code 200 回傳，回傳的物件請遵照以下格式：**(15%)**
        ```
        {
            message: 'success',
            data: // the data after tidy up
        }
        ```
        * 發生任何錯誤請以 Status Code 403 回傳，回傳的物件請遵照以下格式：**(5%)**
        ```
        {
            message: 'error',
            data: []
        }
        ```

#### 前端
4. **顯示正確的路線圖 (20%)**
    * 在 App.js，請用正確的 lifecycle 函數，去跟後端拿所有站的資料。
    * 跟後端拿資料這件事，可以寫在 getStations() 或是自己另外寫別的函數。**請用已經寫好的 instance 去拿。**
    * 拿資料的 API path 為 `/getStations` (instance 已經加上 `/api`)。
    * 請將拿到的資料自己傳到底下的 children 去顯示。
    * **顯示捷運路線圖是用 <RouteGraph /> 這個 component，你可以寫死只 show 出兩條路線 (e.g. 紅線、綠線) 就好。**
    * 每一個 station 的結構如下：
        ```
        <div className="station-line-container">
            <div id={} className="station-and-name" onClick={}>
              <div className="station-rectangle"></div>
              <div className="station-name"></div>
            </div>
            <div id={} className="line"></div>
        </div>
        ```
    * **請將 `<div className="station-and-name"></div>` 設立 id，命名的規則是：假設該站為 G7，則 id="s-G7"，若命名錯誤會導致後面拿不到分數，請注意。**
    * **請將 `<div className="line"></div>` 設立 id，命名的規則是：假設該站為 G7，則 id="l-G7"，若命名錯誤會導致後面拿不到分數，請注意。**
    * 請在 `<div className="station-rectangle"></div>` 顯示該站的 station_id，在
 `<div className="station-name"></div>` 顯示該站的 station_name。**(5%)**
    * 如果該站代號為 R，則顯示紅色；代號為 G，則顯示綠色；代號為 O，則顯示橙色；
代號為 B，則顯示藍色。**(5%)**
        * Hint：視情況把 `red / green / orange / blue` 其中一種加到 `<div className="station-rectangle"></div>` 以及 `<div className="line"></div>` 的 className。
    * 如果該站為**首站**或**尾站**，請將該站的 background 塗滿顏色。**(5%)**
        * Hint：把 `end` 加到 `<div className="station-rectangle"></div>` 的 className。
    * 如果該站是尾站，則不應該出現 `<div className="line"></div>` **(5%)**

5. **顯示每站詳細資料 (15%)**
    * 承上，在 components / station.js 按下 `<div className="station-and-name"></div>` 後，要在畫面上的表格顯示該站的詳細資料。
    * 表格的檔案是在 components / stationInfo.js，請依照裡面已經寫好的 labels 去生成相對應的表格出來，**然後請遵照範例圖片，給予 `<td></td>` 正確的 id。**![](https://i.imgur.com/kmNBBxr.png)

### Medium (15%)
6. **顯示正確的 select options (15%)**
    * 完成 App.js 裡面的兩個 select，將所有站都設成 option。
    * 請依照資料給予的 station_type，將 options 分成兩個 groups。比如題目給 R 跟 G，則按下下拉選單時，選項應該會被分成 R 與 G 兩大群。詳細畫面請參考 demo 影片。
**一樣再次提醒，批改會用不同路線下去測試，請不要將路線代號寫死。**
        * Hint：可以用 `<optgroup label=""></optgroup>` 當作 `<option></option>` 的 parent container。
    * **每一個 option 的 id 請依照此規則命名：**
        * 起始站的 option，假設該站為 G7，則命名為 `"start-group-G7"`
        * 終點站的 option，假設該站為 G7，則命名為 `"end-group-G7"`

### Hard (20%)
7. **計算兩站距離 (20%)**
    * 選擇起始站與終點站後，按下 "查詢距離"，則應該在其右邊顯示正確的距離數字。
    * 在這邊為了簡化(~~助教寫演算法的~~)複雜度，在計算距離時，有一項規定是：不能從數字較大的站坐到數字較小的站，同時，如果有經過轉乘站，則不能搭到數字比轉乘站小的站。若出現違反規則的情況，則會出現 "INVALID" 字眼。
    * 舉例：
        * (O)：G1 -> G7，R2 -> R9，G1 -> R8，R1 -> G11。
        * (X)：G8 -> G3，R5 -> R4，G1 -> R1，R6 -> G9。
    * 好，說了這麼多，其實也沒有要你們寫計算距離的演算法 (已寫好在一個 "calculate(data, start, end)" function 裡)。
    * 請完成 App.js 裡面的 calculateDistance()，一樣請使用寫好的 instance，將必要的參數傳到後端去計算兩端距離 **(5%)**。
    * 傳送資料的 API path 為 `/calculateDistance?start=&end=` (instance 已經加上 `/api`)。
        * **因為批改測試的關係，請務必使用 start 及 end 這兩個參數名稱。參數的值必須是 station_id。**
        * 舉例：假設起始站是 R1，終點站是 R10，則應該寫成 `?start=R1&end=R10`

    * 請完成後端 routes / station.js 裡面的 CalculateDistance() **(5%)**。
        * 這邊需要再做一次跟第三點的事情，也就是從 MongoDB 拿到所有站的資料，並利用 tidyUpData() 來整理這些資料。
        * 將前端所傳過來的 start，end 取出來，連同剛剛整理好的資料，使用 `calculate(data, start, end)` 去計算距離。
        * 一樣，完成後請以 Status Code 200 回傳，回傳的物件請遵照以下格式：
        ```
        {
            message: 'success',
            distance: // the distance after calculating
        }
        ```
        * 發生任何錯誤請以 Status Code 403 回傳，回傳的物件請遵照以下格式：
        ```
        {
            message: 'error',
            distance: -1
        }
        ```

    * 請將後端回傳的值更新到 state 的 distance，並對 distance 的顯示做處理：**(10%)**
        * 若 distance 為 -2 (初始狀態)，請隱藏該值。(**請不要隱藏掉整個`<span id="answer"></span>`**)
        * 若 distance 為 -1，請顯示 "INVALID"，並讓其顏色變為紅色。**(Hint：將 `invalid` 加入 className)**
        * 若 distance >= 0，則顯示該值，無須任何 css 修飾。

## Running Tests
1. 請先確保你的前端有在 `localhost:3000` 運作；確保你的後端有在 `localhost:4000` 運作。

2. 在 `hack3` 底下輸入 `yarn test`，並等待測試結果。請注意，**我們提供的是 Easy, Medium, Hard 比例各佔 65%, 15%, 20% 的公開測資，分數合計佔這次 Hackathon 30% 的成績。另外，實際評分時，我們會用不同的文字、資料的隱藏測資來做測試，佔 Hackathon 70% 的成績，其 Easy, Medium, Hard 的比例與公開測資相同。**

## Push your code to Github
```
cd wp1092
git add hack3
git commit -m "commit message"
git push origin master
```
