<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisa de satisfaçâo</title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</head>
<body>

    <div id="app" >
        <div class="row" style="margin-bottom: 1em;">
            <div class="col-12">
                <h5 class="text-center">Identifique-se (opcional)</h5>
            </div>
        </div>
        <div class="row">
            <div class="container checks">
                <form>
                  <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" placeholder="Informe seu nome">
                  </div>
                  <div class="form-group">
                    <label for="contactNumber">Número de Contato</label>
                    <input type="tel" class="form-control" id="contactNumber" placeholder="Informe seu número de contato">
                  </div>
                  <div class="form-group">
                    <label>Como ficou sabendo do pronto atendimento?</label>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="socialMedia">
                      <label class="form-check-label" for="socialMedia">Redes Sociais</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="radio">
                      <label class="form-check-label" for="radio">Rádio</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="family">
                      <label class="form-check-label" for="family">Família</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="friends">
                      <label class="form-check-label" for="friends">Amigos</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="company">
                      <label class="form-check-label" for="company">Empresa</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="others">
                      <label class="form-check-label" for="others">Outros (qual?)</label>
                    </div>
                </form>
                    <input type="text" class="form-control mt-2" id="otherSource" placeholder="Especificar">
                    <div class="row botoes">
                        <div class="col-12">
                            <button class="btn btn-primary finish-btn">Proximo</button>
                        </div>
                    </div>
                  </div>
        </div>    
        
    </div>   
    
    <div class="container" style="display: none;">
        <div class="slider-container" id="slider">
          <div class="slider-track"></div>
          <div class="slider-thumb" id="sliderThumb" style="left: 50%;">
            <img src="arrow.png" alt="seta" class="seta">
          </div>   
         
        </div>
      </div>

    <script>/
        const finishBtn = document.querySelector('.finish-btn');

        finishBtn.addEventListener('click', () => {

            localStorage.setItem('nomePaciente', document.getElementById('name').value);
            localStorage.setItem('telefonePaciente', document.getElementById('contactNumber').value);

            //seleciona qual o checkbox que esta selecionado
            var checkbox = document.querySelectorAll('input[type="checkbox"]');

            for (var i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {

                    if (converteRastreio(i) === 'none') {
                        localStorage.setItem('rastreioPaciente', document.getElementById('otherSource').value);
                    } else {
                        localStorage.setItem('rastreioPaciente', converteRastreio(i));
                    }
                }
            }

            var avaliacaoAtendimento = {
                telefonePacientente: localStorage.getItem('telefonePaciente'),
                nomePacientente: localStorage.getItem('nomePaciente'),
                rastreioPaciente: localStorage.getItem('rastreioPaciente'),
                aparenciaConsultorio: localStorage.getItem('aparenciaConsultorio'),
                qualidadeEquipamentos: localStorage.getItem('qualidadeEquipamentos'),
                cortesiaRecepcao: localStorage.getItem('cortesiaRecepcao'),
                cortesiaDentista: localStorage.getItem('cortesiaDentista'),
                confiancaTransmitida: localStorage.getItem('confiancaTransmitida'),
                competenciaDentista: localStorage.getItem('competenciaDentista'),
                clarezaCominicacao: localStorage.getItem('clarezaComunicacao'),
                satisfacaoGeral: localStorage.getItem('satisfacaoGeral'),    
                sugestaoComentario: localStorage.getItem('sugestaoComentario'),
                dataAtendimento: formatDate(new Date()),
            }

            console.log(avaliacaoAtendimento);




        });
    </script>

    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>
</html>