//============================
// DESASSOCIAR
//============================
$('#logout').click(function () {
    if (confirm('Tem certeza que deseja desassociar este dispositivo?')) {

        var mac = encodeURI(localStorage.mac);

        var req = new XMLHttpRequest();
        req.open("POST", "http://www.sempreon.mobi/hotspot/tunnel/macassoc.php?mac=" + mac + "&action=unassoc", true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var data = req.responseText;
                    localStorage.removeItem("cliNome");
                    profileCreate();
                }
            }
        };
        req.send(null);
    }
});
//============================
// FAZER LOGIN
//============================
$('#LoginGo').click(function () {
    $('#LoginForm').hide();
    $('#LoginLoading').show();

    var formData = $("#LoginForm").serialize();
    var mac = encodeURI(localStorage.mac);

    var req = new XMLHttpRequest();
    req.open("POST", "http://www.sempreon.mobi/hotspot/tunnel/macassoc.php?mac=" + mac + "&" + formData, true);
    req.onreadystatechange = function () {
        $('#LoginLoading').hide();
        if (req.readyState == 4) {
            if (req.status == 200) {
                var data = req.responseText;
                var res = data.split(";");
                localStorage.cliNome = res[1];
                localStorage.cliSobrenome = res[2];
                localStorage.cliEmail = res[3];
                localStorage.cliCPF = res[4];
                localStorage.cliDtIns = res[5];
                localStorage.cliDtNasc = res[6];
                localStorage.cliSexo = res[7];
                localStorage.cliCel = res[8];
                localStorage.cliFb = res[9];
                localStorage.cliLoc = res[10];
                profileCreate();
            }
        }
    };
    req.send(null);
    return;

    $.ajax({
        url: "http://www.sempreon.mobi/hotspot/macassoc.php?mac=" + mac + "&" + formData,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 15000

    }).always(function () {
        alert("always");

    }).fail(function () {
        alert("Não foi possível se conectar ao servidor.");
        $('#LoginLoading').hide();
        $('#LoginForm').show();


    }).success(function (res, status) {
        alert("success");
        /*
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
         */
    });

});
//============================
// DESCONECTAR USUARIO
//============================
$('.desconectar').click(function () {
    if (confirm('Deseja desconectar-se do SempreOn?')) {
        var req = new XMLHttpRequest();
        req.open("POST", "http://www.sempreon.mobi/hotspot/tunnel/disconnect.php?user=" + localStorage.cliEmail, true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var data = req.responseText;
                    if (data == "success") {
                        alert("Você foi desconectado.");
                        ping();
                    }
                    else {
                        alert("Ocorreu um erro em sua requisição. Tente novamente mais tarde.");
                    }
                }
            }
        };
        req.send(null);
        return;
    }
});
//============================
// TELA "ALTERAR SENHA"
//============================
function passClear() {
    $('#senha_login').val(localStorage.cliEmail);
    $(this).closest('form').find("input[type=text], input[type=password], textarea").val("");
}
$('#alterar').click(function () {
    passClear();
    $('#LoginOK').hide();
    $('#passDiv').show();
});
$('#passBack').click(function () {
    passClear();
    $('#passDiv').hide();
    $('#LoginOK').show();
});
$('#passGo').click(function () {

    var user = encodeURI($('#senha_login').val());
    var p0 = encodeURI($('#senha_atual').val());
    var p1 = encodeURI($('#senha_nova1').val());
    var p2 = encodeURI($('#senha_nova2').val());

    if (p0 == "") {
        alert("Digite a sua senha atual");
        return;
    }
    if (p1 == "" || p2 == "") {
        alert("Digite uma nova senha");
        return;
    }
    if (p1 != p2) {
        alert("Os campos de nova senha não coincidem");
        return;
    }
    if (p0 == p1) {
        alert("A nova senha é a mesma senha anterior");
        return;
    }
    $("#passForm").hide();
    $('#passLoad').show();

    var formData = $("#passForm").serialize();

    passClear();

    var req = new XMLHttpRequest();
    req.open("POST", "http://www.sempreon.mobi/hotspot/tunnel/newpass.php?user=" + user + "&pass1=" + p0 + "&pass2=" + p1, true);
    req.onreadystatechange = function () {
        $('#passLoad').hide();
        $("#passForm").show();
        if (req.readyState == 4) {
            if (req.status == 200) {
                var data = req.responseText;
                var res = data.split(";");
                alert(res[1]);
                if (res[0] == "error") {
                    $('#senha_atual').val("");
                    $('#senha_nova1').val("");
                    $('#senha_nova2').val("");
                }
                else {
                    passClear();
                    $("#passDiv").hide();
                    $("#passForm").show();
                    $('#LoginOK').show();
                }
            }
        }
    };
    req.send(null);
    return;
});