const nombreInput = document.getElementById('nombre');
const textoInput = document.getElementById('texto');

const btnGenerar = document.getElementById('btnGenerar');
const btnDescargar = document.getElementById('btnDescargar');
const btnCrearOtro = document.getElementById('btnCrearOtro');

const canvas = document.getElementById('qrcode');

function validarCampos() {
    const nombreValido = nombreInput.value.trim() !== '';
    const textoValido = textoInput.value.trim() !== '';

    btnGenerar.disabled = !(nombreValido && textoValido)
}

nombreInput.addEventListener('input', validarCampos)
textoInput.addEventListener('input', validarCampos)

function generarQR() {
    const texto = textoInput.value.trim();
    const color = document.querySelector('input[name="color"]:checked').value

    if(!texto) return;

    QRCode.toCanvas(canvas, texto, {
        color:{
            dark:color,
            light:"#ffffff"
        },
        width:200,
        margin:2
    }, function(error){
        if(error) console.error(error);
        else{
            btnDescargar.disabled = false;
        }
    });

}

function descargarQR() {
    const enlace = document.createElement('a');

    const nombreQR = nombreInput.value.trim() || 'qr-code';
    enlace.href = canvas.toDataURL('image/png');
    enlace.download = `${nombreQR}.png`;

    enlace.click();
}

function reiniciarFormulario() {
nombreInput.value = '';
    textoInput.value = '';

    document.querySelector('input[name="color"]:checked').checked = false;
    document.querySelector('input[name="color"]').checked = true;

    canvas.width = canvas.width;

    btnGenerar.disabled = true;
    btnDescargar.disabled = true;

    nombreInput.focus();
}