$(function () {
  const todos = JSON.parse(localStorage.getItem("Todos")) || [];
  bindhtml();
  function bindhtml() {
    //代理信息
    $.ajax({
      url: "/dt",
      success: function (res) {
        console.log(res);
        $("#ipv4").html(res.ip);
        $("#addr").html(res.country + "   " + res.area);
      },
    });
    //统计
    var arr = todos.filter((item) => {
      return item.is_select == false;
    });
    var str = `
    <header>
    <section>
        <form>
            <label for="title">
                <img src="https://storage.lynnn.cn/assets/markdown/91147/pictures/2021/04/619cd39e955cea7c6718d38afd084162002a1dab.jpeg?sign=f3720165756a2ba0971a4298d71e755e&t=6077acca" />
            </label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="添加ToDo"
                required="required"
                autocomplete="off"
            />
        </form>
    </section>
</header>
<section>
    <h2>正在进行 <span id="todocount">${arr.length}</span></h2>
    <ol id="todolist" class="demo-box">`;
    arr.forEach((el) => {
      if (!arr.length) {
        return;
      }
      str += ` <li>
           <input class="checkone" type="checkbox" ${
             el.is_select ? "checked" : ""
           } data-id="${el.msg_id}" />
           <p data-id="${el.msg_id}">${el.msg}<input data-id="${el.msg_id}" value="${el.msg}">
           </p>
           <a class="del" data-id="${el.msg_id}">-</a>
       </li>`;
    });

    str += `</ol>
    <h2>已经完成 <span id="donecount">${todos.length - arr.length}</span></h2>
    <ul id="donelist">`;
    todos.forEach((el) => {
      if (el.is_select) {
        str += `
         <li>
           <input class="checkone" type="checkbox" ${
             el.is_select ? "checked" : ""
           } data-id="${el.msg_id}" />
           <p data-id="${el.msg_id}">${el.msg} <input data-id="${el.msg_id}" value="${el.msg}"></p>
           <a class="del" data-id="${el.msg_id}">-</a>
       </li>`;
      }
    });

    str += `
    </ul>
</section>
<footer>
    <p>
        Copyright &copy; 2021 千锋教育 版权所有
        <a href="javascript:;">京ICP备15058198号</a>
    </p>
    <p>
        您当前的ip地址是：<strong id="ipv4"></strong
        >，地理位置：<strong id="addr"></strong>
    </p>
</footer>
    `;
    $("body").html(str);
    $("form").on("submit", function (e) {
      e.preventDefault();
    });
  }

  add();
  remove();
  isfinish();
  update();
  //添加
  function add() {
    $("body").on("keydown", "#title", function (e) {
      var e = e || window.event;
      if (e.keyCode == 13) {
        let msg = $(this).val().trim();
        if (msg) {
          const obj = {
            is_select: false,
            msg_id: todos.length ? todos[todos.length - 1].msg_id - 0 + 1 : 1,
            msg: msg,
          };
          todos.push(obj);
          localStorage.setItem("Todos", JSON.stringify(todos));
          bindhtml();
        }
      }
    });
  }
  //删除
  function remove() {
    $("body").on("click", ".del", function () {
      console.log("....");
      var id = $(this).attr("data-id");
      todos.forEach((el, index) => {
        if (el.msg_id == id) {
          todos.splice(index, 1);
          return;
        }
      });
      localStorage.setItem("Todos", JSON.stringify(todos));
      bindhtml();
    });
  }
  //完成
  function isfinish() {
    $("body").on("click", ".checkone", function () {
      var id = $(this).attr("data-id");
      var todo = todos.filter((item) => {
        return item.msg_id == id;
      })[0];
      todo.is_select = this.checked;
      localStorage.setItem("Todos", JSON.stringify(todos));
      bindhtml();
    });
  }
  //更新
  function update() {
    $("body").on("click", "li p", function () {
      $(this).find("input").show();
    });
    $("body").on("keydown", "li p input", function (e) {
      if (e.keyCode == 13) {
        var id = $(this).attr("data-id");
        var msg = $(this).val().trim();
        console.log(msg);
        if (msg) {
          var todo = todos.filter((item) => {
            return item.msg_id == id;
          })[0];
          todo.msg = msg;
          console.log(todos);
          localStorage.setItem("Todos", JSON.stringify(todos));
          bindhtml();
        }
      }
    });
  }
});
