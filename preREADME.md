# 109-2 Web Programming Hackathon 3 Preparation
  
1. 為了避免考試的時候發生 merge conflict 之類的問題，請先確保你的 wp1092 repo 已經是最新狀態，不確定的話請先 run 一次 pull 指令。
```
cd wp1092
git pull
```

2. 在 wp1092 的資料夾中，使用 create-react-app 來創一個 "hack3" 專案。
```
cd wp1092
create-react-app hack3
```

3. 安裝 "cypress" 套件。
```
cd hack3
yarn add cypress
```
> 安裝 cypress 是讓你在考試時能用 public 測資做測試，若安裝有問題並不會影響你最終的批改成績。

> 要確認是否有安裝成功的話，檢查 package.json 裡面的 "dependencies" 底下是否有這一行：
```
"dependencies": {
    "cypress": "^版本號"
}
```

4. 如有要使用 cypress，請修改 package.json 裡面的 "scripts"：
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "npx cypress run --spec cypress/integration/public.spec.js",
    "eject": "react-scripts eject",
    "server": "nodemon",
    "cypress": "cypress open"
}
```

5. 將 "hack3" push 到 Github。
```
cd wp1092
git add hack3
git commit -m "hack3 init"
git push origin master
```

6. 請確保你的 Gituhb repo 裡面沒有 node_modules 之類不該上傳的東西。

7. 請按照下列步驟先建立好考試需要用的 MongoDB：
    * 登入 MongoDB Atlas 並點選你之前用的 cluster，然後點 Collections>。
    ![](https://i.imgur.com/ijlOfd5.png)
    * 選擇 Create Database，資料庫名稱自訂，collection 名字請填 station，然後 Create。
    ![](https://i.imgur.com/LedF2ar.png)
    * 進入左邊的 Database Access，確保你有一個 admin 帳號，沒有的話請自己創一個。
    ![](https://i.imgur.com/hL2s5Xi.png)
    * 進入左邊的 Network Access，確保你的 IP 白名單可以使你在考試的時候讀寫 database。
    ![](https://i.imgur.com/3vlyn1N.png)
    * 依照上課所說的方法，將 Mongo connect 的網址先做適當修改並記著，考試的時候再將此連結放到 .env 裡。

8. TA 小提醒：

    * 屆時會提供 Hook 版本以及 Class 版本，可自行選擇其中一種使用。
    * 本次仍會有基礎的 lifecycle 需要使用到。
    * 本次前端會需要用到大量的 Array.map() 及 Object.keys()。
    * 本次後端可能會需要用到 Array.sort()。

