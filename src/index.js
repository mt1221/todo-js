import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (todoText) => {
  // li生成
  const li = document.createElement("li");
  li.className = "list-parent";
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";
  // p生成
  const p = document.createElement("p");
  p.innerText = todoText;

  //button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの祖父要素タグ(li)を未完了リストから削除
    deleteFromIncompleteList(completeButton.closest(`.list-parent`));

    //完了リストに追加する要素
    const addTarget = completeButton.closest(`.list-parent`);

    //TODO内容テキストを取得
    const todoText = addTarget.firstElementChild.firstElementChild.innerText;

    //div以下を初期化
    addTarget.firstElementChild.textContent = null;

    // p生成
    const p = document.createElement("p");
    p.innerText = todoText;

    //button(戻す)タグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの祖父タグ（li）を完了リストから削除
      const deleteTarget = backButton.closest(`.list-parent`);
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const todoText = backButton.parentNode.firstChild.innerText;
      createIncompleteList(todoText);
    });

    //liタグの要素に各子要素を追加
    addTarget.firstElementChild.appendChild(p);
    addTarget.firstElementChild.appendChild(backButton);

    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの祖父要素タグ(li)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest(`.list-parent`));
  });

  //liタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
