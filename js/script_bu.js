$(document).ready(function () {
    const correctPassword = "1234"; // 設定したいパスワード
    let targetUrl = ""; // 遷移先URLを保存
    const lockedImgSrc = "../img/works_pv.png"; // ロック時の画像
    const originalImages = {}; // 画像の元のパスを保存するオブジェクト

    // 初期設定：画像を一時的にロック画像に変更
    $(".private-link").each(function () {
        const img = $(this).find("img");
        originalImages[$(this).data("target")] = img.attr("src"); // 元の画像パスを保存
        img.attr("src", lockedImgSrc); // ロック画像に変更
    });

    // 認証済みならクラス削除＆元の画像を戻す（タイムアウトで遅延）
    if (localStorage.getItem("authenticated") === "true") {
        setTimeout(function () {
            $(".private-link").each(function () {
                $(this).removeClass("private-link"); // リンク解除
                const img = $(this).find("img");
                const target = $(this).data("target");
                if (originalImages[target]) {
                    img.attr("src", originalImages[target]); // 元の画像に戻す
                }
            });
        }, 100); // 100ミリ秒遅らせて確実に適用
    }

    // 非公開案件のリンクをクリックしたとき
    $(".private-link").on("click", function (event) {
        event.preventDefault(); // デフォルトのリンク動作を防ぐ
        targetUrl = $(this).data("target"); // data-target属性からURLを取得

        // すでに認証済みなら、直接遷移
        if (localStorage.getItem("authenticated") === "true") {
            window.location.href = targetUrl;
            return;
        }

        $("#passwordModal").fadeIn(); // モーダルをフェードイン
        $("#passwordInput").val(""); // 入力欄をクリア
    });

    //モーダルのクローズボタンと背景をクリックした時
    $("#passwordClose,.modal").on("click", function (event) {
        $("#passwordModal").fadeOut(); // モーダルをフェードアウト
        $("#passwordInput").val(""); // 入力欄をクリア
    });


    // パスワードを送信
    $("#submitPassword").on("click", function () {
        if ($("#passwordInput").val() === correctPassword) {
            localStorage.setItem("authenticated", "true"); // 認証情報を保存

            // クラス削除を遅延して確実に適用
            setTimeout(function () {
                $(".private-link").each(function () {
                    $(this).removeClass("private-link");
                    const img = $(this).find("img");
                    const target = $(this).data("target");
                    if (originalImages[target]) {
                        img.attr("src", originalImages[target]); // 元の画像に戻す
                    }
                });
            }, 100);

            window.location.href = targetUrl; // 正しければ遷移
        } else {
            alert("パスワードが違います");
        }
    });

    // モーダルを閉じる
    $("#closeModal").on("click", function () {
        $("#passwordModal").fadeOut(); // フェードアウト
    });

    // モーダル外をクリックしたら閉じる
    $(window).on("click", function (event) {
        if ($(event.target).is("#passwordModal")) {
            $("#passwordModal").fadeOut();
        }
    });
});











//スイッチ
// ラジオボタンの変更イベントを監視
$("input[name='filter']").on("change", function () {
    if ($("#all").prop("checked")) {
        $(".c, .d, .cd").fadeIn(); // すべて表示
    } else if ($("#design").prop("checked")) {
        $(".d").fadeIn();
        $(".c, .cd").fadeOut(); // d以外を非表示
    } else if ($("#coding").prop("checked")) {
        $(".c").fadeIn();
        $(".d, .cd").fadeOut(); // c以外を非表示
    }
});

// 初期状態の設定（例えば "all" をデフォルト表示）
$("input[name='filter']:checked").trigger("change");

