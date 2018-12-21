
var datatable = null;
var formAdd = null;
var formEdit = null;
var editId = null;

function loadDatatable() {
    datatable = $(".employees-datatable").DataTable({
        ajax: {
            url: "/api/employees",
            method: "get"
        },
        columns: [
            {
                title: "Nombres",
                data: "name"
            },
            {
                title: "Apellido Paterno",
                data: "paternalSurname"
            },
            {
                title: "Apellido Materno",
                data: "maternalSurname"
            },
            {
                title: "DNI",
                data: "dni"
            },
            {
                title: "Nro. Hijos",
                data: "childrens",
                className: "text-center"
            },
            {
                title: "Opciones",
                data: "",
                render: function (row, type, data) {
                    var tmp = "";
                    tmp += "<button class='btn btn-info btn-edit' data-id='" + data.id + "' data-loading-text='Cargando...'><i class='fa fa-edit'></i> Editar </button> ";
                    tmp += "<button class='btn btn-danger btn-delete' data-id='" + data.id + "'><i class='fa fa-trash'></i> Eliminar </button>";
                    return tmp;
                }
            }
        ]
    });

    datatable.on("click", ".btn-edit", function () {
        let id = $(this).data("id");
        let $button = $(this);
        $button.startLoading();

        $.ajax({
            url: `/api/employees/${id}`
        }).done(function (result) {
            var formElements = $("#frmEditEmployee").get(0).elements;
            formElements["names"].value = result.names;
            formElements["paternalSurname"].value = result.paternalSurname;
            formElements["maternalSurname"].value = result.maternalSurname;
            formElements["dni"].value = result.dni;
            formElements["childrens"].value = result.childrens;
            editId = id;
            $button.stopLoading();
            $("#edit-employee-modal").modal("show");
        });
    });

    datatable.on("click", ".btn-delete", function () {
        let id = $(this).data("id");
        swal({
            title: '¿Seguro de eliminar el empleado?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
            type: 'question',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return new Promise(() => {
                    $.ajax({
                        url: `/api/employees/${id}`,
                        type: "delete",
                        success: function () {
                            datatable.ajax.reload();
                            swal({
                                type: "success",
                                title: "Completado",
                                text: "El empleado ha sido eliminado con éxito",
                                confirmButtonText: "Excelente"
                            });
                        },
                        error: function () {
                            swal({
                                type: "error",
                                title: "Error",
                                confirmButtonClass: "btn btn-danger m-btn m-btn--custom",
                                confirmButtonText: "Entendido",
                                text: "Al parecer ha ocurrido un problema en el servidor"
                            });
                        }
                    });
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal(
                    'Completado!',
                    'El empleado ha sido eliminado.',
                    'success'
                );
            }
        });
    });
}

function addEvent() {
    $("#btnAddEmployee").on("click", function () {
        $("#add-employee-modal").modal("show");
    });
}

function frmAdd() {
    formAdd = $("#frmAddEmployee").validate({
        submitHandler: function (form) {
            let data = $("#frmAddEmployee").serializeObject();
            $("#frmAddEmployee button").startLoading();
            $("#frmAddEmployee button").attr("disabled", true);
            $.ajax({
                url: "/api/employees",
                method: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                beforeSend: function (xhr) {
                    let token = getCookie("access_token");
                    xhr.setRequestHeader("Authorization", token);
                }
            }).always(function () {
                $("#frmAddEmployee button").stopLoading();
                $("#frmAddEmployee button").attr("disabled", false);
            }).done(function (result) {
                $.notify({
                    icon: 'now-ui-icons ui-1_check',
                    title: 'Exito',
                    message: 'Registrado con éxito'
                },
                    {
                        type: 'success'
                    });
                $("#add-employee-modal").modal("hide");
                datatable.ajax.reload();
            }).fail(function (error) {
                var errorMessage = error.responseText || "Un problema ocurrió en el servidor.";
                $.notify({
                    icon: 'now-ui-icons ui-1_simple-remove',
                    title: 'Error',
                    message: errorMessage
                },
                    {
                        type: 'danger'
                    });
            });
        }
    });
}

function frmEdit() {
    formEdit = $("#frmEditEmployee").validate({
        submitHandler: function (form) {
            let data = $("#frmEditEmployee").serializeObject();
            $("#frmEditEmployee button").startLoading();
            $("#frmEditEmployee button").attr("disabled", true);
            $.ajax({
                url: `/api/employees/${editId}`,
                method: "put",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                beforeSend: function (xhr) {
                    let token = getCookie("access_token");
                    xhr.setRequestHeader("Authorization", token);
                }
            }).always(function () {
                $("#frmEditEmployee button").stopLoading();
                $("#frmEditEmployee button").attr("disabled", false);
            }).done(function (result) {
                $.notify({
                    icon: 'now-ui-icons ui-1_check',
                    title: 'Exito',
                    message: 'Modificado con éxito'
                },
                    {
                        type: 'success'
                    });
                $("#edit-employee-modal").modal("hide");
                datatable.ajax.reload();
                editId = null;
            }).fail(function (error) {
                var errorMessage = error.responseText || "Un problema ocurrió en el servidor.";
                $.notify({
                    icon: 'now-ui-icons ui-1_simple-remove',
                    title: 'Error',
                    message: errorMessage
                },
                    {
                        type: 'danger'
                    });
            });
        }
    });
}

$(function () {
    loadDatatable();
    addEvent();
    frmAdd();
    frmEdit();
});