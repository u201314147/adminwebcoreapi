
function frm() {
    let frm = $("#frmLogin").validate({
        submitHandler: function (form) {

            let data = $("#frmLogin").serializeObject();
            $("#btnLogin").startLoading();
            $("#btnLogin").attr("disabled", true);

            $.ajax({
                url: "/api/account/auth",
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (result) {

                document.cookie = "access_token=" + result.token;

                $.notify({
                    icon: 'now-ui-icons ui-1_check',
                    title: 'Exito',
                    message: 'Logeado con éxito'
                },
                    {
                        type: 'success'
                    });

                window.location.href = "/";

                //$.ajax({
                //    url: "/",
                //    beforeSend: function (xhr) {
                //        xhr.setRequestHeader("Authorization", "Bearer " + result.token);
                //    }
                //}).done(function (resultPage) {
                //    $("#btnLogin").stopLoading();
                //    $("#btnLogin").attr("disabled", false);
                //    var newDoc = document.open("text/html", "replace");
                //    newDoc.write(resultPage);
                //    newDoc.close();
                //});

                }).fail(function (error) {
                    $("#btnLogin").stopLoading();
                    $("#btnLogin").attr("disabled", false);
                    $.notify({
                        icon: 'now-ui-icons ui-1_simple-remove',
                        title: 'Error',
                        message: error.responseText
                    },
                        {
                            type: 'danger'
                        });
            });
            return false;
        }
    });
}

$(function () {
    frm();
});