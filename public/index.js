// forms button
const form = document.querySelector('.image-form'),
  button = document.querySelector("button");


// event
form.addEventListener('submit', async (e) => {

  // prevent default
  e.preventDefault()

  // gadget
  button.innerText = "Please Wait";
  button.disabled = true;

  // https://fr.javascript.info/formdata
  const formData = new FormData(form);

  //console.log(formData.get("prompt"))
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);


  const res = await fetch('/openai/image', {
    headers: { 'Content-Type': 'application/json' },

    // body: JSON.stringify({ prompt: form.prompt.value }),
    body: jsonData,
    method: 'POST'
  })
  const resp = await res.json();

  // add img in the dom
  document.body.insertAdjacentHTML("beforeEnd", `<img src=${resp.url} alt="top"/>`)

  //reset gadget
  button.innerText = "Generator";
  button.disabled = false;
})