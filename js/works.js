$(document).ready(function () {
    const correctPassword = "maijob"; // 設定したいパスワード
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
        }, 100);
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

        const modal = $("#passwordModal");
        modal.css("display", "block");
        setTimeout(function () {
            modal.css("opacity", "1");
        }, 10);
        $("#passwordInput").val(""); // 入力欄をクリア
    });

    function closeModal() {
        const modal = $("#passwordModal");
        modal.css("opacity", "0");
        setTimeout(function () {
            modal.css("display", "none");
        }, 300);
        $("#passwordInput").val("");
    }

    $("#passwordClose").on("click", closeModal);


    $(window).on("click", function (event) {
        if ($(event.target).is("#passwordModal")) {
            closeModal();
        }
    });

    // パスワードを送信
    $("#submitPassword").on("click", function () {
        if ($("#passwordInput").val() === correctPassword) {
            localStorage.setItem("authenticated", "true"); // 認証情報を保存

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


    // フィルタースイッチ
    $("input[name='works__switch']").on("change", function () {
        $(".dc, .d, .c").fadeOut();

        setTimeout(function () {
            if ($("#all").prop("checked")) {
                $(".dc, .d, .c").fadeIn();
            } else if ($("#design").prop("checked")) {
                $(".c").fadeOut();
                $(".d, .dc").fadeIn();
            } else if ($("#coding").prop("checked")) {
                $(".dc, .c").fadeIn();
                $(".d").fadeOut();
            }
        }, 300); // フェードアウト後に300msの遅延を加えた後にフェードイン
    });

});
