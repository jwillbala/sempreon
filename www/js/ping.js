//=============================
// PING RADIUS
//=============================
function ping() {
    if (!localStorage.cliNome) {
        return false;
    }
    var req = new XMLHttpRequest();
    req.open("POST", "http://www.sempreon.mobi/hotspot/tunnel/ping.php?user=" + localStorage.cliEmail, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var data = req.responseText;
                var res = data.split(";");
                console.log(data);
                localStorage.status = res[0];
                localStorage.statusLoc = res[6];
                localStorage.statusMac = res[2];
                localStorage.statusSo = res[3];
                localStorage.statusBrowser = res[4];
                localStorage.statusDate = res[5];
                statusCreate();
            }
        }
    };
    req.send(null);
    return;

}
//=============================
// POPULAR STATUS DE CONEXÃO
//=============================
function statusCreate() {
    if (localStorage.status) {

        if (localStorage.status == "never") {
            $('#IFOFF').show();
            $('#IFON').hide();
            $('#notNever').hide();
            $('#cliStatus').html("Você nunca se conectou ao SempreOn");
        }
        if (localStorage.status == "online") {

            $('#IFON').show();
            $('#IFOFF').hide();

            $('#cliStatus').html("<strong class='green'>Online</strong> em SempreOn");
            $('#statusTitle').html("Você está em");

            if (localStorage.statusMac != localStorage.mac) {
                $('#statusTxt').html("<strong>" + localStorage.statusLoc + "</strong> com outro dispositivo: " + localStorage.statusBrowser + " em " + localStorage.statusSo);
            }
            else {
                $('#statusTxt').html("<strong>" + localStorage.statusLoc + "</strong>");
            }
        }
        if (localStorage.status == "offline") {
            $('#IFOFF').show();
            $('#IFON').hide();
            $('#cliStatus').html("<strong class='red'>Offline</strong> em SempreON");
            $('#statusTitle').html("Seu último acesso");
            $('#statusTxt').html("Via <strong>" + localStorage.statusLoc + "</strong> em " + localStorage.statusDate);
        }
    }
}
//=============================
// POPULAR PERFIL DO USUARIO
//=============================
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
        $("#LoginOK").show();
    }
    else {
        $('#LoginForm').show();
        $("#LoginOK").hide();
        $("#LoginDO").show();
    }
}