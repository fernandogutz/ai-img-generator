function getImg() {
    const prompt = document.querySelector('#text').value;

    const urlApi = 'https://api.openai.com/v1/images/generations';

    localStorage.clear();
    document.querySelector('#img-container').innerHTML = '';
    document.querySelector('.error').innerHTML = '';
    document.querySelector('.error').style.display = 'none';

    if (!prompt) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.error').innerHTML = `
            <p>Inténtalo nuevamente con una descripción de imagen válida.</p>
        `;
        return;
    }

    document.querySelector('.loading').style.display = 'flex';

    postData(urlApi, prompt)
        .then(response => response.json())
        .then( ({ data }) => {

            //console.log(data);
            //console.log(data.length);

            for(let i = 0; i < data.length ; i++) {
                localStorage.setItem(`file${i}`, data[i].b64_json);
    
                const imgContainer = document.querySelector('#img-container');
                let src = `data:image/png;base64,${data[i].b64_json}`;
                imgContainer.innerHTML += `
                        <img class="img" src="${src}">
                        <a href="${src}" download="0${i+1}-ai-image-by-fernandogutz.png">Descargar PNG</a>
                    `;

                //console.log(i + ' finalizado')

            }

            //console.log('end');

        })
        .then(() => {
            document.querySelector('.loading').style.display = 'none';
        })


}


function postData(urlApi, prompt) {
    const response = fetch(urlApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "n": 2,
            "size": "512x512",
            "response_format": "b64_json"
        })

    });

    return response;
}