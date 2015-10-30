
function profileCreate() {

    if (localStorage.cliNome) {
        $('#cliNome').html(localStorage.cliNome);
        $('#cliEmail').html(localStorage.cliEmail);
        $('#cliCel').html(localStorage.cliCel);
        $('#cliCPF').html(localStorage.cliCPF);
        $('#cliSexo').html(localStorage.cliSexo);
        $('#cliDtNasc').html(localStorage.cliDtNasc);
        $('#cliDtIns').html(localStorage.cliDtIns);
        $('#cliLoc').html(localStorage.cliLoc);
        $("#LoginDO").hide();
        $("#LoginOK").fadeIn("fast");
    }
}



$('#LoginGo').click(function () {
    $('#LoginForm').fadeOut("fast", function () {
        $('#LoginLoading').fadeIn("fast");
    });
    var formData = $("#LoginForm").serialize();
    var mac = encodeURI(localStorage.mac);
    alert(1);
    $.ajax({
        url: "http://www.sempreon.mobi/hotspot/macassoc.php?mac=" + mac + "&" + formData,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 15000

    }).always(function () {

    }).fail(function () {

        $('#LoginLoading').hide();
        $('#LoginForm').show();
        alert("Não foi possível se conectar ao servidor.");

    }).success(function (res, status) {

        if (res.cb === "error") {
            $('#LoginLoading').fadeOut("fast", function () {
                $('#LoginError').show();
                $('#LoginForm').fadeIn("fast");
            });
        }
        if (res.cb === "success") {
            $('#LoginLoading').fadeOut("fast", function () {
                $('#LoginError').hide();
            });
            localStorage.cliNome = res.cliNome;
            localStorage.cliSobrenome = res.Sobrenome;
            localStorage.cliEmail = res.cliEmail;
            localStorage.cliFb = res.cliFb;
            localStorage.cliCel = res.cliCel;
            localStorage.cliSexo = res.cliSexo;
            localStorage.cliCPF = res.cliCPF;
            localStorage.cliDtNasc = res.cliDtNasc;
            localStorage.cliDtIns = res.cliDtIns;
            localStorage.cliLoc = res.cliLoc;
            //profileCreate();

            $('#cliNome').html(localStorage.cliNome);
            $('#cliEmail').html(localStorage.cliEmail);
            $('#cliCel').html(localStorage.cliCel);
            $('#cliCPF').html(localStorage.cliCPF);
            $('#cliSexo').html(localStorage.cliSexo);
            $('#cliDtNasc').html(localStorage.cliDtNasc);
            $('#cliDtIns').html(localStorage.cliDtIns);
            $('#cliLoc').html(localStorage.cliLoc);
            $("#LoginDO").hide();
            $("#LoginOK").fadeIn("fast");

            $("#LoginDO").hide();
            $("#LoginOK").fadeIn("fast");

        }

    });
    alert(2);

});