//=============================
// PING RADIUS
//=============================
function ping() {
    sessionStorage.status = 0; // offline
    if (!localStorage.cliNome) {
        return false;
    }
    var req = new XMLHttpRequest();
    req.open("POST", "http://www.sempreon.mobi/hotspot/tunnel/ping.php?user=" + localStorage.cliEmail, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                sessionStorage.status = 1; // online
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
                //
                localStorage.locImg = res[7];
                localStorage.locTitle = res[8];
                localStorage.locTxt = res[9];
                localStorage.locEmail = res[10];
                localStorage.locSubject = res[11];
                localStorage.locPhone = res[12];
                localStorage.locFace = res[13];
                localStorage.locGoogle = res[14];
                localStorage.locTwitter = res[15];
                localStorage.locSite = res[16];
                locCreate();
                console.log(localStorage);
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

//=============================
// POPULAR INFO DO LOCAL
//=============================
function locCreate() {
    if (localStorage.status) {

        $('#goMail').val("Enviar para " + localStorage.statusLoc);
        $('#locPhone').attr("href", "tel:" + localStorage.locPhone);

        $('.cliLoc').html(localStorage.statusLoc);

        $('#cliContato').val(localStorage.cliNome + " <" + localStorage.cliEmail + ">");

        if (localStorage.locTitle != "")
            $('#locTitle').html(localStorage.locTitle);
        else
            $('#locTitle').html("Bem-vindo a SempreON");

        if (localStorage.locTxt != "")
            $('#locTxt').html(localStorage.locTxt);
        else
            $('#locTxt').html("O sinal de wifi grátis que você utilizou é uma cortesia de <strong>" + localStorage.cliLoc + "</strong>. Este serviço não é um direito, e sim um privilégio! Use com responsabilidade, e aproveite!");
        //==============================
        // IMAGEM DO LOCAL
        //==============================
        if (!localStorage.cliNome) {
            $('.cliLoc').html("Desconectado");
            $('#locImg').attr("src", "images/icons/off.png");
            
        }
        else {
            $('#conectado').show();
            $('#desconectado').hide();
            
            if (!localStorage.locImg || sessionStorage.status == 0) {
                $('#locImg').attr("src", "images/icons/pointer.png");
            }
            else {
                $('#locImg').attr("src", "http://sempreon.mobi/hotspot/upload/" + localStorage.locImg);
            }
        }
        if (localStorage.locEmail != "") {
            $('#faleconosco').show();
            $('#locEmail').val(localStorage.locEmail);
            $('#locSubject').val(localStorage.locSubject);
        }
        else {
            $('#faleconosco').hide();
        }
        if (localStorage.locFacebook || localStorage.locTwitter || localStorage.locGoogle) {
            $('#siganos').show();

            if (localStorage.locFace != "")
                $('#locFace').show();
            else
                $('#locFace').hide();

            if (localStorage.locTwitter != "")
                $('#locTwitter').show();
            else
                $('#locTwitter').hide();

            if (localStorage.locGoogle != "")
                $('#locGoogle').show();
            else
                $('#locGoogle').hide();
        }
        else {
            $('#siganos').hide();
        }

        if (localStorage.locPhone != "")
            $('#liguenos').show();
        else
            $('#liguenos').hide();
    }
}