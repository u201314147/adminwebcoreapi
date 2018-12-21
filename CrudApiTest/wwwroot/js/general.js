
jQuery.extend(jQuery.validator.messages, {
    required: "El campo es obligatorio.",
    remote: "Please fix this field.",
    email: "El campo no es un correo electrónico válido.",
    url: "El campo no es una URL válida.",
    date: "El campo no es una fecha válida.",
    dateISO: "Please enter a valid date (ISO).",
    number: "El campo no es un número válido.",
    digits: "El campo debe contener solo dígitos.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("El campo debe tener como máximo {0} caracteres."),
    minlength: jQuery.validator.format("El campo debe tener como mínimo {0} caracteres."),
    rangelength: jQuery.validator.format("El campo debe tener una longitud entre {0} y {1} caracteres."),
    range: jQuery.validator.format("El campo debe tener un valor entre {0} y {1}."),
    max: jQuery.validator.format("El campo debe tener un valor menor a {0}."),
    min: jQuery.validator.format("El campo debe tener un valor mayor o igual a {0}.")
});


$.validator.setDefaults({
    errorPlacement: function (error, element) {
        if (element.parent(".input-group").length) {
            error.insertBefore(element.parent());
        }
        else if (element.parent(".form-group").length) {
            error.insertAfter(element);
            error.addClass("text-danger");
        }
        else {
            error.insertAfter(element.parent());    
        }
    }
});

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function logOff() {
    document.cookie = "access_token=''";
    window.location.href = "/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 

$(function ($) {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.fn.startLoading = function () {
        var $this = $(this);
        $this.addClass("btn-loading");
        let icon = '<i class="fa fa-circle-o-notch fa-spin"></i>';
        let text = $this.data("loading-text");
        let fullText = icon + " " + text;
        $this.data("original-text", $this.html());
        $this.html(fullText);
    };

    $.fn.stopLoading = function () {
        var $this = $(this);
        $this.html($this.data("original-text"));
        $this.data("original-text", "");
        $this.removeClass("btn-loading");
    };
});