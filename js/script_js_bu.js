document.addEventListener("DOMContentLoaded", function () {
    const correctPassword = "1234"; // 設定したいパスワード
    let targetUrl = ""; // 遷移先URLを保存
    const lockedImgSrc = "../img/works_pv.png"; // ロック時の画像
    const originalImages = {}; // 画像の元のパスを保存するオブジェクト

    // 初期設定：画像を一時的にロック画像に変更
    document.querySelectorAll(".private-link").forEach(link => {
        const img = link.querySelector("img");
        originalImages[link.dataset.target] = img.src; // 元の画像パスを保存
        img.src = lockedImgSrc; // ロック画像に変更
    });

    // 認証済みならクラス削除＆元の画像を戻す（タイムアウトで遅延）
    if (localStorage.getItem("authenticated") === "true") {
        setTimeout(() => {
            document.querySelectorAll(".private-link").forEach(link => {
                link.classList.remove("private-link"); // リンク解除
                const img = link.querySelector("img");
                const target = link.dataset.target;
                if (originalImages[target]) {
                    img.src = originalImages[target]; // 元の画像に戻す
                }
            });
        }, 100);
    }

    // 非公開案件のリンクをクリックしたとき
    document.querySelectorAll(".private-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // デフォルトのリンク動作を防ぐ
            targetUrl = this.dataset.target; // data-target属性からURLを取得

            // すでに認証済みなら、直接遷移
            if (localStorage.getItem("authenticated") === "true") {
                window.location.href = targetUrl;
                return;
            }

            const modal = document.getElementById("passwordModal");
            modal.style.display = "block";
            setTimeout(() => modal.style.opacity = "1", 10);
            document.getElementById("passwordInput").value = ""; // 入力欄をクリア
        });
    });

    function closeModal() {
        const modal = document.getElementById("passwordModal");
        modal.style.opacity = "0";
        setTimeout(() => modal.style.display = "none", 300);
        document.getElementById("passwordInput").value = "";
    }

    document.getElementById("passwordClose").addEventListener("click", closeModal);
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", closeModal);
    });

    window.addEventListener("click", function (event) {
        if (event.target === document.getElementById("passwordModal")) {
            closeModal();
        }
    });

    // パスワードを送信
    document.getElementById("submitPassword").addEventListener("click", function () {
        if (document.getElementById("passwordInput").value === correctPassword) {
            localStorage.setItem("authenticated", "true"); // 認証情報を保存

            setTimeout(() => {
                document.querySelectorAll(".private-link").forEach(link => {
                    link.classList.remove("private-link");
                    const img = link.querySelector("img");
                    const target = link.dataset.target;
                    if (originalImages[target]) {
                        img.src = originalImages[target]; // 元の画像に戻す
                    }
                });
            }, 100);

            window.location.href = targetUrl; // 正しければ遷移
        } else {
            alert("パスワードが違います");
        }
    });

    // フィルタースイッチ
    document.querySelectorAll("input[name='filter']").forEach(radio => {
        radio.addEventListener("change", function () {
            document.querySelectorAll(".c, .d, .cd").forEach(el => el.style.display = "none");
            if (document.getElementById("all").checked) {
                document.querySelectorAll(".c, .d, .cd").forEach(el => el.style.display = "block");
            } else if (document.getElementById("design").checked) {
                document.querySelectorAll(".d").forEach(el => el.style.display = "block");
            } else if (document.getElementById("coding").checked) {
                document.querySelectorAll(".c").forEach(el => el.style.display = "block");
            }
        });
    });

    // 初期状態の設定
    const selectedFilter = document.querySelector("input[name='filter']:checked");
    if (selectedFilter) {
        selectedFilter.dispatchEvent(new Event("change"));
    }

});

